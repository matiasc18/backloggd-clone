import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import SignupPage from './pages/auth/SignupPage';
import GamesPage from './pages/games/index.js';
import LoginPage from './pages/auth/LoginPage';
import Dashboard from './pages/dashboard/index.js';
import GameExpanded from './pages/gameExpanded/index.js';
import SearchedPage from './pages/searched/index.js';
import LandingPage from './pages/landing/index.js';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header/index.js';
import Footer from './components/Footer/index.js';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div id="App">
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='/games' element={<GamesPage />} />
            <Route path='/game-details/:id' element={<GameExpanded />} />
            <Route path='/search/:gameSlug' element={<SearchedPage />} />
            <Route path='/dashboard/:page' element={<Dashboard />} />
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