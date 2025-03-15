"use client";

import { useState, useEffect, useRef } from "react";
import { fetchMovies } from "../lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieList = ({ category, title }) => {
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef(null);
  const autoScrollRef = useRef(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  useEffect(() => {
    fetchMovies(category).then((data) => setMovies(data)); // Fetch all movies
  }, [category]);

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
    if (!isUserScrolling) {
      autoScrollRef.current = setInterval(() => scroll("right"), 4000);
    }
    return () => clearInterval(autoScrollRef.current);
  }, [isUserScrolling]);

  return (
    <div className="relative px-6 py-4">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>

      {/* Gradient Fade Left */}
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>

      {/* Left Scroll Button */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full z-10 hover:bg-black transition"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="text-white w-6 h-6" />
      </button>

      {/* Movie List */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 scroll-smooth px-12"
        style={{ scrollBehavior: "smooth", whiteSpace: "nowrap", width: "100%" }}
        onScroll={() => setIsUserScrolling(true)}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="w-[14.2%] shrink-0">
            {/* Ensure only 7 movies fit in viewport */}
            <img
              src={
                movie?.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              className="w-full h-[300px] rounded-lg object-cover shadow-lg hover:scale-105 transition"
            />
          </div>
        ))}
      </div>

      {/* Right Scroll Button */}
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full z-10 hover:bg-black transition"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="text-white w-6 h-6" />
      </button>

      {/* Gradient Fade Right */}
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
    </div>
  );
};

export default MovieList;
