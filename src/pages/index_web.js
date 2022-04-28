import AccoutPage from "./Account";
import CheckPage from "./Check";
import LoginPage from "./Login";
import Layout from "../components/Layout";
import CreateUser from "./CreateUser";
import { Navigate } from "react-router-dom";
const router = (islogin) => [
  {
    path: "/molatakip/app",
    element: islogin ? <Layout /> : <Navigate to="/molatakip/login" />,
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
    path: `${process.env.PUBLIC_URL}/login`,
    element: islogin ? <Navigate to="/molatakip/app" /> : <LoginPage />,
  },
  {
    path: `${process.env.PUBLIC_URL}/create`,
    element: islogin ? <Navigate to="/molatakip/app" /> : <CreateUser />,
  },
  {
    path: "*",
    element: <Navigate to="/molatakip/app" />,
  },
];

export default router;
