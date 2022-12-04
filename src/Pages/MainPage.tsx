import React from 'react';

import Navbar from '../Components/Navbar';
import AlgoSection from '../Components/AlgoSection';
import banner from '../image/banner.jpg';

function MainPage() {
  return (
    <div className='flexContainer'>

      <div className="Top">
        <h1 className="Title">Title/logo</h1>
        <Navbar/>
      </div>
      
      <div className="Banner">
        <div className="bannerLeft" style={{display:'flex', flexDirection:'column', flex:'1', alignItems:'center'}}>
          <p className="bannerText">Explore Geospatial data analytics</p>
          <p className="bannerSubText">A portal to 4 geospatial data analytic tools</p>
        </div>
        <img src={banner} className = "bannerImage" alt="" />
        
      </div>
      
      
      {/* Algos */}
      <div className="algoContainer">
        <AlgoSection/>
        <AlgoSection/>
        <AlgoSection/>
        <AlgoSection/>
      </div>
      
      
    </div>
  );
}

export default MainPage;