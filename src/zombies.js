import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone as cloneSkeleton } from 'three/addons/utils/SkeletonUtils.js';
import { fabric } from './textures.js';

const V3 = THREE.Vector3;
let CLOTH_TEXTURE = null;
function clothTexture() {
  if (!CLOTH_TEXTURE) CLOTH_TEXTURE = fabric();
  return CLOTH_TEXTURE;
}

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
function easeInCubic(t) { return t * t * t; }

export class ZombieManager {
  constructor(scene, world, fx, audio) {
    this.scene = scene;
    this.world = world;
    this.fx = fx;
    this.audio = audio;
    this.zombies = [];
    this.template = null;
    this.animations = [];
    this.baseHeight = 1.82;
    this.onKill = null;
    this.onHeadshot = null;
    this.onPlayerHit = null;
    this.onGroan = null;
    this._raycaster = new THREE.Raycaster();
    this._hitTargets = [];
  }

  async load(onProgress) {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync('./models/zombie_runner.glb', (e) => {
      if (e.total) onProgress?.(e.loaded / e.total);
    });
    this.template = gltf.scene;
    this.animations = gltf.animations;
    this.template.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(this.template);
    const h = box.max.y - box.min.y;
    if (h > 0.01) this.baseHeight = h;
    this.footOffset = -box.min.y;
    this.template.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        o.frustumCulled = false;
        if (o.material) {
          o.material.envMapIntensity = 0.7;
          o.material.roughness = Math.min(1, (o.material.roughness ?? 1) * 0.95 + 0.05);
        }
      }
    });
    return this;
  }

  get alive() {
    return this.zombies.filter((z) => !z.dead);
  }

  spawn(position, opts = {}) {
    if (!this.template) return null;
    const z = new Zombie(this, position, opts);
    this.zombies.push(z);
    this.scene.add(z.root);
    this._hitTargets.push(...z.hitboxes);
    return z;
  }

  spawnShowcase(position) {
    const z = this.spawn(position, { showcase: true, scale: 1.06 });
    if (z) {
      z.playIdle();
      z.state = 'showcase';
    }
    return z;
  }

  clear() {
    for (const z of this.zombies) {
      this.scene.remove(z.root);
      z.dispose();
    }
    this.zombies.length = 0;
    this._hitTargets.length = 0;
  }

  update(dt, playerPos, player) {
    for (let i = this.zombies.length - 1; i >= 0; i--) {
      const z = this.zombies[i];
      z.update(dt, playerPos, player, this);
      if (z.removeMe) {
        this.scene.remove(z.root);
        z.dispose();
        this.zombies.splice(i, 1);
      }
    }
    this._hitTargets = this.zombies.filter((z) => !z.dead).flatMap((z) => z.hitboxes);
  }

  /** Raycast against zombie hitboxes with world occlusion. */
  raycast(origin, dir, maxDist = 80) {
    this._raycaster.set(origin, dir);
    this._raycaster.far = maxDist;
    const hits = this._raycaster.intersectObjects(this._hitTargets, false);
    if (!hits.length) return null;
    for (const hit of hits) {
      const zombie = hit.object.userData.zombie;
      if (!zombie || zombie.dead) continue;
      const worldHit = this.world.raycast(origin, dir, hit.distance);
      if (worldHit && worldHit.distance < hit.distance - 0.05) return null;
      return {
        zombie,
        point: hit.point.clone(),
        distance: hit.distance,
        part: hit.object.userData.part || 'body',
        normal: dir.clone().negate(),
      };
    }
    return null;
  }

  findAimAssist(origin, dir, maxAngle = 0.14, maxDist = 55) {
    let best = null;
    let bestScore = Infinity;
    const tmp = new V3();
    for (const z of this.zombies) {
      if (z.dead) continue;
      const head = z.getHeadWorldPosition(tmp);
      const to = head.sub(origin);
      const dist = to.length();
      if (dist > maxDist || dist < 0.4) continue;
      to.normalize();
      const dot = to.dot(dir);
      if (dot < Math.cos(maxAngle)) continue;
      const score = (1 - dot) * 40 + dist * 0.02;
      if (score < bestScore) {
        bestScore = score;
        best = { point: head.clone(), zombie: z };
      }
    }
    return best;
  }
}

let ZOMBIE_ID = 0;

class Zombie {
  constructor(manager, position, opts = {}) {
    this.id = ++ZOMBIE_ID;
    this.manager = manager;
    this.world = manager.world;
    this.fx = manager.fx;
    this.audio = manager.audio;
    this.showcase = !!opts.showcase;
    this.root = new THREE.Group();
    this.root.position.copy(position);
    this.root.rotation.y = opts.rotation ?? Math.random() * Math.PI * 2;
    this.targetHeight = (opts.scale ?? 1) * (1.72 + Math.random() * 0.2);
    this.isRunner = opts.runner ?? Math.random() < 0.28;
    this.isBoss = !!opts.boss;
    if (this.isBoss) {
      this.targetHeight = 2.35;
      this.isRunner = false;
    }
    this.maxHealth = opts.health ?? (this.isBoss ? 620 : this.isRunner ? 70 : 100);
    this.health = this.maxHealth;
    this.speed = opts.speed ?? (this.isRunner ? 2.55 : 1.15) * (this.isBoss ? 0.78 : 1);
    this.damage = opts.damage ?? (this.isBoss ? 34 : 15);
    this.dead = false;
    this.state = 'spawn';
    this.attackCooldown = 0.4 + Math.random() * 1.2;
    this.attackTimer = 0;
    this.attackHitAt = -1;
    this.spawnT = 0;
    this.deathT = 0;
    this.fadeT = 0;
    this.removeMe = false;
    this.hitFlash = 0;
    this.groanTimer = 3 + Math.random() * 9;
    this.phase = Math.random() * 10;

    // visual
    this.fallPivot = new THREE.Group();
    this.fallPivot.position.y = 0.08;
    this.root.add(this.fallPivot);
    this.visual = cloneSkeleton(manager.template);
    this.visualScale = this.targetHeight / manager.baseHeight;
    this.standY = (manager.footOffset || 0) * this.visualScale - 0.08;
    this.visual.position.y = this.standY;
    this.visual.scale.setScalar(this.visualScale);
    this.fallPivot.add(this.visual);

    // unique materials + tint
    this.materials = [];
    const tint = this._tint();
    this.visual.traverse((o) => {
      if (!o.isMesh) return;
      o.castShadow = true;
      o.receiveShadow = true;
      o.frustumCulled = false;
      if (o.material) {
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        const cloned = mats.map((m) => {
          const c = m.clone();
          c.transparent = false;
          c.color = c.color.clone().multiply(tint);
          c.roughness = Math.min(1, (c.roughness ?? 0.8) + (Math.random() - 0.5) * 0.12);
          if (this.isBoss) {
            c.emissive = new THREE.Color(0x3a0505);
            c.emissiveIntensity = 0.35;
          }
          this.materials.push(c);
          return c;
        });
        o.material = Array.isArray(o.material) ? cloned : cloned[0];
      }
      if (o.material && /head/i.test(o.material.name || '')) this.headMesh = o;
      if (o.isMesh && !this.headMesh && /head/i.test(o.name || '')) this.headMesh = o;
    });

    this._buildClothing(tint);

    // find head bone
    this.headBone = null;
    this.visual.traverse((o) => {
      if (o.isBone && /head/i.test(o.name) && !/neck/i.test(o.name)) {
        if (!this.headBone || o.name.length < this.headBone.name.length) this.headBone = o;
      }
    });
    if (!this.headBone) {
      this.visual.traverse((o) => { if (o.isBone && /head/i.test(o.name)) this.headBone = o; });
    }

    // hitboxes
    this.hitboxes = [];
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.19, 8, 6), hitMat);
    head.userData.part = 'head';
    head.userData.zombie = this;
    head.visible = false;
    this.root.add(head);
    this.hitboxes.push(head);
    this.headHit = head;

    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.33, 0.82, 4, 8), hitMat);
    torso.userData.part = 'body';
    torso.userData.zombie = this;
    torso.position.y = 1.18;
    torso.visible = false;
    this.root.add(torso);
    this.hitboxes.push(torso);

    const legs = new THREE.Mesh(new THREE.CapsuleGeometry(0.3, 0.62, 4, 8), hitMat);
    legs.userData.part = 'legs';
    legs.userData.zombie = this;
    legs.position.y = 0.5;
    legs.visible = false;
    this.root.add(legs);
    this.hitboxes.push(legs);

    // animation
    this.mixer = new THREE.AnimationMixer(this.visual);
    this.actions = {};
    for (const clip of manager.animations) {
      const a = this.mixer.clipAction(clip);
      this.actions[clip.name] = a;
      if (/walk/i.test(clip.name)) this.walkAction = a;
      else if (/attack/i.test(clip.name)) this.attackAction = a;
      else if (/idle/i.test(clip.name)) this.idleAction = a;
    }
    if (this.walkAction) {
      this.walkAction.setLoop(THREE.LoopRepeat, Infinity);
      this.walkAction.play();
      this.walkAction.time = Math.random() * this.walkAction.getClip().duration;
      this.walkAction.timeScale = this.isRunner ? 1.55 : 0.92;
    }
    if (this.attackAction) {
      this.attackAction.setLoop(THREE.LoopOnce, 1);
      this.attackAction.clampWhenFinished = true;
    }
    this.mixer.addEventListener('finished', (e) => {
      if (e.action === this.attackAction && !this.dead) {
        this.state = 'walk';
        this.attackAction.fadeOut(0.18);
        this.walkAction?.reset().fadeIn(0.18).play();
      }
    });

    if (!this.showcase) {
      this.visual.position.y = this.standY - 1.5;
      this.visual.rotation.z = (Math.random() - 0.5) * 0.12;
    }
  }

  _buildClothing(tint) {
    const tex = clothTexture();
    const makeMat = (color, roughness = 0.96) => {
      const m = new THREE.MeshStandardMaterial({
        map: tex.map,
        normalMap: tex.normalMap,
        roughnessMap: tex.roughnessMap,
        normalScale: new THREE.Vector2(0.55, 0.55),
        color: new THREE.Color(color).multiply(tint),
        roughness,
        metalness: 0.0,
        side: THREE.DoubleSide,
      });
      m.envMapIntensity = 0.45;
      this.materials.push(m);
      return m;
    };
    const jacketMat = makeMat(0x77735f);
    const vestMat = makeMat(0x3d443b);
    const pantsMat = makeMat(0x3f464b);
    const beltMat = makeMat(0x211d19, 0.82);
    const add = (boneName, geo, mat, y = 0, rotX = 0) => {
      const bone = this.visual.getObjectByName(boneName);
      if (!bone) return;
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = y;
      mesh.rotation.x = rotX;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.frustumCulled = false;
      bone.add(mesh);
      this.clothing.push(mesh);
    };
    this.clothing = [];
    // Tattered field jacket, vest and belt.
    add('spine_01x_014', new THREE.CylinderGeometry(12.5, 15.0, 43, 9, 1, true), jacketMat, 18);
    add('spine_03x_016', new THREE.CylinderGeometry(13.8, 14.6, 23, 9, 1, true), vestMat, 6);
    add('spine_01x_014', new THREE.TorusGeometry(14.4, 1.6, 5, 14), beltMat, -1, Math.PI / 2);
    // Pants and torn shin wraps.
    add('thigh_stretchl_02', new THREE.CylinderGeometry(9.6, 8.2, 30, 8, 1, true), pantsMat, 14);
    add('thigh_stretchr_08', new THREE.CylinderGeometry(9.6, 8.2, 30, 8, 1, true), pantsMat, 14);
    add('leg_stretchl_03', new THREE.CylinderGeometry(7.7, 6.2, 17, 8, 1, true), pantsMat, 7);
    // Rolled sleeves on both upper arms.
    add('arm_stretchl_025', new THREE.CylinderGeometry(7.4, 6.6, 18, 8, 1, true), jacketMat, 7);
    add('arm_stretchr_020', new THREE.CylinderGeometry(7.4, 6.6, 18, 8, 1, true), jacketMat, 7);
  }

  _tint() {
    const palettes = [
      [0.92, 1.02, 0.88], [0.98, 0.9, 0.84], [0.82, 0.92, 0.88],
      [1.02, 0.94, 0.8], [0.9, 0.86, 0.8], [0.8, 0.88, 0.78],
    ];
    const p = this.isBoss ? [1.1, 0.72, 0.68] : palettes[(Math.random() * palettes.length) | 0];
    return new THREE.Color(p[0], p[1], p[2]);
  }

  playIdle() {
    this.state = 'showcase';
    this.walkAction?.stop();
    if (this.idleAction) {
      this.idleAction.setLoop(THREE.LoopRepeat, Infinity);
      this.idleAction.play();
    }
  }

  getHeadWorldPosition(target = new V3()) {
    if (this.headBone) {
      this.headBone.getWorldPosition(target);
      target.y += 0.12;
    } else {
      target.copy(this.root.position).y += 1.62;
    }
    return target;
  }

  hit(damage, part, dir, point) {
    if (this.dead || this.state === 'showcase') return;
    const headshot = part === 'head';
    const mult = headshot ? 3.0 : part === 'legs' ? 0.72 : 1;
    this.health -= damage * mult;
    this.hitFlash = 1;
    if (this.fx.goreEnabled !== false) {
      this.fx.bloodBurst(point, dir, headshot ? 46 : 26, { headshot });
    }
    this.audio?.impact(headshot);
    if (headshot) this.manager.onHeadshot?.(this);
    if (this.health <= 0) {
      this.die(dir, point, headshot);
    } else {
      // stagger
      this.root.position.addScaledVector(dir, 0.045);
      if (headshot && Math.random() < 0.3) {
        this.visual.rotation.z += (Math.random() - 0.5) * 0.4;
      }
    }
    return { killed: this.dead, headshot };
  }

  die(dir, point, headshot) {
    if (this.dead) return;
    this.dead = true;
    this.state = 'dead';
    this.deathT = 0;
    this.attackHitAt = -1;
    this.walkAction?.fadeOut(0.12);
    this.attackAction?.fadeOut(0.12);
    this.idleAction?.fadeOut(0.12);
    this.headHit.visible = false;
    for (const h of this.hitboxes) h.visible = false;

    if (headshot) {
      if (this.headMesh) this.headMesh.visible = false;
      if (this.fx.goreEnabled !== false) {
        const hp = this.getHeadWorldPosition();
        this.fx.gib(hp, dir, 1.15, true);
        this.fx.bloodBurst(hp, dir, 30, { headshot: true, force: 1.5 });
      }
    } else if (this.fx.goreEnabled !== false) {
      this.fx.gib(point, dir, 0.8, false);
    }

    if (this.fx.goreEnabled !== false) this.fx.bloodPool(this.root.position, 1.5 + Math.random());
    this.audio?.zombieDeath();
    this.manager.onKill?.(this, headshot);
  }

  update(dt, playerPos, player, manager) {
    if (this.removeMe) return;
    const root = this.root;

    if (this.showcase) {
      this.mixer.update(dt);
      this._updateHeadHitbox();
      return;
    }

    // spawn rise
    if (this.state === 'spawn') {
      this.spawnT += dt;
      const k = Math.min(1, this.spawnT / 0.85);
      this.visual.position.y = this.standY - 1.5 * (1 - easeOutCubic(k));
      this.visual.rotation.z *= 0.96;
      if (k >= 1) {
        this.state = 'walk';
        this.visual.position.y = this.standY;
      }
      this.mixer.update(dt * 0.6);
      this._updateHeadHitbox();
      return;
    }

    if (this.dead) {
      this.deathT += dt;
      const k = Math.min(1, this.deathT / 0.62);
      const angle = this.fallAngle ?? (this.fallAngle = (Math.random() < 0.5 ? -1 : 1) * (Math.PI / 2 - 0.06));
      this.fallPivot.rotation.x = angle * easeOutCubic(k);
      this.fallPivot.position.y = 0.08 + Math.sin(k * Math.PI) * 0.04;
      this.mixer.update(dt * 0.4);
      if (this.deathT > 3.6) {
        this.fadeT += dt;
        const f = Math.max(0, 1 - this.fadeT / 1.4);
        for (const m of this.materials) {
          m.transparent = true;
          m.opacity = f;
          m.depthWrite = false;
        }
        if (f <= 0) this.removeMe = true;
      }
      return;
    }

    this.attackCooldown -= dt;
    this.groanTimer -= dt;
    if (this.groanTimer <= 0) {
      this.groanTimer = 7 + Math.random() * 14;
      const d = root.position.distanceTo(playerPos);
      this.audio?.groan(root.position, d, this.isBoss);
    }

    const dx = playerPos.x - root.position.x;
    const dz = playerPos.z - root.position.z;
    const dist = Math.hypot(dx, dz);

    // face player
    const targetYaw = Math.atan2(dx, dz);
    let dy = targetYaw - root.rotation.y;
    while (dy > Math.PI) dy -= Math.PI * 2;
    while (dy < -Math.PI) dy += Math.PI * 2;
    root.rotation.y += dy * Math.min(1, dt * (this.state === 'attack' ? 5 : 3.4));

    if (this.state === 'attack') {
      this.attackTimer += dt;
      if (this.attackHitAt >= 0 && this.attackTimer >= this.attackHitAt) {
        this.attackHitAt = -1;
        if (dist < 2.3 && player.alive) {
          player.damage(this.damage, root.position);
          this.fx.bloodBurst(new V3(playerPos.x, playerPos.y - 0.35, playerPos.z), new V3(dx, 0, dz).normalize(), 8, { player: true });
        }
      }
      this.mixer.update(dt);
      if (this.attackAction && !this.attackAction.isRunning() && this.attackTimer > 0.4) {
        this.state = 'walk';
      }
      this._updateHeadHitbox();
      return;
    }

    // chase
    let desiredX = dx, desiredZ = dz;
    if (dist < 0.001) { desiredX = 0; desiredZ = 1; }
    let len = Math.hypot(desiredX, desiredZ);
    desiredX /= len; desiredZ /= len;

    // separation from other zombies
    for (const other of manager.zombies) {
      if (other === this || other.dead) continue;
      const ox = root.position.x - other.root.position.x;
      const oz = root.position.z - other.root.position.z;
      const d2 = ox * ox + oz * oz;
      if (d2 < 1.1 && d2 > 0.0001) {
        const d = Math.sqrt(d2);
        desiredX += (ox / d) * (1.1 - d) * 1.4;
        desiredZ += (oz / d) * (1.1 - d) * 1.4;
      }
    }
    len = Math.hypot(desiredX, desiredZ) || 1;
    desiredX /= len; desiredZ /= len;

    if (dist > 1.25) {
      const step = this.speed * dt;
      let moved = false;
      const offsets = [0, 0.45, -0.45, 0.95, -0.95, 1.5, -1.5];
      for (const off of offsets) {
        const cs = Math.cos(off), sn = Math.sin(off);
        const mx = desiredX * cs - desiredZ * sn;
        const mz = desiredX * sn + desiredZ * cs;
        const nx = root.position.x + mx * step;
        const nz = root.position.z + mz * step;
        if (!this.world.isBlocked(nx, nz, 0.34)) {
          root.position.x = nx;
          root.position.z = nz;
          moved = true;
          break;
        }
      }
      if (!moved) {
        // slide along blocked edge
        root.position.x += desiredX * step * 0.3;
        root.position.z += desiredZ * step * 0.3;
        this.world.resolveCircle(root.position, 0.35);
      }
      if (this.walkAction) this.walkAction.timeScale = (this.isRunner ? 1.7 : 0.95) * (0.8 + this.speed * 0.2);
    } else if (this.attackCooldown <= 0 && this.attackAction) {
      this.state = 'attack';
      this.attackTimer = 0;
      this.attackCooldown = 1.35 + Math.random() * 0.8;
      this.attackHitAt = this.attackAction.getClip().duration * 0.52;
      this.attackAction.reset().setLoop(THREE.LoopOnce, 1).fadeIn(0.12).play();
      this.walkAction?.fadeOut(0.12);
      this.audio?.zombieAttack(root.position, dist);
    }

    // idle sway
    root.position.y = Math.sin(this.phase + performance.now() * 0.001 * 3) * 0.008;
    this.mixer.update(dt * (this.isRunner ? 1.2 : 1));
    this._updateHeadHitbox();
  }

  _updateHeadHitbox() {
    if (!this.headBone) return;
    const p = this.headBone.getWorldPosition(new V3());
    this.root.worldToLocal(p);
    this.headHit.position.copy(p);
    this.headHit.position.y += 0.1;
  }

  dispose() {
    this.mixer?.stopAllAction();
    this.mixer?.uncacheRoot(this.visual);
    for (const m of this.materials) m.dispose();
    for (const c of this.clothing || []) c.geometry.dispose();
    for (const h of this.hitboxes) h.geometry.dispose();
    this.hitboxes[0]?.material?.dispose();
  }
}
