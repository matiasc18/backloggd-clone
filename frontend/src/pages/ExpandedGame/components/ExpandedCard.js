import { getRatingColor, imgPath } from "../../../api/utils";
import { FaStar, FaPlay, FaGift } from 'react-icons/fa';
import { IoLogoGameControllerA } from 'react-icons/io';
import { ImBooks } from 'react-icons/im';
import LogModal from "./LogModal";
import { useState } from "react";
import StarRating from "./StarRating";

const ExpandedCard = ({ currentGame, refetch }) => {
  const [isLogOpen, setLogOpen] = useState(false);

  return (
    <>
      <div id="game">
        <div id="card-interaction">
          <div className="ci-element game-card">
            <img className="game-cover" src={`${imgPath}/${currentGame.cover.image_id}.jpg`} alt={`Cover art for ${currentGame.name}`} />
          </div>
          <button id="add-game" className="ci-element fl-button" onClick={() => setLogOpen(true)}>Log Game</button>
          <div id="ge-buttons" className="ci-elements">
            <IoLogoGameControllerA size="5rem" />
            <FaPlay size="4rem" />
            <ImBooks size="5rem" />
            <FaGift size="4rem" />
          </div>
          <button id="add-to-list" className="ci-element fl-button">Add to list</button>
        </div>
        <div id="card-interaction">
          <StarRating />
        </div>
      </div>
      <LogModal currentGame={currentGame} isOpen={isLogOpen} onClose={() => setLogOpen(false)} />
    </>
  )
}

export default ExpandedCard;