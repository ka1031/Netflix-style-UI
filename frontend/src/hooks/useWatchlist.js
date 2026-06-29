import { useState, useEffect, useCallback } from "react";

const API = "http://localhost:5000";

const useWatchlist = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };

    // Fetch the full watchlist from the server
    const fetchWatchlist = useCallback(async () => {
        try {
            const res = await fetch(`${API}/watchlist`, { headers });
            const data = await res.json();
            if (res.ok) setWatchlist(data.watchlist);
        } catch (err) {
            console.error("fetchWatchlist error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWatchlist();
    }, [fetchWatchlist]);

    // Returns true if a given tmdb_id is already in the watchlist
    const isInWatchlist = useCallback(
        (tmdb_id, media_type = "movie") =>
            watchlist.some(
                (item) => item.tmdb_id === tmdb_id && item.media_type === media_type
            ),
        [watchlist]
    );

    // Add a movie/show to the watchlist
    const addToWatchlist = useCallback(
        async ({ tmdb_id, media_type = "movie", title, poster_path }) => {
            try {
                const res = await fetch(`${API}/watchlist`, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({ tmdb_id, media_type, title, poster_path }),
                });
                const data = await res.json();
                if (res.ok) {
                    setWatchlist((prev) => [data.item, ...prev]);
                    return { success: true };
                }
                return { success: false, message: data.message };
            } catch (err) {
                console.error("addToWatchlist error:", err);
                return { success: false, message: "Server error" };
            }
        },
        [watchlist]
    );

    // Remove a movie/show from the watchlist
    const removeFromWatchlist = useCallback(
        async (tmdb_id, media_type = "movie") => {
            try {
                const res = await fetch(
                    `${API}/watchlist/${tmdb_id}?media_type=${media_type}`,
                    { method: "DELETE", headers }
                );
                if (res.ok) {
                    setWatchlist((prev) =>
                        prev.filter(
                            (item) =>
                                !(item.tmdb_id === tmdb_id && item.media_type === media_type)
                        )
                    );
                    return { success: true };
                }
            } catch (err) {
                console.error("removeFromWatchlist error:", err);
                return { success: false };
            }
        },
        []
    );

    return {
        watchlist,
        loading,
        isInWatchlist,
        addToWatchlist,
        removeFromWatchlist,
        refetch: fetchWatchlist,
    };
};

export default useWatchlist;