import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Games from '../components/Games';
import { getFavorites, getUserGames, reset } from '../features/games/gameSlice.js';
import dashboardStyles from '../styles/dashboard.module.css';

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
    <div className={dashboardStyles["dashboard"]}>
      { user && 
        <div id={dashboardStyles["bio"]}>
          <h2 className={dashboardStyles["dashboard-title"]}>Bio</h2>
          <hr />
          <span>{user.username}</span>
        </div> }
      { favorites && 
        <section id={dashboardStyles["dashboard-favorites"]}>
          <h2 className={dashboardStyles["dashboard-title"]}>Favorites</h2>
          <hr />
          <div id={dashboardStyles["favorites-container"]}>
            <Games games={favorites} favGamesStyles={dashboardStyles}/>
          </div>
        </section>
      }
      { games && 
        <section id={dashboardStyles["dashboard-games"]}>
          <h2 style={{ marginTop: '0.5em' }}className={dashboardStyles["dashboard-title"]}>Games</h2>
          <hr />
          <div id={dashboardStyles["dashboard-games-container"]}>
            <Games games={games} />
          </div>
        </section>
      }
    </div>
  )
}

export default Dashboard;