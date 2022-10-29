import { getUser } from '../features/user/userSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Games from '../components/Games';
import Profile from '../components/Profile.js';

const pageSelector = (user, userInfo, page) => {
  switch (page) {
    case 'profile':
      return <Profile user={user} userInfo={userInfo} />
    break;
  }
  return <span>Coming soon!</span>
}

// User profile screen
const Dashboard = () => {
  // For re-routing / redux dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.user);

  const [page, setPage] = useState('profile');

  // Runs whenever redux auth state changes
  useEffect(() => {
    if (!user) { // If no one is signed in, go home
      navigate('/');
      return;
    }
    dispatch(getUser());
  }, [user, navigate, dispatch]);

  return (
    <main id="dashboard">
      {user && userInfo && <>
        <h2 id="user-name">{user.username}</h2>
        <section id="dashboard-nav">
          <ul id="dashboard-nav-links">
            <label><input type="radio" onClick={() => setPage('profile')}/>Profile</label>
            <label><input type="radio" onClick={() => setPage('games')}/>Games</label>
            <label><input type="radio" onClick={() => setPage('reviews')}/>Reviews</label>
            <label><input type="radio" onClick={() => setPage('lists')}/>Lists</label>
            <label><input type="radio" onClick={() => setPage('friends')}/>Friends</label>
          </ul>
          <button className="edit-profile">Edit Profile</button>
        </section>
        <section id="bio">
          <h2>Bio</h2>
          <hr />
          <span className="bio-details"><strong>Joined</strong> {userInfo.dateJoined}</span>
          <span className="bio-details"><strong>Games:</strong> {userInfo.totalGames}</span>
          <span className="bio-details"><strong>Favorites:</strong> {userInfo.totalFavorites}</span>
        </section>
        {pageSelector(user, userInfo, page)}
      </>}
    </main>
  )
}

export default Dashboard;