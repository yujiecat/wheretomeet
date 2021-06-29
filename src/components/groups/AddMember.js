import React from 'react';
import Button from '@material-ui/core/Button';
import {
  Avatar,
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'

export default function AddMember({groupId}) {
  const [open, setOpen] = React.useState(false);
  const [friends, setFriends] = React.useState([]);
  const [selectedFriends, setSelectedFriends] = React.useState([]);
  const loggedInUser = sessionStorage.getItem('encodedUserId');

	React.useEffect(() => {
    	retrieveFriendsListData();
  	}, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleSelect = (userId) => {
    console.log(userId);
    const ind = selectedFriends.indexOf(userId);
    if(ind === -1)
      setSelectedFriends([...selectedFriends, userId]);
    else {
      selectedFriends.splice(ind, 1);
    }
    console.log(selectedFriends);
  }

  const handleSubmit = () => {
    selectedFriends.forEach((friend) => {
      const friendId = encodeURIComponent(friend);
      axios.put('/group/' + groupId + '/add/' + friendId)
      .then(response => {
        if(response.status === 200) {
          alert('Friends added to the group!');
          handleClose();
          return response.data;
        }
        else {
          alert('Error adding friends :(');
        }
      })
<<<<<<< HEAD
=======

>>>>>>> b9c90236446cb14fdc36449d9b001ec14876798d
      axios.put('/groupsList/' + friendId + '/add/' + groupId)
      .then(response => {
        if(response.status === 200) {
          alert('group added to user\'s group list');
          handleClose();
          return response.data;
        }
        else {
          alert('group list error : (');
        }
      })
    })
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Friends
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add your friends</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Invite some friends to your meetup!
          </DialogContentText>
		  <div>
		<PerfectScrollbar>
        <Box sx={{ minWidth: 500 }}>
          <Table>
            <TableHead>
              <TableRow>
				<TableCell padding="checkbox">
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {friends.map((friend) => (
                <TableRow
                  hover
                  key={friend.id}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      onChange={() => { handleSelect(friend.userId) } }
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {friend.username}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
		</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add to Group
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}