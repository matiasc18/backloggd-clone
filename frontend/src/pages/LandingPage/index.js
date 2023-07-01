import { useEffect } from 'react';
import Games from '../../components/GamesList/utils/Games';
import { useFetchGames } from '../GamesPage/hooks/useFetchGames';
import ComingSoon from './components/ComingSoon';
import LoginPage from '../auth/LoginPage';
import SignupPage from '../auth/SignupPage';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const { user } = useSelector((state) => state.auth);

  const { data: popularThisMonth, error, isError, isLoading } = useFetchGames('popular-this-month');
  const { data: comingSoon, error: error2, isError: isError2, isLoading: isLoading2, isSuccess } = useFetchGames('coming-soon');

  return (
    <>
      <main id="landing-page">
        <section id="lp-banner">
          <h2>Discover new games, expand your collection</h2>
          <div>
            <span>Xbox</span>
            <span>Playstation</span>
            <span>Switch</span>
            <span>PC</span>
          </div>
          {/* <a className="bg-credits" href="https://www.freepik.com/free-vector/night-ocean-landscape-full-moon-stars-shine_17740155.htm#query=game%20background&position=0&from_view=keyword&track=ais">Image by upklyak</a> on Freepik */}
        </section>
        {user &&
          <section id="lp-header">
            <div id="lp-header-left">
              <div className="profile-picture"></div>
              <div>
                <Link className="lp-user" to="/dashboard/profile">{user.username}</Link>
                <div>
                  <span className="lp-user-link">Played<span>231</span></span>
                  <span className="lp-user-link">Backlog<span>67</span></span>
                  <span className="lp-user-link">Playing<span>10</span></span>
                  <span className="lp-user-link">Wishlist<span>9</span></span>
                </div>
              </div>
            </div>
            <div id="lp-header-right">
              <h1>frontloggd</h1>
              <span>(Clone website inspired by <a href="https://www.backloggd.com" target="_blank" rel="noopener noreferrer">Backloggd</a>
                )</span>
            </div>
          </section>
        }
        <section id="lp-body">
          <div className="lp-body-left">
            <section>
              <h2>Recently logged - <Link to="/games">More</Link></h2>
              <div className="games-container">
                {popularThisMonth && <Games games={popularThisMonth.results} list={3} />}
              </div>
            </section>
            <section>
              <h2>Recently completed - <Link to="/games">More</Link></h2>
              <section className="games-container">
                {popularThisMonth && <Games games={popularThisMonth.results} list={3} />}
              </section>
            </section>
          </div>
          <div id="coming-soon">
            <h2>Coming Soon</h2>
            <section className="coming-soon-container">
              {comingSoon && <ComingSoon games={comingSoon.results.sort((a, b) => a.first_release_date - b.first_release_date)} list={5} />}
            </section>
          </div>
        </section>
        <section id="lp-reviews">
          <h2>Recent Reviews - <span>More</span></h2>
        </section>
      </main>
    </>
  )
}

export default LandingPage;