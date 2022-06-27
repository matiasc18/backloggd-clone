import React, { useState, useEffect, useMemo } from 'react';
import { flDefault, queryBuilder, defaultQuery } from '../services';
import axios from 'axios';

// TODO 1. Axios: request games from localhost/games
// TODO 3. Display games from response
// TODO 2. Add Search field
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
        if (response.status == 200) {
          setGames(json);
        }
      } catch(err) {
        console.error(err);
      }
    }

    fetchGames();
  }, []);

  return (
    <>
      {games && games.map((game) => (
        <div key={game.id} className="game">
          <img src={`${imgPath}/${game.cover.image_id}.jpg`}/>
          <div className="game-info">
            <h3 className="game-title">{game.name}</h3>
            <span className="game-rating">{Math.floor(game.rating)}</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default Games;