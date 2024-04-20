import React from 'react'
import { useEffect , useRef} from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import {gsap} from 'gsap';


const ThreedModel = ({canvasRef}) => {
   const leftSideRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

    //renderers configuration
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background color (black, 0 opacity)
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.sortObjects = false; // Disable depth sorting (might be necessary for specific cases)
    
   // Create a DRACOLoader instance to decode draco files.
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('node_modules/three/examples/js/libs/draco'); // replace with the path to your draco decoder files
   

    // Create a GLTFLoader instance.
    var loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    
    let  model ;
    loader.load('Iphone.gltf', function ( gltf ) {
        model = gltf.scene;
        model.position.set(0,0,0);
        model.rotation.y = 2;
        model.rotation.x = 0;
        model.scale.set(1.4,1.2,1.4);
        
        //set the model position to the center of the scene
       // Compute the bounding box of the model
       const box = new THREE.Box3().setFromObject(model);
       
       // Get the center of the bounding box
       const center = box.getCenter(new THREE.Vector3());

      
       // Move the model's geometry so that its center is at the origin
       model.position.sub(center);

       scene.add( model );

     }, undefined, function ( error) {
    	 console.error( error );
    } );

    //entrance animation
    gsap.fromTo(leftSideRef.current, { x: '-100%' }, { x: '0%', duration: 1 });
    


     renderer.shadowMap.enabled = true;

     // Enable shadows for the object
    if(model){
      model.traverse(function (node) {
    if (node instanceof THREE.Mesh) {
      node.castShadow = true; // default is false
      node.receiveShadow = true; // default is false
    }
     });
    }


    //adding orbit controls 
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI / 2; // Restrict vertical rotation
    controls.maxPolarAngle = Math.PI / 2;
    controls.update();

   
    // Enable shadows for the light source 
    // const light2 = new THREE.SpotLight(0x902BAD, 1);
    // light2.position.set(4, 0, 3);
    // light2.castShadow = true; // default is false

    const light = new THREE.AmbientLight(0xffffff, 1);
    light.position.set(0, 0, 0);
    
     scene.add(light);
    //  scene.add(light2)

    // Set camera position
    camera.position.z = 3.2;

    let time = 0;
    const animate = () => {
      // model.rotation.y = scrollY; // Update model rotation based on scroll
      if (model) {
       // Adjust the speed of rotation by changing this value
        
     time += 0.2; // Increase this value to make the animation faster
     model.position.y = 0.1 * Math.sin(time) ;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
      // controls.update();
    };

    if ( WebGL.isWebGLAvailable() ) {

	 // Initiate function or other initializations here
	 animate();

   } else {

	  const warning = WebGL.getWebGLErrorMessage();
	  console.log(warning);

   }
   }, []);
    return (
     <div>
       <canvas ref={canvasRef} className='absolute bottom-14 left-[-26rem]' />
     </div>
 );
}

export default ThreedModel;