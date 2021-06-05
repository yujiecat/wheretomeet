import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function AddFriend() {
  const [open, setOpen] = React.useState(false);

  const [friendId, setFriendId] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {

    //TODO: 
    // 1. Actually use the user's data instead
    // 2. Populate FL with 'pending status' until friend responds (accept/decline)

    const request = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: encodeURIComponent(friendId),
        friendId: encodeURIComponent(friendId),
      }),
    };

    fetch('/friends/' + encodeURIComponent(friendId) +'/add/' + encodeURIComponent(friendId), request)
    .then(response => {
        if(response.ok){
          alert("Friend request sent!");
        }
        else {
          alert("Cannot find user with id:" + friendId);
        }
    });
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