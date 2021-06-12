import React, { useState } from "react";
import { useRoutes } from "react-router-dom";
import routes from 'src/routes.js';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import SockJs from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

// update localhost address here - this is setup
const socket = new SockJs("http://localhost:8080/stomp", {}, {CheckOrigin: () => false});
socket.onopen = () => {
  console.log('connected');
};
socket.onclose = () => {
  console.log('disconnected');
}

const stompClient = Stomp.over(socket);


const App = () => {
  const [userName, updateUsername] = useState("");
  const [chatMessages, updateChatMessages] = useState([]);
  const [currentMessageId, updateMessageId] = useState(0);

  /* Being Handlers */

  const addNewChatMessage = (newMessage) => {
    const messagesWithNew = [...chatMessages, newMessage];
    updateChatMessages(messagesWithNew);
  };

  const sendChatMessage = (newMessage) => {
    const messageObj = {
      userName, 
      message: newMessage, 
      messageId: currentMessageId
    };
    stompClient.publish({destination: '/app/chat', body: JSON.stringify(messageObj)});
    updateMessageId(currentMessageId + 1);
  };

  if(!stompClient.connected) {
    stompClient.connect({}, () => {
      console.log('Connected to chat server.');
      stompClient.subscribe('/topic/messages', (message) => {
        // console.log('message received', message);
        addNewChatMessage(JSON.parse(message.body));
      });
    });
  }

  const routing = useRoutes(routes(sendChatMessage, chatMessages, currentMessageId));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>

  );
}

export default App;