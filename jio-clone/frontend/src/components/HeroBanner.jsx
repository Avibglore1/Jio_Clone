import { Button } from "@/components/ui/button"
const HeroBanner = ({ movie }) => {
    return (
      <div className="relative h-[500px] w-full bg-gray-900">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="mt-2 w-[50%]">{movie.overview}</p>
          <Button variant="outline" className="mt-4 px-6 py-2 text-lg text-black rounded cursor-pointer">Watch Now</Button>
        </div>
      </div>
    );
  };
  
  export default HeroBanner;
  