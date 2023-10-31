import "./Background.css";
import * as THREE from "three";
import gsap from "gsap";

import { useEffect, useRef, useState } from "react";

function Background() {
  const refContainer = useRef(null);

  useEffect(() => {
    // Handle resize of Canvas
    function onWindowResize() {
      const newWidth = window.innerWidth;
      const newHeight = document.getElementById("titleHomeScreen").offsetHeight;

      renderer.setSize(newWidth, newHeight);

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    }

    window.addEventListener("resize", onWindowResize, false);

    const mouse = {
      x: undefined,
      y: undefined,
    };
    window.addEventListener("mousemove", (event) => {
      const h = document.getElementById("titleHomeScreen").offsetHeight;
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / h) * 2 + 1;
    });

    // === THREE.JS CODE START ===
    const raycaster = new THREE.Raycaster();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / (window.innerHeight / 3),
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(
      window.innerWidth,
      document.getElementById("titleHomeScreen").offsetHeight
    );

    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);

    // ========= SCENE LOOK ==========
    scene.background = new THREE.Color("#331832");
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 1);
    scene.add(light);

    // Plane declaration
    const geometry = new THREE.PlaneGeometry(19, 15, 19, 17);
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      flatShading: true,
      vertexColors: true,
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Add volume
    const { array, count } = plane.geometry.attributes.position;
    for (let i = 0; i < array.length; i += 3) {
      const x = array[i];
      const y = array[i + 1];
      const z = array[i + 2];
      array[i] = x + Math.random() - 0.5;
      array[i + 1] = y + Math.random() - 0.5;

      array[i + 2] = z + Math.random();
    }

    plane.geometry.attributes.position.originalPosition = array;

    // Choose base color for the plane
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(0.2, 0.09, 0.2);
    }

    plane.geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(new Float32Array(colors), 3)
    );

    // camera and animation
    camera.position.z = 3;

    const changeVertColor = (inters, pl, color) => {
      // vert 1
      pl.setX(inters[0].face.a, color.r);
      pl.setY(inters[0].face.a, color.g);
      pl.setZ(inters[0].face.a, color.b);

      // vert 2
      pl.setX(inters[0].face.b, color.r);
      pl.setY(inters[0].face.b, color.g);
      pl.setZ(inters[0].face.b, color.b);

      // vert 3
      pl.setX(inters[0].face.c, color.r);
      pl.setY(inters[0].face.c, color.g);
      pl.setZ(inters[0].face.c, color.b);
      pl.needsUpdate = true;
    };

    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);

      // Hover color change
      raycaster.setFromCamera(mouse, camera);
      const inters = raycaster.intersectObject(plane);
      if (inters.length > 0) {
        const { color } = inters[0].object.geometry.attributes;
        const innitialColor = {
          r: 0.2,
          g: 0.09,
          b: 0.2,
        };
        const hoverColor = {
          r: 0.53,
          g: 1,
          b: 0.52,
        };

        changeVertColor(inters, color, innitialColor);
        gsap.to(hoverColor, {
          r: innitialColor.r,
          g: innitialColor.g,
          b: innitialColor.b,
          onUpdate: () => {
            changeVertColor(inters, color, hoverColor);
          },
        });
      }
    };

    animate();
  }, []);
  return <div className="bg-3d" ref={refContainer}></div>;
}

export default Background;
