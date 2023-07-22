"use client";
import { Swiper } from "swiper/react";
import "swiper/css/bundle";
import { SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";

export const SwiperClient = ({ children }: { children: JSX.Element[] }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation={true}
      pagination={{ clickable: true }}
    >
      {children.map((child, index) => {
        return <SwiperSlide key={String(index)}>{child}</SwiperSlide>;
      })}
    </Swiper>
  );
};
