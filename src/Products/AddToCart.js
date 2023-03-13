import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import useScreenWidth from "../Hooks/useScreenWidth";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { baseURL } from "../Constants/urls";
import { API } from "../Services/api";
import { useNavigate } from "react-router-dom";
import useCart from "../Hooks/useCart";
import Modals from "../components/Cart/Modals";
import Alert from "../components/Alert/Alerts";
export default function AddToCart({ product }) {
  const [image, setImage] = useState(product.thumbnail);
  const [screenWidth] = useScreenWidth();
  const [value, setValue] = useState(1);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  //TODO: refactor the alert system
  const [data] = useCart();
  useEffect(() => {
    if (value < 0) {
      setValue(0);
    } else if (value === 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }

    // }
  }, [value]);

  const cartItem = {
    item: product.title,
    img_link: image,
    quantity: value,
    unitPrice:
      product.price - (product.discountPercentage / 100) * product.price,
    totalPrice:
      (
        product.price -
        (product.discountPercentage / 100) * product.price
      ).toFixed(2) * value,
  };

  const products = data?.find((product) => product.item === cartItem.item);
  const handleAddToCart = async (e) => {
    if (products && products.item === cartItem.item) {
      // alert("product already exist");
      setMessage(`${cartItem.item}  already exits in your cart`);
      setOpenAlert(true);
      setSeverity("error");
      setOpen(true);
    } else {
      try {
        const response = await API.post("Cart/", { ...cartItem });
        setOpenAlert(true);
        setMessage(`${cartItem.item} has been successfully added to your cart`);
        setSeverity("success");
        // setDisable(true);
        setTimeout(() => {
          navigate("/cart");
        }, 6000);
      } catch (error) {}
      console.log(cartItem);
    }
  };

  const handleClose = () => setOpen(false);
  const Update = async (price, value, id) => {
    const quantity = value;
    const totalPrice = price;
    const data = { totalPrice, quantity };
    await API.patch("Cart/" + id, { ...data });
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  return (
    <Box>
      {products && (
        <Modals
          open={open}
          handleClose={handleClose}
          ItemValue={products.quantity}
          ItemPrice={products.totalPrice}
          Update={Update}
          id={products.id}
          item={products.item}
        />
      )}

      <Alert
        openAlert={openAlert}
        message={message}
        severity={severity}
        handleCloseAlert={handleCloseAlert}
      />

      <h2>ADD TO CART</h2>
      {screenWidth < 498 ? (
        <Box>
          {" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={image}
              style={{
                width: "300px",
                height: "300px",
                border: "2px solid black",
                marginTop: "10px",
                marginBottom: "10px",
                padding: "5px",
                borderRadius: "5px",
              }}
            />
            <Box sx={{ display: "flex" }}>
              {product.images.map((img, index) => (
                <img
                  src={img}
                  key={index}
                  onClick={() => setImage(img)}
                  style={{ width: "50px", margin: "10px" }}
                />
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              width: "300px",
              margin: "auto",
              //   marginLeft: "20px",
            }}
          >
            <Typography>{product.title}</Typography>
            <Typography>
              $
              {(
                product.price -
                (product.discountPercentage / 100) * product.price
              ).toFixed(2) * value}
            </Typography>
            <br />
            <Box>
              <IconButton onClick={() => setValue(value - 1)}>
                <RemoveIcon />
              </IconButton>
              <TextField
                InputProps={{
                  inputProps: {
                    style: {
                      textAlign: "center",
                      width: "60px",
                      fontSize: "30px",
                      height: "20px",
                    },
                  },
                }}
                value={value}
                type="number"
                onChange={(e) => setValue(e.target.value)}
              />
              <IconButton onClick={() => setValue(value + 1)}>
                <AddIcon />
              </IconButton>
            </Box>

            <br />
            <Button
              fullWidth
              variant="contained"
              onClick={handleAddToCart}
              disabled={disable}
            >
              Add
            </Button>
            <br />
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("/cart")}
              startIcon={<AddShoppingCartIcon />}
            >
              My cart
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={image}
              style={{
                width: "300px",
                height: "300px",
                border: "2px solid black",
                marginTop: "10px",
                marginBottom: "10px",
                padding: "5px",
                borderRadius: "5px",
              }}
            />
            <Box sx={{ display: "flex" }}>
              {product.images.map((img, index) => (
                <img
                  src={img}
                  key={index}
                  onClick={() => setImage(img)}
                  style={{ width: "50px", margin: "10px", height: "50px" }}
                />
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              width: "300px",
              marginLeft: "20px",
            }}
          >
            <Typography>{product.title}</Typography>
            <Typography>
              $
              {(
                product.price -
                (product.discountPercentage / 100) * product.price
              ).toFixed(2) * value}
            </Typography>
            <br />
            <Box>
              <IconButton onClick={() => setValue(value - 1)}>
                <RemoveIcon />
              </IconButton>
              <TextField
                InputProps={{
                  inputProps: {
                    style: {
                      textAlign: "center",
                      width: "40px",
                      fontSize: "30px",
                      height: "20px",
                    },
                  },
                }}
                value={value}
                type="number"
                onChange={(e) => setValue(e.target.value)}
              />
              <IconButton onClick={() => setValue(value + 1)}>
                <AddIcon />
              </IconButton>
            </Box>

            <br />
            <Button
              fullWidth
              variant="contained"
              onClick={handleAddToCart}
              disabled={disable}
            >
              Add
            </Button>
            <br />
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("/cart")}
              startIcon={<AddShoppingCartIcon />}
            >
              My cart
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
