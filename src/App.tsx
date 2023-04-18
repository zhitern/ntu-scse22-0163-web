import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import logo from './image/logo.png'

import MainPage from "./pages/MainPage"
import DeepRegionRepresentationPage from './pages/DeepRegionRepresentationPage';
import RegionSearchPage from './pages/RegionSearchPage';
import TempoTestPage from './pages/TempoTestPage';
import TopicExplorePage from './pages/TopicExplorePage';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return <BrowserRouter>

    <div className="Top" style={{maxHeight:'20vh'}}>
          <img src={logo} className = "logo" alt="logo" />
          <Navbar/>
    </div>

    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/TempoTestPage" element={<TempoTestPage />} />
      <Route path="/DeepRegionRepresentationPage" element={<DeepRegionRepresentationPage />} />
      <Route path="/RegionSearchPage" element={<RegionSearchPage />} />
      <Route path="/TopicExplorePage" element={<TopicExplorePage />} />
    </Routes>
  </BrowserRouter>
}

export default App;
