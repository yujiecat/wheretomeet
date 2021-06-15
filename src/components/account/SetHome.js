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
  Typography,
  IconButton
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { TextField } from '@material-ui/core';
import Map from 'src/helpers/Map.js';
import PlacesAutocomplete from 'src/helpers/AutoComplete.js';
import axios from 'axios';

const testHomes = [
  {
    homeCoordinates: [49, 123.124675],
    homeName: 'ily',
    homeAddress: '',
  },
];

const AccountProfileDetails = ({homes, setHome}) => {
  const [markers, setMarkers] = useState(testHomes);
  const [name, setName] = useState('');
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

    const handleChange = (event) => {
    setName(event.value);
  };

  const hasHomes = markers.length > 0;

 	const addHome = (markers, val) => {

    const newHome = {
      homeName: 'Elmo\'s',
      homeCoordinates: [49, 123.124675],
      homeAddress: '123 Sesame Street',
    }

    if(markers.length < 3){
      axios.put('/user/' + encodeURIComponent(loggedInUser.userId) + '/add/homes', newHome)
        .then(response => {
          if(response.status === 200) {
            console.log('home added successfully');
            setMarkers(markers => [...markers, val]);
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

  const deleteHome = () => {
    if(loggedInUser != null) {
      const user = encodeURIComponent(loggedInUser.userId);
      const home = {
        homeName: 'Elmo\'s',
        homeCoordinates: [49, 123.124675],
        homeAddress: '123 Sesame Street',
      };
      const deleteHomeUri = '/user/' + user + '/delete/homes/';

      axios.put(deleteHomeUri, home)
      .then(response => {
        if(response.status === 200) {
          alert("Home removed.");
          setHome();
        } 
        else {
          alert("Cannot find home to remove.");
        }
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      alert('cannot locate userId');
  }
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
        {hasHomes ? markers.map((m) => {
          return(
          <TableRow key={m.coords}>
              {/* list of home locations */}
              <TableCell>
                <Box>
                  <Typography fontSize={24} color='black' ml={7.30} mt={-5.55}>{m.name}</Typography>
                </Box>
              </TableCell>

              {/* Options Button*/}
              <TableCell align='right'>
                <Box>
                  <IconButton onClick={() => deleteHome()} >
                    <ClearIcon/>
                  </IconButton>
                </Box>
              </TableCell>

          </TableRow>
        )}): <></>}
      </TableBody>
    </Table>
        <Box display='flex' justifyContent='center' sx={{pt: 1}}>
          <TextField
                helperText="Home Name"
                label="Home Name"
                name="name"
                onChange={handleChange}
                required
                value={name}
                variant="outlined"
              />
          <PlacesAutocomplete onSelect = {(val) => {addHome(markers, val)}} />
        </Box>
		    <Box display='flex' justifyContent='center' sx={{pt: 1, pb: 2}}>
          <Map height='48rem' width='20rem' zoom='11'markers={[]} homes={markers} />
        </Box>
        <Divider />
      </Card>
  );
};

export default AccountProfileDetails;
