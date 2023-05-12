import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { useLocation, useRoutes } from "react-router-dom";
import routes from "./configs/routes";
import theme from "./configs/Theme/theme";
import { NotifierContextProvider } from "./contexts/NotifierContext";
import { GlobalNotifier } from "./helpers/Notify/Alert";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { AuthActionsKind } from "./contexts/AuthContext/types";

function App() {

  const location = useLocation()
  const [_, authDispach] = useContext(AuthContext)
  useEffect(() => {
    authDispach({ type: AuthActionsKind.VERIFY })
  }, [location.pathname])
  return (
    <NotifierContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalNotifier />
        {useRoutes(routes)}
      </ThemeProvider>
    </NotifierContextProvider>
  );
}

export default App;
