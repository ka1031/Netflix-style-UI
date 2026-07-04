import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/TitleCards.css";
import { fetchPopularMovies } from "./assets/cards/cards_data.js";
import useWatchlist from "./hooks/useWatchlist";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const TitleCards = () => {
  const [cardsData, setCardsData] = useState([]);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPopularMovies().then((data) => setCardsData(data));
  }, []);

  const handleWatchlistToggle = async (e, card) => {
    // Stop click from bubbling to the card itself
    e.stopPropagation();

    const inList = isInWatchlist(card.tmdb_id, "movie");

    if (inList) {
      await removeFromWatchlist(card.tmdb_id, "movie");
    } else {
      await addToWatchlist({
        tmdb_id: card.tmdb_id,
        media_type: "movie",
        title: card.name,
        poster_path: card.poster_path, // raw path from TMDB e.g. "/abc123.jpg"
      });
    }
  };

  return (
    <div className="title-cards">
      <h2>Popular on Netflix</h2>
      <div className="card-list">
        {cardsData.map((card, index) => {
          const inList = isInWatchlist(card.tmdb_id, "movie");
          return (
            <div className="card" key={index} onClick={() => navigate(`/movie/${card.tmdb_id}`)}>
              <div className="card-img-wrapper">
                <img src={card.image} alt={card.name} />
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

export default TitleCards;