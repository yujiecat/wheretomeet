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
  makeStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import getInitials from 'src/utils/getInitials';
import { useEffect, useState } from 'react';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

function CustomerListResults() { 
  const [friends, setFriends] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetched();
  }, []);

  // TODO: Has to be a better way to do this such that its also tied to the add friend helper to refresh the list upon adding a user...
  // TODO: Store login information -- use axios?
  const fetched = async() => await fetch('/friends/' + encodeURIComponent(loggedInUser.userId))
  .then(
    response => {
      if(response.ok) {
        return response.json();
      }
      else{
        console.log('sadge');
      }
    }
  )
  .then( data => {
    setFriends(data.friends);
    console.log(friends);
  });

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
              Friends of {loggedInUser.userId}
            </TableCell>
            <TableCell align="right">
              Options
            </TableCell>
            </TableRow>
          </TableHead>

          
          <TableBody>
            {friends.map((friend) => (
              <TableRow key={friend.username}>
                  <TableCell>
                    <Box sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}>
                      <Avatar 
                        sx={{ ml: 2, mr: 2 }}
                      >
                        {getInitials(friend.username)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {friend.userId}
                      </Typography>
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
