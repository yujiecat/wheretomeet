import React from 'react';
import { DistanceMatrixService } from '@react-google-maps/api';

function DistanceService({home, val}) {

	const dest = home[0].coords;
	const origins = {lat: 10, lng: 10}

	console.log('here', dest);
	console.log('there', origins);

	return(
	<DistanceMatrixService
 		options={{
           destinations: dest,
           origins: origins,
           travelMode: "DRIVING",
         }}
 	callback = {(response) => {console.log(response)}}
	/>)

}

export default React.memo(DistanceService);