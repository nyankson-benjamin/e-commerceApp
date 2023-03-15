import React from "react";
import {
  TextField,
  FormControl,
  Box,
  FormLabel,
  InputAdornment,
  Button,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "react-router-dom";
import LoginButton from "../../CardSlider/Buttons/LoginButton";
import useLogin from "../../Hooks/useLogin";
import Alerts from "../Alert/Alerts";
import BackButton from "../../CardSlider/Buttons/BackButton";
export default function ResetPassword() {
  return (
    <FormControl sx={{ width: "70%", mt: "100px" }}>
      {/* <Alerts alert={alert} /> */}
      <h3>Forgot Password?</h3>
      <p>You will receive a reset link in the email you provide below</p>
      <FormLabel
        sx={{ textAlign: "left", mt: 2, mb: 1, fontWeight: "bold" }}
        htmlFor="email"
      >
        Email
      </FormLabel>

      <TextField
        fullWidth
        id="email"
        type="email"
        placeholder="Email"
        // value={email}
        // onChange={handleEmail}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),

          inputProps: {},
        }}
      />

      <br />
      {/* <LoginButton /> */}
      <BackButton />
    </FormControl>
  );
}
