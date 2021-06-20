import { Helmet } from 'react-helmet';
import React from 'react';
import {
  Box,
  Container,
  Grid,
} from '@material-ui/core';
import Maps from 'src/components/GoogleMaps/Map.js';
import PlacesAutocomplete from 'src/components/GoogleMaps/AutoComplete.js';
import MessageList from 'src/components/messaging/MessageList.js';
import { getDetails } from 'use-places-autocomplete';
import axios from 'axios';
import Voting from 'src/components/groups/Voting.js';
import { useParams } from 'react-router-dom';

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

  const { groupId } = useParams();
  const [group, setGroup] = React.useState([]);
  const loggedInUser = sessionStorage.getItem('encodedUserId');
	const [markers, setMarkers] = React.useState([]);
	// eslint-disable-next-line no-unused-vars
	const [homeLocations, setHomeLocations] = React.useState([]);



  const retrieveGroupData = async() => {
      await axios.get('/group/id/' + groupId)
      .then(response => {
        if(response.status === 200) {
          return response.data;
        }
        else {
          alert('error retrieving group data');
        }
      })
      .then(data => {
        setGroup(data)
      })
      .catch(error => {
        console.log('error retrieving group data: ' + error);
      })
  }

    const retrieveMarkers = async () => {
    await axios.get('/group/' + groupId + '/locations')
    .then(response => {
      if(response.status === 200) {
        return response.data;
      } else alert('error retrieving group locations');
    })
    .then(data => {
      const map = new Map(Object.entries(data));
      setMarkers(map);
    })
    .catch(error => {
      console.log('error retrieving suggestions ' + error);
    })
  }

  const retrieveHomeLocations = async () => {
    await axios.get('/user/homes/' + loggedInUser)
    .then(response => {
      if(response.status === 200) {
        return response.data;
      } else alert('error retrieving home locations');
    })
    .then(data => {
      const map = new Map(Object.entries(data));
      setHomeLocations(map);
    })
    .catch(error => {
      console.log('error retrieving home locations ' + error);
    })
  }

  React.useEffect(() => {
    retrieveGroupData();
    retrieveHomeLocations();
    retrieveMarkers();
  }, [groupId]);

  //handles new markers on map - delete console.logs after

	const handleMarkers = async (markers, val, place) => {

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
      const venue = {
        venueCoordinates: [val.lat, val.lng],
        venueName: 'abc',
        venueAddress: '',
        venuePhoneNumer: "911",
        venueId: place[0].place_id,
      }
  
    markers.set(place[0].place_id, venue);
    })
    .catch((error) =>{
        console.log('error: ', error);
    })
	}

  const handleDistance = (val, place) => {

    // save this information somewhere in db
    // can either pass to infowindow or have separate "travel time" section

    console.log('place: ', place);

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
        venueName: 'abc',
        venueAddress: response.destinationAddresses[0],
        venuePhoneNumer: "911",
        venueId: place[0].place_id,
      }
  
      if(groupId != null) {
        axios.put('/group/' + groupId + '/add/location', venue)
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
  }

  return(<>
    <Helmet>
      <title>{group.groupName}</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxheight="lg">
      <h1>{group.groupId}</h1>
		<Box display='flex' justifyContent='center' sx={{pt: 3}}>
			<Maps height='60rem' width='25rem' zoom='11' markers={markers} coords={{lat: 49.1666, lng: -123.1336}} homes={homeLocations} />
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
			<PlacesAutocomplete onSelect = {(val, place) => {handleMarkers(markers, val, place); handleDistance(val, place);}} />
        </Box>
        <Box>
		  <MessageList groupId = {groupId} />
      <Voting suggestions={markers} />
        </Box>
      </Container>
    </Box>
  </>);
};

export default GroupDashboard;
