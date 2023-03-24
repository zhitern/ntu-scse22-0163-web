import React from 'react';
import { useState } from 'react';
import Map from '../components/Map';
import InputForm from '../components/InputForm';

function DeepRegionRepresentationPage() {
  interface MapShape {
    id: string;
    latlngs: { lat: number; lng: number }[];
  }
  
  const[mapShapes, setMapShapes] = useState<MapShape>({id:'', latlngs: []});

  const[drawFlag, setDrawFlag] = useState({ rectangle:true,
                                            polygon:true,
                                            polyline:false,
                                            circle:false,
                                            circlemarker:false,
                                            marker:false });

  const [drrResponse, setDrrResponse] = useState({
                                          "data":{
                                            "land_use_truth":null,
                                            "land_use_pred":null,
                                            "population_truth":null,
                                            "population_pred":null
                                          } 
                                        })

  function handleSubmitDRR(event: React.SyntheticEvent<HTMLFormElement>)  {
    event.preventDefault();
    const latlngs = mapShapes.latlngs;
    console.log(latlngs);

    // Building the query
    const query = {"region": {"lat": Math.round(latlngs[1]["lat"]*1000)/1000, 
                         "lng":  Math.round(latlngs[1]["lng"]*1000)/1000, 
                         "h": Math.abs(Math.round((latlngs[1]["lat"] - latlngs[0]["lat"])*1000)/1000),
                         "w": Math.abs(Math.round((latlngs[1]["lng"] - latlngs[2]["lng"])*1000)/1000)}};

    console.log(query);
    fetch('http://localhost:8000/DRR', {
      method: 'POST',
      body: JSON.stringify(query)
    }).then(res =>{
        return res.json()
      }).then(data =>{
          if (data.hasOwnProperty('data')){
            setDrrResponse(data);
          }
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
                <label style={{whiteSpace:'pre-wrap', fontSize:'25px'}}>- Step 1: Draw a polygon or rectangle{'\n'}{'\n'}</label>
                <label style={{whiteSpace:'pre-wrap', color:'blue'}}>Coordinates of the shape:{'\n'}{'\n'}</label>
                <div style={{maxWidth: '100px'}}>
                  <p>{ JSON.stringify(mapShapes,function(key, val) {
                    return val.toFixed ? Number(val.toFixed(3)) : val;})}
                  </p>
                </div>
                <label style={{whiteSpace:'pre-wrap', fontSize:'25px'}}>{'\n'}- Step 2: Click Submit </label>
                <div>
                  <label style={{whiteSpace:'pre-wrap', color:'crimson', fontSize:'25px'}}>{'\n'}Results:{'\n'}</label>

                  <p style={{whiteSpace:'pre-wrap'}}>{'\n'}Land Use Truth: {drrResponse.data.land_use_truth}{'\n'}</p>
                  <p style={{whiteSpace:'pre-wrap'}}>{'\n'}Land Use Prediction: {drrResponse.data.land_use_pred}{'\n'}</p>
                  <p style={{whiteSpace:'pre-wrap'}}>{'\n'}Population Prediction: {drrResponse.data.population_pred}{'\n'}</p>
                  <p style={{whiteSpace:'pre-wrap'}}>{'\n'}Population Truth: {drrResponse.data.population_truth}</p>
                 
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
        page={'Region Search'} />

      </div>
        
    </div> 
  );
}

export default DeepRegionRepresentationPage;