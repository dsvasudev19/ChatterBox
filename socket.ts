import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3001"; 

const socket = io(SOCKET_URL, {
    withCredentials: true, 
    transports: ["websocket"], 
});

export default socket;
