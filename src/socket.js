import io from 'socket.io-client';
const URL = process.env.NODE_ENV !== 'development' ? 'https://native-chat.adaptable.app' : 'http://localhost:5000';
const socket = io(URL, { autoConnect: false });

export default socket;
