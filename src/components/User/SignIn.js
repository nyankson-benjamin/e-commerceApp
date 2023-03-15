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
function SignIn() {
  const [
    handleSubmit,
    email,
    password,
    disable,
    handleEmail,
    handlePassword,
    alert,
    handleCloseAlert,
  ] = useLogin();
  return (
    <FormControl sx={{ width: "70%", mt: "100px" }}>
      {/* <Alerts alert={alert} /> */}
      <h3>Log in to your account</h3>
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
        value={email}
        onChange={handleEmail}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),

          inputProps: {},
        }}
      />

      <FormLabel
        sx={{ textAlign: "left", mt: 2, mb: 1, fontWeight: "bold" }}
        htmlFor="password"
      >
        Password
      </FormLabel>

      <TextField
        fullWidth
        type="password"
        id="password"
        value={password}
        onChange={handlePassword}
        placeholder="Password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOpenIcon />
            </InputAdornment>
          ),

          inputProps: {},
        }}
      />
      <br />
      <LoginButton disable={disable} handleSubmit={handleSubmit} />

      <p>
        Dont have and account? Signup<Link to="/signup"> here</Link>
      </p>
      <p>
        Forgot password? Reset<Link to="/reset"> here</Link>
      </p>
    </FormControl>
  );
}

export default SignIn;
