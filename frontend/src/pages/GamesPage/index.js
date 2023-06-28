import { useFetchGames } from './hooks/useFetchGames.js';
import GamesList from '../../components/GamesList';

//TODO switching back to trending does nothing
const GamesPage = () => {
  // Get total list of games
  const { data, error, isError, isLoading } = useFetchGames('trending');

  return (
    <main id="games-page">
      {isError && <span>{error.message}</span>}
      {data && <GamesList listTitle={<h2 className="section-title">{data.totalGames} games  </h2>} data={data} list={1} newClass={'games-container'} />}
    </main>
  )
}

export default GamesPage;