import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainPage from "./Pages/MainPage"
import TempoTestPage from './Pages/TempoTestPage';
import RegionSearchPage from './Pages/DeepRegionRepresentationPage';

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<TempoTestPage />} />
      <Route path="MainPage" element={<MainPage />} />
      <Route path="AlgoShowcasePage" element={<RegionSearchPage />} />
    </Routes>
  </BrowserRouter>
}

export default App;
