import React, { useEffect } from 'react';
import { imgPath } from '../api/utils';
import { useDispatch } from 'react-redux';
import { addGames } from '../features/games/gameSlice.js';
// import gamesStyles from '../styles/games.module.css';

//TODO Optimize game loading
//TODO - Fetch all games at once + iterate through locally, rather than fetch every 30 games  
//* Render grid of game cards
const Games = ({ games, list }) => {
  const dispatch = useDispatch();

  //? Apply correct color based on game rating
  const getRatingColor = (rating) => {
    if (rating >= 95)
      return { backgroundColor: 'gold', color: 'black' };
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

  const addGame = (game) => {
    dispatch(addGames([game]));
  };

  // Display game cards + page selector (bottom)
  return (
    <>
      { games && games.map((game) => (
        <div key={(game.id) + list} className="game-card" onClick={() => (window.location.pathname === '/games') ? addGame(game) : console.log('Cannot add game')}>
          <img className="game-cover" src={`${imgPath}/${game.cover.image_id}.jpg`} alt={`Cover art for ${game.name}`} />
          <div className="game-info">
            <span className="game-title">{game.name}</span>
            <span className="game-rating" style={getRatingColor(Math.floor(game.rating))}>{Math.floor(game.rating)}</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default Games;