import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import stompClient from 'src/helpers/StompClient.js';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '10rem',
      height: '8ch'
    },
  },
}));

export default function Compose({groupId}) {
    const compose = useStyles();
    const [text, setText] = React.useState('')

    const loggedInUser = sessionStorage.getItem('encodedUserId');
    
    const sendChatMessage = (newMessage) => {
      const messageObj = {
        userId: loggedInUser,
        message: newMessage, 
      };
    
      stompClient.publish(
        {
          destination: '/app/chat/' + groupId, 
          body: JSON.stringify(messageObj)
        }
      );
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