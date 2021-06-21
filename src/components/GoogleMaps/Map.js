import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { v4 as uuid } from 'uuid';
import MarkerEmbed from './MarkerEmbed.js';

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


// use divStyle to adjust embed appearance

// const divStyle = {
//   background: `white`,
// }


function Maps(props) {
	const {height, width, zoom, markers, coords, info, homes} = props;

	//grab home locations + suggestions here for markers + distance
		const containerStyle = {
		width: height,
		height: width
	};

	const hasHomes = homes.length > 0;

	const suggestions = Array.from(markers);
	const home = Array.from(homes);

	// loads map
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: "AIzaSyA5N_RMyoxca6XTwqQt6QBRFSXO91t_jgw"
	})
	// eslint-disable-next-line
	const [map, setMap] = React.useState(null);

	// places map
	const onLoad = React.useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds();
		map.fitBounds(bounds);
		setMap(map);
	}, [])

	const onUnmount = React.useCallback(function callback(map){
		setMap(null)
	}, [])


	return isLoaded ? (
		<GoogleMap
			id='map'
			mapContainerStyle = { containerStyle }
			center = { coords }
			setZoom = { zoom }
			onLoad = { onLoad }
			onUnmount = { onUnmount }
		>
		{hasHomes ? home.map((h) => {
			console.log(h)
			return(<Marker
				title = {'duck'}
				clickable = {true}
				key = {h.homeName}
				position = {{lat: h.homeCoordinates[0], lng: h.homeCoordinates[1]}}
				icon = {'https://upload.wikimedia.org/wikipedia/commons/3/34/Home-icon.svg'}></Marker>)}) : <></>}
		
			{suggestions.map((suggestion) => {
				console.log('val: ', suggestion);
				return(<MarkerEmbed key={suggestion[0]} m={suggestion[1]}/>)})}
		</GoogleMap>
	) : <></>
}

export default React.memo(Maps);