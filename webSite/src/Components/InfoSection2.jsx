import ThreedModel from "../Components/Utils/ThreedModel.jsx";
import { useRef } from "react";
import dots from "./../assets/dots.svg";
import Discover from "./Utils/Discover.jsx";

const InfoSection2 = () => {
  const canvasRef = useRef(null);
  return (
    <div className=" flex justify-center items-center flex-col relative overflow-x-hidden">
      <div className="bg-ternary blur-[150px] w-80 h-72 absolute top-96 right-[-10rem] z-1"></div>
      <div className="bg-Purple blur-[150px] w-80 h-72 absolute top-96 left-[-10rem] z-1"></div>
      <img
        src={dots}
        alt="dots"
        className="absolute right-3 top-5 animate-pulse w-[8%]"
      />

      <div className="flex justify-around">
        <div className="w/1/2 flex items-center justify-center animate-appearance-in">
          <Discover />
        </div>
        <div className="w-[30%]">
          <ThreedModel canvasRef={canvasRef} />
        </div>
      </div>
    </div>
  );
};

export default InfoSection2;
