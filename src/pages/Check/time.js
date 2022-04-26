import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";

const Time = () => {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [hours, setHours] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

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

  function stopTimer() {
    setIsActive(false);
    setCounter(3598);
    setSecond("00");
    setMinute("00");
    setHours("00");
  }

  return (
    <>
      <Grid>
        <Grid item>
          <Typography>
            {hours}:{minute}:{second}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Time;

/*<div class="container">
      <div class="time">
        <span class="hours">{hours}</span>
        <span>:</span>
        <span class="minute">{minute}</span>
        <span>:</span>
        <span class="second">{second}</span>
      </div>
      <div class="buttons">
        <button onClick={() => setIsActive(!isActive)} class="start">
          {isActive ? "Pause" : "Start"}
        </button>
        <button onClick={stopTimer} class="reset">
          Reset
        </button>
      </div>
    </div>*/

/*   import React, { useState, useRef, useEffect } from "react";
import { Typography, Button, Grid } from "@mui/material";
import api from "api";
import { useDispatch, useSelector } from "react-redux";
import { setSaat } from "store/slices/timer";
const CheckPage = () => {
  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00:01");
  const [basla, setBasla] = useState();
  const saat = useSelector((state) => state.timer.saat);
  const user = useSelector((state) => state.account.user);
  const [hata, setHata] = useState([]);
  const dispatch = useDispatch();
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(((total / 1000) * 60 * 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };
  useEffect(() => {
    api()
      .get("/molabilgi?sicil=" + user.sicil)
      .then((response) => setHata(response.data.tur))
      .then((response) => {
        console.log("success:", hata);
        hata == 1 ? setBasla(false) : setBasla(true);
      });
  }, [hata]);

  const malaBasla = () => {
    const data = {
      sicil: user.sicil,
      tur: 1,
    };
    api()
      .post("/mola ", data)

      .then((response) => setHata(response.data.hataMesaji))
      .then((response) => {
        console.log("success:", hata);
      });
     .catch((error) => {
        console.log("errorserhat:", error.response.data.errors);
      });
  };
  const malaBitir = () => {
    const data = {
      sicil: user.sicil,
      tur: 2,
    };
    api()
      .post("/mola ", data)

      .then((response) => setHata(response.data.hataMesaji))
      .then((response) => {
        console.log("success:", hata);
      });
     .catch((error) => {
        console.log("errorserhat:", error.response.data.errors);
      });
  };

  useEffect(() => {
    dispatch(setSaat({ saat2: timer }));
  }, [timer]);

  const clearTimer = (e) => {
    setTimer("00:00:01");

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 1);
    return deadline;
  };

  const onClickReset = () => {
    clearTimer(getDeadTime());

    setBasla(true);
    malaBasla();
  };
  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };
  const stopTimer = () => {
    setTimer(timer);
    malaBitir();
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(timer);
    }, 1000);
    Ref.current = id;

    setBasla(false);
  };
  return (
    <Grid container spacing={5} sx={{ mt: 5 }}>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="success"
          sx={{ height: 75 }}
          fullWidth
          onClick={onClickReset}
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
          onClick={stopTimer}
          disabled={basla === false ? false : true}
        >
          Molayı Bitir
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography xs={12} color="green" fontSize={24} textAlign="center">
          {timer}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default CheckPage;

*/
