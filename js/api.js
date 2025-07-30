const API_KEY = "31a95040";
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(query) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
  return res.json();
}

export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
  return res.json();
}

export async function getPopularMovies() {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=star`);
  return res.json();
}

export async function getWatchedMovies() {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=avengers`);
  return res.json();
}
