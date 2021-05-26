import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountProfile from 'src/components/account/AccountProfile';
import SettingsPassword from 'src/components/settings/SettingsPassword';
import AccountProfileDetails from 'src/components/account/AccountProfileDetails';

const Account = () => (
  <>
    <Helmet>
      <title>Profile</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container
        maxWidth="lg"
      >
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile />
          </Grid>
          <Grid
            item
            lg={7}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>
        <Grid
          maxWidth="lg"
          container
          spacing={3}
          sx={{
            mt: '0.75rem'
          }}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <SettingsPassword />
          </Grid>
          <Grid
            item
            lg={7}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Account;