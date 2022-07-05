import React from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const Pagination = ({ gamesPerPage, totalGames, currentPage, updatePage }) => {

  // Get maximum page number
  const totalPages = Math.floor(totalGames / gamesPerPage);

  // TODO Fix to work properly with totalGames count
  if (currentPage < 3) {
    return (
      <div className="pagination">
        <ul className="page-list">
          {currentPage !== 1 ? <li className="page-selector" onClick={() => updatePage(currentPage - 1)}><FaChevronLeft /></li> : <></>}
          <li className="page-selector" onClick={() => updatePage(1)}>1</li>
          <li className="page-selector" onClick={() => updatePage(2)}>2</li>
          <li className="page-selector" onClick={() => updatePage(3)}>3</li>
          <li>...</li>
          <li className="page-selector" onClick={() => updatePage(totalPages)}>{totalPages}</li>
          <li className="page-selector" onClick={() => updatePage(currentPage + 1)}><FaChevronRight /></li>
        </ul>
      </div>
    )
  }

  else if (currentPage >= 3 && currentPage <= 9) {
    return (
      <div className="pagination">
        <ul className="page-list">
          <li className="page-selector" onClick={() => updatePage(currentPage - 1)}><FaChevronLeft /></li>
          <li className="page-selector" onClick={() => updatePage(1)}>1</li>
          <li>...</li>
          <li className="page-selector" onClick={() => updatePage(currentPage - 1)}>{ currentPage - 1 }</li>
          <li className="page-selector">{ currentPage }</li>
          <li className="page-selector" onClick={() => updatePage(currentPage + 1)}>{ currentPage + 1 }</li>
          <li>...</li>
          <li className="page-selector" onClick={() => updatePage(totalPages)}>{totalPages}</li>
          <li className="page-selector" onClick={() => updatePage(currentPage + 1)}><FaChevronRight /></li>
        </ul>
      </div>
    )
  }

  return (
    <div className="pagination">
      <ul className="page-list">
        <li className="page-selector" onClick={() => updatePage(currentPage - 1)}><FaChevronLeft /></li>
        <li onClick={() => updatePage(1)} className="page-selector">1</li>
        <li>...</li>
        <li onClick={() => updatePage(totalPages - 3)} className="page-selector">{ totalPages - 3}</li>
        <li onClick={() => updatePage(totalPages - 2)} className="page-selector">{ totalPages - 2}</li>
        <li onClick={() => updatePage(totalPages - 1)} className="page-selector">{ totalPages - 1}</li>
        <li onClick={() => updatePage(totalPages)} className="page-selector">{ totalPages }</li>
        {currentPage !== totalPages ? <li onClick={() => updatePage(currentPage + 1)} className="page-selector"><FaChevronRight /></li> : <></>}
      </ul>
    </div>
  )
}

export default Pagination;

// * Potential icons
// * FaAngleDown (Down, Left, Up, Right)
// * FaAngleDoubleUp (Down, Left, Up, Right)
// * FaBars
// * FaChevronRight (Down, Left, Up, Right)
// * FaEllipsisH (H, V)
// * FaPowerOff
// * FaSlidersH
// * FaSortDown (Down, Up)