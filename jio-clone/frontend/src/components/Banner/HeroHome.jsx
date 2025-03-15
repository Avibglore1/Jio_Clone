"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Button } from "@/components/ui/button";
import dotenv from "dotenv";
dotenv.config();


const HeroBannerCarousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop={true}
      className="w-full h-[500px]"
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <div className="relative h-[500px] w-full bg-gray-900">
            {/* Background Image */}
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>

            {/* Movie Content */}
            <div className="absolute bottom-10 left-10 text-white max-w-[600px]">
              <h1 className="text-5xl font-extrabold drop-shadow-lg">
                {movie.title}
              </h1>
              <p className="mt-3 text-lg leading-snug opacity-90">
                {movie.overview.length > 150
                  ? movie.overview.substring(0, 150) + "..."
                  : movie.overview}
              </p>

              {/* Watch Now Button */}
              <Button
                variant="outline"
                className="mt-4 px-6 py-2 text-lg bg-pink-500 text-black rounded cursor-pointer"
              >
                Watch Now
              </Button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroBannerCarousel;
