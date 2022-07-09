import React from 'react';
import { Link } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';
import '../styles/header.css';

const Header = () => {
  return (
    <div id="header-container">
      <header>
        <Link to="/" id="header-title"><code>{`<frontloggd>`}</code></Link>
        <FaPowerOff size="1.5em" className="menu-button" />
        <nav className="nav-links">
          <Link className="header-link" to="/games">Games</Link>
          <Link className="header-link" to="/login">Log In</Link>
          <Link className="header-link" to="/signup">Sign Up</Link>
        </nav>
      </header>
    </div>
  )
}

export default Header;

// * Potential icons
// * FaAngleDown (Down, Left, Up, Right)
// * FaAngleDoubleUp (Down, Left, Up, Right)
// * FaBars
// * FaChevronRight (Down, Left, Up, Right)
// * FaEllipsisH (H, V)
// * FaPowerOff
// * FaSlidersH
// * FaSortDown (Down, Up)