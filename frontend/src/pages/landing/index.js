import Games from '../../components/GamesList/utils/Games';
import { useFetchGames } from '../games/hooks/useFetchGames';

const LandingPage = () => {
  const { data: popularThisMonth, error, isError, isLoading } = useFetchGames('popular-this-month');
  const { data: comingSoon, error: error2, isError: isError2, isLoading: isLoading2, isSuccess } = useFetchGames('coming-soon');

  return (
    <main id="landing-page">
      <h1>Welcome to Frontloggd</h1>
      <hr />
      <section id="lp-container">
        <div id="coming-soon">
          <h2>Coming Soon</h2>
          <hr />
          <section className="games-container">
            {comingSoon && <Games games={comingSoon.results} list={5} />}
          </section>
        </div>
        <div id="popular-this-month">
          <h2>Popular this month</h2>
          <hr />
          <section className="games-container">
            {popularThisMonth && <Games games={popularThisMonth.results} list={3} />}
          </section>
        </div>
      </section>
    </main>
  )
}

export default LandingPage;