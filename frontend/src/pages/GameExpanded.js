import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { getGameDetails } from '../features/games/gameSlice.js';
// import { addGames } from '../features/user/userSlice';
import { imgPath, getRatingColor } from '../api/utils';
import LoadingBar from '../components/LoadingBar';
import { useQuery } from 'react-query';
import axios from '../api/axios';
import { addUserGames } from '../api/fetchUtils.js';

// Displays game information for @param: id
const GameExpanded = () => {
  const { id } = useParams();
  // data = success / error message after trying to add a game to your backlog
  const { data, refetch } = useQuery(`add-game/${id}`, () => addUserGames([id]), { enabled: false }); 
  // Fetch game details
  const { data: gameDetails, isLoading } = useQuery(`game-details/${id}`, async () => {
    const response = await axios.request({
      method: 'get',
      url: `games/${id}`
    });
    return response.data;
  });

  // Current game and background image index
  const [currentGame, setCurrentGame] = useState(null);
  const [bgIndex, setBgIndex] = useState(0);

  // Once game details are GOT(TEN), set the current game
  useEffect(() => {
    setCurrentGame(gameDetails);
  }, [gameDetails]);

  // Once the game is loaded, blur the header + nav
  useEffect(() => {
    if (currentGame) {
      // console.log(id, currentGame);
      document.getElementById('header-container').classList.add('is-active-game');
      document.getElementById('nav-links').classList.add('is-active-game');
      setBgIndex(Math.floor(Math.random() * currentGame.screenshots.length));
    }
  }, [currentGame]);

  return (
    <>
      {isLoading && <LoadingBar />}
      {currentGame && <>
        <main id="game-expanded">
          <div id="game">
            <div className="game-card">
              <img className="game-cover" src={`${imgPath}/${currentGame.cover.image_id}.jpg`} alt={`Cover art for ${currentGame.name}`} />
              {currentGame.rating && <span className="game-rating" style={getRatingColor(Math.floor(currentGame.rating))}>{Math.floor(currentGame.rating)}</span>}
            </div>
            <div className="game-details">
              <h1>{currentGame.name}</h1>
              <p className="game-date">released on <strong>{currentGame.local_date}</strong> by <strong>{currentGame.involved_companies[0].company.name}</strong></p>
              <p className="game-summary">{currentGame.summary}</p>
              <button id="add-game" onClick={refetch}>Add Game</button>
              {data && data.message && <span className="error-message">{data.message}</span>}
              {data && data.error && <span className="error-message">{data.error}</span>}
            </div>
            <section className="expanded-details">
              <p className="game-platforms">Platforms</p>
              <div id="platforms">
                {currentGame.platforms.map(platform => {
                  return <span key={(platform.id)}>{platform.name}</span>
                })}
              </div>
              <p className="game-genres">Genres</p>
              <div id="genres">
                {currentGame.genres.map(genre => {
                  return <span key={(genre.id)}>{genre.name}</span>
                })}
              </div>
            </section>
          </div>
        </main>
        <div className="gradient"></div>
        <img className="game-background" src={`${imgPath}/${currentGame.screenshots[bgIndex].image_id}.jpg`} alt={`Background for ${currentGame.name}`}></img>
      </>}
    </>
  )
}

export default GameExpanded;

  // // For redux dispatch
  // const dispatch = useDispatch();

  // const { id } = useParams();
  // const { gameDetails, isLoading } = useSelector((state) => state.game);
  // const { message } = useSelector((state) => state.user);

  // // Current game and background index
  // const [currentGame, setCurrentGame] = useState(null);
  // const [bgIndex, setBgIndex] = useState(0);

  // // Scroll to top of screen on entry
  // useEffect(() => {
  //   // window.scrollTo(0, 0);
  // }, []);

  // // Once the game is loaded, blur the header + nav
  // useEffect(() => {
  //   if (currentGame) {
  //     console.log(currentGame);
  //     document.getElementById('header-container').classList.add('is-active-game');
  //     document.getElementById('nav-links').classList.add('is-active-game');
  //     setBgIndex(Math.floor(Math.random() * currentGame.screenshots.length));
  //   }
  // }, [currentGame]);

  // // Get current game
  // useEffect(() => {
  //   // If redux state doesn't contain any game info, get it
  //   if (gameDetails.length === 0) {
  //     dispatch(getGameDetails(id));
  //   }
  //   // If redux state contains games
  //   else {
  //     let newGame = gameDetails.find((game) => game.id === Number(id));

  //     // If the current game exists in redux, display it
  //     if (newGame) {
  //       setCurrentGame(newGame);
  //     }
  //     // Otherwise, get game info
  //     else {
  //       dispatch(getGameDetails(id));
  //       // setCurrentGame(gameDetails[gameDetails.length - 1]);
  //     }
  //   }
  //   // console.log('\n');
  // }, [gameDetails, dispatch, id]);

  // // Adds game to the user's list
  // const addGame = (e) => {
  //   e.preventDefault();
  //   dispatch(addGames([currentGame.id]));
  // };