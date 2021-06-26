import React from 'react';
import {
  Box,
  TableRow,
  TableCell,
  Typography,
  IconButton
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import axios from 'axios';

const HomeLocation = ({m, user, setHome}) => {

	const address = m.homeAddress;
	const name = m.homeName
	const coords = m.homeCoordinates
  const loggedInUser = user;
  
	const deleteHome = () => {
    if(loggedInUser != null) {
      const home = {
        homeName: name,
        homeCoordinates: coords,
        homeAddress: address,
      };

      const deleteHomeUri = '/user/' + loggedInUser + '/delete/homes';

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
    } 
    else {
      alert('cannot locate userId');
    }
}

	return (<TableRow key={coords}>
              {/* list of home locations */}
              <TableCell>
                <Box>
                  <Typography fontSize={24} color='black' ml={2} >{name}</Typography>
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

          </TableRow>);
}

export default HomeLocation;