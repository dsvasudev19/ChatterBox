import { io } from "socket.io-client";

const SOCKET_URL = "wss://chatter.interactweb.agency/"; 
const socket = io(SOCKET_URL, {
    withCredentials: true, 
});

export default socket;
