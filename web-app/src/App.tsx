import { useLocation, useRoutes } from "react-router-dom";
import routes from "./configs/routes";
import { NotifierContextProvider } from "./contexts/NotifierContext";
import { GlobalNotifier } from "./helpers/Notify/Alert";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { AuthActionsKind } from "./contexts/AuthContext/types";
import { ConfirmContextProvider } from "./contexts/ConfirmContext";
import GlobalConfirm from "./helpers/Confirm/GlobalConfirm";
import { io } from "socket.io-client";
import Cookies from "js-cookie";

function App() {
  const location = useLocation();
  const [authData, authDispach] = useContext(AuthContext);
  const chatId = "9b669823-b92a-4fc3-b334-44c92cd86d15";
  const receiverId = "624bb1a0-b920-4877-aec7-e28dd3f33aef";

  useEffect(() => {
    window.scrollTo(0, 0);
    authDispach({ type: AuthActionsKind.VERIFY });
  }, [location.pathname, authDispach]);

  useEffect(() => {
    if (authData && authData.valid && authData.userData) {
      const socket = io(process.env.REACT_APP_API_URL as string, {
        extraHeaders: {
          "x-access-token": Cookies.get("x-access-token") as string,
        },
      });

      socket.on(`user-connect-${authData.userData.id}`, (arg: any) => {
        console.log("user-connect:", arg);
      });

      socket.on(`user-disconnect-${authData.userData.id}`, (arg: any) => {
        console.log("user-disconnect:", arg);
      });

      socket.on(`receive-message-${chatId}-${receiverId}`, (arg: any) => {
        console.log("receive-message:", arg);
      });

      socket.on(`receive-chat-${receiverId}`, (arg: any) => {
        console.log("receive-chat:", arg);
      });

      socket.on(`update-messages-${receiverId}`, (arg: any) => {
        console.log("updated-messages:", arg);
      });

      socket.on(`deleted-message-${receiverId}`, (arg: any) => {
        console.log("deleted-message:", arg);
      });

      socket.on(`pending-chats-${receiverId}`, (arg: any) => {
        console.log("pending-chats:", arg);
      });

      const handleEnterInChat = () => {
        socket.emit("enter-in-chat", chatId);
      };

      window.addEventListener("click", handleEnterInChat);

      return () => {
        if (authData && authData.valid && authData.userData) {
          socket.off(`user-connect-${authData.userData.id}`);
          socket.off(`user-disconnect-${authData.userData.id}`);
          socket.off(`receive-message-${chatId}-${receiverId}`);
          socket.off(`receive-chat-${receiverId}`);
          socket.off(`updated-messages-${receiverId}`);
          socket.off(`deleted-messages-${receiverId}`);
          window.removeEventListener("click", handleEnterInChat);
        }
      };
    }
  }, [authData]);

  return (
    <NotifierContextProvider>
      <ConfirmContextProvider>
        <GlobalConfirm />
        <GlobalNotifier />
        {useRoutes(routes)}
      </ConfirmContextProvider>
    </NotifierContextProvider>
  );
}

export default App;
