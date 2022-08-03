import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { reset as resetGame } from '../features/games/gameSlice.js';
import { FaBars } from 'react-icons/fa';
import { getWindowSize } from '../api/utils';
import e from 'cors';

//TODO Change links to a ul with li of Link
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const [isGamePage, setIsGamePage] = useState(false);
  const maxMobileWidth = 480;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Keeps track of the device's current window size
  const [windowSize, setWindowSize] = useState(getWindowSize());

  // Add event listener for screen size change 
  // To remove hamburger menu if phone is rotated
  useEffect(() => {
    const menu = document.getElementById('nav-links');
    if (menu.classList.contains === 'is-active')
      menu.classList.remove('is-active');

    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    }

    //? resize is fired whenever the window has been resized
    window.addEventListener('resize', handleWindowResize);

    // Remove event listener when component dismounts
    return () => { window.removeEventListener('resize', handleWindowResize); }
  }, []);

  // Close hamburger menu if its open while rotating phone device
  useEffect((showMobileMenu, toggleMenu) => {
    if (windowSize.innerWidth >= maxMobileWidth && showMobileMenu) {
      toggleMenu();
    }
  }, [windowSize]);

  useEffect(() => {
    const menu = document.getElementById('nav-links');
    if ((/^\/games\/[0-9]+$/).test(window.location.pathname))
      menu.classList.add('is-active-game');

    if (showMobileMenu)
      menu.classList.add('is-active');
    else
      menu.classList.remove('is-active');
    setIsGamePage(true);
  }, [showMobileMenu]);

  // Logout, reset user state, close the menu (if on mobile), and go to homepage
  const onLogout = () => {
    setShowMobileMenu(false);
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  // Opens/closes mobile hamburger menu
  const toggleMenu = () => {
    console.log(document.getElementById('nav-links'));
    if (window.innerWidth < maxMobileWidth) {
      // Current page to be translated left when menu opens
      const currentPage = document.getElementById('App').children.item(1);
      console.log(currentPage);
      if (!showMobileMenu) {
        setShowMobileMenu(true);

        // Removes page scrolling capability
        document.body.style.position = 'fixed';

        // Translates the current page left
        currentPage.style.transition = '0.56s';
        currentPage.style.transform = 'translateX(-43%)';
        // Returns the page back to normal after closing menu
      } else {
        setShowMobileMenu(false);
        document.body.style.position = 'static';
        currentPage.style.transform = 'translateX(0)';
      }
    }
  };

  const resetHeader = () => {
    document.getElementById('header-container').classList.remove('is-active');
    document.getElementById('header-container').classList.remove('is-active-game');
    document.getElementById('nav-links').classList.remove('is-active-game');
    document.getElementById('nav-links').classList.remove('is-active');
    dispatch(resetGame());
    setIsGamePage(false);
  };

  return (
    <>
      <div id="header-container">
        <header>
          <Link to="/" id="header-title" onClick={resetHeader}>frontloggd</Link>
          <FaBars size="1.75em" className="menu-button" style={showMobileMenu ? { opacity: 0.7 } : {}} onClick={toggleMenu} />
          {/* If the menu is active, display mobile menu version of nav */}
          <div id="menu-mask" className={showMobileMenu ? "is-active" : ""} onClick={toggleMenu}></div>
          <nav id="nav-links">
            <div className="mask"></div>
            {user ? (
              // If the user exists, show the logout button
              <>
                <Link className="nav-link" to="/" onClick={() => { toggleMenu(); resetHeader(); }}>Games</Link>
                <Link className="nav-link" to="/profile" onClick={() => { toggleMenu(); resetHeader(); }}>Profile</Link>
                <span className="nav-link" onClick={() => { onLogout(); resetHeader(); }}>Logout</span>
              </>
            ) : (
              // Otherwise, show normal nav
              <>
                <Link className="nav-link" to="/" onClick={() => { toggleMenu(); resetHeader(); }}>Games</Link>
                <Link className="nav-link" to="/login" onClick={() => { toggleMenu(); resetHeader(); }}>Log In</Link>
                <Link className="nav-link" to="/signup" onClick={() => { toggleMenu(); resetHeader(); }}>Sign Up</Link>
              </>)}
          </nav>
        </header>
        { isGamePage && <div className="mask"></div>}
      </div>
    </>
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