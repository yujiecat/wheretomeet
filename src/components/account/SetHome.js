import React, { useState } from 'react';
import {
  Card,
  Box,
  CardHeader,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Map from 'src/components/GoogleMaps/Map.js';
import PlacesAutocomplete from 'src/components/GoogleMaps/AutoComplete.js';
import axios from 'axios';
import HomeLocation from './HomeLocation.js';

const AccountProfileDetails = ({homes, setHome}) => {
  const [markers, setMarkers] = useState(homes);
  const [name, setName] = useState('');
  const loggedInUser = sessionStorage.getItem('encodedUserId');

  const handleChange = (event) => {
      console.log(event);
      setName(event.value);
      console.log(name);
  };

  React.useEffect(() => {
    setMarkers(homes);
  }, [homes])
    const hasMarkers = markers.length > 0;


 	const addHome = (markers, val, results) => {
    console.log(name);
    const newHome = {
      homeName: name,
      homeCoordinates: [val.lat, val.lng],
      homeAddress: results[0].formatted_address,
    }

  console.log('newhome: ', newHome)

    if(markers.length < 3){
      axios.put('/user/' + loggedInUser + '/add/homes', newHome)
        .then(response => {
          if(response.status === 200) {
            console.log('home added successfully');
            setMarkers(markers => [...markers, newHome]);
          }
          else {
            alert("network error"); 
          }
        })
        .catch(error => {
          console.log(error);
      });
    }
    else alert('You have the max number of home locations. Please remove one first before adding another! (Click on the marker and delete it!)')
		console.log('markers', markers);
	}


// TODO: styling

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
        
  <Table>
      {/* list header */}
      <TableHead>
        <TableRow>
          <TableCell>Locations</TableCell>
          <TableCell align='right'>Remove</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { hasMarkers ? markers.map((m) => {
          return(<HomeLocation m={m} user={loggedInUser} setHome={setHome}/>)}):<></>}
      </TableBody>
    </Table>
        <Box display='flex' justifyContent='center' sx={{pt: 1}}>
          <TextField
                helperText="Home Name"
                label="Home Name"
                name="name"
                onInput = {e => setName(
                  e.target.value
                )}
                value={name}
                variant="outlined"
              />
          <PlacesAutocomplete onSelect = {(val, results) => {addHome(markers, val, results)}} />
        </Box>
		    <Box display='flex' justifyContent='center' sx={{pt: 1, pb: 2}}>
          <Map height='48rem' width='20rem' zoom='11'markers={[]} homes={markers} />
        </Box>
        <Divider />
      </Card>
  );
};

export default AccountProfileDetails;
