import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';


const STOMP_URL= "http://localhost:8080/stomp";
const MESSAGING_ENDPOINT = '/app/chat/';
const SUBSCRIPTION_ENDPOINT = '/topic/messages/';

class StompSocket {

    constructor() {
        // no need to instantiate anything here...
    }

    connect(groupId) {
        this.groupId = groupId;
        let ws = new SockJS(STOMP_URL);
        
        this.client = Stomp.over(ws)

        let onStompConnect = () => {

            if(this.subscription) {
                this.subscription.unsubscribe();
            }

            this.subscription = this.client.subscribe(SUBSCRIPTION_ENDPOINT + groupId, (message) => {
                console.log(message.body);
            })
        }

        this.client.onConnect = onStompConnect;
        this.client.activate();
    }

    sendMessage(message) {
        if(this.groupId) {
            this.client.publish({
                destination: MESSAGING_ENDPOINT + this.groupId, 
                body: message
            });
        }
        else {
            console.log('no groupId detected!')
        }
    }
}

//singleton
const stompSocket = new StompSocket();
export default stompSocket;