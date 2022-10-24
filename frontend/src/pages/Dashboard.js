import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, getFavorites, getUserGames, reset } from '../features/user/userSlice.js';
import { reset as resetGames } from '../features/games/gameSlice.js';
import Games from '../components/Games';
import Pagination from '../components/Pagination';

// User profile screen
const Dashboard = () => {
  // For re-routing / redux dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { userInfo, games, favorites } = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [displayedGames, setDisplayedGames] = useState([]);

  // Scroll to top on page load
  useEffect(() => {
    // window.scrollTo(0, 0);
  }, []);

  // Runs whenever redux auth state changes
  useEffect(() => {
    // If no logged in user, go home
    if (!user) {
      navigate('/');
      return;
    }

    dispatch(getUserGames());
    dispatch(getFavorites());
    dispatch(getUser());

    // Resets user state whenever the user leaves the page
    // return () => {
    //   dispatch(reset());
    // };
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (games)
      setDisplayedGames(games.results.slice((currentPage - 1) * 30, currentPage * 30));

    return () => {
      dispatch(resetGames());
    };
  }, [games, currentPage, dispatch]);

  //? Updates current page of results
  const updatePage = async (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main id="dashboard">
      {user && userInfo && games && favorites && <>
        <section id="bio">
          <h2>{user.username}</h2>
          <hr />
          <span className="bio-details"><strong>Joined</strong> {userInfo.dateJoined}</span>
          <span className="bio-details"><strong>Games:</strong> {userInfo.totalGames}</span>
          <span className="bio-details"><strong>Favorites:</strong> {userInfo.totalFavorites}</span>
        </section>
        <section id="dashboard-favorites">
          <h2>Favorites</h2>
          <hr />
          <div id="user-favorites">
            <Games games={favorites.results} list={1} />
          </div>
        </section>
        <section id="dashboard-games">
          <h2>Games</h2>
          <hr />
          {games &&
            <Pagination
              gamesPerPage={30}
              totalGames={games.totalGames}
              currentPage={currentPage}
              updatePage={updatePage}
            />}
          <div id="user-games">
            <Games games={displayedGames} list={2} />
          </div>
          {games &&
            <Pagination
              gamesPerPage={30}
              totalGames={games.totalGames}
              currentPage={currentPage}
              updatePage={updatePage}
            />}
        </section>
      </>}
    </main>
  )
}

export default Dashboard;