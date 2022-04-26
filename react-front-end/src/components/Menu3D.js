import React, {useState} from "react";
import './Menu3D.scss'
import Help from "./Help";
import Footer from './Footer';
import Instructions from "./Instructions";

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// eslint-disable-next-line no-unused-vars
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

export default function Menu(props) {

  // state for help bubble popup
  const [showHelp, setShowHelp] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  let scene, camera, renderer, hemiLight, spinner, spinnerGroup, eyesOpenGroup, eyesClosedGroup, shouldRotate, rotationDir, fov;
  let canInput = true;

  const init = () => {

    // create scene and set background
    scene = new THREE.Scene();
    scene.background = new THREE.Color( '#A8BBCF' );

    // add camera
    fov = 90;
    camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 25, 35);

    // ----------------------------
    // --- custom model loading ---
    // ----------------------------
    
    // group declarations
    spinnerGroup = new THREE.Group();
    eyesOpenGroup = new THREE.Group();
    eyesClosedGroup = new THREE.Group();

    // head model
    var loader = new GLTFLoader();
    loader.load('models/puzz_head_v2.gltf', function(gltf) {
      var object = gltf.scene;
      object.position.set(0.5, 12, -5.5);
      object.scale.set(0.5, 0.5, 0.5);
      object.rotation.x -= 0.07; // adjust rotation for imported model (blender issue)
      scene.add(object);
    });

    // base model
    loader.load('models/puzz_bottom_v2.gltf', function(gltf) {
      var object = gltf.scene;
      object.position.set(-0.2, 16.5, 0);
      object.scale.set(0.15, 0.10, 0.15);
      // object.rotation.x -= 0.07; // adjust rotation for imported model (blender issue)
      scene.add(object);
    });

    // middle spinner
    const geometry = new THREE.CylinderGeometry( 8.5, 8.5, 4, 64 );
    const material = new THREE.MeshNormalMaterial();
    spinner = new THREE.Mesh( geometry, material );
    spinner.position.set(0, 24.8, 0);
    spinner.rotation.y += (Math.PI / 6); // set initial rotation so there is a flat side facing forward

    // add to spinner group
    spinnerGroup.add(spinner);

    // ----------------------
    // --- Load Menu Text ---
    // ----------------------

    // custom font loader
    const fontLoader = new FontLoader();
    const ttfLoader = new TTFLoader();
    ttfLoader.load('fonts3D/jet_brains_mono_regular.ttf', (json) => {
      // parse the custom font
      const jetBrainsFont = fontLoader.parse(json);

      // Use parsed font as normal text geometry
      const textGeometry = new TextGeometry('Pzzl   Gzzl', {
        height: 150,
        size: 10,
        font: jetBrainsFont,
      });
      // const textMaterial = new THREE.MeshNormalMaterial();
      const textMaterial = new THREE.MeshStandardMaterial({color: 0xF4A675, roughness: 0.5});
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.x = -46;
      textMesh.position.y = 19;
      textMesh.position.z = -150;
      // add mesh to scene
      scene.add( textMesh );
    });

    ttfLoader.load('fonts3D/jet_brains_mono_regular.ttf', (json) => {
      // parse the custom font
      const jetBrainsFont = fontLoader.parse(json);

      // Use parsed font as normal text geometry
      const textGeometry = new TextGeometry('sudoku', {
        height: 1,
        size: 2,
        font: jetBrainsFont,
      });
      const textMaterial = new THREE.MeshLambertMaterial({color: 0xD9DCE2});
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.x = -5;
      textMesh.position.y = 23.8;
      textMesh.position.z = 8;

      // add to spinner group
      spinnerGroup.add(textMesh);
    });

    ttfLoader.load('fonts3D/jet_brains_mono_regular.ttf', (json) => {
      // parse the custom font
      const jetBrainsFont = fontLoader.parse(json);

      // Use parsed font as normal text geometry
      const textGeometry = new TextGeometry('word search', {
        height: 1,
        size: 1.3,
        font: jetBrainsFont,
      });
      const textMaterial = new THREE.MeshLambertMaterial({color: 0xD9DCE2});
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.x = 5.8;
      textMesh.position.y = 24.2;
      textMesh.position.z = -8;
      textMesh.rotation.y = Math.PI;

      // add to spinner group
      spinnerGroup.add(textMesh);
    });

    // add spinner group to scene
    scene.add(spinnerGroup);

    // load text for pzzl-bot
    ttfLoader.load('fonts3D/jet_brains_mono_regular.ttf', (json) => {
      // parse the custom font
      const jetBrainsFont = fontLoader.parse(json);

      // Use parsed font as normal text geometry
      const textGeometry = new TextGeometry('^  ^', {
        height: 0.2,
        size: 2,
        font: jetBrainsFont,
      });
      const textMaterial = new THREE.MeshLambertMaterial({color: 0x1E1C1B});
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.x = -2.9;
      textMesh.position.y = 28;
      textMesh.position.z = 10;

      eyesOpenGroup.add(textMesh);

      // add to spinner group
      scene.add(eyesOpenGroup);
    });

    // load text for pzzl-bot
    ttfLoader.load('fonts3D/jet_brains_mono_regular.ttf', (json) => {
      // parse the custom font
      const jetBrainsFont = fontLoader.parse(json);

      // Use parsed font as normal text geometry
      const textGeometry = new TextGeometry('-  -', {
        height: 0.2,
        size: 2,
        font: jetBrainsFont,
      });
      const textMaterial = new THREE.MeshLambertMaterial({color: 0x1E1C1B});
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.x = -2.9;
      textMesh.position.y = 28.5;
      // note: z = 10 is visible
      textMesh.position.z = 8;

      eyesClosedGroup.add(textMesh);

      // add to spinner group
      scene.add(eyesClosedGroup);
    });

    // load text for pzzl-bot
    ttfLoader.load('fonts3D/jet_brains_mono_regular.ttf', (json) => {
      // parse the custom font
      const jetBrainsFont = fontLoader.parse(json);

      // Use parsed font as normal text geometry
      const textGeometry = new TextGeometry('‿', {
        height: 0.5,
        size: 2,
        font: jetBrainsFont,
      });
      const textMaterial = new THREE.MeshLambertMaterial({color: 0x1E1C1B});
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.x = -0.4;
      textMesh.position.y = 28.8;
      textMesh.position.z = 10;

      // add to spinner group
      scene.add(textMesh);
    });

    // -----------------------------------
    // --- generate background puzzles ---
    // -----------------------------------
    for (let i = 0; i < 500; i++) {
      // eslint-disable-next-line no-loop-func
      loader.load('models/puzzle_piece.gltf', (gltf) => {
          var object = gltf.scene;
          object.position.set((1 * generateRandom(-120, 120)), (1 * generateRandom(-100, 100)), (1 * generateRandom(-10, -100)));
          object.scale.set((1 * generateRandom(0.05, 0.5)), (1 * generateRandom(0.05, 0.5)), (1 * generateRandom(0.05, 0.5)));
          object.rotation.set(generateRandom(0, (2 * Math.PI)), generateRandom(0, (2 * Math.PI)), generateRandom(0, (2 * Math.PI)));
          scene.add(object);
      });
    }

    // -------------------------
    // --- lighting settings ---
    // -------------------------
    hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1.5);
    scene.add(hemiLight);

    // -------------------------
    // --- renderer settings ---
    // -------------------------
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    const light = new THREE.DirectionalLight( 0xFFFFFF, 0.5 );
    light.position.set(0, 25, 30);
    scene.add( light );

    // ---------------------------
    // --- helpers for testing ---
    // ---------------------------
    // scene.add(new THREE.AxesHelper(500));
    // const controls = new OrbitControls( camera, renderer.domElement );

  };

  // helper that returns random values in a set range
  const generateRandom = (min = -50, max = 50) => {
    let diff = max - min;
    let rand = Math.random();

    rand = Math.floor(rand * diff);
    rand = rand + min;

    return rand;
  };

  window.addEventListener('keydown', (e) => {
    if (canInput) {
      if (e.key === "ArrowRight") {
        shouldRotate = true;
        rotationDir = 'right';
        canInput = false;
      } else if (e.key === "ArrowLeft") {
        shouldRotate = true;
        rotationDir = 'left';
        canInput = false;
      } else if (e.key === "Enter") {
        props.transition("SUDOKU");
      } else if (e.key === "ArrowUp") {
        
      }
    }
  });

  // Camera rotate effect on mouse move
  window.addEventListener('mousemove', onMouseMove, false);
  function onMouseMove(event) {
    const moveFactor = 10000;
    scene.rotation.y = ((event.clientX - window.innerWidth / 2) / moveFactor);
    scene.rotation.x = ((event.clientY - window.innerHeight / 2) / (moveFactor * 2));
  }

  const botBlink = (action) => {
    const shouldBlink = generateRandom(0, 1000);
    // console.log(shouldBlink);
    if (shouldBlink > 995) {
      setTimeout(() => {
        eyesOpenGroup.position.z = -2;
        eyesClosedGroup.position.z = 2;
      }, 1000);
      setTimeout(() => {
        eyesOpenGroup.position.z = 0;
        eyesClosedGroup.position.z = 0;
      }, 1500);
    }
  };

  // rotation function for the animation loop
  const menuRotate = (rotate, direction) => {
    if (rotate && direction === 'right') {
      if (spinnerGroup.rotation.y < Math.PI) {
        spinnerGroup.rotation.y += (Math.PI / 12);
      } else {
        canInput = true;
      }
    } else if (rotate && direction === 'left') {
      if (spinnerGroup.rotation.y > 0.01) {
        spinnerGroup.rotation.y -= (Math.PI / 12);
      } else {
        canInput = true;
      }
    }
  };

  // on load fov
  const changeFov = (min = 75) => {
    if (camera.fov > min) {
      camera.fov = (camera.fov - 1);
    }
  };

  // animation loop, called once per frame
  function animate() {
    requestAnimationFrame(animate);
    menuRotate(shouldRotate, rotationDir);
    botBlink();
    // centerCam();
    changeFov();
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  }

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener('resize', onWindowResize, false);

  init();
  animate();

  return (
    <>
      <div className='menu-3d'></div>
      { showInstructions ? <Instructions message='Try again!' hideInstructions={() => setShowInstructions(false)} /> : <></>}
      <Help showHelp={showHelp} hideHelpPopup={() => setShowHelp(false)} />
      <Footer showHelpPopup={() => setShowHelp(true)} />
    </>
  );
}