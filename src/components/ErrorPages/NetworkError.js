import React from "react";
import image from "../../Assets/networError.png";
export default function NetworkError({ message }) {
  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={image} alt="" />

      <h3>{message}</h3>
    </div>
  );
}
