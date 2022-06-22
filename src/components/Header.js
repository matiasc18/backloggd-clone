import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  return (
    <header>
      <Link to='/' id="header-title">Frontloggd</Link>
      <nav class="nav-links">
        <Link to='/games'>Games</Link>
        <Link to='/'>Sign Up</Link>
        <Link to='/'>Log In</Link>
      </nav>
    </header>
  )
}

export default Header;