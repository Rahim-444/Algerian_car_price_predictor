import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import WebGL from "three/addons/capabilities/WebGL.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import PropTypes from "prop-types";
import useIntersectionObserver from "./useIntersectionObserver";

const ThreedModel = ({ canvasRef }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef(null);

  const handleIntersection = (entry) => {
    if (entry.isIntersecting) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  };

  const { observe, unobserve } = useIntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: "600px",
    threshold: 1,
  });

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      observe(element);
    }
    return () => {
      if (element) {
        unobserve(element);
      }
    };
  }, [observe, unobserve]);

  useEffect(() => {
    if (!isLoaded) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

    // Renderer configuration
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.sortObjects = false;

    // Create a DRACOLoader instance to decode Draco files
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("node_modules/three/examples/js/libs/draco");

    // Create a GLTFLoader instance
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    let model;
    loader.load(
      "Iphone.gltf",
      function(gltf) {
        model = gltf.scene;
        model.position.set(0, 0, 0);
        model.rotation.y = 2;
        model.rotation.x = 0;
        model.scale.set(1.4, 1.2, 1.4);

        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        scene.add(model);
      },
      undefined,
      function(error) {
        console.error(error);
      },
    );
    renderer.shadowMap.enabled = true;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;
    controls.update();

    const light = new THREE.AmbientLight(0xffffff, 3);
    light.position.set(0, 0, 0);
    scene.add(light);

    camera.position.z = 3.2;

    let time = 0;
    const animate = () => {
      if (model) {
        time += 0.15;
        model.position.y = 0.1 * Math.sin(time);
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    if (WebGL.isWebGLAvailable()) {
      animate();
    } else {
      const warning = WebGL.getWebGLErrorMessage();
      console.log(warning);
    }

    return () => {
      renderer.dispose();
      if (model) {
        scene.remove(model);
      }
    };
  }, [isLoaded, canvasRef]);

  return (
    <div ref={elementRef}>
      <canvas
        ref={canvasRef}
        className="absolute bottom-14 left-[-30rem] z-10 cursor-grab animateSlideInLeft"
      />
    </div>
  );
};

ThreedModel.propTypes = {
  canvasRef: PropTypes.object,
};

export default ThreedModel;
