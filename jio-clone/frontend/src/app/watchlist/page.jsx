"use client";
import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function WatchlistPage() {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.user);
  
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch wishlist from backend
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!isLoggedIn) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await axios.get('http://localhost:5000/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Remove duplicate items based on ID
        const uniqueWishlist = Array.from(
          new Map(response.data.wishlist.map(item => [item.id, item])).values()
        );

        setWishlist(uniqueWishlist);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch wishlist:', err);
        setError('Failed to load wishlist');
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [isLoggedIn]);

  const handleLogin = () => {
    router.push('/login');
  };

  const removeFromWishlist = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      
      await axios.delete(`http://localhost:5000/api/user/remove/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setWishlist(prevWishlist => 
        prevWishlist.filter(item => item.id !== itemId)
      );
    } catch (err) {
      console.error('Failed to remove item from wishlist:', err);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Lock className="w-12 h-12 mb-4 text-gray-500" />
        <h2 className="text-xl mb-4">Login to see your wishlist</h2>
        <button 
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Wishlist</h1>
      
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : wishlist.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Your wishlist is empty</p>
          <button 
            onClick={() => router.push('/discover')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Discover Content
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {wishlist.map((item) => (
            <div 
              key={item.id} 
              className="flex justify-between items-center p-4 border rounded"
            >
              <div className="flex items-center">
                <img 
                  src={item.poster_path} 
                  alt={item.name} 
                  className="w-16 h-24 object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                </div>
              </div>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}