import React from 'react';

import Navbar from '../Components/Navbar'
import banner from '../image/banner.jpg'

function MainPage() {
  return (
    <div className='flexContainer'>
      
      <div className="Top">
        <h1 className="Title">Title/logo</h1>
        <Navbar/>
      </div>
      
      <div className="Banner">
        <p className="bannerText">Explore Geospatial data analytics</p>
        <img src={banner} className = "bannerImage" alt="" />
        <p className="bannerSubText">A portal to 4 geospatial data analytic tools</p>
      </div>
      
      
      {/* region search */}
      <div className='regionSearch'>
        <button className='regionSearchBtn'>Click for Region Search</button>
      </div>
      
    </div>
  );
}

export default MainPage;