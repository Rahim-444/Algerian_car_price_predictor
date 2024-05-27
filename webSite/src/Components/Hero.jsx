import dots from "../assets/dots.svg";
import illustration from "../assets/herosection.svg";
import SeeMagic from "./../assets/seemagic.svg";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link as ScrollLink } from "react-scroll";

const words = [
  { text: "one", className: "h-min font-bold text-4xl mt-5 text-white" },
  { text: "click", className: "h-min font-bold text-4xl mt-5 text-white" },
  { text: "and", className: "h-min font-bold text-4xl mt-5 text-white" },
  { text: "all", className: "h-min font-bold text-4xl mt-5 text-white" },
  { text: "the", className: "h-min font-bold text-4xl mt-5 text-white" },
];
const words2 = [
  { text: "market", className: "h-min font-bold text-4xl  text-white" },
  { text: "is", className: "h-min font-bold text-4xl  text-white" },
  { text: "in", className: "h-min font-bold text-4xl  text-white" },
  { text: "your", className: "h-min font-bold text-4xl text-white" },
  {
    text: "Hands",
    className: "h-min font-bold text-4xl mt-10 text-[#2CFFCC]",
  },
];
const FirstComponent = ({ onLoad }) => {
  useEffect(() => {
    const loadComponent = async () => {
      // Simulate an async operation
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Adjust time as needed
      onLoad();
    };

    loadComponent();
  }, [onLoad]);

  return (
    <TypewriterEffectSmooth
      className="typewriter-container"
      words={words}
      cursorClassName="typewriter-cursor"
      isLast={false}
    />
  );
};
const SecondComponent = () => {
  return (
    <TypewriterEffectSmooth
      className="typewriter-container absolute down-0 left-0"
      words={words2}
      cursorClassName="typewriter-cursor"
      isLast={true}
    />
  );
};

const Hero = () => {
  const [firstLoaded, setFirstLoaded] = useState(false);

  const handleFirstLoad = () => {
    setFirstLoaded(true);
  };
  return (
    <div id="hero" className="relative">
      <Navbar />
      {/* <Svg id="logo" className="absolute right-0 top-0 w-[60%] z-0" /> */}
      <div className="flex">
        <div className=" z-10 text-white   h-screen flex justify-center flex-col ml-9 md:ml-28  animate-appearance-in">
          <FirstComponent onLoad={handleFirstLoad} />
          {firstLoaded && <SecondComponent />}
          <ScrollLink
            to="fotter"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            <button className=" text-white flex items-center gap-4 pt-5 mt-5 ">
              <img src={SeeMagic} alt="see magic" />
              <div className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r  from-[#FC72FF] via-[#8F68FF]  via-[#487BFF] via-[#2CD9FF] to-[#2CFFCC]">
                Click to see magic
              </div>
            </button>
          </ScrollLink>
          <div className="bg-ternary blur-[200px] w-80 h-72 absolute top-64 left-[10rem] z-1"></div>

          {/* <p className=" mt-5 w-[63%] text-justify">
                        We provide the best AI tools to help you estimate your project with
                        the best accuracy!
                    </p> */}
          {/* <button
                        className=" text-white px-10 w-44 py-3 mt-12
                        rounded-lg font-semibold shine bg-gradient-to-r from-[#902BAD] to-[#3F78E1]"
                    >
                        Get Started
                    </button> */}
        </div>
        <img
          src={illustration}
          alt="illustration"
          className="absolute right-[10%] top-[25%] animate-appearance-in z-1 w-[40%]"
        />
        <img
          src={dots}
          alt="dots"
          className="absolute left-3 top-5 animate-pulse w-[8%]"
        />
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="z-10 flex justify-end mr-20 pt-8 animate-appearance-in relative">
      <div className="  text-white  backdrop-blur-sm">
        <ul className="flex gap-24 font-medium">
          <li>
            <a className="navbar" href="#">
              HOME
            </a>
          </li>
          <li>
            <a className="navbar" href="#">
              FEATURES
            </a>
          </li>
          <li>
            <ScrollLink
              to="about"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              className="cursor-pointer navbar"
            >
              ABOUT US
            </ScrollLink>
          </li>
          <li>
            <a className="navbar" href="#">
              CONTACT US
            </a>
          </li>
          {/* <li>
            <DarkModeButton
              isDarkmode={isDarkmode}
              setIsDarkmode={setIsDarkmode}
            />
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

FirstComponent.propTypes = {
  onLoad: PropTypes.func.isRequired,
};

export default Hero;
