import { writable } from "svelte/store";

export const socket = new WebSocket("ws://localhost:49122");

//connect to SOS
socket.onopen = () => {
    console.log("Connected to SOS");
};

socket.onerror = (err) => {
    console.log("Websocket error", err);
};

export const socketMessageStore = writable({
    event: "default",
    data: {},
});

socket.onmessage = ({ data }) => {
    const parsed = JSON.parse(data);
    console.log(parsed);
  
    
    
    socketMessageStore.set(parsed);
};