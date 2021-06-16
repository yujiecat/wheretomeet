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

export default stompClient;