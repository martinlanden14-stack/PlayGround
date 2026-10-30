/* ============================================================
   NEON BREACH — health / ammo drops
   ============================================================ */
import * as THREE from 'three';

function glowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.35, 'rgba(255,255,255,.5)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}
let glowTex = null;

export class Pickup {
  constructor(game, type, position) {
    this.game = game;
    this.type = type; // 'health' | 'ammo'
    this.color = type === 'health' ? 0x5dffa8 : 0xffb340;
    this.alive = true;
    this.age = 0;
    this.life = 22;
    this.position = position.clone();
    this.position.y = 0.85;

    if (!glowTex) glowTex = glowTexture();

    this.group = new THREE.Group();
    this.group.position.copy(this.position);

    const core = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.22, 0),
      new THREE.MeshStandardMaterial({
        color: 0x101a24, emissive: this.color, emissiveIntensity: 1.4,
        metalness: 0.6, roughness: 0.25, flatShading: true,
      })
    );
    this.group.add(core);
    this.core = core;

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.34, 0.018, 4, 24),
      new THREE.MeshBasicMaterial({ color: this.color, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    ring.rotation.x = Math.PI / 2.2;
    this.group.add(ring);
    this.ring = ring;

    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex, color: this.color, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.8,
    }));
    sprite.scale.setScalar(1.15);
    this.group.add(sprite);

    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.16, 3.2, 8, 1, true),
      new THREE.MeshBasicMaterial({
        color: this.color, transparent: true, opacity: 0.16,
        blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
      })
    );
    beam.position.y = 1.2;
    this.group.add(beam);

    game.scene.add(this.group);
  }

  update(dt, player) {
    if (!this.alive) return null;
    this.age += dt;
    const bob = Math.sin(this.age * 2.6) * 0.09;
    this.group.position.y = this.position.y + bob;
    this.group.rotation.y += dt * 1.6;
    this.core.rotation.x += dt * 0.9;
    this.ring.rotation.z += dt * 1.2;
    this.ring.material.opacity = 0.55 + Math.sin(this.age * 3) * 0.25;

    if (this.life - this.age < 4) {
      this.group.visible = Math.sin(this.age * 18) > -0.2;
    }

    const usable = this.type === 'health' ? player.health < player.maxHealth : player.reserve < 300;
    const dx = player.position.x - this.position.x;
    const dz = player.position.z - this.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 1.6 && usable && player.alive) {
      this.collect(player);
      return 'collected';
    }
    if (this.age >= this.life) {
      this.destroy();
      return 'expired';
    }
    return null;
  }

  collect(player) {
    if (this.type === 'health') {
      player.heal(28);
      this.game.hud.killfeed('MEDKIT', 0, 'COLLECTED');
    } else {
      player.addAmmo(60);
      this.game.hud.killfeed('AMMO CELL', 0, 'COLLECTED');
    }
    this.game.audio.pickup();
    this.game.effects.sparkBurst(this.group.position.clone(), new THREE.Vector3(0, 1, 0), this.color, 10, 4);
    if (navigator.vibrate) navigator.vibrate(12);
    this.destroy();
  }

  destroy() {
    this.alive = false;
    this.game.scene.remove(this.group);
    this.group.traverse((o) => {
      o.geometry?.dispose?.();
      if (o.material && o.material.map !== glowTex) o.material.dispose?.();
    });
  }
}
