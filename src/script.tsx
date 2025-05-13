import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper" 

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
// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

// Directional Light
const directionalLight = new THREE.DirectionalLight("pink", 1)
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)

// Hemisphere Light
const hemisphereLight = new THREE.HemisphereLight("red", "blue", 1)
scene.add(hemisphereLight)

// Point Light
const pointLight = new THREE.PointLight("yellow", 3)
pointLight.position.y = 2
scene.add(pointLight)

// Rect Area Light
const rectAreaLight = new THREE.RectAreaLight(0xffffff, 3, 4, 2)
rectAreaLight.position.set(0,0,2)
rectAreaLight.lookAt(donut.position)
scene.add(rectAreaLight)

// Spot Light
const spotLight = new THREE.SpotLight(0xffffff, 5, 6, Math.PI/2, 0.25, 2)
spotLight.position.set(0, 2, 1)
scene.add(spotLight)

spotLight.target.position.x = 2.75
scene.add(spotLight.target)

// --- Light Helpers ---
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
const spotLightHelper = new THREE.SpotLightHelper(spotLight, 0.2)
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)

scene.add(hemisphereLightHelper, directionalLightHelper, pointLightHelper, spotLightHelper, rectAreaLightHelper)

// --- Debug UI ---
const gui = new GUI
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.01).name("Ambient Light Intensity")
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.01).name("Directional Light Intensity")
gui.add(hemisphereLight, 'intensity').min(0).max(1).step(0.01).name("Hemisphere Light Intensity")
gui.add(pointLight, 'intensity').min(0).max(10).step(0.01).name("Point Light Intensity")
gui.add(rectAreaLight, 'intensity').min(0).max(5).step(0.01).name("Rect Area Light Intensity")
gui.add(spotLight, 'intensity').min(0).max(5).step(0.01).name("Spot Light Intensity")

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
