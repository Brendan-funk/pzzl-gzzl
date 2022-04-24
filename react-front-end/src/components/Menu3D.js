import React from "react";
import './Menu3D.scss'

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

export default function Menu(props) {

  let scene, camera, renderer, hemiLight, spinner, spinnerGroup, shouldRotate, rotationDir;
  let canInput = true;

  const init = () => {

    // create scene and set background
    scene = new THREE.Scene();
    scene.background = new THREE.Color( '#2e2e2e' );

    // add camera
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 25, 35);

    // lighting
    hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1.5);
    scene.add(hemiLight);


    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    const light = new THREE.DirectionalLight( 0xFFFFFF, 1 );
    light.position.set(0, 25, 30);
    scene.add( light );

    //----------------------------
    // --- helpers for testing ---
    //----------------------------
    // scene.add(new THREE.AxesHelper(500));
    // const controls = new OrbitControls( camera, renderer.domElement );

    // ----------------------------
    // --- custom model loading ---
    // ----------------------------
    
    // new group for spinner models
    spinnerGroup = new THREE.Group();

    // head model
    var loader = new GLTFLoader();
    loader.load('puzz_head_v2.gltf', function(gltf) {
      var object = gltf.scene;
      object.position.set(0.5, 12, -5.5);
      object.scale.set(0.5, 0.5, 0.5);
      object.rotation.x -= 0.07; // adjust rotation for imported model (blender issue)
      scene.add(object);
    });

    // base model
    loader.load('puzz_base_v2.gltf', function(gltf) {
      var object = gltf.scene;
      object.position.set(0.2, 15, -5.5);
      object.scale.set(0.5, 0.5, 0.5);
      object.rotation.x -= 0.07; // adjust rotation for imported model (blender issue)
      scene.add(object);
    });

    // middle spinner
    const geometry = new THREE.CylinderGeometry( 8.5, 8.5, 4, 64 );
    const material = new THREE.MeshNormalMaterial( {color: 0x0095DD} );
    spinner = new THREE.Mesh( geometry, material );
    spinner.position.set(0, 24.8, 0);
    spinner.rotation.y += (Math.PI / 6); // set initial rotation so there is a flat side facing forward

    // add to spinner group
    spinnerGroup.add(spinner);

    //-----------------
    //--- Menu Text ---
    //-----------------

    // custom font loader
    const fontLoader = new FontLoader();
    const ttfLoader = new TTFLoader();
    ttfLoader.load('fonts3D/jet_brains_mono_regular.ttf', (json) => {
      // parse the custom font
      const jetBrainsFont = fontLoader.parse(json);

      // Use parsed font as normal text geometry
      const textGeometry = new TextGeometry('Pzzl     Gzzl', {
        height: 2,
        size: 8,
        font: jetBrainsFont,
      });
      const textMaterial = new THREE.MeshNormalMaterial();
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.x = -43;
      textMesh.position.y = 25;
      textMesh.position.z = -10;
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
      const textMaterial = new THREE.MeshLambertMaterial();
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
      const textMaterial = new THREE.MeshLambertMaterial();
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
        console.log('enter pressed');
      }
    }
  });

  // rotation function for the animation loop
  const menuRotate = (rotate, direction) => {
    if (rotate && direction === 'right') {
      if (spinnerGroup.rotation.y < Math.PI) {
        spinnerGroup.rotation.y += (Math.PI / 12);
      } else {
        canInput = true;
        // console.log(spinnerGroup.rotation.y);
      }
    } else if (rotate && direction === 'left') {
      if (spinnerGroup.rotation.y > 0.01) {
        spinnerGroup.rotation.y -= (Math.PI / 12);
      } else {
        canInput = true;
        // console.log(spinnerGroup.rotation.y);
      }
    }
  };

  // animation loop, called once per frame
  function animate() {
    requestAnimationFrame(animate);
    menuRotate(shouldRotate, rotationDir);
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
  console.log(scene);

  return (
    <>
      <div className='menu-3d'></div>
      {/* <div id='menu-click'>
        <div></div>
      </div> */}
    </>
  );
}