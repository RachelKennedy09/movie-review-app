async function loadMovies() {
  try {
    const res = await fetch("/api/movies");
    const movies = await res.json();

    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";

    movies.forEach((movie) => {
      const card = document.createElement("div");
      card.classList.add("movie-card");

      card.innerHTML = `
        <h3>${movie.title}</h3>
        <p><strong>Genre:</strong> ${movie.genre || "N/A"}</p>
        <p><strong>Year:</strong> ${movie.releaseYear || "N/A"}</p>
        <a href="movie.html?id=${movie._id}">View Details</a>
      `;

      movieList.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load movies:", err);
  }
}

loadMovies();
