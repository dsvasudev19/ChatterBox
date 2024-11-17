import { io } from "socket.io-client";

const SOCKET_URL = "https://chatter.interactweb.agency"; 

const socket = io(SOCKET_URL, {
    withCredentials: true, 
    transports: ["websocket"], 
});

export default socket;
