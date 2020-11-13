import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import config from './env';

const host = window.location.hostname ? 'http://localhost:3030' : config.API_LINK ;   
console.log('+++++++++'+host+'+++++++++')

const socket = io(host, {
  transports: ['websocket'],
  forceNew: true
});
const client = feathers();

client.configure(feathers.socketio(socket));
client.configure(feathers.authentication({
  storage: window.localStorage
}));
client.host = host;
export default client;
