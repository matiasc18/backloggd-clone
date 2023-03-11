import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import SignupPage from './pages/auth/SignupPage';
import GamesPage from './pages/GamesPage';
import LoginPage from './pages/auth/LoginPage';
import UserDashboard from './pages/UserDashboard';
import ExpandedGame from './pages/ExpandedGame';
import SearchResults from './pages/SearchResults';
import LandingPage from './pages/LandingPage';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
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
            <Route path="/" element={<LandingPage />} />
            <Route path='/games' element={<GamesPage />} />
            <Route path='/game-details/:id' element={<ExpandedGame />} />
            <Route path='/search/:gameSlug' element={<SearchResults />} />
            <Route path='/dashboard/:page' element={<UserDashboard />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
          {/* <Footer /> */}
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