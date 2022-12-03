import React from 'react';

import Navbar from '../Components/Navbar'
import banner from '../image/banner.jpg'

function MainPage() {
  return (
    <div>
      <h1 className="Title">Title/logo</h1>
      <Navbar/>
      <div className="bannerText">Explore Geospatial data analytics</div>
      <img src={banner} className = "bannerImage" alt="" />
      <p className="bannerSubText">A portal to 4 geospatial data analytic tools</p>
    </div>
  );
}

export default MainPage;