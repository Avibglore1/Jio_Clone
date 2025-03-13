import HeroBanner from "@/components/HeroBanner";
import MovieList from "@/components/MovieList";

export default async function Home() {
  return (
    <div className="bg-black text-white">
      <HeroBanner  />
      <MovieList category="popular" title="Trending Now" />
      <MovieList category="top_rated" title="Top Rated" />
      <MovieList category="upcoming" title="Upcoming Movies" />
    </div>
  );
}
