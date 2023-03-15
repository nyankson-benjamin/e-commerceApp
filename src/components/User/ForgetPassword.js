import React, { useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import ForgotButton from "../Buttons/ForgotButton";
import useUsers from "../../Hooks/useUsers";
import Alerts from "../Alert/Alerts";
import BackButton from "../Buttons/BackButton";
export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(true);
  const [alerts, setAlerts] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();
  const [users] = useUsers();
  const user = users?.find((user) => user.email === email);
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    if (email === "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [email]);

  const handleForgot = () => {
    if (user && user.email === email) {
      setAlerts({
        open: true,
        message: "Request have been made successfully",
        severity: "success",
      });
      localStorage.setItem("email", email);

      setTimeout(() => {
        navigate("/reset");
      }, 3000);
    } else {
      setAlerts({
        open: true,
        message: "Email not found",
        severity: "error",
      });
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
        width: "70%",
        // mt: "100px",
      }}
    >
      <Alerts alert={alerts} handleCloseAlert={handleCloseAlert} />
      <h3>Forgot Password?</h3>
      <p>You will receive a reset link in the email you provide below</p>
      <FormLabel
        sx={{ textAlign: "left", mt: 2, mb: 1, fontWeight: "bold" }}
        htmlFor="email"
      >
        {/* Email */}
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

      <br />
      <ForgotButton handleForgot={handleForgot} disable={disable} />
      <BackButton />
    </FormControl>
  );
}
