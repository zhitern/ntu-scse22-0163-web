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

function DeepRegionRepresentationPage() {
  const[mapShapes, setMapShapes] = useState({id:'', latlngs:''});

  const _onCreate = (e: any) => {
    console.log(e);

    const{layerType, layer} = e;
    
    // add if statement if need to treate shapes differently
    // to-do: limit user to 1 input shape
    const {_leaflet_id} = layer;
    setMapShapes({id:_leaflet_id, latlngs: layer.getLatLngs()[0]});
  };

  const _onEdited = (e:any) => {
    setMapShapes({id:mapShapes.id, latlngs: Object.values(e.layers._layers)[0].getLatLngs()[0]});
  };
   

  const _onDeleted = (e:any) => {
    setMapShapes({id:'', latlngs: ''});
  }

   

  return (
    <div style={{minHeight: '100vh'}}>
      <div className="Top" style={{maxHeight:'20vh'}}>
        <h1 className="Title">Title/logo</h1>
        <Navbar/>
      </div>

      <div className="algoStartTitle">Deep Region Representation</div>

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
                         onEdited={_onEdited}
                         onDeleted={_onDeleted}
                         draw={{
                          rectangle:true,
                          polygon:true,
                          polyline:false,
                          circle:false,
                          circlemarker:false,
                          marker:false
            }} />
          </FeatureGroup>
          
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocateSelf/>
        </MapContainer>

      </div>
      <div style={{width: 'match-parent'}}>
        <p>{ JSON.stringify(mapShapes)}</p>
      </div>
      
    </div>
  );
}

export default DeepRegionRepresentationPage;