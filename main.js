import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
      import Stats from "https://unpkg.com/three@0.124.0/examples/jsm/libs/stats.module.js";
      import { OBJLoader } from "https://unpkg.com/three@0.124.0/examples/jsm/loaders/OBJLoader.js";

      let camera, scene, renderer, light1, object, stats;

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

        //model
        const loader = new OBJLoader();
        loader.load("./WaltHead.obj", function (obj) {
          object = obj;
          object.position.y = -30;
          scene.add(object);
        });

        const sphere = new THREE.SphereBufferGeometry(0.5, 16, 8);
        const spheremat = new THREE.MeshBasicMaterial({ color: 0xff0040 });
        const spheremesh = new THREE.Mesh(sphere, spheremat);

        //lights
        light1 = new THREE.PointLight(0xff0040, 2, 50);
        light1.add(spheremesh);
        scene.add(light1);

        //renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        //stats
        stats = new Stats();
        document.body.appendChild(stats.dom);
      }

      function render() {
        const time = Date.now() * 0.0005;
        const delta = clock.getDelta();

        if (object) object.rotation.y -= 0.5 * delta;

        light1.position.x = Math.sin(time * 0.7) * 30;
        light1.position.y = Math.cos(time * 0.5) * 40;
        light1.position.z = Math.cos(time * 0.3) * 30;

        renderer.render(scene, camera);
      }

      function animate() {
        requestAnimationFrame(animate);

        render();
        stats.update();
      }