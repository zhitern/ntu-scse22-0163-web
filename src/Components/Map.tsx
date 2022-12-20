import React from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, useMap } from 'react-leaflet'

function Map() {
    // React.useEffect(() => {
    //     var map = L.map('map', {
    //         center: [51.505, -0.09],
    //         zoom: 13
    //     });
    //   // create map
    // //   L.map('map', {
    // //     center: [49.8419, 24.0315],
    // //     zoom: 16,
    // //     layers: [
    // //       L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    // //         attribution:
    // //           '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    // //       }),
    // //     ]
    // //   });
    // }, []);
  
    return <MapContainer style={{height: 'match-parent', width: '65%', display: 'inline-block'}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
    </MapContainer>
  }

export default Map;