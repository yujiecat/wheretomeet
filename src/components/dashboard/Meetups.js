import {
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Meetups = (props) => (

  <Card maxWidth="lg"
    sx={{
      height: '100%',
      display: 'flex',
      p: 1
    }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
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
        <Grid item>
          <Calendar
            calendarType="US"
          />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default Meetups;
