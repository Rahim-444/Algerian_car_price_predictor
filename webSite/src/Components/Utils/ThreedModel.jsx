import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import PropTypes from "prop-types";
import { motion, useInView, useAnimate } from "framer-motion";

const ThreedModel = ({ canvasRef }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const animationRef = useRef();
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      setIsLoaded(true);
      animate("canvas", { x: 0 }, { duration: 0.9, ease: "easeOut" });
    } else {
      setIsLoaded(false);
      animate("canvas", { x: "100%" }, { duration: 0.9, ease: "easeOut" });
    }
  }, [isInView]);

  useEffect(() => {
    let scene, camera, renderer, controls, model, light;
    let time = 0;

    if (isLoaded) {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("node_modules/three/examples/js/libs/draco/");

      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);
      loader.load(
        "Iphone/Iphone.gltf",
        (gltf) => {
          model = gltf.scene;
          model.position.set(0, 0, 0);
          model.rotation.y = 1;
          model.rotation.x = 0;
          model.scale.set(1, 0.8, 1);

          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          model.position.sub(center);

          scene.add(model);
        },
        undefined,
        (error) => {
          console.error(error);
        }
      );

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.minPolarAngle = Math.PI / 2;
      controls.maxPolarAngle = Math.PI / 2;
      controls.update();

      light = new THREE.AmbientLight(0xffffff, 3);
      scene.add(light);

      camera.position.z = 3.2;

      const animateModel = () => {
        if (model) {
          time += 0.15;
          model.position.y = 0.1 * Math.sin(time);
        }
        renderer.render(scene, camera);
        animationRef.current = requestAnimationFrame(animateModel);
      };

      animateModel();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (renderer) renderer.dispose();
      if (model) scene.remove(model);
    };
  }, [isLoaded, canvasRef]);

  return (
    <motion.div
      ref={scope}
      initial={{ x: "100%" }}
      animate={{ x: -400 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="z-10 cursor-grab w-[50%]"
    >
      <canvas ref={canvasRef} />
    </motion.div>
  );
};

ThreedModel.propTypes = {
  canvasRef: PropTypes.object.isRequired,
};

export default ThreedModel;
