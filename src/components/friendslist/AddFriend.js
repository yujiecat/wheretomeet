import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default function AddFriend({refreshFriends}) {

  const [open, setOpen] = React.useState(false);
  const [friendId, setFriendId] = React.useState('');
  const loggedInUser = sessionStorage.getItem('encodedUserId');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    //TODO: 
    // 1. Populate FL with 'pending status' until friend responds (accept/decline)
    if(loggedInUser != null) {
      const friend = encodeURIComponent(friendId);

      const friendRequest = {
        userId: loggedInUser,
        friendId: friend,
      };

      const friendRequestUri = '/friends/' + loggedInUser + '/add/' + friend;

      axios.put(friendRequestUri , {friendRequest})
      .then(response => {
        if(response.status === 200) {
          alert("Friend request sent!");
          handleClose();
          refreshFriends();
        } 
        else {
          alert("Cannot find user with id:" + friendId);
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
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Friend
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a friend</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="friendId"
            label="Friend's user id*"
            type="string"
            fullWidth
            onInput = {e => 
              setFriendId(
              e.target.value
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Send Friend Request
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}