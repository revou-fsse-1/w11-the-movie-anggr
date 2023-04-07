const movieScreenUrl = "http://localhost:5000";

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${movieScreenUrl}${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

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

async function displayMovies() {
  const currentWatchingContainer = document.getElementById("current-watching");
  const suggestedWatchingContainer =
    document.getElementById("suggested-watching");
  const previouslyWatchedContainer =
    document.getElementById("previously-watched");

  const currentWatchingMovies = await fetchData("/currentWatch");
  const suggestedWatchingMovies = await fetchData("/isSuggested");
  const previouslyWatchedMovies = await fetchData("/isPrevious");

  if (currentWatchingMovies.length === 0) {
    alert("No results found for your search. Please try again.");
  } else {
    currentWatchingMovies.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      currentWatchingContainer.appendChild(movieCard);
    });
  }

  if (suggestedWatchingMovies.length === 0) {
    alert("No results found for your search. Please try again.");
  } else {
    suggestedWatchingMovies.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      suggestedWatchingContainer.appendChild(movieCard);
    });
  }

  if (previouslyWatchedMovies.length === 0) {
    alert("No results found for your search. Please try again.");
  } else {
    previouslyWatchedMovies.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      previouslyWatchedContainer.appendChild(movieCard);
    });
  }
}

displayMovies();
