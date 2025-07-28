const API_KEY = "your_api_key";
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(query) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
  return res.json();
}

export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
  return res.json();
}
