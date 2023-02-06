import { useFetchGames } from './hooks/useFetchGames.js';
import GamesList from '../../components/GamesList/index.js';

//TODO switching back to trending does nothing
const GamesPage = () => {
  // Get total list of games
  const { data, error, isError, isLoading } = useFetchGames('trending');

  return (
    <main id="games-page">
      <h2>Trending Games</h2>
      <hr />
      {isError && <span>{error.message}</span>}
      {data && <div className="games-container">
        <GamesList data={data} list={1} newClass={'games-container'}/>
      </div>}
    </main>
  )
}

export default GamesPage;