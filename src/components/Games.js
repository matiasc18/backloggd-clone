import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Games = () => {  
  const [games, setGames] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   getGames();
  // });

  // const getGames = async () => {
  //   const { games } = await axios.post(`http://localhost:3500/api/`)
  // }

  return (
    <div>Games</div>
  )
}

export default Games;