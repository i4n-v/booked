import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./configs/Theme/theme";
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      suspense: true,
      refetchOnWindowFocus: false
    },
  }
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
