import React, { useState, useRef } from "react";
import {
  Container,
  TextField,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  CssBaseline,
  Stack,
  Snackbar,
} from "@mui/material";
import Portal from "@mui/material/Portal";
import api from "api";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import logo1 from "../../img/2.jpg";
import MuiAlert from "@mui/material/Alert";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [telefon, setTelefon] = useState("");
  const [parola, setParola] = useState("");
  const [sicil, setSicil] = useState("");
  const [TCKimlik, setTCKimlik] = useState("");
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState([]);
  const [hatatur, setHatatur] = useState();
  const [show, setShow] = useState(false);
  const container = useRef(null);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    kaydet();
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const data = {
    token: "",
    sicil: sicil,
    sifre: parola,
    telefon: telefon,
    tckimlikNo: TCKimlik,
  };

  const kaydet = async () => {
    api()
      .post("/ekle", data)

      //.then((response) => setHata(response.data.hataMesaji))
      .then((response) => {
        setHata(response.data.hataMesaji);
        console.log("success:", response.data);

        if (response.data.hataKodu === 999) {
          api()
            .get("/login?telefon=" + data.telefon + "&sifre=" + data.sifre)
            .then((response1) => {
              const smsDogrula = response1.data.smsDogrulama;

              if (smsDogrula === null) {
                const dataSms = {
                  sicil: response.data.sicil.trim(),
                  ad: response.data.ad.trim(),
                  telefon: response.data.telefon.trim(),
                  soyad: response.data.soyad,
                };

                api()
                  .post(
                    "/smsGonder?telefon=" +
                      dataSms.telefon +
                      "&ad=" +
                      dataSms.ad +
                      "&soyad=" +
                      dataSms.soyad +
                      "&sicil=" +
                      dataSms.sicil
                  )
                  .then((response) => {
                    setHata("Telefonunuza Gelen Kodu Giriniz");
                  });
                setHatatur("success");
                setShow(true);
              } else {
                setHata(
                  "Kullanıcı Sistemde Kayıtlı. Yeni Üyelik Oluşturamazsınız."
                );
                setHatatur("error");
                setShow(false);
              }
            });
        } else if (response.data.hataKodu === 101) {
          setHata("Sisteme kayıtlı personel bulunamadı.");
          setHatatur("error");
          setShow(false);
        } else if (response.data.hataKodu === 1) {
          const dataSms = {
            sicil: response.data.sicil.trim(),
            ad: response.data.ad.trim(),
            telefon: response.data.telefon.trim(),
            soyad: response.data.soyad,
          };

          api()
            .post(
              "/smsGonder?telefon=" +
                dataSms.telefon +
                "&ad=" +
                dataSms.ad +
                "&soyad=" +
                dataSms.soyad +
                "&sicil=" +
                dataSms.sicil
            )
            .then((response) => {
              setHata(response.data.sicil);
              console.log("successsicil:", response);
            });
          setHatatur("success");
          setShow(true);
        } else {
          setShow(true);
          setHatatur("success");
        }
      })
      .catch((error) => {
        console.log("errorserhat:", error.response.data.errors);

        if (error.response.data.errors.Telefon) {
          setHata(error.response.data.errors.Telefon[1]);
          setHatatur("error");
        } else if (error.response.data.errors.Sifre) {
          setHata(error.response.data.errors.Sifre[0]);
          setHatatur("error");
        } else if (error.response.data.errors.Sicil) {
          setHata(error.response.data.errors.Sicil[0]);
          setHatatur("error");
        } else if (error.response.data.errors.TcKimlikNo) {
          setHata(error.response.data.errors.TcKimlikNo[1]);
          setHatatur("error");
        } else {
          setHata(error.response.data.errors);
          setHatatur("error");
        }
      });
  };
  const kayitTamamla = () => {
    api()
      .get("/smsKontrol?gelenMesaj=" + sifre + "&Sicil=" + sicil)

      .then((response) => {
        const hata2 = response.data;
        setHata(response.data);
        console.log("successSmsMesaj:", response.data);

        if (hata2 === true) {
          console.log("İf e girdi:", hata2);

          window.location.href = "molatakip";

          /*setOpen(true);
          setHata("Girilen Sms Kodu Başarılı.");
          setHatatur("success");*/
        } else {
          setOpen(true);
          setHata("Girilen Sms Kodu Hatalı.");
          setHatatur("error");
        }
      });
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ flexGrow: 1, pt: "env(safe-area-inset-top)" }}
      >
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
      <Container maxWidth="md" sx={{ mt: 3, pt: "env(safe-area-inset-top)" }}>
        <CssBaseline />

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
                Mola Takip Kullanıcı Oluşturma
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Telefon No"
              value={telefon}
              type="tel"
              fullWidth
              onChange={(e) => setTelefon(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Parola"
              value={parola}
              fullWidth
              onChange={(e) => setParola(e.target.value)}
              type="password"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Sicil"
              value={sicil}
              fullWidth
              onChange={(e) => setSicil(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="T.C. Kimlik No(Son 3 Karakter)"
              value={TCKimlik}
              type="tel"
              fullWidth
              onChange={(e) => setTCKimlik(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleClick}
              disabled={show === false ? false : true}
            >
              Kayıt Ol
            </Button>
          </Grid>
        </Grid>
        {show ? (
          <Portal container={container.current}>
            <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
              <TextField
                label="Telefona Gelen SMS Kodu"
                fullWidth
                type="tel"
                onChange={(e) => setSifre(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Button
                fullWidth
                variant="contained"
                xs={12}
                onClick={kayitTamamla}
              >
                Kaydı Tamamla
              </Button>
            </Grid>
          </Portal>
        ) : null}

        <Box sx={{ border: "0px solid" }} ref={container} />
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={hatatur}
              sx={{ width: "100%" }}
            >
              {hata}
            </Alert>
          </Snackbar>
        </Stack>
      </Container>
    </>
  );
};
export default LoginPage;
