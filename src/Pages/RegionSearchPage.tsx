import { LatLngBoundsExpression } from 'leaflet';
import React from 'react';
import { useState } from 'react';
import { Rectangle } from 'react-leaflet';
import Map from '../components/Map';
import InputForm from '../components/InputForm';

function RegionSearchPage() {
  const [rsResponse, setRsResponse] = useState<Object | null>(null);
  const [mapShapes, setMapShapes] = useState({id:'', latlngs:''});
  const [drawFlag, setDrawFlag] = useState({ rectangle:true,
                                            polygon:false,
                                            polyline:false,
                                            circle:false,
                                            circlemarker:false,
                                            marker:false });
  const [kValue, setKValue] = useState(1);
  const limeOptions = { color: 'lime' }

  function handleSubmitRS(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const latlngs = mapShapes.latlngs;
    const query = {
      'kValue': kValue, 
      'region': latlngs
    }
    console.log("SENDING: ");
    console.log(query);
    fetch('http://localhost:8000/RegionSearch', {
      method: 'POST',
      body: JSON.stringify(query)
    })
      .then(res =>{
        console.log("Received:")
        console.log(res)
        if (res['status'] == 200){
          res.json().then(data =>{
            if (data.hasOwnProperty('data')){
              setRsResponse(data['data']);
            }
            else{
              // no response found, popup notify error?
            }
          })
        }
      }).catch(error => {console.log(error)});
  };

  return (
    <div style={{minHeight: '100vh'}}>
        
      <div className="algoStartTitle">Region Search Page</div>

      <div style={{display: 'flex', paddingTop: '5vh', height: '80vh', justifyContent: 'space-evenly'}}>

          <InputForm 
          onSubmit={handleSubmitRS}
          >
          <label style={{whiteSpace:'pre-wrap', fontSize:'25px'}}>Step 1: Enter K value </label>
          <br />
          <input type="number"
                required
                value={kValue}
                onChange = {(e) => setKValue(parseInt(e.target.value))}
          />
          <br />
          <label style={{whiteSpace:'pre-wrap', fontSize:'25px'}}>Step 2: Draw a rectangle on the map</label>
          <br />
          <div style={{maxWidth: '100px'}}>
            <p>
              {JSON.stringify(mapShapes,function(key, val) {
              return val.toFixed ? Number(val.toFixed(3)) : val;})}
            </p>
          </div>
        </InputForm>
        
        <Map mapShapes={mapShapes} setMapShapes={setMapShapes} drawFlag={drawFlag} setDrawFlag={setDrawFlag}
        page={'Region Search'} kValue={kValue} setKValue={setKValue}>
          {// Region Search response display
            rsResponse && Array.isArray(rsResponse) && rsResponse.map((points: { latlngs: LatLngBoundsExpression; id: React.Key | null | undefined; }) =>(
              <Rectangle bounds={points.latlngs} pathOptions={limeOptions} key={points.id} />
            ))
          }
        </Map>

      </div>
        
    </div> 
  );
}

export default RegionSearchPage;