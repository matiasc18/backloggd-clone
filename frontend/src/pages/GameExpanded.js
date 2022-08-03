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
  const { game, isSuccess } = useSelector((state) => state.game);

  useEffect(() => {
    dispatch(getGame(id));
  }, []);

  useEffect(() => {
    const header = document.getElementById('header-container');
    header.classList.add('is-active-game');
    console.log(header);
  }, [isSuccess]);

  const chooseScreenshot = () => {
    return Math.floor(Math.random() * game.screenshots.length);
  };

  const addGame = () => {
    dispatch(addGames([game]));
  };

  return (
    <>
      {isSuccess && <>
        <main id="game-expanded">
          <div id="game">
            <div className="game-card">
              <img className="game-cover" src={`${imgPath}/${game.cover.image_id}.jpg`} alt={`Cover art for ${game.name}`} />
            </div>
            <div className="game-details">
              <h1>{game.name}</h1>
              <p className="game-date">released on <strong>{game.first_release_date}</strong></p>
              <span id="add-game" onClick={addGame}>Add Game</span>
              <p className="game-summary">{game.summary}</p>
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