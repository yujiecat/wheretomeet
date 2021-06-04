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
import { GoogleMap } from '@react-google-maps/api';
import axios from 'axios';

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
  const [info, setInfo] = React.useState([{}]);
	// eslint-disable-next-line no-unused-vars
	const [homeLocations, setHomeLocations] = React.useState([]);

	const handleMarkers = (markers, val) => {
		setMarkers(markers => [...markers, val]);
		console.log(val);
		console.log('markers', markers);
	}

  const handleDistance = (val) => {

    // save this information somewhere in db
    var service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [home[0].coords, home[1].coords],
      destinations: [val],
      travelMode: 'DRIVING'
    }, callback)

    function callback(response, status){
      console.log('what the fuck', response);

      const venue = {
        venueCoordinates: [val.lat, val.lng],
        venueName: "place_name",
        venueAddress: response.destinationAddresses[0],
        venuePhoneNumner: "911",
        venueId: "123456789",
      }
  
      const gid = '557087790'

      axios.put('/group/' + gid + '/add/location', venue)
          .then(response => {
            if(response.status === 200) {
              console.log('venue pushed to group successfully');
            }
            else {
              alert("network error");
            }
          })
          .catch(error => {
            console.log(error);
          });
    }
  }

  const getDetails = (val) => {
    var geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({'location': val}, function(results, status) {
    if (status === window.google.maps.GeocoderStatus.OK) {
      if (results[1]) {
          console.log(results[1].place_id);
          // var service = new window.google.maps.place.PlacesService();
          // var request = {
          //   placeid: results[1].place_id
          // };
          // service.getDetails(request, callback)
          
          // function callback(place, status) {
          //   if(status === window.google.maps.places.PlacesServiceStatus.OK) {
          //     console.log('what: ', place)
          //     // setInfo(info => [...info, ])
          //   }
          // }
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
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
			<PlacesAutocomplete onSelect = {(val) => {handleMarkers(markers, val); handleDistance(val); getDetails(val)}} />
        </Box>
		  <MessageList />
      </Container>
    </Box>
  </>);
};

export default GroupDashboard;
