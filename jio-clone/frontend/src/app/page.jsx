import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MovieList from "@/components/MovieList";
import { fetchMovies } from "./../lib/api";

export default async function Home() {
  const movies = await fetchMovies("popular");

  return (
    <div className="bg-black text-white">
      <Navbar />
      <HeroBanner movie={movies[0]} />
      <MovieList category="popular" title="Trending Now" />
      <MovieList category="top_rated" title="Top Rated" />
      <MovieList category="upcoming" title="Upcoming Movies" />
    </div>
  );
}
