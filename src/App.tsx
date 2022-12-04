import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import MainPage from "./Pages/MainPage"
import TempoTestPage from './Pages/TempoTestPage';
import AlgoShowcasePage from './Pages/AlgoShowcasePage';

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<TempoTestPage />} />
      <Route path="MainPage" element={<MainPage />} />
      <Route path="AlgoShowcasePage" element={<AlgoShowcasePage />} />
    </Routes>
  </BrowserRouter>
}

export default App;
