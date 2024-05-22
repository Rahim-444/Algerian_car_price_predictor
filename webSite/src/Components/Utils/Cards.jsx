import "../../index.css";
import Svg from "./Svg.jsx";
import PropTypes from "prop-types";

const Cards = ({ text }) => {
    return (
        <div className="flex justify-center items-center m-0 ">
            <div
                className="gradiantBackground w-[70%] h-56 border-2 border-white  border-opacity-15  p-1 rounded-3xl 
                relative overflow-hidden shadow-2xl
                "
            >
                <div
                    className="innerBackground bg-transparent w-[100%] h-[100%] rounded-3xl
                    flex justify-center items-center flex-col"
                >
                    <div className="content ">
                        <div className="rightSide backdrop-blur-[2px] z-10 relative py-96">
                            <h2 className="text-center text-white font-bold text-xl md:text-4xl mb-9 md:mb-10 mt-4 md:mt-0">
                                About The Project
                            </h2>
                            <h3 className="text-center text-white font-semibold text-sm md:text-xl  px-8">
                                {text}
                            </h3>
                        </div>

                        <Svg className=" absolute top-0 right-10 z-0 w-[90%] h-fit" />
                    </div>
                </div>
            </div>
        </div>
    );
};

Cards.propTypes = {
    text: PropTypes.string.isRequired,
};
export default Cards;
