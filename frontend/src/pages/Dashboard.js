import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Games from '../components/Games';
import { getFavorites, getUserGames, reset } from '../features/games/gameSlice.js';
import '../styles/dashboard.css';

const Dashboard = () => {
  // For re-routing
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { games, favorites, isError, message } = useSelector((state) => state.games);
  
  useEffect(() => {
    if (!user) {
      navigate('/games');
      return;
    }

    dispatch(getFavorites());
    dispatch(getUserGames());

    return () => {
      dispatch(reset());
    }
  }, [user, navigate, isError, message, dispatch]);

  return (
    <div className="dashboard">
      { user && 
        <div id="bio">
          <h2 className="dashboard-title">Bio</h2>
          <hr />
          <span>{user.username}</span>
        </div> }
      { favorites && 
        <div id="favorites-container">
          <h2 className="dashboard-title">Favorites</h2>
          <hr />
          <Games games={favorites} />
        </div>
      }
      { games && 
        <div id="dashboard-games-container">
          <h2 className="dashboard-title">Games</h2>
          <hr />
          <Games games={games} />
        </div>
      }
    </div>
  )
}

export default Dashboard;