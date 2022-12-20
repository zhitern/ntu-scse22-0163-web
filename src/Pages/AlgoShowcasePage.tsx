import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, useMap } from 'react-leaflet'
import { useState, useEffect } from 'react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import './AlgoShowcasePage.css';

import Navbar from '../Components/Navbar';
import Map from '../Components/Map'
import { Icon, LatLng } from 'leaflet';

// function LocateSelf() {
//   //const [position, setPosition] = useState<LatLng | null>(null)
//   // const map = useMapEvents({
//   //   click() {
//   //     map.locate()
//   //   },
//   //   locationfound(e) {
//   //     setPosition(e.latlng)
//   //     map.flyTo(e.latlng, map.getZoom())
//   //   },
//   // })
//   const map = useMap();
//   map.locate({setView: true});

//   // return position === null ? null : (
//   //   <Marker position={position}>
//   //     <Popup>You are here</Popup>
//   //   </Marker>
//   // )
// }
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
          {/* <div><button onClick={LocateSelf}>Locate Self</button></div> */}
          <div>test 1</div>
          <div>test 2</div>
        </div>
        
        <Map />
        
        {/* <MapContainer style={{height: 'match-parent', width: '65%', display: 'inline-block'}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer> */}
      </div>
    </div>
  );
}

export default AlgoShowcasePage;