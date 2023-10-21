import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { QueryClientProvider } from "react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./configs/Theme/theme";
import queryClient from "./configs/queryCLient";

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
