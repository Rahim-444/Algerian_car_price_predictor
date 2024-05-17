import FormSection from "./Components/FormSection.jsx";
import Fotter from "./Components/Fotter.jsx";
import Hero from "./Components/Hero.jsx";
import InfoSection from "./Components/InfoSection.jsx";
import InfoSection2 from './Components/InfoSection2.jsx';
import ThreedModel from "./Components/Utils/ThreedModel.jsx";
import BotThreedModel from "./Components/Utils/BotThreedModel.jsx";
import React from "react";
const App = () => {
   const canvasRef = React.useRef(null);
  return (
    <>
    <div className="relative">
     <BotThreedModel canvasRef={canvasRef}/>
    </div>
    </>
  );
};

export default App;
