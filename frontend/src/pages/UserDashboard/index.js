import { getUser } from '../../features/user/userSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from './components/Profile.js';
import GamesList from '../../components/GamesList';
import { useUserGames } from './hooks/useUserGames.js';

const pageSelector = (user, userInfo, page, data) => {
  switch (page) {
    case 'profile':
      return user && userInfo ? <Profile user={user} userInfo={userInfo} /> : <></>
    case 'games':
      return <>
        <section id="dashboard-games" className="dashboard-container">
          <h2 className="section-title">Games</h2>
          <hr />
          {data && <GamesList data={data} list={2} newClass={'user-games'} />}
        </section>
      </>
  }
  return <span>Coming soon!</span>
}

// User profile screen
const UserDashboard = () => {
  // For re-routing / redux dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { page } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.user);
  const { data } = useUserGames('games'); // user's games

  // Add page selector style
  useEffect(() => {
    document.getElementById(`${page}`).classList.add('selected-page');
  }, [page]);

  // Runs whenever redux auth state changes
  useEffect(() => {
    if (!user) { // If no one is signed in, go home
      navigate('/');
      return;
    }
    dispatch(getUser());
  }, [user, navigate, dispatch]);

  // Update page selector and change page
  const updatePage = (newPage) => {
    if (page && newPage) {
      document.getElementById(page).classList.remove('selected-page');
      navigate(`/dashboard/${newPage}`);
    }
  };

  return (
    <main id="dashboard">
      {user && <>
        <h2 id="user-name">{user.username}</h2>
        <section id="dashboard-nav">
          <ul id="dashboard-nav-links">
            <li id="profile" onClick={() => updatePage('profile')}>Profile</li>
            <li id="games" onClick={() => updatePage('games')}>Games</li>
            <li id="reviews" onClick={() => updatePage('reviews')}>Reviews</li>
            <li id="lists" onClick={() => updatePage('lists')}>Lists</li>
            <li id="friends" onClick={() => updatePage('friends')}>Friends</li>
          </ul>
          <button className="edit-profile">Edit Profile</button>
        </section>
        {pageSelector(user, userInfo, page, data)}
      </>}
    </main>
  )
}

export default UserDashboard;