import React, {useEffect, useState} from 'react';
import Message from './Message';
import moment from 'moment';
import Compose from './Compose.js';
import stompClient from 'src/helpers/StompClient.js';
import { useParams } from 'react-router';
import axios from 'axios';

// used to determine who sent message
const MY_USER_ID = 'apple';

export default function MessageList({groupId}) {
  const [messages, setMessages] = useState([])
  const loggedInUser = sessionStorage.getItem('encodedUserId');

    console.log('messages from: ', groupId);

    //TODO: fix b/c not calling on page load for some reason?
    stompClient.onConnect = function(frame) {
        console.log('Connected to chat server.');
        stompClient.subscribe('/topic/messages/' + groupId, (message) => {
          console.log(message.body);
        });
    }

    stompClient.activate();
  
  // console.log('grabbed messages: ', chatMessage);
  // console.log('ids: ', messageIds)

  useEffect(() => {
    getMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // need to modify the flow of how we grab and render messages below

  const getMessages = async () => {
     
    await axios.get('/messageboard/' + groupId + '/recentMessages')
    .then((response) => {
       if(response.status === 200) {
          return response.data;
        }
        else {
          alert('error retrieving group data');
        }
      })
      .then(data => {
        setMessages(data)
      })
      .catch(error => {
        console.log('error retrieving group data: ' + error);
      })
  }

  const addMessage = (message) => {
    setMessages([...messages, message]);
  }

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.userId === loggedInUser;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('minutes') < 10) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      console.log(current);

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current.message}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

    return(
      <div className="message-list">
        <div className="message-list-container">{renderMessages()}</div>
		{/* <Compose message={message}/> */}
    <Compose groupId = {groupId} callback={addMessage}/>
      </div>
    );
}