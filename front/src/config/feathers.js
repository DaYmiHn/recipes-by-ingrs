import io from 'socket.io-client';
import feathers from '@feathersjs/client';

const host = 'http://192.168.0.2:3030';

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
