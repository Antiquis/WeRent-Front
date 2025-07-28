import { navigateTo } from "./router.js";

export function renderMovieList(movies) {
  const container = document.querySelector("#movie-list");
  container.innerHTML = "";
  movies
    .sort((a, b) => b.Year - a.Year)
    .forEach((movie) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}" />
      <h3>${movie.Title} (${movie.Year})</h3>
    `;
      card.addEventListener("click", () => navigateTo(movie.imdbID));
      container.appendChild(card);
    });
}

export function renderMovieDetails(movie) {
  const container = document.querySelector("#movie-details");
  container.innerHTML = `
    <h2>${movie.Title}</h2>
    <img src="${movie.Poster}" />
    <p><strong>Year:</strong> ${movie.Year}</p>
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Plot:</strong> ${movie.Plot}</p>
  `;
}
