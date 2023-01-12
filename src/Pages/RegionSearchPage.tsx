import { LatLngBoundsExpression } from 'leaflet';
import React from 'react';
import { useState } from 'react';
import { Rectangle } from 'react-leaflet';
import Map from '../Components/Map';
import InputForm from '../Components/InputForm';

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
        
      <div className="algoStartTitle">Region Search Page</div>

      <div style={{display: 'flex', paddingTop: '5vh', height: '80vh', justifyContent: 'space-evenly'}}>

          <InputForm 
          onSubmit={handleSubmitRS}
          >
          <label>Step 1: Enter K value </label>
          <input type="number"
                required
                value={kValue}
                onChange = {(e) => setKValue(parseInt(e.target.value))}
          />
          <label>Step 2: Draw a rectangle on the map</label>
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
            rsResponse && rsResponse.map((points: { latlngs: LatLngBoundsExpression; id: React.Key | null | undefined; }) =>(
              <Rectangle bounds={points.latlngs} pathOptions={limeOptions} key={points.id} />
            ))
          }
        </Map>

      </div>
        
    </div> 
  );
}

export default RegionSearchPage;