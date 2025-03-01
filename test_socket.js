import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("new_order", (data) => {
  console.log("New order notification:", data);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});