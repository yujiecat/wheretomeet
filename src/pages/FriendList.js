import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import FriendsListComponent from 'src/components/customer/FriendsListComponent';
import FriendsListToolbar from 'src/components/customer/FriendsListToolbar';
import React from 'react';

const FriendList = () => {

  const[state, setState] = React.useState(false)

  const refreshPage = () => {
    setState(!state);
    console.log('aha')
  }

  return(<>
    <Helmet>
      <title>Friends</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 2
      }}
    >
      <Container
        maxWidth="lg"
      >
        <FriendsListToolbar refreshFriends={refreshPage}/>
        <Box sx={{ pt: 3 }}>
          <FriendsListComponent props={state}/>
        </Box>
      </Container>
    </Box>
  </>);
};

export default FriendList;
