import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';


const MarkerEmbed = ({m}) => {
  // eslint-disable-next-line no-unused-vars
  const [mapMarker, setMapMarker] = React.useState(null);
  const [showInfo, setShowInfo] = React.useState(false);
  
  const onMarkerClick = () => {
    setShowInfo(true);
  };

  const infoWindowClose = () => {
    setShowInfo(false);
  }
  
  const onLoad = (mapMarker) => {
    setMapMarker(mapMarker);
  };

    return (
      <Marker
        key={m.lat}
        onLoad={onLoad}
        position={{lat: m.lat, lng: m.lng}}
        clickable
        onClick={onMarkerClick}
      >
        {showInfo === true && (
          <InfoWindow
            position={m}
            onCloseClick={infoWindowClose}
          >
            <div>
              <h5>{m.info.name}</h5>
              <p>{m.info.rating} stars</p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
}

export default MarkerEmbed;