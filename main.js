import './style.css';

import * as THREE from 'three';

// SCENE
const scene = new THREE.Scene()

// CAMERA
// angle radius, ratio, nearest visible, fartest visible 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)


// RENDERER