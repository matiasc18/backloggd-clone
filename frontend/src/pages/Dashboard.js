import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Games from '../components/Games';
import { getUser, getFavorites, getUserGames, reset } from '../features/user/userSlice.js';
// import dashboardStyles from '../styles/dashboard.module.css';

const Dashboard = () => {
  // For re-routing
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { userInfo, games, favorites } = useSelector((state) => state.user);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    dispatch(getUser());
    dispatch(getFavorites());
    dispatch(getUserGames());

    return () => {
      dispatch(reset());
    }
  }, [user, navigate, dispatch]);

  useEffect(() => {
  }, [userInfo]);

  return (
    <main id="dashboard">
      <section id="bio">
        <h2>{ user.username }</h2>
        <hr />
        <span className="bio-details"><strong>Joined</strong> { userInfo.joined }</span>
        <span className="bio-details"><strong>Games:</strong> { userInfo.gamesCount }</span>
        <span className="bio-details"><strong>Favorites:</strong> { userInfo.favCount }</span>
      </section>
      <section id="dashboard-favorites">
        <h2>Favorites</h2>
        <hr />
        <div id="user-favorites">
          <Games games={ favorites } list={1} />
        </div>
      </section>
      <section id="dashboard-games">
        <h2>Games</h2>
        <hr />
        <div id="user-games">
          <Games games={ games } list={2} />
        </div>
      </section>
    </main>
  )
}

export default Dashboard;