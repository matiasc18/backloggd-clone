import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { imgPath } from '../api/utils';
import { useSelector, useDispatch } from 'react-redux';
import { getGameDetails, reset } from '../features/games/gameSlice.js';
import { addGames } from '../features/user/userSlice';
import { getRatingColor } from '../api/utils';

function GameExpanded() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { gameDetails } = useSelector((state) => state.game);
  const { message } = useSelector((state) => state.user);

  const [currentGame, setCurrentGame] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (currentGame) {
      document.getElementById('header-container').classList.add('is-active-game');
      document.getElementById('nav-links').classList.add('is-active-game');
      console.log(currentGame);
    }
  }, [currentGame]);

  // Once game is successfully loaded
  useEffect(() => {
    if (gameDetails.length == 0) {
      dispatch(getGameDetails(id));
      setCurrentGame(gameDetails[gameDetails.length - 1]);
    }
    else {
      let newGame = gameDetails.find((game) => game.id == id);

      if (newGame) {
        setCurrentGame(newGame);
      }
      else {
        dispatch(getGameDetails(id));
        setCurrentGame(gameDetails[gameDetails.length - 1]);
      }
    }
    }, [gameDetails, dispatch]);

  useEffect(() => {
    if (message)
      console.log(message);
  }, [message]);

  const chooseScreenshot = () => {
    return Math.floor(Math.random() * currentGame.screenshots.length);
  };

  const addGame = () => {
    dispatch(addGames([currentGame]));
  };

  return (
    <>
      {currentGame && currentGame.id == id && <>
        <main id="game-expanded">
          <div id="game">
            <div className="game-card">
              <img className="game-cover" src={`${imgPath}/${currentGame.cover.image_id}.jpg`} alt={`Cover art for ${currentGame.name}`} />
            </div>
            <div className="game-details">
              <h1>{currentGame.name}</h1>
              <p className="game-date">released on <strong>{currentGame.dateLocal}</strong></p>
              <p className="game-summary">{currentGame.summary}</p>
              <button id="add-game" onClick={addGame}>Add Game</button>
              {message && <><br/><span className="error-message">{message}</span></>}
            </div>
          </div>
        </main>
        <div className="gradient"></div>
        <img className="game-background" src={`${imgPath}/${currentGame.screenshots[chooseScreenshot()].image_id}.jpg`}></img>
      </>}
    </>
  )
}

export default GameExpanded;