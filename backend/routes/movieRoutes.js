const express = require("express");
const router = express.Router();
const {
    getTrending,
    searchMovies,
    getMovieDetails,
} = require("../controllers/movieController");

router.get("/trending", getTrending);
router.get("/search", searchMovies);
router.get("/:id", getMovieDetails);

module.exports = router;