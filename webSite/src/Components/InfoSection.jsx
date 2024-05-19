import { useRef } from "react";
import ThreedModel from "./ThreedModel.jsx";
import Slider from "./Utils/Slider.jsx";

const InfoSection = () => {
  const canvasRef = useRef(null);
  return (
    <div className="Info-section h-fit flex justify-center items-start mt-10 ">
      <div className="bg-Blue blur-[100px] w-40 h-48 absolute top-0 left-24 z-1"></div>
      <div className="bg-Purple blur-[130px] w-40 h-48 absolute right-0 bottom-12 z-1"></div>
      <div className="bg-Purple blur-[130px] w-40 h-48 absolute left-40 bottom-48 z-1"></div>
      <div className="relative card-phone flex items-center justify-center flex-wrap md:flex-nowrap">
        <div className="leftSide relative h-screen w-[50%] z-0">
          <ThreedModel canvasRef={canvasRef} />
        </div>
        <Slider className="rightSide mb-12 z-10 animateSlideInLeft" />
      </div>
    </div>
  );
};

export default InfoSection;
