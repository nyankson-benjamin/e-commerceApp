import { useEffect, useState } from "react";
import { API } from "../Services/api";
import { useNavigate } from "react-router-dom";

export default function useRegister() {
  const [fname, setFName] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmpass] = useState("");
  const [disable, setDisable] = useState(false);
  const [country, setCountry] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const navigate = useNavigate();
  var minm = 1000;
  var maxm = 9999;
  const otp = (Math.floor(Math.random() * (maxm - minm + 1)) + minm).toString();
  const reg = /^\S+@\S+\.\S+$/;
  const handleCountry = (event) => {
    setCountry(event.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("userDetails")) {
      navigate("/");
    }
  });
  const data = {
    fname,
    lname,
    email,
    contact,
    password,
    confirmPass,
    otp,
    country,
    isVerified: false,
    role: "user",
    isAdmin: false,
  };

  const handleSubmit = async () => {
    try {
      setDisable(true);
      await API.post("/user/register", { ...data });
      setDisable(false);
      setAlert({
        open: true,
        message: `A verification code has been sent to your email`,
        severity: "success",
      });
      localStorage.setItem("code", otp);
      setTimeout(() => {
        navigate("/confirm");
      }, 5000);
    } catch (error) {
      if (error?.message === "Request failed with status code 409") {
        setAlert({
          open: true,
          message: "Email already exists",
          severity: "error",
        });
      } else {
        setAlert({
          open: true,
          message: error?.message,
          severity: "error",
        });
      }

      setDisable(false);
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
      data.confirmPass === "" ||
      data.country === ""
    ) {
      setDisable(true);
    } else if (!data.email.match(reg)) {
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
    data.country,
  ]);

  const handleCloseAlert = () => {
    setAlert({
      open: false,
      message: "",
      severity: "",
    });
  };

  return [
    handleSubmit,
    handleChange,
    disable,
    country,
    handleCountry,
    alert,
    handleCloseAlert,
  ];
}
