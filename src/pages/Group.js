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
import { getDetails } from 'use-places-autocomplete';
import Voting from 'src/helpers/Voting.js';

// temporarily here before api hooks

const home = [
  {
    id: 1,
    name: 'Office',
    coords: { lat: 49, lng: -123.124675 }
  },

{
    id: 2,
    name: 'Home',
    coords: { lat: 49.233700, lng: -123 }
  },
];

// group design
const GroupDashboard = () => {

	// grab suggested locations of a group here
	// also grab user's home locations here

	const [markers, setMarkers] = React.useState([{lat: 10, lng: 10}]);
	// eslint-disable-next-line no-unused-vars
	const [homeLocations, setHomeLocations] = React.useState([]);

  
  //handles new markers on map - delete console.logs after

	const handleMarkers = (markers, val, place) => {

    console.log('hey', place[0]);
    // grabs info about a location
    // add additional info in fields param if desired
    // pass to map update infowindow

    const parameter = {
        placeId: place[0].place_id,
        fields: ["name", "rating"],
    };

    var inf;

    getDetails(parameter)
    .then((details) => {
      inf = details;
      const mark = {
        lat: val.lat,
        lng: val.lng,
        info: inf,
      }
		setMarkers(markers => [...markers, mark]);
    })
    .catch((error) =>{
        console.log('error: ', error);
    })


		console.log('markers', markers);
	}

  const handleDistance = (val) => {

    // save this information somewhere in db
    // can either pass to infowindow or have separate "travel time" section

    var service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [home[0].coords, home[1].coords],
      destinations: [val],
      travelMode: 'DRIVING'
    }, callback)

    function callback(response, status){
      console.log('what the fuck', response);
    }
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
			<Map height='60rem' width='25rem' zoom='11' markers={markers}/>
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
			<PlacesAutocomplete onSelect = {(val, place) => {handleMarkers(markers, val, place); handleDistance(val); console.log("??", place)}} />
        </Box>
        <Box>
		  <MessageList />
      <Voting />
        </Box>
      </Container>
    </Box>
  </>);
};

export default GroupDashboard;
