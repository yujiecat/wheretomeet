import React, { useState } from 'react';
import {
  Card,
  Box,
  CardHeader,
  Divider,
} from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import Map from 'src/helpers/Map.js';
import PlacesAutocomplete from 'src/helpers/AutoComplete.js';

const data = [

  {
    lat: 50, 
    lng: -123.124675 
  },

  {
    lat: 50.233700,
    lng: -123
  },

]

const AccountProfileDetails = (props) => {
  const [markers, setMarkers] = useState(data);

 	const handleMarkers = (markers, val) => {
    if(markers.length < 3)
		  setMarkers(markers => [...markers, val]);
    else alert('You have the max number of home locations. Please remove one first before adding another! (Click on the marker and delete it!)')
		console.log('markers', markers);
	}

  return (
      <Card>
        <CardHeader
          sx={{
            p: 2
          }}
          subheader="Set a maximum of 3 home locations"
          title="Home Locations"
        />
        <Divider />
        <Box display='flex' justifyContent='center' sx={{pt: 1}}>
			    <PlacesAutocomplete onSelect = {(val) => {handleMarkers(markers, val)}} />
        </Box>
		    <Box display='flex' justifyContent='center' sx={{pt: 1, pb: 2}}>
          <Map height='48rem' width='20rem' zoom='11' markers={markers} />
        </Box>
        <Divider />
      </Card>
  );
};

export default AccountProfileDetails;
