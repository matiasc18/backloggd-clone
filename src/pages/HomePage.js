import React, { Fragment } from 'react';
import Games from '../components/Games';
import '../styles/homePage.css';

const HomePage = () => {
  return (
    <main id="home-page">
      <h2>Trending Games</h2>
      <hr />
      <div className="games-container">
        <Games />
      </div>
    </main>
  )
}

export default HomePage;