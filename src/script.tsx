import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

console.log("Hello, Three.js with TypeScript!");

// --- Canvas Setup ---
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

// --- Scene Setup ---
const scene = new THREE.Scene();

// --- Setup Axes Helper ---
// const axesHelper = new THREE.AxesHelper(2)
// scene.add(axesHelper)

// --- Objects ---
const material = new THREE.MeshStandardMaterial({
    roughness : 0.1
})

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 16, 0),
    material
)
sphere.position.x = -3
scene.add(sphere)

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1),
    material
)
scene.add(cube)

const donut = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.3, 12, 48),
    material
)
donut.position.x = 3
scene.add(donut)

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 12),
    material
)
plane.position.y = -2
plane.rotation.x = -(Math.PI/2)
scene.add(plane)

// --- Lights ----
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 1)
scene.add(pointLight)

// --- Camera Setup ---
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight);
camera.position.z = 5
scene.add(camera)

// --- Controls ---
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// --- Renderer Setup ---
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// --- Resize ---
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})

// --- Render Loop ---
let clock = new THREE.Clock()

function animate(){
    // Clock
    const eslapsedTime = clock.getElapsedTime()

    // Animation
    sphere.rotation.x = 0.1 * eslapsedTime
    cube.rotation.x = 0.1 * eslapsedTime
    donut.rotation.x = 0.1 * eslapsedTime
    sphere.rotation.y = - 0.15 * eslapsedTime
    cube.rotation.y = - 0.15 * eslapsedTime
    donut.rotation.y = - 0.15 * eslapsedTime

    controls.update()
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate)
}
animate()
