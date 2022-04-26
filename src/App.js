import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import { useRoutes } from "react-router-dom";
import router from "./pages";
import { useSelector } from "react-redux";
import { StatusBar } from "@capacitor/status-bar";
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
function App() {
  const account = useSelector((state) => state.account);
  const pages = useRoutes(router(account.user));
  useEffect(() => {
    if (Capacitor.getPlatform() === "android") {
      StatusBar.setStyle({
        style: "DARK",
      });
      StatusBar.setBackgroundColor({
        color: theme.palette.primary.main,
      });
    }
    if (Capacitor.getPlatform() === "ios") {
      StatusBar.setStyle({
        style: "DARK",
      });
    }
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {pages}
      </ThemeProvider>
    </div>
  );
}

export default App;
