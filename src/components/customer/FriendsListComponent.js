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
} from '@material-ui/core';
import RemoveFriend from 'src/helpers/RemoveFriend.js';

function FriendsListComponent({friends, refreshFriends}) { 

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
                  <RemoveFriend userId = {friend.userId} refreshFriends = {refreshFriends} />
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
