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
import socket from "./configs/socket";

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

      socket.on(`user-connect-${authData.userData.id}`, (arg: any) => {
        console.log("user-connect:", arg);
      });

      socket.on(`user-disconnect-${authData.userData.id}`, (arg: any) => {
        console.log("user-disconnect:", arg);
      });

      return () => {
        if (authData && authData.valid && authData.userData) {
          socket.off(`user-connect-${authData.userData.id}`);
          socket.off(`user-disconnect-${authData.userData.id}`);
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
