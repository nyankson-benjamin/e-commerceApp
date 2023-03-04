import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import useScreenWidth from "../../Hooks/useScreenWidth";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/swiper.min.css";
import {
  CardHeader,
  Card,
  CardContent,
  Stack,
  Rating,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
export default function ProductSlider({ data, isLoading }) {
  const [screenWidth] = useScreenWidth();
  const autoplayOptions = {
    delay: 2000, // Delay between transitions (in ms)
    disableOnInteraction: false, // Enable/disable autoplay on user interaction
  };
  return (
    <div>
      {" "}
      {screenWidth > 498 ? (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          navigation
          pagination={{ clickable: true }}
          autoplay={autoplayOptions}
          // disableOnInteraction={false}
          style={{ margin: "auto", width: "80%" }}
        >
          <Grid>
            {data?.map((product) => (
              <SwiperSlide key={product.id}>
                <Link to={`/productPage/${product.title}`}>
                  <Card
                    elevation={1}
                    className="productCard"
                    sx={{ width: "100%", height: "320px" }}
                  >
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
                        subheader={`${product.brand}`}
                      />
                    ) : (
                      <CardHeader
                        title={product.title.substring(0, 15) + " ..."}
                        subheader={`Brand: ${product.brand}`}
                      />
                    )}

                    <CardContent>
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
                    </CardContent>
                  </Card>
                </Link>
              </SwiperSlide>
            ))}
          </Grid>
        </Swiper>
      ) : <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
      navigation
      pagination={{ clickable: true }}
      autoplay={autoplayOptions}
      // disableOnInteraction={false}
      style={{ margin: "auto", width: "90%" }}
    >
      <Grid>
        {data?.map((product) => (
          <SwiperSlide key={product.id}>
            <Link to={`/productPage/${product.title}`}>
              <Card
                elevation={1}
                className="productCard"
                sx={{ width: "100%", height: "320px" }}
              >
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
                    subheader={`${product.brand}`}
                  />
                ) : (
                  <CardHeader
                    title={product.title.substring(0, 15) + " ..."}
                    subheader={`Brand: ${product.brand}`}
                  />
                )}

                <CardContent>
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
                </CardContent>
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Grid>
    </Swiper>}
    </div>
  );
}
