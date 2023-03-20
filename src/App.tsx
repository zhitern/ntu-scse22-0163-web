import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainPage from "./pages/MainPage"
import DeepRegionRepresentationPage from './pages/DeepRegionRepresentationPage';
import RegionSearchPage from './pages/RegionSearchPage';
import Navbar from './components/Navbar';

function App() {
  return <BrowserRouter>

    <div className="Top" style={{maxHeight:'20vh'}}>
          <h1 className="Title">Title/logo</h1>
          <Navbar/>
    </div>

    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="DeepRegionRepresentationPage" element={<DeepRegionRepresentationPage />} />
      <Route path="RegionSearchPage" element={<RegionSearchPage />} />
    </Routes>
  </BrowserRouter>
}

export default App;
