import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';

import './index.scss';
import App from './app/App';

export const themeOptions: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: '#f9c9d2',
          fontWeight: '400',
          fontSize: '24px',
          borderRadius: '10px',
          boxShadow: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: '#6D0F20',
          borderRadius: '10px',

          '&.Mui-error': {
            // border: '4px solid red',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#f9c9d2',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '14px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {},
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#6D0F20',
      dark: '#d01c3c',
      light: '#df6379',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#150f0f',
      paper: '#3c2222',
    },
    text: {
      primary: '#f9c9d2',
      secondary: '#edc6c6',
      disabled: '#ab9090',
    },
    error: {
      main: '#ffaed1',
    },
  },
};

const theme = createTheme(themeOptions);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
