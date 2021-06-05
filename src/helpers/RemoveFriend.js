import React from 'react';
import axios from 'axios';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
    Typography,
    IconButton,
    Popover,
    List,
    ListItem,
} from '@material-ui/core';

export default function RemoveFriend({userId, refreshFriends}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleRemove = () => {
    //TODO: 
    // 1. Actually use the user's data instead
    // 2. Populate FL with 'pending status' until friend responds (accept/decline)
    if(loggedInUser != null) {
      const user = encodeURIComponent(loggedInUser.userId);
      const friend = encodeURIComponent(userId);

      const friendRequest = {
        userId: user,
        friendId: friend,
      };

      const friendRequestUri = '/friends/' + user + '/remove/' + friend;

      axios.put(friendRequestUri , {friendRequest})
      .then(response => {
        if(response.status === 200) {
          alert("friend removed!");
          refreshFriends();
          //insert list reloading here
        } 
        else {
          alert("Cannot find user with id:" + userId);
        }
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      alert('cannot locate userId');
    }
  }

  return (
    <div>
        <IconButton onClick = {handleClick}>
        <MoreVertIcon />
        </IconButton>
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >

        <List>
            <ListItem button onClick={handleRemove}>
                <Typography>Remove Friend</Typography>
            </ListItem>
        </List>
        
      </Popover>
    </div>
  );
}