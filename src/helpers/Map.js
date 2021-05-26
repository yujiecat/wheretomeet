import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { v4 as uuid } from 'uuid';
import DistanceService from './DistanceMatrix.js'

// test locations
const home = [
  {
    id: uuid(),
    name: 'Office',
    coords: [{ lat: 49, lng: -123.124675 }]
  },

{
    id: uuid(),
    name: 'Home',
    coords: [{ lat: 49.233700, lng: -123 }]
  },
];

function Map(props) {

	//grab home locations + suggestions here for markers + distance

	const containerStyle = {
		width: '40rem',
		height: '30rem',
		display: 'flex'
	};
	const coords = { lat: 49.233741, lng: -123.124675 }
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: "AIzaSyA5N_RMyoxca6XTwqQt6QBRFSXO91t_jgw"
	})
	// eslint-disable-next-line
	const [map, setMap] = React.useState(null);

	const onLoad = React.useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds();
		map.fitBounds(bounds);
		setMap(map);
	}, [])

	const onUnmount = React.useCallback(function callback(map){
		setMap(null)
	}, [])

	const markerLoad = marker => {
		console.log('marker: ', marker)
	}

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle = { containerStyle }
			center = { coords }
			zoom = { 11 }
			onLoad = { onLoad }
			onUnmount = { onUnmount }
		>
		{home.map((h) => {
			return (<Marker
				key = {h.name}
				onLoad = {markerLoad}
				position = {h.coords[0]}
			/>)
		})}
		<DistanceService props={home}/>
		</GoogleMap>
	) : <></>
}

export default React.memo(Map);