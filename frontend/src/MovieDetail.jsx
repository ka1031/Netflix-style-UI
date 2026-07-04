import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/MovieDetail.css";
import useWatchlist from "./hooks/useWatchlist";

const API = "http://localhost:5000";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const TMDB_BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`${API}/movies/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setMovie(data.movie);
                } else {
                    setError(data.message || "Movie not found");
                }
            })
            .catch((err) => {
                console.error("fetch movie details error:", err);
                setError("Failed to load movie");
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="movie-detail-status">Loading...</div>;
    if (error) return <div className="movie-detail-status">{error}</div>;
    if (!movie) return null;

    const inList = isInWatchlist(movie.tmdb_id, "movie");

    const handleWatchlistToggle = async () => {
        if (inList) {
            await removeFromWatchlist(movie.tmdb_id, "movie");
        } else {
            await addToWatchlist({
                tmdb_id: movie.tmdb_id,
                media_type: "movie",
                title: movie.title,
                poster_path: movie.poster_path,
            });
        }
    };

    return (
        <div className="movie-detail">
            {movie.backdrop_path && (
                <div
                    className="movie-detail-backdrop"
                    style={{ backgroundImage: `url(${TMDB_BACKDROP_BASE}${movie.backdrop_path})` }}
                />
            )}

            <button className="movie-detail-back" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="movie-detail-content">
                <div className="movie-detail-poster">
                    {movie.poster_path ? (
                        <img src={`${TMDB_IMAGE_BASE}${movie.poster_path}`} alt={movie.title} />
                    ) : (
                        <div className="movie-detail-no-poster">{movie.title}</div>
                    )}
                </div>

                <div className="movie-detail-info">
                    <h1>{movie.title}</h1>

                    <div className="movie-detail-meta">
                        {movie.release_date && <span>{movie.release_date.slice(0, 4)}</span>}
                        {movie.runtime ? <span>{movie.runtime} min</span> : null}
                        {movie.vote_average ? <span>★ {movie.vote_average.toFixed(1)}</span> : null}
                    </div>

                    {movie.genres?.length > 0 && (
                        <div className="movie-detail-genres">
                            {movie.genres.map((g) => (
                                <span key={g.id} className="genre-tag">{g.name}</span>
                            ))}
                        </div>
                    )}

                    <p className="movie-detail-overview">{movie.overview}</p>

                    <button
                        className={`watchlist-toggle-btn ${inList ? "in-list" : ""}`}
                        onClick={handleWatchlistToggle}
                    >
                        {inList ? "✓ In My List" : "+ Add to My List"}
                    </button>

                    {movie.cast?.length > 0 && (
                        <div className="movie-detail-cast">
                            <h3>Cast</h3>
                            <div className="cast-list">
                                {movie.cast.map((c, i) => (
                                    <div key={i} className="cast-member">
                                        <p className="cast-name">{c.name}</p>
                                        <p className="cast-character">{c.character}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;