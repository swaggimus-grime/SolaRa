import './style.css';
import * as THREE from 'three';
import AstralBody from './astralBody'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 4000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 50;

renderer.render(scene, camera);

const sunScale = 15;
const y = 20;
const z = 20;
const sun = new AstralBody(sunScale, 'res\\sun');
sun.position.set(30, y, z);
scene.add(sun);

const mercury = new AstralBody(sunScale/22.7, 'res\\mercury');
mercury.position.set(100, y, z);
scene.add(mercury);

const venus = new AstralBody(sunScale/11.5, 'res\\venus');
venus.position.set(140, y, z);
scene.add(venus);

const eTex = new THREE.TextureLoader().load('res\\earth\\diffuse.png');
const eMat = new THREE.MeshStandardMaterial({map: eTex});
const eGeometry = new THREE.CircleGeometry(sunScale/10.9, 16);
const earth = new THREE.Mesh(eGeometry, eMat);
earth.rotation.x = Math.PI / 2 - 0.5;
earth.position.set(180, y, z);
scene.add(earth);

const mars = new AstralBody(sunScale/20.7, 'res\\mars');
mars.position.set(200, y, z);
scene.add(mars);

const jupiter = new AstralBody(sunScale/1.1, 'res\\jupiter');
jupiter.position.set(300, y, z);
scene.add(jupiter);

const saturn = new AstralBody(sunScale/1.2, 'res\\saturn');
saturn.position.set(400, y, z);
scene.add(saturn);

const ringTex = new THREE.TextureLoader().load('res\\saturn_ring\\diffuse.png');
const ringMat = new THREE.MeshStandardMaterial({map: ringTex});
const ringGeometry = new THREE.RingGeometry(5 + sunScale/1.2, 10 + sunScale/1.2, 64);
var pos = ringGeometry.attributes.position;
var v3 = new THREE.Vector3();
for (let i = 0; i < pos.count; i++){
    v3.fromBufferAttribute(pos, i);
    ringGeometry.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
}
const ring = new THREE.Mesh(ringGeometry, ringMat);
ring.position.set(400, y + 5, z);
ring.rotation.x = -Math.PI / 2 + 0.5;
scene.add(ring);

const uranus = new AstralBody(sunScale/2.74, 'res\\uranus');
uranus.position.set(500, y, z);
scene.add(uranus);

const neptune = new AstralBody(sunScale/2.77, 'res\\neptune');
neptune.position.set(550, y, z);
scene.add(neptune);

function moveCamera(pos) {
  camera.position.set(pos.x, pos.y, pos.z);
  camera.position.z += 20;
}

const origin = new THREE.Vector3(0, 0, 0);
moveCamera(origin);
let li = document.getElementsByTagName("a");
let sec = document.getElementsByTagName("section");
for(let i = 0; i < li.length; i++) {
  li[i].addEventListener("click", e => {
    sec[i].scrollIntoView();
    e.preventDefault();

    const id = e.target.attributes.id.value;
    if(id == 'main')
      moveCamera(origin);
    else
      moveCamera(eval(id).position);   
  });
}

// Lights

const pointLight = new THREE.PointLight(0xffffff);
const sunPos = sun.position;
pointLight.position.set(sunPos.x, sunPos.y, sunPos.z);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(3000).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('res\\space.png');
scene.background = spaceTexture;

function rotateBodies() {
  const scale = 0.005
  sun.rotation.y += scale * 1/27;
  mercury.rotation.y += scale * 1/58;
  venus.rotation.y += scale * 1/243;
  earth.rotation.z += scale * 1/.9972;
  mars.rotation.y += scale * 1/1.025;
  ring.rotation.z += scale * 1/.44;
  jupiter.rotation.y += scale * 1/.413;
  saturn.rotation.y += scale * 1/.44;
  uranus.rotation.y += scale * 1/.718;
  neptune.rotation.y += scale * 1/.67;
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  rotateBodies();
  renderer.render(scene, camera);
}

animate();