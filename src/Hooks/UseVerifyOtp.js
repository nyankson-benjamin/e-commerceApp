import { useState, useRef } from "react";
import useUsers from "./useUsers";
export default function useVerifyOtp() {
  const [otp, setOTP] = useState("");
  const otpInputRef = useRef();
  const [disable, setDisable] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users] = useUsers();
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
  const handleSubmit = async (event) => {
  
    if (user) {
        console.log(user);
      if (otp === user.otp) {
        alert("verification successfull");
      } else {
        alert("invalid verification code");
      }
    }
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
  ];
}
