import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(size.width, size.height);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

const house = new THREE.Group()
scene.add(house);

//地板
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({color: '#a9c388'})
)
floor.rotation.x = -Math.PI * 0.5
// floor.rotation.z = Math.PI * 0.3
floor.rotation.reorder('XYZ')
floor.position.y = 0
house.add(floor);

//墙
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 3, 4),
    new THREE.MeshStandardMaterial({color: "#ac8e82"})
)
// walls.rotation.x = -Math.PI * 0.4
// walls.rotation.z = Math.PI * 0.3
floor.position.y = -1.5
house.add(walls)

//房顶
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({color: "#b35f45"})
)
roof.position.y = 2
roof.rotation.y = Math.PI * 0.25
house.add(roof)

//门
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial({color: "#aa7b7b"})
)
door.position.y = -0.5
door.position.z = 2 + 0.01
house.add(door)


//坟墓
const graves = new THREE.Group()

const graveMaterial = new THREE.MeshStandardMaterial({color: "#b2b6b1"})
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)

for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 5;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, -1, z)
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4

    graves.add(grave)
}
house.add(graves)
//灌丛
const bush1 = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshStandardMaterial({color: "#89c854"})
)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(1, -1.3, 2.2)

const bush2 = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshStandardMaterial({color: "#89c854"})
)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.6, -1.4, 2.2)

const bush3 = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshStandardMaterial({color: "#89c854"})
)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-1, -1.4, 2.2)
const bush4 = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshStandardMaterial({color: "#89c854"})
)
bush4.scale.set(0.2, 0.2, 0.2)
bush4.position.set(-1.5, -1.4, 2.2)

house.add(bush1, bush2, bush3, bush4)

const light = new THREE.AmbientLight("#b9d5ff", 0.12);
scene.add(light);

const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
moonLight.position.set(4, 5, -2)
scene.add(moonLight)

const doorLight=new THREE.PointLight("#ff7d46",5,100)
doorLight.position.set(0,1,2.7)
scene.add(doorLight)

// scene.position.set(1, 0, 2)
camera.position.set(1, 2, 12)
const controls = new OrbitControls(camera, canvas)

// const clock = new THREE.Clock();
const tick = () => {
    // const elapsedTime = clock.getElapsedTime();
    // cube.position.x = Math.cos(elapsedTime);
    // cube.position.z = Math.sin(elapsedTime);
    // cube.position.y = Math.abs(Math.sin(elapsedTime * 3))
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(tick);
}
tick()
