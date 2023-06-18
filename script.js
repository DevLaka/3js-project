import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as dat from "dat.gui";
import gsap from "gsap";
import {
  AxesHelper,
  GridHelper,
  TextureLoader,
  WebGLMultisampleRenderTarget,
} from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

// Debug
const gui = new dat.GUI({ closed: true, width: 400 });
gui.hide();

const parameters = {
  color: 0xec9b3b,
  // spin: () => {
  //   gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 });
  // },
};

gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});

// gui.add(parameters, "spin");

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

// Helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

// Textures
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("assets/matcaps/matcap1.jpg");

// Fonts
const fontLoader = new THREE.FontLoader();
fontLoader.load("assets/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new THREE.TextBufferGeometry("Happy Birthday", {
    font: font,
    size: 0.7,
    height: 0.4,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  // textGeometry.computeBoundingBox();
  // textGeometry.translate(
  //   -textGeometry.boundingBox.max.x * 0.5,
  //   -textGeometry.boundingBox.max.y * 0.5,
  //   -textGeometry.boundingBox.max.z * 0.5
  // );
  // console.log(textGeometry.boundingBox);
  textGeometry.center();
  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  // textMaterial.wireframe = true;
  const text = new THREE.Mesh(textGeometry, material);
  text.position.z = 5.5;
  text.position.y = -1.8;
  text.rotation.y = 0.2;
  scene.add(text);

  const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);

  for (let i = 0; i < 100; i++) {
    const donut = new THREE.Mesh(donutGeometry, material);
    donut.position.x = (Math.random() - 0.5) * 20;
    donut.position.y = Math.random() * 40;
    donut.position.z = (Math.random() - 0.5) * 20;
    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    donut.scale.set(scale, scale, scale);
    scene.add(donut);
  }
});

fontLoader.load("assets/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new THREE.TextBufferGeometry("Thilini", {
    font: font,
    size: 1,
    height: 0.4,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  textGeometry.center();
  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  const text = new THREE.Mesh(textGeometry, material);
  text.position.z = 5.5;
  text.position.y = -3;
  text.rotation.y = 0.2;
  scene.add(text);
});

// Light
// const light1 = new THREE.DirectionalLight(0xffffff, 2);
// const light2 = new THREE.DirectionalLight(0xffffff, 2);
// const light3 = new THREE.DirectionalLight(0xffffff, 2);
// const light4 = new THREE.DirectionalLight(0xffffff, 2);
// const light5 = new THREE.DirectionalLight(0xffffff, 2);
// light1.position.set(2, 2, 5);
// light2.position.set(3, 3, 5);
// light3.position.set(4, 4, 5);
// light4.position.set(5, 5, 5);
// light5.position.set(6, 6, 5);
// scene.add(light1);
// scene.add(light2);
// scene.add(light3);
// scene.add(light4);
// scene.add(light5);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.01);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(20, 10, 20);
scene.add(directionalLight);
gui.add(directionalLight, "intensity").min(0).max(1).step(0.01);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight1.position.set(-20, 10, 20);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(-20, 10, -20);
scene.add(directionalLight2);

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight3.position.set(20, 10, -20);
scene.add(directionalLight3);

const directionalLight4 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight4.position.set(6, -5, 10);
scene.add(directionalLight4);

const directionalLight5 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight5.position.set(-6, -5, 10);
scene.add(directionalLight5);

// const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x000ff, 0.5);
// scene.add(hemisphereLight);
// gui.add(hemisphereLight, "intensity").min(0).max(1).step(0.01);

// const pointLight = new THREE.PointLight(0xff9000, 0.8, 50, 1);
// pointLight.position.set(0, -1, 5);
// scene.add(pointLight);
// gui.add(pointLight, "intensity").min(0).max(1).step(0.01);

// const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 50, 50, 50);
// rectAreaLight.position.set(-10, 0, 20);
// rectAreaLight.lookAt(new THREE.Vector3());
// scene.add(rectAreaLight);

// const spotLight = new THREE.SpotLight(
//   0x78ff00,
//   2,
//   40,
//   Math.PI * 0.1,
//   0.25,
//   0.5
// );
// spotLight.position.set(0, 10, 30);
// scene.add(spotLight);

// spotLight.target.position.x = -1;
// scene.add(spotLight.target);

// Helperes
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(
//   hemisphereLight,
//   2
// );
// scene.add( );

// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight,
//   2
// );
// scene.add(directionalLightHelper);

// const directionalLightHelper1 = new THREE.DirectionalLightHelper(
//   directionalLight1,
//   2
// );
// scene.add(directionalLightHelper1);

// const directionalLightHelper2 = new THREE.DirectionalLightHelper(
//   directionalLight2,
//   2
// );
// scene.add(directionalLightHelper2);

// const directionalLightHelper3 = new THREE.DirectionalLightHelper(
//   directionalLight3,
//   2
// );
// scene.add(directionalLightHelper3);

// const directionalLightHelper4 = new THREE.DirectionalLightHelper(
//   directionalLight4,
//   2
// );
// scene.add(directionalLightHelper4);

// const directionalLightHelper5 = new THREE.DirectionalLightHelper(
//   directionalLight5,
//   2
// );
// scene.add(directionalLightHelper5);

// // const pointLightHelper = new THREE.PointLightHelper(pointLight, 2);
// // scene.add(pointLightHelper);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

// const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
// scene.add(RectAreaLightHelper);

// Object
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: parameters.color });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.z = 5;
mesh.position.y = -2.5;
mesh.scale.set(7.5, 3, 0.3);
mesh.rotation.y = 0.2;
scene.add(mesh);

// Debug
// gui.add(mesh.position, "y", -3, 3, 0.01);
// gui.add(mesh.position, "x", -3, 3, 0.01);
// gui.add(mesh.position, "z", -3, 3, 0.01);

// gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
// gui.add(mesh.position, "x").min(-3).max(3).step(0.01);
// gui.add(mesh.position, "z").min(-3).max(3).step(0.01);

// gui.add(mesh, "visible");

// gui.add(material, "wireframe");

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullScreenElement;
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullScreen) {
      canvas.webkitRequestFullScreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullScreen) {
      document.webkitExitFullScreen();
    }
  }
});

// Perspective camera.
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);

const loader = new GLTFLoader();

loader.load(
  "./assets/cake/scene.gltf",
  function (gltf) {
    const cake = gltf.scene;
    cake.position.set(0, 0, 0);
    cake.scale.set(0.02, 0.02, 0.02);
    scene.add(cake);
    console.log(cake);
    console.log(scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

loader.load(
  "./assets/table/scene.gltf",
  function (gltf) {
    const table = gltf.scene;
    table.position.set(0, -6.2, 0);
    table.scale.set(100, 100, 100);
    scene.add(table);
    console.log(table);
    console.log(scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

loader.load(
  "./assets/flower/scene.gltf",
  function (gltf) {
    const flower = gltf.scene;
    flower.position.set(0, -3.2, 0);
    flower.scale.set(0.15, 0.15, 0.15);
    scene.add(flower);
    console.log(flower);
    console.log(scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

let baloonsRF, baloonsLF, baloonsM, baloonsLN, baloonsRN, baloonsRNT, baloonsLNT;

loader.load(
  "./assets/baloons/scene.gltf",
  function (gltf) {
    baloonsRF = gltf.scene;

    baloonsLF = baloonsRF.clone();
    baloonsM = baloonsRF.clone();
    baloonsLN = baloonsRF.clone();
    baloonsRN = baloonsRF.clone();
    baloonsRNT = baloonsRF.clone();
    baloonsLNT = baloonsRF.clone();

    baloonsRF.position.set(-18, 0, -5);
    baloonsLF.position.set(18, 0, -5);

    baloonsM.position.set(0, 20, -50);

    baloonsLN.position.set(15, 0, -30);
    baloonsRN.position.set(-15, 0, -30);
    baloonsRNT.position.set(-20, 20, -30);
    baloonsLNT.position.set(20, 20, -30);

    baloonsRF.scale.set(5, 5, 5);
    baloonsLF.scale.set(5, 5, 5);
    baloonsM.scale.set(5, 5, 5);
    baloonsLN.scale.set(5, 5, 5);
    baloonsRN.scale.set(5, 5, 5);
    baloonsRNT.scale.set(5, 5, 5);
    baloonsLNT.scale.set(5, 5, 5);

    scene.add(baloonsRF);
    scene.add(baloonsLF);
    scene.add(baloonsM);
    scene.add(baloonsLN);
    scene.add(baloonsRN);
    scene.add(baloonsRNT);
    scene.add(baloonsLNT);

    console.log(baloonsRF);
    console.log(scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

camera.position.z = 20;
// camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer.
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Clock.
const clock = new THREE.Clock();

// Animations.
const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // spotLightHelper.update();
  // rectAreaLightHelper.position.copy(rectAreaLight.position);
  // rectAreaLightHelper.quaternion.copy(rectAreaLight.quaternion);
  // rectAreaLightHelper.update();

  if (baloonsRF) {
    baloonsRF.position.x += (0.05 * Math.cos(elapsedTime));
  }
  if (baloonsLF) {
    baloonsLF.position.x -= (0.05 * Math.cos(elapsedTime));
  }
  if (baloonsM) {
    baloonsM.position.x -= (0.1 * Math.cos(elapsedTime));
  }
  if (baloonsLN) {
    baloonsLN.position.x -= (0.1 * Math.cos(elapsedTime));
  }
  if (baloonsRN) {
    baloonsRN.position.x += (0.1 * Math.cos(elapsedTime));
  }
  if (baloonsRNT) {
    baloonsRNT.position.x += (0.1 * Math.cos(elapsedTime));
  }
  if (baloonsLNT) {
    baloonsLNT.position.x += (0.1 * Math.cos(elapsedTime));
  }

  // Render.
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
