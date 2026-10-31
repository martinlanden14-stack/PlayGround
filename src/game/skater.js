import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { makeDeckGraphicTexture, makeGripTexture } from './textures.js';

const TAU = Math.PI * 2;

function standard(color, roughness = .8, metalness = 0, extra = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
}

function part(geo, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function makeChestTexture() {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 256, 256);

  ctx.fillStyle = '#d65637';
  ctx.beginPath(); ctx.arc(128, 108, 68, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f1e7d0';
  ctx.beginPath(); ctx.arc(128, 108, 51, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#d8ff43';
  ctx.beginPath(); ctx.arc(128, 108, 32, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#103b37';
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(95, 100 + i * 9, 66, 4);
    ctx.clearRect(117 + (i % 2) * 16, 100 + i * 9, 12, 4);
  }
  ctx.fillStyle = '#103b37';
  ctx.textAlign = 'center';
  ctx.font = '700 27px "Arial Black", sans-serif';
  ctx.fillText('SUNSET', 128, 212);
  ctx.font = '700 11px monospace';
  ctx.fillText('SKATE CO. · VENICE', 128, 232);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function makeDeckGeometry() {
  const geo = new THREE.BoxGeometry(.33, .045, .92, 5, 1, 30);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const t = Math.min(1, Math.max(0, (Math.abs(z) - .31) / .15));
    const kick = t * t * (3 - 2 * t);
    const dome = Math.cos(x / .165 * Math.PI * .5) * .006;
    const concave = (1 - Math.abs(x) / .165) * .008;
    pos.setY(i, y + kick * .105 + dome + concave);
    pos.setX(i, x * (1 - kick * .06));
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

function createBoard() {
  const group = new THREE.Group();

  const grip = makeGripTexture();
  const graphic = makeDeckGraphicTexture();
  const wood = standard(0xc18a51, .72, 0, { map: null });
  const woodSide = standard(0xa66d3d, .8, 0);
  const gripMat = new THREE.MeshStandardMaterial({ map: grip, color: 0x2b2d28, roughness: .97, bumpMap: grip, bumpScale: .006 });
  const graphicMat = new THREE.MeshStandardMaterial({ map: graphic, roughness: .52, metalness: .05 });
  const deckGeo = makeDeckGeometry();
  const deck = new THREE.Mesh(deckGeo, [woodSide, woodSide, gripMat, graphicMat, wood, wood]);
  deck.castShadow = true;
  deck.receiveShadow = true;
  deck.position.y = 0;
  group.add(deck);

  // Metal rails detail on deck edge
  const edgeMat = standard(0x3b3e36, .5, .4);

  const truckMetal = standard(0xb6af9c, .24, .9);
  const truckDark = standard(0x3f423c, .3, .85);
  const axleMat = standard(0xd2cab8, .18, .95);
  const wheelMat = standard(0xe7d7b6, .52, .06);
  const wheelDark = standard(0x2a2d28, .4, .4);
  const wheelGeo = new THREE.CylinderGeometry(.042, .042, .044, 16);
  const wheelCoreGeo = new THREE.CylinderGeometry(.018, .018, .046, 10);
  const wheels = [];

  for (const z of [-.285, .285]) {
    const base = part(new THREE.BoxGeometry(.18, .025, .13), truckDark, 0, -.035, z);
    group.add(base);
    const hanger = part(new RoundedBoxGeometry(.28, .045, .055, 2, .015), truckMetal, 0, -.062, z);
    hanger.rotation.z = .03;
    group.add(hanger);
    const axle = part(new THREE.CylinderGeometry(.014, .014, .38, 8), axleMat, 0, -.065, z);
    axle.rotation.z = Math.PI / 2;
    group.add(axle);
    const kingpin = part(new THREE.CylinderGeometry(.012, .014, .07, 6), truckDark, 0, -.048, z + .055);
    kingpin.rotation.x = .2;
    group.add(kingpin);
    const bushing = part(new THREE.CylinderGeometry(.031, .031, .026, 8), standard(0xd3c68c, .6), 0, -.058, z + .035);
    bushing.rotation.x = .15;
    group.add(bushing);

    for (const x of [-.14, .14]) {
      const wg = new THREE.Group();
      wg.position.set(x, -.068, z);
      const wheel = part(wheelGeo, wheelMat, 0, 0, 0);
      wheel.rotation.z = Math.PI / 2;
      wg.add(wheel);
      const core = part(wheelCoreGeo, wheelDark, 0, 0, 0);
      core.rotation.z = Math.PI / 2;
      wg.add(core);
      const bearing = part(new THREE.TorusGeometry(.02, .005, 4, 12), standard(0xe0d7bd, .2, .8), 0, 0, 0);
      bearing.rotation.y = Math.PI / 2;
      wg.add(bearing);
      group.add(wg);
      wheels.push(wg);
    }
  }

  // Deck bolts
  const boltGeo = new THREE.CylinderGeometry(.011, .011, .008, 8);
  const boltMat = standard(0x8c8d80, .3, .8);
  for (const x of [-.1, .1]) {
    for (const z of [-.285, .285]) {
      const b = part(boltGeo, boltMat, x, .068, z);
      group.add(b);
    }
  }

  return { group, wheels, deck };
}

function makeBackTexture() {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 256, 256);

  // Big sun badge
  ctx.fillStyle = '#d65637';
  ctx.beginPath(); ctx.arc(128, 96, 64, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f1e7d0';
  ctx.beginPath(); ctx.arc(128, 96, 48, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#d8ff43';
  ctx.beginPath(); ctx.arc(128, 96, 30, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#103b37';
  ctx.lineWidth = 4;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(100, 84 + i * 8);
    ctx.lineTo(156, 84 + i * 8);
    ctx.stroke();
  }
  // Rays
  ctx.strokeStyle = '#d65637';
  ctx.lineWidth = 5;
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(128 + Math.cos(a) * 72, 96 + Math.sin(a) * 72);
    ctx.lineTo(128 + Math.cos(a) * 86, 96 + Math.sin(a) * 86);
    ctx.stroke();
  }
  ctx.fillStyle = '#103b37';
  ctx.textAlign = 'center';
  ctx.font = '700 26px "Arial Black", sans-serif';
  ctx.fillText('SUNSET', 128, 200);
  ctx.font = '700 11px monospace';
  ctx.fillText('GRIND · VENICE BEACH', 128, 220);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function createRider() {
  const group = new THREE.Group();
  group.rotation.y = .98;

  const skin = standard(0xc98d62, .72);
  const skinLight = standard(0xdda878, .7);
  const hoodie = standard(0xe2d7bb, .9);
  const hoodieShade = standard(0xc7bca3, .92);
  const pants = standard(0x1a2a2a, .9);
  const pantsLight = standard(0x253a37, .9);
  const shoe = standard(0xe5dcc6, .75);
  const shoeAccent = standard(0xdc5a38, .68);
  const sole = standard(0xd7cbb1, .82);
  const dark = standard(0x141d1a, .55, .1);
  const metal = standard(0xd8c58d, .26, .8);
  const capMat = standard(0xda5638, .8);
  const chains = standard(0xe0bd5c, .22, .9);

  // hips & pelvis
  const hips = new THREE.Group();
  hips.position.y = .83;
  group.add(hips);

  const pelvis = part(new RoundedBoxGeometry(.32, .22, .22, 3, .06), pants, 0, .015, 0);
  hips.add(pelvis);
  const belt = part(new THREE.BoxGeometry(.34, .035, .235), dark, 0, .12, 0);
  hips.add(belt);
  const buckle = part(new THREE.BoxGeometry(.05, .035, .012), metal, 0, .12, .123);
  hips.add(buckle);

  // torso
  const torsoPivot = new THREE.Group();
  torsoPivot.position.y = .08;
  hips.add(torsoPivot);

  const torsoGeo = new THREE.CapsuleGeometry(.205, .3, 8, 16);
  const torso = part(torsoGeo, hoodie, 0, .31, 0);
  torso.scale.set(1.12, 1, .72);
  torsoPivot.add(torso);

  // Hoodie hem
  const hem = part(new THREE.CylinderGeometry(.238, .246, .085, 20, 1, true), hoodieShade, 0, .085, 0);
  hem.scale.z = .72;
  torsoPivot.add(hem);
  const hemLine = part(new THREE.TorusGeometry(.238, .008, 4, 24), hoodieShade, 0, .047, 0);
  hemLine.rotation.x = Math.PI / 2;
  hemLine.scale.z = .72;
  torsoPivot.add(hemLine);

  // Kangaroo pocket
  const pocket = part(new RoundedBoxGeometry(.26, .14, .035, 2, .025), hoodieShade, 0, .2, .15);
  pocket.rotation.x = -.08;
  torsoPivot.add(pocket);

  // Chest print
  const chestTex = makeChestTexture();
  const chest = part(new THREE.PlaneGeometry(.25, .25), new THREE.MeshStandardMaterial({ map: chestTex, transparent: true, roughness: .9 }), 0, .38, .152);
  chest.rotation.x = -.04;
  torsoPivot.add(chest);

  // Back print (most of the camera time is spent looking at this)
  const backTex = makeBackTexture();
  const back = part(new THREE.PlaneGeometry(.25, .25), new THREE.MeshStandardMaterial({ map: backTex, transparent: true, roughness: .9 }), 0, .28, -.155);
  back.rotation.y = Math.PI;
  back.rotation.x = .04;
  torsoPivot.add(back);

  // Draped hood on the upper back
  const hoodBack = part(new THREE.SphereGeometry(.15, 16, 10), hoodieShade, 0, .49, -.105);
  hoodBack.scale.set(1.02, .52, .72);
  hoodBack.rotation.x = -.18;
  torsoPivot.add(hoodBack);
  const hoodInner = part(new THREE.SphereGeometry(.085, 12, 8), standard(0x7d725d, .95), 0, .515, -.09);
  hoodInner.scale.set(1.2, .38, .5);
  torsoPivot.add(hoodInner);

  // Drawstrings
  for (const x of [-.055, .055]) {
    const cord = part(new THREE.CylinderGeometry(.006, .006, .16, 4), standard(0xf4ecd7, .8), x, .46, .135);
    cord.rotation.x = .1;
    torsoPivot.add(cord);
    const tip = part(new THREE.CylinderGeometry(.009, .006, .02, 4), metal, x, .38, .15);
    torsoPivot.add(tip);
  }

  // Hood bunched behind neck
  const hood = part(new THREE.TorusGeometry(.13, .06, 7, 18, Math.PI * 1.25), hoodie, 0, .51, -.06);
  hood.rotation.x = Math.PI / 2;
  hood.rotation.z = -.4;
  torsoPivot.add(hood);
  const hoodFold = part(new THREE.CylinderGeometry(.18, .22, .09, 16, 1, true), hoodieShade, 0, .51, -.03);
  hoodFold.scale.z = .55;
  torsoPivot.add(hoodFold);

  // neck + head
  const neck = part(new THREE.CylinderGeometry(.065, .072, .11, 10), skin, 0, .57, 0);
  torsoPivot.add(neck);

  const head = new THREE.Group();
  head.position.y = .65;
  torsoPivot.add(head);

  const skull = part(new THREE.SphereGeometry(.135, 20, 16), skin, 0, .065, 0);
  skull.scale.set(.94, 1.06, .94);
  head.add(skull);

  const jaw = part(new RoundedBoxGeometry(.17, .13, .14, 3, .06), skin, 0, -.015, .025);
  head.add(jaw);
  const earGeo = new THREE.SphereGeometry(.02, 8, 6);
  for (const x of [-.122, .122]) {
    const ear = part(earGeo, skinLight, x, .04, -.005);
    ear.scale.set(.55, 1, .55);
    head.add(ear);
  }
  const nose = part(new THREE.SphereGeometry(.032, 8, 6), skinLight, 0, .02, .137);
  nose.scale.set(.8, 1.12, .8);
  head.add(nose);

  // Sunglasses
  const glassesFrame = part(new RoundedBoxGeometry(.215, .058, .018, 2, .008), dark, 0, .085, .128);
  head.add(glassesFrame);
  for (const x of [-.054, .054]) {
    const lens = part(new RoundedBoxGeometry(.085, .038, .007, 2, .007), standard(0x183b39, .1, .8, { emissive: 0x0c2321, emissiveIntensity: .3 }), x, .087, .14);
    lens.rotation.z = x < 0 ? .05 : -.05;
    head.add(lens);
    const glint = part(new THREE.PlaneGeometry(.026, .005), new THREE.MeshBasicMaterial({ color: 0xcfeee4, transparent: true, opacity: .5, toneMapped: false }), x - .016, .097, .145);
    glint.rotation.z = -.3;
    head.add(glint);
  }
  const bridge = part(new THREE.BoxGeometry(.022, .01, .012), dark, 0, .087, .139);
  head.add(bridge);

  const mouth = part(new THREE.BoxGeometry(.055, .008, .008), standard(0x7f4b3b, .8), 0, -.055, .132);
  mouth.rotation.z = -.04;
  head.add(mouth);
  const browL = part(new THREE.BoxGeometry(.068, .012, .01), standard(0x3a271d, .9), -.06, .133, .122);
  browL.rotation.z = .1;
  head.add(browL);

  // Beanie
  const beanie = part(new THREE.SphereGeometry(.142, 20, 12, 0, Math.PI * 2, 0, Math.PI * .58), capMat, 0, .083, -.006);
  beanie.scale.set(1.01, 1.08, 1.01);
  beanie.castShadow = true;
  head.add(beanie);
  const brim = part(new THREE.CylinderGeometry(.146, .15, .065, 20, 1, true), standard(0xb9472e, .88), 0, .086, -.006);
  head.add(brim);
  const patch = part(new THREE.PlaneGeometry(.055, .04), new THREE.MeshBasicMaterial({ color: 0xd7ff43 }), 0, .14, .135);
  patch.rotation.x = -.36;
  head.add(patch);

  // Hair tufts
  for (let i = 0; i < 5; i++) {
    const tuft = part(new THREE.SphereGeometry(.035, 6, 5), standard(0x34251c, .9), -.08 + i * .04, .012, -.12);
    head.add(tuft);
  }

  // Arms
  const armRefs = {};
  const armGeo = new THREE.CapsuleGeometry(.055, .2, 5, 10);
  const foreGeo = new THREE.CapsuleGeometry(.046, .17, 5, 10);
  for (const side of [-1, 1]) {
    const key = side < 0 ? 'L' : 'R';
    const upper = new THREE.Group();
    upper.position.set(side * .253, .44, 0);
    upper.rotation.z = side * 1.02;
    upper.rotation.x = -.1;
    torsoPivot.add(upper);

    const sleeve = part(armGeo, hoodie, 0, -.135, 0);
    sleeve.rotation.z = .03;
    upper.add(sleeve);
    const cuff = part(new THREE.CylinderGeometry(.06, .055, .05, 12), hoodieShade, 0, -.255, 0);
    upper.add(cuff);

    const lower = new THREE.Group();
    lower.position.y = -.255;
    lower.rotation.z = side * -.4;
    lower.rotation.x = -.05;
    upper.add(lower);

    const forearm = part(foreGeo, skin, 0, -.11, 0);
    lower.add(forearm);
    const wrist = part(new THREE.CylinderGeometry(.043, .038, .045, 8), dark, 0, -.235, 0);
    lower.add(wrist);
    const hand = part(new RoundedBoxGeometry(.075, .09, .055, 2, .025), skin, 0, -.29, .005);
    hand.rotation.x = .1;
    lower.add(hand);

    // elbow pad strap
    const elbowStrap = part(new THREE.TorusGeometry(.054, .007, 4, 12), dark, 0, -.012, 0);
    elbowStrap.rotation.x = Math.PI / 2;
    lower.add(elbowStrap);

    armRefs[key] = { upper, lower, baseZ: side * 1.02, side };
  }

  // Chain
  const chain = part(new THREE.TorusGeometry(.095, .006, 4, 24, Math.PI * 1.15), chains, 0, .45, .13);
  chain.rotation.z = Math.PI * .92;
  chain.rotation.x = .2;
  torsoPivot.add(chain);
  const pendant = part(new THREE.OctahedronGeometry(.018, 0), chains, 0, .35, .145);
  torsoPivot.add(pendant);

  // Legs
  const legRefs = {};
  const thighGeo = new THREE.CapsuleGeometry(.071, .225, 5, 10);
  const shinGeo = new THREE.CapsuleGeometry(.06, .2, 5, 10);

  for (const side of [-1, 1]) {
    const key = side < 0 ? 'L' : 'R';
    const hip = new THREE.Group();
    hip.position.set(side * .12, -.03, 0);
    hips.add(hip);

    const thigh = part(thighGeo, pants, 0, -.15, 0);
    hip.add(thigh);
    const kneePad = part(new RoundedBoxGeometry(.11, .1, .08, 2, .02), pantsLight, 0, -.27, .025);
    hip.add(kneePad);

    const knee = new THREE.Group();
    knee.position.y = -.32;
    hip.add(knee);
    const shin = part(shinGeo, pants, 0, -.13, 0);
    knee.add(shin);
    const sock = part(new THREE.CylinderGeometry(.058, .052, .075, 10), standard(0xe7dec8, .9), 0, -.245, 0);
    knee.add(sock);

    const ankle = new THREE.Group();
    ankle.position.y = -.29;
    knee.add(ankle);
    const shoeGroup = new THREE.Group();
    shoeGroup.position.set(side * -.012, -.035, .05);
    ankle.add(shoeGroup);
    const shoeBody = part(new RoundedBoxGeometry(.12, .115, .29, 3, .045), shoe, 0, -.01, .035);
    shoeBody.rotation.x = -.02;
    shoeGroup.add(shoeBody);
    const toe = part(new RoundedBoxGeometry(.118, .075, .09, 3, .035), shoeAccent, 0, -.026, .165);
    shoeGroup.add(toe);
    const soleMesh = part(new RoundedBoxGeometry(.127, .032, .315, 2, .012), sole, 0, -.072, .035);
    shoeGroup.add(soleMesh);
    const heel = part(new RoundedBoxGeometry(.11, .08, .06, 2, .02), shoeAccent, 0, .0, -.096);
    shoeGroup.add(heel);
    for (let i = 0; i < 3; i++) {
      const lace = part(new THREE.BoxGeometry(.09, .007, .012), standard(0x3a3932, .8), 0, .047, .06 + i * .027);
      lace.rotation.x = -.05;
      shoeGroup.add(lace);
    }
    shoeGroup.rotation.y = side * .27;

    // subtle ankle rotation base
    legRefs[key] = { hip, knee, ankle, shoeGroup, side, baseHipX: side * .08 };
  }

  // knee pads
  const padMat = standard(0x2b3b35, .75);
  for (const side of [-1, 1]) {
    const knee = legRefs[side < 0 ? 'L' : 'R'].knee;
    const pad = part(new THREE.SphereGeometry(.062, 10, 8), padMat, 0, .02, .062);
    pad.scale.set(1.05, 1.1, .55);
    knee.add(pad);
  }

  return {
    group,
    hips,
    torsoPivot,
    head,
    armRefs,
    legRefs,
    materials: { hoodie, pants, skin },
  };
}

export class Skater {
  constructor(scene, world) {
    this.root = new THREE.Group();
    this.lean = new THREE.Group();
    this.root.add(this.lean);
    scene.add(this.root);

    const board = createBoard();
    this.boardPivot = new THREE.Group();
    this.boardPivot.position.y = .085;
    this.boardPivot.add(board.group);
    this.lean.add(this.boardPivot);
    this.board = board;

    const rider = createRider();
    this.rider = rider;
    this.riderRoot = rider.group;
    this.riderRoot.position.y = .125;
    this.lean.add(this.riderRoot);

    this.shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1.3, 1.1),
      new THREE.MeshBasicMaterial({
        map: world.shadowTex, transparent: true, depthWrite: false, opacity: .7, color: 0x06100d
      })
    );
    this.shadow.rotation.x = -Math.PI / 2;
    this.shadow.renderOrder = 2;
    scene.add(this.shadow);

    this.group = this.root;
    this._leanZ = 0;
    this._pitch = 0;
    this._crouch = 0;
    this._boardRoll = 0;
    this._boardYaw = 0;
    this._boardPitch = 0;
    this._bodyTwist = 0;
    this._prevSpeed = 0;
    this._pushPhase = Math.random() * TAU;
    this._pushBlend = 0;
    this._bail = 0;
    this._landPulse = 0;
    this._time = 0;
    this._wheelSpin = 0;
    this._lastY = 0;
  }

  triggerLanding(strength = 1) {
    this._landPulse = Math.min(1, .35 + strength * .5);
  }

  snapTricks() {
    this._boardRoll = 0;
    this._boardYaw = 0;
    this._boardPitch = 0;
    this.boardPivot.rotation.set(0, 0, 0);
    this.lean.rotation.y = 0;
  }

  setBail(amount = 1) {
    this._bail = Math.min(1, Math.max(0, amount));
  }

  update(dt, s) {
    this._time += dt;
    const speed = s.speed || 0;
    const air = !!s.airborne;
    const grind = !!s.grinding;
    const steer = s.steer || 0;
    const push = !!s.pushing;
    const crouchTarget = air ? .66 : grind ? .7 : (speed > 8 ? .18 : .3);
    const k = 1 - Math.pow(.001, dt);
    this._crouch += (crouchTarget - this._crouch) * Math.min(1, dt * 7);
    this._leanZ += ((-steer * .24) - this._leanZ) * Math.min(1, dt * 6);
    this._pitch += ((s.pitch || 0) - this._pitch) * Math.min(1, dt * 7);
    this._boardRoll += ((s.flip || 0) * TAU - this._boardRoll) * Math.min(1, dt * 14);
    this._boardYaw += ((s.shove || 0) * TAU - this._boardYaw) * Math.min(1, dt * 12);
    this._boardPitch += (((s.boardPitch || 0)) - this._boardPitch) * Math.min(1, dt * 8);
    this._landPulse *= Math.pow(.05, dt);
    this._bail += ((s.bail || 0) - this._bail) * Math.min(1, dt * 9);

    // Push blend with alternating foot cycle
    if (push) {
      this._pushPhase += dt * (5.2 + Math.min(speed, 12) * .18);
      this._pushBlend += (1 - this._pushBlend) * Math.min(1, dt * 8);
    } else {
      this._pushBlend += (0 - this._pushBlend) * Math.min(1, dt * 6);
      this._pushPhase += dt * 1.2;
    }

    const t = this._time;
    const bob = Math.sin(t * 5.5) * .012 + Math.sin(t * 2.1) * .009;
    const speedBob = Math.sin(t * (8 + speed * .22)) * (.005 + speed * .0009);
    const comp = this._landPulse * .11;
    const crouch = this._crouch;
    const idleSway = Math.sin(t * 2.6) * .018;

    // Root transforms
    this.root.rotation.y = s.yaw || 0;
    this.lean.rotation.z = this._leanZ + (s.spinAngle ? 0 : 0);
    this.lean.rotation.x = this._pitch;
    this.lean.rotation.y = s.spinAngle || 0;

    this.root.position.set(s.x, s.y, s.z);
    this.riderRoot.position.y = .125 - crouch * .12 - comp + bob * .3;
    this.riderRoot.rotation.z = idleSway * .4;
    this.riderRoot.rotation.x = 0;

    // Board pivot transforms
    this.boardPivot.rotation.set(
      this._boardPitch + (air ? -.1 : 0),
      this._boardYaw,
      this._boardRoll
    );
    this.boardPivot.position.y = .085 + (air ? .025 : 0);

    // Board lean with steering already applied by lean, plus extra roll
    this.boardPivot.rotation.z += this._leanZ * .55;

    // Wheel spin
    this._wheelSpin += speed * dt * 12;
    for (const w of this.board.wheels) w.rotation.x = this._wheelSpin;

    this.animateBody(t, speed, crouch, air, grind, push, steer, s);
    this.animateImpact(s);

    // Shadow follows under board and fades with air height
    const surf = s.surfaceY ?? 0;
    const height = Math.max(0, s.y - surf);
    this.shadow.position.set(s.x, surf + .035, s.z);
    this.shadow.rotation.y = s.yaw || 0;
    const sh = 1 / (1 + height * .3);
    this.shadow.scale.set(sh, sh, sh);
    this.shadow.material.opacity = .55 * sh;
  }

  animateBody(t, speed, crouch, air, grind, push, steer, s) {
    const r = this.rider;
    const pb = this._pushBlend;
    const phase = this._pushPhase;
    const armSway = Math.sin(t * 2.4) * .04 + Math.sin(t * 4.1) * .02;
    const speedFactor = Math.min(1, speed / 12);

    // Hips / torso
    r.hips.rotation.z = -.06 - crouch * .08 + Math.sin(t * 1.9) * .012;
    r.hips.rotation.y = .06 + Math.sin(t * 1.4) * .02;
    r.hips.rotation.x = -.05 + crouch * .18;

    r.torsoPivot.rotation.z = .08 + crouch * .13 + armSway * .4;
    r.torsoPivot.rotation.y = -.1 + Math.sin(t * 1.3) * .025 - steer * .1;
    r.torsoPivot.rotation.x = -.06 + crouch * .1;

    // Head: look into travel, with a little sway and trick energy
    r.head.rotation.y = 1.22 - crouch * .08 + steer * .12 + Math.sin(t * .7) * .035;
    r.head.rotation.z = -.08 + Math.sin(t * 1.1) * .018;
    r.head.rotation.x = -.03 + (air ? .05 : 0);

    // Arms: idle out, push swing, air balance
    for (const key of ['L', 'R']) {
      const arm = r.armRefs[key];
      const side = arm.side;
      let z = arm.baseZ + side * (.06 + armSway * side * .3);
      let x = -.08 + Math.sin(t * 2.2 + side) * .05;
      let lowerZ = side * -.4;
      let lowerX = -.08;

      if (air) {
        const airOut = .32 + Math.sin(t * 2.1 + side) * .04;
        z = side * (1.18 + airOut);
        x = -.32 + Math.sin(t * 2.4 + side * 1.7) * .08;
        lowerZ = side * -.5;
        lowerX = -.38;
      } else if (grind) {
        z = side * 1.25;
        x = -.46 + Math.sin(t * 4 + side) * .04;
        lowerZ = side * -.3;
        lowerX = -.3;
      } else if (push && key === 'R') {
        const swing = Math.sin(phase);
        z = side * (.55 + swing * .45);
        x = .15 + Math.cos(phase) * .5;
        lowerZ = side * -.25;
        lowerX = -.1;
      } else {
        z += steer * .3 * side;
      }
      arm.upper.rotation.z = z;
      arm.upper.rotation.x = x;
      arm.lower.rotation.z = lowerZ;
      arm.lower.rotation.x = lowerX;
    }

    // Legs
    for (const key of ['L', 'R']) {
      const leg = r.legRefs[key];
      const side = leg.side;
      let hipX = -.03 + crouch * .45;
      let hipZ = side * .02;
      let kneeX = -crouch * .82;
      let ankleX = crouch * .32;

      if (air) {
        hipX = -.32 - crouch * .2;
        hipZ = side * .08;
        kneeX = -1.25;
        ankleX = .55 + Math.sin(t * 3 + side) * .04;
      } else if (grind) {
        hipX = -.2;
        hipZ = side * .03;
        kneeX = -.85;
        ankleX = .28;
      } else if (push && key === 'R') {
        const swing = Math.sin(phase);
        const lift = Math.max(0, Math.cos(phase));
        hipX = .18 - swing * .52;
        kneeX = -.2 - lift * .25;
        ankleX = .1 + lift * .15;
      } else {
        hipX += Math.sin(t * 2 + side) * .014;
        hipZ += steer * .04;
      }

      leg.hip.rotation.x = hipX;
      leg.hip.rotation.z = hipZ + side * .03;
      leg.knee.rotation.x = kneeX;
      leg.ankle.rotation.x = ankleX;
      leg.shoeGroup.rotation.z = side * .08;
    }

    // Bailing (used for rough landings)
    const bail = this._bail;
    if (bail > .01) {
      r.torsoPivot.rotation.z += bail * .9;
      r.torsoPivot.rotation.x += bail * .35;
      r.head.rotation.z += bail * .4;
      r.armRefs.L.upper.rotation.z -= bail * .8;
      r.armRefs.R.upper.rotation.z += bail * .8;
      r.legRefs.L.hip.rotation.x += bail * .5;
      r.legRefs.R.hip.rotation.x -= bail * .2;
      this.riderRoot.rotation.z += bail * .35;
    }

    // Slight overall body sparkle on landing
    this.riderRoot.rotation.y = Math.sin(t * 1.1) * .012 + steer * .04;
  }

  animateImpact(s) {
    // impact squash is already folded into crouch; keep a tiny secondary wobble
    if (this._landPulse > .02) {
      const w = Math.sin(this._time * 24) * this._landPulse;
      this.rider.torsoPivot.rotation.x += w * .04;
      this.rider.head.rotation.x += w * .03;
    }
  }
}
