import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// SCENE
const scene = new THREE.Scene()

// CAMERA
// angle radius, ratio, nearest visible, fartest visible 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)


// RENDERER
const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#background'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);


const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// LIGHTING
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight);


// SOME HELPER
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(lightHelper, gridHelper)

// CONTROLLER
const controller = new OrbitControls(camera, renderer.domElement)


// CREATING RANDOM STAR
function addStar(){
    function createStarObj(){
        const geometry = new THREE.SphereGeometry(0.3, 10, 10);
        const material = new THREE.MeshStandardMaterial({color: 0xffffff});
        const star = new THREE.Mesh(geometry, material);

        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
        star.position.set(x, y, z);
        scene.add(star)

    }

    Array(150).fill().forEach(createStarObj)
}

addStar()

// Infinite loop Animation
function animate(){
    requestAnimationFrame(animate);

    torus.rotateX(0.01);
    torus.rotateY(0.005);
    torus.rotateZ(0.01);

    controller.update()
    renderer.render(scene, camera);
}

animate()