import * as T from "./lib/three.min.js";

const cnv = document.getElementById("background-canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ canvas: cnv, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sphereGeometry = new THREE.SphereGeometry(0.5, 10, 10);
const wireframe = new THREE.WireframeGeometry(sphereGeometry);
const sphere = new THREE.LineSegments(wireframe);
sphere.material.color.setHex(0x000000);
scene.add(sphere);

/*
TODO
- function to create sphere
- click creates a new sphere random position
- draws line between sphere and another sphere
- get wind direction in london
- push spheres that direction
*/

const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = [];
points.push(new THREE.Vector3(0, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(lineGeometry, lineMaterial);
scene.add(line);

const getCenter = (geometry) => {
  geometry.computeBoundingBox();
  var center = new THREE.Vector3();
  geometry.boundingBox.getCenter(center);
  return center;
};

const lineObjectToMouse = (line, obj, mouse) => {
  const newStart = getCenter(obj);
  const newEnd = new THREE.Vector3(mouse.y, mouse.y, 0);
  const positions = line.attributes.position.array;
  positions[0] = newStart;
  positions[1] = newEnd;
};

camera.position.z = 5;

const mouse = { x: 0, y: 0 };
document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
