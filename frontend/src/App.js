import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SignupPage from './pages/SignupPage';
import GamesPage from './pages/GamesPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

// If something breaks, try putting className="App" outside of BrowserRouter (like it was before)
function App() {
  return (
    <BrowserRouter>
      <div id="App">
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/games' element={<GamesPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
      </div>
    </BrowserRouter>
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