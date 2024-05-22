// import { useRef } from "react";
import Slider from "./Utils/Slider.jsx";
// import ThreedModel from "./Utils/ThreedModel.jsx";

const InfoSection = () => {
  // const canvasRef = useRef(null);
  return (
    <div className="Info-section h-screen flex flex-col gap-20 justify-center items-center animate-appearance-in">
      <h1 className="text-5xl dark:text-Cream  text-background text-center font-bold">
        Discover our Services
      </h1>
      <div className="bg-Purple blur-[130px] w-40 h-48 absolute right-0 bottom-12 z-1"></div>
      <div className="bg-background blur-[200px] w-48 h-48 absolute left-20 top-0 z-1"></div>
      <div className="relative card-phone flex items-center justify-center flex-wrap md:flex-nowrap">
        <Slider className=" z-10 mb-12" />
      </div>
    </div>
  );
};

export default InfoSection;
