import React from "react";
import Cards from "./Utils/Cards.jsx";
import dots from "../assets/dots.svg";
import ThreedModel from "./ThreedModel.jsx";
import Slider from "./Utils/Slider.jsx";
import phone from "../assets/phone.png";

const InfoSection = () => {
  return (
    <div className="Info-section h-fit relative flex justify-center items-start mt-10 animate-appearance-in">
      <div className="bg-Blue blur-[100px] w-40 h-48 absolute top-0 left-24 z-10"></div>
      <div className="bg-Purple blur-[130px] w-40 h-48 absolute right-0 bottom-12 z-10"></div>
      <div className="bg-Purple blur-[130px] w-40 h-48 absolute left-40 bottom-48 z-10"></div>
      <div className="card-phone flex items-center justify-center flex-wrap md:flex-nowrap">
        <img src={phone} className="z-20 mb-9 bounce" />
        <Slider className="mb-12" />
      </div>
    </div>
  );
};

export default InfoSection;
