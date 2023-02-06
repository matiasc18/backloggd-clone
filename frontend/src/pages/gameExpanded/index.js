import { useEffect, useState, useMemo } from 'react';
import { imgPath, getRatingColor } from '../../api/utils';
import { addGame } from './utils/addGame';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import LoadingBar from '../../components/LoadingBar/index.js';
import axios from '../../api/axios';

// Displays game information for @param: id
const GameExpanded = () => {
  const { id } = useParams();
  const { data, refetch } = useQuery(`add-game/${id}`, // returns success || error message
    () => addGame([id]), { enabled: false });
  const { data: gameDetails, isLoading } = useQuery(`game-details/${id}`, async () => { // Fetch game's information
    const response = await axios.request({
      method: 'get',
      url: `games/${id}`
    });
    return response.data;
  });

  // Current game and background image index
  const currentGame = useMemo(() => { if (gameDetails) return gameDetails; }, [gameDetails]);
  const [bgIndex, setBgIndex] = useState(0);

  // Once the game is loaded, blur the header + nav
  useEffect(() => {
    if (currentGame) {
      document.getElementById('header-container').classList.add('is-active-game');
      document.getElementById('nav-links').classList.add('is-active-game');
      setBgIndex(Math.floor(Math.random() * currentGame.screenshots.length));
    }
    console.log(currentGame);
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
              <button id="add-game" onClick={(refetch)}>Add Game</button>
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