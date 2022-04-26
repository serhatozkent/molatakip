import AccoutPage from "./Account";
import CheckPage from "./Check";
import Layout from "../components/Layout";
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
    path: "/molatakip/login",
    element: islogin ? (
      <Navigate to="/molatakip/app" />
    ) : (
      <Navigate to="/molatakip/login" />
    ),
  },
  {
    path: "/molatakip/CreateUser",
    element: islogin ? (
      <Navigate to="/molatakip/app" />
    ) : (
      <Navigate to="/molatakip/CreateUser" />
    ),
  },
  {
    path: "*",
    element: <Navigate to="/molatakip/app" />,
  },
];

export default router;
