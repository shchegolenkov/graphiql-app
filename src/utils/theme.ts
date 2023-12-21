import { ThemeOptions } from '@mui/material';

export const themeOptions: ThemeOptions = {
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          minWidth: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: '#f9c9d2',
          fontWeight: '400',
          fontSize: '24px',
          fontFamily: "'Ubuntu', sans-serif",
          borderRadius: '10px',
          boxShadow: 'none',

          '&.Mui-disabled': {
            color: '#ab9090',
            background: '#331f23',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: '#6D0F20',
          borderRadius: '10px',
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
