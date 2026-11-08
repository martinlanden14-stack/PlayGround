import * as THREE from 'three';

const canvas = document.querySelector('#scene');
const shell = document.querySelector('#game-shell');
const isMobile = matchMedia('(max-width: 700px)').matches;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1.55 : 2));
renderer.setSize(innerWidth, innerHeight, false);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.16;

const scene = new THREE.Scene();
scene.background = new THREE.Color('#71636a');
scene.fog = new THREE.FogExp2('#75636a', 0.035);
const camera = new THREE.PerspectiveCamera(54, innerWidth / innerHeight, 0.1, 90);
camera.position.set(0, 1.64, 7.2);
camera.lookAt(0, 1.35, -1.5);

const hemi = new THREE.HemisphereLight('#d9c9b5', '#28262b', 2.0); scene.add(hemi);
const key = new THREE.DirectionalLight('#f0c99a', 3.2); key.position.set(-4, 8, 4); key.castShadow = true;
key.shadow.mapSize.set(1024, 1024); key.shadow.camera.left = -10; key.shadow.camera.right = 10; key.shadow.camera.top = 9; key.shadow.camera.bottom = -8; key.shadow.bias = -0.0004; scene.add(key);
const fill = new THREE.DirectionalLight('#91a4b3', 1.45); fill.position.set(5, 4, -4); scene.add(fill);
const rim = new THREE.DirectionalLight('#d47c57', 1.8); rim.position.set(0, 4, -8); scene.add(rim);

const mat = (color, roughness=.8, metalness=0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
const stone = [mat('#5a5350'),mat('#665c57'),mat('#514d4d'),mat('#70625a'),mat('#48474a')];
const darkStone=mat('#3d3b3d'), sand=mat('#81766c'), metal=mat('#888b8b',.26,.84), darkMetal=mat('#35383b',.37,.79), gold=mat('#b6915f',.28,.72);
const addMesh=(geo,material,parent=scene)=>{const m=new THREE.Mesh(geo,material);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m};

// A worn circular flagstone court, edged by fractured masonry.
const floor=addMesh(new THREE.CircleGeometry(17,72),mat('#57504c',.97)); floor.rotation.x=-Math.PI/2; floor.position.y=-.12;
const center=addMesh(new THREE.CircleGeometry(5.3,64),mat('#71635a',.91));center.rotation.x=-Math.PI/2;center.position.set(0,-.105,0);
const ring=addMesh(new THREE.RingGeometry(5.05,5.22,72),mat('#a18769',.75,.12));ring.rotation.x=-Math.PI/2;ring.position.y=-.085;
const tileGeo=new THREE.BoxGeometry(1.38,.1,1.34);
for(let x=-7;x<=7;x++)for(let z=-7;z<=5;z++){
 if(Math.hypot(x+.25,z+.15)>8)continue;
 const tile=addMesh(tileGeo,stone[(x*17+z*13+80)%stone.length]);tile.position.set(x*1.42+((z%2)*.24),-.13,z*1.38);
 tile.rotation.y=((x*7+z*11)%4)*.012;tile.scale.set(.93+((x*19+z*7+200)%7)*.012,1,.92+((x*11+z*23+100)%8)*.013);
}
// Tower walls and broken arches frame the fighting space.
function block(x,y,z,sx,sy,sz,material=darkStone){const b=addMesh(new THREE.BoxGeometry(sx,sy,sz),material);b.position.set(x,y,z);return b}
block(-8,2.1,-4,2,4.2,2);block(8,2.1,-4,2,4.2,2);
block(-5.4,3.8,-7,4.2,.65,1.3,stone[1]);block(5.4,3.8,-7,4.2,.65,1.3,stone[0]);
block(0,5,-8,3.4,.75,1.5,stone[0]);
// Back wall battlements, with deliberate gaps and chipped top edges.
for(let i=0;i<13;i++){const x=-9.2+i*1.54;block(x,3.55,-8.2,1.48,.5,.75,stone[(i+2)%stone.length]);if(i%2===0)block(x,4.1,-8.25,.84,.65,.8,stone[(i+1)%stone.length]);}
for(let side of [-1,1]){
 for(let i=0;i<4;i++){const y=1+i*.82;block(side*7.9,y,-2.5,1.7,.74,1.5,stone[(i+1+(side>0?2:0))%stone.length]);}
 // Tall, partial arch columns and a curved lintel.
 for(let xoff of [-1.25,1.25])block(side*5.5+xoff,2.1,-6.8,.72,4.2,.8,stone[1]);
 block(side*5.5,4.3,-6.8,3.5,.75,.9,stone[0]);
}
// Distant rough mountains silhouetted in the haze.
for(let i=0;i<12;i++){const h=4+(i*37%7);const m=addMesh(new THREE.ConeGeometry(2.4+(i%3)*.65,h,5),mat(i%2?'#61545a':'#514c54'));m.position.set(-16+i*3, h/2-1,-18-(i%3)*2);m.rotation.y=i*.7;m.castShadow=false;}
// Broken stones, dry weeds, and embers bring scale to the floor.
for(let i=0;i<46;i++){const a=i*2.399, r=6.4+(i*19%41)/10;const rock=addMesh(new THREE.DodecahedronGeometry(.12+(i%5)*.045,0),stone[i%stone.length]);rock.position.set(Math.cos(a)*r,-.025,Math.sin(a)*r-1);rock.rotation.set(a,a*.7,a*.31);rock.scale.y=.5;}

// Braziers: warm local light plays against the cold dusk fill.
const fireLights=[];
function makeBrazier(x,z){
 const group=new THREE.Group();group.position.set(x,0,z);scene.add(group);
 const foot=addMesh(new THREE.CylinderGeometry(.31,.44,.28,8),darkMetal,group);foot.position.y=.15;
 const stem=addMesh(new THREE.CylinderGeometry(.11,.18,.95,8),gold,group);stem.position.y=.72;
 const bowl=addMesh(new THREE.CylinderGeometry(.48,.27,.25,9),darkMetal,group);bowl.position.y=1.28;
 for(let i=0;i<4;i++){const spike=addMesh(new THREE.ConeGeometry(.075,.35,5),gold,group);const a=i*Math.PI/2;spike.position.set(Math.cos(a)*.37,1.52,Math.sin(a)*.37);spike.rotation.z=-Math.cos(a)*.15;spike.rotation.x=Math.sin(a)*.15;}
 const flame=addMesh(new THREE.IcosahedronGeometry(.23,1),new THREE.MeshBasicMaterial({color:'#ff9d4c'}),group);flame.position.y=1.69;flame.scale.set(.73,1.55,.73);
 const glow=new THREE.PointLight('#f18b4d',15,9,2);glow.position.y=1.9;group.add(glow);fireLights.push({flame,glow,phase:Math.random()*6});
}
makeBrazier(-5.5,-1);makeBrazier(5.5,-1);makeBrazier(-7,-6.5);makeBrazier(7,-6.5);

// Opponent: layered steel, leather, and cloth, built from sculptural low-poly forms.
const enemy=new THREE.Group();enemy.position.set(0,0,-1.65);scene.add(enemy);
const armor=mat('#555b5e',.31,.81), armorLight=mat('#7a7f7e',.26,.84), leather=mat('#302c2c',.85), cloth=mat('#442b2b',.92), clothLight=mat('#633a35',.86), visor=mat('#171a1c',.28,.42);
const body=new THREE.Group();enemy.add(body);
const torso=addMesh(new THREE.CapsuleGeometry(.43,.67,6,12),armor,body);torso.position.y=1.27;torso.scale.set(1.15,1, .72);
const chest=addMesh(new THREE.BoxGeometry(.78,.68,.2),armorLight,body);chest.position.set(0,1.52,.3);chest.rotation.x=-.08;
const chestInset=addMesh(new THREE.BoxGeometry(.46,.19,.035),darkMetal,body);chestInset.position.set(0,1.69,.418);
const crest=addMesh(new THREE.SphereGeometry(.09,10,8),gold,body);crest.position.set(0,1.68,.45);
const hip=addMesh(new THREE.CylinderGeometry(.34,.43,.3,10),leather,body);hip.position.y=.89;
const skirt=addMesh(new THREE.CylinderGeometry(.33,.56,.63,8,1,true),cloth,body);skirt.position.y=.52;skirt.rotation.y=.18;
for(let i=-1;i<=1;i++){const plate=addMesh(new THREE.BoxGeometry(.24,.57,.09),clothLight,body);plate.position.set(i*.24,.45,.32);plate.rotation.y=i*.08;}
const shoulderPads=[];
for(const side of [-1,1]){
 const shoulder=addMesh(new THREE.SphereGeometry(.29,12,10),armorLight,body);shoulder.position.set(side*.55,1.72,.02);shoulder.scale.set(1.12,.8,1);shoulderPads.push(shoulder);
 const upper=addMesh(new THREE.CapsuleGeometry(.17,.37,4,8),armor,body);upper.position.set(side*.64,1.39,.05);upper.rotation.z=side*-.16;
 const elbow=addMesh(new THREE.SphereGeometry(.18,10,8),darkMetal,body);elbow.position.set(side*.74,1.11,.1);
 const fore=addMesh(new THREE.CapsuleGeometry(.145,.36,4,8),armorLight,body);fore.position.set(side*.77,.88,.13);fore.rotation.z=side*.09;
 const glove=addMesh(new THREE.SphereGeometry(.17,10,8),leather,body);glove.position.set(side*.78,.64,.2);
 const thigh=addMesh(new THREE.CapsuleGeometry(.19,.42,4,8),armor,body);thigh.position.set(side*.23,.26,0);
 const boot=addMesh(new THREE.BoxGeometry(.34,.2,.48),darkMetal,body);boot.position.set(side*.24,.07,.08);
}
const neck=addMesh(new THREE.CylinderGeometry(.15,.19,.24,10),darkMetal,body);neck.position.y=1.97;
const head=new THREE.Group();body.add(head);head.position.y=2.2;
const helmet=addMesh(new THREE.SphereGeometry(.32,14,12),armorLight,head);helmet.scale.set(1,1.17,.9);
const helmetLower=addMesh(new THREE.BoxGeometry(.43,.27,.43),armor,head);helmetLower.position.set(0,-.12,.03);
const faceplate=addMesh(new THREE.BoxGeometry(.36,.14,.035),visor,head);faceplate.position.set(0,.01,.319);
const slit=addMesh(new THREE.BoxGeometry(.25,.025,.02),mat('#d6a56c',.3,.25),head);slit.position.set(0,.035,.344);
const helmetRidge=addMesh(new THREE.BoxGeometry(.07,.53,.075),gold,head);helmetRidge.position.set(0,.22,-.02);
const plume=addMesh(new THREE.ConeGeometry(.12,.62,6),clothLight,head);plume.position.set(0,.53,-.01);plume.rotation.z=.12;
// Warden sword held in a poised guard.
const enemyArmPivot=new THREE.Group();enemyArmPivot.position.set(.66,1.37,.12);body.add(enemyArmPivot);
const eUpper=addMesh(new THREE.CapsuleGeometry(.16,.42,4,8),armor,enemyArmPivot);eUpper.position.y=-.25;eUpper.rotation.z=-.2;
const eFore=addMesh(new THREE.CapsuleGeometry(.13,.37,4,8),armorLight,enemyArmPivot);eFore.position.set(.08,-.57,.14);eFore.rotation.z=-.43;
const eHand=addMesh(new THREE.SphereGeometry(.15,10,8),leather,enemyArmPivot);eHand.position.set(.16,-.76,.25);
const enemySword=new THREE.Group();enemySword.position.set(.16,-.78,.27);enemySword.rotation.x=-.32;enemySword.rotation.z=-.2;enemyArmPivot.add(enemySword);
const eGrip=addMesh(new THREE.CylinderGeometry(.045,.05,.38,8),leather,enemySword);eGrip.position.y=-.15;
const eGuard=addMesh(new THREE.BoxGeometry(.42,.075,.09),gold,enemySword);eGuard.position.y=.08;
const eBlade=addMesh(new THREE.BoxGeometry(.105,1.28,.045),armorLight,enemySword);eBlade.position.y=.76;
const eTip=addMesh(new THREE.ConeGeometry(.074,.22,4),armorLight,enemySword);eTip.position.y=1.5;
const eBladeLine=addMesh(new THREE.BoxGeometry(.013,1.12,.012),mat('#d5c6a9',.24,.77),enemySword);eBladeLine.position.set(-.018,.78,.03);

// Player's gauntlet and longsword sit in camera space; swipes animate the real blade.
const handRig=new THREE.Group();camera.add(handRig);handRig.position.set(.57,-.56,-1.05);handRig.rotation.set(-.17,0,-.12);
const sleeve=addMesh(new THREE.CylinderGeometry(.14,.2,.55,10),cloth,handRig);sleeve.rotation.z=-.5;sleeve.position.set(-.02,-.16,.06);
const cuff=addMesh(new THREE.CylinderGeometry(.17,.16,.13,10),gold,handRig);cuff.rotation.z=-.5;cuff.position.set(.1,.04,.05);
const gauntlet=addMesh(new THREE.SphereGeometry(.15,12,10),darkMetal,handRig);gauntlet.position.set(.19,.14,-.02);gauntlet.scale.set(1,.87,1.05);
for(let i=0;i<3;i++){const knuckle=addMesh(new THREE.BoxGeometry(.06,.08,.15),armorLight,handRig);knuckle.position.set(.12+i*.07,.23,-.09);knuckle.rotation.z=-.15;}
const sword=new THREE.Group();handRig.add(sword);sword.position.set(.19,.2,-.18);sword.rotation.set(.02,.02,-.08);
const grip=addMesh(new THREE.CylinderGeometry(.045,.055,.48,10),leather,sword);grip.position.y=-.24;
const gripWire=addMesh(new THREE.CylinderGeometry(.012,.012,.35,6),gold,sword);gripWire.position.set(0,-.25,.015);
const pommel=addMesh(new THREE.SphereGeometry(.09,10,8),gold,sword);pommel.position.y=-.51;
const guard=addMesh(new THREE.BoxGeometry(.48,.085,.12),gold,sword);guard.position.y=.02;guard.rotation.z=.04;
const blade=addMesh(new THREE.BoxGeometry(.115,1.24,.045),metal,sword);blade.position.y=.66;
const fuller=addMesh(new THREE.BoxGeometry(.018,1.05,.014),mat('#d3d4d0',.2,.92),sword);fuller.position.set(-.008,.68,.027);
const tip=addMesh(new THREE.ConeGeometry(.08,.2,4),metal,sword);tip.position.y=1.38;

// A faint decorative center sigil and heat shimmer embers.
const sigilMat=new THREE.MeshBasicMaterial({color:'#c39665',transparent:true,opacity:.22,side:THREE.DoubleSide});
const sigil=new THREE.Group();sigil.position.set(0,-.045,-1.4);scene.add(sigil);
const sigilRing=new THREE.Mesh(new THREE.RingGeometry(1.45,1.48,64),sigilMat);sigilRing.rotation.x=-Math.PI/2;sigil.add(sigilRing);
for(let i=0;i<8;i++){const ray=new THREE.Mesh(new THREE.BoxGeometry(.018,.012,.6),sigilMat);ray.position.set(Math.cos(i*Math.PI/4)*1.12,.002,Math.sin(i*Math.PI/4)*1.12);ray.rotation.y=-i*Math.PI/4;sigil.add(ray);}

// Combat state and interface.
const ui={start:document.querySelector('#start-overlay'),end:document.querySelector('#end-overlay'),player:document.querySelector('#player-health'),enemy:document.querySelector('#enemy-health'),playerText:document.querySelector('#player-health-text'),enemyText:document.querySelector('#enemy-health-text'),timer:document.querySelector('#timer'),warning:document.querySelector('#attack-warning'),callout:document.querySelector('#callout-text'),calloutBox:document.querySelector('#enemy-callout'),toast:document.querySelector('#combo-toast'),tip:document.querySelector('#swipe-tip'),hints:document.querySelector('#action-hints'),hit:document.querySelector('#hit-flash')};
let running=false, phase='idle', phaseTime=0, elapsed=0, playerHP=100, enemyHP=100, score=0, parries=0, attackCount=0, guardHeld=false, swordBusy=false, toastTimer=0, tipTimer=0, audioCtx=null, soundOn=true, recoil=0, playerHit=0;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const setPhase=(next)=>{phase=next;phaseTime=0;ui.warning.classList.toggle('visible',next==='telegraph');ui.calloutBox.style.color=next==='telegraph'?'#f0b09a':next==='recovery'?'#e7c995':'rgba(238,227,209,.75)';ui.callout.textContent=next==='telegraph'?'WARDEN · STRIKE INCOMING':next==='attack'?'WARDEN · COMMITTED':next==='recovery'?'WARDEN · OPENING':'WARDEN · HOLDING GUARD';};
function ping(frequency=520,duration=.12,type='triangle',volume=.05){if(!soundOn)return;try{audioCtx??=new AudioContext();if(audioCtx.state==='suspended')audioCtx.resume();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=type;o.frequency.setValueAtTime(frequency,audioCtx.currentTime);o.frequency.exponentialRampToValueAtTime(frequency*.68,audioCtx.currentTime+duration);g.gain.setValueAtTime(volume,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+duration);o.connect(g);g.connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+duration);}catch{}}
function updateBars(){ui.player.style.width=`${playerHP}%`;ui.enemy.style.width=`${enemyHP}%`;ui.playerText.textContent=Math.ceil(playerHP);ui.enemyText.textContent=Math.ceil(enemyHP);}
function showToast(text,points){ui.toast.innerHTML=`${text} <span>+${points}</span>`;ui.toast.classList.add('visible');toastTimer=1.35;}
function damagePlayer(amount){playerHP=clamp(playerHP-amount,0,100);playerHit=1;updateBars();ping(115,.22,'sawtooth',.045);if(playerHP<=0)finish(false);}
function damageEnemy(amount,perfect=false){enemyHP=clamp(enemyHP-amount,0,100);score+=perfect?100:amount*10;recoil=1;updateBars();ping(perfect?860:650,.14,'triangle',.05);showToast(perfect?'PERFECT PARRY':'CLEAN STRIKE',perfect?100:amount*10);if(enemyHP<=0)finish(true);}
function finish(win){running=false;guardHeld=false;setPhase('idle');document.querySelector('#end-title').textContent=win?'THE VOW HOLDS':'THE VOW IS BROKEN';document.querySelector('#end-subtitle').textContent=win?'The arena is quiet again.':'The Warden lowers their blade.';document.querySelector('#end-eyebrow').innerHTML=win?'<span></span> DUEL COMPLETE <span></span>':'<span></span> DUEL ENDED <span></span>';document.querySelector('#end-crest').textContent=win?'✳':'✧';document.querySelector('#result-time').textContent=formatTime(elapsed);document.querySelector('#result-score').textContent=String(score).padStart(4,'0');document.querySelector('#result-parries').textContent=parries;setTimeout(()=>ui.end.classList.remove('hidden'),450);}
function formatTime(s){return`${String(Math.floor(s/60)).padStart(2,'0')}:${String(Math.floor(s%60)).padStart(2,'0')}`;}
function resetGame(){running=true;phase='idle';phaseTime=0;elapsed=0;playerHP=100;enemyHP=100;score=0;parries=0;attackCount=0;recoil=0;playerHit=0;guardHeld=false;enemy.rotation.set(0,0,0);body.rotation.set(0,0,0);body.position.set(0,0,0);enemyArmPivot.rotation.set(0,0,0);handRig.position.set(.57,-.56,-1.05);sword.rotation.set(.02,.02,-.08);updateBars();ui.timer.textContent='00:00';ui.start.classList.add('hidden');ui.end.classList.add('hidden');ui.tip.classList.add('visible');tipTimer=3.7;setPhase('idle');}
document.querySelector('#start-button').addEventListener('click',()=>{resetGame();ping(440,.1);});document.querySelector('#restart-button').addEventListener('click',()=>{resetGame();ping(440,.1);});
document.querySelector('#sound-toggle').addEventListener('click',()=>{soundOn=!soundOn;document.querySelector('#sound-icon').textContent=soundOn?'♪':'♫';document.querySelector('#sound-toggle').style.opacity=soundOn?'1':'.55';if(soundOn)ping(540,.08);});

function strike(dx,dy,speed=1){if(!running||swordBusy)return;const distance=Math.hypot(dx,dy);if(distance<8)return;swordBusy=true;tipTimer=0;ui.tip.classList.remove('visible');const diagonal=dx*dy<0;const down=dy>0;
 // A committed swipe can meet the incoming blade; timing, not spam, wins the duel.
 if(phase==='telegraph'||(phase==='attack'&&phaseTime<.29)){
  parries++;damageEnemy(22,true);setPhase('recovery');phaseTime=-.12;enemyArmPivot.rotation.set(-.2,-.15,-.65);body.rotation.y=.16;recoil=.7;
 }else if(phase==='recovery'){
  damageEnemy(diagonal?17:13,false);enemyArmPivot.rotation.z=down?-.55:.25;
 }else if(phase==='attack'&&phaseTime<.48){
  damagePlayer(17);showToast('LATE PARRY',0);enemyArmPivot.rotation.z=-.8;
 }else{
  ping(240,.08,'square',.025);showToast('GUARDED',0);
 }
 const sign=dx>=0?1:-1;const direction=dy>=0?1:-1;
 sword.rotation.set(direction*.35,sign*.08,-sign*(diagonal?.92:.65));handRig.position.x=.57+sign*.17;handRig.position.y=-.56+(direction>0?-.04:.09);handRig.rotation.z=-.12-sign*.42;handRig.rotation.x=-.17+direction*.3;
 setTimeout(()=>{sword.rotation.set(.02,.02,-.08);handRig.position.set(.57,-.56,-1.05);handRig.rotation.set(-.17,0,-.12);swordBusy=false;},330);
}
let pointer=null;canvas.addEventListener('pointerdown',e=>{if(!running)return;pointer={x:e.clientX,y:e.clientY,t:performance.now(),id:e.pointerId};canvas.setPointerCapture?.(e.pointerId);});canvas.addEventListener('pointerup',e=>{if(!pointer)return;const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;const dt=Math.max(.04,(performance.now()-pointer.t)/1000);strike(dx,dy,Math.hypot(dx,dy)/dt);pointer=null;});canvas.addEventListener('pointercancel',()=>pointer=null);
const strikeBtn=document.querySelector('#strike-button');strikeBtn.addEventListener('pointerdown',e=>{e.preventDefault();strike(100,-80,600);});
const guardBtn=document.querySelector('#guard-button');guardBtn.addEventListener('pointerdown',e=>{e.preventDefault();guardHeld=true;guardBtn.style.background='rgba(180,145,98,.38)';});['pointerup','pointercancel','pointerleave'].forEach(ev=>guardBtn.addEventListener(ev,()=>{guardHeld=false;guardBtn.style.background='';}));
window.addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();if(!running)resetGame();else strike(90,-75,550);}if(e.code==='ShiftLeft'||e.code==='ShiftRight')guardHeld=true;});window.addEventListener('keyup',e=>{if(e.code.startsWith('Shift'))guardHeld=false;});

// A few ambient motes catch the firelight and make the deep space feel alive.
const moteCount=95,motePositions=new Float32Array(moteCount*3),motePhases=[];
for(let i=0;i<moteCount;i++){motePositions[i*3]=(Math.random()-.5)*18;motePositions[i*3+1]=Math.random()*4.5;motePositions[i*3+2]=-8+Math.random()*12;motePhases.push(Math.random()*Math.PI*2);}
const moteGeo=new THREE.BufferGeometry();moteGeo.setAttribute('position',new THREE.BufferAttribute(motePositions,3));const motes=new THREE.Points(moteGeo,new THREE.PointsMaterial({color:'#f5bc7b',size:.035,transparent:true,opacity:.62,depthWrite:false}));scene.add(motes);

function updateCombat(dt){if(!running)return;elapsed+=dt;phaseTime+=dt;ui.timer.textContent=formatTime(elapsed);
 if(phase==='idle'&&phaseTime>1.3){setPhase('telegraph');attackCount++;}
 else if(phase==='telegraph'&&phaseTime>.78){setPhase('attack');}
 else if(phase==='attack'&&phaseTime>.53){if(guardHeld){parries++;score+=50;showToast('STEADY GUARD',50);ping(720,.12);setPhase('recovery');}else damagePlayer(attackCount%3===0?13:10);if(running){setPhase('recovery');body.rotation.x=-.11;}}
 else if(phase==='recovery'&&phaseTime>1.18){setPhase('idle');body.rotation.x=0;enemyArmPivot.rotation.set(0,0,0);}
}
const clock=new THREE.Clock();let total=0;
function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.045);total+=dt;updateCombat(dt);
 body.position.y=Math.sin(total*2.1)*.025;head.rotation.x=Math.sin(total*1.3)*.025;enemy.rotation.y=Math.sin(total*.72)*.045;
 if(phase==='telegraph'){enemyArmPivot.rotation.z=Math.sin(Math.min(1,phaseTime/.78)*Math.PI*.5)*-.55;body.rotation.x=-.035;}
 if(phase==='attack'){enemyArmPivot.rotation.z=-.95+Math.max(0,phaseTime-.16)*.5;body.rotation.x=-.12;}
 if(phase==='recovery'&&phaseTime>.3){enemyArmPivot.rotation.z*=Math.pow(.03,dt);body.rotation.x*=Math.pow(.05,dt);}
 if(recoil>0){recoil=Math.max(0,recoil-dt*2.8);enemy.position.z=-1.65-recoil*.13;enemy.rotation.x=-recoil*.08;}else{enemy.position.z=-1.65;enemy.rotation.x=0;}
 if(playerHit>0){playerHit=Math.max(0,playerHit-dt*3.1);ui.hit.classList.toggle('visible',playerHit>.13);camera.position.x=Math.sin(total*58)*playerHit*.026;camera.position.y=1.64+Math.sin(total*43)*playerHit*.018;}else{camera.position.x=0;camera.position.y=1.64;ui.hit.classList.remove('visible');}
 if(toastTimer>0){toastTimer-=dt;if(toastTimer<=0)ui.toast.classList.remove('visible');}if(tipTimer>0){tipTimer-=dt;if(tipTimer<=0)ui.tip.classList.remove('visible');}
 fireLights.forEach(f=>{const flick=.86+Math.sin(total*11+f.phase)*.1+Math.sin(total*17+f.phase)*.06;f.flame.scale.y=1.45*flick;f.flame.rotation.z=Math.sin(total*8+f.phase)*.12;f.glow.intensity=13*flick;});
 const pos=moteGeo.attributes.position.array;for(let i=0;i<moteCount;i++){pos[i*3+1]+=(.07+Math.sin(total+i)*.025)*dt;if(pos[i*3+1]>4.9)pos[i*3+1]=.05;}moteGeo.attributes.position.needsUpdate=true;
 renderer.render(scene,camera);
}
function resize(){const w=innerWidth,h=innerHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=matchMedia('(max-width:700px)').matches?58:54;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,matchMedia('(max-width:700px)').matches?1.55:2));}
window.addEventListener('resize',resize);animate();
