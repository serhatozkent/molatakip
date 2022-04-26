import { createTheme } from "@mui/material";

const theme = createTheme({
  spacing: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
