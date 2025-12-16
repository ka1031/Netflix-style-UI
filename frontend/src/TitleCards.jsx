import React, { useEffect, useState } from 'react'
import './styles/TitleCards.css'
import { fetchPopularMovies } from './assets/cards/cards_data.js'

const TitleCards = () => {
  const [cardsData, setCardsData] = useState([])

  useEffect(() => {
    fetchPopularMovies().then(data => {
      console.log(data)
      setCardsData(data)
    })
  }, [])


  console.log(cardsData);

  return (
    <div className='title-cards'>
      <h2>Popular on Netflix</h2>
      <div className='card-list'>
        {cardsData.map((card, index) => (
          <div className='card' key={index}>
            <img src={card.image} alt={card.name} />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TitleCards
