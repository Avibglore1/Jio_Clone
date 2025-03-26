"use client";
import React, { useEffect } from 'react';
import { Lock } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function WatchlistPage() {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.user);

  const handleLogin = () => {
    router.push('/login');
  };

  // If not logged in, show login prompt
  if (!isLoggedIn) {
    return (
      <>
        <h1 className="text-3xl font-bold bg-black text-white p-4">Watchlist</h1>
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center ">  
          <div className="mb-8">
            <Lock className="mx-auto mb-4 text-gray-500" size={64} strokeWidth={1} />
            <p className="text-gray-400 mb-2">Login to see your watchlist</p>
          </div>
        
          <button 
            onClick={handleLogin}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full transition duration-300 ease-in-out"
          >
            Login
          </button>
        </div>
      </>
    );
  }

  // Render watchlist items when logged in
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Watchlist</h1>
      
      {(() => {
        const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
        
        if (watchlist.length === 0) {
          return (
            <div className="flex flex-col items-center justify-center text-center mt-20">
              <p className="text-gray-400 mb-4">Your watchlist is empty</p>
              <button 
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full"
                onClick={() => {/* Navigate to movies/shows */}}
              >
                Discover Content
              </button>
            </div>
          );
        }

        return (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {watchlist.map((item) => (
              <div 
                key={item.id} 
                className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition"
              >
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-400 text-sm capitalize">{item.type}</p>
                  <button 
                    className="mt-2 text-red-500 hover:text-red-600"
                    onClick={() => {
                      const updatedWatchlist = watchlist.filter(w => w.id !== item.id);
                      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
                      // Force re-render
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      })()}
    </div>
  );
}