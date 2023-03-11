import Games from '../../../components/GamesList/utils/Games.js';
import { useUserGames } from '../hooks/useUserGames';

const Profile = ({ user, userInfo }) => {
  const { data: favorites } = useUserGames('favorites');

  return (
    <div id="profile-container" className="dashboard-container">
      <section id="bio">
        <h2 className="section-title">Bio</h2>
        <hr />
        <span className="bio-details"><strong>Joined</strong> {userInfo.dateJoined}</span>
        <span className="bio-details"><strong>Games:</strong> {userInfo.totalGames}</span>
        <span className="bio-details"><strong>Favorites:</strong> {userInfo.totalFavorites}</span>
      </section>
      <section id="dashboard-favorites">
        <h2 className="section-title">Favorites</h2>
        <hr />
        <div id="user-favorites">
          {favorites && <Games games={favorites.results} list={1} />}
        </div>
      </section>
    </div>
  )
}

export default Profile;