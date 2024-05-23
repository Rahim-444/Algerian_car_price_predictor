import SeeMagic from "./../../assets/seemagic.svg";
import { Link as ScrollLink } from "react-scroll";

const Discover = () => {
  return (
    <div>
      <h1 className="text-white font-semibold text-4xl">Predict everywhere</h1>
      <p className="text-gray-500 font-light text-center text-2xl mt-5">
        with the new website ,<br /> no car price is unknown for you
      </p>
      <ScrollLink
        to="fotter"
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
      >
        <button className="flex items-center mt-4 ml-10">
          <img src={SeeMagic} alt="see magic" />
          <div className="font-semibold text-xl text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FC72FF] via-[#8F68FF]  via-[#487BFF] via-[#2CD9FF] to-[#2CFFCC]">
            Click to see magic
          </div>
        </button>
      </ScrollLink>
    </div>
  );
};

export default Discover;
