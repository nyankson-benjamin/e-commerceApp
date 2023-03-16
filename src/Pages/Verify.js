import React from "react";
import AppsBar from "../TopBar/AppBar";
import useScreenWidth from "../Hooks/useScreenWidth";
import signupImg from "../Assets/user/signup.jpg";
import confirmImg from "../Assets/user/confirm.jpg";
import { Box } from "@mui/material";
import VerifyEmail from "../components/User/VerifyEmail";
export default function Verify() {
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
            <img src={confirmImg} alt="" style={{ width: "100%" }} />
          </Box>
          <Box sx={{ width: "50%" }}>
            <VerifyEmail />
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
          <Box sx={{ width: "100%" }}><VerifyEmail /></Box>
        </Box>
      )}
    </div>
  );
}
