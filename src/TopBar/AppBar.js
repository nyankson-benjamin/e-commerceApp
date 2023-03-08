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
export default function AppsBar({ ItemCategory }) {
  const [screenWidth] = useScreenWidth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  useEffect(() => {
    console.log(screenWidth);
  }, []);

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
            <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
              <TextField sx={{ width: "300px", mr: 20 }} />
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
          ) : (
            screenWidth <= 498 && (
              <Stack
                direction="row"
                spacing={3} // sx={{
              >
                <Box
                  sx={{ flexGrow: 0, alignItems: "center", display: "flex" }}
                >
                  <IconButton color="inherit">
                    <Search />
                  </IconButton>

                  <CartLength />
                  <Tooltip title="Open settings">
                    <Button
                      onClick={(event) => setCategory(event.currentTarget)}
                      sx={{ p: 0, ml: 3 }}
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
                      <MenuItem
                        key={category}
                        onClick={() => navigate(`/categories/${category}`)}
                      >
                        <Typography textAlign="center">{category}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <IconButton
                  color="inherit"
                  onClick={handleOpenNavMenu}
                  sx={{ p: 0 }}
                >
                  <MenuIcon />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {page.map((page) => (
                    <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => navigate(`/${page.route}`)}
                      >
                        {page.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Stack>
            )
          )}
        </Toolbar>
      </AppBar>
    </Stack>
  );
}
