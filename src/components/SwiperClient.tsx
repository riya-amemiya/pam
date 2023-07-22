"use client";
import { Swiper } from "swiper/react";
import "swiper/css/bundle";
import { SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";

export const SwiperClient = ({ children }: { children: JSX.Element[] }) => {
  return (
    <Swiper
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Navigation, Pagination]}
    >
      {children.map((child) => {
        return <SwiperSlide>{child}</SwiperSlide>;
      })}
    </Swiper>
  );
};
