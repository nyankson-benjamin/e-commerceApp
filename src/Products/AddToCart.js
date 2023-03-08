import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import useScreenWidth from "../Hooks/useScreenWidth";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { baseURL } from "../Constants/urls";
import { API } from "../Services/api";
import { useNavigate } from "react-router-dom";
export default function AddToCart({ product }) {
  const [image, setImage] = useState(product.thumbnail);
  const [screenWidth] = useScreenWidth();
  const [value, setValue] = useState(1);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();

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

  const handleAddToCart = async (e) => {
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

    try {
      const response = await API.post("Cart/", { ...cartItem });
    } catch (error) {}
    console.log(cartItem);
  };
  return (
    <Box>
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
