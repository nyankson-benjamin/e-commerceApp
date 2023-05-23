import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import ProductSkeleton from "../components/ProductSkeleton";

function ProductCard({ product, isLoading, showAll }) {
  return (
    <div className="productCard">
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <Link to={`/productPage/${product.title}`}>
          <Box
            sx={{
              filter: "drop-shadow(0px 0px 9px rgba(153, 153, 153, 0.25))",
              border: "1px solid #F2F4F7",
              borderTopRightRadius: 2,
            }}
          >
            <Box>
              <img
                src={
                  product.title === "Samsung Universe 9"
                    ? product.images[0]
                    : product.images[1]
                }
                alt=""
                style={{
                  width: "100%",
                  height: "300px",
                  borderRadius: "20px 20px 0px 0px",
                }}
                className="bigImage"
                title={product.title}
              />
            </Box>
            <Box sx={{ bgcolor: "#ffc801", color:'white', mt:-3 }}>
              <h3 style={{ padding: 5 }}>{product.title}</h3>
            </Box>

            {showAll === true && (
              <Box>
                <h3>{product.stock}</h3>
              </Box>
            )}
          </Box>
        </Link>
      )}
    </div>
  );
}

export default ProductCard;
