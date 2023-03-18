import React, { useState } from "react";
import { Box, Button, Typography, Stack, Rating } from "@mui/material";
import useScreenWidth from "../Hooks/useScreenWidth";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Footer from "../components/Footer";
function ProductDetail({ product }) {
  const [screenWidth] = useScreenWidth();
  const [image, setImage] = useState(product.thumbnail);

  const navigate = useNavigate();
  return (
    <Box>
      {screenWidth < 600 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            justifyContent: "center",
            width: "100%",

            height: "100vh",
          }}
        >
          <Box sx={{ width: "450px", border: "2px soli black" }}>
            <img
              src={product.thumbnail}
              alt=""
              style={{ width: "300px", height: "200px", margin: "5px" }}
            />
            <br />

            {product.images?.map((image) => (
              <img
                src={image}
                key={image}
                style={{ width: "50px", height: "50px", margin: "5px" }}
              />
            ))}
          </Box>

          <Box sx={{ width: "300px", textAlign: "left", margin: "auto" }}>
            <Box
              sx={{
                background: "#003F62",
                color: "white",
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5">
                {product.title.substring(0, 10) + "..."}
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "yellow", fontWeight: "bold" }}
              >
                - {product.discountPercentage} %
              </Typography>
            </Box>

            <Typography variant="h5">{product.description}</Typography>
            <Typography variant="h5">
              <s>${product.price}</s>
            </Typography>
            <Typography variant="h5">
              {" "}
              $
              {(
                product.price -
                (product.discountPercentage / 100) * product.price
              ).toFixed(2)}
            </Typography>
            <Stack sx={{ justifyContent: "center", alignItems: "left" }}>
              <Rating
                name="half-rating"
                defaultValue={product.rating}
                precision={0.5}
              />
            </Stack>
            <br />
            <Button
              variant="contained"
              onClick={() => navigate(`/BuyProduct/${product.title}`)}
              startIcon={<AddShoppingCartIcon />}
              fullWidth
              sx={{ background: "#003F62" }}
            >
              ADD TO CART
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            // alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box sx={{ width: "450px", border: "2px soli black" }}>
            <img
              src={product.thumbnail}
              alt=""
              style={{ width: "300px", height: "200px", margin: "5px" }}
            />
            <br />

            {product.images?.map((image) => (
              <img
                src={image}
                key={image}
                style={{ width: "50px", height: "50px", margin: "5px" }}
              />
            ))}
          </Box>

          <Box sx={{ width: "500px", textAlign: "left" }}>
            <Box
              sx={{
                background: "#003F62",
                color: "white",
                padding: "10px",

                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5">{product.title}</Typography>
              <Typography
                variant="h5"
                sx={{ color: "yellow", fontWeight: "bold" }}
              >
                - {product.discountPercentage} %
              </Typography>
            </Box>
            <Typography variant="h5">{product.description}</Typography>
            <Typography variant="h5">
              <s>${product.price}</s>
            </Typography>
            <Typography variant="h5">
              {" "}
              $
              {(
                product.price -
                (product.discountPercentage / 100) * product.price
              ).toFixed(2)}
            </Typography>
            <Stack sx={{ justifyContent: "center", alignItems: "left" }}>
              <Rating
                name="half-rating"
                defaultValue={product.rating}
                precision={0.5}
              />
            </Stack>
            <br />
            <Button
              variant="contained"
              onClick={() => navigate(`/BuyProduct/${product.title}`)}
              startIcon={<AddShoppingCartIcon />}
              fullWidth
              sx={{ background: "#003F62" }}
            >
              ADD TO CART
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ProductDetail;
