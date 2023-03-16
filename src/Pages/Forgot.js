import React from "react";
import ForgetPassword from "../components/User/ForgetPassword";
import { AppBar, Box } from "@mui/material";
import ForgotImg from "../Assets/user/ForgotImg.jpg";
import Footer from "../components/Footer";
import useScreenWidth from "../Hooks/useScreenWidth";
import AppsBar from "../TopBar/AppBar";
export default function Forgot() {
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
          <Box sx={{ width: "50%",  }}>
            <ForgetPassword />
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
          {/* <Box sx={{ width: "100%" }}>
            <img src={ForgotImg} alt="" style={{ width: "100%" }} />
          </Box> */}
          <Box sx={{ width: "100%" }}>
            <ForgetPassword />
          </Box>
        </Box>
      )}
    </div>
  );
}
