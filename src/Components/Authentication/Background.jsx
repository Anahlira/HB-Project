import "./Background.css";
import * as THREE from "three";
import gsap from "gsap";

import { useEffect, useRef } from "react";

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
    const light = new THREE.DirectionalLight(0xffffff, 0.7);
    light.position.set(0, -1, 2);
    scene.add(light);
    const backLight = new THREE.DirectionalLight(0xffffff, 1);
    backLight.position.set(0, 0, -1);
    scene.add(backLight);

    // Camera
    camera.position.z = 4;

    // Plane declaration
    const geometry = new THREE.PlaneGeometry(50, 50, 30, 30);
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

    // animation

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

    let frame = 0;
    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);

      // Movement
      frame += 0.01;
      const { array, originalPosition } = plane.geometry.attributes.position;
      for (let i = 0; i < array.length; i += 6) {
        // x
        array[i] = originalPosition[i] + Math.cos(frame) * 0.005;

        // y
        array[i + 1] = originalPosition[i + 1] + Math.sin(frame) * 0.001;
      }
      plane.geometry.attributes.position.needsUpdate = true;

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
        // smooth stransition from hover color
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
