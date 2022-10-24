import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { reset as resetGame } from '../features/games/gameSlice.js';
import { reset as resetUser } from '../features/user/userSlice.js';
import { FaBars } from 'react-icons/fa';
import { getWindowSize } from '../api/utils';
import SearchBar from '../components/SearchBar';

//TODO Change links to a ul with li of Link
const Header = () => {
  const maxMobileWidth = 480;

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Keeps track of the device's current window size
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Initial render
  useEffect(() => {
    // Makes sure menu isn't active on initial render
    const menu = document.getElementById('nav-links');
    if (menu.classList.contains === 'is-active')
      menu.classList.remove('is-active');

    // Add event listener for screen size change (runs whenever window size changes)
    window.addEventListener('resize', () => {
      setWindowSize(getWindowSize());
    });

    // Remove event listener when component dismounts
    return () => {
      window.removeEventListener('resize', () => {
        setWindowSize(getWindowSize());
      });
    }
  }, []);

  // Reset the header's transparent effect when not viewing a game's details
  useEffect(() => {
    if (!(/^\/game-details\/[0-9]+$/).test(window.location.pathname))
      resetHeader();
  }, [window.location.pathname])

  // Close hamburger menu if its open while rotating phone device
  useEffect((showMobileMenu, toggleMenu) => {
    if (windowSize.innerWidth >= maxMobileWidth && showMobileMenu) {
      toggleMenu();
    }
  }, [windowSize]);

  // Runs whenever user clicks on hamburger menu button
  useEffect(() => {
    const menu = document.getElementById('nav-links');

    if (showMobileMenu)
      menu.classList.add('is-active');
    else
      menu.classList.remove('is-active');
  }, [showMobileMenu]);

  // Logout, reset user state, close the menu (if on mobile), and go to homepage
  const onLogout = () => {
    setShowMobileMenu(false);
    dispatch(logout());
    // dispatch(reset());
    navigate('/');
    dispatch(resetUser());
  };

  // Opens/closes mobile hamburger menu
  const toggleMenu = () => {
    if (window.innerWidth < maxMobileWidth) {
      // Current page to be translated left when menu opens
      const currentPage = document.getElementById('App').children.item(1);
      if (!showMobileMenu) {
        setShowMobileMenu(true);

        // Removes page scrolling capability
        document.body.style.position = 'fixed';

        // Translates the current page left
        currentPage.style.transition = '0.56s';
        currentPage.style.transform = 'translateX(-43%)';
        // Returns the page back to normal after closing menu
      }
      else {
        setShowMobileMenu(false);
        document.body.style.position = 'static';
        currentPage.style.transform = 'translateX(0)';
      }
    }
  };

  // Runs whenever user exits expanded game page (removes blur)
  const resetHeader = () => {
    document.getElementById('header-container').classList.remove('is-active-game');
    document.getElementById('nav-links').classList.remove('is-active-game');
    document.getElementById('nav-links').classList.remove('is-active');
    dispatch(resetGame());
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
            {/* <div className="blur"></div> */}
            {user ? (
              // If the user exists, show the logout button
              <>
                <SearchBar resetHeader={resetHeader}/>
                <Link className="nav-link" to="/" onClick={() =>toggleMenu()}>Games</Link>
                <Link className="nav-link" to="/profile" onClick={() =>toggleMenu()}>Profile</Link>
                <span className="nav-link" onClick={onLogout}>Logout</span>
              </>
            ) : (
              // Otherwise, show normal nav
              <>
                <SearchBar />
                <Link className="nav-link" to="/" onClick={() =>toggleMenu()}>Games</Link>
                <Link className="nav-link" to="/login" onClick={() =>toggleMenu()}>Log In</Link>
                <Link className="nav-link" to="/signup" onClick={() =>toggleMenu()}>Sign Up</Link>
              </>)}
          </nav>
        </header>
        {/* <div className="blur"></div> */}
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