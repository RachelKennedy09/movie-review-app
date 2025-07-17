import express from "express";
import Review from "../models/Review.js";
import Movie from "../models/Movie.js";

const router = express.Router();

// POST: Add review to a movie
router.post("/:movieId", async (req, res) => {
  try {
    const { author, text } = req.body;
    const movieId = req.params.movieId;

    const review = new Review({ author, text, movie: movieId });
    const savedReview = await review.save();

    // Link to movie
    await Movie.findByIdAndUpdate(movieId, {
      $push: { reviews: savedReview._id },
    });

    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ error: "Could not create review" });
  }
});

// PUT: Edit a review
router.put("/:id", async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Could not update review" });
  }
});

// DELETE: Remove a review
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);

    // Remove review ID from its movie
    await Movie.findByIdAndUpdate(deleted.movie, {
      $pull: { reviews: deleted._id },
    });

    res.json(deleted);
  } catch (err) {
    res.status(400).json({ error: "Could not delete review" });
  }
});

export default router;
