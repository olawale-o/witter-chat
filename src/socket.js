import io from 'socket.io-client';
const URL = process.env.NODE_ENV === 'https://native-chat.adaptable.app' ? undefined : 'http://localhost:5000';
const socket = io(URL, { autoConnect: false });

export default socket;
