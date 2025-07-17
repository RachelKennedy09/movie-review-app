import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
