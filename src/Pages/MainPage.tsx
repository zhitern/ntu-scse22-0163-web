import React, { useState } from 'react';
import { Link } from "react-router-dom";
import banner from '../image/banner.jpg';
import { Algos } from '../utils/Algos';


function MainPage() {

  return (
    <div className='flexContainer'>
      
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
              <img style={{flex:'2'}} src={window.location.origin + Algo.path} alt="img" className='algoScreenshot'/>
              <div style={{display:'flex', flexDirection:'column',flex:'3'}}>
                <label style={{textAlign:'center', fontSize:'40px', fontWeight:'bold', textDecorationLine:'underline'}}>{Algo.title}</label>
                <p style={{flex:'3', fontSize:'25px'}} >{Algo.desc}</p>
              </div>
              
            </div>
        ))}
      </div>
      
      
    </div>
  );
}

export default MainPage;