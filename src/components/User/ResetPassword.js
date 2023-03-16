import React, { useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNavigate } from "react-router-dom";
import useUsers from "../../Hooks/useUsers";
import Alerts from "../Alert/Alerts";
import BackButton from "../Buttons/BackButton";
import ResetButton from "../Buttons/ResetButton";
import { API } from "../../Services/api";
export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(true);
  const [alerts, setAlerts] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [users] = useUsers();
  const user = users?.find((user) => user.email === email);

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPass = (event) => {
    setConfirmPass(event.target.value);
  };

  useEffect(() => {
    if (password === "" || confirmPass === "" || password.length < 6) {
      setDisable(true);
    } else if (password !== confirmPass) {
      setError("Password does not match");
    } else {
      setError("");
      setDisable(false);
    }
  }, [password, confirmPass]);

  const handleForgot = async () => {
    if (user && user.email === email) {
      const data = { password: password, confirmPass: confirmPass };
      await API.patch("Users/" + user.id, { ...data });
      setAlerts({
        open: true,
        message: "Password reset successfully",
        severity: "success",
      });
      localStorage.removeItem("email");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      setAlerts({
        open: true,
        message: "Email not found. Request for a change of password first",
        severity: "error",
      });
      setTimeout(() => {
        navigate("/forgot");
      }, 3000);
    }
  };

  const handleCloseAlert = () => {
    setAlerts({
      open: false,
    });
  };
  return (
    <FormControl
      sx={{
        width: "100%",
        // mt: "100px",
      }}
    >
      <Alerts alert={alerts} handleCloseAlert={handleCloseAlert} />
      <h3>Reset Password?</h3>
      <p></p>
      <p>{error}</p>
      <FormLabel
        sx={{ textAlign: "left", mt: 2, mb: 1, fontWeight: "bold" }}
        htmlFor="email"
      >
        {/* Email */}
      </FormLabel>

      <TextField
        fullWidth
        id="email"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={handlePassword}
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

      <TextField
        fullWidth
        id="email"
        type="password"
        placeholder="Confirm New Password"
        value={confirmPass}
        onChange={handleConfirmPass}
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
      <ResetButton handleForgot={handleForgot} disable={disable} />
      <BackButton />
    </FormControl>
  );
}
