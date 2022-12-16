import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainPage from "./Pages/MainPage"
import DeepRegionRepresentationPage from './Pages/DeepRegionRepresentationPage';
import RegionSearchPage from './Pages/RegionSearchPage';

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="DeepRegionRepresentationPage" element={<DeepRegionRepresentationPage />} />
      <Route path="RegionSearchPage" element={<RegionSearchPage />} />
    </Routes>
  </BrowserRouter>
}

export default App;
