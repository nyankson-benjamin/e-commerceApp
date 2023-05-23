import React, { useEffect, useState } from "react";
import useFetchProducts from "../FetchingHooks/useFetchProducts";
import { useParams } from "react-router-dom";
import AppsBar from "../TopBar/AppBar";
import { DUMMy_API } from "../Services/api";
import RelatedProducts from "./RelatedProducts";
import useScreenWidth from "../Hooks/useScreenWidth";
import { Box, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/swiper.min.css";
import Footer from "../components/Footer";
import ProductDetail from "./ProductDetail";
function ProductPage() {
  const [data, isLoading] = useFetchProducts();
  const { title } = useParams();
  const [related, setRelated] = useState();
  const [loading, setLoading] = useState(false);
  const product = data?.find((product) => product.title === title);
  const [screenWidth] = useScreenWidth();
  // const [image, setImage] = useState(product.thumbnail);
  const autoplay = {
    delay: 2000, // Delay between transitions (in ms)
    disableOnInteraction: false, // Enable/disable autoplay on user interaction
  };

  useEffect(() => {
    if (product) {
      setRelated(
        data?.filter((relate) => relate.category === product.category)
      );
    }
  }, [, data, product]);

  let original = related?.filter((item) => item.title !== product.title);
  console.log("original", original);
  return (
    <div >
      <AppsBar />
      {product && (
        <Box sx={{mb:20}}>
          <Box
            sx={{
              // height: "200px",
              display: "flex",
              justifyContent: "center",
              // flexDirection: "column",
              mt: 5,
  
            }}
          >
            <ProductDetail product={product} />
          </Box>

          <Box >
            {original?.length>1 && (
              <>
                <h3>Related Products</h3>
                <RelatedProducts related={original} loading={isLoading} />
              </>
            )}
          </Box>
        </Box>
      )}
      
      <Footer />
    </div>
  );
}

export default ProductPage;
