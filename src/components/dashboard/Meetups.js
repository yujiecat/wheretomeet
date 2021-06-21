import {
  Card,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Container,
} from '@material-ui/core';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React from 'react';
import 'antd/dist/antd.css';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';

function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0;
}

const datesToAddClassTo = [new Date()];

function tileClassName({ date, view }) {
  // Add class to tiles in month view only
  if (view === 'month') {
    // Check if a date React-Calendar wants to check is on the list of dates to add class to
    if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) {
      return 'event'
    }
  }
}
const Meetups = (props) => {
  const [date, setDate] = React.useState('No date selected.');
  const [events, setEvents] = React.useState(new Map());
  const [dayEvent, setDayEvent] = React.useState([]);
  const loggedInUser = sessionStorage.getItem('encodedUserId');

  const handleClickDay = (date) =>{
    setDate(date.toDateString());
    setDayEvent([]);
  }

  const hasEvents = dayEvent.length > 0;

  // TODO: grab all event times here.

  const grabEvents = async () => {
    await axios.get('/user/events/' + encodeURIComponent(loggedInUser.userId))
    .then(response => {
      if(response.status === 200) {
        return response.data;
      } else alert('error retrieving events');
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log('error retrieving events: ' + error);
    })
  }

  React.useEffect(() => {
    grabEvents();
  }, []);

  return (<Card 
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
            tileClassName={tileClassName}
            onClickDay={handleClickDay}
          />
          <Card>
            <CardHeader
              sx={{
                p: 2
              }}
              subheader={date}
              title="Events">
            </CardHeader>
            <Divider />
            <List>
              {hasEvents ? dayEvent.map((e) => {
                return(<ListItem button>
                  <ListItemText primary={e.groupname} />
                </ListItem>)
              }) : 'No events planned.'}
            </List>
          </Card>
      </Grid>
     </Container>
  </Card>
)};

export default Meetups;
