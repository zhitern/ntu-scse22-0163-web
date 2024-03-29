import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, FeatureGroup, Polygon, Rectangle } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw';
import { useState } from 'react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import '../pages/AlgoShowcasePage.css';
import "leaflet-draw/dist/leaflet.draw.css";

import { control, Icon, LatLng, LatLngBoundsExpression, map, rectangle } from 'leaflet';

const Map = forwardRef((props:any, ref) => {
    const featureGroupRef = useRef<L.FeatureGroup>(null);
    
    const [displayDrawTools, SetDisplayDrawTools] = useState(true)

    // functions:
    useImperativeHandle(ref, () => ({
      ClearShapes(){
        featureGroupRef.current?.clearLayers();
        SetDisplayDrawTools(true);
        props.setMapShapes({id:'', latlngs: ''});
      },
    }));
    function LocateSelf() {

        const [position, setPosition] = useState<LatLng | null>(null)
        const map = useMapEvents({
          click() {
            map.locate()
          },
          locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
          },
        })
      
        return position === null ? null : (
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
        )
      };

    const _onCreate = (e: any) => {
        SetDisplayDrawTools(false);
    
        const{layerType, layer} = e;
        const {_leaflet_id} = layer;
        props.setMapShapes({id:_leaflet_id, latlngs: layer.getLatLngs()[0]});
      };
      
    const _onEdited = (e:any) => {
      const values = Object.keys(e.layers._layers).map(key => e.layers._layers[key]);
      props.setMapShapes({id:props.mapShapes.id, latlngs: values[0].getLatLngs()[0]});
    };

    const _onDeleted = (e:any) => {
      // add error check to make sure theres <= 0 shapes in array before enabling draw again
      if (featureGroupRef.current?.getLayers().length === 0){
        SetDisplayDrawTools(true);
        props.setMapShapes({id:'', latlngs: ''});
      }
    };

    return (
          <MapContainer style={{height: 'match-parent', width: '65%', display: 'inline-block'}} center={props.center} zoom={13} scrollWheelZoom={true}>
            
            <FeatureGroup ref={featureGroupRef}>
              {displayDrawTools && <EditControl position='topright' 
                           onCreated={_onCreate}
                           onEdited={_onEdited}
                           onDeleteStop={_onDeleted}
                           draw={props.drawFlag} 
                           edit = {{edit: false, remove: false}} />}
              {displayDrawTools && <EditControl position='topright' 
                           onCreated={_onCreate}
                           onEdited={_onEdited}
                           onDeleteStop={_onDeleted}
                           draw={{ rectangle:false,
                            polygon:false,
                            polyline:false,
                            circle:false,
                            circlemarker:false,
                            marker:false }} 
                           edit = {{edit: true, remove: true}} />}
              {!displayDrawTools && <EditControl position='topright' 
                           onCreated={_onCreate}
                           onEdited={_onEdited}
                           onDeleteStop={_onDeleted}
                           draw={{ rectangle:false,
                            polygon:false,
                            polyline:false,
                            circle:false,
                            circlemarker:false,
                            marker:false }} 
                           edit = {{edit: true, remove: true}} />}
            </FeatureGroup>
            
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {props.children}
          </MapContainer>
    );
});
 
export default Map;