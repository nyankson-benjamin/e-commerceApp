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
import { useState, useEffect } from "react";
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

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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

  return (
    <Stack>
      <AppBar position="static" sx={{ background: "#003F62", width: "100%" }}>
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
            {screenWidth > 498 && (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Shop
              </Typography>
            )}
          </Box>
          {/* {screenWidth < 498 && ItemCategory.length > 7 ? ( */}
          <Typography
            variant="h6"
            component="div"
            title={ItemCategory}
            sx={{ flexGrow: 1 }}
          >
            {/* {ItemCategory.substring(0, 6) + "..."} */}
          </Typography>
          {/* ) : ( */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {ItemCategory}
          </Typography>
          {/* )} */}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* MILES */}
          </Typography>

          {screenWidth > 498 ? (
            <Desktop
              search={search}
              handleChange={handleChange}
              handleLogOut={handleLogOut}
            />
          ) : (
            screenWidth <= 498 && <Mobile handleLogOut={handleLogOut} />
          )}
        </Toolbar>
      </AppBar>
    </Stack>
  );
}
