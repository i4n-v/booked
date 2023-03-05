import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './config/theme';
import { GlobalNotifier } from './helpers/Notify/Alert';
import { NotifierContextProvider } from './context/NotifierContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <NotifierContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GlobalNotifier />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </NotifierContextProvider>
  </React.StrictMode>
);
