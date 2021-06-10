import {
  Card,
  // CardContent,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Meetups = (props) => (

  <Card 
    sx={{
      height: '200%',
      display: 'flex',
      alignItems: 'center',
      p: 1
    }}
    {...props}
  >
      <Container>        
      <Grid
        container
        justifyContent="center"
        display="flex"
      >
          <Calendar
            calendarType="US"
          />
      </Grid>
     </Container>
  </Card>
);

export default Meetups;
