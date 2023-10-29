import "./Background.css";
import * as THREE from "three";

import { useEffect, useRef, useState } from "react";

function Background() {
  const refContainer = useRef(null);

  useEffect(() => {
    //Handle resize
    function onWindowResize() {
      const newWidth = window.innerWidth;
      const newHeight = document.getElementById("titleHomeScreen").offsetHeight;

      renderer.setSize(newWidth, newHeight);

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    }

    window.addEventListener("resize", onWindowResize, false);

    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / (window.innerHeight / 3),
      0.1,
      1000
    );
    var renderer = new THREE.WebGLRenderer();

    renderer.setSize(
      window.innerWidth,
      document.getElementById("titleHomeScreen").offsetHeight
    );

    // // document.body.appendChild( renderer.domElement );
    // // use ref as a mount point of the Three.js scene instead of the document.body

    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);

    scene.background = new THREE.Color("#331832");

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshPhongMaterial({ color: "blue" });
    var cube = new THREE.Mesh(geometry, material);

    geometry = new THREE.CapsuleGeometry(1, 2, 4, 8);
    material = new THREE.MeshPhongMaterial({ color: 0xdecdf5 });
    const capsule = new THREE.Mesh(geometry, material);
    scene.add(capsule);
    scene.add(cube);

    camera.position.z = 5;
    cube.position.x = -2;

    var animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      //cube.rotation.y += 0.01;
      capsule.position.x += 0.01;
      capsule.rotation.x -= 0.01;

      renderer.render(scene, camera);
    };

    animate();
  }, []);
  return <div className="bg-3d" ref={refContainer}></div>;
}

export default Background;
