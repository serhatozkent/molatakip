import React, { useState, useEffect, useMemo } from "react";
import {
  Typography,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Stack,
  styled,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import api from "api";
import { useSelector } from "react-redux";
import theme from "../../theme";
const CheckPage = () => {
  const [basla, setBasla] = useState(true);

  const user = useSelector((state) => state.account.user);
  const [hata, setHata] = useState([]);
  const [tarih, setTarih] = useState();
  const [toplamDakika, setTaplamDakika] = useState(0);
  const [butonMesaj, setButonMesaj] = useState("");
  const [mola, setMola] = useState([]);
  const [open, setOpen] = useState(false);
  const [hatatur, setHatatur] = useState();
  const [hataMesaj, setHataMesaj] = useState();
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [hours, setHours] = useState("00");
  const [isActive, setIsActive] = useState("");
  const [counter, setCounter] = useState(0);
  const [value, setValue] = React.useState("2");

  useEffect(() => {
    api()
      .get("/molabilgi?sicil=" + user.sicil)

      .then((response) => {
        setHata(response.data.tur);
        setCounter(response.data.saniyeFark);
        if (response.data.sicil) {
          setIsActive(true);
        }

        console.log("molabilgi:", response.data);

        const molalar = response.data.kayitBilgi;
        if (molalar) {
          const yenimola = Object.entries(molalar).map(([key, value]) => ({
            key,
            value,
          }));
          setMola(yenimola);
        }

        const toplamDakika = response.data.toplamDakika;
        setTaplamDakika(toplamDakika);
        if (toplamDakika >= "60") {
          setButonMesaj("Günlük Mola Hakkınız Bitmiştir");
          setBasla(false);
        } else {
          setButonMesaj("Molayı Kullandım");
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hata]);

  const data = {
    sicil: user.sicil,
    tur: value,
  };

  const molaEkle = async () => {
    api()
      .post("/mola?sicil=" + data.sicil + "&tur=" + data.tur)

      .then((response) => {
        setHata(response.data.hataMesaji);
        console.log("molasuccess:", response.data);
        handleClick();
        setOpen(true);
        setHataMesaj("Molanız Başladı.");
        setHatatur("success");
      });
    /* .catch((error) => {
        console.log("errorserhat:", error.response.data.errors);
      });*/
  };

  const sureKontrol = () => {
    let valueDakika = 0;
    switch (value) {
      case "1":
        valueDakika = 15;
        break;
      case "2":
        valueDakika = 30;
        break;
      case "3":
        valueDakika = 60;
        break;
      default:
        valueDakika = 0;
    }
    let tDakika = valueDakika + toplamDakika;
    if (tDakika > 60) {
      handleClick();
      setOpen(true);
      setHataMesaj("Günlük Kullanılabilir Limit Aşılamaz.");
      setHatatur("error");
    } else {
      setBasla(false);
      setIsActive(!isActive);
      molaEkle();
    }
  };

  const molaBasla = async () => {
    sureKontrol();
  };
  useEffect(() => {
    let intervalId;

    if (isActive) {
      console.log("sayaca girdi:");
      intervalId = setInterval(() => {
        const secondCounter = Math.floor(counter % 60);
        const minuteCounter = Math.floor((counter / 60) % 60);
        const hoursCounter = Math.floor((counter / 60 / 60) % 24);
        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;
        let computeshours =
          String(hoursCounter).length === 1 ? `0${hoursCounter}` : hoursCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);
        setHours(computeshours);
        setCounter((counter) => counter + 1);
      }, 1000);
      if (counter >= 60) {
        if (toplamDakika >= "60") {
          setButonMesaj("Günlük Mola Hakkınız Bitmiştir");
          setBasla(false);

          setIsActive(false);
        } else {
          setButonMesaj("Molayı Kullandım");
          setBasla(true);
          setIsActive(false);
          stopTimer();
        }
      } else {
        setBasla(false);
      }
    }

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, counter]);
  function stopTimer() {
    setIsActive(false);
    setCounter(0);
    setSecond("00");
    setMinute("00");
    setHours("00");
  }

  useMemo(() => {
    setTarih(new Date().toLocaleDateString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [new Date().toLocaleDateString()]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Grid container spacing={5} sx={{ mt: 5 }}>
      <Grid item xs={12}>
        <Typography xs={12} color="black" fontSize={24} textAlign="center">
          Sayın {user.name.ad} {user.name.soyad}
        </Typography>
        <Typography xs={12} color="gray" fontSize={20} textAlign="center">
          {tarih}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ width: 1, textAlign: "center" }}>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ color: theme.palette.primary.main }}
          >
            Kullanılacak Mola Süresi
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value}
            onChange={handleChange}
            sx={{ width: 1, justifyContent: "center" }}
          >
            <FormControlLabel value="1" control={<Radio />} label="15 Dk" />
            <FormControlLabel value="2" control={<Radio />} label="30 Dk" />
            <FormControlLabel value="3" control={<Radio />} label="60 Dk" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="success"
          sx={{ height: 75 }}
          fullWidth
          onClick={molaBasla}
          disabled={basla === true ? false : true}
        >
          {basla === true
            ? butonMesaj
            : toplamDakika < 60
            ? hours + ":" + minute + ":" + second
            : butonMesaj}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ justifyContent: "center" }}
        >
          {mola.map((item) => {
            return (
              <Item
                key={item.key}
                sx={{
                  width: 1,
                }}
              >
                <b>Saat:</b>
                {item.key} <b>Mola Süresi:</b>
                {item.value} dk
              </Item>
            );
          })}
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1} xs={12}>
          <Item
            sx={{
              width: 1,
              color: "white",
              backgroundColor: "darkslategray",
            }}
          >
            <b>Kullanılan Toplam Mola Süresi: </b>
            {toplamDakika} Dk
          </Item>
        </Stack>
      </Grid>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={hatatur}
            sx={{ width: "100%" }}
          >
            {hataMesaj}
          </Alert>
        </Snackbar>
      </Stack>
    </Grid>
  );
};
export default CheckPage;
