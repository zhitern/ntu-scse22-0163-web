import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Navbar from '../Components/Navbar';
import banner from '../image/banner.jpg';

function MainPage() {

  const [Algos, setAlgos] = useState([
    {buttomText: 'Click for Algo 1', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam officia deserunt expedita rem, illo blanditiis sequi quam et! Officiis accusantium dolores a, incidunt minus eius quasi corrupti dignissimos quod?', link: "/AlgoShowcasePage", id: 1 },
    {buttomText: 'Click for Algo 2', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam officia deserunt expedita rem, illo blanditiis sequi quam et! Officiis accusantium dolores a, incidunt minus eius quasi corrupti dignissimos quod?', link: "/AlgoShowcasePage", id: 2 },
    {buttomText: 'Click for Algo 3', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam officia deserunt expedita rem, illo blanditiis sequi quam et! Officiis accusantium dolores a, incidunt minus eius quasi corrupti dignissimos quod?', link: "/AlgoShowcasePage", id: 3 },
    {buttomText: 'Click for Algo 4', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam officia deserunt expedita rem, illo blanditiis sequi quam et! Officiis accusantium dolores a, incidunt minus eius quasi corrupti dignissimos quod?', link: "/AlgoShowcasePage", id: 4 }
  ])

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
      
      <h2 className="algoStartTitle" style={{justifyContent:'center'}}>Algorithms</h2>
      
      {/* Algos */}
      <div className="algoContainer">
        {Algos.map((Algo)=>(
            <div className="algoSection" key={Algo.id}>
              <div style={{flex:'1', display:'flex'}}>
                <Link to = {Algo.link} >
                <button className='algoSearchBtn'>{Algo.buttomText}</button>
                </Link>
              </div>
              <p style={{flex:'3'}} >{Algo.desc}</p>
            </div>
        ))}
      </div>
      
      
    </div>
  );
}

export default MainPage;