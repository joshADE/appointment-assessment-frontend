import { createTheme } from '@mui/material';
import { green, red, orange } from '@mui/material/colors';
import type {} from '@mui/x-date-pickers/themeAugmentation';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#8d6e63',
        },
        secondary: {
            main: '#ef6c00',
        },
    },
    typography: {
        allVariants: {
            fontFamily: "'Roboto', 'san-serif'"
        },
        body1: {
            fontSize: "0.9rem",
        },
        body2: {
            fontSize: "0.7rem",
        }
    },
    status: {
        success: green[200],
        danger: orange[500],
        error: red[300],
    },
    roundening: {
        xs: "2px",
        sm: "4px",
        md: "10px",
        lg: "16px",
        xl: "20px",
    },
    icon: {
        xs: "12px",
        sm: "16px",
        md: "20px",
        lg: "24px",
        xl: "28px",
    },
});