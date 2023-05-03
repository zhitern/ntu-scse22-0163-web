import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import logo from './image/logo.png'

import MainPage from "./Pages/MainPage"
import DeepRegionRepresentationPage from './Pages/DeepRegionRepresentationPage';
import RegionSearchPage from './Pages/RegionSearchPage';
import TempoTestPage from './Pages/TempoTestPage';
import TopicExplorePage from './Pages/TopicExplorePage';
import Navbar from './Components/Navbar';
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
