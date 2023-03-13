import { useState, useRef, useEffect } from "react";
import useUsers from "./useUsers";
import { useNavigate } from "react-router-dom";
import { API } from "../Services/api";
export default function useVerifyOtp() {
  const [otp, setOTP] = useState("");
  const otpInputRef = useRef();
  const [disable, setDisable] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users] = useUsers();
  const [code, setCode] = useState();

  const [alerts, setAlerts] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();
  function handleOTPChange(value) {
    if (isNaN(value)) {
      setDisable(true);
      setHasErrored(true);
    } else if (value.length >= 4) {
      setDisable(false);
      setHasErrored(false);
    } else if (value.length === 0) {
      setHasErrored(false);
    } else {
      setDisable(true);
    }

    setOTP(value);
  }

  function handleKeyDown(event) {
    if (event.keyCode === 8) {
      // Backspace key
      event.preventDefault();
      const otpInput = otpInputRef.current.getInputInstance();
      const inputValue = otpInput.value;
      const cursorPosition = otpInput.selectionStart;
      const newValue =
        inputValue.slice(0, cursorPosition - 1) +
        inputValue.slice(cursorPosition);
    }
  }

  function handlePaste(event) {
    event.preventDefault();
    const otpInput = otpInputRef.current.getInputInstance();
    const inputValue = otpInput.value;
    const cursorPosition = otpInput.selectionStart;
    const clipboardData = event.clipboardData.getData("Text");
    const newValue =
      inputValue.slice(0, cursorPosition) +
      clipboardData +
      inputValue.slice(cursorPosition);
    setOTP(newValue);
  }
  const user = users?.find((user) => user.otp === otp);

  useEffect(() => {
    if (user) {
      setCode(user.otp);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    if (user) {
      // console.log(user);
      if (otp === code) {
        // alert("verification successfull");
        setAlerts({
          open: true,
          message: "verification successfull",
          severity: "success",
        });
        const data = { isVerified: true, otp: "" };
        await API.patch("Users/" + user.id, { ...data });
        setCode();
        setTimeout(() => {
          navigate("/login");
        }, 6000);
      } else if (code.length !== 4) {
        setAlerts({
          open: true,
          message: "Invalid verification code. PLease login first",
          severity: "error",
        });

        setTimeout(() => {
          navigate("/signup");
        }, 3000);
      }
    }
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
    handleOTPChange,
    handleKeyDown,
    handlePaste,
    handleSubmit,
    disable,
    otp,
    otpInputRef,
    hasErrored,
    isLoading,
    alerts,
    handleCloseAlert,
  ];
}
