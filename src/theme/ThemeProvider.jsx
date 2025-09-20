import React from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3A7AFE',
      light: '#D8E6FF',
      dark: '#0057D9',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFC53D',
      light: '#FFF3D6',
      dark: '#FA8C16',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#FF4D4F',
      light: '#FFD6D6',
      dark: '#D9363E',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FFC53D',
      light: '#FFF3D6',
      dark: '#FA8C16',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#4DB4FF',
      light: '#D8E6FF',
      dark: '#0057D9',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#52C41A',
      light: '#DCFAD7',
      dark: '#389E0D',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#1F1F1F',
      secondary: '#595959',
      disabled: '#8C8C8C',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F7FA',
    },
    divider: '#E6E9EE',
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h1: {
      color: '#1F1F1F',
      fontWeight: 600,
    },
    h2: {
      color: '#1F1F1F',
      fontWeight: 600,
    },
    h3: {
      color: '#1F1F1F',
      fontWeight: 600,
    },
    h4: {
      color: '#1F1F1F',
      fontWeight: 600,
    },
    h5: {
      color: '#1F1F1F',
      fontWeight: 600,
    },
    h6: {
      color: '#1F1F1F',
      fontWeight: 600,
    },
    body1: {
      color: '#595959',
    },
    body2: {
      color: '#595959',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 6,
          boxShadow: 'none',
          fontWeight: 500,
        },
        containedPrimary: {
          backgroundColor: '#3A7AFE',
          '&:hover': {
            backgroundColor: '#0057D9',
            boxShadow: 'none',
          },
        },
        outlinedPrimary: {
          borderColor: '#3A7AFE',
          color: '#3A7AFE',
          '&:hover': {
            backgroundColor: '#D8E6FF',
          },
        },
        textPrimary: {
          color: '#3A7AFE',
          '&:hover': {
            backgroundColor: '#D8E6FF',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#F5F7FA',
          borderRadius: '10px',
        },
        elevation1: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 0 0 #E6E9EE',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
        },
      },
    },
  },
});

export const ThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;