import { useLocation, useRoutes } from "react-router-dom";
import routes from "./configs/routes";
import { NotifierContextProvider } from "./contexts/NotifierContext";
import { GlobalNotifier } from "./helpers/Notify/Alert";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { AuthActionsKind } from "./contexts/AuthContext/types";
import { ConfirmContextProvider } from "./contexts/ConfirmContext";
import GlobalConfirm from "./helpers/Confirm/GlobalConfirm";
import socket from "./configs/socket";

function App() {
  const location = useLocation();
  const [authData, authDispach] = useContext(AuthContext);

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
