import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { imgPath } from '../api/utils';
import { useSelector, useDispatch } from 'react-redux';
import { getGameDetails } from '../features/games/gameSlice.js';
import { addGames } from '../features/user/userSlice';
import { getRatingColor } from '../api/utils';

function GameExpanded() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { gameDetails, isSuccess } = useSelector((state) => state.game);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getGameDetails(id));
  }, []);

  // Once game is successfully loaded
  useEffect(() => {
    if (isSuccess) {
      document.getElementById('header-container').classList.add('is-active-game');
      document.getElementById('nav-links').classList.add('is-active-game');
    }
  }, [isSuccess]);

  const chooseScreenshot = () => {
    return Math.floor(Math.random() * gameDetails.screenshots.length);
  };

  const addGame = () => {
    // dispatch(addGames(game));
  };

  return (
    <>
      {isSuccess && <>
        <main id="game-expanded">
          <div id="game">
            <div className="game-card">
              <img className="game-cover" src={`${imgPath}/${gameDetails.cover.image_id}.jpg`} alt={`Cover art for ${gameDetails.name}`} />
            </div>
            <div className="game-details">
              <h1>{gameDetails.name}</h1>
              <p className="game-date">released on <strong>{gameDetails.first_release_date}</strong></p>
              <p className="game-summary">{gameDetails.summary}</p>
              <button id="add-game" onClick={addGame}>Add Game</button>
            </div>
          </div>
        </main>
        <div className="gradient"></div>
        <img className="game-background" src={`${imgPath}/${gameDetails.screenshots[chooseScreenshot()].image_id}.jpg`}></img>
      </>}
    </>
  )
}

export default GameExpanded;