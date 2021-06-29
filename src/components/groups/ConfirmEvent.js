import {
	Button,
  Container,
} from '@material-ui/core';
import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { DatePicker, TimePicker } from 'antd';
import 'antd/dist/antd.css';

const ConfirmEvent = ({group}) => {

	var date = null;
	var startTime = null;
	var endTime = null;

	const onChange = (day) => {
		date = day._d;
	}

	const onChangeTime = (time) => {
		startTime = time[0]._d;
		endTime = time[1]._d;
	}

	const submitEvent = async () => {
		if(date !== null && startTime !== null) {
			const day = date.getDate();
			const month = date.getMonth();
			startTime.setDate(day);
			startTime.setMonth(month);
			endTime.setDate(day);
			endTime.setMonth(month);
			const event = {
				groupName: group.groupName,
				startTime: startTime.getTime() / 1000,
				endTime: endTime.getTime() / 1000,
				eventLocation: '7171 Minoru Blvd',
			}
			console.log('event: ', event)

			const URI = encodeURI('/groups/event/' + group.groupId);
			await axios.put(URI, event)
			.then(response => {
			if(response.status === 200) {
				console.log('event added successfully');
				
			} else {
				console.log('error setting event (not 200)');
			}
			})
			.catch(error => {
			console.log('error setting event: ' + error);
			})
		} else {
			console.log('date + times not selected');
		}
	}

	return(
		<Container>
			<DatePicker onChange={onChange} />
			<TimePicker.RangePicker format={'HH:mm'} minuteStep={15} use12Hours={true} onChange={onChangeTime}/>
			      <Button variant="contained" color="primary" onClick={submitEvent}>
        			Confirm Event
      			</Button>
		</Container>
	)

}

export default ConfirmEvent;