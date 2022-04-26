import React, { useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  Link,
  Avatar,
  Stack,
  IconButton,
  Collapse,
  Alert,
} from "@mui/material";

import {
  PersonAddAlt,
  LockOutlined as LockOutlinedIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { setUser } from "store/slices/account";
import { useDispatch } from "react-redux";
import {} from "../../theme";
import logo1 from "../../img/2.jpg";
import logo2 from "../../img/200.png";
import api from "api";
const LoginPage = () => {
  const [telefon, setTelefon] = useState(null);
  const [parola, setParola] = useState(null);
  const dispatch = useDispatch();
  //const [kullanici, setkullanici] = useState(null);
  const [open, setOpen] = useState(false);
  /* useEffect(() => {
    api()
      .get("/login?telefon=" + telefon + "&sifre=" + parola)
      //.then((response) => setkullanici(response.data))
      .then((response) => {
        setkullanici(response.data);
        console.log("success:", kullanici);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }, [parola]);*/

  const login = async () => {
    api()
      .get("/login?telefon=" + telefon + "&sifre=" + parola)
      .then((response) => {
        console.log("loginHata:", response.data);
        const kullanici = response.data;
        if (kullanici.hataKodu === 1) {
          dispatch(
            setUser({
              telefon: kullanici.telefon,
              sicil: kullanici.sicil,
              name: {
                ad: kullanici.ad,
                soyad: kullanici.soyad,
              },
            })
          );
        } else {
          dispatch(setUser(null));
          setOpen(true);
        }
      })
      .catch((error) => {
        console.log("error:", error);

        dispatch(setUser(null));
        setOpen(true);
      });
  };
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
        sx={{
          pb: "calc(env(safe-area-inset-bottom)+90px)",
          pt: "calc(env(safe-area-inset-top)+90)",
        }}
      >
        <CssBaseline />
        <Box sx={{ width: "100%" }}>
          <Collapse in={open}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Giriş Başarısız
            </Alert>
          </Collapse>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Mola Takip Kullanıcı Girişi
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Telefon Numarasını Başında Sıfır Olmadan Giriniz."
              value={telefon ? telefon : ""}
              fullWidth
              type="tel"
              placeholder="5xxxxxxxxx"
              onChange={(e) => setTelefon(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Parola"
              value={parola ? parola : ""}
              fullWidth
              onChange={(e) => setParola(e.target.value)}
            />
          </Grid>

          <Grid item sx={{ alignItems: "center" }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ paddingTop: 2, paddingBottom: 2, alignItems: "center" }}
            >
              <PersonAddAlt sx={{ padding: 1 }} />
              <Link
                href="CreateUser"
                variant="body2"
                sx={{ alignItems: "center" }}
              >
                {"Üye Olmak İçin Tıklayın"}
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={login}>
              Giriş Yap
            </Button>
          </Grid>
        </Grid>
        <Box
          sx={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            boxShadow: 10,
            textAlign: "center",
            bgcolor: "#ffffff",

            zIndex: 100,
          }}
        >
          <img
            src={logo2}
            width="200px"
            alt="Bilgi işlem Merkezi Yazılım Ekibi"
          />
        </Box>
      </Container>
    </>
  );
};
export default LoginPage;
