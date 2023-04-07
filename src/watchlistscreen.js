const watchlistUrl = "http://localhost:5000/watchlist";
const watchlistContainer = document.getElementById("watchlist-container");

// Fetch the user's watchlist from the API
fetch(watchlistUrl)
  .then((response) => response.json())
  .then((data) => {
    if (data.length === 0) {
      watchlistContainer.innerHTML =
        "<p>Your watchlist is empty. Start adding movies now!</p>";
    } else {
      data.forEach((movie) => {
        const movieCard = createMovieCard(movie);
        watchlistContainer.appendChild(movieCard);
      });
    }
  })
  .catch((error) => console.error(error));

// Function to create a movie card element
function createMovieCard(movie) {
  const card = document.createElement("a");
  card.className =
    "movie-card bg-white rounded-xl shadow-md flex flex-col items-center space-y-0 p-0 max-w-xs";
  card.href = `moviescreendetail.html?id=${movie.id}`;

  let ratingElement = "";
  if (movie.rating) {
    ratingElement = `<div class="absolute top-2 left-2 bg-white bg-opacity-75 px-2 py-1 rounded text-sm font-semibold">⭐ ${movie.rating}/10</div>`;
  }

  card.innerHTML = `
    <div class="relative w-full h-auto p-0"> 
      <img src="${movie.image}" alt="${movie.title}" class="rounded-t-lg w-full h-60 object-fit object-center" />
      ${ratingElement}
    </div>
    <h2 class="text-m py-3 mx-4 flex-initial font-bold  text-center">${movie.title}</h2>
  `;

  return card;
}
