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

  <Card maxWidth="lg"
    sx={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      p: 1
    }}
    {...props}
  >
      <Container>        
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
        >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h3"
          >
            Future Meetups
          </Typography>
        </Grid>
      </Grid>
        <Grid item>
          <Calendar
            calendarType="US"
          />
        </Grid>
     </Container>
  </Card>
);

export default Meetups;
