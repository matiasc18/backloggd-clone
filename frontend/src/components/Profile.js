import Pagination from '../components/Pagination';
import Games from '../components/Games';
import { useState, useEffect, useMemo } from 'react';
import { getUserGames, getFavorites } from '../features/user/userSlice.js';
import { useSelector, useDispatch } from 'react-redux';

const Profile = ({ user, userInfo }) => {
  // For redux dispatch
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const { games, favorites } = useSelector((state) => state.user);

  const displayedGames = useMemo(() => {
    if (games) return games.results.slice((currentPage - 1) * 30, currentPage * 30);
  }, [games]);

  useEffect(() => {
    dispatch(getUserGames());
    dispatch(getFavorites());
  }, []);

  return (
    <>
      <section id="bio">
        <h2>Bio</h2>
        <hr />
        <span className="bio-details"><strong>Joined</strong> {userInfo.dateJoined}</span>
        <span className="bio-details"><strong>Games:</strong> {userInfo.totalGames}</span>
        <span className="bio-details"><strong>Favorites:</strong> {userInfo.totalFavorites}</span>
      </section>
      <section id="dashboard-favorites">
        <h2>Favorites</h2>
        <hr />
        <div id="user-favorites">
          {favorites && <Games games={favorites.results} list={1} />}
        </div>
      </section>
      <section id="dashboard-games">
        <h2>Games</h2>
        <hr />
        {displayedGames &&
          <Pagination
            gamesPerPage={30}
            totalGames={games.totalGames}
            currentPage={currentPage}
            updatePage={(pageNumber) => { setCurrentPage(pageNumber) }}
          />}
        <div id="user-games">
          {displayedGames && <Games games={displayedGames} list={2} />}
        </div>
        {displayedGames &&
          <Pagination
            gamesPerPage={30}
            totalGames={games.totalGames}
            currentPage={currentPage}
            updatePage={(pageNumber) => { setCurrentPage(pageNumber) }}
          />}
      </section>
    </>
  )
}

export default Profile;