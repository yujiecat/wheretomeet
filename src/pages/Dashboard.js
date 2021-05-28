import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import Meetups from 'src/components/dashboard/Meetups';
import CreateGroup from 'src/helpers/CreateGroup.js';
// import Map from 'src/helpers/Map';
// import AutoComplete from 'src/helpers/AutoComplete';

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
        <Grid maxWidth="lg"
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            sm={6}
            xl={3}
            xs={12}
          >
            <Meetups />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xl={3}
            xs={12}
            id="map"
          >
            {/* <Map /> */}
          </Grid>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            sm={6}
            xl={3}
            xs={12}
          >
            <CreateGroup />
          </Grid>
        </Grid>
      </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
