import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import FriendsListComponent from 'src/components/customer/FriendsListComponent';
import FriendsListToolbar from 'src/components/customer/FriendsListToolbar';
import React from 'react';
import axios from 'axios';

const FriendList = () => {

  const[state, setState] = React.useState(false)
  const [friends, setFriends] = React.useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const retrieveFriendsListData = async() => {
    if(loggedInUser != null) {
      await axios.get('/friends/' + encodeURIComponent(loggedInUser.userId))
      .then(response => {
          if(response.status === 200) {
            return response.data;
          }
          else{
            console.log('cannot find friends list');
          }
        }
      )
      .then(data => {
        setFriends(data.friends);
        console.log(friends);
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
          <FriendsListComponent friends = {friends} refreshFriends={refreshPage}/>
        </Box>
      </Container>
    </Box>
  </>);
};

export default FriendList;
