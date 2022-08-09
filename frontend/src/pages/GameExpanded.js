import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGameDetails } from '../features/games/gameSlice.js';
import { addGames } from '../features/user/userSlice';
import { imgPath, getRatingColor } from '../api/utils';

// Displays game information for @param: id
function GameExpanded() {
  // For redux dispatch
  const dispatch = useDispatch();

  const { id } = useParams();
  const { gameDetails } = useSelector((state) => state.game);
  const { message } = useSelector((state) => state.user);

  // Current game and background index
  const [currentGame, setCurrentGame] = useState(null);
  const [bgIndex, setBgIndex] = useState(0);

  // Scroll to top of screen on entry
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Once the game is loaded, blur the header + nav
  useEffect(() => {
    if (currentGame) {
      document.getElementById('header-container').classList.add('is-active-game');
      document.getElementById('nav-links').classList.add('is-active-game');
      setBgIndex(Math.floor(Math.random() * currentGame.screenshots.length));
    }
  }, [currentGame]);

  // Get current game
  useEffect(() => {
    // If redux state doesn't contain any game info, get it
    if (gameDetails.length == 0) {
      dispatch(getGameDetails(id));
      setCurrentGame(gameDetails[gameDetails.length - 1]);
    }
    // If redux state contains games
    else {
      let newGame = gameDetails.find((game) => game.id == id);

      // If the current game exists in redux, display it
      if (newGame) {
        setCurrentGame(newGame);
      }
      // Otherwise, get game info
      else {
        dispatch(getGameDetails(id));
        setCurrentGame(gameDetails[gameDetails.length - 1]);
      }
    }
  }, [gameDetails, dispatch]);

  // Adds game to the user's list
  const addGame = (e) => {
    e.preventDefault();
    dispatch(addGames([currentGame]));
  };

  return (
    <>
      {currentGame && currentGame.id == id && <>
        <main id="game-expanded">
          <div id="game">
            <div className="game-card">
              <img className="game-cover" src={`${imgPath}/${currentGame.cover.image_id}.jpg`} alt={`Cover art for ${currentGame.name}`} />
              <span className="game-rating" style={getRatingColor(Math.floor(currentGame.rating))}>{Math.floor(currentGame.rating)}</span>
            </div>
            <div className="game-details">
              <h1>{currentGame.name}</h1>
              <p className="game-date">released on <strong>{currentGame.dateLocal}</strong></p>
              <p className="game-summary">{currentGame.summary}</p>
              <button id="add-game" onClick={addGame}>Add Game</button>
              {message && <span className="error-message">{message}</span>}
            </div>
          </div>
        </main>
        <div className="gradient"></div>
        <img className="game-background" src={`${imgPath}/${currentGame.screenshots[bgIndex].image_id}.jpg`}></img>
      </>}
    </>
  )
}

export default GameExpanded;