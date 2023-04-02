import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainPage from "./pages/MainPage"
import DeepRegionRepresentationPage from './pages/DeepRegionRepresentationPage';
import RegionSearchPage from './pages/RegionSearchPage';
import TopicsExplorationPage from './pages/TopicsExplorationPage';
import TempoTestPage from './pages/TempoTestPage';
import Navbar from './components/Navbar';

function App() {
  return <BrowserRouter>

    <div className="Top" style={{maxHeight:'20vh'}}>
          <h1 className="Title">Title/logo</h1>
          <Navbar/>
    </div>

    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/TempoTestPage" element={<TopicsExplorationPage />} />
      <Route path="/DeepRegionRepresentationPage" element={<DeepRegionRepresentationPage />} />
      <Route path="/RegionSearchPage" element={<RegionSearchPage />} />
      <Route path="/TopicsExlporationPage" element={<TopicsExplorationPage />} />
    </Routes>
  </BrowserRouter>
}

export default App;
