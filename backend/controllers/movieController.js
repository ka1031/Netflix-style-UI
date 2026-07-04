const TMDB_BASE = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

// GET /movies/trending
const getTrending = async (req, res) => {
    try {
        const response = await fetch(`${TMDB_BASE}/trending/movie/day?api_key=${API_KEY}`);
        const data = await response.json();

        const movies = data.results.map((movie) => ({
            tmdb_id: movie.id,
            name: movie.title || movie.name,
            image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
            poster_path: movie.poster_path,
        }));

        res.json({ success: true, movies });
    } catch (err) {
        console.error("getTrending error:", err);
        res.status(500).json({ success: false, message: "Failed to fetch trending movies" });
    }
};

// GET /movies/search?query=...
const searchMovies = async (req, res) => {
    const { query } = req.query;

    if (!query || !query.trim()) {
        return res.status(400).json({ success: false, message: "Query is required" });
    }

    try {
        const response = await fetch(
            `${TMDB_BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );
        const data = await response.json();

        const movies = data.results.map((movie) => ({
            tmdb_id: movie.id,
            name: movie.title || movie.name,
            image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
        }));

        res.json({ success: true, movies });
    } catch (err) {
        console.error("searchMovies error:", err);
        res.status(500).json({ success: false, message: "Search failed" });
    }
};

// GET /movies/:id
const getMovieDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await fetch(
            `${TMDB_BASE}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
        );

        if (response.status === 404) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }

        const data = await response.json();

        res.json({
            success: true,
            movie: {
                tmdb_id: data.id,
                title: data.title,
                overview: data.overview,
                poster_path: data.poster_path,
                backdrop_path: data.backdrop_path,
                release_date: data.release_date,
                runtime: data.runtime,
                vote_average: data.vote_average,
                genres: data.genres,
                cast: data.credits?.cast?.slice(0, 10).map((c) => ({
                    name: c.name,
                    character: c.character,
                })),
            },
        });
    } catch (err) {
        console.error("getMovieDetails error:", err);
        res.status(500).json({ success: false, message: "Failed to fetch movie details" });
    }
};

module.exports = { getTrending, searchMovies, getMovieDetails };