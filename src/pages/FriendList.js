import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import FriendsListComponent from 'src/components/friendslist/FriendsListComponent';
import FriendsListToolbar from 'src/components/friendslist/FriendsListToolbar';
import React from 'react';
import axios from 'axios';

const FriendList = () => {

  const[state, setState] = React.useState(false);
  const [friends, setFriends] = React.useState([]);
  const loggedInUser = sessionStorage.getItem('encodedUserId');

  const retrieveFriendsListData = async() => {
    if(loggedInUser != null) {
      await axios.get('/friends/' + loggedInUser)
      .then(response => {
          if(response.status === 200) {
            return response.data;
          }
          else{
            alert('unable to retrieve friends data');
          }
        }
      )
      .then(data => {
        setFriends(data.friends);
      });
    } 
    else {
      alert('unable to locate userId');
    }
  }

  React.useEffect(() => {
    retrieveFriendsListData();
  }, []);

  const refreshPage = () => {
    setState(!state);
    retrieveFriendsListData();
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
          <FriendsListComponent friends = {friends} refreshFriends={refreshPage}/>
        </Box>
      </Container>
    </Box>
  </>);
};

export default FriendList;
