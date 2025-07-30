import {
  searchMovies,
  getMovieDetails,
  getPopularMovies,
  getWatchedMovies,
} from "./api.js";
import { renderMovieList } from "./dom.js";
import { getCurrentMovieId } from "./router.js";
import { setupModalClose } from "./modal.js";

function showPopularLoader() {
  const container = document.getElementById("movie-popular");
  container.innerHTML = `
    <div class="popular-loader">
      <div class="popular-spinner"></div>
    </div>
  `;
}
function showWatchedLoader() {
  const container = document.getElementById("movie-watched");
  container.innerHTML = `
    <div class="popular-loader">
      <div class="popular-spinner"></div>
    </div>
  `;
}

function enableHorizontalScroll(containerId) {
  const container = document.getElementById(containerId);
  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener("mousedown", (e) => {
    if (window.innerWidth <= 744) return;
    isDown = true;
    container.classList.add("active-scroll");
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });
  container.addEventListener("mouseleave", () => {
    isDown = false;
    container.classList.remove("active-scroll");
  });
  container.addEventListener("mouseup", () => {
    isDown = false;
    container.classList.remove("active-scroll");
  });
  container.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  });

  container.addEventListener("wheel", (e) => {
    if (window.innerWidth <= 744) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      container.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  setupModalClose();
  const id = getCurrentMovieId();
  if (id) {
    // Можно оставить пустым или скрыть детали
  } else {
    showPopularLoader();
    showWatchedLoader();

    const popularData = await getPopularMovies();
    let popularMovies = [];
    if (popularData.Search) {
      popularMovies = await Promise.all(
        popularData.Search.map((m) => getMovieDetails(m.imdbID))
      );
    }
    renderMovieList(popularMovies);

    const watchedData = await getWatchedMovies();
    let watchedMovies = [];
    if (watchedData.Search) {
      watchedMovies = await Promise.all(
        watchedData.Search.map((m) => getMovieDetails(m.imdbID))
      );
    }
    renderMovieList(watchedMovies, 0, "movie-watched");

    const searchInput = document.querySelector("#search-input");

    const updateMovies = async () => {
      showPopularLoader();
      if (searchInput?.value) {
        const data = await searchMovies(searchInput.value);
        let movies = [];
        if (data.Search) {
          movies = await Promise.all(
            data.Search.map((m) => getMovieDetails(m.imdbID))
          );
        }
        renderMovieList(movies);
      } else {
        renderMovieList(popularMovies);
      }
    };

    if (searchInput) {
      searchInput.addEventListener("input", updateMovies);
    }

    enableHorizontalScroll("movie-popular");
    enableHorizontalScroll("movie-watched");
  }

  // Мобильный поиск
  const mobileSearchBar = document.getElementById("mobile-search-bar");
  const mobileSearchInput = document.getElementById("mobile-search-input");
  const mobileSearchClose = document.getElementById("mobile-search-close");
  const header = document.querySelector("header");
  const footerSearchBtn = document.getElementById("footer-search-btn");

  function openMobileSearch() {
    if (header.querySelector(".section-logo"))
      header.querySelector(".section-logo").style.display = "none";
    if (header.querySelector(".section-nav"))
      header.querySelector(".section-nav").style.display = "none";
    if (header.querySelector(".section-search"))
      header.querySelector(".section-search").style.display = "none";
    mobileSearchBar.style.display = "flex";
  }
  function closeMobileSearch() {
    if (header.querySelector(".section-logo"))
      header.querySelector(".section-logo").style.display = "";
    if (header.querySelector(".section-nav"))
      header.querySelector(".section-nav").style.display = "";
    if (header.querySelector(".section-search"))
      header.querySelector(".section-search").style.display = "";
    mobileSearchBar.style.display = "none";
  }

  if (footerSearchBtn) {
    footerSearchBtn.addEventListener("click", openMobileSearch);
  }
  if (mobileSearchClose) {
    mobileSearchClose.addEventListener("click", closeMobileSearch);
  }
  if (mobileSearchInput) {
    mobileSearchInput.addEventListener("input", async () => {
      showPopularLoader();
      if (mobileSearchInput.value) {
        const data = await searchMovies(mobileSearchInput.value);
        let movies = [];
        if (data.Search) {
          movies = await Promise.all(
            data.Search.map((m) => getMovieDetails(m.imdbID))
          );
        }
        renderMovieList(movies);
      } else {
        const popularData = await getPopularMovies();
        let popularMovies = [];
        if (popularData.Search) {
          popularMovies = await Promise.all(
            popularData.Search.map((m) => getMovieDetails(m.imdbID))
          );
        }
        renderMovieList(popularMovies);
      }
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

document.addEventListener("click", (e) => {
  const isClickInside = nav.contains(e.target) || burger.contains(e.target);
  if (!isClickInside) {
    nav.classList.remove("active");
    burger.classList.remove("active");
  }
});
