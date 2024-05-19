import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, PerspectiveCamera, Html, useGLTFLoader } from '@react-three/drei';

const Model = () => {
  const { scene } = useGLTFLoader("Iphone/Iphone.gltf", true);
  return <primitive object={scene} dispose={null} />;
};

const BotThreedModel = () => {
  return (
    <Canvas>
      <Suspense fallback={<Html>Loading...</Html>}>
        <PerspectiveCamera makeDefault position={[0, 0, 3.2]} />
        <ambientLight intensity={3} />
        <Model />
      </Suspense>
      <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  );
};
export default BotThreedModel;