import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const params = new URLSearchParams(location.search);
const modelPath = './models/' + (params.get('model') || 'm4_viewmodel_web.glb');
const animIndex = Number(params.get('anim') || '0');

window.__THREE = THREE;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x151b20);
scene.fog = new THREE.Fog(0x151b20, 8, 40);

const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.01, 200);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const hemi = new THREE.HemisphereLight(0xbcd4e8, 0x202024, 1.4);
scene.add(hemi);
const key = new THREE.DirectionalLight(0xffe2c0, 3.2);
key.position.set(3, 5, 4);
key.castShadow = true;
scene.add(key);
const rim = new THREE.DirectionalLight(0x7fb8ff, 2.4);
rim.position.set(-4, 2, -3);
scene.add(rim);
const fill = new THREE.DirectionalLight(0xffffff, 0.7);
fill.position.set(0, -3, 2);
scene.add(fill);

const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshStandardMaterial({ color: 0x1c2125, roughness: 0.9 }));
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

const grid = new THREE.GridHelper(40, 40, 0x334455, 0x222a30);
scene.add(grid);

const hud = document.getElementById('hud');
const loader = new GLTFLoader();
loader.load(modelPath, (gltf) => {
  const model = gltf.scene;
  scene.add(model);
  model.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  let meshCount = 0, triCount = 0, mats = new Set(), texs = new Set();
  model.traverse((o) => {
    if (o.isMesh) {
      meshCount++;
      const g = o.geometry;
      if (g.index) triCount += g.index.count / 3;
      else if (g.attributes.position) triCount += g.attributes.position.count / 3;
      const ms = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of ms) {
        mats.add(m.name);
        for (const k of ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'emissiveMap']) {
          if (m[k]) texs.add(m[k].uuid);
        }
      }
    }
  });
  hud.textContent = [
    `model: ${modelPath}`,
    `size: ${size.x.toFixed(3)} × ${size.y.toFixed(3)} × ${size.z.toFixed(3)}`,
    `min: ${box.min.toArray().map(v => v.toFixed(3)).join(', ')}`,
    `max: ${box.max.toArray().map(v => v.toFixed(3)).join(', ')}`,
    `center: ${center.toArray().map(v => v.toFixed(3)).join(', ')}`,
    `meshes: ${meshCount}  tris: ${Math.round(triCount)}`,
    `materials: ${[...mats].join(', ')}`,
    `textures: ${texs.size}`,
    `animations: ${gltf.animations.map(a => `${a.name} (${a.duration.toFixed(2)}s)`).join(', ')}`,
  ].join('\n');

  const maxDim = Math.max(size.x, size.y, size.z);
  const dist = maxDim * 1.8;
  const target = center.clone();
  controls.target.copy(target);
  const views = {
    three: new THREE.Vector3(1, 0.55, 1).normalize().multiplyScalar(dist).add(target),
    front: new THREE.Vector3(0, 0.15, 1).normalize().multiplyScalar(dist).add(target),
    side: new THREE.Vector3(1, 0.15, 0).normalize().multiplyScalar(dist).add(target),
    top: new THREE.Vector3(0.01, 1, 0.01).normalize().multiplyScalar(dist).add(target),
  };
  camera.position.copy(views.three);
  camera.lookAt(target);
  controls.update();
  document.querySelectorAll('button[data-view]').forEach((b) => {
    b.onclick = () => {
      camera.position.copy(views[b.dataset.view]);
      controls.target.copy(target);
      controls.update();
    };
  });

  let mixer = null;
  if (gltf.animations.length) {
    mixer = new THREE.AnimationMixer(model);
    const clip = gltf.animations[Math.min(animIndex, gltf.animations.length - 1)];
    const action = mixer.clipAction(clip);
    action.play();
    const tParam = params.get('t');
    if (tParam !== null) {
      action.paused = true;
      action.time = Number(tParam);
      mixer.update(0);
    }
    const clock = new THREE.Clock();
    const tick = () => {
      mixer.update(clock.getDelta());
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick();
  } else {
    const tick = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick();
  }
  window.viewer = { scene, camera, controls, model, gltf, renderer, mixer, actions: mixer?._actions, THREE };
}, undefined, (err) => {
  hud.textContent = 'ERROR: ' + err;
});

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
