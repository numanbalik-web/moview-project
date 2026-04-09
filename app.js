const API_KEY = "f8ad59e4b00bfad59a0c420ec482c823";

const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

// HTML elementleri
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

// İlk yükleme
getMovies(API_URL);

// Film çekme
async function getMovies(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
  } catch (error) {
    main.innerHTML =
      "<h2 style='color:white;text-align:center;'>Error loading movies</h2>";
  }
}

// Filmleri ekrana bas
function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>${title}</h3>
        <p>${overview}</p>
      </div>
    `;

    main.appendChild(movieEl);
  });
}

// Arama
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
  } else {
    getMovies(API_URL);
  }
});
search.addEventListener("input", () => {
  if (search.value.trim() === "") {
    getMovies(API_URL);
  }
});

// Puan rengi
function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 4) {
    return "orange";
  } else {
    return "red";
  }
}
