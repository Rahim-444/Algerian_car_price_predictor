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
import { useEffect, useState, useRef } from "react";
import useIntersectionObserver from "../useIntersectionObserver";

function Slider() {
  const [isSwiperVisible, setIsSwiperVisible] = useState(false);
  const swiperRef = useRef(null);

  const handleSwiperIntersection = (entry) => {
    setIsSwiperVisible(entry.isIntersecting);
  };

  const { observe, unobserve } = useIntersectionObserver(
    handleSwiperIntersection,
    {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    },
  );

  useEffect(() => {
    if (swiperRef.current) {
      observe(swiperRef.current);
    }
    return () => {
      if (swiperRef.current) {
        unobserve(swiperRef.current);
      }
    };
  }, [observe, unobserve]);

  return (
    <div ref={swiperRef} className="container w-screen">
      {isSwiperVisible && (
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
            // delay: 4000,
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
          //FIX: these animations arer not working not here and not for rthe
          //phone
          className="swiper_container slideInFromLeft"
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
      )}
    </div>
  );
}

export default Slider;
