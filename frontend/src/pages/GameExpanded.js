import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWindowSize, imgPath } from '../api/utils';
import { useSelector, useDispatch } from 'react-redux';
import { getGame } from '../features/games/gameSlice.js';
import { addGames } from '../features/user/userSlice';
import { getRatingColor } from '../api/utils';

function GameExpanded() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { game, isSuccess } = useSelector((state) => state.game);

  useEffect(() => {
    dispatch(getGame(id));
  }, []);

  // Once game is successfully loaded
  useEffect(() => {
    document.getElementById('header-container').classList.add('is-active-game');
    document.getElementById('nav-links').classList.add('is-active-game');
  }, [isSuccess]);

  const chooseScreenshot = () => {
    return Math.floor(Math.random() * game.screenshots.length);
  };

  const addGame = () => {
    // dispatch(addGames(game));
  };

  return (
    <>
      {game != {} && isSuccess && <>
        <main id="game-expanded">
          <div id="game">
            <div className="game-card">
              <img className="game-cover" src={`${imgPath}/${game.cover.image_id}.jpg`} alt={`Cover art for ${game.name}`} />
            </div>
            <div className="game-details">
              <h1>{game.name}</h1>
              <p className="game-date">released on <strong>{game.first_release_date}</strong></p>
              <p className="game-summary">{game.summary}</p>
              <button id="add-game" onClick={addGame}>Add Game</button>
            </div>
          </div>
        </main>
        <div className="gradient"></div>
        <img className="game-background" src={`${imgPath}/${game.screenshots[chooseScreenshot()].image_id}.jpg`}></img>
      </>}
    </>
  )
}

export default GameExpanded;