import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { imgPath } from '../api/utils';
import { useSelector, useDispatch } from 'react-redux';
import { getGame } from '../features/games/gameSlice.js';
import { addGames } from '../features/user/userSlice';
import { getRatingColor } from '../api/utils';

function GameExpanded() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { game, isLoading, isSuccess } = useSelector((state) => state.game);

  useEffect(() => {
    dispatch(getGame(id));
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const header = document.getElementById('header-container');
      header.style.background = 'transparent';
      console.log(game.cover);
      console.log(isLoading);
    }
  }, [game]);

  const chooseScreenshot = () => {
    return Math.floor(Math.random() * game.screenshots.length);
  };

  const addGame = () => {
    dispatch(addGames([game]));
  };

  return (
    <>
      {isSuccess && 
        <div id="game-expanded">
          <div id="game">
            <div className="game-card">
              <img className="game-cover" src={`${imgPath}/${game.cover.image_id}.jpg`} alt={`Cover art for ${game.name}`} />
              <div className="game-info">
                <span className="game-title">{game.name}</span>
                <span className="game-rating" style={getRatingColor(Math.floor(game.rating))}>{Math.floor(game.rating)}</span>
              </div>
            </div>
          <div className="game-details">
            <h1>{game.name}</h1>
            <p className="game-date">released on <strong>{game.first_release_date}</strong></p>
            <span id="add-game" onClick={addGame}>Add Game</span>
            <p className="game-summary">{game.summary}</p>
          </div>
          </div>
          <img className="game-background" src={`${imgPath}/${game.screenshots[chooseScreenshot()].image_id}.jpg`}></img>
          <div className="gradient"></div>
        </div>
      }
    </>
  )
}

export default GameExpanded;