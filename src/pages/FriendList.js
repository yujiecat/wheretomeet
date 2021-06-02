import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import FriendsListComponent from 'src/components/customer/FriendsListComponent';
import FriendsListToolbar from 'src/components/customer/FriendsListToolbar';

const FriendList = () => (
  <>
    <Helmet>
      <title>Friends</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 2
      }}
    >
      <Container
        maxWidth="lg"
      >
        <FriendsListToolbar/>
        <Box sx={{ pt: 3 }}>
          <FriendsListComponent/>
        </Box>
      </Container>
    </Box>
  </>
);

export default FriendList;
