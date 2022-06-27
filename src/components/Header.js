import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  return (
    <header>
      <Link to='/' id="header-title"><code>{`<frontloggd>`}</code></Link>
      <nav className="nav-links">
        <Link to='/games'>Games</Link>
        <Link to='/signup'>Sign Up</Link>
        <Link to='/'>Log In</Link>
      </nav>
    </header>
  )
}

export default Header;