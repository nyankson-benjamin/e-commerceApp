import React from "react";
import AppsBar from "../TopBar/AppBar";
import useLaptops from "../Hooks/Product_Categories/useLaptops";
import ProductCard from "../Products/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";

import { Grid } from "@mui/material";
import { Box } from "@mui/system";
function Laptops() {
  const [laptops, loading] = useLaptops();
  return (
    <div>
      <AppsBar ItemCategory="Laptops" />

      {loading ? (
        <ProductSkeleton />
      ) : (
        <Box
          sx={{
            margin: "50px",
            // width: "50%",
            overFlow: "scroll",
            // height: "200px",
            mt: "20px",
          }}
        >
          <Grid spacing={2} container>
            {laptops?.map((laptop) => (
              <Grid item key={laptop.id} xs={12} lg={3}>
                <ProductCard product={laptop} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </div>
  );
}

export default Laptops;
