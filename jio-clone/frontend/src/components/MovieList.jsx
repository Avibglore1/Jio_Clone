"use client";

import { useState, useEffect } from "react";
import { fetchMovies } from "../lib/api";

const MovieList = ({ category, title }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies(category).then(setMovies);
  }, [category]);

  return (
    <div className="px-6 py-4">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="flex overflow-x-scroll scrollbar-hide gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="w-[150px]">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="w-full h-[220px] rounded-lg object-cover"
            />
            <p className="mt-2 text-white text-sm">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
