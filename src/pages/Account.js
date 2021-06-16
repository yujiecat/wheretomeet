import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountProfile from 'src/components/account/AccountProfile';
import SettingsPassword from 'src/components/settings/SettingsPassword';
import AccountProfileDetails from 'src/components/account/AccountProfileDetails';
import SetHome from 'src/components/account/SetHome';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import React from 'react';

const Account = () => {

  const [homeLocations, setHomeLocations] = React.useState([]);
  const loggedinUser = JSON.parse(localStorage.getItem('user'));

  const retrieveHomeLocations = async () => {
    await axios.get('/user/homes/' + encodeURIComponent(loggedinUser.userId))
    .then(response => {
      if(response.status === 200) {
        return response.data;
      } else alert('error retrieving home locations');
    })
    .then(data => {
      setHomeLocations(data);
    })
    .catch(error => {
      console.log('error retrieving home locations ' + error);
    })
  }

  React.useEffect (() => {
    retrieveHomeLocations();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // home location markers + info

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container
          maxWidth="lg"
        >
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <AccountProfile />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <AccountProfileDetails />
            </Grid>
          </Grid>
          <Grid
            maxWidth="lg"
            container
            spacing={3}
            sx={{
              mt: '0.75rem'
            }}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <SettingsPassword />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <SetHome homes={homeLocations} setHome={retrieveHomeLocations} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Account;
