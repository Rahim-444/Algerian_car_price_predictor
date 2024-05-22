
import Fotter from "./Components/Fotter.jsx";
import Hero from "./Components/Hero.jsx";
import InfoSection from "./Components/InfoSection.jsx";
import InfoSection2 from './Components/InfoSection2.jsx';
import ThreedModel from "./Components/Utils/ThreedModel.jsx";
import BotThreedModel from "./Components/Utils/BotThreedModel.jsx";
import FormSection from "./Components/FormSection.jsx";
import {useState , useEffect} from "react";
import Scroll from "./Components/Utils/Scroll.jsx"
// import DarkModeButton from "./Components/Utils/DarkModeButton.jsx";
// import Team from "./Components/Utils/Team.jsx"; this is one if we had time 


 
const App = () => {
   const [isDarkmode, setIsDarkmode] = useState(true)

   useEffect(() => {
    if (isDarkmode) {
      document.documentElement.classList.add('dark')
      document.documentElement.style.backgroundColor = '#030014';
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.backgroundColor = '#fffef2';
    }
  }, [isDarkmode]);


  return (
    <>
    <div className="overflow-hidden">
      <Scroll className="">
        <Hero isDarkmode={isDarkmode} setIsDarkmode={setIsDarkmode} />
        <InfoSection />
        <InfoSection2/>
        <FormSection/>
      </Scroll>
     
      
      
      {/* <Team  items={people}/> */}
    </div>
    </>
  );
};

export default App;
