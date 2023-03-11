import { useState } from "react";
import ReactDom from "react-dom";
import { imgPath } from "../../../api/utils";
import LogForm from "./LogForm";

const LogModal = ({ currentGame, isOpen, onClose }) => {
  const [isJournal, setIsJournal] = useState(false);
  const [isStatus, setIsStatus] = useState(false);

  if (!isOpen) return null;

  return ReactDom.createPortal(
    <>
      <div id="modal-overlay">
        <div id="log-modal">
          <div id="modal-nav">
            <span className={isStatus ? '' : 'active'} onClick={() => setIsStatus(false)}>Log</span>
            <span className={isStatus ? 'active' : ''} onClick={() => setIsStatus(true)}>Status</span>
          </div>
          <div id="modal-body">
            <div>
              <h2 className="section-title">{currentGame.name}</h2>
              <span>{currentGame.local_date.substr(-4)}</span>
            </div>
            <hr />
            <div id="game-log">
              <div id="log-side">
                <div className="ci-element game-card">
                  <img className="game-cover" src={`${imgPath}/${currentGame.cover.image_id}.jpg`} alt={`Cover art for ${currentGame.name}`} />
                </div>
                <button className={isJournal ? 'fl-button' : 'fl-button active'} onClick={() => setIsJournal(false)}>Details </button>
                <button className={isJournal ? 'fl-button active' : 'fl-button'} onClick={() => setIsJournal(true)}>Journal</button>
              </div>
              <LogForm />
            </div>
            <button className="fl-button" onClick={onClose}>Close Log </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default LogModal;