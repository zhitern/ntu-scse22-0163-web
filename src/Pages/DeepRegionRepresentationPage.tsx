import React from 'react';
import { useState } from 'react';
import Map from '../Components/Map';

function DeepRegionRepresentationPage() {
  const[mapShapes, setMapShapes] = useState({id:'', latlngs:''});

  const[drawFlag, setDrawFlag] = useState({ rectangle:true,
                                            polygon:true,
                                            polyline:false,
                                            circle:false,
                                            circlemarker:false,
                                            marker:false });
                                            


  return (
    <Map mapShapes={mapShapes} setMapShapes={setMapShapes} drawFlag={drawFlag} setDrawFlag={setDrawFlag} page={'Deep Region Representation'}/>
  );
}

export default DeepRegionRepresentationPage;