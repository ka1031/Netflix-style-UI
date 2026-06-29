const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
} = require("../controllers/watchlistController");

// All watchlist routes require a valid JWT
router.use(authMiddleware);

router.get("/", getWatchlist);
router.post("/", addToWatchlist);
router.delete("/:tmdb_id", removeFromWatchlist);

module.exports = router;