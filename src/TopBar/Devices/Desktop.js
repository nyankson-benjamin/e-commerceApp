import React from "react";
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

import { page, categories } from "../../Constants/constants";
import { Link, useNavigate } from "react-router-dom";

import { navLinkStyle } from "../../styles/Styles";

import CartLength from "../../components/Cart/CartLength";
import useUsers from "../../Hooks/useUsers";
import Searchitem from "../../components/Searchitem";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

function Desktop({ search, handleChange, handleLogOut }) {
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();
  const [users] = useUsers();

  const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));
  const id = localStorage.getItem("id");

  const user = users?.find((user) => user.id === Number(id));
  return (
    <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
      {/* <TextField
    sx={{ width: "300px", mr: 20, color: "white" }}
    placeholder="Search"
  /> */}
      <Searchitem search={search} handleChange={handleChange} />
      <CartLength />
      {page.map((page) => (
        <Button
          sx={navLinkStyle}
          color="inherit"
          onClick={() => navigate(`/${page.route}`)}
          key={page.id}
        >
          {page.name}
        </Button>
      ))}

      {isLoggedIn ? (
        <IconButton onClick={handleLogOut} color="inherit" title="logout">
          <LogoutIcon />
        </IconButton>
      ) : (
        <IconButton onClick={() => navigate("/login")} color="inherit">
          <PersonIcon />
        </IconButton>
      )}

      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Categories">
          <Button
            onClick={(event) => setCategory(event.currentTarget)}
            sx={{ p: 0 }}
            color="inherit"
            endIcon={<KeyboardArrowDownIcon />}
          >
            Categories
          </Button>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={category}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(category)}
          onClose={() => setCategory(null)}
        >
          {categories.map((category) => (
            <Link to={`/categories/${category}`} key={category}>
              <MenuItem>
                <Typography textAlign="center">{category}</Typography>
              </MenuItem>
            </Link>
          ))}
        </Menu>
      </Box>
    </Stack>
  );
}

export default Desktop;
