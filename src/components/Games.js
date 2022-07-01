import React, { useState, useEffect } from 'react';
import { flDefault, queryBuilder, defaultQuery } from '../services';
import axios from 'axios';

const Games = () => { 
  // IGDB images url
  const imgPath = 'https://images.igdb.com/igdb/image/upload/t_1080p';
  const [games, setGames] = useState([]);
  // Axios request config
  const config = {
    ...flDefault,
    method: 'post',
    url: '/games',
    data: queryBuilder(defaultQuery)
  };

  // Runs when component first loads
  useEffect(() => {

    // Gets games from localhost/games (IGDB/games)
    const fetchGames = async () => {
    
      try {
        const response = await axios(config);
        const json = response.data;

        // If there is a response, update state
        if (response.status === 200) {
          setGames(json);
        }
      } catch(err) {
        console.error(err);
      }
    }

    fetchGames();
  }, []);

  const getRatingColor = (rating) => {
    if (rating >= 95)
      return { color: 'gold' };
    else if (rating >= 90)
      return { color: 'lime' };
    else if (rating >= 80)
      return { color: 'limegreen' };
    else if (rating >= 70)
      return { color: 'yellow' };
    else if (rating >= 60)
      return { color: 'orange' };
    else
      return { color: 'crimson' };
  }

  return (
    <div className="games-container">
      {games && games.map((game) => (
        <div key={game.id} className="game">
          <img src={`${imgPath}/${game.cover.image_id}.jpg`} alt={`Cover art for ${game.name}`}/>
          <div className="game-info">
            <span className="game-title">{game.name}</span>
            <span className="game-rating" style={getRatingColor(Math.floor(game.rating))}>{Math.floor(game.rating)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Games;