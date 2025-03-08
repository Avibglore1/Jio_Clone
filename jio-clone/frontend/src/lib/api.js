const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies(category) {
  const res = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`, {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return data.results;
}
