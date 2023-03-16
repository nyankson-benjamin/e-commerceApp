import React, { useEffect, useState } from "react";
import useUsers from "./useUsers";
import { useNavigate } from "react-router-dom";
export default function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  const [users] = useUsers();
  const [alerts, setAlerts] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const reg = /^\S+@\S+\.\S+$/;

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    if (!email.match(reg) || password === "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [email, reg, password]);
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const user = users?.find((user) => user.email === email);

  const handleSubmit = () => {
    const userIsLoggedin = checkCredential(email, password);

    if (user && user.email !== email) {
      setAlerts({
        open: true,
        message: "Email not found",
        severity: "error",
      });
    } else if (user && user.isVerified === false) {
      setAlerts({
        open: true,
        message: "Please confirm your email first",
        severity: "info",
      });
      setTimeout(() => {
        navigate("/confirm");
      }, 3000);
    } else if (!userIsLoggedin) {
      setAlerts({
        open: true,
        message: "Invalid credentials supplied",
        severity: "error",
      });
    } else {
      console.log(user);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("id", user.id);
      setAlerts({
        open: true,
        message: "Login success. Redirecting to homepage",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/products");
      }, 2000);
    }
    // }
    // } else {
    //   alert("Invalid credentials supplied");
    //   setIsLoggedIn(false);
    // }
  };

  const checkCredential = (email, password) => {
    if (user) {
      return email === user.email && password === user.password;
    } else {
      setAlerts({
        open: true,
        message: "Login success. Redirecting to homepage",
        severity: "error",
      });
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("id");
    navigate("/login");
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    // setOpenAlert(false);
    setAlerts({
      open: false,
      message: "",
      severity: "",
    });
  };
  return [
    handleSubmit,
    email,
    password,
    disable,
    handleEmail,
    handlePassword,
    checkCredential,
    handleLogOut,
    alerts,
    handleCloseAlert,
  ];
}
