import React from "react";
import AppsBar from "../TopBar/AppBar";
import usePhones from "../Hooks/Product_Categories/usePhones";
import ProductCard from "../Products/ProductCard";
import { Grid, Box } from "@mui/material";
import ProductSkeleton from "../components/ProductSkeleton";
export default function Phones() {
  const [phones, loading] = usePhones();

  return (
    <div>
      <AppsBar ItemCategory="Phones" />
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
            {phones?.map((phones) => (
              <Grid item key={phones.id} xs={12} lg={3}>
                <ProductCard product={phones} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </div>
  );
}
