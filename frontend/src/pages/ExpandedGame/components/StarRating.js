import { getRatingColor, imgPath } from "../../../api/utils";
import { FaStar } from 'react-icons/fa';
import { useEffect, useState } from "react";

// 5 star rating selector component
const StarRating = ({ userGame }) => {
  const [rating, setRating] = useState(null);

  return (
    <>
      <div className="ge-rating" onChange={(e) => setRating(e.target.value)}>
        <input type="radio" name="stars" value="5"/>
        <input type="radio" name="stars" value="4.5"/>
        <input type="radio" name="stars" value="4"/>
        <input type="radio" name="stars" value="3.5"/>
        <input type="radio" name="stars" value="3"/>
        <input type="radio" name="stars" value="2.5"/>
        <input type="radio" name="stars" value="2"/>
        <input type="radio" name="stars" value="1.5"/>
        <input type="radio" name="stars" value="1"/>
        <input type="radio" name="stars" value="0.5"/>
      </div>
    </>
  )
}

export default StarRating;

//MAIN
{/* <label htmlFor="s1" className="star-label"><FaStar value="0.5" className="star" /></label>
          <input id="s1" type="radio" name="stars" />
        <label htmlFor="s2" className="star-label"><FaStar value="1" className="star" /></label>
          <input id="s2" type="radio" name="stars" />
        <label htmlFor="s3" className="star-label"><FaStar value="1.5" className="star" /></label>
          <input id="s3" type="radio" name="stars" />
        <label htmlFor="s4" className="star-label"><FaStar value="2" className="star" /></label>
          <input id="s4" type="radio" name="stars" />
        <label htmlFor="s5" className="star-label"><FaStar value="2.5" className="star" /></label>
          <input id="s5" type="radio" name="stars" />
        <label htmlFor="s6" className="star-label"><FaStar value="3" className="star" /></label>
          <input id="s6" type="radio" name="stars" />
        <label htmlFor="s7" className="star-label"><FaStar value="3.5" className="star" /></label>
          <input id="s7" type="radio" name="stars" />
        <label htmlFor="s8" className="star-label"><FaStar value="4" className="star" /></label>
          <input id="s8" type="radio" name="stars" />
        <label htmlFor="s9" className="star-label"><FaStar value="4.5" className="star" /></label>
          <input id="s9" type="radio" name="stars" />
        <label htmlFor="s10" className="star-label"><FaStar value="5" className="star" /></label>
          <input id="s10" type="radio" name="stars" /> */}

// return (
//   <>
//     <div id="ge-rating">
//       <FaStar id="star-1" className="star" size="3rem" onMouseOver={() => {handleFocus()}} />
//       <FaStar id="star-2" className="star" size="3rem" onMouseOver={() => {handleFocus()}} />
//       <FaStar id="star-3" className="star" size="3rem" onMouseOver={() => {handleFocus()}} />
//       <FaStar id="star-4" className="star" size="3rem" onMouseOver={() => {handleFocus()}} />
//       <FaStar id="star-5" className="star" size="3rem" onMouseOver={() => {handleFocus()}} />
//     </div>
//   </>
// )

// return (
//   <div className="rating">
//     <input type="radio" name="star-rating" />
//     <input type="radio" name="star-rating" />
//     <input type="radio" name="star-rating" />
//     <input type="radio" name="star-rating" />
//     <input type="radio" name="star-rating" />
//     <input type="radio" name="star-rating" />
//     <input type="radio" name="star-rating" />
//     <input type="radio" name="star-rating" />
//     <input type="radio" name="star-rating" />
//     <input type="radio" name="star-rating" />
//   </div>
// )