import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Header from './components/Header';
import SignupPage from './pages/SignupPage';
import GamesPage from './pages/GamesPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import GameExpanded from './pages/GameExpanded';
import SearchedPage from './pages/SearchedPage';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div id="App">
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path='/' element={<GamesPage />} />
            <Route path='/game-details/:id' element={<GameExpanded />} />
            <Route path='/search/:gameSlug' element={<SearchedPage />} />
            <Route path='/profile' element={<Dashboard />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

// * Potential icons
// * FaAngleDown (Down, Left, Up, Right)
// * FaAngleDoubleUp (Down, Left, Up, Right)
// * FaBars
// * FaChevronRight (Down, Left, Up, Right)
// * FaEllipsisH (H, V)
// * FaPowerOff
// * FaSlidersH
// * FaSortDown (Down, Up)