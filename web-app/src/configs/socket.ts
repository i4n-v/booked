import Cookies from "js-cookie";
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL as string, {
  extraHeaders: {
    "x-access-token": Cookies.get("x-access-token") as string,
  },
});

export default socket;
