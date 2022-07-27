import React from 'react';
import Games from '../components/Games';
import '../styles/gamesPage.css';

//TODO Have games fetched from api here instead of in components/Games
  //TODO Have games fetched in like usser goals instead (from tut)
  //TODO Have this be the landing page
const GamesPage = () => {
  return (
    <main id="games-page">
      <h2>Trending Games</h2>
      <hr />
      <Games />
    </main>
  )
}

export default GamesPage;