import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import ErrorBoundary from './components/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
