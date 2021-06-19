import SockJs from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

// update localhost address here - this is setup
const socket = new SockJs("http://localhost:8080/stomp", {}, {CheckOrigin: () => false});

socket.onopen = () => {
  console.log('Socket connected');
};
socket.onclose = () => {
  console.log('Socket disconnected');
}

const stompClient = Stomp.over(socket);

stompClient.onConnect = function(frame) {
  console.log('StompClient connected');
}

stompClient.onDisconnect = function(frame) {
  console.log('StompClient disconnected')
}

stompClient.activate();

export default stompClient;