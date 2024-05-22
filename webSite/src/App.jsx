import Fotter from "./Components/Fotter.jsx";
import Hero from "./Components/Hero.jsx";
import InfoSection from "./Components/InfoSection.jsx";
import InfoSection2 from "./Components/InfoSection2.jsx";
import FormSection from "./Components/FormSection.jsx";
import Scroll from "./Components/Utils/Scroll.jsx";

const App = () => {
  return (
    <>
      <div className="overflow-hidden">
        <Scroll className="">
          <Hero />
          <InfoSection />
          <InfoSection2 />
          <FormSection />
          <Fotter />
        </Scroll>

        {/* <Team  items={people}/> */}
      </div>
    </>
  );
};

export default App;
