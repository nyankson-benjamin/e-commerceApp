import React, { useEffect, useState } from "react";
import AppsBar from "../TopBar/AppBar";
import useFragrances from "../Hooks/Product_Categories/useFragrance";
import ProductCard from "../Products/ProductCard";
import { Grid, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductSkeleton from "../components/ProductSkeleton";
import useFetchProducts from "../FetchingHooks/useFetchProducts";
import { DUMMy_API } from "../Services/api";
export default function Fragrances() {
  const [fragrances, loading] = useFragrances();
  const [data, isLoading] = useFetchProducts();
  const [categoryData, setCategoryData] = useState();
  const { category } = useParams();
  const product = data?.find((product) => product.category === category);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await DUMMy_API.get(
          `products/category/${product.category}`
        );

        setCategoryData(response?.data?.products);
      } catch (error) {}
    };
    fetch();
  });
  return (
    <div>
      <AppsBar ItemCategory="Fragrances" />
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
            {fragrances?.map((fragrances) => (
              <Grid item key={fragrances.id} xs={12} lg={3}>
                <ProductCard product={fragrances} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </div>
  );
}
