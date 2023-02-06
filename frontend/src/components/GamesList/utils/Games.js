import { useNavigate } from 'react-router-dom';
import { imgPath, getRatingColor } from '../../../api/utils';

//* Render game cards
const Games = ({ games, list }) => {
  const navigate = useNavigate(); // For re-routing

  // Shortens long game tittles
  const checkLength = (title) => {
    let modifiedTitle = '';
    if (title.length >= 30) {
      modifiedTitle = title.substring(0, 16);
      modifiedTitle += ' ... ';
      modifiedTitle += title.substring(title.length - 10);
      return modifiedTitle;
    }
    return title;
  };

  // Display game cards
  return (
    <>
      {games && games.map((game) => (
        <div key={(game.id) + list} className="game-card" onClick={() => navigate(`/game-details/${game.id}`)}>
          <img className="game-cover" src={`${imgPath}/${game.cover.image_id}.jpg`} alt={`Cover art for ${game.name}`} />
          <div className="game-info">
            <span className="game-title">{checkLength(game.name)}</span>
            {game.rating && <span className="game-rating" style={getRatingColor(Math.floor(game.rating))}>{Math.floor(game.rating)}</span>}
          </div>
        </div>
      ))}
    </>
  )
}

export default Games;