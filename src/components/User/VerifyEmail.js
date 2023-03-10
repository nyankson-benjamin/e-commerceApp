import React from "react";
import useVerifyOtp from "../../Hooks/UseVerifyOtp";
import OtpInput from "react-otp-input";
import VerifyEmailButton from "../../CardSlider/Buttons/VerifyEmailButton";
import BackButton from "../../CardSlider/Buttons/BackButton";
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
  ] = useVerifyOtp();
  return (
    <div className="otp">
      {" "}
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
