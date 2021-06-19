import React from 'react';
import { DistanceMatrixService } from '@react-google-maps/api';

function DistanceService(...props) {

	const dest = props[0].props[0].coords;
	const origins = props[0].props[1].coords;

	return(
	<DistanceMatrixService
 		options={{
           destinations: dest,
           origins: origins,
           travelMode: "DRIVING",
         }}
 	callback = {(response) => {console.log('distance: ' , response)}}
	/>)

}

export default React.memo(DistanceService);