import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Games from '../components/Games';
import { getFavorites, getUserGames, reset } from '../features/games/gameSlice.js';
// import dashboardStyles from '../styles/dashboard.module.css';

const Dashboard = () => {
  // For re-routing
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { games, favorites, isError, message } = useSelector((state) => state.games);
  
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    dispatch(getFavorites());
    dispatch(getUserGames());

    return () => {
      dispatch(reset());
    }
  }, [user, navigate, isError, message, dispatch]);

  return (
    <div id="dashboard">
      { user && 
        <section id="bio">
          <h1>{user.username}</h1>
          <hr />
        </section> }
      { favorites && 
        <section id="dashboard-favorites">
          <h1>Favorites</h1>
          <hr />
          <div id="user-favorites">
            <Games games={favorites} list={1}/>
          </div>
        </section>
      }
      { games && 
        <section id="dashboard-games">
          <h1>Games</h1>
          <hr />
          <div id="user-games">
            <Games games={games} list={2}/>
          </div>
        </section>
      }
    </div>
  )
}

export default Dashboard;