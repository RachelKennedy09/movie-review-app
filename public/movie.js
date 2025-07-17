// Step 1: Get movie ID from URL
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

// Step 2: Fetch movie info and reviews from backend
async function fetchMovieDetails() {
  const res = await fetch(`/api/movies/${movieId}`);
  const movie = await res.json();

  // Fill in movie details
  document.getElementById("movie-title").textContent = movie.title;
  document.getElementById("movie-description").textContent = movie.description;
  document.getElementById("movie-genre").textContent = movie.genre;
  document.getElementById("movie-year").textContent = movie.releaseYear;

  // Fill in reviews
  const reviewList = document.getElementById("review-list");
  reviewList.innerHTML = ""; // Clear old reviews first

  movie.reviews.forEach((review) => {
    const div = document.createElement("div");
    div.innerHTML = `<p><strong>${review.author}:</strong> ${review.text}</p>`;
    reviewList.appendChild(div);
  });

  // For debugging:
  console.log("Movie data:", movie);
  console.log("Reviews:", movie.reviews);
}

fetchMovieDetails(); // Call it initially

// Step 3: Handle New Review Submission
document.getElementById("review-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const author = document.getElementById("author").value;
  const text = document.getElementById("text").value;

  await fetch(`/api/reviews/${movieId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ author, text }),
  });

  // Refresh the review list
  await fetchMovieDetails();
  document.getElementById("review-form").reset();
});
