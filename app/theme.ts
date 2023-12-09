import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
      xs: false; // removes the `xs` breakpoint
      sm: false;
      md: false;
      lg: false;
      xl: false;
      mobile: true; // adds the `mobile` breakpoint
      tablet: true;
      desktop: true;
    }
  }

  const theme = createTheme({
    breakpoints: {
        values: {
            mobile: 0,
            tablet: 810,
            desktop: 1200
        }
    }
})

export default theme;