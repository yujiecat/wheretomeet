import {
  Card,
  // CardContent,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React from 'react';
import moment from 'moment';
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';
import { differenceInCalendarDays } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';

function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0;
}

const datesToAddClassTo = [new Date()];

const event = makeStyles((theme) => ({

  

}));

function tileClassName({ date, view }) {
  // Add class to tiles in month view only
  if (view === 'month') {
    // Check if a date React-Calendar wants to check is on the list of dates to add class to
    if (datesToAddClassTo.find(dDate => isSameDay(dDate, new Date()))) {
      return event;
    }
  }
}
const Meetups = (props) => {

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
          />
      </Grid>
     </Container>
  </Card>
)};

export default Meetups;
