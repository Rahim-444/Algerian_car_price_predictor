import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SeeMagic from "./../../assets/seemagic.svg";

const Discover = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <motion.div
      ref={ref}
      initial={{ x: "-100%" }}
      animate={isInView ? { x: 0 } : { x: "-100%" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="z-10 cursor-grab"
    >
      <h1 className="text-white font-semibold text-4xl">Predict everywhere</h1>
      <p className="text-gray-500 font-light text-center text-2xl mt-5">
        with the new website ,<br /> no car price is unknown for you
      </p>
      <button className="flex items-center mt-4 ml-10">
        <img src={SeeMagic} alt="see magic" />
        <div className="font-semibold text-xl text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FC72FF] via-[#8F68FF]  via-[#487BFF] via-[#2CD9FF] to-[#2CFFCC]">
          Click to see magic
        </div>
      </button>
    </motion.div>
  );
};

export default Discover;
