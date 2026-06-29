const pool = require("../db");

// GET /watchlist
const getWatchlist = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, tmdb_id, media_type, title, poster_path, added_at
       FROM watchlist
       WHERE user_id = $1
       ORDER BY added_at DESC`,
            [req.user.id]
        );
        res.json({ success: true, watchlist: result.rows });
    } catch (err) {
        console.error("getWatchlist error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// POST /watchlist
// body: { tmdb_id, media_type, title, poster_path }
const addToWatchlist = async (req, res) => {
    const { tmdb_id, media_type = "movie", title, poster_path } = req.body;

    if (!tmdb_id || !title) {
        return res.status(400).json({ message: "tmdb_id and title are required" });
    }

    try {
        const result = await pool.query(
            `INSERT INTO watchlist (user_id, tmdb_id, media_type, title, poster_path)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_id, tmdb_id, media_type) DO NOTHING
       RETURNING *`,
            [req.user.id, tmdb_id, media_type, title, poster_path]
        );

        if (result.rows.length === 0) {
            return res.status(409).json({ message: "Already in watchlist" });
        }

        res.status(201).json({ success: true, item: result.rows[0] });
    } catch (err) {
        console.error("addToWatchlist error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// DELETE /watchlist/:tmdb_id?media_type=movie
const removeFromWatchlist = async (req, res) => {
    const { tmdb_id } = req.params;
    const { media_type = "movie" } = req.query;

    try {
        const result = await pool.query(
            `DELETE FROM watchlist
       WHERE user_id = $1 AND tmdb_id = $2 AND media_type = $3
       RETURNING id`,
            [req.user.id, tmdb_id, media_type]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Item not found in watchlist" });
        }

        res.json({ success: true, message: "Removed from watchlist" });
    } catch (err) {
        console.error("removeFromWatchlist error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getWatchlist, addToWatchlist, removeFromWatchlist };