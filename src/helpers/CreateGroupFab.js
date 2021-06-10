import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios'

const style = {
    margin: 0,
    top: 'auto',
    right: 'auto',
    bottom: 20,
    left: 54	,
    position: 'fixed',
};

export default function CreateGroupFab({onCreate}) {
  const [open, setOpen] = React.useState(false);
  const [groupName, setGroupName] = React.useState('');
  const [groupPassword, setGroupPassword] = React.useState('');
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {

    const group = {
      groupName: groupName,
      groupPassword: groupPassword,
      groupOwner: loggedInUser,
      groupMembers: [loggedInUser]
    }

    axios.post('/groups/', group)
      .then(response => {
        if(response.status === 200) {
          alert('Group created!');
          handleClose();
          return response.data;
        }
        else {
          alert('Error creating group :(');
        }
    })
    .then(data => { 
      axios.put('/groupsList/' + encodeURIComponent(loggedInUser.userId) + '/add/' + data.groupId)
      .then(response => {
        if(response.status === 200) {
          console.log('group added to user\'s group list');
          onCreate();
        }
        else {
          alert('error saving group details');
        }
      })
      .catch(error => {
        console.log(error);
      });
    })
    .catch(error => {
      console.log(error);
    });

  }
  return (
    <div>
      <Fab variant="extended" color="primary" onClick={handleClickOpen} style={style}>
        <AddIcon />  Create Group
      </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create A New Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create your meetup group!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group Name *"
            type="string"
            fullWidth
            onInput = {e => setGroupName(
              e.target.value
            )}
          />
		<TextField
            margin="dense"
            id="name"
            label="Group Password *"
            type="string"
            fullWidth
            onInput = {e => setGroupPassword(
              e.target.value
            )}
			sx={{mt: 3, mb: 3}}
          />
		  <div>
		<DialogContentText
			sx={{
				mb: 1
			}}
		>
            Upload a group image (optional)
          </DialogContentText>
			<input
				style={{ display: "none" }}
				id="contained-button-file"
				type="file"
				accept="image/*"
			/>
			<label htmlFor="contained-button-file">
				<Button variant="contained" color="primary" component="span">
				Upload
				</Button>
			</label>
		</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}