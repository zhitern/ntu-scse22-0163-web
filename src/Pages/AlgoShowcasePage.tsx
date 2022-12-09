import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';
import './AlgoShowcasePage.css';

import Navbar from '../Components/Navbar';
import { Icon } from 'leaflet';

function AlgoShowcasePage() {
  return (
    <div>
      <div className="Top">
        <h1 className="Title">Title/logo</h1>
        <Navbar/>
      </div>
      <div style={{display: 'flex', paddingTop: '5%', height: '70vh', justifyContent: 'space-evenly'}}>
        <div className="InputBox" style={{background: 'red', display: 'inline-block'}}>
          INPUT BOX
          <div>test 1</div>
          <div>test 2</div>
        </div>
        <MapContainer style={{height: 'match-parent', width: '65%', display: 'inline-block'}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />also 
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default AlgoShowcasePage;