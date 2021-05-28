import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CreateGroup() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
	  console.log('owo')
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create Group
      </Button>
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
          />
		<TextField
            margin="dense"
            id="name"
            label="Group Password *"
            type="string"
            fullWidth
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