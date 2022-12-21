import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, FeatureGroup, Polygon, Rectangle } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw';
import { useState } from 'react';

import 'leaflet/dist/leaflet.css';
import '../Pages/AlgoShowcasePage.css';
import "leaflet-draw/dist/leaflet.draw.css";

import { control, Icon, LatLng, map, rectangle } from 'leaflet';

const Map = (props:any) => {

    // states:
    const polygon = [
      [1.368, 103.944],
      [1.353, 103.92],
      [1.347, 103.969],
    ]

    const rectangle = [
      [1.348, 103.69],
      [1.371, 103.733]
    ]
    const limeOptions = { color: 'lime' }

    // functions:
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

    const _onCreate = (e: any) => {
        console.log(e);
    
        const{layerType, layer} = e;
        
        // add if statement if need to treate shapes differently
        // to-do: limit user to 1 input shape
        const {_leaflet_id} = layer;
        props.setMapShapes({id:_leaflet_id, latlngs: layer.getLatLngs()[0]});
        props.setDrawFlag({ rectangle:false,
                      polygon:false,
                      polyline:false,
                      circle:false,
                      circlemarker:false,
                      marker:false });
      };
      
    const _onEdited = (e:any) => {
    props.setMapShapes({id:props.mapShapes.id, latlngs: Object.values(e.layers._layers)[0].getLatLngs()[0]});
    };
    

    const _onDeleted = (e:any) => {
    
    props.setMapShapes({id:'', latlngs: ''});
    console.log(e);
    
    };

    function handleSubmitDRR(event: React.SyntheticEvent<HTMLFormElement>)  {
    event.preventDefault();
    const latlngs = props.mapShapes.latlngs;
    const query = {latlngs}
    console.log(query);
    };

    function handleSubmitRS(event: React.SyntheticEvent<HTMLFormElement>)  {
      event.preventDefault();
      const latlngs = props.mapShapes.latlngs;
      const kValue = props.kValue;
      const query = {kValue, latlngs}
      console.log(query);
    };

    return ( 
        <div style={{minHeight: '100vh'}}>
        
  
        <div className="algoStartTitle">{props.page}</div>
  
        <div style={{display: 'flex', paddingTop: '5vh', height: '80vh', justifyContent: 'space-evenly'}}>
  
          <div className="InputBox" style={{background: 'white', display: 'inline-block'}}>
            
            { props.page === 'Deep Region Representation' && <form 
              onSubmit={handleSubmitDRR}
              style={{display:'flex', flexDirection:'column'}}>
              <label>Step 1: Draw a polygon or rectangle </label>
              <div style={{maxWidth: '100px'}}>
                <p>{ JSON.stringify(props.mapShapes,function(key, val) {
                  return val.toFixed ? Number(val.toFixed(3)) : val;})}</p>
              </div>
              <button>Submit</button>
            </form>}

            { props.page === 'Region Search' && 
              <form 
              onSubmit={handleSubmitRS}
              style={{display:'flex', flexDirection:'column'}}>
              <label>Step 1: Enter K value </label>
              <input type="number"
                    required
                    value={props.kValue}
                    onChange = {(e) => props.setKValue(parseInt(e.target.value))}
              />
              <label>Step 2: Draw a rectangle on the map</label>
              <div style={{maxWidth: '100px'}}>
                <p>{ JSON.stringify(props.mapShapes)}</p>
              </div>
              <button>Submit</button>
            </form>}

          </div>
  
          <MapContainer style={{height: 'match-parent', width: '65%', display: 'inline-block'}} center={[1.3484815128554006, 103.68351020563715]} zoom={13} scrollWheelZoom={true}>
            
            <FeatureGroup>
              <EditControl position='topright' 
                           onCreated={_onCreate}
                           onEdited={_onEdited}
                           onDeleteStop={_onDeleted}
                           draw={props.drawFlag} />
            </FeatureGroup>
            
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocateSelf/>

            <Rectangle bounds={rectangle} pathOptions={limeOptions} />

          </MapContainer>
  
        </div>
        
      </div> 
    );
}
 
export default Map;