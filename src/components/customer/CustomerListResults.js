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
  IconButton
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import getInitials from 'src/utils/getInitials';

const CustomerListResults = ({ customers, ...rest }) => (
  <Card {...rest}>
    <PerfectScrollbar>
      <Box sx={{ display: 'flex', minWidth: 450 }}>
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
            {customers.map((customer) => (
              <TableRow
                hover
                key={customer.id}
              >
                <TableCell>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <Avatar
                      src={customer.avatarUrl}
                      sx={{ ml: 2, mr: 2 }}
                    >
                      {getInitials(customer.name)}
                    </Avatar>
                    <Typography
                      color="textPrimary"
                      variant="body1"
                    >
                      {customer.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box>
                    {' '}
                    <IconButton
                      edge="end"
                      size="small"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
  </Card>
);

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CustomerListResults;
