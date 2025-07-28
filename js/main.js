import { searchMovies, getMovieDetails } from "./api.js";
import { renderMovieList, renderMovieDetails } from "./dom.js";
import { getCurrentMovieId } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  const id = getCurrentMovieId();
  if (id) {
    getMovieDetails(id).then(renderMovieDetails);
  } else {
    const input = document.querySelector("#search-input");
    input.addEventListener("input", async (e) => {
      const data = await searchMovies(e.target.value);
      renderMovieList(data.Search || []);
    });
  }

  window.addEventListener("popstate", () => location.reload());
});

const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
});

// Закрытие по клику вне меню
document.addEventListener("click", (e) => {
  const isClickInside = nav.contains(e.target) || burger.contains(e.target);
  if (!isClickInside) {
    nav.classList.remove("active");
    burger.classList.remove("active");
  }
});
