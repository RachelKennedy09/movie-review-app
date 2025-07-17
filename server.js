// This file will Start my backend on port 3000
//Connect to mongoDB
//serve frontend (from public/)
//prepare to handle routes for movies and reviews

//Import dependencies
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

//configure environment variables
dotenv.config();

//create the express app
const app = express();

//Middleware to parse JSON
app.use(express.json());

//Server static files (HTML, CSS, JS) from public folder
app.use(express.static("public"));

//example default route
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

//connect to mongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongodb"))
  .catch((err) => console.error("mongodb connection error:", err));

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
