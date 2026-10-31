(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const oo="187",Ic=0,Uo=1,Nc=2,ws=1,Uc=2,ys=3,Rn=0,pi=1,ni=2,Tn=0,Es=1,We=2,Fo=3,Oo=4,Fc=5,$n=100,Oc=101,Bc=102,zc=103,kc=104,Gc=200,Hc=201,Vc=202,Wc=203,Gl=204,Hl=205,Xc=206,qc=207,Yc=208,$c=209,Kc=210,Zc=211,Jc=212,Qc=213,jc=214,_a=0,va=1,xa=2,Ts=3,Ma=4,Sa=5,ya=6,ba=7,Vl=0,eh=1,th=2,tn=0,lo=1,co=2,ho=3,Lr=4,uo=5,fo=6,po=7,Wl=300,es=301,As=302,pr=303,kr=304,Rs=1e3,en=1001,wa=1002,si=1003,ih=1004,Bs=1005,wi=1006,Gr=1007,pn=1008,Ci=1009,Xl=1010,ql=1011,Cs=1012,mo=1013,Yi=1014,Xi=1015,Ei=1016,go=1017,_o=1018,ts=1020,Yl=35902,$l=35899,Kl=1021,Zl=1022,qi=1023,vn=1026,mn=1027,Jl=1028,vo=1029,Cn=1030,xo=1031,Mo=1033,mr=33776,gr=33777,_r=33778,vr=33779,Ea=35840,Ta=35841,Aa=35842,Ra=35843,Ca=36196,Pa=37492,La=37496,Da=37488,Ia=37489,Sr=37490,Na=37491,Ua=37808,Fa=37809,Oa=37810,Ba=37811,za=37812,ka=37813,Ga=37814,Ha=37815,Va=37816,Wa=37817,Xa=37818,qa=37819,Ya=37820,$a=37821,Ka=36492,Za=36494,Ja=36495,Qa=36283,ja=36284,yr=36285,eo=36286,nh=3200,to=0,sh=1,fn="",ti="srgb",br="srgb-linear",wr="linear",pt="srgb",Hr=7680,rh=519,ah=512,oh=513,lh=514,Ql=515,ch=516,hh=517,jl=518,ec=519,tc=35044,Bo="300 es",Bi=2e3,Ps=2001;function dh(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Er(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function uh(){const s=Er("canvas");return s.style.display="block",s}const zo={};function Tr(...s){const e="THREE."+s.shift();console.log(e,...s)}function ic(s){const e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ve(...s){s=ic(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function at(...s){s=ic(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function Qn(...s){const e=s.join(" ");e in zo||(zo[e]=!0,Ve(...s))}function fh(s,e,t){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const ph={[_a]:_a,[xa]:ya,[Ma]:Ma,[Ts]:Sa,[va]:va,[ya]:xa,[ba]:ba,[Sa]:Ts};class Pn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const n=i[e];if(n!==void 0){const r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,e);e.target=null}}}const di=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Vr=Math.PI/180,io=180/Math.PI;function Ln(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(di[s&255]+di[s>>8&255]+di[s>>16&255]+di[s>>24&255]+"-"+di[e&255]+di[e>>8&255]+"-"+di[e>>16&15|64]+di[e>>24&255]+"-"+di[t&63|128]+di[t>>8&255]+"-"+di[t>>16&255]+di[t>>24&255]+di[i&255]+di[i>>8&255]+di[i>>16&255]+di[i>>24&255]).toLowerCase()}function st(s,e,t){return Math.max(e,Math.min(t,s))}function mh(s,e){return(s%e+e)%e}function Wr(s,e,t){return(1-t)*s+t*e}function gh(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Dr(s){switch(s.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function nc(s,e){if(e.constructor===Float32Array)return s;const t=Dr(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(s/t,-1)}function sc(s,e){if(e.constructor===Float32Array)return s;const t=Dr(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(s*t)}const Po=class Po{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(st(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(st(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),n=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*n+e.x,this.y=r*n+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Po.prototype.isVector2=!0;let Ae=Po;class rs{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,r,a,o){let l=i[n+0],c=i[n+1],d=i[n+2],u=i[n+3],h=r[a+0],p=r[a+1],_=r[a+2],M=r[a+3];if(u!==M||l!==h||c!==p||d!==_){let m=l*h+c*p+d*_+u*M;m<0&&(h=-h,p=-p,_=-_,M=-M,m=-m);let f=1-o;if(m<.9995){const v=Math.acos(m),w=Math.sin(v);f=Math.sin(f*v)/w,o=Math.sin(o*v)/w,l=l*f+h*o,c=c*f+p*o,d=d*f+_*o,u=u*f+M*o}else{l=l*f+h*o,c=c*f+p*o,d=d*f+_*o,u=u*f+M*o;const v=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=v,c*=v,d*=v,u*=v}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,n,r,a){const o=i[n],l=i[n+1],c=i[n+2],d=i[n+3],u=r[a],h=r[a+1],p=r[a+2],_=r[a+3];return e[t]=o*_+d*u+l*p-c*h,e[t+1]=l*_+d*h+c*u-o*p,e[t+2]=c*_+d*p+o*h-l*u,e[t+3]=d*_-o*u-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,n=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(n/2),u=o(r/2),h=l(i/2),p=l(n/2),_=l(r/2);switch(a){case"XYZ":this._x=h*d*u+c*p*_,this._y=c*p*u-h*d*_,this._z=c*d*_+h*p*u,this._w=c*d*u-h*p*_;break;case"YXZ":this._x=h*d*u+c*p*_,this._y=c*p*u-h*d*_,this._z=c*d*_-h*p*u,this._w=c*d*u+h*p*_;break;case"ZXY":this._x=h*d*u-c*p*_,this._y=c*p*u+h*d*_,this._z=c*d*_+h*p*u,this._w=c*d*u-h*p*_;break;case"ZYX":this._x=h*d*u-c*p*_,this._y=c*p*u+h*d*_,this._z=c*d*_-h*p*u,this._w=c*d*u+h*p*_;break;case"YZX":this._x=h*d*u+c*p*_,this._y=c*p*u+h*d*_,this._z=c*d*_-h*p*u,this._w=c*d*u-h*p*_;break;case"XZY":this._x=h*d*u-c*p*_,this._y=c*p*u-h*d*_,this._z=c*d*_+h*p*u,this._w=c*d*u+h*p*_;break;default:Ve("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],n=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],h=i+o+u;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(d-l)*p,this._y=(r-c)*p,this._z=(a-n)*p}else if(i>o&&i>u){const p=2*Math.sqrt(1+i-o-u);this._w=(d-l)/p,this._x=.25*p,this._y=(n+a)/p,this._z=(r+c)/p}else if(o>u){const p=2*Math.sqrt(1+o-i-u);this._w=(r-c)/p,this._x=(n+a)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+u-i-o);this._w=(a-n)/p,this._x=(r+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,n=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+a*o+n*c-r*l,this._y=n*d+a*l+r*o-i*c,this._z=r*d+a*c+i*l-n*o,this._w=a*d-i*o-n*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,n=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,n=-n,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+i*t,this._y=this._y*l+n*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+n*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(e),n*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Lo=class Lo{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ko.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ko.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*n,this.y=r[1]*t+r[4]*i+r[7]*n,this.z=r[2]*t+r[5]*i+r[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,n=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*n-o*i),d=2*(o*t-r*n),u=2*(r*i-a*t);return this.x=t+l*c+a*u-o*d,this.y=i+l*d+o*c-r*u,this.z=n+l*u+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n,this.y=r[1]*t+r[5]*i+r[9]*n,this.z=r[2]*t+r[6]*i+r[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(st(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,n=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=n*l-r*o,this.y=r*a-i*l,this.z=i*o-n*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Xr.copy(this).projectOnVector(e),this.sub(Xr)}reflect(e){return this.sub(Xr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(st(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Lo.prototype.isVector3=!0;let P=Lo;const Xr=new P,ko=new rs,Do=class Do{constructor(e,t,i,n,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,a,o,l,c)}set(e,t,i,n,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=n,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],d=i[4],u=i[7],h=i[2],p=i[5],_=i[8],M=n[0],m=n[3],f=n[6],v=n[1],w=n[4],b=n[7],E=n[2],T=n[5],g=n[8];return r[0]=a*M+o*v+l*E,r[3]=a*m+o*w+l*T,r[6]=a*f+o*b+l*g,r[1]=c*M+d*v+u*E,r[4]=c*m+d*w+u*T,r[7]=c*f+d*b+u*g,r[2]=h*M+p*v+_*E,r[5]=h*m+p*w+_*T,r[8]=h*f+p*b+_*g,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-i*r*d+i*o*l+n*r*c-n*a*l}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*a-o*c,h=o*l-d*r,p=c*r-a*l,_=t*u+i*h+n*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/_;return e[0]=u*M,e[1]=(n*c-d*i)*M,e[2]=(o*i-n*a)*M,e[3]=h*M,e[4]=(d*t-n*l)*M,e[5]=(n*r-o*t)*M,e[6]=p*M,e[7]=(i*l-c*t)*M,e[8]=(a*t-i*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-n*c,n*l,-n*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Qn("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(qr.makeScale(e,t)),this}rotate(e){return Qn("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(qr.makeRotation(-e)),this}translate(e,t){return Qn("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(qr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Do.prototype.isMatrix3=!0;let qe=Do;const qr=new qe,Go=new qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ho=new qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function _h(){const s={enabled:!0,workingColorSpace:br,spaces:{},convert:function(n,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===pt&&(n.r=nn(n.r),n.g=nn(n.g),n.b=nn(n.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[r].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===pt&&(n.r=jn(n.r),n.g=jn(n.g),n.b=jn(n.b))),n},workingToColorSpace:function(n,r){return this.convert(n,this.workingColorSpace,r)},colorSpaceToWorking:function(n,r){return this.convert(n,r,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===fn?wr:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,r=this.workingColorSpace){return n.fromArray(this.spaces[r].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,r,a){return n.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return s.define({[br]:{primaries:e,whitePoint:i,transfer:wr,toXYZ:Go,fromXYZ:Ho,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ti},outputColorSpaceConfig:{drawingBufferColorSpace:ti}},[ti]:{primaries:e,whitePoint:i,transfer:pt,toXYZ:Go,fromXYZ:Ho,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ti}}}),s}const nt=_h();function nn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function jn(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Dn;class vh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Dn===void 0&&(Dn=Er("canvas")),Dn.width=e.width,Dn.height=e.height;const n=Dn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),i=Dn}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Er("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const n=i.getImageData(0,0,e.width,e.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=nn(r[a]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(nn(t[i]/255)*255):t[i]=nn(t[i]);return{data:t,width:e.width,height:e.height}}else return Ve("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let xh=0;class So{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:xh++}),this.uuid=Ln(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(Yr(n[a].image)):r.push(Yr(n[a]))}else r=Yr(n);i.url=r}return t||(e.images[this.uuid]=i),i}}function Yr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?vh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ve("Texture: Unable to serialize Texture."),{})}let Mh=0;const $r=new P;class mi extends Pn{constructor(e=mi.DEFAULT_IMAGE,t=mi.DEFAULT_MAPPING,i=en,n=en,r=wi,a=pn,o=qi,l=Ci,c=mi.DEFAULT_ANISOTROPY,d=fn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Mh++}),this.uuid=Ln(),this.name="",this.source=new So(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ae(0,0),this.repeat=new Ae(1,1),this.center=new Ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize($r).x}get height(){return this.source.getSize($r).y}get depth(){return this.source.getSize($r).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ve(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){Ve(`Texture.setValues(): property '${t}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Wl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Rs:e.x=e.x-Math.floor(e.x);break;case en:e.x=e.x<0?0:1;break;case wa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Rs:e.y=e.y-Math.floor(e.y);break;case en:e.y=e.y<0?0:1;break;case wa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}mi.DEFAULT_IMAGE=null;mi.DEFAULT_MAPPING=Wl;mi.DEFAULT_ANISOTROPY=1;const Io=class Io{constructor(e=0,t=0,i=0,n=1){this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*n+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,r;const l=e.elements,c=l[0],d=l[4],u=l[8],h=l[1],p=l[5],_=l[9],M=l[2],m=l[6],f=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-M)<.01&&Math.abs(_-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+M)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,b=(p+1)/2,E=(f+1)/2,T=(d+h)/4,g=(u+M)/4,y=(_+m)/4;return w>b&&w>E?w<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(w),n=T/i,r=g/i):b>E?b<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(b),i=T/n,r=y/n):E<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(E),i=g/r,n=y/r),this.set(i,n,r,t),this}let v=Math.sqrt((m-_)*(m-_)+(u-M)*(u-M)+(h-d)*(h-d));return Math.abs(v)<.001&&(v=1),this.x=(m-_)/v,this.y=(u-M)/v,this.z=(h-d)/v,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this.w=st(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this.w=st(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(st(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Io.prototype.isVector4=!0;let It=Io;class Sh extends Pn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wi,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new It(0,0,e,t),this.scissorTest=!1,this.viewport=new It(0,0,e,t),this.textures=[];const n=i.count;for(let r=0;r<n;r++)this.textures[r]=new mi({width:e,height:t,depth:i.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:wi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=e,this.textures[n].image.height=t,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const n=Object.assign({},e.textures[t].image);this.textures[t].source=new So(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ti extends Sh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class rc extends mi{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=si,this.minFilter=si,this.wrapR=en,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class yh extends mi{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=si,this.minFilter=si,this.wrapR=en,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const Pr=class Pr{constructor(e,t,i,n,r,a,o,l,c,d,u,h,p,_,M,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,a,o,l,c,d,u,h,p,_,M,m)}set(e,t,i,n,r,a,o,l,c,d,u,h,p,_,M,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=n,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=d,f[10]=u,f[14]=h,f[3]=p,f[7]=_,f[11]=M,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pr().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,n=1/In.setFromMatrixColumn(e,0).length(),r=1/In.setFromMatrixColumn(e,1).length(),a=1/In.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,n=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),d=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const h=a*d,p=a*u,_=o*d,M=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=p+_*c,t[5]=h-M*c,t[9]=-o*l,t[2]=M-h*c,t[6]=_+p*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*d,p=l*u,_=c*d,M=c*u;t[0]=h+M*o,t[4]=_*o-p,t[8]=a*c,t[1]=a*u,t[5]=a*d,t[9]=-o,t[2]=p*o-_,t[6]=M+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*d,p=l*u,_=c*d,M=c*u;t[0]=h-M*o,t[4]=-a*u,t[8]=_+p*o,t[1]=p+_*o,t[5]=a*d,t[9]=M-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*d,p=a*u,_=o*d,M=o*u;t[0]=l*d,t[4]=_*c-p,t[8]=h*c+M,t[1]=l*u,t[5]=M*c+h,t[9]=p*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,p=a*c,_=o*l,M=o*c;t[0]=l*d,t[4]=M-h*u,t[8]=_*u+p,t[1]=u,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=p*u+_,t[10]=h-M*u}else if(e.order==="XZY"){const h=a*l,p=a*c,_=o*l,M=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=h*u+M,t[5]=a*d,t[9]=p*u-_,t[2]=_*u-p,t[6]=o*d,t[10]=M*u+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(bh,e,wh)}lookAt(e,t,i){const n=this.elements;return Ai.subVectors(e,t),Ai.lengthSq()===0&&(Ai.z=1),Ai.normalize(),on.crossVectors(i,Ai),on.lengthSq()===0&&(Math.abs(i.z)===1?Ai.x+=1e-4:Ai.z+=1e-4,Ai.normalize(),on.crossVectors(i,Ai)),on.normalize(),zs.crossVectors(Ai,on),n[0]=on.x,n[4]=zs.x,n[8]=Ai.x,n[1]=on.y,n[5]=zs.y,n[9]=Ai.y,n[2]=on.z,n[6]=zs.z,n[10]=Ai.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],d=i[1],u=i[5],h=i[9],p=i[13],_=i[2],M=i[6],m=i[10],f=i[14],v=i[3],w=i[7],b=i[11],E=i[15],T=n[0],g=n[4],y=n[8],D=n[12],R=n[1],L=n[5],O=n[9],Y=n[13],I=n[2],U=n[6],j=n[10],H=n[14],ae=n[3],$=n[7],ie=n[11],ne=n[15];return r[0]=a*T+o*R+l*I+c*ae,r[4]=a*g+o*L+l*U+c*$,r[8]=a*y+o*O+l*j+c*ie,r[12]=a*D+o*Y+l*H+c*ne,r[1]=d*T+u*R+h*I+p*ae,r[5]=d*g+u*L+h*U+p*$,r[9]=d*y+u*O+h*j+p*ie,r[13]=d*D+u*Y+h*H+p*ne,r[2]=_*T+M*R+m*I+f*ae,r[6]=_*g+M*L+m*U+f*$,r[10]=_*y+M*O+m*j+f*ie,r[14]=_*D+M*Y+m*H+f*ne,r[3]=v*T+w*R+b*I+E*ae,r[7]=v*g+w*L+b*U+E*$,r[11]=v*y+w*O+b*j+E*ie,r[15]=v*D+w*Y+b*H+E*ne,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],n=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],h=e[10],p=e[14],_=e[3],M=e[7],m=e[11],f=e[15],v=l*p-c*h,w=o*p-c*u,b=o*h-l*u,E=a*p-c*d,T=a*h-l*d,g=a*u-o*d;return t*(M*v-m*w+f*b)-i*(_*v-m*E+f*T)+n*(_*w-M*E+f*g)-r*(_*b-M*T+m*g)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],n=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],d=e[10];return t*(a*d-o*c)-i*(r*d-o*l)+n*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],h=e[10],p=e[11],_=e[12],M=e[13],m=e[14],f=e[15],v=t*o-i*a,w=t*l-n*a,b=t*c-r*a,E=i*l-n*o,T=i*c-r*o,g=n*c-r*l,y=d*M-u*_,D=d*m-h*_,R=d*f-p*_,L=u*m-h*M,O=u*f-p*M,Y=h*f-p*m,I=v*Y-w*O+b*L+E*R-T*D+g*y;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/I;return e[0]=(o*Y-l*O+c*L)*U,e[1]=(n*O-i*Y-r*L)*U,e[2]=(M*g-m*T+f*E)*U,e[3]=(h*T-u*g-p*E)*U,e[4]=(l*R-a*Y-c*D)*U,e[5]=(t*Y-n*R+r*D)*U,e[6]=(m*b-_*g-f*w)*U,e[7]=(d*g-h*b+p*w)*U,e[8]=(a*O-o*R+c*y)*U,e[9]=(i*R-t*O-r*y)*U,e[10]=(_*T-M*b+f*v)*U,e[11]=(u*b-d*T-p*v)*U,e[12]=(o*D-a*L-l*y)*U,e[13]=(t*L-i*D+n*y)*U,e[14]=(M*w-_*E-m*v)*U,e[15]=(d*E-u*w+h*v)*U,this}scale(e){const t=this.elements,i=e.x,n=e.y,r=e.z;return t[0]*=i,t[4]*=n,t[8]*=r,t[1]*=i,t[5]*=n,t[9]*=r,t[2]*=i,t[6]*=n,t[10]*=r,t[3]*=i,t[7]*=n,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),n=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+i,c*o-n*l,c*l+n*o,0,c*o+n*l,d*o+i,d*l-n*a,0,c*l-n*o,d*l+n*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,r,a){return this.set(1,i,r,0,e,1,a,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){const n=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,u=o+o,h=r*c,p=r*d,_=r*u,M=a*d,m=a*u,f=o*u,v=l*c,w=l*d,b=l*u,E=i.x,T=i.y,g=i.z;return n[0]=(1-(M+f))*E,n[1]=(p+b)*E,n[2]=(_-w)*E,n[3]=0,n[4]=(p-b)*T,n[5]=(1-(h+f))*T,n[6]=(m+v)*T,n[7]=0,n[8]=(_+w)*g,n[9]=(m-v)*g,n[10]=(1-(h+M))*g,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){const n=this.elements;e.x=n[12],e.y=n[13],e.z=n[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=In.set(n[0],n[1],n[2]).length();const o=In.set(n[4],n[5],n[6]).length(),l=In.set(n[8],n[9],n[10]).length();r<0&&(a=-a),Ui.copy(this);const c=1/a,d=1/o,u=1/l;return Ui.elements[0]*=c,Ui.elements[1]*=c,Ui.elements[2]*=c,Ui.elements[4]*=d,Ui.elements[5]*=d,Ui.elements[6]*=d,Ui.elements[8]*=u,Ui.elements[9]*=u,Ui.elements[10]*=u,t.setFromRotationMatrix(Ui),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,n,r,a,o=Bi,l=!1){const c=this.elements,d=2*r/(t-e),u=2*r/(i-n),h=(t+e)/(t-e),p=(i+n)/(i-n);let _,M;if(l)_=r/(a-r),M=a*r/(a-r);else if(o===Bi)_=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===Ps)_=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,n,r,a,o=Bi,l=!1){const c=this.elements,d=2/(t-e),u=2/(i-n),h=-(t+e)/(t-e),p=-(i+n)/(i-n);let _,M;if(l)_=1/(a-r),M=a/(a-r);else if(o===Bi)_=-2/(a-r),M=-(a+r)/(a-r);else if(o===Ps)_=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=u,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=_,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Pr.prototype.isMatrix4=!0;let St=Pr;const In=new P,Ui=new St,bh=new P(0,0,0),wh=new P(1,1,1),on=new P,zs=new P,Ai=new P,Vo=new St,Wo=new rs;class sn{constructor(e=0,t=0,i=0,n=sn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const n=e.elements,r=n[0],a=n[4],o=n[8],l=n[1],c=n[5],d=n[9],u=n[2],h=n[6],p=n[10];switch(t){case"XYZ":this._y=Math.asin(st(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-st(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(st(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-st(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(st(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:Ve("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Vo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Vo,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Wo.setFromEuler(this),this.setFromQuaternion(Wo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}sn.DEFAULT_ORDER="XYZ";class yo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Eh=0;const Xo=new P,Nn=new rs,Ki=new St,ks=new P,us=new P,Th=new P,Ah=new rs,qo=new P(1,0,0),Yo=new P(0,1,0),$o=new P(0,0,1),Ko={type:"added"},Rh={type:"removed"},Un={type:"childadded",child:null},Kr={type:"childremoved",child:null};class kt extends Pn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Eh++}),this.uuid=Ln(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=kt.DEFAULT_UP.clone();const e=new P,t=new sn,i=new rs,n=new P(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new St},normalMatrix:{value:new qe}}),this.matrix=new St,this.matrixWorld=new St,this.matrixAutoUpdate=kt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Nn.setFromAxisAngle(e,t),this.quaternion.multiply(Nn),this}rotateOnWorldAxis(e,t){return Nn.setFromAxisAngle(e,t),this.quaternion.premultiply(Nn),this}rotateX(e){return this.rotateOnAxis(qo,e)}rotateY(e){return this.rotateOnAxis(Yo,e)}rotateZ(e){return this.rotateOnAxis($o,e)}translateOnAxis(e,t){return Xo.copy(e).applyQuaternion(this.quaternion),this.position.add(Xo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(qo,e)}translateY(e){return this.translateOnAxis(Yo,e)}translateZ(e){return this.translateOnAxis($o,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ki.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ks.copy(e):ks.set(e,t,i);const n=this.parent;this.updateWorldMatrix(!0,!1),us.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ki.lookAt(us,ks,this.up):Ki.lookAt(ks,us,this.up),this.quaternion.setFromRotationMatrix(Ki),n&&(Ki.extractRotation(n.matrixWorld),Nn.setFromRotationMatrix(Ki),this.quaternion.premultiply(Nn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(at("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ko),Un.child=e,this.dispatchEvent(Un),Un.child=null):at("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Rh),Kr.child=e,this.dispatchEvent(Kr),Kr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ki.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ki.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ki),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ko),Un.child=e,this.dispatchEvent(Un),Un.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(us,e,Th),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(us,Ah,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,n=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*n,r[13]+=i-r[1]*t-r[5]*i-r[9]*n,r[14]+=n-r[2]*t-r[6]*i-r[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,n.name=this.name,n.castShadow=this.castShadow,n.receiveShadow=this.receiveShadow,n.visible=this.visible,n.frustumCulled=this.frustumCulled,n.renderOrder=this.renderOrder,n.static=this.static,n.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(e),n.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));n.material=o}else n.material=r(e.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),u=a(e.shapes),h=a(e.skeletons),p=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),u.length>0&&(i.shapes=u),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=n,i;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const n=e.children[i];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}kt.DEFAULT_UP=new P(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Dt extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ch={type:"move"};class Zr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Dt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Dt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Dt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const m=t.getJointPose(M,i),f=this._getHandJoint(c,M);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.quaternion,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),p=.02,_=.005;c.inputState.pinching&&h>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ch)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Dt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const ac={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ln={h:0,s:0,l:0},Gs={h:0,s:0,l:0};function Jr(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Fe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ti){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,n=nt.workingColorSpace){return this.r=e,this.g=t,this.b=i,nt.colorSpaceToWorking(this,n),this}setHSL(e,t,i,n=nt.workingColorSpace){if(e=mh(e,1),t=st(t,0,1),i=st(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Jr(a,r,e+1/3),this.g=Jr(a,r,e),this.b=Jr(a,r,e-1/3)}return nt.colorSpaceToWorking(this,n),this}setStyle(e,t=ti){function i(r){r!==void 0&&parseFloat(r)<1&&Ve("Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ve("Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ve("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ti){const i=ac[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ve("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=nn(e.r),this.g=nn(e.g),this.b=nn(e.b),this}copyLinearToSRGB(e){return this.r=jn(e.r),this.g=jn(e.g),this.b=jn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ti){return nt.workingToColorSpace(ui.copy(this),e),Math.round(st(ui.r*255,0,255))*65536+Math.round(st(ui.g*255,0,255))*256+Math.round(st(ui.b*255,0,255))}getHexString(e=ti){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.workingToColorSpace(ui.copy(this),t);const i=ui.r,n=ui.g,r=ui.b,a=Math.max(i,n,r),o=Math.min(i,n,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=d<=.5?u/(a+o):u/(2-a-o),a){case i:l=(n-r)/u+(n<r?6:0);break;case n:l=(r-i)/u+2;break;case r:l=(i-n)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=nt.workingColorSpace){return nt.workingToColorSpace(ui.copy(this),t),e.r=ui.r,e.g=ui.g,e.b=ui.b,e}getStyle(e=ti){nt.workingToColorSpace(ui.copy(this),e);const t=ui.r,i=ui.g,n=ui.b;return e!==ti?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(ln),this.setHSL(ln.h+e,ln.s+t,ln.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ln),e.getHSL(Gs);const i=Wr(ln.h,Gs.h,t),n=Wr(ln.s,Gs.s,t),r=Wr(ln.l,Gs.l,t);return this.setHSL(i,n,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,n=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*n,this.g=r[1]*t+r[4]*i+r[7]*n,this.b=r[2]*t+r[5]*i+r[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ui=new Fe;Fe.NAMES=ac;class bo{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Fe(e),this.density=t}clone(){return new bo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Ph extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new sn,this.environmentIntensity=1,this.environmentRotation=new sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Fi=new P,Zi=new P,Qr=new P,Ji=new P,Fn=new P,On=new P,Zo=new P,jr=new P,ea=new P,ta=new P,ia=new It,na=new It,sa=new It;class Di{constructor(e=new P,t=new P,i=new P){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),Fi.subVectors(e,t),n.cross(Fi);const r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(e,t,i,n,r){Fi.subVectors(n,t),Zi.subVectors(i,t),Qr.subVectors(e,t);const a=Fi.dot(Fi),o=Fi.dot(Zi),l=Fi.dot(Qr),c=Zi.dot(Zi),d=Zi.dot(Qr),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const h=1/u,p=(c*l-o*d)*h,_=(a*d-o*l)*h;return r.set(1-p-_,_,p)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,Ji)===null?!1:Ji.x>=0&&Ji.y>=0&&Ji.x+Ji.y<=1}static getInterpolation(e,t,i,n,r,a,o,l){return this.getBarycoord(e,t,i,n,Ji)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ji.x),l.addScaledVector(a,Ji.y),l.addScaledVector(o,Ji.z),l)}static getInterpolatedAttribute(e,t,i,n,r,a){return ia.setScalar(0),na.setScalar(0),sa.setScalar(0),ia.fromBufferAttribute(e,t),na.fromBufferAttribute(e,i),sa.fromBufferAttribute(e,n),a.setScalar(0),a.addScaledVector(ia,r.x),a.addScaledVector(na,r.y),a.addScaledVector(sa,r.z),a}static isFrontFacing(e,t,i,n){return Fi.subVectors(i,t),Zi.subVectors(e,t),Fi.cross(Zi).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Fi.subVectors(this.c,this.b),Zi.subVectors(this.a,this.b),Fi.cross(Zi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Di.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Di.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,n,r){return Di.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}containsPoint(e){return Di.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Di.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,n=this.b,r=this.c;let a,o;Fn.subVectors(n,i),On.subVectors(r,i),jr.subVectors(e,i);const l=Fn.dot(jr),c=On.dot(jr);if(l<=0&&c<=0)return t.copy(i);ea.subVectors(e,n);const d=Fn.dot(ea),u=On.dot(ea);if(d>=0&&u<=d)return t.copy(n);const h=l*u-d*c;if(h<=0&&l>=0&&d<=0&&l-d>0)return a=l/(l-d),t.copy(i).addScaledVector(Fn,a);ta.subVectors(e,r);const p=Fn.dot(ta),_=On.dot(ta);if(_>=0&&p<=_)return t.copy(r);const M=p*c-l*_;if(M<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(i).addScaledVector(On,o);const m=d*_-p*u;if(m<=0&&u-d>=0&&p-_>=0)return Zo.subVectors(r,n),o=(u-d)/(u-d+(p-_)),t.copy(n).addScaledVector(Zo,o);const f=1/(m+M+h);return a=M*f,o=h*f,t.copy(i).addScaledVector(Fn,a).addScaledVector(On,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class as{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Oi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Oi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Oi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Oi):Oi.fromBufferAttribute(r,a),Oi.applyMatrix4(e.matrixWorld),this.expandByPoint(Oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Hs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Hs.copy(i.boundingBox)),Hs.applyMatrix4(e.matrixWorld),this.union(Hs)}const n=e.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Oi),Oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(fs),Vs.subVectors(this.max,fs),Bn.subVectors(e.a,fs),zn.subVectors(e.b,fs),kn.subVectors(e.c,fs),cn.subVectors(zn,Bn),hn.subVectors(kn,zn),yn.subVectors(Bn,kn);let t=[0,-cn.z,cn.y,0,-hn.z,hn.y,0,-yn.z,yn.y,cn.z,0,-cn.x,hn.z,0,-hn.x,yn.z,0,-yn.x,-cn.y,cn.x,0,-hn.y,hn.x,0,-yn.y,yn.x,0];return!ra(t,Bn,zn,kn,Vs)||(t=[1,0,0,0,1,0,0,0,1],!ra(t,Bn,zn,kn,Vs))?!1:(Ws.crossVectors(cn,hn),t=[Ws.x,Ws.y,Ws.z],ra(t,Bn,zn,kn,Vs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Qi=[new P,new P,new P,new P,new P,new P,new P,new P],Oi=new P,Hs=new as,Bn=new P,zn=new P,kn=new P,cn=new P,hn=new P,yn=new P,fs=new P,Vs=new P,Ws=new P,bn=new P;function ra(s,e,t,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){bn.fromArray(s,r);const o=n.x*Math.abs(bn.x)+n.y*Math.abs(bn.y)+n.z*Math.abs(bn.z),l=e.dot(bn),c=t.dot(bn),d=i.dot(bn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const Vt=new P,Xs=new Ae;let Lh=0;class Mi extends Pn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Lh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=tc,this.updateRanges=[],this.gpuType=Xi,this.version=0,this._normalizationScale=e!==void 0?Dr(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Xs.fromBufferAttribute(this,t),Xs.applyMatrix3(e),this.setXY(t,Xs.x,Xs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix3(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):nc(e,this.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):sc(e,this.array)}}class oc extends Mi{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class lc extends Mi{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class et extends Mi{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Dh=new as,ps=new P,aa=new P;class os{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Dh.setFromPoints(e).getCenter(i);let n=0;for(let r=0,a=e.length;r<a;r++)n=Math.max(n,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ps.subVectors(e,this.center);const t=ps.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(ps,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(aa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ps.copy(e.center).add(aa)),this.expandByPoint(ps.copy(e.center).sub(aa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Ih=0;const Pi=new St,oa=new kt,Gn=new P,Ri=new as,ms=new as,Qt=new P;class Nt extends Pn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ih++}),this.uuid=Ln(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(dh(e)?lc:oc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new qe().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Pi.makeRotationFromQuaternion(e),this.applyMatrix4(Pi),this}rotateX(e){return Pi.makeRotationX(e),this.applyMatrix4(Pi),this}rotateY(e){return Pi.makeRotationY(e),this.applyMatrix4(Pi),this}rotateZ(e){return Pi.makeRotationZ(e),this.applyMatrix4(Pi),this}translate(e,t,i){return Pi.makeTranslation(e,t,i),this.applyMatrix4(Pi),this}scale(e,t,i){return Pi.makeScale(e,t,i),this.applyMatrix4(Pi),this}lookAt(e){return oa.lookAt(e),oa.updateMatrix(),this.applyMatrix4(oa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gn).negate(),this.translate(Gn.x,Gn.y,Gn.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let n=0,r=e.length;n<r;n++){const a=e[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new et(i,3))}else{const i=Math.min(e.length,t.count);for(let n=0;n<i;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&Ve("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new as);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){at("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){const r=t[i];Ri.setFromBufferAttribute(r),this.morphTargetsRelative?(Qt.addVectors(this.boundingBox.min,Ri.min),this.boundingBox.expandByPoint(Qt),Qt.addVectors(this.boundingBox.max,Ri.max),this.boundingBox.expandByPoint(Qt)):(this.boundingBox.expandByPoint(Ri.min),this.boundingBox.expandByPoint(Ri.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&at('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new os);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){at("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const i=this.boundingSphere.center;if(Ri.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];ms.setFromBufferAttribute(o),this.morphTargetsRelative?(Qt.addVectors(Ri.min,ms.min),Ri.expandByPoint(Qt),Qt.addVectors(Ri.max,ms.max),Ri.expandByPoint(Qt)):(Ri.expandByPoint(ms.min),Ri.expandByPoint(ms.max))}Ri.getCenter(i);let n=0;for(let r=0,a=e.count;r<a;r++)Qt.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(Qt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Qt.fromBufferAttribute(o,c),l&&(Gn.fromBufferAttribute(e,c),Qt.add(Gn)),n=Math.max(n,i.distanceToSquared(Qt))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&at('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){at("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,n=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Mi(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[],c=new Uint8Array(i.count);for(let D=0;D<i.count;D++)o[D]=new P,l[D]=new P;const d=new P,u=new P,h=new P,p=new Ae,_=new Ae,M=new Ae,m=new P,f=new P;function v(D,R,L){c[D]=c[R]=c[L]=1,d.fromBufferAttribute(i,D),u.fromBufferAttribute(i,R),h.fromBufferAttribute(i,L),p.fromBufferAttribute(r,D),_.fromBufferAttribute(r,R),M.fromBufferAttribute(r,L),u.sub(d),h.sub(d),_.sub(p),M.sub(p);const O=1/(_.x*M.y-M.x*_.y);isFinite(O)&&(m.copy(u).multiplyScalar(M.y).addScaledVector(h,-_.y).multiplyScalar(O),f.copy(h).multiplyScalar(_.x).addScaledVector(u,-M.x).multiplyScalar(O),o[D].add(m),o[R].add(m),o[L].add(m),l[D].add(f),l[R].add(f),l[L].add(f))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let D=0,R=w.length;D<R;++D){const L=w[D],O=L.start,Y=L.count;for(let I=O,U=O+Y;I<U;I+=3)v(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const b=new P,E=new P,T=new P,g=new P;function y(D){T.fromBufferAttribute(n,D),g.copy(T);const R=o[D];b.copy(R),b.sub(T.multiplyScalar(T.dot(R))).normalize(),E.crossVectors(g,R);const O=E.dot(l[D])<0?-1:1;a.setXYZW(D,b.x,b.y,b.z,O)}for(let D=0,R=i.count;D<R;++D)c[D]&&y(D);this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Mi(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const n=new P,r=new P,a=new P,o=new P,l=new P,c=new P,d=new P,u=new P;if(e)for(let h=0,p=e.count;h<p;h+=3){const _=e.getX(h+0),M=e.getX(h+1),m=e.getX(h+2);n.fromBufferAttribute(t,_),r.fromBufferAttribute(t,M),a.fromBufferAttribute(t,m),d.subVectors(a,r),u.subVectors(n,r),d.cross(u),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,m),o.add(d),l.add(d),c.add(d),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)n.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),d.subVectors(a,r),u.subVectors(n,r),d.cross(u),i.setXYZ(h+0,d.x,d.y,d.z),i.setXYZ(h+1,d.x,d.y,d.z),i.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Qt.fromBufferAttribute(e,t),Qt.normalize(),e.setXYZ(t,Qt.x,Qt.y,Qt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,u=o.normalized,h=new c.constructor(l.length*d);let p=0,_=0;for(let M=0,m=l.length;M<m;M++){o.isInterleavedBufferAttribute?p=l[M]*o.data.stride+o.offset:p=l[M]*d;for(let f=0;f<d;f++)h[_++]=c[p++]}return new Mi(h,d,u)}if(this.index===null)return Ve("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Nt,i=this.index.array,n=this.attributes;for(const o in n){const l=n[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,u=c.length;d<u;d++){const h=c[d],p=e(h,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const n={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){const p=c[u];d.push(p.toJSON(e.data))}d.length>0&&(n[l]=d,r=!0)}r&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const n=e.attributes;for(const c in n){const d=n[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],u=r[c];for(let h=0,p=u.length;h<p;h++)d.push(u[h].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Nh{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=tc,this.updateRanges=[],this.version=0,this.uuid=Ln()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let n=0,r=this.stride;n<r;n++)this.array[e+n]=t.array[i+n];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});const t=Jo(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);const i=new this.array.constructor(e.arrayBuffers[t]),n=new this.constructor(i,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});const t=Jo(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));const i={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return i.usage=this.usage,i}}function Jo(s){return s.buffer._uuid===void 0&&(s.buffer._uuid=Ln()),s.byteOffset===0&&s.byteLength===s.buffer.byteLength?s.buffer._uuid:s.buffer._uuid+":"+s.byteOffset+":"+s.byteLength}const vi=new P;class Ar{constructor(e,t,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=n,this._normalizationScale=e!==void 0?Dr(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)vi.fromBufferAttribute(this,t),vi.applyMatrix4(e),this.setXYZ(t,vi.x,vi.y,vi.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)vi.fromBufferAttribute(this,t),vi.applyNormalMatrix(e),this.setXYZ(t,vi.x,vi.y,vi.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)vi.fromBufferAttribute(this,t),vi.transformDirection(e),this.setXYZ(t,vi.x,vi.y,vi.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i),n=this._normalize(n),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Tr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[n+r])}return new Mi(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ar(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Tr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[n+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):nc(e,this.data.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):sc(e,this.data.array)}}const la=new P,Uh=new P,Fh=new qe;class un{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const n=la.subVectors(i,t).cross(Uh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const n=e.delta(la),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(n,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Fh.getNormalMatrix(e),n=this.coplanarPoint(la).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Oh=0;class xn extends Pn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Oh++}),this.uuid=Ln(),this.name="",this.type="Material",this.blending=Es,this.side=Rn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gl,this.blendDst=Hl,this.blendEquation=$n,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Fe(0,0,0),this.blendAlpha=0,this.depthFunc=Ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hr,this.stencilZFail=Hr,this.stencilZPass=Hr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ve(`Material: parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){Ve(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=n(e.textures),a=n(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Fe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new un().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ae().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ae().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const n=t.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class zt extends xn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Fe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Hn;const gs=new P,Vn=new P,Wn=new P,Xn=new Ae,_s=new Ae,cc=new St,qs=new P,vs=new P,Ys=new P,Qo=new Ae,ca=new Ae,jo=new Ae;class Wt extends kt{constructor(e=new zt){if(super(),this.isSprite=!0,this.type="Sprite",Hn===void 0){Hn=new Nt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Nh(t,5);Hn.setIndex([0,1,2,0,2,3]),Hn.setAttribute("position",new Ar(i,3,0,!1)),Hn.setAttribute("uv",new Ar(i,2,3,!1))}this.geometry=Hn,this.material=e,this.center=new Ae(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&at('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Vn.setFromMatrixScale(this.matrixWorld),cc.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Wn.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Vn.multiplyScalar(-Wn.z);const i=this.material.rotation;let n,r;i!==0&&(r=Math.cos(i),n=Math.sin(i));const a=this.center;$s(qs.set(-.5,-.5,0),Wn,a,Vn,n,r),$s(vs.set(.5,-.5,0),Wn,a,Vn,n,r),$s(Ys.set(.5,.5,0),Wn,a,Vn,n,r),Qo.set(0,0),ca.set(1,0),jo.set(1,1);let o=e.ray.intersectTriangle(qs,vs,Ys,!1,gs);if(o===null&&($s(vs.set(-.5,.5,0),Wn,a,Vn,n,r),ca.set(0,1),o=e.ray.intersectTriangle(qs,Ys,vs,!1,gs),o===null))return;const l=e.ray.origin.distanceTo(gs);l<e.near||l>e.far||t.push({distance:l,point:gs.clone(),uv:Di.getInterpolation(gs,qs,vs,Ys,Qo,ca,jo,new Ae),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){const t=super.toJSON(e);return t.object.center=this.center.toArray(),t}}function $s(s,e,t,i,n,r){Xn.subVectors(s,t).addScalar(.5).multiply(i),n!==void 0?(_s.x=r*Xn.x-n*Xn.y,_s.y=n*Xn.x+r*Xn.y):_s.copy(Xn),s.copy(e),s.x+=_s.x,s.y+=_s.y,s.applyMatrix4(cc)}const ji=new P,ha=new P,Ks=new P,Zs=new P;class Ns{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ji)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ji.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ji.copy(this.origin).addScaledVector(this.direction,t),ji.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){ha.copy(e).add(t).multiplyScalar(.5),Ks.copy(t).sub(e).normalize(),Zs.copy(this.origin).sub(ha);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ks),o=Zs.dot(this.direction),l=-Zs.dot(Ks),c=Zs.lengthSq(),d=Math.abs(1-a*a);let u,h,p,_;if(d>0)if(u=a*l-o,h=a*o-l,_=r*d,u>=0)if(h>=-_)if(h<=_){const M=1/d;u*=M,h*=M,p=u*(u+a*h+2*o)+h*(a*u+h+2*l)+c}else h=r,u=Math.max(0,-(a*h+o)),p=-u*u+h*(h+2*l)+c;else h=-r,u=Math.max(0,-(a*h+o)),p=-u*u+h*(h+2*l)+c;else h<=-_?(u=Math.max(0,-(-a*r+o)),h=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+h*(h+2*l)+c):h<=_?(u=0,h=Math.min(Math.max(-r,-l),r),p=h*(h+2*l)+c):(u=Math.max(0,-(a*r+o)),h=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+h*(h+2*l)+c);else h=a>0?-r:r,u=Math.max(0,-(a*h+o)),p=-u*u+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(ha).addScaledVector(Ks,h),p}intersectSphere(e,t){if(e.radius<0)return null;ji.subVectors(e.center,this.origin);const i=ji.dot(this.direction),n=ji.dot(ji)-i*i,r=e.radius*e.radius;if(n>r)return null;const a=Math.sqrt(r-n),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,n=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,n=(e.min.x-h.x)*c),d>=0?(r=(e.min.y-h.y)*d,a=(e.max.y-h.y)*d):(r=(e.max.y-h.y)*d,a=(e.min.y-h.y)*d),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),u>=0?(o=(e.min.z-h.z)*u,l=(e.max.z-h.z)*u):(o=(e.max.z-h.z)*u,l=(e.min.z-h.z)*u),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,ji)!==null}intersectTriangle(e,t,i,n,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,d=o.z,u=e.x-a.x,h=e.y-a.y,p=e.z-a.z,_=t.x-a.x,M=t.y-a.y,m=t.z-a.z,f=i.x-a.x,v=i.y-a.y,w=i.z-a.z,b=Math.abs(l),E=Math.abs(c),T=Math.abs(d);let g,y,D,R,L,O,Y,I,U,j,H,ae;if(b>=E&&b>=T?(D=l,O=u,U=_,ae=f,l>=0?(g=c,y=d,R=h,L=p,Y=M,I=m,j=v,H=w):(g=d,y=c,R=p,L=h,Y=m,I=M,j=w,H=v)):E>=T?(D=c,O=h,U=M,ae=v,c>=0?(g=d,y=l,R=p,L=u,Y=m,I=_,j=w,H=f):(g=l,y=d,R=u,L=p,Y=_,I=m,j=f,H=w)):(D=d,O=p,U=m,ae=w,d>=0?(g=l,y=c,R=u,L=h,Y=_,I=M,j=f,H=v):(g=c,y=l,R=h,L=u,Y=M,I=_,j=v,H=f)),D===0)return null;const $=g/D,ie=y/D,ne=1/D,Ee=R-$*O,He=L-ie*O,q=Y-$*U,ge=I-ie*U,Te=j-$*ae,Se=H-ie*ae,se=Te*ge-Se*q,ze=Ee*Se-He*Te,_t=q*He-ge*Ee;if(n){if(se<0||ze<0||_t<0)return null}else if((se<0||ze<0||_t<0)&&(se>0||ze>0||_t>0))return null;const Ge=se+ze+_t;if(Ge===0)return null;const ot=ne*(se*O+ze*U+_t*ae);return(Ge>0?ot<0:ot>0)?null:this.at(ot/Ge,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ue extends xn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.combine=Vl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const el=new St,wn=new Ns,Js=new os,tl=new P,Qs=new P,js=new P,er=new P,da=new P,tr=new P,il=new P,ir=new P;class z extends kt{constructor(e=new Nt,t=new Ue){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(n,e);const o=this.morphTargetInfluences;if(r&&o){tr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],u=r[l];d!==0&&(da.fromBufferAttribute(u,e),a?tr.addScaledVector(da,d):tr.addScaledVector(da.sub(t),d))}t.add(tr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Js.copy(i.boundingSphere),Js.applyMatrix4(r),wn.copy(e.ray).recast(e.near),!(Js.containsPoint(wn.origin)===!1&&(wn.intersectSphere(Js,tl)===null||wn.origin.distanceToSquared(tl)>(e.far-e.near)**2))&&(el.copy(r).invert(),wn.copy(e.ray).applyMatrix4(el),!(i.boundingBox!==null&&wn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,wn)))}_computeIntersections(e,t,i){let n;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,h=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,M=h.length;_<M;_++){const m=h[_],f=a[m.materialIndex],v=Math.max(m.start,p.start),w=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let b=v,E=w;b<E;b+=3){const T=o.getX(b),g=o.getX(b+1),y=o.getX(b+2);n=nr(this,f,e,i,c,d,u,T,g,y),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const _=Math.max(0,p.start),M=Math.min(o.count,p.start+p.count);for(let m=_,f=M;m<f;m+=3){const v=o.getX(m),w=o.getX(m+1),b=o.getX(m+2);n=nr(this,a,e,i,c,d,u,v,w,b),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,M=h.length;_<M;_++){const m=h[_],f=a[m.materialIndex],v=Math.max(m.start,p.start),w=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let b=v,E=w;b<E;b+=3){const T=b,g=b+1,y=b+2;n=nr(this,f,e,i,c,d,u,T,g,y),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const _=Math.max(0,p.start),M=Math.min(l.count,p.start+p.count);for(let m=_,f=M;m<f;m+=3){const v=m,w=m+1,b=m+2;n=nr(this,a,e,i,c,d,u,v,w,b),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}}}function Bh(s,e,t,i,n,r,a,o){let l;if(e.side===pi?l=i.intersectTriangle(a,r,n,!0,o):l=i.intersectTriangle(n,r,a,e.side===Rn,o),l===null)return null;ir.copy(o),ir.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(ir);return c<t.near||c>t.far?null:{distance:c,point:ir.clone(),object:s}}function nr(s,e,t,i,n,r,a,o,l,c){s.getVertexPosition(o,Qs),s.getVertexPosition(l,js),s.getVertexPosition(c,er);const d=Bh(s,e,t,i,Qs,js,er,il);if(d){const u=new P;Di.getBarycoord(il,Qs,js,er,u),n&&(d.uv=Di.getInterpolatedAttribute(n,o,l,c,u,new Ae)),r&&(d.uv1=Di.getInterpolatedAttribute(r,o,l,c,u,new Ae)),a&&(d.normal=Di.getInterpolatedAttribute(a,o,l,c,u,new P),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new P,materialIndex:0};Di.getNormal(Qs,js,er,h.normal),d.face=h,d.barycoord=u}return d}class zh extends mi{constructor(e=null,t=1,i=1,n,r,a,o,l,c=si,d=si,u,h){super(null,a,o,l,c,d,n,r,u,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const En=new os,kh=new Ae(.5,.5),sr=new P;class Ls{constructor(e=new un,t=new un,i=new un,n=new un,r=new un,a=new un){this.planes=[e,t,i,n,r,a]}set(e,t,i,n,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Bi,i=!1){const n=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],d=r[4],u=r[5],h=r[6],p=r[7],_=r[8],M=r[9],m=r[10],f=r[11],v=r[12],w=r[13],b=r[14],E=r[15];if(n[0].setComponents(c-a,p-d,f-_,E-v).normalize(),n[1].setComponents(c+a,p+d,f+_,E+v).normalize(),n[2].setComponents(c+o,p+u,f+M,E+w).normalize(),n[3].setComponents(c-o,p-u,f-M,E-w).normalize(),i)n[4].setComponents(l,h,m,b).normalize(),n[5].setComponents(c-l,p-h,f-m,E-b).normalize();else if(n[4].setComponents(c-l,p-h,f-m,E-b).normalize(),t===Bi)n[5].setComponents(c+l,p+h,f+m,E+b).normalize();else if(t===Ps)n[5].setComponents(l,h,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),En.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),En.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(En)}intersectsSprite(e){En.center.set(0,0,0);const t=kh.distanceTo(e.center);return En.radius=.7071067811865476+t,En.applyMatrix4(e.matrixWorld),this.intersectsSphere(En)}intersectsSphere(e){const t=this.planes,i=e.center,n=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const n=t[i];if(sr.x=n.normal.x>0?e.max.x:e.min.x,sr.y=n.normal.y>0?e.max.y:e.min.y,sr.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(sr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const nl=new St;class wo{constructor(){this.coordinateSystem=Bi,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,i=this._frustums;for(let n=0;n<t.length;n++){const r=t[n];nl.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),i[n]===void 0&&(i[n]=new Ls),i[n].setFromProjectionMatrix(nl,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,i=e._frustums;for(let n=0;n<e._count;n++)t[n]===void 0&&(t[n]=new Ls),t[n].copy(i[n]);return this._count=e._count,this}clone(){return new wo().copy(this)}}class hc extends xn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Rr=new P,Cr=new P,sl=new St,xs=new Ns,rr=new os,ua=new P,rl=new P;class Gh extends kt{constructor(e=new Nt,t=new hc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let n=1,r=t.count;n<r;n++)Rr.fromBufferAttribute(t,n-1),Cr.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=Rr.distanceTo(Cr);e.setAttribute("lineDistance",new et(i,1))}else Ve("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),rr.copy(i.boundingSphere),rr.applyMatrix4(n),rr.radius+=r,e.ray.intersectsSphere(rr)===!1)return;sl.copy(n).invert(),xs.copy(e.ray).applyMatrix4(sl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=i.index,h=i.attributes.position;if(d!==null){const p=Math.max(0,a.start),_=Math.min(d.count,a.start+a.count);for(let M=p,m=_-1;M<m;M+=c){const f=d.getX(M),v=d.getX(M+1),w=ar(this,e,xs,l,f,v,M);w&&t.push(w)}if(this.isLineLoop){const M=d.getX(_-1),m=d.getX(p),f=ar(this,e,xs,l,M,m,_-1);f&&t.push(f)}}else{const p=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let M=p,m=_-1;M<m;M+=c){const f=ar(this,e,xs,l,M,M+1,M);f&&t.push(f)}if(this.isLineLoop){const M=ar(this,e,xs,l,_-1,p,_-1);M&&t.push(M)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ar(s,e,t,i,n,r,a){const o=s.geometry.attributes.position;if(Rr.fromBufferAttribute(o,n),Cr.fromBufferAttribute(o,r),t.distanceSqToSegment(Rr,Cr,ua,rl)>i)return;ua.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(ua);if(!(c<e.near||c>e.far))return{distance:c,point:rl.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const al=new P,ol=new P;class Hh extends Gh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let n=0,r=t.count;n<r;n+=2)al.fromBufferAttribute(t,n),ol.fromBufferAttribute(t,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+al.distanceTo(ol);e.setAttribute("lineDistance",new et(i,1))}else Ve("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ir extends xn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ll=new St,no=new Ns,or=new os,lr=new P;class Nr extends kt{constructor(e=new Nt,t=new Ir){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),or.copy(i.boundingSphere),or.applyMatrix4(n),or.radius+=r,e.ray.intersectsSphere(or)===!1)return;ll.copy(n).invert(),no.copy(e.ray).applyMatrix4(ll);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){const h=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let _=h,M=p;_<M;_++){const m=c.getX(_);lr.fromBufferAttribute(u,m),cl(lr,m,l,n,e,t,this)}}else{const h=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let _=h,M=p;_<M;_++)lr.fromBufferAttribute(u,_),cl(lr,_,l,n,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function cl(s,e,t,i,n,r,a){const o=no.distanceSqToPoint(s);if(o<t){const l=new P;no.closestPointToPoint(s,l),l.applyMatrix4(i);const c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class dc extends mi{constructor(e=[],t=es,i,n,r,a,o,l,c,d){super(e,t,i,n,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ls extends mi{constructor(e,t,i,n,r,a,o,l,c){super(e,t,i,n,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class is extends mi{constructor(e,t,i=Yi,n,r,a,o=si,l=si,c,d=vn,u=1){if(d!==vn&&d!==mn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:u};super(h,n,r,a,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new So(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class uc extends is{constructor(e,t=Yi,i=es,n,r,a=si,o=si,l,c=vn){const d={width:e,height:e,depth:1},u=[d,d,d,d,d,d];super(e,e,t,i,n,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class fc extends mi{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ie extends Nt{constructor(e=1,t=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};const o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],u=[];let h=0,p=0;_("z","y","x",-1,-1,i,t,e,a,r,0),_("z","y","x",1,-1,i,t,-e,a,r,1),_("x","z","y",1,1,e,i,t,n,a,2),_("x","z","y",1,-1,e,i,-t,n,a,3),_("x","y","z",1,-1,e,t,i,n,r,4),_("x","y","z",-1,-1,e,t,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new et(c,3)),this.setAttribute("normal",new et(d,3)),this.setAttribute("uv",new et(u,2));function _(M,m,f,v,w,b,E,T,g,y,D){const R=b/g,L=E/y,O=b/2,Y=E/2,I=T/2,U=g+1,j=y+1;let H=0,ae=0;const $=new P;for(let ie=0;ie<j;ie++){const ne=ie*L-Y;for(let Ee=0;Ee<U;Ee++){const He=Ee*R-O;$[M]=He*v,$[m]=ne*w,$[f]=I,c.push($.x,$.y,$.z),$[M]=0,$[m]=0,$[f]=T>0?1:-1,d.push($.x,$.y,$.z),u.push(Ee/g),u.push(1-ie/y),H+=1}}for(let ie=0;ie<y;ie++)for(let ne=0;ne<g;ne++){const Ee=h+ne+U*ie,He=h+ne+U*(ie+1),q=h+(ne+1)+U*(ie+1),ge=h+(ne+1)+U*ie;l.push(Ee,He,ge),l.push(He,q,ge),ae+=6}o.addGroup(p,ae,D),p+=ae,h+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ie(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Zn extends Nt{constructor(e=1,t=1,i=4,n=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:n,heightSegments:r},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),n=Math.max(3,Math.floor(n)),r=Math.max(1,Math.floor(r));const a=[],o=[],l=[],c=[],d=t/2,u=Math.PI/2*e,h=t,p=2*u+h,_=i*2+r,M=n+1,m=new P,f=new P;for(let v=0;v<=_;v++){let w=0,b=0,E=0,T=0;if(v<=i){const D=v/i,R=D*Math.PI/2;b=-d-e*Math.cos(R),E=e*Math.sin(R),T=-e*Math.cos(R),w=D*u}else if(v<=i+r){const D=(v-i)/r;b=-d+D*t,E=e,T=0,w=u+D*h}else{const D=(v-i-r)/i,R=D*Math.PI/2;b=d+e*Math.sin(R),E=e*Math.cos(R),T=e*Math.sin(R),w=u+h+D*u}const g=Math.max(0,Math.min(1,w/p));let y=0;v===0?y=.5/n:v===_&&(y=-.5/n);for(let D=0;D<=n;D++){const R=D/n,L=R*Math.PI*2,O=Math.sin(L),Y=Math.cos(L);f.x=-E*Y,f.y=b,f.z=E*O,o.push(f.x,f.y,f.z),m.set(-E*Y,T,E*O),m.normalize(),l.push(m.x,m.y,m.z),c.push(R+y,g)}if(v>0){const D=(v-1)*M;for(let R=0;R<n;R++){const L=D+R,O=D+R+1,Y=v*M+R,I=v*M+R+1;a.push(L,O,Y),a.push(O,I,Y)}}}this.setIndex(a),this.setAttribute("position",new et(o,3)),this.setAttribute("normal",new et(l,3)),this.setAttribute("uv",new et(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zn(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class gn extends Nt{constructor(e=1,t=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:n},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new P,d=new Ae;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,h=3;u<=t;u++,h+=3){const p=i+u/t*n;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),d.x=(a[h]/e+1)/2,d.y=(a[h+1]/e+1)/2,l.push(d.x,d.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new et(a,3)),this.setAttribute("normal",new et(o,3)),this.setAttribute("uv",new et(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gn(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class ft extends Nt{constructor(e=1,t=1,i=1,n=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;n=Math.floor(n),r=Math.floor(r);const d=[],u=[],h=[],p=[];let _=0;const M=[],m=i/2;let f=0;v(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(d),this.setAttribute("position",new et(u,3)),this.setAttribute("normal",new et(h,3)),this.setAttribute("uv",new et(p,2));function v(){const b=new P,E=new P;let T=0;const g=(t-e)/i;for(let y=0;y<=r;y++){const D=[],R=y/r,L=R*(t-e)+e;for(let O=0;O<=n;O++){const Y=O/n,I=Y*l+o,U=Math.sin(I),j=Math.cos(I);E.x=L*U,E.y=-R*i+m,E.z=L*j,u.push(E.x,E.y,E.z),b.set(U,g,j).normalize(),h.push(b.x,b.y,b.z),p.push(Y,1-R),D.push(_++)}M.push(D)}for(let y=0;y<n;y++)for(let D=0;D<r;D++){const R=M[D][y],L=M[D+1][y],O=M[D+1][y+1],Y=M[D][y+1];(e>0||D!==0)&&(d.push(R,L,Y),T+=3),(t>0||D!==r-1)&&(d.push(L,O,Y),T+=3)}c.addGroup(f,T,0),f+=T}function w(b){const E=_,T=new Ae,g=new P;let y=0;const D=b===!0?e:t,R=b===!0?1:-1;for(let O=1;O<=n;O++)u.push(0,m*R,0),h.push(0,R,0),p.push(.5,.5),_++;const L=_;for(let O=0;O<=n;O++){const I=O/n*l+o,U=Math.cos(I),j=Math.sin(I);g.x=D*j,g.y=m*R,g.z=D*U,u.push(g.x,g.y,g.z),h.push(0,R,0),T.x=U*.5+.5,T.y=j*.5*R+.5,p.push(T.x,T.y),_++}for(let O=0;O<n;O++){const Y=E+O,I=L+O;b===!0?d.push(I,I+1,Y):d.push(I+1,I,Y),y+=3}c.addGroup(f,y,b===!0?1:2),f+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ft(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class _n extends ft{constructor(e=1,t=1,i=32,n=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,n,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new _n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ur extends Nt{constructor(e=[],t=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:n};const r=[],a=[];o(n),c(i),d(),this.setAttribute("position",new et(r,3)),this.setAttribute("normal",new et(r.slice(),3)),this.setAttribute("uv",new et(a,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const w=new P,b=new P,E=new P;for(let T=0;T<t.length;T+=3)p(t[T+0],w),p(t[T+1],b),p(t[T+2],E),l(w,b,E,v)}function l(v,w,b,E){const T=E+1,g=[];for(let y=0;y<=T;y++){g[y]=[];const D=v.clone().lerp(b,y/T),R=w.clone().lerp(b,y/T),L=T-y;for(let O=0;O<=L;O++)O===0&&y===T?g[y][O]=D:g[y][O]=D.clone().lerp(R,O/L)}for(let y=0;y<T;y++)for(let D=0;D<2*(T-y)-1;D++){const R=Math.floor(D/2);D%2===0?(h(g[y][R+1]),h(g[y+1][R]),h(g[y][R])):(h(g[y][R+1]),h(g[y+1][R+1]),h(g[y+1][R]))}}function c(v){const w=new P;for(let b=0;b<r.length;b+=3)w.x=r[b+0],w.y=r[b+1],w.z=r[b+2],w.normalize().multiplyScalar(v),r[b+0]=w.x,r[b+1]=w.y,r[b+2]=w.z}function d(){const v=new P;for(let w=0;w<r.length;w+=3){v.x=r[w+0],v.y=r[w+1],v.z=r[w+2];const b=m(v)/2/Math.PI+.5,E=f(v)/Math.PI+.5;a.push(b,1-E)}_(),u()}function u(){for(let v=0;v<a.length;v+=6){const w=a[v+0],b=a[v+2],E=a[v+4],T=Math.max(w,b,E),g=Math.min(w,b,E);T>.9&&g<.1&&(w<.2&&(a[v+0]+=1),b<.2&&(a[v+2]+=1),E<.2&&(a[v+4]+=1))}}function h(v){r.push(v.x,v.y,v.z)}function p(v,w){const b=v*3;w.x=e[b+0],w.y=e[b+1],w.z=e[b+2]}function _(){const v=new P,w=new P,b=new P,E=new P,T=new Ae,g=new Ae,y=new Ae;for(let D=0,R=0;D<r.length;D+=9,R+=6){v.set(r[D+0],r[D+1],r[D+2]),w.set(r[D+3],r[D+4],r[D+5]),b.set(r[D+6],r[D+7],r[D+8]),T.set(a[R+0],a[R+1]),g.set(a[R+2],a[R+3]),y.set(a[R+4],a[R+5]),E.copy(v).add(w).add(b).divideScalar(3);const L=m(E);M(T,R+0,v,L),M(g,R+2,w,L),M(y,R+4,b,L)}}function M(v,w,b,E){E<0&&v.x===1&&(a[w]=v.x-1),b.x===0&&b.z===0&&(a[w]=E/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function f(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ur(e.vertices,e.indices,e.radius,e.detail)}}class Eo extends Ur{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(n,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Eo(e.radius,e.detail)}}class Fr extends Ur{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],n=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,n,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Fr(e.radius,e.detail)}}class ri extends Nt{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(n),c=o+1,d=l+1,u=e/o,h=t/l,p=[],_=[],M=[],m=[];for(let f=0;f<d;f++){const v=f*h-a;for(let w=0;w<c;w++){const b=w*u-r;_.push(b,-v,0),M.push(0,0,1),m.push(w/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let v=0;v<o;v++){const w=v+c*f,b=v+c*(f+1),E=v+1+c*(f+1),T=v+1+c*f;p.push(w,b,T),p.push(b,E,T)}this.setIndex(p),this.setAttribute("position",new et(_,3)),this.setAttribute("normal",new et(M,3)),this.setAttribute("uv",new et(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ri(e.width,e.height,e.widthSegments,e.heightSegments)}}class An extends Nt{constructor(e=.5,t=1,i=32,n=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:n,thetaStart:r,thetaLength:a},i=Math.max(3,i),n=Math.max(1,n);const o=[],l=[],c=[],d=[];let u=e;const h=(t-e)/n,p=new P,_=new Ae;for(let M=0;M<=n;M++){for(let m=0;m<=i;m++){const f=r+m/i*a;p.x=u*Math.cos(f),p.y=u*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),_.x=(p.x/t+1)/2,_.y=(p.y/t+1)/2,d.push(_.x,_.y)}u+=h}for(let M=0;M<n;M++){const m=M*(i+1);for(let f=0;f<i;f++){const v=f+m,w=v,b=v+i+1,E=v+i+2,T=v+1;o.push(w,b,T),o.push(b,E,T)}}this.setIndex(o),this.setAttribute("position",new et(l,3)),this.setAttribute("normal",new et(c,3)),this.setAttribute("uv",new et(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new An(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Si extends Nt{constructor(e=1,t=32,i=16,n=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:n,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const d=[],u=new P,h=new P,p=[],_=[],M=[],m=[];for(let f=0;f<=i;f++){const v=[],w=f/i,b=a+w*o,E=e*Math.cos(b),T=Math.sqrt(e*e-E*E);let g=0;f===0&&a===0?g=.5/t:f===i&&l===Math.PI&&(g=-.5/t);for(let y=0;y<=t;y++){const D=y/t,R=n+D*r;u.x=-T*Math.cos(R),u.y=E,u.z=T*Math.sin(R),_.push(u.x,u.y,u.z),h.copy(u).normalize(),M.push(h.x,h.y,h.z),m.push(D+g,1-w),v.push(c++)}d.push(v)}for(let f=0;f<i;f++)for(let v=0;v<t;v++){const w=d[f][v+1],b=d[f][v],E=d[f+1][v],T=d[f+1][v+1];(f!==0||a>0)&&p.push(w,b,T),(f!==i-1||l<Math.PI)&&p.push(b,E,T)}this.setIndex(p),this.setAttribute("position",new et(_,3)),this.setAttribute("normal",new et(M,3)),this.setAttribute("uv",new et(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Si(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class qt extends Nt{constructor(e=1,t=.4,i=12,n=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:n,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),n=Math.floor(n);const l=[],c=[],d=[],u=[],h=new P,p=new P,_=new P;for(let M=0;M<=i;M++){const m=a+M/i*o;for(let f=0;f<=n;f++){const v=f/n*r;p.x=(e+t*Math.cos(m))*Math.cos(v),p.y=(e+t*Math.cos(m))*Math.sin(v),p.z=t*Math.sin(m),c.push(p.x,p.y,p.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),_.subVectors(p,h).normalize(),d.push(_.x,_.y,_.z),u.push(f/n),u.push(M/i)}}for(let M=1;M<=i;M++)for(let m=1;m<=n;m++){const f=(n+1)*M+m-1,v=(n+1)*(M-1)+m-1,w=(n+1)*(M-1)+m,b=(n+1)*M+m;l.push(f,v,b),l.push(v,w,b)}this.setIndex(l),this.setAttribute("position",new et(c,3)),this.setAttribute("normal",new et(d,3)),this.setAttribute("uv",new et(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qt(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}function ns(s){const e={};for(const t in s){e[t]={};for(const i in s[t]){const n=s[t][i];if(hl(n))n.isRenderTargetTexture?(Ve("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone();else if(Array.isArray(n))if(hl(n[0])){const r=[];for(let a=0,o=n.length;a<o;a++)r[a]=n[a].clone();e[t][i]=r}else e[t][i]=n.slice();else e[t][i]=n}}return e}function xi(s){const e={};for(let t=0;t<s.length;t++){const i=ns(s[t]);for(const n in i)e[n]=i[n]}return e}function hl(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Vh(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function pc(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}const Ds={clone:ns,merge:xi};var Wh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class fi extends xn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wh,this.fragmentShader=Xh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ns(e.uniforms),this.uniformsGroups=Vh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const n in this.uniforms){const a=this.uniforms[n].value;a&&a.isTexture?t.uniforms[n]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[n]={type:"m4",value:a.toArray()}:t.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const n=e.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=t[n.value]||null;break;case"c":this.uniforms[i].value=new Fe().setHex(n.value);break;case"v2":this.uniforms[i].value=new Ae().fromArray(n.value);break;case"v3":this.uniforms[i].value=new P().fromArray(n.value);break;case"v4":this.uniforms[i].value=new It().fromArray(n.value);break;case"m3":this.uniforms[i].value=new qe().fromArray(n.value);break;case"m4":this.uniforms[i].value=new St().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class mc extends fi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ii extends xn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=to,this.normalScale=new Ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class qh extends ii{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ae(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return st(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Fe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Fe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Fe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return Qn('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){Qn('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Yh extends xn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=nh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class $h extends xn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Or extends kt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Fe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Kh extends Or{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Fe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const fa=new St,dl=new P,ul=new P;class gc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ae(512,512),this.mapType=Ci,this.map=null,this.mapPass=null,this.matrix=new St,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ls,this._frameExtents=new Ae(1,1),this._viewportCount=1,this._viewports=[new It(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;dl.setFromMatrixPosition(e.matrixWorld),t.position.copy(dl),ul.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ul),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,n){fa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(fa,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=n?n.z/r.x:1,o=n?n.w/r.y:1,l=n?n.x/r.x:0,c=n?n.y/r.y:0;e.coordinateSystem===Ps||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(fa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const cr=new P,hr=new rs,Gi=new P;class _c extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new St,this.projectionMatrix=new St,this.projectionMatrixInverse=new St,this.coordinateSystem=Bi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(cr,hr,Gi),Gi.x===1&&Gi.y===1&&Gi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(cr,hr,Gi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(cr,hr,Gi),Gi.x===1&&Gi.y===1&&Gi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(cr,hr,Gi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const dn=new P,fl=new Ae,pl=new Ae;class Li extends _c{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=io*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Vr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return io*2*Math.atan(Math.tan(Vr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){dn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(dn.x,dn.y).multiplyScalar(-e/dn.z),dn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(dn.x,dn.y).multiplyScalar(-e/dn.z)}getViewSize(e,t){return this.getViewBounds(e,fl,pl),t.subVectors(pl,fl)}setViewOffset(e,t,i,n,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Vr*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,r=-.5*n;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*n/l,t-=a.offsetY*i/c,n*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Zh extends gc{constructor(){super(new Li(90,1,.5,500)),this.isPointLightShadow=!0}}class Vi extends Or{constructor(e,t,i=0,n=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new Zh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class To extends _c{constructor(e=-1,t=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=n+t,l=n-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Jh extends gc{constructor(){super(new To(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class pa extends Or{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new Jh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Qh extends Or{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const qn=-90,Yn=1;class so extends kt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new Li(qn,Yn,e,t);n.layers=this.layers,this.add(n);const r=new Li(qn,Yn,e,t);r.layers=this.layers,this.add(r);const a=new Li(qn,Yn,e,t);a.layers=this.layers,this.add(a);const o=new Li(qn,Yn,e,t);o.layers=this.layers,this.add(o);const l=new Li(qn,Yn,e,t);l.layers=this.layers,this.add(l);const c=new Li(qn,Yn,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,n,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Bi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ps)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.mipmapsAutoUpdate=M,e.setRenderTarget(i,5,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(u,h,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class jh extends Li{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}class ed{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=td.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function td(){this._document.hidden===!1&&this.reset()}const ml=new St;class vc{constructor(e,t,i=0,n=1/0){this.ray=new Ns(e,t),this.near=i,this.far=n,this.camera=null,this.layers=new yo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):at("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ml.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ml),this}intersectObject(e,t=!0,i=[]){return ro(e,this,i,t),i.sort(gl),i}intersectObjects(e,t=!0,i=[]){for(let n=0,r=e.length;n<r;n++)ro(e[n],this,i,t);return i.sort(gl),i}}function gl(s,e){return s.distance-e.distance}function ro(s,e,t,i){let n=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(n=!1),n===!0&&i===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)ro(r[a],e,t,!0)}}class id extends Hh{constructor(e=10,t=10,i=4473924,n=8947848){i=new Fe(i),n=new Fe(n);const r=t/2,a=e/t,o=e/2,l=[],c=[];for(let h=0,p=0,_=-o;h<=t;h++,_+=a){l.push(-o,0,_,o,0,_),l.push(_,0,-o,_,0,o);const M=h===r?i:n;M.toArray(c,p),p+=3,M.toArray(c,p),p+=3,M.toArray(c,p),p+=3,M.toArray(c,p),p+=3}const d=new Nt;d.setAttribute("position",new et(l,3)),d.setAttribute("color",new et(c,3));const u=new hc({vertexColors:!0,toneMapped:!1});super(d,u),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}function _l(s,e,t,i){const n=nd(i);switch(t){case Kl:return s*e;case Jl:return s*e/n.components*n.byteLength;case vo:return s*e/n.components*n.byteLength;case Cn:return s*e*2/n.components*n.byteLength;case xo:return s*e*2/n.components*n.byteLength;case Zl:return s*e*3/n.components*n.byteLength;case qi:return s*e*4/n.components*n.byteLength;case Mo:return s*e*4/n.components*n.byteLength;case mr:case gr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case _r:case vr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ta:case Ra:return Math.max(s,16)*Math.max(e,8)/4;case Ea:case Aa:return Math.max(s,8)*Math.max(e,8)/2;case Ca:case Pa:case Da:case Ia:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case La:case Sr:case Na:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ua:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Fa:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Oa:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Ba:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case za:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case ka:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Ga:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Ha:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Va:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Wa:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Xa:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case qa:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Ya:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case $a:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Ka:case Za:case Ja:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Qa:case ja:return Math.ceil(s/4)*Math.ceil(e/4)*8;case yr:case eo:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function nd(s){switch(s){case Ci:case Xl:return{byteLength:1,components:1};case Cs:case ql:case Ei:return{byteLength:2,components:1};case go:case _o:return{byteLength:2,components:4};case Yi:case mo:case Xi:return{byteLength:4,components:1};case Yl:case $l:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:oo}}));typeof window<"u"&&(window.__THREE__?Ve("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=oo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function xc(){let s=null,e=!1,t=null,i=null;function n(r,a){i=s.requestAnimationFrame(n),t(r,a)}return{start:function(){e!==!0&&t!==null&&s!==null&&(i=s.requestAnimationFrame(n),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function sd(s){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,u=c.byteLength,h=s.createBuffer();s.bindBuffer(l,h),s.bufferData(l,c,d),o.onUploadCallback();let p;if(c instanceof Float32Array)p=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=s.SHORT;else if(c instanceof Uint32Array)p=s.UNSIGNED_INT;else if(c instanceof Int32Array)p=s.INT;else if(c instanceof Int8Array)p=s.BYTE;else if(c instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const d=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,d);else{u.sort((p,_)=>p.start-_.start);let h=0;for(let p=1;p<u.length;p++){const _=u[h],M=u[p];M.start<=_.start+_.count+1?_.count=Math.max(_.count,M.start+M.count-_.start):(++h,u[h]=M)}u.length=h+1;for(let p=0,_=u.length;p<_;p++){const M=u[p];s.bufferSubData(c,M.start*d.BYTES_PER_ELEMENT,d,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:n,remove:r,update:a}}var rd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ad=`#ifdef USE_ALPHAHASH
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
#endif`,od=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ld=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,hd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,dd=`#ifdef USE_AOMAP
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
#endif`,ud=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fd=`#ifdef USE_BATCHING
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
#endif`,pd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,md=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_d=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,vd=`#ifdef USE_IRIDESCENCE
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
#endif`,xd=`#ifdef USE_BUMPMAP
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
#endif`,Md=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Sd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ed=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Td=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ad=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Rd=`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,Cd=`vec3 transformedNormal = objectNormal;
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
#endif`,Pd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ld=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Dd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Id=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Nd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ud=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Fd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#endif`,Od=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Bd=`#ifdef USE_ENVMAP
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
#endif`,zd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,kd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Gd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Hd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xd=`#ifdef USE_GRADIENTMAP
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
}`,qd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Yd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$d=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Kd=`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#include <lightprobes_pars_fragment>`,Zd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Jd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Qd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,eu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
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
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
#endif`,iu=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
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
		float roughness = max( material.clearcoatRoughness, 0.045 );
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
	float roughness = max( material.roughness, 0.045 );
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
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
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
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
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
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
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
}`,nu=`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,su=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ru=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,au=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
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
#endif`,ou=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,du=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,uu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,pu=`#if defined( USE_POINTS_UV )
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
#endif`,mu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_u=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vu=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mu=`#ifdef USE_MORPHTARGETS
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
#endif`,Su=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,bu=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,wu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Eu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Au=`#ifdef USE_NORMALMAP
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
#endif`,Ru=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Lu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Du=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Iu=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Nu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Uu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Fu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ou=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Bu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,zu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ku=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
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
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
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
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
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
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
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
#endif`,Gu=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
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
#endif`,Hu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,Vu=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
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
}`,Wu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xu=`#ifdef USE_SKINNING
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
#endif`,qu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Yu=`#ifdef USE_SKINNING
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
#endif`,$u=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ku=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ju=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Qu=`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ju=`#ifdef USE_TRANSMISSION
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
#endif`,ef=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
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
#endif`,tf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
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
#endif`,nf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
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
#endif`,sf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const rf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,af=`uniform sampler2D t2D;
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
}`,of=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lf=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,df=`#include <common>
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
}`,uf=`#if DEPTH_PACKING == 3200
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
}`,ff=`#define DISTANCE
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
}`,pf=`#define DISTANCE
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
void main() {
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
}`,mf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_f=`uniform float scale;
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
}`,vf=`uniform vec3 diffuse;
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
}`,xf=`#include <common>
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
}`,Mf=`uniform vec3 diffuse;
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
}`,Sf=`#define LAMBERT
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
}`,yf=`#define LAMBERT
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
}`,bf=`#define MATCAP
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
}`,wf=`#define MATCAP
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
}`,Ef=`#define NORMAL
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
}`,Tf=`#define NORMAL
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
}`,Af=`#define PHONG
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
}`,Rf=`#define PHONG
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
}`,Cf=`#define STANDARD
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
}`,Pf=`#define STANDARD
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
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
}`,Lf=`#define TOON
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
}`,Df=`#define TOON
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
}`,If=`uniform float size;
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
}`,Nf=`uniform vec3 diffuse;
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
}`,Uf=`#include <common>
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
}`,Ff=`uniform vec3 color;
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
}`,Of=`uniform float rotation;
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
}`,Bf=`uniform vec3 diffuse;
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
}`,Qe={alphahash_fragment:rd,alphahash_pars_fragment:ad,alphamap_fragment:od,alphamap_pars_fragment:ld,alphatest_fragment:cd,alphatest_pars_fragment:hd,aomap_fragment:dd,aomap_pars_fragment:ud,batching_pars_vertex:fd,batching_vertex:pd,begin_vertex:md,beginnormal_vertex:gd,bsdfs:_d,iridescence_fragment:vd,bumpmap_pars_fragment:xd,clipping_planes_fragment:Md,clipping_planes_pars_fragment:Sd,clipping_planes_pars_vertex:yd,clipping_planes_vertex:bd,color_fragment:wd,color_pars_fragment:Ed,color_pars_vertex:Td,color_vertex:Ad,common:Rd,defaultnormal_vertex:Cd,displacementmap_pars_vertex:Pd,displacementmap_vertex:Ld,emissivemap_fragment:Dd,emissivemap_pars_fragment:Id,colorspace_fragment:Nd,colorspace_pars_fragment:Ud,envmap_fragment:Fd,envmap_common_pars_fragment:Od,envmap_pars_fragment:Bd,envmap_pars_vertex:zd,envmap_physical_pars_fragment:Zd,envmap_vertex:kd,fog_vertex:Gd,fog_pars_vertex:Hd,fog_fragment:Vd,fog_pars_fragment:Wd,gradientmap_pars_fragment:Xd,lightmap_pars_fragment:qd,lights_lambert_fragment:Yd,lights_lambert_pars_fragment:$d,lights_pars_begin:Kd,lights_toon_fragment:Jd,lights_toon_pars_fragment:Qd,lights_phong_fragment:jd,lights_phong_pars_fragment:eu,lights_physical_fragment:tu,lights_physical_pars_fragment:iu,lights_fragment_begin:nu,lights_fragment_maps:su,lights_fragment_end:ru,lightprobes_pars_fragment:au,logdepthbuf_fragment:ou,logdepthbuf_pars_fragment:lu,logdepthbuf_pars_vertex:cu,logdepthbuf_vertex:hu,map_fragment:du,map_pars_fragment:uu,map_particle_fragment:fu,map_particle_pars_fragment:pu,metalnessmap_fragment:mu,metalnessmap_pars_fragment:gu,morphinstance_vertex:_u,morphcolor_vertex:vu,morphnormal_vertex:xu,morphtarget_pars_vertex:Mu,morphtarget_vertex:Su,normal_fragment_begin:yu,normal_fragment_maps:bu,normal_pars_fragment:wu,normal_pars_vertex:Eu,normal_vertex:Tu,normalmap_pars_fragment:Au,clearcoat_normal_fragment_begin:Ru,clearcoat_normal_fragment_maps:Cu,clearcoat_pars_fragment:Pu,iridescence_pars_fragment:Lu,opaque_fragment:Du,packing:Iu,premultiplied_alpha_fragment:Nu,project_vertex:Uu,dithering_fragment:Fu,dithering_pars_fragment:Ou,roughnessmap_fragment:Bu,roughnessmap_pars_fragment:zu,shadowmap_pars_fragment:ku,shadowmap_pars_vertex:Gu,shadowmap_vertex:Hu,shadowmask_pars_fragment:Vu,skinbase_vertex:Wu,skinning_pars_vertex:Xu,skinning_vertex:qu,skinnormal_vertex:Yu,specularmap_fragment:$u,specularmap_pars_fragment:Ku,tonemapping_fragment:Zu,tonemapping_pars_fragment:Ju,transmission_fragment:Qu,transmission_pars_fragment:ju,uv_pars_fragment:ef,uv_pars_vertex:tf,uv_vertex:nf,worldpos_vertex:sf,background_vert:rf,background_frag:af,backgroundCube_vert:of,backgroundCube_frag:lf,cube_vert:cf,cube_frag:hf,depth_vert:df,depth_frag:uf,distance_vert:ff,distance_frag:pf,equirect_vert:mf,equirect_frag:gf,linedashed_vert:_f,linedashed_frag:vf,meshbasic_vert:xf,meshbasic_frag:Mf,meshlambert_vert:Sf,meshlambert_frag:yf,meshmatcap_vert:bf,meshmatcap_frag:wf,meshnormal_vert:Ef,meshnormal_frag:Tf,meshphong_vert:Af,meshphong_frag:Rf,meshphysical_vert:Cf,meshphysical_frag:Pf,meshtoon_vert:Lf,meshtoon_frag:Df,points_vert:If,points_frag:Nf,shadow_vert:Uf,shadow_frag:Ff,sprite_vert:Of,sprite_frag:Bf},ye={common:{diffuse:{value:new Fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},envMapRotation:{value:new qe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new Ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new Fe(16777215)},opacity:{value:1},center:{value:new Ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},Wi={basic:{uniforms:xi([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:xi([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Fe(0)},envMapIntensity:{value:1}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:xi([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Fe(0)},specular:{value:new Fe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:xi([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new Fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:xi([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new Fe(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:xi([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:xi([ye.points,ye.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:xi([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:xi([ye.common,ye.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:xi([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:xi([ye.sprite,ye.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qe}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distance:{uniforms:xi([ye.common,ye.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distance_vert,fragmentShader:Qe.distance_frag},shadow:{uniforms:xi([ye.lights,ye.fog,{color:{value:new Fe(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Wi.physical={uniforms:xi([Wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new Ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new qe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new Fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new Ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new Fe(0)},specularColor:{value:new Fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new Ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};const dr={r:0,b:0,g:0},zf=new St,Mc=new qe;Mc.set(-1,0,0,0,1,0,0,0,1);function kf(s,e,t,i,n,r){const a=new Fe(0);let o=n===!0?0:1,l,c,d=null,u=0,h=null;function p(v){let w=v.isScene===!0?v.background:null;if(w&&w.isTexture){const b=v.backgroundBlurriness>0;w=e.get(w,b)}return w}function _(v){let w=!1;const b=p(v);b===null?m(a,o):b&&b.isColor&&(m(b,1),w=!0);const E=s.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function M(v,w){const b=p(w);b&&b.isCubeTexture?(c===void 0&&(c=new z(new Ie(1,1,1),new fi({name:"BackgroundCubeMaterial",uniforms:ns(Wi.backgroundCube.uniforms),vertexShader:Wi.backgroundCube.vertexShader,fragmentShader:Wi.backgroundCube.fragmentShader,side:pi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,T,g){this.matrixWorld.copyPosition(g.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(zf.makeRotationFromEuler(w.backgroundRotation)).transpose(),b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Mc),c.material.toneMapped=nt.getTransfer(b.colorSpace)!==pt,(d!==b||u!==b.version||h!==s.toneMapping)&&(c.material.needsUpdate=!0,d=b,u=b.version,h=s.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new z(new ri(2,2),new fi({name:"BackgroundMaterial",uniforms:ns(Wi.background.uniforms),vertexShader:Wi.background.vertexShader,fragmentShader:Wi.background.fragmentShader,side:Rn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=nt.getTransfer(b.colorSpace)!==pt,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||u!==b.version||h!==s.toneMapping)&&(l.material.needsUpdate=!0,d=b,u=b.version,h=s.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,w){v.getRGB(dr,pc(s)),t.buffers.color.setClear(dr.r,dr.g,dr.b,w,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,w=1){a.set(v),o=w,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,m(a,o)},render:_,addToRenderList:M,dispose:f}}function Gf(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=h(null);let r=n,a=!1;function o(L,O,Y,I,U){let j=!1;const H=u(L,I,Y,O);r!==H&&(r=H,c(r.object)),j=p(L,I,Y,U),j&&_(L,I,Y,U),U!==null&&e.update(U,s.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,b(L,O,Y,I),U!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return s.createVertexArray()}function c(L){return s.bindVertexArray(L)}function d(L){return s.deleteVertexArray(L)}function u(L,O,Y,I){const U=I.wireframe===!0;let j=i[O.id];j===void 0&&(j={},i[O.id]=j);const H=L.isInstancedMesh===!0?L.id:0;let ae=j[H];ae===void 0&&(ae={},j[H]=ae);let $=ae[Y.id];$===void 0&&($={},ae[Y.id]=$);let ie=$[U];return ie===void 0&&(ie=h(l()),$[U]=ie),ie}function h(L){const O=[],Y=[],I=[];for(let U=0;U<t;U++)O[U]=0,Y[U]=0,I[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:Y,attributeDivisors:I,object:L,attributes:{},index:null}}function p(L,O,Y,I){const U=r.attributes,j=O.attributes;let H=0;const ae=Y.getAttributes();for(const $ in ae)if(ae[$].location>=0){const ne=U[$];let Ee=j[$];if(Ee===void 0&&($==="instanceMatrix"&&L.instanceMatrix&&(Ee=L.instanceMatrix),$==="instanceColor"&&L.instanceColor&&(Ee=L.instanceColor)),ne===void 0||ne.attribute!==Ee||Ee&&ne.data!==Ee.data)return!0;H++}return r.attributesNum!==H||r.index!==I}function _(L,O,Y,I){const U={},j=O.attributes;let H=0;const ae=Y.getAttributes();for(const $ in ae)if(ae[$].location>=0){let ne=j[$];ne===void 0&&($==="instanceMatrix"&&L.instanceMatrix&&(ne=L.instanceMatrix),$==="instanceColor"&&L.instanceColor&&(ne=L.instanceColor));const Ee={};Ee.attribute=ne,ne&&ne.data&&(Ee.data=ne.data),U[$]=Ee,H++}r.attributes=U,r.attributesNum=H,r.index=I}function M(){const L=r.newAttributes;for(let O=0,Y=L.length;O<Y;O++)L[O]=0}function m(L){f(L,0)}function f(L,O){const Y=r.newAttributes,I=r.enabledAttributes,U=r.attributeDivisors;Y[L]=1,I[L]===0&&(s.enableVertexAttribArray(L),I[L]=1),U[L]!==O&&(s.vertexAttribDivisor(L,O),U[L]=O)}function v(){const L=r.newAttributes,O=r.enabledAttributes;for(let Y=0,I=O.length;Y<I;Y++)O[Y]!==L[Y]&&(s.disableVertexAttribArray(Y),O[Y]=0)}function w(L,O,Y,I,U,j,H){H===!0?s.vertexAttribIPointer(L,O,Y,U,j):s.vertexAttribPointer(L,O,Y,I,U,j)}function b(L,O,Y,I){M();const U=I.attributes,j=Y.getAttributes(),H=O.defaultAttributeValues;for(const ae in j){const $=j[ae];if($.location>=0){let ie=U[ae];if(ie===void 0&&(ae==="instanceMatrix"&&L.instanceMatrix&&(ie=L.instanceMatrix),ae==="instanceColor"&&L.instanceColor&&(ie=L.instanceColor)),ie!==void 0){const ne=ie.normalized,Ee=ie.itemSize,He=e.get(ie);if(He===void 0)continue;const q=He.buffer,ge=He.type,Te=He.bytesPerElement,Se=ge===s.INT||ge===s.UNSIGNED_INT||ie.gpuType===mo;if(ie.isInterleavedBufferAttribute){const se=ie.data,ze=se.isInterleavedBuffer===!0?se.stride:se.itemSize,_t=ie.offset;if(se.isInstancedInterleavedBuffer||se.isInstancedBufferAttribute){for(let Ge=0;Ge<$.locationSize;Ge++)f($.location+Ge,se.meshPerAttribute);L.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Ge=0;Ge<$.locationSize;Ge++)m($.location+Ge);s.bindBuffer(s.ARRAY_BUFFER,q);for(let Ge=0;Ge<$.locationSize;Ge++)w($.location+Ge,Ee/$.locationSize,ge,ne,ze*Te,(_t+Ee/$.locationSize*Ge)*Te,Se)}else{if(ie.isInstancedBufferAttribute){for(let se=0;se<$.locationSize;se++)f($.location+se,ie.meshPerAttribute);L.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let se=0;se<$.locationSize;se++)m($.location+se);s.bindBuffer(s.ARRAY_BUFFER,q);for(let se=0;se<$.locationSize;se++)w($.location+se,Ee/$.locationSize,ge,ne,Ee*Te,Ee/$.locationSize*se*Te,Se)}}else if(H!==void 0){const ne=H[ae];if(ne!==void 0)switch(ne.length){case 2:s.vertexAttrib2fv($.location,ne);break;case 3:s.vertexAttrib3fv($.location,ne);break;case 4:s.vertexAttrib4fv($.location,ne);break;default:s.vertexAttrib1fv($.location,ne)}}}}v()}function E(){D();for(const L in i){const O=i[L];for(const Y in O){const I=O[Y];for(const U in I){const j=I[U];for(const H in j)d(j[H].object),delete j[H];delete I[U]}}delete i[L]}}function T(L){if(i[L.id]===void 0)return;const O=i[L.id];for(const Y in O){const I=O[Y];for(const U in I){const j=I[U];for(const H in j)d(j[H].object),delete j[H];delete I[U]}}delete i[L.id]}function g(L){for(const O in i){const Y=i[O];for(const I in Y){const U=Y[I];if(U[L.id]===void 0)continue;const j=U[L.id];for(const H in j)d(j[H].object),delete j[H];delete U[L.id]}}}function y(L){for(const O in i){const Y=i[O],I=L.isInstancedMesh===!0?L.id:0,U=Y[I];if(U!==void 0){for(const j in U){const H=U[j];for(const ae in H)d(H[ae].object),delete H[ae];delete U[j]}delete Y[I],Object.keys(Y).length===0&&delete i[O]}}}function D(){R(),a=!0,r!==n&&(r=n,c(r.object))}function R(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:D,resetDefaultState:R,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfObject:y,releaseStatesOfProgram:g,initAttributes:M,enableAttribute:m,disableUnusedAttributes:v}}function Hf(s,e,t){let i;function n(l){i=l}function r(l,c){s.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,d){d!==0&&(s.drawArraysInstanced(i,l,c,d),t.update(c,i,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,d);let h=0;for(let p=0;p<d;p++)h+=c[p];t.update(h,i,1)}this.setMode=n,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Vf(s,e,t,i){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const g=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(g.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(g){return!(g!==qi&&i.convert(g)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(g){const y=g===Ei&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(g!==Ci&&g!==Xi&&!y&&i.convert(g)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(g){if(g==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";g="mediump"}return g==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(Ve("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=t.logarithmicDepthBuffer===!0&&u===!1;t.reversedDepthBuffer===!0&&u===!1&&Ve("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&u===!0&&Ve("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),f=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),w=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=s.getParameter(s.MAX_SAMPLES),T=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:_,maxTextureSize:M,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:v,maxVaryings:w,maxFragmentUniforms:b,maxSamples:E,samples:T}}function Wf(s){const e=this;let t=null,i=0,n=!1,r=!1;const a=new un,o=new qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const p=u.length!==0||h||i!==0||n;return n=h,i=u.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){t=d(u,h,0)},this.setState=function(u,h,p){const _=u.clippingPlanes,M=u.clipIntersection,m=u.clipShadows,f=s.get(u);if(!n||_===null||_.length===0||r&&!m)r?d(null):c();else{const v=r?0:i,w=v*4;let b=f.clippingState||null;l.value=b,b=d(_,h,w,p);for(let E=0;E!==w;++E)b[E]=t[E];f.clippingState=b,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(u,h,p,_){const M=u!==null?u.length:0;let m=null;if(M!==0){if(m=l.value,_!==!0||m===null){const f=p+M*4,v=h.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<f)&&(m=new Float32Array(f));for(let w=0,b=p;w!==M;++w,b+=4)a.copy(u[w]).applyMatrix4(v,o),a.normal.toArray(m,b),m[b+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,m}}class Ao extends Ti{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];this.texture=new dc(n),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new Ie(5,5,5),r=new fi({name:"CubemapFromEquirect",uniforms:ns(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:pi,blending:Tn});r.uniforms.tEquirect.value=t;const a=new z(n,r),o=t.minFilter;return t.minFilter===pn&&(t.minFilter=wi),new so(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,n=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,n);e.setRenderTarget(r)}}const vl=256,Xf=3,qf=20,Sc=256,yc=16,Yf=3,$f=new P,Kf=new Fe;class Is{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new so(1,10,null),this._boxMesh=new z(new Ie(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,i=.1,n=100,r={}){const{size:a=256,position:o=$f}=r,l=this._renderer;this._setSize(a);const c=this._allocateTarget(),d=this._getSourceTarget(!0);t>0&&(d.texture.mipmapsAutoUpdate=!1);const u=l.autoClear,h=l.autoClearColor,p=l.autoClearDepth,_=l.autoClearStencil,M=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,M===null&&(e.background=l.getClearColor(Kf));const m=new so(i,n,d);return m.position.copy(o),m.update(l,e),l.autoClear=u,l.autoClearColor=h,l.autoClearDepth=p,l.autoClearStencil=_,e.background=M,t>0&&(d.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ml(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(vl,gh(e))}_fromTexture(e,t){e.mapping===es||e.mapping===As?this._setSize(e.image.length===0?vl:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const i=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(i),i}_allocateTarget(){const e=this._cubeSize,t=xl(e,!1,!1),i=Math.log2(e)-Xf;for(let n=0;n<=i;n++)t.texture.mipmaps.push({width:e>>n,height:e>>n});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){const t=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==t||e&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=xl(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,i){const n=this._boxMesh,r=this._cubeCamera;n.material=i,r.renderTarget=e,r.activeMipmapLevel=t;const a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,n),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===es||e.mapping===As?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sl()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Ml()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=Zf(),this._integrationMaterial=Jf());const t=this._cubeSize,i=e.texture.mipmaps.length-1,n=this._ggxMaterial.uniforms;n.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/yc);for(let a=0;a<=i;a++){const o=Is.lodToRoughness(a,i);if(a>i-Yf)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{const l=o>0?Math.log2(t)+.5*Math.log2(6/(Sc*Math.pow(o,4)))+.5:0;n.roughness.value=o,n.lodBias.value=l,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Qf());const i=this._blurMaterial,n=i.uniforms,r=this._sourceTarget;n.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,n.envMap.value=r.texture,this._renderCube(e,0,i),n.envMap.value=e.texture,this._renderCube(r,0,i)}}function xl(s,e,t){return new Ao(s,{minFilter:pn,generateMipmaps:e,type:Ei,colorSpace:br,depthBuffer:t})}function Us(s,e,t){return new fi({name:s,uniforms:e,vertexShader:Qe.cube_vert,fragmentShader:t,side:pi,blending:Tn,depthTest:!1,depthWrite:!1})}function Zf(){return Us("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Sc}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Jf(){return Us("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:yc}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Qf(){return Us("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${qf}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Ml(){return Us("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Sl(){return Us("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function jf(s){let e=new WeakMap,t=new WeakMap,i=null;function n(h,p=!1){return h==null?null:p?a(h):r(h)}function r(h){if(h&&h.isTexture){const p=h.mapping;if(p===pr||p===kr)if(e.has(h)){const _=e.get(h).texture;return o(_,h.mapping)}else{const _=h.image;if(_&&_.height>0){const M=new Ao(_.height);return M.fromEquirectangularTexture(s,h),e.set(h,M),h.addEventListener("dispose",c),o(M.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture&&h.isPMREMTexture!==!0){const p=h.mapping,_=p===pr||p===kr,M=p===es||p===As;if(_||M){let m=t.get(h);const f=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return i===null&&(i=new Is(s)),m=_?i.fromEquirectangular(h,m):i.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{const v=h.image;return _&&v&&v.height>0||M&&v&&l(v)?(i===null&&(i=new Is(s)),m=_?i.fromEquirectangular(h):i.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",d),m.texture):null}}}return h}function o(h,p){return p===pr?h.mapping=es:p===kr&&(h.mapping=As),h}function l(h){let p=0;const _=6;for(let M=0;M<_;M++)h[M]!==void 0&&p++;return p===_}function c(h){const p=h.target;p.removeEventListener("dispose",c);const _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function d(h){const p=h.target;p.removeEventListener("dispose",d);const _=t.get(p);_!==void 0&&(t.delete(p),_.dispose())}function u(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:u}}function ep(s){const e={};function t(i){if(e[i]!==void 0)return e[i];const n=s.getExtension(i);return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const n=t(i);return n===null&&Qn("WebGLRenderer: "+i+" extension not supported."),n}}}function tp(s,e,t,i){const n={},r=new WeakMap,a=new FinalizationRegistry(_=>delete n[_]);function o(_){l(_.target)}function l(_){_.index!==null&&e.remove(_.index);for(const m in _.attributes)e.remove(_.attributes[m]);_.removeEventListener("dispose",o),delete n[_.id],a.unregister(_);const M=r.get(_);M&&(e.remove(M),r.delete(_)),i.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,t.memory.geometries--}function c(_,M){return n[M.id]!==void 0||(M.addEventListener("dispose",o),n[M.id]=new WeakRef(M),a.register(M,M.id,M),t.memory.geometries++),M}function d(_){const M=_.attributes;for(const m in M)e.update(M[m],s.ARRAY_BUFFER)}function u(_){const M=_.index,m=_.attributes.position;let f=0;if(m===void 0)return;const v=M!==null?M.array.length:m.array.length/3-1,w=m.count>=65535?lc:oc,b=new w(Math.ceil(v/3)*6,1),E=b.array;if(M!==null){const g=M.array;f=M.version;for(let y=0,D=0;y<v;y+=3){const R=g[y+0],L=g[y+1],O=g[y+2];E[D++]=R,E[D++]=L,E[D++]=L,E[D++]=O,E[D++]=O,E[D++]=R}}else{f=m.version;for(let g=0,y=0;g<v;g+=3){const D=g+0,R=g+1,L=g+2;E[y++]=D,E[y++]=R,E[y++]=R,E[y++]=L,E[y++]=L,E[y++]=D}}b.version=f;const T=r.get(_);T&&e.remove(T),r.set(_,b)}function h(_){const M=r.get(_);if(M){const m=_.index;m!==null&&M.version<m.version&&u(_)}else u(_);return r.get(_)}function p(){for(const _ in n){const M=n[_].deref();M!==void 0&&l(M)}}return{get:c,update:d,getWireframeAttribute:h,dispose:p}}function ip(s,e,t){let i;function n(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,h){s.drawElements(i,h,r,u*a),t.update(h,i,1)}function c(u,h,p){p!==0&&(s.drawElementsInstanced(i,h,r,u*a,p),t.update(h,i,p))}function d(u,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,u,0,p);let M=0;for(let m=0;m<p;m++)M+=h[m];t.update(M,i,1)}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function np(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:at("WebGLInfo: Unknown draw mode:",a);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function sp(s,e,t){const i=new WeakMap,n=new It;function r(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let h=i.get(o);if(h===void 0||h.count!==u){let R=function(){y.dispose(),i.delete(o),o.removeEventListener("dispose",R)};var p=R;h!==void 0&&h.texture.dispose();const _=o.morphAttributes.position!==void 0,M=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let b=0;_===!0&&(b=1),M===!0&&(b=2),m===!0&&(b=3);let E=o.attributes.position.count*b,T=1;E>e.maxTextureSize&&(T=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const g=new Float32Array(E*T*4*u),y=new rc(g,E,T,u);y.type=Xi,y.needsUpdate=!0;const D=b*4;for(let L=0;L<u;L++){const O=f[L],Y=v[L],I=w[L],U=E*T*4*L;for(let j=0;j<O.count;j++){const H=j*D;_===!0&&(n.fromBufferAttribute(O,j),g[U+H+0]=n.x,g[U+H+1]=n.y,g[U+H+2]=n.z,g[U+H+3]=0),M===!0&&(n.fromBufferAttribute(Y,j),g[U+H+4]=n.x,g[U+H+5]=n.y,g[U+H+6]=n.z,g[U+H+7]=0),m===!0&&(n.fromBufferAttribute(I,j),g[U+H+8]=n.x,g[U+H+9]=n.y,g[U+H+10]=n.z,g[U+H+11]=I.itemSize===4?n.w:1)}}h={count:u,texture:y,size:new Ae(E,T)},i.set(o,h),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const M=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(s,"morphTargetBaseInfluence",M),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",h.size)}return{update:r}}function rp(s,e,t,i,n){let r=new WeakMap;function a(c){const d=n.render.frame,u=c.geometry,h=e.get(c,u);if(r.get(h)!==d&&(e.update(h),r.set(h,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==d&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,d))),c.isSkinnedMesh){const p=c.skeleton;r.get(p)!==d&&(p.update(),r.set(p,d))}return h}function o(){r=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const ap={[lo]:"LINEAR_TONE_MAPPING",[co]:"REINHARD_TONE_MAPPING",[ho]:"CINEON_TONE_MAPPING",[Lr]:"ACES_FILMIC_TONE_MAPPING",[fo]:"AGX_TONE_MAPPING",[po]:"NEUTRAL_TONE_MAPPING",[uo]:"CUSTOM_TONE_MAPPING"};function op(s,e,t,i,n,r){const a=new Ti(e,t,{type:s,depthBuffer:n,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null,c=null;const d=new Nt;d.setAttribute("position",new et([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new et([0,2,0,0,2,0],2));const u=new mc({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new z(d,u),p=new To(-1,1,1,-1,0,1);let _=null,M=null,m=!1,f,v=null,w=[],b=!1;this.setSize=function(E,T){a.setSize(E,T),o!==null&&o.setSize(E,T),l!==null&&l.setSize(E,T);for(let g=0;g<w.length;g++){const y=w[g];y.setSize&&y.setSize(E,T)}},this.setEffects=function(E){w=E,b=w.length>0&&w[0].isRenderPass===!0;const T=a.width,g=a.height;w.length>0&&o===null&&(o=new Ti(T,g,{type:Ei,depthBuffer:!1,stencilBuffer:!1}),l=new Ti(T,g,{type:Ei,depthBuffer:!1,stencilBuffer:!1}));const y=n===!0&&w.some(D=>D.needsDepthTexture===!0);y!==(a.depthTexture!==null)&&(y===!0&&c===null&&(c=new is(T,g),r===!0&&(c.format=mn,c.type=ts)),a.dispose(),a.depthTexture=y?c:null,a.resolveDepthBuffer=y,a.storeMultisampledDepthBuffer=y);for(let D=0;D<w.length;D++){const R=w[D];R.setSize&&R.setSize(T,g),y&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(c)}},this.begin=function(E,T){if(m||E.toneMapping===tn&&w.length===0)return!1;if(v=T,T!==null){const g=T.width,y=T.height;(a.width!==g||a.height!==y)&&this.setSize(g,y)}return b===!1&&E.setRenderTarget(a),f=E.toneMapping,E.toneMapping=tn,!0},this.hasRenderPass=function(){return b},this.end=function(E,T){E.toneMapping=f,m=!0;let g=a,y=o;for(let D=0;D<w.length;D++){const R=w[D];R.enabled!==!1&&(R.render(E,y,g,T),R.needsSwap!==!1&&(g=y,y=y===o?l:o))}if(_!==E.outputColorSpace||M!==E.toneMapping){_=E.outputColorSpace,M=E.toneMapping,u.defines={},nt.getTransfer(_)===pt&&(u.defines.SRGB_TRANSFER="");const D=ap[M];D&&(u.defines[D]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=g.texture,E.setRenderTarget(v),E.render(h,p),v=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),d.dispose(),u.dispose()}}const bc=new mi,wc=new is(1,1),Ec=new uc(1),Tc=new rc,Ac=new yh,Rc=new dc,yl=[],bl=[],wl=new Float32Array(16),El=new Float32Array(9),Tl=new Float32Array(4);function cs(s,e,t){const i=s[0];if(i<=0||i>0)return s;const n=e*t;let r=yl[n];if(r===void 0&&(r=new Float32Array(n),yl[n]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Yt(s,e){if(s.length!==e.length)return!1;for(let t=0,i=s.length;t<i;t++)if(s[t]!==e[t])return!1;return!0}function $t(s,e){for(let t=0,i=e.length;t<i;t++)s[t]=e[t]}function Br(s,e){let t=bl[e];t===void 0&&(t=new Int32Array(e),bl[e]=t);for(let i=0;i!==e;++i)t[i]=s.allocateTextureUnit();return t}function lp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function cp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;s.uniform2fv(this.addr,e),$t(t,e)}}function hp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;s.uniform3fv(this.addr,e),$t(t,e)}}function dp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;s.uniform4fv(this.addr,e),$t(t,e)}}function up(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),$t(t,e)}else{if(Yt(t,i))return;Tl.set(i),s.uniformMatrix2fv(this.addr,!1,Tl),$t(t,i)}}function fp(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),$t(t,e)}else{if(Yt(t,i))return;El.set(i),s.uniformMatrix3fv(this.addr,!1,El),$t(t,i)}}function pp(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),$t(t,e)}else{if(Yt(t,i))return;wl.set(i),s.uniformMatrix4fv(this.addr,!1,wl),$t(t,i)}}function mp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function gp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;s.uniform2iv(this.addr,e),$t(t,e)}}function _p(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;s.uniform3iv(this.addr,e),$t(t,e)}}function vp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;s.uniform4iv(this.addr,e),$t(t,e)}}function xp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Mp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;s.uniform2uiv(this.addr,e),$t(t,e)}}function Sp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;s.uniform3uiv(this.addr,e),$t(t,e)}}function yp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;s.uniform4uiv(this.addr,e),$t(t,e)}}function zr(s){return s.version===0&&(s.compareFunction=ec,s.needsUpdate=!0),s}function bp(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_2D_SHADOW?r=zr(wc):r=bc,t.setTexture2D(e||r,n)}function wp(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||Ac,n)}function Ep(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_CUBE_SHADOW?r=zr(Ec):r=Rc,t.setTextureCube(e||r,n)}function Tp(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||Tc,n)}function Ap(s){switch(s){case 5126:return lp;case 35664:return cp;case 35665:return hp;case 35666:return dp;case 35674:return up;case 35675:return fp;case 35676:return pp;case 5124:case 35670:return mp;case 35667:case 35671:return gp;case 35668:case 35672:return _p;case 35669:case 35673:return vp;case 5125:return xp;case 36294:return Mp;case 36295:return Sp;case 36296:return yp;case 35678:case 36198:case 36298:case 36306:case 35682:return bp;case 35679:case 36299:case 36307:return wp;case 35680:case 36300:case 36308:case 36293:return Ep;case 36289:case 36303:case 36311:case 36292:return Tp}}function Rp(s,e){s.uniform1fv(this.addr,e)}function Cp(s,e){const t=cs(e,this.size,2);s.uniform2fv(this.addr,t)}function Pp(s,e){const t=cs(e,this.size,3);s.uniform3fv(this.addr,t)}function Lp(s,e){const t=cs(e,this.size,4);s.uniform4fv(this.addr,t)}function Dp(s,e){const t=cs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Ip(s,e){const t=cs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Np(s,e){const t=cs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Up(s,e){s.uniform1iv(this.addr,e)}function Fp(s,e){s.uniform2iv(this.addr,e)}function Op(s,e){s.uniform3iv(this.addr,e)}function Bp(s,e){s.uniform4iv(this.addr,e)}function zp(s,e){s.uniform1uiv(this.addr,e)}function kp(s,e){s.uniform2uiv(this.addr,e)}function Gp(s,e){s.uniform3uiv(this.addr,e)}function Hp(s,e){s.uniform4uiv(this.addr,e)}function Vp(s,e,t){const i=this.cache,n=e.length,r=Br(t,n);Yt(i,r)||(s.uniform1iv(this.addr,r),$t(i,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=zr(wc):a=bc;for(let o=0;o!==n;++o)t.setTexture2D(e[o]||a,r[o])}function Wp(s,e,t){const i=this.cache,n=e.length,r=Br(t,n);Yt(i,r)||(s.uniform1iv(this.addr,r),$t(i,r));for(let a=0;a!==n;++a)t.setTexture3D(e[a]||Ac,r[a])}function Xp(s,e,t){const i=this.cache,n=e.length,r=Br(t,n);Yt(i,r)||(s.uniform1iv(this.addr,r),$t(i,r));let a;this.type===s.SAMPLER_CUBE_SHADOW?a=zr(Ec):a=Rc;for(let o=0;o!==n;++o)t.setTextureCube(e[o]||a,r[o])}function qp(s,e,t){const i=this.cache,n=e.length,r=Br(t,n);Yt(i,r)||(s.uniform1iv(this.addr,r),$t(i,r));for(let a=0;a!==n;++a)t.setTexture2DArray(e[a]||Tc,r[a])}function Yp(s){switch(s){case 5126:return Rp;case 35664:return Cp;case 35665:return Pp;case 35666:return Lp;case 35674:return Dp;case 35675:return Ip;case 35676:return Np;case 5124:case 35670:return Up;case 35667:case 35671:return Fp;case 35668:case 35672:return Op;case 35669:case 35673:return Bp;case 5125:return zp;case 36294:return kp;case 36295:return Gp;case 36296:return Hp;case 35678:case 36198:case 36298:case 36306:case 35682:return Vp;case 35679:case 36299:case 36307:return Wp;case 35680:case 36300:case 36308:case 36293:return Xp;case 36289:case 36303:case 36311:case 36292:return qp}}class $p{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Ap(t.type)}}class Kp{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Yp(t.type)}}class Zp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const n=this.seq;for(let r=0,a=n.length;r!==a;++r){const o=n[r];o.setValue(e,t[o.id],i)}}}const ma=/(\w+)(\])?(\[|\.)?/g;function Al(s,e){s.seq.push(e),s.map[e.id]=e}function Jp(s,e,t){const i=s.name,n=i.length;for(ma.lastIndex=0;;){const r=ma.exec(i),a=ma.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===n){Al(t,c===void 0?new $p(o,s,e):new Kp(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new Zp(o),Al(t,u)),t=u}}}class xr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Jp(o,l,this)}const n=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?n.push(a):r.push(a);n.length>0&&(this.seq=n.concat(r))}setValue(e,t,i,n){const r=this.map[t];r!==void 0&&r.setValue(e,i,n)}setOptional(e,t,i){const n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,n)}}static seqWithValue(e,t){const i=[];for(let n=0,r=e.length;n!==r;++n){const a=e[n];a.id in t&&i.push(a)}return i}}function Rl(s,e,t){const i=s.createShader(e);return s.shaderSource(i,t),s.compileShader(i),i}const Qp=37297;let jp=0;function em(s,e){const t=s.split(`
`),i=[],n=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=n;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Cl=new qe;function tm(s){nt._getMatrix(Cl,nt.workingColorSpace,s);const e=`mat3( ${Cl.elements.map(t=>t.toFixed(4))} )`;switch(nt.getTransfer(s)){case wr:return[e,"LinearTransferOETF"];case pt:return[e,"sRGBTransferOETF"];default:return Ve("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Pl(s,e,t){const i=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+em(s.getShaderSource(e),o)}else return r}function im(s,e){const t=tm(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const nm={[lo]:"Linear",[co]:"Reinhard",[ho]:"Cineon",[Lr]:"ACESFilmic",[fo]:"AgX",[po]:"Neutral",[uo]:"Custom"};function sm(s,e){const t=nm[e];return t===void 0?(Ve("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ur=new P;function rm(){nt.getLuminanceCoefficients(ur);const s=ur.x.toFixed(4),e=ur.y.toFixed(4),t=ur.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function am(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(bs).join(`
`)}function om(s){const e=[];for(const t in s){const i=s[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function lm(s,e){const t={},i=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const r=s.getActiveAttrib(e,n),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function bs(s){return s!==""}function Ll(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Dl(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const cm=/^[ \t]*#include +<([\w\d./]+)>/gm;function ao(s){return s.replace(cm,hm)}function hm(s,e){const t=Qe[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return ao(t)}const dm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Il(s){return s.replace(dm,um)}function um(s,e,t,i){let n="";for(let r=parseInt(e);r<parseInt(t);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function Nl(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}const fm={[ws]:"SHADOWMAP_TYPE_PCF",[ys]:"SHADOWMAP_TYPE_VSM"};function pm(s){return fm[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const mm={[As]:"ENVMAP_MODE_REFRACTION"};function gm(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":mm[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const _m={[Vl]:"ENVMAP_BLENDING_MULTIPLY",[eh]:"ENVMAP_BLENDING_MIX",[th]:"ENVMAP_BLENDING_ADD"};function vm(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":_m[s.combine]||"ENVMAP_BLENDING_NONE"}function xm(s,e,t,i){const n=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=pm(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",d=gm(t),u=vm(t),h=am(t),p=om(r),_=n.createProgram();let M,m,f=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(M=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(bs).join(`
`),M.length>0&&(M+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(bs).join(`
`),m.length>0&&(m+=`
`)):(M=[Nl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(bs).join(`
`),m=[Nl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==tn?"#define TONE_MAPPING":"",t.toneMapping!==tn?Qe.tonemapping_pars_fragment:"",t.toneMapping!==tn?sm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,im("linearToOutputTexel",t.outputColorSpace),rm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(bs).join(`
`)),a=ao(a),a=Ll(a,t),a=Dl(a,t),o=ao(o),o=Ll(o,t),o=Dl(o,t),a=Il(a),o=Il(o),t.isRawShaderMaterial!==!0&&(f=`#version 300 es
`,M=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,m=["#define varying in",t.glslVersion===Bo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Bo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=f+M+a,w=f+m+o,b=Rl(n,n.VERTEX_SHADER,v),E=Rl(n,n.FRAGMENT_SHADER,w);n.attachShader(_,b),n.attachShader(_,E),t.index0AttributeName!==void 0?n.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&n.bindAttribLocation(_,0,"position"),n.linkProgram(_);function T(R){if(s.debug.checkShaderErrors){const L=n.getProgramInfoLog(_)||"",O=n.getShaderInfoLog(b)||"",Y=n.getShaderInfoLog(E)||"",I=L.trim(),U=O.trim(),j=Y.trim();let H=!0,ae=!0;if(n.getProgramParameter(_,n.LINK_STATUS)===!1)if(H=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,_,b,E);else{const $=Pl(n,b,"vertex"),ie=Pl(n,E,"fragment");at("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(_,n.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+I+`
`+$+`
`+ie)}else I!==""?Ve("WebGLProgram: Program Info Log:",I):(U===""||j==="")&&(ae=!1);ae&&(R.diagnostics={runnable:H,programLog:I,vertexShader:{log:U,prefix:M},fragmentShader:{log:j,prefix:m}})}n.deleteShader(b),n.deleteShader(E),g=new xr(n,_),y=lm(n,_)}let g;this.getUniforms=function(){return g===void 0&&T(this),g};let y;this.getAttributes=function(){return y===void 0&&T(this),y};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=n.getProgramParameter(_,Qp)),D},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=jp++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=b,this.fragmentShader=E,this}let Mm=0;class Sm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const n=this._getShaderCacheForMaterial(e);return n.has(t)===!1&&(n.add(t),t.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new ym(e),t.set(e,i)),i}}class ym{constructor(e){this.id=Mm++,this.code=e,this.usedTimes=0}}function bm(s){return s===Cn||s===Sr||s===yr}function wm(s,e,t,i,n,r){const a=new yo,o=new Sm,l=new Set,c=[],d=new Map,u=i.logarithmicDepthBuffer,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(g){return l.add(g),g===0?"uv":`uv${g}`}function _(g,y,D,R,L,O){const Y=R.fog,I=L.geometry,U=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?R.environment:null,j=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap,H=e.get(g.envMap||U,j),ae=h[g.type];let $=i.precision;g.precision!==null&&($=i.getMaxPrecision(g.precision),$!==g.precision&&Ve("WebGLProgram.getParameters:",g.precision,"not supported, using",$,"instead."));const ie=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,ne=ie!==void 0?ie.length:0;let Ee=0;I.morphAttributes.position!==void 0&&(Ee=1),I.morphAttributes.normal!==void 0&&(Ee=2),I.morphAttributes.color!==void 0&&(Ee=3);let He,q,ge,Te;if(ae){const Me=Wi[ae];He=Me.vertexShader,q=Me.fragmentShader}else{He=g.vertexShader,q=g.fragmentShader;const Me=o.getVertexShaderStage(g),dt=o.getFragmentShaderStage(g);o.update(g,Me,dt),ge=Me.id,Te=dt.id}const Se=s.getRenderTarget(),se=s.state.buffers.depth.getReversed(),ze=L.isInstancedMesh===!0,_t=L.isBatchedMesh===!0,Ge=!!g.map,ot=!!g.matcap,ht=!!H,Je=ht&&H.isPMREMTexture===!0,Bt=!!g.aoMap,Oe=!!g.lightMap,Kt=!!g.bumpMap&&g.wireframe===!1,yt=!!g.normalMap,yi=!!g.displacementMap,Ut=!!g.emissiveMap,oi=!!g.metalnessMap,li=!!g.roughnessMap,Xt=g.anisotropy>0,F=g.clearcoat>0,jt=g.diffuseRoughness>0,mt=g.dispersion>0,gt=g.retroreflectivity>0,ve=g.iridescence>0,vt=g.sheen>0,Be=g.transmission>0,ke=Xt&&!!g.anisotropyMap,A=F&&!!g.clearcoatMap,x=F&&!!g.clearcoatNormalMap,G=F&&!!g.clearcoatRoughnessMap,re=jt&&!!g.diffuseRoughnessMap,te=ve&&!!g.iridescenceMap,ue=ve&&!!g.iridescenceThicknessMap,fe=vt&&!!g.sheenColorMap,J=vt&&!!g.sheenRoughnessMap,Q=!!g.specularMap,pe=!!g.specularColorMap,C=!!g.specularIntensityMap,ee=Be&&!!g.transmissionMap,K=Be&&!!g.thicknessMap,me=!!g.gradientMap,de=!!g.alphaMap,he=g.alphaTest>0,Le=!!g.alphaHash,$e=!!g.extensions;let le=tn;g.toneMapped&&(Se===null||Se.isXRRenderTarget===!0)&&(le=s.toneMapping);const Ne=Je?H.isCompressedCubeTexture?H.image[0].mipmaps:H.mipmaps:null,Ke={shaderID:ae,shaderType:g.type,shaderName:g.name,vertexShader:He,fragmentShader:q,defines:g.defines,customVertexShaderID:ge,customFragmentShaderID:Te,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:$,batching:_t,batchingColor:_t&&L._colorsTexture!==null,instancing:ze,instancingColor:ze&&L.instanceColor!==null,instancingMorph:ze&&L.morphTexture!==null,outputColorSpace:Se===null?s.outputColorSpace:Se.isXRRenderTarget===!0?Se.texture.colorSpace:nt.workingColorSpace,alphaToCoverage:!!g.alphaToCoverage,map:Ge,matcap:ot,envMap:ht,envMapMode:ht&&H.mapping,envMapPMREM:Je,envMapMaxLod:Je?Ne.length-1:null,envMapSize:Je?Ne[0].width:null,aoMap:Bt,lightMap:Oe,bumpMap:Kt,normalMap:yt,displacementMap:yi,emissiveMap:Ut,normalMapObjectSpace:yt&&g.normalMapType===sh,normalMapTangentSpace:yt&&g.normalMapType===to,packedNormalMap:yt&&g.normalMapType===to&&bm(g.normalMap.format),metalnessMap:oi,roughnessMap:li,anisotropy:Xt,anisotropyMap:ke,clearcoat:F,clearcoatMap:A,clearcoatNormalMap:x,clearcoatRoughnessMap:G,diffuseRoughness:jt,diffuseRoughnessMap:re,dispersion:mt,retroreflection:gt,iridescence:ve,iridescenceMap:te,iridescenceThicknessMap:ue,sheen:vt,sheenColorMap:fe,sheenRoughnessMap:J,specularMap:Q,specularColorMap:pe,specularIntensityMap:C,transmission:Be,transmissionMap:ee,thicknessMap:K,gradientMap:me,opaque:g.transparent===!1&&g.blending===Es&&g.alphaToCoverage===!1,alphaMap:de,alphaTest:he,alphaHash:Le,combine:g.combine,mapUv:Ge&&p(g.map.channel),aoMapUv:Bt&&p(g.aoMap.channel),lightMapUv:Oe&&p(g.lightMap.channel),bumpMapUv:Kt&&p(g.bumpMap.channel),normalMapUv:yt&&p(g.normalMap.channel),displacementMapUv:yi&&p(g.displacementMap.channel),emissiveMapUv:Ut&&p(g.emissiveMap.channel),metalnessMapUv:oi&&p(g.metalnessMap.channel),roughnessMapUv:li&&p(g.roughnessMap.channel),anisotropyMapUv:ke&&p(g.anisotropyMap.channel),clearcoatMapUv:A&&p(g.clearcoatMap.channel),clearcoatNormalMapUv:x&&p(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:G&&p(g.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:re&&p(g.diffuseRoughnessMap.channel),iridescenceMapUv:te&&p(g.iridescenceMap.channel),iridescenceThicknessMapUv:ue&&p(g.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&p(g.sheenColorMap.channel),sheenRoughnessMapUv:J&&p(g.sheenRoughnessMap.channel),specularMapUv:Q&&p(g.specularMap.channel),specularColorMapUv:pe&&p(g.specularColorMap.channel),specularIntensityMapUv:C&&p(g.specularIntensityMap.channel),transmissionMapUv:ee&&p(g.transmissionMap.channel),thicknessMapUv:K&&p(g.thicknessMap.channel),alphaMapUv:de&&p(g.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(yt||Xt),vertexNormals:!!I.attributes.normal,vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!I.attributes.uv&&(Ge||de),fog:!!Y,useFog:g.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:g.wireframe===!1&&(g.flatShading===!0||I.attributes.normal===void 0&&yt===!1&&(g.isMeshLambertMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isMeshPhysicalMaterial)),sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:se,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:Ee,numSunLights:y.sun.length,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numSunLightShadows:y.sunShadowMap.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numLightProbeGrids:O.filter(Me=>Me.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:g.dithering,shadowMapEnabled:s.shadowMap.enabled&&D.length>0,shadowMapType:s.shadowMap.type,toneMapping:le,decodeVideoTexture:Ge&&g.map.isVideoTexture===!0&&nt.getTransfer(g.map.colorSpace)===pt,decodeVideoTextureEmissive:Ut&&g.emissiveMap.isVideoTexture===!0&&nt.getTransfer(g.emissiveMap.colorSpace)===pt,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===ni,flipSided:g.side===pi,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:$e&&g.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($e&&g.extensions.multiDraw===!0||_t)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return Ke.vertexUv1s=l.has(1),Ke.vertexUv2s=l.has(2),Ke.vertexUv3s=l.has(3),l.clear(),Ke}function M(g){const y=[];if(g.shaderID?y.push(g.shaderID):(y.push(g.customVertexShaderID),y.push(g.customFragmentShaderID)),g.defines!==void 0)for(const D in g.defines)y.push(D),y.push(g.defines[D]);return g.isRawShaderMaterial===!1&&(m(y,g),f(y,g),y.push(s.outputColorSpace)),y.push(g.customProgramCacheKey),y.join()}function m(g,y){g.push(y.precision),g.push(y.outputColorSpace),g.push(y.envMapMode),g.push(y.envMapPMREM),g.push(y.envMapMaxLod),g.push(y.envMapSize),g.push(y.mapUv),g.push(y.alphaMapUv),g.push(y.lightMapUv),g.push(y.aoMapUv),g.push(y.bumpMapUv),g.push(y.normalMapUv),g.push(y.displacementMapUv),g.push(y.emissiveMapUv),g.push(y.metalnessMapUv),g.push(y.roughnessMapUv),g.push(y.anisotropyMapUv),g.push(y.clearcoatMapUv),g.push(y.clearcoatNormalMapUv),g.push(y.clearcoatRoughnessMapUv),g.push(y.diffuseRoughnessMapUv),g.push(y.iridescenceMapUv),g.push(y.iridescenceThicknessMapUv),g.push(y.sheenColorMapUv),g.push(y.sheenRoughnessMapUv),g.push(y.specularMapUv),g.push(y.specularColorMapUv),g.push(y.specularIntensityMapUv),g.push(y.transmissionMapUv),g.push(y.thicknessMapUv),g.push(y.combine),g.push(y.fogExp2),g.push(y.sizeAttenuation),g.push(y.morphTargetsCount),g.push(y.numSunLights),g.push(y.numDirLights),g.push(y.numPointLights),g.push(y.numSpotLights),g.push(y.numSpotLightMaps),g.push(y.numHemiLights),g.push(y.numRectAreaLights),g.push(y.numSunLightShadows),g.push(y.numDirLightShadows),g.push(y.numPointLightShadows),g.push(y.numSpotLightShadows),g.push(y.numSpotLightShadowsWithMaps),g.push(y.numLightProbes),g.push(y.numLightProbeGrids),g.push(y.shadowMapType),g.push(y.toneMapping),g.push(y.numClippingPlanes),g.push(y.numClipIntersection),g.push(y.depthPacking)}function f(g,y){a.disableAll(),y.instancing&&a.enable(0),y.instancingColor&&a.enable(1),y.instancingMorph&&a.enable(2),y.matcap&&a.enable(3),y.envMap&&a.enable(4),y.normalMapObjectSpace&&a.enable(5),y.normalMapTangentSpace&&a.enable(6),y.clearcoat&&a.enable(7),y.iridescence&&a.enable(8),y.alphaTest&&a.enable(9),y.vertexColors&&a.enable(10),y.vertexAlphas&&a.enable(11),y.vertexUv1s&&a.enable(12),y.vertexUv2s&&a.enable(13),y.vertexUv3s&&a.enable(14),y.vertexTangents&&a.enable(15),y.anisotropy&&a.enable(16),y.alphaHash&&a.enable(17),y.batching&&a.enable(18),y.dispersion&&a.enable(19),y.retroreflection&&a.enable(24),y.diffuseRoughness&&a.enable(25),y.batchingColor&&a.enable(20),y.gradientMap&&a.enable(21),y.packedNormalMap&&a.enable(22),y.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),y.numLightProbeGrids>0&&a.enable(22),y.hasPositionAttribute&&a.enable(23),g.push(a.mask)}function v(g){const y=h[g.type];let D;if(y){const R=Wi[y];D=Ds.clone(R.uniforms)}else D=g.uniforms;return D}function w(g,y){let D=d.get(y);return D!==void 0?++D.usedTimes:(D=new xm(s,y,g,n),c.push(D),d.set(y,D)),D}function b(g){if(--g.usedTimes===0){const y=c.indexOf(g);c[y]=c[c.length-1],c.pop(),d.delete(g.cacheKey),g.destroy()}}function E(g){o.remove(g)}function T(){o.dispose()}return{getParameters:_,getProgramCacheKey:M,getUniforms:v,acquireProgram:w,releaseProgram:b,releaseShaderCache:E,programs:c,dispose:T}}function Em(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function i(a){s.delete(a)}function n(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:i,update:n,dispose:r}}function Tm(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function Ul(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Fl(){const s=[];let e=0;const t=[],i=[],n=[];function r(){e=0,t.length=0,i.length=0,n.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,_,M,m,f){let v=s[e];return v===void 0?(v={id:h.id,object:h,geometry:p,material:_,materialVariant:a(h),groupOrder:M,renderOrder:h.renderOrder,z:m,group:f},s[e]=v):(v.id=h.id,v.object=h,v.geometry=p,v.material=_,v.materialVariant=a(h),v.groupOrder=M,v.renderOrder=h.renderOrder,v.z=m,v.group=f),e++,v}function l(h,p,_,M,m,f,v){v.reversedDepth===!0&&(m=-m);const w=o(h,p,_,M,m,f);_.transmission>0?i.push(w):_.transparent===!0?n.push(w):t.push(w)}function c(h,p,_,M,m,f){const v=o(h,p,_,M,m,f);_.transmission>0?i.unshift(v):_.transparent===!0?n.unshift(v):t.unshift(v)}function d(h,p){t.length>1&&t.sort(h||Tm),i.length>1&&i.sort(p||Ul),n.length>1&&n.sort(p||Ul)}function u(){for(let h=e,p=s.length;h<p;h++){const _=s[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:i,transparent:n,init:r,push:l,unshift:c,finish:u,sort:d}}function Am(){let s=new WeakMap;function e(i,n){const r=s.get(i);let a;return r===void 0?(a=new Fl,s.set(i,[a])):n>=r.length?(a=new Fl,r.push(a)):a=r[n],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Rm(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new P,color:new Fe};break;case"SpotLight":t={position:new P,direction:new P,color:new Fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Fe,groundColor:new Fe};break;case"RectAreaLight":t={color:new Fe,position:new P,halfWidth:new P,halfHeight:new P};break}return s[e.id]=t,t}}}function Cm(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Pm=0;function Lm(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Dm(s){const e=new Rm,t=Cm(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);const n=new P,r=new St,a=new St;function o(c){let d=0,u=0,h=0;for(let O=0;O<9;O++)i.probe[O].set(0,0,0);let p=0,_=0,M=0,m=0,f=0,v=0,w=0,b=0,E=0,T=0,g=0,y=0,D=0,R=0;c.sort(Lm);for(let O=0,Y=c.length;O<Y;O++){const I=c[O],U=I.color,j=I.intensity,H=I.distance;let ae=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Cn?ae=I.shadow.map.texture:ae=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)d+=U.r*j,u+=U.g*j,h+=U.b*j;else if(I.isLightProbe){for(let $=0;$<9;$++)i.probe[$].addScaledVector(I.sh.coefficients[$],j);R++}else if(I.isSunLight){const $=e.get(I);if($.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ie=I.shadow,ne=t.get(I);ne.shadowIntensity=ie.intensity,ne.shadowBias=ie.bias,ne.shadowNormalBias=ie.normalBias,ne.shadowRadius=ie.radius,ne.shadowMapSize.copy(ie.mapSize).multiply(ie.getFrameExtents()),i.sunShadow[_]=ne,i.sunShadowMap[_]=ae;const Ee=ie.getViewportCount();for(let He=0;He<Ee;He++)i.sunShadowMatrix[M+He]=ie.getMatrix(He),i.sunShadowCascade[M+He]=ie._cascadeData[He];M+=Ee,_++}i.sun[p]=$,p++}else if(I.isDirectionalLight){const $=e.get(I);if($.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ie=I.shadow,ne=t.get(I);ne.shadowIntensity=ie.intensity,ne.shadowBias=ie.bias,ne.shadowNormalBias=ie.normalBias,ne.shadowRadius=ie.radius,ne.shadowMapSize=ie.mapSize,i.directionalShadow[m]=ne,i.directionalShadowMap[m]=ae,i.directionalShadowMatrix[m]=I.shadow.matrix,E++}i.directional[m]=$,m++}else if(I.isSpotLight){const $=e.get(I);$.position.setFromMatrixPosition(I.matrixWorld),$.color.copy(U).multiplyScalar(j),$.distance=H,$.coneCos=Math.cos(I.angle),$.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),$.decay=I.decay,i.spot[v]=$;const ie=I.shadow;if(I.map&&(i.spotLightMap[y]=I.map,y++,ie.updateMatrices(I),I.castShadow&&D++),i.spotLightMatrix[v]=ie.matrix,I.castShadow){const ne=t.get(I);ne.shadowIntensity=ie.intensity,ne.shadowBias=ie.bias,ne.shadowNormalBias=ie.normalBias,ne.shadowRadius=ie.radius,ne.shadowMapSize=ie.mapSize,i.spotShadow[v]=ne,i.spotShadowMap[v]=ae,g++}v++}else if(I.isRectAreaLight){const $=e.get(I);$.color.copy(U).multiplyScalar(j),$.halfWidth.set(I.width*.5,0,0),$.halfHeight.set(0,I.height*.5,0),i.rectArea[w]=$,w++}else if(I.isPointLight){const $=e.get(I);if($.color.copy(I.color).multiplyScalar(I.intensity),$.distance=I.distance,$.decay=I.decay,I.castShadow){const ie=I.shadow,ne=t.get(I);ne.shadowIntensity=ie.intensity,ne.shadowBias=ie.bias,ne.shadowNormalBias=ie.normalBias,ne.shadowRadius=ie.radius,ne.shadowMapSize=ie.mapSize,ne.shadowCameraNear=ie.camera.near,ne.shadowCameraFar=ie.camera.far,i.pointShadow[f]=ne,i.pointShadowMap[f]=ae,i.pointShadowMatrix[f]=I.shadow.matrix,T++}i.point[f]=$,f++}else if(I.isHemisphereLight){const $=e.get(I);$.skyColor.copy(I.color).multiplyScalar(j),$.groundColor.copy(I.groundColor).multiplyScalar(j),i.hemi[b]=$,b++}}w>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ye.LTC_FLOAT_1,i.rectAreaLTC2=ye.LTC_FLOAT_2):(i.rectAreaLTC1=ye.LTC_HALF_1,i.rectAreaLTC2=ye.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=u,i.ambient[2]=h;const L=i.hash;(L.sunLength!==p||L.directionalLength!==m||L.pointLength!==f||L.spotLength!==v||L.rectAreaLength!==w||L.hemiLength!==b||L.numSunShadows!==_||L.numDirectionalShadows!==E||L.numPointShadows!==T||L.numSpotShadows!==g||L.numSpotMaps!==y||L.numLightProbes!==R)&&(i.sun.length=p,i.directional.length=m,i.spot.length=v,i.rectArea.length=w,i.point.length=f,i.hemi.length=b,i.sunShadow.length=_,i.sunShadowMap.length=_,i.sunShadowMatrix.length=M,i.sunShadowCascade.length=M,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.directionalShadowMatrix.length=E,i.pointShadow.length=T,i.pointShadowMap.length=T,i.pointShadowMatrix.length=T,i.spotShadow.length=g,i.spotShadowMap.length=g,i.spotLightMatrix.length=g+y-D,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=D,i.numLightProbes=R,L.sunLength=p,L.directionalLength=m,L.pointLength=f,L.spotLength=v,L.rectAreaLength=w,L.hemiLength=b,L.numSunShadows=_,L.numDirectionalShadows=E,L.numPointShadows=T,L.numSpotShadows=g,L.numSpotMaps=y,L.numLightProbes=R,i.version=Pm++)}function l(c,d){let u=0,h=0,p=0,_=0,M=0,m=0;const f=d.matrixWorldInverse;for(let v=0,w=c.length;v<w;v++){const b=c[v];if(b.isSunLight){const E=i.sun[u];E.direction.setFromMatrixPosition(b.matrixWorld),E.direction.transformDirection(f),u++}else if(b.isDirectionalLight){const E=i.directional[h];E.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),E.direction.sub(n),E.direction.transformDirection(f),h++}else if(b.isSpotLight){const E=i.spot[_];E.position.setFromMatrixPosition(b.matrixWorld),E.position.applyMatrix4(f),E.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),E.direction.sub(n),E.direction.transformDirection(f),_++}else if(b.isRectAreaLight){const E=i.rectArea[M];E.position.setFromMatrixPosition(b.matrixWorld),E.position.applyMatrix4(f),a.identity(),r.copy(b.matrixWorld),r.premultiply(f),a.extractRotation(r),E.halfWidth.set(b.width*.5,0,0),E.halfHeight.set(0,b.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),M++}else if(b.isPointLight){const E=i.point[p];E.position.setFromMatrixPosition(b.matrixWorld),E.position.applyMatrix4(f),p++}else if(b.isHemisphereLight){const E=i.hemi[m];E.direction.setFromMatrixPosition(b.matrixWorld),E.direction.transformDirection(f),m++}}}return{setup:o,setupView:l,state:i}}function Ol(s){const e=new Dm(s),t=[],i=[],n=[];function r(u){d.camera=u,t.length=0,i.length=0,n.length=0}function a(u){u.isLightProbeGrid?n.push(u):t.push(u)}function o(u){i.push(u)}function l(){e.setup(t),n.sort((u,h)=>u.priority-h.priority||u.id-h.id)}function c(u){e.setupView(t,u)}const d={lightsArray:t,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Im(s){let e=new WeakMap;function t(n,r=0){const a=e.get(n);let o;return a===void 0?(o=new Ol(s),e.set(n,[o])):r>=a.length?(o=new Ol(s),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Nm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Um=`uniform sampler2D shadow_pass;
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
}`,Fm=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],Om=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],Bl=new St,Ms=new P,ga=new P;function Bm(s,e,t){let i=new Ls;const n=new Ae,r=new Ae,a=new It,o=new Yh,l=new $h,c={},d=t.maxTextureSize,u={[Rn]:pi,[pi]:Rn,[ni]:ni},h=new fi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ae},radius:{value:4}},vertexShader:Nm,fragmentShader:Um}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const _=new Nt;_.setAttribute("position",new Mi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new z(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ws;let f=this.type;this.render=function(T,g,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===Uc&&(Ve("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ws);const D=s.getRenderTarget(),R=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),O=s.state;O.setBlending(Tn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const Y=f!==this.type;Y&&g.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(U=>U.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,U=T.length;I<U;I++){const j=T[I],H=j.shadow;if(H===void 0){Ve("WebGLShadowMap:",j,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;n.copy(H.mapSize);const ae=H.getFrameExtents();n.multiply(ae),r.copy(H.mapSize),(n.x>d||n.y>d)&&(n.x>d&&(r.x=Math.floor(d/ae.x),n.x=r.x*ae.x,H.mapSize.x=r.x),n.y>d&&(r.y=Math.floor(d/ae.y),n.y=r.y*ae.y,H.mapSize.y=r.y));const $=s.state.buffers.depth.getReversed();if(H.camera._reversedDepth=$,H.map===null||Y===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===ys){if(j.isPointLight){Ve("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new Ti(n.x,n.y,{format:Cn,type:Ei,minFilter:wi,magFilter:wi,generateMipmaps:!1}),H.map.texture.name=j.name+".shadowMap",H.map.depthTexture=new is(n.x,n.y,Xi),H.map.depthTexture.name=j.name+".shadowMapDepth",H.map.depthTexture.format=vn,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=si,H.map.depthTexture.magFilter=si}else j.isPointLight?(H.map=new Ao(n.x),H.map.depthTexture=new uc(n.x,Yi)):(H.map=new Ti(n.x,n.y),H.map.depthTexture=new is(n.x,n.y,Yi)),H.map.depthTexture.name=j.name+".shadowMap",H.map.depthTexture.format=vn,this.type===ws?(H.map.depthTexture.compareFunction=$?jl:Ql,H.map.depthTexture.minFilter=wi,H.map.depthTexture.magFilter=wi):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=si,H.map.depthTexture.magFilter=si);H.camera.updateProjectionMatrix()}H.map.isWebGLCubeRenderTarget!==!0&&(H.map.width!==n.x||H.map.height!==n.y)&&H.map.setSize(n.x,n.y);const ie=H.map.isWebGLCubeRenderTarget?6:H.getViewportCount();j.isPointLight!==!0&&H.updateMatrices(j,y);const ne=(H.camera.layers.mask&4294967294)!==0?H.camera.layers:y.layers;for(let Ee=0;Ee<ie;Ee++){const He=H.getCamera(Ee);if(j.isPointLight){const q=H.camera,ge=H.matrix,Te=j.distance||q.far;Te!==q.far&&(q.far=Te,q.updateProjectionMatrix()),Ms.setFromMatrixPosition(j.matrixWorld),q.position.copy(Ms),ga.copy(q.position),ga.add(Fm[Ee]),q.up.copy(Om[Ee]),q.lookAt(ga),q.updateMatrixWorld(),ge.makeTranslation(-Ms.x,-Ms.y,-Ms.z),Bl.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Bl,q.coordinateSystem,q.reversedDepth)}if(H.map.isWebGLCubeRenderTarget)s.setRenderTarget(H.map,Ee),s.clear();else{Ee===0&&(s.setRenderTarget(H.map),s.clear());const q=H.getViewport(Ee);a.set(r.x*q.x,r.y*q.y,r.x*q.z,r.y*q.w),O.viewport(a)}i=H.getFrustum(Ee),b(g,y,He,j,ne,this.type)}H.isPointLightShadow!==!0&&this.type===ys&&v(H,y),H.needsUpdate=!1}f=this.type,m.needsUpdate=!1,s.setRenderTarget(D,R,L)};function v(T,g){const y=e.update(M);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null?T.mapPass=new Ti(n.x,n.y,{format:Cn,type:Ei}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),h.uniforms.shadow_pass.value=T.map.depthTexture,h.uniforms.resolution.value.set(T.map.width,T.map.height),h.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(g,null,y,h,M,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value.set(T.map.width,T.map.height),p.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(g,null,y,p,M,null)}function w(T,g,y,D){let R=null;const L=y.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(L!==void 0)R=L;else if(R=y.isPointLight===!0?l:o,s.localClippingEnabled&&g.clipShadows===!0&&Array.isArray(g.clippingPlanes)&&g.clippingPlanes.length!==0||g.displacementMap&&g.displacementScale!==0||g.alphaMap&&g.alphaTest>0||g.map&&g.alphaTest>0||g.alphaToCoverage===!0){const O=R.uuid,Y=g.uuid;let I=c[O];I===void 0&&(I={},c[O]=I);let U=I[Y];U===void 0&&(U=R.clone(),I[Y]=U,g.addEventListener("dispose",E)),R=U}if(R.visible=g.visible,R.wireframe=g.wireframe,D===ys?R.side=g.shadowSide!==null?g.shadowSide:g.side:R.side=g.shadowSide!==null?g.shadowSide:u[g.side],R.alphaMap=g.alphaMap,R.alphaTest=g.alphaToCoverage===!0?.5:g.alphaTest,R.map=g.map,R.clipShadows=g.clipShadows,R.clippingPlanes=g.clippingPlanes,R.clipIntersection=g.clipIntersection,R.displacementMap=g.displacementMap,R.displacementScale=g.displacementScale,R.displacementBias=g.displacementBias,R.wireframeLinewidth=g.wireframeLinewidth,R.linewidth=g.linewidth,y.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const O=s.properties.get(R);O.light=y}return R}function b(T,g,y,D,R,L){if(T.visible===!1)return;if(T.layers.test(R)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&L===ys)&&(!T.frustumCulled||T.intersectsFrustum(i))){T.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,T.matrixWorld);const I=e.update(T),U=T.material;if(Array.isArray(U)){const j=I.groups;for(let H=0,ae=j.length;H<ae;H++){const $=j[H],ie=U[$.materialIndex];if(ie&&ie.visible){const ne=w(T,ie,D,L);T.onBeforeShadow(s,T,g,y,I,ne,$),s.renderBufferDirect(y,null,I,ne,T,$),T.onAfterShadow(s,T,g,y,I,ne,$)}}}else if(U.visible){const j=w(T,U,D,L);T.onBeforeShadow(s,T,g,y,I,j,null),s.renderBufferDirect(y,null,I,j,T,null),T.onAfterShadow(s,T,g,y,I,j,null)}}const Y=T.children;for(let I=0,U=Y.length;I<U;I++)b(Y[I],g,y,D,R,L)}function E(T){T.target.removeEventListener("dispose",E);for(const y in c){const D=c[y],R=T.target.uuid;R in D&&(D[R].dispose(),delete D[R])}}}function zm(s,e){function t(){let C=!1;const ee=new It;let K=null;const me=new It(0,0,0,0);return{setMask:function(de){K!==de&&!C&&(s.colorMask(de,de,de,de),K=de)},setLocked:function(de){C=de},setClear:function(de,he,Le,$e,le){le===!0&&(de*=$e,he*=$e,Le*=$e),ee.set(de,he,Le,$e),me.equals(ee)===!1&&(s.clearColor(de,he,Le,$e),me.copy(ee))},reset:function(){C=!1,K=null,me.set(-1,0,0,0)}}}function i(){let C=!1,ee=!1,K=null,me=null,de=null;return{setReversed:function(he){if(ee!==he){const Le=e.get("EXT_clip_control");he?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),ee=he;const $e=de;de=null,this.setClear($e)}},getReversed:function(){return ee},setTest:function(he){he?se(s.DEPTH_TEST):ze(s.DEPTH_TEST)},setMask:function(he){K!==he&&!C&&(s.depthMask(he),K=he)},setFunc:function(he){if(ee&&(he=ph[he]),me!==he){switch(he){case _a:s.depthFunc(s.NEVER);break;case va:s.depthFunc(s.ALWAYS);break;case xa:s.depthFunc(s.LESS);break;case Ts:s.depthFunc(s.LEQUAL);break;case Ma:s.depthFunc(s.EQUAL);break;case Sa:s.depthFunc(s.GEQUAL);break;case ya:s.depthFunc(s.GREATER);break;case ba:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}me=he}},setLocked:function(he){C=he},setClear:function(he){de!==he&&(de=he,ee&&(he=1-he),s.clearDepth(he))},reset:function(){C=!1,K=null,me=null,de=null,ee=!1}}}function n(){let C=!1,ee=null,K=null,me=null,de=null,he=null,Le=null,$e=null,le=null;return{setTest:function(Ne){C||(Ne?se(s.STENCIL_TEST):ze(s.STENCIL_TEST))},setMask:function(Ne){ee!==Ne&&!C&&(s.stencilMask(Ne),ee=Ne)},setFunc:function(Ne,Ke,Me){(K!==Ne||me!==Ke||de!==Me)&&(s.stencilFunc(Ne,Ke,Me),K=Ne,me=Ke,de=Me)},setOp:function(Ne,Ke,Me){(he!==Ne||Le!==Ke||$e!==Me)&&(s.stencilOp(Ne,Ke,Me),he=Ne,Le=Ke,$e=Me)},setLocked:function(Ne){C=Ne},setClear:function(Ne){le!==Ne&&(s.clearStencil(Ne),le=Ne)},reset:function(){C=!1,ee=null,K=null,me=null,de=null,he=null,Le=null,$e=null,le=null}}}const r=new t,a=new i,o=new n;let l={};const c=new WeakMap;let d={},u={},h={},p=new WeakMap,_=[],M=null,m=!1,f=null,v=null,w=null,b=null,E=null,T=null,g=null,y=new Fe(0,0,0),D=0,R=!1,L=null,O=null,Y=null,I=null,U=null;const j=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,ae=0;const $=s.getParameter(s.VERSION);$.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec($)[1]),H=ae>=1):$.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),H=ae>=2);let ie=null,ne={};const Ee=s.getParameter(s.SCISSOR_BOX),He=s.getParameter(s.VIEWPORT),q=new It().fromArray(Ee),ge=new It().fromArray(He);function Te(C,ee,K,me){const de=new Uint8Array(4),he=s.createTexture();s.bindTexture(C,he),s.texParameteri(C,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(C,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Le=0;Le<K;Le++)C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY?s.texImage3D(ee,0,s.RGBA,1,1,me,0,s.RGBA,s.UNSIGNED_BYTE,de):s.texImage2D(ee+Le,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,de);return he}const Se={};Se[s.TEXTURE_2D]=Te(s.TEXTURE_2D,s.TEXTURE_2D,1),Se[s.TEXTURE_CUBE_MAP]=Te(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Se[s.TEXTURE_2D_ARRAY]=Te(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Se[s.TEXTURE_3D]=Te(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),se(s.DEPTH_TEST),a.setFunc(Ts),Kt(!1),yt(Uo),se(s.CULL_FACE),Bt(Tn);function se(C){d[C]!==!0&&(s.enable(C),d[C]=!0)}function ze(C){d[C]!==!1&&(s.disable(C),d[C]=!1)}function _t(C,ee){return h[C]!==ee?(s.bindFramebuffer(C,ee),h[C]=ee,C===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=ee),C===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=ee),!0):!1}function Ge(C,ee){let K=_,me=!1;if(C){K=p.get(ee),K===void 0&&(K=[],p.set(ee,K));const de=C.textures;if(K.length!==de.length||K[0]!==s.COLOR_ATTACHMENT0){for(let he=0,Le=de.length;he<Le;he++)K[he]=s.COLOR_ATTACHMENT0+he;K.length=de.length,me=!0}}else K[0]!==s.BACK&&(K[0]=s.BACK,me=!0);me&&s.drawBuffers(K)}function ot(C){return M!==C?(s.useProgram(C),M=C,!0):!1}const ht={[$n]:s.FUNC_ADD,[Oc]:s.FUNC_SUBTRACT,[Bc]:s.FUNC_REVERSE_SUBTRACT};ht[zc]=s.MIN,ht[kc]=s.MAX;const Je={[Gc]:s.ZERO,[Hc]:s.ONE,[Vc]:s.SRC_COLOR,[Gl]:s.SRC_ALPHA,[Kc]:s.SRC_ALPHA_SATURATE,[Yc]:s.DST_COLOR,[Xc]:s.DST_ALPHA,[Wc]:s.ONE_MINUS_SRC_COLOR,[Hl]:s.ONE_MINUS_SRC_ALPHA,[$c]:s.ONE_MINUS_DST_COLOR,[qc]:s.ONE_MINUS_DST_ALPHA,[Zc]:s.CONSTANT_COLOR,[Jc]:s.ONE_MINUS_CONSTANT_COLOR,[Qc]:s.CONSTANT_ALPHA,[jc]:s.ONE_MINUS_CONSTANT_ALPHA};function Bt(C,ee,K,me,de,he,Le,$e,le,Ne){if(C===Tn){m===!0&&(ze(s.BLEND),m=!1);return}if(m===!1&&(se(s.BLEND),m=!0),C!==Fc){if(C!==f||Ne!==R){if((v!==$n||E!==$n)&&(s.blendEquation(s.FUNC_ADD),v=$n,E=$n),Ne)switch(C){case Es:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case We:s.blendFunc(s.ONE,s.ONE);break;case Fo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Oo:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:at("WebGLState: Invalid blending: ",C);break}else switch(C){case Es:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case We:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Fo:at("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Oo:at("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:at("WebGLState: Invalid blending: ",C);break}w=null,b=null,T=null,g=null,y.set(0,0,0),D=0,f=C,R=Ne}return}de=de||ee,he=he||K,Le=Le||me,(ee!==v||de!==E)&&(s.blendEquationSeparate(ht[ee],ht[de]),v=ee,E=de),(K!==w||me!==b||he!==T||Le!==g)&&(s.blendFuncSeparate(Je[K],Je[me],Je[he],Je[Le]),w=K,b=me,T=he,g=Le),($e.equals(y)===!1||le!==D)&&(s.blendColor($e.r,$e.g,$e.b,le),y.copy($e),D=le),f=C,R=!1}function Oe(C,ee){C.side===ni?ze(s.CULL_FACE):se(s.CULL_FACE);let K=C.side===pi;ee&&(K=!K),Kt(K),C.blending===Es&&C.transparent===!1?Bt(Tn):Bt(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),a.setFunc(C.depthFunc),a.setTest(C.depthTest),a.setMask(C.depthWrite),r.setMask(C.colorWrite);const me=C.stencilWrite;o.setTest(me),me&&(o.setMask(C.stencilWriteMask),o.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),o.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),Ut(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?se(s.SAMPLE_ALPHA_TO_COVERAGE):ze(s.SAMPLE_ALPHA_TO_COVERAGE)}function Kt(C){L!==C&&(C?s.frontFace(s.CW):s.frontFace(s.CCW),L=C)}function yt(C){C!==Ic?(se(s.CULL_FACE),C!==O&&(C===Uo?s.cullFace(s.BACK):C===Nc?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ze(s.CULL_FACE),O=C}function yi(C){C!==Y&&(H&&s.lineWidth(C),Y=C)}function Ut(C,ee,K){C?(se(s.POLYGON_OFFSET_FILL),(I!==ee||U!==K)&&(I=ee,U=K,a.getReversed()&&(ee=-ee,K=-K),s.polygonOffset(ee,K))):ze(s.POLYGON_OFFSET_FILL)}function oi(C){C?se(s.SCISSOR_TEST):ze(s.SCISSOR_TEST)}function li(C){C===void 0&&(C=s.TEXTURE0+j-1),ie!==C&&(s.activeTexture(C),ie=C)}function Xt(C,ee,K){K===void 0&&(ie===null?K=s.TEXTURE0+j-1:K=ie);let me=ne[K];me===void 0&&(me={type:void 0,texture:void 0},ne[K]=me),(me.type!==C||me.texture!==ee)&&(ie!==K&&(s.activeTexture(K),ie=K),s.bindTexture(C,ee||Se[C]),me.type=C,me.texture=ee)}function F(){const C=ne[ie];C!==void 0&&C.type!==void 0&&(s.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function jt(){try{s.compressedTexImage2D(...arguments)}catch(C){at("WebGLState:",C)}}function mt(){try{s.compressedTexImage3D(...arguments)}catch(C){at("WebGLState:",C)}}function gt(){try{s.texSubImage2D(...arguments)}catch(C){at("WebGLState:",C)}}function ve(){try{s.texSubImage3D(...arguments)}catch(C){at("WebGLState:",C)}}function vt(){try{s.compressedTexSubImage2D(...arguments)}catch(C){at("WebGLState:",C)}}function Be(){try{s.compressedTexSubImage3D(...arguments)}catch(C){at("WebGLState:",C)}}function ke(){try{s.texStorage2D(...arguments)}catch(C){at("WebGLState:",C)}}function A(){try{s.texStorage3D(...arguments)}catch(C){at("WebGLState:",C)}}function x(){try{s.texImage2D(...arguments)}catch(C){at("WebGLState:",C)}}function G(){try{s.texImage3D(...arguments)}catch(C){at("WebGLState:",C)}}function re(C){return u[C]!==void 0?u[C]:s.getParameter(C)}function te(C,ee){u[C]!==ee&&(s.pixelStorei(C,ee),u[C]=ee)}function ue(C){q.equals(C)===!1&&(s.scissor(C.x,C.y,C.z,C.w),q.copy(C))}function fe(C){ge.equals(C)===!1&&(s.viewport(C.x,C.y,C.z,C.w),ge.copy(C))}function J(C,ee){let K=c.get(ee);K===void 0&&(K=new WeakMap,c.set(ee,K));let me=K.get(C);me===void 0&&(me=s.getUniformBlockIndex(ee,C.name),s.uniformBlockBinding(ee,me,me),K.set(C,me))}function Q(C,ee,K){const de=c.get(ee).get(C);l[de]!==K&&(s.bindBufferBase(s.UNIFORM_BUFFER,de,K),l[de]=K)}function pe(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),d={},u={},ie=null,ne={},h={},l={},p=new WeakMap,_=[],M=null,m=!1,f=null,v=null,w=null,b=null,E=null,T=null,g=null,y=new Fe(0,0,0),D=0,R=!1,L=null,O=null,Y=null,I=null,U=null,q.set(0,0,s.canvas.width,s.canvas.height),ge.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:se,disable:ze,bindFramebuffer:_t,drawBuffers:Ge,useProgram:ot,setBlending:Bt,setMaterial:Oe,setFlipSided:Kt,setCullFace:yt,setLineWidth:yi,setPolygonOffset:Ut,setScissorTest:oi,activeTexture:li,bindTexture:Xt,unbindTexture:F,compressedTexImage2D:jt,compressedTexImage3D:mt,texImage2D:x,texImage3D:G,pixelStorei:te,getParameter:re,updateUBOMapping:J,uniformBlockBinding:Q,texStorage2D:ke,texStorage3D:A,texSubImage2D:gt,texSubImage3D:ve,compressedTexSubImage2D:vt,compressedTexSubImage3D:Be,scissor:ue,viewport:fe,reset:pe}}function km(s,e,t,i,n,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ae,d=new WeakMap,u=new Set;let h;const p=new WeakMap,_=new Set,M=new FinalizationRegistry(A=>_.delete(A));let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(A,x){return m?new OffscreenCanvas(A,x):Er("canvas")}function v(A,x,G){let re=1;const te=ke(A);if((te.width>G||te.height>G)&&(re=G/Math.max(te.width,te.height)),re<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const ue=Math.floor(re*te.width),fe=Math.floor(re*te.height);h===void 0&&(h=f(ue,fe));const J=x?f(ue,fe):h;return J.width=ue,J.height=fe,J.getContext("2d").drawImage(A,0,0,ue,fe),Ve("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+ue+"x"+fe+")."),J}else return"data"in A&&Ve("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),A;return A}function w(A){return A.generateMipmaps}function b(A){s.generateMipmap(A)}function E(A){return A.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?s.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function T(A,x,G,re,te,ue=!1){if(A!==null){if(s[A]!==void 0)return s[A];Ve("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let fe;re&&(fe=e.get("EXT_texture_norm16"),fe||Ve("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=x;if(x===s.RED&&(G===s.FLOAT&&(J=s.R32F),G===s.HALF_FLOAT&&(J=s.R16F),G===s.UNSIGNED_BYTE&&(J=s.R8),G===s.UNSIGNED_SHORT&&fe&&(J=fe.R16_EXT),G===s.SHORT&&fe&&(J=fe.R16_SNORM_EXT)),x===s.RED_INTEGER&&(G===s.UNSIGNED_BYTE&&(J=s.R8UI),G===s.UNSIGNED_SHORT&&(J=s.R16UI),G===s.UNSIGNED_INT&&(J=s.R32UI),G===s.BYTE&&(J=s.R8I),G===s.SHORT&&(J=s.R16I),G===s.INT&&(J=s.R32I)),x===s.RG&&(G===s.FLOAT&&(J=s.RG32F),G===s.HALF_FLOAT&&(J=s.RG16F),G===s.UNSIGNED_BYTE&&(J=s.RG8),G===s.UNSIGNED_SHORT&&fe&&(J=fe.RG16_EXT),G===s.SHORT&&fe&&(J=fe.RG16_SNORM_EXT)),x===s.RG_INTEGER&&(G===s.UNSIGNED_BYTE&&(J=s.RG8UI),G===s.UNSIGNED_SHORT&&(J=s.RG16UI),G===s.UNSIGNED_INT&&(J=s.RG32UI),G===s.BYTE&&(J=s.RG8I),G===s.SHORT&&(J=s.RG16I),G===s.INT&&(J=s.RG32I)),x===s.RGB_INTEGER&&(G===s.UNSIGNED_BYTE&&(J=s.RGB8UI),G===s.UNSIGNED_SHORT&&(J=s.RGB16UI),G===s.UNSIGNED_INT&&(J=s.RGB32UI),G===s.BYTE&&(J=s.RGB8I),G===s.SHORT&&(J=s.RGB16I),G===s.INT&&(J=s.RGB32I)),x===s.RGBA_INTEGER&&(G===s.UNSIGNED_BYTE&&(J=s.RGBA8UI),G===s.UNSIGNED_SHORT&&(J=s.RGBA16UI),G===s.UNSIGNED_INT&&(J=s.RGBA32UI),G===s.BYTE&&(J=s.RGBA8I),G===s.SHORT&&(J=s.RGBA16I),G===s.INT&&(J=s.RGBA32I)),x===s.RGB&&(G===s.UNSIGNED_SHORT&&fe&&(J=fe.RGB16_EXT),G===s.SHORT&&fe&&(J=fe.RGB16_SNORM_EXT),G===s.UNSIGNED_INT_5_9_9_9_REV&&(J=s.RGB9_E5),G===s.UNSIGNED_INT_10F_11F_11F_REV&&(J=s.R11F_G11F_B10F)),x===s.RGBA){const Q=ue?wr:nt.getTransfer(te);G===s.FLOAT&&(J=s.RGBA32F),G===s.HALF_FLOAT&&(J=s.RGBA16F),G===s.UNSIGNED_BYTE&&(J=Q===pt?s.SRGB8_ALPHA8:s.RGBA8),G===s.UNSIGNED_SHORT&&fe&&(J=fe.RGBA16_EXT),G===s.SHORT&&fe&&(J=fe.RGBA16_SNORM_EXT),G===s.UNSIGNED_SHORT_4_4_4_4&&(J=s.RGBA4),G===s.UNSIGNED_SHORT_5_5_5_1&&(J=s.RGB5_A1)}return(J===s.R16F||J===s.R32F||J===s.RG16F||J===s.RG32F||J===s.RGBA16F||J===s.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function g(A,x){let G;return A?x===null||x===Yi||x===ts?G=s.DEPTH24_STENCIL8:x===Xi?G=s.DEPTH32F_STENCIL8:x===Cs&&(G=s.DEPTH24_STENCIL8,Ve("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Yi||x===ts?G=s.DEPTH_COMPONENT24:x===Xi?G=s.DEPTH_COMPONENT32F:x===Cs&&(G=s.DEPTH_COMPONENT16),G}function y(A,x){return w(A)===!0||A.isFramebufferTexture&&A.minFilter!==si&&A.minFilter!==wi?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function D(A){const x=new WeakRef(A);i.get(A).__ref=x,_.add(x),M.register(A,x,x)}function R(A){const x=i.get(A).__ref;x!==void 0&&(_.delete(x),M.unregister(x))}function L(A){Y(A.target)}function O(A){I(A.target)}function Y(A){A.removeEventListener("dispose",L),R(A),j(A),A.isVideoTexture&&d.delete(A),A.isHTMLTexture&&u.delete(A)}function I(A){A.removeEventListener("dispose",O),R(A),ae(A)}function U(){for(const A of _){const x=A.deref();x!==void 0&&(x.isRenderTarget===!0?I(x):Y(x))}_.clear(),u.clear()}function j(A){const x=i.get(A);if(x.__webglInit===void 0)return;const G=A.source,re=p.get(G);if(re){const te=re[x.__cacheKey];te.usedTimes--,te.usedTimes===0&&H(A),Object.keys(re).length===0&&p.delete(G)}i.remove(A)}function H(A){const x=i.get(A);s.deleteTexture(x.__webglTexture);const G=A.source,re=p.get(G);delete re[x.__cacheKey],a.memory.textures--}function ae(A){const x=i.get(A);x.__depthDisposeCallback&&x.__depthDisposeCallback();const G=A.depthTexture;if(G&&G.renderTarget===A&&Y(G),A.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(x.__webglFramebuffer[te]))for(let ue=0;ue<x.__webglFramebuffer[te].length;ue++)s.deleteFramebuffer(x.__webglFramebuffer[te][ue]);else s.deleteFramebuffer(x.__webglFramebuffer[te]);x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer[te])}else{if(Array.isArray(x.__webglFramebuffer))for(let te=0;te<x.__webglFramebuffer.length;te++)s.deleteFramebuffer(x.__webglFramebuffer[te]);else s.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&s.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let te=0;te<x.__webglColorRenderbuffer.length;te++)x.__webglColorRenderbuffer[te]&&s.deleteRenderbuffer(x.__webglColorRenderbuffer[te]);x.__webglDepthRenderbuffer&&s.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const re=A.textures;for(let te=0,ue=re.length;te<ue;te++){const fe=i.get(re[te]);fe.__webglTexture&&(s.deleteTexture(fe.__webglTexture),a.memory.textures--),i.remove(re[te])}i.remove(A)}let $=0;function ie(){$=0}function ne(){return $}function Ee(A){$=A}function He(){const A=$;return A>=n.maxTextures&&Ve("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+n.maxTextures),$+=1,A}function q(A){const x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.mipmapsAutoUpdate),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function ge(A,x){const G=i.get(A);if(A.isVideoTexture&&vt(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&G.__version!==A.version){const re=A.image;if(re===null)Ve("WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)Ve("WebGLRenderer: Texture marked for update but image is incomplete");else{Oe(G,A,x);return}}else A.isExternalTexture&&(G.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,G.__webglTexture,s.TEXTURE0+x)}function Te(A,x){const G=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&G.__version!==A.version){Oe(G,A,x);return}else A.isExternalTexture&&(G.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,G.__webglTexture,s.TEXTURE0+x)}function Se(A,x){const G=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&G.__version!==A.version){Oe(G,A,x);return}t.bindTexture(s.TEXTURE_3D,G.__webglTexture,s.TEXTURE0+x)}function se(A,x){const G=i.get(A);if(A.version>0&&G.__version!==A.version){Kt(G,A,x);return}t.bindTexture(s.TEXTURE_CUBE_MAP,G.__webglTexture,s.TEXTURE0+x)}const ze={[Rs]:s.REPEAT,[en]:s.CLAMP_TO_EDGE,[wa]:s.MIRRORED_REPEAT},_t={[si]:s.NEAREST,[ih]:s.NEAREST_MIPMAP_NEAREST,[Bs]:s.NEAREST_MIPMAP_LINEAR,[wi]:s.LINEAR,[Gr]:s.LINEAR_MIPMAP_NEAREST,[pn]:s.LINEAR_MIPMAP_LINEAR},Ge={[ah]:s.NEVER,[ec]:s.ALWAYS,[oh]:s.LESS,[Ql]:s.LEQUAL,[lh]:s.EQUAL,[jl]:s.GEQUAL,[ch]:s.GREATER,[hh]:s.NOTEQUAL};function ot(A,x){if(x.type===Xi&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===wi||x.magFilter===Gr||x.magFilter===Bs||x.magFilter===pn||x.minFilter===wi||x.minFilter===Gr||x.minFilter===Bs||x.minFilter===pn)&&Ve("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(A,s.TEXTURE_WRAP_S,ze[x.wrapS]),s.texParameteri(A,s.TEXTURE_WRAP_T,ze[x.wrapT]),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,ze[x.wrapR]),s.texParameteri(A,s.TEXTURE_MAG_FILTER,_t[x.magFilter]),s.texParameteri(A,s.TEXTURE_MIN_FILTER,_t[x.minFilter]),x.compareFunction&&(s.texParameteri(A,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(A,s.TEXTURE_COMPARE_FUNC,Ge[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===si||x.minFilter!==Bs&&x.minFilter!==pn||x.type===Xi&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");s.texParameterf(A,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,n.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function ht(A,x){let G=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",L),D(x));const re=x.source;let te=p.get(re);te===void 0&&(te={},p.set(re,te));const ue=q(x);if(ue!==A.__cacheKey){te[ue]===void 0&&(te[ue]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,G=!0),te[ue].usedTimes++;const fe=te[A.__cacheKey];fe!==void 0&&(te[A.__cacheKey].usedTimes--,fe.usedTimes===0&&H(x)),A.__cacheKey=ue,A.__webglTexture=te[ue].texture}return G}function Je(A,x,G){return Math.floor(Math.floor(A/G)/x)}function Bt(A,x,G,re){const ue=A.updateRanges;if(ue.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,x.width,x.height,G,re,x.data);else{ue.sort((C,ee)=>C.start-ee.start);let fe=0;for(let C=1;C<ue.length;C++){const ee=ue[fe],K=ue[C],me=ee.start+ee.count,de=Je(K.start,x.width,4),he=Je(ee.start,x.width,4);K.start<=me+1&&de===he&&Je(K.start+K.count-1,x.width,4)===de?ee.count=Math.max(ee.count,K.start+K.count-ee.start):(++fe,ue[fe]=K)}ue.length=fe+1;const J=t.getParameter(s.UNPACK_ROW_LENGTH),Q=t.getParameter(s.UNPACK_SKIP_PIXELS),pe=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,x.width);for(let C=0,ee=ue.length;C<ee;C++){const K=ue[C],me=Math.floor(K.start/4),de=Math.ceil(K.count/4),he=me%x.width,Le=Math.floor(me/x.width),$e=de,le=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,he),t.pixelStorei(s.UNPACK_SKIP_ROWS,Le),t.texSubImage2D(s.TEXTURE_2D,0,he,Le,$e,le,G,re,x.data)}A.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,J),t.pixelStorei(s.UNPACK_SKIP_PIXELS,Q),t.pixelStorei(s.UNPACK_SKIP_ROWS,pe)}}function Oe(A,x,G){let re=s.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(re=s.TEXTURE_2D_ARRAY),x.isData3DTexture&&(re=s.TEXTURE_3D);const te=ht(A,x),ue=x.source;t.bindTexture(re,A.__webglTexture,s.TEXTURE0+G);const fe=i.get(ue);if(ue.version!==fe.__version||te===!0){if(t.activeTexture(s.TEXTURE0+G),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const le=nt.getPrimaries(nt.workingColorSpace),Ne=x.colorSpace===fn?null:nt.getPrimaries(x.colorSpace),Ke=x.colorSpace===fn||le===Ne?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ke)}t.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment);let Q=v(x.image,!1,n.maxTextureSize);Q=Be(x,Q);const pe=r.convert(x.format,x.colorSpace),C=r.convert(x.type);let ee=T(x.internalFormat,pe,C,x.normalized,x.colorSpace,x.isVideoTexture);ot(re,x);let K;const me=x.mipmaps,de=x.isVideoTexture!==!0,he=fe.__version===void 0||te===!0,Le=ue.dataReady,$e=y(x,Q);if(x.isDepthTexture)ee=g(x.format===mn,x.type),he&&(de?t.texStorage2D(s.TEXTURE_2D,1,ee,Q.width,Q.height):t.texImage2D(s.TEXTURE_2D,0,ee,Q.width,Q.height,0,pe,C,null));else if(x.isDataTexture)if(me.length>0){de&&he&&t.texStorage2D(s.TEXTURE_2D,$e,ee,me[0].width,me[0].height);for(let le=0,Ne=me.length;le<Ne;le++)K=me[le],de?Le&&t.texSubImage2D(s.TEXTURE_2D,le,0,0,K.width,K.height,pe,C,K.data):t.texImage2D(s.TEXTURE_2D,le,ee,K.width,K.height,0,pe,C,K.data);x.generateMipmaps=!1}else de?(he&&t.texStorage2D(s.TEXTURE_2D,$e,ee,Q.width,Q.height),Le&&Bt(x,Q,pe,C)):t.texImage2D(s.TEXTURE_2D,0,ee,Q.width,Q.height,0,pe,C,Q.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){de&&he&&t.texStorage3D(s.TEXTURE_2D_ARRAY,$e,ee,me[0].width,me[0].height,Q.depth);for(let le=0,Ne=me.length;le<Ne;le++)if(K=me[le],x.format!==qi)if(pe!==null)if(de){if(Le)if(x.layerUpdates.size>0){const Ke=_l(K.width,K.height,x.format,x.type);for(const Me of x.layerUpdates){const dt=K.data.subarray(Me*Ke/K.data.BYTES_PER_ELEMENT,(Me+1)*Ke/K.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,le,0,0,Me,K.width,K.height,1,pe,dt)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,le,0,0,0,K.width,K.height,Q.depth,pe,K.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,le,ee,K.width,K.height,Q.depth,0,K.data,0,0);else Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else de?Le&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,le,0,0,0,K.width,K.height,Q.depth,pe,C,K.data):t.texImage3D(s.TEXTURE_2D_ARRAY,le,ee,K.width,K.height,Q.depth,0,pe,C,K.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{de&&he&&t.texStorage2D(s.TEXTURE_2D,$e,ee,me[0].width,me[0].height);for(let le=0,Ne=me.length;le<Ne;le++)K=me[le],x.format!==qi?pe!==null?de?Le&&t.compressedTexSubImage2D(s.TEXTURE_2D,le,0,0,K.width,K.height,pe,K.data):t.compressedTexImage2D(s.TEXTURE_2D,le,ee,K.width,K.height,0,K.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):de?Le&&t.texSubImage2D(s.TEXTURE_2D,le,0,0,K.width,K.height,pe,C,K.data):t.texImage2D(s.TEXTURE_2D,le,ee,K.width,K.height,0,pe,C,K.data)}else if(x.isDataArrayTexture)if(de){if(he&&t.texStorage3D(s.TEXTURE_2D_ARRAY,$e,ee,Q.width,Q.height,Q.depth),Le)if(x.layerUpdates.size>0){const le=_l(Q.width,Q.height,x.format,x.type);for(const Ne of x.layerUpdates){const Ke=Q.data.subarray(Ne*le/Q.data.BYTES_PER_ELEMENT,(Ne+1)*le/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Ne,Q.width,Q.height,1,pe,C,Ke)}x.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,pe,C,Q.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,ee,Q.width,Q.height,Q.depth,0,pe,C,Q.data);else if(x.isData3DTexture)de?(he&&t.texStorage3D(s.TEXTURE_3D,$e,ee,Q.width,Q.height,Q.depth),Le&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,pe,C,Q.data)):t.texImage3D(s.TEXTURE_3D,0,ee,Q.width,Q.height,Q.depth,0,pe,C,Q.data);else if(x.isFramebufferTexture){if(he)if(de)t.texStorage2D(s.TEXTURE_2D,$e,ee,Q.width,Q.height);else{let le=Q.width,Ne=Q.height;for(let Ke=0;Ke<$e;Ke++)t.texImage2D(s.TEXTURE_2D,Ke,ee,le,Ne,0,pe,C,null),le>>=1,Ne>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in s){const le=s.canvas;if(le.hasAttribute("layoutsubtree")||le.setAttribute("layoutsubtree","true"),Q.parentNode!==le){le.appendChild(Q),u.add(x),le.onpaint=Ne=>{const Ke=Ne.changedElements;for(const Me of u)Ke.includes(Me.image)&&(Me.needsUpdate=!0)},le.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,Q);else{const Ke=s.RGBA,Me=s.RGBA,dt=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Ke,Me,dt,Q)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(me.length>0){if(de&&he){const le=ke(me[0]);t.texStorage2D(s.TEXTURE_2D,$e,ee,le.width,le.height)}for(let le=0,Ne=me.length;le<Ne;le++)K=me[le],de?Le&&t.texSubImage2D(s.TEXTURE_2D,le,0,0,pe,C,K):t.texImage2D(s.TEXTURE_2D,le,ee,pe,C,K);x.generateMipmaps=!1}else if(de){if(he){const le=ke(Q);t.texStorage2D(s.TEXTURE_2D,$e,ee,le.width,le.height)}Le&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,pe,C,Q)}else t.texImage2D(s.TEXTURE_2D,0,ee,pe,C,Q);w(x)&&x.mipmapsAutoUpdate===!0&&b(re),fe.__version=ue.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function Kt(A,x,G){if(x.image.length!==6)return;const re=ht(A,x),te=x.source;t.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture,s.TEXTURE0+G);const ue=i.get(te);if(te.version!==ue.__version||re===!0){t.activeTexture(s.TEXTURE0+G);const fe=nt.getPrimaries(nt.workingColorSpace),J=x.colorSpace===fn?null:nt.getPrimaries(x.colorSpace),Q=x.colorSpace===fn||fe===J?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);const pe=x.isCompressedTexture||x.image[0].isCompressedTexture,C=x.image[0]&&x.image[0].isDataTexture,ee=[];for(let Me=0;Me<6;Me++)!pe&&!C?ee[Me]=v(x.image[Me],!0,n.maxCubemapSize):ee[Me]=C?x.image[Me].image:x.image[Me],ee[Me]=Be(x,ee[Me]);const K=ee[0],me=r.convert(x.format,x.colorSpace),de=r.convert(x.type);let he=T(x.internalFormat,me,de,x.normalized,x.colorSpace);const Le=x.isVideoTexture!==!0,$e=ue.__version===void 0||re===!0,le=te.dataReady;let Ne=y(x,K);ot(s.TEXTURE_CUBE_MAP,x);let Ke;if(x.isDepthTexture){if(he=g(x.format===mn,x.type),$e)if(Le)t.texStorage2D(s.TEXTURE_CUBE_MAP,1,he,K.width,K.height);else for(let Me=0;Me<6;Me++)t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,he,K.width,K.height,0,me,de,null)}else if(pe){Le&&$e&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Ne,he,K.width,K.height);for(let Me=0;Me<6;Me++){Ke=ee[Me].mipmaps;for(let dt=0;dt<Ke.length;dt++){const Gt=Ke[dt];x.format!==qi?me!==null?Le?le&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Me,dt,0,0,Gt.width,Gt.height,me,Gt.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Me,dt,he,Gt.width,Gt.height,0,Gt.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Le?le&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Me,dt,0,0,Gt.width,Gt.height,me,de,Gt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Me,dt,he,Gt.width,Gt.height,0,me,de,Gt.data)}}}else{if(Ke=x.mipmaps,Le&&$e){Ke.length>0&&Ne++;const Me=ke(ee[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Ne,he,Me.width,Me.height)}for(let Me=0;Me<6;Me++)if(C){Le?le&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,0,0,ee[Me].width,ee[Me].height,me,de,ee[Me].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,he,ee[Me].width,ee[Me].height,0,me,de,ee[Me].data);for(let dt=0;dt<Ke.length;dt++){const zi=Ke[dt].image[Me].image;Le?le&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Me,dt+1,0,0,zi.width,zi.height,me,de,zi.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Me,dt+1,he,zi.width,zi.height,0,me,de,zi.data)}}else{Le?le&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,0,0,me,de,ee[Me]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,he,me,de,ee[Me]);for(let dt=0;dt<Ke.length;dt++){const Gt=Ke[dt];Le?le&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Me,dt+1,0,0,me,de,Gt.image[Me]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Me,dt+1,he,me,de,Gt.image[Me])}}}w(x)&&x.mipmapsAutoUpdate===!0&&b(s.TEXTURE_CUBE_MAP),ue.__version=te.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function yt(A,x,G,re,te,ue){const fe=r.convert(G.format,G.colorSpace),J=r.convert(G.type),Q=T(G.internalFormat,fe,J,G.normalized,G.colorSpace),pe=i.get(x),C=i.get(G);if(C.__renderTarget=x,!pe.__hasExternalTextures){const ee=Math.max(1,x.width>>ue),K=Math.max(1,x.height>>ue);te===s.TEXTURE_3D||te===s.TEXTURE_2D_ARRAY?t.texImage3D(te,ue,Q,ee,K,x.depth,0,fe,J,null):t.texImage2D(te,ue,Q,ee,K,0,fe,J,null)}t.bindFramebuffer(s.FRAMEBUFFER,A),ve(x)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,re,te,C.__webglTexture,0,gt(x)):(te===s.TEXTURE_2D||te>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,re,te,C.__webglTexture,ue),t.bindFramebuffer(s.FRAMEBUFFER,null)}function yi(A,x,G){if(s.bindRenderbuffer(s.RENDERBUFFER,A),x.depthBuffer){const re=x.depthTexture,te=re&&re.isDepthTexture?re.type:null,ue=g(x.stencilBuffer,te),fe=x.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;ve(x)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,gt(x),ue,x.width,x.height):G?s.renderbufferStorageMultisample(s.RENDERBUFFER,gt(x),ue,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,ue,x.width,x.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,fe,s.RENDERBUFFER,A)}else{const re=x.textures;for(let te=0;te<re.length;te++){const ue=re[te],fe=r.convert(ue.format,ue.colorSpace),J=r.convert(ue.type),Q=T(ue.internalFormat,fe,J,ue.normalized,ue.colorSpace);ve(x)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,gt(x),Q,x.width,x.height):G?s.renderbufferStorageMultisample(s.RENDERBUFFER,gt(x),Q,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,Q,x.width,x.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ut(A,x,G){const re=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const te=i.get(x.depthTexture);te.__renderTarget=x;const ue=re?x.depthTexture.image[0]:x.depthTexture.image;(!te.__webglTexture||ue.width!==x.width||ue.height!==x.height)&&(ue.width=x.width,ue.height=x.height,x.depthTexture.needsUpdate=!0),re?se(x.depthTexture,0):ge(x.depthTexture,0);const fe=te.__webglTexture,J=gt(x),Q=re?s.TEXTURE_CUBE_MAP_POSITIVE_X+G:s.TEXTURE_2D,pe=x.depthTexture.format===mn?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(x.depthTexture.format===vn)ve(x)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,pe,Q,fe,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,pe,Q,fe,0);else if(x.depthTexture.format===mn)ve(x)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,pe,Q,fe,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,pe,Q,fe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function oi(A){const x=i.get(A),G=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){const re=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),re){const te=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,re.removeEventListener("dispose",te)};re.addEventListener("dispose",te),x.__depthDisposeCallback=te}x.__boundDepthTexture=re}if(A.depthTexture&&!x.__autoAllocateDepthBuffer)if(G)for(let re=0;re<6;re++)Ut(x.__webglFramebuffer[re],A,re);else A.texture.mipmaps.length>0?Ut(x.__webglFramebuffer[0],A,0):Ut(x.__webglFramebuffer,A,0);else if(G){x.__webglDepthbuffer=[];for(let re=0;re<6;re++)if(t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[re]),x.__webglDepthbuffer[re]===void 0)x.__webglDepthbuffer[re]=s.createRenderbuffer(),yi(x.__webglDepthbuffer[re],A,!1);else{const te=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ue=x.__webglDepthbuffer[re];s.bindRenderbuffer(s.RENDERBUFFER,ue),s.framebufferRenderbuffer(s.FRAMEBUFFER,te,s.RENDERBUFFER,ue)}}else if(A.texture.mipmaps.length>0?t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=s.createRenderbuffer(),yi(x.__webglDepthbuffer,A,!1);else{const te=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ue=x.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ue),s.framebufferRenderbuffer(s.FRAMEBUFFER,te,s.RENDERBUFFER,ue)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function li(A,x,G){const re=i.get(A);x!==void 0&&yt(re.__webglFramebuffer,A,A.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),G!==void 0&&oi(A)}function Xt(A){const x=A.texture,G=i.get(A),re=i.get(x);A.addEventListener("dispose",O),D(A);const te=A.textures,ue=A.isWebGLCubeRenderTarget===!0,fe=te.length>1;if(fe||(re.__webglTexture===void 0&&(re.__webglTexture=s.createTexture()),re.__version=x.version,a.memory.textures++),ue){G.__webglFramebuffer=[];for(let J=0;J<6;J++)if(x.mipmaps.length>0){G.__webglFramebuffer[J]=[];for(let Q=0;Q<x.mipmaps.length;Q++)G.__webglFramebuffer[J][Q]=s.createFramebuffer()}else G.__webglFramebuffer[J]=s.createFramebuffer()}else{if(x.mipmaps.length>0){G.__webglFramebuffer=[];for(let J=0;J<x.mipmaps.length;J++)G.__webglFramebuffer[J]=s.createFramebuffer()}else G.__webglFramebuffer=s.createFramebuffer();if(fe)for(let J=0,Q=te.length;J<Q;J++){const pe=i.get(te[J]);pe.__webglTexture===void 0&&(pe.__webglTexture=s.createTexture(),a.memory.textures++)}if(A.samples>0&&ve(A)===!1){G.__webglMultisampledFramebuffer=s.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let J=0;J<te.length;J++){const Q=te[J];G.__webglColorRenderbuffer[J]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,G.__webglColorRenderbuffer[J]);const pe=r.convert(Q.format,Q.colorSpace),C=r.convert(Q.type),ee=T(Q.internalFormat,pe,C,Q.normalized,Q.colorSpace,A.isXRRenderTarget===!0),K=gt(A);s.renderbufferStorageMultisample(s.RENDERBUFFER,K,ee,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+J,s.RENDERBUFFER,G.__webglColorRenderbuffer[J])}s.bindRenderbuffer(s.RENDERBUFFER,null),A.depthBuffer&&(G.__webglDepthRenderbuffer=s.createRenderbuffer(),yi(G.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ue){t.bindTexture(s.TEXTURE_CUBE_MAP,re.__webglTexture),ot(s.TEXTURE_CUBE_MAP,x);for(let J=0;J<6;J++)if(x.mipmaps.length>0)for(let Q=0;Q<x.mipmaps.length;Q++)yt(G.__webglFramebuffer[J][Q],A,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+J,Q);else yt(G.__webglFramebuffer[J],A,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);w(x)?b(s.TEXTURE_CUBE_MAP):x.mipmaps.length>0&&s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),t.unbindTexture()}else if(fe){for(let J=0,Q=te.length;J<Q;J++){const pe=te[J],C=i.get(pe);let ee=s.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ee=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ee,C.__webglTexture),ot(ee,pe),yt(G.__webglFramebuffer,A,pe,s.COLOR_ATTACHMENT0+J,ee,0),w(pe)&&b(ee)}t.unbindTexture()}else{let J=s.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(J=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(J,re.__webglTexture),ot(J,x),x.mipmaps.length>0)for(let Q=0;Q<x.mipmaps.length;Q++)yt(G.__webglFramebuffer[Q],A,x,s.COLOR_ATTACHMENT0,J,Q);else yt(G.__webglFramebuffer,A,x,s.COLOR_ATTACHMENT0,J,0);w(x)?b(J):x.mipmaps.length>0&&s.texParameteri(J,s.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),t.unbindTexture()}A.depthBuffer&&oi(A)}function F(A){const x=A.textures;for(let G=0,re=x.length;G<re;G++){const te=x[G];if(w(te)&&te.mipmapsAutoUpdate===!0){const ue=E(A),fe=i.get(te).__webglTexture;t.bindTexture(ue,fe),b(ue),t.unbindTexture()}}}const jt=[];function mt(A){if(A.samples>0){if(ve(A)===!1){const x=A.textures,G=A.width,re=A.height;let te=s.COLOR_BUFFER_BIT;const ue=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,fe=i.get(A),J=x.length>1;if(J)for(let pe=0;pe<x.length;pe++)t.bindFramebuffer(s.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,fe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+pe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer),A.texture.mipmaps.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,fe.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let pe=0;pe<x.length;pe++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(te|=s.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(te|=s.STENCIL_BUFFER_BIT)),J){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,fe.__webglColorRenderbuffer[pe]);const C=i.get(x[pe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,C,0)}s.blitFramebuffer(0,0,G,re,0,0,G,re,te,s.NEAREST),l===!0&&(jt.length=0,jt.push(s.COLOR_ATTACHMENT0+pe),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&jt.push(ue),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,jt))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),J)for(let pe=0;pe<x.length;pe++){t.bindFramebuffer(s.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pe,s.RENDERBUFFER,fe.__webglColorRenderbuffer[pe]);const C=i.get(x[pe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,fe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+pe,s.TEXTURE_2D,C,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){const x=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[x])}}}function gt(A){return Math.min(n.maxSamples,A.samples)}function ve(A){const x=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function vt(A){const x=a.render.frame;d.get(A)!==x&&(d.set(A,x),A.update())}function Be(A,x){const G=A.colorSpace,re=A.format,te=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||G!==br&&G!==fn&&(nt.getTransfer(G)===pt?(re!==qi||te!==Ci)&&Ve("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):at("WebGLTextures: Unsupported texture color space:",G)),x}function ke(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=He,this.resetTextureUnits=ie,this.getTextureUnits=ne,this.setTextureUnits=Ee,this.setTexture2D=ge,this.setTexture2DArray=Te,this.setTexture3D=Se,this.setTextureCube=se,this.rebindTextures=li,this.setupRenderTarget=Xt,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=mt,this.setupDepthRenderbuffer=oi,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=ve,this.dispose=U}function Gm(s,e){function t(i,n=fn){let r;const a=nt.getTransfer(n);if(i===Ci)return s.UNSIGNED_BYTE;if(i===go)return s.UNSIGNED_SHORT_4_4_4_4;if(i===_o)return s.UNSIGNED_SHORT_5_5_5_1;if(i===Yl)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===$l)return s.UNSIGNED_INT_10F_11F_11F_REV;if(i===Xl)return s.BYTE;if(i===ql)return s.SHORT;if(i===Cs)return s.UNSIGNED_SHORT;if(i===mo)return s.INT;if(i===Yi)return s.UNSIGNED_INT;if(i===Xi)return s.FLOAT;if(i===Ei)return s.HALF_FLOAT;if(i===Kl)return s.ALPHA;if(i===Zl)return s.RGB;if(i===qi)return s.RGBA;if(i===vn)return s.DEPTH_COMPONENT;if(i===mn)return s.DEPTH_STENCIL;if(i===Jl)return s.RED;if(i===vo)return s.RED_INTEGER;if(i===Cn)return s.RG;if(i===xo)return s.RG_INTEGER;if(i===Mo)return s.RGBA_INTEGER;if(i===mr||i===gr||i===_r||i===vr)if(a===pt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===mr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===_r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===mr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===gr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===_r)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===vr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ea||i===Ta||i===Aa||i===Ra)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ea)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ta)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Aa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ra)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ca||i===Pa||i===La||i===Da||i===Ia||i===Sr||i===Na)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Ca||i===Pa)return a===pt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===La)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Da)return r.COMPRESSED_R11_EAC;if(i===Ia)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Sr)return r.COMPRESSED_RG11_EAC;if(i===Na)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ua||i===Fa||i===Oa||i===Ba||i===za||i===ka||i===Ga||i===Ha||i===Va||i===Wa||i===Xa||i===qa||i===Ya||i===$a)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ua)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Fa)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Oa)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ba)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===za)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ka)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ga)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ha)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Va)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Wa)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Xa)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===qa)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ya)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===$a)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ka||i===Za||i===Ja)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Ka)return a===pt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Za)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ja)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Qa||i===ja||i===yr||i===eo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Qa)return r.COMPRESSED_RED_RGTC1_EXT;if(i===ja)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===yr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===eo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ts?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:t}}const Hm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Vm=`
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

}`;class Wm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new fc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new fi({vertexShader:Hm,fragmentShader:Vm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new z(new ri(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Xm extends Pn{constructor(e,t){super();const i=this;let n=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,u=null,h=null,p=null,_=null;const M=typeof XRWebGLBinding<"u",m=new Wm,f={},v=t.getContextAttributes();let w=null,b=null;const E=[],T=[],g=new Ae;let y=null,D=null;const R=new Li;R.viewport=new It;const L=new Li;L.viewport=new It;const O=[R,L],Y=new jh;let I=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ge=E[q];return ge===void 0&&(ge=new Zr,E[q]=ge),ge.getTargetRaySpace()},this.getControllerGrip=function(q){let ge=E[q];return ge===void 0&&(ge=new Zr,E[q]=ge),ge.getGripSpace()},this.getHand=function(q){let ge=E[q];return ge===void 0&&(ge=new Zr,E[q]=ge),ge.getHandSpace()};function j(q){const ge=T.indexOf(q.inputSource);if(ge===-1)return;const Te=E[ge];Te!==void 0&&(Te.update(q.inputSource,q.frame,c||a),Te.dispatchEvent({type:q.type,data:q.inputSource}))}function H(){n.removeEventListener("select",j),n.removeEventListener("selectstart",j),n.removeEventListener("selectend",j),n.removeEventListener("squeeze",j),n.removeEventListener("squeezestart",j),n.removeEventListener("squeezeend",j),n.removeEventListener("end",H),n.removeEventListener("inputsourceschange",ae);for(let q=0;q<E.length;q++){const ge=T[q];ge!==null&&(T[q]=null,E[q].disconnect(ge))}I=null,U=null,m.reset();for(const q in f)delete f[q];if(e.setRenderTarget(w),p=null,h=null,u=null,n=null,b=null,He.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(g.width,g.height,!1),D!==null){const q=D.camera;q.fov=D.fov,q.zoom=D.zoom,q.updateProjectionMatrix(),D=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&Ve("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&Ve("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return u===null&&M&&(u=new XRWebGLBinding(n,t)),u},this.getFrame=function(){return _},this.getSession=function(){return n},this.setSession=async function(q){if(n=q,n!==null){if(w=e.getRenderTarget(),n.addEventListener("select",j),n.addEventListener("selectstart",j),n.addEventListener("selectend",j),n.addEventListener("squeeze",j),n.addEventListener("squeezestart",j),n.addEventListener("squeezeend",j),n.addEventListener("end",H),n.addEventListener("inputsourceschange",ae),v.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(g),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let Te=null,Se=null,se=null;v.depth&&(se=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Te=v.stencil?mn:vn,Se=v.stencil?ts:Yi);const ze={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:r};u=this.getBinding(),h=u.createProjectionLayer(ze),n.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),b=new Ti(h.textureWidth,h.textureHeight,{format:qi,type:Ci,depthTexture:new is(h.textureWidth,h.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,Te),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const Te={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(n,t,Te),n.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new Ti(p.framebufferWidth,p.framebufferHeight,{format:qi,type:Ci,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await n.requestReferenceSpace(o),He.setContext(n),He.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ae(q){for(let ge=0;ge<q.removed.length;ge++){const Te=q.removed[ge],Se=T.indexOf(Te);Se>=0&&(T[Se]=null,E[Se].disconnect(Te))}for(let ge=0;ge<q.added.length;ge++){const Te=q.added[ge];let Se=T.indexOf(Te);if(Se===-1){for(let ze=0;ze<E.length;ze++)if(ze>=T.length){T.push(Te),Se=ze;break}else if(T[ze]===null){T[ze]=Te,Se=ze;break}if(Se===-1)break}const se=E[Se];se&&se.connect(Te)}}function $(q,ge){ge===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ge.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(n===null)return;let ge=q.near,Te=q.far;m.texture!==null&&(m.depthNear>0&&(ge=m.depthNear),m.depthFar>0&&(Te=m.depthFar)),Y.near=L.near=R.near=ge,Y.far=L.far=R.far=Te,(I!==Y.near||U!==Y.far)&&(n.updateRenderState({depthNear:Y.near,depthFar:Y.far}),I=Y.near,U=Y.far),Y.layers.mask=q.layers.mask|6,R.layers.mask=Y.layers.mask&-5,L.layers.mask=Y.layers.mask&-3;const Se=q.parent,se=Y.cameras;$(Y,Se);for(let ze=0;ze<se.length;ze++)$(se[ze],Se);Y.projectionMatrix.copy(R.projectionMatrix),Y.projectionMatrixInverse.copy(R.projectionMatrixInverse),D===null&&q.isPerspectiveCamera&&(D={camera:q,fov:q.fov,zoom:q.zoom}),ie(q,Y,Se)};function ie(q,ge,Te){Te===null?q.matrix.copy(ge.matrixWorld):(q.matrix.copy(Te.matrixWorld),q.matrix.invert(),q.matrix.multiply(ge.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ge.projectionMatrix),q.projectionMatrixInverse.copy(ge.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=io*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return Y},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(q){l=q,h!==null&&(h.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(Y)},this.getCameraTexture=function(q){return f[q]};let ne=null;function Ee(q,ge){if(d=ge.getViewerPose(c||a),_=ge,d!==null){const Te=d.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let Se=!1;Te.length!==Y.cameras.length&&(Y.cameras.length=0,Se=!0);for(let Ge=0;Ge<Te.length;Ge++){const ot=Te[Ge];let ht=null;if(p!==null)ht=p.getViewport(ot);else{const Bt=u.getViewSubImage(h,ot);ht=Bt.viewport,Ge===0&&(e.setRenderTargetTextures(b,Bt.colorTexture,Bt.depthStencilTexture),e.setRenderTarget(b))}let Je=O[Ge];Je===void 0&&(Je=new Li,Je.layers.enable(Ge),Je.viewport=new It,O[Ge]=Je),Je.matrix.fromArray(ot.transform.matrix),Je.matrix.decompose(Je.position,Je.quaternion,Je.scale),Je.projectionMatrix.fromArray(ot.projectionMatrix),Je.projectionMatrixInverse.copy(Je.projectionMatrix).invert(),Je.viewport.set(ht.x,ht.y,ht.width,ht.height),Ge===0&&(Y.matrix.copy(Je.matrix),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale)),Se===!0&&Y.cameras.push(Je)}const se=n.enabledFeatures;if(se&&se.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&M){u=i.getBinding();const Ge=u.getDepthInformation(Te[0]);Ge&&Ge.isValid&&Ge.texture&&m.init(Ge,n.renderState)}if(se&&se.includes("camera-access")&&M){e.state.unbindTexture(),u=i.getBinding();for(let Ge=0;Ge<Te.length;Ge++){const ot=Te[Ge].camera;if(ot){let ht=f[ot];ht||(ht=new fc,f[ot]=ht);const Je=u.getCameraImage(ot);ht.sourceTexture=Je}}}}for(let Te=0;Te<E.length;Te++){const Se=T[Te],se=E[Te];Se!==null&&se!==void 0&&se.update(Se,ge,c||a)}ne&&ne(q,ge),ge.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ge}),_=null}const He=new xc;He.setAnimationLoop(Ee),this.setAnimationLoop=function(q){ne=q},this.dispose=function(){}}}const qm=new St,Cc=new qe;Cc.set(-1,0,0,0,1,0,0,0,1);function Ym(s,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,pc(s)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function n(m,f,v,w,b){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),d(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,b)):f.isMeshMatcapMaterial?(r(m,f),_(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),M(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,v,w):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===pi&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===pi&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const v=e.get(f),w=v.envMap,b=v.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(qm.makeRotationFromEuler(b)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Cc),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,v,w){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*v,m.scale.value=w*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function d(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,v){m.ior.value=f.ior,f.diffuseRoughness>0&&(m.diffuseRoughness.value=f.diffuseRoughness,f.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=f.diffuseRoughnessMap,t(f.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===pi&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=f.iridescenceThicknessMaximum,f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,f){f.matcap&&(m.matcap.value=f.matcap)}function M(m,f){const v=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function $m(s,e,t,i){let n={},r={};function a(v,w){const b=w.program;i.uniformBlockBinding(v,b,n[v.id])}function o(v,w){let b=n[v.id];b===void 0&&(_(v),b=l(v),n[v.id]=b,v.addEventListener("dispose",m));const E=w.program;i.updateUBOMapping(v,E);const T=e.render.frame;r[v.id]!==T&&(c(v),r[v.id]=T)}function l(v){const w=s.createBuffer(),b=v.__size,E=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,w),s.bufferData(s.UNIFORM_BUFFER,b,E),s.bindBuffer(s.UNIFORM_BUFFER,null),w}function c(v){const w=n[v.id],b=v.uniforms,E=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,w);for(let T=0,g=b.length;T<g;T++){const y=b[T];if(Array.isArray(y))for(let D=0,R=y.length;D<R;D++)d(y[D],T,D,E);else d(y,T,0,E)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(v,w,b,E){if(h(v,w,b,E)===!0){const T=v.__offset,g=v.value;if(Array.isArray(g)){let y=0;for(let D=0;D<g.length;D++){const R=g[D],L=M(R,!0);u(R,v.__data,y),y+=L.storage/Float32Array.BYTES_PER_ELEMENT}}else u(g,v.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,T,v.__data)}}function u(v,w,b){typeof v=="number"||typeof v=="boolean"?w[b]=v:v.isMatrix3?(w[b]=v.elements[0],w[b+1]=v.elements[1],w[b+2]=v.elements[2],w[b+3]=0,w[b+4]=v.elements[3],w[b+5]=v.elements[4],w[b+6]=v.elements[5],w[b+7]=0,w[b+8]=v.elements[6],w[b+9]=v.elements[7],w[b+10]=v.elements[8],w[b+11]=0):ArrayBuffer.isView(v)?w.set(v.subarray(0,w.length-b),b):v.toArray(w,b)}function h(v,w,b,E){const T=v.value,g=w+"_"+b;if(Array.isArray(T)){E[g]===void 0&&(E[g]=[]);const y=E[g];let D=!1;for(let R=0;R<T.length;R++)p(T[R],y,R)===!0&&(D=!0);return D}return p(T,E,g)}function p(v,w,b){if(w[b]===void 0)return typeof v=="number"||typeof v=="boolean"?w[b]=v:ArrayBuffer.isView(v)?w[b]=v.slice():w[b]=v.clone(),!0;{const E=w[b];if(typeof v=="number"||typeof v=="boolean"){if(E!==v)return w[b]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(E.equals(v)===!1)return E.copy(v),!0}}return!1}function _(v){const w=v.uniforms;let b=0;const E=16;for(let g=0,y=w.length;g<y;g++){const D=Array.isArray(w[g])?w[g]:[w[g]];for(let R=0,L=D.length;R<L;R++){const O=D[R],Y=Array.isArray(O.value)?O.value:[O.value],I=Array.isArray(w[g])||Array.isArray(O.value);let U=b;for(let H=0,ae=Y.length;H<ae;H++){const $=Y[H],ie=M($,I),ne=b%E,Ee=ne%ie.boundary,He=ne+Ee;b+=Ee,He!==0&&E-He<ie.storage&&(b+=E-He),H===0&&(U=b),b+=ie.storage}const j=O.type==="int"?Int32Array:O.type==="uint"?Uint32Array:Float32Array;O.__data=new j((b-U)/Float32Array.BYTES_PER_ELEMENT),O.__offset=U}}const T=b%E;return T>0&&(b+=E-T),v.__size=b,v.__cache={},this}function M(v,w){const b={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(b.boundary=4,b.storage=4):v.isVector2?(b.boundary=8,b.storage=8):v.isVector3||v.isColor?(b.boundary=16,b.storage=12):v.isVector4?(b.boundary=16,b.storage=16):v.isMatrix3?(b.boundary=16,b.storage=48):v.isMatrix4?(b.boundary=16,b.storage=64):v.isTexture?Ve("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(b.boundary=16,b.storage=v.byteLength):Ve("WebGLRenderer: Unsupported uniform value type.",v),w===!0&&(b.boundary=16,b.storage=Math.ceil(b.storage/16)*16),b}function m(v){const w=v.target;w.removeEventListener("dispose",m),s.deleteBuffer(n[w.id]),delete n[w.id],delete r[w.id]}function f(){for(const v in n)s.deleteBuffer(n[v]);n={},r={}}return{bind:a,update:o,dispose:f}}const Km=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Hi=null;function Zm(){return Hi===null&&(Hi=new zh(Km,16,16,Cn,Ei),Hi.name="DFG_LUT",Hi.minFilter=wi,Hi.magFilter=wi,Hi.wrapS=en,Hi.wrapT=en,Hi.generateMipmaps=!1,Hi.needsUpdate=!0),Hi}class Jm{constructor(e={}){const{canvas:t=uh(),context:i=null,depth:n=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:h=!1,outputBufferType:p=Ci}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=a;const M=p,m=new Set([Mo,xo,vo]),f=new Set([Ci,Yi,Cs,ts,go,_o]),v=new Uint32Array(4),w=new Int32Array(4),b={textures:[],min:[],max:[],resolution:[]};let E=null,T=null;const g=[],y=[];let D=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=tn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let L=!1,O=null,Y=null,I=null,U=null;this._outputColorSpace=ti;let j=0,H=0,ae=null,$=-1,ie=null;const ne=new It,Ee=new It;let He=null;const q=new Fe(0);let ge=0,Te=t.width,Se=t.height,se=1,ze=null,_t=null;const Ge=new It(0,0,Te,Se),ot=new It(0,0,Te,Se);let ht=!1;const Je=new Ls,Bt=new wo;let Oe=!1,Kt=!1;const yt=new St,yi=new P,Ut=new It,oi={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let li=!1;function Xt(){return ae===null?se:1}let F=i;function jt(S,N){return t.getContext(S,N)}let mt,gt,ve,vt,Be,ke,A,x,G,re,te,ue,fe,J,Q,pe,C,ee,K,me,de,he,Le;try{const S={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${oo}`),t.addEventListener("webglcontextlost",Ne,!1),t.addEventListener("webglcontextrestored",Ke,!1),t.addEventListener("webglcontextcreationerror",Me,!1),F===null){const N="webgl2";if(F=jt(N,S),F===null)throw jt(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}$e()}catch(S){throw t.removeEventListener("webglcontextlost",Ne,!1),t.removeEventListener("webglcontextrestored",Ke,!1),t.removeEventListener("webglcontextcreationerror",Me,!1),at("WebGLRenderer: "+S.message),S}function $e(){mt=new ep(F),mt.init(),de=new Gm(F,mt),gt=new Vf(F,mt,e,de),ve=new zm(F,mt),gt.reversedDepthBuffer&&h&&ve.buffers.depth.setReversed(!0),Y=F.createFramebuffer(),I=F.createFramebuffer(),U=F.createFramebuffer(),vt=new np(F),Be=new Em,ke=new km(F,mt,ve,Be,gt,de,vt),A=new jf(R),x=new sd(F),he=new Gf(F,x),G=new tp(F,x,vt,he),re=new rp(F,G,x,he,vt),ee=new sp(F,gt,ke),Q=new Wf(Be),te=new wm(R,A,mt,gt,he,Q),ue=new Ym(R,Be),fe=new Am,J=new Im(mt),C=new kf(R,A,ve,re,_,l),pe=new Bm(R,re,gt),Le=new $m(F,vt,gt,ve),K=new Hf(F,mt,vt),me=new ip(F,mt,vt),vt.programs=te.programs,R.capabilities=gt,R.extensions=mt,R.properties=Be,R.renderLists=fe,R.shadowMap=pe,R.state=ve,R.info=vt}M!==Ci&&(D=new op(M,t.width,t.height,o,n,r));const le=new Xm(R,F);this.xr=le,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const S=mt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=mt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return se},this.setPixelRatio=function(S){S!==void 0&&(se=S,this.setSize(Te,Se,!1))},this.getSize=function(S){return S.set(Te,Se)},this.setSize=function(S,N,X=!0){if(le.isPresenting){Ve("WebGLRenderer: Can't change size while VR device is presenting.");return}Te=S,Se=N,t.width=Math.floor(S*se),t.height=Math.floor(N*se),X===!0&&(t.style.width=S+"px",t.style.height=N+"px"),D!==null&&D.setSize(t.width,t.height),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(Te*se,Se*se).floor()},this.setDrawingBufferSize=function(S,N,X){Te=S,Se=N,se=X,t.width=Math.floor(S*X),t.height=Math.floor(N*X),this.setViewport(0,0,S,N)},this.setEffects=function(S){if(M===Ci){at("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let N=0;N<S.length;N++)if(S[N].isOutputPass===!0){Ve("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}D.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(ne)},this.getViewport=function(S){return S.copy(Ge)},this.setViewport=function(S,N,X,k){S.isVector4?Ge.set(S.x,S.y,S.z,S.w):Ge.set(S,N,X,k),ve.viewport(ne.copy(Ge).multiplyScalar(Xt()).round())},this.getScissor=function(S){return S.copy(ot)},this.setScissor=function(S,N,X,k){S.isVector4?ot.set(S.x,S.y,S.z,S.w):ot.set(S,N,X,k),ve.scissor(Ee.copy(ot).multiplyScalar(Xt()).round())},this.getScissorTest=function(){return ht},this.setScissorTest=function(S){ve.setScissorTest(ht=S)},this.setOpaqueSort=function(S){ze=S},this.setTransparentSort=function(S){_t=S},this.getClearColor=function(S){return S.copy(C.getClearColor())},this.setClearColor=function(){C.setClearColor(...arguments)},this.getClearAlpha=function(){return C.getClearAlpha()},this.setClearAlpha=function(){C.setClearAlpha(...arguments)},this.clear=function(S=!0,N=!0,X=!0){let k=0;if(S){let V=!1;if(ae!==null){const xe=ae.texture.format;V=m.has(xe)}if(V){const xe=ae.texture.type,Re=f.has(xe),_e=C.getClearColor(),we=C.getClearAlpha(),De=_e.r,Ye=_e.g,tt=_e.b;Re?(v[0]=De,v[1]=Ye,v[2]=tt,v[3]=we,F.clearBufferuiv(F.COLOR,0,v)):(w[0]=De,w[1]=Ye,w[2]=tt,w[3]=we,F.clearBufferiv(F.COLOR,0,w))}else k|=F.COLOR_BUFFER_BIT}N&&(k|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(k|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&F.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),O=S},this.dispose=function(){t.removeEventListener("webglcontextlost",Ne,!1),t.removeEventListener("webglcontextrestored",Ke,!1),t.removeEventListener("webglcontextcreationerror",Me,!1),C.dispose(),fe.dispose(),J.dispose(),ke.dispose(),Be.dispose(),A.dispose(),re.dispose(),G.dispose(),he.dispose(),Le.dispose(),te.dispose(),le.dispose(),le.removeEventListener("sessionstart",W),le.removeEventListener("sessionend",ce),oe.stop()};function Ne(S){S.preventDefault(),Tr("WebGLRenderer: Context Lost."),L=!0}function Ke(){Tr("WebGLRenderer: Context Restored."),L=!1;const S=vt.autoReset,N=pe.enabled,X=pe.autoUpdate,k=pe.needsUpdate,V=pe.type;$e(),vt.autoReset=S,pe.enabled=N,pe.autoUpdate=X,pe.needsUpdate=k,pe.type=V}function Me(S){at("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function dt(S){const N=S.target;N.removeEventListener("dispose",dt),Gt(N)}function Gt(S){zi(S),Be.remove(S)}function zi(S){const N=Be.get(S).programs;N!==void 0&&(N.forEach(function(X){te.releaseProgram(X)}),S.isShaderMaterial&&te.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,X,k,V,xe){N===null&&(N=oi);const Re=V.isMesh&&V.matrixWorld.determinantAffine()<0,_e=Ct(S,N,X,k,V);ve.setMaterial(k,Re);let we=X.index,De=1;if(k.wireframe===!0){if(we=G.getWireframeAttribute(X),we===void 0)return;De=2}const Ye=X.drawRange,tt=X.attributes.position;let Ce=Ye.start*De,it=(Ye.start+Ye.count)*De;xe!==null&&(Ce=Math.max(Ce,xe.start*De),it=Math.min(it,(xe.start+xe.count)*De)),we!==null?(Ce=Math.max(Ce,0),it=Math.min(it,we.count)):tt!=null&&(Ce=Math.max(Ce,0),it=Math.min(it,tt.count));const Ht=it-Ce;if(Ht<0||Ht===1/0)return;he.setup(V,k,_e,X,we);let bt,xt=K;if(we!==null&&(bt=x.get(we),xt=me,xt.setIndex(bt)),V.isMesh)k.wireframe===!0?(ve.setLineWidth(k.wireframeLinewidth*Xt()),xt.setMode(F.LINES)):xt.setMode(F.TRIANGLES);else if(V.isLine){let ci=k.linewidth;ci===void 0&&(ci=1),ve.setLineWidth(ci*Xt()),V.isLineSegments?xt.setMode(F.LINES):V.isLineLoop?xt.setMode(F.LINE_LOOP):xt.setMode(F.LINE_STRIP)}else V.isPoints?xt.setMode(F.POINTS):V.isSprite&&xt.setMode(F.TRIANGLES);if(V.isBatchedMesh)if(mt.get("WEBGL_multi_draw"))xt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const ci=V._multiDrawStarts,Pe=V._multiDrawCounts,_i=V._multiDrawCount,ut=we?x.get(we).bytesPerElement:1,Mn=Be.get(k).currentProgram.getUniforms();for(let hi=0;hi<_i;hi++)Mn.setValue(F,"_gl_DrawID",hi),xt.render(ci[hi]/ut,Pe[hi])}else if(V.isInstancedMesh)xt.renderInstances(Ce,Ht,V.count);else if(X.isInstancedBufferGeometry){const ci=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Pe=Math.min(X.instanceCount,ci);xt.renderInstances(Ce,Ht,Pe)}else xt.render(Ce,Ht)};function Fs(S,N,X,k){O!==null&&S.isNodeMaterial&&O.setObject(k,S),Oe===!0&&Q.setState(S,X,!1),S.transparent===!0&&S.side===ni&&S.forceSinglePass===!1?(S.side=pi,S.needsUpdate=!0,Rt(S,N,k),S.side=Rn,S.needsUpdate=!0,Rt(S,N,k),S.side=ni):Rt(S,N,k)}this.compile=function(S,N,X=null){X===null&&(X=S),O!==null&&O.renderStart(S,N,X),T=J.get(X),T.init(N),y.push(T),X.traverseVisible(function(V){V.isLight&&V.layers.test(N.layers)&&(T.pushLight(V),V.castShadow&&T.pushShadow(V))}),S!==X&&S.traverseVisible(function(V){V.isLight&&V.layers.test(N.layers)&&(T.pushLight(V),V.castShadow&&T.pushShadow(V))}),T.setupLights(),O!==null&&O.updateLights(T.state.lightsArray),Kt=this.localClippingEnabled,Oe=Q.init(this.clippingPlanes,Kt),Oe===!0&&Q.setGlobalState(this.clippingPlanes,N),O!==null&&pe.render(T.state.shadowsArray,X,N);const k=new Set;return S.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const xe=V.material;if(xe)if(Array.isArray(xe))for(let Re=0;Re<xe.length;Re++){const _e=xe[Re];Fs(_e,X,N,V),k.add(_e)}else Fs(xe,X,N,V),k.add(xe)}),T=y.pop(),O!==null&&O.renderEnd(),k},this.compileAsync=function(S,N,X=null){const k=this.compile(S,N,X);return new Promise(V=>{function xe(){if(k.forEach(function(Re){const we=Be.get(Re).currentProgram;(we===void 0||we.isReady())&&k.delete(Re)}),k.size===0){V(S);return}setTimeout(xe,10)}mt.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let ds=null;function B(S){ds&&ds(S)}function W(){oe.stop()}function ce(){oe.start()}const oe=new xc;oe.setAnimationLoop(B),typeof self<"u"&&oe.setContext(self),this.setAnimationLoop=function(S){ds=S,le.setAnimationLoop(S),S===null?oe.stop():oe.start()},le.addEventListener("sessionstart",W),le.addEventListener("sessionend",ce),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){at("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;O!==null&&O.renderStart(S,N);const X=le.enabled===!0&&le.isPresenting===!0,k=D!==null&&(ae===null||X)&&D.begin(R,ae);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(D===null||D.isCompositing()===!1)&&(le.cameraAutoUpdate===!0&&le.updateCamera(N),N=le.getCamera()),S.isScene===!0&&S.onBeforeRender(R,S,N,ae),T=J.get(S,y.length),T.init(N),T.state.textureUnits=ke.getTextureUnits(),y.push(T),yt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),N.isArrayCamera?Bt.setFromArrayCamera(N):Je.setFromProjectionMatrix(yt,Bi,N.reversedDepth),Kt=this.localClippingEnabled,Oe=Q.init(this.clippingPlanes,Kt),E=fe.get(S,g.length),E.init(),g.push(E),this.info.render.frame++,le.enabled===!0&&le.isPresenting===!0){const Re=R.xr.getDepthSensingMesh();Re!==null&&be(Re,N,-1/0,R.sortObjects)}be(S,N,0,R.sortObjects),E.finish(),O!==null&&O.updateLights(T.state.lightsArray),R.sortObjects===!0&&E.sort(ze,_t),li=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,li&&C.addToRenderList(E,S),this.info.autoReset===!0&&this.info.reset(),Oe===!0&&Q.beginShadows();const V=T.state.shadowsArray;if(pe.render(V,S,N),Oe===!0&&Q.endShadows(),(k&&D.hasRenderPass())===!1){const Re=E.opaque,_e=E.transmissive;if(T.setupLights(),N.isArrayCamera){const we=N.cameras;if(_e.length>0)for(let De=0,Ye=we.length;De<Ye;De++){const tt=we[De];lt(Re,_e,S,tt)}li&&C.render(S);for(let De=0,Ye=we.length;De<Ye;De++){const tt=we[De];Xe(E,S,tt,tt.viewport)}}else _e.length>0&&lt(Re,_e,S,N),li&&C.render(S),Xe(E,S,N)}ae!==null&&H===0&&(ke.updateMultisampleRenderTarget(ae),ke.updateRenderTargetMipmap(ae)),k&&D.end(R),S.isScene===!0&&S.onAfterRender(R,S,N),he.resetDefaultState(),$=-1,ie=null,y.pop(),y.length>0?(T=y[y.length-1],ke.setTextureUnits(T.state.textureUnits),Oe===!0&&Q.setGlobalState(R.clippingPlanes,T.state.camera)):T=null,g.pop(),g.length>0?E=g[g.length-1]:E=null,O!==null&&O.renderEnd()};function be(S,N,X,k){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)X=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLight)T.pushLight(S),S.castShadow&&T.pushShadow(S);else if(S.isSprite){const Re=N.isArrayCamera?Bt:Je;if(!S.frustumCulled||S.intersectsFrustum(Re)){k&&Ut.setFromMatrixPosition(S.matrixWorld).applyMatrix4(yt);const _e=re.update(S),we=S.material;we.visible&&E.push(S,_e,we,X,Ut.z,null,N)}}else if(S.isMesh||S.isLine||S.isPoints){const Re=N.isArrayCamera?Bt:Je;if(!S.frustumCulled||S.intersectsFrustum(Re)){const _e=re.update(S),we=S.material;if(k&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ut.copy(S.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Ut.copy(_e.boundingSphere.center)),Ut.applyMatrix4(S.matrixWorld).applyMatrix4(yt)),Array.isArray(we)){const De=_e.groups;for(let Ye=0,tt=De.length;Ye<tt;Ye++){const Ce=De[Ye],it=we[Ce.materialIndex];it&&it.visible&&E.push(S,_e,it,X,Ut.z,Ce,N)}}else we.visible&&E.push(S,_e,we,X,Ut.z,null,N)}}}const xe=S.children;for(let Re=0,_e=xe.length;Re<_e;Re++)be(xe[Re],N,X,k)}function Xe(S,N,X,k){const{opaque:V,transmissive:xe,transparent:Re}=S;T.setupLightsView(X),Oe===!0&&Q.setGlobalState(R.clippingPlanes,X),k&&ve.viewport(ne.copy(k)),V.length>0&&Ze(V,N,X),xe.length>0&&Ze(xe,N,X),Re.length>0&&Ze(Re,N,X),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function lt(S,N,X,k){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[k.id]===void 0){const Ce=mt.has("EXT_color_buffer_half_float")||mt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[k.id]=new Ti(1,1,{generateMipmaps:!0,type:Ce?Ei:Ci,minFilter:pn,samples:Math.max(4,gt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:nt.workingColorSpace})}const xe=T.state.transmissionRenderTarget[k.id],Re=k.viewport||ne;xe.setSize(Re.z*R.transmissionResolutionScale,Re.w*R.transmissionResolutionScale);const _e=R.getRenderTarget(),we=R.getActiveCubeFace(),De=R.getActiveMipmapLevel();R.setRenderTarget(xe),R.getClearColor(q),ge=R.getClearAlpha(),ge<1&&R.setClearColor(16777215,.5),R.clear(),li&&C.render(X);const Ye=R.toneMapping;R.toneMapping=tn;const tt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),T.setupLightsView(k),Oe===!0&&Q.setGlobalState(R.clippingPlanes,k),Ze(S,X,k),ke.updateMultisampleRenderTarget(xe),ke.updateRenderTargetMipmap(xe),mt.has("WEBGL_multisampled_render_to_texture")===!1){let Ce=!1;for(let it=0,Ht=N.length;it<Ht;it++){const bt=N[it],{object:xt,geometry:ci,material:Pe,group:_i}=bt;if(Pe.side===ni&&xt.layers.test(k.layers)){const ut=Pe.side;Pe.side=pi,Pe.needsUpdate=!0,Pt(xt,X,k,ci,Pe,_i),Pe.side=ut,Pe.needsUpdate=!0,Ce=!0}}Ce===!0&&(ke.updateMultisampleRenderTarget(xe),ke.updateRenderTargetMipmap(xe))}R.setRenderTarget(_e,we,De),R.setClearColor(q,ge),tt!==void 0&&(k.viewport=tt),R.toneMapping=Ye}function Ze(S,N,X){const k=N.isScene===!0?N.overrideMaterial:null;for(let V=0,xe=S.length;V<xe;V++){const Re=S[V],{object:_e,geometry:we,group:De}=Re;let Ye=Re.material;Ye.allowOverride===!0&&k!==null&&(Ye=k),_e.layers.test(X.layers)&&Pt(_e,N,X,we,Ye,De)}}function Pt(S,N,X,k,V,xe){O!==null&&V.isNodeMaterial&&O.setObject(S,V),S.onBeforeRender(R,N,X,k,V,xe),S.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),V.onBeforeRender(R,N,X,k,S,xe),V.transparent===!0&&V.side===ni&&V.forceSinglePass===!1?(V.side=pi,V.needsUpdate=!0,R.renderBufferDirect(X,N,k,V,S,xe),V.side=Rn,V.needsUpdate=!0,R.renderBufferDirect(X,N,k,V,S,xe),V.side=ni):R.renderBufferDirect(X,N,k,V,S,xe),S.onAfterRender(R,N,X,k,V,xe)}function Ft(S){let N=0;for(const X of S)X.texture!==null&&N++;return N}function Rt(S,N,X){N.isScene!==!0&&(N=oi);const k=Be.get(S),V=T.state.lights,xe=T.state.shadowsArray,Re=V.state.version,_e=te.getParameters(S,V.state,xe,N,X,T.state.lightProbeGridArray),we=te.getProgramCacheKey(_e);let De=k.programs;k.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?N.environment:null,k.fog=N.fog;const Ye=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;k.envMap=A.get(S.envMap||k.environment,Ye),k.envMapRotation=k.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,De===void 0&&(S.addEventListener("dispose",dt),De=new Map,k.programs=De,k.programVariants=new Map);let tt=De.get(we);if(tt!==void 0){if(k.currentProgram===tt&&k.lightsStateVersion===Re)return Ot(S,_e),tt}else _e.uniforms=te.getUniforms(S),O!==null&&S.isNodeMaterial&&O.build(S,X,_e),S.onBeforeCompile(_e,R),tt=te.acquireProgram(_e,we),De.set(we,tt),k.uniforms=_e.uniforms;const Ce=k.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ce.clippingPlanes=Q.uniform),Ot(S,_e),k.needsLights=gi(S),k.lightsStateVersion=Re,k.needsLights&&(Ce.ambientLightColor.value=V.state.ambient,Ce.lightProbe.value=V.state.probe,Ce.sunLights.value=V.state.sun,Ce.sunLightShadows.value=V.state.sunShadow,Ce.directionalLights.value=V.state.directional,Ce.directionalLightShadows.value=V.state.directionalShadow,Ce.spotLights.value=V.state.spot,Ce.spotLightShadows.value=V.state.spotShadow,Ce.rectAreaLights.value=V.state.rectArea,Ce.ltc_1.value=V.state.rectAreaLTC1,Ce.ltc_2.value=V.state.rectAreaLTC2,Ce.pointLights.value=V.state.point,Ce.pointLightShadows.value=V.state.pointShadow,Ce.hemisphereLights.value=V.state.hemi,Ce.sunShadowMatrix.value=V.state.sunShadowMatrix,Ce.sunShadowCascade.value=V.state.sunShadowCascade,Ce.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ce.spotLightMatrix.value=V.state.spotLightMatrix,Ce.spotLightMap.value=V.state.spotLightMap,Ce.pointShadowMatrix.value=V.state.pointShadowMatrix),k.numLightProbeGrids=Ft(T.state.lightProbeGridArray),k.currentProgram=tt,k.uniformsList=null,tt}function ki(S,N,X,k,V){const xe=Be.get(S),Re=xe.currentProgram.id+","+k+","+V;let _e=xe.programVariants.get(Re);return _e===void 0?(_e=Rt(S,N,X),xe.programVariants.set(Re,_e)):(xe.currentProgram=_e,xe.uniformsList=null,xe.outputColorSpace=k,xe.toneMapping=V),_e}function ct(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=xr.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function Ot(S,N){const X=Be.get(S);X.outputColorSpace=N.outputColorSpace,X.batching=N.batching,X.batchingColor=N.batchingColor,X.instancing=N.instancing,X.instancingColor=N.instancingColor,X.instancingMorph=N.instancingMorph,X.skinning=N.skinning,X.morphTargets=N.morphTargets,X.morphNormals=N.morphNormals,X.morphColors=N.morphColors,X.morphTargetsCount=N.morphTargetsCount,X.numClippingPlanes=N.numClippingPlanes,X.numIntersection=N.numClipIntersection,X.vertexAlphas=N.vertexAlphas,X.vertexTangents=N.vertexTangents,X.toneMapping=N.toneMapping}function Ct(S,N,X,k,V){N.isScene!==!0&&(N=oi),ke.resetTextureUnits();const xe=N.fog,Re=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?N.environment:null,_e=ae===null?R.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:nt.workingColorSpace,we=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,De=A.get(k.envMap||Re,we),Ye=k.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,tt=!!X.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Ce=!!X.morphAttributes.position,it=!!X.morphAttributes.normal,Ht=!!X.morphAttributes.color;let bt=tn;k.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(bt=R.toneMapping);const xt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ci=xt!==void 0?xt.length:0,Pe=Be.get(k),_i=T.state.lights;if(Oe===!0&&(Kt===!0||S!==ie)){const Lt=S===ie&&k.id===$;Q.setState(k,S,Lt)}let ut=!1,Mn=!1;k.version===Pe.__version?Pe.needsLights&&Pe.lightsStateVersion!==_i.state.version||V.isBatchedMesh&&Pe.batching===!1||!V.isBatchedMesh&&Pe.batching===!0||V.isBatchedMesh&&Pe.batchingColor===!0&&V._colorsTexture===null||V.isBatchedMesh&&Pe.batchingColor===!1&&V._colorsTexture!==null||V.isInstancedMesh&&Pe.instancing===!1||!V.isInstancedMesh&&Pe.instancing===!0||V.isSkinnedMesh&&Pe.skinning===!1||!V.isSkinnedMesh&&Pe.skinning===!0||V.isInstancedMesh&&Pe.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Pe.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Pe.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Pe.instancingMorph===!1&&V.morphTexture!==null||Pe.envMap!==De||k.fog===!0&&Pe.fog!==xe||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==Q.numPlanes||Pe.numIntersection!==Q.numIntersection)||Pe.vertexAlphas!==Ye||Pe.vertexTangents!==tt||Pe.morphTargets!==Ce||Pe.morphNormals!==it||Pe.morphColors!==Ht||Pe.morphTargetsCount!==ci||Pe.numLightProbeGrids!==Ft(T.state.lightProbeGridArray)?ut=!0:(Pe.outputColorSpace!==_e||Pe.toneMapping!==bt)&&(Mn=!0):(ut=!0,Pe.__version=k.version);let hi=Pe.currentProgram;(ut===!0||Mn===!0)&&(hi=Mn===!0?ki(k,N,V,_e,bt):Rt(k,N,V),O&&k.isNodeMaterial&&O.onUpdateProgram(k,hi,Pe));let Os=!1,an=!1,Sn=!1;const rt=hi.getUniforms(),ei=Pe.uniforms;if(ve.useProgram(hi.program)&&(Os=!0,an=!0,Sn=!0),k.id!==$&&($=k.id,an=!0),Os||ie!==S){ve.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),rt.setValue(F,"projectionMatrix",S.projectionMatrix),rt.setValue(F,"viewMatrix",S.matrixWorldInverse);const Jt=rt.map.cameraPosition;Jt!==void 0&&Jt.setValue(F,yi.setFromMatrixPosition(S.matrixWorld)),gt.logarithmicDepthBuffer&&rt.setValue(F,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&rt.setValue(F,"isOrthographic",S.isOrthographicCamera===!0),ie!==S&&(ie=S,an=!0,Sn=!0)}if(Pe.needsLights&&(_i.state.sunShadowMap.length>0&&rt.setValue(F,"sunShadowMap",_i.state.sunShadowMap,ke),_i.state.directionalShadowMap.length>0&&rt.setValue(F,"directionalShadowMap",_i.state.directionalShadowMap,ke),_i.state.spotShadowMap.length>0&&rt.setValue(F,"spotShadowMap",_i.state.spotShadowMap,ke),_i.state.pointShadowMap.length>0&&rt.setValue(F,"pointShadowMap",_i.state.pointShadowMap,ke)),V.isSkinnedMesh){rt.setOptional(F,V,"bindMatrix"),rt.setOptional(F,V,"bindMatrixInverse");const Lt=V.skeleton;Lt&&(Lt.boneTexture===null&&Lt.computeBoneTexture(),rt.setValue(F,"boneTexture",Lt.boneTexture,ke))}V.isBatchedMesh&&(rt.setOptional(F,V,"batchingTexture"),rt.setValue(F,"batchingTexture",V._matricesTexture,ke),rt.setOptional(F,V,"batchingIdTexture"),rt.setValue(F,"batchingIdTexture",V._indirectTexture,ke),rt.setOptional(F,V,"batchingColorTexture"),V._colorsTexture!==null&&rt.setValue(F,"batchingColorTexture",V._colorsTexture,ke));const Ni=X.morphAttributes;if((Ni.position!==void 0||Ni.normal!==void 0||Ni.color!==void 0)&&ee.update(V,X,hi),(an||Pe.receiveShadow!==V.receiveShadow)&&(Pe.receiveShadow=V.receiveShadow,rt.setValue(F,"receiveShadow",V.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&N.environment!==null&&(ei.envMapIntensity.value=N.environmentIntensity),ei.dfgLUT!==void 0&&(ei.dfgLUT.value=Zm()),an){if(rt.setValue(F,"toneMappingExposure",R.toneMappingExposure),Pe.needsLights&&Zt(ei,Sn),xe&&k.fog===!0&&ue.refreshFogUniforms(ei,xe),ue.refreshMaterialUniforms(ei,k,se,Se,T.state.transmissionRenderTarget[S.id]),Pe.needsLights&&Pe.numLightProbeGrids>0){const Lt=b;let Jt=0;for(const $i of T.state.lightProbeGridArray)$i.texture!==null&&(Lt.textures[Jt]=$i.texture,Lt.min[Jt]=$i.boundingBox.min,Lt.max[Jt]=$i.boundingBox.max,Lt.resolution[Jt]=$i.resolution,Jt++);for(const $i in Lt)Lt[$i].length=Jt;ei.probesSH.value=Lt.textures,ei.probesMin.value=Lt.min,ei.probesMax.value=Lt.max,ei.probesResolution.value=Lt.resolution}xr.upload(F,ct(Pe),ei,ke)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(xr.upload(F,ct(Pe),ei,ke),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&rt.setValue(F,"center",V.center),rt.setValue(F,"modelViewMatrix",V.modelViewMatrix),rt.setValue(F,"normalMatrix",V.normalMatrix),rt.setValue(F,"modelMatrix",V.matrixWorld),k.uniformsGroups!==void 0){const Lt=k.uniformsGroups;for(let Jt=0,$i=Lt.length;Jt<$i;Jt++){const No=Lt[Jt];Le.update(No,hi),Le.bind(No,hi)}}return hi}function Zt(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.sunLights.needsUpdate=N,S.sunLightShadows.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function gi(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return ae},this.setRenderTargetTextures=function(S,N,X){const k=Be.get(S);k.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),Be.get(S.texture).__webglTexture=N,Be.get(S.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:X,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,N){const X=Be.get(S);X.__webglFramebuffer=N,X.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(S,N=0,X=0){ae=S,j=N,H=X;let k=null,V=!1,xe=!1;if(S){const _e=Be.get(S);if(_e.__useDefaultFramebuffer!==void 0){ve.bindFramebuffer(F.FRAMEBUFFER,_e.__webglFramebuffer),ne.copy(S.viewport),Ee.copy(S.scissor),He=S.scissorTest,ve.viewport(ne),ve.scissor(Ee),ve.setScissorTest(He),$=-1;return}else if(_e.__webglFramebuffer===void 0)ke.setupRenderTarget(S);else if(_e.__hasExternalTextures)ke.rebindTextures(S,Be.get(S.texture).__webglTexture,Be.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Ye=S.depthTexture;if(_e.__boundDepthTexture!==Ye){if(Ye!==null&&Be.has(Ye)&&(S.width!==Ye.image.width||S.height!==Ye.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ke.setupDepthRenderbuffer(S)}}const we=S.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(xe=!0);const De=Be.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(De[N])?k=De[N][X]:k=De[N],V=!0):S.samples>0&&ke.useMultisampledRTT(S)===!1?k=Be.get(S).__webglMultisampledFramebuffer:Array.isArray(De)?k=De[X]:k=De,ne.copy(S.viewport),Ee.copy(S.scissor),He=S.scissorTest}else ne.copy(Ge).multiplyScalar(se).floor(),Ee.copy(ot).multiplyScalar(se).floor(),He=ht;if(X!==0&&(k=Y),ve.bindFramebuffer(F.FRAMEBUFFER,k)&&ve.drawBuffers(S,k),ve.viewport(ne),ve.scissor(Ee),ve.setScissorTest(He),V){const _e=Be.get(S.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+N,_e.__webglTexture,X)}else if(xe){const _e=N;for(let we=0;we<S.textures.length;we++){const De=Be.get(S.textures[we]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+we,De.__webglTexture,X,_e)}}else if(S!==null&&X!==0){const _e=Be.get(S.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,_e.__webglTexture,X)}$=-1};function Ii(S){const N=Be.get(S);return(N.__readFormat!==S.format||N.__readType!==S.type)&&(N.__readFormat=S.format,N.__readType=S.type,N.__formatReadable=gt.textureFormatReadable(S.format),N.__typeReadable=gt.textureTypeReadable(S.type)),N}this.readRenderTargetPixels=function(S,N,X,k,V,xe,Re,_e=0){if(!(S&&S.isWebGLRenderTarget)){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=Be.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Re!==void 0&&(we=we[Re],Array.isArray(we)&&(we=we[0])),we){ve.bindFramebuffer(F.FRAMEBUFFER,we);try{const De=S.textures[_e],Ye=De.format,tt=De.type;S.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+_e);const Ce=Ii(De);if(Ce.__formatReadable===!1){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ce.__typeReadable===!1){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-k&&X>=0&&X<=S.height-V&&F.readPixels(N,X,k,V,de.convert(Ye),de.convert(tt),xe)}finally{const De=ae!==null?Be.get(ae).__webglFramebuffer:null;ve.bindFramebuffer(F.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(S,N,X,k,V,xe,Re,_e=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=Be.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Re!==void 0&&(we=we[Re],Array.isArray(we)&&(we=we[0])),we)if(N>=0&&N<=S.width-k&&X>=0&&X<=S.height-V){ve.bindFramebuffer(F.FRAMEBUFFER,we);const De=S.textures[_e],Ye=De.format,tt=De.type;S.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+_e);const Ce=Ii(De);if(Ce.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ce.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const it=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,it),F.bufferData(F.PIXEL_PACK_BUFFER,xe.byteLength,F.STREAM_READ),F.readPixels(N,X,k,V,de.convert(Ye),de.convert(tt),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);const Ht=ae!==null?Be.get(ae).__webglFramebuffer:null;ve.bindFramebuffer(F.FRAMEBUFFER,Ht);const bt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await fh(F,bt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,it),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,xe),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(it),F.deleteSync(bt),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,N=null,X=0){const k=Math.pow(2,-X),V=Math.floor(S.image.width*k),xe=Math.floor(S.image.height*k),Re=N!==null?N.x:0,_e=N!==null?N.y:0;ke.setTexture2D(S,0),F.copyTexSubImage2D(F.TEXTURE_2D,X,0,0,Re,_e,V,xe),ve.unbindTexture()},this.copyTextureToTexture=function(S,N,X=null,k=null,V=0,xe=0){let Re,_e,we,De,Ye,tt,Ce,it,Ht;const bt=S.isCompressedTexture?S.mipmaps[xe]:S.image;if(X!==null)Re=X.max.x-X.min.x,_e=X.max.y-X.min.y,we=X.isBox3?X.max.z-X.min.z:1,De=X.min.x,Ye=X.min.y,tt=X.isBox3?X.min.z:0;else{const rt=Math.pow(2,-V);Re=Math.floor(bt.width*rt),_e=Math.floor(bt.height*rt),S.isDataArrayTexture?we=bt.depth:S.isData3DTexture?we=Math.floor(bt.depth*rt):we=1,De=0,Ye=0,tt=0}k!==null?(Ce=k.x,it=k.y,Ht=k.z):(Ce=0,it=0,Ht=0);const xt=de.convert(N.format),ci=de.convert(N.type);let Pe;N.isData3DTexture?(ke.setTexture3D(N,0),Pe=F.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(ke.setTexture2DArray(N,0),Pe=F.TEXTURE_2D_ARRAY):(ke.setTexture2D(N,0),Pe=F.TEXTURE_2D),ve.activeTexture(F.TEXTURE0),ve.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,N.flipY),ve.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),ve.pixelStorei(F.UNPACK_ALIGNMENT,N.unpackAlignment);const _i=ve.getParameter(F.UNPACK_ROW_LENGTH),ut=ve.getParameter(F.UNPACK_IMAGE_HEIGHT),Mn=ve.getParameter(F.UNPACK_SKIP_PIXELS),hi=ve.getParameter(F.UNPACK_SKIP_ROWS),Os=ve.getParameter(F.UNPACK_SKIP_IMAGES);ve.pixelStorei(F.UNPACK_ROW_LENGTH,bt.width),ve.pixelStorei(F.UNPACK_IMAGE_HEIGHT,bt.height),ve.pixelStorei(F.UNPACK_SKIP_PIXELS,De),ve.pixelStorei(F.UNPACK_SKIP_ROWS,Ye),ve.pixelStorei(F.UNPACK_SKIP_IMAGES,tt);const an=S.isDataArrayTexture||S.isData3DTexture,Sn=N.isDataArrayTexture||N.isData3DTexture;if(S.isDepthTexture){const rt=Be.get(S),ei=Be.get(N),Ni=Be.get(rt.__renderTarget),Lt=Be.get(ei.__renderTarget);ve.bindFramebuffer(F.READ_FRAMEBUFFER,Ni.__webglFramebuffer),ve.bindFramebuffer(F.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let Jt=0;Jt<we;Jt++)an&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Be.get(S).__webglTexture,V,tt+Jt),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Be.get(N).__webglTexture,xe,Ht+Jt)),F.blitFramebuffer(De,Ye,De+Re,Ye+_e,Ce,it,Ce+Re,it+_e,F.DEPTH_BUFFER_BIT,F.NEAREST);ve.bindFramebuffer(F.READ_FRAMEBUFFER,null),ve.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(V!==0||S.isRenderTargetTexture||Be.has(S)){const rt=Be.get(S),ei=Be.get(N);ve.bindFramebuffer(F.READ_FRAMEBUFFER,I),ve.bindFramebuffer(F.DRAW_FRAMEBUFFER,U);for(let Ni=0;Ni<we;Ni++)an?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,rt.__webglTexture,V,tt+Ni):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,rt.__webglTexture,V),Sn?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ei.__webglTexture,xe,Ht+Ni):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ei.__webglTexture,xe),V!==0?F.blitFramebuffer(De,Ye,De+Re,Ye+_e,Ce,it,Ce+Re,it+_e,F.COLOR_BUFFER_BIT,F.NEAREST):Sn?F.copyTexSubImage3D(Pe,xe,Ce,it,Ht+Ni,De,Ye,Re,_e):F.copyTexSubImage2D(Pe,xe,Ce,it,De,Ye,Re,_e);ve.bindFramebuffer(F.READ_FRAMEBUFFER,null),ve.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Sn?S.isDataTexture||S.isData3DTexture?F.texSubImage3D(Pe,xe,Ce,it,Ht,Re,_e,we,xt,ci,bt.data):N.isCompressedArrayTexture?F.compressedTexSubImage3D(Pe,xe,Ce,it,Ht,Re,_e,we,xt,bt.data):F.texSubImage3D(Pe,xe,Ce,it,Ht,Re,_e,we,xt,ci,bt):S.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,xe,Ce,it,Re,_e,xt,ci,bt.data):S.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,xe,Ce,it,bt.width,bt.height,xt,bt.data):F.texSubImage2D(F.TEXTURE_2D,xe,Ce,it,Re,_e,xt,ci,bt);ve.pixelStorei(F.UNPACK_ROW_LENGTH,_i),ve.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ut),ve.pixelStorei(F.UNPACK_SKIP_PIXELS,Mn),ve.pixelStorei(F.UNPACK_SKIP_ROWS,hi),ve.pixelStorei(F.UNPACK_SKIP_IMAGES,Os),xe===0&&N.generateMipmaps===!0&&N.mipmapsAutoUpdate===!0&&F.generateMipmap(Pe),ve.unbindTexture()},this.initRenderTarget=function(S){Be.get(S).__webglFramebuffer===void 0&&ke.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?ke.setTextureCube(S,0):S.isData3DTexture?ke.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?ke.setTexture2DArray(S,0):ke.setTexture2D(S,0),ve.unbindTexture()},this.resetState=function(){j=0,H=0,ae=null,ve.reset(),he.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=nt._getUnpackColorSpace()}}const Mr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class hs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Qm=new To(-1,1,1,-1,0,1);class jm extends Nt{constructor(){super(),this.setAttribute("position",new et([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new et([0,2,0,0,2,0],2))}}const e0=new jm;class Ro{constructor(e){this._mesh=new z(e0,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Qm)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Pc extends hs{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof fi?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ds.clone(e.uniforms),this.material=new fi({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ro(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class zl extends hs{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const n=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),r.buffers.stencil.setFunc(n.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(n.EQUAL,1,4294967295),r.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),r.buffers.stencil.setLocked(!0)}}class t0 extends hs{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class i0{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new Ae);this._width=i.width,this._height=i.height,t=new Ti(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ei}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Pc(Mr),this.copyPass.material.blending=Tn,this.timer=new ed}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let n=0,r=this.passes.length;n<r;n++){const a=this.passes[n];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}zl!==void 0&&(a instanceof zl?i=!0:a instanceof t0&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Ae);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class n0 extends hs{constructor(e,t,i=null,n=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Fe}render(e,t,i){const n=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=n}}const s0={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Fe(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class ss extends hs{constructor(e,t=1,i,n){super(),this.strength=t,this.radius=i,this.threshold=n,this.resolution=e!==void 0?new Ae(e.x,e.y):new Ae(256,256),this.clearColor=new Fe(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Ti(r,a,{type:Ei,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const u=new Ti(r,a,{type:Ei,depthBuffer:!1});u.texture.name="UnrealBloomPass.h"+d,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const h=new Ti(r,a,{type:Ei,depthBuffer:!1});h.texture.name="UnrealBloomPass.v"+d,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),r=Math.round(r/2),a=Math.round(a/2)}const o=s0;this.highPassUniforms=Ds.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new fi({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new Ae(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Ds.clone(Mr.uniforms),this.blendMaterial=new fi({uniforms:this.copyUniforms,vertexShader:Mr.vertexShader,fragmentShader:Mr.fragmentShader,premultipliedAlpha:!0,blending:We,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Fe,this._oldClearAlpha=1,this._basic=new Ue,this._fsQuad=new Ro(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),n=Math.round(t/2);this.renderTargetBright.setSize(i,n);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,n),this.renderTargetsVertical[r].setSize(i,n),this.separableBlurMaterials[r].uniforms.invSize.value=new Ae(1/i,1/n),i=Math.round(i/2),n=Math.round(n/2)}render(e,t,i,n,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=ss.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=ss.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],i=e/3;for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(i*i))/i);const n=[],r=[];for(let a=1;a<e;a+=2){const o=t[a],l=a+1<e?t[a+1]:0,c=o+l;n.push((a*o+(a+1)*l)/c),r.push(c)}return new fi({defines:{KERNEL_PAIRS:n.length},uniforms:{colorTexture:{value:null},invSize:{value:new Ae(.5,.5)},direction:{value:new Ae(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:n},gaussianWeights:{value:r}},vertexShader:`

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
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new fi({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}ss.BlurDirectionX=new Ae(1,0);ss.BlurDirectionY=new Ae(0,1);const fr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class r0 extends hs{constructor(){super(),this.isOutputPass=!0,this.uniforms=Ds.clone(fr.uniforms),this.material=new mc({name:fr.name,uniforms:this.uniforms,vertexShader:fr.vertexShader,fragmentShader:fr.fragmentShader}),this._fsQuad=new Ro(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},nt.getTransfer(this._outputColorSpace)===pt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===lo?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===co?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ho?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Lr?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===fo?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===po?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===uo&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const wt=Math.PI*2,Mt=(s,e,t)=>Math.max(e,Math.min(t,s)),a0=(s,e,t)=>s+(e-s)*t,Z=(s=0,e=1)=>s+Math.random()*(e-s),Et=(s,e)=>Math.floor(Z(s,e+1)),At=(s,e,t,i)=>a0(s,e,1-Math.exp(-t*i)),Kn=s=>Math.max(0,Math.floor(s)).toString().padStart(6,"0"),Jn=s=>String(s).padStart(2,"0");function rn(s,e,t,{repeat:i=[1,1],srgb:n=!0,anisotropy:r=4}={}){const a=document.createElement("canvas");a.width=s,a.height=e;const o=a.getContext("2d");t(o,s,e);const l=new ls(a);return l.wrapS=l.wrapT=Rs,l.repeat.set(i[0],i[1]),n&&(l.colorSpace=ti),l.anisotropy=r,l.needsUpdate=!0,l}function Co(s,e,t,{repeat:i=[1,1],anisotropy:n=4,strength:r=2.4}={}){const a=document.createElement("canvas");a.width=s,a.height=e;const o=a.getContext("2d");t(o,s,e);const l=o.getImageData(0,0,s,e).data,c=o.createImageData(s,e),d=(h,p)=>{h=(h+s)%s,p=(p+e)%e;const _=(p*s+h)*4;return(l[_]*.299+l[_+1]*.587+l[_+2]*.114)/255};for(let h=0;h<e;h++)for(let p=0;p<s;p++){const _=(d(p+1,h)-d(p-1,h))*r,M=(d(p,h+1)-d(p,h-1))*r,m=-_,f=-M,v=1/Math.hypot(m,f,1),w=(h*s+p)*4;c.data[w]=(m*v*.5+.5)*255,c.data[w+1]=(f*v*.5+.5)*255,c.data[w+2]=(v*.5+.5)*255,c.data[w+3]=255}o.putImageData(c,0,0);const u=new ls(a);return u.wrapS=u.wrapT=Rs,u.repeat.set(i[0],i[1]),u.anisotropy=n,u.needsUpdate=!0,u}function ai(s,e,t,i,n=.08,r=!0){for(let a=0;a<i;a++){const o=Math.floor(Z(0,255));s.fillStyle=r?`rgba(${o},${o},${o},${Z(n*.25,n)})`:`rgba(0,0,0,${Z(n*.25,n)})`;const l=Z(.5,2.5);s.fillRect(Z(0,e),Z(0,t),l,l)}}function Tt(s=128,e){const t=document.createElement("canvas");t.width=t.height=s;const i=t.getContext("2d"),n=i.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2),r=[[0,"rgba(255,255,255,1)"],[.15,"rgba(255,255,255,0.85)"],[.42,"rgba(255,255,255,0.28)"],[1,"rgba(255,255,255,0)"]];for(const[o,l]of r)n.addColorStop(o,l);i.fillStyle=n,i.fillRect(0,0,s,s);const a=new ls(t);return a.colorSpace=ti,a}function o0(s,e,t){const i=new P().subVectors(e,s);let n=0,r=1;for(const a of["x","y","z"])if(Math.abs(i[a])<1e-8){if(s[a]<t.min[a]||s[a]>t.max[a])return!1}else{const o=1/i[a];let l=(t.min[a]-s[a])*o,c=(t.max[a]-s[a])*o;if(l>c&&([l,c]=[c,l]),n=Math.max(n,l),r=Math.min(r,c),n>r)return!1}return!0}function l0(s){return rn(1024,1024,(e,t,i)=>{e.fillStyle="#26313d",e.fillRect(0,0,t,i);const n=128;for(let r=0;r<i;r+=n)for(let a=0;a<t;a+=n){const o=Et(58,82);e.fillStyle=`rgb(${o},${o+5},${o+10})`,e.fillRect(a+2,r+2,n-4,n-4),e.strokeStyle="rgba(2,5,9,0.9)",e.lineWidth=3,e.strokeRect(a+2,r+2,n-4,n-4),e.strokeStyle=`rgba(${o+22},${o+31},${o+40},0.22)`,e.lineWidth=1,e.strokeRect(a+10,r+10,n-20,n-20),e.fillStyle="rgba(2,4,7,0.7)";for(const[l,c]of[[14,14],[n-18,14],[14,n-18],[n-18,n-18]])e.beginPath(),e.arc(a+l,r+c,2.4,0,wt),e.fill();if(Math.random()<.25){const l=e.createLinearGradient(a,r,a+n,r+n);l.addColorStop(0,"rgba(0,0,0,0)"),l.addColorStop(.5,"rgba(0,0,0,0.13)"),l.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=l,e.fillRect(a+8,r+8,n-16,n-16)}}e.save(),e.strokeStyle="rgba(72,195,211,0.17)",e.lineWidth=3,e.setLineDash([26,18]),e.strokeRect(64,64,t-128,i-128),e.setLineDash([]),e.strokeStyle="rgba(234,164,74,0.12)",e.lineWidth=8,e.beginPath(),e.arc(t/2,i/2,335,0,wt),e.stroke(),e.lineWidth=1,e.strokeStyle="rgba(96,216,232,0.13)",e.beginPath(),e.arc(t/2,i/2,390,0,wt),e.stroke(),e.restore();for(let r=0;r<160;r++)e.fillStyle=`rgba(0,0,0,${Z(.02,.1)})`,e.beginPath(),e.ellipse(Z(0,t),Z(0,i),Z(5,55),Z(2,18),Z(0,wt),0,wt),e.fill();ai(e,t,i,9e3,.11,!0),ai(e,t,i,5e3,.12,!1)},{repeat:[7,7],anisotropy:s})}function c0(s){return rn(512,512,(e,t,i)=>{e.fillStyle="#394653",e.fillRect(0,0,t,i);for(let n=0;n<i;n+=64)for(let r=0;r<t;r+=128){const a=Et(45,66);e.fillStyle=`rgb(${a},${a+5},${a+9})`,e.fillRect(r+1,n+1,126,62),e.strokeStyle="rgba(0,0,0,0.45)",e.strokeRect(r+1,n+1,126,62)}for(let n=0;n<250;n++)e.fillStyle=`rgba(${Et(60,120)},${Et(70,130)},${Et(80,140)},${Z(.02,.09)})`,e.fillRect(Z(0,t),Z(0,i),Z(4,60),Z(1,3));for(let n=0;n<18;n++){const r=Z(0,t),a=Z(0,i*.5),o=e.createLinearGradient(r,a,r,a+Z(30,120));o.addColorStop(0,"rgba(74,49,30,0.22)"),o.addColorStop(1,"rgba(20,13,8,0)"),e.fillStyle=o,e.fillRect(r,a,Z(1,5),Z(30,130))}ai(e,t,i,6e3,.18,!0),ai(e,t,i,3e3,.2,!1)},{repeat:[2,2],anisotropy:s})}function h0(s){return rn(1024,512,(e,t,i)=>{e.fillStyle="#36424f",e.fillRect(0,0,t,i);for(let r=0;r<i;r+=128)for(let a=0;a<t;a+=128){const o=Et(64,92);if(e.fillStyle=`rgb(${o},${o+5},${o+11})`,e.fillRect(a+2,r+2,124,124),e.strokeStyle="rgba(0,0,0,0.6)",e.lineWidth=2,e.strokeRect(a+2,r+2,124,124),e.strokeStyle="rgba(78,116,132,0.13)",e.lineWidth=1,e.strokeRect(a+11,r+11,106,106),Math.random()<.22){e.strokeStyle="rgba(0,0,0,0.45)";for(let l=0;l<5;l++)e.beginPath(),e.moveTo(a+35,r+45+l*8),e.lineTo(a+92,r+45+l*8),e.stroke()}}e.fillStyle="rgba(0,0,0,0.58)",e.fillRect(0,250,t,8),e.fillRect(502,0,6,i),e.fillStyle="rgba(93,170,181,0.16)",e.fillRect(0,248,t,2),e.save(),e.globalAlpha=.28,e.fillStyle="#d78b30";for(let r=0;r<6;r++)e.beginPath(),e.moveTo(660+r*46,470),e.lineTo(680+r*46,470),e.lineTo(646+r*46,512),e.lineTo(626+r*46,512),e.closePath(),e.fill();e.restore();const n=[86,352,742,948];for(const r of n){e.save();const a=e.createLinearGradient(r-4,0,r+4,0);a.addColorStop(0,"rgba(27,118,139,0.05)"),a.addColorStop(.5,"rgba(80,236,255,0.9)"),a.addColorStop(1,"rgba(27,118,139,0.05)"),e.fillStyle=a,e.fillRect(r-4,38,8,402),e.globalAlpha=.32,e.fillStyle="#aefaff",e.fillRect(r-1,38,2,402),e.restore()}for(let r=0;r<3;r++){const a=150+r*290,o=42+r%2*260;e.save();const l=e.createLinearGradient(a,o,a+120,o+70);l.addColorStop(0,"rgba(27,84,102,0.2)"),l.addColorStop(1,"rgba(5,13,20,0.12)"),e.fillStyle=l,e.fillRect(a,o,130,74),e.strokeStyle="rgba(100,225,242,0.42)",e.lineWidth=2,e.strokeRect(a,o,130,74),e.fillStyle="rgba(106,238,250,0.6)";for(let c=0;c<5;c++)e.fillRect(a+14+c*21,o+54,13,3);e.fillStyle="rgba(255,150,65,0.4)",e.fillRect(a+14,o+14,56,2),e.restore()}e.fillStyle="rgba(91,236,253,0.7)",e.fillRect(0,4,t,5),e.fillStyle="rgba(255,147,58,0.28)",e.fillRect(0,490,t,4);for(let r=0;r<40;r++)e.fillStyle=`rgba(0,0,0,${Z(.03,.13)})`,e.fillRect(Z(0,t),Z(0,i),Z(2,92),Z(1,4));ai(e,t,i,7e3,.13,!0),ai(e,t,i,5e3,.13,!1)},{repeat:[4,1],anisotropy:s})}function d0(s){return Co(512,512,(e,t,i)=>{e.fillStyle="#1a1a1a",e.fillRect(0,0,t,i);const n=64;for(let r=0;r<i;r+=n)for(let a=0;a<t;a+=n){const o=Et(124,146);e.fillStyle=`rgb(${o},${o},${o})`,e.fillRect(a+1,r+1,n-2,n-2),e.fillStyle=`rgb(${o+28},${o+28},${o+28})`,e.fillRect(a+1,r+1,n-2,2),e.fillRect(a+1,r+1,2,n-2),e.fillStyle=`rgb(${Math.max(8,o-90)},${Math.max(8,o-90)},${Math.max(8,o-90)})`,e.fillRect(a+1,r+n-3,n-2,2),e.fillRect(a+n-3,r+1,2,n-2);for(const[l,c]of[[7,7],[n-7,7],[7,n-7],[n-7,n-7]]){const d=e.createRadialGradient(a+l-2,r+c-2,0,a+l,r+c,5);d.addColorStop(0,"#d8d8d8"),d.addColorStop(.7,"#8a8a8a"),d.addColorStop(1,"#3a3a3a"),e.fillStyle=d,e.beginPath(),e.arc(a+l,r+c,3.4,0,wt),e.fill()}Math.random()<.3&&(e.fillStyle=`rgba(${Et(70,110)},${Et(70,110)},${Et(70,110)},0.4)`,e.beginPath(),e.ellipse(a+Z(12,n-12),r+Z(12,n-12),Z(3,14),Z(2,6),Z(0,wt),0,wt),e.fill())}e.strokeStyle="#4e4e4e",e.lineWidth=5,e.setLineDash([13,9]),e.strokeRect(32,32,t-64,i-64),e.setLineDash([]),e.strokeStyle="#585858",e.lineWidth=7,e.beginPath(),e.arc(t/2,i/2,168,0,wt),e.stroke(),ai(e,t,i,6e3,.1,!0),ai(e,t,i,3e3,.1,!1)},{repeat:[7,7],anisotropy:s,strength:2.9})}function u0(s){return Co(1024,512,(e,t,i)=>{e.fillStyle="#1c1c1c",e.fillRect(0,0,t,i);const n=128;for(let r=0;r<i;r+=n)for(let a=0;a<t;a+=n){const o=Et(126,148);if(e.fillStyle=`rgb(${o},${o},${o})`,e.fillRect(a+2,r+2,n-4,n-4),e.fillStyle=`rgb(${o+30},${o+30},${o+30})`,e.fillRect(a+2,r+2,n-4,3),e.fillRect(a+2,r+2,3,n-4),e.fillStyle=`rgb(${Math.max(8,o-92)},${Math.max(8,o-92)},${Math.max(8,o-92)})`,e.fillRect(a+2,r+n-5,n-4,3),e.fillRect(a+n-5,r+2,3,n-4),Math.random()<.24){e.fillStyle="#353535",e.fillRect(a+36,r+38,62,52),e.fillStyle="#101010";for(let l=0;l<5;l++)e.fillRect(a+40,r+44+l*9,52,4)}}e.fillStyle="#0e0e0e",e.fillRect(0,248,t,10),e.fillRect(500,0,10,i);for(const r of[86,352,742,948])e.fillStyle="#141414",e.fillRect(r-7,36,14,406),e.fillStyle="#9a9a9a",e.fillRect(r-9,36,2,406),e.fillRect(r+7,36,2,406);e.fillStyle="#c4c4c4",e.fillRect(0,2,t,7),ai(e,t,i,9e3,.1,!0),ai(e,t,i,4e3,.1,!1)},{repeat:[4,1],anisotropy:s,strength:2.6})}function f0(s){return Co(512,512,(e,t,i)=>{e.fillStyle="#202020",e.fillRect(0,0,t,i);for(let n=0;n<i;n+=64)for(let r=0;r<t;r+=128){const a=Et(128,150);e.fillStyle=`rgb(${a},${a},${a})`,e.fillRect(r+2,n+2,124,60),e.fillStyle=`rgb(${a+26},${a+26},${a+26})`,e.fillRect(r+2,n+2,124,2),e.fillRect(r+2,n+2,2,60),e.fillStyle=`rgb(${Math.max(8,a-86)},${Math.max(8,a-86)},${Math.max(8,a-86)})`,e.fillRect(r+2,n+60,124,2),e.fillRect(r+124,n+2,2,60)}for(let n=0;n<26;n++){const r=Et(8,t-8),a=Et(8,i-8);e.fillStyle=Math.random()<.5?"#b8b8b8":"#5c5c5c",e.beginPath(),e.arc(r,a,Z(1.5,2.8),0,wt),e.fill()}for(let n=0;n<90;n++)e.fillStyle=`rgba(${Et(60,150)},${Et(60,150)},${Et(60,150)},0.18)`,e.fillRect(Z(0,t),Z(0,i),Z(2,40),1);ai(e,t,i,5e3,.1,!0),ai(e,t,i,2500,.1,!1)},{repeat:[2,2],anisotropy:s,strength:2.3})}function p0(){return rn(64,256,(s,e,t)=>{const i=s.createLinearGradient(0,0,0,t);i.addColorStop(0,"rgba(150,240,255,0.72)"),i.addColorStop(.18,"rgba(90,196,230,0.3)"),i.addColorStop(.55,"rgba(34,96,124,0.08)"),i.addColorStop(1,"rgba(0,0,0,0)"),s.fillStyle=i,s.fillRect(0,0,e,t),ai(s,e,t,600,.08,!0)})}function m0(){return rn(512,512,(s,e,t)=>{s.fillStyle="#070d14",s.fillRect(0,0,e,t),s.fillStyle="#0b131d",s.fillRect(4,0,e-8,t);for(let n=0;n<t;n+=32)s.fillStyle="rgba(28,42,56,0.55)",s.fillRect(0,n,e,3),s.fillStyle="rgba(0,0,0,0.5)",s.fillRect(0,n+3,e,2);for(let n=0;n<e;n+=64)s.fillStyle="rgba(5,10,16,0.7)",s.fillRect(n,0,5,t),s.fillStyle="rgba(48,74,92,0.16)",s.fillRect(n+5,0,2,t);for(let n=10;n<t-8;n+=32)for(let r=14;r<e-12;r+=26)if(Math.random()>.68){const o=Math.random()<.24;s.fillStyle=o?"rgba(255,176,96,0.95)":"rgba(126,224,247,0.92)",s.fillRect(r,n,16,9),s.globalAlpha=.18,s.fillRect(r-3,n-2,22,13),s.globalAlpha=1}else s.fillStyle="rgba(10,18,27,0.95)",s.fillRect(r,n,16,9);const i=s.createLinearGradient(0,0,0,t);i.addColorStop(0,"rgba(110,224,255,0.5)"),i.addColorStop(1,"rgba(28,92,120,0.1)"),s.fillStyle=i,s.fillRect(4,0,2,t),s.fillRect(e-6,0,2,t),s.fillStyle="rgba(255,160,80,0.28)";for(let n=64;n<t;n+=128)s.fillRect(0,n,e,2);ai(s,e,t,900,.07,!0)},{repeat:[1,2]})}function Lc(s,e,t="#47ecff"){return rn(1024,512,(i,n,r)=>{i.clearRect(0,0,n,r);const a=i.createLinearGradient(0,0,n,r);a.addColorStop(0,"rgba(4,12,20,0.96)"),a.addColorStop(.55,"rgba(6,17,27,0.96)"),a.addColorStop(1,"rgba(3,9,15,0.96)"),i.fillStyle=a,i.fillRect(0,0,n,r),i.strokeStyle=t,i.globalAlpha=.5,i.lineWidth=3,i.strokeRect(12,12,n-24,r-24),i.globalAlpha=.16,i.lineWidth=1,i.strokeRect(28,28,n-56,r-56),i.globalAlpha=.24,i.fillStyle=t,i.fillRect(12,12,260,5),i.fillRect(n-170,r-18,158,5),i.globalAlpha=1,i.textAlign="center",i.textBaseline="middle",i.font="900 126px Orbitron, Arial Black, sans-serif",i.fillStyle="#e9fdff",i.shadowColor=t,i.shadowBlur=32,i.fillText(s,n/2,r/2-30),i.shadowBlur=12,i.font="600 30px Rajdhani, Arial Narrow, sans-serif",i.fillStyle=t,i.fillText(e,n/2,r/2+88),i.shadowBlur=0,i.font="700 17px Orbitron, sans-serif",i.fillStyle="rgba(172,230,240,0.48)",i.fillText("HELIX SYSTEMS // 09",n/2,r-58),i.globalAlpha=.12,i.fillStyle="#8eefff";for(let o=0;o<r;o+=4)i.fillRect(0,o,n,1)},{anisotropy:8})}function g0(){return rn(512,128,(s,e,t)=>{s.fillStyle="#0b0c0d",s.fillRect(0,0,e,t),s.fillStyle="#c98227";for(let i=-t;i<e+t;i+=64)s.beginPath(),s.moveTo(i,t),s.lineTo(i+32,t),s.lineTo(i+32+t,0),s.lineTo(i+t,0),s.closePath(),s.fill();for(let i=0;i<30;i++)s.fillStyle=`rgba(0,0,0,${Z(.05,.28)})`,s.fillRect(Z(0,e),Z(0,t),Z(6,50),Z(1,3))},{repeat:[2,1]})}function _0(){return rn(1024,512,(s,e,t)=>{const i=s.createLinearGradient(0,0,0,t);i.addColorStop(0,"#1b3a60"),i.addColorStop(.35,"#3f7ea3"),i.addColorStop(.5,"#5aa4bd"),i.addColorStop(.62,"#3b7e9e"),i.addColorStop(.8,"#1b4460"),i.addColorStop(1,"#0a1826"),s.fillStyle=i,s.fillRect(0,0,e,t);for(let n=0;n<70;n++){const r=Z(0,t),a=s.createLinearGradient(0,r,0,r+Z(3,26));a.addColorStop(0,`rgba(${Et(55,110)},${Et(90,150)},${Et(120,185)},${Z(.05,.24)})`),a.addColorStop(1,"rgba(0,0,0,0)"),s.fillStyle=a,s.fillRect(0,r,e,Z(3,25))}s.save(),s.translate(e*.62,t*.56),s.rotate(-.14);for(let n=0;n<9;n++)s.strokeStyle=`rgba(${Et(105,160)},${Et(170,210)},${Et(205,235)},${Z(.05,.15)})`,s.lineWidth=Z(2,8),s.beginPath(),s.ellipse(0,0,120+n*22,16+n*7,0,0,wt),s.stroke();s.restore(),ai(s,e,t,5e3,.08,!0),ai(s,e,t,2e3,.09,!1)},{anisotropy:4})}function v0(){return rn(1024,512,(s,e,t)=>{const i=s.createLinearGradient(0,0,0,t);i.addColorStop(0,"#01030a"),i.addColorStop(.38,"#06101f"),i.addColorStop(.52,"#163248"),i.addColorStop(.62,"#0b1d2c"),i.addColorStop(.8,"#030812"),i.addColorStop(1,"#010207"),s.fillStyle=i,s.fillRect(0,0,e,t);const n=[[180,245,120,"rgba(20,174,224,0.55)"],[720,255,150,"rgba(246,82,196,0.42)"],[500,230,210,"rgba(255,144,68,0.3)"],[980,200,120,"rgba(38,104,255,0.3)"]];for(const[a,o,l,c]of n){const d=s.createRadialGradient(a,o,0,a,o,l);d.addColorStop(0,c),d.addColorStop(1,"rgba(0,0,0,0)"),s.fillStyle=d,s.fillRect(0,0,e,t)}const r=s.createLinearGradient(0,240,0,300);r.addColorStop(0,"rgba(0,0,0,0)"),r.addColorStop(.5,"rgba(61,204,239,0.15)"),r.addColorStop(1,"rgba(0,0,0,0)"),s.fillStyle=r,s.fillRect(0,235,e,80),ai(s,e,t,2500,.08,!0)},{anisotropy:2})}function x0(s=1600){const e=new Float32Array(s*3),t=new Float32Array(s*3),i=new Fe;for(let o=0;o<s;o++){const l=Z(120,172),c=Z(0,wt),d=Math.acos(Z(-.15,1)),u=l*Math.sin(d)*Math.cos(c),h=l*Math.cos(d),p=l*Math.sin(d)*Math.sin(c);e[o*3]=u,e[o*3+1]=h,e[o*3+2]=p,i.setHSL(Z(.48,.62),Z(.05,.45),Z(.62,1)),t[o*3]=i.r,t[o*3+1]=i.g,t[o*3+2]=i.b}const n=new Nt;n.setAttribute("position",new Mi(e,3)),n.setAttribute("color",new Mi(t,3));const r=new Ir({size:.46,map:Tt(64),vertexColors:!0,transparent:!0,opacity:.9,depthWrite:!1,blending:We,sizeAttenuation:!0,toneMapped:!1}),a=new Nr(n,r);return a.frustumCulled=!1,a}function M0(){const s=new z(new Si(190,40,24),new fi({side:pi,depthWrite:!1,uniforms:{},vertexShader:`
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        varying vec3 vPos;
        void main() {
          vec3 d = normalize(vPos);
          float h = d.y;
          vec3 bottom = vec3(0.008, 0.018, 0.035);
          vec3 horizon = vec3(0.025, 0.075, 0.118);
          vec3 top = vec3(0.003, 0.008, 0.025);
          vec3 col = mix(bottom, horizon, smoothstep(-0.15, 0.06, h));
          col = mix(col, top, smoothstep(0.05, 0.72, h));
          float glow = pow(max(0.0, 1.0 - abs(h - 0.03)), 14.0);
          col += vec3(0.06, 0.26, 0.34) * glow * 0.45;
          float side = pow(max(0.0, d.x * 0.7 + d.z * 0.3), 5.0);
          col += vec3(0.12, 0.02, 0.12) * side * 0.12;
          gl_FragColor = vec4(col, 1.0);
        }
      `}));return s.renderOrder=-10,s.frustumCulled=!1,s}function S0(s){const e=new Dt;e.position.set(-80,65,-136);const t=new z(new Si(15.5,48,32),new Ue({map:_0(),toneMapped:!1,fog:!1}));t.rotation.y=-.6,e.add(t);const i=new z(new Si(16.2,48,32),new fi({transparent:!0,blending:We,side:pi,depthWrite:!1,fog:!1,uniforms:{uColor:{value:new Fe(5814527)}},vertexShader:`
        varying vec3 vNormal;
        varying vec3 vWorld;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorld = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,fragmentShader:`
        uniform vec3 uColor;
        varying vec3 vNormal;
        varying vec3 vWorld;
        void main() {
          vec3 viewDir = normalize(cameraPosition - vWorld);
          float rim = pow(1.0 - abs(dot(normalize(vNormal), viewDir)), 2.4);
          gl_FragColor = vec4(uColor * (0.55 + rim * 1.6), rim * 0.85);
        }
      `}));e.add(i);const n=new Ue({color:9418956,transparent:!0,opacity:.2,side:ni,depthWrite:!1,blending:We,toneMapped:!1,fog:!1}),r=new z(new An(18.4,23.2,96),n);r.rotation.set(1.26,.05,.3),e.add(r);const a=new z(new An(24,24.6,96),n.clone());a.material.opacity=.07,a.rotation.copy(r.rotation),e.add(a);const o=new Wt(new zt({map:Tt(128),color:4034525,transparent:!0,opacity:.2,blending:We,depthWrite:!1,toneMapped:!1}));return o.scale.set(60,60,1),e.add(o),e.renderOrder=-5,s.add(e),e}function y0(s,e){const t=new Dt,i=new Ie(1,1,1),r=[{color:2768207,emissive:12183285,intensity:.7,rough:.62},{color:3814461,emissive:16761740,intensity:.54,rough:.7},{color:2373189,emissive:10145768,intensity:.48,rough:.66}].map(u=>new ii({color:u.color,map:e,emissive:u.emissive,emissiveMap:e,emissiveIntensity:u.intensity,roughness:u.rough,metalness:.28})),a=new Ue({color:10350335,transparent:!0,opacity:.55,toneMapped:!1}),o=[];for(let u=0;u<64;u++){const h=u/64*wt+Z(-.045,.045),p=Z(78,132),_=Z(5,14),M=Z(5,14),m=Z(14,56)*(p>102?1.16:1),f=r[u%r.length],v=new z(i,f);if(v.position.set(Math.cos(h)*p,m/2-2,Math.sin(h)*p),v.scale.set(_,m,M),v.rotation.y=Z(-.15,.15),t.add(v),Math.random()<.55){const w=new z(i,r[(u+1)%r.length]),b=_*Z(.35,.7);w.position.set(v.position.x,m-1.4,v.position.z),w.scale.set(b,Z(1.4,5.5),b),t.add(w)}if(Math.random()<.3){const w=Z(6,18),b=new z(new ft(.12,.2,w,5),a);b.position.set(v.position.x,m+w/2-2,v.position.z),t.add(b)}Math.random()<.6&&o.push(v.position.x,m+1.4,v.position.z)}const l=new Nt;l.setAttribute("position",new et(o,3));const c=new Nr(l,new Ir({color:16738912,size:.9,map:Tt(64),transparent:!0,opacity:.95,depthWrite:!1,blending:We,toneMapped:!1}));t.add(c);const d=new zt({map:Tt(256),color:2854837,transparent:!0,opacity:.16,blending:We,depthWrite:!1,toneMapped:!1});for(let u=0;u<7;u++){const h=-.9+u*.3,p=new Wt(d);p.position.set(Math.cos(h)*150,Z(4,14),Math.sin(h)*150),p.scale.set(Z(62,105),Z(18,32),1),t.add(p)}return s.add(t),t}function Ss(s,e,t,i,n){return new z(new ri(s,e),new Ue({map:Lc(t,i,n),transparent:!1,toneMapped:!1}))}function kl(s,e,t){return new z(new ri(s,e),new Ue({map:t,toneMapped:!1}))}function b0(s,e){const t=Math.min(8,e.capabilities.getMaxAnisotropy()),i=l0(t),n=c0(t),r=h0(t),a=d0(t),o=f0(t),l=u0(t),c=g0(),d=m0();s.fog=new bo(396566,.0086);const u=v0();u.mapping=pr;const h=new Is(e);h.compileEquirectangularShader();const p=h.fromEquirectangular(u);s.environment=p.texture,s.environmentIntensity=1.02,u.dispose(),h.dispose();const _=M0();s.add(_),s.add(x0());const M=S0(s);y0(s,d);const m=new Kh(10476789,1582126,2.45);s.add(m);const f=new Qh(4023161,1.1);s.add(f);const v=new pa(12377343,3.1);v.position.set(28,42,24),v.castShadow=!0,v.shadow.mapSize.set(1024,1024),v.shadow.camera.left=-44,v.shadow.camera.right=44,v.shadow.camera.top=44,v.shadow.camera.bottom=-44,v.shadow.camera.near=1,v.shadow.camera.far=105,v.shadow.bias=-4e-4,v.shadow.normalBias=.035,s.add(v);const w=new pa(4573416,.9);w.position.set(-34,14,36),s.add(w);const b=new pa(16747090,.5);b.position.set(34,11,30),s.add(b);const E=new Vi(3528437,190,48,2);E.position.set(0,10,12),s.add(E);const T=new Vi(5233919,130,42,2);T.position.set(20,8,-20),s.add(T);const g=new Vi(14363558,110,40,2);g.position.set(-20,6,-22),s.add(g);const y=new Vi(16748094,52,30,2);y.position.set(18,5.4,-6),s.add(y);const D=new Vi(16753234,58,22,2);D.position.set(0,4.4,0),s.add(D);const R=new Vi(7331071,46,18,2);R.position.set(0,8.2,0),s.add(R);const L=[],O=[],Y=[],I=[],U={metal:new ii({color:11451849,map:n,normalMap:o,normalScale:new Ae(.72,.72),roughness:.44,metalness:.74,envMapIntensity:1.1,emissive:1058352,emissiveMap:n,emissiveIntensity:.38}),darkMetal:new ii({color:4873064,map:n,normalMap:o,normalScale:new Ae(.85,.85),roughness:.52,metalness:.6,envMapIntensity:1,emissive:1190454,emissiveMap:n,emissiveIntensity:.32}),wall:new ii({color:12570330,map:r,normalMap:l,normalScale:new Ae(.95,.95),roughness:.7,metalness:.26,envMapIntensity:1,emissive:2775664,emissiveMap:r,emissiveIntensity:1.2}),cyan:new Ue({color:6748159,toneMapped:!1}),cyanDim:new Ue({color:822171,toneMapped:!1}),orange:new Ue({color:16742960,toneMapped:!1}),orangeDim:new Ue({color:12075798,toneMapped:!1}),red:new Ue({color:16724812,toneMapped:!1}),magenta:new Ue({color:16726738,toneMapped:!1}),hazard:new Ue({map:c,toneMapped:!1})};function j(B,{hit:W=!0}={}){return W&&O.push(B),B}function H(B,W,ce,oe,be=2,Xe=0){const lt=(Math.abs(Math.cos(Xe))*ce+Math.abs(Math.sin(Xe))*oe)/2,Ze=(Math.abs(Math.sin(Xe))*ce+Math.abs(Math.cos(Xe))*oe)/2;L.push(new as(new P(B-lt,0,W-Ze),new P(B+lt,be,W+Ze)))}const ae=new ii({color:12372436,map:i,normalMap:a,normalScale:new Ae(.62,.62),roughness:.47,metalness:.36,envMapIntensity:1.25,emissive:1585210,emissiveMap:i,emissiveIntensity:.3}),$=new z(new ri(92,92),ae);$.rotation.x=-Math.PI/2,$.receiveShadow=!0,j($),s.add($);const ie=new id(90,45,1005160,666424);ie.position.y=.012,ie.material.transparent=!0,ie.material.opacity=.16,ie.material.depthWrite=!1,ie.material.blending=We,s.add(ie);for(const[B,W,ce,oe]of[[0,-41.4,82,.16],[0,41.4,82,.16],[-41.4,0,.16,82],[41.4,0,.16,82]]){const be=new z(new Ie(ce,.025,oe),U.cyanDim);be.position.set(B,.03,W),s.add(be)}const ne=new Dt,Ee=[{x:0,z:-44.7,w:90,d:2,rot:0,sign:!0},{x:0,z:44.7,w:90,d:2,rot:Math.PI,sign:!1},{x:-44.7,z:0,w:2,d:90,rot:-Math.PI/2,sign:!0},{x:44.7,z:0,w:2,d:90,rot:Math.PI/2,sign:!0}];for(const B of Ee){const W=new z(new Ie(B.w,8.4,B.d),U.wall);W.position.set(B.x,4.2,B.z),W.castShadow=!0,W.receiveShadow=!0,ne.add(W),j(W),H(B.x,B.z,B.w,B.d,8);const ce=new z(new Ie(B.w+.1,.14,B.d+.16),U.cyanDim);ce.position.set(B.x,8.35,B.z),ne.add(ce);const oe=new z(new Ie(B.w+.06,.08,B.d+.1),U.orange);oe.position.set(B.x,.42,B.z),oe.scale.y=.4,ne.add(oe);const be=Math.abs(B.x)>Math.abs(B.z);for(let Xe=-36;Xe<=36;Xe+=9){if(Math.abs(Xe)<10)continue;const lt=be?B.x-Math.sign(B.x)*.85:B.x+Xe,Ze=be?B.z+Xe:B.z-Math.sign(B.z)*.85,Pt=new z(new Ie(.7,5.2,.7),U.darkMetal);Pt.position.set(lt,2.6,Ze),Pt.castShadow=!0,ne.add(Pt);const Ft=new z(new Ie(.12,3.4,.72),U.cyan);be?Ft.position.set(lt+Math.sign(-B.x)*.36,4.2,Ze):Ft.position.set(lt,4.2,Ze+Math.sign(-B.z)*.36),be&&Ft.scale.set(6,1,1),ne.add(Ft);const Rt=new z(new Si(.1,8,6),U.orange);Rt.position.set(lt,1.1,Ze+(be?0:Math.sign(-B.z)*.42)),be&&(Rt.position.x=lt+Math.sign(-B.x)*.42),ne.add(Rt)}}s.add(ne);const He=p0();for(const B of Ee){const W=Math.abs(B.x)>Math.abs(B.z),ce=new z(new ri(86,5.6),new Ue({map:He,color:9430005,transparent:!0,opacity:.58,blending:We,depthWrite:!1,toneMapped:!1,side:ni}));W?(ce.position.set(B.x+Math.sign(-B.x)*1.03,4.35,0),ce.rotation.y=B.x<0?Math.PI/2:-Math.PI/2):(ce.position.set(0,4.35,B.z+Math.sign(-B.z)*1.03),ce.rotation.y=B.z>0?Math.PI:0),s.add(ce)}const q=new Dt,ge=new ii({color:7310236,map:n,normalMap:o,normalScale:new Ae(.6,.6),metalness:.86,roughness:.34,envMapIntensity:1.3}),Te=new ii({color:1780277,map:n,normalMap:o,normalScale:new Ae(.9,.9),metalness:.7,roughness:.52,envMapIntensity:.8}),Se=new Ue({color:16767392,toneMapped:!1}),se=new Ie(1,1,1);for(const B of Ee){const W=Math.abs(B.x)>Math.abs(B.z),ce=W?B.x+Math.sign(-B.x)*1.01:B.x,oe=W?B.z:B.z+Math.sign(-B.z)*1.01,be=W?Math.PI/2:0;for(let ct=-33;ct<=33;ct+=6.6){if(Math.abs(ct)<7)continue;const Ot=ct,Ct=ct%13===0?5.15:2.35,Zt=3.3,gi=1.42,Ii=W?ce+Math.sign(-B.x)*.09:B.x+Ot,S=W?B.z+Ot:oe+Math.sign(-B.z)*.09,N=new z(se,Te);N.scale.set(Zt,gi,.16),N.position.set(Ii,Ct,S),N.rotation.y=be,q.add(N);const X=new z(se,U.cyanDim);if(X.scale.set(Zt*.82,.035,.2),X.position.set(W?Ii+Math.sign(-B.x)*.02:Ii,Ct+gi*.5-.16,W?S:S+Math.sign(-B.z)*.02),X.rotation.y=be,q.add(X),ct%13!==0){const k=new z(se,U.hazard);k.scale.set(Zt*.32,gi*.22,.19),k.position.set(W?Ii+Math.sign(-B.x)*.02:Ii+Zt*.28,Ct-gi*.18,W?S+Zt*.28:S+Math.sign(-B.z)*.02),k.rotation.y=be,q.add(k)}}const Xe=80;for(const[ct,Ot]of[[1.05,.13],[1.32,.075]]){const Ct=new z(new ft(Ot,Ot,Xe,8),U.darkMetal);Ct.rotation.z=Math.PI/2,Ct.rotation.y=be,W?(Ct.rotation.set(Math.PI/2,0,0),Ct.position.set(ce+Math.sign(-B.x)*.34,ct,B.z)):Ct.position.set(B.x,ct,oe+Math.sign(-B.z)*.34),q.add(Ct)}const lt=6.55,Ze=1.55,Pt=new z(se,U.darkMetal);Pt.scale.set(W?Ze:88,.14,W?88:Ze),Pt.position.set(W?ce+Math.sign(-B.x)*Ze/2:B.x,lt,W?B.z:oe+Math.sign(-B.z)*Ze/2),q.add(Pt);const Ft=W?ce+Math.sign(-B.x)*(Ze-.05):B.x,Rt=W?B.z:oe+Math.sign(-B.z)*(Ze-.05);for(const ct of[lt+.52,lt+1.02]){const Ot=new z(se,ge);Ot.scale.set(W?.06:88,.055,W?88:.06),Ot.position.set(Ft,ct,Rt),q.add(Ot)}for(let ct=-42;ct<=42;ct+=4.4){const Ot=new z(se,ge);if(Ot.scale.set(.06,1.08,.06),Ot.position.set(W?Ft:B.x+ct,lt+.54,W?B.z+ct:Rt),q.add(Ot),ct%8.8===0){const Ct=new z(se,U.darkMetal);Ct.scale.set(.16,.16,W?1.35:.16),Ct.position.set(W?ce+Math.sign(-B.x)*.7:B.x+ct,lt-.28,W?B.z+ct:oe+Math.sign(-B.z)*.7),W?Ct.rotation.x=.45:Ct.rotation.z=.45,q.add(Ct)}}const ki=new z(se,U.cyanDim);ki.scale.set(W?.05:88,.03,W?88:.05),ki.position.set(W?Ft:B.x,lt+.08,W?B.z:Rt),q.add(ki);for(let ct=-33;ct<=33;ct+=22){const Ot=W?ce+Math.sign(-B.x)*.3:B.x+ct,Ct=W?B.z+ct:oe+Math.sign(-B.z)*.3,Zt=new z(se,Se);Zt.scale.set(W?.3:.9,.06,W?.9:.3),Zt.position.set(Ot,6.26,Ct),q.add(Zt);const gi=new Wt(new zt({map:Tt(64),color:16758122,transparent:!0,opacity:.3,blending:We,depthWrite:!1,toneMapped:!1}));gi.position.set(Ot,6.18,Ct),gi.scale.set(1.25,1.25,1),q.add(gi)}}const ze=9.55,_t=10.95;for(const[B,W,ce,oe]of[[0,-39.6,88,0],[0,39.6,88,0],[-39.6,0,88,Math.PI/2],[39.6,0,88,Math.PI/2]]){for(const be of[ze,_t]){const Xe=new z(se,U.darkMetal);Xe.scale.set(ce,.3,.34),Xe.position.set(B,be,W),Xe.rotation.y=oe,q.add(Xe)}for(let be=-40;be<=40;be+=4.4){const Xe=new z(se,U.darkMetal);Xe.scale.set(.14,_t-ze+.35,.14),Xe.position.set(oe===0?B+be:B,(ze+_t)/2,oe===0?W:W+be),q.add(Xe)}}for(const B of[-30,30]){const W=new z(se,U.darkMetal);W.scale.set(80,.34,.34),W.position.set(0,ze,B),q.add(W);const ce=new z(se,U.darkMetal);ce.scale.set(80,.22,.22),ce.position.set(0,_t,B),q.add(ce);for(let oe=-36;oe<=36;oe+=6){const be=new z(se,U.darkMetal);be.scale.set(.1,_t-ze,.1),be.position.set(oe,(ze+_t)/2,B),q.add(be)}}for(const[B,W]of[[-30,-29],[-10,-29],[10,-29],[30,-29],[-30,29],[30,29],[-29,-8],[-29,10],[29,-8],[29,10]]){const ce=new z(new ft(.42,.62,.5,8),U.darkMetal);ce.position.set(B,8.55,W),q.add(ce);const oe=new z(new gn(.38,16),Se);oe.rotation.x=Math.PI/2,oe.position.set(B,8.28,W),q.add(oe);const be=new Wt(new zt({map:Tt(64),color:16758122,transparent:!0,opacity:.5,blending:We,depthWrite:!1,toneMapped:!1}));be.position.set(B,8.24,W),be.scale.set(2.4,2.4,1),q.add(be);const Xe=new z(new ft(.025,.025,.9,4),U.darkMetal);Xe.position.set(B,9.1,W),q.add(Xe)}s.add(q);const Ge=Ss(17,8.5,"SECTOR 09","ORBITAL FOUNDRY // RESTRICTED","#42e8ff");Ge.position.set(-19,4.8,-43.62),s.add(Ge);const ot=Ss(13,6.5,"HELIX","DEFENSE GRID ONLINE","#ff9c45");ot.position.set(21,4.5,-43.62),s.add(ot);const ht=Ss(12,6,"NO SIGNAL","AUTONOMOUS DEFENSE PROTOCOL","#ff49bd");ht.position.set(-43.62,4.6,-12),ht.rotation.y=Math.PI/2,s.add(ht);const Je=Ss(10,5,"HELIX","CORE INTEGRITY 97.4%","#ff9c45");Je.position.set(43.62,4.2,9),Je.rotation.y=-Math.PI/2,s.add(Je);const Bt=Ss(13,6.5,"LAST STAND","ALL UNITS LOST // HOLD THE LINE","#42e8ff");Bt.position.set(7,4.5,43.62),Bt.rotation.y=Math.PI,s.add(Bt);const Oe=new Dt;Oe.position.set(0,0,0);const Kt=new z(new ft(3.1,3.5,.34,8),U.darkMetal);Kt.position.y=.17,Kt.receiveShadow=!0,Oe.add(Kt);const yt=new z(new ft(2.7,3.05,.18,8),U.metal);yt.position.y=.42,Oe.add(yt);const yi=new z(new An(3.55,3.72,64),U.orange);yi.rotation.x=-Math.PI/2,yi.position.y=.032,Oe.add(yi);const Ut=new z(new An(4.15,4.19,64),U.cyanDim);Ut.rotation.x=-Math.PI/2,Ut.position.y=.03,Oe.add(Ut);const oi=new z(new ft(.36,.58,4.8,8),U.darkMetal);oi.position.y=2.9,oi.castShadow=!0,Oe.add(oi);const li=new z(new ft(.55,.38,2.4,8,1,!0),new Ue({color:16748351,transparent:!0,opacity:.11,blending:We,depthWrite:!1,side:ni,toneMapped:!1}));li.position.y=3,Oe.add(li);const Xt=new Wt(new zt({map:Tt(128),color:16747318,transparent:!0,opacity:.16,blending:We,depthWrite:!1,toneMapped:!1}));Xt.scale.set(3.1,3.1,1),Xt.position.y=3,Oe.add(Xt);const F=new z(new qt(2.45,.032,6,80),U.orange);F.rotation.x=Math.PI/2,F.position.y=3.4,Oe.add(F);const jt=new z(new qt(1.9,.026,6,72),U.cyan);jt.position.y=3.4,Oe.add(jt);const mt=new z(new An(6.1,6.14,80),U.red);mt.rotation.x=-Math.PI/2,mt.position.y=.035,Oe.add(mt);const gt=new z(new ft(.92,1.18,2.6,8,1,!0),U.darkMetal);gt.position.y=2.2,gt.castShadow=!0,Oe.add(gt);const ve=new z(new ft(1.24,.92,.26,8),U.metal);ve.position.y=3.5,Oe.add(ve);const vt=new z(new ft(.16,.09,5,12),new Ue({color:16760954,transparent:!0,opacity:.24,blending:We,depthWrite:!1,toneMapped:!1}));vt.position.y=3.7,vt.renderOrder=1,Oe.add(vt);const Be=new z(new ft(.74,.86,3.5,16,1,!0),new ii({color:793895,metalness:.92,roughness:.14,transparent:!0,opacity:.32,side:ni,envMapIntensity:1.5}));Be.position.y=3.3,Oe.add(Be);const ke=new z(new ft(.11,.065,3.1,10),new Ue({color:16769720,transparent:!0,opacity:.85,blending:We,depthWrite:!1,toneMapped:!1}));ke.position.y=3.4,ke.renderOrder=2,Oe.add(ke);const A=new Wt(new zt({map:Tt(64),color:16767392,transparent:!0,opacity:.55,blending:We,depthWrite:!1,toneMapped:!1}));A.position.y=5,A.scale.set(1.5,1.5,1),Oe.add(A);const x=new z(new Si(.6,20,14),new Ue({color:16771012,transparent:!0,opacity:.78,blending:We,depthWrite:!1,toneMapped:!1}));x.position.y=5.1,x.renderOrder=3,Oe.add(x);const G=new Wt(new zt({map:Tt(128),color:16760954,transparent:!0,opacity:.34,blending:We,depthWrite:!1,toneMapped:!1}));G.position.y=5.1,G.scale.set(3.4,3.4,1),Oe.add(G);for(const B of[1.8,2.85,3.9]){const W=new z(new qt(.8,.045,6,40),U.metal);W.rotation.x=Math.PI/2,W.position.y=B,Oe.add(W)}for(let B=0;B<4;B++){const W=B/4*wt+Math.PI/4,ce=new z(new Ie(.022,3.1,.022),U.cyanDim);ce.position.set(Math.cos(W)*.79,3.3,Math.sin(W)*.79),Oe.add(ce)}for(let B=0;B<4;B++){const W=B/4*wt+Math.PI/4,ce=new z(new Ie(.2,4.2,.72),U.metal);ce.position.set(Math.cos(W)*1.5,2.05,Math.sin(W)*1.5),ce.rotation.y=-W,ce.rotation.z=.1,ce.castShadow=!0,Oe.add(ce);const oe=new z(new Ie(.05,3.9,.5),U.metal);oe.position.set(Math.cos(W)*1.62,2.1,Math.sin(W)*1.62),oe.rotation.y=-W,oe.rotation.z=.1,Oe.add(oe);for(const be of[.7,1.55,2.4,3.25]){const Xe=new z(new Ie(.06,.3,.54),U.orangeDim);Xe.position.set(Math.cos(W)*1.67,be,Math.sin(W)*1.67),Xe.rotation.y=-W,Xe.rotation.z=.1,Oe.add(Xe)}}for(const[B,W]of[[.95,1.5],[1.35,1.42],[1.75,1.34]]){const ce=new z(new qt(W,.045,6,48),U.orangeDim);ce.rotation.x=Math.PI/2,ce.position.y=B,Oe.add(ce)}const re=new z(new qt(2.15,.03,6,72),new Ue({color:4182246,toneMapped:!1}));re.rotation.set(.32,0,.18),re.position.y=4.35,Oe.add(re);const te=new z(new qt(1.72,.025,6,64),new Ue({color:16742958,toneMapped:!1}));te.rotation.set(-.42,.4,0),te.position.y=4.35,Oe.add(te);const ue=new z(new _n(.72,1.1,8,1,!0),U.darkMetal);ue.position.y=5.25,Oe.add(ue);const fe=new Wt(new zt({map:Tt(96),color:16760950,transparent:!0,opacity:.36,blending:We,depthWrite:!1,toneMapped:!1}));fe.position.y=5.75,fe.scale.set(1.9,1.9,1),Oe.add(fe);const J=new z(new _n(2.6,7.5,16,1,!0),new Ue({color:16751949,transparent:!0,opacity:.012,side:ni,blending:We,depthWrite:!1,toneMapped:!1}));J.position.y=9.3,Oe.add(J);const Q=new Dt;for(let B=0;B<12;B++){const W=B/12*wt,ce=new z(new Ie(.62,.012,.1),U.orangeDim);ce.position.set(Math.cos(W)*5.15,.04,Math.sin(W)*5.15),ce.rotation.y=-W,Q.add(ce)}Oe.add(Q);const pe=new Dt;for(let B=0;B<24;B++){const W=B/24*wt,ce=B%3===0?U.orangeDim:U.cyanDim,oe=new z(new Ie(.8,.01,.07),ce);oe.position.set(Math.cos(W)*9.6,.038,Math.sin(W)*9.6),oe.rotation.y=-W,pe.add(oe)}Oe.add(pe);const C=new z(new gn(9.2,56),new Ue({map:Tt(256),color:16747066,transparent:!0,opacity:.14,blending:We,depthWrite:!1,toneMapped:!1}));C.rotation.x=-Math.PI/2,C.position.y=.024,Oe.add(C),s.add(Oe),H(0,0,6.4,6.4,5),Oe.traverse(B=>{B.isMesh&&B!==Xt&&O.push(B)}),I.push((B,W)=>{F.rotation.z+=B*.25,jt.rotation.z-=B*.4,jt.rotation.x+=B*.18,re.rotation.z+=B*.42,te.rotation.x-=B*.5,te.rotation.y+=B*.22,Q.rotation.y+=B*.14,li.scale.setScalar(1+Math.sin(W*2.1)*.035),Xt.material.opacity=.15+Math.sin(W*2.1)*.035,Xt.scale.setScalar(3.1+Math.sin(W*1.4)*.15),vt.material.opacity=.2+Math.sin(W*2.6)*.06,vt.scale.x=1+Math.sin(W*3.4)*.08,vt.scale.z=vt.scale.x,ke.material.opacity=.72+Math.sin(W*4.1)*.12,ke.scale.x=1+Math.sin(W*5.2)*.12,ke.scale.z=ke.scale.x,A.material.opacity=.46+Math.sin(W*3.3)*.1,A.scale.setScalar(1.45+Math.sin(W*2.1)*.16),x.material.opacity=.66+Math.sin(W*3.8)*.14,x.scale.setScalar(1+Math.sin(W*2.7)*.1),G.material.opacity=.28+Math.sin(W*2.4)*.09,G.scale.setScalar(3.3+Math.sin(W*1.9)*.35),fe.material.opacity=.3+Math.sin(W*2.2)*.08,J.material.opacity=.009+Math.sin(W*1.3)*.004});function ee(B,W,ce,oe,be,Xe=0,lt="cyan"){const Ze=new Dt;Ze.position.set(B,0,W),Ze.rotation.y=Xe;const Pt=new z(new Ie(ce,oe,be),U.darkMetal);Pt.position.y=oe/2,Pt.castShadow=!0,Pt.receiveShadow=!0,Ze.add(Pt);const Ft=new z(new Ie(ce+.06,.1,be+.06),U.metal);Ft.position.y=oe,Ft.castShadow=!0,Ze.add(Ft);const Rt=U.metal;for(const Zt of[-1,1])for(const gi of[-1,1]){const Ii=new z(new Ie(.1,oe,.1),Rt);Ii.position.set(Zt*(ce/2-.04),oe/2,gi*(be/2-.04)),Ze.add(Ii)}const ki=lt==="orange"?U.orange:U.cyan;for(const Zt of[.22,.72]){const gi=new z(new Ie(ce*.72,.035,.02),ki);gi.position.set(0,oe*Zt,be/2+.015),Ze.add(gi)}const ct=Lc(String(Et(12,99)).padStart(2,"0"),"CARGO",lt==="orange"?"#ff9c45":"#42e8ff"),Ot=new z(new ri(ce*.42,ce*.21),new Ue({map:ct,toneMapped:!1}));Ot.position.set(0,oe*.48,be/2+.021),Ze.add(Ot);const Ct=kl(ce*.56,.18,c);return Ct.position.set(0,.08,be/2+.023),Ze.add(Ct),Ze.traverse(Zt=>{Zt.isMesh&&O.push(Zt)}),s.add(Ze),H(B,W,ce,be,oe,Xe),Ze}const K=[[-17,10,3.4,2.6,3,.12,"cyan"],[15,10,3.8,2.2,3,-.08,"orange"],[-23,1,4.2,3,2.8,1.48,"orange"],[23,-2,3.2,3.4,3.2,.34,"cyan"],[-10,-16,4,2.3,2.6,.08,"orange"],[12,-17,3.4,2.7,3.5,-.22,"cyan"],[-29,-15,3.4,2.5,3,.9,"cyan"],[29,16,3.5,2.5,3.1,-.72,"orange"],[4,-30,4.8,2.6,3,.02,"cyan"],[-6,27,4,2.4,2.8,-.16,"orange"]];for(const B of K)ee(...B);function me(B,W,ce,oe=0){const be=new Dt;be.position.set(B,0,W),be.rotation.y=oe;const Xe=new z(new Ie(ce,1.15,.55),U.darkMetal);Xe.position.y=.575,Xe.castShadow=!0,be.add(Xe);const lt=new z(new Ie(ce+.1,.1,.66),U.metal);lt.position.y=1.18,be.add(lt);const Ze=kl(ce*.8,.34,c);Ze.position.set(0,.52,.286),be.add(Ze);const Pt=new z(new Ie(ce*.46,.035,.02),U.cyan);Pt.position.set(0,.94,.288),be.add(Pt);const Ft=new z(new Ie(ce*.9,.08,1.1),U.metal);Ft.position.y=.04,be.add(Ft),be.traverse(Rt=>{Rt.isMesh&&O.push(Rt)}),s.add(be),H(B,W,ce,1.1,1.2,oe)}const de=[[-7,17,4.4,.03],[7.5,17.4,3.6,-.02],[-20,24,4.8,.5],[19,25,4.2,-.4],[-16,-9,3.2,1.1],[17,-7,3.4,.8],[0,34,5.4,0],[-28,7,3,1.5],[28,5,3.2,1.55]];for(const B of de)me(...B);for(const[B,W]of[[-34,-32],[34,-33],[-35,32],[35,33]]){const ce=new Dt;ce.position.set(B,0,W);const oe=new z(new ft(1,1.5,6.8,6),U.darkMetal);oe.position.y=3.4,oe.castShadow=!0,ce.add(oe);const be=new z(new ft(1.16,1.16,.12,6),U.red);be.position.y=5.2,ce.add(be);const Xe=new z(new ft(1.3,1,.4,6),U.metal);Xe.position.y=6.9,ce.add(Xe);const lt=new z(new Si(.24,10,8),U.red);lt.position.y=7.25,ce.add(lt),ce.traverse(Pt=>{Pt.isMesh&&O.push(Pt)}),s.add(ce),H(B,W,3,3,7);const Ze=new Wt(new zt({map:Tt(64),color:16724804,transparent:!0,opacity:.5,blending:We,depthWrite:!1,toneMapped:!1}));Ze.scale.set(2.4,2.4,1),Ze.position.set(B,7.25,W),s.add(Ze)}const he=[];for(let B=0;B<8;B++){const W=B/8*wt+Math.PI/8;he.push(new P(Math.cos(W)*36,0,Math.sin(W)*36))}for(const B of he){const W=new Dt;W.position.set(B.x,1.65,B.z),W.lookAt(0,1.65,0);const ce=new z(new qt(1.55,.05,8,64),new Ue({color:16727247,transparent:!0,opacity:.2,blending:We,depthWrite:!1,toneMapped:!1}));W.add(ce);const oe=new z(new gn(1.5,40),new Ue({color:10300927,transparent:!0,opacity:.045,side:ni,blending:We,depthWrite:!1,toneMapped:!1}));W.add(oe);const be=new Wt(new zt({map:Tt(96),color:15349960,transparent:!0,opacity:.16,blending:We,depthWrite:!1,toneMapped:!1}));be.scale.set(5,5,1),W.add(be),s.add(W),Y.push({group:W,ring:ce,halo:oe,glow:be,active:0,phase:Z(0,wt)})}function Le(B,W,ce,oe,be,Xe){const lt=new Float32Array(B*3);for(let Rt=0;Rt<B;Rt++){const ki=Z(0,wt),ct=Math.sqrt(Math.random())*oe;lt[Rt*3]=Math.cos(ki)*ct,lt[Rt*3+1]=Z(be[0],be[1]),lt[Rt*3+2]=Math.sin(ki)*ct}const Ze=new Nt;Ze.setAttribute("position",new Mi(lt,3));const Pt=new Ir({color:W,size:ce,map:Tt(64),transparent:!0,opacity:Xe,depthWrite:!1,blending:We,sizeAttenuation:!0,toneMapped:!1}),Ft=new Nr(Ze,Pt);return Ft.frustumCulled=!1,s.add(Ft),Ft}const $e=Le(420,7924479,.09,43,[.4,12],.34),le=Le(180,16749638,.13,28,[.5,7],.42);I.push((B,W)=>{$e.rotation.y+=B*.005,$e.position.y=Math.sin(W*.2)*.3,le.rotation.y-=B*.009,le.position.y=Math.cos(W*.3)*.25});const Ne=new Ue({color:3594480,transparent:!0,opacity:.025,side:ni,blending:We,depthWrite:!1,toneMapped:!1});for(const[B,W,ce]of[[-20,-42,0],[20,-42,0],[-42,14,Math.PI/2],[42,-12,Math.PI/2]]){const oe=new z(new _n(4,14,16,1,!0),Ne);oe.position.set(B,6.8,W),oe.rotation.z=Math.PI,oe.rotation.y=ce,s.add(oe)}for(const B of he){const W=new z(new gn(2.2,40),new Ue({color:13053624,transparent:!0,opacity:.07,blending:We,depthWrite:!1,toneMapped:!1}));W.rotation.x=-Math.PI/2,W.position.set(B.x,.028,B.z),s.add(W)}const Ke=new Ue({color:7141375,toneMapped:!1});for(let B=0;B<16;B++){const W=B/16*wt,ce=new z(new Si(.075,8,6),Ke);ce.position.set(Math.cos(W)*42,6.3,Math.sin(W)*42),s.add(ce);const oe=new Wt(new zt({map:Tt(48),color:5171711,transparent:!0,opacity:.75,blending:We,depthWrite:!1,toneMapped:!1}));oe.position.copy(ce.position),oe.scale.set(1.1,1.1,1),s.add(oe)}const Me=new vc;function dt(B,W,ce=.4){const oe=new P().subVectors(W,B),be=oe.length();return be<.001?!1:(oe.normalize(),Me.set(B,oe),Me.near=.2,Me.far=be-ce,Me.intersectObjects(O,!1).length>0)}function Gt(B){return B.intersectObjects(O,!1)}function zi(B){const W=he[B%he.length],ce=new P(-W.x,0,-W.z).normalize();return{position:new P(W.x+ce.x*2.2,0,W.z+ce.z*2.2),portal:B%he.length}}function Fs(B){const W=Y[B];W&&(W.active=1.4)}function ds(B,W){for(const oe of I)oe(B,W);let ce=0;for(const oe of Y){if(oe.phase+=B*(1.2+ce*.02),oe.ring.rotation.z+=B*.4,oe.active>0){oe.active=Math.max(0,oe.active-B);const be=Mt(oe.active/1.4,0,1);oe.ring.material.opacity=.2+be*.8,oe.halo.material.opacity=.045+be*.2,oe.glow.material.opacity=.16+be*.9,oe.group.scale.setScalar(1+Math.sin((1-be)*Math.PI)*.32)}else oe.ring.material.opacity=.14+Math.sin(oe.phase)*.035,oe.halo.material.opacity=.028+Math.sin(oe.phase*.7)*.01,oe.glow.material.opacity=.12+Math.sin(oe.phase*.9)*.035,oe.group.scale.lerp(new P(1,1,1),.08);ce++}M.rotation.y+=B*.002,E.intensity=175+Math.sin(W*1.7)*10,g.intensity=92+Math.sin(W*.9+1)*12,D.intensity=58+Math.sin(W*3.1)*8}return{colliders:L,portalPositions:he,spawnPoint:zi,activatePortal:Fs,isBlocked:dt,raycast:Gt,hitMeshes:O,update:ds,materials:U,portalCount:Y.length}}const bi=1e3;class w0{constructor(e){this.geometry=new Nt,this.positions=new Float32Array(bi*3),this.colors=new Float32Array(bi*3),this.sizes=new Float32Array(bi),this.alphas=new Float32Array(bi),this.geometry.setAttribute("position",new Mi(this.positions,3)),this.geometry.setAttribute("color",new Mi(this.colors,3)),this.geometry.setAttribute("aSize",new Mi(this.sizes,1)),this.geometry.setAttribute("aAlpha",new Mi(this.alphas,1)),this.material=new fi({uniforms:{uMap:{value:Tt(64)}},vertexShader:`
        attribute float aSize;
        attribute float aAlpha;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = color;
          vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (330.0 / max(0.1, -mv.z));
          gl_Position = projectionMatrix * mv;
        }
      `,fragmentShader:`
        uniform sampler2D uMap;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec4 tex = texture2D(uMap, gl_PointCoord);
          gl_FragColor = vec4(vColor, 1.0) * tex * vAlpha;
        }
      `,transparent:!0,depthWrite:!1,blending:We}),this.points=new Nr(this.geometry,this.material),this.points.frustumCulled=!1,e.add(this.points),this.velocities=new Float32Array(bi*3),this.baseColors=new Float32Array(bi*3),this.life=new Float32Array(bi),this.maxLife=new Float32Array(bi),this.baseSize=new Float32Array(bi),this.gravity=new Float32Array(bi),this.drag=new Float32Array(bi),this.cursor=0,this.active=0}emit(e,t,i={}){const n=this.cursor;this.cursor=(this.cursor+1)%bi;const{velocity:r=new P,size:a=.12,life:o=.6,gravity:l=0,drag:c=1.8}=i;this.positions[n*3]=e.x,this.positions[n*3+1]=e.y,this.positions[n*3+2]=e.z,this.velocities[n*3]=r.x,this.velocities[n*3+1]=r.y,this.velocities[n*3+2]=r.z,this.baseColors[n*3]=t.r,this.baseColors[n*3+1]=t.g,this.baseColors[n*3+2]=t.b,this.colors[n*3]=t.r,this.colors[n*3+1]=t.g,this.colors[n*3+2]=t.b,this.baseSize[n]=a,this.sizes[n]=a,this.alphas[n]=1,this.life[n]=o,this.maxLife[n]=o,this.gravity[n]=l,this.drag[n]=c,this.active=Math.min(bi,this.active+1),this.geometry.attributes.position.needsUpdate=!0,this.geometry.attributes.color.needsUpdate=!0,this.geometry.attributes.aSize.needsUpdate=!0,this.geometry.attributes.aAlpha.needsUpdate=!0}update(e){for(let t=0;t<bi;t++){if(this.life[t]<=0){this.alphas[t]=0;continue}this.life[t]-=e;const i=Math.max(0,this.life[t]/this.maxLife[t]);if(this.life[t]<=0){this.alphas[t]=0;continue}const n=Math.exp(-this.drag[t]*e);this.velocities[t*3]*=n,this.velocities[t*3+1]*=n,this.velocities[t*3+2]*=n,this.velocities[t*3+1]-=this.gravity[t]*e,this.positions[t*3]+=this.velocities[t*3]*e,this.positions[t*3+1]+=this.velocities[t*3+1]*e,this.positions[t*3+2]+=this.velocities[t*3+2]*e,this.positions[t*3+1]<.03&&this.gravity[t]>0&&(this.positions[t*3+1]=.03,this.velocities[t*3+1]*=-.3,this.velocities[t*3]*=.7,this.velocities[t*3+2]*=.7);const r=i*i;this.alphas[t]=r,this.colors[t*3]=this.baseColors[t*3]*(.4+i*.6),this.colors[t*3+1]=this.baseColors[t*3+1]*(.4+i*.6),this.colors[t*3+2]=this.baseColors[t*3+2]*(.4+i*.6),this.sizes[t]=this.baseSize[t]*(.7+(1-i)*.8)}this.geometry.attributes.position.needsUpdate=!0,this.geometry.attributes.color.needsUpdate=!0,this.geometry.attributes.aSize.needsUpdate=!0,this.geometry.attributes.aAlpha.needsUpdate=!0}}function E0(){const s=document.createElement("canvas");s.width=s.height=128;const e=s.getContext("2d"),t=e.createRadialGradient(64,64,2,64,64,62);t.addColorStop(0,"rgba(255,230,180,0.8)"),t.addColorStop(.12,"rgba(255,110,35,0.55)"),t.addColorStop(.34,"rgba(70,30,15,0.25)"),t.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=t,e.fillRect(0,0,128,128);for(let n=0;n<16;n++){e.strokeStyle=`rgba(255,${Math.floor(Z(60,140))},30,${Z(.1,.4)})`,e.lineWidth=Z(.5,1.4),e.beginPath();const r=Z(0,wt),a=Z(4,16),o=Z(20,55);e.moveTo(64+Math.cos(r)*a,64+Math.sin(r)*a),e.lineTo(64+Math.cos(r)*o,64+Math.sin(r)*o),e.stroke()}const i=new ls(s);return i.colorSpace=ti,i}class T0{constructor(e){this.scene=e,this.particles=new w0(e),this.scorchTexture=E0(),this.tracerPool=[],this.tracerGeo=new ft(1,1,1,5,1,!0);for(let i=0;i<18;i++){const n=new z(this.tracerGeo,new Ue({color:10353663,transparent:!0,opacity:0,blending:We,depthWrite:!1,toneMapped:!1}));n.visible=!1,n.frustumCulled=!1,e.add(n),this.tracerPool.push({mesh:n,life:0,maxLife:.1})}this.tracerCursor=0,this.flashPool=[];for(let i=0;i<22;i++){const n=new Wt(new zt({map:Tt(96),color:16777215,transparent:!0,opacity:0,blending:We,depthWrite:!1,toneMapped:!1}));n.visible=!1,n.frustumCulled=!1,e.add(n),this.flashPool.push({sprite:n,life:0,maxLife:.25,size:1})}this.flashCursor=0,this.decalPool=[];const t=new ri(1,1);for(let i=0;i<28;i++){const n=new z(t,new Ue({map:this.scorchTexture,transparent:!0,opacity:0,blending:We,depthWrite:!1,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-1}));n.visible=!1,e.add(n),this.decalPool.push({mesh:n,life:0,maxLife:14})}this.decalCursor=0}spark(e,t,i=16760938,n=12,r=4.2,a=.075){const o=new Fe(i);for(let l=0;l<n;l++){const c=new P(Z(-1,1),Z(-1,1),Z(-1,1)).normalize();t&&c.add(t.clone().multiplyScalar(Z(.3,1.15))).normalize(),c.multiplyScalar(Z(r*.22,r)),this.particles.emit(e,o,{velocity:c,size:Z(a*.6,a*1.5),life:Z(.2,.65),gravity:8.5,drag:2.2})}}impact(e,t=new P(0,1,0)){this.spark(e,t,16761962,10,3.6,.06);const i=this.flashPool[this.flashCursor++%this.flashPool.length];i.life=i.maxLife=.13,i.size=.7,i.sprite.material.color.setHex(16752973),i.sprite.position.copy(e).addScaledVector(t,.1),i.sprite.scale.setScalar(.7),i.sprite.visible=!0;const n=this.decalPool[this.decalCursor++%this.decalPool.length];n.life=n.maxLife,n.mesh.position.copy(e).addScaledVector(t,.012),n.mesh.lookAt(e.clone().add(t)),n.mesh.scale.setScalar(Z(.17,.29)),n.mesh.material.opacity=.65,n.mesh.visible=!0}enemyHit(e,t=!1){this.spark(e,null,t?16765291:5699071,t?20:10,t?5.5:3.8,t?.085:.06);const i=this.flashPool[this.flashCursor++%this.flashPool.length];i.life=i.maxLife=.12,i.size=.9,i.sprite.material.color.setHex(t?16751164:4713215),i.sprite.position.copy(e),i.sprite.scale.setScalar(t?1.4:.9),i.sprite.visible=!0}muzzle(e,t){const i=this.flashPool[this.flashCursor++%this.flashPool.length];i.life=i.maxLife=.06,i.size=1,i.sprite.material.color.setHex(16769184),i.sprite.position.copy(e).addScaledVector(t,.1),i.sprite.scale.setScalar(.75),i.sprite.visible=!0;for(let n=0;n<3;n++){const r=t.clone().multiplyScalar(Z(3,8));r.x+=Z(-.7,.7),r.y+=Z(-.7,.7),r.z+=Z(-.7,.7),this.particles.emit(e,new Fe(16763001),{velocity:r,size:Z(.05,.1),life:Z(.05,.16),gravity:2,drag:4})}}tracer(e,t,i=9304575){const n=this.tracerPool[this.tracerCursor++%this.tracerPool.length],r=new P().subVectors(t,e),a=r.length();if(a<.001)return;r.normalize();const o=n.mesh;o.position.copy(e).addScaledVector(r,a/2),o.quaternion.setFromUnitVectors(new P(0,1,0),r),o.scale.set(.008,a,.008),o.material.color.setHex(i),o.material.opacity=.66,o.visible=!0,n.life=n.maxLife=.095;const l=this.flashPool[this.flashCursor++%this.flashPool.length];l.life=l.maxLife=.08,l.sprite.material.color.setHex(i),l.sprite.position.copy(e),l.sprite.scale.setScalar(.55),l.sprite.visible=!0}explosion(e,t=6090751,i=!1){const n=new Fe(t),r=i?70:38;for(let o=0;o<r;o++){const l=new P(Z(-1,1),Z(-.4,1.4),Z(-1,1)).normalize(),c=Z(i?2:1.2,i?11:7);this.particles.emit(e,n,{velocity:l.multiplyScalar(c),size:Z(.08,i?.34:.23),life:Z(.35,i?1.3:.9),gravity:Z(1,7),drag:1.35})}for(let o=0;o<(i?26:12);o++){const l=new P(Z(-1,1),Z(-.3,1.2),Z(-1,1)).normalize();this.particles.emit(e,new Fe(16756830),{velocity:l.multiplyScalar(Z(4,i?16:9)),size:Z(.04,.17),life:Z(.25,.7),gravity:9,drag:.8})}const a=this.flashPool[this.flashCursor++%this.flashPool.length];a.life=a.maxLife=i?.42:.28,a.sprite.material.color.setHex(t),a.sprite.position.copy(e),a.sprite.scale.setScalar(i?7:3.8),a.sprite.visible=!0,this.spark(e,null,16759913,i?30:16,i?13:8,.1)}portalBurst(e,t=16729812){const i=new Fe(t);for(let n=0;n<26;n++){const r=Z(0,wt),a=Z(.5,1.7),o=new P(e.x+Math.cos(r)*a,Z(.3,3),e.z+Math.sin(r)*a);this.particles.emit(o,i,{velocity:new P(-Math.cos(r)*Z(1,3),Z(-.4,2),-Math.sin(r)*Z(1,3)),size:Z(.06,.18),life:Z(.4,1),gravity:-.2,drag:1.1})}}heal(e){for(let t=0;t<28;t++){const i=Z(0,wt);this.particles.emit(e,new Fe(5963732),{velocity:new P(Math.cos(i)*Z(.5,2.2),Z(1,4.5),Math.sin(i)*Z(.5,2.2)),size:Z(.05,.14),life:Z(.4,.9),gravity:-1.4,drag:1.8})}}update(e){this.particles.update(e);for(const t of this.tracerPool)t.life>0&&(t.life-=e,t.mesh.material.opacity=Math.max(0,t.life/t.maxLife*.66),t.life<=0&&(t.mesh.visible=!1));for(const t of this.flashPool)if(t.life>0){t.life-=e;const i=Math.max(0,t.life/t.maxLife);t.sprite.material.opacity=i,t.sprite.scale.setScalar(t.size*(.6+(1-i)*1.3)),t.life<=0&&(t.sprite.visible=!1)}for(const t of this.decalPool)t.life>0&&(t.life-=e,t.mesh.material.opacity=Math.min(.65,Math.max(0,t.life/t.maxLife)*1.5),t.life<=0&&(t.mesh.visible=!1))}}class A0{constructor(){this.ctx=null,this.master=null,this.enabled=!0,this.noiseBuffer=null,this.ambient=null,this.started=!1}init(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const e=window.AudioContext||window.webkitAudioContext;if(!e)return;this.ctx=new e,this.master=this.ctx.createGain(),this.master.gain.value=this.enabled?.62:0;const t=this.ctx.createDynamicsCompressor();t.threshold.value=-16,t.knee.value=22,t.ratio.value=5,t.attack.value=.002,t.release.value=.22,this.master.connect(t),t.connect(this.ctx.destination),this.noiseBuffer=this.createNoiseBuffer(1.2),this.startAmbient()}createNoiseBuffer(e=1){const t=Math.max(1,Math.floor(this.ctx.sampleRate*e)),i=this.ctx.createBuffer(1,t,this.ctx.sampleRate),n=i.getChannelData(0);let r=0;for(let a=0;a<t;a++){const o=Math.random()*2-1;r=(r+.02*o)/1.02,n[a]=r*3.5}return i}get now(){return this.ctx?this.ctx.currentTime:0}setEnabled(e){this.enabled=e,this.master&&this.ctx&&(this.master.gain.cancelScheduledValues(this.ctx.currentTime),this.master.gain.linearRampToValueAtTime(e?.62:0,this.ctx.currentTime+.08))}toggle(){return this.setEnabled(!this.enabled),this.enabled}startAmbient(){if(!this.ctx||this.started)return;this.started=!0;const e=this.ctx,t=e.createGain();t.gain.value=0,t.connect(this.master),t.gain.linearRampToValueAtTime(.55,e.currentTime+4),this.ambient=t;const i=e.createOscillator(),n=e.createOscillator(),r=e.createOscillator();i.type="sine",n.type="triangle",r.type="sine",i.frequency.value=43.65,n.frequency.value=65.4,r.frequency.value=87.3;const a=e.createGain();a.gain.value=.035;const o=e.createGain();o.gain.value=.008;const l=e.createGain();l.gain.value=.005;const c=e.createBiquadFilter();c.type="lowpass",c.frequency.value=220,c.Q.value=2,i.connect(a),n.connect(o),r.connect(l),a.connect(c),o.connect(c),l.connect(c),c.connect(t),i.start(),n.start(),r.start();const d=e.createBufferSource();d.buffer=this.noiseBuffer,d.loop=!0;const u=e.createBiquadFilter();u.type="bandpass",u.frequency.value=380,u.Q.value=.55;const h=e.createGain();h.gain.value=.018,d.connect(u),u.connect(h),h.connect(t),d.start();const p=e.createOscillator(),_=e.createGain();p.frequency.value=.075,_.gain.value=.013,p.connect(_),_.connect(a.gain),p.start(),this.drones=[i,n,r,p,d]}makeNoise(e=.2,t=.1,i="lowpass",n=1e3,r=.8,a=0){if(!this.ctx)return;const o=this.now+a,l=this.ctx.createBufferSource();l.buffer=this.noiseBuffer;const c=this.ctx.createBiquadFilter();c.type=i,c.frequency.setValueAtTime(n,o),c.Q.value=r;const d=this.ctx.createGain();d.gain.setValueAtTime(t,o),d.gain.exponentialRampToValueAtTime(1e-4,o+e),l.connect(c),c.connect(d),d.connect(this.master),l.start(o),l.stop(o+e+.02)}tone(e,t,i,n=.07,r="sine",a=0){if(!this.ctx)return;const o=this.now+a,l=this.ctx.createOscillator(),c=this.ctx.createGain();l.type=r,l.frequency.setValueAtTime(e,o),l.frequency.exponentialRampToValueAtTime(Math.max(20,t),o+i),c.gain.setValueAtTime(1e-4,o),c.gain.exponentialRampToValueAtTime(n,o+.006),c.gain.exponentialRampToValueAtTime(1e-4,o+i),l.connect(c),c.connect(this.master),l.start(o),l.stop(o+i+.02)}shoot(){this.makeNoise(.085,.17,"bandpass",1150,.7),this.makeNoise(.16,.09,"lowpass",340,.8),this.tone(180,55,.1,.06,"square"),this.tone(880,240,.035,.02,"sawtooth")}enemyShoot(e=1){const t=Math.max(.25,Math.min(1,e));this.tone(820,180,.24,.042*t,"sine"),this.tone(430,110,.3,.022*t,"triangle")}hit(e=!1){this.tone(e?1420:980,e?760:620,.045,.032,"square"),this.makeNoise(.035,.025,"highpass",2600)}kill(e=!1){this.makeNoise(e?.65:.42,e?.24:.17,"lowpass",e?320:550,.9),this.tone(e?92:130,34,e?.55:.37,e?.16:.11,"sine"),this.tone(420,95,.22,.04,"sawtooth")}reload(){this.makeNoise(.05,.055,"highpass",2300),this.tone(320,280,.04,.028,"square",.05),this.makeNoise(.07,.06,"bandpass",1600,1.5,.62),this.tone(520,470,.05,.025,"square",.72)}empty(){this.tone(1180,900,.035,.025,"square"),this.makeNoise(.02,.035,"highpass",1800)}hurt(){this.makeNoise(.22,.11,"lowpass",420,1),this.tone(68,42,.28,.1,"sine"),this.tone(240,120,.18,.035,"triangle")}pickup(){this.tone(523,523,.09,.035,"sine"),this.tone(784,784,.09,.03,"sine",.08),this.tone(1046,1046,.16,.028,"sine",.16)}waveStart(e){const t=180+Math.min(e,8)*14;this.tone(t,t,.24,.06,"sawtooth"),this.tone(t*1.5,t*1.5,.32,.04,"triangle",.18),this.makeNoise(.5,.055,"bandpass",500,.8,.05)}waveClear(){this.tone(392,392,.18,.045,"sine"),this.tone(523,523,.2,.045,"sine",.14),this.tone(784,784,.4,.05,"sine",.3),this.makeNoise(.3,.035,"highpass",2400,.5,.3)}gameOver(){this.tone(220,55,1.8,.12,"sawtooth"),this.tone(110,28,2.4,.1,"sine"),this.makeNoise(1.4,.1,"lowpass",220,.7)}step(){this.makeNoise(.055,.022,"bandpass",260+Math.random()*120,1.2)}ui(){this.tone(900,1120,.04,.018,"sine")}portal(){this.tone(160,720,.3,.025,"sine"),this.tone(240,1080,.25,.018,"triangle")}dispose(){if(this.drones)for(const e of this.drones)try{e.stop()}catch{}this.ctx&&this.ctx.close()}}const je=s=>document.querySelector(s);class R0{constructor(){this.root=je("#hud"),this.menu=je("#menu"),this.pauseMenu=je("#pause-menu"),this.gameover=je("#gameover"),this.radarCanvas=je("#radar"),this.radarCtx=this.radarCanvas.getContext("2d"),this.scoreEl=je("#score"),this.waveEl=je("#wave-num"),this.wavePips=je("#wave-pips"),this.waveProgress=je("#wave-progress-fill"),this.healthEl=je("#health-num"),this.healthFill=je("#health-fill"),this.shieldFill=je("#shield-fill"),this.ammoEl=je("#ammo-num"),this.ammoFill=je("#ammo-fill"),this.weaponLabel=je("#weapon-label"),this.ammoPanel=document.querySelector(".ammo-panel"),this.reloadHint=je("#reload-hint"),this.reticle=je("#reticle"),this.hitmarker=document.querySelector(".hitmarker"),this.vitals=document.querySelector(".vitals"),this.damageVignette=je("#damage-vignette"),this.damageArc=je("#damage-arc"),this.toastEl=je("#toast"),this.toastKicker=je("#toast-kicker"),this.toastText=je("#toast-text"),this.toastSub=je("#toast-sub"),this.comboEl=je("#combo"),this.comboMult=je("#combo-mult"),this.bestInline=je("#best-inline"),this.pickupPrompt=je("#pickup-prompt"),this.killfeedEl=je("#killfeed"),this.pauseBtn=je("#pause-btn"),this.lastScore=-1,this.lastWave=-1,this.lastHealth=-1,this.lastShield=-1,this.lastAmmo=-1,this.best=Number(localStorage.getItem("helix-best")||0),this.bestInline.textContent=`BEST ${Kn(this.best)}`,this.radarClock=0,this.toastTimer=0,this.comboTimer=0,this.pickupTimer=0,this.damageNumberId=0,this.buildWavePips()}buildWavePips(){this.wavePips.innerHTML="",this.pips=[];for(let e=0;e<5;e++){const t=document.createElement("b");this.wavePips.appendChild(t),this.pips.push(t)}}showHud(){this.root.classList.remove("is-hidden")}hideHud(){this.root.classList.add("is-hidden")}showMenu(){this.menu.classList.remove("leaving","is-hidden"),this.hideHud(),this.pauseMenu.classList.add("is-hidden"),this.gameover.classList.add("is-hidden")}hideMenu(){this.menu.classList.add("leaving"),this.showHud()}setSoundMuted(e){const t=je("#sound-btn");t&&t.classList.toggle("muted",e)}setWave(e){e!==this.lastWave&&(this.lastWave=e,this.waveEl.textContent=Jn(e),this.pips.forEach((t,i)=>t.classList.toggle("on",i<Math.min(5,e))))}setWaveProgress(e){this.waveProgress.style.width=`${Mt(e,0,1)*100}%`}setScore(e){e!==this.lastScore&&(this.lastScore=e,this.scoreEl.textContent=Kn(e))}setBest(e){e>this.best&&(this.best=e,localStorage.setItem("helix-best",String(e))),this.bestInline.textContent=`BEST ${Kn(this.best)}`}update(e,t){const i=Math.round(e.health);i!==this.lastHealth&&(this.lastHealth=i,this.healthEl.textContent=i,this.healthFill.style.width=`${Mt(i/e.maxHealth,0,1)*100}%`,this.vitals.classList.toggle("low",i<=35));const n=Math.round(e.shield);n!==this.lastShield&&(this.lastShield=n,this.shieldFill.style.width=`${Mt(n/e.maxShield,0,1)*100}%`);const r=t.mag;(r!==this.lastAmmo||t.reloading!==this.lastReloading)&&(this.lastAmmo=r,this.lastReloading=t.reloading,this.ammoEl.textContent=t.reloading?"--":Jn(r),this.ammoFill.style.width=`${Mt(r/t.magSize,0,1)*100}%`,this.ammoPanel.classList.toggle("empty",r===0&&!t.reloading),this.reloadHint.textContent=t.reloading?"RELOADING…":"R · RELOAD"),this.reticle.classList.toggle("ads",t.adsK>.55)}updateRadar(e,t,i,n=[]){if(this.radarClock+=i,this.radarClock<.055)return;this.radarClock=0;const r=this.radarCtx,a=this.radarCanvas.width,o=a/2;r.clearRect(0,0,a,a),r.save(),r.translate(o,o),r.strokeStyle="rgba(75,205,228,0.13)",r.lineWidth=1;for(const M of[36,72,100])r.beginPath(),r.arc(0,0,M,0,Math.PI*2),r.stroke();r.strokeStyle="rgba(75,205,228,0.1)",r.beginPath(),r.moveTo(-102,0),r.lineTo(102,0),r.moveTo(0,-102),r.lineTo(0,102),r.stroke(),r.fillStyle="rgba(69,232,255,0.055)",r.beginPath(),r.moveTo(0,0),r.arc(0,0,100,-Math.PI/2-.72,-Math.PI/2+.72),r.closePath(),r.fill(),this.radarClock*20;const l=performance.now()*7e-4%(Math.PI*2),c=r.createLinearGradient(0,0,Math.cos(l)*100,Math.sin(l)*100);c.addColorStop(0,"rgba(93,245,255,0.35)"),c.addColorStop(1,"rgba(93,245,255,0)"),r.strokeStyle=c,r.beginPath(),r.moveTo(0,0),r.lineTo(Math.cos(l)*99,Math.sin(l)*99),r.stroke();const d=e.yaw,u=Math.cos(d),h=Math.sin(d),p=100/42,_=[];for(const M of t){if(M.dead)continue;const m=M.group.position.x-e.position.x,f=M.group.position.z-e.position.z;if(Math.hypot(m,f)>42)continue;const v=(m*u-f*h)*p,w=-(m*-h-f*u)*p;_.push({x:v,y:w,type:M.kind})}for(const M of n){const m=M.group.position.x-e.position.x,f=M.group.position.z-e.position.z;Math.hypot(m,f)>42||_.push({x:(m*u-f*h)*p,y:-(m*-h-f*u)*p,type:"pickup"})}for(const M of _){const m=Math.hypot(M.x,M.y),f=m>100?100/m:1,v=M.x*f,w=M.y*f;M.type==="pickup"?(r.fillStyle="rgba(75,255,218,0.95)",r.shadowColor="#4bffda",r.shadowBlur=8,r.beginPath(),r.arc(v,w,3,0,Math.PI*2),r.fill()):M.type==="warden"?(r.fillStyle="#ff4fd8",r.shadowColor="#ff4fd8",r.shadowBlur=11,r.fillRect(v-4,w-4,8,8)):(r.fillStyle="#ff3f55",r.shadowColor="#ff3f55",r.shadowBlur=9,r.beginPath(),r.arc(v,w,3.2,0,Math.PI*2),r.fill())}r.shadowBlur=0,r.fillStyle="#7cffff",r.shadowColor="#47f5ff",r.shadowBlur=8,r.beginPath(),r.moveTo(0,-9),r.lineTo(6.5,6),r.lineTo(0,3),r.lineTo(-6.5,6),r.closePath(),r.fill(),r.restore()}setTarget(e){this.reticle.classList.toggle("target",e)}hit(e=!1){this.hitmarker.classList.remove("show","crit"),this.hitmarker.offsetWidth,this.hitmarker.classList.add("show"),e&&this.hitmarker.classList.add("crit")}damage(e,t=null,i=0){this.damageVignette.style.opacity=String(Mt(.35+e*.025,0,.75)),clearTimeout(this.damageTimer),this.damageTimer=setTimeout(()=>{this.damageVignette.style.opacity="0"},180),this.damageArc.classList.remove("flash"),this.damageArc.offsetWidth;let n=0;t&&(n=Math.atan2(t.x,t.z)-i+Math.PI),this.damageArc.style.transform=`translate(-50%, -50%) rotate(${n}rad)`,this.damageArc.classList.add("flash")}damageNumber(e,t,i,n){const r=e.clone().project(n);if(r.z>1||r.z<-1)return;const a=(r.x*.5+.5)*window.innerWidth,o=(-r.y*.5+.5)*window.innerHeight;if(a<0||a>window.innerWidth||o<0||o>window.innerHeight)return;const l=document.createElement("div");l.className=`damage-number${i?" crit":""}`,l.textContent=i?`${t} CRIT`:String(t),l.style.left=`${a}px`,l.style.top=`${o}px`,this.root.appendChild(l),setTimeout(()=>l.remove(),760)}killfeed(e,t){const i=document.createElement("div");for(i.className="kill-row",i.innerHTML=`<b>YOU</b><span class="weapon-ico"></span><em>${t?"CRITICAL":""}</em><span>${e==="warden"?"WARDEN":"WASP"} DRONE</span>`,this.killfeedEl.appendChild(i);this.killfeedEl.children.length>4;)this.killfeedEl.firstElementChild.remove();setTimeout(()=>{i.classList.add("out"),setTimeout(()=>i.remove(),320)},2800)}toast(e,t,i="",n="",r=2200){this.toastKicker.textContent=e,this.toastText.textContent=t,this.toastSub.textContent=i,this.toastEl.className=`toast show ${n}`,clearTimeout(this.toastTimer),this.toastTimer=setTimeout(()=>this.toastEl.classList.remove("show"),r)}combo(e){e<2||(this.comboMult.textContent=`x${e}`,this.comboEl.classList.add("show"),clearTimeout(this.comboTimer),this.comboTimer=setTimeout(()=>this.comboEl.classList.remove("show"),1800))}pickup(){this.pickupPrompt.classList.add("show"),clearTimeout(this.pickupTimer),this.pickupTimer=setTimeout(()=>this.pickupPrompt.classList.remove("show"),1200)}showPause(e){je("#pause-wave").textContent=Jn(e.wave),je("#pause-score").textContent=Kn(e.score),je("#pause-kills").textContent=String(e.kills),this.pauseMenu.classList.remove("is-hidden")}hidePause(){this.pauseMenu.classList.add("is-hidden")}showGameOver(e){je("#dead-wave").textContent=Jn(e.wave),je("#dead-score").textContent=Kn(e.score),je("#dead-kills").textContent=String(e.kills),je("#dead-acc").textContent=`${Math.round(e.accuracy*100)}%`,this.gameover.classList.remove("is-hidden")}hideGameOver(){this.gameover.classList.add("is-hidden")}}class C0{constructor({camera:e,scene:t,effects:i,audio:n,viewAspect:r=1}){this.camera=e,this.scene=t,this.effects=i,this.audio=n,this.magSize=30,this.mag=30,this.reserve=1/0,this.fireTimer=0,this.fireRate=.104,this.reloading=!1,this.reloadTimer=0,this.reloadDuration=1.38,this.autoReloadTimer=-1,this.adsK=0,this.recoil=0,this.recoilVelocity=0,this.reloadK=0,this.shots=0,this.hits=0,this.viewAspect=r,this.baseHip=new P(.36,-.3,-.66),this.baseAds=new P(0,-.14,-.54),this.rig=new Dt,e.add(this.rig),this.build()}build(){const e=new Dt;e.scale.setScalar(.56),this.gun=e,this.rig.add(e);const t=new ii({color:7045006,metalness:.74,roughness:.4,envMapIntensity:1.35,emissive:529180,emissiveIntensity:.55}),i=new ii({color:3819346,metalness:.42,roughness:.62,envMapIntensity:1,emissive:264460,emissiveIntensity:.32}),n=new ii({color:11123910,metalness:1,roughness:.22,envMapIntensity:1.6}),r=new Ue({color:5568511,toneMapped:!1}),a=new Ue({color:16747060,toneMapped:!1}),o=new qh({color:1858936,metalness:0,roughness:.05,transmission:.5,transparent:!0,opacity:.32,envMapIntensity:1.4});this.materials={gunmetal:t,polymer:i,steel:n,accent:r,orange:a,glass:o};const l=new z(new Ie(.15,.17,.72),t);l.position.set(0,0,-.14),e.add(l);const c=new z(new Ie(.13,.075,.67),i);c.position.set(0,.105,-.18),e.add(c);const d=new z(new Ie(.095,.032,.55),n);d.position.set(0,.158,-.19),e.add(d);for(let Se=0;Se<9;Se++){const se=new z(new Ie(.1,.014,.018),i);se.position.set(0,.18,-.42+Se*.055),e.add(se)}for(const Se of[-1,1]){const se=new z(new Ie(.012,.09,.33),i);se.position.set(Se*.081,-.01,-.18),e.add(se);const ze=new z(new Ie(.016,.018,.1),r);ze.position.set(Se*.088,.045,-.24),e.add(ze)}const u=new z(new ft(.061,.072,.42,10),t);u.rotation.x=Math.PI/2,u.position.set(0,.02,-.68),e.add(u);for(let Se=0;Se<4;Se++){const se=new z(new Ie(.08,.014,.045),i);se.position.set(0,.07,-.55-Se*.075),e.add(se)}const h=new z(new ft(.025,.026,.48,10),n);h.rotation.x=Math.PI/2,h.position.set(0,.02,-.95),e.add(h);const p=new z(new ft(.055,.045,.14,8),i);p.rotation.x=Math.PI/2,p.position.set(0,.02,-1.19),e.add(p);for(let Se=0;Se<3;Se++){const se=new z(new qt(.047,.008,5,12),n);se.position.set(0,.02,-1.15-Se*.035),e.add(se)}const _=new z(new gn(.032,12),r);_.position.set(0,.02,-1.263),e.add(_),this.muzzleGlow=_,this.muzzle=new kt,this.muzzle.position.set(0,.02,-1.3),e.add(this.muzzle);const M=new z(new Ie(.11,.15,.28),i);M.position.set(0,-.01,.35),e.add(M);const m=new z(new Ie(.12,.035,.2),t);m.position.set(0,.06,.35),e.add(m);const f=new z(new Ie(.13,.19,.04),i);f.position.set(0,-.01,.5),e.add(f);const v=new z(new Ie(.1,.26,.17),t);v.position.set(0,-.195,-.08),v.rotation.x=.24,e.add(v);const w=new z(new Ie(.105,.018,.12),a);w.position.set(0,-.245,-.055),w.rotation.x=.24,e.add(w),this.magMesh=v;const b=new z(new Ie(.085,.22,.11),i);b.position.set(0,-.16,.12),b.rotation.x=-.28,e.add(b);const E=new z(new qt(.055,.009,5,12,Math.PI*1.2),n);E.position.set(0,-.09,-.01),E.rotation.z=.2,e.add(E);const T=new z(new Ie(.11,.08,.34),i);T.position.set(0,-.075,-.55),e.add(T);const g=new z(new Ie(.07,.02,.3),n);g.position.set(0,-.122,-.55),e.add(g),new z(new Ie(.015,.015,.18),r),T.position.x=0;const y=new z(new Ie(.014,.014,.17),r);y.position.set(-.061,-.06,-.55),e.add(y);const D=new z(new Ie(.065,.035,.16),i);D.position.set(0,.195,-.2),e.add(D);const R=new Ue({color:1522500,toneMapped:!1}),L=new Dt;L.position.set(0,.255,-.22);const O=new z(new Ie(.12,.012,.02),R);O.position.y=.05;const Y=O.clone();Y.position.y=-.045;const I=new z(new Ie(.012,.1,.02),R);I.position.x=-.055;const U=I.clone();U.position.x=.055,L.add(O,Y,I,U);const j=new z(new ri(.095,.08),o);j.position.z=-.003,L.add(j);const H=new z(new gn(.0055,10),new Ue({color:16733501,toneMapped:!1}));H.position.set(0,0,.001),L.add(H);const ae=new Wt(new zt({map:Tt(48),color:16734784,transparent:!0,opacity:.6,blending:We,depthWrite:!1,toneMapped:!1}));ae.scale.setScalar(.035),ae.position.z=.002,L.add(ae),e.add(L),this.sightFrame=L,this.sightDot=H,this.labelCanvas=document.createElement("canvas"),this.labelCanvas.width=256,this.labelCanvas.height=160,this.labelTexture=new ls(this.labelCanvas),this.labelTexture.colorSpace=ti,this.drawAmmoLabel();const $=new z(new ri(.088,.055),new Ue({map:this.labelTexture,transparent:!0,toneMapped:!0}));$.position.set(-.076,-.005,-.1),$.rotation.y=-Math.PI/2,e.add($);const ie=new ii({color:1581611,metalness:.12,roughness:.85,envMapIntensity:.5}),ne=new ii({color:2569020,metalness:.3,roughness:.7}),Ee=new z(new Si(.1,14,10),ie);Ee.scale.set(.72,1.05,.82),Ee.position.set(.005,-.17,.14),Ee.rotation.x=.12,e.add(Ee);for(let Se=0;Se<4;Se++){const se=new z(new Zn(.018,.065,3,6),ne);se.rotation.z=Math.PI/2.1,se.rotation.y=-.2,se.position.set(-.045,-.125-Se*.033,.105+Se*.004),e.add(se)}const He=new z(new Zn(.019,.075,3,6),ne);He.rotation.x=1.2,He.rotation.z=-.5,He.position.set(.045,-.16,.08),e.add(He);const q=new z(new Zn(.055,.42,4,8),ie);q.position.set(.18,-.36,.34),q.rotation.x=1,q.rotation.z=-.55,e.add(q);const ge=new z(new ft(.07,.075,.08,8),ne);ge.position.set(.2,-.31,.26),ge.rotation.x=1,ge.rotation.z=-.55,e.add(ge);const Te=new z(new Si(.09,12,8),ie);Te.scale.set(.9,.6,1.1),Te.position.set(-.01,-.16,-.53),e.add(Te);for(let Se=0;Se<4;Se++){const se=new z(new Zn(.015,.06,3,6),ne);se.rotation.z=Math.PI/2,se.position.set(-.055,-.125+Se*.026,-.57+Se*.016),e.add(se)}this.muzzleLight=new Vi(16757598,0,7,2),this.muzzleLight.position.set(0,.02,-1.25),e.add(this.muzzleLight),this.keyLight=new Vi(12578303,.45,3.2,2),this.keyLight.position.set(.45,.58,.35),this.rig.add(this.keyLight),this.rimLight=new Vi(5234687,.28,2.4,2),this.rimLight.position.set(-.42,-.12,-.42),this.rig.add(this.rimLight),this.warmFill=new Vi(16751445,.18,2.2,2),this.warmFill.position.set(.05,.1,-.95),this.rig.add(this.warmFill),this.flashTimer=0,this.flashSprite=new Wt(new zt({map:Tt(96),color:16765066,transparent:!0,opacity:0,blending:We,depthWrite:!1,toneMapped:!1})),this.flashSprite.position.set(0,.02,-1.33),this.flashSprite.scale.set(.45,.45,1),e.add(this.flashSprite),this.rig.position.copy(this.baseHip),this.rig.rotation.set(.02,-.02,0),this.updateViewAspect(this.viewAspect)}drawAmmoLabel(){const e=this.labelCanvas.getContext("2d");e.clearRect(0,0,256,160),e.fillStyle="#041017",e.fillRect(0,0,256,160),e.strokeStyle="#2b7a88",e.lineWidth=4,e.strokeRect(5,5,246,150),e.fillStyle="#54f7ff",e.font="900 92px Orbitron, sans-serif",e.textAlign="center",e.textBaseline="middle",e.shadowColor="#54f7ff",e.shadowBlur=18,e.fillText(String(this.mag).padStart(2,"0"),128,74),e.shadowBlur=0,e.font="700 20px Rajdhani, sans-serif",e.fillStyle="#7daab2",e.fillText("VK-7  //  PULSE",128,133);for(let t=0;t<15;t++)e.fillStyle=t<Math.ceil(this.mag/2)?"#54f7ff":"#16353d",e.fillRect(18+t*14.8,143,10,3);this.labelTexture.needsUpdate=!0}updateViewAspect(e){this.viewAspect=e;const t=e<1;this.baseHip.x=t?.24:.36,this.baseHip.y=t?-.31:-.3,this.baseHip.z=t?-.7:-.66,this.baseAds.y=t?-.15:-.14}setVisible(e){this.rig.visible=e,this.muzzleLight.intensity=0}startReload(){return this.reloading||this.mag>=this.magSize?!1:(this.reloading=!0,this.reloadTimer=this.reloadDuration,this.autoReloadTimer=-1,this.audio.reload(),!0)}tryShoot(){if(this.reloading||this.fireTimer>0)return!1;if(this.mag<=0)return this.audio.empty(),this.fireTimer=.22,this.startReload(),!1;this.mag--,this.shots++,this.drawAmmoLabel(),this.fireTimer=this.fireRate,this.recoil=Math.min(1.5,this.recoil+.52),this.recoilVelocity+=Z(.01,.02),this.flashTimer=.055,this.flashSprite.material.opacity=1,this.flashSprite.material.rotation=Z(0,Math.PI*2),this.flashSprite.scale.setScalar(Z(.36,.62)),this.muzzleLight.intensity=16;const e=this.muzzle.getWorldPosition(new P);return this.effects.muzzle(e,this.camera.getWorldDirection(new P)),this.audio.shoot(),this.mag<=0&&(this.autoReloadTimer=.22),!0}update(e,{aiming:t=!1,moving:i=0,lookX:n=0,lookY:r=0}={}){this.fireTimer=Math.max(0,this.fireTimer-e),this.autoReloadTimer>0&&(this.autoReloadTimer-=e,this.autoReloadTimer<=0&&this.startReload()),this.adsK=At(this.adsK,t&&!this.reloading?1:0,12,e),this.reloading?(this.reloadTimer-=e,this.reloadK=1-Math.max(0,this.reloadTimer/this.reloadDuration),this.reloadTimer<=0&&(this.mag=this.magSize,this.reloading=!1,this.reloadK=0,this.drawAmmoLabel())):this.reloadK=At(this.reloadK,0,10,e),this.recoil=At(this.recoil,0,13,e),this.recoilVelocity=At(this.recoilVelocity,0,18,e);const a=performance.now()*.001,o=Math.sin(a*.85)*.004,l=Math.cos(a*1.1)*.0035,c=Math.min(1,i)*.012,d=Math.sin(a*8.2)*c,u=Math.abs(Math.cos(a*8.2))*c*.7,h=Mt(-n*.008,-.022,.022),p=Mt(r*.006,-.018,.018),_=this.baseHip.clone().lerp(this.baseAds,this.adsK);_.x+=o+d+h,_.y+=l-u+p,_.z+=this.recoil*.045;const M=Math.sin(this.reloadK*Math.PI);if(_.y-=M*.17,_.z+=M*.05,this.rig.position.x=At(this.rig.position.x,_.x,18,e),this.rig.position.y=At(this.rig.position.y,_.y,18,e),this.rig.position.z=At(this.rig.position.z,_.z,18,e),this.rig.rotation.x=At(this.rig.rotation.x,.02+this.recoil*.055+M*-.65,16,e),this.rig.rotation.y=At(this.rig.rotation.y,-.02+h*.9-this.adsK*.01+M*.35,16,e),this.rig.rotation.z=At(this.rig.rotation.z,M*.55-h*.6,16,e),this.gun.position.z=-this.recoilVelocity*.35,this.sightDot.material.color.setRGB(1,.22+(1-this.adsK)*.15,.18),this.gun.rotation.x=this.adsK*.006,this.flashTimer>0){this.flashTimer-=e;const m=Math.max(0,this.flashTimer/.055);this.flashSprite.material.opacity=m,this.muzzleLight.intensity=m*16,this.muzzleGlow.material.color.setRGB(1,.7+m*.3,.55)}else this.muzzleLight.intensity=0,this.flashSprite.material.opacity=0,this.muzzleGlow.material.color.setHex(5568511)}reset(){this.mag=this.magSize,this.reloading=!1,this.reloadTimer=0,this.fireTimer=0,this.autoReloadTimer=-1,this.recoil=0,this.recoilVelocity=0,this.adsK=0,this.shots=0,this.hits=0,this.drawAmmoLabel()}}class P0{constructor({camera:e,scene:t,world:i,effects:n,audio:r,weapon:a}){this.camera=e,this.scene=t,this.world=i,this.effects=n,this.audio=r,this.weapon=a,this.position=new P(0,0,18),this.velocity=new P,this.yaw=0,this.pitch=-.025,this.radius=.38,this.eyeHeight=1.66,this.health=100,this.maxHealth=100,this.shield=40,this.maxShield=40,this.dead=!1,this.timeSinceDamage=99,this.bobTime=0,this.stepTimer=0,this.shake=0,this.shakeT=0,this.roll=0,this.moveAmount=0,this.lookX=0,this.lookY=0,this.fov=72,this.baseFov=72,this.isTouch=!1,this.onDamage=null,this.onDeath=null,this.onFootstep=null,this.camera.rotation.order="YXZ"}reset(){this.position.set(0,0,18),this.velocity.set(0,0,0),this.yaw=0,this.pitch=-.025,this.health=this.maxHealth,this.shield=this.maxShield,this.dead=!1,this.timeSinceDamage=99,this.bobTime=0,this.shake=0,this.roll=0,this.moveAmount=0,this.weapon.reset(),this.updateCamera(0)}look(e,t,i=.0022){this.dead||(this.yaw-=e*i,this.pitch-=t*i,this.pitch=Mt(this.pitch,-1.35,1.32),this.lookX=Mt(this.lookX+e*.55,-22,22),this.lookY=Mt(this.lookY+t*.55,-18,18))}applyRecoil(e,t){this.pitch=Mt(this.pitch+e,-1.35,1.32),this.yaw+=t,this.shake=Math.min(.11,this.shake+.012)}getShootOrigin(){return new P(this.position.x,this.position.y+this.eyeHeight,this.position.z)}getShootDirection(e=0){const t=new P(0,0,-1);return t.applyEuler(new sn(this.pitch,this.yaw,0,"YXZ")),e>0&&(t.x+=Z(-e,e),t.y+=Z(-e,e),t.z+=Z(-e,e),t.normalize()),t}takeDamage(e,t=null){if(this.dead)return;this.timeSinceDamage=0;let i=e;if(this.shield>0){const n=Math.min(this.shield,i);this.shield-=n,i-=n}this.health-=i,this.shake=Math.min(.17,this.shake+e*.006),this.audio.hurt(),this.onDamage?.(e,t),this.health<=0&&(this.health=0,this.dead=!0,this.onDeath?.())}heal(e){this.health=Math.min(this.maxHealth,this.health+e),this.shield=Math.min(this.maxShield,this.shield+e*.6)}resolveCollisions(){const e=this.radius;for(const t of this.world.colliders){if(t.max.y<.15)continue;const i=Mt(this.position.x,t.min.x,t.max.x),n=Mt(this.position.z,t.min.z,t.max.z);let r=this.position.x-i,a=this.position.z-n;const o=r*r+a*a;if(!(o>=e*e))if(o>1e-8){const l=Math.sqrt(o);this.position.x+=r/l*(e-l),this.position.z+=a/l*(e-l)}else{const l=Math.abs(this.position.x-t.min.x),c=Math.abs(t.max.x-this.position.x),d=Math.abs(this.position.z-t.min.z),u=Math.abs(t.max.z-this.position.z),h=Math.min(l,c,d,u);h===l?this.position.x=t.min.x-e:h===c?this.position.x=t.max.x+e:h===d?this.position.z=t.min.z-e:this.position.z=t.max.z+e}}this.position.x=Mt(this.position.x,-41.8,41.8),this.position.z=Mt(this.position.z,-41.8,41.8)}update(e,t){if(this.dead){this.updateCamera(e);return}this.timeSinceDamage+=e,this.timeSinceDamage>7&&(this.health=Math.min(this.maxHealth,this.health+6*e)),this.timeSinceDamage>3.5&&(this.shield=Math.min(this.maxShield,this.shield+14*e)),this.lookX=At(this.lookX,0,10,e),this.lookY=At(this.lookY,0,10,e);let i=t.moveX||0,n=t.moveY||0;const r=Math.hypot(i,n);r>1&&(i/=r,n/=r);const a=new P(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),o=new P(Math.cos(this.yaw),0,-Math.sin(this.yaw)),l=Math.hypot(i,n),c=6.5,d=new P;d.addScaledVector(a,n),d.addScaledVector(o,i),l>1&&d.normalize(),d.multiplyScalar(c);const u=t.grounded===!1?5:14;this.velocity.x=At(this.velocity.x,d.x,u,e),this.velocity.z=At(this.velocity.z,d.z,u,e),l<.05&&(this.velocity.x=At(this.velocity.x,0,12,e),this.velocity.z=At(this.velocity.z,0,12,e)),t.jump&&this.position.y<=.001&&(this.velocity.y=7,t.jump=!1),this.velocity.y-=19*e,this.position.y+=this.velocity.y*e,this.position.y<0?(this.velocity.y<-6&&this.audio.step(),this.position.y=0,this.velocity.y=0,t.grounded=!0):t.grounded=!1,this.position.x+=this.velocity.x*e,this.position.z+=this.velocity.z*e,this.resolveCollisions();const h=Math.hypot(this.velocity.x,this.velocity.z);this.moveAmount=Mt(h/c,0,1),h>.4&&this.position.y<.02&&(this.bobTime+=e*(7.4+h*.25),this.stepTimer-=h*e,this.stepTimer<=0&&(this.stepTimer=2.15,this.audio.step(),this.onFootstep?.())),this.roll=At(this.roll,-i*.018,6,e),this.weapon.update(e,{aiming:t.aim,moving:this.moveAmount,lookX:this.lookX,lookY:this.lookY});const p=t.aim?55:this.baseFov;this.fov=At(this.fov,p,9,e),this.camera.fov=this.fov,this.camera.updateProjectionMatrix(),this.updateCamera(e)}updateCamera(e){const t=this.moveAmount,i=Math.sin(this.bobTime*2)*.026*t,n=Math.cos(this.bobTime)*.02*t;this.shake=At(this.shake,0,8,e);const r=(Math.random()-.5)*this.shake,a=(Math.random()-.5)*this.shake;this.camera.position.set(this.position.x+n+r,this.position.y+this.eyeHeight+i+a,this.position.z),this.camera.rotation.set(this.pitch+(Math.random()-.5)*this.shake*.8,this.yaw+(Math.random()-.5)*this.shake*.8,this.roll)}}const L0=(()=>{let s=null;return()=>{if(s)return s;const e=document.createElement("canvas");e.width=e.height=128;const t=e.getContext("2d"),i=t.createRadialGradient(64,64,8,64,64,62);return i.addColorStop(0,"rgba(0,0,0,0.6)"),i.addColorStop(.5,"rgba(0,0,0,0.32)"),i.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=i,t.fillRect(0,0,128,128),s=new ls(e),s}})();function Dc(s){return new ii({color:9676987,metalness:.74,roughness:.42,emissive:s,emissiveIntensity:.55,envMapIntensity:1.55})}function D0(s=16725084){const e=new Dt,t=Dc(s),i=new Ue({color:s,toneMapped:!1}),n=new Ue({color:16734576,toneMapped:!1}),r=new ii({color:527634,metalness:.8,roughness:.4}),a=new z(new Eo(.5,1),t);a.scale.set(1.42,.84,1.12),a.castShadow=!0,e.add(a);const o=new z(new Ie(.62,.12,.86),r);o.position.set(0,.34,-.02),o.rotation.x=-.08,e.add(o);const l=new z(new Ie(.05,.025,.58),i);l.position.set(0,.405,0),e.add(l);for(const w of[-1,1]){const b=new z(new Ie(.34,.22,.62),t);b.position.set(w*.62,-.02,.03),b.rotation.z=w*.17,b.castShadow=!0,e.add(b);const E=new z(new _n(.24,.9,3),t);E.position.set(w*.95,.04,-.1),E.rotation.z=w*Math.PI/2,E.rotation.x=Math.PI/2,E.castShadow=!0,e.add(E);const T=new z(new Ie(.035,.035,.6),i);T.position.set(w*1.04,.05,-.12),e.add(T);const g=new z(new ft(.048,.064,.62,8),r);g.rotation.x=Math.PI/2,g.position.set(w*.28,-.16,.48),e.add(g);const y=new z(new qt(.055,.017,6,12),i);y.position.set(w*.28,-.16,.8),e.add(y)}const c=new z(new Si(.27,16,12),r);c.scale.set(1.04,.92,.5),c.position.set(0,0,.46),e.add(c);const d=new z(new Si(.16,16,12),n);d.scale.z=.62,d.position.set(0,0,.58),e.add(d);const u=new Wt(new zt({map:Tt(64),color:s,transparent:!0,opacity:.7,blending:We,depthWrite:!1,toneMapped:!1}));u.position.set(0,0,.62),u.scale.set(1.25,1.25,1),e.add(u);const h=new Wt(new zt({map:Tt(96),color:s,transparent:!0,opacity:.22,blending:We,depthWrite:!1,toneMapped:!1}));h.position.set(0,0,-.18),h.scale.set(2.3,2.3,1),e.add(h);const p=new z(new qt(.62,.017,6,48),new Ue({color:s,transparent:!0,opacity:.5,toneMapped:!1}));p.rotation.set(Math.PI/2.3,.15,.5),e.add(p);const _=new z(new qt(.46,.012,5,32),new Ue({color:7335935,transparent:!0,opacity:.42,toneMapped:!1}));_.rotation.set(.3,Math.PI/2,.7),e.add(_);const M=new z(new _n(.11,.56,4),r);M.rotation.x=Math.PI,M.position.set(0,-.48,-.02),e.add(M);const m=new z(new ft(.012,.03,.4,5),i);m.position.set(0,-.55,0),e.add(m);const f=new z(new ft(.012,.012,.45,4),r);f.position.set(0,.54,-.05),e.add(f);const v=new z(new Si(.035,6,4),i);return v.position.set(0,.77,-.05),e.add(v),{group:e,armor:t,accentMat:i,eyeMat:n,eye:d,eyeGlow:u,ring:p,ring2:_,body:a,scale:1}}function I0(s=16726993){const e=new Dt,t=Dc(s);t.color.setHex(8949152),t.emissiveIntensity=.6;const i=new Ue({color:s,toneMapped:!1}),n=new Ue({color:16756810,toneMapped:!1}),r=new ii({color:592914,metalness:.9,roughness:.36}),a=new z(new Fr(.72,0),t);a.scale.set(1.15,.9,.85),a.castShadow=!0,e.add(a);const o=new z(new Ie(.95,.35,.9),r);o.position.y=-.26,e.add(o);const l=new z(new Ie(.75,.16,.95),r);l.position.y=.58,e.add(l);const c=new z(new Ie(.08,.035,.68),i);c.position.y=.675,e.add(c);for(const f of[-1,1]){const v=new z(new Ie(.46,.5,.74),t);v.position.set(f*.82,.14,0),v.rotation.z=f*.22,v.castShadow=!0,e.add(v);const w=new z(new Ie(.04,.34,.6),i);w.position.set(f*1.045,.2,0),e.add(w);const b=new z(new ft(.28,.34,.18,10),r);b.rotation.z=Math.PI/2,b.position.set(f*1.18,-.08,0),e.add(b);const E=new z(new qt(.34,.02,5,28),new Ue({color:s,transparent:!0,opacity:.7,toneMapped:!1}));E.rotation.y=Math.PI/2,E.position.set(f*1.18,-.08,0),e.add(E);const T=new z(new ft(.06,.085,.75,8),r);T.rotation.x=Math.PI/2,T.position.set(f*.46,-.24,.62),e.add(T);const g=new z(new qt(.078,.02,6,12),i);g.position.set(f*.46,-.24,1),e.add(g)}const d=new z(new Ie(.62,.5,.52),r);d.position.set(0,.18,.55),d.rotation.x=.1,e.add(d);const u=new z(new Ie(.42,.1,.06),n);u.position.set(0,.18,.835),e.add(u);const h=new Wt(new zt({map:Tt(64),color:16753731,transparent:!0,opacity:.85,blending:We,depthWrite:!1,toneMapped:!1}));h.position.set(0,.18,.88),h.scale.set(1.8,1.8,1),e.add(h);const p=new Wt(new zt({map:Tt(96),color:s,transparent:!0,opacity:.24,blending:We,depthWrite:!1,toneMapped:!1}));p.position.set(0,0,-.25),p.scale.set(3.1,3.1,1),e.add(p);const _=new z(new qt(.98,.026,6,56),new Ue({color:s,transparent:!0,opacity:.5,toneMapped:!1}));_.rotation.set(Math.PI/2.15,0,.24),_.position.y=-.08,e.add(_);const M=new z(new qt(.74,.016,5,40),new Ue({color:16756810,transparent:!0,opacity:.36,toneMapped:!1}));M.rotation.z=Math.PI/2,e.add(M);const m=new z(new _n(.23,.9,4),r);return m.rotation.x=Math.PI,m.position.y=-.7,e.add(m),{group:e,armor:t,accentMat:i,eyeMat:n,eye:u,eyeGlow:h,ring:_,ring2:M,body:a,scale:1.35}}function N0(){const s=new Dt,e=new z(new ri(1.55,.1),new Ue({color:132875,transparent:!0,opacity:.72,depthWrite:!1,toneMapped:!1}));e.position.z=-.002,s.add(e);const t=new ri(1.49,.052);t.translate(.745,0,0);const i=new z(t,new Ue({color:16728408,transparent:!0,opacity:.95,depthWrite:!1,toneMapped:!1}));i.position.set(-.745,0,0),s.add(i);const n=new z(new ri(1.49,.012),new Ue({color:16777215,transparent:!0,opacity:.45,depthWrite:!1,toneMapped:!1}));return n.position.set(0,.028,.001),s.add(n),s.visible=!1,{group:s,fill:i,shine:n}}class U0{constructor({scene:e,camera:t,world:i,effects:n,audio:r,callbacks:a={}}){this.scene=e,this.camera=t,this.world=i,this.effects=n,this.audio=r,this.callbacks=a,this.enemies=[],this.projectiles=[],this.playerPosition=new P,this.tmpVec=new P,this.tmpVec2=new P,this.tmpSphere=new os,this.ray=new Ns,this.shadowMatBase=new Ue({map:L0(),transparent:!0,opacity:.55,depthWrite:!1,toneMapped:!1}),this.glowTex=Tt(64)}setPlayerPosition(e){this.playerPosition.copy(e)}spawn(e,t,i=1){const n=e==="warden",r=n?I0(16726993):D0(16725084),a=this.world.spawnPoint(t),o={kind:e,...r,spawnIndex:t,groupPosition:a.position,hoverBase:n?2.05:1.6,hp:n?240+(i-1)*45:72+(i-1)*15,maxHp:0,speed:(n?2.35:3.7)*(1+Math.min(.45,(i-1)*.035)),bodyRadius:n?1.3:.86,critRadius:n?.4:.22,damage:n?14:8,score:n?320:100,fireInterval:(n?2.15:2.55)*Z(.85,1.15),fireTimer:Z(.7,1.9),strafeDir:Math.random()<.5?-1:1,strafePhase:Z(0,wt),phase:Z(0,wt),bobAmp:n?.16:.14,flash:0,dead:!1,spawnT:0,burstLeft:0,burstTimer:0,scaleBase:n?1.15:1,healthVisible:!1};o.maxHp=o.hp;const l=r.group;l.position.set(a.position.x,o.hoverBase,a.position.z),l.scale.setScalar(.01),this.scene.add(l);const c=new z(new ri(1,1),this.shadowMatBase.clone());c.material.opacity=.4,c.rotation.x=-Math.PI/2,c.scale.setScalar(n?3.4:2.2),c.position.set(a.position.x,.025,a.position.z),this.scene.add(c),o.shadow=c;const d=new z(new ri(1,1),new Ue({map:this.glowTex,color:n?16726993:16725084,transparent:!0,opacity:.07,blending:We,depthWrite:!1,toneMapped:!1}));d.rotation.x=-Math.PI/2,d.scale.setScalar(n?2.9:2.2),d.position.set(a.position.x,.035,a.position.z),this.scene.add(d),o.groundGlow=d;const u=N0();return u.group.position.set(0,n?1.6:1.15,n?.6:.55),u.group.scale.setScalar(n?1.1:.9),l.add(u.group),o.health=u,this.world.activatePortal(t),this.effects.portalBurst(a.position,n?16726993:16729812),this.audio.portal(),this.enemies.push(o),o}damage(e,t,i,n){if(e.dead)return 0;const r=Math.round(t*(i?2:1));return e.hp-=r,e.flash=1,e.health.group.visible=!0,e.healthVisible=!0,this.effects.enemyHit(n,i),this.audio.hit(i),this.callbacks.onDamage?.(e,r,i,n),e.hp<=0&&this.kill(e,i),r}kill(e,t=!1){if(e.dead)return;e.dead=!0;const i=e.group.position.clone(),n=e.kind==="warden";this.effects.explosion(i,n?16733908:5500159,n),this.audio.kill(n),this.callbacks.onKill?.(e,{position:i,crit:t}),this.scene.remove(e.group),this.scene.remove(e.shadow),this.scene.remove(e.groundGlow),e.health.group.visible=!1,e.group.traverse(r=>{r.geometry&&r.geometry.dispose(),r.material&&(Array.isArray(r.material)?r.material:[r.material]).forEach(o=>o.dispose())}),e.shadow.geometry.dispose(),e.shadow.material.dispose(),e.groundGlow.geometry.dispose(),e.groundGlow.material.dispose(),e.removeAt=.15}update(e,t){const i=this.playerPosition;for(let n=this.enemies.length-1;n>=0;n--){const r=this.enemies[n];if(r.dead){r.removeAt-=e,r.removeAt<=0&&this.enemies.splice(n,1);continue}r.spawnT+=e;const a=Mt(r.spawnT/.7,0,1),o=r.scaleBase*(a<1?.2+.8*(1-Math.pow(1-a,3)):1);r.group.scale.setScalar(o);const l=i.x-r.group.position.x,c=i.z-r.group.position.z,d=Math.hypot(l,c)||.001,u=l/d,h=c/d,p=r.kind==="warden"?12.5:9.5;let _=0,M=0;d>p+2.5?(_+=u,M+=h):d<p-3.5&&(_-=u,M-=h);const m=Math.sin(t*.85+r.strafePhase)*(r.kind==="warden"?.38:.62)*r.strafeDir;_+=-h*m,M+=u*m;for(const E of this.enemies){if(E===r||E.dead)continue;const T=r.group.position.x-E.group.position.x,g=r.group.position.z-E.group.position.z,y=Math.hypot(T,g);y>.01&&y<3.2&&(_+=T/y*(3.2-y)*.28,M+=g/y*(3.2-y)*.28)}const f=Math.hypot(_,M);f>.001&&(_/=f,M/=f);const v=r.speed*(r.spawnT<.8?.25:1);r.group.position.x+=_*v*e,r.group.position.z+=M*v*e,r.group.position.x=Mt(r.group.position.x,-38,38),r.group.position.z=Mt(r.group.position.z,-38,38),r.group.position.y=r.hoverBase+Math.sin(t*1.9+r.phase)*r.bobAmp;const w=Math.atan2(l,c);if(r.group.rotation.y=At(r.group.rotation.y,w,6,e),r.group.rotation.z=At(r.group.rotation.z,-m*.15,3,e),r.group.rotation.x=At(r.group.rotation.x,Mt((r.hoverBase-i.y)*.025,-.1,.15),3,e),r.ring.rotation.z+=e*(r.kind==="warden"?.9:1.8),r.ring2.rotation.z-=e*1.3,r.eyeGlow.material.opacity=.58+Math.sin(t*3+r.phase)*.15,r.flash>0){r.flash=Math.max(0,r.flash-e*7);const E=r.flash;r.armor.emissive.setRGB(E,E,E),r.armor.emissiveIntensity=.34+E*4.2,r.eyeMat.color.setRGB(1,.35+E*.65,.4+E*.6)}else r.armor.emissive.setHex(r.kind==="warden"?16726993:16725084),r.armor.emissiveIntensity=.34;if(r.healthVisible){const E=Mt(r.hp/r.maxHp,0,1);r.health.fill.scale.x=Math.max(.001,E),r.health.fill.material.color.setHex(E>.55?16756810:E>.25?16742973:16724296)}r.shadow.position.set(r.group.position.x,.025,r.group.position.z),r.groundGlow.position.set(r.group.position.x,.035,r.group.position.z),r.groundGlow.material.opacity=.045+Math.sin(t*2.4+r.phase)*.02;const b=r.group.position.y;r.shadow.material.opacity=Mt(.55-b*.07,.16,.5),r.shadow.scale.setScalar((r.kind==="warden"?3.2:2.1)*(1-b*.018)),r.spawnT>.9&&d<38&&(r.burstLeft>0?(r.burstTimer-=e,r.burstTimer<=0&&(this.fire(r),r.burstLeft--,r.burstTimer=.17)):(r.fireTimer-=e,r.fireTimer<=0&&(this.fire(r)?(r.fireTimer=r.fireInterval*Z(.9,1.12),r.kind==="warden"&&(r.burstLeft=2,r.burstTimer=.18)):r.fireTimer=.25)))}this.updateProjectiles(e)}fire(e){const t=e.eye.getWorldPosition(this.tmpVec),i=this.tmpVec2.copy(this.playerPosition),n=t.distanceTo(i);if(n<.1||this.world.isBlocked(t,i,.8))return!1;const r=i.sub(t).normalize(),a=e.kind==="warden"?.028:.045;return r.x+=Z(-a,a),r.y+=Z(-a,a),r.z+=Z(-a,a),r.normalize(),this.spawnProjectile(t.clone(),r,e),this.effects.muzzle(t,r),this.audio.enemyShoot(Mt(1-n/42,.3,1)),!0}spawnProjectile(e,t,i){const n=new Dt,r=i.kind==="warden"?16757575:16723826,a=new z(new Si(i.kind==="warden"?.16:.12,10,8),new Ue({color:16766640,toneMapped:!1}));n.add(a);const o=new Wt(new zt({map:Tt(64),color:r,transparent:!0,opacity:.95,blending:We,depthWrite:!1,toneMapped:!1}));o.scale.setScalar(i.kind==="warden"?1.35:1),n.add(o);const l=new z(new ft(.055,.005,i.kind==="warden"?1:.7,6,1,!0),new Ue({color:r,transparent:!0,opacity:.6,blending:We,depthWrite:!1,toneMapped:!1}));l.rotation.x=-Math.PI/2,l.position.z=i.kind==="warden"?-.6:-.42,n.add(l),n.position.copy(e),n.quaternion.setFromUnitVectors(new P(0,0,1),t),this.scene.add(n),this.projectiles.push({group:n,velocity:t.clone().multiplyScalar(i.kind==="warden"?19:23),life:5,damage:i.damage,color:r,radius:i.kind==="warden"?.2:.15})}updateProjectiles(e){const t=this.playerPosition;for(let i=this.projectiles.length-1;i>=0;i--){const n=this.projectiles[i];n.life-=e;const r=n.group.position.clone();n.group.position.addScaledVector(n.velocity,e);const a=n.group.position;if(a.distanceTo(t)<.75){this.callbacks.onPlayerHit?.(n.damage,n.velocity.clone().normalize()),this.removeProjectile(i,!0);continue}let l=a.y<.12;if(!l){for(const c of this.world.colliders)if(o0(r,a,c)){l=!0;break}}if(l){this.removeProjectile(i,!0);continue}(n.life<=0||Math.abs(a.x)>48||Math.abs(a.z)>48)&&this.removeProjectile(i,!1)}}removeProjectile(e,t){const i=this.projectiles[e];t&&(this.effects.explosion(i.group.position.clone(),i.color,!1),this.effects.spark(i.group.position.clone(),null,i.color,8,4,.06)),this.scene.remove(i.group),i.group.traverse(n=>{n.geometry&&n.geometry.dispose(),n.material&&(Array.isArray(n.material)?n.material:[n.material]).forEach(a=>{a.map&&a.map.dispose(),a.dispose()})}),this.projectiles.splice(e,1)}raycast(e,t=100){let i=null;for(const n of this.enemies){if(n.dead)continue;this.tmpSphere.center.copy(n.group.position),this.tmpSphere.radius=n.bodyRadius;const r=e.intersectSphere(this.tmpSphere,this.tmpVec);if(!r)continue;const a=r.distanceTo(e.origin);if(a>t)continue;let o=!1;const l=n.eye.getWorldPosition(new P);this.tmpSphere.center.copy(l),this.tmpSphere.radius=n.critRadius;const c=e.intersectSphere(this.tmpSphere,this.tmpVec2);if(c){const d=c.distanceTo(e.origin);if(d<=a+.6){o=!0,(!i||d<i.t)&&(i={enemy:n,t:d,point:c.clone(),crit:!0});continue}}(!i||a<i.t)&&(i={enemy:n,t:a,point:r.clone(),crit:o})}return i}getAimCandidate(e,t,i=.07){let n=null,r=1/0;const a=new P(t.x,t.y,t.z).normalize();for(const o of this.enemies){if(o.dead||o.spawnT<.2)continue;const l=o.group.position.clone().sub(e);if(l.length()>42)continue;l.normalize();const d=Mt(l.dot(a),-1,1),u=Math.acos(d);u<i&&u<r&&(r=u,n=o)}return n}get alive(){return this.enemies.filter(e=>!e.dead).length}clear(){for(const e of this.enemies)e.dead||(this.scene.remove(e.group),this.scene.remove(e.shadow),this.scene.remove(e.groundGlow));for(const e of this.projectiles)this.scene.remove(e.group);this.projectiles.length=0,this.enemies.length=0}}class F0{constructor({scene:e,camera:t,renderer:i,composer:n,world:r,effects:a,audio:o,hud:l}){this.scene=e,this.camera=t,this.renderer=i,this.composer=n,this.world=r,this.effects=a,this.audio=o,this.hud=l,this.touchMode=matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>0||window.innerWidth<=760,document.body.classList.toggle("touch-ui",this.touchMode),this.weapon=new C0({camera:t,scene:e,effects:a,audio:o,viewAspect:t.aspect}),this.player=new P0({camera:t,scene:e,world:r,effects:a,audio:o,weapon:this.weapon}),this.player.baseFov=t.aspect<.8?80:this.touchMode?76:72,this.player.fov=t.aspect<.8?80:72,this.player.isTouch=this.touchMode,this.player.weapon.setVisible(!1),this.enemies=new U0({scene:e,camera:t,world:r,effects:a,audio:o,callbacks:{onDamage:(c,d,u,h)=>this.onEnemyDamage(c,d,u,h),onKill:(c,d)=>this.onEnemyKill(c,d),onPlayerHit:(c,d)=>this.onPlayerHit(c,d)}}),this.state="menu",this.score=0,this.wave=1,this.kills=0,this.headshots=0,this.shots=0,this.weaponHits=0,this.comboCount=0,this.comboTimer=0,this.best=Number(localStorage.getItem("helix-best")||0),this.spawnRemaining=0,this.spawnTimer=0,this.spawnQueue=[],this.waveTotal=0,this.waveActive=!1,this.waveStartTimer=0,this.intermission=0,this.introDelay=0,this.pickups=[],this.deathTimer=0,this.deathShown=!1,this.pausedFromHidden=!1,this.menuT=0,this.wasLocked=!1,this.lastFrame=performance.now(),this.damageFlash=0,this.input={moveX:0,moveY:0,jump:!1,aim:!1,fire:!1,grounded:!0},this.touchMove={x:0,y:0,active:!1},this.keys=new Set,this.joystickPointer=null,this.lookPointer=null,this.lookLast={x:0,y:0},this.raycaster=new vc,this.aimCandidate=null,this.bindUI(),this.bindInput(),this.hud.setSoundMuted(!this.audio.enabled),this.hud.setWave(1),this.hud.setScore(0),window.__HELIX__={game:this,start:()=>this.startGame(),enemies:this.enemies,player:this.player,world:this.world}}bindUI(){document.getElementById("play-btn").addEventListener("click",()=>{this.audio.init(),this.audio.ui(),this.startGame()}),document.getElementById("sound-btn").addEventListener("click",()=>{this.audio.init();const l=this.audio.toggle();this.hud.setSoundMuted(!l),l&&this.audio.ui()}),document.getElementById("pause-btn").addEventListener("click",()=>{this.state==="playing"&&this.pause()}),document.getElementById("resume-btn").addEventListener("click",()=>this.resume()),document.getElementById("quit-btn").addEventListener("click",()=>this.toMenu()),document.getElementById("redeploy-btn").addEventListener("click",()=>this.startGame()),document.getElementById("menu-btn").addEventListener("click",()=>this.toMenu());const e=document.getElementById("joystick"),t=document.getElementById("joystick-knob"),i=l=>{const c=e.getBoundingClientRect(),d=c.left+c.width/2,u=c.top+c.height/2;let h=l.clientX-d,p=l.clientY-u;const _=c.width*.32,M=Math.hypot(h,p);M>_&&(h=h/M*_,p=p/M*_),t.style.transform=`translate(${h}px, ${p}px)`;const m=h/_,f=-p/_,v=.12;this.touchMove.x=Math.abs(m)<v?0:m,this.touchMove.y=Math.abs(f)<v?0:f,this.touchMove.active=!0};e.addEventListener("pointerdown",l=>{l.preventDefault(),this.joystickPointer=l.pointerId,e.setPointerCapture(l.pointerId),i(l)}),e.addEventListener("pointermove",l=>{this.joystickPointer===l.pointerId&&(l.preventDefault(),i(l))});const n=l=>{this.joystickPointer===l.pointerId&&(this.joystickPointer=null,this.touchMove.x=0,this.touchMove.y=0,this.touchMove.active=!1,t.style.transform="translate(0, 0)")};e.addEventListener("pointerup",n),e.addEventListener("pointercancel",n);const r=this.renderer.domElement;r.addEventListener("pointerdown",l=>{l.pointerType==="touch"&&this.state==="playing"&&this.lookPointer===null&&(this.lookPointer=l.pointerId,this.lookLast.x=l.clientX,this.lookLast.y=l.clientY,r.setPointerCapture(l.pointerId))}),r.addEventListener("pointermove",l=>{if(l.pointerType!=="touch"||this.lookPointer!==l.pointerId)return;const c=l.clientX-this.lookLast.x,d=l.clientY-this.lookLast.y;this.lookLast.x=l.clientX,this.lookLast.y=l.clientY,this.player.look(c,d,.0033)});const a=l=>{this.lookPointer===l.pointerId&&(this.lookPointer=null)};r.addEventListener("pointerup",a),r.addEventListener("pointercancel",a);const o=(l,c,d)=>{const u=document.getElementById(l);u.addEventListener("pointerdown",p=>{p.preventDefault(),u.setPointerCapture(p.pointerId),u.classList.add("held"),c()});const h=p=>{u.classList.remove("held"),d?.()};u.addEventListener("pointerup",h),u.addEventListener("pointercancel",h),u.addEventListener("lostpointercapture",h)};o("fire-btn",()=>{this.input.fire=!0},()=>{this.input.fire=!1}),o("aim-btn",()=>{this.input.aim=!0},()=>{this.input.aim=!1}),document.getElementById("reload-btn").addEventListener("pointerdown",l=>{l.preventDefault(),this.weapon.startReload()}),document.getElementById("jump-btn").addEventListener("pointerdown",l=>{l.preventDefault(),this.input.jump=!0}),document.addEventListener("visibilitychange",()=>{document.hidden&&this.state==="playing"&&(this.pausedFromHidden=!0,this.pause())})}bindInput(){const e=this.keys;window.addEventListener("keydown",i=>{["Space","KeyW","KeyA","KeyS","KeyD","KeyR","Escape"].includes(i.code)&&i.preventDefault(),e.add(i.code),!i.repeat&&(i.code==="Escape"&&(this.state==="playing"?this.pause():this.state==="paused"&&this.resume()),i.code==="KeyR"&&this.state==="playing"&&this.weapon.startReload(),i.code==="Space"&&this.state==="playing"&&(this.input.jump=!0))}),window.addEventListener("keyup",i=>e.delete(i.code)),window.addEventListener("blur",()=>{e.clear(),this.input.fire=!1,this.input.aim=!1});const t=this.renderer.domElement;t.addEventListener("contextmenu",i=>i.preventDefault()),t.addEventListener("mousedown",i=>{this.state==="playing"&&(i.button===0&&(this.input.fire=!0,!this.touchMode&&document.pointerLockElement!==t&&this.requestLock()),i.button===2&&(this.input.aim=!0))}),window.addEventListener("mouseup",i=>{i.button===0&&(this.input.fire=!1),i.button===2&&(this.input.aim=!1)}),document.addEventListener("mousemove",i=>{this.state!=="playing"||this.touchMode||document.pointerLockElement===t&&this.player.look(i.movementX,i.movementY,.0021)}),document.addEventListener("pointerlockchange",()=>{document.pointerLockElement===t?this.wasLocked=!0:this.wasLocked&&this.state==="playing"&&!this.touchMode&&(this.wasLocked=!1,this.pause())}),t.addEventListener("click",()=>{this.state==="playing"&&!this.touchMode&&document.pointerLockElement!==t&&this.requestLock()}),window.addEventListener("resize",()=>{this.weapon.updateViewAspect(this.camera.aspect),this.player.baseFov=this.camera.aspect<.8?80:this.touchMode?76:72})}requestLock(){const e=this.renderer.domElement;if(!this.touchMode)try{const t=e.requestPointerLock?.();t&&t.catch&&t.catch(()=>{})}catch{}}startGame(){this.audio.init(),this.state="playing",this.score=0,this.wave=0,this.kills=0,this.headshots=0,this.shots=0,this.weaponHits=0,this.comboCount=0,this.comboTimer=0,this.spawnRemaining=0,this.spawnQueue=[],this.waveActive=!1,this.waveStartTimer=.35,this.intermission=0,this.introDelay=.7,this.deathShown=!1,this.deathTimer=0,this.clearPickups(),this.enemies.clear(),this.player.reset(),this.player.weapon.setVisible(!0),this.hud.scoreEl.textContent="000000",this.hud.lastScore=-1,this.hud.hideGameOver(),this.hud.hidePause(),this.hud.hideMenu(),this.hud.setScore(0),this.hud.setBest(this.best),this.hud.setWave(1),this.hud.setWaveProgress(0),this.hud.toast("DEFENSE PROTOCOL","SIMULATION ACTIVE","HOLD THE FOUNDRY","",2e3),this.input.fire=!1,this.input.aim=!1,this.input.jump=!1,this.keys.clear(),this.audio.waveStart(1),this.requestLock(),this.menuT=0,this.wasLocked=!1,this.lastFrame=performance.now()}toMenu(){this.state="menu",this.enemies.clear(),this.clearPickups(),this.hud.showMenu(),this.hud.hidePause(),this.hud.hideGameOver(),this.player.weapon.setVisible(!1),this.player.reset(),this.input.fire=!1,this.input.aim=!1,this.keys.clear(),this.input.moveX=0,this.input.moveY=0,this.touchMove.x=0,this.touchMove.y=0,document.pointerLockElement&&document.exitPointerLock(),this.menuT=0,this.camera.rotation.order="YXZ",this.camera.fov=62,this.camera.updateProjectionMatrix()}pause(){this.state==="playing"&&(this.state="paused",this.wasLocked=!1,this.input.fire=!1,this.input.aim=!1,document.pointerLockElement&&document.exitPointerLock(),this.hud.showPause({wave:Math.max(1,this.wave),score:this.score,kills:this.kills}))}resume(){this.state==="paused"&&(this.state="playing",this.hud.hidePause(),this.lastFrame=performance.now(),this.pausedFromHidden&&(this.pausedFromHidden=!1),this.requestLock())}startWave(e){this.wave=e,this.waveActive=!0;const t=Math.min(16,3+Math.floor(e*1.8));this.waveTotal=t,this.spawnRemaining=t,this.spawnTimer=0,this.spawnQueue=[];for(let i=0;i<t;i++){const n=e>=2?Math.min(.34,.08+e*.035):0;let r=Math.random()<n?"warden":"wasp";i===t-1&&e>=4&&!this.spawnQueue.includes("warden")&&(r="warden"),this.spawnQueue.push(r)}e===1&&(this.spawnQueue[0]="wasp"),this.hud.setWave(e),this.hud.setWaveProgress(0),this.hud.toast(e===1?"HOSTILE SIGNAL":"UPLINK WARNING",`WAVE ${Jn(e)} INBOUND`,e===1?"THREAT LEVEL: MODERATE":"THREAT LEVEL: ELEVATED",e>=4?"danger":""),this.audio.waveStart(e)}spawnNextEnemy(){if(this.spawnRemaining<=0||this.spawnQueue.length===0)return;const e=this.spawnQueue.shift();this.spawnRemaining--;let t=Et(0,this.world.portalCount-1);this.wave===1&&this.spawnRemaining===this.waveTotal-1&&(t=6);for(let i=0;i<4;i++){const n=Et(0,this.world.portalCount-1),r=this.world.spawnPoint(n).position;if(Math.hypot(r.x-this.player.position.x,r.z-this.player.position.z)>18){t=n;break}}this.enemies.spawn(e,t,this.wave)}onEnemyDamage(e,t,i,n){this.weaponHits++,this.hud.hit(i),this.hud.damageNumber(n,t,i,this.camera),i&&this.headshots++}onEnemyKill(e,t){this.kills++,this.comboCount=this.comboTimer>0?this.comboCount+1:1,this.comboTimer=3;const i=Mt(this.comboCount,1,5),n=e.score*i;this.score+=n,this.hud.setScore(this.score),this.hud.killfeed(e.kind,t.crit),i>=2&&this.hud.combo(i),this.score>this.best&&(this.best=this.score,this.hud.setBest(this.best));const r=this.player.health<48&&this.player.health>0;Math.random()<(r?.42:.14)&&this.spawnPickup(t.position)}onPlayerHit(e,t){this.player.dead||(this.player.takeDamage(e,t),this.hud.damage(e,t,this.player.yaw),this.damageFlash=1)}spawnPickup(e){const t=new Dt;t.position.set(e.x,1.05,e.z);const i=new Ue({color:6160346,toneMapped:!1}),n=new z(new Fr(.23,0),i);t.add(n);const r=new z(new qt(.34,.018,5,28),new Ue({color:8388592,transparent:!0,opacity:.8,toneMapped:!1}));r.rotation.x=Math.PI/2,t.add(r);const a=new Wt(new zt({map:this.effects.particles.material.uniforms.uMap.value,color:5570520,transparent:!0,opacity:.7,blending:We,depthWrite:!1,toneMapped:!1}));a.scale.setScalar(1.5),t.add(a);const o=new z(new ft(.04,.16,1.4,8,1,!0),new Ue({color:5504984,transparent:!0,opacity:.12,side:ni,blending:We,depthWrite:!1,toneMapped:!1}));o.position.y=-.55,t.add(o),this.scene.add(t),this.pickups.push({group:t,life:18,phase:Z(0,Math.PI*2),core:n,cage:r})}updatePickups(e,t){for(let i=this.pickups.length-1;i>=0;i--){const n=this.pickups[i];n.life-=e,n.phase+=e,n.group.position.y=1.05+Math.sin(n.phase*2.2)*.16,n.core.rotation.y+=e*1.8,n.core.rotation.x+=e*.9,n.cage.rotation.z+=e*.7,n.group.visible=n.life>2.8||Math.floor(n.life*8)%2===0;const r=n.group.position.x-this.player.position.x,a=n.group.position.z-this.player.position.z;if(r*r+a*a<2.1*2.1&&!this.player.dead){this.player.heal(25),this.effects.heal(n.group.position.clone()),this.audio.pickup(),this.hud.pickup(),this.score+=50,this.hud.setScore(this.score),this.removePickup(i);continue}n.life<=0&&this.removePickup(i)}}removePickup(e){const t=this.pickups[e];this.scene.remove(t.group),t.group.traverse(i=>{i.geometry&&i.geometry.dispose(),i.material&&(Array.isArray(i.material)?i.material:[i.material]).forEach(r=>r.dispose())}),this.pickups.splice(e,1)}clearPickups(){for(const e of this.pickups)this.scene.remove(e.group),e.group.traverse(t=>{t.geometry&&t.geometry.dispose(),t.material&&(Array.isArray(t.material)?t.material:[t.material]).forEach(n=>n.dispose())});this.pickups.length=0}handleFiring(){if(!this.input.fire||this.state!=="playing"||this.player.dead||!this.weapon.tryShoot())return;this.shots++;const e=this.player.getShootOrigin(),t=this.weapon.adsK>.5;let i=t?.0025:.0105;this.player.moveAmount>.2&&(i+=.006*this.player.moveAmount);let n=this.player.getShootDirection(i);if(this.touchMode){const h=this.enemies.getAimCandidate(e,n,t?.065:.045);if(h&&!h.dead){const p=h.group.position.clone().sub(e);p.length(),p.normalize(),n=n.lerp(p,t?.55:.3).normalize()}}this.raycaster.set(e,n),this.raycaster.near=.1,this.raycaster.far=120;const r=this.enemies.raycast(this.raycaster.ray),a=this.world.raycast(this.raycaster),o=a.length?a[0]:null;let l=e.clone().addScaledVector(n,80);if(r&&(!o||r.t<o.distance))l.copy(r.point),this.enemies.damage(r.enemy,32,r.crit,r.point.clone());else if(o){l.copy(o.point);const h=o.face?o.face.normal.clone().transformDirection(o.object.matrixWorld):n.clone().negate();this.effects.impact(o.point,h)}const c=this.weapon.muzzle.getWorldPosition(new P);this.effects.tracer(c,l,t?10484479:7336703);const d=t?Z(.0035,.006):Z(.008,.013),u=Z(-.004,.004);this.player.applyRecoil(d,u)}setAimTarget(){if(this.state!=="playing"||this.player.dead){this.hud.setTarget(!1);return}const e=this.player.getShootOrigin(),t=this.player.getShootDirection(0),i=this.enemies.getAimCandidate(e,t,.045);let n=!1;if(i){const r=i.group.position.clone();n=!this.world.isBlocked(e,r,.7)}this.hud.setTarget(n)}updateMenu(e){this.menuT+=e;const t=this.menuT,i=.36+Math.sin(t*.05)*.08,n=31;this.camera.position.set(Math.sin(i)*n,6.6+Math.sin(t*.14)*.28,Math.cos(i)*n),this.camera.rotation.order="YXZ",this.camera.lookAt(0,2.6+Math.sin(t*.11)*.12,0),this.camera.rotation.z+=Math.sin(t*.09)*.003,this.camera.fov=60,this.camera.updateProjectionMatrix()}updateDeath(e,t){if(this.deathTimer+=e,this.input.fire=!1,this.input.aim=!1,Mt(this.deathTimer/1.2,0,1),this.camera.position.y=At(this.camera.position.y,.72,2.4,e),this.camera.rotation.x=At(this.camera.rotation.x,-.45,2.4,e),this.camera.rotation.z=At(this.camera.rotation.z,.36,2.2,e),this.deathTimer>1.5&&!this.deathShown){this.deathShown=!0,this.state="gameover";const i=this.shots>0?this.weaponHits/this.shots:0;this.hud.showGameOver({wave:Math.max(1,this.wave),score:this.score,kills:this.kills,accuracy:i}),this.hud.setBest(this.score),document.pointerLockElement&&document.exitPointerLock()}}update(e,t){if(this.effects.update(e),this.world.update(e,t),this.state==="menu"){this.updateMenu(e);return}if(this.state==="paused"||this.state==="gameover"){this.state==="gameover"&&(this.camera.rotation.z+=e*.01),this.weapon.update(e,{aiming:!1,moving:0,lookX:0,lookY:0});return}if(this.player.dead){this.updateDeath(e,t),this.enemies.update(e,t),this.updatePickups(e,t),this.hud.update(this.player,this.weapon),this.hud.updateRadar(this.player,this.enemies.enemies,e,this.pickups);return}let i=(this.keys.has("KeyD")?1:0)-(this.keys.has("KeyA")?1:0),n=(this.keys.has("KeyW")?1:0)-(this.keys.has("KeyS")?1:0);if(this.touchMove.active&&(i=this.touchMove.x,n=this.touchMove.y),this.input.moveX=i,this.input.moveY=n,this.player.update(e,this.input),this.enemies.setPlayerPosition(this.player.getShootOrigin()),this.enemies.update(e,t),this.handleFiring(),this.updatePickups(e,t),this.setAimTarget(),this.hud.update(this.player,this.weapon),this.hud.updateRadar(this.player,this.enemies.enemies,e,this.pickups),this.comboTimer>0&&(this.comboTimer-=e,this.comboTimer<=0&&(this.comboCount=0)),!this.waveActive){this.intermission>0?(this.intermission-=e,this.intermission<=0&&this.startWave(this.wave+1)):this.waveStartTimer>0&&(this.waveStartTimer-=e,this.waveStartTimer<=0&&this.startWave(1));return}this.spawnRemaining>0&&(this.spawnTimer-=e,this.spawnTimer<=0&&(this.spawnNextEnemy(),this.spawnTimer=Z(.55,1)));const r=this.spawnRemaining+this.enemies.alive,a=this.waveTotal-r;if(this.hud.setWaveProgress(this.waveTotal>0?a/this.waveTotal:0),this.spawnRemaining===0&&this.enemies.alive===0){this.waveActive=!1,this.hud.setWaveProgress(1);const o=this.wave*250;this.score+=o,this.hud.setScore(this.score),this.hud.toast("WAVE CLEARED",`+${Kn(o)}`,`WAVE ${Jn(this.wave)} SECURED // NEXT ASSAULT IN 5`,"gold",3e3),this.audio.waveClear(),this.intermission=5,this.hud.setBest(this.score),this.player.heal(15)}}}const O0={uniforms:{tDiffuse:{value:null},uTime:{value:0},uResolution:{value:new Ae(1,1)},uAberration:{value:.00125},uVignette:{value:.34}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform float uAberration;
    uniform float uVignette;
    varying vec2 vUv;
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }
    void main() {
      vec2 centered = vUv - 0.5;
      float r = length(centered);
      vec2 offset = centered * uAberration * (0.22 + r * 1.4);
      vec3 col;
      col.r = texture2D(tDiffuse, vUv + offset).r;
      col.g = texture2D(tDiffuse, vUv).g;
      col.b = texture2D(tDiffuse, vUv - offset).b;
      // Filmic contrast in linear space
      col = (col - 0.5) * 1.045 + 0.5;
      float vig = smoothstep(0.78, 0.18, r);
      col *= mix(1.0 - uVignette, 1.0, vig);
      float grain = hash(vUv * uResolution + fract(uTime) * 91.7) - 0.5;
      col += grain * 0.012;
      gl_FragColor = vec4(max(col, 0.0), 1.0);
    }
  `};async function B0(){let s=!1;const e=document.getElementById("play-btn");e&&e.addEventListener("click",()=>{window.__HELIX__?.game||(s=!0)});try{await document.fonts.ready}catch{}const t=new URLSearchParams(location.search).has("debug"),i=document.getElementById("game"),n=matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>0||window.innerWidth<=760,r=new Jm({canvas:i,antialias:!0,powerPreference:"high-performance",stencil:!1});r.setPixelRatio(Math.min(window.devicePixelRatio||1,n?1.35:1.5)),r.setSize(window.innerWidth,window.innerHeight),r.outputColorSpace=ti,r.toneMapping=Lr,r.toneMappingExposure=1.16,r.shadowMap.enabled=!0,r.shadowMap.type=ws;const a=new Ph;a.background=new Fe(198413);const o=new Li(72,window.innerWidth/window.innerHeight,.045,320);o.rotation.order="YXZ",a.add(o);const l=b0(a,r),c=new T0(a),d=new A0,u=new R0,h=new i0(r);h.setPixelRatio(r.getPixelRatio()),h.setSize(window.innerWidth,window.innerHeight);const p=new n0(a,o);h.addPass(p);const _=new ss(new Ae(window.innerWidth,window.innerHeight),n?.48:.56,.5,.82);h.addPass(_);const M=new Pc(O0);M.uniforms.uResolution.value.set(window.innerWidth,window.innerHeight),h.addPass(M),h.addPass(new r0);const m=new F0({scene:a,camera:o,renderer:r,composer:h,world:l,effects:c,audio:d,hud:u});window.__HELIX__=Object.assign(window.__HELIX__||{},{game:m,renderer:r,composer:h,bloom:_,camera:o,scene:a,effects:c,audio:d,hud:u,world:l}),s&&setTimeout(()=>m.startGame(),0);function f(){const R=window.innerWidth,L=window.innerHeight;o.aspect=R/L,o.updateProjectionMatrix(),r.setSize(R,L),h.setPixelRatio(r.getPixelRatio()),h.setSize(R,L),_.resolution.set(R,L),M.uniforms.uResolution.value.set(R,L),m.weapon.updateViewAspect(o.aspect),m.player.baseFov=o.aspect<.8?80:m.touchMode?76:72}window.addEventListener("resize",f),window.addEventListener("orientationchange",()=>setTimeout(f,250));let v=0,w=0,b=!1,E=0;function T(R){if(!t&&!(b||m.state==="menu")&&(v+=R,w++,v>2.6)){const L=v/w;if(E++,L>.028&&E>=1){const O=r.getPixelRatio();O>1?(r.setPixelRatio(Math.max(1,O-.2)),h.setPixelRatio(r.getPixelRatio()),h.setSize(window.innerWidth,window.innerHeight)):(_.strength*=.8,b=!0)}L>.034&&E>=2&&(_.enabled=!1,b=!0),v=0,w=0}}let g=performance.now(),y=0;r.setAnimationLoop(R=>{const L=Math.min(.05,Math.max(1e-4,(R-g)/1e3));g=R,y+=L,m.update(L,y),M.uniforms.uTime.value=y,h.render(),T(L)});const D=document.getElementById("boot");requestAnimationFrame(()=>{setTimeout(()=>D.classList.add("done"),260)}),window.__HELIX_READY__=!0,console.info("HELIX // LAST STAND ready")}B0().catch(s=>{console.error(s);const e=document.getElementById("boot");e&&(e.innerHTML='<div class="boot-copy" style="max-width:520px;text-align:center;line-height:1.8;">DEFENSE GRID FAILED TO INITIALIZE<br><span style="color:#ff5770">'+String(s.message||s)+"</span></div>")});
