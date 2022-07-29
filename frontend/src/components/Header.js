import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { FaBars } from 'react-icons/fa';
import { getWindowSize } from '../api/utils';
import styles from '../styles/header.module.css';

//TODO Change links to a ul with li of Link
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const maxMobileWidth = 480;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Keeps track of the device's current window size
  const [windowSize, setWindowSize] = useState(getWindowSize());

  //TODO probably will change this later when i add more options to the hamburger menu
  //TODO in which case, instead of removing it, make it come down from top instead of right
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

  // Close hamburger menu if its open while rotating phone device
  useEffect((showMobileMenu, toggleMenu) => {
    if (windowSize.innerWidth >= maxMobileWidth && showMobileMenu)
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
      } else {
          setShowMobileMenu(false);
          document.body.style.position = 'static';
          currentPage.style.transform = 'translateX(0)';
      }
    }
  };

  return (
    <div id={styles["header-container"]}>
      <header>
        <Link to="/" id={styles["header-title"]}>frontloggd</Link>
        <FaBars size="1.75em" className={styles["menu-button"]} style={ showMobileMenu ? { opacity: 0.7 } : {}} onClick={ toggleMenu }/>
        {/* If the menu is active, display mobile menu version of nav */}
        { showMobileMenu && <div className={styles["menu-mask"]} onClick={ toggleMenu }></div> }
        <nav className={ showMobileMenu ? `${styles["nav-links"]} ${styles["is-active"]}` : styles["nav-links"]}>
          { user ? (
            // If the user exists, show the logout button
            <>
              <Link className={styles["nav-link"]} to="/games" onClick={ toggleMenu }>Games</Link>
              <Link className={styles["nav-link"]} to="/" onClick={ toggleMenu }>Profile</Link>
              <span className={styles["nav-link"]} onClick={ onLogout }>Logout</span>
            </>
          ) : (
            // Otherwise, show normal nav
            <>
              <Link className={styles["nav-link"]} to="/games" onClick={ toggleMenu }>Games</Link>
              <Link className={styles["nav-link"]} to="/login" onClick={ toggleMenu }>Log In</Link>
              <Link className={styles["nav-link"]} to="/signup" onClick={ toggleMenu }>Sign Up</Link>
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