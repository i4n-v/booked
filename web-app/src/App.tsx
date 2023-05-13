import { useLocation, useRoutes } from "react-router-dom";
import routes from "./configs/routes";
import { NotifierContextProvider } from "./contexts/NotifierContext";
import { GlobalNotifier } from "./helpers/Notify/Alert";
import { Suspense, useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { AuthActionsKind } from "./contexts/AuthContext/types";
import { BookBackground } from "./assets/SVG";

function App() {

  const location = useLocation()
  const [_, authDispach] = useContext(AuthContext)
  useEffect(() => {
    authDispach({ type: AuthActionsKind.VERIFY })
  }, [location.pathname])
  return (

    <NotifierContextProvider>

      <GlobalNotifier />
      <Suspense fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <BookBackground />
        </div>}>
        {useRoutes(routes)}
      </Suspense>
    </NotifierContextProvider>

  );
}

export default App;
