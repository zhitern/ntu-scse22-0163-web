import React from 'react';
import { useState } from 'react';
import Map from '../Components/Map';

function DeepRegionRepresentationPage() {
  const[mapShapes, setMapShapes] = useState({id:'', latlngs:''});

  const[drawFlag, setDrawFlag] = useState({ rectangle:true,
                                            polygon:false,
                                            polyline:false,
                                            circle:false,
                                            circlemarker:false,
                                            marker:false });

  const [kValue, setKValue] = useState(1);


  return (
    <Map mapShapes={mapShapes} setMapShapes={setMapShapes} drawFlag={drawFlag} setDrawFlag={setDrawFlag} 
    page={'Region Search'} kValue={kValue} setKValue={setKValue}/>
  );
}

export default DeepRegionRepresentationPage;