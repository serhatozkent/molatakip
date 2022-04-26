import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "store/slices/account";

const AccoutPage = () => {
  const user = useSelector((state) => state.account.user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setUser(null));
  };

  return (
    <Grid container spacing={4} sx={{ mt: 2 }}>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="İsim" disabled value={user.name.ad} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Soyadı" disabled value={user.name.soyad} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Sicil" disabled value={user.sicil} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Telefon" disabled value={user.telefon} />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" fullWidth onClick={logout}>
          Çıkış Yap
        </Button>
      </Grid>
    </Grid>
  );
};
export default AccoutPage;
