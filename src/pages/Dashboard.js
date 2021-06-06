import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import Meetups from 'src/components/dashboard/Meetups';

const Dashboard = () => (
  <>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
      <Typography>
        <h2>Future Events</h2>
      </Typography>
        <Grid maxWidth="lg"
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            sm={12}
            xl={12}
            xs={12}
          >
            <Meetups
             />
          </Grid>
          </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
