declare module '@mui/material/styles' {
    interface Theme {
      status: {
        danger: string;
        success: string;
        error: string;
      };
      roundening: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
      icon: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
      status?: {
        danger?: string;
        success?: string;
        error?: string;
      };
      roundening?: {
        xs?: string;
        sm?: string;
        md?: string;
        lg?: string;
        xl?: string;
      };
      icon?: {
        xs?: string;
        sm?: string;
        md?: string;
        lg?: string;
        xl?: string;
      };
    }
}

export {}