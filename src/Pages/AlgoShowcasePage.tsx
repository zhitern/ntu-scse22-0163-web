import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, FeatureGroup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw';
import { useState } from 'react';

import 'leaflet/dist/leaflet.css';
import './AlgoShowcasePage.css';
import "leaflet-draw/dist/leaflet.draw.css";

import Navbar from '../Components/Navbar';
import { Icon, LatLng, map, rectangle } from 'leaflet';

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
};

function AlgoShowcasePage() {
  const[mapShapes, setMapShapes] = useState([{}]);

  const _onCreate = (e: any) => {
    console.log(e);

    const{layerType, layer} = e;
    
    // add if statement if need to treate shapes differently
    const {_leaflet_id} = layer;
    setMapShapes(layers => [...layers, {id:_leaflet_id, latlngs: layer.getLatLngs()[0]}]);
    console.log(JSON.stringify(mapShapes))
  };

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

        <MapContainer style={{height: 'match-parent', width: '65%', display: 'inline-block'}} center={[1.3484815128554006, 103.68351020563715]} zoom={13} scrollWheelZoom={true}>
          
          <FeatureGroup>
            <EditControl position='topright' 
                         onCreated={_onCreate}
                         draw={{
                          rectangle:true,
                          polygon:true,
                          polyline:false,
                          circle:false,
                          circlemarker:false
                         }} />
          </FeatureGroup>
          
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

        </MapContainer>

      </div>
      <div style={{width: 'match-parent'}}>
        <pre>{ JSON.stringify(mapShapes)}</pre>
      </div>
      
    </div>
  );
}

export default AlgoShowcasePage;