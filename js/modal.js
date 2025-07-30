export function openMovieModal(movie) {
  const modal = document.getElementById("movie-modal");
  const modalDetails = document.getElementById("modal-details");
  modalDetails.innerHTML = `
    <div class="modal-poster-wrap">
      <img class="modal-poster" src="${movie.Poster}" alt="${movie.Title}" />
      <div class="modal-poster-gradient"></div>
      <div class="modal-title h1">${movie.Title}</div>
      <div class="modal-btn-row">
        <button class="modal-btn main paragraph">
          <img class="icon" src="./assets/icons/Play_Modal.svg" alt="Смотреть" />
          Смотреть
        </button>
        <button class="modal-btn">
          <img src="./assets/icons/Favorites_Modal.svg" alt="Добавить в Избранное" />
        </button>
        <button class="modal-btn">
          <img src="./assets/icons/Share_Modal.svg" alt="Поделиться" />
        </button>
      </div>
      <div class="modal-meta main large-text">
        <span>
          ⭐ ${movie.imdbRating || "-"} 
        </span>
        <span class="modal-year large-text">|</span>
        <span class="modal-year large-text">${movie.Year || ""}</span>
      </div>
    </div>
    <div class="modal-genres paragraph">
      ${
        movie.Genre
          ? movie.Genre.split(",")
              .map((g) => `<span>${g.trim()}</span>`)
              .join("")
          : ""
      }
    </div>
    <div class="modal-description large-text">${movie.Plot || ""}</div>
    <div class="movie-info large-text">
      <p><strong>Режиссер:</strong> ${movie.Director || ""}</p>
      <p><strong>Актеры:</strong> ${movie.Actors || ""}</p>
      ${movie.Awards ? `<p><strong>Награды:</strong> ${movie.Awards}</p>` : ""}
      ${
        movie.BoxOffice
          ? `<p><strong>Сборы:</strong> ${movie.BoxOffice}</p>`
          : ""
      }
      ${
        movie.Ratings && movie.Ratings.length
          ? `<div class="ratings-list">
              ${movie.Ratings.map(
                (r) => `<p><strong>${r.Source}:</strong> ${r.Value}</p>`
              ).join("")}
            </div>`
          : ""
      }
    </div>
  `;
  modal.classList.add("active");
  document.body.classList.add("modal-open");
}

export function setupModalClose() {
  const modal = document.getElementById("movie-modal");
  const closeBtn = modal.querySelector(".close-modal");
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.classList.remove("modal-open");
    }
  });
}
