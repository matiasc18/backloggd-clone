import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { FaPowerOff } from 'react-icons/fa';
import { getWindowSize } from '../api/utils';
import '../styles/header.css';

//TODO Change links to a ul with li of Link
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Keeps track of the device's current window size
  const [windowSize, setWindowSize] = useState(getWindowSize());

  // Add event listener (on initial render) for screen size change 
  // To remove hamburger menu if phone is rotated
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    }

    // resize is fired whenever the window has been resized
    window.addEventListener('resize', handleWindowResize);

    // Remove event listener when component dismounts
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  }, []);

  useEffect(() => {
    if (windowSize >= 480 && showMobileMenu)
    {
      toggleMenu();
    }
  }, [windowSize])

  // Logout, reset user state, close the menu (if on mobile), and go to homepage
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    setShowMobileMenu(false);
    navigate('/');
  };

  // Opens/closes mobile hamburger menu
  const toggleMenu = () => {
    // Current page to be translated left when menu opens
    const currentPage = document.getElementById('header-container').nextSibling;
    if (!showMobileMenu) {
      setShowMobileMenu(true);

      // Removes page scrolling capability
      document.body.style.position = 'fixed';

      // Translates the current page left
      currentPage.style.transition = '0.3s';
      currentPage.style.transform = 'translateX(-53%)';
    // Returns the page back to normal after closing menu
    } else {
        setShowMobileMenu(false);
        document.body.style.position = 'static';
        currentPage.style.transform = 'translateX(0)';
    }
  };

  return (
    <div id="header-container">
      <header>
        <Link to="/" id="header-title">frontloggd</Link>
        <FaPowerOff size="1.5em" className="menu-button" onClick={ toggleMenu }/>
        {/* If the menu is active, display mobile menu version of nav */}
        { showMobileMenu && <div className="menu-mask" onClick={ toggleMenu }></div>}
        <nav className={ showMobileMenu ? "nav-links isActive" : "nav-links"}>
          { user ? (
            // If the user exists, show the logout button
            <>
              <Link className="nav-link" to="/games" onClick={ toggleMenu }>Games</Link>
              <button className="logout-button" onClick={ onLogout }>Logout</button>
            </>
          ) : (
            // Otherwise, show normal nav
            <>
              <Link className="nav-link" to="/games" onClick={ toggleMenu }>Games</Link>
              <Link className="nav-link" to="/login" onClick={ toggleMenu }>Log In</Link>
              <Link className="nav-link" to="/signup" onClick={ toggleMenu }>Sign Up</Link>
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