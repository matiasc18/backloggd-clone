import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { imgPath, getRatingColor } from '../../../api/utils';

//* Render game cards
const ComingSoon = ({ games, list }) => {
  const navigate = useNavigate(); // For re-routing

  // Shortens long game tittles
  const checkLength = (title) => {
    let modifiedTitle = '';
    if (title.length >= 25) {
      modifiedTitle = title.substring(0, 25);
      modifiedTitle += ' ... ';
      return modifiedTitle;
    }
    return title;
  };

  // Display game cards
  return (
    <>
      {games && games.map((game) => (
        <div key={(game.id) + list} className="coming-soon-grid" onClick={() => navigate(`/game-details/${game.id}`)}>
          <div key={(game.id) + list + 1} className="game-card">
            <img className="game-cover" src={`${imgPath}/${game.cover.image_id}.jpg`} alt={`Cover art for ${game.name}`} />
          </div>
          <div className="coming-soon-info">
            <span className="game-title">{checkLength(game.name)}</span>
            <span className="game-release">{new Date(game.first_release_date * 1000)
              .toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short'
              })}</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default ComingSoon;