import { Helmet } from 'react-helmet';
import React from 'react';
import {
  Box,
  Container,
  Grid,
} from '@material-ui/core';
import Map from 'src/helpers/Map.js';
import PlacesAutocomplete from 'src/helpers/AutoComplete.js';

// group design
const GroupDashboard = () => (
  <>
    <Helmet>
      <title>GroupName</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxheight="lg">
		<Box display='flex' justifyContent='center' sx={{pt: 3}}>
			<Map height='60rem' width='25rem' zoom='11'/>
		</Box>
        <Box sx={{ pt: 3 }}>
          <Grid
		  	sx={{
				  display: 'flex',
				  flexDirection: 'column'
			  }}
            container
            spacing={3}
          >
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
			<PlacesAutocomplete />
        </Box>
      </Container>
    </Box>
  </>
);

export default GroupDashboard;
