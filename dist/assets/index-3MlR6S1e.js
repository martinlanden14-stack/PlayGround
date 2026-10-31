(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const uc="184",Ef=0,xh=1,wf=2,Pa=1,td=2,ur=3,mi=0,nn=1,Ot=2,Kn=0,Ii=1,di=2,vh=3,Mh=4,Af=5,Xi=100,Rf=101,Cf=102,Pf=103,If=104,Lf=200,Df=201,Nf=202,Uf=203,ol=204,ll=205,Ff=206,Of=207,Bf=208,zf=209,kf=210,Vf=211,Gf=212,Hf=213,Wf=214,cl=0,hl=1,ul=2,Ps=3,dl=4,fl=5,pl=6,ml=7,nd=0,Xf=1,qf=2,jn=0,dc=1,fc=2,pc=3,to=4,mc=5,gc=6,_c=7,yh="attached",Yf="detached",id=300,$i=301,Is=302,fo=303,po=304,no=306,Di=1e3,an=1001,ka=1002,zt=1003,sd=1004,dr=1005,kt=1006,Ia=1007,ci=1008,fn=1009,rd=1010,ad=1011,br=1012,xc=1013,$n=1014,Sn=1015,pn=1016,vc=1017,Mc=1018,Tr=1020,od=35902,ld=35899,cd=1021,hd=1022,bn=1023,gi=1026,Yi=1027,yc=1028,Sc=1029,Ji=1030,bc=1031,Tc=1033,La=33776,Da=33777,Na=33778,Ua=33779,gl=35840,_l=35841,xl=35842,vl=35843,Ml=36196,yl=37492,Sl=37496,bl=37488,Tl=37489,Va=37490,El=37491,wl=37808,Al=37809,Rl=37810,Cl=37811,Pl=37812,Il=37813,Ll=37814,Dl=37815,Nl=37816,Ul=37817,Fl=37818,Ol=37819,Bl=37820,zl=37821,kl=36492,Vl=36494,Gl=36495,Hl=36283,Wl=36284,Ga=36285,Xl=36286,ws=2200,ql=2201,Kf=2202,Er=2300,wr=2301,mo=2302,Sh=2303,bs=2400,Ts=2401,Ha=2402,Ec=2500,jf=2501,Zf=0,ud=1,Yl=2,$f=3200,Kl=0,Jf=1,Ci="",Bt="srgb",mn="srgb-linear",Wa="linear",ft="srgb",is=7680,bh=519,Qf=512,ep=513,tp=514,wc=515,np=516,ip=517,Ac=518,sp=519,jl=35044,Th="300 es",Xn=2e3,Ar=2001;function rp(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function ap(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Rr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function op(){const s=Rr("canvas");return s.style.display="block",s}const Eh={};function Xa(...s){const e="THREE."+s.shift();console.log(e,...s)}function dd(s){const e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Oe(...s){s=dd(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function He(...s){s=dd(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function Zl(...s){const e=s.join(" ");e in Eh||(Eh[e]=!0,Oe(...s))}function lp(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const cp={[cl]:hl,[ul]:pl,[dl]:ml,[Ps]:fl,[hl]:cl,[pl]:ul,[ml]:dl,[fl]:Ps};class Ni{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const Jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let wh=1234567;const gr=Math.PI/180,Ls=180/Math.PI;function Tn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Jt[s&255]+Jt[s>>8&255]+Jt[s>>16&255]+Jt[s>>24&255]+"-"+Jt[e&255]+Jt[e>>8&255]+"-"+Jt[e>>16&15|64]+Jt[e>>24&255]+"-"+Jt[t&63|128]+Jt[t>>8&255]+"-"+Jt[t>>16&255]+Jt[t>>24&255]+Jt[n&255]+Jt[n>>8&255]+Jt[n>>16&255]+Jt[n>>24&255]).toLowerCase()}function it(s,e,t){return Math.max(e,Math.min(t,s))}function Rc(s,e){return(s%e+e)%e}function hp(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function up(s,e,t){return s!==e?(t-s)/(e-s):0}function _r(s,e,t){return(1-t)*s+t*e}function dp(s,e,t,n){return _r(s,e,1-Math.exp(-t*n))}function fp(s,e=1){return e-Math.abs(Rc(s,e*2)-e)}function pp(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function mp(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function gp(s,e){return s+Math.floor(Math.random()*(e-s+1))}function _p(s,e){return s+Math.random()*(e-s)}function xp(s){return s*(.5-Math.random())}function vp(s){s!==void 0&&(wh=s);let e=wh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Mp(s){return s*gr}function yp(s){return s*Ls}function Sp(s){return(s&s-1)===0&&s!==0}function bp(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Tp(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Ep(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":s.set(o*h,l*u,l*d,o*c);break;case"YZY":s.set(l*d,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*d,o*h,o*c);break;case"XZX":s.set(o*h,l*g,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*g,o*c);break;case"ZYZ":s.set(l*g,l*f,o*h,o*c);break;default:Oe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Pn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function mt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const wp={DEG2RAD:gr,RAD2DEG:Ls,generateUUID:Tn,clamp:it,euclideanModulo:Rc,mapLinear:hp,inverseLerp:up,lerp:_r,damp:dp,pingpong:fp,smoothstep:pp,smootherstep:mp,randInt:gp,randFloat:_p,randFloatSpread:xp,seededRandom:vp,degToRad:Mp,radToDeg:yp,isPowerOfTwo:Sp,ceilPowerOfTwo:bp,floorPowerOfTwo:Tp,setQuaternionFromProperEuler:Ep,normalize:mt,denormalize:Pn},rh=class rh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(it(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(it(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};rh.prototype.isVector2=!0;let J=rh;class En{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(u!==_||l!==d||c!==f||h!==g){let p=l*d+c*f+h*g+u*_;p<0&&(d=-d,f=-f,g=-g,_=-_,p=-p);let m=1-o;if(p<.9995){const x=Math.acos(p),M=Math.sin(x);m=Math.sin(m*x)/M,o=Math.sin(o*x)/M,l=l*m+d*o,c=c*m+f*o,h=h*m+g*o,u=u*m+_*o}else{l=l*m+d*o,c=c*m+f*o,h=h*m+g*o,u=u*m+_*o;const x=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=x,c*=x,h*=x,u*=x}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-o*f,e[t+2]=c*g+h*f+o*d-l*u,e[t+3]=h*g-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:Oe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(it(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const ah=class ah{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ah.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ah.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-r*i),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(it(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return go.copy(this).projectOnVector(e),this.sub(go)}reflect(e){return this.sub(go.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(it(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ah.prototype.isVector3=!0;let I=ah;const go=new I,Ah=new En,oh=class oh{constructor(e,t,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c)}set(e,t,n,i,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=i[0],p=i[3],m=i[6],x=i[1],M=i[4],y=i[7],A=i[2],E=i[5],C=i[8];return r[0]=a*_+o*x+l*A,r[3]=a*p+o*M+l*E,r[6]=a*m+o*y+l*C,r[1]=c*_+h*x+u*A,r[4]=c*p+h*M+u*E,r[7]=c*m+h*y+u*C,r[2]=d*_+f*x+g*A,r[5]=d*p+f*M+g*E,r[8]=d*m+f*y+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(i*c-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=d*_,e[4]=(h*t-i*l)*_,e[5]=(i*r-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(_o.makeScale(e,t)),this}rotate(e){return this.premultiply(_o.makeRotation(-e)),this}translate(e,t){return this.premultiply(_o.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};oh.prototype.isMatrix3=!0;let je=oh;const _o=new je,Rh=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ch=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ap(){const s={enabled:!0,workingColorSpace:mn,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ft&&(i.r=fi(i.r),i.g=fi(i.g),i.b=fi(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ft&&(i.r=As(i.r),i.g=As(i.g),i.b=As(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ci?Wa:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Zl("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Zl("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[mn]:{primaries:e,whitePoint:n,transfer:Wa,toXYZ:Rh,fromXYZ:Ch,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Bt},outputColorSpaceConfig:{drawingBufferColorSpace:Bt}},[Bt]:{primaries:e,whitePoint:n,transfer:ft,toXYZ:Rh,fromXYZ:Ch,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Bt}}}),s}const rt=Ap();function fi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function As(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ss;class Rp{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ss===void 0&&(ss=Rr("canvas")),ss.width=e.width,ss.height=e.height;const i=ss.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ss}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Rr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=fi(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(fi(t[n]/255)*255):t[n]=fi(t[n]);return{data:t,width:e.width,height:e.height}}else return Oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Cp=0;class Cc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Cp++}),this.uuid=Tn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(xo(i[a].image)):r.push(xo(i[a]))}else r=xo(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function xo(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Rp.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Oe("Texture: Unable to serialize Texture."),{})}let Pp=0;const vo=new I;class Gt extends Ni{constructor(e=Gt.DEFAULT_IMAGE,t=Gt.DEFAULT_MAPPING,n=an,i=an,r=kt,a=ci,o=bn,l=fn,c=Gt.DEFAULT_ANISOTROPY,h=Ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Pp++}),this.uuid=Tn(),this.name="",this.source=new Cc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new J(0,0),this.repeat=new J(1,1),this.center=new J(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(vo).x}get height(){return this.source.getSize(vo).y}get depth(){return this.source.getSize(vo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Oe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Oe(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==id)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Di:e.x=e.x-Math.floor(e.x);break;case an:e.x=e.x<0?0:1;break;case ka:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Di:e.y=e.y-Math.floor(e.y);break;case an:e.y=e.y<0?0:1;break;case ka:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=id;Gt.DEFAULT_ANISOTROPY=1;const lh=class lh{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,y=(f+1)/2,A=(m+1)/2,E=(h+d)/4,C=(u+_)/4,v=(g+p)/4;return M>y&&M>A?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=E/n,r=C/n):y>A?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=E/i,r=v/i):A<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(A),n=C/r,i=v/r),this.set(n,i,r,t),this}let x=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(u-_)/x,this.z=(d-h)/x,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this.w=it(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this.w=it(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(it(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};lh.prototype.isVector4=!0;let yt=lh;class Ip extends Ni{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},r=new Gt(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Cc(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ln extends Ip{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class fd extends Gt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=zt,this.minFilter=zt,this.wrapR=an,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Lp extends Gt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=zt,this.minFilter=zt,this.wrapR=an,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const eo=class eo{constructor(e,t,n,i,r,a,o,l,c,h,u,d,f,g,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c,h,u,d,f,g,_,p)}set(e,t,n,i,r,a,o,l,c,h,u,d,f,g,_,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new eo().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,i=1/rs.setFromMatrixColumn(e,0).length(),r=1/rs.setFromMatrixColumn(e,1).length(),a=1/rs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d-_*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Dp,e,Np)}lookAt(e,t,n){const i=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),yi.crossVectors(n,hn),yi.lengthSq()===0&&(Math.abs(n.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),yi.crossVectors(n,hn)),yi.normalize(),Yr.crossVectors(hn,yi),i[0]=yi.x,i[4]=Yr.x,i[8]=hn.x,i[1]=yi.y,i[5]=Yr.y,i[9]=hn.y,i[2]=yi.z,i[6]=Yr.z,i[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],p=n[10],m=n[14],x=n[3],M=n[7],y=n[11],A=n[15],E=i[0],C=i[4],v=i[8],T=i[12],P=i[1],R=i[5],U=i[9],G=i[13],W=i[2],D=i[6],z=i[10],O=i[14],ne=i[3],ie=i[7],j=i[11],$=i[15];return r[0]=a*E+o*P+l*W+c*ne,r[4]=a*C+o*R+l*D+c*ie,r[8]=a*v+o*U+l*z+c*j,r[12]=a*T+o*G+l*O+c*$,r[1]=h*E+u*P+d*W+f*ne,r[5]=h*C+u*R+d*D+f*ie,r[9]=h*v+u*U+d*z+f*j,r[13]=h*T+u*G+d*O+f*$,r[2]=g*E+_*P+p*W+m*ne,r[6]=g*C+_*R+p*D+m*ie,r[10]=g*v+_*U+p*z+m*j,r[14]=g*T+_*G+p*O+m*$,r[3]=x*E+M*P+y*W+A*ne,r[7]=x*C+M*R+y*D+A*ie,r[11]=x*v+M*U+y*z+A*j,r[15]=x*T+M*G+y*O+A*$,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],p=e[11],m=e[15],x=l*f-c*d,M=o*f-c*u,y=o*d-l*u,A=a*f-c*h,E=a*d-l*h,C=a*u-o*h;return t*(_*x-p*M+m*y)-n*(g*x-p*A+m*E)+i*(g*M-_*A+m*C)-r*(g*y-_*E+p*C)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],p=e[14],m=e[15],x=t*o-n*a,M=t*l-i*a,y=t*c-r*a,A=n*l-i*o,E=n*c-r*o,C=i*c-r*l,v=h*_-u*g,T=h*p-d*g,P=h*m-f*g,R=u*p-d*_,U=u*m-f*_,G=d*m-f*p,W=x*G-M*U+y*R+A*P-E*T+C*v;if(W===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/W;return e[0]=(o*G-l*U+c*R)*D,e[1]=(i*U-n*G-r*R)*D,e[2]=(_*C-p*E+m*A)*D,e[3]=(d*E-u*C-f*A)*D,e[4]=(l*P-a*G-c*T)*D,e[5]=(t*G-i*P+r*T)*D,e[6]=(p*y-g*C-m*M)*D,e[7]=(h*C-d*y+f*M)*D,e[8]=(a*U-o*P+c*v)*D,e[9]=(n*P-t*U-r*v)*D,e[10]=(g*E-_*y+m*x)*D,e[11]=(u*y-h*E-f*x)*D,e[12]=(o*T-a*R-l*v)*D,e[13]=(t*R-n*T+i*v)*D,e[14]=(_*M-g*A-p*x)*D,e[15]=(h*A-u*M+d*x)*D,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,g=r*u,_=a*h,p=a*u,m=o*u,x=l*c,M=l*h,y=l*u,A=n.x,E=n.y,C=n.z;return i[0]=(1-(_+m))*A,i[1]=(f+y)*A,i[2]=(g-M)*A,i[3]=0,i[4]=(f-y)*E,i[5]=(1-(d+m))*E,i[6]=(p+x)*E,i[7]=0,i[8]=(g+M)*C,i[9]=(p-x)*C,i[10]=(1-(d+_))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const r=this.determinant();if(r===0)return n.set(1,1,1),t.identity(),this;let a=rs.set(i[0],i[1],i[2]).length();const o=rs.set(i[4],i[5],i[6]).length(),l=rs.set(i[8],i[9],i[10]).length();r<0&&(a=-a),An.copy(this);const c=1/a,h=1/o,u=1/l;return An.elements[0]*=c,An.elements[1]*=c,An.elements[2]*=c,An.elements[4]*=h,An.elements[5]*=h,An.elements[6]*=h,An.elements[8]*=u,An.elements[9]*=u,An.elements[10]*=u,t.setFromRotationMatrix(An),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,i,r,a,o=Xn,l=!1){const c=this.elements,h=2*r/(t-e),u=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let g,_;if(l)g=r/(a-r),_=a*r/(a-r);else if(o===Xn)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Ar)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=Xn,l=!1){const c=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i);let g,_;if(l)g=1/(a-r),_=a/(a-r);else if(o===Xn)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===Ar)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};eo.prototype.isMatrix4=!0;let Je=eo;const rs=new I,An=new Je,Dp=new I(0,0,0),Np=new I(1,1,1),yi=new I,Yr=new I,hn=new I,Ph=new Je,Ih=new En;class _i{constructor(e=0,t=0,n=0,i=_i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(it(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-it(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(it(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-it(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(it(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-it(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Oe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ph.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ph,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ih.setFromEuler(this),this.setFromQuaternion(Ih,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_i.DEFAULT_ORDER="XYZ";class Pc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Up=0;const Lh=new I,as=new En,ni=new Je,Kr=new I,js=new I,Fp=new I,Op=new En,Dh=new I(1,0,0),Nh=new I(0,1,0),Uh=new I(0,0,1),Fh={type:"added"},Bp={type:"removed"},os={type:"childadded",child:null},Mo={type:"childremoved",child:null};class St extends Ni{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Up++}),this.uuid=Tn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=St.DEFAULT_UP.clone();const e=new I,t=new _i,n=new En,i=new I(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Je},normalMatrix:{value:new je}}),this.matrix=new Je,this.matrixWorld=new Je,this.matrixAutoUpdate=St.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return as.setFromAxisAngle(e,t),this.quaternion.multiply(as),this}rotateOnWorldAxis(e,t){return as.setFromAxisAngle(e,t),this.quaternion.premultiply(as),this}rotateX(e){return this.rotateOnAxis(Dh,e)}rotateY(e){return this.rotateOnAxis(Nh,e)}rotateZ(e){return this.rotateOnAxis(Uh,e)}translateOnAxis(e,t){return Lh.copy(e).applyQuaternion(this.quaternion),this.position.add(Lh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Dh,e)}translateY(e){return this.translateOnAxis(Nh,e)}translateZ(e){return this.translateOnAxis(Uh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ni.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Kr.copy(e):Kr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),js.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ni.lookAt(js,Kr,this.up):ni.lookAt(Kr,js,this.up),this.quaternion.setFromRotationMatrix(ni),i&&(ni.extractRotation(i.matrixWorld),as.setFromRotationMatrix(ni),this.quaternion.premultiply(as.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(He("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Fh),os.child=e,this.dispatchEvent(os),os.child=null):He("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Bp),Mo.child=e,this.dispatchEvent(Mo),Mo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ni.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ni.multiply(e.parent.matrixWorld)),e.applyMatrix4(ni),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Fh),os.child=e,this.dispatchEvent(os),os.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(js,e,Fp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(js,Op,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}St.DEFAULT_UP=new I(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ft extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zp={type:"move"};class yo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ft,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ft,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ft,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),m=this._getHandJoint(c,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(zp)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ft;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const pd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Si={h:0,s:0,l:0},jr={h:0,s:0,l:0};function So(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class De{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=rt.workingColorSpace){return this.r=e,this.g=t,this.b=n,rt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=rt.workingColorSpace){if(e=Rc(e,1),t=it(t,0,1),n=it(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=So(a,r,e+1/3),this.g=So(a,r,e),this.b=So(a,r,e-1/3)}return rt.colorSpaceToWorking(this,i),this}setStyle(e,t=Bt){function n(r){r!==void 0&&parseFloat(r)<1&&Oe("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Oe("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Oe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Bt){const n=pd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Oe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fi(e.r),this.g=fi(e.g),this.b=fi(e.b),this}copyLinearToSRGB(e){return this.r=As(e.r),this.g=As(e.g),this.b=As(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Bt){return rt.workingToColorSpace(Qt.copy(this),e),Math.round(it(Qt.r*255,0,255))*65536+Math.round(it(Qt.g*255,0,255))*256+Math.round(it(Qt.b*255,0,255))}getHexString(e=Bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=rt.workingColorSpace){rt.workingToColorSpace(Qt.copy(this),t);const n=Qt.r,i=Qt.g,r=Qt.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=rt.workingColorSpace){return rt.workingToColorSpace(Qt.copy(this),t),e.r=Qt.r,e.g=Qt.g,e.b=Qt.b,e}getStyle(e=Bt){rt.workingToColorSpace(Qt.copy(this),e);const t=Qt.r,n=Qt.g,i=Qt.b;return e!==Bt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Si),this.setHSL(Si.h+e,Si.s+t,Si.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Si),e.getHSL(jr);const n=_r(Si.h,jr.h,t),i=_r(Si.s,jr.s,t),r=_r(Si.l,jr.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qt=new De;De.NAMES=pd;class Ic{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new De(e),this.density=t}clone(){return new Ic(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Lc extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _i,this.environmentIntensity=1,this.environmentRotation=new _i,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Rn=new I,ii=new I,bo=new I,si=new I,ls=new I,cs=new I,Oh=new I,To=new I,Eo=new I,wo=new I,Ao=new yt,Ro=new yt,Co=new yt;class Mn{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Rn.subVectors(e,t),i.cross(Rn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Rn.subVectors(i,t),ii.subVectors(n,t),bo.subVectors(e,t);const a=Rn.dot(Rn),o=Rn.dot(ii),l=Rn.dot(bo),c=ii.dot(ii),h=ii.dot(bo),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,si)===null?!1:si.x>=0&&si.y>=0&&si.x+si.y<=1}static getInterpolation(e,t,n,i,r,a,o,l){return this.getBarycoord(e,t,n,i,si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,si.x),l.addScaledVector(a,si.y),l.addScaledVector(o,si.z),l)}static getInterpolatedAttribute(e,t,n,i,r,a){return Ao.setScalar(0),Ro.setScalar(0),Co.setScalar(0),Ao.fromBufferAttribute(e,t),Ro.fromBufferAttribute(e,n),Co.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Ao,r.x),a.addScaledVector(Ro,r.y),a.addScaledVector(Co,r.z),a}static isFrontFacing(e,t,n,i){return Rn.subVectors(n,t),ii.subVectors(e,t),Rn.cross(ii).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),ii.subVectors(this.a,this.b),Rn.cross(ii).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return Mn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return Mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;ls.subVectors(i,n),cs.subVectors(r,n),To.subVectors(e,n);const l=ls.dot(To),c=cs.dot(To);if(l<=0&&c<=0)return t.copy(n);Eo.subVectors(e,i);const h=ls.dot(Eo),u=cs.dot(Eo);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(ls,a);wo.subVectors(e,r);const f=ls.dot(wo),g=cs.dot(wo);if(g>=0&&f<=g)return t.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(cs,o);const p=h*g-f*u;if(p<=0&&u-h>=0&&f-g>=0)return Oh.subVectors(r,i),o=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(Oh,o);const m=1/(p+_+d);return a=_*m,o=d*m,t.copy(n).addScaledVector(ls,a).addScaledVector(cs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class wn{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Cn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Cn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Cn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Cn):Cn.fromBufferAttribute(r,a),Cn.applyMatrix4(e.matrixWorld),this.expandByPoint(Cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Zr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Zr.copy(n.boundingBox)),Zr.applyMatrix4(e.matrixWorld),this.union(Zr)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Cn),Cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zs),$r.subVectors(this.max,Zs),hs.subVectors(e.a,Zs),us.subVectors(e.b,Zs),ds.subVectors(e.c,Zs),bi.subVectors(us,hs),Ti.subVectors(ds,us),Bi.subVectors(hs,ds);let t=[0,-bi.z,bi.y,0,-Ti.z,Ti.y,0,-Bi.z,Bi.y,bi.z,0,-bi.x,Ti.z,0,-Ti.x,Bi.z,0,-Bi.x,-bi.y,bi.x,0,-Ti.y,Ti.x,0,-Bi.y,Bi.x,0];return!Po(t,hs,us,ds,$r)||(t=[1,0,0,0,1,0,0,0,1],!Po(t,hs,us,ds,$r))?!1:(Jr.crossVectors(bi,Ti),t=[Jr.x,Jr.y,Jr.z],Po(t,hs,us,ds,$r))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ri=[new I,new I,new I,new I,new I,new I,new I,new I],Cn=new I,Zr=new wn,hs=new I,us=new I,ds=new I,bi=new I,Ti=new I,Bi=new I,Zs=new I,$r=new I,Jr=new I,zi=new I;function Po(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){zi.fromArray(s,r);const o=i.x*Math.abs(zi.x)+i.y*Math.abs(zi.y)+i.z*Math.abs(zi.z),l=e.dot(zi),c=t.dot(zi),h=n.dot(zi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Lt=new I,Qr=new J;let kp=0;class Ut extends Ni{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:kp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=jl,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Qr.fromBufferAttribute(this,t),Qr.applyMatrix3(e),this.setXY(t,Qr.x,Qr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=mt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pn(t,this.array)),t}setX(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pn(t,this.array)),t}setY(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pn(t,this.array)),t}setW(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),i=mt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),i=mt(i,this.array),r=mt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==jl&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class md extends Ut{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class gd extends Ut{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ot extends Ut{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Vp=new wn,$s=new I,Io=new I;class Qn{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Vp.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;$s.subVectors(e,this.center);const t=$s.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector($s,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Io.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint($s.copy(e.center).add(Io)),this.expandByPoint($s.copy(e.center).sub(Io))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Gp=0;const _n=new Je,Lo=new St,fs=new I,un=new wn,Js=new wn,qt=new I;class Tt extends Ni{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Gp++}),this.uuid=Tn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(rp(e)?gd:md)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new je().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return _n.makeRotationFromQuaternion(e),this.applyMatrix4(_n),this}rotateX(e){return _n.makeRotationX(e),this.applyMatrix4(_n),this}rotateY(e){return _n.makeRotationY(e),this.applyMatrix4(_n),this}rotateZ(e){return _n.makeRotationZ(e),this.applyMatrix4(_n),this}translate(e,t,n){return _n.makeTranslation(e,t,n),this.applyMatrix4(_n),this}scale(e,t,n){return _n.makeScale(e,t,n),this.applyMatrix4(_n),this}lookAt(e){return Lo.lookAt(e),Lo.updateMatrix(),this.applyMatrix4(Lo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fs).negate(),this.translate(fs.x,fs.y,fs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ot(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&Oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];un.setFromBufferAttribute(r),this.morphTargetsRelative?(qt.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(qt),qt.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(qt)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&He('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(un.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Js.setFromBufferAttribute(o),this.morphTargetsRelative?(qt.addVectors(un.min,Js.min),un.expandByPoint(qt),qt.addVectors(un.max,Js.max),un.expandByPoint(qt)):(un.expandByPoint(Js.min),un.expandByPoint(Js.max))}un.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)qt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(qt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)qt.fromBufferAttribute(o,c),l&&(fs.fromBufferAttribute(e,c),qt.add(fs)),i=Math.max(i,n.distanceToSquared(qt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&He('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){He("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ut(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let v=0;v<n.count;v++)o[v]=new I,l[v]=new I;const c=new I,h=new I,u=new I,d=new J,f=new J,g=new J,_=new I,p=new I;function m(v,T,P){c.fromBufferAttribute(n,v),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,P),d.fromBufferAttribute(r,v),f.fromBufferAttribute(r,T),g.fromBufferAttribute(r,P),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const R=1/(f.x*g.y-g.x*f.y);isFinite(R)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(R),p.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(R),o[v].add(_),o[T].add(_),o[P].add(_),l[v].add(p),l[T].add(p),l[P].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let v=0,T=x.length;v<T;++v){const P=x[v],R=P.start,U=P.count;for(let G=R,W=R+U;G<W;G+=3)m(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const M=new I,y=new I,A=new I,E=new I;function C(v){A.fromBufferAttribute(i,v),E.copy(A);const T=o[v];M.copy(T),M.sub(A.multiplyScalar(A.dot(T))).normalize(),y.crossVectors(E,T);const R=y.dot(l[v])<0?-1:1;a.setXYZW(v,M.x,M.y,M.z,R)}for(let v=0,T=x.length;v<T;++v){const P=x[v],R=P.start,U=P.count;for(let G=R,W=R+U;G<W;G+=3)C(e.getX(G+0)),C(e.getX(G+1)),C(e.getX(G+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ut(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new I,r=new I,a=new I,o=new I,l=new I,c=new I,h=new I,u=new I;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),p=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)qt.fromBufferAttribute(e,t),qt.normalize(),e.setXYZ(t,qt.x,qt.y,qt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let m=0;m<h;m++)d[g++]=c[f++]}return new Ut(d,h,u)}if(this.index===null)return Oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Tt,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class _d{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=jl,this.updateRanges=[],this.version=0,this.uuid=Tn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const sn=new I;class Cr{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyMatrix4(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyNormalMatrix(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.transformDirection(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=mt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Pn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Pn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Pn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Pn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),i=mt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),i=mt(i,this.array),r=mt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Xa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Ut(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Cr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Xa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Hp=0;class Ln extends Ni{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hp++}),this.uuid=Tn(),this.name="",this.type="Material",this.blending=Ii,this.side=mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ol,this.blendDst=ll,this.blendEquation=Xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new De(0,0,0),this.blendAlpha=0,this.depthFunc=Ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=is,this.stencilZFail=is,this.stencilZPass=is,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Oe(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Oe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ii&&(n.blending=this.blending),this.side!==mi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ol&&(n.blendSrc=this.blendSrc),this.blendDst!==ll&&(n.blendDst=this.blendDst),this.blendEquation!==Xi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ps&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==bh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==is&&(n.stencilFail=this.stencilFail),this.stencilZFail!==is&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==is&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class qa extends Ln{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ps;const Qs=new I,ms=new I,gs=new I,_s=new J,er=new J,xd=new Je,ea=new I,tr=new I,ta=new I,Bh=new J,Do=new J,zh=new J;class $l extends St{constructor(e=new qa){if(super(),this.isSprite=!0,this.type="Sprite",ps===void 0){ps=new Tt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new _d(t,5);ps.setIndex([0,1,2,0,2,3]),ps.setAttribute("position",new Cr(n,3,0,!1)),ps.setAttribute("uv",new Cr(n,2,3,!1))}this.geometry=ps,this.material=e,this.center=new J(.5,.5),this.count=1}raycast(e,t){e.camera===null&&He('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ms.setFromMatrixScale(this.matrixWorld),xd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),gs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ms.multiplyScalar(-gs.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;na(ea.set(-.5,-.5,0),gs,a,ms,i,r),na(tr.set(.5,-.5,0),gs,a,ms,i,r),na(ta.set(.5,.5,0),gs,a,ms,i,r),Bh.set(0,0),Do.set(1,0),zh.set(1,1);let o=e.ray.intersectTriangle(ea,tr,ta,!1,Qs);if(o===null&&(na(tr.set(-.5,.5,0),gs,a,ms,i,r),Do.set(0,1),o=e.ray.intersectTriangle(ea,ta,tr,!1,Qs),o===null))return;const l=e.ray.origin.distanceTo(Qs);l<e.near||l>e.far||t.push({distance:l,point:Qs.clone(),uv:Mn.getInterpolation(Qs,ea,tr,ta,Bh,Do,zh,new J),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function na(s,e,t,n,i,r){_s.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(er.x=r*_s.x-i*_s.y,er.y=i*_s.x+r*_s.y):er.copy(_s),s.copy(e),s.x+=er.x,s.y+=er.y,s.applyMatrix4(xd)}const ai=new I,No=new I,ia=new I,Ei=new I,Uo=new I,sa=new I,Fo=new I;class Br{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ai)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ai.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ai.copy(this.origin).addScaledVector(this.direction,t),ai.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){No.copy(e).add(t).multiplyScalar(.5),ia.copy(t).sub(e).normalize(),Ei.copy(this.origin).sub(No);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ia),o=Ei.dot(this.direction),l=-Ei.dot(ia),c=Ei.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(No).addScaledVector(ia,d),f}intersectSphere(e,t){ai.subVectors(e.center,this.origin);const n=ai.dot(this.direction),i=ai.dot(ai)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,ai)!==null}intersectTriangle(e,t,n,i,r){Uo.subVectors(t,e),sa.subVectors(n,e),Fo.crossVectors(Uo,sa);let a=this.direction.dot(Fo),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ei.subVectors(this.origin,e);const l=o*this.direction.dot(sa.crossVectors(Ei,sa));if(l<0)return null;const c=o*this.direction.dot(Uo.cross(Ei));if(c<0||l+c>a)return null;const h=-o*Ei.dot(Fo);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Dt extends Ln{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.combine=nd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const kh=new Je,ki=new Br,ra=new Qn,Vh=new I,aa=new I,oa=new I,la=new I,Oo=new I,ca=new I,Gh=new I,ha=new I;class we extends St{constructor(e=new Tt,t=new Dt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){ca.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Oo.fromBufferAttribute(u,e),a?ca.addScaledVector(Oo,h):ca.addScaledVector(Oo.sub(t),h))}t.add(ca)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ra.copy(n.boundingSphere),ra.applyMatrix4(r),ki.copy(e.ray).recast(e.near),!(ra.containsPoint(ki.origin)===!1&&(ki.intersectSphere(ra,Vh)===null||ki.origin.distanceToSquared(Vh)>(e.far-e.near)**2))&&(kh.copy(r).invert(),ki.copy(e.ray).applyMatrix4(kh),!(n.boundingBox!==null&&ki.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ki)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=a[p.materialIndex],x=Math.max(p.start,f.start),M=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let y=x,A=M;y<A;y+=3){const E=o.getX(y),C=o.getX(y+1),v=o.getX(y+2);i=ua(this,m,e,n,c,h,u,E,C,v),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const x=o.getX(p),M=o.getX(p+1),y=o.getX(p+2);i=ua(this,a,e,n,c,h,u,x,M,y),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=a[p.materialIndex],x=Math.max(p.start,f.start),M=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let y=x,A=M;y<A;y+=3){const E=y,C=y+1,v=y+2;i=ua(this,m,e,n,c,h,u,E,C,v),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const x=p,M=p+1,y=p+2;i=ua(this,a,e,n,c,h,u,x,M,y),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function Wp(s,e,t,n,i,r,a,o){let l;if(e.side===nn?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,e.side===mi,o),l===null)return null;ha.copy(o),ha.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(ha);return c<t.near||c>t.far?null:{distance:c,point:ha.clone(),object:s}}function ua(s,e,t,n,i,r,a,o,l,c){s.getVertexPosition(o,aa),s.getVertexPosition(l,oa),s.getVertexPosition(c,la);const h=Wp(s,e,t,n,aa,oa,la,Gh);if(h){const u=new I;Mn.getBarycoord(Gh,aa,oa,la,u),i&&(h.uv=Mn.getInterpolatedAttribute(i,o,l,c,u,new J)),r&&(h.uv1=Mn.getInterpolatedAttribute(r,o,l,c,u,new J)),a&&(h.normal=Mn.getInterpolatedAttribute(a,o,l,c,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new I,materialIndex:0};Mn.getNormal(aa,oa,la,d.normal),h.face=d,h.barycoord=u}return h}const nr=new yt,Hh=new yt,Wh=new yt,Xp=new yt,Xh=new Je,da=new I,Bo=new Qn,qh=new Je,zo=new Br;class qp extends we{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=yh,this.bindMatrix=new Je,this.bindMatrixInverse=new Je,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new wn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,da),this.boundingBox.expandByPoint(da)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Qn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,da),this.boundingSphere.expandByPoint(da)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Bo.copy(this.boundingSphere),Bo.applyMatrix4(i),e.ray.intersectsSphere(Bo)!==!1&&(qh.copy(i).invert(),zo.copy(e.ray).applyMatrix4(qh),!(this.boundingBox!==null&&zo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,zo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new yt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===yh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Yf?this.bindMatrixInverse.copy(this.bindMatrix).invert():Oe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Hh.fromBufferAttribute(i.attributes.skinIndex,e),Wh.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(nr.copy(t),t.set(0,0,0,0)):(nr.set(...t,1),t.set(0,0,0)),nr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){const a=Wh.getComponent(r);if(a!==0){const o=Hh.getComponent(r);Xh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Xp.copy(nr).applyMatrix4(Xh),a)}}return t.isVector4&&(t.w=nr.w),t.applyMatrix4(this.bindMatrixInverse)}}class vd extends St{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Dc extends Gt{constructor(e=null,t=1,n=1,i,r,a,o,l,c=zt,h=zt,u,d){super(null,a,o,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Yh=new Je,Yp=new Je;class Nc{constructor(e=[],t=[]){this.uuid=Tn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Oe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Je)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Je;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:Yp;Yh.multiplyMatrices(o,t[r]),Yh.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Nc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Dc(t,e,e,bn,Sn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let a=t[r];a===void 0&&(Oe("Skeleton: No bone found with UUID:",r),a=new vd),this.bones.push(a),this.boneInverses.push(new Je().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class Jl extends Ut{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const xs=new Je,Kh=new Je,fa=[],jh=new wn,Kp=new Je,ir=new we,sr=new Qn;class jp extends we{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Jl(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Kp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new wn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,xs),jh.copy(e.boundingBox).applyMatrix4(xs),this.boundingBox.union(jh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,xs),sr.copy(e.boundingSphere).applyMatrix4(xs),this.boundingSphere.union(sr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(ir.geometry=this.geometry,ir.material=this.material,ir.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sr.copy(this.boundingSphere),sr.applyMatrix4(n),e.ray.intersectsSphere(sr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,xs),Kh.multiplyMatrices(n,xs),ir.matrixWorld=Kh,ir.raycast(e,fa);for(let a=0,o=fa.length;a<o;a++){const l=fa[a];l.instanceId=r,l.object=this,t.push(l)}fa.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Jl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Dc(new Float32Array(i*this.count),i,this.count,yc,Sn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ko=new I,Zp=new I,$p=new je;class Wi{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=ko.subVectors(n,t).cross(Zp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(ko),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||$p.getNormalMatrix(e),i=this.coplanarPoint(ko).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Vi=new Qn,Jp=new J(.5,.5),pa=new I;class Uc{constructor(e=new Wi,t=new Wi,n=new Wi,i=new Wi,r=new Wi,a=new Wi){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Xn,n=!1){const i=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],_=r[9],p=r[10],m=r[11],x=r[12],M=r[13],y=r[14],A=r[15];if(i[0].setComponents(c-a,f-h,m-g,A-x).normalize(),i[1].setComponents(c+a,f+h,m+g,A+x).normalize(),i[2].setComponents(c+o,f+u,m+_,A+M).normalize(),i[3].setComponents(c-o,f-u,m-_,A-M).normalize(),n)i[4].setComponents(l,d,p,y).normalize(),i[5].setComponents(c-l,f-d,m-p,A-y).normalize();else if(i[4].setComponents(c-l,f-d,m-p,A-y).normalize(),t===Xn)i[5].setComponents(c+l,f+d,m+p,A+y).normalize();else if(t===Ar)i[5].setComponents(l,d,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Vi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Vi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Vi)}intersectsSprite(e){Vi.center.set(0,0,0);const t=Jp.distanceTo(e.center);return Vi.radius=.7071067811865476+t,Vi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Vi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(pa.x=i.normal.x>0?e.max.x:e.min.x,pa.y=i.normal.y>0?e.max.y:e.min.y,pa.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(pa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class io extends Ln{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new De(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ya=new I,Ka=new I,Zh=new Je,rr=new Br,ma=new Qn,Vo=new I,$h=new I;class so extends St{constructor(e=new Tt,t=new io){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Ya.fromBufferAttribute(t,i-1),Ka.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Ya.distanceTo(Ka);e.setAttribute("lineDistance",new ot(n,1))}else Oe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ma.copy(n.boundingSphere),ma.applyMatrix4(i),ma.radius+=r,e.ray.intersectsSphere(ma)===!1)return;Zh.copy(i).invert(),rr.copy(e.ray).applyMatrix4(Zh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=f,p=g-1;_<p;_+=c){const m=h.getX(_),x=h.getX(_+1),M=ga(this,e,rr,l,m,x,_);M&&t.push(M)}if(this.isLineLoop){const _=h.getX(g-1),p=h.getX(f),m=ga(this,e,rr,l,_,p,g-1);m&&t.push(m)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,p=g-1;_<p;_+=c){const m=ga(this,e,rr,l,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){const _=ga(this,e,rr,l,g-1,f,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ga(s,e,t,n,i,r,a){const o=s.geometry.attributes.position;if(Ya.fromBufferAttribute(o,i),Ka.fromBufferAttribute(o,r),t.distanceSqToSegment(Ya,Ka,Vo,$h)>n)return;Vo.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Vo);if(!(c<e.near||c>e.far))return{distance:c,point:$h.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const Jh=new I,Qh=new I;class Md extends so{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Jh.fromBufferAttribute(t,i),Qh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Jh.distanceTo(Qh);e.setAttribute("lineDistance",new ot(n,1))}else Oe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Qp extends so{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class yd extends Ln{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const eu=new Je,Ql=new Br,_a=new Qn,xa=new I;class Sd extends St{constructor(e=new Tt,t=new yd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_a.copy(n.boundingSphere),_a.applyMatrix4(i),_a.radius+=r,e.ray.intersectsSphere(_a)===!1)return;eu.copy(i).invert(),Ql.copy(e.ray).applyMatrix4(eu);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,_=f;g<_;g++){const p=c.getX(g);xa.fromBufferAttribute(u,p),tu(xa,p,l,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,_=f;g<_;g++)xa.fromBufferAttribute(u,g),tu(xa,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function tu(s,e,t,n,i,r,a){const o=Ql.distanceSqToPoint(s);if(o<t){const l=new I;Ql.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class bd extends Gt{constructor(e=[],t=$i,n,i,r,a,o,l,c,h){super(e,t,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class em extends Gt{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ds extends Gt{constructor(e,t,n=$n,i,r,a,o=zt,l=zt,c,h=gi,u=1){if(h!==gi&&h!==Yi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Cc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class tm extends Ds{constructor(e,t=$n,n=$i,i,r,a=zt,o=zt,l,c=gi){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,i,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Td extends Gt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ui extends Tt{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new ot(c,3)),this.setAttribute("normal",new ot(h,3)),this.setAttribute("uv",new ot(u,2));function g(_,p,m,x,M,y,A,E,C,v,T){const P=y/C,R=A/v,U=y/2,G=A/2,W=E/2,D=C+1,z=v+1;let O=0,ne=0;const ie=new I;for(let j=0;j<z;j++){const $=j*R-G;for(let Q=0;Q<D;Q++){const Te=Q*P-U;ie[_]=Te*x,ie[p]=$*M,ie[m]=W,c.push(ie.x,ie.y,ie.z),ie[_]=0,ie[p]=0,ie[m]=E>0?1:-1,h.push(ie.x,ie.y,ie.z),u.push(Q/C),u.push(1-j/v),O+=1}}for(let j=0;j<v;j++)for(let $=0;$<C;$++){const Q=d+$+D*j,Te=d+$+D*(j+1),Ne=d+($+1)+D*(j+1),Ee=d+($+1)+D*j;l.push(Q,Te,Ee),l.push(Te,Ne,Ee),ne+=6}o.addGroup(f,ne,T),f+=ne,d+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ui(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Pr extends Tt{constructor(e=1,t=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));const a=[],o=[],l=[],c=[],h=t/2,u=Math.PI/2*e,d=t,f=2*u+d,g=n*2+r,_=i+1,p=new I,m=new I;for(let x=0;x<=g;x++){let M=0,y=0,A=0,E=0;if(x<=n){const T=x/n,P=T*Math.PI/2;y=-h-e*Math.cos(P),A=e*Math.sin(P),E=-e*Math.cos(P),M=T*u}else if(x<=n+r){const T=(x-n)/r;y=-h+T*t,A=e,E=0,M=u+T*d}else{const T=(x-n-r)/n,P=T*Math.PI/2;y=h+e*Math.sin(P),A=e*Math.cos(P),E=e*Math.sin(P),M=u+d+T*u}const C=Math.max(0,Math.min(1,M/f));let v=0;x===0?v=.5/i:x===g&&(v=-.5/i);for(let T=0;T<=i;T++){const P=T/i,R=P*Math.PI*2,U=Math.sin(R),G=Math.cos(R);m.x=-A*G,m.y=y,m.z=A*U,o.push(m.x,m.y,m.z),p.set(-A*G,E,A*U),p.normalize(),l.push(p.x,p.y,p.z),c.push(P+v,C)}if(x>0){const T=(x-1)*_;for(let P=0;P<i;P++){const R=T+P,U=T+P+1,G=x*_+P,W=x*_+P+1;a.push(R,U,G),a.push(U,W,G)}}}this.setIndex(a),this.setAttribute("position",new ot(o,3)),this.setAttribute("normal",new ot(l,3)),this.setAttribute("uv",new ot(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pr(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class en extends Tt{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],p=n/2;let m=0;x(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new ot(u,3)),this.setAttribute("normal",new ot(d,3)),this.setAttribute("uv",new ot(f,2));function x(){const y=new I,A=new I;let E=0;const C=(t-e)/n;for(let v=0;v<=r;v++){const T=[],P=v/r,R=P*(t-e)+e;for(let U=0;U<=i;U++){const G=U/i,W=G*l+o,D=Math.sin(W),z=Math.cos(W);A.x=R*D,A.y=-P*n+p,A.z=R*z,u.push(A.x,A.y,A.z),y.set(D,C,z).normalize(),d.push(y.x,y.y,y.z),f.push(G,1-P),T.push(g++)}_.push(T)}for(let v=0;v<i;v++)for(let T=0;T<r;T++){const P=_[T][v],R=_[T+1][v],U=_[T+1][v+1],G=_[T][v+1];(e>0||T!==0)&&(h.push(P,R,G),E+=3),(t>0||T!==r-1)&&(h.push(R,U,G),E+=3)}c.addGroup(m,E,0),m+=E}function M(y){const A=g,E=new J,C=new I;let v=0;const T=y===!0?e:t,P=y===!0?1:-1;for(let U=1;U<=i;U++)u.push(0,p*P,0),d.push(0,P,0),f.push(.5,.5),g++;const R=g;for(let U=0;U<=i;U++){const W=U/i*l+o,D=Math.cos(W),z=Math.sin(W);C.x=T*z,C.y=p*P,C.z=T*D,u.push(C.x,C.y,C.z),d.push(0,P,0),E.x=D*.5+.5,E.y=z*.5*P+.5,f.push(E.x,E.y),g++}for(let U=0;U<i;U++){const G=A+U,W=R+U;y===!0?h.push(W,W+1,G):h.push(W+1,W,G),v+=3}c.addGroup(m,v,y===!0?1:2),m+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new en(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Fc extends en{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Fc(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ro extends Tt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new ot(r,3)),this.setAttribute("normal",new ot(r.slice(),3)),this.setAttribute("uv",new ot(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const M=new I,y=new I,A=new I;for(let E=0;E<t.length;E+=3)f(t[E+0],M),f(t[E+1],y),f(t[E+2],A),l(M,y,A,x)}function l(x,M,y,A){const E=A+1,C=[];for(let v=0;v<=E;v++){C[v]=[];const T=x.clone().lerp(y,v/E),P=M.clone().lerp(y,v/E),R=E-v;for(let U=0;U<=R;U++)U===0&&v===E?C[v][U]=T:C[v][U]=T.clone().lerp(P,U/R)}for(let v=0;v<E;v++)for(let T=0;T<2*(E-v)-1;T++){const P=Math.floor(T/2);T%2===0?(d(C[v][P+1]),d(C[v+1][P]),d(C[v][P])):(d(C[v][P+1]),d(C[v+1][P+1]),d(C[v+1][P]))}}function c(x){const M=new I;for(let y=0;y<r.length;y+=3)M.x=r[y+0],M.y=r[y+1],M.z=r[y+2],M.normalize().multiplyScalar(x),r[y+0]=M.x,r[y+1]=M.y,r[y+2]=M.z}function h(){const x=new I;for(let M=0;M<r.length;M+=3){x.x=r[M+0],x.y=r[M+1],x.z=r[M+2];const y=p(x)/2/Math.PI+.5,A=m(x)/Math.PI+.5;a.push(y,1-A)}g(),u()}function u(){for(let x=0;x<a.length;x+=6){const M=a[x+0],y=a[x+2],A=a[x+4],E=Math.max(M,y,A),C=Math.min(M,y,A);E>.9&&C<.1&&(M<.2&&(a[x+0]+=1),y<.2&&(a[x+2]+=1),A<.2&&(a[x+4]+=1))}}function d(x){r.push(x.x,x.y,x.z)}function f(x,M){const y=x*3;M.x=e[y+0],M.y=e[y+1],M.z=e[y+2]}function g(){const x=new I,M=new I,y=new I,A=new I,E=new J,C=new J,v=new J;for(let T=0,P=0;T<r.length;T+=9,P+=6){x.set(r[T+0],r[T+1],r[T+2]),M.set(r[T+3],r[T+4],r[T+5]),y.set(r[T+6],r[T+7],r[T+8]),E.set(a[P+0],a[P+1]),C.set(a[P+2],a[P+3]),v.set(a[P+4],a[P+5]),A.copy(x).add(M).add(y).divideScalar(3);const R=p(A);_(E,P+0,x,R),_(C,P+2,M,R),_(v,P+4,y,R)}}function _(x,M,y,A){A<0&&x.x===1&&(a[M]=x.x-1),y.x===0&&y.z===0&&(a[M]=A/2/Math.PI+.5)}function p(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ro(e.vertices,e.indices,e.radius,e.detail)}}class Oc extends ro{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Oc(e.radius,e.detail)}}class ei{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Oe("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=t||(a.isVector2?new J:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new I,i=[],r=[],a=[],o=new I,l=new Je;for(let f=0;f<=e;f++){const g=f/e;i[f]=this.getTangentAt(g,new I)}r[0]=new I,a[0]=new I;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(it(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(it(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Bc extends ei{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new J){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class nm extends Bc{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function zc(){let s=0,e=0,t=0,n=0;function i(r,a,o,l){s=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return s+e*r+t*a+n*o}}}const nu=new I,iu=new I,Go=new zc,Ho=new zc,Wo=new zc;class Ed extends ei{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new I){const n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(iu.subVectors(i[0],i[1]).add(i[0]),c=iu);const u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(nu.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=nu),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),Go.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,_,p),Ho.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,_,p),Wo.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,_,p)}else this.curveType==="catmullrom"&&(Go.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Ho.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Wo.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Go.calc(l),Ho.calc(l),Wo.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new I().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function su(s,e,t,n,i){const r=(n-e)*.5,a=(i-t)*.5,o=s*s,l=s*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*s+t}function im(s,e){const t=1-s;return t*t*e}function sm(s,e){return 2*(1-s)*s*e}function rm(s,e){return s*s*e}function xr(s,e,t,n){return im(s,e)+sm(s,t)+rm(s,n)}function am(s,e){const t=1-s;return t*t*t*e}function om(s,e){const t=1-s;return 3*t*t*s*e}function lm(s,e){return 3*(1-s)*s*s*e}function cm(s,e){return s*s*s*e}function vr(s,e,t,n,i){return am(s,e)+om(s,t)+lm(s,n)+cm(s,i)}class wd extends ei{constructor(e=new J,t=new J,n=new J,i=new J){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new J){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(vr(e,i.x,r.x,a.x,o.x),vr(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class hm extends ei{constructor(e=new I,t=new I,n=new I,i=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new I){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(vr(e,i.x,r.x,a.x,o.x),vr(e,i.y,r.y,a.y,o.y),vr(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ad extends ei{constructor(e=new J,t=new J){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new J){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new J){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class um extends ei{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Rd extends ei{constructor(e=new J,t=new J,n=new J){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new J){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(xr(e,i.x,r.x,a.x),xr(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Cd extends ei{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(xr(e,i.x,r.x,a.x),xr(e,i.y,r.y,a.y),xr(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Pd extends ei{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new J){const n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(su(o,l.x,c.x,h.x,u.x),su(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new J().fromArray(i))}return this}}var ja=Object.freeze({__proto__:null,ArcCurve:nm,CatmullRomCurve3:Ed,CubicBezierCurve:wd,CubicBezierCurve3:hm,EllipseCurve:Bc,LineCurve:Ad,LineCurve3:um,QuadraticBezierCurve:Rd,QuadraticBezierCurve3:Cd,SplineCurve:Pd});class dm extends ei{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ja[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new ja[i.type]().fromJSON(i))}return this}}class ru extends dm{constructor(e){super(),this.type="Path",this.currentPoint=new J,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Ad(this.currentPoint.clone(),new J(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new Rd(this.currentPoint.clone(),new J(e,t),new J(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,a){const o=new wd(this.currentPoint.clone(),new J(e,t),new J(n,i),new J(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Pd(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,r,a),this}absarc(e,t,n,i,r,a){return this.absellipse(e,t,n,n,i,r,a),this}ellipse(e,t,n,i,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,a,o,l),this}absellipse(e,t,n,i,r,a,o,l){const c=new Bc(e,t,n,i,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Za extends ru{constructor(e){super(e),this.uuid=Tn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new ru().fromJSON(i))}return this}}function fm(s,e,t=2){const n=e&&e.length,i=n?e[0]*t:s.length;let r=Id(s,0,i,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=xm(s,e,r,t)),s.length>80*t){o=s[0],l=s[1];let h=o,u=l;for(let d=t;d<i;d+=t){const f=s[d],g=s[d+1];f<o&&(o=f),g<l&&(l=g),f>h&&(h=f),g>u&&(u=g)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return Ir(r,a,t,o,l,c,0),a}function Id(s,e,t,n,i){let r;if(i===Cm(s,e,t,n)>0)for(let a=e;a<t;a+=n)r=au(a/n|0,s[a],s[a+1],r);else for(let a=t-n;a>=e;a-=n)r=au(a/n|0,s[a],s[a+1],r);return r&&Ns(r,r.next)&&(Dr(r),r=r.next),r}function Qi(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(Ns(t,t.next)||Et(t.prev,t,t.next)===0)){if(Dr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Ir(s,e,t,n,i,r,a){if(!s)return;!a&&r&&bm(s,n,i,r);let o=s;for(;s.prev!==s.next;){const l=s.prev,c=s.next;if(r?mm(s,n,i,r):pm(s)){e.push(l.i,s.i,c.i),Dr(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=gm(Qi(s),e),Ir(s,e,t,n,i,r,2)):a===2&&_m(s,e,t,n,i,r):Ir(Qi(s),e,t,n,i,r,1);break}}}function pm(s){const e=s.prev,t=s,n=s.next;if(Et(e,t,n)>=0)return!1;const i=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(i,r,a),u=Math.min(o,l,c),d=Math.max(i,r,a),f=Math.max(o,l,c);let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&fr(i,o,r,l,a,c,g.x,g.y)&&Et(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function mm(s,e,t,n){const i=s.prev,r=s,a=s.next;if(Et(i,r,a)>=0)return!1;const o=i.x,l=r.x,c=a.x,h=i.y,u=r.y,d=a.y,f=Math.min(o,l,c),g=Math.min(h,u,d),_=Math.max(o,l,c),p=Math.max(h,u,d),m=ec(f,g,e,t,n),x=ec(_,p,e,t,n);let M=s.prevZ,y=s.nextZ;for(;M&&M.z>=m&&y&&y.z<=x;){if(M.x>=f&&M.x<=_&&M.y>=g&&M.y<=p&&M!==i&&M!==a&&fr(o,h,l,u,c,d,M.x,M.y)&&Et(M.prev,M,M.next)>=0||(M=M.prevZ,y.x>=f&&y.x<=_&&y.y>=g&&y.y<=p&&y!==i&&y!==a&&fr(o,h,l,u,c,d,y.x,y.y)&&Et(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;M&&M.z>=m;){if(M.x>=f&&M.x<=_&&M.y>=g&&M.y<=p&&M!==i&&M!==a&&fr(o,h,l,u,c,d,M.x,M.y)&&Et(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;y&&y.z<=x;){if(y.x>=f&&y.x<=_&&y.y>=g&&y.y<=p&&y!==i&&y!==a&&fr(o,h,l,u,c,d,y.x,y.y)&&Et(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function gm(s,e){let t=s;do{const n=t.prev,i=t.next.next;!Ns(n,i)&&Dd(n,t,t.next,i)&&Lr(n,i)&&Lr(i,n)&&(e.push(n.i,t.i,i.i),Dr(t),Dr(t.next),t=s=i),t=t.next}while(t!==s);return Qi(t)}function _m(s,e,t,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&wm(a,o)){let l=Nd(a,o);a=Qi(a,a.next),l=Qi(l,l.next),Ir(a,e,t,n,i,r,0),Ir(l,e,t,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function xm(s,e,t,n){const i=[];for(let r=0,a=e.length;r<a;r++){const o=e[r]*n,l=r<a-1?e[r+1]*n:s.length,c=Id(s,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(Em(c))}i.sort(vm);for(let r=0;r<i.length;r++)t=Mm(i[r],t);return t}function vm(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){const n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function Mm(s,e){const t=ym(s,e);if(!t)return e;const n=Nd(t,s);return Qi(n,n.next),Qi(t,t.next)}function ym(s,e){let t=e;const n=s.x,i=s.y;let r=-1/0,a;if(Ns(s,t))return t;do{if(Ns(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const u=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,a=t.x<t.next.x?t:t.next,u===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Ld(i<c?n:r,i,l,c,i<c?r:n,i,t.x,t.y)){const u=Math.abs(i-t.y)/(n-t.x);Lr(t,s)&&(u<h||u===h&&(t.x>a.x||t.x===a.x&&Sm(a,t)))&&(a=t,h=u)}t=t.next}while(t!==o);return a}function Sm(s,e){return Et(s.prev,s,e.prev)<0&&Et(e.next,s,s.next)<0}function bm(s,e,t,n){let i=s;do i.z===0&&(i.z=ec(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Tm(i)}function Tm(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,t*=2}while(e>1);return s}function ec(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Em(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Ld(s,e,t,n,i,r,a,o){return(i-a)*(e-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(i-a)*(n-o)}function fr(s,e,t,n,i,r,a,o){return!(s===a&&e===o)&&Ld(s,e,t,n,i,r,a,o)}function wm(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Am(s,e)&&(Lr(s,e)&&Lr(e,s)&&Rm(s,e)&&(Et(s.prev,s,e.prev)||Et(s,e.prev,e))||Ns(s,e)&&Et(s.prev,s,s.next)>0&&Et(e.prev,e,e.next)>0)}function Et(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function Ns(s,e){return s.x===e.x&&s.y===e.y}function Dd(s,e,t,n){const i=Ma(Et(s,e,t)),r=Ma(Et(s,e,n)),a=Ma(Et(t,n,s)),o=Ma(Et(t,n,e));return!!(i!==r&&a!==o||i===0&&va(s,t,e)||r===0&&va(s,n,e)||a===0&&va(t,s,n)||o===0&&va(t,e,n))}function va(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Ma(s){return s>0?1:s<0?-1:0}function Am(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Dd(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function Lr(s,e){return Et(s.prev,s,s.next)<0?Et(s,e,s.next)>=0&&Et(s,s.prev,e)>=0:Et(s,e,s.prev)<0||Et(s,s.next,e)<0}function Rm(s,e){let t=s,n=!1;const i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function Nd(s,e){const t=tc(s.i,s.x,s.y),n=tc(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function au(s,e,t,n){const i=tc(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Dr(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function tc(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Cm(s,e,t,n){let i=0;for(let r=e,a=t-n;r<t;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class Pm{static triangulate(e,t,n=2){return fm(e,t,n)}}class hi{static area(e){const t=e.length;let n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return hi.area(e)<0}static triangulateShape(e,t){const n=[],i=[],r=[];ou(e),lu(n,e);let a=e.length;t.forEach(ou);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,lu(n,t[l]);const o=Pm.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function ou(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function lu(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class kc extends Tt{constructor(e=new Za([new J(.5,.5),new J(-.5,.5),new J(-.5,-.5),new J(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],r=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new ot(i,3)),this.setAttribute("uv",new ot(r,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,x=t.UVGenerator!==void 0?t.UVGenerator:Im;let M,y=!1,A,E,C,v;if(m){M=m.getSpacedPoints(h),y=!0,d=!1;const ee=m.isCatmullRomCurve3?m.closed:!1;A=m.computeFrenetFrames(h,ee),E=new I,C=new I,v=new I}d||(p=0,f=0,g=0,_=0);const T=o.extractPoints(c);let P=T.shape;const R=T.holes;if(!hi.isClockWise(P)){P=P.reverse();for(let ee=0,ce=R.length;ee<ce;ee++){const te=R[ee];hi.isClockWise(te)&&(R[ee]=te.reverse())}}function G(ee){const te=10000000000000001e-36;let ye=ee[0];for(let xe=1;xe<=ee.length;xe++){const Xe=xe%ee.length,L=ee[Xe],Ye=L.x-ye.x,Ue=L.y-ye.y,qe=Ye*Ye+Ue*Ue,he=Math.max(Math.abs(L.x),Math.abs(L.y),Math.abs(ye.x),Math.abs(ye.y)),ut=te*he*he;if(qe<=ut){ee.splice(Xe,1),xe--;continue}ye=L}}G(P),R.forEach(G);const W=R.length,D=P;for(let ee=0;ee<W;ee++){const ce=R[ee];P=P.concat(ce)}function z(ee,ce,te){return ce||He("ExtrudeGeometry: vec does not exist"),ee.clone().addScaledVector(ce,te)}const O=P.length;function ne(ee,ce,te){let ye,xe,Xe;const L=ee.x-ce.x,Ye=ee.y-ce.y,Ue=te.x-ee.x,qe=te.y-ee.y,he=L*L+Ye*Ye,ut=L*qe-Ye*Ue;if(Math.abs(ut)>Number.EPSILON){const w=Math.sqrt(he),S=Math.sqrt(Ue*Ue+qe*qe),B=ce.x-Ye/w,K=ce.y+L/w,se=te.x-qe/S,ue=te.y+Ue/S,pe=((se-B)*qe-(ue-K)*Ue)/(L*qe-Ye*Ue);ye=B+L*pe-ee.x,xe=K+Ye*pe-ee.y;const X=ye*ye+xe*xe;if(X<=2)return new J(ye,xe);Xe=Math.sqrt(X/2)}else{let w=!1;L>Number.EPSILON?Ue>Number.EPSILON&&(w=!0):L<-Number.EPSILON?Ue<-Number.EPSILON&&(w=!0):Math.sign(Ye)===Math.sign(qe)&&(w=!0),w?(ye=-Ye,xe=L,Xe=Math.sqrt(he)):(ye=L,xe=Ye,Xe=Math.sqrt(he/2))}return new J(ye/Xe,xe/Xe)}const ie=[];for(let ee=0,ce=D.length,te=ce-1,ye=ee+1;ee<ce;ee++,te++,ye++)te===ce&&(te=0),ye===ce&&(ye=0),ie[ee]=ne(D[ee],D[te],D[ye]);const j=[];let $,Q=ie.concat();for(let ee=0,ce=W;ee<ce;ee++){const te=R[ee];$=[];for(let ye=0,xe=te.length,Xe=xe-1,L=ye+1;ye<xe;ye++,Xe++,L++)Xe===xe&&(Xe=0),L===xe&&(L=0),$[ye]=ne(te[ye],te[Xe],te[L]);j.push($),Q=Q.concat($)}let Te;if(p===0)Te=hi.triangulateShape(D,R);else{const ee=[],ce=[];for(let te=0;te<p;te++){const ye=te/p,xe=f*Math.cos(ye*Math.PI/2),Xe=g*Math.sin(ye*Math.PI/2)+_;for(let L=0,Ye=D.length;L<Ye;L++){const Ue=z(D[L],ie[L],Xe);Le(Ue.x,Ue.y,-xe),ye===0&&ee.push(Ue)}for(let L=0,Ye=W;L<Ye;L++){const Ue=R[L];$=j[L];const qe=[];for(let he=0,ut=Ue.length;he<ut;he++){const w=z(Ue[he],$[he],Xe);Le(w.x,w.y,-xe),ye===0&&qe.push(w)}ye===0&&ce.push(qe)}}Te=hi.triangulateShape(ee,ce)}const Ne=Te.length,Ee=g+_;for(let ee=0;ee<O;ee++){const ce=d?z(P[ee],Q[ee],Ee):P[ee];y?(C.copy(A.normals[0]).multiplyScalar(ce.x),E.copy(A.binormals[0]).multiplyScalar(ce.y),v.copy(M[0]).add(C).add(E),Le(v.x,v.y,v.z)):Le(ce.x,ce.y,0)}for(let ee=1;ee<=h;ee++)for(let ce=0;ce<O;ce++){const te=d?z(P[ce],Q[ce],Ee):P[ce];y?(C.copy(A.normals[ee]).multiplyScalar(te.x),E.copy(A.binormals[ee]).multiplyScalar(te.y),v.copy(M[ee]).add(C).add(E),Le(v.x,v.y,v.z)):Le(te.x,te.y,u/h*ee)}for(let ee=p-1;ee>=0;ee--){const ce=ee/p,te=f*Math.cos(ce*Math.PI/2),ye=g*Math.sin(ce*Math.PI/2)+_;for(let xe=0,Xe=D.length;xe<Xe;xe++){const L=z(D[xe],ie[xe],ye);Le(L.x,L.y,u+te)}for(let xe=0,Xe=R.length;xe<Xe;xe++){const L=R[xe];$=j[xe];for(let Ye=0,Ue=L.length;Ye<Ue;Ye++){const qe=z(L[Ye],$[Ye],ye);y?Le(qe.x,qe.y+M[h-1].y,M[h-1].x+te):Le(qe.x,qe.y,u+te)}}}q(),_e();function q(){const ee=i.length/3;if(d){let ce=0,te=O*ce;for(let ye=0;ye<Ne;ye++){const xe=Te[ye];Ve(xe[2]+te,xe[1]+te,xe[0]+te)}ce=h+p*2,te=O*ce;for(let ye=0;ye<Ne;ye++){const xe=Te[ye];Ve(xe[0]+te,xe[1]+te,xe[2]+te)}}else{for(let ce=0;ce<Ne;ce++){const te=Te[ce];Ve(te[2],te[1],te[0])}for(let ce=0;ce<Ne;ce++){const te=Te[ce];Ve(te[0]+O*h,te[1]+O*h,te[2]+O*h)}}n.addGroup(ee,i.length/3-ee,0)}function _e(){const ee=i.length/3;let ce=0;oe(D,ce),ce+=D.length;for(let te=0,ye=R.length;te<ye;te++){const xe=R[te];oe(xe,ce),ce+=xe.length}n.addGroup(ee,i.length/3-ee,1)}function oe(ee,ce){let te=ee.length;for(;--te>=0;){const ye=te;let xe=te-1;xe<0&&(xe=ee.length-1);for(let Xe=0,L=h+p*2;Xe<L;Xe++){const Ye=O*Xe,Ue=O*(Xe+1),qe=ce+ye+Ye,he=ce+xe+Ye,ut=ce+xe+Ue,w=ce+ye+Ue;Ge(qe,he,ut,w)}}}function Le(ee,ce,te){l.push(ee),l.push(ce),l.push(te)}function Ve(ee,ce,te){lt(ee),lt(ce),lt(te);const ye=i.length/3,xe=x.generateTopUV(n,i,ye-3,ye-2,ye-1);We(xe[0]),We(xe[1]),We(xe[2])}function Ge(ee,ce,te,ye){lt(ee),lt(ce),lt(ye),lt(ce),lt(te),lt(ye);const xe=i.length/3,Xe=x.generateSideWallUV(n,i,xe-6,xe-3,xe-2,xe-1);We(Xe[0]),We(Xe[1]),We(Xe[3]),We(Xe[1]),We(Xe[2]),We(Xe[3])}function lt(ee){i.push(l[ee*3+0]),i.push(l[ee*3+1]),i.push(l[ee*3+2])}function We(ee){r.push(ee.x),r.push(ee.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Lm(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const o=t[e.shapes[r]];n.push(o)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new ja[i.type]().fromJSON(i)),new kc(n,e.options)}}const Im={generateTopUV:function(s,e,t,n,i){const r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new J(r,a),new J(o,l),new J(c,h)]},generateSideWallUV:function(s,e,t,n,i,r){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],f=e[i*3+1],g=e[i*3+2],_=e[r*3],p=e[r*3+1],m=e[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new J(a,1-l),new J(c,1-u),new J(d,1-g),new J(_,1-m)]:[new J(o,1-l),new J(h,1-u),new J(f,1-g),new J(p,1-m)]}};function Lm(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Vc extends ro{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Vc(e.radius,e.detail)}}class dt extends Tt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,f=[],g=[],_=[],p=[];for(let m=0;m<h;m++){const x=m*d-a;for(let M=0;M<c;M++){const y=M*u-r;g.push(y,-x,0),_.push(0,0,1),p.push(M/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let x=0;x<o;x++){const M=x+c*m,y=x+c*(m+1),A=x+1+c*(m+1),E=x+1+c*m;f.push(M,y,E),f.push(y,A,E)}this.setIndex(f),this.setAttribute("position",new ot(g,3)),this.setAttribute("normal",new ot(_,3)),this.setAttribute("uv",new ot(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dt(e.width,e.height,e.widthSegments,e.heightSegments)}}class Gc extends Tt{constructor(e=new Za([new J(0,.5),new J(-.5,-.5),new J(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],r=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new ot(i,3)),this.setAttribute("normal",new ot(r,3)),this.setAttribute("uv",new ot(a,2));function c(h){const u=i.length/3,d=h.extractPoints(t);let f=d.shape;const g=d.holes;hi.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,m=g.length;p<m;p++){const x=g[p];hi.isClockWise(x)===!0&&(g[p]=x.reverse())}const _=hi.triangulateShape(f,g);for(let p=0,m=g.length;p<m;p++){const x=g[p];f=f.concat(x)}for(let p=0,m=f.length;p<m;p++){const x=f[p];i.push(x.x,x.y,0),r.push(0,0,1),a.push(x.x,x.y)}for(let p=0,m=_.length;p<m;p++){const x=_[p],M=x[0]+u,y=x[1]+u,A=x[2]+u;n.push(M,y,A),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Dm(t,e)}static fromJSON(e,t){const n=[];for(let i=0,r=e.shapes.length;i<r;i++){const a=t[e.shapes[i]];n.push(a)}return new Gc(n,e.curveSegments)}}function Dm(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){const i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}class Nr extends Tt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new I,d=new I,f=[],g=[],_=[],p=[];for(let m=0;m<=n;m++){const x=[],M=m/n;let y=0;m===0&&a===0?y=.5/t:m===n&&l===Math.PI&&(y=-.5/t);for(let A=0;A<=t;A++){const E=A/t;u.x=-e*Math.cos(i+E*r)*Math.sin(a+M*o),u.y=e*Math.cos(a+M*o),u.z=e*Math.sin(i+E*r)*Math.sin(a+M*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),p.push(E+y,1-M),x.push(c++)}h.push(x)}for(let m=0;m<n;m++)for(let x=0;x<t;x++){const M=h[m][x+1],y=h[m][x],A=h[m+1][x],E=h[m+1][x+1];(m!==0||a>0)&&f.push(M,y,E),(m!==n-1||l<Math.PI)&&f.push(y,A,E)}this.setIndex(f),this.setAttribute("position",new ot(g,3)),this.setAttribute("normal",new ot(_,3)),this.setAttribute("uv",new ot(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class $a extends Tt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);const l=[],c=[],h=[],u=[],d=new I,f=new I,g=new I;for(let _=0;_<=n;_++){const p=a+_/n*o;for(let m=0;m<=i;m++){const x=m/i*r;f.x=(e+t*Math.cos(p))*Math.cos(x),f.y=(e+t*Math.cos(p))*Math.sin(x),f.z=t*Math.sin(p),c.push(f.x,f.y,f.z),d.x=e*Math.cos(x),d.y=e*Math.sin(x),g.subVectors(f,d).normalize(),h.push(g.x,g.y,g.z),u.push(m/i),u.push(_/n)}}for(let _=1;_<=n;_++)for(let p=1;p<=i;p++){const m=(i+1)*_+p-1,x=(i+1)*(_-1)+p-1,M=(i+1)*(_-1)+p,y=(i+1)*_+p;l.push(m,x,y),l.push(x,M,y)}this.setIndex(l),this.setAttribute("position",new ot(c,3)),this.setAttribute("normal",new ot(h,3)),this.setAttribute("uv",new ot(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $a(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Hc extends Tt{constructor(e=new Cd(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new I,l=new I,c=new J;let h=new I;const u=[],d=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new ot(u,3)),this.setAttribute("normal",new ot(d,3)),this.setAttribute("uv",new ot(f,2));function _(){for(let M=0;M<t;M++)p(M);p(r===!1?t:0),x(),m()}function p(M){h=e.getPointAt(M/t,h);const y=a.normals[M],A=a.binormals[M];for(let E=0;E<=i;E++){const C=E/i*Math.PI*2,v=Math.sin(C),T=-Math.cos(C);l.x=T*y.x+v*A.x,l.y=T*y.y+v*A.y,l.z=T*y.z+v*A.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}function m(){for(let M=1;M<=t;M++)for(let y=1;y<=i;y++){const A=(i+1)*(M-1)+(y-1),E=(i+1)*M+(y-1),C=(i+1)*M+y,v=(i+1)*(M-1)+y;g.push(A,E,v),g.push(E,C,v)}}function x(){for(let M=0;M<=t;M++)for(let y=0;y<=i;y++)c.x=M/t,c.y=y/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Hc(new ja[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function Us(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];if(cu(i))i.isRenderTargetTexture?(Oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(cu(i[0])){const r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function rn(s){const e={};for(let t=0;t<s.length;t++){const n=Us(s[t]);for(const i in n)e[i]=n[i]}return e}function cu(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Nm(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Ud(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:rt.workingColorSpace}const Ur={clone:Us,merge:rn};var Um=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vt extends Ln{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Um,this.fragmentShader=Fm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Us(e.uniforms),this.uniformsGroups=Nm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Fd extends Vt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class yn extends Ln{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new De(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kl,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Fn extends yn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new J(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return it(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new De(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new De(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new De(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Om extends Ln{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=$f,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Bm extends Ln{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function ya(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function zm(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function hu(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let l=0;l!==e;++l)i[a++]=s[o+l]}return i}function Od(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}class Gs{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class km extends Gs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:bs,endingEnd:bs}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ts:r=e,o=2*t-n;break;case Ha:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ts:a=e,l=2*n-t;break;case Ha:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),_=g*g,p=_*g,m=-d*p+2*d*_-d*g,x=(1+d)*p+(-1.5-2*d)*_+(-.5+d)*g+1,M=(-1-f)*p+(1.5+f)*_+.5*g,y=f*p-f*_;for(let A=0;A!==o;++A)r[A]=m*a[h+A]+x*a[c+A]+M*a[l+A]+y*a[u+A];return r}}class Bd extends Gs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}}class Vm extends Gs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Gm extends Gs{interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.settings||this.DefaultSettings_,u=h.inTangents,d=h.outTangents;if(!u||!d){const _=(n-t)/(i-t),p=1-_;for(let m=0;m!==o;++m)r[m]=a[c+m]*p+a[l+m]*_;return r}const f=o*2,g=e-1;for(let _=0;_!==o;++_){const p=a[c+_],m=a[l+_],x=g*f+_*2,M=d[x],y=d[x+1],A=e*f+_*2,E=u[A],C=u[A+1];let v=(n-t)/(i-t),T,P,R,U,G;for(let W=0;W<8;W++){T=v*v,P=T*v,R=1-v,U=R*R,G=U*R;const z=G*t+3*U*v*M+3*R*T*E+P*i-n;if(Math.abs(z)<1e-10)break;const O=3*U*(M-t)+6*R*v*(E-M)+3*T*(i-E);if(Math.abs(O)<1e-10)break;v=v-z/O,v=Math.max(0,Math.min(1,v))}r[_]=G*p+3*U*v*y+3*R*T*C+P*m}return r}}class On{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ya(t,this.TimeBufferType),this.values=ya(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ya(e.times,Array),values:ya(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Vm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Bd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new km(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new Gm(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case Er:t=this.InterpolantFactoryMethodDiscrete;break;case wr:t=this.InterpolantFactoryMethodLinear;break;case mo:t=this.InterpolantFactoryMethodSmooth;break;case Sh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Oe("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Er;case this.InterpolantFactoryMethodLinear:return wr;case this.InterpolantFactoryMethodSmooth:return mo;case this.InterpolantFactoryMethodBezier:return Sh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(He("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(He("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){He("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){He("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&ap(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){He("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===mo,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{const u=o*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}On.prototype.ValueTypeName="";On.prototype.TimeBufferType=Float32Array;On.prototype.ValueBufferType=Float32Array;On.prototype.DefaultInterpolation=wr;class Hs extends On{constructor(e,t,n){super(e,t,n)}}Hs.prototype.ValueTypeName="bool";Hs.prototype.ValueBufferType=Array;Hs.prototype.DefaultInterpolation=Er;Hs.prototype.InterpolantFactoryMethodLinear=void 0;Hs.prototype.InterpolantFactoryMethodSmooth=void 0;class zd extends On{constructor(e,t,n,i){super(e,t,n,i)}}zd.prototype.ValueTypeName="color";class Fs extends On{constructor(e,t,n,i){super(e,t,n,i)}}Fs.prototype.ValueTypeName="number";class Hm extends Gs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let h=c+o;c!==h;c+=4)En.slerpFlat(r,0,a,c-o,a,c,l);return r}}class Os extends On{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Hm(this.times,this.values,this.getValueSize(),e)}}Os.prototype.ValueTypeName="quaternion";Os.prototype.InterpolantFactoryMethodSmooth=void 0;class Ws extends On{constructor(e,t,n){super(e,t,n)}}Ws.prototype.ValueTypeName="string";Ws.prototype.ValueBufferType=Array;Ws.prototype.DefaultInterpolation=Er;Ws.prototype.InterpolantFactoryMethodLinear=void 0;Ws.prototype.InterpolantFactoryMethodSmooth=void 0;class Bs extends On{constructor(e,t,n,i){super(e,t,n,i)}}Bs.prototype.ValueTypeName="vector";class nc{constructor(e="",t=-1,n=[],i=Ec){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Tn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Xm(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(On.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const h=zm(l);l=hu(l,1,h),c=hu(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new Fs(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(Oe("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return He("AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,_){if(f.length!==0){const p=[],m=[];Od(f,p,m,g),p.length!==0&&_.push(new u(d,p,m))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const p=[],m=[];for(let x=0;x!==d[g].morphTargets.length;++x){const M=d[g];p.push(M.time),m.push(M.morphTarget===_?1:0)}i.push(new Fs(".morphTargetInfluence["+_+"]",p,m))}l=f.length*a}else{const f=".bones["+t[u].name+"]";n(Bs,f+".position",d,"pos",i),n(Os,f+".quaternion",d,"rot",i),n(Bs,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Wm(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Fs;case"vector":case"vector2":case"vector3":case"vector4":return Bs;case"color":return zd;case"quaternion":return Os;case"bool":case"boolean":return Hs;case"string":return Ws}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Xm(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Wm(s.type);if(s.times===void 0){const t=[],n=[];Od(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const ui={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(uu(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!uu(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function uu(s){try{const e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class qm{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Ym=new qm;class Xs{constructor(e){this.manager=e!==void 0?e:Ym,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Xs.DEFAULT_MATERIAL_NAME="__DEFAULT";const oi={};class Km extends Error{constructor(e,t){super(e),this.response=t}}class kd extends Xs{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=ui.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(oi[e]!==void 0){oi[e].push({onLoad:t,onProgress:n,onError:i});return}oi[e]=[],oi[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Oe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=oi[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const p=new ReadableStream({start(m){x();function x(){u.read().then(({done:M,value:y})=>{if(M)m.close();else{_+=y.byteLength;const A=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let E=0,C=h.length;E<C;E++){const v=h[E];v.onProgress&&v.onProgress(A)}m.enqueue(y),x()}},M=>{m.error(M)})}}});return new Response(p)}else throw new Km(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{ui.add(`file:${e}`,c);const h=oi[e];delete oi[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=oi[e];if(h===void 0)throw this.manager.itemError(e),c;delete oi[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const vs=new WeakMap;class jm extends Xs{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=ui.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=vs.get(a);u===void 0&&(u=[],vs.set(a,u)),u.push({onLoad:t,onError:i})}return a}const o=Rr("img");function l(){h(),t&&t(this);const u=vs.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}vs.delete(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),ui.remove(`image:${e}`);const d=vs.get(this)||[];for(let f=0;f<d.length;f++){const g=d[f];g.onError&&g.onError(u)}vs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ui.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class Zm extends Xs{constructor(e){super(e)}load(e,t,n,i){const r=new Gt,a=new jm(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class zr extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new De(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class $m extends zr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.groundColor=new De(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Xo=new Je,du=new I,fu=new I;class Wc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new J(512,512),this.mapType=fn,this.map=null,this.mapPass=null,this.matrix=new Je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Uc,this._frameExtents=new J(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;du.setFromMatrixPosition(e.matrixWorld),t.position.copy(du),fu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(fu),t.updateMatrixWorld(),Xo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xo,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ar||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Xo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Sa=new I,ba=new En,kn=new I;class Vd extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Je,this.projectionMatrix=new Je,this.projectionMatrixInverse=new Je,this.coordinateSystem=Xn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Sa,ba,kn),kn.x===1&&kn.y===1&&kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Sa,ba,kn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Sa,ba,kn),kn.x===1&&kn.y===1&&kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Sa,ba,kn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const wi=new I,pu=new J,mu=new J;class tn extends Vd{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ls*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(gr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ls*2*Math.atan(Math.tan(gr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(wi.x,wi.y).multiplyScalar(-e/wi.z),wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(wi.x,wi.y).multiplyScalar(-e/wi.z)}getViewSize(e,t){return this.getViewBounds(e,pu,mu),t.subVectors(mu,pu)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(gr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Jm extends Wc{constructor(){super(new tn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Ls*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class ic extends zr{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Jm}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class Qm extends Wc{constructor(){super(new tn(90,1,.5,500)),this.isPointLightShadow=!0}}class Fr extends zr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Qm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class kr extends Vd{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class e0 extends Wc{constructor(){super(new kr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Rs extends zr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new e0}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class t0 extends zr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Mr{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const qo=new WeakMap;class n0 extends Xs{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Oe("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Oe("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=ui.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{qo.has(a)===!0?(i&&i(qo.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){ui.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e)}).catch(function(c){i&&i(c),qo.set(l,c),ui.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});ui.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Ms=-90,ys=1;class i0 extends St{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new tn(Ms,ys,e,t);i.layers=this.layers,this.add(i);const r=new tn(Ms,ys,e,t);r.layers=this.layers,this.add(r);const a=new tn(Ms,ys,e,t);a.layers=this.layers,this.add(a);const o=new tn(Ms,ys,e,t);o.layers=this.layers,this.add(o);const l=new tn(Ms,ys,e,t);l.layers=this.layers,this.add(l);const c=new tn(Ms,ys,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Xn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ar)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class s0 extends tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class r0{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=a0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function a0(){this._document.hidden===!1&&this.reset()}class o0{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,a;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,r=e*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[r+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,r,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,a=i;r!==a;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){En.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){const a=this._workIndex*r;En.multiplyQuaternionsFlat(e,a,e,t,e,n),En.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,r){const a=1-i;for(let o=0;o!==r;++o){const l=t+o;e[l]=e[l]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,r){for(let a=0;a!==r;++a){const o=t+a;e[o]=e[o]+e[n+a]*i}}}const Xc="\\[\\]\\.:\\/",l0=new RegExp("["+Xc+"]","g"),qc="[^"+Xc+"]",c0="[^"+Xc.replace("\\.","")+"]",h0=/((?:WC+[\/:])*)/.source.replace("WC",qc),u0=/(WCOD+)?/.source.replace("WCOD",c0),d0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",qc),f0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",qc),p0=new RegExp("^"+h0+u0+d0+f0+"$"),m0=["material","materials","bones","map"];class g0{constructor(e,t,n){const i=n||pt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class pt{constructor(e,t,n){this.path=t,this.parsedPath=n||pt.parseTrackName(t),this.node=pt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new pt.Composite(e,t,n):new pt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(l0,"")}static parseTrackName(e){const t=p0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);m0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=pt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Oe("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){He("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){He("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){He("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){He("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){He("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){He("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){He("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;He("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){He("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){He("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}pt.Composite=g0;pt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pt.prototype.GetterByBindingType=[pt.prototype._getValue_direct,pt.prototype._getValue_array,pt.prototype._getValue_arrayElement,pt.prototype._getValue_toArray];pt.prototype.SetterByBindingTypeAndVersioning=[[pt.prototype._setValue_direct,pt.prototype._setValue_direct_setNeedsUpdate,pt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_array,pt.prototype._setValue_array_setNeedsUpdate,pt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_arrayElement,pt.prototype._setValue_arrayElement_setNeedsUpdate,pt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_fromArray,pt.prototype._setValue_fromArray_setNeedsUpdate,pt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class _0{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const r=t.tracks,a=r.length,o=new Array(a),l={endingStart:bs,endingEnd:bs};for(let c=0;c!==a;++c){const h=r[c].createInterpolant(null);o[c]=h,h.settings&&Object.assign(l,h.settings),h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=ql,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const i=this._clip.duration,r=e._clip.duration,a=r/i,o=i/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,r=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case jf:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case Ec:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,r=this._loopCount;const a=n===Kf;if(e===0)return r===-1?i:a&&(r&1)===1?t-i:i;if(n===ws){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){const o=Math.floor(i/t);i-=t*o,r+=Math.abs(o);const l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=r,this.time=i;if(a&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Ts,i.endingEnd=Ts):(e?i.endingStart=this.zeroSlopeAtStart?Ts:bs:i.endingStart=Ha,t?i.endingEnd=this.zeroSlopeAtEnd?Ts:bs:i.endingEnd=Ha)}_scheduleFading(e,t,n){const i=this._mixer,r=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=r,l[0]=t,o[1]=r+e,l[1]=n,this}}const x0=new Float32Array(1);class Gd extends Ni{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){const d=i[u],f=d.name;let g=h[f];if(g!==void 0)++g.referenceCount,a[u]=g;else{if(g=a[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}const _=t&&t._propertyBindings[u].binding.parsedPath;g=new o0(pt.create(n,f,_),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),a[u]=g}o[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,r=this._actionsByClip;let a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,a=this._actionsByClip,o=a[r],l=o.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,r=this._bindings;let a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Bd(new Float32Array(2),new Float32Array(2),1,x0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const i=t||this._root,r=i.uuid;let a=typeof e=="string"?nc.findByName(i,e):e;const o=a!==null?a.uuid:e,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Ec),l!==void 0){const u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const h=new _0(this,a,t,n);return this._bindAction(h,c),this._addInactiveAction(h,o,r),h}existingAction(e,t){const n=t||this._root,i=n.uuid,r=typeof e=="string"?nc.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const a=r.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(const a in r){const o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const gu=new Je;class Hd{constructor(e,t,n=0,i=1/0){this.ray=new Br(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Pc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):He("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return gu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(gu),this}intersectObject(e,t=!0,n=[]){return sc(e,this,n,t),n.sort(_u),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)sc(e[i],this,n,t);return n.sort(_u),n}}function _u(s,e){return s.distance-e.distance}function sc(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)sc(r[a],e,t,!0)}}const ch=class ch{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}};ch.prototype.isMatrix2=!0;let xu=ch;function vu(s,e,t,n){const i=v0(n);switch(t){case cd:return s*e;case yc:return s*e/i.components*i.byteLength;case Sc:return s*e/i.components*i.byteLength;case Ji:return s*e*2/i.components*i.byteLength;case bc:return s*e*2/i.components*i.byteLength;case hd:return s*e*3/i.components*i.byteLength;case bn:return s*e*4/i.components*i.byteLength;case Tc:return s*e*4/i.components*i.byteLength;case La:case Da:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Na:case Ua:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case _l:case vl:return Math.max(s,16)*Math.max(e,8)/4;case gl:case xl:return Math.max(s,8)*Math.max(e,8)/2;case Ml:case yl:case bl:case Tl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Sl:case Va:case El:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case wl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Al:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Rl:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Cl:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Pl:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Il:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Ll:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Dl:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Nl:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Ul:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Fl:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Ol:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Bl:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case zl:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case kl:case Vl:case Gl:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Hl:case Wl:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Ga:case Xl:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function v0(s){switch(s){case fn:case rd:return{byteLength:1,components:1};case br:case ad:case pn:return{byteLength:2,components:1};case vc:case Mc:return{byteLength:2,components:4};case $n:case xc:case Sn:return{byteLength:4,components:1};case od:case ld:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:uc}}));typeof window<"u"&&(window.__THREE__?Oe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=uc);function Wd(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function M0(s){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const _=u[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var y0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,S0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,b0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,T0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,E0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,w0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,A0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,R0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,C0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,P0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,I0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,L0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,D0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,N0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,U0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,F0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,O0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,B0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,z0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,k0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,V0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,G0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,H0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,W0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,X0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,q0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Y0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,K0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,j0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Z0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$0="gl_FragColor = linearToOutputTexel( gl_FragColor );",J0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Q0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,eg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,tg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ng=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ig=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,sg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ag=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,og=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,cg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ug=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,dg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,fg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,pg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_g=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,vg=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Mg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,yg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Sg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bg=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Tg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Eg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ag=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Rg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ig=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Dg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ng=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ug=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Fg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Og=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Bg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,kg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Vg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Wg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Xg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Yg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Kg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,jg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,$g=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Jg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,e_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,t_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,n_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,i_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,s_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,r_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,a_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,o_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,l_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,c_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,h_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,u_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,d_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,f_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,p_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,m_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,g_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,__=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,x_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,v_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,M_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const y_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,S_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,b_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,T_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,E_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,w_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,A_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,R_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,C_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,P_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,I_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,L_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,D_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,N_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,U_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,F_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,O_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,B_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,z_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,k_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,V_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,G_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,H_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,W_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,X_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,q_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Y_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,K_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,j_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Z_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,J_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Q_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ex=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,tt={alphahash_fragment:y0,alphahash_pars_fragment:S0,alphamap_fragment:b0,alphamap_pars_fragment:T0,alphatest_fragment:E0,alphatest_pars_fragment:w0,aomap_fragment:A0,aomap_pars_fragment:R0,batching_pars_vertex:C0,batching_vertex:P0,begin_vertex:I0,beginnormal_vertex:L0,bsdfs:D0,iridescence_fragment:N0,bumpmap_pars_fragment:U0,clipping_planes_fragment:F0,clipping_planes_pars_fragment:O0,clipping_planes_pars_vertex:B0,clipping_planes_vertex:z0,color_fragment:k0,color_pars_fragment:V0,color_pars_vertex:G0,color_vertex:H0,common:W0,cube_uv_reflection_fragment:X0,defaultnormal_vertex:q0,displacementmap_pars_vertex:Y0,displacementmap_vertex:K0,emissivemap_fragment:j0,emissivemap_pars_fragment:Z0,colorspace_fragment:$0,colorspace_pars_fragment:J0,envmap_fragment:Q0,envmap_common_pars_fragment:eg,envmap_pars_fragment:tg,envmap_pars_vertex:ng,envmap_physical_pars_fragment:fg,envmap_vertex:ig,fog_vertex:sg,fog_pars_vertex:rg,fog_fragment:ag,fog_pars_fragment:og,gradientmap_pars_fragment:lg,lightmap_pars_fragment:cg,lights_lambert_fragment:hg,lights_lambert_pars_fragment:ug,lights_pars_begin:dg,lights_toon_fragment:pg,lights_toon_pars_fragment:mg,lights_phong_fragment:gg,lights_phong_pars_fragment:_g,lights_physical_fragment:xg,lights_physical_pars_fragment:vg,lights_fragment_begin:Mg,lights_fragment_maps:yg,lights_fragment_end:Sg,lightprobes_pars_fragment:bg,logdepthbuf_fragment:Tg,logdepthbuf_pars_fragment:Eg,logdepthbuf_pars_vertex:wg,logdepthbuf_vertex:Ag,map_fragment:Rg,map_pars_fragment:Cg,map_particle_fragment:Pg,map_particle_pars_fragment:Ig,metalnessmap_fragment:Lg,metalnessmap_pars_fragment:Dg,morphinstance_vertex:Ng,morphcolor_vertex:Ug,morphnormal_vertex:Fg,morphtarget_pars_vertex:Og,morphtarget_vertex:Bg,normal_fragment_begin:zg,normal_fragment_maps:kg,normal_pars_fragment:Vg,normal_pars_vertex:Gg,normal_vertex:Hg,normalmap_pars_fragment:Wg,clearcoat_normal_fragment_begin:Xg,clearcoat_normal_fragment_maps:qg,clearcoat_pars_fragment:Yg,iridescence_pars_fragment:Kg,opaque_fragment:jg,packing:Zg,premultiplied_alpha_fragment:$g,project_vertex:Jg,dithering_fragment:Qg,dithering_pars_fragment:e_,roughnessmap_fragment:t_,roughnessmap_pars_fragment:n_,shadowmap_pars_fragment:i_,shadowmap_pars_vertex:s_,shadowmap_vertex:r_,shadowmask_pars_fragment:a_,skinbase_vertex:o_,skinning_pars_vertex:l_,skinning_vertex:c_,skinnormal_vertex:h_,specularmap_fragment:u_,specularmap_pars_fragment:d_,tonemapping_fragment:f_,tonemapping_pars_fragment:p_,transmission_fragment:m_,transmission_pars_fragment:g_,uv_pars_fragment:__,uv_pars_vertex:x_,uv_vertex:v_,worldpos_vertex:M_,background_vert:y_,background_frag:S_,backgroundCube_vert:b_,backgroundCube_frag:T_,cube_vert:E_,cube_frag:w_,depth_vert:A_,depth_frag:R_,distance_vert:C_,distance_frag:P_,equirect_vert:I_,equirect_frag:L_,linedashed_vert:D_,linedashed_frag:N_,meshbasic_vert:U_,meshbasic_frag:F_,meshlambert_vert:O_,meshlambert_frag:B_,meshmatcap_vert:z_,meshmatcap_frag:k_,meshnormal_vert:V_,meshnormal_frag:G_,meshphong_vert:H_,meshphong_frag:W_,meshphysical_vert:X_,meshphysical_frag:q_,meshtoon_vert:Y_,meshtoon_frag:K_,points_vert:j_,points_frag:Z_,shadow_vert:$_,shadow_frag:J_,sprite_vert:Q_,sprite_frag:ex},ve={common:{diffuse:{value:new De(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new J(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new De(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new De(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new De(16777215)},opacity:{value:1},center:{value:new J(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},Wn={basic:{uniforms:rn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:rn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new De(0)},envMapIntensity:{value:1}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:rn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new De(0)},specular:{value:new De(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:rn([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new De(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:rn([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new De(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:rn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:rn([ve.points,ve.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:rn([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:rn([ve.common,ve.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:rn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:rn([ve.sprite,ve.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distance:{uniforms:rn([ve.common,ve.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distance_vert,fragmentShader:tt.distance_frag},shadow:{uniforms:rn([ve.lights,ve.fog,{color:{value:new De(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};Wn.physical={uniforms:rn([Wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new J(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new De(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new J},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new De(0)},specularColor:{value:new De(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new J},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};const Ta={r:0,b:0,g:0},tx=new Je,Xd=new je;Xd.set(-1,0,0,0,1,0,0,0,1);function nx(s,e,t,n,i,r){const a=new De(0);let o=i===!0?0:1,l,c,h=null,u=0,d=null;function f(x){let M=x.isScene===!0?x.background:null;if(M&&M.isTexture){const y=x.backgroundBlurriness>0;M=e.get(M,y)}return M}function g(x){let M=!1;const y=f(x);y===null?p(a,o):y&&y.isColor&&(p(y,1),M=!0);const A=s.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(x,M){const y=f(M);y&&(y.isCubeTexture||y.mapping===no)?(c===void 0&&(c=new we(new Ui(1,1,1),new Vt({name:"BackgroundCubeMaterial",uniforms:Us(Wn.backgroundCube.uniforms),vertexShader:Wn.backgroundCube.vertexShader,fragmentShader:Wn.backgroundCube.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(tx.makeRotationFromEuler(M.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Xd),c.material.toneMapped=rt.getTransfer(y.colorSpace)!==ft,(h!==y||u!==y.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=y,u=y.version,d=s.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new we(new dt(2,2),new Vt({name:"BackgroundMaterial",uniforms:Us(Wn.background.uniforms),vertexShader:Wn.background.vertexShader,fragmentShader:Wn.background.fragmentShader,side:mi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=rt.getTransfer(y.colorSpace)!==ft,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||u!==y.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=y,u=y.version,d=s.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function p(x,M){x.getRGB(Ta,Ud(s)),t.buffers.color.setClear(Ta.r,Ta.g,Ta.b,M,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,M=1){a.set(x),o=M,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,p(a,o)},render:g,addToRenderList:_,dispose:m}}function ix(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,a=!1;function o(R,U,G,W,D){let z=!1;const O=u(R,W,G,U);r!==O&&(r=O,c(r.object)),z=f(R,W,G,D),z&&g(R,W,G,D),D!==null&&e.update(D,s.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,y(R,U,G,W),D!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(D).buffer))}function l(){return s.createVertexArray()}function c(R){return s.bindVertexArray(R)}function h(R){return s.deleteVertexArray(R)}function u(R,U,G,W){const D=W.wireframe===!0;let z=n[U.id];z===void 0&&(z={},n[U.id]=z);const O=R.isInstancedMesh===!0?R.id:0;let ne=z[O];ne===void 0&&(ne={},z[O]=ne);let ie=ne[G.id];ie===void 0&&(ie={},ne[G.id]=ie);let j=ie[D];return j===void 0&&(j=d(l()),ie[D]=j),j}function d(R){const U=[],G=[],W=[];for(let D=0;D<t;D++)U[D]=0,G[D]=0,W[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:G,attributeDivisors:W,object:R,attributes:{},index:null}}function f(R,U,G,W){const D=r.attributes,z=U.attributes;let O=0;const ne=G.getAttributes();for(const ie in ne)if(ne[ie].location>=0){const $=D[ie];let Q=z[ie];if(Q===void 0&&(ie==="instanceMatrix"&&R.instanceMatrix&&(Q=R.instanceMatrix),ie==="instanceColor"&&R.instanceColor&&(Q=R.instanceColor)),$===void 0||$.attribute!==Q||Q&&$.data!==Q.data)return!0;O++}return r.attributesNum!==O||r.index!==W}function g(R,U,G,W){const D={},z=U.attributes;let O=0;const ne=G.getAttributes();for(const ie in ne)if(ne[ie].location>=0){let $=z[ie];$===void 0&&(ie==="instanceMatrix"&&R.instanceMatrix&&($=R.instanceMatrix),ie==="instanceColor"&&R.instanceColor&&($=R.instanceColor));const Q={};Q.attribute=$,$&&$.data&&(Q.data=$.data),D[ie]=Q,O++}r.attributes=D,r.attributesNum=O,r.index=W}function _(){const R=r.newAttributes;for(let U=0,G=R.length;U<G;U++)R[U]=0}function p(R){m(R,0)}function m(R,U){const G=r.newAttributes,W=r.enabledAttributes,D=r.attributeDivisors;G[R]=1,W[R]===0&&(s.enableVertexAttribArray(R),W[R]=1),D[R]!==U&&(s.vertexAttribDivisor(R,U),D[R]=U)}function x(){const R=r.newAttributes,U=r.enabledAttributes;for(let G=0,W=U.length;G<W;G++)U[G]!==R[G]&&(s.disableVertexAttribArray(G),U[G]=0)}function M(R,U,G,W,D,z,O){O===!0?s.vertexAttribIPointer(R,U,G,D,z):s.vertexAttribPointer(R,U,G,W,D,z)}function y(R,U,G,W){_();const D=W.attributes,z=G.getAttributes(),O=U.defaultAttributeValues;for(const ne in z){const ie=z[ne];if(ie.location>=0){let j=D[ne];if(j===void 0&&(ne==="instanceMatrix"&&R.instanceMatrix&&(j=R.instanceMatrix),ne==="instanceColor"&&R.instanceColor&&(j=R.instanceColor)),j!==void 0){const $=j.normalized,Q=j.itemSize,Te=e.get(j);if(Te===void 0)continue;const Ne=Te.buffer,Ee=Te.type,q=Te.bytesPerElement,_e=Ee===s.INT||Ee===s.UNSIGNED_INT||j.gpuType===xc;if(j.isInterleavedBufferAttribute){const oe=j.data,Le=oe.stride,Ve=j.offset;if(oe.isInstancedInterleavedBuffer){for(let Ge=0;Ge<ie.locationSize;Ge++)m(ie.location+Ge,oe.meshPerAttribute);R.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Ge=0;Ge<ie.locationSize;Ge++)p(ie.location+Ge);s.bindBuffer(s.ARRAY_BUFFER,Ne);for(let Ge=0;Ge<ie.locationSize;Ge++)M(ie.location+Ge,Q/ie.locationSize,Ee,$,Le*q,(Ve+Q/ie.locationSize*Ge)*q,_e)}else{if(j.isInstancedBufferAttribute){for(let oe=0;oe<ie.locationSize;oe++)m(ie.location+oe,j.meshPerAttribute);R.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let oe=0;oe<ie.locationSize;oe++)p(ie.location+oe);s.bindBuffer(s.ARRAY_BUFFER,Ne);for(let oe=0;oe<ie.locationSize;oe++)M(ie.location+oe,Q/ie.locationSize,Ee,$,Q*q,Q/ie.locationSize*oe*q,_e)}}else if(O!==void 0){const $=O[ne];if($!==void 0)switch($.length){case 2:s.vertexAttrib2fv(ie.location,$);break;case 3:s.vertexAttrib3fv(ie.location,$);break;case 4:s.vertexAttrib4fv(ie.location,$);break;default:s.vertexAttrib1fv(ie.location,$)}}}}x()}function A(){T();for(const R in n){const U=n[R];for(const G in U){const W=U[G];for(const D in W){const z=W[D];for(const O in z)h(z[O].object),delete z[O];delete W[D]}}delete n[R]}}function E(R){if(n[R.id]===void 0)return;const U=n[R.id];for(const G in U){const W=U[G];for(const D in W){const z=W[D];for(const O in z)h(z[O].object),delete z[O];delete W[D]}}delete n[R.id]}function C(R){for(const U in n){const G=n[U];for(const W in G){const D=G[W];if(D[R.id]===void 0)continue;const z=D[R.id];for(const O in z)h(z[O].object),delete z[O];delete D[R.id]}}}function v(R){for(const U in n){const G=n[U],W=R.isInstancedMesh===!0?R.id:0,D=G[W];if(D!==void 0){for(const z in D){const O=D[z];for(const ne in O)h(O[ne].object),delete O[ne];delete D[z]}delete G[W],Object.keys(G).length===0&&delete n[U]}}}function T(){P(),a=!0,r!==i&&(r=i,c(r.object))}function P(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:T,resetDefaultState:P,dispose:A,releaseStatesOfGeometry:E,releaseStatesOfObject:v,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:p,disableUnusedAttributes:x}}function sx(s,e,t){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];t.update(d,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function rx(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==bn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const v=C===pn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==fn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Sn&&!v)}function l(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Oe("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Oe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=s.getParameter(s.MAX_SAMPLES),E=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:y,maxSamples:A,samples:E}}function ax(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new Wi,o=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,m=s.get(u);if(!i||g===null||g.length===0||r&&!p)r?h(null):c();else{const x=r?0:n,M=x*4;let y=m.clippingState||null;l.value=y,y=h(g,d,M,f);for(let A=0;A!==M;++A)y[A]=t[A];m.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const m=f+_*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<m)&&(p=new Float32Array(m));for(let M=0,y=f;M!==_;++M,y+=4)a.copy(u[M]).applyMatrix4(x,o),a.normal.toArray(p,y),p[y+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}const Pi=4,Mu=[.125,.215,.35,.446,.526,.582],qi=20,ox=256,ar=new kr,yu=new De;let Yo=null,Ko=0,jo=0,Zo=!1;const lx=new I;class rc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){const{size:a=256,position:o=lx}=r;Yo=this._renderer.getRenderTarget(),Ko=this._renderer.getActiveCubeFace(),jo=this._renderer.getActiveMipmapLevel(),Zo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Yo,Ko,jo),this._renderer.xr.enabled=Zo,e.scissorTest=!1,Ss(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===$i||e.mapping===Is?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Yo=this._renderer.getRenderTarget(),Ko=this._renderer.getActiveCubeFace(),jo=this._renderer.getActiveMipmapLevel(),Zo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:kt,minFilter:kt,generateMipmaps:!1,type:pn,format:bn,colorSpace:mn,depthBuffer:!1},i=Su(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Su(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=cx(r)),this._blurMaterial=ux(r,e,t),this._ggxMaterial=hx(r,e,t)}return i}_compileMaterial(e){const t=new we(new Tt,e);this._renderer.compile(t,ar)}_sceneToCubeUV(e,t,n,i,r){const l=new tn(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(yu),u.toneMapping=jn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new we(new Ui,new Dt({name:"PMREM.Background",side:nn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,p=_.material;let m=!1;const x=e.background;x?x.isColor&&(p.color.copy(x),e.background=null,m=!0):(p.color.copy(yu),m=!0);for(let M=0;M<6;M++){const y=M%3;y===0?(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[M],r.y,r.z)):y===1?(l.up.set(0,0,c[M]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[M],r.z)):(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[M]));const A=this._cubeSize;Ss(i,y*A,M>2?A:0,A,A),u.setRenderTarget(i),m&&u.render(_,l),u.render(e,l)}u.toneMapping=f,u.autoClear=d,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===$i||e.mapping===Is;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bu());const r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Ss(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ar)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=0+c*1.25,f=u*d,{_lodMax:g}=this,_=this._sizeLods[n],p=3*_*(n>g-Pi?n-g+Pi:0),m=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,Ss(r,p,m,3*_,2*_),i.setRenderTarget(r),i.render(o,ar),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Ss(e,p,m,3*_,2*_),i.setRenderTarget(e),i.render(o,ar)}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&He("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[i];u.material=c;const d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*qi-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):qi;p>qi&&Oe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${qi}`);const m=[];let x=0;for(let C=0;C<qi;++C){const v=C/_,T=Math.exp(-v*v/2);m.push(T),C===0?x+=T:C<p&&(x+=2*T)}for(let C=0;C<m.length;C++)m[C]=m[C]/x;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-n;const y=this._sizeLods[i],A=3*y*(i>M-Pi?i-M+Pi:0),E=4*(this._cubeSize-y);Ss(t,A,E,3*y,2*y),l.setRenderTarget(t),l.render(u,ar)}}function cx(s){const e=[],t=[],n=[];let i=s;const r=s-Pi+1+Mu.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-Pi?l=Mu[a-s+Pi-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,p=2,m=1,x=new Float32Array(_*g*f),M=new Float32Array(p*g*f),y=new Float32Array(m*g*f);for(let E=0;E<f;E++){const C=E%3*2/3-1,v=E>2?0:-1,T=[C,v,0,C+2/3,v,0,C+2/3,v+1,0,C,v,0,C+2/3,v+1,0,C,v+1,0];x.set(T,_*g*E),M.set(d,p*g*E);const P=[E,E,E,E,E,E];y.set(P,m*g*E)}const A=new Tt;A.setAttribute("position",new Ut(x,_)),A.setAttribute("uv",new Ut(M,p)),A.setAttribute("faceIndex",new Ut(y,m)),n.push(new we(A,null)),i>Pi&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Su(s,e,t){const n=new ln(s,e,t);return n.texture.mapping=no,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ss(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function hx(s,e,t){return new Vt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ox,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ao(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function ux(s,e,t){const n=new Float32Array(qi),i=new I(0,1,0);return new Vt({name:"SphericalGaussianBlur",defines:{n:qi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ao(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function bu(){return new Vt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ao(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function Tu(){return new Vt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ao(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function ao(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class qd extends ln{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new bd(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Ui(5,5,5),r=new Vt({name:"CubemapFromEquirect",uniforms:Us(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:nn,blending:Kn});r.uniforms.tEquirect.value=t;const a=new we(i,r),o=t.minFilter;return t.minFilter===ci&&(t.minFilter=kt),new i0(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}function dx(s){let e=new WeakMap,t=new WeakMap,n=null;function i(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){const f=d.mapping;if(f===fo||f===po)if(e.has(d)){const g=e.get(d).texture;return o(g,d.mapping)}else{const g=d.image;if(g&&g.height>0){const _=new qd(g.height);return _.fromEquirectangularTexture(s,d),e.set(d,_),d.addEventListener("dispose",c),o(_.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const f=d.mapping,g=f===fo||f===po,_=f===$i||f===Is;if(g||_){let p=t.get(d);const m=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return n===null&&(n=new rc(s)),p=g?n.fromEquirectangular(d,p):n.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),p.texture;if(p!==void 0)return p.texture;{const x=d.image;return g&&x&&x.height>0||_&&x&&l(x)?(n===null&&(n=new rc(s)),p=g?n.fromEquirectangular(d):n.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),d.addEventListener("dispose",h),p.texture):null}}}return d}function o(d,f){return f===fo?d.mapping=$i:f===po&&(d.mapping=Is),d}function l(d){let f=0;const g=6;for(let _=0;_<g;_++)d[_]!==void 0&&f++;return f===g}function c(d){const f=d.target;f.removeEventListener("dispose",c);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(d){const f=d.target;f.removeEventListener("dispose",h);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:u}}function fx(s){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Zl("WebGLRenderer: "+n+" extension not supported."),i}}}function px(s,e,t,n){const i={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)e.update(d[f],s.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(g===void 0)return;if(f!==null){const x=f.array;_=f.version;for(let M=0,y=x.length;M<y;M+=3){const A=x[M+0],E=x[M+1],C=x[M+2];d.push(A,E,E,C,C,A)}}else{const x=g.array;_=g.version;for(let M=0,y=x.length/3-1;M<y;M+=3){const A=M+0,E=M+1,C=M+2;d.push(A,E,E,C,C,A)}}const p=new(g.count>=65535?gd:md)(d,1);p.version=_;const m=r.get(u);m&&e.remove(m),r.set(u,p)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function mx(s,e,t){let n;function i(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,d){s.drawElements(n,d,r,u*a),t.update(d,n,1)}function c(u,d,f){f!==0&&(s.drawElementsInstanced(n,d,r,u*a,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let _=0;for(let p=0;p<f;p++)_+=d[p];t.update(_,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function gx(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:He("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function _x(s,e,t){const n=new WeakMap,i=new yt;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let P=function(){v.dispose(),n.delete(o),o.removeEventListener("dispose",P)};var f=P;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let y=0;g===!0&&(y=1),_===!0&&(y=2),p===!0&&(y=3);let A=o.attributes.position.count*y,E=1;A>e.maxTextureSize&&(E=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const C=new Float32Array(A*E*4*u),v=new fd(C,A,E,u);v.type=Sn,v.needsUpdate=!0;const T=y*4;for(let R=0;R<u;R++){const U=m[R],G=x[R],W=M[R],D=A*E*4*R;for(let z=0;z<U.count;z++){const O=z*T;g===!0&&(i.fromBufferAttribute(U,z),C[D+O+0]=i.x,C[D+O+1]=i.y,C[D+O+2]=i.z,C[D+O+3]=0),_===!0&&(i.fromBufferAttribute(G,z),C[D+O+4]=i.x,C[D+O+5]=i.y,C[D+O+6]=i.z,C[D+O+7]=0),p===!0&&(i.fromBufferAttribute(W,z),C[D+O+8]=i.x,C[D+O+9]=i.y,C[D+O+10]=i.z,C[D+O+11]=W.itemSize===4?i.w:1)}}d={count:u,texture:v,size:new J(A,E)},n.set(o,d),o.addEventListener("dispose",P)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const _=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",_),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function xx(s,e,t,n,i){let r=new WeakMap;function a(c){const h=i.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const vx={[dc]:"LINEAR_TONE_MAPPING",[fc]:"REINHARD_TONE_MAPPING",[pc]:"CINEON_TONE_MAPPING",[to]:"ACES_FILMIC_TONE_MAPPING",[gc]:"AGX_TONE_MAPPING",[_c]:"NEUTRAL_TONE_MAPPING",[mc]:"CUSTOM_TONE_MAPPING"};function Mx(s,e,t,n,i){const r=new ln(e,t,{type:s,depthBuffer:n,stencilBuffer:i,depthTexture:n?new Ds(e,t):void 0}),a=new ln(e,t,{type:pn,depthBuffer:!1,stencilBuffer:!1}),o=new Tt;o.setAttribute("position",new ot([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new ot([0,2,0,0,2,0],2));const l=new Fd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new we(o,l),h=new kr(-1,1,1,-1,0,1);let u=null,d=null,f=!1,g,_=null,p=[],m=!1;this.setSize=function(x,M){r.setSize(x,M),a.setSize(x,M);for(let y=0;y<p.length;y++){const A=p[y];A.setSize&&A.setSize(x,M)}},this.setEffects=function(x){p=x,m=p.length>0&&p[0].isRenderPass===!0;const M=r.width,y=r.height;for(let A=0;A<p.length;A++){const E=p[A];E.setSize&&E.setSize(M,y)}},this.begin=function(x,M){if(f||x.toneMapping===jn&&p.length===0)return!1;if(_=M,M!==null){const y=M.width,A=M.height;(r.width!==y||r.height!==A)&&this.setSize(y,A)}return m===!1&&x.setRenderTarget(r),g=x.toneMapping,x.toneMapping=jn,!0},this.hasRenderPass=function(){return m},this.end=function(x,M){x.toneMapping=g,f=!0;let y=r,A=a;for(let E=0;E<p.length;E++){const C=p[E];if(C.enabled!==!1&&(C.render(x,A,y,M),C.needsSwap!==!1)){const v=y;y=A,A=v}}if(u!==x.outputColorSpace||d!==x.toneMapping){u=x.outputColorSpace,d=x.toneMapping,l.defines={},rt.getTransfer(u)===ft&&(l.defines.SRGB_TRANSFER="");const E=vx[d];E&&(l.defines[E]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,x.setRenderTarget(_),x.render(c,h),_=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),a.dispose(),o.dispose(),l.dispose()}}const Yd=new Gt,ac=new Ds(1,1),Kd=new fd,jd=new Lp,Zd=new bd,Eu=[],wu=[],Au=new Float32Array(16),Ru=new Float32Array(9),Cu=new Float32Array(4);function qs(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Eu[i];if(r===void 0&&(r=new Float32Array(i),Eu[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Ht(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Wt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function oo(s,e){let t=wu[e];t===void 0&&(t=new Int32Array(e),wu[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function yx(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Sx(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;s.uniform2fv(this.addr,e),Wt(t,e)}}function bx(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ht(t,e))return;s.uniform3fv(this.addr,e),Wt(t,e)}}function Tx(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;s.uniform4fv(this.addr,e),Wt(t,e)}}function Ex(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Wt(t,e)}else{if(Ht(t,n))return;Cu.set(n),s.uniformMatrix2fv(this.addr,!1,Cu),Wt(t,n)}}function wx(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Wt(t,e)}else{if(Ht(t,n))return;Ru.set(n),s.uniformMatrix3fv(this.addr,!1,Ru),Wt(t,n)}}function Ax(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Wt(t,e)}else{if(Ht(t,n))return;Au.set(n),s.uniformMatrix4fv(this.addr,!1,Au),Wt(t,n)}}function Rx(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Cx(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;s.uniform2iv(this.addr,e),Wt(t,e)}}function Px(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;s.uniform3iv(this.addr,e),Wt(t,e)}}function Ix(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;s.uniform4iv(this.addr,e),Wt(t,e)}}function Lx(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Dx(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;s.uniform2uiv(this.addr,e),Wt(t,e)}}function Nx(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;s.uniform3uiv(this.addr,e),Wt(t,e)}}function Ux(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;s.uniform4uiv(this.addr,e),Wt(t,e)}}function Fx(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(ac.compareFunction=t.isReversedDepthBuffer()?Ac:wc,r=ac):r=Yd,t.setTexture2D(e||r,i)}function Ox(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||jd,i)}function Bx(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Zd,i)}function zx(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Kd,i)}function kx(s){switch(s){case 5126:return yx;case 35664:return Sx;case 35665:return bx;case 35666:return Tx;case 35674:return Ex;case 35675:return wx;case 35676:return Ax;case 5124:case 35670:return Rx;case 35667:case 35671:return Cx;case 35668:case 35672:return Px;case 35669:case 35673:return Ix;case 5125:return Lx;case 36294:return Dx;case 36295:return Nx;case 36296:return Ux;case 35678:case 36198:case 36298:case 36306:case 35682:return Fx;case 35679:case 36299:case 36307:return Ox;case 35680:case 36300:case 36308:case 36293:return Bx;case 36289:case 36303:case 36311:case 36292:return zx}}function Vx(s,e){s.uniform1fv(this.addr,e)}function Gx(s,e){const t=qs(e,this.size,2);s.uniform2fv(this.addr,t)}function Hx(s,e){const t=qs(e,this.size,3);s.uniform3fv(this.addr,t)}function Wx(s,e){const t=qs(e,this.size,4);s.uniform4fv(this.addr,t)}function Xx(s,e){const t=qs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function qx(s,e){const t=qs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Yx(s,e){const t=qs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Kx(s,e){s.uniform1iv(this.addr,e)}function jx(s,e){s.uniform2iv(this.addr,e)}function Zx(s,e){s.uniform3iv(this.addr,e)}function $x(s,e){s.uniform4iv(this.addr,e)}function Jx(s,e){s.uniform1uiv(this.addr,e)}function Qx(s,e){s.uniform2uiv(this.addr,e)}function ev(s,e){s.uniform3uiv(this.addr,e)}function tv(s,e){s.uniform4uiv(this.addr,e)}function nv(s,e,t){const n=this.cache,i=e.length,r=oo(t,i);Ht(n,r)||(s.uniform1iv(this.addr,r),Wt(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=ac:a=Yd;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,r[o])}function iv(s,e,t){const n=this.cache,i=e.length,r=oo(t,i);Ht(n,r)||(s.uniform1iv(this.addr,r),Wt(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||jd,r[a])}function sv(s,e,t){const n=this.cache,i=e.length,r=oo(t,i);Ht(n,r)||(s.uniform1iv(this.addr,r),Wt(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Zd,r[a])}function rv(s,e,t){const n=this.cache,i=e.length,r=oo(t,i);Ht(n,r)||(s.uniform1iv(this.addr,r),Wt(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Kd,r[a])}function av(s){switch(s){case 5126:return Vx;case 35664:return Gx;case 35665:return Hx;case 35666:return Wx;case 35674:return Xx;case 35675:return qx;case 35676:return Yx;case 5124:case 35670:return Kx;case 35667:case 35671:return jx;case 35668:case 35672:return Zx;case 35669:case 35673:return $x;case 5125:return Jx;case 36294:return Qx;case 36295:return ev;case 36296:return tv;case 35678:case 36198:case 36298:case 36306:case 35682:return nv;case 35679:case 36299:case 36307:return iv;case 35680:case 36300:case 36308:case 36293:return sv;case 36289:case 36303:case 36311:case 36292:return rv}}class ov{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=kx(t.type)}}class lv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=av(t.type)}}class cv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const $o=/(\w+)(\])?(\[|\.)?/g;function Pu(s,e){s.seq.push(e),s.map[e.id]=e}function hv(s,e,t){const n=s.name,i=n.length;for($o.lastIndex=0;;){const r=$o.exec(n),a=$o.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Pu(t,c===void 0?new ov(o,s,e):new lv(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new cv(o),Pu(t,u)),t=u}}}class Fa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);hv(o,l,this)}const i=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Iu(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const uv=37297;let dv=0;function fv(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Lu=new je;function pv(s){rt._getMatrix(Lu,rt.workingColorSpace,s);const e=`mat3( ${Lu.elements.map(t=>t.toFixed(4))} )`;switch(rt.getTransfer(s)){case Wa:return[e,"LinearTransferOETF"];case ft:return[e,"sRGBTransferOETF"];default:return Oe("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Du(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+fv(s.getShaderSource(e),o)}else return r}function mv(s,e){const t=pv(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const gv={[dc]:"Linear",[fc]:"Reinhard",[pc]:"Cineon",[to]:"ACESFilmic",[gc]:"AgX",[_c]:"Neutral",[mc]:"Custom"};function _v(s,e){const t=gv[e];return t===void 0?(Oe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ea=new I;function xv(){rt.getLuminanceCoefficients(Ea);const s=Ea.x.toFixed(4),e=Ea.y.toFixed(4),t=Ea.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vv(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(pr).join(`
`)}function Mv(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function yv(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function pr(s){return s!==""}function Nu(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Uu(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Sv=/^[ \t]*#include +<([\w\d./]+)>/gm;function oc(s){return s.replace(Sv,Tv)}const bv=new Map;function Tv(s,e){let t=tt[e];if(t===void 0){const n=bv.get(e);if(n!==void 0)t=tt[n],Oe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return oc(t)}const Ev=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fu(s){return s.replace(Ev,wv)}function wv(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Ou(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Av={[Pa]:"SHADOWMAP_TYPE_PCF",[ur]:"SHADOWMAP_TYPE_VSM"};function Rv(s){return Av[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Cv={[$i]:"ENVMAP_TYPE_CUBE",[Is]:"ENVMAP_TYPE_CUBE",[no]:"ENVMAP_TYPE_CUBE_UV"};function Pv(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":Cv[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const Iv={[Is]:"ENVMAP_MODE_REFRACTION"};function Lv(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":Iv[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Dv={[nd]:"ENVMAP_BLENDING_MULTIPLY",[Xf]:"ENVMAP_BLENDING_MIX",[qf]:"ENVMAP_BLENDING_ADD"};function Nv(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":Dv[s.combine]||"ENVMAP_BLENDING_NONE"}function Uv(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Fv(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Rv(t),c=Pv(t),h=Lv(t),u=Nv(t),d=Uv(t),f=vv(t),g=Mv(r),_=i.createProgram();let p,m,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(pr).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(pr).join(`
`),m.length>0&&(m+=`
`)):(p=[Ou(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pr).join(`
`),m=[Ou(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==jn?"#define TONE_MAPPING":"",t.toneMapping!==jn?tt.tonemapping_pars_fragment:"",t.toneMapping!==jn?_v("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,mv("linearToOutputTexel",t.outputColorSpace),xv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(pr).join(`
`)),a=oc(a),a=Nu(a,t),a=Uu(a,t),o=oc(o),o=Nu(o,t),o=Uu(o,t),a=Fu(a),o=Fu(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Th?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Th?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=x+p+a,y=x+m+o,A=Iu(i,i.VERTEX_SHADER,M),E=Iu(i,i.FRAGMENT_SHADER,y);i.attachShader(_,A),i.attachShader(_,E),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function C(R){if(s.debug.checkShaderErrors){const U=i.getProgramInfoLog(_)||"",G=i.getShaderInfoLog(A)||"",W=i.getShaderInfoLog(E)||"",D=U.trim(),z=G.trim(),O=W.trim();let ne=!0,ie=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(ne=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,A,E);else{const j=Du(i,A,"vertex"),$=Du(i,E,"fragment");He("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+D+`
`+j+`
`+$)}else D!==""?Oe("WebGLProgram: Program Info Log:",D):(z===""||O==="")&&(ie=!1);ie&&(R.diagnostics={runnable:ne,programLog:D,vertexShader:{log:z,prefix:p},fragmentShader:{log:O,prefix:m}})}i.deleteShader(A),i.deleteShader(E),v=new Fa(i,_),T=yv(i,_)}let v;this.getUniforms=function(){return v===void 0&&C(this),v};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(_,uv)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=dv++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=E,this}let Ov=0;class Bv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new zv(e),t.set(e,n)),n}}class zv{constructor(e){this.id=Ov++,this.code=e,this.usedTimes=0}}function kv(s){return s===Ji||s===Va||s===Ga}function Vv(s,e,t,n,i,r){const a=new Pc,o=new Bv,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer;let d=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function _(v,T,P,R,U,G){const W=R.fog,D=U.geometry,z=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?R.environment:null,O=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,ne=e.get(v.envMap||z,O),ie=ne&&ne.mapping===no?ne.image.height:null,j=f[v.type];v.precision!==null&&(d=n.getMaxPrecision(v.precision),d!==v.precision&&Oe("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));const $=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,Q=$!==void 0?$.length:0;let Te=0;D.morphAttributes.position!==void 0&&(Te=1),D.morphAttributes.normal!==void 0&&(Te=2),D.morphAttributes.color!==void 0&&(Te=3);let Ne,Ee,q,_e;if(j){const Ze=Wn[j];Ne=Ze.vertexShader,Ee=Ze.fragmentShader}else Ne=v.vertexShader,Ee=v.fragmentShader,o.update(v),q=o.getVertexShaderID(v),_e=o.getFragmentShaderID(v);const oe=s.getRenderTarget(),Le=s.state.buffers.depth.getReversed(),Ve=U.isInstancedMesh===!0,Ge=U.isBatchedMesh===!0,lt=!!v.map,We=!!v.matcap,ee=!!ne,ce=!!v.aoMap,te=!!v.lightMap,ye=!!v.bumpMap,xe=!!v.normalMap,Xe=!!v.displacementMap,L=!!v.emissiveMap,Ye=!!v.metalnessMap,Ue=!!v.roughnessMap,qe=v.anisotropy>0,he=v.clearcoat>0,ut=v.dispersion>0,w=v.iridescence>0,S=v.sheen>0,B=v.transmission>0,K=qe&&!!v.anisotropyMap,se=he&&!!v.clearcoatMap,ue=he&&!!v.clearcoatNormalMap,pe=he&&!!v.clearcoatRoughnessMap,X=w&&!!v.iridescenceMap,Z=w&&!!v.iridescenceThicknessMap,be=S&&!!v.sheenColorMap,Pe=S&&!!v.sheenRoughnessMap,me=!!v.specularMap,de=!!v.specularColorMap,Ke=!!v.specularIntensityMap,Qe=B&&!!v.transmissionMap,ht=B&&!!v.thicknessMap,N=!!v.gradientMap,fe=!!v.alphaMap,Y=v.alphaTest>0,Ae=!!v.alphaHash,ge=!!v.extensions;let re=jn;v.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(re=s.toneMapping);const Be={shaderID:j,shaderType:v.type,shaderName:v.name,vertexShader:Ne,fragmentShader:Ee,defines:v.defines,customVertexShaderID:q,customFragmentShaderID:_e,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:Ge,batchingColor:Ge&&U._colorsTexture!==null,instancing:Ve,instancingColor:Ve&&U.instanceColor!==null,instancingMorph:Ve&&U.morphTexture!==null,outputColorSpace:oe===null?s.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:rt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:lt,matcap:We,envMap:ee,envMapMode:ee&&ne.mapping,envMapCubeUVHeight:ie,aoMap:ce,lightMap:te,bumpMap:ye,normalMap:xe,displacementMap:Xe,emissiveMap:L,normalMapObjectSpace:xe&&v.normalMapType===Jf,normalMapTangentSpace:xe&&v.normalMapType===Kl,packedNormalMap:xe&&v.normalMapType===Kl&&kv(v.normalMap.format),metalnessMap:Ye,roughnessMap:Ue,anisotropy:qe,anisotropyMap:K,clearcoat:he,clearcoatMap:se,clearcoatNormalMap:ue,clearcoatRoughnessMap:pe,dispersion:ut,iridescence:w,iridescenceMap:X,iridescenceThicknessMap:Z,sheen:S,sheenColorMap:be,sheenRoughnessMap:Pe,specularMap:me,specularColorMap:de,specularIntensityMap:Ke,transmission:B,transmissionMap:Qe,thicknessMap:ht,gradientMap:N,opaque:v.transparent===!1&&v.blending===Ii&&v.alphaToCoverage===!1,alphaMap:fe,alphaTest:Y,alphaHash:Ae,combine:v.combine,mapUv:lt&&g(v.map.channel),aoMapUv:ce&&g(v.aoMap.channel),lightMapUv:te&&g(v.lightMap.channel),bumpMapUv:ye&&g(v.bumpMap.channel),normalMapUv:xe&&g(v.normalMap.channel),displacementMapUv:Xe&&g(v.displacementMap.channel),emissiveMapUv:L&&g(v.emissiveMap.channel),metalnessMapUv:Ye&&g(v.metalnessMap.channel),roughnessMapUv:Ue&&g(v.roughnessMap.channel),anisotropyMapUv:K&&g(v.anisotropyMap.channel),clearcoatMapUv:se&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:ue&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:X&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:be&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&g(v.sheenRoughnessMap.channel),specularMapUv:me&&g(v.specularMap.channel),specularColorMapUv:de&&g(v.specularColorMap.channel),specularIntensityMapUv:Ke&&g(v.specularIntensityMap.channel),transmissionMapUv:Qe&&g(v.transmissionMap.channel),thicknessMapUv:ht&&g(v.thicknessMap.channel),alphaMapUv:fe&&g(v.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(xe||qe),vertexNormals:!!D.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!D.attributes.uv&&(lt||fe),fog:!!W,useFog:v.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||D.attributes.normal===void 0&&xe===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Le,skinning:U.isSkinnedMesh===!0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:Te,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:re,decodeVideoTexture:lt&&v.map.isVideoTexture===!0&&rt.getTransfer(v.map.colorSpace)===ft,decodeVideoTextureEmissive:L&&v.emissiveMap.isVideoTexture===!0&&rt.getTransfer(v.emissiveMap.colorSpace)===ft,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Ot,flipSided:v.side===nn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:ge&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&v.extensions.multiDraw===!0||Ge)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Be.vertexUv1s=l.has(1),Be.vertexUv2s=l.has(2),Be.vertexUv3s=l.has(3),l.clear(),Be}function p(v){const T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(const P in v.defines)T.push(P),T.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(m(T,v),x(T,v),T.push(s.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function m(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function x(v,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),v.push(a.mask)}function M(v){const T=f[v.type];let P;if(T){const R=Wn[T];P=Ur.clone(R.uniforms)}else P=v.uniforms;return P}function y(v,T){let P=h.get(T);return P!==void 0?++P.usedTimes:(P=new Fv(s,T,v,i),c.push(P),h.set(T,P)),P}function A(v){if(--v.usedTimes===0){const T=c.indexOf(v);c[T]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function E(v){o.remove(v)}function C(){o.dispose()}return{getParameters:_,getProgramCacheKey:p,getUniforms:M,acquireProgram:y,releaseProgram:A,releaseShaderCache:E,programs:c,dispose:C}}function Gv(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Hv(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function Bu(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function zu(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,g,_,p,m){let x=s[e];return x===void 0?(x={id:d.id,object:d,geometry:f,material:g,materialVariant:a(d),groupOrder:_,renderOrder:d.renderOrder,z:p,group:m},s[e]=x):(x.id=d.id,x.object=d,x.geometry=f,x.material=g,x.materialVariant=a(d),x.groupOrder=_,x.renderOrder=d.renderOrder,x.z=p,x.group=m),e++,x}function l(d,f,g,_,p,m){const x=o(d,f,g,_,p,m);g.transmission>0?n.push(x):g.transparent===!0?i.push(x):t.push(x)}function c(d,f,g,_,p,m){const x=o(d,f,g,_,p,m);g.transmission>0?n.unshift(x):g.transparent===!0?i.unshift(x):t.unshift(x)}function h(d,f){t.length>1&&t.sort(d||Hv),n.length>1&&n.sort(f||Bu),i.length>1&&i.sort(f||Bu)}function u(){for(let d=e,f=s.length;d<f;d++){const g=s[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:u,sort:h}}function Wv(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new zu,s.set(n,[a])):i>=r.length?(a=new zu,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Xv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new De};break;case"SpotLight":t={position:new I,direction:new I,color:new De,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new De,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new De,groundColor:new De};break;case"RectAreaLight":t={color:new De,position:new I,halfWidth:new I,halfHeight:new I};break}return s[e.id]=t,t}}}function qv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Yv=0;function Kv(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function jv(s){const e=new Xv,t=qv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const i=new I,r=new Je,a=new Je;function o(c){let h=0,u=0,d=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let f=0,g=0,_=0,p=0,m=0,x=0,M=0,y=0,A=0,E=0,C=0;c.sort(Kv);for(let T=0,P=c.length;T<P;T++){const R=c[T],U=R.color,G=R.intensity,W=R.distance;let D=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Ji?D=R.shadow.map.texture:D=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)h+=U.r*G,u+=U.g*G,d+=U.b*G;else if(R.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(R.sh.coefficients[z],G);C++}else if(R.isDirectionalLight){const z=e.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const O=R.shadow,ne=t.get(R);ne.shadowIntensity=O.intensity,ne.shadowBias=O.bias,ne.shadowNormalBias=O.normalBias,ne.shadowRadius=O.radius,ne.shadowMapSize=O.mapSize,n.directionalShadow[f]=ne,n.directionalShadowMap[f]=D,n.directionalShadowMatrix[f]=R.shadow.matrix,x++}n.directional[f]=z,f++}else if(R.isSpotLight){const z=e.get(R);z.position.setFromMatrixPosition(R.matrixWorld),z.color.copy(U).multiplyScalar(G),z.distance=W,z.coneCos=Math.cos(R.angle),z.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),z.decay=R.decay,n.spot[_]=z;const O=R.shadow;if(R.map&&(n.spotLightMap[A]=R.map,A++,O.updateMatrices(R),R.castShadow&&E++),n.spotLightMatrix[_]=O.matrix,R.castShadow){const ne=t.get(R);ne.shadowIntensity=O.intensity,ne.shadowBias=O.bias,ne.shadowNormalBias=O.normalBias,ne.shadowRadius=O.radius,ne.shadowMapSize=O.mapSize,n.spotShadow[_]=ne,n.spotShadowMap[_]=D,y++}_++}else if(R.isRectAreaLight){const z=e.get(R);z.color.copy(U).multiplyScalar(G),z.halfWidth.set(R.width*.5,0,0),z.halfHeight.set(0,R.height*.5,0),n.rectArea[p]=z,p++}else if(R.isPointLight){const z=e.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),z.distance=R.distance,z.decay=R.decay,R.castShadow){const O=R.shadow,ne=t.get(R);ne.shadowIntensity=O.intensity,ne.shadowBias=O.bias,ne.shadowNormalBias=O.normalBias,ne.shadowRadius=O.radius,ne.shadowMapSize=O.mapSize,ne.shadowCameraNear=O.camera.near,ne.shadowCameraFar=O.camera.far,n.pointShadow[g]=ne,n.pointShadowMap[g]=D,n.pointShadowMatrix[g]=R.shadow.matrix,M++}n.point[g]=z,g++}else if(R.isHemisphereLight){const z=e.get(R);z.skyColor.copy(R.color).multiplyScalar(G),z.groundColor.copy(R.groundColor).multiplyScalar(G),n.hemi[m]=z,m++}}p>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ve.LTC_FLOAT_1,n.rectAreaLTC2=ve.LTC_FLOAT_2):(n.rectAreaLTC1=ve.LTC_HALF_1,n.rectAreaLTC2=ve.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const v=n.hash;(v.directionalLength!==f||v.pointLength!==g||v.spotLength!==_||v.rectAreaLength!==p||v.hemiLength!==m||v.numDirectionalShadows!==x||v.numPointShadows!==M||v.numSpotShadows!==y||v.numSpotMaps!==A||v.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=y+A-E,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,v.directionalLength=f,v.pointLength=g,v.spotLength=_,v.rectAreaLength=p,v.hemiLength=m,v.numDirectionalShadows=x,v.numPointShadows=M,v.numSpotShadows=y,v.numSpotMaps=A,v.numLightProbes=C,n.version=Yv++)}function l(c,h){let u=0,d=0,f=0,g=0,_=0;const p=h.matrixWorldInverse;for(let m=0,x=c.length;m<x;m++){const M=c[m];if(M.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),u++}else if(M.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),f++}else if(M.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(p),a.identity(),r.copy(M.matrixWorld),r.premultiply(p),a.extractRotation(r),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(p),d++}else if(M.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(p),_++}}}return{setup:o,setupView:l,state:n}}function ku(s){const e=new jv(s),t=[],n=[],i=[];function r(d){u.camera=d,t.length=0,n.length=0,i.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function l(d){i.push(d)}function c(){e.setup(t)}function h(d){e.setupView(t,d)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Zv(s){let e=new WeakMap;function t(i,r=0){const a=e.get(i);let o;return a===void 0?(o=new ku(s),e.set(i,[o])):r>=a.length?(o=new ku(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const $v=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Jv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Qv=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],eM=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],Vu=new Je,or=new I,Jo=new I;function tM(s,e,t){let n=new Uc;const i=new J,r=new J,a=new yt,o=new Om,l=new Bm,c={},h=t.maxTextureSize,u={[mi]:nn,[nn]:mi,[Ot]:Ot},d=new Vt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new J},radius:{value:4}},vertexShader:$v,fragmentShader:Jv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Tt;g.setAttribute("position",new Ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new we(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pa;let m=this.type;this.render=function(E,C,v){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;this.type===td&&(Oe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Pa);const T=s.getRenderTarget(),P=s.getActiveCubeFace(),R=s.getActiveMipmapLevel(),U=s.state;U.setBlending(Kn),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const G=m!==this.type;G&&C.traverse(function(W){W.material&&(Array.isArray(W.material)?W.material.forEach(D=>D.needsUpdate=!0):W.material.needsUpdate=!0)});for(let W=0,D=E.length;W<D;W++){const z=E[W],O=z.shadow;if(O===void 0){Oe("WebGLShadowMap:",z,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;i.copy(O.mapSize);const ne=O.getFrameExtents();i.multiply(ne),r.copy(O.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/ne.x),i.x=r.x*ne.x,O.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/ne.y),i.y=r.y*ne.y,O.mapSize.y=r.y));const ie=s.state.buffers.depth.getReversed();if(O.camera._reversedDepth=ie,O.map===null||G===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===ur){if(z.isPointLight){Oe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new ln(i.x,i.y,{format:Ji,type:pn,minFilter:kt,magFilter:kt,generateMipmaps:!1}),O.map.texture.name=z.name+".shadowMap",O.map.depthTexture=new Ds(i.x,i.y,Sn),O.map.depthTexture.name=z.name+".shadowMapDepth",O.map.depthTexture.format=gi,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=zt,O.map.depthTexture.magFilter=zt}else z.isPointLight?(O.map=new qd(i.x),O.map.depthTexture=new tm(i.x,$n)):(O.map=new ln(i.x,i.y),O.map.depthTexture=new Ds(i.x,i.y,$n)),O.map.depthTexture.name=z.name+".shadowMap",O.map.depthTexture.format=gi,this.type===Pa?(O.map.depthTexture.compareFunction=ie?Ac:wc,O.map.depthTexture.minFilter=kt,O.map.depthTexture.magFilter=kt):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=zt,O.map.depthTexture.magFilter=zt);O.camera.updateProjectionMatrix()}const j=O.map.isWebGLCubeRenderTarget?6:1;for(let $=0;$<j;$++){if(O.map.isWebGLCubeRenderTarget)s.setRenderTarget(O.map,$),s.clear();else{$===0&&(s.setRenderTarget(O.map),s.clear());const Q=O.getViewport($);a.set(r.x*Q.x,r.y*Q.y,r.x*Q.z,r.y*Q.w),U.viewport(a)}if(z.isPointLight){const Q=O.camera,Te=O.matrix,Ne=z.distance||Q.far;Ne!==Q.far&&(Q.far=Ne,Q.updateProjectionMatrix()),or.setFromMatrixPosition(z.matrixWorld),Q.position.copy(or),Jo.copy(Q.position),Jo.add(Qv[$]),Q.up.copy(eM[$]),Q.lookAt(Jo),Q.updateMatrixWorld(),Te.makeTranslation(-or.x,-or.y,-or.z),Vu.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),O._frustum.setFromProjectionMatrix(Vu,Q.coordinateSystem,Q.reversedDepth)}else O.updateMatrices(z);n=O.getFrustum(),y(C,v,O.camera,z,this.type)}O.isPointLightShadow!==!0&&this.type===ur&&x(O,v),O.needsUpdate=!1}m=this.type,p.needsUpdate=!1,s.setRenderTarget(T,P,R)};function x(E,C){const v=e.update(_);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new ln(i.x,i.y,{format:Ji,type:pn})),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,s.setRenderTarget(E.mapPass),s.clear(),s.renderBufferDirect(C,null,v,d,_,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,s.setRenderTarget(E.map),s.clear(),s.renderBufferDirect(C,null,v,f,_,null)}function M(E,C,v,T){let P=null;const R=v.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)P=R;else if(P=v.isPointLight===!0?l:o,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const U=P.uuid,G=C.uuid;let W=c[U];W===void 0&&(W={},c[U]=W);let D=W[G];D===void 0&&(D=P.clone(),W[G]=D,C.addEventListener("dispose",A)),P=D}if(P.visible=C.visible,P.wireframe=C.wireframe,T===ur?P.side=C.shadowSide!==null?C.shadowSide:C.side:P.side=C.shadowSide!==null?C.shadowSide:u[C.side],P.alphaMap=C.alphaMap,P.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,P.map=C.map,P.clipShadows=C.clipShadows,P.clippingPlanes=C.clippingPlanes,P.clipIntersection=C.clipIntersection,P.displacementMap=C.displacementMap,P.displacementScale=C.displacementScale,P.displacementBias=C.displacementBias,P.wireframeLinewidth=C.wireframeLinewidth,P.linewidth=C.linewidth,v.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const U=s.properties.get(P);U.light=v}return P}function y(E,C,v,T,P){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&P===ur)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,E.matrixWorld);const G=e.update(E),W=E.material;if(Array.isArray(W)){const D=G.groups;for(let z=0,O=D.length;z<O;z++){const ne=D[z],ie=W[ne.materialIndex];if(ie&&ie.visible){const j=M(E,ie,T,P);E.onBeforeShadow(s,E,C,v,G,j,ne),s.renderBufferDirect(v,null,G,j,E,ne),E.onAfterShadow(s,E,C,v,G,j,ne)}}}else if(W.visible){const D=M(E,W,T,P);E.onBeforeShadow(s,E,C,v,G,D,null),s.renderBufferDirect(v,null,G,D,E,null),E.onAfterShadow(s,E,C,v,G,D,null)}}const U=E.children;for(let G=0,W=U.length;G<W;G++)y(U[G],C,v,T,P)}function A(E){E.target.removeEventListener("dispose",A);for(const v in c){const T=c[v],P=E.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function nM(s,e){function t(){let N=!1;const fe=new yt;let Y=null;const Ae=new yt(0,0,0,0);return{setMask:function(ge){Y!==ge&&!N&&(s.colorMask(ge,ge,ge,ge),Y=ge)},setLocked:function(ge){N=ge},setClear:function(ge,re,Be,Ze,Rt){Rt===!0&&(ge*=Ze,re*=Ze,Be*=Ze),fe.set(ge,re,Be,Ze),Ae.equals(fe)===!1&&(s.clearColor(ge,re,Be,Ze),Ae.copy(fe))},reset:function(){N=!1,Y=null,Ae.set(-1,0,0,0)}}}function n(){let N=!1,fe=!1,Y=null,Ae=null,ge=null;return{setReversed:function(re){if(fe!==re){const Be=e.get("EXT_clip_control");re?Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.ZERO_TO_ONE_EXT):Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.NEGATIVE_ONE_TO_ONE_EXT),fe=re;const Ze=ge;ge=null,this.setClear(Ze)}},getReversed:function(){return fe},setTest:function(re){re?oe(s.DEPTH_TEST):Le(s.DEPTH_TEST)},setMask:function(re){Y!==re&&!N&&(s.depthMask(re),Y=re)},setFunc:function(re){if(fe&&(re=cp[re]),Ae!==re){switch(re){case cl:s.depthFunc(s.NEVER);break;case hl:s.depthFunc(s.ALWAYS);break;case ul:s.depthFunc(s.LESS);break;case Ps:s.depthFunc(s.LEQUAL);break;case dl:s.depthFunc(s.EQUAL);break;case fl:s.depthFunc(s.GEQUAL);break;case pl:s.depthFunc(s.GREATER);break;case ml:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Ae=re}},setLocked:function(re){N=re},setClear:function(re){ge!==re&&(ge=re,fe&&(re=1-re),s.clearDepth(re))},reset:function(){N=!1,Y=null,Ae=null,ge=null,fe=!1}}}function i(){let N=!1,fe=null,Y=null,Ae=null,ge=null,re=null,Be=null,Ze=null,Rt=null;return{setTest:function(_t){N||(_t?oe(s.STENCIL_TEST):Le(s.STENCIL_TEST))},setMask:function(_t){fe!==_t&&!N&&(s.stencilMask(_t),fe=_t)},setFunc:function(_t,ti,Bn){(Y!==_t||Ae!==ti||ge!==Bn)&&(s.stencilFunc(_t,ti,Bn),Y=_t,Ae=ti,ge=Bn)},setOp:function(_t,ti,Bn){(re!==_t||Be!==ti||Ze!==Bn)&&(s.stencilOp(_t,ti,Bn),re=_t,Be=ti,Ze=Bn)},setLocked:function(_t){N=_t},setClear:function(_t){Rt!==_t&&(s.clearStencil(_t),Rt=_t)},reset:function(){N=!1,fe=null,Y=null,Ae=null,ge=null,re=null,Be=null,Ze=null,Rt=null}}}const r=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d={},f=new WeakMap,g=[],_=null,p=!1,m=null,x=null,M=null,y=null,A=null,E=null,C=null,v=new De(0,0,0),T=0,P=!1,R=null,U=null,G=null,W=null,D=null;const z=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,ne=0;const ie=s.getParameter(s.VERSION);ie.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(ie)[1]),O=ne>=1):ie.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),O=ne>=2);let j=null,$={};const Q=s.getParameter(s.SCISSOR_BOX),Te=s.getParameter(s.VIEWPORT),Ne=new yt().fromArray(Q),Ee=new yt().fromArray(Te);function q(N,fe,Y,Ae){const ge=new Uint8Array(4),re=s.createTexture();s.bindTexture(N,re),s.texParameteri(N,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(N,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Be=0;Be<Y;Be++)N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY?s.texImage3D(fe,0,s.RGBA,1,1,Ae,0,s.RGBA,s.UNSIGNED_BYTE,ge):s.texImage2D(fe+Be,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ge);return re}const _e={};_e[s.TEXTURE_2D]=q(s.TEXTURE_2D,s.TEXTURE_2D,1),_e[s.TEXTURE_CUBE_MAP]=q(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),_e[s.TEXTURE_2D_ARRAY]=q(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),_e[s.TEXTURE_3D]=q(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),oe(s.DEPTH_TEST),a.setFunc(Ps),ye(!1),xe(xh),oe(s.CULL_FACE),ce(Kn);function oe(N){h[N]!==!0&&(s.enable(N),h[N]=!0)}function Le(N){h[N]!==!1&&(s.disable(N),h[N]=!1)}function Ve(N,fe){return d[N]!==fe?(s.bindFramebuffer(N,fe),d[N]=fe,N===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=fe),N===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=fe),!0):!1}function Ge(N,fe){let Y=g,Ae=!1;if(N){Y=f.get(fe),Y===void 0&&(Y=[],f.set(fe,Y));const ge=N.textures;if(Y.length!==ge.length||Y[0]!==s.COLOR_ATTACHMENT0){for(let re=0,Be=ge.length;re<Be;re++)Y[re]=s.COLOR_ATTACHMENT0+re;Y.length=ge.length,Ae=!0}}else Y[0]!==s.BACK&&(Y[0]=s.BACK,Ae=!0);Ae&&s.drawBuffers(Y)}function lt(N){return _!==N?(s.useProgram(N),_=N,!0):!1}const We={[Xi]:s.FUNC_ADD,[Rf]:s.FUNC_SUBTRACT,[Cf]:s.FUNC_REVERSE_SUBTRACT};We[Pf]=s.MIN,We[If]=s.MAX;const ee={[Lf]:s.ZERO,[Df]:s.ONE,[Nf]:s.SRC_COLOR,[ol]:s.SRC_ALPHA,[kf]:s.SRC_ALPHA_SATURATE,[Bf]:s.DST_COLOR,[Ff]:s.DST_ALPHA,[Uf]:s.ONE_MINUS_SRC_COLOR,[ll]:s.ONE_MINUS_SRC_ALPHA,[zf]:s.ONE_MINUS_DST_COLOR,[Of]:s.ONE_MINUS_DST_ALPHA,[Vf]:s.CONSTANT_COLOR,[Gf]:s.ONE_MINUS_CONSTANT_COLOR,[Hf]:s.CONSTANT_ALPHA,[Wf]:s.ONE_MINUS_CONSTANT_ALPHA};function ce(N,fe,Y,Ae,ge,re,Be,Ze,Rt,_t){if(N===Kn){p===!0&&(Le(s.BLEND),p=!1);return}if(p===!1&&(oe(s.BLEND),p=!0),N!==Af){if(N!==m||_t!==P){if((x!==Xi||A!==Xi)&&(s.blendEquation(s.FUNC_ADD),x=Xi,A=Xi),_t)switch(N){case Ii:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case di:s.blendFunc(s.ONE,s.ONE);break;case vh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Mh:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:He("WebGLState: Invalid blending: ",N);break}else switch(N){case Ii:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case di:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case vh:He("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Mh:He("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:He("WebGLState: Invalid blending: ",N);break}M=null,y=null,E=null,C=null,v.set(0,0,0),T=0,m=N,P=_t}return}ge=ge||fe,re=re||Y,Be=Be||Ae,(fe!==x||ge!==A)&&(s.blendEquationSeparate(We[fe],We[ge]),x=fe,A=ge),(Y!==M||Ae!==y||re!==E||Be!==C)&&(s.blendFuncSeparate(ee[Y],ee[Ae],ee[re],ee[Be]),M=Y,y=Ae,E=re,C=Be),(Ze.equals(v)===!1||Rt!==T)&&(s.blendColor(Ze.r,Ze.g,Ze.b,Rt),v.copy(Ze),T=Rt),m=N,P=!1}function te(N,fe){N.side===Ot?Le(s.CULL_FACE):oe(s.CULL_FACE);let Y=N.side===nn;fe&&(Y=!Y),ye(Y),N.blending===Ii&&N.transparent===!1?ce(Kn):ce(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);const Ae=N.stencilWrite;o.setTest(Ae),Ae&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),L(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?oe(s.SAMPLE_ALPHA_TO_COVERAGE):Le(s.SAMPLE_ALPHA_TO_COVERAGE)}function ye(N){R!==N&&(N?s.frontFace(s.CW):s.frontFace(s.CCW),R=N)}function xe(N){N!==Ef?(oe(s.CULL_FACE),N!==U&&(N===xh?s.cullFace(s.BACK):N===wf?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Le(s.CULL_FACE),U=N}function Xe(N){N!==G&&(O&&s.lineWidth(N),G=N)}function L(N,fe,Y){N?(oe(s.POLYGON_OFFSET_FILL),(W!==fe||D!==Y)&&(W=fe,D=Y,a.getReversed()&&(fe=-fe),s.polygonOffset(fe,Y))):Le(s.POLYGON_OFFSET_FILL)}function Ye(N){N?oe(s.SCISSOR_TEST):Le(s.SCISSOR_TEST)}function Ue(N){N===void 0&&(N=s.TEXTURE0+z-1),j!==N&&(s.activeTexture(N),j=N)}function qe(N,fe,Y){Y===void 0&&(j===null?Y=s.TEXTURE0+z-1:Y=j);let Ae=$[Y];Ae===void 0&&(Ae={type:void 0,texture:void 0},$[Y]=Ae),(Ae.type!==N||Ae.texture!==fe)&&(j!==Y&&(s.activeTexture(Y),j=Y),s.bindTexture(N,fe||_e[N]),Ae.type=N,Ae.texture=fe)}function he(){const N=$[j];N!==void 0&&N.type!==void 0&&(s.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function ut(){try{s.compressedTexImage2D(...arguments)}catch(N){He("WebGLState:",N)}}function w(){try{s.compressedTexImage3D(...arguments)}catch(N){He("WebGLState:",N)}}function S(){try{s.texSubImage2D(...arguments)}catch(N){He("WebGLState:",N)}}function B(){try{s.texSubImage3D(...arguments)}catch(N){He("WebGLState:",N)}}function K(){try{s.compressedTexSubImage2D(...arguments)}catch(N){He("WebGLState:",N)}}function se(){try{s.compressedTexSubImage3D(...arguments)}catch(N){He("WebGLState:",N)}}function ue(){try{s.texStorage2D(...arguments)}catch(N){He("WebGLState:",N)}}function pe(){try{s.texStorage3D(...arguments)}catch(N){He("WebGLState:",N)}}function X(){try{s.texImage2D(...arguments)}catch(N){He("WebGLState:",N)}}function Z(){try{s.texImage3D(...arguments)}catch(N){He("WebGLState:",N)}}function be(N){return u[N]!==void 0?u[N]:s.getParameter(N)}function Pe(N,fe){u[N]!==fe&&(s.pixelStorei(N,fe),u[N]=fe)}function me(N){Ne.equals(N)===!1&&(s.scissor(N.x,N.y,N.z,N.w),Ne.copy(N))}function de(N){Ee.equals(N)===!1&&(s.viewport(N.x,N.y,N.z,N.w),Ee.copy(N))}function Ke(N,fe){let Y=c.get(fe);Y===void 0&&(Y=new WeakMap,c.set(fe,Y));let Ae=Y.get(N);Ae===void 0&&(Ae=s.getUniformBlockIndex(fe,N.name),Y.set(N,Ae))}function Qe(N,fe){const Ae=c.get(fe).get(N);l.get(fe)!==Ae&&(s.uniformBlockBinding(fe,Ae,N.__bindingPointIndex),l.set(fe,Ae))}function ht(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},u={},j=null,$={},d={},f=new WeakMap,g=[],_=null,p=!1,m=null,x=null,M=null,y=null,A=null,E=null,C=null,v=new De(0,0,0),T=0,P=!1,R=null,U=null,G=null,W=null,D=null,Ne.set(0,0,s.canvas.width,s.canvas.height),Ee.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:oe,disable:Le,bindFramebuffer:Ve,drawBuffers:Ge,useProgram:lt,setBlending:ce,setMaterial:te,setFlipSided:ye,setCullFace:xe,setLineWidth:Xe,setPolygonOffset:L,setScissorTest:Ye,activeTexture:Ue,bindTexture:qe,unbindTexture:he,compressedTexImage2D:ut,compressedTexImage3D:w,texImage2D:X,texImage3D:Z,pixelStorei:Pe,getParameter:be,updateUBOMapping:Ke,uniformBlockBinding:Qe,texStorage2D:ue,texStorage3D:pe,texSubImage2D:S,texSubImage3D:B,compressedTexSubImage2D:K,compressedTexSubImage3D:se,scissor:me,viewport:de,reset:ht}}function iM(s,e,t,n,i,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new J,h=new WeakMap,u=new Set;let d;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(w,S){return g?new OffscreenCanvas(w,S):Rr("canvas")}function p(w,S,B){let K=1;const se=ut(w);if((se.width>B||se.height>B)&&(K=B/Math.max(se.width,se.height)),K<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const ue=Math.floor(K*se.width),pe=Math.floor(K*se.height);d===void 0&&(d=_(ue,pe));const X=S?_(ue,pe):d;return X.width=ue,X.height=pe,X.getContext("2d").drawImage(w,0,0,ue,pe),Oe("WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+ue+"x"+pe+")."),X}else return"data"in w&&Oe("WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),w;return w}function m(w){return w.generateMipmaps}function x(w){s.generateMipmap(w)}function M(w){return w.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?s.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(w,S,B,K,se,ue=!1){if(w!==null){if(s[w]!==void 0)return s[w];Oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let pe;K&&(pe=e.get("EXT_texture_norm16"),pe||Oe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let X=S;if(S===s.RED&&(B===s.FLOAT&&(X=s.R32F),B===s.HALF_FLOAT&&(X=s.R16F),B===s.UNSIGNED_BYTE&&(X=s.R8),B===s.UNSIGNED_SHORT&&pe&&(X=pe.R16_EXT),B===s.SHORT&&pe&&(X=pe.R16_SNORM_EXT)),S===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&(X=s.R8UI),B===s.UNSIGNED_SHORT&&(X=s.R16UI),B===s.UNSIGNED_INT&&(X=s.R32UI),B===s.BYTE&&(X=s.R8I),B===s.SHORT&&(X=s.R16I),B===s.INT&&(X=s.R32I)),S===s.RG&&(B===s.FLOAT&&(X=s.RG32F),B===s.HALF_FLOAT&&(X=s.RG16F),B===s.UNSIGNED_BYTE&&(X=s.RG8),B===s.UNSIGNED_SHORT&&pe&&(X=pe.RG16_EXT),B===s.SHORT&&pe&&(X=pe.RG16_SNORM_EXT)),S===s.RG_INTEGER&&(B===s.UNSIGNED_BYTE&&(X=s.RG8UI),B===s.UNSIGNED_SHORT&&(X=s.RG16UI),B===s.UNSIGNED_INT&&(X=s.RG32UI),B===s.BYTE&&(X=s.RG8I),B===s.SHORT&&(X=s.RG16I),B===s.INT&&(X=s.RG32I)),S===s.RGB_INTEGER&&(B===s.UNSIGNED_BYTE&&(X=s.RGB8UI),B===s.UNSIGNED_SHORT&&(X=s.RGB16UI),B===s.UNSIGNED_INT&&(X=s.RGB32UI),B===s.BYTE&&(X=s.RGB8I),B===s.SHORT&&(X=s.RGB16I),B===s.INT&&(X=s.RGB32I)),S===s.RGBA_INTEGER&&(B===s.UNSIGNED_BYTE&&(X=s.RGBA8UI),B===s.UNSIGNED_SHORT&&(X=s.RGBA16UI),B===s.UNSIGNED_INT&&(X=s.RGBA32UI),B===s.BYTE&&(X=s.RGBA8I),B===s.SHORT&&(X=s.RGBA16I),B===s.INT&&(X=s.RGBA32I)),S===s.RGB&&(B===s.UNSIGNED_SHORT&&pe&&(X=pe.RGB16_EXT),B===s.SHORT&&pe&&(X=pe.RGB16_SNORM_EXT),B===s.UNSIGNED_INT_5_9_9_9_REV&&(X=s.RGB9_E5),B===s.UNSIGNED_INT_10F_11F_11F_REV&&(X=s.R11F_G11F_B10F)),S===s.RGBA){const Z=ue?Wa:rt.getTransfer(se);B===s.FLOAT&&(X=s.RGBA32F),B===s.HALF_FLOAT&&(X=s.RGBA16F),B===s.UNSIGNED_BYTE&&(X=Z===ft?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT&&pe&&(X=pe.RGBA16_EXT),B===s.SHORT&&pe&&(X=pe.RGBA16_SNORM_EXT),B===s.UNSIGNED_SHORT_4_4_4_4&&(X=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&(X=s.RGB5_A1)}return(X===s.R16F||X===s.R32F||X===s.RG16F||X===s.RG32F||X===s.RGBA16F||X===s.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function A(w,S){let B;return w?S===null||S===$n||S===Tr?B=s.DEPTH24_STENCIL8:S===Sn?B=s.DEPTH32F_STENCIL8:S===br&&(B=s.DEPTH24_STENCIL8,Oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===$n||S===Tr?B=s.DEPTH_COMPONENT24:S===Sn?B=s.DEPTH_COMPONENT32F:S===br&&(B=s.DEPTH_COMPONENT16),B}function E(w,S){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==zt&&w.minFilter!==kt?Math.log2(Math.max(S.width,S.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?S.mipmaps.length:1}function C(w){const S=w.target;S.removeEventListener("dispose",C),T(S),S.isVideoTexture&&h.delete(S),S.isHTMLTexture&&u.delete(S)}function v(w){const S=w.target;S.removeEventListener("dispose",v),R(S)}function T(w){const S=n.get(w);if(S.__webglInit===void 0)return;const B=w.source,K=f.get(B);if(K){const se=K[S.__cacheKey];se.usedTimes--,se.usedTimes===0&&P(w),Object.keys(K).length===0&&f.delete(B)}n.remove(w)}function P(w){const S=n.get(w);s.deleteTexture(S.__webglTexture);const B=w.source,K=f.get(B);delete K[S.__cacheKey],a.memory.textures--}function R(w){const S=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(S.__webglFramebuffer[K]))for(let se=0;se<S.__webglFramebuffer[K].length;se++)s.deleteFramebuffer(S.__webglFramebuffer[K][se]);else s.deleteFramebuffer(S.__webglFramebuffer[K]);S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer[K])}else{if(Array.isArray(S.__webglFramebuffer))for(let K=0;K<S.__webglFramebuffer.length;K++)s.deleteFramebuffer(S.__webglFramebuffer[K]);else s.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&s.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let K=0;K<S.__webglColorRenderbuffer.length;K++)S.__webglColorRenderbuffer[K]&&s.deleteRenderbuffer(S.__webglColorRenderbuffer[K]);S.__webglDepthRenderbuffer&&s.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const B=w.textures;for(let K=0,se=B.length;K<se;K++){const ue=n.get(B[K]);ue.__webglTexture&&(s.deleteTexture(ue.__webglTexture),a.memory.textures--),n.remove(B[K])}n.remove(w)}let U=0;function G(){U=0}function W(){return U}function D(w){U=w}function z(){const w=U;return w>=i.maxTextures&&Oe("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+i.maxTextures),U+=1,w}function O(w){const S=[];return S.push(w.wrapS),S.push(w.wrapT),S.push(w.wrapR||0),S.push(w.magFilter),S.push(w.minFilter),S.push(w.anisotropy),S.push(w.internalFormat),S.push(w.format),S.push(w.type),S.push(w.generateMipmaps),S.push(w.premultiplyAlpha),S.push(w.flipY),S.push(w.unpackAlignment),S.push(w.colorSpace),S.join()}function ne(w,S){const B=n.get(w);if(w.isVideoTexture&&qe(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&B.__version!==w.version){const K=w.image;if(K===null)Oe("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)Oe("WebGLRenderer: Texture marked for update but image is incomplete");else{Le(B,w,S);return}}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+S)}function ie(w,S){const B=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){Le(B,w,S);return}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+S)}function j(w,S){const B=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){Le(B,w,S);return}t.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+S)}function $(w,S){const B=n.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&B.__version!==w.version){Ve(B,w,S);return}t.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+S)}const Q={[Di]:s.REPEAT,[an]:s.CLAMP_TO_EDGE,[ka]:s.MIRRORED_REPEAT},Te={[zt]:s.NEAREST,[sd]:s.NEAREST_MIPMAP_NEAREST,[dr]:s.NEAREST_MIPMAP_LINEAR,[kt]:s.LINEAR,[Ia]:s.LINEAR_MIPMAP_NEAREST,[ci]:s.LINEAR_MIPMAP_LINEAR},Ne={[Qf]:s.NEVER,[sp]:s.ALWAYS,[ep]:s.LESS,[wc]:s.LEQUAL,[tp]:s.EQUAL,[Ac]:s.GEQUAL,[np]:s.GREATER,[ip]:s.NOTEQUAL};function Ee(w,S){if(S.type===Sn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===kt||S.magFilter===Ia||S.magFilter===dr||S.magFilter===ci||S.minFilter===kt||S.minFilter===Ia||S.minFilter===dr||S.minFilter===ci)&&Oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(w,s.TEXTURE_WRAP_S,Q[S.wrapS]),s.texParameteri(w,s.TEXTURE_WRAP_T,Q[S.wrapT]),(w===s.TEXTURE_3D||w===s.TEXTURE_2D_ARRAY)&&s.texParameteri(w,s.TEXTURE_WRAP_R,Q[S.wrapR]),s.texParameteri(w,s.TEXTURE_MAG_FILTER,Te[S.magFilter]),s.texParameteri(w,s.TEXTURE_MIN_FILTER,Te[S.minFilter]),S.compareFunction&&(s.texParameteri(w,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(w,s.TEXTURE_COMPARE_FUNC,Ne[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===zt||S.minFilter!==dr&&S.minFilter!==ci||S.type===Sn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");s.texParameterf(w,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function q(w,S){let B=!1;w.__webglInit===void 0&&(w.__webglInit=!0,S.addEventListener("dispose",C));const K=S.source;let se=f.get(K);se===void 0&&(se={},f.set(K,se));const ue=O(S);if(ue!==w.__cacheKey){se[ue]===void 0&&(se[ue]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,B=!0),se[ue].usedTimes++;const pe=se[w.__cacheKey];pe!==void 0&&(se[w.__cacheKey].usedTimes--,pe.usedTimes===0&&P(S)),w.__cacheKey=ue,w.__webglTexture=se[ue].texture}return B}function _e(w,S,B){return Math.floor(Math.floor(w/B)/S)}function oe(w,S,B,K){const ue=w.updateRanges;if(ue.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,S.width,S.height,B,K,S.data);else{ue.sort((Pe,me)=>Pe.start-me.start);let pe=0;for(let Pe=1;Pe<ue.length;Pe++){const me=ue[pe],de=ue[Pe],Ke=me.start+me.count,Qe=_e(de.start,S.width,4),ht=_e(me.start,S.width,4);de.start<=Ke+1&&Qe===ht&&_e(de.start+de.count-1,S.width,4)===Qe?me.count=Math.max(me.count,de.start+de.count-me.start):(++pe,ue[pe]=de)}ue.length=pe+1;const X=t.getParameter(s.UNPACK_ROW_LENGTH),Z=t.getParameter(s.UNPACK_SKIP_PIXELS),be=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,S.width);for(let Pe=0,me=ue.length;Pe<me;Pe++){const de=ue[Pe],Ke=Math.floor(de.start/4),Qe=Math.ceil(de.count/4),ht=Ke%S.width,N=Math.floor(Ke/S.width),fe=Qe,Y=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,ht),t.pixelStorei(s.UNPACK_SKIP_ROWS,N),t.texSubImage2D(s.TEXTURE_2D,0,ht,N,fe,Y,B,K,S.data)}w.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,X),t.pixelStorei(s.UNPACK_SKIP_PIXELS,Z),t.pixelStorei(s.UNPACK_SKIP_ROWS,be)}}function Le(w,S,B){let K=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(K=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(K=s.TEXTURE_3D);const se=q(w,S),ue=S.source;t.bindTexture(K,w.__webglTexture,s.TEXTURE0+B);const pe=n.get(ue);if(ue.version!==pe.__version||se===!0){if(t.activeTexture(s.TEXTURE0+B),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){const Y=rt.getPrimaries(rt.workingColorSpace),Ae=S.colorSpace===Ci?null:rt.getPrimaries(S.colorSpace),ge=S.colorSpace===Ci||Y===Ae?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge)}t.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment);let Z=p(S.image,!1,i.maxTextureSize);Z=he(S,Z);const be=r.convert(S.format,S.colorSpace),Pe=r.convert(S.type);let me=y(S.internalFormat,be,Pe,S.normalized,S.colorSpace,S.isVideoTexture);Ee(K,S);let de;const Ke=S.mipmaps,Qe=S.isVideoTexture!==!0,ht=pe.__version===void 0||se===!0,N=ue.dataReady,fe=E(S,Z);if(S.isDepthTexture)me=A(S.format===Yi,S.type),ht&&(Qe?t.texStorage2D(s.TEXTURE_2D,1,me,Z.width,Z.height):t.texImage2D(s.TEXTURE_2D,0,me,Z.width,Z.height,0,be,Pe,null));else if(S.isDataTexture)if(Ke.length>0){Qe&&ht&&t.texStorage2D(s.TEXTURE_2D,fe,me,Ke[0].width,Ke[0].height);for(let Y=0,Ae=Ke.length;Y<Ae;Y++)de=Ke[Y],Qe?N&&t.texSubImage2D(s.TEXTURE_2D,Y,0,0,de.width,de.height,be,Pe,de.data):t.texImage2D(s.TEXTURE_2D,Y,me,de.width,de.height,0,be,Pe,de.data);S.generateMipmaps=!1}else Qe?(ht&&t.texStorage2D(s.TEXTURE_2D,fe,me,Z.width,Z.height),N&&oe(S,Z,be,Pe)):t.texImage2D(s.TEXTURE_2D,0,me,Z.width,Z.height,0,be,Pe,Z.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Qe&&ht&&t.texStorage3D(s.TEXTURE_2D_ARRAY,fe,me,Ke[0].width,Ke[0].height,Z.depth);for(let Y=0,Ae=Ke.length;Y<Ae;Y++)if(de=Ke[Y],S.format!==bn)if(be!==null)if(Qe){if(N)if(S.layerUpdates.size>0){const ge=vu(de.width,de.height,S.format,S.type);for(const re of S.layerUpdates){const Be=de.data.subarray(re*ge/de.data.BYTES_PER_ELEMENT,(re+1)*ge/de.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,re,de.width,de.height,1,be,Be)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,0,de.width,de.height,Z.depth,be,de.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Y,me,de.width,de.height,Z.depth,0,de.data,0,0);else Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Qe?N&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,0,de.width,de.height,Z.depth,be,Pe,de.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Y,me,de.width,de.height,Z.depth,0,be,Pe,de.data)}else{Qe&&ht&&t.texStorage2D(s.TEXTURE_2D,fe,me,Ke[0].width,Ke[0].height);for(let Y=0,Ae=Ke.length;Y<Ae;Y++)de=Ke[Y],S.format!==bn?be!==null?Qe?N&&t.compressedTexSubImage2D(s.TEXTURE_2D,Y,0,0,de.width,de.height,be,de.data):t.compressedTexImage2D(s.TEXTURE_2D,Y,me,de.width,de.height,0,de.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qe?N&&t.texSubImage2D(s.TEXTURE_2D,Y,0,0,de.width,de.height,be,Pe,de.data):t.texImage2D(s.TEXTURE_2D,Y,me,de.width,de.height,0,be,Pe,de.data)}else if(S.isDataArrayTexture)if(Qe){if(ht&&t.texStorage3D(s.TEXTURE_2D_ARRAY,fe,me,Z.width,Z.height,Z.depth),N)if(S.layerUpdates.size>0){const Y=vu(Z.width,Z.height,S.format,S.type);for(const Ae of S.layerUpdates){const ge=Z.data.subarray(Ae*Y/Z.data.BYTES_PER_ELEMENT,(Ae+1)*Y/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Ae,Z.width,Z.height,1,be,Pe,ge)}S.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,be,Pe,Z.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,me,Z.width,Z.height,Z.depth,0,be,Pe,Z.data);else if(S.isData3DTexture)Qe?(ht&&t.texStorage3D(s.TEXTURE_3D,fe,me,Z.width,Z.height,Z.depth),N&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,be,Pe,Z.data)):t.texImage3D(s.TEXTURE_3D,0,me,Z.width,Z.height,Z.depth,0,be,Pe,Z.data);else if(S.isFramebufferTexture){if(ht)if(Qe)t.texStorage2D(s.TEXTURE_2D,fe,me,Z.width,Z.height);else{let Y=Z.width,Ae=Z.height;for(let ge=0;ge<fe;ge++)t.texImage2D(s.TEXTURE_2D,ge,me,Y,Ae,0,be,Pe,null),Y>>=1,Ae>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in s){const Y=s.canvas;if(Y.hasAttribute("layoutsubtree")||Y.setAttribute("layoutsubtree","true"),Z.parentNode!==Y){Y.appendChild(Z),u.add(S),Y.onpaint=Ze=>{const Rt=Ze.changedElements;for(const _t of u)Rt.includes(_t.image)&&(_t.needsUpdate=!0)},Y.requestPaint();return}const Ae=0,ge=s.RGBA,re=s.RGBA,Be=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,Ae,ge,re,Be,Z),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Ke.length>0){if(Qe&&ht){const Y=ut(Ke[0]);t.texStorage2D(s.TEXTURE_2D,fe,me,Y.width,Y.height)}for(let Y=0,Ae=Ke.length;Y<Ae;Y++)de=Ke[Y],Qe?N&&t.texSubImage2D(s.TEXTURE_2D,Y,0,0,be,Pe,de):t.texImage2D(s.TEXTURE_2D,Y,me,be,Pe,de);S.generateMipmaps=!1}else if(Qe){if(ht){const Y=ut(Z);t.texStorage2D(s.TEXTURE_2D,fe,me,Y.width,Y.height)}N&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,be,Pe,Z)}else t.texImage2D(s.TEXTURE_2D,0,me,be,Pe,Z);m(S)&&x(K),pe.__version=ue.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function Ve(w,S,B){if(S.image.length!==6)return;const K=q(w,S),se=S.source;t.bindTexture(s.TEXTURE_CUBE_MAP,w.__webglTexture,s.TEXTURE0+B);const ue=n.get(se);if(se.version!==ue.__version||K===!0){t.activeTexture(s.TEXTURE0+B);const pe=rt.getPrimaries(rt.workingColorSpace),X=S.colorSpace===Ci?null:rt.getPrimaries(S.colorSpace),Z=S.colorSpace===Ci||pe===X?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);const be=S.isCompressedTexture||S.image[0].isCompressedTexture,Pe=S.image[0]&&S.image[0].isDataTexture,me=[];for(let re=0;re<6;re++)!be&&!Pe?me[re]=p(S.image[re],!0,i.maxCubemapSize):me[re]=Pe?S.image[re].image:S.image[re],me[re]=he(S,me[re]);const de=me[0],Ke=r.convert(S.format,S.colorSpace),Qe=r.convert(S.type),ht=y(S.internalFormat,Ke,Qe,S.normalized,S.colorSpace),N=S.isVideoTexture!==!0,fe=ue.__version===void 0||K===!0,Y=se.dataReady;let Ae=E(S,de);Ee(s.TEXTURE_CUBE_MAP,S);let ge;if(be){N&&fe&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Ae,ht,de.width,de.height);for(let re=0;re<6;re++){ge=me[re].mipmaps;for(let Be=0;Be<ge.length;Be++){const Ze=ge[Be];S.format!==bn?Ke!==null?N?Y&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Be,0,0,Ze.width,Ze.height,Ke,Ze.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Be,ht,Ze.width,Ze.height,0,Ze.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?Y&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Be,0,0,Ze.width,Ze.height,Ke,Qe,Ze.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Be,ht,Ze.width,Ze.height,0,Ke,Qe,Ze.data)}}}else{if(ge=S.mipmaps,N&&fe){ge.length>0&&Ae++;const re=ut(me[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Ae,ht,re.width,re.height)}for(let re=0;re<6;re++)if(Pe){N?Y&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,me[re].width,me[re].height,Ke,Qe,me[re].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ht,me[re].width,me[re].height,0,Ke,Qe,me[re].data);for(let Be=0;Be<ge.length;Be++){const Rt=ge[Be].image[re].image;N?Y&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Be+1,0,0,Rt.width,Rt.height,Ke,Qe,Rt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Be+1,ht,Rt.width,Rt.height,0,Ke,Qe,Rt.data)}}else{N?Y&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Ke,Qe,me[re]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ht,Ke,Qe,me[re]);for(let Be=0;Be<ge.length;Be++){const Ze=ge[Be];N?Y&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Be+1,0,0,Ke,Qe,Ze.image[re]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Be+1,ht,Ke,Qe,Ze.image[re])}}}m(S)&&x(s.TEXTURE_CUBE_MAP),ue.__version=se.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function Ge(w,S,B,K,se,ue){const pe=r.convert(B.format,B.colorSpace),X=r.convert(B.type),Z=y(B.internalFormat,pe,X,B.normalized,B.colorSpace),be=n.get(S),Pe=n.get(B);if(Pe.__renderTarget=S,!be.__hasExternalTextures){const me=Math.max(1,S.width>>ue),de=Math.max(1,S.height>>ue);se===s.TEXTURE_3D||se===s.TEXTURE_2D_ARRAY?t.texImage3D(se,ue,Z,me,de,S.depth,0,pe,X,null):t.texImage2D(se,ue,Z,me,de,0,pe,X,null)}t.bindFramebuffer(s.FRAMEBUFFER,w),Ue(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,K,se,Pe.__webglTexture,0,Ye(S)):(se===s.TEXTURE_2D||se>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,K,se,Pe.__webglTexture,ue),t.bindFramebuffer(s.FRAMEBUFFER,null)}function lt(w,S,B){if(s.bindRenderbuffer(s.RENDERBUFFER,w),S.depthBuffer){const K=S.depthTexture,se=K&&K.isDepthTexture?K.type:null,ue=A(S.stencilBuffer,se),pe=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;Ue(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ye(S),ue,S.width,S.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ye(S),ue,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,ue,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,pe,s.RENDERBUFFER,w)}else{const K=S.textures;for(let se=0;se<K.length;se++){const ue=K[se],pe=r.convert(ue.format,ue.colorSpace),X=r.convert(ue.type),Z=y(ue.internalFormat,pe,X,ue.normalized,ue.colorSpace);Ue(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ye(S),Z,S.width,S.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ye(S),Z,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,Z,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function We(w,S,B){const K=S.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,w),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const se=n.get(S.depthTexture);if(se.__renderTarget=S,(!se.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),K){if(se.__webglInit===void 0&&(se.__webglInit=!0,S.depthTexture.addEventListener("dispose",C)),se.__webglTexture===void 0){se.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,se.__webglTexture),Ee(s.TEXTURE_CUBE_MAP,S.depthTexture);const be=r.convert(S.depthTexture.format),Pe=r.convert(S.depthTexture.type);let me;S.depthTexture.format===gi?me=s.DEPTH_COMPONENT24:S.depthTexture.format===Yi&&(me=s.DEPTH24_STENCIL8);for(let de=0;de<6;de++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,me,S.width,S.height,0,be,Pe,null)}}else ne(S.depthTexture,0);const ue=se.__webglTexture,pe=Ye(S),X=K?s.TEXTURE_CUBE_MAP_POSITIVE_X+B:s.TEXTURE_2D,Z=S.depthTexture.format===Yi?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(S.depthTexture.format===gi)Ue(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Z,X,ue,0,pe):s.framebufferTexture2D(s.FRAMEBUFFER,Z,X,ue,0);else if(S.depthTexture.format===Yi)Ue(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Z,X,ue,0,pe):s.framebufferTexture2D(s.FRAMEBUFFER,Z,X,ue,0);else throw new Error("Unknown depthTexture format")}function ee(w){const S=n.get(w),B=w.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==w.depthTexture){const K=w.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),K){const se=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,K.removeEventListener("dispose",se)};K.addEventListener("dispose",se),S.__depthDisposeCallback=se}S.__boundDepthTexture=K}if(w.depthTexture&&!S.__autoAllocateDepthBuffer)if(B)for(let K=0;K<6;K++)We(S.__webglFramebuffer[K],w,K);else{const K=w.texture.mipmaps;K&&K.length>0?We(S.__webglFramebuffer[0],w,0):We(S.__webglFramebuffer,w,0)}else if(B){S.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[K]),S.__webglDepthbuffer[K]===void 0)S.__webglDepthbuffer[K]=s.createRenderbuffer(),lt(S.__webglDepthbuffer[K],w,!1);else{const se=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ue=S.__webglDepthbuffer[K];s.bindRenderbuffer(s.RENDERBUFFER,ue),s.framebufferRenderbuffer(s.FRAMEBUFFER,se,s.RENDERBUFFER,ue)}}else{const K=w.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=s.createRenderbuffer(),lt(S.__webglDepthbuffer,w,!1);else{const se=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ue=S.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ue),s.framebufferRenderbuffer(s.FRAMEBUFFER,se,s.RENDERBUFFER,ue)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function ce(w,S,B){const K=n.get(w);S!==void 0&&Ge(K.__webglFramebuffer,w,w.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&ee(w)}function te(w){const S=w.texture,B=n.get(w),K=n.get(S);w.addEventListener("dispose",v);const se=w.textures,ue=w.isWebGLCubeRenderTarget===!0,pe=se.length>1;if(pe||(K.__webglTexture===void 0&&(K.__webglTexture=s.createTexture()),K.__version=S.version,a.memory.textures++),ue){B.__webglFramebuffer=[];for(let X=0;X<6;X++)if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer[X]=[];for(let Z=0;Z<S.mipmaps.length;Z++)B.__webglFramebuffer[X][Z]=s.createFramebuffer()}else B.__webglFramebuffer[X]=s.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer=[];for(let X=0;X<S.mipmaps.length;X++)B.__webglFramebuffer[X]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(pe)for(let X=0,Z=se.length;X<Z;X++){const be=n.get(se[X]);be.__webglTexture===void 0&&(be.__webglTexture=s.createTexture(),a.memory.textures++)}if(w.samples>0&&Ue(w)===!1){B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let X=0;X<se.length;X++){const Z=se[X];B.__webglColorRenderbuffer[X]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[X]);const be=r.convert(Z.format,Z.colorSpace),Pe=r.convert(Z.type),me=y(Z.internalFormat,be,Pe,Z.normalized,Z.colorSpace,w.isXRRenderTarget===!0),de=Ye(w);s.renderbufferStorageMultisample(s.RENDERBUFFER,de,me,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+X,s.RENDERBUFFER,B.__webglColorRenderbuffer[X])}s.bindRenderbuffer(s.RENDERBUFFER,null),w.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),lt(B.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ue){t.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture),Ee(s.TEXTURE_CUBE_MAP,S);for(let X=0;X<6;X++)if(S.mipmaps&&S.mipmaps.length>0)for(let Z=0;Z<S.mipmaps.length;Z++)Ge(B.__webglFramebuffer[X][Z],w,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+X,Z);else Ge(B.__webglFramebuffer[X],w,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+X,0);m(S)&&x(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(pe){for(let X=0,Z=se.length;X<Z;X++){const be=se[X],Pe=n.get(be);let me=s.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(me=w.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(me,Pe.__webglTexture),Ee(me,be),Ge(B.__webglFramebuffer,w,be,s.COLOR_ATTACHMENT0+X,me,0),m(be)&&x(me)}t.unbindTexture()}else{let X=s.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(X=w.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(X,K.__webglTexture),Ee(X,S),S.mipmaps&&S.mipmaps.length>0)for(let Z=0;Z<S.mipmaps.length;Z++)Ge(B.__webglFramebuffer[Z],w,S,s.COLOR_ATTACHMENT0,X,Z);else Ge(B.__webglFramebuffer,w,S,s.COLOR_ATTACHMENT0,X,0);m(S)&&x(X),t.unbindTexture()}w.depthBuffer&&ee(w)}function ye(w){const S=w.textures;for(let B=0,K=S.length;B<K;B++){const se=S[B];if(m(se)){const ue=M(w),pe=n.get(se).__webglTexture;t.bindTexture(ue,pe),x(ue),t.unbindTexture()}}}const xe=[],Xe=[];function L(w){if(w.samples>0){if(Ue(w)===!1){const S=w.textures,B=w.width,K=w.height;let se=s.COLOR_BUFFER_BIT;const ue=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,pe=n.get(w),X=S.length>1;if(X)for(let be=0;be<S.length;be++)t.bindFramebuffer(s.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+be,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,pe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+be,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer);const Z=w.texture.mipmaps;Z&&Z.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,pe.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let be=0;be<S.length;be++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(se|=s.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(se|=s.STENCIL_BUFFER_BIT)),X){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,pe.__webglColorRenderbuffer[be]);const Pe=n.get(S[be]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Pe,0)}s.blitFramebuffer(0,0,B,K,0,0,B,K,se,s.NEAREST),l===!0&&(xe.length=0,Xe.length=0,xe.push(s.COLOR_ATTACHMENT0+be),w.depthBuffer&&w.resolveDepthBuffer===!1&&(xe.push(ue),Xe.push(ue),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Xe)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,xe))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),X)for(let be=0;be<S.length;be++){t.bindFramebuffer(s.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+be,s.RENDERBUFFER,pe.__webglColorRenderbuffer[be]);const Pe=n.get(S[be]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,pe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+be,s.TEXTURE_2D,Pe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const S=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[S])}}}function Ye(w){return Math.min(i.maxSamples,w.samples)}function Ue(w){const S=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function qe(w){const S=a.render.frame;h.get(w)!==S&&(h.set(w,S),w.update())}function he(w,S){const B=w.colorSpace,K=w.format,se=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||B!==mn&&B!==Ci&&(rt.getTransfer(B)===ft?(K!==bn||se!==fn)&&Oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):He("WebGLTextures: Unsupported texture color space:",B)),S}function ut(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=G,this.getTextureUnits=W,this.setTextureUnits=D,this.setTexture2D=ne,this.setTexture2DArray=ie,this.setTexture3D=j,this.setTextureCube=$,this.rebindTextures=ce,this.setupRenderTarget=te,this.updateRenderTargetMipmap=ye,this.updateMultisampleRenderTarget=L,this.setupDepthRenderbuffer=ee,this.setupFrameBufferTexture=Ge,this.useMultisampledRTT=Ue,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function sM(s,e){function t(n,i=Ci){let r;const a=rt.getTransfer(i);if(n===fn)return s.UNSIGNED_BYTE;if(n===vc)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Mc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===od)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===ld)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===rd)return s.BYTE;if(n===ad)return s.SHORT;if(n===br)return s.UNSIGNED_SHORT;if(n===xc)return s.INT;if(n===$n)return s.UNSIGNED_INT;if(n===Sn)return s.FLOAT;if(n===pn)return s.HALF_FLOAT;if(n===cd)return s.ALPHA;if(n===hd)return s.RGB;if(n===bn)return s.RGBA;if(n===gi)return s.DEPTH_COMPONENT;if(n===Yi)return s.DEPTH_STENCIL;if(n===yc)return s.RED;if(n===Sc)return s.RED_INTEGER;if(n===Ji)return s.RG;if(n===bc)return s.RG_INTEGER;if(n===Tc)return s.RGBA_INTEGER;if(n===La||n===Da||n===Na||n===Ua)if(a===ft)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===La)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Da)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===La)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Da)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Na)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ua)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===gl||n===_l||n===xl||n===vl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===gl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===_l)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===xl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===vl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ml||n===yl||n===Sl||n===bl||n===Tl||n===Va||n===El)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ml||n===yl)return a===ft?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Sl)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===bl)return r.COMPRESSED_R11_EAC;if(n===Tl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Va)return r.COMPRESSED_RG11_EAC;if(n===El)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===wl||n===Al||n===Rl||n===Cl||n===Pl||n===Il||n===Ll||n===Dl||n===Nl||n===Ul||n===Fl||n===Ol||n===Bl||n===zl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===wl)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Al)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Rl)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Cl)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Pl)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Il)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ll)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Dl)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Nl)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ul)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Fl)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ol)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Bl)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===zl)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===kl||n===Vl||n===Gl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===kl)return a===ft?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Vl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Gl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Hl||n===Wl||n===Ga||n===Xl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Hl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Wl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ga)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Xl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Tr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}const rM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,aM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class oM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Td(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Vt({vertexShader:rM,fragmentShader:aM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new we(new dt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class lM extends Ni{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=typeof XRWebGLBinding<"u",p=new oM,m={},x=t.getContextAttributes();let M=null,y=null;const A=[],E=[],C=new J;let v=null;const T=new tn;T.viewport=new yt;const P=new tn;P.viewport=new yt;const R=[T,P],U=new s0;let G=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let _e=A[q];return _e===void 0&&(_e=new yo,A[q]=_e),_e.getTargetRaySpace()},this.getControllerGrip=function(q){let _e=A[q];return _e===void 0&&(_e=new yo,A[q]=_e),_e.getGripSpace()},this.getHand=function(q){let _e=A[q];return _e===void 0&&(_e=new yo,A[q]=_e),_e.getHandSpace()};function D(q){const _e=E.indexOf(q.inputSource);if(_e===-1)return;const oe=A[_e];oe!==void 0&&(oe.update(q.inputSource,q.frame,c||a),oe.dispatchEvent({type:q.type,data:q.inputSource}))}function z(){i.removeEventListener("select",D),i.removeEventListener("selectstart",D),i.removeEventListener("selectend",D),i.removeEventListener("squeeze",D),i.removeEventListener("squeezestart",D),i.removeEventListener("squeezeend",D),i.removeEventListener("end",z),i.removeEventListener("inputsourceschange",O);for(let q=0;q<A.length;q++){const _e=E[q];_e!==null&&(E[q]=null,A[q].disconnect(_e))}G=null,W=null,p.reset();for(const q in m)delete m[q];e.setRenderTarget(M),f=null,d=null,u=null,i=null,y=null,Ee.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&Oe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&Oe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(M=e.getRenderTarget(),i.addEventListener("select",D),i.addEventListener("selectstart",D),i.addEventListener("selectend",D),i.addEventListener("squeeze",D),i.addEventListener("squeezestart",D),i.addEventListener("squeezeend",D),i.addEventListener("end",z),i.addEventListener("inputsourceschange",O),x.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let oe=null,Le=null,Ve=null;x.depth&&(Ve=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,oe=x.stencil?Yi:gi,Le=x.stencil?Tr:$n);const Ge={colorFormat:t.RGBA8,depthFormat:Ve,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Ge),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new ln(d.textureWidth,d.textureHeight,{format:bn,type:fn,depthTexture:new Ds(d.textureWidth,d.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const oe={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,oe),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new ln(f.framebufferWidth,f.framebufferHeight,{format:bn,type:fn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Ee.setContext(i),Ee.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function O(q){for(let _e=0;_e<q.removed.length;_e++){const oe=q.removed[_e],Le=E.indexOf(oe);Le>=0&&(E[Le]=null,A[Le].disconnect(oe))}for(let _e=0;_e<q.added.length;_e++){const oe=q.added[_e];let Le=E.indexOf(oe);if(Le===-1){for(let Ge=0;Ge<A.length;Ge++)if(Ge>=E.length){E.push(oe),Le=Ge;break}else if(E[Ge]===null){E[Ge]=oe,Le=Ge;break}if(Le===-1)break}const Ve=A[Le];Ve&&Ve.connect(oe)}}const ne=new I,ie=new I;function j(q,_e,oe){ne.setFromMatrixPosition(_e.matrixWorld),ie.setFromMatrixPosition(oe.matrixWorld);const Le=ne.distanceTo(ie),Ve=_e.projectionMatrix.elements,Ge=oe.projectionMatrix.elements,lt=Ve[14]/(Ve[10]-1),We=Ve[14]/(Ve[10]+1),ee=(Ve[9]+1)/Ve[5],ce=(Ve[9]-1)/Ve[5],te=(Ve[8]-1)/Ve[0],ye=(Ge[8]+1)/Ge[0],xe=lt*te,Xe=lt*ye,L=Le/(-te+ye),Ye=L*-te;if(_e.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ye),q.translateZ(L),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Ve[10]===-1)q.projectionMatrix.copy(_e.projectionMatrix),q.projectionMatrixInverse.copy(_e.projectionMatrixInverse);else{const Ue=lt+L,qe=We+L,he=xe-Ye,ut=Xe+(Le-Ye),w=ee*We/qe*Ue,S=ce*We/qe*Ue;q.projectionMatrix.makePerspective(he,ut,w,S,Ue,qe),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function $(q,_e){_e===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(_e.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;let _e=q.near,oe=q.far;p.texture!==null&&(p.depthNear>0&&(_e=p.depthNear),p.depthFar>0&&(oe=p.depthFar)),U.near=P.near=T.near=_e,U.far=P.far=T.far=oe,(G!==U.near||W!==U.far)&&(i.updateRenderState({depthNear:U.near,depthFar:U.far}),G=U.near,W=U.far),U.layers.mask=q.layers.mask|6,T.layers.mask=U.layers.mask&-5,P.layers.mask=U.layers.mask&-3;const Le=q.parent,Ve=U.cameras;$(U,Le);for(let Ge=0;Ge<Ve.length;Ge++)$(Ve[Ge],Le);Ve.length===2?j(U,T,P):U.projectionMatrix.copy(T.projectionMatrix),Q(q,U,Le)};function Q(q,_e,oe){oe===null?q.matrix.copy(_e.matrixWorld):(q.matrix.copy(oe.matrixWorld),q.matrix.invert(),q.matrix.multiply(_e.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(_e.projectionMatrix),q.projectionMatrixInverse.copy(_e.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Ls*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(U)},this.getCameraTexture=function(q){return m[q]};let Te=null;function Ne(q,_e){if(h=_e.getViewerPose(c||a),g=_e,h!==null){const oe=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Le=!1;oe.length!==U.cameras.length&&(U.cameras.length=0,Le=!0);for(let We=0;We<oe.length;We++){const ee=oe[We];let ce=null;if(f!==null)ce=f.getViewport(ee);else{const ye=u.getViewSubImage(d,ee);ce=ye.viewport,We===0&&(e.setRenderTargetTextures(y,ye.colorTexture,ye.depthStencilTexture),e.setRenderTarget(y))}let te=R[We];te===void 0&&(te=new tn,te.layers.enable(We),te.viewport=new yt,R[We]=te),te.matrix.fromArray(ee.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray(ee.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(ce.x,ce.y,ce.width,ce.height),We===0&&(U.matrix.copy(te.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Le===!0&&U.cameras.push(te)}const Ve=i.enabledFeatures;if(Ve&&Ve.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const We=u.getDepthInformation(oe[0]);We&&We.isValid&&We.texture&&p.init(We,i.renderState)}if(Ve&&Ve.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let We=0;We<oe.length;We++){const ee=oe[We].camera;if(ee){let ce=m[ee];ce||(ce=new Td,m[ee]=ce);const te=u.getCameraImage(ee);ce.sourceTexture=te}}}}for(let oe=0;oe<A.length;oe++){const Le=E[oe],Ve=A[oe];Le!==null&&Ve!==void 0&&Ve.update(Le,_e,c||a)}Te&&Te(q,_e),_e.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:_e}),g=null}const Ee=new Wd;Ee.setAnimationLoop(Ne),this.setAnimationLoop=function(q){Te=q},this.dispose=function(){}}}const cM=new Je,$d=new je;$d.set(-1,0,0,0,1,0,0,0,1);function hM(s,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Ud(s)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,x,M,y){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,y)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),_(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,x,M):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===nn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===nn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const x=e.get(m),M=x.envMap,y=x.envMapRotation;M&&(p.envMap.value=M,p.envMapRotation.value.setFromMatrix4(cM.makeRotationFromEuler(y)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply($d),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,x,M){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*x,p.scale.value=M*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,x){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===nn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const x=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function uM(s,e,t,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,M){const y=M.program;n.uniformBlockBinding(x,y)}function c(x,M){let y=i[x.id];y===void 0&&(g(x),y=h(x),i[x.id]=y,x.addEventListener("dispose",p));const A=M.program;n.updateUBOMapping(x,A);const E=e.render.frame;r[x.id]!==E&&(d(x),r[x.id]=E)}function h(x){const M=u();x.__bindingPointIndex=M;const y=s.createBuffer(),A=x.__size,E=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,A,E),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,y),y}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return He("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const M=i[x.id],y=x.uniforms,A=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let E=0,C=y.length;E<C;E++){const v=Array.isArray(y[E])?y[E]:[y[E]];for(let T=0,P=v.length;T<P;T++){const R=v[T];if(f(R,E,T,A)===!0){const U=R.__offset,G=Array.isArray(R.value)?R.value:[R.value];let W=0;for(let D=0;D<G.length;D++){const z=G[D],O=_(z);typeof z=="number"||typeof z=="boolean"?(R.__data[0]=z,s.bufferSubData(s.UNIFORM_BUFFER,U+W,R.__data)):z.isMatrix3?(R.__data[0]=z.elements[0],R.__data[1]=z.elements[1],R.__data[2]=z.elements[2],R.__data[3]=0,R.__data[4]=z.elements[3],R.__data[5]=z.elements[4],R.__data[6]=z.elements[5],R.__data[7]=0,R.__data[8]=z.elements[6],R.__data[9]=z.elements[7],R.__data[10]=z.elements[8],R.__data[11]=0):ArrayBuffer.isView(z)?R.__data.set(new z.constructor(z.buffer,z.byteOffset,R.__data.length)):(z.toArray(R.__data,W),W+=O.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,U,R.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,M,y,A){const E=x.value,C=M+"_"+y;if(A[C]===void 0)return typeof E=="number"||typeof E=="boolean"?A[C]=E:ArrayBuffer.isView(E)?A[C]=E.slice():A[C]=E.clone(),!0;{const v=A[C];if(typeof E=="number"||typeof E=="boolean"){if(v!==E)return A[C]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(v.equals(E)===!1)return v.copy(E),!0}}return!1}function g(x){const M=x.uniforms;let y=0;const A=16;for(let C=0,v=M.length;C<v;C++){const T=Array.isArray(M[C])?M[C]:[M[C]];for(let P=0,R=T.length;P<R;P++){const U=T[P],G=Array.isArray(U.value)?U.value:[U.value];for(let W=0,D=G.length;W<D;W++){const z=G[W],O=_(z),ne=y%A,ie=ne%O.boundary,j=ne+ie;y+=ie,j!==0&&A-j<O.storage&&(y+=A-j),U.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=y,y+=O.storage}}}const E=y%A;return E>0&&(y+=A-E),x.__size=y,x.__cache={},this}function _(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?Oe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(M.boundary=16,M.storage=x.byteLength):Oe("WebGLRenderer: Unsupported uniform value type.",x),M}function p(x){const M=x.target;M.removeEventListener("dispose",p);const y=a.indexOf(M.__bindingPointIndex);a.splice(y,1),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function m(){for(const x in i)s.deleteBuffer(i[x]);a=[],i={},r={}}return{bind:l,update:c,dispose:m}}const dM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Vn=null;function fM(){return Vn===null&&(Vn=new Dc(dM,16,16,Ji,pn),Vn.name="DFG_LUT",Vn.minFilter=kt,Vn.magFilter=kt,Vn.wrapS=an,Vn.wrapT=an,Vn.generateMipmaps=!1,Vn.needsUpdate=!0),Vn}class pM{constructor(e={}){const{canvas:t=op(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=fn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const _=f,p=new Set([Tc,bc,Sc]),m=new Set([fn,$n,br,Tr,vc,Mc]),x=new Uint32Array(4),M=new Int32Array(4),y=new I;let A=null,E=null;const C=[],v=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=jn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let R=!1,U=null;this._outputColorSpace=Bt;let G=0,W=0,D=null,z=-1,O=null;const ne=new yt,ie=new yt;let j=null;const $=new De(0);let Q=0,Te=t.width,Ne=t.height,Ee=1,q=null,_e=null;const oe=new yt(0,0,Te,Ne),Le=new yt(0,0,Te,Ne);let Ve=!1;const Ge=new Uc;let lt=!1,We=!1;const ee=new Je,ce=new I,te=new yt,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let xe=!1;function Xe(){return D===null?Ee:1}let L=n;function Ye(b,F){return t.getContext(b,F)}try{const b={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${uc}`),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",Be,!1),t.addEventListener("webglcontextcreationerror",Ze,!1),L===null){const F="webgl2";if(L=Ye(F,b),L===null)throw Ye(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw He("WebGLRenderer: "+b.message),b}let Ue,qe,he,ut,w,S,B,K,se,ue,pe,X,Z,be,Pe,me,de,Ke,Qe,ht,N,fe,Y;function Ae(){Ue=new fx(L),Ue.init(),N=new sM(L,Ue),qe=new rx(L,Ue,e,N),he=new nM(L,Ue),qe.reversedDepthBuffer&&d&&he.buffers.depth.setReversed(!0),ut=new gx(L),w=new Gv,S=new iM(L,Ue,he,w,qe,N,ut),B=new dx(P),K=new M0(L),fe=new ix(L,K),se=new px(L,K,ut,fe),ue=new xx(L,se,K,fe,ut),Ke=new _x(L,qe,S),Pe=new ax(w),pe=new Vv(P,B,Ue,qe,fe,Pe),X=new hM(P,w),Z=new Wv,be=new Zv(Ue),de=new nx(P,B,he,ue,g,l),me=new tM(P,ue,qe),Y=new uM(L,ut,qe,he),Qe=new sx(L,Ue,ut),ht=new mx(L,Ue,ut),ut.programs=pe.programs,P.capabilities=qe,P.extensions=Ue,P.properties=w,P.renderLists=Z,P.shadowMap=me,P.state=he,P.info=ut}Ae(),_!==fn&&(T=new Mx(_,t.width,t.height,i,r));const ge=new lM(P,L);this.xr=ge,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const b=Ue.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Ue.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return Ee},this.setPixelRatio=function(b){b!==void 0&&(Ee=b,this.setSize(Te,Ne,!1))},this.getSize=function(b){return b.set(Te,Ne)},this.setSize=function(b,F,H=!0){if(ge.isPresenting){Oe("WebGLRenderer: Can't change size while VR device is presenting.");return}Te=b,Ne=F,t.width=Math.floor(b*Ee),t.height=Math.floor(F*Ee),H===!0&&(t.style.width=b+"px",t.style.height=F+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,b,F)},this.getDrawingBufferSize=function(b){return b.set(Te*Ee,Ne*Ee).floor()},this.setDrawingBufferSize=function(b,F,H){Te=b,Ne=F,Ee=H,t.width=Math.floor(b*H),t.height=Math.floor(F*H),this.setViewport(0,0,b,F)},this.setEffects=function(b){if(_===fn){He("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let F=0;F<b.length;F++)if(b[F].isOutputPass===!0){Oe("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(ne)},this.getViewport=function(b){return b.copy(oe)},this.setViewport=function(b,F,H,k){b.isVector4?oe.set(b.x,b.y,b.z,b.w):oe.set(b,F,H,k),he.viewport(ne.copy(oe).multiplyScalar(Ee).round())},this.getScissor=function(b){return b.copy(Le)},this.setScissor=function(b,F,H,k){b.isVector4?Le.set(b.x,b.y,b.z,b.w):Le.set(b,F,H,k),he.scissor(ie.copy(Le).multiplyScalar(Ee).round())},this.getScissorTest=function(){return Ve},this.setScissorTest=function(b){he.setScissorTest(Ve=b)},this.setOpaqueSort=function(b){q=b},this.setTransparentSort=function(b){_e=b},this.getClearColor=function(b){return b.copy(de.getClearColor())},this.setClearColor=function(){de.setClearColor(...arguments)},this.getClearAlpha=function(){return de.getClearAlpha()},this.setClearAlpha=function(){de.setClearAlpha(...arguments)},this.clear=function(b=!0,F=!0,H=!0){let k=0;if(b){let V=!1;if(D!==null){const Se=D.texture.format;V=p.has(Se)}if(V){const Se=D.texture.type,Ie=m.has(Se),Me=de.getClearColor(),Fe=de.getClearAlpha(),ze=Me.r,$e=Me.g,nt=Me.b;Ie?(x[0]=ze,x[1]=$e,x[2]=nt,x[3]=Fe,L.clearBufferuiv(L.COLOR,0,x)):(M[0]=ze,M[1]=$e,M[2]=nt,M[3]=Fe,L.clearBufferiv(L.COLOR,0,M))}else k|=L.COLOR_BUFFER_BIT}F&&(k|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(k|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&L.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),U=b},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",Be,!1),t.removeEventListener("webglcontextcreationerror",Ze,!1),de.dispose(),Z.dispose(),be.dispose(),w.dispose(),B.dispose(),ue.dispose(),fe.dispose(),Y.dispose(),pe.dispose(),ge.dispose(),ge.removeEventListener("sessionstart",hh),ge.removeEventListener("sessionend",uh),Oi.stop()};function re(b){b.preventDefault(),Xa("WebGLRenderer: Context Lost."),R=!0}function Be(){Xa("WebGLRenderer: Context Restored."),R=!1;const b=ut.autoReset,F=me.enabled,H=me.autoUpdate,k=me.needsUpdate,V=me.type;Ae(),ut.autoReset=b,me.enabled=F,me.autoUpdate=H,me.needsUpdate=k,me.type=V}function Ze(b){He("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Rt(b){const F=b.target;F.removeEventListener("dispose",Rt),_t(F)}function _t(b){ti(b),w.remove(b)}function ti(b){const F=w.get(b).programs;F!==void 0&&(F.forEach(function(H){pe.releaseProgram(H)}),b.isShaderMaterial&&pe.releaseShaderCache(b))}this.renderBufferDirect=function(b,F,H,k,V,Se){F===null&&(F=ye);const Ie=V.isMesh&&V.matrixWorld.determinant()<0,Me=vf(b,F,H,k,V);he.setMaterial(k,Ie);let Fe=H.index,ze=1;if(k.wireframe===!0){if(Fe=se.getWireframeAttribute(H),Fe===void 0)return;ze=2}const $e=H.drawRange,nt=H.attributes.position;let ke=$e.start*ze,xt=($e.start+$e.count)*ze;Se!==null&&(ke=Math.max(ke,Se.start*ze),xt=Math.min(xt,(Se.start+Se.count)*ze)),Fe!==null?(ke=Math.max(ke,0),xt=Math.min(xt,Fe.count)):nt!=null&&(ke=Math.max(ke,0),xt=Math.min(xt,nt.count));const Ct=xt-ke;if(Ct<0||Ct===1/0)return;fe.setup(V,k,Me,H,Fe);let wt,vt=Qe;if(Fe!==null&&(wt=K.get(Fe),vt=ht,vt.setIndex(wt)),V.isMesh)k.wireframe===!0?(he.setLineWidth(k.wireframeLinewidth*Xe()),vt.setMode(L.LINES)):vt.setMode(L.TRIANGLES);else if(V.isLine){let $t=k.linewidth;$t===void 0&&($t=1),he.setLineWidth($t*Xe()),V.isLineSegments?vt.setMode(L.LINES):V.isLineLoop?vt.setMode(L.LINE_LOOP):vt.setMode(L.LINE_STRIP)}else V.isPoints?vt.setMode(L.POINTS):V.isSprite&&vt.setMode(L.TRIANGLES);if(V.isBatchedMesh)if(Ue.get("WEBGL_multi_draw"))vt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const $t=V._multiDrawStarts,Ce=V._multiDrawCounts,cn=V._multiDrawCount,ct=Fe?K.get(Fe).bytesPerElement:1,gn=w.get(k).currentProgram.getUniforms();for(let zn=0;zn<cn;zn++)gn.setValue(L,"_gl_DrawID",zn),vt.render($t[zn]/ct,Ce[zn])}else if(V.isInstancedMesh)vt.renderInstances(ke,Ct,V.count);else if(H.isInstancedBufferGeometry){const $t=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Ce=Math.min(H.instanceCount,$t);vt.renderInstances(ke,Ct,Ce)}else vt.render(ke,Ct)};function Bn(b,F,H){b.transparent===!0&&b.side===Ot&&b.forceSinglePass===!1?(b.side=nn,b.needsUpdate=!0,qr(b,F,H),b.side=mi,b.needsUpdate=!0,qr(b,F,H),b.side=Ot):qr(b,F,H)}this.compile=function(b,F,H=null){H===null&&(H=b),E=be.get(H),E.init(F),v.push(E),H.traverseVisible(function(V){V.isLight&&V.layers.test(F.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),b!==H&&b.traverseVisible(function(V){V.isLight&&V.layers.test(F.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),E.setupLights();const k=new Set;return b.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const Se=V.material;if(Se)if(Array.isArray(Se))for(let Ie=0;Ie<Se.length;Ie++){const Me=Se[Ie];Bn(Me,H,V),k.add(Me)}else Bn(Se,H,V),k.add(Se)}),E=v.pop(),k},this.compileAsync=function(b,F,H=null){const k=this.compile(b,F,H);return new Promise(V=>{function Se(){if(k.forEach(function(Ie){w.get(Ie).currentProgram.isReady()&&k.delete(Ie)}),k.size===0){V(b);return}setTimeout(Se,10)}Ue.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let ho=null;function _f(b){ho&&ho(b)}function hh(){Oi.stop()}function uh(){Oi.start()}const Oi=new Wd;Oi.setAnimationLoop(_f),typeof self<"u"&&Oi.setContext(self),this.setAnimationLoop=function(b){ho=b,ge.setAnimationLoop(b),b===null?Oi.stop():Oi.start()},ge.addEventListener("sessionstart",hh),ge.addEventListener("sessionend",uh),this.render=function(b,F){if(F!==void 0&&F.isCamera!==!0){He("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;U!==null&&U.renderStart(b,F);const H=ge.enabled===!0&&ge.isPresenting===!0,k=T!==null&&(D===null||H)&&T.begin(P,D);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ge.enabled===!0&&ge.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(ge.cameraAutoUpdate===!0&&ge.updateCamera(F),F=ge.getCamera()),b.isScene===!0&&b.onBeforeRender(P,b,F,D),E=be.get(b,v.length),E.init(F),E.state.textureUnits=S.getTextureUnits(),v.push(E),ee.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Ge.setFromProjectionMatrix(ee,Xn,F.reversedDepth),We=this.localClippingEnabled,lt=Pe.init(this.clippingPlanes,We),A=Z.get(b,C.length),A.init(),C.push(A),ge.enabled===!0&&ge.isPresenting===!0){const Ie=P.xr.getDepthSensingMesh();Ie!==null&&uo(Ie,F,-1/0,P.sortObjects)}uo(b,F,0,P.sortObjects),A.finish(),P.sortObjects===!0&&A.sort(q,_e),xe=ge.enabled===!1||ge.isPresenting===!1||ge.hasDepthSensing()===!1,xe&&de.addToRenderList(A,b),this.info.render.frame++,lt===!0&&Pe.beginShadows();const V=E.state.shadowsArray;if(me.render(V,b,F),lt===!0&&Pe.endShadows(),this.info.autoReset===!0&&this.info.reset(),(k&&T.hasRenderPass())===!1){const Ie=A.opaque,Me=A.transmissive;if(E.setupLights(),F.isArrayCamera){const Fe=F.cameras;if(Me.length>0)for(let ze=0,$e=Fe.length;ze<$e;ze++){const nt=Fe[ze];fh(Ie,Me,b,nt)}xe&&de.render(b);for(let ze=0,$e=Fe.length;ze<$e;ze++){const nt=Fe[ze];dh(A,b,nt,nt.viewport)}}else Me.length>0&&fh(Ie,Me,b,F),xe&&de.render(b),dh(A,b,F)}D!==null&&W===0&&(S.updateMultisampleRenderTarget(D),S.updateRenderTargetMipmap(D)),k&&T.end(P),b.isScene===!0&&b.onAfterRender(P,b,F),fe.resetDefaultState(),z=-1,O=null,v.pop(),v.length>0?(E=v[v.length-1],S.setTextureUnits(E.state.textureUnits),lt===!0&&Pe.setGlobalState(P.clippingPlanes,E.state.camera)):E=null,C.pop(),C.length>0?A=C[C.length-1]:A=null,U!==null&&U.renderEnd()};function uo(b,F,H,k){if(b.visible===!1)return;if(b.layers.test(F.layers)){if(b.isGroup)H=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(F);else if(b.isLightProbeGrid)E.pushLightProbeGrid(b);else if(b.isLight)E.pushLight(b),b.castShadow&&E.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Ge.intersectsSprite(b)){k&&te.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ee);const Ie=ue.update(b),Me=b.material;Me.visible&&A.push(b,Ie,Me,H,te.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Ge.intersectsObject(b))){const Ie=ue.update(b),Me=b.material;if(k&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),te.copy(b.boundingSphere.center)):(Ie.boundingSphere===null&&Ie.computeBoundingSphere(),te.copy(Ie.boundingSphere.center)),te.applyMatrix4(b.matrixWorld).applyMatrix4(ee)),Array.isArray(Me)){const Fe=Ie.groups;for(let ze=0,$e=Fe.length;ze<$e;ze++){const nt=Fe[ze],ke=Me[nt.materialIndex];ke&&ke.visible&&A.push(b,Ie,ke,H,te.z,nt)}}else Me.visible&&A.push(b,Ie,Me,H,te.z,null)}}const Se=b.children;for(let Ie=0,Me=Se.length;Ie<Me;Ie++)uo(Se[Ie],F,H,k)}function dh(b,F,H,k){const{opaque:V,transmissive:Se,transparent:Ie}=b;E.setupLightsView(H),lt===!0&&Pe.setGlobalState(P.clippingPlanes,H),k&&he.viewport(ne.copy(k)),V.length>0&&Xr(V,F,H),Se.length>0&&Xr(Se,F,H),Ie.length>0&&Xr(Ie,F,H),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function fh(b,F,H,k){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[k.id]===void 0){const ke=Ue.has("EXT_color_buffer_half_float")||Ue.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[k.id]=new ln(1,1,{generateMipmaps:!0,type:ke?pn:fn,minFilter:ci,samples:Math.max(4,qe.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:rt.workingColorSpace})}const Se=E.state.transmissionRenderTarget[k.id],Ie=k.viewport||ne;Se.setSize(Ie.z*P.transmissionResolutionScale,Ie.w*P.transmissionResolutionScale);const Me=P.getRenderTarget(),Fe=P.getActiveCubeFace(),ze=P.getActiveMipmapLevel();P.setRenderTarget(Se),P.getClearColor($),Q=P.getClearAlpha(),Q<1&&P.setClearColor(16777215,.5),P.clear(),xe&&de.render(H);const $e=P.toneMapping;P.toneMapping=jn;const nt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),E.setupLightsView(k),lt===!0&&Pe.setGlobalState(P.clippingPlanes,k),Xr(b,H,k),S.updateMultisampleRenderTarget(Se),S.updateRenderTargetMipmap(Se),Ue.has("WEBGL_multisampled_render_to_texture")===!1){let ke=!1;for(let xt=0,Ct=F.length;xt<Ct;xt++){const wt=F[xt],{object:vt,geometry:$t,material:Ce,group:cn}=wt;if(Ce.side===Ot&&vt.layers.test(k.layers)){const ct=Ce.side;Ce.side=nn,Ce.needsUpdate=!0,ph(vt,H,k,$t,Ce,cn),Ce.side=ct,Ce.needsUpdate=!0,ke=!0}}ke===!0&&(S.updateMultisampleRenderTarget(Se),S.updateRenderTargetMipmap(Se))}P.setRenderTarget(Me,Fe,ze),P.setClearColor($,Q),nt!==void 0&&(k.viewport=nt),P.toneMapping=$e}function Xr(b,F,H){const k=F.isScene===!0?F.overrideMaterial:null;for(let V=0,Se=b.length;V<Se;V++){const Ie=b[V],{object:Me,geometry:Fe,group:ze}=Ie;let $e=Ie.material;$e.allowOverride===!0&&k!==null&&($e=k),Me.layers.test(H.layers)&&ph(Me,F,H,Fe,$e,ze)}}function ph(b,F,H,k,V,Se){b.onBeforeRender(P,F,H,k,V,Se),b.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),V.onBeforeRender(P,F,H,k,b,Se),V.transparent===!0&&V.side===Ot&&V.forceSinglePass===!1?(V.side=nn,V.needsUpdate=!0,P.renderBufferDirect(H,F,k,V,b,Se),V.side=mi,V.needsUpdate=!0,P.renderBufferDirect(H,F,k,V,b,Se),V.side=Ot):P.renderBufferDirect(H,F,k,V,b,Se),b.onAfterRender(P,F,H,k,V,Se)}function qr(b,F,H){F.isScene!==!0&&(F=ye);const k=w.get(b),V=E.state.lights,Se=E.state.shadowsArray,Ie=V.state.version,Me=pe.getParameters(b,V.state,Se,F,H,E.state.lightProbeGridArray),Fe=pe.getProgramCacheKey(Me);let ze=k.programs;k.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?F.environment:null,k.fog=F.fog;const $e=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;k.envMap=B.get(b.envMap||k.environment,$e),k.envMapRotation=k.environment!==null&&b.envMap===null?F.environmentRotation:b.envMapRotation,ze===void 0&&(b.addEventListener("dispose",Rt),ze=new Map,k.programs=ze);let nt=ze.get(Fe);if(nt!==void 0){if(k.currentProgram===nt&&k.lightsStateVersion===Ie)return gh(b,Me),nt}else Me.uniforms=pe.getUniforms(b),U!==null&&b.isNodeMaterial&&U.build(b,H,Me),b.onBeforeCompile(Me,P),nt=pe.acquireProgram(Me,Fe),ze.set(Fe,nt),k.uniforms=Me.uniforms;const ke=k.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(ke.clippingPlanes=Pe.uniform),gh(b,Me),k.needsLights=yf(b),k.lightsStateVersion=Ie,k.needsLights&&(ke.ambientLightColor.value=V.state.ambient,ke.lightProbe.value=V.state.probe,ke.directionalLights.value=V.state.directional,ke.directionalLightShadows.value=V.state.directionalShadow,ke.spotLights.value=V.state.spot,ke.spotLightShadows.value=V.state.spotShadow,ke.rectAreaLights.value=V.state.rectArea,ke.ltc_1.value=V.state.rectAreaLTC1,ke.ltc_2.value=V.state.rectAreaLTC2,ke.pointLights.value=V.state.point,ke.pointLightShadows.value=V.state.pointShadow,ke.hemisphereLights.value=V.state.hemi,ke.directionalShadowMatrix.value=V.state.directionalShadowMatrix,ke.spotLightMatrix.value=V.state.spotLightMatrix,ke.spotLightMap.value=V.state.spotLightMap,ke.pointShadowMatrix.value=V.state.pointShadowMatrix),k.lightProbeGrid=E.state.lightProbeGridArray.length>0,k.currentProgram=nt,k.uniformsList=null,nt}function mh(b){if(b.uniformsList===null){const F=b.currentProgram.getUniforms();b.uniformsList=Fa.seqWithValue(F.seq,b.uniforms)}return b.uniformsList}function gh(b,F){const H=w.get(b);H.outputColorSpace=F.outputColorSpace,H.batching=F.batching,H.batchingColor=F.batchingColor,H.instancing=F.instancing,H.instancingColor=F.instancingColor,H.instancingMorph=F.instancingMorph,H.skinning=F.skinning,H.morphTargets=F.morphTargets,H.morphNormals=F.morphNormals,H.morphColors=F.morphColors,H.morphTargetsCount=F.morphTargetsCount,H.numClippingPlanes=F.numClippingPlanes,H.numIntersection=F.numClipIntersection,H.vertexAlphas=F.vertexAlphas,H.vertexTangents=F.vertexTangents,H.toneMapping=F.toneMapping}function xf(b,F){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;y.setFromMatrixPosition(F.matrixWorld);for(let H=0,k=b.length;H<k;H++){const V=b[H];if(V.texture!==null&&V.boundingBox.containsPoint(y))return V}return null}function vf(b,F,H,k,V){F.isScene!==!0&&(F=ye),S.resetTextureUnits();const Se=F.fog,Ie=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?F.environment:null,Me=D===null?P.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:rt.workingColorSpace,Fe=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,ze=B.get(k.envMap||Ie,Fe),$e=k.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,nt=!!H.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),ke=!!H.morphAttributes.position,xt=!!H.morphAttributes.normal,Ct=!!H.morphAttributes.color;let wt=jn;k.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(wt=P.toneMapping);const vt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,$t=vt!==void 0?vt.length:0,Ce=w.get(k),cn=E.state.lights;if(lt===!0&&(We===!0||b!==O)){const bt=b===O&&k.id===z;Pe.setState(k,b,bt)}let ct=!1;k.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==cn.state.version||Ce.outputColorSpace!==Me||V.isBatchedMesh&&Ce.batching===!1||!V.isBatchedMesh&&Ce.batching===!0||V.isBatchedMesh&&Ce.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Ce.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Ce.instancing===!1||!V.isInstancedMesh&&Ce.instancing===!0||V.isSkinnedMesh&&Ce.skinning===!1||!V.isSkinnedMesh&&Ce.skinning===!0||V.isInstancedMesh&&Ce.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Ce.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Ce.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Ce.instancingMorph===!1&&V.morphTexture!==null||Ce.envMap!==ze||k.fog===!0&&Ce.fog!==Se||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==Pe.numPlanes||Ce.numIntersection!==Pe.numIntersection)||Ce.vertexAlphas!==$e||Ce.vertexTangents!==nt||Ce.morphTargets!==ke||Ce.morphNormals!==xt||Ce.morphColors!==Ct||Ce.toneMapping!==wt||Ce.morphTargetsCount!==$t||!!Ce.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(ct=!0):(ct=!0,Ce.__version=k.version);let gn=Ce.currentProgram;ct===!0&&(gn=qr(k,F,V),U&&k.isNodeMaterial&&U.onUpdateProgram(k,gn,Ce));let zn=!1,xi=!1,ts=!1;const Mt=gn.getUniforms(),Pt=Ce.uniforms;if(he.useProgram(gn.program)&&(zn=!0,xi=!0,ts=!0),k.id!==z&&(z=k.id,xi=!0),Ce.needsLights){const bt=xf(E.state.lightProbeGridArray,V);Ce.lightProbeGrid!==bt&&(Ce.lightProbeGrid=bt,xi=!0)}if(zn||O!==b){he.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),Mt.setValue(L,"projectionMatrix",b.projectionMatrix),Mt.setValue(L,"viewMatrix",b.matrixWorldInverse);const Mi=Mt.map.cameraPosition;Mi!==void 0&&Mi.setValue(L,ce.setFromMatrixPosition(b.matrixWorld)),qe.logarithmicDepthBuffer&&Mt.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&Mt.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),O!==b&&(O=b,xi=!0,ts=!0)}if(Ce.needsLights&&(cn.state.directionalShadowMap.length>0&&Mt.setValue(L,"directionalShadowMap",cn.state.directionalShadowMap,S),cn.state.spotShadowMap.length>0&&Mt.setValue(L,"spotShadowMap",cn.state.spotShadowMap,S),cn.state.pointShadowMap.length>0&&Mt.setValue(L,"pointShadowMap",cn.state.pointShadowMap,S)),V.isSkinnedMesh){Mt.setOptional(L,V,"bindMatrix"),Mt.setOptional(L,V,"bindMatrixInverse");const bt=V.skeleton;bt&&(bt.boneTexture===null&&bt.computeBoneTexture(),Mt.setValue(L,"boneTexture",bt.boneTexture,S))}V.isBatchedMesh&&(Mt.setOptional(L,V,"batchingTexture"),Mt.setValue(L,"batchingTexture",V._matricesTexture,S),Mt.setOptional(L,V,"batchingIdTexture"),Mt.setValue(L,"batchingIdTexture",V._indirectTexture,S),Mt.setOptional(L,V,"batchingColorTexture"),V._colorsTexture!==null&&Mt.setValue(L,"batchingColorTexture",V._colorsTexture,S));const vi=H.morphAttributes;if((vi.position!==void 0||vi.normal!==void 0||vi.color!==void 0)&&Ke.update(V,H,gn),(xi||Ce.receiveShadow!==V.receiveShadow)&&(Ce.receiveShadow=V.receiveShadow,Mt.setValue(L,"receiveShadow",V.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&F.environment!==null&&(Pt.envMapIntensity.value=F.environmentIntensity),Pt.dfgLUT!==void 0&&(Pt.dfgLUT.value=fM()),xi){if(Mt.setValue(L,"toneMappingExposure",P.toneMappingExposure),Ce.needsLights&&Mf(Pt,ts),Se&&k.fog===!0&&X.refreshFogUniforms(Pt,Se),X.refreshMaterialUniforms(Pt,k,Ee,Ne,E.state.transmissionRenderTarget[b.id]),Ce.needsLights&&Ce.lightProbeGrid){const bt=Ce.lightProbeGrid;Pt.probesSH.value=bt.texture,Pt.probesMin.value.copy(bt.boundingBox.min),Pt.probesMax.value.copy(bt.boundingBox.max),Pt.probesResolution.value.copy(bt.resolution)}Fa.upload(L,mh(Ce),Pt,S)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Fa.upload(L,mh(Ce),Pt,S),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&Mt.setValue(L,"center",V.center),Mt.setValue(L,"modelViewMatrix",V.modelViewMatrix),Mt.setValue(L,"normalMatrix",V.normalMatrix),Mt.setValue(L,"modelMatrix",V.matrixWorld),k.uniformsGroups!==void 0){const bt=k.uniformsGroups;for(let Mi=0,ns=bt.length;Mi<ns;Mi++){const _h=bt[Mi];Y.update(_h,gn),Y.bind(_h,gn)}}return gn}function Mf(b,F){b.ambientLightColor.needsUpdate=F,b.lightProbe.needsUpdate=F,b.directionalLights.needsUpdate=F,b.directionalLightShadows.needsUpdate=F,b.pointLights.needsUpdate=F,b.pointLightShadows.needsUpdate=F,b.spotLights.needsUpdate=F,b.spotLightShadows.needsUpdate=F,b.rectAreaLights.needsUpdate=F,b.hemisphereLights.needsUpdate=F}function yf(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(b,F,H){const k=w.get(b);k.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),w.get(b.texture).__webglTexture=F,w.get(b.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:H,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,F){const H=w.get(b);H.__webglFramebuffer=F,H.__useDefaultFramebuffer=F===void 0};const Sf=L.createFramebuffer();this.setRenderTarget=function(b,F=0,H=0){D=b,G=F,W=H;let k=null,V=!1,Se=!1;if(b){const Me=w.get(b);if(Me.__useDefaultFramebuffer!==void 0){he.bindFramebuffer(L.FRAMEBUFFER,Me.__webglFramebuffer),ne.copy(b.viewport),ie.copy(b.scissor),j=b.scissorTest,he.viewport(ne),he.scissor(ie),he.setScissorTest(j),z=-1;return}else if(Me.__webglFramebuffer===void 0)S.setupRenderTarget(b);else if(Me.__hasExternalTextures)S.rebindTextures(b,w.get(b.texture).__webglTexture,w.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const $e=b.depthTexture;if(Me.__boundDepthTexture!==$e){if($e!==null&&w.has($e)&&(b.width!==$e.image.width||b.height!==$e.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");S.setupDepthRenderbuffer(b)}}const Fe=b.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(Se=!0);const ze=w.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(ze[F])?k=ze[F][H]:k=ze[F],V=!0):b.samples>0&&S.useMultisampledRTT(b)===!1?k=w.get(b).__webglMultisampledFramebuffer:Array.isArray(ze)?k=ze[H]:k=ze,ne.copy(b.viewport),ie.copy(b.scissor),j=b.scissorTest}else ne.copy(oe).multiplyScalar(Ee).floor(),ie.copy(Le).multiplyScalar(Ee).floor(),j=Ve;if(H!==0&&(k=Sf),he.bindFramebuffer(L.FRAMEBUFFER,k)&&he.drawBuffers(b,k),he.viewport(ne),he.scissor(ie),he.setScissorTest(j),V){const Me=w.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+F,Me.__webglTexture,H)}else if(Se){const Me=F;for(let Fe=0;Fe<b.textures.length;Fe++){const ze=w.get(b.textures[Fe]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Fe,ze.__webglTexture,H,Me)}}else if(b!==null&&H!==0){const Me=w.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Me.__webglTexture,H)}z=-1},this.readRenderTargetPixels=function(b,F,H,k,V,Se,Ie,Me=0){if(!(b&&b.isWebGLRenderTarget)){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=w.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ie!==void 0&&(Fe=Fe[Ie]),Fe){he.bindFramebuffer(L.FRAMEBUFFER,Fe);try{const ze=b.textures[Me],$e=ze.format,nt=ze.type;if(b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Me),!qe.textureFormatReadable($e)){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qe.textureTypeReadable(nt)){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=b.width-k&&H>=0&&H<=b.height-V&&L.readPixels(F,H,k,V,N.convert($e),N.convert(nt),Se)}finally{const ze=D!==null?w.get(D).__webglFramebuffer:null;he.bindFramebuffer(L.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(b,F,H,k,V,Se,Ie,Me=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Fe=w.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ie!==void 0&&(Fe=Fe[Ie]),Fe)if(F>=0&&F<=b.width-k&&H>=0&&H<=b.height-V){he.bindFramebuffer(L.FRAMEBUFFER,Fe);const ze=b.textures[Me],$e=ze.format,nt=ze.type;if(b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Me),!qe.textureFormatReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qe.textureTypeReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ke=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,ke),L.bufferData(L.PIXEL_PACK_BUFFER,Se.byteLength,L.STREAM_READ),L.readPixels(F,H,k,V,N.convert($e),N.convert(nt),0);const xt=D!==null?w.get(D).__webglFramebuffer:null;he.bindFramebuffer(L.FRAMEBUFFER,xt);const Ct=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await lp(L,Ct,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,ke),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,Se),L.deleteBuffer(ke),L.deleteSync(Ct),Se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,F=null,H=0){const k=Math.pow(2,-H),V=Math.floor(b.image.width*k),Se=Math.floor(b.image.height*k),Ie=F!==null?F.x:0,Me=F!==null?F.y:0;S.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,H,0,0,Ie,Me,V,Se),he.unbindTexture()};const bf=L.createFramebuffer(),Tf=L.createFramebuffer();this.copyTextureToTexture=function(b,F,H=null,k=null,V=0,Se=0){let Ie,Me,Fe,ze,$e,nt,ke,xt,Ct;const wt=b.isCompressedTexture?b.mipmaps[Se]:b.image;if(H!==null)Ie=H.max.x-H.min.x,Me=H.max.y-H.min.y,Fe=H.isBox3?H.max.z-H.min.z:1,ze=H.min.x,$e=H.min.y,nt=H.isBox3?H.min.z:0;else{const Pt=Math.pow(2,-V);Ie=Math.floor(wt.width*Pt),Me=Math.floor(wt.height*Pt),b.isDataArrayTexture?Fe=wt.depth:b.isData3DTexture?Fe=Math.floor(wt.depth*Pt):Fe=1,ze=0,$e=0,nt=0}k!==null?(ke=k.x,xt=k.y,Ct=k.z):(ke=0,xt=0,Ct=0);const vt=N.convert(F.format),$t=N.convert(F.type);let Ce;F.isData3DTexture?(S.setTexture3D(F,0),Ce=L.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(S.setTexture2DArray(F,0),Ce=L.TEXTURE_2D_ARRAY):(S.setTexture2D(F,0),Ce=L.TEXTURE_2D),he.activeTexture(L.TEXTURE0),he.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,F.flipY),he.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),he.pixelStorei(L.UNPACK_ALIGNMENT,F.unpackAlignment);const cn=he.getParameter(L.UNPACK_ROW_LENGTH),ct=he.getParameter(L.UNPACK_IMAGE_HEIGHT),gn=he.getParameter(L.UNPACK_SKIP_PIXELS),zn=he.getParameter(L.UNPACK_SKIP_ROWS),xi=he.getParameter(L.UNPACK_SKIP_IMAGES);he.pixelStorei(L.UNPACK_ROW_LENGTH,wt.width),he.pixelStorei(L.UNPACK_IMAGE_HEIGHT,wt.height),he.pixelStorei(L.UNPACK_SKIP_PIXELS,ze),he.pixelStorei(L.UNPACK_SKIP_ROWS,$e),he.pixelStorei(L.UNPACK_SKIP_IMAGES,nt);const ts=b.isDataArrayTexture||b.isData3DTexture,Mt=F.isDataArrayTexture||F.isData3DTexture;if(b.isDepthTexture){const Pt=w.get(b),vi=w.get(F),bt=w.get(Pt.__renderTarget),Mi=w.get(vi.__renderTarget);he.bindFramebuffer(L.READ_FRAMEBUFFER,bt.__webglFramebuffer),he.bindFramebuffer(L.DRAW_FRAMEBUFFER,Mi.__webglFramebuffer);for(let ns=0;ns<Fe;ns++)ts&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,w.get(b).__webglTexture,V,nt+ns),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,w.get(F).__webglTexture,Se,Ct+ns)),L.blitFramebuffer(ze,$e,Ie,Me,ke,xt,Ie,Me,L.DEPTH_BUFFER_BIT,L.NEAREST);he.bindFramebuffer(L.READ_FRAMEBUFFER,null),he.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(V!==0||b.isRenderTargetTexture||w.has(b)){const Pt=w.get(b),vi=w.get(F);he.bindFramebuffer(L.READ_FRAMEBUFFER,bf),he.bindFramebuffer(L.DRAW_FRAMEBUFFER,Tf);for(let bt=0;bt<Fe;bt++)ts?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Pt.__webglTexture,V,nt+bt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Pt.__webglTexture,V),Mt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,vi.__webglTexture,Se,Ct+bt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,vi.__webglTexture,Se),V!==0?L.blitFramebuffer(ze,$e,Ie,Me,ke,xt,Ie,Me,L.COLOR_BUFFER_BIT,L.NEAREST):Mt?L.copyTexSubImage3D(Ce,Se,ke,xt,Ct+bt,ze,$e,Ie,Me):L.copyTexSubImage2D(Ce,Se,ke,xt,ze,$e,Ie,Me);he.bindFramebuffer(L.READ_FRAMEBUFFER,null),he.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Mt?b.isDataTexture||b.isData3DTexture?L.texSubImage3D(Ce,Se,ke,xt,Ct,Ie,Me,Fe,vt,$t,wt.data):F.isCompressedArrayTexture?L.compressedTexSubImage3D(Ce,Se,ke,xt,Ct,Ie,Me,Fe,vt,wt.data):L.texSubImage3D(Ce,Se,ke,xt,Ct,Ie,Me,Fe,vt,$t,wt):b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,Se,ke,xt,Ie,Me,vt,$t,wt.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,Se,ke,xt,wt.width,wt.height,vt,wt.data):L.texSubImage2D(L.TEXTURE_2D,Se,ke,xt,Ie,Me,vt,$t,wt);he.pixelStorei(L.UNPACK_ROW_LENGTH,cn),he.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ct),he.pixelStorei(L.UNPACK_SKIP_PIXELS,gn),he.pixelStorei(L.UNPACK_SKIP_ROWS,zn),he.pixelStorei(L.UNPACK_SKIP_IMAGES,xi),Se===0&&F.generateMipmaps&&L.generateMipmap(Ce),he.unbindTexture()},this.initRenderTarget=function(b){w.get(b).__webglFramebuffer===void 0&&S.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?S.setTextureCube(b,0):b.isData3DTexture?S.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?S.setTexture2DArray(b,0):S.setTexture2D(b,0),he.unbindTexture()},this.resetState=function(){G=0,W=0,D=null,he.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=rt._getDrawingBufferColorSpace(e),t.unpackColorSpace=rt._getUnpackColorSpace()}}const Oa={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Ys{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const mM=new kr(-1,1,1,-1,0,1);class gM extends Tt{constructor(){super(),this.setAttribute("position",new ot([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ot([0,2,0,0,2,0],2))}}const _M=new gM;class Yc{constructor(e){this._mesh=new we(_M,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,mM)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Kc extends Ys{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Vt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ur.clone(e.uniforms),this.material=new Vt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Yc(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Gu extends Ys{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class xM extends Ys{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class vM{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new J);this._width=n.width,this._height=n.height,t=new ln(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:pn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Kc(Oa),this.copyPass.material.blending=Kn,this.timer=new r0}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Gu!==void 0&&(a instanceof Gu?n=!0:a instanceof xM&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new J);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Jd extends Ys{constructor(e,t,n=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new De}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=i}}const MM={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new De(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class zs extends Ys{constructor(e,t=1,n,i){super(),this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new J(e.x,e.y):new J(256,256),this.clearColor=new De(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new ln(r,a,{type:pn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new ln(r,a,{type:pn});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const d=new ln(r,a,{type:pn});d.texture.name="UnrealBloomPass.v"+h,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),a=Math.round(a/2)}const o=MM;this.highPassUniforms=Ur.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Vt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new J(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Ur.clone(Oa.uniforms),this.blendMaterial=new Vt({uniforms:this.copyUniforms,vertexShader:Oa.vertexShader,fragmentShader:Oa.fragmentShader,premultipliedAlpha:!0,blending:di,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new De,this._oldClearAlpha=1,this._basic=new Dt,this._fsQuad=new Yc(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new J(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=zs.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=zs.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(n*n))/n);return new Vt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new J(.5,.5)},direction:{value:new J(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Vt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}zs.BlurDirectionX=new J(1,0);zs.BlurDirectionY=new J(0,1);const wa={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class yM extends Ys{constructor(){super(),this.isOutputPass=!0,this.uniforms=Ur.clone(wa.uniforms),this.material=new Fd({name:wa.name,uniforms:this.uniforms,vertexShader:wa.vertexShader,fragmentShader:wa.fragmentShader}),this._fsQuad=new Yc(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},rt.getTransfer(this._outputColorSpace)===ft&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===dc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===fc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===pc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===to?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===gc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===_c?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===mc&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const SM={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new J(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;

		#define EDGE_STEP_COUNT 6
		#define EDGE_GUESS 8.0
		#define EDGE_STEPS 1.0, 1.5, 2.0, 2.0, 2.0, 4.0
		const float edgeSteps[EDGE_STEP_COUNT] = float[EDGE_STEP_COUNT]( EDGE_STEPS );

		float _ContrastThreshold = 0.0312;
		float _RelativeThreshold = 0.063;
		float _SubpixelBlending = 1.0;

		vec4 Sample( sampler2D  tex2D, vec2 uv ) {

			return texture( tex2D, uv );

		}

		float SampleLuminance( sampler2D tex2D, vec2 uv ) {

			return dot( Sample( tex2D, uv ).rgb, vec3( 0.3, 0.59, 0.11 ) );

		}

		float SampleLuminance( sampler2D tex2D, vec2 texSize, vec2 uv, float uOffset, float vOffset ) {

			uv += texSize * vec2(uOffset, vOffset);
			return SampleLuminance(tex2D, uv);

		}

		struct LuminanceData {

			float m, n, e, s, w;
			float ne, nw, se, sw;
			float highest, lowest, contrast;

		};

		LuminanceData SampleLuminanceNeighborhood( sampler2D tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData l;
			l.m = SampleLuminance( tex2D, uv );
			l.n = SampleLuminance( tex2D, texSize, uv,  0.0,  1.0 );
			l.e = SampleLuminance( tex2D, texSize, uv,  1.0,  0.0 );
			l.s = SampleLuminance( tex2D, texSize, uv,  0.0, -1.0 );
			l.w = SampleLuminance( tex2D, texSize, uv, -1.0,  0.0 );

			l.ne = SampleLuminance( tex2D, texSize, uv,  1.0,  1.0 );
			l.nw = SampleLuminance( tex2D, texSize, uv, -1.0,  1.0 );
			l.se = SampleLuminance( tex2D, texSize, uv,  1.0, -1.0 );
			l.sw = SampleLuminance( tex2D, texSize, uv, -1.0, -1.0 );

			l.highest = max( max( max( max( l.n, l.e ), l.s ), l.w ), l.m );
			l.lowest = min( min( min( min( l.n, l.e ), l.s ), l.w ), l.m );
			l.contrast = l.highest - l.lowest;
			return l;

		}

		bool ShouldSkipPixel( LuminanceData l ) {

			float threshold = max( _ContrastThreshold, _RelativeThreshold * l.highest );
			return l.contrast < threshold;

		}

		float DeterminePixelBlendFactor( LuminanceData l ) {

			float f = 2.0 * ( l.n + l.e + l.s + l.w );
			f += l.ne + l.nw + l.se + l.sw;
			f *= 1.0 / 12.0;
			f = abs( f - l.m );
			f = clamp( f / l.contrast, 0.0, 1.0 );

			float blendFactor = smoothstep( 0.0, 1.0, f );
			return blendFactor * blendFactor * _SubpixelBlending;

		}

		struct EdgeData {

			bool isHorizontal;
			float pixelStep;
			float oppositeLuminance, gradient;

		};

		EdgeData DetermineEdge( vec2 texSize, LuminanceData l ) {

			EdgeData e;
			float horizontal =
				abs( l.n + l.s - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.se - 2.0 * l.e ) +
				abs( l.nw + l.sw - 2.0 * l.w );
			float vertical =
				abs( l.e + l.w - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.nw - 2.0 * l.n ) +
				abs( l.se + l.sw - 2.0 * l.s );
			e.isHorizontal = horizontal >= vertical;

			float pLuminance = e.isHorizontal ? l.n : l.e;
			float nLuminance = e.isHorizontal ? l.s : l.w;
			float pGradient = abs( pLuminance - l.m );
			float nGradient = abs( nLuminance - l.m );

			e.pixelStep = e.isHorizontal ? texSize.y : texSize.x;

			if (pGradient < nGradient) {

				e.pixelStep = -e.pixelStep;
				e.oppositeLuminance = nLuminance;
				e.gradient = nGradient;

			} else {

				e.oppositeLuminance = pLuminance;
				e.gradient = pGradient;

			}

			return e;

		}

		float DetermineEdgeBlendFactor( sampler2D  tex2D, vec2 texSize, LuminanceData l, EdgeData e, vec2 uv ) {

			vec2 uvEdge = uv;
			vec2 edgeStep;
			if (e.isHorizontal) {

				uvEdge.y += e.pixelStep * 0.5;
				edgeStep = vec2( texSize.x, 0.0 );

			} else {

				uvEdge.x += e.pixelStep * 0.5;
				edgeStep = vec2( 0.0, texSize.y );

			}

			float edgeLuminance = ( l.m + e.oppositeLuminance ) * 0.5;
			float gradientThreshold = e.gradient * 0.25;

			vec2 puv = uvEdge + edgeStep * edgeSteps[0];
			float pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
			bool pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !pAtEnd; i++ ) {

				puv += edgeStep * edgeSteps[i];
				pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
				pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			}

			if ( !pAtEnd ) {

				puv += edgeStep * EDGE_GUESS;

			}

			vec2 nuv = uvEdge - edgeStep * edgeSteps[0];
			float nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
			bool nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !nAtEnd; i++ ) {

				nuv -= edgeStep * edgeSteps[i];
				nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
				nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			}

			if ( !nAtEnd ) {

				nuv -= edgeStep * EDGE_GUESS;

			}

			float pDistance, nDistance;
			if ( e.isHorizontal ) {

				pDistance = puv.x - uv.x;
				nDistance = uv.x - nuv.x;

			} else {

				pDistance = puv.y - uv.y;
				nDistance = uv.y - nuv.y;

			}

			float shortestDistance;
			bool deltaSign;
			if ( pDistance <= nDistance ) {

				shortestDistance = pDistance;
				deltaSign = pLuminanceDelta >= 0.0;

			} else {

				shortestDistance = nDistance;
				deltaSign = nLuminanceDelta >= 0.0;

			}

			if ( deltaSign == ( l.m - edgeLuminance >= 0.0 ) ) {

				return 0.0;

			}

			return 0.5 - shortestDistance / ( pDistance + nDistance );

		}

		vec4 ApplyFXAA( sampler2D  tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData luminance = SampleLuminanceNeighborhood( tex2D, texSize, uv );
			if ( ShouldSkipPixel( luminance ) ) {

				return Sample( tex2D, uv );

			}

			float pixelBlend = DeterminePixelBlendFactor( luminance );
			EdgeData edge = DetermineEdge( texSize, luminance );
			float edgeBlend = DetermineEdgeBlendFactor( tex2D, texSize, luminance, edge, uv );
			float finalBlend = max( pixelBlend, edgeBlend );

			if (edge.isHorizontal) {

				uv.y += edge.pixelStep * finalBlend;

			} else {

				uv.x += edge.pixelStep * finalBlend;

			}

			return Sample( tex2D, uv );

		}

		void main() {

			gl_FragColor = ApplyFXAA( tDiffuse, resolution.xy, vUv );

		}`},lr=new I;function xn(s,e,t,n,i,r){const a=2*Math.PI*i/4,o=Math.max(r-2*i,0),l=Math.PI/4;lr.copy(e),lr[n]=0,lr.normalize();const c=.5*a/(a+o),h=1-lr.angleTo(s)/l;return Math.sign(lr[t])===1?h*c:o/(a+o)+c+c*(1-h)}class jc extends Ui{constructor(e=1,t=1,n=1,i=2,r=.1){const a=i*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const l=new I,c=new I,h=new I(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,g=u.length/6,_=new I,p=.5/a;for(let m=0,x=0;m<u.length;m+=3,x+=2)switch(l.fromArray(u,m),c.copy(l),c.x-=Math.sign(c.x)*p,c.y-=Math.sign(c.y)*p,c.z-=Math.sign(c.z)*p,c.normalize(),u[m+0]=h.x*Math.sign(l.x)+c.x*r,u[m+1]=h.y*Math.sign(l.y)+c.y*r,u[m+2]=h.z*Math.sign(l.z)+c.z*r,d[m+0]=c.x,d[m+1]=c.y,d[m+2]=c.z,Math.floor(m/g)){case 0:_.set(1,0,0),f[x+0]=xn(_,c,"z","y",r,n),f[x+1]=1-xn(_,c,"y","z",r,t);break;case 1:_.set(-1,0,0),f[x+0]=1-xn(_,c,"z","y",r,n),f[x+1]=1-xn(_,c,"y","z",r,t);break;case 2:_.set(0,1,0),f[x+0]=1-xn(_,c,"x","z",r,e),f[x+1]=xn(_,c,"z","x",r,n);break;case 3:_.set(0,-1,0),f[x+0]=1-xn(_,c,"x","z",r,e),f[x+1]=1-xn(_,c,"z","x",r,n);break;case 4:_.set(0,0,1),f[x+0]=1-xn(_,c,"x","y",r,e),f[x+1]=1-xn(_,c,"y","x",r,t);break;case 5:_.set(0,0,-1),f[x+0]=xn(_,c,"x","y",r,e),f[x+1]=1-xn(_,c,"y","x",r,t);break}}static fromJSON(e){return new jc(e.width,e.height,e.depth,e.segments,e.radius)}}function Ki(s=1){let e=s>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function ji(s,e,t){let n=Math.imul(s,374761393)+Math.imul(e,668265263)+Math.imul(t,1442695041);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967295}function Qo(s,e,t){return s+(e-s)*t}function Hu(s){return s*s*(3-2*s)}function bM(s,e,t=1){const n=Math.floor(s),i=Math.floor(e),r=s-n,a=e-i,o=Hu(r),l=Hu(a);return Qo(Qo(ji(n,i,t),ji(n+1,i,t),o),Qo(ji(n,i+1,t),ji(n+1,i+1,t),o),l)}function Zt(s,e,t=4,n=1){let i=0,r=.5,a=1,o=0;for(let l=0;l<t;l++)i+=bM(s*a,e*a,n+l*17)*r,o+=r,r*=.5,a*=2.03;return i/o}function Li(s){const e=document.createElement("canvas");return e.width=e.height=s,e}function Zn(s,{srgb:e=!0,repeat:t=1,aniso:n=4}={}){const i=new em(s);return i.wrapS=i.wrapT=Di,i.repeat.set(t,t),i.anisotropy=n,e&&(i.colorSpace=Bt),i.needsUpdate=!0,i}function Vr(s,e,t=1,n=1){const i=Li(s),r=i.getContext("2d"),a=r.createImageData(s,s),o=Li(s),l=o.getContext("2d"),c=l.createImageData(s,s),h=new Float32Array(s*s);for(let _=0;_<s;_++)for(let p=0;p<s;p++){const m=_*s+p,x=e(p,_,s,t);a.data[m*4]=Math.max(0,Math.min(255,x[0])),a.data[m*4+1]=Math.max(0,Math.min(255,x[1])),a.data[m*4+2]=Math.max(0,Math.min(255,x[2])),a.data[m*4+3]=255,h[m]=x[3]??.5;const M=Math.max(0,Math.min(255,(x[4]??.8)*255));c.data[m*4]=M,c.data[m*4+1]=M,c.data[m*4+2]=M,c.data[m*4+3]=255}r.putImageData(a,0,0),l.putImageData(c,0,0);const u=Li(s),d=u.getContext("2d"),f=d.createImageData(s,s),g=(_,p)=>h[(p+s)%s*s+(_+s)%s];for(let _=0;_<s;_++)for(let p=0;p<s;p++){const m=(g(p+1,_)-g(p-1,_))*2.2,x=(g(p,_+1)-g(p,_-1))*2.2,M=Math.hypot(m,x,1),y=(_*s+p)*4;f.data[y]=(m/M*.5+.5)*255,f.data[y+1]=(x/M*.5+.5)*255,f.data[y+2]=(1/M*.5+.5)*255,f.data[y+3]=255}return d.putImageData(f,0,0),{map:Zn(i,{repeat:n}),roughnessMap:Zn(o,{srgb:!1,repeat:n}),normalMap:Zn(u,{srgb:!1,repeat:n})}}function TM(){return Vr(512,(s,e,t,n)=>{const i=s/t,r=e/t,a=Zt(i*4,r*4,5,n),o=Zt(i*38,r*38,3,n+9),l=ji(s,e,n+3),c=Math.abs(Zt(i*9,r*9,4,n+4)-.5),h=c<.008?1:c<.02?.35:0,u=Math.max(0,Zt(i*2.3+10,r*2.3,4,n+7)-.56)*2.6;let d=20+a*18+o*7;d+=l>.982?24:l>.93?5:0,d-=h*13;const f=Math.min(1,u)*.5,g=d*(.92-f*.3),_=d*(.97-f*.25),p=d*(1.05-f*.1),m=.48+o*.22+l*.12-h*.35-f*.16,x=.86-Math.min(1,u)*.68+o*.08;return[g,_,p,m,x]},12,9)}function Wu(){return Vr(512,(s,e,t,n)=>{const i=s/t,r=e/t,a=Zt(i*5,r*5,5,n),o=Zt(i*30,r*30,3,n+11),l=ji(s,e,n+2),c=Math.max(0,Zt(i*16,r*2.2,4,n+5)-.5)*1.8,h=e%128<2||s%256<2?.55:0,u=l>.985?1:0;let d=58+a*42+o*12;d-=c*26,d-=h*24,d+=u*20;const f=.5+o*.14+a*.1-h*.4-c*.1+u*.1,g=.88-c*.15+o*.06;return[d*1.01,d,d*.95,f,g]},21,4)}function EM(){return Vr(512,(s,e,t,n)=>{const i=s/t,r=e/t,a=Zt(i*4,r*4,5,n),o=Zt(i*28,r*28,4,n+8),l=ji(s,e,n+12),c=Math.max(0,Zt(i*7+2,r*7,4,n+3)-.42)*1.8,h=Math.abs(Zt(i*70,r*4,2,n+1)-.5)<.012?1:0,u=46+a*22+c*74+o*14-h*16,d=48+a*22+c*38+o*14-h*16,f=50+a*24+c*8+o*14-h*16,g=.46+o*.16+c*.22+l*.06-h*.1;return[u,d,f,g,.62-c*.15+o*.1]},33,3)}function wM(){return Vr(512,(s,e,t,n)=>{const i=s/t,r=e/t,a=Math.floor(r*8),o=Math.abs(r*8%1-.5)>.47?1:0,l=Zt(i*3+a*4,r*44,4,n+a),c=Math.max(0,Zt(i*5,r*5,3,n+99)-.72)*3,h=56+l*46+c*22-o*26,u=.5+l*.14-o*.4+c*.12;return[h*1.05,h*.78,h*.48,u,.82-l*.1]},44,2)}function AM(s="teal"){const e=s==="red"?[86,34,30]:s==="blue"?[30,52,72]:[26,66,62];return Vr(512,(t,n,i,r)=>{const a=t/i,o=n/i,l=Math.sin(a*Math.PI*2*16)*.5+.5,c=Math.max(0,Zt(a*5+3,o*5,5,r)-.52)*2.4,h=Zt(a*36,o*36,3,r+2),u=Math.abs(Zt(a*50,o*6,2,r+4)-.5)<.01?1:0,d=.72+l*.3,f=e[0]*d+c*62+h*8-u*20,g=e[1]*d+c*26+h*8-u*20,_=e[2]*d+c*6+h*8-u*20,p=.5+l*.32+h*.08+c*.1;return[f,g,_,p,.66+h*.12-c*.2]},55,1)}function RM(){const e=Li(256),t=e.getContext("2d");t.clearRect(0,0,256,256),t.strokeStyle="rgba(176, 184, 178, 0.95)",t.lineWidth=3;const n=32;t.beginPath();for(let r=-256;r<256*2;r+=n)t.moveTo(r,0),t.lineTo(r+256,256),t.moveTo(r,256),t.lineTo(r+256,0);t.stroke(),t.strokeStyle="rgba(120, 128, 124, 0.6)",t.lineWidth=1,t.stroke();const i=Zn(e,{repeat:6});return i.wrapS=i.wrapT=Di,i}function Qd(){const e=Li(256),t=e.getContext("2d"),n=Ki(71);t.clearRect(0,0,256,256);const i=256/2,r=256/2;for(let o=0;o<26;o++){const l=n()*Math.PI*2,c=n()*26,h=8+n()*24,u=t.createRadialGradient(i+Math.cos(l)*c,r+Math.sin(l)*c,0,i+Math.cos(l)*c,r+Math.sin(l)*c,h);u.addColorStop(0,"rgba(74, 4, 6, 0.95)"),u.addColorStop(.65,"rgba(102, 8, 10, 0.7)"),u.addColorStop(1,"rgba(70, 3, 5, 0)"),t.fillStyle=u,t.beginPath(),t.arc(i+Math.cos(l)*c,r+Math.sin(l)*c,h,0,Math.PI*2),t.fill()}for(let o=0;o<90;o++){const l=n()*Math.PI*2,c=18+Math.pow(n(),.6)*106,h=.6+n()*3.8;t.fillStyle=`rgba(${58+n()*50|0}, ${3+n()*8|0}, ${4+n()*6|0}, ${.55+n()*.45})`,t.beginPath(),t.ellipse(i+Math.cos(l)*c,r+Math.sin(l)*c,h,h*(1+n()*2.4),l,0,Math.PI*2),t.fill()}for(let o=0;o<10;o++){const l=i+(n()-.5)*70,c=r+10,h=20+n()*58,u=t.createLinearGradient(l,c,l,c+h);u.addColorStop(0,"rgba(90, 6, 8, 0.8)"),u.addColorStop(1,"rgba(90, 6, 8, 0)"),t.strokeStyle=u,t.lineWidth=1.5+n()*3,t.beginPath(),t.moveTo(l,c),t.quadraticCurveTo(l+(n()-.5)*8,c+h*.6,l+(n()-.5)*10,c+h),t.stroke()}const a=Zn(e,{repeat:1});return a.wrapS=a.wrapT=an,a}function ef(){const e=Li(128),t=e.getContext("2d"),n=Ki(13),i=t.createRadialGradient(64,64,2,64,64,20);i.addColorStop(0,"rgba(4,4,4,0.98)"),i.addColorStop(.55,"rgba(12,12,12,0.9)"),i.addColorStop(1,"rgba(20,20,20,0)"),t.fillStyle=i,t.beginPath(),t.arc(64,64,20,0,Math.PI*2),t.fill(),t.strokeStyle="rgba(160,160,150,0.28)";for(let a=0;a<10;a++){const o=n()*Math.PI*2,l=8+n()*24;t.lineWidth=.6+n()*1.2,t.beginPath(),t.moveTo(64+Math.cos(o)*7,64+Math.sin(o)*7),t.lineTo(64+Math.cos(o)*l,64+Math.sin(o)*l),t.stroke()}const r=Zn(e,{repeat:1});return r.wrapS=r.wrapT=an,r}function yr(s="255,255,255"){const t=Li(128),n=t.getContext("2d"),i=n.createRadialGradient(64,64,0,64,64,64);i.addColorStop(0,`rgba(${s},1)`),i.addColorStop(.25,`rgba(${s},0.55)`),i.addColorStop(.65,`rgba(${s},0.12)`),i.addColorStop(1,`rgba(${s},0)`),n.fillStyle=i,n.fillRect(0,0,128,128);const r=Zn(t,{repeat:1});return r.wrapS=r.wrapT=an,r}function CM(){const e=Li(256),t=e.getContext("2d"),n=Ki(9);t.translate(128,128),t.globalCompositeOperation="lighter";const i=t.createRadialGradient(0,0,0,0,0,64);i.addColorStop(0,"rgba(255,255,240,1)"),i.addColorStop(.18,"rgba(255,226,150,0.95)"),i.addColorStop(.5,"rgba(255,140,40,0.42)"),i.addColorStop(1,"rgba(255,80,10,0)"),t.fillStyle=i,t.beginPath(),t.arc(0,0,64,0,Math.PI*2),t.fill();for(let a=0;a<13;a++){const o=a/13*Math.PI*2+n()*.3,l=52+n()*76,c=4+n()*9;t.save(),t.rotate(o);const h=t.createLinearGradient(0,0,l,0);h.addColorStop(0,"rgba(255,240,190,0.9)"),h.addColorStop(.35,"rgba(255,160,50,0.5)"),h.addColorStop(1,"rgba(255,90,20,0)"),t.fillStyle=h,t.beginPath(),t.moveTo(0,-c),t.lineTo(l,0),t.lineTo(0,c),t.closePath(),t.fill(),t.restore()}const r=Zn(e,{repeat:1});return r.wrapS=r.wrapT=an,r}function Aa(s,{accent:e="#d8c33a",bg:t="#15181a",border:n=!0,sub:i=""}={}){const o=document.createElement("canvas");o.width=512,o.height=256;const l=o.getContext("2d");l.fillStyle=t,l.fillRect(0,0,512,256);for(let u=0;u<1400;u++)l.fillStyle=`rgba(${120+Math.random()*40|0},${118+Math.random()*40|0},${100+Math.random()*30|0},${Math.random()*.05})`,l.fillRect(Math.random()*512,Math.random()*256,Math.random()*22,Math.random()*5);n&&(l.strokeStyle=e,l.lineWidth=5,l.strokeRect(14,14,484,228),l.strokeStyle="rgba(255,255,255,0.12)",l.lineWidth=1,l.strokeRect(24,24,464,208)),l.fillStyle=e,l.textAlign="center",l.textBaseline="middle";const c=s.length>1?58:76;l.font=`700 ${c}px "Arial Narrow", Impact, sans-serif`,s.forEach((u,d)=>{l.fillText(u,512/2,256/2+(d-(s.length-1)/2)*(c+8))}),i&&(l.fillStyle="rgba(255,255,255,0.55)",l.font="700 22px monospace",l.fillText(i,512/2,214)),l.strokeStyle="rgba(0,0,0,0.35)";for(let u=0;u<22;u++){l.lineWidth=Math.random()*1.5,l.beginPath();const d=Math.random()*512,f=Math.random()*256;l.moveTo(d,f),l.lineTo(d+(Math.random()-.5)*90,f+(Math.random()-.5)*24),l.stroke()}const h=Zn(o,{repeat:1});return h.wrapS=h.wrapT=an,h}function el(){const s=document.createElement("canvas");s.width=s.height=128;const e=s.getContext("2d");e.fillStyle="#b99a20",e.fillRect(0,0,128,128),e.fillStyle="#111";for(let t=-128;t<256;t+=36)e.beginPath(),e.moveTo(t,0),e.lineTo(t+18,0),e.lineTo(t+18-128,128),e.lineTo(t-128,128),e.closePath(),e.fill();for(let t=0;t<200;t++)e.fillStyle=`rgba(0,0,0,${Math.random()*.12})`,e.fillRect(Math.random()*128,Math.random()*128,Math.random()*12,Math.random()*4);return Zn(s,{repeat:1})}const PM=Math.PI*2,jt=I;function IM(s,e,t,n){let i=0,r=n,a=-1,o=1;const l=["x","y","z"],c=[t.minX,t.minY,t.minZ],h=[t.maxX,t.maxY,t.maxZ];for(let d=0;d<3;d++){const f=s[l[d]],g=e[l[d]];if(Math.abs(g)<1e-8){if(f<c[d]||f>h[d])return null;continue}const _=1/g;let p=(c[d]-f)*_,m=(h[d]-f)*_,x=-1;if(p>m){const M=p;p=m,m=M,x=1}if(p>i&&(i=p,a=d,o=x),m<r&&(r=m),i>r)return null}if(a<0)return null;const u=new jt(0,0,0);return u[l[a]]=o,{dist:i,point:new jt(s.x+e.x*i,s.y+e.y*i,s.z+e.z*i),normal:u}}function Yt(s,e,t,n,i=0,r=0,a=0){const o=new we(new Ui(s,e,t),n);return o.position.set(i,r,a),o.castShadow=!0,o.receiveShadow=!0,o}function Ai(s,e,t,n,i,r=0,a=0,o=0){const l=new we(new jc(s,e,t,3,n),i);return l.position.set(r,a,o),l.castShadow=!0,l.receiveShadow=!0,l}class LM{constructor(e,t){this.scene=e,this.renderer=t,this.colliders=[],this.spawnPoints=[new jt(-17,0,-18),new jt(17,0,-18),new jt(0,0,-21),new jt(-20,0,4),new jt(20,0,5),new jt(14,0,17),new jt(-15,0,17)],this.flickerLights=[],this.time=0,this.lightning=0,this._lightningTimer=14,this._lightningPhase=0,this._materials=[],this.rain=null,this.mist=[],this.flashOverlay=0,this._buildEnvironment(),this._buildSky(),this._buildGround(),this._buildPerimeter(),this._buildProps(),this._buildLighting(),this._buildRain(),this._buildMist(),this._buildShowcaseLight(),this.scene.fog=new Ic(461585,.028)}mat(e={}){const t=new yn({envMapIntensity:.85,...e});return this._materials.push(t),t}phys(e={}){const t=new Fn({envMapIntensity:1.2,...e});return this._materials.push(t),t}addCollider(e,t,n,i,r="wall",a=0,o=4){this.colliders.push({minX:e,maxX:t,minZ:n,maxZ:i,minY:a,maxY:o,tag:r})}meshCollider(e,t=0,n="prop"){e.updateMatrixWorld(!0);const i=new wn().setFromObject(e);this.addCollider(i.min.x-t,i.max.x+t,i.min.z-t,i.max.z+t,n,i.min.y-t,i.max.y+t)}raycast(e,t,n=120){let i=n,r=null,a=null;for(const o of this.colliders){const l=IM(e,t,o,i);l&&l.dist<i&&(i=l.dist,a=l.point,r=l.normal)}if(Math.abs(t.y)>1e-5){const o=-e.y/t.y;o>.01&&o<i&&(i=o,a=new jt(e.x+t.x*o,0,e.z+t.z*o),r=new jt(0,1,0))}return a?{point:a,normal:r,distance:i}:null}_buildEnvironment(){const e=new rc(this.renderer);e.compileEquirectangularShader();const t=new Lc;t.background=new De(132103);const n=new we(new Nr(40,24,12),new Dt({color:new De(661026),side:nn}));t.add(n);const i=(r,a,o,l,c)=>{const h=new we(new dt(1,1),new Dt({color:new De(r).multiplyScalar(a),side:Ot}));h.position.set(...o),h.scale.set(...l),c&&h.rotation.set(...c),t.add(h)};i(16748349,5,[-9,4,-6],[5,2.4,1],[0,.8,0]),i(16748349,3.4,[11,5,4],[4,2,1],[0,-1.1,0]),i(6924031,1.8,[0,12,-14],[10,4,1],[0,0,0]),i(16723743,3.2,[12,1.2,-9],[1.2,1.2,1],[0,.4,0]),i(10410239,1,[-14,9,8],[8,3,1],[.3,-.7,0]),this.scene.environment=e.fromScene(t,.06).texture,this.scene.environmentIntensity=.75,e.dispose(),t.traverse(r=>{r.geometry&&r.geometry.dispose(),r.material&&r.material.dispose()})}_buildSky(){const e=new Nr(160,32,20),t=new Vt({side:nn,depthWrite:!1,uniforms:{uTime:{value:0}},vertexShader:`
        varying vec3 vWorld;
        void main() {
          vWorld = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        varying vec3 vWorld;
        uniform float uTime;
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(vec2 p) {
          vec2 i = floor(p), f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i), hash(i + vec2(1,0)), u.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
        }
        float fbm(vec2 p) {
          float v = 0.0, a = 0.5;
          for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
          return v;
        }
        void main() {
          vec3 d = normalize(vWorld);
          float h = clamp(d.y * 0.5 + 0.5, 0.0, 1.0);
          vec3 top = vec3(0.004, 0.008, 0.016);
          vec3 mid = vec3(0.018, 0.033, 0.050);
          vec3 hor = vec3(0.085, 0.070, 0.055);
          vec3 col = mix(hor, mid, smoothstep(0.44, 0.60, h));
          col = mix(col, top, smoothstep(0.60, 0.92, h));
          vec2 p = d.xz / max(0.08, d.y + 0.32);
          float clouds = fbm(p * 1.8 + vec2(uTime * 0.006, uTime * 0.002));
          float band = smoothstep(0.42, 0.78, clouds) * smoothstep(0.0, 0.22, d.y) * (1.0 - smoothstep(0.55, 0.95, d.y));
          col += vec3(0.055, 0.065, 0.080) * band;
          vec2 flatDir = normalize(vec2(d.x, d.z) + 0.0001);
          float glow = pow(max(0.0, dot(flatDir, normalize(vec2(-0.7, -0.72)))), 7.0);
          col += vec3(0.12, 0.055, 0.018) * glow * smoothstep(0.0, 0.14, d.y) * (1.0 - smoothstep(0.22, 0.55, d.y));
          gl_FragColor = vec4(col, 1.0);
        }
      `});this.sky=new we(e,t),this.sky.frustumCulled=!1,this.scene.add(this.sky)}_buildGround(){const e=TM(),t=this.phys({map:e.map,normalMap:e.normalMap,roughnessMap:e.roughnessMap,normalScale:new J(.55,.55),metalness:.12,roughness:1,color:12106944,envMapIntensity:.55}),n=new we(new dt(72,72),t);n.rotation.x=-Math.PI/2,n.receiveShadow=!0,this.scene.add(n);const i=new we(new dt(140,140),this.mat({color:461067,roughness:.95,metalness:.05}));i.rotation.x=-Math.PI/2,i.position.y=-.03,i.receiveShadow=!0,this.scene.add(i);const r=this.mat({color:12170918,roughness:.9,transparent:!0,opacity:.24});for(let g=0;g<7;g++){const _=new we(new dt(.14,2.2),r);_.rotation.x=-Math.PI/2,_.position.set(0,.012,-10+g*4),this.scene.add(_)}const a=el();a.repeat.set(18,1);const o=this.mat({map:a,roughness:.8,transparent:!0,opacity:.55,polygonOffset:!0,polygonOffsetFactor:-1});for(const[g,_,p,m,x]of[[0,10.8,22,.55,0],[0,-16.5,26,.5,0],[16.5,4,.5,14,Math.PI/2]]){const M=new we(new dt(p,m),o);M.rotation.x=-Math.PI/2,M.rotation.z=x,M.position.set(g,.014,_),this.scene.add(M)}const l=this.phys({color:329996,roughness:.045,metalness:.35,clearcoat:1,clearcoatRoughness:.06,transparent:!0,opacity:.82,envMapIntensity:1.8,depthWrite:!1,side:Ot}),c=[[-3,4,3.4],[5.5,-5,2.7],[-8,-10,3.8],[11,8,3],[1.5,-15,2.4],[-13,2,2.2],[8,14,2.6]];for(const[g,_,p]of c){const m=new Za,x=22;for(let y=0;y<=x;y++){const A=y/x*PM,E=p*(.72+Zt(Math.cos(A)*2+g,Math.sin(A)*2+_,3,8)*.55),C=Math.cos(A)*E,v=Math.sin(A)*E*.65;y===0?m.moveTo(C,v):m.lineTo(C,v)}const M=new we(new Gc(m),l);M.rotation.x=-Math.PI/2,M.position.set(g,.009,_),M.renderOrder=2,this.scene.add(M)}const h=this.mat({color:3816249,roughness:.95}),u=Ki(11);for(let g=0;g<90;g++){const _=.04+u()*.16,p=new we(new Oc(_,0),h);p.position.set((u()-.5)*44,_*.4,(u()-.5)*40),p.rotation.set(u()*3,u()*3,u()*3),p.castShadow=!1,p.receiveShadow=!0,this.scene.add(p)}const d=Qd(),f=this.mat({map:d,transparent:!0,roughness:.42,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2});for(const[g,_,p,m]of[[-4.5,-2,2.8,.4],[7,3.5,1.9,1.2],[-9,7,2.2,2.4]]){const x=new we(new dt(p,p),f);x.rotation.x=-Math.PI/2,x.rotation.z=m,x.position.set(g,.016,_),x.renderOrder=3,this.scene.add(x)}}_buildPerimeter(){const e=Wu();e.map.repeat.set(3,1),e.roughnessMap.repeat.set(3,1),e.normalMap.repeat.set(3,1);const t=this.mat({map:e.map,normalMap:e.normalMap,roughnessMap:e.roughnessMap,color:9410200,normalScale:new J(.7,.7),roughness:1,metalness:.05}),n=(v,T,P,R,U,G,W=0)=>{const D=Yt(v,T,P,t,R,U,G);D.rotation.y=W,this.scene.add(D);const z=Math.abs(Math.cos(W))*v/2+Math.abs(Math.sin(W))*P/2,O=Math.abs(Math.sin(W))*v/2+Math.abs(Math.cos(W))*P/2;return this.addCollider(R-z,R+z,G-O,G+O,"wall",0,T),D};n(56,5.5,.7,0,2.75,-22.5),n(56,4.5,.7,0,2.25,22.5),n(.7,5,45,-23.5,2.5,0),n(.7,5,45,23.5,2.5,0);const i=this.mat({color:1711390,roughness:.8,metalness:.7});for(let v=-26;v<=26;v+=2){const T=new we(new en(.018,.018,.7,4),i);T.position.set(v,5.75,-22.2),T.rotation.z=v%4===0?.5:-.5,this.scene.add(T)}new Ft;const r=Yt(17,13,6,t,-14,6.5,-20),a=Yt(12,10,6,t,17,5,-20);this.scene.add(r,a),this.addCollider(-22.5,-5.5,-23,-17),this.addCollider(11,23,-23,-17);const o=this.mat({color:527117,roughness:.22,metalness:.45,envMapIntensity:1.4}),l=new Dt({color:new De(16752714).multiplyScalar(1.5)}),c=new Dt({color:new De(8370116).multiplyScalar(.8)});for(let v=0;v<5;v++)for(let T=0;T<4;T++){const P=v===3&&T===2||v===1&&T===1,R=new we(new dt(1.5,2),P?v===3?l:c:o);if(R.position.set(-19.5+v*2.7,2.4+T*2.8,-16.95),this.scene.add(R),!P){const U=Yt(1.7,2.2,.08,this.mat({color:2764076,roughness:.8,metalness:.4}),R.position.x,R.position.y,-17.02);this.scene.add(U)}}for(let v=0;v<3;v++)for(let T=0;T<3;T++){const P=new we(new dt(1.3,1.8),o);P.position.set(13.5+v*2.4,2.3+T*2.7,-16.95),this.scene.add(P)}const h=this.mat({color:3948866,roughness:.55,metalness:.75});for(let v=0;v<3;v++){const T=new we(new en(.09,.09,11,8),h);T.position.set(-21.5+v*.4,6,-16.8),T.castShadow=!0,this.scene.add(T)}for(const[v,T]of[[-10,9.4],[-12,6.5],[18,7.2]]){const P=Ai(1.5,1,.7,.06,this.mat({color:5528412,roughness:.7,metalness:.4}),v,T,-16.9);this.scene.add(P);const R=new we(new en(.34,.34,.05,18),this.mat({color:1711390,roughness:.6,metalness:.5}));R.rotation.x=Math.PI/2,R.position.set(v,T,-16.53),this.scene.add(R)}const u=RM(),d=new yn({map:u,transparent:!0,alphaTest:.35,side:Ot,roughness:.5,metalness:.6,color:10134176,envMapIntensity:.7});for(const[v,T,P,R]of[[-10.5,-22.1,7,0],[10.5,-22.1,7,0],[-23.1,12,9,Math.PI/2],[23.1,12,9,Math.PI/2]]){const U=new we(new dt(P,2.8),d);U.position.set(v,3.9,T),U.rotation.y=R,this.scene.add(U);const G=Yt(P,.08,.08,h,v,5.3,T);G.rotation.y=R,this.scene.add(G);const W=Yt(P,.08,.08,h,v,2.5,T);W.rotation.y=R,this.scene.add(W)}new Ft;const f=this.mat({color:3225141,roughness:.6,metalness:.7}),g=Yt(.28,5,.28,f,-3.4,2.5,-21.8),_=Yt(.28,5,.28,f,3.4,2.5,-21.8);this.scene.add(g,_);const p=Yt(7.1,.28,.28,f,0,5,-21.8);this.scene.add(p);const m=new we(new dt(6.6,2.5),d);m.position.set(0,3.55,-21.8),m.rotation.y=.18,this.scene.add(m),this.addCollider(-3.6,3.6,-22.1,-21.5);const x=Aa(["QUARANTINE","ZONE 07"],{accent:"#e0c84a",sub:"AUTHORIZED PERSONNEL ONLY"}),M=new we(new dt(5.4,2.7),new yn({map:x,roughness:.6,metalness:.2,emissive:2761744,emissiveMap:x,emissiveIntensity:.6}));M.position.set(0,7,-22.05),this.scene.add(M);const y=Aa(["DEAD","ZONE"],{accent:"#c73a32",sub:"TURN BACK"}),A=new we(new dt(3.4,1.7),new yn({map:y,roughness:.65,metalness:.25,emissive:1705990,emissiveMap:y,emissiveIntensity:.5}));A.position.set(-18.5,3.8,-22.05),this.scene.add(A);const E=Aa(["NO","EXIT"],{accent:"#8f2a25",bg:"#0d1012",border:!1}),C=new we(new dt(3.2,1.6),new Dt({map:E,transparent:!0,opacity:.5}));C.position.set(23.1,2.4,7),C.rotation.y=-Math.PI/2,this.scene.add(C)}_buildProps(){const e=EM();this.mat({map:e.map,normalMap:e.normalMap,roughnessMap:e.roughnessMap,color:9146252,metalness:.6,roughness:1,normalScale:new J(.8,.8)});const t=this.mat({color:2369578,metalness:.8,roughness:.42}),n=wM(),i=this.mat({map:n.map,normalMap:n.normalMap,roughnessMap:n.roughnessMap,color:10259048,roughness:1,metalness:.02}),r=(j,$,Q,Te,Ne=1.3)=>{const Ee=new Ft,q=AM(Te);q.map.repeat.set(3,1),q.normalMap.repeat.set(3,1),q.roughnessMap.repeat.set(3,1);const _e=this.mat({map:q.map,normalMap:q.normalMap,roughnessMap:q.roughnessMap,color:11580592,metalness:.55,roughness:1,normalScale:new J(1.2,1.2)}),oe=Yt(6,2.55,2.45,_e,0,0,0);Ee.add(oe);const Le=this.mat({color:2238506,metalness:.7,roughness:.45});for(const Ve of[-3.02,3.02])Ee.add(Yt(.12,2.62,2.52,Le,Ve,0,0));for(const Ve of[-1.25,1.25])Ee.add(Yt(6.05,.14,.1,Le,0,1.27,Ve));for(const Ve of[-.6,.6]){Ee.add(Yt(.08,2.25,1.08,_e,3.06,0,Ve));for(const Ge of[-.85,.85]){const lt=Yt(.09,1.9,.09,Le,3.12,0,Ve+Ge*.2);Ee.add(lt)}}return Ee.position.set(j,Ne,$),Ee.rotation.y=Q,this.scene.add(Ee),this.meshCollider(Ee,.05,"container"),Ee};r(11.5,-11.5,-.16,"teal"),r(-12.5,-9.5,.28,"red"),r(12.2,-11,-.16,"blue",3.9).scale.set(.94,.94,.94);const o=Aa(["CARGO 07","MIL-SPEC"],{accent:"#b9c0b8",bg:"#1b2524",border:!1}),l=new we(new dt(2.4,1.2),new Dt({map:o,transparent:!0,opacity:.4}));l.position.set(11.5,1.5,-10.24),l.rotation.y=-.16,this.scene.add(l);const c=(j,$,Q=1,Te=0,Ne=1)=>{for(let Ee=0;Ee<Ne;Ee++){const q=Ai(Q,Q*.82,Q,.03,i,j,Q*.42+Ee*Q*.84,$);q.rotation.y=Te+Ee*.08,this.scene.add(q);const _e=this.mat({color:3814183,roughness:.85});for(const oe of[-Q/2+.03,Q/2-.03]){const Le=Yt(.05,Q*.84,.06,_e,j+oe*Math.cos(Te),Q*.42+Ee*Q*.84,$-oe*Math.sin(Te));this.scene.add(Le)}}this.addCollider(j-Q*.62,j+Q*.62,$-Q*.62,$+Q*.62,"crate")};c(-5.8,4.6,1.15,.3,2),c(-4.4,5.6,.9,-.2,1),c(8.6,9.2,1.2,.5,2),c(9.8,10.2,.85,.1,1),c(-14.6,11.8,1,-.4,1);const h=this.mat({map:e.map,normalMap:e.normalMap,roughnessMap:e.roughnessMap,color:8280627,metalness:.55,roughness:.95}),u=(j,$,Q=0,Te=!1)=>{const Ne=new Ft,Ee=new we(new en(.32,.32,.94,18,1),h);Ee.castShadow=Ee.receiveShadow=!0,Ne.add(Ee);for(const _e of[-.31,.31]){const oe=new we(new $a(.325,.028,6,18),t);oe.rotation.x=Math.PI/2,oe.position.y=_e,Ne.add(oe)}const q=new we(new en(.325,.325,.12,18,1,!0),new Dt({color:10124576,side:Ot}));q.position.y=.1,Ne.add(q),Te?(Ne.rotation.z=Math.PI/2,Ne.position.set(j,.34,$)):Ne.position.set(j,.48,$),Ne.rotation.y=Q,this.scene.add(Ne),this.addCollider(j-.4,j+.4,$-.4,$+.4,"barrel")};u(-6.7,7.2,.2),u(-7.4,7.9,1.2),u(7.4,-2.5,.4,!0),u(15.2,3.2,.1),u(-17.4,-2.2,2.1),u(4.6,15.4,.9,!0);const d=new Za;d.moveTo(-.42,0),d.lineTo(.42,0),d.lineTo(.28,.28),d.lineTo(.18,1),d.lineTo(-.18,1),d.lineTo(-.28,.28),d.closePath();const f=new kc(d,{depth:2.6,bevelEnabled:!0,bevelSize:.03,bevelThickness:.03,bevelSegments:1});f.translate(0,0,-1.3);const g=this.mat({map:Wu().map,color:9343372,roughness:.92}),_=(j,$,Q=0)=>{const Te=new we(f,g);Te.position.set(j,0,$),Te.rotation.y=Q,Te.castShadow=Te.receiveShadow=!0,this.scene.add(Te);const Ne=Math.abs(Math.cos(Q))*1.32+Math.abs(Math.sin(Q))*.45,Ee=Math.abs(Math.sin(Q))*1.32+Math.abs(Math.cos(Q))*.45;this.addCollider(j-Ne,j+Ne,$-Ee,$+Ee,"barrier")};_(-2.8,2,Math.PI/2),_(3.2,-2,Math.PI/2),_(-12.8,6,.35),_(15.5,-5.2,-.4),_(-17.2,14.5,.1);const p=el();p.repeat.set(3,1);const m=this.mat({map:p,roughness:.8,transparent:!0,opacity:.75});for(const[j,$,Q]of[[-2.8,2,Math.PI/2],[3.2,-2,Math.PI/2]]){const Te=new we(new dt(1.9,.22),m);Te.position.set(j+Math.cos(Q)*.42,.62,$-Math.sin(Q)*.42),Te.rotation.y=Q+Math.PI/2,this.scene.add(Te)}this._buildCar(5.2,3,-.42);const x=this.mat({color:9141598,roughness:.98,metalness:.02}),M=(j,$,Q,Te)=>{const Ne=new we(new Pr(.19,.44,4,8),x);Ne.rotation.z=Math.PI/2,Ne.rotation.y=Te,Ne.position.set(j,$,Q),Ne.scale.set(1.05,1,.78),Ne.castShadow=Ne.receiveShadow=!0,this.scene.add(Ne)};for(let j=0;j<3;j++)for(let $=0;$<5-j;$++)M(-.4+$*.46+j*.22,.2+j*.3,7.7+j%2*.05,.1*$);this.addCollider(-.8,2,7.4,8.1,"sandbags");const y=this.mat({color:12737054,roughness:.7,metalness:.1}),A=new Dt({color:14209986});for(const[j,$]of[[-3.8,-1.2],[6.4,-7.4],[13.2,11.2],[-9.4,-4.2]]){const Q=new Ft,Te=new we(new Fc(.17,.62,12),y);Te.position.y=.36,Te.castShadow=!0,Q.add(Te);const Ne=new we(new en(.125,.145,.1,12,1,!0),A);Ne.position.y=.36,Q.add(Ne);const Ee=Yt(.42,.05,.42,this.mat({color:1711132,roughness:.9}),0,.025,0);Q.add(Ee),Q.position.set(j,0,$),Q.rotation.y=Math.random()*3,this.scene.add(Q)}const E=this.mat({color:1184788,roughness:.95});for(const[j,$,Q]of[[-8.6,2.4,.4],[-8.1,3.1,.2],[12.8,-2.1,1.2]]){const Te=new we(new $a(.42,.16,8,18),E);Te.rotation.x=Math.PI/2,Te.rotation.z=Q,Te.position.set(j,.17,$),Te.castShadow=!0,this.scene.add(Te)}const C=this.mat({color:12104352,roughness:.95,side:Ot}),v=Ki(21);for(let j=0;j<34;j++){const $=new we(new dt(.18+v()*.14,.24+v()*.12),C);$.rotation.x=-Math.PI/2+(v()-.5)*.2,$.rotation.z=v()*3,$.position.set((v()-.5)*36,.018,(v()-.5)*34),this.scene.add($)}const T=this.mat({map:el(),roughness:.85,side:Ot}),P=new we(new dt(8.5,.12),T);P.position.set(0,.72,6.6),P.rotation.z=.03,this.scene.add(P),this._buildLamp(-9.5,-5.5,1,16757084,!0),this._buildLamp(10.5,6.5,-1,16760952,!1),this._buildLamp(.5,-17.5,0,16747068,!1);const R=new Ft,U=new we(new en(.07,.09,.3,10),t);U.position.y=.15,R.add(U);const G=new Fr(16724508,9,12,2);G.position.set(12.6,.45,-4.6),this.scene.add(G),this.flickerLights.push({light:G,base:9,speed:13,seed:2});const W=new $l(new qa({map:yr("255,70,30"),color:16726556,blending:di,transparent:!0,opacity:.8,depthWrite:!1}));W.scale.set(1.5,1.5,1),W.position.set(12.6,.4,-4.6),this.scene.add(W),this.flareGlow=W;const D=this.mat({color:855824,roughness:.8}),z=[[new jt(-9.5,4.1,-5.5),new jt(0,3.3,-3),new jt(10.5,4.1,6.5)],[new jt(-9.5,4.2,-5.5),new jt(-15,3.1,-14),new jt(-23,4.2,-18)]];for(const j of z){const $=new Ed(j),Q=new we(new Hc($,24,.018,4,!1),D);this.scene.add(Q)}const O=ef(),ne=this.mat({map:O,transparent:!0,roughness:.8,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3}),ie=Ki(6);for(let j=0;j<18;j++){const $=new we(new dt(.24,.24),ne),Q=j%3;Q===0?$.position.set(-4+ie()*20,1.2+ie()*2.5,-22.08):Q===1?($.position.set(23.08,1.2+ie()*2.4,-10+ie()*22),$.rotation.y=-Math.PI/2):($.position.set(-23.08,1.3+ie()*2.2,-12+ie()*22),$.rotation.y=Math.PI/2),this.scene.add($)}}_buildCar(e,t,n){const i=new Ft,r=this.phys({color:1911347,metalness:.75,roughness:.38,clearcoat:.5,clearcoatRoughness:.4}),a=this.phys({color:329996,metalness:.4,roughness:.08,transparent:!0,opacity:.72,envMapIntensity:2}),o=this.mat({color:856081,roughness:.55,metalness:.6}),l=this.mat({color:7028516,roughness:.9,metalness:.2}),c=Ai(4.1,.72,1.86,.12,r,0,.78,0);i.add(c);const h=Ai(1.35,.36,1.78,.1,r,1.45,1.06,0);i.add(h);const u=Ai(1.1,.4,1.78,.1,r,-1.55,1.07,0);i.add(u);const d=Ai(2.05,.86,1.7,.14,r,-.1,1.48,0);i.add(d);const f=Ai(1.8,.1,1.58,.05,r,-.12,1.93,0);i.add(f);const g=new we(new dt(1.65,.62),a);g.position.set(-.1,1.52,.86),i.add(g);const _=g.clone();_.rotation.y=Math.PI,_.position.z=-.86,i.add(_);const p=new we(new dt(1.55,.6),a);p.position.set(.95,1.52,0),p.rotation.y=Math.PI/2,i.add(p);const m=p.clone();m.rotation.y=-Math.PI/2,m.position.x=-1.15,i.add(m);const x=new Dt({color:10467008,transparent:!0,opacity:.18});for(let M=0;M<5;M++){const y=new we(new dt(.02,.4+Math.random()*.3),x);y.position.set(.96,1.52,(Math.random()-.5)*.5),y.rotation.y=Math.PI/2,y.rotation.x=Math.random()*1.4,i.add(y)}for(const M of[-1.35,1.35])for(const y of[-.92,.92]){const A=new we(new en(.42,.42,.28,18),this.mat({color:789773,roughness:.95}));A.rotation.x=Math.PI/2,A.position.set(M,.42,y),A.castShadow=!0,i.add(A);const E=new we(new en(.24,.24,.3,12),this.mat({color:5988449,metalness:.9,roughness:.35}));E.rotation.x=Math.PI/2,E.position.set(M,.42,y),i.add(E)}for(const M of[-.58,.58]){const y=Yt(.1,.22,.34,o,2.05,.92,M);if(i.add(y),M>0){const A=new we(new dt(.26,.16),new Dt({color:new De(16760954).multiplyScalar(.4)}));A.position.set(2.11,.92,M),A.rotation.y=Math.PI/2,i.add(A)}}i.add(Yt(.08,.25,1.3,o,2.06,.72,0));for(const[M,y,A,E]of[[1.9,.7,.9,.4],[-1.9,.65,-.8,.55],[.3,.5,.93,.35]]){const C=new we(new dt(E,E*.6),l);C.position.set(M,y,A),A>0&&(C.rotation.y=0),i.add(C)}i.position.set(e,0,t),i.rotation.y=n,this.scene.add(i),this.meshCollider(i,.1,"car"),this.car=i}_buildLamp(e,t,n,i,r){const a=new Ft,o=this.mat({color:2830386,metalness:.8,roughness:.42}),l=new we(new en(.075,.11,4.2,10),o);l.position.y=2.1,l.castShadow=!0,a.add(l);const c=new we(new Ui(1.4,.08,.08),o);c.position.set(n*.62,4.15,0),c.rotation.z=n*.18,a.add(c);const h=Ai(.62,.16,.3,.03,o,n*1.28,4.02,0);a.add(h);const u=new we(new dt(.5,.22),new Dt({color:new De(i).multiplyScalar(2.4)}));u.rotation.x=Math.PI/2,u.position.set(n*1.28,3.93,0),a.add(u),a.position.set(e,0,t),this.scene.add(a);const d=new ic(i,42,20,.62,.55,2);d.position.set(e+n*1.28,3.9,t),d.target.position.set(e+n*3.2,0,t+1.5),d.castShadow=r,r&&(d.shadow.mapSize.set(1024,1024),d.shadow.camera.near=.5,d.shadow.camera.far=22,d.shadow.bias=-.0015,d.shadow.normalBias=.03),this.scene.add(d,d.target),this.flickerLights.push({light:d,base:42,speed:2.4+Math.random()*3,seed:Math.random()*10});const f=new Vt({transparent:!0,depthWrite:!1,side:Ot,blending:di,uniforms:{uColor:{value:new De(i)},uOpacity:{value:r?.055:.04}},vertexShader:`
        varying vec2 vUv; varying vec3 vPos;
        void main(){ vUv = uv; vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
      `,fragmentShader:`
        varying vec2 vUv; varying vec3 vPos; uniform vec3 uColor; uniform float uOpacity;
        void main(){
          float edge = smoothstep(0.0, 0.28, vUv.x) * smoothstep(1.0, 0.72, vUv.x);
          float fade = smoothstep(0.0, 0.18, vUv.y) * smoothstep(1.0, 0.55, vUv.y);
          gl_FragColor = vec4(uColor, edge * fade * uOpacity);
        }
      `}),g=new we(new en(.14,3,4,24,1,!0),f);g.position.set(e+n*1.28,2,t),g.rotation.z=n*.04,g.renderOrder=4,this.scene.add(g),this.flickerLights[this.flickerLights.length-1].cone=g}_buildLighting(){const e=new $m(3954287,723206,.6);this.scene.add(e);const t=new Rs(10467800,.85);t.position.set(-14,20,12),t.castShadow=!0,t.shadow.mapSize.set(2048,2048),t.shadow.camera.near=1,t.shadow.camera.far=60,t.shadow.camera.left=-30,t.shadow.camera.right=30,t.shadow.camera.top=30,t.shadow.camera.bottom=-30,t.shadow.bias=-6e-4,t.shadow.normalBias=.035,this.scene.add(t),this.moon=t;const n=new Rs(3559531,.35);n.position.set(12,8,-18),this.scene.add(n),this.lightningLight=new Rs(13164031,0),this.lightningLight.position.set(-8,26,-20),this.scene.add(this.lightningLight)}_buildShowcaseLight(){const e=new ic(16743226,90,16,.42,.7,2);e.position.set(6.4,3.2,6.2),e.target.position.set(3.4,1.2,.6),e.castShadow=!1,this.scene.add(e,e.target),this.showcaseLight=e}_buildRain(){const t=new Float32Array(8400),n=new Float32Array(1400),i=Ki(5);for(let o=0;o<1400;o++){const l=(i()-.5)*38,c=(i()-.5)*38,h=i()*18,u=.25+i()*.55;t[o*6]=l,t[o*6+1]=h,t[o*6+2]=c,t[o*6+3]=l+.04,t[o*6+4]=h-u,t[o*6+5]=c,n[o]=9+i()*9}const r=new Tt;r.setAttribute("position",new Ut(t,3));const a=new io({color:10139848,transparent:!0,opacity:.22,depthWrite:!1,blending:di});this.rain=new Md(r,a),this.rain.frustumCulled=!1,this.rainSpeeds=n,this.scene.add(this.rain)}_buildMist(){const e=yr("150,165,170");for(let t=0;t<12;t++){const n=new $l(new qa({map:e,color:8952224,transparent:!0,opacity:.045+Math.random()*.035,depthWrite:!1,blending:Ii})),i=10+Math.random()*14;n.scale.set(i,i*.35,1),n.position.set((Math.random()-.5)*44,.5+Math.random()*1.2,(Math.random()-.5)*40),n.userData.drift=.05+Math.random()*.12,n.userData.phase=Math.random()*10,this.scene.add(n),this.mist.push(n)}}resolveCircle(e,t){for(const n of this.colliders){const i=Math.max(n.minX,Math.min(e.x,n.maxX)),r=Math.max(n.minZ,Math.min(e.z,n.maxZ));let a=e.x-i,o=e.z-r,l=a*a+o*o;if(l<t*t)if(l<1e-8){const c=Math.abs(e.x-n.minX),h=Math.abs(n.maxX-e.x),u=Math.abs(e.z-n.minZ),d=Math.abs(n.maxZ-e.z),f=Math.min(c,h,u,d);f===c?e.x=n.minX-t:f===h?e.x=n.maxX+t:f===u?e.z=n.minZ-t:e.z=n.maxZ+t}else{const c=Math.sqrt(l),h=(t-c)/c;e.x+=a*h,e.z+=o*h}}e.x=Math.max(-22.4,Math.min(22.4,e.x)),e.z=Math.max(-21.4,Math.min(21.4,e.z))}isBlocked(e,t,n=.4){for(const i of this.colliders){const r=Math.max(i.minX,Math.min(e,i.maxX)),a=Math.max(i.minZ,Math.min(t,i.maxZ)),o=e-r,l=t-a;if(o*o+l*l<n*n)return!0}return!1}update(e,t){this.time+=e;const n=this.time;if(this.rain){const i=this.rain.geometry.attributes.position,r=i.array,a=this.rainSpeeds.length;for(let o=0;o<a;o++){const l=o*6;let c=r[l+1]-this.rainSpeeds[o]*e;const h=r[l+1]-r[l+4];if(c<0){c=15+Math.random()*4;const u=(Math.random()-.5)*38,d=(Math.random()-.5)*38;r[l]=u,r[l+2]=d,r[l+3]=u+.04,r[l+5]=d}r[l+1]=c,r[l+4]=c-h}i.needsUpdate=!0,this.rain.position.set(t.position.x,0,t.position.z)}for(const i of this.mist)i.position.x+=Math.sin(n*i.userData.drift+i.userData.phase)*e*.4,i.position.z+=Math.cos(n*i.userData.drift*.7+i.userData.phase)*e*.3,i.material.opacity=.04+.025*(.5+.5*Math.sin(n*.3+i.userData.phase));for(const i of this.flickerLights){const r=Math.sin(n*i.speed+i.seed)*.5+.5,a=Math.sin(n*i.speed*3.7+i.seed*2.1)*.5+.5;let o=.82+r*.22;a>.93&&(o*=.35),i.light.intensity=i.base*o,i.cone&&(i.cone.material.uniforms.uOpacity.value=i.cone.material.uniforms.uOpacity.value*.9+.045*o*.1)}if(this.flareGlow){const i=.72+Math.sin(n*11.3)*.16+Math.sin(n*27.7)*.08;this.flareGlow.material.opacity=.6*i,this.flareGlow.scale.setScalar(1.2+i*.5)}if(this._lightningTimer-=e,this._lightningTimer<=0&&this._lightningPhase<=0&&(this._lightningPhase=.62,this._lightningTimer=16+Math.random()*22),this._lightningPhase>0){this._lightningPhase-=e;const i=1-this._lightningPhase/.62,r=Math.max(0,Math.sin(i*Math.PI*2.4))*Math.exp(-i*5.5);this.lightningLight.intensity=r*5.5,this.flashOverlay=Math.max(this.flashOverlay,r*.45)}else this.lightningLight.intensity=0;this.flashOverlay*=Math.max(0,1-e*9),this.sky.material.uniforms.uTime.value=n,this.sky.position.copy(t.position)}}const Gn=I;class cr{constructor(e,t,{texture:n,color:i=16777215,additive:r=!1,gravity:a=-9.8,drag:o=.6,scale:l=420}){this.count=t,this.gravity=a,this.drag=o,this.scale=l,this.positions=new Float32Array(t*3),this.velocities=new Float32Array(t*3),this.sizes=new Float32Array(t),this.alphas=new Float32Array(t),this.life=new Float32Array(t),this.maxLife=new Float32Array(t),this.cursor=0;const c=new Tt;c.setAttribute("position",new Ut(this.positions,3)),c.setAttribute("aSize",new Ut(this.sizes,1)),c.setAttribute("aAlpha",new Ut(this.alphas,1)),this.material=new Vt({transparent:!0,depthWrite:!1,blending:r?di:Ii,uniforms:{uMap:{value:n},uColor:{value:new De(i)},uScale:{value:l}},vertexShader:`
        attribute float aSize;
        attribute float aAlpha;
        varying float vAlpha;
        uniform float uScale;
        void main() {
          vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = clamp(aSize * uScale / max(1.0, -mv.z), 1.0, 90.0);
          gl_Position = projectionMatrix * mv;
        }
      `,fragmentShader:`
        varying float vAlpha;
        uniform sampler2D uMap;
        uniform vec3 uColor;
        void main() {
          vec4 t = texture2D(uMap, gl_PointCoord);
          if (t.a * vAlpha < 0.01) discard;
          gl_FragColor = vec4(uColor, t.a * vAlpha);
        }
      `}),this.points=new Sd(c,this.material),this.points.frustumCulled=!1,this.points.renderOrder=8,this.geo=c,e.add(this.points);for(let h=0;h<t;h++)this.alphas[h]=0}spawn(e,t,n,i){const r=this.cursor;this.cursor=(this.cursor+1)%this.count;const a=r*3;this.positions[a]=e.x,this.positions[a+1]=e.y,this.positions[a+2]=e.z,this.velocities[a]=t.x,this.velocities[a+1]=t.y,this.velocities[a+2]=t.z,this.sizes[r]=n,this.life[r]=i,this.maxLife[r]=i,this.alphas[r]=1}update(e){const t=this.positions,n=this.velocities,i=Math.exp(-this.drag*e);for(let r=0;r<this.count;r++){if(this.life[r]<=0){this.alphas[r]!==0&&(this.alphas[r]=0);continue}this.life[r]-=e;const a=r*3;n[a+1]+=this.gravity*e,n[a]*=i,n[a+1]*=i,n[a+2]*=i,t[a]+=n[a]*e,t[a+1]+=n[a+1]*e,t[a+2]+=n[a+2]*e,t[a+1]<.02&&(t[a+1]=.02,n[a+1]*=-.22,n[a]*=.5,n[a+2]*=.5);const o=Math.max(0,this.life[r]/this.maxLife[r]);this.alphas[r]=o*o}this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.aSize.needsUpdate=!0,this.geo.attributes.aAlpha.needsUpdate=!0}reset(){for(let e=0;e<this.count;e++)this.life[e]=0,this.alphas[e]=0;this.geo.attributes.aAlpha.needsUpdate=!0}}class DM{constructor(e,t,n){this.scene=e,this.world=t,this.camera=n,this.time=0,this.decals=[],this.holes=[],this.gibs=[],this.tracers=[],this.shells=[],this.lights=[],this._initParticles(),this._initDecals(),this._initGibs(),this._initTracers(),this._initShells()}_initParticles(){const e=yr("150,10,12"),t=yr("255,190,90"),n=yr("170,170,160");this.blood=new cr(this.scene,900,{texture:e,color:9309458,gravity:-11,drag:.7,scale:500}),this.bloodMist=new cr(this.scene,160,{texture:e,color:6030857,gravity:-.8,drag:2.2,scale:700}),this.sparks=new cr(this.scene,260,{texture:t,color:16757084,additive:!0,gravity:-13,drag:.35,scale:360}),this.dust=new cr(this.scene,220,{texture:n,color:9341824,gravity:-.4,drag:1.8,scale:600}),this.embers=new cr(this.scene,90,{texture:t,color:16738858,additive:!0,gravity:.6,drag:.4,scale:220}),this._emberTimer=0}_initDecals(){const e=Qd();this.bloodMatBase=new yn({map:e,transparent:!0,opacity:1,roughness:.35,metalness:.05,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4,side:Ot,envMapIntensity:.5});for(let n=0;n<34;n++){const i=new we(new dt(1,1),this.bloodMatBase.clone());i.visible=!1,i.renderOrder=6,this.scene.add(i),this.decals.push({mesh:i,life:0})}const t=ef();this.holeMatBase=new yn({map:t,transparent:!0,opacity:.95,roughness:.8,metalness:.1,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-5,side:Ot});for(let n=0;n<44;n++){const i=new we(new dt(.18,.18),this.holeMatBase.clone());i.visible=!1,i.renderOrder=7,this.scene.add(i),this.holes.push({mesh:i,life:0})}}_initGibs(){const e=new yn({color:4851723,roughness:.45,metalness:.05,envMapIntensity:.4}),t=new yn({color:12168330,roughness:.6,metalness:.05});for(let n=0;n<26;n++){const i=new Ft,r=new we(new Vc(1,1),e.clone());if(r.scale.set(.8+Math.random()*.7,.7+Math.random()*.8,.6+Math.random()*.7),r.castShadow=!0,i.add(r),Math.random()<.45){const a=new we(new en(.05,.035,.34,5),t.clone());a.position.set((Math.random()-.5)*.2,.2,0),a.rotation.set(Math.random(),Math.random(),Math.random()),i.add(a)}i.visible=!1,this.scene.add(i),this.gibs.push({mesh:i,vel:new Gn,spin:new Gn,life:0,maxLife:0,scale:1})}}_initTracers(){this.tracerMatBase=new io({color:16765066,transparent:!0,opacity:.9,blending:di,depthWrite:!1});for(let e=0;e<18;e++){const t=new Tt;t.setAttribute("position",new Ut(new Float32Array(6),3));const n=new so(t,this.tracerMatBase.clone());n.visible=!1,n.frustumCulled=!1,this.scene.add(n),this.tracers.push({line:n,life:0})}}_initShells(){const e=new yn({color:11569982,metalness:.9,roughness:.32,envMapIntensity:1.2}),t=new en(.012,.014,.055,6);for(let n=0;n<22;n++){const i=new we(t,e);i.visible=!1,i.castShadow=!1,this.scene.add(i),this.shells.push({mesh:i,vel:new Gn,spin:new Gn,life:0})}}bloodBurst(e,t,n=24,i={}){const r=i.force??1,a=i.headshot;for(let o=0;o<n;o++){const l=new Gn(t.x*(1.4+Math.random()*3.2)*r+(Math.random()-.5)*2.4,Math.random()*2.8*r+.2,t.z*(1.4+Math.random()*3.2)*r+(Math.random()-.5)*2.4);this.blood.spawn(e,l,.035+Math.random()*(a?.1:.07),.4+Math.random()*.6)}if(n>15)for(let o=0;o<(a?10:6);o++){const l=new Gn(t.x*.8+(Math.random()-.5)*1.2,Math.random()*.9+.1,t.z*.8+(Math.random()-.5)*1.2);this.bloodMist.spawn(e,l,.14+Math.random()*.22,.5+Math.random()*.5)}i.player}gib(e,t,n=1,i=!1){const r=this.gibs.find(a=>a.life<=0);r&&(r.mesh.visible=!0,r.mesh.position.copy(e),r.scale=n*(i?.2:.11),r.mesh.scale.setScalar(r.scale),r.vel.set(t.x*(2.4+Math.random()*3)+(Math.random()-.5)*1.4,2.2+Math.random()*3.2,t.z*(2.4+Math.random()*3)+(Math.random()-.5)*1.4),r.spin.set((Math.random()-.5)*12,(Math.random()-.5)*12,(Math.random()-.5)*12),r.life=5+Math.random()*2,r.maxLife=r.life,r.head=i,i&&r.mesh.children[0].material.color.setHex(5900812))}bloodPool(e,t=1.4){const n=this.decals.find(i=>i.life<=0)||this.decals[0];n.mesh.visible=!0,n.mesh.position.set(e.x+(Math.random()-.5)*.4,.018,e.z+(Math.random()-.5)*.4),n.mesh.rotation.set(-Math.PI/2,0,Math.random()*Math.PI*2),n.mesh.scale.setScalar(t*(.85+Math.random()*.4)),n.mesh.material.opacity=.95,n.life=40,n.maxLife=40}impact(e,t,n="concrete"){const i=t.clone().normalize(),r=e.clone().addScaledVector(i,.012);for(let o=0;o<10;o++){const l=new Gn(i.x*(1.5+Math.random()*3)+(Math.random()-.5)*3,i.y*1.5+Math.random()*2.6,i.z*(1.5+Math.random()*3)+(Math.random()-.5)*3);this.sparks.spawn(r,l,.014+Math.random()*.026,.15+Math.random()*.3)}for(let o=0;o<5;o++){const l=new Gn(i.x*.4+(Math.random()-.5)*.8,.3+Math.random()*.6,i.z*.4+(Math.random()-.5)*.8);this.dust.spawn(r,l,.1+Math.random()*.18,.4+Math.random()*.7)}const a=this.holes.find(o=>o.life<=0)||this.holes[0];a.mesh.visible=!0,a.mesh.position.copy(r).addScaledVector(i,.008),a.mesh.lookAt(r.clone().add(i)),a.mesh.rotateZ(Math.random()*Math.PI*2),a.mesh.scale.setScalar(.65+Math.random()*.7),a.mesh.material.opacity=.95,a.life=30,a.maxLife=30}tracer(e,t){const n=this.tracers.find(r=>r.life<=0)||this.tracers[0],i=n.line.geometry.attributes.position.array;i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=t.x,i[4]=t.y,i[5]=t.z,n.line.geometry.attributes.position.needsUpdate=!0,n.line.visible=!0,n.line.material.opacity=.85,n.life=.07}shell(e,t){const n=this.shells.find(i=>i.life<=0)||this.shells[0];n.mesh.visible=!0,n.mesh.position.copy(e),n.vel.set(t.x*1.4+(Math.random()-.5)*.8,1.4+Math.random()*1.4,t.z*1.4+(Math.random()-.5)*.8),n.spin.set(Math.random()*14,Math.random()*14,Math.random()*14),n.life=3.5,n.mesh.scale.setScalar(1)}muzzleLight(e,t=16752720,n=8){let i=this.lights.find(r=>r.life<=0);if(!i){const r=new Fr(t,0,9,2);this.scene.add(r),i={light:r,life:0},this.lights.push(i)}i.light.position.copy(e),i.light.color.setHex(t),i.light.intensity=n,i.life=.055}update(e){if(this.time+=e,this.blood.update(e),this.bloodMist.update(e),this.sparks.update(e),this.dust.update(e),this.embers.update(e),this._emberTimer-=e,this._emberTimer<=0){this._emberTimer=.18;const t=this.camera.position;for(let n=0;n<2;n++)this.embers.spawn(new Gn(t.x+(Math.random()-.5)*18,.2+Math.random()*1.2,t.z+(Math.random()-.5)*18),new Gn((Math.random()-.5)*.5,.2+Math.random()*.4,(Math.random()-.5)*.5),.02+Math.random()*.03,3+Math.random()*4)}for(const t of this.decals)t.life<=0||(t.life-=e,t.life<5&&(t.mesh.material.opacity=Math.max(0,t.life/5)*.95),t.life<=0&&(t.mesh.visible=!1));for(const t of this.holes)t.life<=0||(t.life-=e,t.life<=0&&(t.mesh.visible=!1));for(const t of this.gibs)if(!(t.life<=0)){if(t.life-=e,t.vel.y-=12*e,t.mesh.position.addScaledVector(t.vel,e),t.mesh.rotation.x+=t.spin.x*e,t.mesh.rotation.y+=t.spin.y*e,t.mesh.rotation.z+=t.spin.z*e,t.mesh.position.y<.06&&(t.mesh.position.y=.06,t.vel.y*=-.28,t.vel.x*=.55,t.vel.z*=.55,t.spin.multiplyScalar(.7)),t.life<1.2){const n=t.scale*Math.max(0,t.life/1.2);t.mesh.scale.setScalar(n)}t.life<=0&&(t.mesh.visible=!1)}for(const t of this.tracers)t.life<=0||(t.life-=e,t.line.material.opacity=Math.max(0,t.life/.07)*.85,t.life<=0&&(t.line.visible=!1));for(const t of this.shells)t.life<=0||(t.life-=e,t.vel.y-=12*e,t.mesh.position.addScaledVector(t.vel,e),t.mesh.rotation.x+=t.spin.x*e,t.mesh.rotation.z+=t.spin.z*e,t.mesh.position.y<.02&&(t.mesh.position.y=.02,t.vel.y*=-.35,t.vel.x*=.6,t.vel.z*=.6),t.life<=0&&(t.mesh.visible=!1));for(const t of this.lights)t.life<=0||(t.life-=e,t.light.intensity*=.72,t.life<=0&&(t.light.intensity=0))}reset(){this.blood.reset(),this.bloodMist.reset(),this.sparks.reset(),this.dust.reset(),this.embers.reset();for(const e of this.decals)e.life=0,e.mesh.visible=!1;for(const e of this.holes)e.life=0,e.mesh.visible=!1;for(const e of this.gibs)e.life=0,e.mesh.visible=!1;for(const e of this.tracers)e.life=0,e.line.visible=!1;for(const e of this.shells)e.life=0,e.mesh.visible=!1;for(const e of this.lights)e.life=0,e.light.intensity=0}}class NM{constructor(){this.ctx=null,this.master=null,this.ready=!1,this.muted=!1,this._lastGroan=0}init(){if(this.ctx)return;const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e;this.ctx=t;const n=t.createGain();n.gain.value=.72;const i=t.createDynamicsCompressor();i.threshold.value=-18,i.knee.value=22,i.ratio.value=5,i.attack.value=.004,i.release.value=.28,n.connect(i).connect(t.destination),this.master=n;const r=t.sampleRate*2,a=t.createBuffer(1,r,t.sampleRate),o=a.getChannelData(0);for(let d=0;d<r;d++)o[d]=Math.random()*2-1;this.noise=a;const l=t.sampleRate*1.7,c=t.createBuffer(2,l,t.sampleRate);for(let d=0;d<2;d++){const f=c.getChannelData(d);for(let g=0;g<l;g++){const _=g/l;f[g]=(Math.random()*2-1)*Math.pow(1-_,2.6)*.7}}const h=t.createConvolver();h.buffer=c;const u=t.createGain();u.gain.value=.22,h.connect(u).connect(n),this.reverb=h,this._buildAmbient(),this.ready=!0}resume(){this.init(),this.ctx?.state==="suspended"&&this.ctx.resume()}setMuted(e){this.muted=e,this.master&&this.master.gain.setTargetAtTime(e?0:.72,this.ctx.currentTime,.05)}_buildAmbient(){const e=this.ctx,t=e.createBufferSource();t.buffer=this.noise,t.loop=!0;const n=e.createBiquadFilter();n.type="highpass",n.frequency.value=480;const i=e.createBiquadFilter();i.type="bandpass",i.frequency.value=1900,i.Q.value=.45;const r=e.createGain();r.gain.value=.028,t.connect(n).connect(i).connect(r).connect(this.master),t.start();const a=e.createBufferSource();a.buffer=this.noise,a.loop=!0,a.playbackRate.value=.55;const o=e.createBiquadFilter();o.type="lowpass",o.frequency.value=240,o.Q.value=.8;const l=e.createGain();l.gain.value=.045;const c=e.createOscillator();c.frequency.value=.08;const h=e.createGain();h.gain.value=.02,c.connect(h).connect(l.gain),a.connect(o).connect(l).connect(this.master),a.start(),c.start();const u=e.createGain();u.gain.value=.018;const d=e.createBiquadFilter();d.type="lowpass",d.frequency.value=120;for(const f of[36,54.5,81]){const g=e.createOscillator();g.type="sawtooth",g.frequency.value=f;const _=e.createGain();_.gain.value=.28,g.connect(_).connect(d),g.start()}d.connect(u).connect(this.master)}_env(e,t,n,i,r,a=1e-4){const o=e.gain;o.cancelScheduledValues(t),o.setValueAtTime(1e-4,t),o.exponentialRampToValueAtTime(Math.max(2e-4,n),t+i),o.exponentialRampToValueAtTime(Math.max(1e-4,a),t+i+r)}_send(e,t=.4){if(!this.reverb)return;const n=this.ctx.createGain();n.gain.value=t,e.connect(n).connect(this.reverb)}gunshot(){if(!this.ready)return;const e=this.ctx,t=e.currentTime,n=e.createBufferSource();n.buffer=this.noise,n.playbackRate.value=1.1+Math.random()*.15;const i=e.createBiquadFilter();i.type="highpass",i.frequency.value=320;const r=e.createBiquadFilter();r.type="bandpass",r.frequency.value=1550+Math.random()*500,r.Q.value=.6;const a=e.createBiquadFilter();a.type="lowpass",a.frequency.value=7200;const o=e.createGain();this._env(o,t,.75,.002,.19),n.connect(i).connect(r).connect(a).connect(o).connect(this.master),this._send(o,.5),n.start(t),n.stop(t+.3);const l=e.createOscillator();l.type="sine",l.frequency.setValueAtTime(128,t),l.frequency.exponentialRampToValueAtTime(38,t+.14);const c=e.createGain();this._env(c,t,.55,.002,.16),l.connect(c).connect(this.master),this._send(c,.3),l.start(t),l.stop(t+.22);const h=e.createBufferSource();h.buffer=this.noise;const u=e.createBiquadFilter();u.type="bandpass",u.frequency.value=3200,u.Q.value=2.2;const d=e.createGain();this._env(d,t,.16,.001,.035),h.connect(u).connect(d).connect(this.master),h.start(t),h.stop(t+.08)}dryFire(){if(!this.ready)return;const e=this.ctx,t=e.currentTime,n=e.createBufferSource();n.buffer=this.noise;const i=e.createBiquadFilter();i.type="bandpass",i.frequency.value=2500,i.Q.value=3;const r=e.createGain();this._env(r,t,.22,.001,.045),n.connect(i).connect(r).connect(this.master),n.start(t),n.stop(t+.07)}reload(){if(!this.ready)return;const e=this.ctx,t=e.currentTime,n=[0,.32,.62,1.05,1.4];for(const i of n){const r=e.createBufferSource();r.buffer=this.noise;const a=e.createBiquadFilter();a.type="bandpass",a.frequency.value=900+Math.random()*1400,a.Q.value=2.5;const o=e.createGain();this._env(o,t+i,.18,.001,.06),r.connect(a).connect(o).connect(this.master),r.start(t+i),r.stop(t+i+.09)}}impact(e){if(!this.ready)return;const t=this.ctx,n=t.currentTime;if(e){const i=t.createBufferSource();i.buffer=this.noise;const r=t.createBiquadFilter();r.type="lowpass",r.frequency.value=900;const a=t.createGain();this._env(a,n,.35,.001,.13),i.connect(r).connect(a).connect(this.master),this._send(a,.25),i.start(n),i.stop(n+.2);const o=t.createOscillator();o.type="triangle",o.frequency.setValueAtTime(220,n),o.frequency.exponentialRampToValueAtTime(70,n+.12);const l=t.createGain();this._env(l,n,.22,.002,.12),o.connect(l).connect(this.master),o.start(n),o.stop(n+.2)}else{const i=t.createBufferSource();i.buffer=this.noise;const r=t.createBiquadFilter();r.type="lowpass",r.frequency.value=500;const a=t.createGain();this._env(a,n,.16,.002,.08),i.connect(r).connect(a).connect(this.master),i.start(n),i.stop(n+.12)}}groan(e,t,n=!1){if(!this.ready)return;const i=this.ctx.currentTime;if(i-this._lastGroan<.35)return;this._lastGroan=i;const r=this.ctx,a=Math.max(.02,.3/(1+t*.12)),o=n?48:74+Math.random()*45,l=.7+Math.random()*.7,c=r.currentTime,h=r.createOscillator();h.type="sawtooth",h.frequency.setValueAtTime(o,c),h.frequency.linearRampToValueAtTime(o*(.7+Math.random()*.5),c+l);const u=r.createOscillator();u.frequency.value=3.4+Math.random()*4;const d=r.createGain();d.gain.value=8+Math.random()*10,u.connect(d).connect(h.frequency);const f=r.createBiquadFilter();f.type="bandpass",f.frequency.value=320+Math.random()*400,f.Q.value=1.4;const g=r.createWaveShaper(),_=new Float32Array(256);for(let y=0;y<256;y++){const A=y/128-1;_[y]=Math.tanh(A*2.4)}g.curve=_;const p=r.createGain();p.gain.setValueAtTime(1e-4,c),p.gain.exponentialRampToValueAtTime(a,c+.12),p.gain.exponentialRampToValueAtTime(a*.55,c+l*.55),p.gain.exponentialRampToValueAtTime(1e-4,c+l),h.connect(f).connect(g).connect(p).connect(this.master),this._send(p,.35),h.start(c),h.stop(c+l+.05),u.start(c),u.stop(c+l+.05);const m=r.createBufferSource();m.buffer=this.noise;const x=r.createBiquadFilter();x.type="bandpass",x.frequency.value=780,x.Q.value=.8;const M=r.createGain();this._env(M,c,a*.35,.06,l*.8),m.connect(x).connect(M).connect(this.master),m.start(c),m.stop(c+l)}zombieAttack(e,t){if(!this.ready)return;const n=this.ctx,i=n.currentTime,r=Math.max(.02,.3/(1+t*.16)),a=n.createOscillator();a.type="sawtooth",a.frequency.setValueAtTime(110,i),a.frequency.exponentialRampToValueAtTime(52,i+.32);const o=n.createBiquadFilter();o.type="bandpass",o.frequency.value=480,o.Q.value=1.2;const l=n.createGain();this._env(l,i,r*1.4,.015,.3),a.connect(o).connect(l).connect(this.master),a.start(i),a.stop(i+.4)}zombieDeath(){if(!this.ready)return;const e=this.ctx,t=e.currentTime,n=e.createBufferSource();n.buffer=this.noise;const i=e.createBiquadFilter();i.type="lowpass",i.frequency.value=620;const r=e.createGain();this._env(r,t,.3,.005,.4),n.connect(i).connect(r).connect(this.master),this._send(r,.3),n.start(t),n.stop(t+.5);const a=e.createOscillator();a.type="sawtooth",a.frequency.setValueAtTime(90,t),a.frequency.exponentialRampToValueAtTime(28,t+.5);const o=e.createGain();this._env(o,t,.12,.01,.45),a.connect(o).connect(this.master),a.start(t),a.stop(t+.55)}playerHurt(){if(!this.ready)return;const e=this.ctx,t=e.currentTime,n=e.createOscillator();n.type="sine",n.frequency.setValueAtTime(72,t),n.frequency.exponentialRampToValueAtTime(36,t+.4);const i=e.createGain();this._env(i,t,.5,.004,.4),n.connect(i).connect(this.master),n.start(t),n.stop(t+.5);const r=e.createBufferSource();r.buffer=this.noise;const a=e.createBiquadFilter();a.type="lowpass",a.frequency.value=300;const o=e.createGain();this._env(o,t,.25,.002,.22),r.connect(a).connect(o).connect(this.master),r.start(t),r.stop(t+.3);const l=e.createOscillator();l.type="sine",l.frequency.value=4200;const c=e.createGain();this._env(c,t,.03,.05,.9),l.connect(c).connect(this.master),l.start(t),l.stop(t+1)}heartbeat(e=1){if(!this.ready)return;const t=this.ctx,n=t.currentTime,i=(r,a)=>{const o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(58,n+r),o.frequency.exponentialRampToValueAtTime(32,n+r+.14);const l=t.createGain();this._env(l,n+r,a,.005,.18),o.connect(l).connect(this.master),o.start(n+r),o.stop(n+r+.25)};i(0,.22*e),i(.19,.13*e)}thunder(){if(!this.ready)return;const e=this.ctx,t=e.currentTime,n=e.createBufferSource();n.buffer=this.noise,n.playbackRate.value=.32;const i=e.createBiquadFilter();i.type="lowpass",i.frequency.setValueAtTime(320,t),i.frequency.exponentialRampToValueAtTime(90,t+2.2);const r=e.createGain();r.gain.setValueAtTime(1e-4,t),r.gain.exponentialRampToValueAtTime(.5,t+.15),r.gain.exponentialRampToValueAtTime(.18,t+1.2),r.gain.exponentialRampToValueAtTime(1e-4,t+3),n.connect(i).connect(r).connect(this.master),this._send(r,.5),n.start(t),n.stop(t+3.2)}uiClick(){if(!this.ready)return;const e=this.ctx,t=e.currentTime,n=e.createOscillator();n.type="square",n.frequency.value=880;const i=e.createGain();this._env(i,t,.045,.001,.05),n.connect(i).connect(this.master),n.start(t),n.stop(t+.07)}}function Xu(s,e){if(e===Zf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Yl||e===ud){let t=s.getIndex();if(t===null){const a=[],o=s.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===Yl)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}function tf(s){const e=new Map,t=new Map,n=s.clone();return nf(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),n}function nf(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)nf(s.children[n],e.children[n],t)}class sf extends Xs{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new zM(t)}),this.register(function(t){return new kM(t)}),this.register(function(t){return new jM(t)}),this.register(function(t){return new ZM(t)}),this.register(function(t){return new $M(t)}),this.register(function(t){return new GM(t)}),this.register(function(t){return new HM(t)}),this.register(function(t){return new WM(t)}),this.register(function(t){return new XM(t)}),this.register(function(t){return new BM(t)}),this.register(function(t){return new qM(t)}),this.register(function(t){return new VM(t)}),this.register(function(t){return new KM(t)}),this.register(function(t){return new YM(t)}),this.register(function(t){return new FM(t)}),this.register(function(t){return new qu(t,at.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new qu(t,at.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new JM(t)})}load(e,t,n,i){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=Mr.extractUrlBase(e);a=Mr.resolveURL(c,this.path)}else a=Mr.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new kd(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===rf){try{a[at.KHR_BINARY_GLTF]=new QM(e)}catch(u){i&&i(u);return}r=JSON.parse(a[at.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new dy(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case at.KHR_MATERIALS_UNLIT:a[u]=new OM;break;case at.KHR_DRACO_MESH_COMPRESSION:a[u]=new ey(r,this.dracoLoader);break;case at.KHR_TEXTURE_TRANSFORM:a[u]=new ty;break;case at.KHR_MESH_QUANTIZATION:a[u]=new ny;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function UM(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function It(s,e,t){const n=s.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}const at={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class FM{constructor(e){this.parser=e,this.name=at.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new De(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],mn);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Rs(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Fr(h),c.distance=u;break;case"spot":c=new ic(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Hn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class OM{constructor(){this.name=at.KHR_MATERIALS_UNLIT}getMaterialType(){return Dt}extendParams(e,t,n){const i=[];e.color=new De(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],mn),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Bt))}return Promise.all(i)}}class BM{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const n=It(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}}class zM{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return It(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){const n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){const r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new J(r,r)}return Promise.all(i)}}class kM{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_DISPERSION}getMaterialType(e){return It(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){const n=It(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}}class VM{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return It(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){const n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}}class GM{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SHEEN}getMaterialType(e){return It(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){const n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(t.sheenColor=new De(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){const r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],mn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Bt)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}}class HM{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return It(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){const n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}}class WM{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_VOLUME}getMaterialType(e){return It(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){const n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;const r=n.attenuationColor||[1,1,1];return t.attenuationColor=new De().setRGB(r[0],r[1],r[2],mn),Promise.all(i)}}class XM{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IOR}getMaterialType(e){return It(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){const n=It(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}}class qM{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SPECULAR}getMaterialType(e){return It(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){const n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));const r=n.specularColorFactor||[1,1,1];return t.specularColor=new De().setRGB(r[0],r[1],r[2],mn),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Bt)),Promise.all(i)}}class YM{constructor(e){this.parser=e,this.name=at.EXT_MATERIALS_BUMP}getMaterialType(e){return It(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){const n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}}class KM{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return It(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){const n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}}class jM{constructor(e){this.parser=e,this.name=at.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class ZM{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class $M{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class qu{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class JM{constructor(e){this.name=at.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==vn.TRIANGLES&&c.mode!==vn.TRIANGLE_STRIP&&c.mode!==vn.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const g of u){const _=new Je,p=new I,m=new En,x=new I(1,1,1),M=new jp(g.geometry,g.material,d);for(let y=0;y<d;y++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,y),l.SCALE&&x.fromBufferAttribute(l.SCALE,y),M.setMatrixAt(y,_.compose(p,m,x));for(const y in l)if(y==="_COLOR_0"){const A=l[y];M.instanceColor=new Jl(A.array,A.itemSize,A.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&g.geometry.setAttribute(y,l[y]);St.prototype.copy.call(M,g),this.parser.assignFinalMaterial(M),f.push(M)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const rf="glTF",hr=12,Yu={JSON:1313821514,BIN:5130562};class QM{constructor(e){this.name=at.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,hr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==rf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-hr,r=new DataView(e,hr);let a=0;for(;a<i;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===Yu.JSON){const c=new Uint8Array(e,hr+a,o);this.content=n.decode(c)}else if(l===Yu.BIN){const c=hr+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class ey{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=at.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const u=lc[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=lc[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Cs[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],p=l[g];p!==void 0&&(_.normalized=p)}u(f)},o,c,mn,d)})})}}class ty{constructor(){this.name=at.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class ny{constructor(){this.name=at.KHR_MESH_QUANTIZATION}}class af extends Gs{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*c,_=g-c,p=-2*f+3*d,m=f-d,x=1-p,M=m-d+u;for(let y=0;y!==o;y++){const A=a[_+y+o],E=a[_+y+l]*h,C=a[g+y+o],v=a[g+y]*h;r[y]=x*A+M*E+p*C+m*v}return r}}const iy=new En;class sy extends af{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return iy.fromArray(r).normalize().toArray(r),r}}const vn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Cs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ku={9728:zt,9729:kt,9984:sd,9985:Ia,9986:dr,9987:ci},ju={33071:an,33648:ka,10497:Di},tl={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},lc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ri={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},ry={CUBICSPLINE:void 0,LINEAR:wr,STEP:Er},nl={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function ay(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new yn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:mi})),s.DefaultMaterial}function Gi(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Hn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function oy(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function ly(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function cy(s){let e;const t=s.extensions&&s.extensions[at.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+il(t.attributes):e=s.indices+":"+il(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+il(s.targets[n]);return e}function il(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function cc(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function hy(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const uy=new Je;class dy{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new UM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new Zm(this.options.manager):this.textureLoader=new n0(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new kd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return Gi(r,o,i),Hn(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())r(h,o.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[at.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,a){n.load(Mr.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=tl[i.type],o=Cs[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new Ut(c,a,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=tl[i.type],c=Cs[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,p;if(f&&f!==u){const m=Math.floor(d/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let M=t.cache.get(x);M||(_=new c(o,m*f,i.count*f/h),M=new _d(_,f/h),t.cache.add(x,M)),p=new Cr(M,l,d%f/h,g)}else o===null?_=new c(i.count*l):_=new c(o,d,i.count*l),p=new Ut(_,l,g);if(i.sparse!==void 0){const m=tl.SCALAR,x=Cs[i.sparse.indices.componentType],M=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,A=new x(a[1],M,i.sparse.count*m),E=new c(a[2],y,i.sparse.count*l);o!==null&&(p=new Ut(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let C=0,v=A.length;C<v;C++){const T=A[C];if(p.setX(T,E[C*l]),l>=2&&p.setY(T,E[C*l+1]),l>=3&&p.setZ(T,E[C*l+2]),l>=4&&p.setW(T,E[C*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=g}return p})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const i=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return h.magFilter=Ku[d.magFilter]||kt,h.minFilter=Ku[d.minFilter]||ci,h.wrapS=ju[d.wrapS]||Di,h.wrapT=ju[d.wrapT]||Di,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==zt&&h.minFilter!==kt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=i.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const p=new Gt(_);p.needsUpdate=!0,d(p)}),t.load(Mr.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),Hn(u,a),u.userData.mimeType=a.mimeType||hy(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[at.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[at.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[at.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new yd,Ln.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new io,Ln.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return yn}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[at.KHR_MATERIALS_UNLIT]){const u=i[at.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{const u=r.pbrMetallicRoughness||{};if(o.color=new De(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],mn),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,Bt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Ot);const h=r.alphaMode||nl.OPAQUE;if(h===nl.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===nl.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Dt&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new J(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==Dt&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Dt){const u=r.emissiveFactor;o.emissive=new De().setRGB(u[0],u[1],u[2],mn)}return r.emissiveTexture!==void 0&&a!==Dt&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Bt)),Promise.all(c).then(function(){const u=new a(o);return r.name&&(u.name=r.name),Hn(u,r),t.associations.set(u,{materials:e}),r.extensions&&Gi(i,u,r),u})}createUniqueName(e){const t=pt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[at.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Zu(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=cy(c),u=i[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[at.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Zu(new Tt,c,t),i[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?ay(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],p=a[f];let m;const x=c[f];if(p.mode===vn.TRIANGLES||p.mode===vn.TRIANGLE_STRIP||p.mode===vn.TRIANGLE_FAN||p.mode===void 0)m=r.isSkinnedMesh===!0?new qp(_,x):new we(_,x),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),p.mode===vn.TRIANGLE_STRIP?m.geometry=Xu(m.geometry,ud):p.mode===vn.TRIANGLE_FAN&&(m.geometry=Xu(m.geometry,Yl));else if(p.mode===vn.LINES)m=new Md(_,x);else if(p.mode===vn.LINE_STRIP)m=new so(_,x);else if(p.mode===vn.LINE_LOOP)m=new Qp(_,x);else if(p.mode===vn.POINTS)m=new Sd(_,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(m.geometry.morphAttributes).length>0&&ly(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),Hn(m,r),p.extensions&&Gi(i,m,p),t.assignFinalMaterial(m),u.push(m)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Gi(i,u[0],r),u[0];const d=new Ft;r.extensions&&Gi(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new tn(wp.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new kr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Hn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const u=a[c];if(u){o.push(u);const d=new Je;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Nc(o,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],g=i.samplers[f.sampler],_=f.target,p=_.node,m=i.parameters!==void 0?i.parameters[g.input]:g.input,x=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",p)),o.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",x)),c.push(g),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],_=u[3],p=u[4],m=[];for(let M=0,y=d.length;M<y;M++){const A=d[M],E=f[M],C=g[M],v=_[M],T=p[M];if(A===void 0)continue;A.updateMatrix&&A.updateMatrix();const P=n._createAnimationTracks(A,E,C,v,T);if(P)for(let R=0;R<P.length;R++)m.push(P[R])}const x=new nc(r,void 0,m);return Hn(x,i),x})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,uy)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);if(h.userData.pivot!==void 0&&u.length>0){const f=h.userData.pivot,g=u[0];h.pivot=new I().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],g.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new vd:c.length>1?h=new Ft:c.length===1?h=c[0]:h=new St,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=a),Hn(h,r),r.extensions&&Gi(n,h,r),r.matrix!==void 0){const u=new Je;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){const u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new Ft;n.name&&(r.name=i.createUniqueName(n.name)),Hn(r,n),n.extensions&&Gi(t,r,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++){const d=l[h];d.parent!==null?r.add(tf(d)):r.add(d)}const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof Ln||d instanceof Gt)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){const a=[],o=e.name?e.name:e.uuid,l=[];function c(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}Ri[r.path]===Ri.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(o);let h;switch(Ri[r.path]){case Ri.weights:h=Fs;break;case Ri.rotation:h=Os;break;case Ri.translation:case Ri.scale:h=Bs;break;default:n.itemSize===1?h=Fs:h=Bs;break}const u=i.interpolation!==void 0?ry[i.interpolation]:wr,d=this._getArrayFromAccessor(n);for(let f=0,g=l.length;f<g;f++){const _=new h(l[f]+"."+Ri[r.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),a.push(_)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=cc(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Os?sy:af;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function fy(s,e,t){const n=e.attributes,i=new wn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new I(l[0],l[1],l[2]),new I(c[0],c[1],c[2])),o.normalized){const h=cc(Cs[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new I,l=new I;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=cc(Cs[d.componentType]);l.multiplyScalar(_)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;const a=new Qn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function Zu(s,e,t){const n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){s.setAttribute(o,l)})}for(const a in n){const o=lc[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){const a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return rt.workingColorSpace!==mn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${rt.workingColorSpace}" not supported.`),Hn(s,e),fy(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?oy(s,e.targets,t):s})}const mr=I;function $u(s){return 1-Math.pow(1-s,3)}class py{constructor(e,t,n,i){this.scene=e,this.world=t,this.fx=n,this.audio=i,this.zombies=[],this.template=null,this.animations=[],this.baseHeight=1.82,this.onKill=null,this.onHeadshot=null,this.onPlayerHit=null,this.onGroan=null,this._raycaster=new Hd,this._hitTargets=[]}async load(e){const n=await new sf().loadAsync("./models/zombie_runner.glb",a=>{a.total&&e?.(a.loaded/a.total)});this.template=n.scene,this.animations=n.animations,this.template.updateMatrixWorld(!0);const i=new wn().setFromObject(this.template),r=i.max.y-i.min.y;return r>.01&&(this.baseHeight=r),this.footOffset=-i.min.y,this.template.traverse(a=>{a.isMesh&&(a.castShadow=!0,a.receiveShadow=!0,a.frustumCulled=!1,a.material&&(a.material.envMapIntensity=.7,a.material.roughness=Math.min(1,(a.material.roughness??1)*.95+.05)))}),this}get alive(){return this.zombies.filter(e=>!e.dead)}spawn(e,t={}){if(!this.template)return null;const n=new gy(this,e,t);return this.zombies.push(n),this.scene.add(n.root),this._hitTargets.push(...n.hitboxes),n}spawnShowcase(e){const t=this.spawn(e,{showcase:!0,scale:1.06});return t&&(t.playIdle(),t.state="showcase"),t}clear(){for(const e of this.zombies)this.scene.remove(e.root),e.dispose();this.zombies.length=0,this._hitTargets.length=0}update(e,t,n){for(let i=this.zombies.length-1;i>=0;i--){const r=this.zombies[i];r.update(e,t,n,this),r.removeMe&&(this.scene.remove(r.root),r.dispose(),this.zombies.splice(i,1))}this._hitTargets=this.zombies.filter(i=>!i.dead).flatMap(i=>i.hitboxes)}raycast(e,t,n=80){this._raycaster.set(e,t),this._raycaster.far=n;const i=this._raycaster.intersectObjects(this._hitTargets,!1);if(!i.length)return null;for(const r of i){const a=r.object.userData.zombie;if(!a||a.dead)continue;const o=this.world.raycast(e,t,r.distance);return o&&o.distance<r.distance-.05?null:{zombie:a,point:r.point.clone(),distance:r.distance,part:r.object.userData.part||"body",normal:t.clone().negate()}}return null}findAimAssist(e,t,n=.14,i=55){let r=null,a=1/0;const o=new mr;for(const l of this.zombies){if(l.dead)continue;const c=l.getHeadWorldPosition(o),h=c.sub(e),u=h.length();if(u>i||u<.4)continue;h.normalize();const d=h.dot(t);if(d<Math.cos(n))continue;const f=(1-d)*40+u*.02;f<a&&(a=f,r={point:c.clone(),zombie:l})}return r}}let my=0;class gy{constructor(e,t,n={}){this.id=++my,this.manager=e,this.world=e.world,this.fx=e.fx,this.audio=e.audio,this.showcase=!!n.showcase,this.root=new Ft,this.root.position.copy(t),this.root.rotation.y=n.rotation??Math.random()*Math.PI*2,this.targetHeight=(n.scale??1)*(1.72+Math.random()*.2),this.isRunner=n.runner??Math.random()<.28,this.isBoss=!!n.boss,this.isBoss&&(this.targetHeight=2.35,this.isRunner=!1),this.maxHealth=n.health??(this.isBoss?620:this.isRunner?70:100),this.health=this.maxHealth,this.speed=n.speed??(this.isRunner?2.55:1.15)*(this.isBoss?.78:1),this.damage=n.damage??(this.isBoss?34:15),this.dead=!1,this.state="spawn",this.attackCooldown=.4+Math.random()*1.2,this.attackTimer=0,this.attackHitAt=-1,this.spawnT=0,this.deathT=0,this.fadeT=0,this.removeMe=!1,this.hitFlash=0,this.groanTimer=3+Math.random()*9,this.phase=Math.random()*10,this.fallPivot=new Ft,this.fallPivot.position.y=.08,this.root.add(this.fallPivot),this.visual=tf(e.template),this.visualScale=this.targetHeight/e.baseHeight,this.standY=(e.footOffset||0)*this.visualScale-.08,this.visual.position.y=this.standY,this.visual.scale.setScalar(this.visualScale),this.fallPivot.add(this.visual),this.materials=[];const i=this._tint();this.visual.traverse(c=>{if(c.isMesh){if(c.castShadow=!0,c.receiveShadow=!0,c.frustumCulled=!1,c.material){const u=(Array.isArray(c.material)?c.material:[c.material]).map(d=>{const f=d.clone();return f.transparent=!1,f.color=f.color.clone().multiply(i),f.roughness=Math.min(1,(f.roughness??.8)+(Math.random()-.5)*.12),this.isBoss&&(f.emissive=new De(3802373),f.emissiveIntensity=.35),this.materials.push(f),f});c.material=Array.isArray(c.material)?u:u[0]}c.material&&/head/i.test(c.material.name||"")&&(this.headMesh=c),c.isMesh&&!this.headMesh&&/head/i.test(c.name||"")&&(this.headMesh=c)}}),this.headBone=null,this.visual.traverse(c=>{c.isBone&&/head/i.test(c.name)&&!/neck/i.test(c.name)&&(!this.headBone||c.name.length<this.headBone.name.length)&&(this.headBone=c)}),this.headBone||this.visual.traverse(c=>{c.isBone&&/head/i.test(c.name)&&(this.headBone=c)}),this.hitboxes=[];const r=new Dt({visible:!1}),a=new we(new Nr(.19,8,6),r);a.userData.part="head",a.userData.zombie=this,a.visible=!1,this.root.add(a),this.hitboxes.push(a),this.headHit=a;const o=new we(new Pr(.33,.82,4,8),r);o.userData.part="body",o.userData.zombie=this,o.position.y=1.18,o.visible=!1,this.root.add(o),this.hitboxes.push(o);const l=new we(new Pr(.3,.62,4,8),r);l.userData.part="legs",l.userData.zombie=this,l.position.y=.5,l.visible=!1,this.root.add(l),this.hitboxes.push(l),this.mixer=new Gd(this.visual),this.actions={};for(const c of e.animations){const h=this.mixer.clipAction(c);this.actions[c.name]=h,/walk/i.test(c.name)?this.walkAction=h:/attack/i.test(c.name)?this.attackAction=h:/idle/i.test(c.name)&&(this.idleAction=h)}this.walkAction&&(this.walkAction.setLoop(ql,1/0),this.walkAction.play(),this.walkAction.time=Math.random()*this.walkAction.getClip().duration,this.walkAction.timeScale=this.isRunner?1.55:.92),this.attackAction&&(this.attackAction.setLoop(ws,1),this.attackAction.clampWhenFinished=!0),this.mixer.addEventListener("finished",c=>{c.action===this.attackAction&&!this.dead&&(this.state="walk",this.attackAction.fadeOut(.18),this.walkAction?.reset().fadeIn(.18).play())}),this.showcase||(this.visual.position.y=this.standY-1.5,this.visual.rotation.z=(Math.random()-.5)*.12)}_tint(){const e=[[.92,1.02,.88],[.98,.9,.84],[.82,.92,.88],[1.02,.94,.8],[.9,.86,.8],[.8,.88,.78]],t=this.isBoss?[1.1,.72,.68]:e[Math.random()*e.length|0];return new De(t[0],t[1],t[2])}playIdle(){this.state="showcase",this.walkAction?.stop(),this.idleAction&&(this.idleAction.setLoop(ql,1/0),this.idleAction.play())}getHeadWorldPosition(e=new mr){return this.headBone?(this.headBone.getWorldPosition(e),e.y+=.12):e.copy(this.root.position).y+=1.62,e}hit(e,t,n,i){if(this.dead||this.state==="showcase")return;const r=t==="head",a=r?3:t==="legs"?.72:1;return this.health-=e*a,this.hitFlash=1,this.fx.goreEnabled!==!1&&this.fx.bloodBurst(i,n,r?46:26,{headshot:r}),this.audio?.impact(r),r&&this.manager.onHeadshot?.(this),this.health<=0?this.die(n,i,r):(this.root.position.addScaledVector(n,.045),r&&Math.random()<.3&&(this.visual.rotation.z+=(Math.random()-.5)*.4)),{killed:this.dead,headshot:r}}die(e,t,n){if(!this.dead){this.dead=!0,this.state="dead",this.deathT=0,this.attackHitAt=-1,this.walkAction?.fadeOut(.12),this.attackAction?.fadeOut(.12),this.idleAction?.fadeOut(.12),this.headHit.visible=!1;for(const i of this.hitboxes)i.visible=!1;if(n){if(this.headMesh&&(this.headMesh.visible=!1),this.fx.goreEnabled!==!1){const i=this.getHeadWorldPosition();this.fx.gib(i,e,1.15,!0),this.fx.bloodBurst(i,e,30,{headshot:!0,force:1.5})}}else this.fx.goreEnabled!==!1&&this.fx.gib(t,e,.8,!1);this.fx.goreEnabled!==!1&&this.fx.bloodPool(this.root.position,1.5+Math.random()),this.audio?.zombieDeath(),this.manager.onKill?.(this,n)}}update(e,t,n,i){if(this.removeMe)return;const r=this.root;if(this.showcase){this.mixer.update(e),this._updateHeadHitbox();return}if(this.state==="spawn"){this.spawnT+=e;const g=Math.min(1,this.spawnT/.85);this.visual.position.y=this.standY-1.5*(1-$u(g)),this.visual.rotation.z*=.96,g>=1&&(this.state="walk",this.visual.position.y=this.standY),this.mixer.update(e*.6),this._updateHeadHitbox();return}if(this.dead){this.deathT+=e;const g=Math.min(1,this.deathT/.62),_=this.fallAngle??(this.fallAngle=(Math.random()<.5?-1:1)*(Math.PI/2-.06));if(this.fallPivot.rotation.x=_*$u(g),this.fallPivot.position.y=.08+Math.sin(g*Math.PI)*.04,this.mixer.update(e*.4),this.deathT>3.6){this.fadeT+=e;const p=Math.max(0,1-this.fadeT/1.4);for(const m of this.materials)m.transparent=!0,m.opacity=p,m.depthWrite=!1;p<=0&&(this.removeMe=!0)}return}if(this.attackCooldown-=e,this.groanTimer-=e,this.groanTimer<=0){this.groanTimer=7+Math.random()*14;const g=r.position.distanceTo(t);this.audio?.groan(r.position,g,this.isBoss)}const a=t.x-r.position.x,o=t.z-r.position.z,l=Math.hypot(a,o);let h=Math.atan2(a,o)-r.rotation.y;for(;h>Math.PI;)h-=Math.PI*2;for(;h<-Math.PI;)h+=Math.PI*2;if(r.rotation.y+=h*Math.min(1,e*(this.state==="attack"?5:3.4)),this.state==="attack"){this.attackTimer+=e,this.attackHitAt>=0&&this.attackTimer>=this.attackHitAt&&(this.attackHitAt=-1,l<2.3&&n.alive&&(n.damage(this.damage,r.position),this.fx.bloodBurst(new mr(t.x,t.y-.35,t.z),new mr(a,0,o).normalize(),8,{player:!0}))),this.mixer.update(e),this.attackAction&&!this.attackAction.isRunning()&&this.attackTimer>.4&&(this.state="walk"),this._updateHeadHitbox();return}let u=a,d=o;l<.001&&(u=0,d=1);let f=Math.hypot(u,d);u/=f,d/=f;for(const g of i.zombies){if(g===this||g.dead)continue;const _=r.position.x-g.root.position.x,p=r.position.z-g.root.position.z,m=_*_+p*p;if(m<1.1&&m>1e-4){const x=Math.sqrt(m);u+=_/x*(1.1-x)*1.4,d+=p/x*(1.1-x)*1.4}}if(f=Math.hypot(u,d)||1,u/=f,d/=f,l>1.25){const g=this.speed*e;let _=!1;const p=[0,.45,-.45,.95,-.95,1.5,-1.5];for(const m of p){const x=Math.cos(m),M=Math.sin(m),y=u*x-d*M,A=u*M+d*x,E=r.position.x+y*g,C=r.position.z+A*g;if(!this.world.isBlocked(E,C,.34)){r.position.x=E,r.position.z=C,_=!0;break}}_||(r.position.x+=u*g*.3,r.position.z+=d*g*.3,this.world.resolveCircle(r.position,.35)),this.walkAction&&(this.walkAction.timeScale=(this.isRunner?1.7:.95)*(.8+this.speed*.2))}else this.attackCooldown<=0&&this.attackAction&&(this.state="attack",this.attackTimer=0,this.attackCooldown=1.35+Math.random()*.8,this.attackHitAt=this.attackAction.getClip().duration*.52,this.attackAction.reset().setLoop(ws,1).fadeIn(.12).play(),this.walkAction?.fadeOut(.12),this.audio?.zombieAttack(r.position,l));r.position.y=Math.sin(this.phase+performance.now()*.001*3)*.008,this.mixer.update(e*(this.isRunner?1.2:1)),this._updateHeadHitbox()}_updateHeadHitbox(){if(!this.headBone)return;const e=this.headBone.getWorldPosition(new mr);this.root.worldToLocal(e),this.headHit.position.copy(e),this.headHit.position.y+=.1}dispose(){this.mixer?.stopAllAction(),this.mixer?.uncacheRoot(this.visual);for(const e of this.materials)e.dispose();for(const e of this.hitboxes)e.geometry.dispose();this.hitboxes[0]?.material?.dispose()}}const Hi=I;class _y{constructor(e,t,n,i){this.renderer=e,this.camera=t,this.fx=n,this.audio=i,this.viewScene=new Lc,this.viewCamera=new tn(62,1,.01,8),this.viewCamera.position.set(0,0,0),this.magSize=30,this.mag=30,this.reserve=180,this.reloading=!1,this.reloadT=0,this.reloadDuration=1.8,this.cooldown=0,this.fireInterval=.086,this.shots=0,this.spread=0,this.drawT=0,this.drawing=!1,this.recoil=0,this.recoilRot=0,this.sway=new J,this.swayTarget=new J,this.bobT=0,this.flashT=0,this.enabled=!0,this.onAmmo=null,this.onHit=null,this.onShot=null,this.onReloadStart=null,this.onReloadEnd=null,this.aimAssist=!0,this.isTouch=matchMedia("(pointer: coarse)").matches,this._raycaster=new Hd,this._buildLights()}_buildLights(){this.viewScene.environment=null;const e=new t0(6057338,1.1);this.viewScene.add(e);const t=new Rs(16756848,2.6);t.position.set(1.2,1.8,1.5),this.viewScene.add(t);const n=new Rs(6266815,2);n.position.set(-1.6,.6,-1.2),this.viewScene.add(n);const i=new Fr(16767408,4.5,4,2);i.position.set(.4,.2,.4),this.viewScene.add(i),this.viewLight=i;const r=CM();this.flashMat=new qa({map:r,color:16767136,transparent:!0,opacity:0,depthWrite:!1,blending:di}),this.flashSprite=new $l(this.flashMat),this.flashSprite.scale.set(.55,.55,1),this.flashSprite.visible=!1,this.viewScene.add(this.flashSprite),this.flashLight=new Fr(16756832,0,3,2),this.viewScene.add(this.flashLight)}async load(e){const n=await new sf().loadAsync("./models/m4_viewmodel_web.glb",c=>{c.total&&e?.(c.loaded/c.total)});this.model=n.scene,this.animations=n.animations,this.mixer=new Gd(this.model),this.actions={};for(const c of this.animations){const h=this.mixer.clipAction(c);this.actions[c.name]=h,/^fire$/i.test(c.name)?this.fireAction=h:/^reload_empty$/i.test(c.name)?this.reloadEmptyAction=h:/^reload$/i.test(c.name)?this.reloadAction=h:/^draw$/i.test(c.name)?this.drawAction=h:/^holster$/i.test(c.name)&&(this.holsterAction=h)}this.fireAction&&(this.fireAction.setLoop(ws,1),this.fireAction.clampWhenFinished=!0,this.fireAction.timeScale=2.2);for(const c of[this.reloadAction,this.reloadEmptyAction,this.drawAction,this.holsterAction])c&&(c.setLoop(ws,1),c.clampWhenFinished=!0);this.reloadAction&&(this.reloadDuration=this.reloadAction.getClip().duration),this.mixer.addEventListener("finished",c=>{(c.action===this.reloadAction||c.action===this.reloadEmptyAction)&&this._finishReload()}),this.model.traverse(c=>{if(c.isMesh&&(c.castShadow=!1,c.receiveShadow=!1,c.frustumCulled=!1,c.material)){const h=Array.isArray(c.material)?c.material:[c.material];for(const u of h){const d=(u.name||"").toLowerCase();d.includes("m4")?(u.metalness=.55,u.roughness=.42,u.envMapIntensity=1.3):d.includes("glove")?(u.metalness=0,u.roughness=.88,u.envMapIntensity=.6):d.includes("hand")?(u.metalness=0,u.roughness=.78,u.envMapIntensity=.6):d.includes("bullet")&&(u.metalness=.9,u.roughness=.28,u.envMapIntensity=1.4),u.needsUpdate=!0}}});const i=new wn().setFromObject(this.model),r=i.getSize(new Hi),a=i.getCenter(new Hi),o=Math.max(r.x,r.y,r.z),l=.9/Math.max(.4,o);return this.model.scale.setScalar(l),this.model.position.set(-a.x*l,-a.y*l,-a.z*l),this.model.position.z+=0,this.holder=new Ft,this.holder.add(this.model),this.basePos=new Hi(.22,-.2,-.52),this.baseRot=new _i(0,.03,0),this.holder.position.copy(this.basePos),this.holder.rotation.copy(this.baseRot),this.viewScene.add(this.holder),this.muzzle=new St,this.muzzle.position.set(.17,.05,-.82),this.holder.add(this.muzzle),this.eject=new St,this.eject.position.set(.13,.05,-.35),this.holder.add(this.eject),this.viewScene.environment=(this.renderer,null),this.ready=!0,this}attachEnvironment(e){this.viewScene.environment=e,this.viewScene.environmentIntensity=.6}start(){this.enabled=!0,this.mag=this.magSize,this.reserve=180,this.reloading=!1,this.drawing=!0,this.drawT=0,this.drawAction?(this.drawAction.reset().play(),this.drawDuration=this.drawAction.getClip().duration):this.drawDuration=.5,this.onAmmo?.(this.mag,this.reserve)}setEnabled(e){this.enabled=e}canFire(){return this.enabled&&!this.reloading&&!this.drawing&&this.cooldown<=0&&this.mag>0}fire(e,t){if(!this.canFire())return this.enabled&&!this.reloading&&!this.drawing&&this.mag<=0&&this.cooldown<=0&&(this.audio?.dryFire(),this.cooldown=.2,this.startReload()),!1;this.mag--,this.cooldown=this.fireInterval,this.shots++,this.spread=Math.min(.028,this.spread+.0045),this.recoil=1,this.recoilRot=1,this.onAmmo?.(this.mag,this.reserve),this.audio?.gunshot(),this.onShot?.(),this.flashT=.05,this.flashSprite.visible=!0,this.flashSprite.material.opacity=1,this.flashSprite.material.rotation=Math.random()*Math.PI*2,this.flashSprite.scale.setScalar(.38+Math.random()*.35),this.flashLight.intensity=9,this.flashLight.position.copy(this.muzzle.position).add(this.holder.position),this.fx.muzzleLight(this.getMuzzleWorld(e),16752720,14),this.fireAction&&(this.fireAction.reset(),this.fireAction.timeScale=2.1+Math.random()*.25,this.fireAction.play());const n=e.position.clone(),i=new Hi(0,0,-1).applyQuaternion(e.quaternion),r=this.spread+(this.isTouch?.004:.002);if(i.x+=(Math.random()-.5)*r*2,i.y+=(Math.random()-.5)*r*2,i.z+=(Math.random()-.5)*r*2,i.normalize(),this.aimAssist&&this.isTouch){const c=t.findAimAssist(n,i,.1,55);if(c){const h=c.point.clone().sub(n).normalize();i.lerp(h,.62).normalize()}}const a=t.raycast(n,i,120),o=this.getMuzzleWorld(e);if(a){this.fx.tracer(o,a.point);const c=a.zombie.hit(34,a.part,i,a.point);this.onHit?.({...a,...c})}else{const c=t.world.raycast(n,i,120);c?(this.fx.tracer(o,c.point),this.fx.impact(c.point,c.normal)):this.fx.tracer(o,n.clone().addScaledVector(i,90)),this.onHit?.({miss:!0})}const l=this.eject.getWorldPosition(new Hi);return l.applyMatrix4(e.matrixWorld),this.fx.shell(l,new Hi(1,.2,.1).applyQuaternion(e.quaternion)),!0}getMuzzleWorld(e){return this.muzzle.getWorldPosition(new Hi).applyMatrix4(e.matrixWorld)}startReload(){if(this.reloading||this.drawing||this.mag>=this.magSize||this.reserve<=0)return!1;this.reloading=!0,this.reloadT=0,this.reloadDuration=1.75,this.audio?.reload(),this.onReloadStart?.();const e=this.mag===0&&this.reloadEmptyAction?this.reloadEmptyAction:this.reloadAction;return e&&(this.reloadDuration=e.getClip().duration,e.reset().setLoop(ws,1).play()),!0}_finishReload(){if(!this.reloading)return;this.reloading=!1;const e=Math.min(this.magSize-this.mag,this.reserve);this.mag+=e,this.reserve-=e,this.onAmmo?.(this.mag,this.reserve),this.onReloadEnd?.()}addAmmo(e){this.reserve=Math.min(999,this.reserve+e),this.onAmmo?.(this.mag,this.reserve)}update(e,t,n,i){if(!this.ready)return;this.mixer.update(e),this.cooldown=Math.max(0,this.cooldown-e),this.spread=Math.max(0,this.spread-e*.045),this.reloading&&(this.reloadT+=e,this.reloadT>this.reloadDuration+.1&&this._finishReload()),this.drawing&&(this.drawT+=e,this.drawT>=this.drawDuration&&(this.drawing=!1)),this.recoil=Math.max(0,this.recoil-e*9),this.recoilRot=Math.max(0,this.recoilRot-e*10),this.swayTarget.x+=(n.x*.55-this.swayTarget.x)*Math.min(1,e*12),this.swayTarget.y+=(n.y*.55-this.swayTarget.y)*Math.min(1,e*12),this.sway.lerp(this.swayTarget,Math.min(1,e*14)),this.bobT+=e*(1.2+t*1.7);const r=Math.min(.012,t*.0035),a=Math.sin(this.bobT)*r,o=Math.abs(Math.cos(this.bobT))*r*.8,l=Math.sin(performance.now()*.0012)*.0035,c=this.reloading?Math.sin(Math.min(1,this.reloadT/this.reloadDuration)*Math.PI)*.06:0,h=this.drawing?(1-Math.min(1,this.drawT/this.drawDuration))*.22:0;this.holder.position.set(this.basePos.x+this.sway.x*.018+a,this.basePos.y-this.sway.y*.014+o+l-c-h,this.basePos.z+this.recoil*.075),this.holder.rotation.set(this.baseRot.x+this.recoilRot*.09-this.sway.y*.06+c*1.2,this.baseRot.y-this.sway.x*.1,this.baseRot.z+this.sway.x*.06+(this.reloading?.1:0)-h*.7),this.flashT>0&&(this.flashT-=e,this.flashSprite.material.opacity=Math.max(0,this.flashT/.05),this.flashLight.intensity=Math.max(0,this.flashT/.05*9),this.flashSprite.position.copy(this.muzzle.position).add(this.holder.position),this.flashT<=0&&(this.flashSprite.visible=!1,this.flashLight.intensity=0))}resize(e){this.viewCamera.aspect=e,this.viewCamera.updateProjectionMatrix()}reset(){this.mag=this.magSize,this.reserve=180,this.reloading=!1,this.drawing=!1,this.cooldown=0,this.recoil=0,this.recoilRot=0,this.spread=0,this.onAmmo?.(this.mag,this.reserve)}}const st=s=>document.getElementById(s);class xy{constructor(){this.el={loading:st("loading"),loadingFill:st("loading-fill"),loadingStatus:st("loading-status"),loadingTip:st("loading-tip"),title:st("title-screen"),hud:st("hud"),pause:st("pause-screen"),death:st("death-screen"),credits:st("credits-screen"),settings:st("settings-screen"),healthFill:st("health-fill"),healthGhost:st("health-ghost"),healthNum:st("health-num"),armorFill:st("armor-fill"),waveNum:st("wave-num"),zombiesLeft:st("zombies-left"),score:st("score-num"),kills:st("kills-num"),headshots:st("headshots-num"),ammoMag:st("ammo-mag"),ammoReserve:st("ammo-reserve"),ammoPips:st("ammo-pips"),crosshair:st("crosshair"),hitmarker:st("hitmarker"),headshotBadge:st("headshot-badge"),killFeed:st("kill-feed"),waveBanner:st("wave-banner"),wbKicker:st("wb-kicker"),wbTitle:st("wb-title"),wbSub:st("wb-sub"),damageFlash:st("damage-flash"),lowHealth:st("low-health"),prompt:st("prompt"),fps:st("fps-meter"),pauseStats:st("pause-stats"),deathStats:st("death-stats"),deathQuote:st("death-quote"),mobileControls:st("mobile-controls")},this._pips=[];for(let e=0;e<30;e++){const t=document.createElement("i");this.el.ammoPips.appendChild(t),this._pips.push(t)}this._damageTimer=0,this._hitTimer=0,this._lastHp=100,this._ghostTimer=0}setLoading(e,t){this.el.loadingFill.style.width=`${Math.round(e*100)}%`,t&&(this.el.loadingStatus.textContent=t)}hideLoading(){this.el.loading.classList.add("hidden")}showTitle(){this.el.title.classList.remove("hidden"),this.el.hud.classList.add("hidden"),document.body.classList.remove("in-game")}hideTitle(){this.el.title.classList.add("hidden")}showHUD(){this.el.hud.classList.remove("hidden"),document.body.classList.add("in-game")}hideHUD(){this.el.hud.classList.add("hidden"),document.body.classList.remove("in-game")}setHealth(e,t=100){const n=Math.max(0,Math.min(1,e/t));this.el.healthFill.style.width=`${n*100}%`,this.el.healthNum.textContent=Math.ceil(e),n<.34?(this.el.healthNum.style.color="#ff5a45",this.el.lowHealth.style.opacity="1"):(this.el.healthNum.style.color="",this.el.lowHealth.style.opacity="0"),e<this._lastHp?(this.el.healthGhost.style.transition="none",this.el.healthGhost.style.width=`${this._lastHp/t*100}%`,requestAnimationFrame(()=>{this.el.healthGhost.style.transition="width 0.8s ease-out 0.25s",this.el.healthGhost.style.width=`${n*100}%`})):this.el.healthGhost.style.width=`${n*100}%`,this._lastHp=e}setArmor(e){this.el.armorFill.style.width=`${Math.max(0,Math.min(1,e))*100}%`}setAmmo(e,t){this.el.ammoMag.textContent=e,this.el.ammoReserve.textContent=t,this.el.ammoMag.classList.toggle("low",e<=6);for(let n=0;n<this._pips.length;n++)this._pips[n].classList.toggle("empty",n>=e)}setWave(e,t){this.el.waveNum.textContent=String(e).padStart(2,"0"),this.el.zombiesLeft.textContent=t}setScore(e,t,n){this.el.score.textContent=String(e).padStart(6,"0"),this.el.kills.textContent=t,this.el.headshots.textContent=n}hitmarker(e=""){const t=this.el.hitmarker;t.classList.remove("show","kill","head"),t.offsetWidth,e==="kill"&&t.classList.add("kill"),e==="head"&&t.classList.add("head"),t.classList.add("show"),clearTimeout(this._hitTimer),this._hitTimer=setTimeout(()=>t.classList.remove("show"),110)}headshot(){const e=this.el.headshotBadge;e.classList.remove("show"),e.offsetWidth,e.classList.add("show")}damage(e=20){this.el.damageFlash.style.opacity=Math.min(.9,.25+e/70),clearTimeout(this._damageTimer),this._damageTimer=setTimeout(()=>{this.el.damageFlash.style.opacity="0"},120)}feed(e){const t=document.createElement("div");for(t.className="feed-item",t.innerHTML=e,this.el.killFeed.appendChild(t),setTimeout(()=>t.remove(),3900);this.el.killFeed.children.length>5;)this.el.killFeed.firstChild.remove()}banner(e,t,n){this.el.wbKicker.textContent=e,this.el.wbTitle.textContent=t,this.el.wbSub.textContent=n;const i=this.el.waveBanner;i.classList.remove("show"),i.offsetWidth,i.classList.add("show")}prompt(e,t=!0){this.el.prompt.textContent=e,this.el.prompt.classList.toggle("show",t)}crosshairSpread(e){this.el.crosshair.style.setProperty("--spread",`${e}px`)}setCrosshairVisible(e){this.el.crosshair.style.opacity=e?"0.9":"0"}showPause(e){this.el.pauseStats.innerHTML=e,this.el.pause.classList.remove("hidden")}hidePause(){this.el.pause.classList.add("hidden")}showDeath(e,t){this.el.deathStats.innerHTML=e,t&&(this.el.deathQuote.textContent=t),this.el.death.classList.remove("hidden")}hideDeath(){this.el.death.classList.add("hidden")}showCredits(){this.el.credits.classList.remove("hidden")}hideCredits(){this.el.credits.classList.add("hidden")}showSettings(){this.el.settings.classList.remove("hidden")}hideSettings(){this.el.settings.classList.add("hidden")}setFps(e){this.el.fps.textContent=e}setPromptAmmo(){}}const Dn=I,hc=(s,e,t)=>Math.max(e,Math.min(t,s)),li=(s,e,t)=>s+(e-s)*t,vy={uniforms:{tDiffuse:{value:null},uTime:{value:0},uResolution:{value:new J(1,1)},uDamage:{value:0},uFlash:{value:0},uDeath:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform float uDamage;
    uniform float uFlash;
    uniform float uDeath;
    varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main() {
      vec2 cc = vUv - 0.5;
      float r2 = dot(cc, cc);
      vec2 uv = 0.5 + cc * (1.0 + r2 * 0.022);
      float ca = (0.0008 + r2 * 0.0045) * (1.0 + uDamage * 1.4);
      vec3 col;
      col.r = texture2D(tDiffuse, uv + cc * ca).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - cc * ca).b;

      // cinematic teal shadows / warm highlights
      float lum = dot(col, vec3(0.299, 0.587, 0.114));
      vec3 shadowTint = vec3(0.82, 0.94, 1.08);
      vec3 highTint = vec3(1.07, 1.01, 0.92);
      col *= mix(shadowTint, highTint, smoothstep(0.05, 0.75, lum));
      col = mix(col, vec3(lum), 0.08);

      // vignette
      float vig = smoothstep(0.92, 0.22, length(cc) * 1.32);
      col *= mix(0.42, 1.0, vig);

      // film grain
      float n = hash(uv * uResolution + fract(uTime) * 91.7);
      col += (n - 0.5) * (0.045 + uDamage * 0.04);

      // subtle scanlines
      col *= 1.0 - 0.022 * sin(uv.y * uResolution.y * 1.7);

      // damage / lightning / death
      col = mix(col, vec3(0.32, 0.015, 0.015), uDamage * 0.28);
      col += vec3(0.5, 0.62, 0.78) * uFlash * 0.55;
      col = mix(col, vec3(0.02, 0.0, 0.0), uDeath * 0.55);
      gl_FragColor = vec4(max(col, 0.0), 1.0);
    }
  `},pi=document.getElementById("game-canvas"),on=matchMedia("(pointer: coarse)").matches||"ontouchstart"in window;on&&document.body.classList.add("touch");const Re=new xy,Xt=new NM,Nt=new pM({canvas:pi,antialias:!1,alpha:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0});Nt.setSize(window.innerWidth,window.innerHeight);Nt.setPixelRatio(Math.min(window.devicePixelRatio||1,on?1.25:1.75));Nt.outputColorSpace=Bt;Nt.toneMapping=to;Nt.toneMappingExposure=1.05;Nt.shadowMap.enabled=!0;Nt.shadowMap.type=td;Nt.autoClear=!1;const es=new Lc;es.background=new De(329740);const gt=new tn(72,window.innerWidth/window.innerHeight,.05,220);gt.rotation.order="YXZ";gt.position.set(0,1.7,9);const Jn=new LM(es,Nt),Nn=new DM(es,Jn,gt),Kt=new py(es,Jn,Nn,Xt),et=new _y(Nt,gt,Nn,Xt);et.attachEnvironment(es.environment);const Fi=new vM(Nt),My=new Jd(es,gt);Fi.addPass(My);const Zc=new Jd(et.viewScene,et.viewCamera);Zc.clear=!1;Zc.clearDepth=!0;Fi.addPass(Zc);const Sr=new zs(new J(window.innerWidth/2,window.innerHeight/2),.42,.55,.82);Fi.addPass(Sr);const qn=new Kc(vy);Fi.addPass(qn);const $c=new Kc(SM);$c.material.uniforms.resolution.value.set(1/(window.innerWidth*Nt.getPixelRatio()),1/(window.innerHeight*Nt.getPixelRatio()));Fi.addPass($c);const yy=new yM;Fi.addPass(yy);const ae={state:"loading",wave:0,waveActive:!1,spawnQueue:0,spawnTimer:0,intermission:0,kills:0,headshots:0,score:0,shots:0,hits:0,time:0,quality:"auto",gore:!0,autoQualityDone:!1},le={pos:new Dn(0,1.7,8.5),yaw:0,pitch:-.02,health:100,maxHealth:100,armor:100,alive:!0,radius:.36,speed:0,bob:0,bobT:0,aliveTime:0,hurtCooldown:0,lowHealthTimer:0,damage(s,e){if(!le.alive||ae.state!=="playing")return;const t=Math.min(le.armor,s*.62);le.armor-=t;const n=s-t;le.health-=n,le.hurtCooldown=.25,Re.damage(s),Re.setHealth(Math.max(0,le.health)),Re.setArmor(le.armor/100),Xt.playerHurt(),Yn=Math.min(3.5,Yn+1.4),qn.uniforms.uDamage.value=1,le.health<=0&&(le.health=0,Ty())},reset(){le.pos.set(0,1.7,8.5),le.yaw=0,le.pitch=-.02,le.health=100,le.armor=100,le.alive=!0,le.aliveTime=0,le.speed=0,le.hurtCooldown=0,Re.setHealth(100),Re.setArmor(1)}};let Yn=0,Ba=0,za=0,Un=!1,ks={x:0,y:0},In={x:0,y:0},Jc=!1,Ja=null,Qa=null,Es={x:0,y:0},Or=1,Ju=0,Ra=0,sl=0,rl=0,Ca=0,al=0,Vs=0;const At={sensitivity:1,quality:"auto",gore:!0,assist:!0};try{Object.assign(At,JSON.parse(localStorage.getItem("dead-signal-settings")||"{}"))}catch{}Or=At.sensitivity;et.aimAssist=At.assist;ae.gore=At.gore;Nn.goreEnabled=At.gore;function lo(){try{localStorage.setItem("dead-signal-settings",JSON.stringify(At))}catch{}}const Qu=["Tip: Aim for the head. It saves ammo — and it sends a message.","Tip: Sprinting keeps you alive. Standing still makes you a target.","Tip: Reload behind cover. The dead do not respect a fair fight.","Tip: Watch the ammo pips. A dry click is the loudest sound in the world.","Tip: Keep moving. They are slower than you — until they are not."];Re.el.loadingTip.textContent=Qu[Math.random()*Qu.length|0];async function Sy(){Re.setLoading(.08,"GENERATING TERRAIN"),await new Promise(i=>requestAnimationFrame(i)),Re.setLoading(.22,"COOKING PBR SURFACES"),await new Promise(i=>setTimeout(i,40));let s=0,e=0;const t=()=>{const i=.28+(s*.4+e*.32);Re.setLoading(Math.min(.97,i),s<.99?"RECOVERING BIOMASS":e<.99?"ASSEMBLING M4A1":"SYNCING OPTICS")};try{await Promise.all([Kt.load(i=>{s=i,t()}),et.load(i=>{e=i,t()})]),et.attachEnvironment(es.environment)}catch(i){console.error(i),Re.el.loadingStatus.textContent="ASSET RECOVERY FAILED",Re.el.loadingTip.textContent="Could not load the 3D models. Check the console for details.";return}Re.setLoading(1,"SIGNAL ACQUIRED"),await new Promise(i=>setTimeout(i,420)),Re.hideLoading(),et.holder.visible=!1,of(),ae.state="menu",Re.showTitle(),Hr(At.quality,!0),Wr(),window.__deadSignal.ready=!0;const n=new URLSearchParams(location.search);(n.get("autostart")==="1"||n.get("play")==="1")&&setTimeout(()=>co(!1),350)}function of(){Kt.clear(),Nn.reset();const s=Kt.spawnShowcase(new Dn(3.55,0,1.35));s&&(s.root.rotation.y=Math.atan2(-3.55,8.4-1.35),s.targetHeight=1.88,s.visual.scale.setScalar(s.targetHeight/Kt.baseHeight));const e=Kt.spawnShowcase(new Dn(-4.8,0,-4.5));e&&(e.root.rotation.y=Math.atan2(4.8,8.4+4.5));const t=Kt.spawnShowcase(new Dn(7.8,0,-7.5));t&&(t.root.rotation.y=Math.atan2(-7.8,8.4+7.5)),gt.position.set(.35,1.7,8.4),gt.lookAt(2.1,1.16,.8)}function lf(){Kt.clear(),Nn.reset(),et.reset(),le.reset(),ae.wave=0,ae.waveActive=!1,ae.spawnQueue=0,ae.spawnTimer=0,ae.intermission=0,ae.kills=0,ae.headshots=0,ae.score=0,ae.shots=0,ae.hits=0,ae.time=0,Re.setScore(0,0,0),Re.setWave(0,0),Re.setAmmo(et.mag,et.reserve),qn.uniforms.uDeath.value=0}function co(s=!0){window.__deadSignal.ready&&(Xt.resume(),Xt.uiClick(),lf(),Re.hideLoading(),Re.hideTitle(),Re.hideDeath(),Re.hidePause(),Re.showHUD(),Re.setHealth(100),Re.setArmor(1),Re.setScore(0,0,0),Re.setAmmo(30,180),et.holder.visible=!0,et.start(),le.alive=!0,le.pos.set(0,1.7,8.5),le.yaw=0,le.pitch=-.02,gt.position.copy(le.pos),ae.state="playing",ae.intermission=0,ae.wave=0,ae.time=0,Qc(1),Re.prompt(on?"":"CLICK TO LOCK MOUSE",!on),Vs=3,!on&&s===!0&&pi.requestPointerLock?.())}function Qc(s){ae.wave=s,ae.waveActive=!0;const e=4+Math.floor(s*1.7);ae.spawnQueue=Math.min(22,e+(s%3===0?2:0)),ae.spawnTimer=.7,ae.intermission=0;const t=s%5===0;Re.banner(t?"ELITE SIGNAL DETECTED":"INCOMING",`WAVE ${String(s).padStart(2,"0")}`,t?"SURVIVE THE ELITE":s===1?"HOLD THE LINE":"THEY KEEP COMING"),Re.setWave(s,ae.spawnQueue),Xt.thunder(),t&&setTimeout(()=>{ae.state==="playing"&&eh(!0)},900)}function eh(s=!1){const e=Jn.spawnPoints;let t=e[0],n=-1;for(const c of e){const h=c.distanceToSquared(le.pos),u=Math.random()*30;h+u>n&&(n=h+u,t=c)}const i=t.clone();i.x+=(Math.random()-.5)*3.5,i.z+=(Math.random()-.5)*3.5;const r=s,a=ae.wave,o=!r&&Math.random()<Math.min(.45,.12+a*.035),l=Kt.spawn(i,{health:r?520+a*75:90+a*20+(o?-20:20),speed:r?1:(o?2.55:1.12)+a*.045,damage:r?32:11+a*1.15,runner:o,boss:r,scale:r?1.35:.94+Math.random()*.14});if(l){l.root.rotation.y=Math.atan2(le.pos.x-i.x,le.pos.z-i.z);for(let c=0;c<16;c++)Nn.dust.spawn(new Dn(i.x+(Math.random()-.5)*.8,.15+Math.random()*.7,i.z+(Math.random()-.5)*.8),new Dn((Math.random()-.5)*1.6,.6+Math.random()*1.8,(Math.random()-.5)*1.6),.16+Math.random()*.3,.7+Math.random()*.8)}}function by(s){if(ae.state!=="playing")return;if(!ae.waveActive){ae.intermission-=s,ae.intermission<=0&&Qc(ae.wave+1);return}const e=Kt.zombies.filter(n=>!n.dead).length;if(ae.spawnQueue>0){ae.spawnTimer-=s;const n=on?8:11;ae.spawnTimer<=0&&e<n&&(eh(!1),ae.spawnQueue--,ae.spawnTimer=Math.max(.25,.85-ae.wave*.03)+Math.random()*.45)}const t=ae.spawnQueue+e;if(Re.setWave(ae.wave,t),ae.spawnQueue===0&&e===0){ae.waveActive=!1,ae.intermission=5.5;const n=ae.wave*500;ae.score+=n,Re.setScore(ae.score,ae.kills,ae.headshots),Re.banner("AREA SECURE","WAVE CLEAR",`+${n} BONUS · RESUPPLY INBOUND`),Re.feed(`<span class="hs">WAVE CLEAR</span> · +${n}`),et.addAmmo(90),le.health=Math.min(100,le.health+18),le.armor=Math.min(100,le.armor+25),Re.setHealth(le.health),Re.setArmor(le.armor/100),Xt.thunder()}}function Ty(){if(ae.state!=="playing")return;le.alive=!1,ae.state="dead",et.setEnabled(!1),Un=!1,Re.setCrosshairVisible(!1),qn.uniforms.uDeath.value=1,Xt.zombieDeath();const s=ae.shots?Math.round(ae.hits/ae.shots*100):0;setTimeout(()=>{Re.showDeath(`<div><b>${ae.wave}</b><span>WAVE</span></div><div><b>${ae.kills}</b><span>KILLS</span></div><div><b>${ae.headshots}</b><span>HEADSHOTS</span></div>`,s>=60?"Good shooting, operator. It was not enough.":"The signal went quiet.")},900)}function cf(){Xt.uiClick(),Re.hideDeath(),Re.setCrosshairVisible(!0),co()}function hf(){Xt.uiClick(),Re.hideDeath(),Re.hidePause(),Re.hideHUD(),Re.setCrosshairVisible(!0),et.setEnabled(!1),et.holder.visible=!1,lf(),ae.state="menu",of(),Re.showTitle(),qn.uniforms.uDeath.value=0}function th(){if(ae.state!=="playing")return;ae.state="paused",Un=!1,et.setEnabled(!1);const s=ae.shots?Math.round(ae.hits/ae.shots*100):0;Re.showPause(`<div><b>${ae.wave}</b><span>WAVE</span></div><div><b>${ae.kills}</b><span>KILLS</span></div><div><b>${ae.headshots}</b><span>HEADSHOTS</span></div><div><b>${s}%</b><span>ACCURACY</span></div>`),document.pointerLockElement&&document.exitPointerLock()}function nh(){ae.state==="paused"&&(Xt.uiClick(),Re.hidePause(),ae.state="playing",et.setEnabled(!0),on||pi.requestPointerLock?.())}const dn=new Set;window.addEventListener("keydown",s=>{if(s.code==="Escape"){ae.state==="playing"?th():ae.state==="paused"&&nh();return}ae.state==="playing"&&(dn.add(s.code),s.code==="KeyR"&&et.startReload(),s.code==="Space"&&(Un=!0,s.preventDefault()))});window.addEventListener("keyup",s=>{dn.delete(s.code),s.code==="Space"&&(Un=!1)});window.addEventListener("blur",()=>{dn.clear(),Un=!1});pi.addEventListener("mousedown",s=>{ae.state==="playing"&&(Jc=!0,s.button===0&&(Un=!0),!on&&document.pointerLockElement!==pi&&(pi.requestPointerLock?.(),Vs=0))});window.addEventListener("mouseup",()=>{Jc=!1,Un=!1});pi.addEventListener("contextmenu",s=>s.preventDefault());document.addEventListener("mousemove",s=>{if(!(ae.state!=="playing"||on)){if(document.pointerLockElement===pi){const e=.0019*Or;le.yaw-=s.movementX*e,le.pitch-=s.movementY*e,le.pitch=hc(le.pitch,-1.32,1.32),In.x+=s.movementX*e,In.y+=s.movementY*e,Vs=0}else if(Jc){const e=.0022*Or;le.yaw-=s.movementX*e,le.pitch-=s.movementY*e,le.pitch=hc(le.pitch,-1.32,1.32),In.x+=s.movementX*e,In.y+=s.movementY*e}}});document.addEventListener("pointerlockchange",()=>{ae.state==="playing"&&!on&&(Vs=document.pointerLockElement===pi?0:4)});const Ks=document.getElementById("joystick-zone"),uf=document.getElementById("joystick-knob"),Gr=document.getElementById("look-zone"),Zi=document.getElementById("fire-btn"),Ey=document.getElementById("reload-btn");function wy(s){ae.state==="playing"&&(Ja=s.pointerId,Ks.setPointerCapture?.(s.pointerId),df(s),s.preventDefault())}function df(s){if(s.pointerId!==Ja)return;const e=Ks.getBoundingClientRect(),t=e.left+e.width/2,n=e.top+e.height/2;let i=s.clientX-t,r=s.clientY-n;const a=e.width*.34,o=Math.hypot(i,r);o>a&&(i=i/o*a,r=r/o*a),uf.style.transform=`translate(${i}px, ${r}px)`,ks.x=i/a,ks.y=-r/a,s.preventDefault()}function ff(s){s.pointerId===Ja&&(Ja=null,ks.x=0,ks.y=0,uf.style.transform="translate(0px, 0px)")}Ks?.addEventListener("pointerdown",wy);Ks?.addEventListener("pointermove",df);Ks?.addEventListener("pointerup",ff);Ks?.addEventListener("pointercancel",ff);function Ay(s){ae.state==="playing"&&(Qa=s.pointerId,Es.x=s.clientX,Es.y=s.clientY,Gr.setPointerCapture?.(s.pointerId),s.preventDefault())}function Ry(s){if(s.pointerId!==Qa||ae.state!=="playing")return;const e=s.clientX-Es.x,t=s.clientY-Es.y;Es.x=s.clientX,Es.y=s.clientY;const n=.0034*Or;le.yaw-=e*n,le.pitch-=t*n,le.pitch=hc(le.pitch,-1.32,1.32),In.x+=e*n,In.y+=t*n,s.preventDefault()}function pf(s){s.pointerId===Qa&&(Qa=null)}Gr?.addEventListener("pointerdown",Ay);Gr?.addEventListener("pointermove",Ry);Gr?.addEventListener("pointerup",pf);Gr?.addEventListener("pointercancel",pf);Zi?.addEventListener("pointerdown",s=>{ae.state==="playing"&&(Un=!0,Zi.classList.add("active"),Zi.setPointerCapture?.(s.pointerId),s.preventDefault())});function ih(s){Un=!1,Zi.classList.remove("active")}Zi?.addEventListener("pointerup",ih);Zi?.addEventListener("pointercancel",ih);Zi?.addEventListener("pointerleave",s=>{s.buttons===0&&ih()});Ey?.addEventListener("pointerdown",s=>{s.preventDefault(),ae.state==="playing"&&et.startReload()});function Cy(s){le.aliveTime+=s;const e=new Dn(-Math.sin(le.yaw),0,-Math.cos(le.yaw)),t=new Dn(Math.cos(le.yaw),0,-Math.sin(le.yaw));let n=ks.x,i=ks.y;on||(n=(dn.has("KeyD")||dn.has("ArrowRight")?1:0)-(dn.has("KeyA")||dn.has("ArrowLeft")?1:0),i=(dn.has("KeyW")||dn.has("ArrowUp")?1:0)-(dn.has("KeyS")||dn.has("ArrowDown")?1:0));const r=new Dn().addScaledVector(t,n).addScaledVector(e,i),a=r.length();a>1&&r.divideScalar(a);const l=(!on&&(dn.has("ShiftLeft")||dn.has("ShiftRight"))?6.4:4.15)*(et.reloading?.82:1),c=r.multiplyScalar(l),h=le.speed>l?12:9;le.velX=li(le.velX||0,c.x,Math.min(1,s*h)),le.velZ=li(le.velZ||0,c.z,Math.min(1,s*h));const u=le.pos.clone();u.x+=le.velX*s,u.z+=le.velZ*s,Jn.resolveCircle(u,le.radius),le.pos.x=u.x,le.pos.z=u.z,le.speed=Math.hypot(le.velX,le.velZ),le.speed>.2&&(le.bobT+=s*(4.6+le.speed*.9)),le.bob=Math.sin(le.bobT)*Math.min(.035,le.speed*.006),le.bobSide=Math.cos(le.bobT*.5)*Math.min(.02,le.speed*.003),gt.position.set(le.pos.x+le.bobSide,1.68+le.bob,le.pos.z);const d=(Math.random()-.5)*Yn*.006,f=(Math.random()-.5)*Yn*.006;gt.rotation.set(le.pitch+Ba+f,le.yaw+za+d,Math.sin(le.bobT*.5)*Math.min(.012,le.speed*.002)+d*.3),gt.updateMatrixWorld(),Yn=Math.max(0,Yn-s*5.5),Ba=li(Ba,0,Math.min(1,s*9)),za=li(za,0,Math.min(1,s*9)),In.x=li(In.x,0,Math.min(1,s*16)),In.y=li(In.y,0,Math.min(1,s*16)),le.health<36&&(al-=s,al<=0&&(al=1.05,Xt.heartbeat(1.4-le.health/40)));const g=5+et.spread*620+Math.min(6,le.speed*.7);Re.crosshairSpread(g),et.reloading?Re.prompt("RELOADING",!0):et.mag===0&&et.reserve===0?Re.prompt("OUT OF AMMO",!0):et.mag<=6?Re.prompt(on?"TAP RELOAD":"PRESS R TO RELOAD",!0):Vs>0?(Vs-=s,Re.prompt("CLICK TO LOCK MOUSE",!0)):Re.prompt("",!1)}function Py(s){gt.position.y=li(gt.position.y,.6,Math.min(1,s*1.2)),gt.rotation.z=li(gt.rotation.z,.5,Math.min(1,s*.8)),gt.rotation.x=li(gt.rotation.x,.15,Math.min(1,s*.6)),gt.updateMatrixWorld()}function Iy(s){Ju+=s;const e=Ju;gt.position.set(.35+Math.sin(e*.11)*.22,1.68+Math.sin(e*.27)*.018,8.4+Math.cos(e*.09)*.12),gt.lookAt(2.05+Math.sin(e*.07)*.08,1.14,.8),gt.rotation.z+=Math.sin(e*.23)*.004,gt.updateMatrixWorld(),Kt.update(s,new Dn(0,1.7,20),le),Nn.update(s),Jn.update(s,gt),et.update(s,0,{x:0,y:0},!1)}let ed=performance.now();function mf(s){requestAnimationFrame(mf);const e=Math.min(.05,Math.max(.001,(s-ed)/1e3));ed=s,Ly(e),Dy(),Ny(e)}function Ly(s){if(ae.time+=s,qn.uniforms.uTime.value=ae.time,qn.uniforms.uDamage.value=Math.max(0,qn.uniforms.uDamage.value-s*2.4),qn.uniforms.uFlash.value=Jn.flashOverlay,Jn.update(s,gt),ae.state==="menu"){Iy(s);return}if(ae.state!=="paused"){if(ae.state==="dead"){Kt.update(s,le.pos,le),Nn.update(s),et.update(s,0,{x:0,y:0},!1),Py(s);return}Cy(s),Un&&et.fire(gt,Kt)&&ae.shots++,et.update(s,le.speed,In,Un),Kt.update(s,le.pos,le),by(s),Nn.update(s)}}function Dy(){const s=window.innerWidth,e=window.innerHeight;et.viewCamera.aspect=s/e,et.viewCamera.fov=gt.fov,et.viewCamera.updateProjectionMatrix(),Fi.render()}function Ny(s){Ra+=s,sl++,Ra>.5&&(rl=Math.round(sl/Ra),Re.setFps(`${rl} FPS`),sl=0,Ra=0,ae.quality==="auto"&&!ae.autoQualityDone&&ae.state==="playing"&&(rl<38?(Ca+=.5,Ca>4&&(Hr("low"),ae.autoQualityDone=!0)):Ca=Math.max(0,Ca-.5)))}function Hr(s,e=!1){ae.quality=s;let t=s;if(s==="auto"){const n=navigator.hardwareConcurrency||4,i=navigator.deviceMemory||4;t=on?n>=6&&i>=4?"high":"low":n>=4?"high":"low"}t==="high"?(Nt.setPixelRatio(Math.min(window.devicePixelRatio||1,on?1.3:1.8)),Sr.enabled=!0,Sr.strength=.42,Jn.moon.castShadow=!0,Nt.shadowMap.enabled=!0):(Nt.setPixelRatio(Math.min(window.devicePixelRatio||1,1)),Sr.enabled=!1,Jn.moon.castShadow=!1,Nt.shadowMap.enabled=!0),sh(),e||(At.quality=s,lo(),Wr())}function sh(){const s=window.innerWidth,e=window.innerHeight;gt.aspect=s/e,gt.updateProjectionMatrix(),et.resize(s/e),Nt.setSize(s,e),Fi.setSize(s,e),Sr.setSize(s/2,e/2);const t=Nt.getPixelRatio();$c.material.uniforms.resolution.value.set(1/(s*t),1/(e*t)),qn.uniforms.uResolution.value.set(s*t,e*t)}window.addEventListener("resize",sh);sh();function Wr(){const s=document.getElementById("sens-title"),e=document.getElementById("sens-out"),t=document.getElementById("sens-pause"),n=document.getElementById("quality-title"),i=document.getElementById("quality-pause"),r=document.getElementById("gore-toggle"),a=document.getElementById("assist-toggle");s&&(s.value=At.sensitivity),e&&(e.textContent=Number(At.sensitivity).toFixed(2)),t&&(t.value=At.sensitivity),n&&(n.value=At.quality),i&&(i.value=At.quality),r&&(r.checked=At.gore),a&&(a.checked=At.assist)}function gf(s){At.sensitivity=Number(s),Or=At.sensitivity,lo(),Wr()}function Uy(s){At.gore=!!s,ae.gore=At.gore,Nn.goreEnabled=At.gore,lo(),Wr()}function Fy(s){At.assist=!!s,et.aimAssist=At.assist,lo(),Wr()}document.getElementById("deploy-btn")?.addEventListener("click",co);document.getElementById("credits-btn")?.addEventListener("click",()=>{Xt.resume(),Xt.uiClick(),Re.showCredits()});document.getElementById("credits-close")?.addEventListener("click",()=>{Xt.uiClick(),Re.hideCredits()});document.getElementById("settings-btn-title")?.addEventListener("click",()=>{Xt.resume(),Xt.uiClick(),Re.showSettings()});document.getElementById("settings-close")?.addEventListener("click",()=>{Xt.uiClick(),Re.hideSettings()});document.getElementById("pause-btn")?.addEventListener("click",th);document.getElementById("resume-btn")?.addEventListener("click",nh);document.getElementById("restart-btn-pause")?.addEventListener("click",()=>{Re.hidePause(),cf()});document.getElementById("retry-btn")?.addEventListener("click",cf);document.getElementById("menu-btn")?.addEventListener("click",hf);document.getElementById("sens-title")?.addEventListener("input",s=>gf(s.target.value));document.getElementById("sens-pause")?.addEventListener("input",s=>gf(s.target.value));document.getElementById("quality-title")?.addEventListener("change",s=>Hr(s.target.value));document.getElementById("quality-pause")?.addEventListener("change",s=>Hr(s.target.value));document.getElementById("gore-toggle")?.addEventListener("change",s=>Uy(s.target.checked));document.getElementById("assist-toggle")?.addEventListener("change",s=>Fy(s.target.checked));Kt.onKill=(s,e)=>{ae.kills++,e&&ae.headshots++;const t=s.isBoss?1e3:e?250:100;ae.score+=t,Re.setScore(ae.score,ae.kills,ae.headshots),Re.feed(e?`<b>HEADSHOT</b> · ${s.isBoss?"ELITE DOWN":"ZOMBIE DOWN"} <span class="hs">+${t}</span>`:`<b>KILL</b> · ${s.isBoss?"ELITE DOWN":"ZOMBIE DOWN"} +${t}`),s.isBoss&&Re.banner("TARGET ELIMINATED","ELITE DOWN","+1000"),navigator.vibrate&&navigator.vibrate(e?28:12)};Kt.onHeadshot=()=>{Re.headshot(),navigator.vibrate&&navigator.vibrate(16)};Kt.onPlayerHit=s=>le.damage(s,null);et.onAmmo=(s,e)=>Re.setAmmo(s,e);et.onReloadStart=()=>Re.prompt("RELOADING",!0);et.onReloadEnd=()=>Re.prompt("",!1);et.onShot=()=>{Ba+=.013+Math.random()*.004,za+=(Math.random()-.5)*.008,Yn=Math.min(1.4,Yn+.34)};et.onHit=s=>{s.miss||(ae.hits++,s.killed?Re.hitmarker("kill"):s.headshot?Re.hitmarker("head"):Re.hitmarker(""),s.killed&&(Yn=Math.min(2.5,Yn+.5)))};window.__deadSignal={ready:!1,game:ae,player:le,world:Jn,zombies:Kt,weapon:et,fx:Nn,ui:Re,audio:Xt,camera:gt,renderer:Nt,start:co,menu:hf,pause:th,resume:nh,spawn:eh,setQuality:Hr,wave:Qc,damage:s=>le.damage(s,null),killAll:()=>Kt.zombies.forEach(s=>s.hit(9999,"head",new Dn(0,0,-1),s.getHeadWorldPosition()))};Sy();requestAnimationFrame(mf);
