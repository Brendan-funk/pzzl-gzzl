import React from "react";
import './Menu3D.scss'

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Menu(props) {

  let scene, camera, renderer, cube, hemiLight, spinner;

  const init = () => {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( '#2e2e2e' );
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 25, 35);

    // lighting
    hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 3);
    scene.add(hemiLight);

    // const geometry = new THREE.IcosahedronGeometry( 10, 1 );
    // const material = new THREE.MeshLambertMaterial( {color: 0x3b8fa8} );
    // cube = new THREE.Mesh( geometry, material );
    // cube.position.set(0, 25, 0);
    // // scene.add(cube);

    // right cube
    const geometry1 = new THREE.BoxGeometry(10, 10, 10);
    const material1 = new THREE.MeshLambertMaterial( {color: 0x6c7b94} );
    const cube1 = new THREE.Mesh( geometry1, material1 );
    cube1.position.set(15, 25, 0);
    scene.add(cube1);

    // left cube
    const geometry2 = new THREE.BoxGeometry(10, 10, 10);
    const material2 = new THREE.MeshLambertMaterial( {color: 0x6c7b94} );
    const cube2 = new THREE.Mesh( geometry2, material2 );
    cube2.position.set(-15, 25, 0);
    scene.add(cube2);

    scene.add(new THREE.AxesHelper(500));

    // renderer = new THREE.WebGLRenderer();
    renderer = new THREE.WebGLRenderer({

      alpha: true,
    
      antialias: true
    
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // custom model loading
    var loader = new GLTFLoader();
    loader.load('puzz_head_v2.gltf', function(gltf) {
      var object = gltf.scene;
      object.position.set(0, 15, 0);
      object.scale.set(0.5, 0.5, 0.5);
      // object.traverse((node) => {
      //   if (!node.isMesh) return;
      //   node.material.wireframe = true;
      // });
      scene.add(object);
    });

    // loader.load('puzz-spinner1.gltf', function(gltf) {
    //   spinner = gltf.scene;
    //   spinner.position.set(0, 18, 0);
    //   spinner.scale.set(1.5, 1.5, 1.5);
    //   // spinner.traverse((node) => {
    //   //   if (!node.isMesh) return;
    //   //   node.material.wireframe = true;
    //   // });
    //   scene.add(spinner);
    // });
  };

  window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") {
      spinner.rotation.y -= 1;
    } else if (e.key === "ArrowLeft") {
      spinner.rotation.y += 1;
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