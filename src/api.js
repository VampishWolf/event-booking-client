import openSocket from 'socket.io-client';
import configData from './config.json'
const socket = openSocket(configData.SERVER_URL);

function subscribeToTimer (interval, cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
}

export { subscribeToTimer }