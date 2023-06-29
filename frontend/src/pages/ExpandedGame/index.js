import { useEffect, useState, useMemo } from 'react';
import { imgPath, getRatingColor } from '../../api/utils';
import { addGame } from './utils/addGame';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import LoadingBar from '../../components/LoadingBar';
import axios from '../../api/axios';
import ExpandedCard from './components/ExpandedCard';

// Displays game information for @param: id
const ExpandedGame = () => {
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
      setBgIndex(Math.floor(Math.random() * currentGame.screenshots.length));
    }
  }, [currentGame]);

  return (
    <>
      {isLoading && <LoadingBar />}
      {currentGame && <>
        <main id="ge-container">
          <div id="game-expanded">
            <ExpandedCard currentGame={currentGame} refetch={refetch} />
            <div className="game-details">
              <h1>{currentGame.name}</h1>
              <span className="game-rating" style={getRatingColor(Math.floor(currentGame.rating))}>{Math.floor(currentGame.rating)}</span>
              <p className="game-date">released on <strong>{currentGame.local_date}</strong> by <strong>{currentGame.involved_companies[0].company.name}</strong></p>
              <p className="game-summary">{currentGame.summary}</p>
              {data && data.message && <span className="error-message">{data.message}</span>}
              {data && data.error && <span className="error-message">{data.error}</span>}
              <hr />
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
          <div id="poop"></div>
        </main>
        <div className="gradient"></div>
        <img className="game-background" src={`${imgPath}/${currentGame.screenshots[bgIndex].image_id}.jpg`} alt={`Background for ${currentGame.name}`}></img>
      </>}
    </>
  )
}

export default ExpandedGame;