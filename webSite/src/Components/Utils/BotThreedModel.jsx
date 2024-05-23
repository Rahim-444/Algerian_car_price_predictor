import { Suspense } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera, Html } from "@react-three/drei";
import Bot from "../../../public/Bot";

const BotThreedModel = () => {
  return (
    <div className="absolute w-1/3 right-0  md:right-[-4rem]  hover:cursor-grab ">
      <Canvas style={{ marginTop: "50px", height: "240px" }}>
        <Suspense fallback={<Html>Loading...</Html>}>
          <PerspectiveCamera makeDefault position={[2, 6, 2]} />
          <ambientLight intensity={5} />
          <Bot />
          <OrbitControls
            enableZoom={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
export default BotThreedModel;
