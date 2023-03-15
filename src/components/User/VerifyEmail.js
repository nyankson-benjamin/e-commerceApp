import React from "react";
import useVerifyOtp from "../../Hooks/UseVerifyOtp";
import OtpInput from "react-otp-input";
import VerifyEmailButton from "../Buttons/VerifyEmailButton";
import BackButton from "../Buttons/BackButton";
import Alerts from "../Alert/Alerts";
export default function VerifyEmail() {
  const [
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
  ] = useVerifyOtp();
  return (
    <div className="otp">
      {" "}
      <Alerts alert={alerts} handleCloseAlert={handleCloseAlert} />
      <h3>Verify your Email</h3>
      <OtpInput
        ref={otpInputRef}
        value={otp}
        onChange={handleOTPChange}
        numInputs={4}
        isInputNum
        isInputRequired
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        separator={
          <span
            style={{
              fontWeight: "bolder",
              fontSize: "20px",
              margin: "5px",
              color: "#1F4EB4",
              textAlign: "center",
            }}
          >
            -
          </span>
        }
        placeholder={["0", "0", "0", "0"]}
        hasErrored={hasErrored}
        errorStyle={{ border: "2px solid red" }}
        focusStyle={{ border: "2px solid #1F4EB4", outline: "none" }}
      />
      <br />
      <VerifyEmailButton handleSubmit={handleSubmit} />
      <BackButton />
    </div>
  );
}
