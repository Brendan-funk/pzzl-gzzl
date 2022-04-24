import React from "react";
import './Menu3D.scss'

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

export default function Menu(props) {

  let scene, camera, renderer, cube, hemiLight, spinner, spinnerGroup;

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

    //----------------------------
    // --- helpers for testing ---
    //----------------------------
    // scene.add(new THREE.AxesHelper(500));
    // const controls = new OrbitControls( camera, renderer.domElement );
    

    // renderer = new THREE.WebGLRenderer();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    const light = new THREE.DirectionalLight( 0xFFFFFF, 1 );
    light.position.set(0, 25, 30);
    const helper = new THREE.DirectionalLightHelper( light, 5 );
    scene.add( light );

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

    // part 2 - true type font loader
    const fontLoader = new FontLoader();
    const ttfLoader = new TTFLoader();
    ttfLoader.load('fonts3D/jet_brains_mono_regular.ttf', (json) => {
      // First parse the font.
      const jetBrainsFont = fontLoader.parse(json);
      // Use parsed font as normal.
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
      scene.add( textMesh );
    });

    ttfLoader.load('fonts3D/jet_brains_mono_regular.ttf', (json) => {
      // First parse the font.
      const jetBrainsFont = fontLoader.parse(json);
      // Use parsed font as normal.
      const textGeometry = new TextGeometry('SUDOKU', {
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

    // add group to scene
    scene.add(spinnerGroup);
  };

  window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") {
      spinnerGroup.rotation.y += (Math.PI / 24);
    } else if (e.key === "ArrowLeft") {
      spinnerGroup.rotation.y -= (Math.PI / 24);
    }
  });

  function animate() {
    requestAnimationFrame(animate);

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
    <div className='menu-3d'></div>
  );
}