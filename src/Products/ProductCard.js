import React, { useEffect } from "react";
import {
  CardHeader,
  Card,
  CardContent,
  Typography,
  Stack,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";
import ProductSkeleton from "../components/ProductSkeleton";
import Paginate from "../components/Paginate";

function ProductCard({ product, isLoading }) {
  return (
    <div className="productCard">
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <Link to={`/productPage/${product.title}`}>
          <Card elevation={1} className="productCard" sx={{ width: "300px" }}>
            <img
              src={product.thumbnail}
              alt=""
              style={{ width: "100%", height: "100px" }}
              className="bigImage"
              title={product.title}
            />
            {product.title.length < 15 ? (
              <CardHeader
                title={product.title}
                subheader={`Brand: ${product.brand}`}
              />
            ) : (
              <CardHeader
                title={product.title.substring(0, 15) + " ..."}
                subheader={`Brand: ${product.brand}`}
              />
            )}

            <CardContent>
              <h6>Category: {product.category}</h6>
              <p>
                {" "}
                $
                {(
                  product.price -
                  (product.discountPercentage / 100) * product.price
                ).toFixed(2)}
              </p>
              <p style={{ letterSpacing: 2 }}>
                <s>${product.price}.00</s>
              </p>
              <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                <Rating
                  name="half-rating"
                  defaultValue={product.rating}
                  precision={0.5}
                />
              </Stack>
            </CardContent>
          </Card>
        </Link>
      )}
      {/* <Paginate data={product} /> */}
    </div>
  );
}

export default ProductCard;
