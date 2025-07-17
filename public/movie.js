//Step 1: Get movie ID from URL
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

//Step 2: Fetch movie info from Backend

async function fetchMovieDetails() {
  const res = await fetch(`/api/movies/${movieId}`);
  const movie = await res.json();

  //Fill the page
  document.getElementById("movie-title").textContent = movie.title;
  document.getElementById("movie-description").textContent = movie.description;
  document.getElementById("movie-genre").textContent = movie.genre;
  document.getElementById("movie-year").textContent = movie.releaseYear;
}

//Display the reviews
const reviewList = document.getElementsById("review-list");
reviewList.innerHTML = "";
movie.reviews.forEach((review) => {
  const div = document.createElement("div");
  div.innerHTML = `<p><strong>${review.author}:</strong> ${review.text}</p>`;
  reviewList.appendChild(div);
});

//Step 3: Handle New Review Submission
document.getElementById("review-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const author = document.getElementById("author").value;
  const text = document.getElementById("text").value;

  await fetch(`/api/reviews/${movieId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ author, text }),
  });

  //Refresh the page
  fetchMovieDetails();
  document.getElementById("review-form").reset();
});
