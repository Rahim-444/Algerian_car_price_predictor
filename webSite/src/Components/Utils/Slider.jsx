import React from "react";
import Cards from "./Cards";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination , Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

function Slider() {
  
  return (
    <div className="container">
      <h1 className="heading">Flower Gallery</h1>
      
      <Swiper
           
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide>
          <Cards />
        </SwiperSlide>
        <SwiperSlide>
          <Cards />
        </SwiperSlide>
        <SwiperSlide>
          <Cards />
        </SwiperSlide>
        

        <div className="slider-controler mt-11 ">
          <div className="swiper-button-prev slider-arrow ">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}

export default Slider;
