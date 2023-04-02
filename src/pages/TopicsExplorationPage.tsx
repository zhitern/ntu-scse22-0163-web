import { LatLngBoundsExpression } from 'leaflet';
import React from 'react';
import { useState } from 'react';
import { Rectangle } from 'react-leaflet';
import Map from '../components/Map';
import InputForm from '../components/InputForm';

function TopicsExplorationPage() {
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
    <div>hi</div>
  );
}

export default TopicsExplorationPage;