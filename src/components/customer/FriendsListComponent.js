import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useEffect, useState } from 'react';
import axios from 'axios';


function FriendsListComponent() { 
  const [friends, setFriends] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    retrieveFriendsListData();
  }, []);

  // TODO: 
  // 1. Re-render the list upon adding a friend (should be done in AddFriend.js)
  // 2. cache friends list
  const retrieveFriendsListData = async() => {
    if(loggedInUser != null) {
      await axios.get('/friends/' + encodeURIComponent(loggedInUser.userId))
      .then(response => {
          if(response.status == 200) {
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

  const handleClick = (userId) => {
    console.log(userId);
  };

  return (
    <Card>
      <div className='FriendsListComponent'>
    <Table>
      {/* list header */}
      <TableHead>
        <TableRow>
          <TableCell>Friends</TableCell>
          <TableCell align='right'>Options</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {friends.map((friend) => 
          <TableRow>
            
              {/* User Avatar, userid and username */}
              <TableCell>
                <Box mb={-1}>
                  <Avatar sx={{ml:0, mr:0}}></Avatar>
                  <Typography fontSize={24} color='black' ml={7.30} mt={-5.55}>{friend.username}</Typography>
                  <Typography ml={7.50} mt={-1.15}>{friend.userId}</Typography>
                </Box>
              </TableCell>

              {/* Options Button*/}
              <TableCell align='right'>
                <Box>
                  <IconButton onClick={() => handleClick(friend.userId)}>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </TableCell>

          </TableRow>
         )}
      </TableBody>
    
    </Table>
    </div>
    </Card>
  );
};
export default FriendsListComponent;
