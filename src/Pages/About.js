import React from "react";
import AppsBar from "../TopBar/AppBar";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default function About() {
  return (
    <div>
      <AppsBar />
      <br />
      <br />
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>Card1</SwiperSlide>
        <SwiperSlide>Card2</SwiperSlide>
        <SwiperSlide>Card3</SwiperSlide>
        <SwiperSlide>Card4</SwiperSlide>
        <SwiperSlide>Card5</SwiperSlide>
        <SwiperSlide>Card6</SwiperSlide>
      </Swiper>
    </div>
  );
}
