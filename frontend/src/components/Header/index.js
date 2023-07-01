import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { reset } from '../../features/auth/authSlice';
import { reset as resetUser } from '../../features/user/userSlice.js';
import { FaBars, FaBookOpen, FaCog, FaGamepad, FaGift, FaHeart, FaHistory, FaLayerGroup, FaPlay, FaSignOutAlt, FaSignal, FaUser, FaUserFriends, FaPlus, FaChevronDown } from 'react-icons/fa';
import { getWindowSize } from '../../api/utils';
import SearchBar from './utils/SearchBar.js';
import { ImBooks } from 'react-icons/im';

//TODO Change links to a ul with li of Link
const Header = () => {
  const maxMobileWidth = 960;

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Keeps track of the device's current window size
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const screenWidth = useMemo(() => windowSize.innerWidth, [windowSize]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
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

  // Logout, reset user state, close the menu (if on mobile), and go to homepage
  const onLogout = () => {
    setShowMobileMenu(false);
    dispatch(logout());
    dispatch(reset());
    navigate('/');
    dispatch(resetUser());
  };

  // Opens/closes mobile hamburger menu
  const toggleMenu = () => {
    if (window.innerWidth < maxMobileWidth) {
      setShowMobileMenu(!showMobileMenu);
    }
  };

  console.log(screenWidth);

  return (
    <>
      <div id="header-container">
        <header>
          <Link to="/" id="header-title">frontloggd</Link>
          <nav>
            {screenWidth >= 760 &&
              <>
                {user &&
                  <div className="nav-button desktop-dropdown">{user.username}
                    <FaChevronDown />
                    <div className="desktop-dropdown-list">
                      <Link className="desktop-dropdown-option" to="/dashboard/profile">Profile</Link>
                      <span className="desktop-dropdown-option border-top">Played</span>
                      <span className="desktop-dropdown-option">Playing</span>
                      <span className="desktop-dropdown-option">Backlog</span>
                      <span className="desktop-dropdown-option">Wishlist</span>
                      <span className="desktop-dropdown-option border-top">Reviews</span>
                      <span className="desktop-dropdown-option">Lists</span>
                      <span className="desktop-dropdown-option">Friends</span>
                      <span className="desktop-dropdown-option">Likes</span>
                      <span className="desktop-dropdown-option border-top">Settings</span>
                      <span className="desktop-dropdown-option" onClick={onLogout}>Log Out</span>
                    </div>
                  </div>
                }
                {!user &&
                  <>
                    <Link className="nav-button" to="/login" onClick={() => setShowMobileMenu(false)}>Log In</Link>
                    <Link className="nav-button" to="/signup" onClick={() => setShowMobileMenu(false)}>Register</Link>
                  </>
                }
                <Link className="nav-button" to="/games" onClick={() => setShowMobileMenu(false)}>Games</Link>
                <SearchBar />
              </>
            }
            {screenWidth < 760 &&
              <>
                <Link className="nav-button" to="/games" onClick={() => setShowMobileMenu(false)}>Games</Link>
                <FaBars size="1.75em" className="menu-button" style={showMobileMenu ? { opacity: 0.7 } : {}} onClick={toggleMenu} />
              </>
            }
          </nav>
        </header>
      </div>
      <div className={`${showMobileMenu ? 'nav-dropdown show-dropdown' : 'nav-dropdown'} ${user ? 'user-dropdown' : ''}`}>
        {user ? (
          <div id="user-buttons">
            <SearchBar />
            <span className="dropdown-button grid-4"><FaGamepad size={24} />Played</span>
            <span className="dropdown-button grid-4"><FaPlay size={20} />Playing</span>
            <span className="dropdown-button grid-4"><ImBooks size={20} />Backlog</span>
            <span className="dropdown-button grid-4"><FaGift size={20} />Wishlist</span>
            <span className="dropdown-button grid-1"><FaUserFriends size={20} />Friends</span>
            <Link className="dropdown-button grid-2" to="/dashboard/profile" onClick={() => setShowMobileMenu(false)}><FaUser size={20} />Profile</Link>
            <span className="dropdown-button grid-2"><FaCog size={20} />Settings</span>
            <span className="dropdown-button grid-3"><FaSignal size={20} />Reviews</span>
            <span className="dropdown-button grid-3"><FaLayerGroup size={20} />Lists</span>
            <span className="dropdown-button grid-3"><FaHeart size={20} />Likes</span>
            <span className="dropdown-button grid-1" onClick={onLogout}><FaSignOutAlt size={20} />Log Out</span>
          </div>
        ) : (
          <>
            <Link className="dropdown-button" to="/login" onClick={() => setShowMobileMenu(false)}>Log In</Link>
            <Link className="dropdown-button" to="/signup" onClick={() => setShowMobileMenu(false)}>Register</Link>
            <SearchBar />
          </>
        )}
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

// return (
//   <>
//     <div id="header-container">
//       <header>
//         <Link to="/" id="header-title" onClick={resetHeader}>frontloggd</Link>
//         <FaBars size="1.75em" className="menu-button" style={showMobileMenu ? { opacity: 0.7 } : {}} onClick={toggleMenu} />
//         {/* If the menu is active, display mobile menu version of nav */}
//         <nav id="nav-links">
//           {user ? (
//             // If the user exists, show the logout button
//             <>
//               <Link className="nav-link" to="/dashboard/profile" onClick={() => toggleMenu()} style={{ fontWeight: 'bold', letterSpacing: '0.5px' }}>{user.username}</Link>
//               <SearchBar resetHeader={resetHeader} />
//               <span className="nav-link" onClick={onLogout}>Logout</span>
//               <Link className="nav-link" to="/games" onClick={() => toggleMenu()}>Games</Link>
//             </>
//           ) : (
//             // Otherwise, show normal nav
//             <>
//               <Link className="nav-link" to="/login" onClick={() => toggleMenu()}>Log In</Link>
//               <Link className="nav-link" to="/signup" onClick={() => toggleMenu()}>Register</Link>
//               <Link className="nav-link" to="/games" onClick={() => toggleMenu()}>Games</Link>
//               <SearchBar />
//             </>)}
//         </nav>
//       </header>
//     </div>
//   </>
// )