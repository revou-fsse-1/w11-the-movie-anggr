const moviePoster = document.querySelector(".movie-poster img");
const movieTitle = document.querySelector(".movie-title");
const movieSynopsis = document.querySelector(".movie-synopsis");
const movieGenres = document.querySelector(".movie-genres");
const watchTrailerButton = document.querySelector(".watch-trailer-button");
const addToWatchlistButton = document.querySelector(".add-to-watchlist-button");
const trailerContainer = document.querySelector(".trailer-container");
const trailerVideo = document.getElementById("trailer-video");
const trailerVideoMobile = document.getElementById("trailer-video-mobile");

// Get the movie ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

// URL API
const movieDetailUrl = `http://localhost:5000/movies/${movieId}`;
const watchlistUrl = "http://localhost:5000/watchlist";

fetch(movieDetailUrl)
  .then((response) => response.json())
  .then((movie) => {
    displayMovieDetails(movie);
  })
  .catch((error) => console.error(error));

function displayMovieDetails(movie) {
  moviePoster.src = movie.image;
  movieTitle.textContent = movie.title;
  movieSynopsis.textContent = movie.synopsis;

  movie.genre.forEach((genre) => {
    const genreElement = document.createElement("span");
    genreElement.textContent = genre;
    genreElement.className =
      "bg-blue-200 text-blue-800 rounded-full px-2 py-1 text-sm font-semibold mr-2";
    movieGenres.appendChild(genreElement);
  });

  trailerVideo.src = movie.trailer;
  trailerVideoMobile.src = movie.trailer;

  addToWatchlistButton.addEventListener("click", () => {
    addToWatchlist(movie);
  });
}

async function addToWatchlist(movie) {
  try {
    const response = await fetch(watchlistUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });

    if (response.ok) {
      alert("Movie added to watchlist!");
    } else {
      alert("Failed to add movie to watchlist.");
    }
  } catch (error) {
    console.error("Error adding movie to watchlist:", error);
    alert("Failed to add movie to watchlist.");
  }
}
