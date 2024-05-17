import "../../index.css";
import Svg from "./Svg.jsx";

const Cards = () => {
    // const canvasRef = React.useRef(null);
    return (
        <div className="flex justify-center items-center m-0 ">
            <div
                className="gradiantBackground w-2/3 h-56 border-2 border-white  border-opacity-15  p-1 rounded-3xl 
                relative overflow-hidden shadow-2xl"
            >
                <div
                    className="innerBackground bg-transparent w-[100%] h-[100%] rounded-3xl
                    flex justify-center items-center flex-col"
                >
                    <div className="content  ">
                        {/* <img src={botIcon} className='mb-12' /> */}
                        {/* <div className='leftSide'>
                         <ThreedModel canvasRef={canvasRef} /> */}
                        <div className="rightSide backdrop-blur-[2px] z-10 relative py-96">
                            <h2 className="text-center text-white font-bold text-xl md:text-4xl mb-9 md:mb-10 mt-4 md:mt-0">
                                Our use of AI{" "}
                            </h2>
                            <h3 className="text-center text-white font-light text-sm md:text-xl  px-8">
                                Lorem ipsum dolor sit amet consectetur. Euismod eu phasellus
                                viverra nec lectus nisl libero. nec lecnec lectus nec lectus
                                nisl libero.nec lectus nisl libero.nec lectus nisl nec lectus
                                nisl libero.tus nisl libero. nec lectus nisl libero.
                            </h3>
                        </div>

                        <Svg className="w-full absolute top-0 right-0 z-0" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;
