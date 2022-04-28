import AccoutPage from "./Account";
import CheckPage from "./Check";
import LoginPage from "./Login";
import Layout from "../components/Layout";
import CreateUser from "../pages/CreateUser";
import { Navigate } from "react-router-dom";
const router = (islogin) => [
  {
    path: "/app",
    element: islogin ? <Layout /> : <Navigate to="/login" />,
    children: [
      {
        index: true,
        element: <CheckPage />,
      },
      {
        path: "account",
        element: <AccoutPage />,
      },
    ],
  },
  {
    path: "/login",
    element: islogin ? <Navigate to="/app" /> : <LoginPage />,
  },
  {
    path: "/create",
    element: islogin ? <Navigate to="/app" /> : <CreateUser />,
  },
  {
    path: "*",
    element: <Navigate to="/app" />,
  },
];

export default router;
