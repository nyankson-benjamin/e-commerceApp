import React from "react";
import AppsBar from "../TopBar/AppBar";
import SignIn from "../components/User/SignIn";
import useScreenWidth from "../Hooks/useScreenWidth";
import signupImg from "../Assets/user/signup.jpg";
import { Box } from "@mui/material";
export default function Login() {
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
            <img src={signupImg} alt="" style={{ width: "100%" }} />
          </Box>
          <Box sx={{ width: "50%" }}>
            <SignIn />
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
            <SignIn />
          </Box>
        </Box>
      )}
    </div>
  );
}
