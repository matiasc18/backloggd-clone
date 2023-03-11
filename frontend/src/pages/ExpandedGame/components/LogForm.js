import { useState } from "react";
import StarRating from "./StarRating";
import { FaAngleDown } from "react-icons/fa";

const LogForm = ({ userGame }) => {
  const [rating, setRating] = useState(null);
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState('Select platform...');

  // Update sort and focus styling 
  const updateSort = (e, newSort) => {
    setOpen(false);
    if (newSort == sort)
      setSort('Select platform...');
    else
    setSort(newSort);
    // if (sort != 'Select platform...')
    //   document.getElementById(sort).classList.remove('selected-sort');
    // document.getElementById(e.target.id).classList.add('selected-sort');
  };

  return (
    <div id="log-main">
      <form id="log-settings">
        <div>
          <div id="log-rating" className="log-input-container">
            <label>Rating</label>
            <StarRating userGame={userGame} updateRating={(rating) => setRating(rating)} />
          </div>
          <div id="log-platform" className="log-input-container">
            <label htmlFor="platform">Platform</label>
            <div className="sort-dropdown">
              <button type="button" onClick={() => setOpen(!open)} className="sort-button">{sort}<FaAngleDown className="sort-arrow" /></button>
              <div className={open ? 'show dropdown-content' : 'dropdown-content'}>
                <li id="xbox-series-x" className={sort == 'Xbox Series X' ? 'selected-sort' : ''} onClick={(e) => updateSort(e, 'Xbox Series X')}>Xbox Series X</li>
                <li id="xbox-one" className={sort == 'Xbox One' ? 'selected-sort' : ''} onClick={(e) => updateSort(e, 'Xbox One')}>Xbox One</li>
                <li id="ps5" className={sort == 'PS5' ? 'selected-sort' : ''} onClick={(e) => updateSort(e, 'PS5')}>PS5</li>
                <li id="ps4" className={sort == 'PS4' ? 'selected-sort' : ''} onClick={(e) => updateSort(e, 'PS4')}>PS4</li>
                <li id="nintendo-switch" className={sort == 'Nintendo Switch' ? 'selected-sort' : ''} onClick={(e) => updateSort(e, 'Nintendo Switch')}>Nintendo Switch</li>
                <li id="pc" className={sort == 'PC' ? 'selected-sort' : ''} onClick={(e) => updateSort(e, 'PC')}>PC</li>
              </div>
            </div>
          </div>
        </div>
        <div id="log-review" className="log-input-container">
          <label>Review</label>
          <textarea id="review" name="review" rows="4" placeholder="What'd you think..."></textarea>
          <div>
            <input id="spoiler-warning" type="checkbox" name="spoiler-warning" />
            <label htmlFor="spoiler-warning">Spoiler Warning</label>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LogForm;