import React, { useState, useEffect, useMemo } from "react";
import { Typography, Button, Grid } from "@mui/material";
import api from "api";
import { useSelector } from "react-redux";

const CheckPage = () => {
  const [basla, setBasla] = useState();

  const user = useSelector((state) => state.account.user);
  const [hata, setHata] = useState([]);
  const [tarih, setTarih] = useState();
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [hours, setHours] = useState("00");
  const [isActive, setIsActive] = useState("");
  const [counter, setCounter] = useState(null);

  useEffect(() => {
    api()
      .get("/molabilgi?sicil=" + user.sicil)
      //.then((response) => setHata(response.data.tur))
      //.then((response) => setCounter(response.data.saniyeFark))
      .then((response) => {
        setHata(response.data.tur);
        setCounter(response.data.saniyeFark);
        setIsActive(true);
        console.log("success:", hata, counter);
        const tur = response.data.tur;
        if (tur === "1") {
          setBasla(false);
          setIsActive(true);
        } else {
          setBasla(true);
          setIsActive(false);
        }
      });
  }, [hata]);

  const malaBasla = () => {
    setIsActive(!isActive);
    const data = {
      sicil: user.sicil,
      tur: "1",
    };
    api()
      .post("/mola ", data)

      .then((response) => setHata(response.data.hataMesaji))
      .then((response) => {
        console.log("molasuccess:", hata);
      });
    /* .catch((error) => {
        console.log("errorserhat:", error.response.data.errors);
      });*/
  };
  const malaBitir = () => {
    stopTimer();
    const data = {
      sicil: user.sicil,
      tur: "2",
    };
    api()
      .post("/mola ", data)

      .then((response) => setHata(response.data.hataMesaji))
      .then((response) => {
        console.log("success:", hata);
      });
    /* .catch((error) => {
        console.log("errorserhat:", error.response.data.errors);
      });*/
  };

  useEffect(() => {
    let intervalId;

    if (isActive) {
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
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);
  useMemo(() => {
    setTarih(new Date().toLocaleDateString());
  }, [new Date().toLocaleDateString()]);

  function stopTimer() {
    setIsActive(false);
    //setCounter(0);
    setSecond("00");
    setMinute("00");
    setHours("00");
  }

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
        <Button
          variant="contained"
          color="success"
          sx={{ height: 75 }}
          fullWidth
          onClick={malaBasla}
          disabled={basla === true ? false : true}
        >
          Molaya Başla
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="warning"
          sx={{ height: 75 }}
          fullWidth
          onClick={malaBitir}
          disabled={basla === false ? false : true}
        >
          Molayı Bitir
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography xs={12} color="green" fontSize={24} textAlign="center">
          {hours}:{minute}:{second}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default CheckPage;
