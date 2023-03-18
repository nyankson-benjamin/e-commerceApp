import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
  Box,
  TextField,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useState, useEffect, useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import useScreenWidth from "../Hooks/useScreenWidth";
import { page, categories } from "../Constants/constants";
import { Link, useNavigate } from "react-router-dom";
import { navLinkStyle } from "../styles/Styles";
import CartLength from "../components/Cart/CartLength";
import { Search } from "@mui/icons-material";
import Searchitem from "../components/Searchitem";
import PersonIcon from "@mui/icons-material/Person";
import { API } from "../Services/api";
import useUsers from "../Hooks/useUsers";
import useLogin from "../Hooks/useLogin";
import Desktop from "./Devices/Desktop";
import Mobile from "./Devices/Mobile";
export default function AppsBar({ ItemCategory, search, handleChange }) {
  const [screenWidth] = useScreenWidth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [category, setCategory] = useState(null);
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
  // useEffect(() => {
  //   console.log(isLoggedIn);
  //   console.log(typeof isLoggedIn);
  //   console.log(id);
  //   // console.log(typeof id);

  //   console.log(user);
  // }, [isLoggedIn, user]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
  //   }, 1000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${seconds.toString().padStart(2)}`;
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await API.get("/Cart");
      setLoading(false);
      console.log(res);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (loading === true) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    } else {
      setTimeout(() => {
        clearInterval(intervalRef.current);
      }, 3000);
    }
  });

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
              <p>{formatTime(elapsedTime)}</p>
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
