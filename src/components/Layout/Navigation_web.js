import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import {
  Person as PersonIcon,
  Assessment as AssessmentIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { setUser } from "store/slices/account";
import { useDispatch } from "react-redux";
const routes = [
  {
    title: "Hesap",
    path: "/molatakip/app/account",
    icon: <PersonIcon />,
  },
  {
    title: "Mola Takip",
    path: "/app",
    icon: <AssessmentIcon />,
  },
  {
    title: "Güvenli Çıkış",
    path: "/login",
    icon: <ExitToAppIcon />,
    serhat: true,
  },
];
const Navigasyon = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setUser(null));
  };

  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        boxShadow: 10,

        bgcolor: "Background.paper",
        zIndex: 100,
      }}
    >
      <BottomNavigation
        value={pathname}
        onChange={(event, newValue) => navigate(newValue)}
      >
        {routes.map((route) => {
          return (
            <BottomNavigationAction
              onClick={route.serhat ? logout : null}
              key={route.title}
              label={route.title}
              icon={route.icon}
              value={route.path}
            />
          );
        })}
      </BottomNavigation>
    </Box>
  );
};

export default Navigasyon;
