import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { FaPowerOff } from 'react-icons/fa';
import '../styles/header.css';

//TODO Change links to a ul with li of Link
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <div id="header-container">
      <header>
        <Link to="/" id="header-title">frontloggd</Link>
        <FaPowerOff size="1.5em" className="menu-button" onClick={() => setShowMobileMenu(!showMobileMenu)}/>
        {/* If the menu is active, display mobile menu nav */}
        { showMobileMenu && <div className="menu-mask" onClick={() => setShowMobileMenu(!showMobileMenu)}></div>}
        <nav className={showMobileMenu ? "nav-links isActive" : "nav-links"}>
          {user ? (
            <>
              <Link className="nav-link" to="/games">Games</Link>
              <button className="logout-button" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/games">Games</Link>
              <Link className="nav-link" to="/login">Log In</Link>
              <Link className="nav-link" to="/signup">Sign Up</Link>
            </>)}
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

// {/* If the menu is active, display mobile menu nav */}
// { showMobileMenu && <div className="menu-mask" onClick={() => setShowMobileMenu(!showMobileMenu)}></div>}
// <nav className={showMobileMenu ? "nav-links isActive" : "nav-links"}>
//   {user ? (
//     <>
//       <Link className="header-link" to="/games">Games</Link>
//       <button className="logout-button" onClick={onLogout}>Logout</button>
//     </>
//   ) : (
//     <>
//       <Link className="header-link" to="/games">Games</Link>
//       <Link className="header-link" to="/login">Log In</Link>
//       <Link className="header-link" to="/signup">Sign Up</Link>
//     </>)}
// </nav>