import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Example primary color
    },
    secondary: {
      main: '#dc004e', // Example secondary color
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    // You can define more typography variants here
  },
  // You can also customize components here
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Example: disable uppercase for buttons
        },
      },
    },
  },
});

export default theme;