import { Helmet } from 'react-helmet';
import React from 'react';
import {
  Box,
  Container,
  Grid,
} from '@material-ui/core';
import Map from 'src/helpers/Map.js';
import PlacesAutocomplete from 'src/helpers/AutoComplete.js';
import MessageList from 'src/helpers/MessageList.js';
import DistanceService from 'src/helpers/DistanceMatrix.js';

// temporarily here before api hooks

const home = [
  {
    id: 1,
    name: 'Office',
    coords: [{ lat: 49, lng: -123.124675 }]
  },

{
    id: 2,
    name: 'Home',
    coords: [{ lat: 49.233700, lng: -123 }]
  },
];

// group design
const GroupDashboard = () => {

	// grab suggested locations of a group here
	// also grab user's home locations here

	const [markers, setMarkers] = React.useState([{lat: 10, lng: 10}]);
	// eslint-disable-next-line no-unused-vars
	const [homeLocations, setHomeLocations] = React.useState([]);

	const handleMarkers = (markers, val) => {
		setMarkers(markers => [...markers, val]);
		console.log(val);
		console.log('markers', markers);
	}

  const handleDistance = (val) => {
    // save this information somewhere in db
    <DistanceService props={home} />
    console.log('got here')
  }

  return(<>
    <Helmet>
      <title>GroupNameHere</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxheight="lg">
		<Box display='flex' justifyContent='center' sx={{pt: 3}}>
			<Map height='60rem' width='25rem' zoom='11' markers={markers} />
		</Box>
        <Box sx={{ pt: 3 }}>
          <Grid
		  	sx={{
				  display: 'flex',
				  flexDirection: 'column'
			  }}
            container
            spacing={3}
          >
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
			<PlacesAutocomplete onSelect = {(val) => {handleMarkers(markers, val); handleDistance(val)}} />
        </Box>
		  <MessageList />
      </Container>
    </Box>
  </>);
};

export default GroupDashboard;
