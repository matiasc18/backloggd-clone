import React, { useEffect } from 'react';
import { imgPath } from '../api/utils';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getRatingColor } from '../api/utils';

//TODO Optimize game loading
//TODO - Fetch all games at once + iterate through locally, rather than fetch every 30 games  
//* Render grid of game cards
const Games = ({ games, list }) => {
  // For re-routing
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openGame = (game) => {
    navigate(`/games/${game.id}`);
  };

  // Display game cards + page selector (bottom)
  return (
    <>
      { games && games.map((game) => (
        <div key={(game.id) + list} className="game-card" onClick={() => openGame(game)}>
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