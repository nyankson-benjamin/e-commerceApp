import React, { useEffect, useState } from "react";
import useUsers from "./useUsers";
export default function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users] = useUsers();
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
    // if (user) {
    // return;
    const userIsLoggedin = checkCredential(email, password);
    if (!userIsLoggedin) {
      alert("Invalid credentials supplied");
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
      console.log(user);
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

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     setIsLoggedIn(true);
  //   }
  // });

  const logOut = () => {
    setIsLoggedIn(false);
  };
  return [
    handleSubmit,
    email,
    password,
    disable,
    handleEmail,
    handlePassword,
    isLoggedIn,
    checkCredential,
    logOut,
  ];
}
