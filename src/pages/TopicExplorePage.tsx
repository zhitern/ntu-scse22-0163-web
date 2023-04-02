import React from 'react';
import { useState } from 'react';
import Map from '../components/Map';
import InputForm from '../components/InputForm';
import { PieChart } from 'react-minimal-pie-chart';

function DeepRegionRepresentationPage() {
  interface MapShape {
    id: string;
    latlngs: { lat: number; lng: number }[];
  }
  
  const[mapShapes, setMapShapes] = useState<MapShape>({id:'', latlngs: []});

  const[drawFlag, setDrawFlag] = useState({ rectangle:true,
                                            polygon:false,
                                            polyline:false,
                                            circle:false,
                                            circlemarker:false,
                                            marker:false });

  const [drrResponse, setDrrResponse] = useState({ "result":{
                                                    "stat":400,
                                                    "remark":null
                                                  },

                                                  "data":{
                                                    "land_use_truth":[],
                                                    "land_use_pred":[],
                                                    "population_truth":[],
                                                    "population_pred":[]
                                                  } 
                                                });

  const [drrResponseLoaded, setDrrResponseLoaded] = useState(false);

  function handleSubmitDRR(event: React.SyntheticEvent<HTMLFormElement>)  {
    event.preventDefault();

    //input validation: is shape drawn?
    if (mapShapes.id === ''){
      alert('Please draw a shape');
      return;
    }

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
        console.log(data);
        
        if(data["result"]["stat"] === 400){
          alert(data["result"]["remark"]);
          return;
        }

        if(data["result"]["stat"] === 200){
          alert(data["result"]["remark"])
        }

        if (data.hasOwnProperty('data')){
          setDrrResponse(data);
          setDrrResponseLoaded(true);
        }
        })
  };

  return (
    <div style={{minHeight: '100vh'}}>
        
      <div className="algoStartTitle">Deep Region Representation</div>

      <div style={{display: 'flex', paddingTop: '5vh', height: '80vh', justifyContent: 'space-evenly'}}>


        <div style={{display: 'flex', flexDirection:'column'}}>
          <div>
            <InputForm
              onSubmit={handleSubmitDRR}
              >
              <label style={{whiteSpace:'pre-wrap', fontSize:'25px'}}>- Step 1: Draw a polygon or rectangle{'\n'}{'\n'}</label>
              <label style={{whiteSpace:'pre-wrap', color:'blue'}}>Coordinates of the shape:{'\n'}{'\n'}</label>
              <div style={{maxWidth: '100px'}}>
                <p>{ JSON.stringify(mapShapes.latlngs,function(key, val) {
                  return val.toFixed ? Number(val.toFixed(3)) : val;})}
                </p>
              </div>
              <label style={{whiteSpace:'pre-wrap', fontSize:'25px'}}>{'\n'}- Step 2: Click submit to see the results</label>

              
            </InputForm>
          </div>
          
          <div style={{background:'lightgrey', borderRadius:'20px', marginTop:'10px', padding:'5px', maxWidth:'430px'}}>
            <label style={{whiteSpace:'pre-wrap', color:'black', fontSize:'35px'}}>{'\n'}Results:{'\n'}</label>

            <p style={{whiteSpace:'pre-wrap', fontWeight:'bold', fontSize:'20px', color:'crimson'}}>{'\n'}Land Use Truth:</p>
            
            {drrResponse.result.stat === 200 && 
              <div>
                <PieChart 
                  radius={20}
                  lineWidth={60}
                  center={[30, 30]}
                  viewBoxSize={[80,60]}
                  totalValue={1}
                  label={(data) => data.dataEntry.title +': '+ data.dataEntry.value * 100+ '%'}
                  labelPosition={95}
                  labelStyle={{
                    fontSize: "3px",
                    fontWeight: "800",
                  }}
                  data={[
                    { title: 'Residential', value: drrResponse.data.land_use_truth[0], color: 'red' },
                    { title: 'Commercial', value: drrResponse.data.land_use_truth[1], color: 'blue' },
                    { title: 'Industrial', value: drrResponse.data.land_use_truth[2], color: 'yellow' },
                    { title: 'Open Space', value: drrResponse.data.land_use_truth[3], color: 'green' },
                    { title: 'Others', value: drrResponse.data.land_use_truth[4], color: 'purple' }
                  ]}
                />
              </div>
            }

            
            <p style={{whiteSpace:'pre-wrap', fontWeight:'bold', fontSize:'20px', color:'crimson'}}>{'\n'}Land Use Prediction:{'\n'}</p>
            {drrResponse.result.stat === 200 && 
              <div>
                <PieChart 
                  radius={20}
                  lineWidth={60}
                  center={[30, 30]}
                  viewBoxSize={[80,60]}
                  totalValue={1}
                  label={(data) => data.dataEntry.title +': '+ data.dataEntry.value * 100+ '%'}
                  labelPosition={95}
                  labelStyle={{
                    fontSize: "3px",
                    fontWeight: "800",
                  }}
                  data={[
                    { title: 'Residential', value: drrResponse.data.land_use_pred[0], color: 'red' },
                    { title: 'Commercial', value: drrResponse.data.land_use_pred[1], color: 'blue' },
                    { title: 'Industrial', value: drrResponse.data.land_use_pred[2], color: 'yellow' },
                    { title: 'Open Space', value: drrResponse.data.land_use_pred[3], color: 'green' },
                    { title: 'Others', value: drrResponse.data.land_use_pred[4], color: 'purple' }
                  ]}
                />
              </div>
            }
            <p style={{whiteSpace:'pre-wrap', fontWeight:'bold', fontSize:'20px', color:'crimson'}}>{'\n'}Population Prediction: {drrResponse.data.population_pred} people/kilometer square{'\n'}</p>
            <p style={{whiteSpace:'pre-wrap', fontWeight:'bold', fontSize:'20px', color:'crimson'}}>{'\n'}Population Truth: {drrResponse.data.population_truth} people/kilometer square{'\n'}{'\n'}</p>
            
          </div>
        </div>
        
        
              
              
          
          
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

        <Map mapShapes={mapShapes} setMapShapes={setMapShapes} drawFlag={drawFlag} setDrawFlag={setDrawFlag} setDrrResponse={setDrrResponse}
        page={'Region Search'} />

      </div>  
        
    </div> 
  );
}

export default DeepRegionRepresentationPage;