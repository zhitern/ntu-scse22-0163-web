import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, FeatureGroup, Polygon, Rectangle } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw';
import { useState } from 'react';

import 'leaflet/dist/leaflet.css';
import '../Pages/AlgoShowcasePage.css';
import "leaflet-draw/dist/leaflet.draw.css";

import { control, Icon, LatLng, LatLngBoundsExpression, map, rectangle } from 'leaflet';

const Map = (props:any) => {
    const [displayDrawTools, SetDisplayDrawTools] = useState(true)

    // states:

    const [rsResponse, setRsResponse] = useState(null);
    const [drrResponse, setDrrResponse] = useState(null);

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
        SetDisplayDrawTools(false);
    
        const{layerType, layer} = e;
        const {_leaflet_id} = layer;
        props.setMapShapes({id:_leaflet_id, latlngs: layer.getLatLngs()[0]});
      };
      
    const _onEdited = (e:any) => {
      const values = Object.keys(e.layers._layers).map(key => e.layers._layers[key]);
      props.setMapShapes({id:props.mapShapes.id, latlngs: values[0].getLatLngs()[0]});
      setRsResponse(null);
      setDrrResponse(null);
    };
    

    const _onDeleted = (e:any) => {
      //add error check to make sure theres <= 0 shapes in array before enabling draw again
      // if (drawnItems.getLayers().length === 0){
      //   SetDisplayDrawTools(true);
      // }
      SetDisplayDrawTools(true);
      props.setMapShapes({id:'', latlngs: ''});
      console.log(e);
      setRsResponse(null);
      setDrrResponse(null);
    };

    function handleSubmitDRR(event: React.SyntheticEvent<HTMLFormElement>)  {
      event.preventDefault();
      const latlngs = props.mapShapes.latlngs;
      const query = {latlngs}
      //console.log(query);
      fetch('http://localhost:8000/DRR')
        .then(res =>{
          return res.json()
        })
        .then(data =>{
          console.log(data);
          fetch('http://localhost:8000/DRR')
          .then(res =>{
            return res.json()
          })
          .then(data =>{
            setDrrResponse(data);
          })
        })
    };

    function handleSubmitRS(event: React.SyntheticEvent<HTMLFormElement>)  {
      event.preventDefault();
      const latlngs = props.mapShapes.latlngs;
      const kValue = props.kValue;
      const query = {kValue, latlngs}
      console.log(query);
      fetch('http://localhost:8000/RS')
        .then(res =>{
          return res.json()
        })
        .then(data =>{
          setRsResponse(data);
        })
    };

    return ( 
        <div style={{minHeight: '100vh'}}>
        
  
        <div className="algoStartTitle">{props.page}</div>
  
        <div style={{display: 'flex', paddingTop: '5vh', height: '80vh', justifyContent: 'space-evenly'}}>
  
          <div className="InputBox" style={{background: 'white', display: 'inline-block'}}>
            
            { // Deep Region Search form
              props.page === 'Deep Region Representation' && <form 
                onSubmit={handleSubmitDRR}
                style={{display:'flex', flexDirection:'column'}}>
                <label>Step 1: Draw a polygon or rectangle </label>
                <div style={{maxWidth: '100px'}}>
                  <p>{ JSON.stringify(props.mapShapes,function(key, val) {
                    return val.toFixed ? Number(val.toFixed(3)) : val;})}
                  </p>
                </div>
                <button>Submit</button>
              </form>
            }

            { // Region Search form
              props.page === 'Region Search' && 
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
                  <p>{ JSON.stringify(props.mapShapes,function(key, val) {
                    return val.toFixed ? Number(val.toFixed(3)) : val;})}
                  </p>
                </div>
                <button>Submit</button>
              </form>
            }
            
            {// Deep Region Representation response display
              drrResponse && 
              drrResponse.map((stat: any) => (
                <p key={stat.id}>{stat.id}: {stat.value}</p>
              ))

            }

          </div>
  
          <MapContainer style={{height: 'match-parent', width: '65%', display: 'inline-block'}} center={[1.3484815128554006, 103.68351020563715]} zoom={13} scrollWheelZoom={true}>
            
            <FeatureGroup>
              {displayDrawTools && <EditControl position='topright' 
                           onCreated={_onCreate}
                           onEdited={_onEdited}
                           onDeleteStop={_onDeleted}
                           draw={props.drawFlag} 
                           edit = {{edit: false, remove: false}} />}
              {displayDrawTools && <EditControl position='topright' 
                           onCreated={_onCreate}
                           onEdited={_onEdited}
                           onDeleteStop={_onDeleted}
                           draw={{ rectangle:false,
                            polygon:false,
                            polyline:false,
                            circle:false,
                            circlemarker:false,
                            marker:false }} 
                           edit = {{edit: true, remove: true}} />}
              {!displayDrawTools && <EditControl position='topright' 
                           onCreated={_onCreate}
                           onEdited={_onEdited}
                           onDeleteStop={_onDeleted}
                           draw={{ rectangle:false,
                            polygon:false,
                            polyline:false,
                            circle:false,
                            circlemarker:false,
                            marker:false }} 
                           edit = {{edit: true, remove: true}} />}
            </FeatureGroup>
            
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocateSelf/>
            
            {// Region Search response display
              rsResponse && rsResponse.map((points: { latlngs: LatLngBoundsExpression; id: React.Key | null | undefined; }) =>(
                <Rectangle bounds={points.latlngs} pathOptions={limeOptions} key={points.id} />
              )) 
            }


          </MapContainer>
  
        </div>
        
      </div> 
    );
}
 
export default Map;