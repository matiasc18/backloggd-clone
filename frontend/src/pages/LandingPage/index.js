import { useEffect } from 'react';
import Games from '../../components/GamesList/utils/Games';
import { useFetchGames } from '../GamesPage/hooks/useFetchGames';
import ComingSoon from './components/ComingSoon';
import LoginPage from '../auth/LoginPage';
import SignupPage from '../auth/SignupPage';

const LandingPage = () => {
  const { data: popularThisMonth, error, isError, isLoading } = useFetchGames('popular-this-month');
  const { data: comingSoon, error: error2, isError: isError2, isLoading: isLoading2, isSuccess } = useFetchGames('coming-soon');

  return (
    <main id="landing-page">
      <h1 className="section-title">Welcome to frontloggd</h1>
      <hr />
      {/* <div id="landing-auth">
        <LoginPage />
        <SignupPage />
      </div> */}
      <section id="lp-container">
        <div id="popular-this-month">
          <h2 className="section-title">Popular this month</h2>
          <hr />
          <section className="games-container">
            {popularThisMonth && <Games games={popularThisMonth.results} list={3} />}
          </section>
        </div>
        <div id="coming-soon">
          <h2 className="section-title">Coming Soon</h2>
          <hr />
          <section className="games-container">
            {comingSoon && <ComingSoon games={comingSoon.results.sort((a, b) => a.first_release_date - b.first_release_date)} list={5} />}
          </section>
        </div>
      </section>
    </main>
  )
}

export default LandingPage;