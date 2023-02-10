import * as Three from "three";
import "./style.css";

const scene = new Three.Scene();

//creating the sphere
const geometry = new Three.SphereGeometry(3, 64, 64);
const material = new Three.MeshStandardMaterial({
  color: "red",
});

const mesh = new Three.Mesh(geometry, material);

scene.add(mesh);

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//lght
const light = new Three.PointLight("white", 1, 100);
light.position.set(10, -10, 10);
scene.add(light);

//camera
const camera = new Three.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);

//Render
const canvas = document.querySelector(".webgl");
const renderer = new Three.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//Resizing window
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

var loopstate = "reduce";

const loop = () => {
  if (camera.position.z > 70) {
    loopstate = "enlarge";
  } else if (camera.position.z < 20) {
    loopstate = "reduce";
  }

  loopstate === "reduce"
    ? (camera.position.z += 0.1)
    : (camera.position.z -= 0.1);

  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
