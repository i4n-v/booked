import { useLocation, useRoutes } from "react-router-dom";
import routes from "./configs/routes";
import { NotifierContextProvider } from "./contexts/NotifierContext";
import { GlobalNotifier } from "./helpers/Notify/Alert";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { AuthActionsKind } from "./contexts/AuthContext/types";
import { ConfirmContextProvider } from "./contexts/ConfirmContext";
import GlobalConfirm from "./helpers/Confirm/GlobalConfirm";

function App() {

  const location = useLocation()
  const [, authDispach] = useContext(AuthContext)
  useEffect(() => {
    window.scrollTo(0, 0);
    authDispach({ type: AuthActionsKind.VERIFY })
  }, [location.pathname, authDispach])
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
