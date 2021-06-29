import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import stompClient from 'src/helpers/StompClient.js';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '10rem',
      height: '8ch'
    },
  },
}));

export default function Compose({groupId, callback}) {
    const compose = useStyles();
    const [text, setText] = React.useState('')

    const loggedInUser = sessionStorage.getItem('encodedUserId');

    const sendChatMessage = (newMessage) => {
      const messageObj = {
        userId: loggedInUser,
        message: newMessage, 
      };
    
      callback(messageObj);

      stompClient.publish(
        {
          destination: '/app/chat/' + groupId, 
          body: JSON.stringify(messageObj)
        }
      );

      axios.put('messageboard/' + groupId + '/save')
      .then(response => {
        if(response.status === 200) {
          console.log('message saved to backend');
          return response.data;
        }
        else {
          alert('Error adding message :(');
        }
      })

    };

    const handleInput = (event) => {
      setText(event.target.value);
    }

    const handleSubmit = (event) => {
      if(event.code === "Enter"){
        sendChatMessage(text);
        event.target.value = ""
      }
    }

    return (
      <div className={compose.root}>
      <TextField 
        id="outlined-basic" 
        variant="outlined" 
        placeholder={'Send a message'} 
        onInput={handleInput} 
        onKeyPress={handleSubmit}/>
      </div>
    );
}