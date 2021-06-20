import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';


const MarkerEmbed = ({m}) => {
  // eslint-disable-next-line no-unused-vars
  const [mapMarker, setMapMarker] = React.useState(null);
  const [showInfo, setShowInfo] = React.useState(false);

  console.log(m);

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
        onLoad={onLoad}
        position={{lat: m.venueCoordinates[0], lng: m.venueCoordinates[1]}}
        clickable
        onClick={onMarkerClick}
      >
        {showInfo === true && (
          <InfoWindow
            position={{lat: m.venueCoordinates[0], lng: m.venueCoordinates[1]}}
            onCloseClick={infoWindowClose}
          >
            <div>
              <p>opdfjgpodf</p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
}

export default MarkerEmbed;