import React from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const Pagination = ({ gamesPerPage, totalGames, currentPage, updatePage }) => {
  // Get maximum page number
  const totalPages = Math.ceil(totalGames / gamesPerPage);
  // JSX to be inserted (array of page selector items)
  const insertion = [];

  //* List start
  //? Apperance when on pages 1 thru 3
  if (currentPage <= 3) {
    for (let i = 1; i <= 4; i++) {
      if (i === currentPage)
        insertion.push(<li key={i} className="page-selector is-active">{i}</li>);
      else
        insertion.push(<li key={i} className="page-selector" onClick={() => updatePage(i)}>{i}</li>);
    }

    return (
      <div className="pagination">
        <ul className="page-list">
          {currentPage !== 1 ? <li className="page-arrow" onClick={() => updatePage(currentPage - 1)}><FaChevronLeft /></li> : <></>}
          {insertion}
          <li className="page-dots"></li>
          <li className="page-selector" onClick={() => updatePage(totalPages)}>{totalPages}</li>
          <li className="page-arrow" onClick={() => updatePage(currentPage + 1)}><FaChevronRight /></li>
        </ul>
      </div>
    )
  }

  //* Mid list
  //? Apperance when on pages 4 thru (total - 3))
  else if (currentPage >= 4 && currentPage <= totalPages - 3) {
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i === currentPage)
        insertion.push(<li key={i} className="page-selector is-active">{i}</li>);
      else
        insertion.push(<li key={i} className="page-selector" onClick={() => updatePage(i)}>{i}</li>);
    }

    return (
      <div className="pagination">
        <ul className="page-list">
          <li className="page-arrow" onClick={() => updatePage(currentPage - 1)}><FaChevronLeft /></li>
          <li className="page-selector" onClick={() => updatePage(1)}>1</li>
          <li className="page-dots"></li>
          {insertion}
          <li className="page-dots"></li>
          <li className="page-selector" onClick={() => updatePage(totalPages)}>{totalPages}</li>
          <li className="page-arrow" onClick={() => updatePage(currentPage + 1)}><FaChevronRight /></li>
        </ul>
      </div>
    )
  }

  //* List ending
  //? Apperance when on pages (total - 2) thru total pages
  else {
    for (let i = totalPages - 3; i <= totalPages; i++) {
      if (i === currentPage)
        insertion.push(<li key={i} className="page-selector is-active">{i}</li>);
      else
        insertion.push(<li key={i} className="page-selector" onClick={() => updatePage(i)}>{i}</li>);
    }

    return (
      <div className="pagination">
        <ul className="page-list">
          <li className="page-arrow" onClick={() => updatePage(currentPage - 1)}><FaChevronLeft /></li>
          <li onClick={() => updatePage(1)} className="page-selector">1</li>
          <li className="page-dots"></li>
          {insertion}
          {currentPage !== totalPages ? <li onClick={() => updatePage(currentPage + 1)} className="page-arrow"><FaChevronRight /></li> : <></>}
        </ul>
      </div>
    )
  }
}

export default Pagination;