import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { GlobalNotifier } from "./helpers/Notify/Alert";
import { NotifierContextProvider } from "./contexts/NotifierContext";
import theme from "./configs/Theme/theme";
import { QueryClientProvider, useQueryClient } from "react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);
