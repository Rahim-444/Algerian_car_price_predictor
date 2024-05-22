import Cards from "./Cards";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useRef } from "react";

function Slider() {
  const swiperRef = useRef(null);
  return (
    <div ref={swiperRef} className="container w-screen">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        spaceBetween={0}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
        className="swiper_container slideInFromLeft"
      >
        <SwiperSlide>
          <Cards
            text={
              "Our project implements advanced artificial intelligence techniques by integrating the benefits of XGBoost algorithms."
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <Cards
            text={
              "We plan to introduce advanced features such as result personalization, market trend visualization, and the integration of personalized advice."
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <Cards
            text={
              "Our solution will continue to evolve to meet the changing needs of the automotive market and provide an increasingly enriched and personalized user experience."
            }
          />
        </SwiperSlide>

        <div className="slider-controler mt-14 ">
          <div className="swiper-button-prev slider-arrow hidden md:block cursor-pointer">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>

          <div className="swiper-pagination"></div>

          <div className="swiper-button-next slider-arrow hidden md:block cursor-pointer">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>
      </Swiper>
    </div>
  );
}

export default Slider;
