import React from 'react';
import Games from '../components/Games';
import '../styles/homePage.css';

const HomePage = () => {
  return (
    <main id="home-page">
      <h2>Trending Games</h2>
      <hr />
      <Games />
    </main>
  )
}

export default HomePage;