import * as THREE from 'three';
import './style.css';

const $ = (id) => document.getElementById(id);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x303432);
scene.fog = new THREE.FogExp2(0x303432, 0.014);
const camera = new THREE.PerspectiveCamera(73, innerWidth / innerHeight, 0.08, 100);
camera.position.set(0, 1.68, 0);
scene.add(camera);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.65));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.14;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
$('game').appendChild(renderer.domElement);

const hemi = new THREE.HemisphereLight(0xc2cec0, 0x45473f, 2.4); scene.add(hemi);
const moon = new THREE.DirectionalLight(0xc7d2ca, 3.1); moon.position.set(-7, 13, 5); moon.castShadow = true;
moon.shadow.mapSize.set(1024, 1024); moon.shadow.camera.left = -22; moon.shadow.camera.right = 22; moon.shadow.camera.top = 22; moon.shadow.camera.bottom = -22; moon.shadow.bias = -0.001; scene.add(moon);
const orangeLight = new THREE.PointLight(0xff6438, 24, 21, 2); orangeLight.position.set(7, 3.2, -8); scene.add(orangeLight);
const blueLight = new THREE.PointLight(0x7d9eae, 11, 17, 2); blueLight.position.set(-9, 3.4, 3); scene.add(blueLight);

const mat = (color, roughness = .88, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
const concrete = [mat(0x55554c), mat(0x464941), mat(0x5b574c)];
const asphalt = mat(0x383c38); const rust = mat(0x795141, .78, .35); const metal = mat(0x343c3a, .38, .72);
const floor = new THREE.Mesh(new THREE.PlaneGeometry(52, 52), asphalt); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
// Broken markings, cracks and gravel turn the simple arena into a readable abandoned street.
const roadLine = new THREE.MeshStandardMaterial({ color: 0x9b865e, roughness: 1, transparent: true, opacity: .43 });
for (let i = 0; i < 10; i++) { const stripe = new THREE.Mesh(new THREE.BoxGeometry(.12, .012, 1.4), roadLine); stripe.position.set((i % 2 ? 1 : -1) * (1.7 + Math.random() * .28), .009, -13 + i * 2.8); scene.add(stripe); }
const debrisMat = [mat(0x777363), mat(0x3e403c), mat(0x6a4839)];
for (let i = 0; i < 125; i++) { const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(.06 + Math.random() * .12, 0), debrisMat[i % 3]); rock.position.set((Math.random() - .5) * 42, .035 + Math.random() * .025, (Math.random() - .5) * 42); rock.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3); rock.scale.y = .3 + Math.random() * .5; rock.castShadow = true; scene.add(rock); }

function box(parent, size, material, pos, rot = [0,0,0], cast = true) { const m = new THREE.Mesh(new THREE.BoxGeometry(...size), material); m.position.set(...pos); m.rotation.set(...rot); m.castShadow = cast; m.receiveShadow = true; parent.add(m); return m; }
function makeBuilding(x, z, w, h, d, seed = 0) {
  const g = new THREE.Group(); g.position.set(x, 0, z); scene.add(g);
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), concrete[seed % 3]); body.position.y = h / 2; body.castShadow = true; body.receiveShadow = true; g.add(body);
  // jagged collapsed roofline
  for (let i = 0; i < 4; i++) { const chunk = box(g, [.5 + Math.random() * 1.4, .45 + Math.random() * .9, d + .1], concrete[(seed + i + 1) % 3], [-w / 2 + i * (w / 3), h + .1 + Math.random() * .18, 0], [0,0,(Math.random() - .5) * .12]); }
  const winMat = new THREE.MeshStandardMaterial({ color: 0x151b1c, roughness: .4, metalness: .15, emissive: 0x111515 });
  for (let side = -1; side <= 1; side += 2) for (let j = 0; j < Math.floor(w / 2.7); j++) {
    const wx = -w / 2 + 1.3 + j * 2.5; const wy = 1.7 + (j % 2) * 2;
    if (wy < h - .6) { const win = new THREE.Mesh(new THREE.BoxGeometry(.85, 1.1, .05), winMat); win.position.set(wx, wy, side * (d / 2 + .03)); g.add(win); box(g, [.07,1.22,.1], concrete[0], [wx,wy,.04 + side * d / 2]); }
  }
  return g;
}
makeBuilding(-18, -6, 8, 9, 9, 1); makeBuilding(17, -10, 9, 12, 8, 2); makeBuilding(-18, 15, 7, 7, 9, 0); makeBuilding(19, 15, 8, 8, 8, 1);
// Ruined perimeter walls and industrial silhouettes.
for (const [x,z,w,d,h] of [[0,-24,52,1,5],[-25,0,1,50,5],[25,0,1,50,5],[0,24,52,1,5]]) { const wall = box(scene,[w,h,d],concrete[1],[x,h/2,z]); }
for (let i=0;i<13;i++) { const x=-20+i*3.35; const pole=box(scene,[.12,4,.12],metal,[x,2,-23.25]); const wire=box(scene,[3.2,.045,.045],metal,[x+1.6,3.8,-23.25],[0,0,.03]); }
// wrecked vehicles as chunky, layered silhouettes
function makeVehicle(x,z,rot=0) { const g=new THREE.Group(); g.position.set(x,0,z);g.rotation.y=rot;scene.add(g);box(g,[3.6,.72,1.65],mat(0x454947),[0,.62,0],[0,0,-.05]);box(g,[2.1,.78,1.4],mat(0x353b3a),[-.25,1.26,0],[0,0,-.06]);box(g,[1.6,.48,1.46],mat(0x1d2829,.28,.25),[-.25,1.32,0]);for(const wx of [-1.25,1.25])for(const wz of [-.84,.84]){const wheel=new THREE.Mesh(new THREE.CylinderGeometry(.39,.39,.2,12),mat(0x171918));wheel.rotation.z=Math.PI/2;wheel.position.set(wx,.42,wz);wheel.castShadow=true;g.add(wheel);}box(g,[.18,.2,.08],mat(0x9c5e40,.3),[1.82,.76,-.38]);return g;}
makeVehicle(-7,-12,.14); makeVehicle(9,8,-.4);
// Burning barrel and warning sign provide warm/cool contrast and orientation.
function barrel(x,z) { const b=new THREE.Mesh(new THREE.CylinderGeometry(.48,.53,1.22,12),rust);b.position.set(x,.61,z);b.castShadow=true;b.receiveShadow=true;scene.add(b);for(let y of [.27,.78]){const band=new THREE.Mesh(new THREE.TorusGeometry(.5,.045,6,16),metal);band.rotation.x=Math.PI/2;band.position.set(x,y,z);scene.add(band);}return b; }
barrel(7,-7); barrel(-12,10);
const signMat = new THREE.MeshStandardMaterial({color:0xb44331,roughness:.65,emissive:0x240600});box(scene,[2.4,.95,.12],signMat,[-10,2.4,-19]);
const signCanvas=document.createElement('canvas');signCanvas.width=512;signCanvas.height=128;const signCtx=signCanvas.getContext('2d');signCtx.fillStyle='#d5c59a';signCtx.fillRect(0,0,512,128);signCtx.fillStyle='#282d28';signCtx.fillRect(10,10,492,108);signCtx.fillStyle='#e7d8ab';signCtx.font='bold 47px sans-serif';signCtx.textAlign='center';signCtx.fillText('QUARANTINE',256,61);signCtx.font='bold 25px sans-serif';signCtx.fillStyle='#d45b3e';signCtx.fillText('SECTOR 09  /  KEEP OUT',256,96);const signTexture=new THREE.CanvasTexture(signCanvas);signTexture.colorSpace=THREE.SRGBColorSpace;
const signText = new THREE.Mesh(new THREE.PlaneGeometry(2.15,.54), new THREE.MeshBasicMaterial({map:signTexture,side:THREE.DoubleSide}));signText.position.set(-10,2.4,-18.92);scene.add(signText);
// Simple distant skyline and haze silhouettes.
const skylineMat=mat(0x242a28);for(let i=0;i<17;i++){const w=2+Math.random()*4,h=5+Math.random()*12;const s=new THREE.Mesh(new THREE.BoxGeometry(w,h,1.5),skylineMat);s.position.set(-25+i*3.2,h/2,-25.5);scene.add(s);}

// First-person rifle: layered receiver, rail, sights, barrel, magazine and moving bolt.
const gun = new THREE.Group(); camera.add(gun); gun.position.set(.35,-.32,-.64); gun.rotation.set(-.04,-.04,0);
const gunBody=mat(0x252b29,.48,.52), gunEdge=mat(0x414844,.36,.68), gripMat=mat(0x171c1b,.8,.1), accent=mat(0x89927d,.4,.55);
box(gun,[.22,.2,.72],gunBody,[0,0,0]); box(gun,[.25,.12,.43],gunEdge,[0,.02,-.16]); box(gun,[.18,.16,.13],gripMat,[0,-.16,.11],[.16,0,0]);
box(gun,[.13,.37,.18],gripMat,[0,-.25,-.08],[.16,0,0]); box(gun,[.12,.06,.65],gunEdge,[0,.13,-.04]);
const barrelMesh=new THREE.Mesh(new THREE.CylinderGeometry(.035,.045,.52,10),gunEdge);barrelMesh.rotation.x=Math.PI/2;barrelMesh.position.set(0,.01,-.55);gun.add(barrelMesh);
box(gun,[.16,.12,.14],gunBody,[0,.015,-.82]); box(gun,[.18,.04,.24],gunBody,[0,-.01,-.36]);
box(gun,[.1,.1,.04],accent,[0,.2,-.25]); box(gun,[.08,.12,.05],gunBody,[0,.2,-.77]);
for(let i=0;i<5;i++)box(gun,[.035,.035,.035],accent,[-.09+i*.045,.13,-.22]);
const bolt=box(gun,[.02,.04,.19],accent,[.125,.025,-.05]);
// Handguard grooves
for(let i=0;i<5;i++)box(gun,[.235,.018,.018],gripMat,[0,.085,-.37+i*.065]);
const muzzleFlash=new THREE.Group();gun.add(muzzleFlash);muzzleFlash.position.set(0,.01,-1.03);const flashMat=new THREE.MeshBasicMaterial({color:0xffc477,transparent:true,opacity:.9,side:THREE.DoubleSide});const flash=new THREE.Mesh(new THREE.ConeGeometry(.12,.38,8),flashMat);flash.rotation.x=Math.PI/2; muzzleFlash.add(flash);muzzleFlash.visible=false;
const flashLight=new THREE.PointLight(0xffab5c,0,4);flashLight.position.copy(muzzleFlash.position);gun.add(flashLight);

const zombies=[]; const zombieMeshes=[]; const tracerGroup=new THREE.Group();scene.add(tracerGroup);
const zombieSkins=[0x69745a,0x77705e,0x515e55,0x81796a,0x4c5a51];
const sharedGeo={torso:new THREE.BoxGeometry(.58,.8,.34),head:new THREE.SphereGeometry(.24,12,10),upper:new THREE.CapsuleGeometry(.105,.43,4,7),lower:new THREE.CapsuleGeometry(.085,.4,4,7),hand:new THREE.SphereGeometry(.11,8,7)};
function makeZombie(){
 const group=new THREE.Group();const skin=mat(zombieSkins[Math.floor(Math.random()*zombieSkins.length)],.95);const cloth=mat([0x39453c,0x514138,0x393e43,0x594e43][Math.floor(Math.random()*4)],.98);const dark=mat(0x252a25,.9);const blood=mat(0x5b2924,.94);
 const torso=new THREE.Mesh(sharedGeo.torso,cloth);torso.position.y=1.28;torso.rotation.x=-.14;torso.castShadow=true;group.add(torso);
 const neck=new THREE.Mesh(new THREE.CylinderGeometry(.09,.12,.2,8),skin);neck.position.y=1.78;group.add(neck);
 const head=new THREE.Mesh(sharedGeo.head,skin);head.position.set(0,2.02,.02);head.scale.set(.88,1.1,.86);head.castShadow=true;head.userData={head:true};group.add(head);
 const jaw=new THREE.Mesh(new THREE.BoxGeometry(.23,.1,.2),dark);jaw.position.set(0,1.89,.2);jaw.rotation.x=-.12;group.add(jaw);
 const eyeMat=new THREE.MeshBasicMaterial({color:0xd68162});for(const x of [-.09,.09]){const eye=new THREE.Mesh(new THREE.SphereGeometry(.026,6,6),eyeMat);eye.position.set(x,2.05,.222);group.add(eye);}
 // shredded cloth, scars and chest markings
 const tear=new THREE.Mesh(new THREE.BoxGeometry(.13,.25,.025),blood);tear.position.set(.13,1.36,.18);tear.rotation.z=-.2;group.add(tear);
 const limbs=[];
 for(const side of [-1,1]){
  const arm=new THREE.Group();arm.position.set(side*.36,1.55,0);const au=new THREE.Mesh(sharedGeo.upper,cloth);au.position.y=-.23;au.rotation.z=side*-.14;au.castShadow=true;arm.add(au);const elbow=new THREE.Group();elbow.position.y=-.46;const al=new THREE.Mesh(sharedGeo.lower,skin);al.position.y=-.21;al.castShadow=true;elbow.add(al);const hand=new THREE.Mesh(sharedGeo.hand,skin);hand.position.set(0,-.44,.02);elbow.add(hand);arm.add(elbow);group.add(arm);limbs.push({arm,elbow,side});
  const leg=new THREE.Group();leg.position.set(side*.17,.92,0);const thigh=new THREE.Mesh(sharedGeo.upper,cloth);thigh.position.y=-.23;thigh.castShadow=true;leg.add(thigh);const shin=new THREE.Mesh(sharedGeo.lower,dark);shin.position.y=-.57;shin.castShadow=true;leg.add(shin);const foot=new THREE.Mesh(new THREE.BoxGeometry(.2,.1,.33),dark);foot.position.set(0,-.82,.09);leg.add(foot);group.add(leg);limbs.push({leg,side});
 }
 // Distinct shoulder and torn armor silhouettes
 const shoulder=new THREE.Mesh(new THREE.BoxGeometry(.76,.14,.4),dark);shoulder.position.set(0,1.57,-.015);group.add(shoulder);
 group.userData={head};
 const z={group,hp:3,speed:1.04+Math.random()*.32,attack:0,walk:Math.random()*6,limbs,alive:true,hitFlash:0,skin};
 group.traverse(o=>{if(o.isMesh){o.userData.zombie=z;zombieMeshes.push(o);}});
 group.position.set((Math.random()-.5)*36,0,-(Math.random()*20+10));
 // avoid reserved player area and spawn outside immediate view
 if(group.position.z > -10)group.position.z=-14;
 scene.add(group);zombies.push(z);return z;
}

const gameState={playing:false,paused:false,health:100,ammo:12,reserve:48,wave:0,kills:0,reloading:false,lastShot:0,elapsed:0,spawnRemaining:0,spawnDelay:0,wavePause:0,fireHeld:false,damageTimer:0,shotKick:0};
const keys={};let yaw=0,pitch=0;const move={x:0,y:0};const raycaster=new THREE.Raycaster();raycaster.far=48;
const audioCtx=window.AudioContext?new AudioContext():null;
function tone(freq,duration,type='sine',gain=.04){if(!audioCtx)return; if(audioCtx.state==='suspended')audioCtx.resume();const osc=audioCtx.createOscillator(),amp=audioCtx.createGain();osc.type=type;osc.frequency.setValueAtTime(freq,audioCtx.currentTime);amp.gain.setValueAtTime(gain,audioCtx.currentTime);amp.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+duration);osc.connect(amp);amp.connect(audioCtx.destination);osc.start();osc.stop(audioCtx.currentTime+duration);}
function gunSound(){tone(74,.085,'sawtooth',.09);tone(48,.12,'triangle',.06);tone(170,.035,'square',.018)}
function updateAmmo(){ $('ammoText').textContent=String(gameState.ammo).padStart(2,'0');$('reserveText').textContent=String(gameState.reserve).padStart(3,'0'); }
function showBanner(title,sub){const b=$('waveBanner');b.querySelector('span').textContent=sub;b.querySelector('b').textContent=title;b.classList.add('show');setTimeout(()=>b.classList.remove('show'),2100);}
function updateWave(){gameState.wave++;gameState.spawnRemaining=4+gameState.wave*2;gameState.spawnDelay=2.1;gameState.wavePause=2.1;$('waveLabel').textContent=`WAVE ${String(gameState.wave).padStart(2,'0')}`;showBanner(`WAVE ${String(gameState.wave).padStart(2,'0')}`,'INCOMING HOSTILES');gameState.reserve=Math.min(120,gameState.reserve+12);updateAmmo();}
function setHealth(n){gameState.health=Math.max(0,Math.min(100,n));$('healthText').textContent=String(Math.ceil(gameState.health)).padStart(3,'0');const fill=$('healthFill');fill.style.width=`${gameState.health}%`;fill.style.background=gameState.health<35?'#ed654d':'var(--acid)';if(gameState.health<=0)endGame();}
function damage(amount){if(!gameState.playing)return;setHealth(gameState.health-amount);$('damageFlash').style.opacity='.72';setTimeout(()=>$('damageFlash').style.opacity='0',160);tone(100,.12,'sawtooth',.06);}
function reload(){if(!gameState.playing||gameState.reloading||gameState.ammo===12||gameState.reserve<=0)return;gameState.reloading=true;gun.rotation.x=.55;setTimeout(()=>{if(!gameState.playing)return;const amount=Math.min(12-gameState.ammo,gameState.reserve);gameState.ammo+=amount;gameState.reserve-=amount;gameState.reloading=false;gun.rotation.x=-.04;updateAmmo();tone(520,.07,'square',.025);},1150);}
function spawnTracer(origin,end,color=0xffd597){const geo=new THREE.BufferGeometry().setFromPoints([origin,end]);const line=new THREE.Line(geo,new THREE.LineBasicMaterial({color,transparent:true,opacity:.9}));tracerGroup.add(line);setTimeout(()=>{tracerGroup.remove(line);geo.dispose();line.material.dispose();},75);}
function createBlood(pos){for(let i=0;i<5;i++){const p=new THREE.Mesh(new THREE.SphereGeometry(.035+Math.random()*.035,5,4),new THREE.MeshBasicMaterial({color:i%2?0x842e29:0x542523,transparent:true,opacity:.8}));p.position.copy(pos);p.userData.vel=new THREE.Vector3((Math.random()-.5)*2,Math.random()*2,(Math.random()-.5)*2);scene.add(p);const born=performance.now();const tick=()=>{if(!p.parent)return;const dt=.04;p.position.addScaledVector(p.userData.vel,dt);p.userData.vel.y-=4*dt;if(performance.now()-born>420){scene.remove(p);p.geometry.dispose();p.material.dispose();}else requestAnimationFrame(tick);};requestAnimationFrame(tick);}}
function shoot(){if(!gameState.playing||gameState.paused||gameState.reloading)return;const now=performance.now();if(now-gameState.lastShot<190)return;gameState.lastShot=now;if(gameState.ammo<=0){tone(190,.055,'square',.025);return;}gameState.ammo--;updateAmmo();gunSound();gameState.shotKick=.12;gun.position.z=-.59;gun.rotation.x=-.08;muzzleFlash.visible=true;flashLight.intensity=18;setTimeout(()=>{muzzleFlash.visible=false;flashLight.intensity=0;},55);
 camera.updateMatrixWorld();raycaster.setFromCamera(new THREE.Vector2(0,0),camera);const hits=raycaster.intersectObjects(zombieMeshes,false);let end=raycaster.ray.origin.clone().addScaledVector(raycaster.ray.direction,40);
 if(hits.length){const hit=hits[0];end.copy(hit.point);const z=hit.object.userData.zombie;if(z?.alive){const headshot=hit.object.userData.head===true;z.hp-=headshot?3:1;z.hitFlash=.14;createBlood(hit.point);spawnTracer(raycaster.ray.origin.clone().add(raycaster.ray.direction.clone().multiplyScalar(.45)),hit.point,headshot?0xffe6a3:0xffbd78);const marker=$('hitmarker');marker.classList.add('show');setTimeout(()=>marker.classList.remove('show'),110);if(z.hp<=0){z.alive=false;gameState.kills++;z.group.userData.fall=0;z.group.userData.dead=true;z.group.userData.deathDirection=z.group.position.clone().sub(camera.position).normalize();$('finalKills').textContent=String(gameState.kills).padStart(2,'0');}}
 } else spawnTracer(raycaster.ray.origin.clone().add(raycaster.ray.direction.clone().multiplyScalar(.45)),end,0xd4c783);
 if(gameState.ammo===0&&gameState.reserve>0)setTimeout(reload,300);
}
function newRun(){gameState.playing=true;gameState.paused=false;gameState.health=100;gameState.ammo=12;gameState.reserve=48;gameState.wave=0;gameState.kills=0;gameState.reloading=false;gameState.spawnRemaining=0;gameState.spawnDelay=0;gameState.wavePause=0;yaw=0;pitch=0;camera.position.set(0,1.68,0);camera.rotation.set(0,0,0);gun.position.set(.35,-.32,-.64);gun.rotation.set(-.04,-.04,0);for(const z of zombies){scene.remove(z.group);}zombies.length=0;zombieMeshes.length=0;$('startScreen').classList.add('hidden');$('endScreen').classList.add('hidden');$('hud').classList.remove('hidden');$('finalKills').textContent='00';setHealth(100);updateAmmo();updateWave();if(innerWidth>700&&renderer.domElement.requestPointerLock)renderer.domElement.requestPointerLock();}
function endGame(){if(!gameState.playing)return;gameState.playing=false;document.exitPointerLock?.();$('hud').classList.add('hidden');$('endTitle').textContent='YOU WERE OVERRUN';$('endCopy').textContent=`Sector 09 fell during wave ${String(gameState.wave).padStart(2,'0')}.`; $('finalKills').textContent=String(gameState.kills).padStart(2,'0');$('endScreen').classList.remove('hidden');}
function pause(){if(!gameState.playing)return;gameState.paused=!gameState.paused;$('controlsHint').textContent=gameState.paused?'PAUSED — PRESS Ⅱ TO RESUME':'WASD MOVE • MOUSE AIM • CLICK FIRE • R RELOAD';if(gameState.paused)document.exitPointerLock?.();else if(innerWidth>700)renderer.domElement.requestPointerLock?.();}

$('startButton').addEventListener('click',newRun);$('restartButton').addEventListener('click',newRun);$('pauseButton').addEventListener('click',pause);$('reloadButton').addEventListener('pointerdown',e=>{e.preventDefault();reload();});
document.addEventListener('keydown',e=>{keys[e.code]=true;if(e.code==='KeyR')reload();if(e.code==='Escape'&&gameState.playing)pause();});document.addEventListener('keyup',e=>keys[e.code]=false);
document.addEventListener('mousemove',e=>{if(gameState.playing&&!gameState.paused&&document.pointerLockElement){yaw-=e.movementX*.0022;pitch-=e.movementY*.0022;pitch=THREE.MathUtils.clamp(pitch,-1.2,1.2);}});
renderer.domElement.addEventListener('click',()=>{if(gameState.playing&&!gameState.paused&&innerWidth>700){if(!document.pointerLockElement)renderer.domElement.requestPointerLock?.();else shoot();}});
document.addEventListener('mousedown',e=>{if(e.button===0&&gameState.playing&&document.pointerLockElement)gameState.fireHeld=true;});document.addEventListener('mouseup',()=>gameState.fireHeld=false);
const joy=$('joystick'),knob=$('joyKnob');let joyPointer=null;joy.addEventListener('pointerdown',e=>{e.preventDefault();joyPointer=e.pointerId;joy.setPointerCapture(e.pointerId);updateJoy(e);});joy.addEventListener('pointermove',e=>{if(e.pointerId===joyPointer)updateJoy(e);});function updateJoy(e){const r=joy.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),d=Math.hypot(dx,dy),max=33,k=Math.min(1,max/(d||1));move.x=dx*k/max;move.y=dy*k/max;knob.style.transform=`translate(calc(-50% + ${move.x*33}px),calc(-50% + ${move.y*33}px))`;}
function endJoy(e){if(e.pointerId===joyPointer){joyPointer=null;move.x=move.y=0;knob.style.transform='translate(-50%,-50%)';}}joy.addEventListener('pointerup',endJoy);joy.addEventListener('pointercancel',endJoy);
let lookPointer=null,lastLook={x:0,y:0};const lookZone=$('lookZone');lookZone.addEventListener('pointerdown',e=>{lookPointer=e.pointerId;lastLook={x:e.clientX,y:e.clientY};lookZone.setPointerCapture(e.pointerId);});lookZone.addEventListener('pointermove',e=>{if(e.pointerId!==lookPointer)return;const dx=e.clientX-lastLook.x,dy=e.clientY-lastLook.y;lastLook={x:e.clientX,y:e.clientY};yaw-=dx*.006;pitch=THREE.MathUtils.clamp(pitch-dy*.005,-1.2,1.2);});lookZone.addEventListener('pointerup',e=>{if(e.pointerId===lookPointer)lookPointer=null;});
const fireButton=$('fireButton');fireButton.addEventListener('pointerdown',e=>{e.preventDefault();gameState.fireHeld=true;shoot();fireButton.setPointerCapture(e.pointerId);});fireButton.addEventListener('pointerup',()=>gameState.fireHeld=false);fireButton.addEventListener('pointercancel',()=>gameState.fireHeld=false);

const clock=new THREE.Clock();let lastTime=0;
function update(dt){if(!gameState.playing||gameState.paused)return;gameState.elapsed+=dt;if(gameState.fireHeld)shoot();
 const forward=(keys.KeyW||keys.ArrowUp?1:0)-(keys.KeyS||keys.ArrowDown?1:0)-move.y;const strafe=(keys.KeyD||keys.ArrowRight?1:0)-(keys.KeyA||keys.ArrowLeft?1:0)+move.x;const speed=4.8;const sin=Math.sin(yaw),cos=Math.cos(yaw);camera.position.x+=(-sin*forward+cos*strafe)*speed*dt;camera.position.z+=(-cos*forward-sin*strafe)*speed*dt;camera.position.x=THREE.MathUtils.clamp(camera.position.x,-22,22);camera.position.z=THREE.MathUtils.clamp(camera.position.z,-22,22);camera.position.y=1.68+Math.sin(gameState.elapsed*9)*.025*Math.min(1,Math.hypot(forward,strafe));camera.rotation.order='YXZ';camera.rotation.set(pitch,yaw,0);
 gameState.shotKick=Math.max(0,gameState.shotKick-dt*.8);gun.position.z=THREE.MathUtils.lerp(gun.position.z,-.64,Math.min(1,dt*12));if(!gameState.reloading)gun.rotation.x=THREE.MathUtils.lerp(gun.rotation.x,-.04,Math.min(1,dt*9));bolt.position.z=-.05+(gameState.shotKick?-.12:0);
 if(gameState.wavePause>0){gameState.wavePause-=dt;return;}
 gameState.spawnDelay-=dt;
 if(gameState.spawnRemaining>0&&gameState.spawnDelay<=0){makeZombie();gameState.spawnRemaining--;gameState.spawnDelay=.82;}
 const alive=zombies.filter(z=>z.alive).length;if(alive===0&&gameState.spawnRemaining===0){updateWave();return;}
 for(const z of zombies){if(!z.alive){if(z.group.userData.dead){z.group.userData.fall=Math.min(1,(z.group.userData.fall||0)+dt*1.6);z.group.rotation.z=THREE.MathUtils.lerp(z.group.rotation.z,-.95,z.group.userData.fall*.025);z.group.position.y=-.55*z.group.userData.fall;z.group.userData.dead=false;}continue;}
  const dx=camera.position.x-z.group.position.x,dz=camera.position.z-z.group.position.z,dist=Math.hypot(dx,dz);z.walk+=dt*8;z.hitFlash=Math.max(0,z.hitFlash-dt);
  if(dist>1.45){z.group.position.x+=(dx/(dist||1))*z.speed*dt;z.group.position.z+=(dz/(dist||1))*z.speed*dt;}else{z.attack-=dt;if(z.attack<=0){z.attack=1.2;damage(7+Math.min(7,gameState.wave));}}
  z.group.rotation.y=Math.atan2(dx,dz);for(const limb of z.limbs){if(limb.leg){limb.leg.rotation.x=Math.sin(z.walk+(limb.side<0?Math.PI:0))*.5;}else if(limb.arm){limb.arm.rotation.x=Math.sin(z.walk+(limb.side>0?Math.PI:0))*.24-.45;limb.elbow.rotation.x=-.35+Math.sin(z.walk)*.14;}}
  if(z.hitFlash>0)z.group.children[0].material.emissive.setHex(0x5f1009);else z.group.children[0].material.emissive.setHex(0x000000);
 }
}
function animate(){requestAnimationFrame(animate);const now=performance.now();const dt=Math.min(.05,(now-lastTime)/1000||0);lastTime=now;update(dt);renderer.render(scene,camera);}
animate();
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,1.65));renderer.setSize(innerWidth,innerHeight);});
