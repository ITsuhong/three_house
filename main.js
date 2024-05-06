import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
/**
 * 门的纹理
 */
import DoorColorTexture from "./assets/textures/door/color.jpg";
import DoorAlphaTexture from "./assets/textures/door/alpha.jpg";
import DoorAmbientOcclusionTexture from "./assets/textures/door/ambientOcclusion.jpg";
import DoorHeightTexture from "./assets/textures/door/height.jpg";
import DoorNormalTexture from "./assets/textures/door/normal.jpg";
import DoorMetalnessTexture from "./assets/textures/door/metalness.jpg";
import DoorRoughnessTexture from "./assets/textures/door/roughness.jpg";

import BricksColorTexture from "./assets/textures/bricks/color.jpg";
import BricksAmbientOcclusionTexture from "./assets/textures/bricks/ambientOcclusion.jpg";
import BricksNormalTexture from "./assets/textures/bricks/normal.jpg";
import BricksRoughnessTexture from "./assets/textures/bricks/roughness.jpg";

import GrassColorTexture from "./assets/textures/grass/color.jpg";
import GrassAmbientOcclusionTexture from "./assets/textures/grass/ambientOcclusion.jpg";
import GrassNormalTexture from "./assets/textures/grass/normal.jpg";
import GrassRoughnessTexture from "./assets/textures/grass/roughness.jpg";

const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load(DoorColorTexture);
const doorAlphaTexture = textureLoader.load(DoorAlphaTexture);
const doorAmbientOcclusionTexture = textureLoader.load(DoorAmbientOcclusionTexture);
const doorHeightTexture = textureLoader.load(DoorHeightTexture);
const doorNormalTexture = textureLoader.load(DoorNormalTexture);
const doorMetalnessTexture = textureLoader.load(DoorMetalnessTexture);
const doorRoughnessTexture = textureLoader.load(DoorRoughnessTexture);

const bricksColorTexture = textureLoader.load(BricksColorTexture);
const bricksAmbientOcclusionTexture = textureLoader.load(BricksAmbientOcclusionTexture);
const bricksNormalTexture = textureLoader.load(BricksNormalTexture);
const bricksRoughnessTexture = textureLoader.load(BricksRoughnessTexture);

const grassColorTexture = textureLoader.load(GrassColorTexture);
const grassAmbientOcclusionTexture = textureLoader.load(GrassAmbientOcclusionTexture);
const grassNormalTexture = textureLoader.load(GrassNormalTexture);
const grassRoughnessTexture = textureLoader.load(GrassRoughnessTexture);

grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;


const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(size.width, size.height);
renderer.setClearColor("#262837")

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
//雾
const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog


//幽灵灯光
const ghost1 = new THREE.PointLight("#ff00ff", 2, 3);
// ghost1.position.set(3, 0, 0);
scene.add(ghost1);
const ghost2 = new THREE.PointLight("#00ffff", 2, 3);
scene.add(ghost2);
const ghost3 = new THREE.PointLight("#ffff00", 2, 3);
scene.add(ghost3);


const house = new THREE.Group()
scene.add(house);

//地板
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
)
floor.geometry.setAttribute("uv2", new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2));
floor.rotation.x = -Math.PI * 0.5
// floor.rotation.z = Math.PI * 0.3
floor.rotation.reorder('XYZ')
floor.position.y = 0
house.add(floor);

//墙
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 3, 4),
    new THREE.MeshStandardMaterial({
        color: "#ac8e82",
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
walls.geometry.setAttribute("uv2", new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2));
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
const doorMaterial = new THREE.MeshStandardMaterial();
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2.2, 2),
    doorMaterial
)
doorMaterial.map = doorColorTexture; // 颜色贴图
doorMaterial.aoMap = doorAmbientOcclusionTexture; // 环境遮挡贴图
doorMaterial.aoMapIntensity = 1; // 环境遮挡贴图强度
doorMaterial.displacementMap = doorHeightTexture; // 位移贴图
doorMaterial.displacementScale = 0.01; // 位移贴图强度
doorMaterial.metalnessMap = doorMetalnessTexture; // 金属度贴图
doorMaterial.roughnessMap = doorRoughnessTexture; // 粗糙度贴图
doorMaterial.normalMap = doorNormalTexture; // 法线贴图
doorMaterial.transparent = true; // 透明
doorMaterial.alphaMap = doorAlphaTexture; // 透明度贴图

door.geometry.setAttribute("uv2", new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2));
door.position.y = -0.5
door.position.z = 2 + 0.01
house.add(door)


//坟墓
const graves = new THREE.Group()

const graveMaterial = new THREE.MeshStandardMaterial({color: "#b2b6b1"})
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)

for (let i = 0; i < 80; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 5;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    grave.position.set(x, -1, z)
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.castShadow = true;
    graves.add(grave)
}
house.add(graves)
//灌丛
const bushMaterial = new THREE.MeshStandardMaterial({
    color: "#89c854",
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture
});
const bush1 = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    bushMaterial
)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(1, -1.3, 2.2)

const bush2 = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    bushMaterial
)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.6, -1.4, 2.2)

const bush3 = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    bushMaterial
)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-1, -1.4, 2.2)
const bush4 = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    bushMaterial
)
bush4.scale.set(0.2, 0.2, 0.2)
bush4.position.set(-1.5, -1.4, 2.2)

house.add(bush1, bush2, bush3, bush4)

const light = new THREE.AmbientLight("#b9d5ff", 0.12);
scene.add(light);

const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
moonLight.position.set(4, 5, -2)
scene.add(moonLight)

const doorLight = new THREE.PointLight("#ff7d46", 5, 100)
doorLight.position.set(0, 1, 2.7)
scene.add(doorLight)

//阴影
renderer.shadowMap.enabled = true
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;
doorLight.castShadow = true;
light.castShadow = true;
floor.castShadow = true;
door.castShadow = true;
walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;
floor.receiveShadow = true;

//优化阴影性能
doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 1;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;
// scene.position.set(1, 0, 2)
camera.position.set(1, 2, 12)
const controls = new OrbitControls(camera, canvas)

const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.x = Math.sin(ghost1Angle) * 4;
    ghost1.position.z = Math.cos(ghost1Angle) * 4;
    ghost1.position.y = Math.sin(elapsedTime * 3);

    const ghost2Angle = -elapsedTime * 0.32;
    ghost2.position.x = Math.sin(ghost2Angle) * 5;
    ghost2.position.z = Math.cos(ghost2Angle) * 5;
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    const ghost3Angle = -elapsedTime * 0.18;
    ghost3.position.x = Math.sin(ghost3Angle) * 4 + (Math.sin(elapsedTime * 0.32) + 3);
    ghost3.position.z = Math.cos(ghost3Angle) * 4 + (Math.sin(elapsedTime * 0.32) + 3);
    ghost3.position.y = Math.sin(elapsedTime * 5) + Math.sin(elapsedTime * 2.5);

    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(tick);
}
tick()
