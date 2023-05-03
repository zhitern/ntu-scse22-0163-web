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

  interface drrResponse {
    "result":{"stat":number, "remark":any},
    "data":{
      "land_use_truth":Array<number>,
      "land_use_pred":Array<number>,
      "population_truth":number,
      "population_pred":number
    }
  }

  const center = [1.3484815128554006, 103.68351020563715];
  
  const[mapShapes, setMapShapes] = useState<MapShape>({id:'', latlngs: []});

  const[drawFlag, setDrawFlag] = useState({ rectangle:true,
                                            polygon:false,
                                            polyline:false,
                                            circle:false,
                                            circlemarker:false,
                                            marker:false });

  const [drrResponse, setDrrResponse] = useState<drrResponse>({ "result":{
                                                    "stat":400,
                                                    "remark":null
                                                  },

                                                  "data":{
                                                    "land_use_truth":[],
                                                    "land_use_pred":[],
                                                    "population_truth":0,
                                                    "population_pred":0
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
    const query = {"region": {"xmin": Math.round((mapShapes.latlngs[0].lng)*1000000)/1000000, 
                         "ymin": Math.round((mapShapes.latlngs[0].lat)*1000000)/1000000, 
                         "xmax": Math.round((mapShapes.latlngs[2].lng)*1000000)/1000000,
                         "ymax": Math.round((mapShapes.latlngs[2].lat)*1000000)/1000000}};

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
        .catch(err => {
          alert(err.message);
          console.log(err.message);
          
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
              <label style={{whiteSpace:'pre-wrap', color:'blue'}}>Coordinates of the shape (sw, nw, ne, se):{'\n'}{'\n'}</label>
              <div style={{maxWidth: '100px'}}>
                {mapShapes.id!='' && mapShapes.latlngs.map((latlng: any)=>(
                  <div style={{display:'flex'}}>
                    <p style={{marginRight:'5px'}}>{latlng.lat.toFixed(3)},</p>
                    <p>{latlng.lng.toFixed(3)}</p>
                  </div>
                ))}
              </div>
              <label style={{whiteSpace:'pre-wrap', fontSize:'25px'}}>{'\n'}- Step 2: Click submit to see the results</label>

              
            </InputForm>
          </div>
          
          <div style={{background:'lightgrey', borderRadius:'20px', marginTop:'10px', padding:'5px', maxWidth:'430px'}}>
            <label style={{whiteSpace:'pre-wrap', color:'black', fontSize:'35px'}}>{'\n'}Results:{'\n'}</label>
            
            <p>Legend:</p>
            <div style={{border:"solid", display:"flex"}}>
                  <div style={{flex:'1', backgroundColor:"green", padding:"3px", color:"white"}}>Open Space</div>
                  <div style={{flex:'1', backgroundColor:"yellow", padding:"3px"}}>Industrial</div>
                  <div style={{flex:'1', backgroundColor:"red", padding:"3px", color:"white"}}>Residential</div>
                  <div style={{flex:'1', backgroundColor:"blue", padding:"3px", color:"white"}}>Commercial</div>
                  <div style={{flex:'1', backgroundColor:"purple", padding:"3px", color:"white"}}>Others</div>
            </div>
            
            <p style={{whiteSpace:'pre-wrap', fontWeight:'bold', fontSize:'20px', color:'crimson'}}>{'\n'}1. Land Use Truth:</p>
            
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
                    { title: 'Residential', value: Number(drrResponse.data.land_use_truth[0].toFixed(2)), color: 'red' },
                    { title: 'Commercial', value: Number(drrResponse.data.land_use_truth[1].toFixed(2)), color: 'blue' },
                    { title: 'Industrial', value: Number(drrResponse.data.land_use_truth[2].toFixed(2)), color: 'yellow' },
                    { title: 'Open Space', value: Number(drrResponse.data.land_use_truth[3].toFixed(2)), color: 'green' },
                    { title: 'Others', value: Number(drrResponse.data.land_use_truth[4].toFixed(2)), color: 'purple' }
                  ]}
                />
              </div>
            }

            
            <p style={{whiteSpace:'pre-wrap', fontWeight:'bold', fontSize:'20px', color:'crimson'}}>{'\n'}2. Land Use Prediction:{'\n'}</p>
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
                    { title: 'Residential', value: Number(drrResponse.data.land_use_pred[0].toFixed(2)), color: 'red' },
                    { title: 'Commercial', value: Number(drrResponse.data.land_use_pred[1].toFixed(2)), color: 'blue' },
                    { title: 'Industrial', value: Number(drrResponse.data.land_use_pred[2].toFixed(2)), color: 'yellow' },
                    { title: 'Open Space', value: Number(drrResponse.data.land_use_pred[3].toFixed(2)), color: 'green' },
                    { title: 'Others', value: Number(drrResponse.data.land_use_pred[4].toFixed(2)), color: 'purple' }
                  ]}
                />
              </div>
            }
            <p style={{whiteSpace:'pre-wrap', fontWeight:'bold', fontSize:'20px', color:'crimson'}}>{'\n'}3. Population Prediction: </p>
            <p>{Number(drrResponse.data.population_pred).toFixed(0)} people/kilometer square{'\n'}</p>
            <p style={{whiteSpace:'pre-wrap', fontWeight:'bold', fontSize:'20px', color:'crimson'}}>{'\n'}4. Population Truth: </p>
            <p>{Number(drrResponse.data.population_truth).toFixed(0)} people/kilometer square{'\n'}{'\n'}</p>
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

        <Map center = {center} mapShapes={mapShapes} setMapShapes={setMapShapes} drawFlag={drawFlag} setDrawFlag={setDrawFlag} setDrrResponse={setDrrResponse}
        page={'Region Search'} />

      </div>  
        
    </div> 
  );
}

export default DeepRegionRepresentationPage;