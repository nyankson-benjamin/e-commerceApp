import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useState } from "react";

import useScreenWidth from "../Hooks/useScreenWidth";
import { useNavigate } from "react-router-dom";

import useUsers from "../Hooks/useUsers";
import useLogin from "../Hooks/useLogin";
import Desktop from "./Devices/Desktop";
import Mobile from "./Devices/Mobile";
export default function AppsBar({ ItemCategory, search, handleChange }) {
  const [screenWidth] = useScreenWidth();

  const [users] = useUsers();
  const [
    handleSubmit,
    email,
    password,
    disable,
    handleEmail,
    handlePassword,
    checkCredential,
    handleLogOut,
  ] = useLogin();
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));
  const id = localStorage.getItem("id");

  const user = users?.find((user) => user.id === Number(id));

  return (
    <Stack>
      <AppBar
        position="static"
        sx={{
          background: "#ffc801",
          width: "100%",
          color: "black",
          textTransform: "capitalize",
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              size="large"
              edge="start"
              aria-label="logo"
              onClick={() => navigate("/")}
            >
              <LocalMallIcon />
            </IconButton>
            {/* {screenWidth > 498 && (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Shop
              </Typography>
            )} */}
          </Box>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* MILES */}
          </Typography>

          {screenWidth > 600 ? (
            <>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Shop
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {/* MILES */}
              </Typography>

              <Desktop
                search={search}
                handleChange={handleChange}
                handleLogOut={handleLogOut}
                ItemCategory={ItemCategory}
              />
            </>
          ) : (
            <Mobile handleLogOut={handleLogOut} />
          )}
        </Toolbar>
      </AppBar>
    </Stack>
  );
}
