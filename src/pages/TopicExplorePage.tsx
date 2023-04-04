import React from 'react';
import { useState, useEffect} from 'react';
import Map from '../components/Map';
import InputForm from '../components/InputForm';
import { Rectangle } from 'react-leaflet';
import { LatLngBoundsExpression } from 'leaflet';
import Dropdown from 'react-bootstrap/Dropdown';

function DeepRegionRepresentationPage() {
  interface MapShape {
    id: string;
    latlngs: { lat: number; lng: number }[];
  }

  const center = [-36.49993, 145.3756477];
  const Bounds:LatLngBoundsExpression = [
    [-33.999,140.9502954],
    [-39.000859999999996, 149.80100000000002]
  ];
  const limeOptions = { color: 'silver' }
  
  const[mapShapes, setMapShapes] = useState<MapShape>({id:'', latlngs: []});

  const[drawFlag, setDrawFlag] = useState({ rectangle:true,
                                            polygon:false,
                                            polyline:false,
                                            circle:false,
                                            circlemarker:false,
                                            marker:false });

  const [topics, setTopics] = useState([]);
  const [topicSelected, setTopicSelected] = useState(0);
  const [tweets, setTweets] = useState([]);
  const [topicsLoaded, setTopicsLoaded] = useState(false);
  const [dropDownText, setDropdownText] = useState('Select Topics');
  let count = 1;

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
    fetch('http://localhost:8000/TopicExploration', {
      method: 'POST',
      body: JSON.stringify(query)
    }).then(res =>{
        return res.json()
      }).then(data =>{
        console.log(data);
        for(let i=0; i<10; i++){
          data.topics[i].id = i
        }
        setTopics(data.topics);
        console.log(data.topics);
        
        setTweets(data.tweets);
        setTopicsLoaded(true);
        })
  };

  return (
    <div style={{minHeight: '100vh'}}>
        
      <div className="algoStartTitle">Region Topic Exploration</div>

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
            <label style={{whiteSpace:'pre-wrap', color:'black', fontSize:'35px'}}>{'\n'}Topics:{'\n'}</label>
            {topicsLoaded && 
              topics.map((topic:any) => (
                topic['words'].map((word:any) => (<p>{word.word}</p>))))
            }
          </div>
        </div>

        <Map center = {center} mapShapes={mapShapes} setMapShapes={setMapShapes} drawFlag={drawFlag} setDrawFlag={setDrawFlag} setDrrResponse={setTopics}
        page={'Region Search'}> 
          <Rectangle bounds={Bounds} pathOptions={limeOptions} />
        </Map>

      </div>  
        
    </div> 
  );
}

export default DeepRegionRepresentationPage;