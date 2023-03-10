import React, { useEffect, useState } from "react";
import { API } from "../Services/api";
import useUsers from "./useUsers";
import { useNavigate } from "react-router-dom";
export default function useRegister() {
  const [fname, setFName] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [hashPassword, setHashPassword] = useState("");
  const [confirmPass, setConfirmpass] = useState("");
  const [disable, setDisable] = useState(false);
  const [users] = useUsers();
  const navigate = useNavigate();
  const user = users?.find((user) => user.email === email);
  var minm = 1000;
  var maxm = 9999;
  const otp = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  const data = { fname, lname, email, contact, password, confirmPass, otp };

  const handleSubmit = async () => {
    if (user && user.email === email) {
      alert("Email already exist");
    } else {
      try {
        setDisable(true);
        const response = await API.post("/Users", { ...data });
        setDisable(false);
        console.log(response);
        alert(`Your verication code is: ${otp}`);
        setTimeout(() => {
          navigate('/confirm')
        }, 2000);
      } catch (error) {}
    }
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "fname":
        setFName(event.target.value);
        break;
      case "lname":
        setLname(event.target.value);
        break;

      case "email":
        setEmail(event.target.value);
        break;

      case "contact":
        setContact(event.target.value);
        break;

      case "password":
        setPassword(event.target.value);
        break;
      case "confirmPassword":
        setConfirmpass(event.target.value);
        break;
    }
  };

  useEffect(() => {
    if (
      data.fname === "" ||
      data.lname === "" ||
      data.email === "" ||
      data.contact === "" ||
      data.password === "" ||
      data.confirmPass === ""
    ) {
      setDisable(true);
    } else if (data.password !== data.confirmPass) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [
    data.fname,
    data.lname,
    data.email,
    data.contact,
    data.password,
    data.confirmPass,
  ]);

  return [handleSubmit, handleChange, disable];
}
