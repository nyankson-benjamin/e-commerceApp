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

function ProductPage() {
  const [data, isLoading] = useFetchProducts();
  const { title } = useParams();
  const [related, setRelated] = useState();
  const [loading, setLoading] = useState(false);
  const product = data?.find((product) => product.title === title);
  const [screenWidth] = useScreenWidth();
  const autoplay = {
    delay: 2000, // Delay between transitions (in ms)
    disableOnInteraction: false, // Enable/disable autoplay on user interaction
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const related = await DUMMy_API.get(
          `/products/category/${product.category}`
        );
        setLoading(false);
        setRelated(related?.data?.products);
      } catch (error) {}
    };
    fetch();
  });
  return (
    <div style={{ height: "100vh" }}>
      <AppsBar />
      {product && (
        <Box
          sx={{
            margin: "50px",
            // width: "50%",
            overFlow: "scroll",
            // height: "200px",
            mt: "20px",
          }}
        >
          <Box sx={{ height: "200px" }}>
            <p>{product.title}</p>
            <img
              src={product.thumbnail}
              alt=""
              style={{ width: "200px", height: "200px" }}
            />
          </Box>
          <br />
          <br />
          <Box>
            <h3>Related Products</h3>

            {screenWidth > 498 ? (
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={20}
                slidesPerView={4}
                // onSlideChange={() => console.log("slide change")}
                // onSwiper={(swiper) => console.log(swiper)}
                navigation
                pagination={{ clickable: true }}
                autoplay={autoplay}
              >
                {related?.map((related) => (
                  <SwiperSlide key={related.id}>
                    <RelatedProducts related={related} loading={isLoading} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
            navigation
            pagination={{ clickable: true }}
            autoplay={autoplay}
          >
            {related?.map((related) => (
              <SwiperSlide key={related.id}>
                <RelatedProducts related={related} loading={isLoading} />
              </SwiperSlide>
            ))}
          </Swiper>}

            {/* <ProductSlider data={related} /> */}
          </Box>
        </Box>
      )}
      {/* <h3>Other Products</h3>
      <ProductSlider data={data} /> */}
      <Footer />
    </div>
  );
}

export default ProductPage;
