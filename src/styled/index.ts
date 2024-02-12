import { createTheme } from "@mui/material"

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    success: {
      main: "#28DA9D",
    },
    warning: {
      main: "#F47920",
    },
    primary: {
      main: "#FFFFFF",
    },
    grey: {
      "100": "#363636",
    },
  },
  typography: {
    fontFamily: ["poppins"].join(","),
  },
})
