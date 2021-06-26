import {
  Container,
} from '@material-ui/core';
import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { DatePicker, TimePicker } from 'antd';
import 'antd/dist/antd.css';

const ConfirmEvent = ({group}) => {

	const onChange = async (date) => {
		const d = date._d.getTime() / 1000;
		await axios.put(`/group/${group}/add/timeframe`, )
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

	return(
		<Container>
			<DatePicker onChange={onChange} />
			<TimePicker.RangePicker format={'HH:mm'} minuteStep={15} use12Hours={true} onChange={onChange}/>
		</Container>
	)

}

export default ConfirmEvent;