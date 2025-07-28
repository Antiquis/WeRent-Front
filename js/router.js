export function navigateTo(id) {
  history.pushState({}, "", `?id=${id}`);
  window.dispatchEvent(new Event("popstate"));
}

export function getCurrentMovieId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}
