import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
  makeStyles,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import getInitials from 'src/utils/getInitials';
import { useEffect, useState } from 'react';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginTop: '0px'
  }
});

function CustomerListResults() { 
  const [friends, setFriends] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const classes = useStyles();

  useEffect(() => {
    retrieveFriendsListData();
  }, []);

  // TODO: 
  // 1. Re-render the list upon adding a friend
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

  const handleClick = () => {
    this.setState({});
    console.log('yeet');
  };

  return (
    <Card>
    <PerfectScrollbar>
      <div className='CustomerListResults'>
      <Box>
        <Table>

          <TableHead>
            <TableRow>
            <TableCell>
              Friends
            </TableCell>
            <TableCell align="right">
              Options
            </TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {friends.map((friend) => (
              <TableRow key={friend.username}>
                  <TableCell >
                    <Box mt={-3.5} sx={{
                      alignItems: 'center',
                      display: 'flex',
                    }}border={1}>
                      <Avatar 
                        sx={{ ml: 2, mr: 2 }}
                      >
                        {getInitials(friend.username)}
                      </Avatar>

                      <Typography variant= "h4" mb = {1} className = 'classes.pos'>
                        {friend.username}
                      </Typography>
                      <Typography mt = {3} mx = {-4.3} variant= "subtitle1" color='textSecondary'>{friend.userId}</Typography>
                    </Box>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </Box>
      </div>
    </PerfectScrollbar>
    </Card>
  );
  // (<Card {...rest}>
  //   <PerfectScrollbar>
  //     <div></div>
  //     <Box sx={{ display: 'flex', minWidth: 450 }}>
  //       <Table>
  //         <TableHead>
  //           <TableRow>
  //             <TableCell>
  //               Friends
  //             </TableCell>
  //             <TableCell align="right">
  //               Options
  //             </TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {customers.map((customer) => (
  //             <TableRow
  //               hover
  //               key={customer.id}
  //             >
  //               <TableCell>
  //                 <Box
  //                   sx={{
  //                     alignItems: 'center',
  //                     display: 'flex'
  //                   }}
  //                 >
  //                   <Avatar
  //                     src={customer.avatarUrl}
  //                     sx={{ ml: 2, mr: 2 }}
  //                   >
  //                     {getInitials(customer.name)}
  //                   </Avatar>
  //                   <Typography
  //                     color="textPrimary"
  //                     variant="body1"
  //                   >
  //                     {customer.name}
  //                   </Typography>
  //                 </Box>
  //               </TableCell>
  //               <TableCell align="right">
  //                 <Box>
  //                   {' '}
  //                   <IconButton
  //                     onClick={handleClick}
  //                     edge="end"
  //                     size="small"
  //                   >
  //                     <MoreVertIcon />
  //                   </IconButton>
  //                 </Box>

  //               </TableCell>
  //             </TableRow>
  //           ))}
  //         </TableBody>
  //       </Table>
  //     </Box>
  //   </PerfectScrollbar>
  // </Card>);
};

// CustomerListResults.propTypes = {
//   customers: PropTypes.array.isRequired
// };

export default CustomerListResults;
