const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Existing fetchMovies function for trending, upcoming, etc.
export const fetchMovies = async (category) => {
  let endpoint = "";
  
  switch (category) {
    case "trending":
      endpoint = `/trending/movie/week?api_key=${API_KEY}`;
      break;
    case "upcoming":
      endpoint = `/movie/upcoming?api_key=${API_KEY}`;
      break;
    case "top_rated":
      endpoint = `/movie/top_rated?api_key=${API_KEY}`;
      break;
    // Add more categories as needed
    default:
      endpoint = `/trending/movie/week?api_key=${API_KEY}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error fetching movies: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// New function to fetch movies by genre with improved error handling
export const fetchMoviesByGenre = async (genreId) => {
  try {
    // Get more results to ensure we have enough valid movies with posters
    const endpoint = `/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=1&vote_count.gte=100`;
    const response = await fetch(`${BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching movies by genre: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return [];
  }
};