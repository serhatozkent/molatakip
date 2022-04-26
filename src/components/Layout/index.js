import React from "react";
import { Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Stack,
  Avatar,
} from "@mui/material";
import Navigasyon from "./Navigation";
import logo1 from "../../img/2.jpg";
const Layout = () => {
  return (
    <>
      <AppBar position="sticky" sx={{ pt: "env(safe-area-inset-top)" }}>
        <Toolbar>
          <Container maxWidth="md" xs={12}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ paddingTop: 2, paddingBottom: 2, alignItems: "center" }}
            >
              <Avatar
                alt="Erciyes Üniversitesi"
                src={logo1}
                sx={{ height: 50, width: 50 }}
              />
              <Typography variant="h6">
                Erciyes Üniversitesi Tıp Fakültesi Hastaneleri
              </Typography>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="md"
        sx={{ mt: 2, pt: "calc(env(safe-area-inset-top)+90)" }}
      >
        <Outlet />
      </Container>
      <Navigasyon />
    </>
  );
};

export default Layout;
