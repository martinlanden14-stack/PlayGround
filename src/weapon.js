import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { muzzleFlash as muzzleTexture } from './textures.js';

const V3 = THREE.Vector3;
const TMP = new V3();

/**
 * This animation pack stores every clip on a shared 10 second timeline, so each
 * clip has several seconds of dead air before its first keyframe. Three.js keeps
 * the full duration, which made the weapon appear frozen in a T-pose. Trim each
 * clip down to its real keyframe range and rebase the times to zero.
 */
function trimClip(clip) {
  let start = Infinity;
  let end = -Infinity;
  for (const track of clip.tracks) {
    const times = track.times;
    if (!times.length) continue;
    start = Math.min(start, times[0]);
    end = Math.max(end, times[times.length - 1]);
  }
  if (!Number.isFinite(start) || end <= start) return clip;
  const tracks = clip.tracks.map((track) => {
    const copy = track.clone();
    const times = new Float32Array(track.times.length);
    for (let i = 0; i < track.times.length; i++) times[i] = track.times[i] - start;
    copy.times = times;
    return copy;
  });
  return new THREE.AnimationClip(clip.name, end - start, tracks);
}

export class Weapon {
  constructor(renderer, camera, fx, audio) {
    this.renderer = renderer;
    this.camera = camera;
    this.fx = fx;
    this.audio = audio;
    this.viewScene = new THREE.Scene();
    this.viewCamera = new THREE.PerspectiveCamera(62, 1, 0.01, 8);
    this.viewCamera.position.set(0, 0, 0);
    this.magSize = 30;
    this.mag = 30;
    this.reserve = 180;
    this.reloading = false;
    this.reloadT = 0;
    this.reloadDuration = 1.8;
    this.cooldown = 0;
    this.fireInterval = 0.086;
    this.shots = 0;
    this.spread = 0;
    this.drawT = 0;
    this.drawing = false;
    this.recoil = 0;
    this.recoilRot = 0;
    this.sway = new THREE.Vector2();
    this.swayTarget = new THREE.Vector2();
    this.bobT = 0;
    this.flashT = 0;
    this.enabled = true;
    this.onAmmo = null;
    this.onHit = null;
    this.onShot = null;
    this.onReloadStart = null;
    this.onReloadEnd = null;
    this.aimAssist = true;
    this.isTouch = matchMedia('(pointer: coarse)').matches;
    this._raycaster = new THREE.Raycaster();
    this._buildLights();
  }

  _buildLights() {
    this.viewScene.environment = null;
    const amb = new THREE.AmbientLight(0x738696, 1.35);
    this.viewScene.add(amb);
    const key = new THREE.DirectionalLight(0xffb070, 3.4);
    key.position.set(1.2, 1.8, 1.5);
    this.viewScene.add(key);
    const rim = new THREE.DirectionalLight(0x6fb6d9, 3.0);
    rim.position.set(-1.6, 0.6, -1.2);
    this.viewScene.add(rim);
    const fill = new THREE.PointLight(0xffd9b0, 14, 4, 2);
    fill.position.set(0.35, 0.1, 0.25);
    this.viewScene.add(fill);
    this.viewLight = fill;

    // flash sprite + plane in view space
    const tex = muzzleTexture();
    this.flashMat = new THREE.SpriteMaterial({
      map: tex, color: 0xffd8a0, transparent: true, opacity: 0, depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.flashSprite = new THREE.Sprite(this.flashMat);
    this.flashSprite.scale.set(0.22, 0.22, 1);
    this.flashSprite.visible = false;
    this.flashLight = new THREE.PointLight(0xffb060, 0, 3, 2);
  }

  async load(onProgress) {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync('./models/m4_viewmodel_web.glb', (e) => {
      if (e.total) onProgress?.(e.loaded / e.total);
    });
    this.model = gltf.scene;
    this.animations = gltf.animations.map(trimClip);
    this.mixer = new THREE.AnimationMixer(this.model);
    this.actions = {};
    for (const clip of this.animations) {
      const a = this.mixer.clipAction(clip);
      this.actions[clip.name] = a;
      if (/^fire$/i.test(clip.name)) this.fireAction = a;
      else if (/^reload_empty$/i.test(clip.name)) this.reloadEmptyAction = a;
      else if (/^reload$/i.test(clip.name)) this.reloadAction = a;
      else if (/^draw$/i.test(clip.name)) this.drawAction = a;
      else if (/^holster$/i.test(clip.name)) this.holsterAction = a;
    }
    if (this.fireAction) {
      this.fireAction.setLoop(THREE.LoopOnce, 1);
      this.fireAction.clampWhenFinished = true;
      this.fireAction.timeScale = 2.8;
      // Pose the rig at the first firing frame so normalization measures the
      // weapon in its proper held orientation instead of the bind/T-pose.
      this.fireAction.reset().play();
      this.mixer.update(0);
    }
    for (const a of [this.reloadAction, this.reloadEmptyAction, this.drawAction, this.holsterAction]) {
      if (a) { a.setLoop(THREE.LoopOnce, 1); a.clampWhenFinished = true; }
    }
    if (this.reloadAction) this.reloadDuration = this.reloadAction.getClip().duration;
    this.mixer.addEventListener('finished', (e) => {
      if (e.action === this.reloadAction || e.action === this.reloadEmptyAction) {
        this._finishReload();
      }
    });

    this.model.traverse((o) => {
      if (!o.isMesh) return;
      o.castShadow = false;
      o.receiveShadow = false;
      o.frustumCulled = false;
      if (o.material) {
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        for (const m of mats) {
          const n = (m.name || '').toLowerCase();
          if (n.includes('m4')) {
            m.metalness = 0.42;
            m.roughness = 0.38;
            m.envMapIntensity = 2.1;
          } else if (n.includes('glove')) {
            m.metalness = 0.0;
            m.roughness = 0.88;
            m.envMapIntensity = 0.85;
          } else if (n.includes('hand')) {
            m.metalness = 0.0;
            m.roughness = 0.78;
            m.envMapIntensity = 0.85;
          } else if (n.includes('bullet')) {
            m.metalness = 0.9;
            m.roughness = 0.28;
            m.envMapIntensity = 1.4;
          }
          m.needsUpdate = true;
        }
      }
    });

    // Normalize against the rifle mesh only. The skinned arms have a huge bind
    // pose bounding box and previously shrank/pushed the weapon off-screen.
    this.model.updateMatrixWorld(true);
    let mainMesh = null;
    let fallback = null;
    let fallbackVolume = 0;
    this.model.traverse((o) => {
      if (!o.isMesh) return;
      if (/^Main_/i.test(o.name) || /^Main_/i.test(o.parent?.name || '')) mainMesh = o;
      const b = new THREE.Box3().setFromObject(o);
      const s = b.getSize(new V3());
      const volume = s.x * s.y * s.z;
      if (volume > fallbackVolume) { fallbackVolume = volume; fallback = o; }
    });
    const weaponMesh = mainMesh || fallback;
    const box = new THREE.Box3().setFromObject(weaponMesh || this.model);
    const size = box.getSize(new V3());
    const center = box.getCenter(new V3());
    const targetLength = 0.74;
    const scale = targetLength / Math.max(0.25, size.z);
    this.model.scale.setScalar(scale);
    this.model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    this.model.updateMatrixWorld(true);
    this.mixer.stopAllAction();

    this.holder = new THREE.Group();
    this.holder.add(this.model);
    this.basePos = new V3(0.17, -0.27, -0.67);
    this.baseRot = new THREE.Euler(-0.07, Math.PI + 0.2, 0.015);
    this.holder.position.copy(this.basePos);
    this.holder.rotation.copy(this.baseRot);
    this.viewScene.add(this.holder);

    const halfLength = targetLength * 0.5;
    this.muzzle = new THREE.Object3D();
    this.muzzle.position.set(-0.002, 0.015, -halfLength * 0.96);
    this.holder.add(this.muzzle);

    this.eject = new THREE.Object3D();
    this.eject.position.set(0.038, 0.028, -0.02);
    this.holder.add(this.eject);

    // Reparent the flash to the weapon so it tracks sway/recoil perfectly.
    this.holder.add(this.flashSprite, this.flashLight);
    this.flashSprite.position.copy(this.muzzle.position);
    this.flashLight.position.copy(this.muzzle.position);

    this.ready = true;
    return this;
  }

  attachEnvironment(env) {
    this.viewScene.environment = env;
    this.viewScene.environmentIntensity = 0.6;
  }

  start() {
    this.enabled = true;
    this.mag = this.magSize;
    this.reserve = 180;
    this.reloading = false;
    this.drawing = true;
    this.drawT = 0;
    this.mixer.stopAllAction();
    if (this.drawAction) {
      this.drawAction.reset().play();
      this.drawDuration = Math.min(1.2, this.drawAction.getClip().duration);
    } else {
      this.drawDuration = 0.5;
    }
    this.onAmmo?.(this.mag, this.reserve);
  }

  setEnabled(v) {
    this.enabled = v;
  }

  canFire() {
    return this.enabled && !this.reloading && !this.drawing && this.cooldown <= 0 && this.mag > 0;
  }

  fire(camera, zombies) {
    if (!this.canFire()) {
      if (this.enabled && !this.reloading && !this.drawing && this.mag <= 0 && this.cooldown <= 0) {
        this.audio?.dryFire();
        this.cooldown = 0.2;
        this.startReload();
      }
      return false;
    }
    this.mag--;
    this.cooldown = this.fireInterval;
    this.shots++;
    this.spread = Math.min(0.028, this.spread + 0.0045);
    this.recoil = 1;
    this.recoilRot = 1;
    this.onAmmo?.(this.mag, this.reserve);
    this.audio?.gunshot();
    this.onShot?.();

    // muzzle flash
    this.flashT = 0.05;
    this.flashSprite.visible = true;
    this.flashSprite.material.opacity = 1;
    this.flashSprite.material.rotation = Math.random() * Math.PI * 2;
    this.flashSprite.scale.setScalar(0.17 + Math.random() * 0.12);
    this.flashLight.intensity = 3.5;
    this.fx.muzzleLight(this.getMuzzleWorld(camera), 0xffa050, 14);

    // fire animation
    if (this.fireAction) {
      this.fireAction.reset();
      this.fireAction.timeScale = 2.1 + Math.random() * 0.25;
      this.fireAction.play();
    }

    // ray
    const origin = camera.position.clone();
    const dir = new V3(0, 0, -1).applyQuaternion(camera.quaternion);
    const spread = this.spread + (this.isTouch ? 0.004 : 0.002);
    dir.x += (Math.random() - 0.5) * spread * 2;
    dir.y += (Math.random() - 0.5) * spread * 2;
    dir.z += (Math.random() - 0.5) * spread * 2;
    dir.normalize();

    if (this.aimAssist && this.isTouch) {
      const target = zombies.findAimAssist(origin, dir, 0.1, 55);
      if (target) {
        const to = target.point.clone().sub(origin).normalize();
        dir.lerp(to, 0.62).normalize();
      }
    }

    const hit = zombies.raycast(origin, dir, 120);
    const muzzleWorld = this.getMuzzleWorld(camera);
    if (hit) {
      this.fx.tracer(muzzleWorld, hit.point);
      const result = hit.zombie.hit(34, hit.part, dir, hit.point);
      this.onHit?.({ ...hit, ...result });
    } else {
      const worldHit = zombies.world.raycast(origin, dir, 120);
      if (worldHit) {
        this.fx.tracer(muzzleWorld, worldHit.point);
        this.fx.impact(worldHit.point, worldHit.normal);
      } else {
        this.fx.tracer(muzzleWorld, origin.clone().addScaledVector(dir, 90));
      }
      this.onHit?.({ miss: true });
    }

    // casing
    const ejectWorld = this.eject.getWorldPosition(new V3());
    ejectWorld.applyMatrix4(camera.matrixWorld);
    this.fx.shell(ejectWorld, new V3(1, 0.2, 0.1).applyQuaternion(camera.quaternion));

    return true;
  }

  getMuzzleWorld(camera) {
    const v = this.muzzle.getWorldPosition(new V3());
    return v.applyMatrix4(camera.matrixWorld);
  }

  startReload() {
    if (this.reloading || this.drawing || this.mag >= this.magSize || this.reserve <= 0) return false;
    this.reloading = true;
    this.reloadT = 0;
    this.reloadDuration = 1.75;
    this.audio?.reload();
    this.onReloadStart?.();
    this.fireAction?.stop();
    const action = this.mag === 0 && this.reloadEmptyAction ? this.reloadEmptyAction : this.reloadAction;
    if (action) {
      action.timeScale = 1.35;
      this.reloadDuration = action.getClip().duration / action.timeScale;
      action.reset().setLoop(THREE.LoopOnce, 1).play();
    }
    return true;
  }

  _finishReload() {
    if (!this.reloading) return;
    this.reloading = false;
    const need = Math.min(this.magSize - this.mag, this.reserve);
    this.mag += need;
    this.reserve -= need;
    this.onAmmo?.(this.mag, this.reserve);
    this.onReloadEnd?.();
  }

  addAmmo(amount) {
    this.reserve = Math.min(999, this.reserve + amount);
    this.onAmmo?.(this.mag, this.reserve);
  }

  update(dt, moveSpeed, lookDelta, isFiring) {
    if (!this.ready) return;
    this.mixer.update(dt);
    this.cooldown = Math.max(0, this.cooldown - dt);
    this.spread = Math.max(0, this.spread - dt * 0.045);
    if (this.reloading) {
      this.reloadT += dt;
      if (this.reloadT > this.reloadDuration + 0.1) this._finishReload();
    }
    if (this.drawing) {
      this.drawT += dt;
      if (this.drawT >= this.drawDuration) this.drawing = false;
    }

    // recoil spring
    this.recoil = Math.max(0, this.recoil - dt * 9);
    this.recoilRot = Math.max(0, this.recoilRot - dt * 10);

    // sway from look
    this.swayTarget.x += (lookDelta.x * 0.55 - this.swayTarget.x) * Math.min(1, dt * 12);
    this.swayTarget.y += (lookDelta.y * 0.55 - this.swayTarget.y) * Math.min(1, dt * 12);
    this.sway.lerp(this.swayTarget, Math.min(1, dt * 14));

    // walk bob
    this.bobT += dt * (1.2 + moveSpeed * 1.7);
    const bobAmp = Math.min(0.012, moveSpeed * 0.0035);
    const bobX = Math.sin(this.bobT) * bobAmp;
    const bobY = Math.abs(Math.cos(this.bobT)) * bobAmp * 0.8;
    const breathe = Math.sin(performance.now() * 0.0012) * 0.0035;

    const reloadDip = this.reloading ? Math.sin(Math.min(1, this.reloadT / this.reloadDuration) * Math.PI) * 0.06 : 0;
    const drawDip = this.drawing ? (1 - Math.min(1, this.drawT / this.drawDuration)) * 0.22 : 0;

    this.holder.position.set(
      this.basePos.x + this.sway.x * 0.018 + bobX,
      this.basePos.y - this.sway.y * 0.014 + bobY + breathe - reloadDip - drawDip,
      this.basePos.z + this.recoil * 0.075
    );
    this.holder.rotation.set(
      this.baseRot.x + this.recoilRot * 0.09 - this.sway.y * 0.06 + reloadDip * 1.2,
      this.baseRot.y - this.sway.x * 0.1,
      this.baseRot.z + this.sway.x * 0.06 + (this.reloading ? 0.1 : 0) - drawDip * 0.7
    );

    // flash decay
    if (this.flashT > 0) {
      this.flashT -= dt;
      this.flashSprite.material.opacity = Math.max(0, this.flashT / 0.05);
      this.flashLight.intensity = Math.max(0, (this.flashT / 0.05) * 3.5);
      if (this.flashT <= 0) {
        this.flashSprite.visible = false;
        this.flashLight.intensity = 0;
      }
    }
  }

  resize(aspect) {
    this.viewCamera.aspect = aspect;
    this.viewCamera.updateProjectionMatrix();
  }

  reset() {
    this.mag = this.magSize;
    this.reserve = 180;
    this.reloading = false;
    this.drawing = false;
    this.cooldown = 0;
    this.recoil = 0;
    this.recoilRot = 0;
    this.spread = 0;
    this.onAmmo?.(this.mag, this.reserve);
  }
}
