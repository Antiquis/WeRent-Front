import { getMovieDetails } from "./api.js";
import { openMovieModal } from "./modal.js";

export function renderMovieList(
  movies,
  minRating = 0,
  containerId = "movie-popular"
) {
  const container = document.querySelector(`#${containerId}`);
  container.innerHTML = "";

  const filteredMovies = movies
    .filter((movie) => {
      const ratingStr = movie.imdbRating || "0";
      const ratingValue = parseFloat(ratingStr.split("/")[0]);
      return ratingValue >= minRating;
    })
    .sort((a, b) => {
      const yearA = parseInt(a.Year) || 0;
      const yearB = parseInt(b.Year) || 0;
      return yearB - yearA;
    });

  if (filteredMovies.length === 0) {
    container.innerHTML = "<p>Ничего не найдено</p>";
    return;
  }

  filteredMovies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}" />
      <h3 class="large-text">${movie.Title} (${movie.Year})</h3>
      ${
        movie.imdbRating
          ? `<p class="star paragraph">⭐ ${movie.imdbRating}/10</p>`
          : ""
      }
      ${movie.Genre ? `<p class="genre ">${movie.Genre}</p>` : ""}
      ${movie.Runtime ? `<p class="runtime">${movie.Runtime}</p>` : ""}
    `;
    card.addEventListener("click", async () => {
      const details = movie.Ratings
        ? movie
        : await getMovieDetails(movie.imdbID);
      openMovieModal(details);
    });
    container.appendChild(card);
  });
}
