import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import Meetups from 'src/components/dashboard/Meetups';
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
