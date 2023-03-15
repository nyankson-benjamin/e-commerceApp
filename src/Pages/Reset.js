import React from "react";
import ForgetPassword from "../components/User/ForgetPassword";
import ResetPassword from "../components/User/ResetPassword";
import { AppBar, Box } from "@mui/material";
import ForgotImg from "../Assets/user/ForgotImg.jpg";
import Footer from "../components/Footer";
import useScreenWidth from "../Hooks/useScreenWidth";
import AppsBar from "../TopBar/AppBar";
export default function Reset() {
  const [screenWidth] = useScreenWidth();
  return (
    <div>
      <AppsBar />
      {screenWidth > 600 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            m: "auto",
            width: "90%",
          }}
        >
          <Box sx={{ width: "40%" }}>
            <img src={ForgotImg} alt="" style={{ width: "100%" }} />
          </Box>
          <Box sx={{ width: "50%" }}>
            <ResetPassword />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            m: "auto",
            width: "90%",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <ResetPassword />
          </Box>
        </Box>
      )}
    </div>
  );
}
