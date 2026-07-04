import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "./styles/TitleCards.css";
import useWatchlist from "./hooks/useWatchlist";

const API = "http://localhost:5000";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get("q") || "";
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);
        fetch(`${API}/movies/search?query=${encodeURIComponent(query)}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setResults(data.movies);
            })
            .catch((err) => console.error("search error:", err))
            .finally(() => setLoading(false));
    }, [query]);

    const handleWatchlistToggle = async (e, card) => {
        e.stopPropagation();
        const inList = isInWatchlist(card.tmdb_id, "movie");
        if (inList) {
            await removeFromWatchlist(card.tmdb_id, "movie");
        } else {
            await addToWatchlist({
                tmdb_id: card.tmdb_id,
                media_type: "movie",
                title: card.name,
                poster_path: card.poster_path,
            });
        }
    };

    return (
        <div className="title-cards">
            <h2>{query ? `Results for "${query}"` : "Search"}</h2>

            {loading && <p>Loading...</p>}
            {!loading && query && results.length === 0 && <p>No results found.</p>}

            <div className="card-list">
                {results.map((card, index) => {
                    const inList = isInWatchlist(card.tmdb_id, "movie");
                    return (
                        <div className="card" key={card.tmdb_id} onClick={() => navigate(`/movie/${card.tmdb_id}`)}>
                            <div className="card-img-wrapper">
                                {card.image ? (
                                    <img src={card.image} alt={card.name} />
                                ) : (
                                    <div className="mylist-no-img">{card.name}</div>
                                )}
                                <button
                                    className={`watchlist-btn ${inList ? "in-list" : ""}`}
                                    onClick={(e) => handleWatchlistToggle(e, card)}
                                    title={inList ? "Remove from My List" : "Add to My List"}
                                >
                                    {inList ? "✓" : "+"}
                                </button>
                            </div>
                            <p>{card.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SearchResults;