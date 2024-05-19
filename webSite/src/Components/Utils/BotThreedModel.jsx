import React, { Suspense } from 'react';
import { Canvas  , useFrame , useThree} from 'react-three-fiber';
import { OrbitControls, PerspectiveCamera, Html} from '@react-three/drei';
import Bot from "../../../public/Bot"

// const Model = () => {
//   const { scene } = useGLTFLoader("Iphone/Iphone.gltf", true);
//   return <primitive object={scene} dispose={null} />;
// };

// const Rig= ()=> {
//   const { camera, mouse } = useThree()
//   c
//   return useFrame(() => {
//     camera.position.lerp(vec.set(mouse.x, mouse.y, camera.position.z), 0.05)
//     camera.lookAt(0, 0, 0)
//   })
// }

const BotThreedModel = () => {

  return (
    <div className='absolute w-1/2  right-0 '>
    <Canvas style={{ marginTop: '50px' ,  height:"240px"}}>
      <Suspense fallback={<Html>Loading...</Html>}>
        <PerspectiveCamera makeDefault position={[2,6,3]} />
        <ambientLight intensity={5} />
        <Bot/>
        <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
      </Suspense>
    </Canvas>
    </div>
    
  );
};
export default BotThreedModel;