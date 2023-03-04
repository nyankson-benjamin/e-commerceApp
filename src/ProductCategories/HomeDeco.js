import React from "react";
import AppsBar from "../TopBar/AppBar";
import useHomeDeco from "../Hooks/Product_Categories/useHomeDeco";
import ProductCard from "../Products/ProductCard";
import { Grid, Box } from "@mui/material";
import ProductSkeleton from "../components/ProductSkeleton";

export default function HomeDeco() {
  const [deco, loading] = useHomeDeco();

  return (
    <div>
      <AppsBar ItemCategory="Home Decorations" />
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
          <Grid container spacing={2}>
            {deco?.map((deco) => (
              <Grid item key={deco.id} xs={12} lg={3}>
                <ProductCard product={deco} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </div>
  );
}
