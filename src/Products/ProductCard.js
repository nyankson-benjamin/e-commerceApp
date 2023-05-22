import React, { useEffect } from "react";
import 
  Box
 from "@mui/material/Box";
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
          {/* <Card elevation={1} className="productCard" sx={{ width: "300px" }} title={product.title}>
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
          </Card> */}
          <Box
            sx={{
              filter: "drop-shadow(0px 0px 9px rgba(153, 153, 153, 0.25))",
              border: "1px solid #F2F4F7",
              borderTopRightRadius: 2,
            }}
          >
            <Box>
              <img
                src={product.thumbnail}
                alt=""
                style={{ width: "100%", height: "200px", borderRadius: '20px 20px 0px 0px', }}
                className="bigImage"
                title={product.title}
              />
            </Box>
            <Box>
              <h3 style={{padding:5}}>{product.title}</h3>
            </Box>
          </Box>
        </Link>
      )}
      {/* <Paginate data={product} /> */}
    </div>
  );
}

export default ProductCard;
