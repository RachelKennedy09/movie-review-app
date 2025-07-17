import express from "express";
import Movie from "../models/Movie.js";
const router = express.Router();

// GET all movies
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// GET one movie (and its reviews)
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("reviews");
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json(movie);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ error: "Server error" });
  }
});

// POST a new movie
router.post("/", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const saved = await movie.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

// DELETE a movie
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
