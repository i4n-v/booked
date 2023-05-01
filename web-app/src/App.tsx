import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from "./configs/routes";
import theme from "./configs/Theme/theme";
import { NotifierContextProvider } from "./contexts/NotifierContext";
import { GlobalNotifier } from "./helpers/Notify/Alert";

function App() {
  const queryClient = new QueryClient();
  return (
    <NotifierContextProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <GlobalNotifier />
          {useRoutes(routes)}
        </QueryClientProvider>
      </ThemeProvider>
    </NotifierContextProvider>
  );
}

export default App;
