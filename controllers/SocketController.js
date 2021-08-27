import io from "socket.io-client";
// import store from "../redux/store";
import api from "../config/api";
// import { playNewMessage, playBeep } from "./SoundController";
let socket = null;

export default {
  init: (apiToken) => {
    socket = io(api.urlApi, {
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.on("connect", () => {
      socket.emit("auth", apiToken);
    });
  },
  getSocketId: () => {
    return socket.id;
  },
};