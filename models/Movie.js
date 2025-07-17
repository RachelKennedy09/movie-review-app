import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  genre: String,
  releaseYear: Number,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
