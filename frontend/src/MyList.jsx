import React from "react";
import { useNavigate } from "react-router-dom";
import useWatchlist from "./hooks/useWatchlist";
import "./styles/MyList.css";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const MyList = () => {
    const navigate = useNavigate();
    const { watchlist, loading, removeFromWatchlist } = useWatchlist();

    if (loading) {
        return (
            <div className="mylist">
                <h2>My List</h2>
                <p className="mylist-empty">Loading...</p>
            </div>
        );
    }

    if (watchlist.length === 0) {
        return (
            <div className="mylist">
                <h2>My List</h2>
                <p className="mylist-empty">
                    You haven't added anything yet. Browse and hit <strong>+</strong> on
                    any title.
                </p>
            </div>
        );
    }

    return (
        <div className="mylist">
            <h2>My List</h2>
            <div className="mylist-grid">
                {watchlist.map((item) => (
                    <div className="mylist-card" key={item.id} onClick={() => navigate(`/movie/${item.tmdb_id}`)}>
                        <div className="mylist-img-wrapper">
                            {item.poster_path ? (
                                <img
                                    src={`${TMDB_IMAGE_BASE}${item.poster_path}`}
                                    alt={item.title}
                                />
                            ) : (
                                <div className="mylist-no-img">{item.title}</div>
                            )}
                            <button
                                className="mylist-remove-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFromWatchlist(item.tmdb_id, item.media_type);
                                }}
                                title="Remove from My List"
                            >
                                ✕
                            </button>
                        </div>
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyList;