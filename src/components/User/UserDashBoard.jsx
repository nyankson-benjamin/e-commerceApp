import { Avatar, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import useUsers from "../../Hooks/useUsers";
import UserTopBar from "../../TopBar/UserTopBar";
import AppsBar from "../../TopBar/AppBar";
import { Link, useNavigate } from "react-router-dom";
function UserDashBoard() {
  const [users] = useUsers();
  const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));
  const id = localStorage.getItem("id");
  const user = users?.find((user) => user.id === Number(id));
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);
  return (
    <Box>
      <AppsBar />
      <Box>
        {isLoggedIn && user ? (
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar>{user.fname[0]}</Avatar>
            <p>{user.fname}</p>
            <p>{user.lname}</p>
            <p>{user.contact}</p>
            <p>{user.fname}</p>
            <p>{user.country}</p>
          </Box>
        ) : (
          <Link to="/login">Login here</Link>
        )}
      </Box>
    </Box>
  );
}

export default UserDashBoard;
