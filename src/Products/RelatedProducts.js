import React from "react";
import ProductSkeleton from "../components/ProductSkeleton";
import {
  CardHeader,
  Card,
  CardContent,
  Typography,
  Stack,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";
function RelatedProducts({ related, loading, product }) {
  return (
    <div className="productCard" style={{ height: "200px" }}>
      {loading ? (
        <ProductSkeleton />
      ) : (
        <Link to={`/productPage/${related.title}`}>
          <Card elevation={1} className="productCard" sx={{ width: "100%" }}>
            <img
              src={related.thumbnail}
              alt=""
              style={{ width: "100%", height: "100px" }}
              className="bigImage"
              title={related.title}
            />
            {related.title.length < 15 ? (
              <CardHeader
                title={related.title}
                subheader={`Brand: ${related.brand}`}
              />
            ) : (
              <CardHeader
                title={related.title.substring(0, 15) + " ..."}
                subheader={`Brand: ${related.brand}`}
              />
            )}

            <CardContent>
              <h6>Category: {related.category}</h6>
              <p>
                {" "}
                $
                {(
                  related.price -
                  (related.discountPercentage / 100) * related.price
                ).toFixed(2)}
              </p>
              <p style={{ letterSpacing: 2 }}>
                <s>${related.price}.00</s>
              </p>
              <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                <Rating
                  name="half-rating"
                  defaultValue={related.rating}
                  precision={0.5}
                />
              </Stack>
            </CardContent>
          </Card>
        </Link>
      )}
    </div>
  );
}

export default RelatedProducts;
