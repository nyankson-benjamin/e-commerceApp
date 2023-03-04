import React from "react";
import AppsBar from "../TopBar/AppBar";
import useFetchProducts from "../FetchingHooks/useFetchProducts";
import { Box, Grid, Stack } from "@mui/material";
import LeftBar from "../Sidebars/LeftBar";
import RightBar from "../Sidebars/RightBar";
import useScreenWidth from "../Hooks/useScreenWidth";
import ProductCard from "../Products/ProductCard";
import ProductSlider from "../components/Slider/ProductSlider";
import Footer from "../components/Footer";
export default function Products() {
  const [data, isLoading] = useFetchProducts();
  const [screenWidth] = useScreenWidth();
  return (
    <div style={{ overflow: "scroll", height: "100%" }}>
      <AppsBar />
      <br />
      <ProductSlider data={data} isLoading={isLoading} />
      <br />
      <br />
      <h3 style={{ textAlign: "center" }}>ALL PRODUCTS</h3>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* {screenWidth > 500 && <LeftBar />} */}
        <Box
          sx={{
            margin: "50px",
            // width: "50%",
            overFlow: "scroll",
            // height: "200px",
            mt: "20px",
          }}
        >
          <Grid container spacing={3}>
            {data?.map((product) => (
              <Grid key={product.id} item xs={12} md={12} lg={3}>
                <ProductCard product={product} isLoading={isLoading} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
      <Footer />
    </div>
  );
}
