"use client";

import { useState, useEffect, useRef } from "react";
import { fetchMovies, fetchMoviesByGenre } from "../lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieList = ({ category, genreId, title }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const scrollRef = useRef(null);
  const autoScrollRef = useRef(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let data;
        if (category === "genre" && genreId) {
          // Fetch movies by genre
          data = await fetchMoviesByGenre(genreId);
        } else {
          // Fetch other categories (trending, upcoming, etc.)
          data = await fetchMovies(category);
        }
        setMovies(data);
        
        // Filter out movies without poster_path
        const validMovies = data.filter(movie => movie.poster_path);
        setFilteredMovies(validMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, genreId]);

  // Function to handle smooth scrolling
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth / 1.5; // Scroll by half container width
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setIsUserScrolling(true);
      setTimeout(() => setIsUserScrolling(false), 5000); // Resume auto-scroll after user interaction
    }
  };

  // Auto-scroll every 4 seconds
  useEffect(() => {
    if (!isUserScrolling && !loading && filteredMovies.length > 0) {
      autoScrollRef.current = setInterval(() => scroll("right"), 4000);
    }
    return () => clearInterval(autoScrollRef.current);
  }, [isUserScrolling, loading, filteredMovies.length]);

  // Handle image load errors
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/200x300?text=No+Poster";
    e.target.onerror = null; // Prevent infinite callbacks
  };

  return (
    <div className="relative px-6 py-4">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {/* Empty state */}
      {!loading && filteredMovies.length === 0 && (
        <div className="flex justify-center items-center h-[300px]">
          <p className="text-gray-400">No movies found for this category</p>
        </div>
      )}

      {/* Gradient Fade Left */}
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>

      {/* Left Scroll Button */}
      {filteredMovies.length > 0 && (
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full z-10 hover:bg-black transition"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="text-white w-6 h-6" />
        </button>
      )}

      {/* Movie List */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 scroll-smooth px-12"
        style={{ scrollBehavior: "smooth", whiteSpace: "nowrap", width: "100%" }}
        onScroll={() => setIsUserScrolling(true)}
      >
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="w-[14.2%] shrink-0">
            <div className="relative pb-[150%]"> {/* Aspect ratio container */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || "Movie poster"}
                onError={handleImageError}
                className="absolute top-0 left-0 w-full h-full rounded-lg object-cover shadow-lg hover:scale-105 transition"
              />
            </div>
            
          </div>
        ))}
      </div>

      {/* Right Scroll Button */}
      {filteredMovies.length > 0 && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full z-10 hover:bg-black transition"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="text-white w-6 h-6" />
        </button>
      )}

      {/* Gradient Fade Right */}
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
    </div>
  );
};

export default MovieList;