import {
  Card,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Container,
  Typography,
} from '@material-ui/core';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React from 'react';
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import ConfirmEvent from './ConfirmEvent.js';

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
const TimeSelector = ({group, groupId}) => {
  const [date, setDate] = React.useState(null);
  const [events, setEvents] = React.useState([]);
  const [dayEvent, setDayEvent] = React.useState([]);
  const [dateString, setDateString] = React.useState('No date selected.');
  const loggedInUser = sessionStorage.getItem('encodedUserId');
  const groupLoaded = Object.entries(group).length > 0;
  var groupOwner = false;
  
  if(groupLoaded) {
    groupOwner = sessionStorage.getItem('userId') === group.groupOwner.userId;
  }

  const handleClickDay = async (date) =>{
    setDate(date);
    setDateString(date.toDateString());
    const today = [];
    console.log('events: ' + events);
    if(events !== null){
      events.forEach(element => {
        let day = new Date(element.startTime * 1000);
        if(isSameDay(day, date)){
          today.push(element);
        }
      })
    }
    setDayEvent(today);

    await axios.get(`/group/${groupId}/timeframes`)
    .then(response => {
      if(response.status === 200) {
        console.log('timeframes retrieved successfully');
        return response.data;
      } 
      else {
        console.log('error getting timeframes (not 200)');
      }
    })
    .then(data => {
      if(data !== null){
        data.forEach(element => {
          let day = new Date(element.startTime*1000);
          if(isSameDay(day, date)){
            today.push(element);
          }
        })
      }
    })
    .catch(error => {
      console.log('error retrieving events: ' + error);
    })
  }

  const onChange = async (time) => {
    if(date !== null){
      const day = date.getDate();
      const month = date.getMonth();
      time[0]._d.setDate(day);
      time[0]._d.setMonth(month);
      time[1]._d.setDate(day);
      time[1]._d.setMonth(month);
    }

    const freeTime = {
      startTime: time[0]._d.getTime(),
      endTime: time[1]._d.getTime(),
      userId: loggedInUser,
    }

    console.log(freeTime)
    await axios.put(`/group/${groupId}/add/timeframe`, freeTime)
    .then(response => {
      if(response.status === 200) {
        console.log('timeframe added successfully');
        
      } else {
        console.log('error setting free time (not 200)');
      }
    })
    .catch(error => {
      console.log('error setting free time: ' + error);
    })
  }

  const hasEvents = dayEvent.length > 0;

  const grabEvents = async () => {
    await axios.get('/user/events/' + loggedInUser)
    .then(response => {
      if(response.status === 200) {
        return response.data;
      } else alert('error retrieving events');
    })
    .then(data => {
      console.log('events: ', data);
      setEvents(data);
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
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      p: 1
    }}
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
              subheader={dateString}
              title="Events">
            </CardHeader>
            <Divider />
            <List>
              {hasEvents ? dayEvent.map((e) => {
                return(<ListItem button>
                  <ListItemText primary={e.groupName} />
                  <ListItemText primary={e.userId} />
                </ListItem>)
              }) : 'No events planned.'}
            </List>
          </Card>
      </Grid>
	  <TimePicker.RangePicker format={'HH:mm'} minuteStep={15} use12Hours={true} onChange={onChange}/>
    <Typography> Confirm Event Date</Typography>
      {groupOwner? <ConfirmEvent group={group}/> : <></>}
     </Container>
  </Card>
)};

export default TimeSelector;
