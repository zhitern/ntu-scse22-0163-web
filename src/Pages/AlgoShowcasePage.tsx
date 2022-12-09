import React from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet'
import { useState } from 'react';

import 'leaflet/dist/leaflet.css';
import './AlgoShowcasePage.css';

import Navbar from '../Components/Navbar';
import { LatLng } from 'leaflet';

function LocateSelf() {
  const [position, setPosition] = useState<LatLng | null>(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

function AlgoShowcasePage() {
  return (
    <div style={{minHeight: '100vh'}}>
      <div className="Top" style={{maxHeight:'20vh'}}>
        <h1 className="Title">Title/logo</h1>
        <Navbar/>
      </div>
      <div style={{display: 'flex', paddingTop: '5vh', height: '80vh', justifyContent: 'space-evenly'}}>
        <div className="InputBox" style={{background: 'red', display: 'inline-block'}}>
          INPUT BOX
          <div>test 1</div>
          <div>test 2</div>
        </div>
        <MapContainer id='map' style={{width: '65%', display: 'inline-block'}} center={[50.5, 30.5]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocateSelf/>
        </MapContainer>
      </div>
    </div>
  );
}

export default AlgoShowcasePage;