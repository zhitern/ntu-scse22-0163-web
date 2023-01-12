import React from 'react';
import { useState } from 'react';
import Map from '../Components/Map';
import InputForm from '../Components/InputForm';

function DeepRegionRepresentationPage() {
  const [drrResponse, setDrrResponse] = useState(null);
  const[mapShapes, setMapShapes] = useState({id:'', latlngs:''});

  const[drawFlag, setDrawFlag] = useState({ rectangle:true,
                                            polygon:true,
                                            polyline:false,
                                            circle:false,
                                            circlemarker:false,
                                            marker:false });

  const [kValue, setKValue] = useState(1);

  function handleSubmitDRR(event: React.SyntheticEvent<HTMLFormElement>)  {
    event.preventDefault();
    const latlngs = mapShapes.latlngs;
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

  return (
    <div style={{minHeight: '100vh'}}>
        
      <div className="algoStartTitle">Deep Region Representation</div>

      <div style={{display: 'flex', paddingTop: '5vh', height: '80vh', justifyContent: 'space-evenly'}}>

          { // Deep Region Search form
              <InputForm
                onSubmit={handleSubmitDRR}
                >
                <label>Step 1: Draw a polygon or rectangle </label>
                <div style={{maxWidth: '100px'}}>
                  <p>{ JSON.stringify(mapShapes,function(key, val) {
                    return val.toFixed ? Number(val.toFixed(3)) : val;})}
                  </p>
                </div>
              </InputForm>
            }
          
          {// Deep Region Representation response display
            //drrResponse && 
            // drrResponse.map((stat: any) => (
            //   <p key={stat.id}>{stat.id}: {stat.value}</p>
            // ))

            //have a map of default color scheme
            //defaultDir = (0, 1) - default reference axis
            //center = use average position of all points of polygon as center
            //add to polygon list, intersection point between line(center-default) and line (polygon[0]-polygon[-1])
            //find angle between each point of polygon and line
            //  use dot product
            //find angle needed for each section of stats
            //  use dot product
            // Loop
            //  find the 2 polygons this angle is between, prevPoly and nextPoly
            //  find intersection point between line(center-pie angle) and line(prevPoly-nextPoly)
            //  use prevPoly, [all poly between prevPoly and currPoly], currPoly, and center, to form a poly with specific color representing one stats
            //  prevPoly = currPoly

          }

        <Map mapShapes={mapShapes} setMapShapes={setMapShapes} drawFlag={drawFlag} setDrawFlag={setDrawFlag} 
        page={'Region Search'} kValue={kValue} setKValue={setKValue}/>

      </div>
        
    </div> 
  );
}

export default DeepRegionRepresentationPage;