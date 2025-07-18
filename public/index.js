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

// Handle movie form submission
document.getElementById("movie-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const genre = document.getElementById("genre").value;
  const releaseYear = document.getElementById("releaseYear").value;

  try {
    const res = await fetch("/api/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, genre, releaseYear }),
    });

    if (!res.ok) throw new Error("Movie creation failed");

    // Reset form
    document.getElementById("movie-form").reset();

    // Refresh movie list
    loadMovies();
  } catch (err) {
    console.error("Error adding movie:", err);
    alert("Failed to add movie. Please try again.");
  }
});
