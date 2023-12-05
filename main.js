import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import Stats from "https://unpkg.com/three@0.124.0/examples/jsm/libs/stats.module.js";
import { OBJLoader } from "https://unpkg.com/three@0.124.0/examples/jsm/loaders/OBJLoader.js";

let camera, scene, renderer, lights, object, stats;

const clock = new THREE.Clock();

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 100;

  scene = new THREE.Scene();

  const loader = new OBJLoader();
  loader.load("./WaltHead.obj", function (obj) {
    object = obj;
    object.position.y = -10;

    obj.scale.set(0.6, 0.6, 0.6);
    scene.add(object);
  });

  lights = [];
  for (let i = 0; i < 5; i++) {
    const sphere = new THREE.SphereBufferGeometry(0.5, 16, 8);
    const spheremat = new THREE.MeshBasicMaterial({ color: 0xff0040 });
    const spheremesh = new THREE.Mesh(sphere, spheremat);

    const light = new THREE.PointLight(0xff0040, 2, 40);
    light.add(spheremesh);

    scene.add(light);
    lights.push({ light, mesh: spheremesh });
  }

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  stats = new Stats();
  document.body.appendChild(stats.dom);
}

function render() {
  const time = Date.now() * 0.0005;
  const delta = clock.getDelta();

  if (object) object.rotation.y -= 0.8 * delta;

  lights.forEach((lightObj, index) => {
    const offset = index * Math.PI * 2 / 3;

    lightObj.light.position.x = Math.sin(time * 0.7 + offset) * 25;
    lightObj.light.position.y = Math.cos(time * 0.5 + offset) * 35;
    lightObj.light.position.z = Math.cos(time * 0.3 + offset) * 25;
  });

  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);

  render();
  stats.update();
}