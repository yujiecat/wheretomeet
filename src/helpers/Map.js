import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
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

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15
}


function Map(props) {
	const {height, width, zoom, markers} = props;

	//grab home locations + suggestions here for markers + distance
		const containerStyle = {
		width: height,
		height: width
	};

	const hasSuggestions = (markers.length > 0)

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

	const showInfo = () => { 
		console.log('ayaya');
	}

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle = { containerStyle }
			center = { coords }
			setZoom = { zoom }
			onLoad = { onLoad }
			onUnmount = { onUnmount }
		>
		{home.map((h) => {
			return(<Marker
				title = {'duck'}
				clickable = {true}
				key = {h.name}
				onLoad = {markerLoad}
				position = {h.coords[0]}
				icon = {'https://upload.wikimedia.org/wikipedia/commons/3/34/Home-icon.svg'}
		/>)})}
		
		    <InfoWindow
				position = {coords}
    		>
				<div style={divStyle}>
					<h1>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</h1>
				</div>
			</InfoWindow>
		{hasSuggestions ? 
			markers.map((m) => {
			return (<Marker
				clickable = {true}
				key = {m.lat}
				onLoad = {markerLoad}
				position = {m}
			/>)}) : <></>}
		<DistanceService props={home}/>
		</GoogleMap>
	) : <></>
}

export default React.memo(Map);