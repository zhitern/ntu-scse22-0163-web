import { LatLngBoundsExpression } from 'leaflet';
import React from 'react';
import { useState } from 'react';
import { Rectangle } from 'react-leaflet';
import Map from '../Components/Map';
import InputForm from '../Components/InputForm';

function RegionSearchPage() {
  interface MapShape {
    id: string;
    latlngs: { lat: number; lng: number }[];
  }
  const center = [1.3484815128554006, 103.68351020563715];

  const [rsResponse, setRsResponse] = useState<Object | null>(null);
  const[mapShapes, setMapShapes] = useState<MapShape>({id:'', latlngs: []});
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

    //input validation: is shape drawn?
    if (mapShapes.id === ''){
      alert('Please draw a shape');
      return;
    }
    
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
          <label style={{whiteSpace:'pre-wrap', color:'blue'}}>Coordinates of the shape (sw, nw, ne, se):{'\n'}{'\n'}</label>
          <div style={{maxWidth: '100px'}}>
                {mapShapes.id!='' && mapShapes.latlngs.map((latlng: any)=>(
                  <div style={{display:'flex'}}>
                    <p style={{marginRight:'5px'}}>{latlng.lat.toFixed(3)},</p>
                    <p>{latlng.lng.toFixed(3)}</p>
                  </div>
                ))}
              </div>
        </InputForm>
        
        <Map center = {center} mapShapes={mapShapes} setMapShapes={setMapShapes} drawFlag={drawFlag} setDrawFlag={setDrawFlag}
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