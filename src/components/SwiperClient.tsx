"use client";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";

export const SwiperClient = ({ children }: { children: JSX.Element[] }) => {
  return (
    <Swiper
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Pagination, Autoplay]}
      navigation={true}
      pagination={{ clickable: true }}
    >
      {children.map((child, index) => {
        return <SwiperSlide key={String(index)}>{child}</SwiperSlide>;
      })}
    </Swiper>
  );
};
