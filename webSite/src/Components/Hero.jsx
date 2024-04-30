import dots from "../assets/dots.svg";
import illustration from "../assets/hero-illustration.svg";
import Svg from "./Utils/Svg";

const Hero = () => {
    return (
        <div id="hero" className="relative">
            <Navbar />
            <Svg id="logo" className="absolute right-0 top-0 w-[60%] z-0" />
            <div className="flex">
                <div className="text-white h-screen flex justify-center flex-col ml-28 animate-appearance-in">
                    <h1 className="h-min font-extrabold text-5xl mt-10">
                        Start your
                        <br /> <span className="text-[#6695E6]">estimation</span>
                        <br /> journey using AI
                    </h1>
                    <p className=" mt-5 w-[63%] text-justify">
                        We provide the best AI tools to help you estimate your project with
                        the best accuracy!
                    </p>
                    <button
                        className=" text-white px-10 w-44 py-3 mt-12
                        rounded-lg font-semibold shine bg-gradient-to-r from-[#902BAD] to-[#3F78E1]"
                    >
                        Get Started
                    </button>
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

const Navbar = () => {
    return (
        <nav className="z-10 flex justify-end mr-20 pt-8 animate-appearance-in relative">
            <div className=" text-white backdrop-blur-sm">
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
                </ul>
            </div>
        </nav>
    );
};

export default Hero;
