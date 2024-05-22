import dots from "../assets/dots.svg";
import illustration from "../assets/hero-illustration.svg";
import Svg from "./Utils/Svg";
import SeeMagic from "./../assets/seemagic.svg";
import DarkModeButton from "./Utils/DarkModeButton.jsx";


const Hero = ({isDarkmode , setIsDarkmode}) => {
    
    return (
        <div id="hero" className="relative " >
            <Navbar isDarkmode={isDarkmode} setIsDarkmode={setIsDarkmode}  />
            <Svg id="logo" className="absolute right-0 top-0 w-[60%] z-0 " />
            <div className="flex">
                <div className=" z-10 dark:text-white  text-background h-screen flex justify-center flex-col ml-28 animate-appearance-in">
                    <h1 className="h-min font-bold text-4xl mt-7">
                        one click and all 
                        <br /> the market in your <span className="text-[#2CFFCC]">Hand</span>
                    </h1>
                    
                    <button
                        className=" text-white flex items-center gap-4 pt-5"
                    >
                       <img src={SeeMagic} alt="see magic" />
                       <div className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FC72FF] via-[#8F68FF]  via-[#487BFF] via-[#2CD9FF] to-[#2CFFCC]">Click to see magic</div>
                    </button>

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
                    className="absolute right-0 top-0 animate-appearance-in z-1 w-3/4"
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

const Navbar = ({isDarkmode , setIsDarkmode}) => {
   
    return (
        <nav className="z-10 flex justify-end mr-20 pt-8 animate-appearance-in relative">
            <div className=" dark:text-white text-background  backdrop-blur-sm">
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
                        <a className="navbar" href="#">
                            ABOUT US
                        </a>
                    </li>
                    <li>
                        <a className="navbar" href="#">
                            CONTACT US
                        </a>
                    </li>
                    <li>
                        <DarkModeButton isDarkmode={isDarkmode} setIsDarkmode={setIsDarkmode} />
                    </li>
                    
                </ul>
            </div>
        </nav>
    );
};

export default Hero;
