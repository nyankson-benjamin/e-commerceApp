import React, { useEffect, useState } from "react";
import useUsers from "./useUsers";
import { useNavigate } from "react-router-dom";
export default function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();
  const [users] = useUsers();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  //   useEffect(() => {
  //     if (password === "" || email === "") {
  //       setDisable(true);
  //     } else setDisable(false);
  //   }, [password, email]);
  const user = users?.find((user) => user.email === email);

  const handleSubmit = () => {
    const userIsLoggedin = checkCredential(email, password);
    if (user && user.isVerified === false) {
      navigate("/confirm");
    } else if (!userIsLoggedin) {
      setAlert({
        open: true,
        message: "Invalid credentials supplied",
        severity: "error",
      });
    } else {
      console.log(user);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("id", user.id);
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
    return email === user.email && password === user.password;
  };

  const handleLogOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("id");
    navigate("/login");
  };

  const handleCloseAlert = () => {};
  return [
    handleSubmit,
    email,
    password,
    disable,
    handleEmail,
    handlePassword,
    checkCredential,
    handleLogOut,
    alert,
  ];
}
