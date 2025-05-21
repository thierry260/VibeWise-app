import{w as $f}from"./CFgcPMXS.js";const qf=()=>{};var vc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ll=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},zf=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],a=n[t++],c=n[t++],l=((i&7)<<18|(s&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const s=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},hl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],a=i+1<n.length,c=a?n[i+1]:0,l=i+2<n.length,d=l?n[i+2]:0,p=s>>2,y=(s&3)<<4|c>>4;let v=(c&15)<<2|d>>6,S=d&63;l||(S=64,a||(v=64)),r.push(t[p],t[y],t[v],t[S])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(ll(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):zf(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;const d=i<n.length?t[n.charAt(i)]:64;++i;const y=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||d==null||y==null)throw new Gf;const v=s<<2|c>>4;if(r.push(v),d!==64){const S=c<<4&240|d>>2;if(r.push(S),y!==64){const C=d<<6&192|y;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Gf extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Hf=function(n){const e=ll(n);return hl.encodeByteArray(e,!0)},oi=function(n){return Hf(n).replace(/\./g,"")},dl=function(n){try{return hl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wf(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kf=()=>Wf().__FIREBASE_DEFAULTS__,Qf=()=>{if(typeof process>"u"||typeof vc>"u")return;const n=vc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Yf=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&dl(n[1]);return e&&JSON.parse(e)},Pi=()=>{try{return qf()||Kf()||Qf()||Yf()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},fl=n=>{var e,t;return(t=(e=Pi())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Jf=n=>{const e=fl(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},pl=()=>{var n;return(n=Pi())===null||n===void 0?void 0:n.config},ml=n=>{var e;return(e=Pi())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xf{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pr(n){return n.endsWith(".cloudworkstations.dev")}async function gl(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zf(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[oi(JSON.stringify(t)),oi(JSON.stringify(a)),""].join(".")}const Yn={};function ep(){const n={prod:[],emulator:[]};for(const e of Object.keys(Yn))Yn[e]?n.emulator.push(e):n.prod.push(e);return n}function tp(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Ic=!1;function Ci(n,e){if(typeof window>"u"||typeof document>"u"||!pr(window.location.host)||Yn[n]===e||Yn[n]||Ic)return;Yn[n]=e;function t(v){return`__firebase__banner__${v}`}const r="__firebase__banner",s=ep().prod.length>0;function a(){const v=document.getElementById(r);v&&v.remove()}function c(v){v.style.display="flex",v.style.background="#7faaf0",v.style.position="fixed",v.style.bottom="5px",v.style.left="5px",v.style.padding=".5em",v.style.borderRadius="5px",v.style.alignItems="center"}function l(v,S){v.setAttribute("width","24"),v.setAttribute("id",S),v.setAttribute("height","24"),v.setAttribute("viewBox","0 0 24 24"),v.setAttribute("fill","none"),v.style.marginLeft="-6px"}function d(){const v=document.createElement("span");return v.style.cursor="pointer",v.style.marginLeft="16px",v.style.fontSize="24px",v.innerHTML=" &times;",v.onclick=()=>{Ic=!0,a()},v}function p(v,S){v.setAttribute("id",S),v.innerText="Learn more",v.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",v.setAttribute("target","__blank"),v.style.paddingLeft="5px",v.style.textDecoration="underline"}function y(){const v=tp(r),S=t("text"),C=document.getElementById(S)||document.createElement("span"),O=t("learnmore"),D=document.getElementById(O)||document.createElement("a"),H=t("preprendIcon"),B=document.getElementById(H)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(v.created){const $=v.element;c($),p(D,O);const X=d();l(B,H),$.append(B,C,D,X),document.body.appendChild($)}s?(C.innerText="Preview backend disconnected.",B.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(B.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",S)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",y):y()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ie(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function np(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ie())}function rp(){var n;const e=(n=Pi())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function ip(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function mo(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function sp(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function op(){const n=Ie();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function ap(){return!rp()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function go(){try{return typeof indexedDB=="object"}catch{return!1}}function _o(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}function _l(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cp="FirebaseError";class Be extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=cp,Object.setPrototypeOf(this,Be.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Wt.prototype.create)}}class Wt{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?up(s,r):"Error",c=`${this.serviceName}: ${a} (${i}).`;return new Be(i,c,r)}}function up(n,e){return n.replace(lp,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const lp=/\{\$([^}]+)}/g;function hp(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Tt(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],a=e[i];if(Ec(s)&&Ec(a)){if(!Tt(s,a))return!1}else if(s!==a)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Ec(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function zn(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Gn(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function dp(n,e){const t=new fp(n,e);return t.subscribe.bind(t)}class fp{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");pp(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Rs),i.error===void 0&&(i.error=Rs),i.complete===void 0&&(i.complete=Rs);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function pp(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Rs(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mp=1e3,gp=2,_p=4*60*60*1e3,yp=.5;function Tc(n,e=mp,t=gp){const r=e*Math.pow(t,n),i=Math.round(yp*r*(Math.random()-.5)*2);return Math.min(_p,r+i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(n){return n&&n._delegate?n._delegate:n}class Fe{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ft="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vp{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Xf;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ep(e))try{this.getOrInitializeService({instanceIdentifier:Ft})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Ft){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ft){return this.instances.has(e)}getOptions(e=Ft){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);r===c&&a.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Ip(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Ft){return this.component?this.component.multipleInstances?e:Ft:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ip(n){return n===Ft?void 0:n}function Ep(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tp{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new vp(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var q;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(q||(q={}));const wp={debug:q.DEBUG,verbose:q.VERBOSE,info:q.INFO,warn:q.WARN,error:q.ERROR,silent:q.SILENT},Ap=q.INFO,Rp={[q.DEBUG]:"log",[q.VERBOSE]:"log",[q.INFO]:"info",[q.WARN]:"warn",[q.ERROR]:"error"},Sp=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=Rp[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ki{constructor(e){this.name=e,this._logLevel=Ap,this._logHandler=Sp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?wp[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,q.DEBUG,...e),this._logHandler(this,q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,q.VERBOSE,...e),this._logHandler(this,q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,q.INFO,...e),this._logHandler(this,q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,q.WARN,...e),this._logHandler(this,q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,q.ERROR,...e),this._logHandler(this,q.ERROR,...e)}}const bp=(n,e)=>e.some(t=>n instanceof t);let wc,Ac;function Pp(){return wc||(wc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Cp(){return Ac||(Ac=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const yl=new WeakMap,js=new WeakMap,vl=new WeakMap,Ss=new WeakMap,yo=new WeakMap;function kp(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",a)},s=()=>{t(_t(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&yl.set(t,n)}).catch(()=>{}),yo.set(e,n),e}function Dp(n){if(js.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",a),n.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",a),n.addEventListener("abort",a)});js.set(n,e)}let $s={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return js.get(n);if(e==="objectStoreNames")return n.objectStoreNames||vl.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return _t(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Vp(n){$s=n($s)}function Np(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(bs(this),e,...t);return vl.set(r,e.sort?e.sort():[e]),_t(r)}:Cp().includes(n)?function(...e){return n.apply(bs(this),e),_t(yl.get(this))}:function(...e){return _t(n.apply(bs(this),e))}}function Op(n){return typeof n=="function"?Np(n):(n instanceof IDBTransaction&&Dp(n),bp(n,Pp())?new Proxy(n,$s):n)}function _t(n){if(n instanceof IDBRequest)return kp(n);if(Ss.has(n))return Ss.get(n);const e=Op(n);return e!==n&&(Ss.set(n,e),yo.set(e,n)),e}const bs=n=>yo.get(n);function Il(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const a=indexedDB.open(n,e),c=_t(a);return r&&a.addEventListener("upgradeneeded",l=>{r(_t(a.result),l.oldVersion,l.newVersion,_t(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const Lp=["get","getKey","getAll","getAllKeys","count"],Mp=["put","add","delete","clear"],Ps=new Map;function Rc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Ps.get(e))return Ps.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=Mp.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Lp.includes(t)))return;const s=async function(a,...c){const l=this.transaction(a,i?"readwrite":"readonly");let d=l.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),i&&l.done]))[0]};return Ps.set(e,s),s}Vp(n=>({...n,get:(e,t,r)=>Rc(e,t)||n.get(e,t,r),has:(e,t)=>!!Rc(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Fp(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Fp(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const qs="@firebase/app",Sc="0.12.3";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nt=new ki("@firebase/app"),Up="@firebase/app-compat",Bp="@firebase/analytics-compat",jp="@firebase/analytics",$p="@firebase/app-check-compat",qp="@firebase/app-check",zp="@firebase/auth",Gp="@firebase/auth-compat",Hp="@firebase/database",Wp="@firebase/data-connect",Kp="@firebase/database-compat",Qp="@firebase/functions",Yp="@firebase/functions-compat",Jp="@firebase/installations",Xp="@firebase/installations-compat",Zp="@firebase/messaging",em="@firebase/messaging-compat",tm="@firebase/performance",nm="@firebase/performance-compat",rm="@firebase/remote-config",im="@firebase/remote-config-compat",sm="@firebase/storage",om="@firebase/storage-compat",am="@firebase/firestore",cm="@firebase/vertexai",um="@firebase/firestore-compat",lm="firebase",hm="11.7.3";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zs="[DEFAULT]",dm={[qs]:"fire-core",[Up]:"fire-core-compat",[jp]:"fire-analytics",[Bp]:"fire-analytics-compat",[qp]:"fire-app-check",[$p]:"fire-app-check-compat",[zp]:"fire-auth",[Gp]:"fire-auth-compat",[Hp]:"fire-rtdb",[Wp]:"fire-data-connect",[Kp]:"fire-rtdb-compat",[Qp]:"fire-fn",[Yp]:"fire-fn-compat",[Jp]:"fire-iid",[Xp]:"fire-iid-compat",[Zp]:"fire-fcm",[em]:"fire-fcm-compat",[tm]:"fire-perf",[nm]:"fire-perf-compat",[rm]:"fire-rc",[im]:"fire-rc-compat",[sm]:"fire-gcs",[om]:"fire-gcs-compat",[am]:"fire-fst",[um]:"fire-fst-compat",[cm]:"fire-vertex","fire-js":"fire-js",[lm]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rr=new Map,fm=new Map,Gs=new Map;function bc(n,e){try{n.container.addComponent(e)}catch(t){nt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ge(n){const e=n.name;if(Gs.has(e))return nt.debug(`There were multiple attempts to register component ${e}.`),!1;Gs.set(e,n);for(const t of rr.values())bc(t,n);for(const t of fm.values())bc(t,n);return!0}function Kt(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function De(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pm={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},yt=new Wt("app","Firebase",pm);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mm{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Fe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw yt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vn=hm;function El(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:zs,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw yt.create("bad-app-name",{appName:String(i)});if(t||(t=pl()),!t)throw yt.create("no-options");const s=rr.get(i);if(s){if(Tt(t,s.options)&&Tt(r,s.config))return s;throw yt.create("duplicate-app",{appName:i})}const a=new Tp(i);for(const l of Gs.values())a.addComponent(l);const c=new mm(t,r,a);return rr.set(i,c),c}function vo(n=zs){const e=rr.get(n);if(!e&&n===zs&&pl())return El();if(!e)throw yt.create("no-app",{appName:n});return e}function Pc(){return Array.from(rr.values())}function Ve(n,e,t){var r;let i=(r=dm[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){const c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),nt.warn(c.join(" "));return}Ge(new Fe(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gm="firebase-heartbeat-database",_m=1,ir="firebase-heartbeat-store";let Cs=null;function Tl(){return Cs||(Cs=Il(gm,_m,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ir)}catch(t){console.warn(t)}}}}).catch(n=>{throw yt.create("idb-open",{originalErrorMessage:n.message})})),Cs}async function ym(n){try{const t=(await Tl()).transaction(ir),r=await t.objectStore(ir).get(wl(n));return await t.done,r}catch(e){if(e instanceof Be)nt.warn(e.message);else{const t=yt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});nt.warn(t.message)}}}async function Cc(n,e){try{const r=(await Tl()).transaction(ir,"readwrite");await r.objectStore(ir).put(e,wl(n)),await r.done}catch(t){if(t instanceof Be)nt.warn(t.message);else{const r=yt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});nt.warn(r.message)}}}function wl(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vm=1024,Im=30;class Em{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new wm(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=kc();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>Im){const a=Am(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){nt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=kc(),{heartbeatsToSend:r,unsentEntries:i}=Tm(this._heartbeatsCache.heartbeats),s=oi(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return nt.warn(t),""}}}function kc(){return new Date().toISOString().substring(0,10)}function Tm(n,e=vm){const t=[];let r=n.slice();for(const i of n){const s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),Dc(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Dc(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class wm{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return go()?_o().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await ym(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Cc(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Cc(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Dc(n){return oi(JSON.stringify({version:2,heartbeats:n})).length}function Am(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rm(n){Ge(new Fe("platform-logger",e=>new xp(e),"PRIVATE")),Ge(new Fe("heartbeat",e=>new Em(e),"PRIVATE")),Ve(qs,Sc,n),Ve(qs,Sc,"esm2017"),Ve("fire-js","")}Rm("");function Io(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function Al(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Sm=Al,Rl=new Wt("auth","Firebase",Al());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ai=new ki("@firebase/auth");function bm(n,...e){ai.logLevel<=q.WARN&&ai.warn(`Auth (${vn}): ${n}`,...e)}function Qr(n,...e){ai.logLevel<=q.ERROR&&ai.error(`Auth (${vn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ne(n,...e){throw To(n,...e)}function Me(n,...e){return To(n,...e)}function Eo(n,e,t){const r=Object.assign(Object.assign({},Sm()),{[e]:t});return new Wt("auth","Firebase",r).create(e,{appName:n.name})}function vt(n){return Eo(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Pm(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&Ne(n,"argument-error"),Eo(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function To(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Rl.create(n,...e)}function L(n,e,...t){if(!n)throw To(e,...t)}function Xe(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Qr(e),new Error(e)}function rt(n,e){n||Xe(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hs(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Cm(){return Vc()==="http:"||Vc()==="https:"}function Vc(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function km(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Cm()||mo()||"connection"in navigator)?navigator.onLine:!0}function Dm(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(e,t){this.shortDelay=e,this.longDelay=t,rt(t>e,"Short delay should be less than long delay!"),this.isMobile=np()||sp()}get(){return km()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wo(n,e){rt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sl{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Xe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Xe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Xe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vm={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nm=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Om=new gr(3e4,6e4);function Ct(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function ot(n,e,t,r,i={}){return bl(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});const c=mr(Object.assign({key:n.config.apiKey},a)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:l},s);return ip()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&pr(n.emulatorConfig.host)&&(d.credentials="include"),Sl.fetch()(await Pl(n,n.config.apiHost,t,c),d)})}async function bl(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},Vm),e);try{const i=new Mm(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw qr(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const c=s.ok?a.errorMessage:a.error.message,[l,d]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw qr(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw qr(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw qr(n,"user-disabled",a);const p=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Eo(n,p,d);Ne(n,p)}}catch(i){if(i instanceof Be)throw i;Ne(n,"network-request-failed",{message:String(i)})}}async function Di(n,e,t,r,i={}){const s=await ot(n,e,t,r,i);return"mfaPendingCredential"in s&&Ne(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function Pl(n,e,t,r){const i=`${e}${t}?${r}`,s=n,a=s.config.emulator?wo(n.config,i):`${n.config.apiScheme}://${i}`;return Nm.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}function Lm(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Mm{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Me(this.auth,"network-request-failed")),Om.get())})}}function qr(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=Me(n,e,r);return i.customData._tokenResponse=t,i}function Nc(n){return n!==void 0&&n.enterprise!==void 0}class xm{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Lm(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Fm(n,e){return ot(n,"GET","/v2/recaptchaConfig",Ct(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Um(n,e){return ot(n,"POST","/v1/accounts:delete",e)}async function ci(n,e){return ot(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Bm(n,e=!1){const t=se(n),r=await t.getIdToken(e),i=Ao(r);L(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,a=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Jn(ks(i.auth_time)),issuedAtTime:Jn(ks(i.iat)),expirationTime:Jn(ks(i.exp)),signInProvider:a||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function ks(n){return Number(n)*1e3}function Ao(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Qr("JWT malformed, contained fewer than 3 sections"),null;try{const i=dl(t);return i?JSON.parse(i):(Qr("Failed to decode base64 JWT payload"),null)}catch(i){return Qr("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Oc(n){const e=Ao(n);return L(e,"internal-error"),L(typeof e.exp<"u","internal-error"),L(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Be&&jm(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function jm({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $m{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ws{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Jn(this.lastLoginAt),this.creationTime=Jn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ui(n){var e;const t=n.auth,r=await n.getIdToken(),i=await sr(n,ci(t,{idToken:r}));L(i==null?void 0:i.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const a=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Cl(s.providerUserInfo):[],c=zm(n.providerData,a),l=n.isAnonymous,d=!(n.email&&s.passwordHash)&&!(c!=null&&c.length),p=l?d:!1,y={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new Ws(s.createdAt,s.lastLoginAt),isAnonymous:p};Object.assign(n,y)}async function qm(n){const e=se(n);await ui(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function zm(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Cl(n){return n.map(e=>{var{providerId:t}=e,r=Io(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gm(n,e){const t=await bl(n,{},async()=>{const r=mr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=await Pl(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Sl.fetch()(a,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Hm(n,e){return ot(n,"POST","/v2/accounts:revokeToken",Ct(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){L(e.idToken,"internal-error"),L(typeof e.idToken<"u","internal-error"),L(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Oc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){L(e.length!==0,"internal-error");const t=Oc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(L(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await Gm(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new on;return r&&(L(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(L(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(L(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new on,this.toJSON())}_performRefresh(){return Xe("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(n,e){L(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Le{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=Io(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new $m(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Ws(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await sr(this,this.stsTokenManager.getToken(this.auth,e));return L(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Bm(this,e)}reload(){return qm(this)}_assign(e){this!==e&&(L(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Le(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){L(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ui(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(De(this.auth.app))return Promise.reject(vt(this.auth));const e=await this.getIdToken();return await sr(this,Um(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,a,c,l,d,p;const y=(r=t.displayName)!==null&&r!==void 0?r:void 0,v=(i=t.email)!==null&&i!==void 0?i:void 0,S=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,C=(a=t.photoURL)!==null&&a!==void 0?a:void 0,O=(c=t.tenantId)!==null&&c!==void 0?c:void 0,D=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,H=(d=t.createdAt)!==null&&d!==void 0?d:void 0,B=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:$,emailVerified:X,isAnonymous:ke,providerData:te,stsTokenManager:E}=t;L($&&E,e,"internal-error");const m=on.fromJSON(this.name,E);L(typeof $=="string",e,"internal-error"),ht(y,e.name),ht(v,e.name),L(typeof X=="boolean",e,"internal-error"),L(typeof ke=="boolean",e,"internal-error"),ht(S,e.name),ht(C,e.name),ht(O,e.name),ht(D,e.name),ht(H,e.name),ht(B,e.name);const _=new Le({uid:$,auth:e,email:v,emailVerified:X,displayName:y,isAnonymous:ke,photoURL:C,phoneNumber:S,tenantId:O,stsTokenManager:m,createdAt:H,lastLoginAt:B});return te&&Array.isArray(te)&&(_.providerData=te.map(I=>Object.assign({},I))),D&&(_._redirectEventId=D),_}static async _fromIdTokenResponse(e,t,r=!1){const i=new on;i.updateFromServerResponse(t);const s=new Le({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await ui(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];L(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Cl(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new on;c.updateFromIdToken(r);const l=new Le({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Ws(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(l,d),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lc=new Map;function Ze(n){rt(n instanceof Function,"Expected a class definition");let e=Lc.get(n);return e?(rt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Lc.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kl{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}kl.type="NONE";const Mc=kl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yr(n,e,t){return`firebase:${n}:${e}:${t}`}class an{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Yr(this.userKey,i.apiKey,s),this.fullPersistenceKey=Yr("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ci(this.auth,{idToken:e}).catch(()=>{});return t?Le._fromGetAccountInfoResponse(this.auth,t,e):null}return Le._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new an(Ze(Mc),e,r);const i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let s=i[0]||Ze(Mc);const a=Yr(r,e.config.apiKey,e.name);let c=null;for(const d of t)try{const p=await d._get(a);if(p){let y;if(typeof p=="string"){const v=await ci(e,{idToken:p}).catch(()=>{});if(!v)break;y=await Le._fromGetAccountInfoResponse(e,v,p)}else y=Le._fromJSON(e,p);d!==s&&(c=y),s=d;break}}catch{}const l=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new an(s,e,r):(s=l[0],c&&await s._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(a)}catch{}})),new an(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xc(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Ol(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Dl(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ml(e))return"Blackberry";if(xl(e))return"Webos";if(Vl(e))return"Safari";if((e.includes("chrome/")||Nl(e))&&!e.includes("edge/"))return"Chrome";if(Ll(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Dl(n=Ie()){return/firefox\//i.test(n)}function Vl(n=Ie()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Nl(n=Ie()){return/crios\//i.test(n)}function Ol(n=Ie()){return/iemobile/i.test(n)}function Ll(n=Ie()){return/android/i.test(n)}function Ml(n=Ie()){return/blackberry/i.test(n)}function xl(n=Ie()){return/webos/i.test(n)}function Ro(n=Ie()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Wm(n=Ie()){var e;return Ro(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Km(){return op()&&document.documentMode===10}function Fl(n=Ie()){return Ro(n)||Ll(n)||xl(n)||Ml(n)||/windows phone/i.test(n)||Ol(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ul(n,e=[]){let t;switch(n){case"Browser":t=xc(Ie());break;case"Worker":t=`${xc(Ie())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${vn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qm{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((a,c)=>{try{const l=e(s);a(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ym(n,e={}){return ot(n,"GET","/v2/passwordPolicy",Ct(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jm=6;class Xm{constructor(e){var t,r,i,s;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:Jm,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,a,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsUppercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(a=l.containsNumericCharacter)!==null&&a!==void 0?a:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zm{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Fc(this),this.idTokenSubscription=new Fc(this),this.beforeStateQueue=new Qm(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Rl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ze(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await an.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ci(this,{idToken:e}),r=await Le._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(De(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(e);(!a||a===c)&&(l!=null&&l.user)&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return L(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ui(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Dm()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(De(this.app))return Promise.reject(vt(this));const t=e?se(e):null;return t&&L(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&L(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return De(this.app)?Promise.reject(vt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return De(this.app)?Promise.reject(vt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ze(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Ym(this),t=new Xm(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Wt("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Hm(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ze(e)||this._popupRedirectResolver;L(t,this,"argument-error"),this.redirectPersistenceManager=await an.create(this,[Ze(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(L(c,this,"internal-error"),c.then(()=>{a||s(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,i);return()=>{a=!0,l()}}else{const l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return L(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ul(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;if(De(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&bm(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function kt(n){return se(n)}class Fc{constructor(e){this.auth=e,this.observer=null,this.addObserver=dp(t=>this.observer=t)}get next(){return L(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vi={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function eg(n){Vi=n}function Bl(n){return Vi.loadJS(n)}function tg(){return Vi.recaptchaEnterpriseScript}function ng(){return Vi.gapiScript}function rg(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class ig{constructor(){this.enterprise=new sg}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class sg{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const og="recaptcha-enterprise",jl="NO_RECAPTCHA";class ag{constructor(e){this.type=og,this.auth=kt(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,c)=>{Fm(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new xm(l);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,a(d.siteKey)}}).catch(l=>{c(l)})})}function i(s,a,c){const l=window.grecaptcha;Nc(l)?l.enterprise.ready(()=>{l.enterprise.execute(s,{action:e}).then(d=>{a(d)}).catch(()=>{a(jl)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new ig().execute("siteKey",{action:"verify"}):new Promise((s,a)=>{r(this.auth).then(c=>{if(!t&&Nc(window.grecaptcha))i(c,s,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let l=tg();l.length!==0&&(l+=c),Bl(l).then(()=>{i(c,s,a)}).catch(d=>{a(d)})}}).catch(c=>{a(c)})})}}async function Uc(n,e,t,r=!1,i=!1){const s=new ag(n);let a;if(i)a=jl;else try{a=await s.verify(t)}catch{a=await s.verify(t,!0)}const c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const l=c.phoneEnrollmentInfo.phoneNumber,d=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Ks(n,e,t,r,i){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await Uc(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await Uc(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cg(n,e){const t=Kt(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(Tt(s,e??{}))return i;Ne(i,"already-initialized")}return t.initialize({options:e})}function ug(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Ze);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function lg(n,e,t){const r=kt(n);L(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=$l(e),{host:a,port:c}=hg(e),l=c===null?"":`:${c}`,d={url:`${s}//${a}${l}/`},p=Object.freeze({host:a,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){L(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),L(Tt(d,r.config.emulator)&&Tt(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,pr(a)?(Ci("Auth",!0),gl(`${s}//${a}${l}`)):dg()}function $l(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function hg(n){const e=$l(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Bc(r.substr(s.length+1))}}else{const[s,a]=r.split(":");return{host:s,port:Bc(a)}}}function Bc(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function dg(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Xe("not implemented")}_getIdTokenResponse(e){return Xe("not implemented")}_linkToIdToken(e,t){return Xe("not implemented")}_getReauthenticationResolver(e){return Xe("not implemented")}}async function fg(n,e){return ot(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pg(n,e){return Di(n,"POST","/v1/accounts:signInWithPassword",Ct(n,e))}async function mg(n,e){return ot(n,"POST","/v1/accounts:sendOobCode",Ct(n,e))}async function gg(n,e){return mg(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _g(n,e){return Di(n,"POST","/v1/accounts:signInWithEmailLink",Ct(n,e))}async function yg(n,e){return Di(n,"POST","/v1/accounts:signInWithEmailLink",Ct(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or extends So{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new or(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new or(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ks(e,t,"signInWithPassword",pg);case"emailLink":return _g(e,{email:this._email,oobCode:this._password});default:Ne(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ks(e,r,"signUpPassword",fg);case"emailLink":return yg(e,{idToken:t,email:this._email,oobCode:this._password});default:Ne(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cn(n,e){return Di(n,"POST","/v1/accounts:signInWithIdp",Ct(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vg="http://localhost";class $t extends So{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new $t(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ne("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=Io(t,["providerId","signInMethod"]);if(!r||!i)return null;const a=new $t(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return cn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,cn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,cn(e,t)}buildRequest(){const e={requestUri:vg,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=mr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ig(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Eg(n){const e=zn(Gn(n)).link,t=e?zn(Gn(e)).deep_link_id:null,r=zn(Gn(n)).deep_link_id;return(r?zn(Gn(r)).link:null)||r||t||e||n}class bo{constructor(e){var t,r,i,s,a,c;const l=zn(Gn(e)),d=(t=l.apiKey)!==null&&t!==void 0?t:null,p=(r=l.oobCode)!==null&&r!==void 0?r:null,y=Ig((i=l.mode)!==null&&i!==void 0?i:null);L(d&&p&&y,"argument-error"),this.apiKey=d,this.operation=y,this.code=p,this.continueUrl=(s=l.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(a=l.lang)!==null&&a!==void 0?a:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=Eg(e);try{return new bo(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{constructor(){this.providerId=In.PROVIDER_ID}static credential(e,t){return or._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=bo.parseLink(t);return L(r,"argument-error"),or._fromEmailAndCode(e,r.code,r.tenantId)}}In.PROVIDER_ID="password";In.EMAIL_PASSWORD_SIGN_IN_METHOD="password";In.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r extends Po{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft extends _r{constructor(){super("facebook.com")}static credential(e){return $t._fromParams({providerId:ft.PROVIDER_ID,signInMethod:ft.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ft.credentialFromTaggedObject(e)}static credentialFromError(e){return ft.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ft.credential(e.oauthAccessToken)}catch{return null}}}ft.FACEBOOK_SIGN_IN_METHOD="facebook.com";ft.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je extends _r{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return $t._fromParams({providerId:Je.PROVIDER_ID,signInMethod:Je.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Je.credentialFromTaggedObject(e)}static credentialFromError(e){return Je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Je.credential(t,r)}catch{return null}}}Je.GOOGLE_SIGN_IN_METHOD="google.com";Je.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt extends _r{constructor(){super("github.com")}static credential(e){return $t._fromParams({providerId:pt.PROVIDER_ID,signInMethod:pt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return pt.credentialFromTaggedObject(e)}static credentialFromError(e){return pt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return pt.credential(e.oauthAccessToken)}catch{return null}}}pt.GITHUB_SIGN_IN_METHOD="github.com";pt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt extends _r{constructor(){super("twitter.com")}static credential(e,t){return $t._fromParams({providerId:mt.PROVIDER_ID,signInMethod:mt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return mt.credentialFromTaggedObject(e)}static credentialFromError(e){return mt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return mt.credential(t,r)}catch{return null}}}mt.TWITTER_SIGN_IN_METHOD="twitter.com";mt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await Le._fromIdTokenResponse(e,r,i),a=jc(r);return new hn({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=jc(r);return new hn({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function jc(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li extends Be{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,li.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new li(e,t,r,i)}}function ql(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?li._fromErrorAndOperation(n,s,e,r):s})}async function Tg(n,e,t=!1){const r=await sr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return hn._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wg(n,e,t=!1){const{auth:r}=n;if(De(r.app))return Promise.reject(vt(r));const i="reauthenticate";try{const s=await sr(n,ql(r,i,e,n),t);L(s.idToken,r,"internal-error");const a=Ao(s.idToken);L(a,r,"internal-error");const{sub:c}=a;return L(n.uid===c,r,"user-mismatch"),hn._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&Ne(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zl(n,e,t=!1){if(De(n.app))return Promise.reject(vt(n));const r="signIn",i=await ql(n,r,e),s=await hn._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function Ag(n,e){return zl(kt(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rg(n,e,t){var r;L(((r=t.url)===null||r===void 0?void 0:r.length)>0,n,"invalid-continue-uri"),L(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),L(typeof t.linkDomain>"u"||t.linkDomain.length>0,n,"invalid-hosting-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.linkDomain=t.linkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(L(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(L(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sg(n){const e=kt(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function bg(n,e,t){return De(n.app)?Promise.reject(vt(n)):Ag(se(n),In.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Sg(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pg(n,e,t){const r=kt(n),i={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function s(a,c){L(c.handleCodeInApp,r,"argument-error"),c&&Rg(r,a,c)}s(i,t),await Ks(r,i,"getOobCode",gg)}function Cg(n,e,t,r){return se(n).onIdTokenChanged(e,t,r)}function kg(n,e,t){return se(n).beforeAuthStateChanged(e,t)}function Dg(n,e,t,r){return se(n).onAuthStateChanged(e,t,r)}function Vg(n){return se(n).signOut()}const hi="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gl{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(hi,"1"),this.storage.removeItem(hi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ng=1e3,Og=10;class Hl extends Gl{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Fl(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);Km()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Og):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Ng)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Hl.type="LOCAL";const Lg=Hl;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wl extends Gl{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Wl.type="SESSION";const Kl=Wl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mg(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new Ni(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(a).map(async d=>d(t.origin,s)),l=await Mg(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ni.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Co(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xg{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((c,l)=>{const d=Co("",20);i.port1.start();const p=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(y){const v=y;if(v.data.eventId===d)switch(v.data.status){case"ack":clearTimeout(p),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(v.data.response);break;default:clearTimeout(p),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $e(){return window}function Fg(n){$e().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ql(){return typeof $e().WorkerGlobalScope<"u"&&typeof $e().importScripts=="function"}async function Ug(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Bg(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function jg(){return Ql()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yl="firebaseLocalStorageDb",$g=1,di="firebaseLocalStorage",Jl="fbase_key";class yr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Oi(n,e){return n.transaction([di],e?"readwrite":"readonly").objectStore(di)}function qg(){const n=indexedDB.deleteDatabase(Yl);return new yr(n).toPromise()}function Qs(){const n=indexedDB.open(Yl,$g);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(di,{keyPath:Jl})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(di)?e(r):(r.close(),await qg(),e(await Qs()))})})}async function $c(n,e,t){const r=Oi(n,!0).put({[Jl]:e,value:t});return new yr(r).toPromise()}async function zg(n,e){const t=Oi(n,!1).get(e),r=await new yr(t).toPromise();return r===void 0?null:r.value}function qc(n,e){const t=Oi(n,!0).delete(e);return new yr(t).toPromise()}const Gg=800,Hg=3;class Xl{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Qs(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Hg)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Ql()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ni._getInstance(jg()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Ug(),!this.activeServiceWorker)return;this.sender=new xg(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Bg()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Qs();return await $c(e,hi,"1"),await qc(e,hi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>$c(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>zg(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>qc(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Oi(i,!1).getAll();return new yr(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Gg)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Xl.type="LOCAL";const Wg=Xl;new gr(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zl(n,e){return e?Ze(e):(L(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko extends So{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return cn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return cn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return cn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Kg(n){return zl(n.auth,new ko(n),n.bypassAuthState)}function Qg(n){const{auth:e,user:t}=n;return L(t,e,"internal-error"),wg(t,new ko(n),n.bypassAuthState)}async function Yg(n){const{auth:e,user:t}=n;return L(t,e,"internal-error"),Tg(t,new ko(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:c}=e;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Kg;case"linkViaPopup":case"linkViaRedirect":return Yg;case"reauthViaPopup":case"reauthViaRedirect":return Qg;default:Ne(this.auth,"internal-error")}}resolve(e){rt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){rt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jg=new gr(2e3,1e4);async function zc(n,e,t){if(De(n.app))return Promise.reject(Me(n,"operation-not-supported-in-this-environment"));const r=kt(n);Pm(n,e,Po);const i=Zl(r,t);return new Ut(r,"signInViaPopup",e,i).executeNotNull()}class Ut extends eh{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,Ut.currentPopupAction&&Ut.currentPopupAction.cancel(),Ut.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return L(e,this.auth,"internal-error"),e}async onExecution(){rt(this.filter.length===1,"Popup operations only handle one event");const e=Co();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Me(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Me(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ut.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Me(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Jg.get())};e()}}Ut.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xg="pendingRedirect",Jr=new Map;class Zg extends eh{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Jr.get(this.auth._key());if(!e){try{const r=await e_(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Jr.set(this.auth._key(),e)}return this.bypassAuthState||Jr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function e_(n,e){const t=r_(e),r=n_(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function t_(n,e){Jr.set(n._key(),e)}function n_(n){return Ze(n._redirectPersistence)}function r_(n){return Yr(Xg,n.config.apiKey,n.name)}async function i_(n,e,t=!1){if(De(n.app))return Promise.reject(vt(n));const r=kt(n),i=Zl(r,e),a=await new Zg(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const s_=10*60*1e3;class o_{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!a_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!th(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Me(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=s_&&this.cachedEventUids.clear(),this.cachedEventUids.has(Gc(e))}saveEventToCache(e){this.cachedEventUids.add(Gc(e)),this.lastProcessedEventTime=Date.now()}}function Gc(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function th({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function a_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return th(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function c_(n,e={}){return ot(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,l_=/^https?/;async function h_(n){if(n.config.emulator)return;const{authorizedDomains:e}=await c_(n);for(const t of e)try{if(d_(t))return}catch{}Ne(n,"unauthorized-domain")}function d_(n){const e=Hs(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!l_.test(t))return!1;if(u_.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f_=new gr(3e4,6e4);function Hc(){const n=$e().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function p_(n){return new Promise((e,t)=>{var r,i,s;function a(){Hc(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Hc(),t(Me(n,"network-request-failed"))},timeout:f_.get()})}if(!((i=(r=$e().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=$e().gapi)===null||s===void 0)&&s.load)a();else{const c=rg("iframefcb");return $e()[c]=()=>{gapi.load?a():t(Me(n,"network-request-failed"))},Bl(`${ng()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw Xr=null,e})}let Xr=null;function m_(n){return Xr=Xr||p_(n),Xr}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g_=new gr(5e3,15e3),__="__/auth/iframe",y_="emulator/auth/iframe",v_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},I_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function E_(n){const e=n.config;L(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?wo(e,y_):`https://${n.config.authDomain}/${__}`,r={apiKey:e.apiKey,appName:n.name,v:vn},i=I_.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${mr(r).slice(1)}`}async function T_(n){const e=await m_(n),t=$e().gapi;return L(t,n,"internal-error"),e.open({where:document.body,url:E_(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:v_,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const a=Me(n,"network-request-failed"),c=$e().setTimeout(()=>{s(a)},g_.get());function l(){$e().clearTimeout(c),i(r)}r.ping(l).then(l,()=>{s(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},A_=500,R_=600,S_="_blank",b_="http://localhost";class Wc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function P_(n,e,t,r=A_,i=R_){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l=Object.assign(Object.assign({},w_),{width:r.toString(),height:i.toString(),top:s,left:a}),d=Ie().toLowerCase();t&&(c=Nl(d)?S_:t),Dl(d)&&(e=e||b_,l.scrollbars="yes");const p=Object.entries(l).reduce((v,[S,C])=>`${v}${S}=${C},`,"");if(Wm(d)&&c!=="_self")return C_(e||"",c),new Wc(null);const y=window.open(e||"",c,p);L(y,n,"popup-blocked");try{y.focus()}catch{}return new Wc(y)}function C_(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k_="__/auth/handler",D_="emulator/auth/handler",V_=encodeURIComponent("fac");async function Kc(n,e,t,r,i,s){L(n.config.authDomain,n,"auth-domain-config-required"),L(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:vn,eventId:i};if(e instanceof Po){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",hp(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,y]of Object.entries({}))a[p]=y}if(e instanceof _r){const p=e.getScopes().filter(y=>y!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const p of Object.keys(c))c[p]===void 0&&delete c[p];const l=await n._getAppCheckToken(),d=l?`#${V_}=${encodeURIComponent(l)}`:"";return`${N_(n)}?${mr(c).slice(1)}${d}`}function N_({config:n}){return n.emulator?wo(n,D_):`https://${n.authDomain}/${k_}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ds="webStorageSupport";class O_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Kl,this._completeRedirectFn=i_,this._overrideRedirectResult=t_}async _openPopup(e,t,r,i){var s;rt((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const a=await Kc(e,t,r,Hs(),i);return P_(e,a,Co())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await Kc(e,t,r,Hs(),i);return Fg(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(rt(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await T_(e),r=new o_(e);return t.register("authEvent",i=>(L(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ds,{type:Ds},i=>{var s;const a=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[Ds];a!==void 0&&t(!!a),Ne(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=h_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Fl()||Vl()||Ro()}}const L_=O_;var Qc="@firebase/auth",Yc="1.10.4";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M_{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){L(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x_(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function F_(n){Ge(new Fe("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;L(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ul(n)},d=new Zm(r,i,s,l);return ug(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Ge(new Fe("auth-internal",e=>{const t=kt(e.getProvider("auth").getImmediate());return(r=>new M_(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ve(Qc,Yc,x_(n)),Ve(Qc,Yc,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U_=5*60,B_=ml("authIdTokenMaxAge")||U_;let Jc=null;const j_=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>B_)return;const i=t==null?void 0:t.token;Jc!==i&&(Jc=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Xc(n=vo()){const e=Kt(n,"auth");if(e.isInitialized())return e.getImmediate();const t=cg(n,{popupRedirectResolver:L_,persistence:[Wg,Lg,Kl]}),r=ml("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const a=j_(s.toString());kg(t,a,()=>a(t.currentUser)),Cg(t,c=>a(c))}}const i=fl("auth");return i?lg(t,`http://${i}`):Ci("Auth",!1),t}function $_(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}eg({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=Me("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",$_().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});F_("Browser");var q_="firebase",z_="11.7.3";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ve(q_,z_,"app");var Zc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var It,nh;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,m){function _(){}_.prototype=m.prototype,E.D=m.prototype,E.prototype=new _,E.prototype.constructor=E,E.C=function(I,T,A){for(var g=Array(arguments.length-2),Ke=2;Ke<arguments.length;Ke++)g[Ke-2]=arguments[Ke];return m.prototype[T].apply(I,g)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,m,_){_||(_=0);var I=Array(16);if(typeof m=="string")for(var T=0;16>T;++T)I[T]=m.charCodeAt(_++)|m.charCodeAt(_++)<<8|m.charCodeAt(_++)<<16|m.charCodeAt(_++)<<24;else for(T=0;16>T;++T)I[T]=m[_++]|m[_++]<<8|m[_++]<<16|m[_++]<<24;m=E.g[0],_=E.g[1],T=E.g[2];var A=E.g[3],g=m+(A^_&(T^A))+I[0]+3614090360&4294967295;m=_+(g<<7&4294967295|g>>>25),g=A+(T^m&(_^T))+I[1]+3905402710&4294967295,A=m+(g<<12&4294967295|g>>>20),g=T+(_^A&(m^_))+I[2]+606105819&4294967295,T=A+(g<<17&4294967295|g>>>15),g=_+(m^T&(A^m))+I[3]+3250441966&4294967295,_=T+(g<<22&4294967295|g>>>10),g=m+(A^_&(T^A))+I[4]+4118548399&4294967295,m=_+(g<<7&4294967295|g>>>25),g=A+(T^m&(_^T))+I[5]+1200080426&4294967295,A=m+(g<<12&4294967295|g>>>20),g=T+(_^A&(m^_))+I[6]+2821735955&4294967295,T=A+(g<<17&4294967295|g>>>15),g=_+(m^T&(A^m))+I[7]+4249261313&4294967295,_=T+(g<<22&4294967295|g>>>10),g=m+(A^_&(T^A))+I[8]+1770035416&4294967295,m=_+(g<<7&4294967295|g>>>25),g=A+(T^m&(_^T))+I[9]+2336552879&4294967295,A=m+(g<<12&4294967295|g>>>20),g=T+(_^A&(m^_))+I[10]+4294925233&4294967295,T=A+(g<<17&4294967295|g>>>15),g=_+(m^T&(A^m))+I[11]+2304563134&4294967295,_=T+(g<<22&4294967295|g>>>10),g=m+(A^_&(T^A))+I[12]+1804603682&4294967295,m=_+(g<<7&4294967295|g>>>25),g=A+(T^m&(_^T))+I[13]+4254626195&4294967295,A=m+(g<<12&4294967295|g>>>20),g=T+(_^A&(m^_))+I[14]+2792965006&4294967295,T=A+(g<<17&4294967295|g>>>15),g=_+(m^T&(A^m))+I[15]+1236535329&4294967295,_=T+(g<<22&4294967295|g>>>10),g=m+(T^A&(_^T))+I[1]+4129170786&4294967295,m=_+(g<<5&4294967295|g>>>27),g=A+(_^T&(m^_))+I[6]+3225465664&4294967295,A=m+(g<<9&4294967295|g>>>23),g=T+(m^_&(A^m))+I[11]+643717713&4294967295,T=A+(g<<14&4294967295|g>>>18),g=_+(A^m&(T^A))+I[0]+3921069994&4294967295,_=T+(g<<20&4294967295|g>>>12),g=m+(T^A&(_^T))+I[5]+3593408605&4294967295,m=_+(g<<5&4294967295|g>>>27),g=A+(_^T&(m^_))+I[10]+38016083&4294967295,A=m+(g<<9&4294967295|g>>>23),g=T+(m^_&(A^m))+I[15]+3634488961&4294967295,T=A+(g<<14&4294967295|g>>>18),g=_+(A^m&(T^A))+I[4]+3889429448&4294967295,_=T+(g<<20&4294967295|g>>>12),g=m+(T^A&(_^T))+I[9]+568446438&4294967295,m=_+(g<<5&4294967295|g>>>27),g=A+(_^T&(m^_))+I[14]+3275163606&4294967295,A=m+(g<<9&4294967295|g>>>23),g=T+(m^_&(A^m))+I[3]+4107603335&4294967295,T=A+(g<<14&4294967295|g>>>18),g=_+(A^m&(T^A))+I[8]+1163531501&4294967295,_=T+(g<<20&4294967295|g>>>12),g=m+(T^A&(_^T))+I[13]+2850285829&4294967295,m=_+(g<<5&4294967295|g>>>27),g=A+(_^T&(m^_))+I[2]+4243563512&4294967295,A=m+(g<<9&4294967295|g>>>23),g=T+(m^_&(A^m))+I[7]+1735328473&4294967295,T=A+(g<<14&4294967295|g>>>18),g=_+(A^m&(T^A))+I[12]+2368359562&4294967295,_=T+(g<<20&4294967295|g>>>12),g=m+(_^T^A)+I[5]+4294588738&4294967295,m=_+(g<<4&4294967295|g>>>28),g=A+(m^_^T)+I[8]+2272392833&4294967295,A=m+(g<<11&4294967295|g>>>21),g=T+(A^m^_)+I[11]+1839030562&4294967295,T=A+(g<<16&4294967295|g>>>16),g=_+(T^A^m)+I[14]+4259657740&4294967295,_=T+(g<<23&4294967295|g>>>9),g=m+(_^T^A)+I[1]+2763975236&4294967295,m=_+(g<<4&4294967295|g>>>28),g=A+(m^_^T)+I[4]+1272893353&4294967295,A=m+(g<<11&4294967295|g>>>21),g=T+(A^m^_)+I[7]+4139469664&4294967295,T=A+(g<<16&4294967295|g>>>16),g=_+(T^A^m)+I[10]+3200236656&4294967295,_=T+(g<<23&4294967295|g>>>9),g=m+(_^T^A)+I[13]+681279174&4294967295,m=_+(g<<4&4294967295|g>>>28),g=A+(m^_^T)+I[0]+3936430074&4294967295,A=m+(g<<11&4294967295|g>>>21),g=T+(A^m^_)+I[3]+3572445317&4294967295,T=A+(g<<16&4294967295|g>>>16),g=_+(T^A^m)+I[6]+76029189&4294967295,_=T+(g<<23&4294967295|g>>>9),g=m+(_^T^A)+I[9]+3654602809&4294967295,m=_+(g<<4&4294967295|g>>>28),g=A+(m^_^T)+I[12]+3873151461&4294967295,A=m+(g<<11&4294967295|g>>>21),g=T+(A^m^_)+I[15]+530742520&4294967295,T=A+(g<<16&4294967295|g>>>16),g=_+(T^A^m)+I[2]+3299628645&4294967295,_=T+(g<<23&4294967295|g>>>9),g=m+(T^(_|~A))+I[0]+4096336452&4294967295,m=_+(g<<6&4294967295|g>>>26),g=A+(_^(m|~T))+I[7]+1126891415&4294967295,A=m+(g<<10&4294967295|g>>>22),g=T+(m^(A|~_))+I[14]+2878612391&4294967295,T=A+(g<<15&4294967295|g>>>17),g=_+(A^(T|~m))+I[5]+4237533241&4294967295,_=T+(g<<21&4294967295|g>>>11),g=m+(T^(_|~A))+I[12]+1700485571&4294967295,m=_+(g<<6&4294967295|g>>>26),g=A+(_^(m|~T))+I[3]+2399980690&4294967295,A=m+(g<<10&4294967295|g>>>22),g=T+(m^(A|~_))+I[10]+4293915773&4294967295,T=A+(g<<15&4294967295|g>>>17),g=_+(A^(T|~m))+I[1]+2240044497&4294967295,_=T+(g<<21&4294967295|g>>>11),g=m+(T^(_|~A))+I[8]+1873313359&4294967295,m=_+(g<<6&4294967295|g>>>26),g=A+(_^(m|~T))+I[15]+4264355552&4294967295,A=m+(g<<10&4294967295|g>>>22),g=T+(m^(A|~_))+I[6]+2734768916&4294967295,T=A+(g<<15&4294967295|g>>>17),g=_+(A^(T|~m))+I[13]+1309151649&4294967295,_=T+(g<<21&4294967295|g>>>11),g=m+(T^(_|~A))+I[4]+4149444226&4294967295,m=_+(g<<6&4294967295|g>>>26),g=A+(_^(m|~T))+I[11]+3174756917&4294967295,A=m+(g<<10&4294967295|g>>>22),g=T+(m^(A|~_))+I[2]+718787259&4294967295,T=A+(g<<15&4294967295|g>>>17),g=_+(A^(T|~m))+I[9]+3951481745&4294967295,E.g[0]=E.g[0]+m&4294967295,E.g[1]=E.g[1]+(T+(g<<21&4294967295|g>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+A&4294967295}r.prototype.u=function(E,m){m===void 0&&(m=E.length);for(var _=m-this.blockSize,I=this.B,T=this.h,A=0;A<m;){if(T==0)for(;A<=_;)i(this,E,A),A+=this.blockSize;if(typeof E=="string"){for(;A<m;)if(I[T++]=E.charCodeAt(A++),T==this.blockSize){i(this,I),T=0;break}}else for(;A<m;)if(I[T++]=E[A++],T==this.blockSize){i(this,I),T=0;break}}this.h=T,this.o+=m},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var m=1;m<E.length-8;++m)E[m]=0;var _=8*this.o;for(m=E.length-8;m<E.length;++m)E[m]=_&255,_/=256;for(this.u(E),E=Array(16),m=_=0;4>m;++m)for(var I=0;32>I;I+=8)E[_++]=this.g[m]>>>I&255;return E};function s(E,m){var _=c;return Object.prototype.hasOwnProperty.call(_,E)?_[E]:_[E]=m(E)}function a(E,m){this.h=m;for(var _=[],I=!0,T=E.length-1;0<=T;T--){var A=E[T]|0;I&&A==m||(_[T]=A,I=!1)}this.g=_}var c={};function l(E){return-128<=E&&128>E?s(E,function(m){return new a([m|0],0>m?-1:0)}):new a([E|0],0>E?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return y;if(0>E)return D(d(-E));for(var m=[],_=1,I=0;E>=_;I++)m[I]=E/_|0,_*=4294967296;return new a(m,0)}function p(E,m){if(E.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(E.charAt(0)=="-")return D(p(E.substring(1),m));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=d(Math.pow(m,8)),I=y,T=0;T<E.length;T+=8){var A=Math.min(8,E.length-T),g=parseInt(E.substring(T,T+A),m);8>A?(A=d(Math.pow(m,A)),I=I.j(A).add(d(g))):(I=I.j(_),I=I.add(d(g)))}return I}var y=l(0),v=l(1),S=l(16777216);n=a.prototype,n.m=function(){if(O(this))return-D(this).m();for(var E=0,m=1,_=0;_<this.g.length;_++){var I=this.i(_);E+=(0<=I?I:4294967296+I)*m,m*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(C(this))return"0";if(O(this))return"-"+D(this).toString(E);for(var m=d(Math.pow(E,6)),_=this,I="";;){var T=X(_,m).g;_=H(_,T.j(m));var A=((0<_.g.length?_.g[0]:_.h)>>>0).toString(E);if(_=T,C(_))return A+I;for(;6>A.length;)A="0"+A;I=A+I}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function C(E){if(E.h!=0)return!1;for(var m=0;m<E.g.length;m++)if(E.g[m]!=0)return!1;return!0}function O(E){return E.h==-1}n.l=function(E){return E=H(this,E),O(E)?-1:C(E)?0:1};function D(E){for(var m=E.g.length,_=[],I=0;I<m;I++)_[I]=~E.g[I];return new a(_,~E.h).add(v)}n.abs=function(){return O(this)?D(this):this},n.add=function(E){for(var m=Math.max(this.g.length,E.g.length),_=[],I=0,T=0;T<=m;T++){var A=I+(this.i(T)&65535)+(E.i(T)&65535),g=(A>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);I=g>>>16,A&=65535,g&=65535,_[T]=g<<16|A}return new a(_,_[_.length-1]&-2147483648?-1:0)};function H(E,m){return E.add(D(m))}n.j=function(E){if(C(this)||C(E))return y;if(O(this))return O(E)?D(this).j(D(E)):D(D(this).j(E));if(O(E))return D(this.j(D(E)));if(0>this.l(S)&&0>E.l(S))return d(this.m()*E.m());for(var m=this.g.length+E.g.length,_=[],I=0;I<2*m;I++)_[I]=0;for(I=0;I<this.g.length;I++)for(var T=0;T<E.g.length;T++){var A=this.i(I)>>>16,g=this.i(I)&65535,Ke=E.i(T)>>>16,bn=E.i(T)&65535;_[2*I+2*T]+=g*bn,B(_,2*I+2*T),_[2*I+2*T+1]+=A*bn,B(_,2*I+2*T+1),_[2*I+2*T+1]+=g*Ke,B(_,2*I+2*T+1),_[2*I+2*T+2]+=A*Ke,B(_,2*I+2*T+2)}for(I=0;I<m;I++)_[I]=_[2*I+1]<<16|_[2*I];for(I=m;I<2*m;I++)_[I]=0;return new a(_,0)};function B(E,m){for(;(E[m]&65535)!=E[m];)E[m+1]+=E[m]>>>16,E[m]&=65535,m++}function $(E,m){this.g=E,this.h=m}function X(E,m){if(C(m))throw Error("division by zero");if(C(E))return new $(y,y);if(O(E))return m=X(D(E),m),new $(D(m.g),D(m.h));if(O(m))return m=X(E,D(m)),new $(D(m.g),m.h);if(30<E.g.length){if(O(E)||O(m))throw Error("slowDivide_ only works with positive integers.");for(var _=v,I=m;0>=I.l(E);)_=ke(_),I=ke(I);var T=te(_,1),A=te(I,1);for(I=te(I,2),_=te(_,2);!C(I);){var g=A.add(I);0>=g.l(E)&&(T=T.add(_),A=g),I=te(I,1),_=te(_,1)}return m=H(E,T.j(m)),new $(T,m)}for(T=y;0<=E.l(m);){for(_=Math.max(1,Math.floor(E.m()/m.m())),I=Math.ceil(Math.log(_)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),A=d(_),g=A.j(m);O(g)||0<g.l(E);)_-=I,A=d(_),g=A.j(m);C(A)&&(A=v),T=T.add(A),E=H(E,g)}return new $(T,E)}n.A=function(E){return X(this,E).h},n.and=function(E){for(var m=Math.max(this.g.length,E.g.length),_=[],I=0;I<m;I++)_[I]=this.i(I)&E.i(I);return new a(_,this.h&E.h)},n.or=function(E){for(var m=Math.max(this.g.length,E.g.length),_=[],I=0;I<m;I++)_[I]=this.i(I)|E.i(I);return new a(_,this.h|E.h)},n.xor=function(E){for(var m=Math.max(this.g.length,E.g.length),_=[],I=0;I<m;I++)_[I]=this.i(I)^E.i(I);return new a(_,this.h^E.h)};function ke(E){for(var m=E.g.length+1,_=[],I=0;I<m;I++)_[I]=E.i(I)<<1|E.i(I-1)>>>31;return new a(_,E.h)}function te(E,m){var _=m>>5;m%=32;for(var I=E.g.length-_,T=[],A=0;A<I;A++)T[A]=0<m?E.i(A+_)>>>m|E.i(A+_+1)<<32-m:E.i(A+_);return new a(T,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,nh=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,It=a}).apply(typeof Zc<"u"?Zc:typeof self<"u"?self:typeof window<"u"?window:{});var zr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var rh,Hn,ih,Zr,Ys,sh,oh,ah;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,h){return o==Array.prototype||o==Object.prototype||(o[u]=h.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof zr=="object"&&zr];for(var u=0;u<o.length;++u){var h=o[u];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function i(o,u){if(u)e:{var h=r;o=o.split(".");for(var f=0;f<o.length-1;f++){var w=o[f];if(!(w in h))break e;h=h[w]}o=o[o.length-1],f=h[o],u=u(f),u!=f&&u!=null&&e(h,o,{configurable:!0,writable:!0,value:u})}}function s(o,u){o instanceof String&&(o+="");var h=0,f=!1,w={next:function(){if(!f&&h<o.length){var R=h++;return{value:u(R,o[R]),done:!1}}return f=!0,{done:!0,value:void 0}}};return w[Symbol.iterator]=function(){return w},w}i("Array.prototype.values",function(o){return o||function(){return s(this,function(u,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function l(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function d(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function p(o,u,h){return o.call.apply(o.bind,arguments)}function y(o,u,h){if(!o)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var w=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(w,f),o.apply(u,w)}}return function(){return o.apply(u,arguments)}}function v(o,u,h){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:y,v.apply(null,arguments)}function S(o,u){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),o.apply(this,f)}}function C(o,u){function h(){}h.prototype=u.prototype,o.aa=u.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(f,w,R){for(var k=Array(arguments.length-2),Q=2;Q<arguments.length;Q++)k[Q-2]=arguments[Q];return u.prototype[w].apply(f,k)}}function O(o){const u=o.length;if(0<u){const h=Array(u);for(let f=0;f<u;f++)h[f]=o[f];return h}return[]}function D(o,u){for(let h=1;h<arguments.length;h++){const f=arguments[h];if(l(f)){const w=o.length||0,R=f.length||0;o.length=w+R;for(let k=0;k<R;k++)o[w+k]=f[k]}else o.push(f)}}class H{constructor(u,h){this.i=u,this.j=h,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function B(o){return/^[\s\xa0]*$/.test(o)}function $(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function X(o){return X[" "](o),o}X[" "]=function(){};var ke=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function te(o,u,h){for(const f in o)u.call(h,o[f],f,o)}function E(o,u){for(const h in o)u.call(void 0,o[h],h,o)}function m(o){const u={};for(const h in o)u[h]=o[h];return u}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(o,u){let h,f;for(let w=1;w<arguments.length;w++){f=arguments[w];for(h in f)o[h]=f[h];for(let R=0;R<_.length;R++)h=_[R],Object.prototype.hasOwnProperty.call(f,h)&&(o[h]=f[h])}}function T(o){var u=1;o=o.split(":");const h=[];for(;0<u&&o.length;)h.push(o.shift()),u--;return o.length&&h.push(o.join(":")),h}function A(o){c.setTimeout(()=>{throw o},0)}function g(){var o=ts;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class Ke{constructor(){this.h=this.g=null}add(u,h){const f=bn.get();f.set(u,h),this.h?this.h.next=f:this.g=f,this.h=f}}var bn=new H(()=>new af,o=>o.reset());class af{constructor(){this.next=this.g=this.h=null}set(u,h){this.h=u,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let Pn,Cn=!1,ts=new Ke,va=()=>{const o=c.Promise.resolve(void 0);Pn=()=>{o.then(cf)}};var cf=()=>{for(var o;o=g();){try{o.h.call(o.g)}catch(h){A(h)}var u=bn;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}Cn=!1};function at(){this.s=this.s,this.C=this.C}at.prototype.s=!1,at.prototype.ma=function(){this.s||(this.s=!0,this.N())},at.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function fe(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}fe.prototype.h=function(){this.defaultPrevented=!0};var uf=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};c.addEventListener("test",h,u),c.removeEventListener("test",h,u)}catch{}return o}();function kn(o,u){if(fe.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,f=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(ke){e:{try{X(u.nodeName);var w=!0;break e}catch{}w=!1}w||(u=null)}}else h=="mouseover"?u=o.fromElement:h=="mouseout"&&(u=o.toElement);this.relatedTarget=u,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:lf[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&kn.aa.h.call(this)}}C(kn,fe);var lf={2:"touch",3:"pen",4:"mouse"};kn.prototype.h=function(){kn.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Ar="closure_listenable_"+(1e6*Math.random()|0),hf=0;function df(o,u,h,f,w){this.listener=o,this.proxy=null,this.src=u,this.type=h,this.capture=!!f,this.ha=w,this.key=++hf,this.da=this.fa=!1}function Rr(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Sr(o){this.src=o,this.g={},this.h=0}Sr.prototype.add=function(o,u,h,f,w){var R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);var k=rs(o,u,f,w);return-1<k?(u=o[k],h||(u.fa=!1)):(u=new df(u,this.src,R,!!f,w),u.fa=h,o.push(u)),u};function ns(o,u){var h=u.type;if(h in o.g){var f=o.g[h],w=Array.prototype.indexOf.call(f,u,void 0),R;(R=0<=w)&&Array.prototype.splice.call(f,w,1),R&&(Rr(u),o.g[h].length==0&&(delete o.g[h],o.h--))}}function rs(o,u,h,f){for(var w=0;w<o.length;++w){var R=o[w];if(!R.da&&R.listener==u&&R.capture==!!h&&R.ha==f)return w}return-1}var is="closure_lm_"+(1e6*Math.random()|0),ss={};function Ia(o,u,h,f,w){if(Array.isArray(u)){for(var R=0;R<u.length;R++)Ia(o,u[R],h,f,w);return null}return h=wa(h),o&&o[Ar]?o.K(u,h,d(f)?!!f.capture:!1,w):ff(o,u,h,!1,f,w)}function ff(o,u,h,f,w,R){if(!u)throw Error("Invalid event type");var k=d(w)?!!w.capture:!!w,Q=as(o);if(Q||(o[is]=Q=new Sr(o)),h=Q.add(u,h,f,k,R),h.proxy)return h;if(f=pf(),h.proxy=f,f.src=o,f.listener=h,o.addEventListener)uf||(w=k),w===void 0&&(w=!1),o.addEventListener(u.toString(),f,w);else if(o.attachEvent)o.attachEvent(Ta(u.toString()),f);else if(o.addListener&&o.removeListener)o.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function pf(){function o(h){return u.call(o.src,o.listener,h)}const u=mf;return o}function Ea(o,u,h,f,w){if(Array.isArray(u))for(var R=0;R<u.length;R++)Ea(o,u[R],h,f,w);else f=d(f)?!!f.capture:!!f,h=wa(h),o&&o[Ar]?(o=o.i,u=String(u).toString(),u in o.g&&(R=o.g[u],h=rs(R,h,f,w),-1<h&&(Rr(R[h]),Array.prototype.splice.call(R,h,1),R.length==0&&(delete o.g[u],o.h--)))):o&&(o=as(o))&&(u=o.g[u.toString()],o=-1,u&&(o=rs(u,h,f,w)),(h=-1<o?u[o]:null)&&os(h))}function os(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[Ar])ns(u.i,o);else{var h=o.type,f=o.proxy;u.removeEventListener?u.removeEventListener(h,f,o.capture):u.detachEvent?u.detachEvent(Ta(h),f):u.addListener&&u.removeListener&&u.removeListener(f),(h=as(u))?(ns(h,o),h.h==0&&(h.src=null,u[is]=null)):Rr(o)}}}function Ta(o){return o in ss?ss[o]:ss[o]="on"+o}function mf(o,u){if(o.da)o=!0;else{u=new kn(u,this);var h=o.listener,f=o.ha||o.src;o.fa&&os(o),o=h.call(f,u)}return o}function as(o){return o=o[is],o instanceof Sr?o:null}var cs="__closure_events_fn_"+(1e9*Math.random()>>>0);function wa(o){return typeof o=="function"?o:(o[cs]||(o[cs]=function(u){return o.handleEvent(u)}),o[cs])}function pe(){at.call(this),this.i=new Sr(this),this.M=this,this.F=null}C(pe,at),pe.prototype[Ar]=!0,pe.prototype.removeEventListener=function(o,u,h,f){Ea(this,o,u,h,f)};function Ee(o,u){var h,f=o.F;if(f)for(h=[];f;f=f.F)h.push(f);if(o=o.M,f=u.type||u,typeof u=="string")u=new fe(u,o);else if(u instanceof fe)u.target=u.target||o;else{var w=u;u=new fe(f,o),I(u,w)}if(w=!0,h)for(var R=h.length-1;0<=R;R--){var k=u.g=h[R];w=br(k,f,!0,u)&&w}if(k=u.g=o,w=br(k,f,!0,u)&&w,w=br(k,f,!1,u)&&w,h)for(R=0;R<h.length;R++)k=u.g=h[R],w=br(k,f,!1,u)&&w}pe.prototype.N=function(){if(pe.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var h=o.g[u],f=0;f<h.length;f++)Rr(h[f]);delete o.g[u],o.h--}}this.F=null},pe.prototype.K=function(o,u,h,f){return this.i.add(String(o),u,!1,h,f)},pe.prototype.L=function(o,u,h,f){return this.i.add(String(o),u,!0,h,f)};function br(o,u,h,f){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var w=!0,R=0;R<u.length;++R){var k=u[R];if(k&&!k.da&&k.capture==h){var Q=k.listener,ue=k.ha||k.src;k.fa&&ns(o.i,k),w=Q.call(ue,f)!==!1&&w}}return w&&!f.defaultPrevented}function Aa(o,u,h){if(typeof o=="function")h&&(o=v(o,h));else if(o&&typeof o.handleEvent=="function")o=v(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(o,u||0)}function Ra(o){o.g=Aa(()=>{o.g=null,o.i&&(o.i=!1,Ra(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class gf extends at{constructor(u,h){super(),this.m=u,this.l=h,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Ra(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Dn(o){at.call(this),this.h=o,this.g={}}C(Dn,at);var Sa=[];function ba(o){te(o.g,function(u,h){this.g.hasOwnProperty(h)&&os(u)},o),o.g={}}Dn.prototype.N=function(){Dn.aa.N.call(this),ba(this)},Dn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var us=c.JSON.stringify,_f=c.JSON.parse,yf=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function ls(){}ls.prototype.h=null;function Pa(o){return o.h||(o.h=o.i())}function Ca(){}var Vn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function hs(){fe.call(this,"d")}C(hs,fe);function ds(){fe.call(this,"c")}C(ds,fe);var Ot={},ka=null;function Pr(){return ka=ka||new pe}Ot.La="serverreachability";function Da(o){fe.call(this,Ot.La,o)}C(Da,fe);function Nn(o){const u=Pr();Ee(u,new Da(u))}Ot.STAT_EVENT="statevent";function Va(o,u){fe.call(this,Ot.STAT_EVENT,o),this.stat=u}C(Va,fe);function Te(o){const u=Pr();Ee(u,new Va(u,o))}Ot.Ma="timingevent";function Na(o,u){fe.call(this,Ot.Ma,o),this.size=u}C(Na,fe);function On(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},u)}function Ln(){this.g=!0}Ln.prototype.xa=function(){this.g=!1};function vf(o,u,h,f,w,R){o.info(function(){if(o.g)if(R)for(var k="",Q=R.split("&"),ue=0;ue<Q.length;ue++){var W=Q[ue].split("=");if(1<W.length){var me=W[0];W=W[1];var ge=me.split("_");k=2<=ge.length&&ge[1]=="type"?k+(me+"="+W+"&"):k+(me+"=redacted&")}}else k=null;else k=R;return"XMLHTTP REQ ("+f+") [attempt "+w+"]: "+u+`
`+h+`
`+k})}function If(o,u,h,f,w,R,k){o.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+w+"]: "+u+`
`+h+`
`+R+" "+k})}function Jt(o,u,h,f){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+Tf(o,h)+(f?" "+f:"")})}function Ef(o,u){o.info(function(){return"TIMEOUT: "+u})}Ln.prototype.info=function(){};function Tf(o,u){if(!o.g)return u;if(!u)return null;try{var h=JSON.parse(u);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var f=h[o];if(!(2>f.length)){var w=f[1];if(Array.isArray(w)&&!(1>w.length)){var R=w[0];if(R!="noop"&&R!="stop"&&R!="close")for(var k=1;k<w.length;k++)w[k]=""}}}}return us(h)}catch{return u}}var Cr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Oa={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},fs;function kr(){}C(kr,ls),kr.prototype.g=function(){return new XMLHttpRequest},kr.prototype.i=function(){return{}},fs=new kr;function ct(o,u,h,f){this.j=o,this.i=u,this.l=h,this.R=f||1,this.U=new Dn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new La}function La(){this.i=null,this.g="",this.h=!1}var Ma={},ps={};function ms(o,u,h){o.L=1,o.v=Or(Qe(u)),o.m=h,o.P=!0,xa(o,null)}function xa(o,u){o.F=Date.now(),Dr(o),o.A=Qe(o.v);var h=o.A,f=o.R;Array.isArray(f)||(f=[String(f)]),Ja(h.i,"t",f),o.C=0,h=o.j.J,o.h=new La,o.g=mc(o.j,h?u:null,!o.m),0<o.O&&(o.M=new gf(v(o.Y,o,o.g),o.O)),u=o.U,h=o.g,f=o.ca;var w="readystatechange";Array.isArray(w)||(w&&(Sa[0]=w.toString()),w=Sa);for(var R=0;R<w.length;R++){var k=Ia(h,w[R],f||u.handleEvent,!1,u.h||u);if(!k)break;u.g[k.key]=k}u=o.H?m(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),Nn(),vf(o.i,o.u,o.A,o.l,o.R,o.m)}ct.prototype.ca=function(o){o=o.target;const u=this.M;u&&Ye(o)==3?u.j():this.Y(o)},ct.prototype.Y=function(o){try{if(o==this.g)e:{const ge=Ye(this.g);var u=this.g.Ba();const en=this.g.Z();if(!(3>ge)&&(ge!=3||this.g&&(this.h.h||this.g.oa()||ic(this.g)))){this.J||ge!=4||u==7||(u==8||0>=en?Nn(3):Nn(2)),gs(this);var h=this.g.Z();this.X=h;t:if(Fa(this)){var f=ic(this.g);o="";var w=f.length,R=Ye(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Lt(this),Mn(this);var k="";break t}this.h.i=new c.TextDecoder}for(u=0;u<w;u++)this.h.h=!0,o+=this.h.i.decode(f[u],{stream:!(R&&u==w-1)});f.length=0,this.h.g+=o,this.C=0,k=this.h.g}else k=this.g.oa();if(this.o=h==200,If(this.i,this.u,this.A,this.l,this.R,ge,h),this.o){if(this.T&&!this.K){t:{if(this.g){var Q,ue=this.g;if((Q=ue.g?ue.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!B(Q)){var W=Q;break t}}W=null}if(h=W)Jt(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,_s(this,h);else{this.o=!1,this.s=3,Te(12),Lt(this),Mn(this);break e}}if(this.P){h=!0;let Oe;for(;!this.J&&this.C<k.length;)if(Oe=wf(this,k),Oe==ps){ge==4&&(this.s=4,Te(14),h=!1),Jt(this.i,this.l,null,"[Incomplete Response]");break}else if(Oe==Ma){this.s=4,Te(15),Jt(this.i,this.l,k,"[Invalid Chunk]"),h=!1;break}else Jt(this.i,this.l,Oe,null),_s(this,Oe);if(Fa(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ge!=4||k.length!=0||this.h.h||(this.s=1,Te(16),h=!1),this.o=this.o&&h,!h)Jt(this.i,this.l,k,"[Invalid Chunked Response]"),Lt(this),Mn(this);else if(0<k.length&&!this.W){this.W=!0;var me=this.j;me.g==this&&me.ba&&!me.M&&(me.j.info("Great, no buffering proxy detected. Bytes received: "+k.length),ws(me),me.M=!0,Te(11))}}else Jt(this.i,this.l,k,null),_s(this,k);ge==4&&Lt(this),this.o&&!this.J&&(ge==4?hc(this.j,this):(this.o=!1,Dr(this)))}else Bf(this.g),h==400&&0<k.indexOf("Unknown SID")?(this.s=3,Te(12)):(this.s=0,Te(13)),Lt(this),Mn(this)}}}catch{}finally{}};function Fa(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function wf(o,u){var h=o.C,f=u.indexOf(`
`,h);return f==-1?ps:(h=Number(u.substring(h,f)),isNaN(h)?Ma:(f+=1,f+h>u.length?ps:(u=u.slice(f,f+h),o.C=f+h,u)))}ct.prototype.cancel=function(){this.J=!0,Lt(this)};function Dr(o){o.S=Date.now()+o.I,Ua(o,o.I)}function Ua(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=On(v(o.ba,o),u)}function gs(o){o.B&&(c.clearTimeout(o.B),o.B=null)}ct.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Ef(this.i,this.A),this.L!=2&&(Nn(),Te(17)),Lt(this),this.s=2,Mn(this)):Ua(this,this.S-o)};function Mn(o){o.j.G==0||o.J||hc(o.j,o)}function Lt(o){gs(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,ba(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function _s(o,u){try{var h=o.j;if(h.G!=0&&(h.g==o||ys(h.h,o))){if(!o.K&&ys(h.h,o)&&h.G==3){try{var f=h.Da.g.parse(u)}catch{f=null}if(Array.isArray(f)&&f.length==3){var w=f;if(w[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)Br(h),Fr(h);else break e;Ts(h),Te(18)}}else h.za=w[1],0<h.za-h.T&&37500>w[2]&&h.F&&h.v==0&&!h.C&&(h.C=On(v(h.Za,h),6e3));if(1>=$a(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else xt(h,11)}else if((o.K||h.g==o)&&Br(h),!B(u))for(w=h.Da.g.parse(u),u=0;u<w.length;u++){let W=w[u];if(h.T=W[0],W=W[1],h.G==2)if(W[0]=="c"){h.K=W[1],h.ia=W[2];const me=W[3];me!=null&&(h.la=me,h.j.info("VER="+h.la));const ge=W[4];ge!=null&&(h.Aa=ge,h.j.info("SVER="+h.Aa));const en=W[5];en!=null&&typeof en=="number"&&0<en&&(f=1.5*en,h.L=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const Oe=o.g;if(Oe){const $r=Oe.g?Oe.g.getResponseHeader("X-Client-Wire-Protocol"):null;if($r){var R=f.h;R.g||$r.indexOf("spdy")==-1&&$r.indexOf("quic")==-1&&$r.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(vs(R,R.h),R.h=null))}if(f.D){const As=Oe.g?Oe.g.getResponseHeader("X-HTTP-Session-Id"):null;As&&(f.ya=As,Y(f.I,f.D,As))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),f=h;var k=o;if(f.qa=pc(f,f.J?f.ia:null,f.W),k.K){qa(f.h,k);var Q=k,ue=f.L;ue&&(Q.I=ue),Q.B&&(gs(Q),Dr(Q)),f.g=k}else uc(f);0<h.i.length&&Ur(h)}else W[0]!="stop"&&W[0]!="close"||xt(h,7);else h.G==3&&(W[0]=="stop"||W[0]=="close"?W[0]=="stop"?xt(h,7):Es(h):W[0]!="noop"&&h.l&&h.l.ta(W),h.v=0)}}Nn(4)}catch{}}var Af=class{constructor(o,u){this.g=o,this.map=u}};function Ba(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ja(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function $a(o){return o.h?1:o.g?o.g.size:0}function ys(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function vs(o,u){o.g?o.g.add(u):o.h=u}function qa(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}Ba.prototype.cancel=function(){if(this.i=za(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function za(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const h of o.g.values())u=u.concat(h.D);return u}return O(o.i)}function Rf(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(l(o)){for(var u=[],h=o.length,f=0;f<h;f++)u.push(o[f]);return u}u=[],h=0;for(f in o)u[h++]=o[f];return u}function Sf(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(l(o)||typeof o=="string"){var u=[];o=o.length;for(var h=0;h<o;h++)u.push(h);return u}u=[],h=0;for(const f in o)u[h++]=f;return u}}}function Ga(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(l(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var h=Sf(o),f=Rf(o),w=f.length,R=0;R<w;R++)u.call(void 0,f[R],h&&h[R],o)}var Ha=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function bf(o,u){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var f=o[h].indexOf("="),w=null;if(0<=f){var R=o[h].substring(0,f);w=o[h].substring(f+1)}else R=o[h];u(R,w?decodeURIComponent(w.replace(/\+/g," ")):"")}}}function Mt(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Mt){this.h=o.h,Vr(this,o.j),this.o=o.o,this.g=o.g,Nr(this,o.s),this.l=o.l;var u=o.i,h=new Un;h.i=u.i,u.g&&(h.g=new Map(u.g),h.h=u.h),Wa(this,h),this.m=o.m}else o&&(u=String(o).match(Ha))?(this.h=!1,Vr(this,u[1]||"",!0),this.o=xn(u[2]||""),this.g=xn(u[3]||"",!0),Nr(this,u[4]),this.l=xn(u[5]||"",!0),Wa(this,u[6]||"",!0),this.m=xn(u[7]||"")):(this.h=!1,this.i=new Un(null,this.h))}Mt.prototype.toString=function(){var o=[],u=this.j;u&&o.push(Fn(u,Ka,!0),":");var h=this.g;return(h||u=="file")&&(o.push("//"),(u=this.o)&&o.push(Fn(u,Ka,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(Fn(h,h.charAt(0)=="/"?kf:Cf,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",Fn(h,Vf)),o.join("")};function Qe(o){return new Mt(o)}function Vr(o,u,h){o.j=h?xn(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function Nr(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function Wa(o,u,h){u instanceof Un?(o.i=u,Nf(o.i,o.h)):(h||(u=Fn(u,Df)),o.i=new Un(u,o.h))}function Y(o,u,h){o.i.set(u,h)}function Or(o){return Y(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function xn(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Fn(o,u,h){return typeof o=="string"?(o=encodeURI(o).replace(u,Pf),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Pf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Ka=/[#\/\?@]/g,Cf=/[#\?:]/g,kf=/[#\?]/g,Df=/[#\?@]/g,Vf=/#/g;function Un(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function ut(o){o.g||(o.g=new Map,o.h=0,o.i&&bf(o.i,function(u,h){o.add(decodeURIComponent(u.replace(/\+/g," ")),h)}))}n=Un.prototype,n.add=function(o,u){ut(this),this.i=null,o=Xt(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(u),this.h+=1,this};function Qa(o,u){ut(o),u=Xt(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function Ya(o,u){return ut(o),u=Xt(o,u),o.g.has(u)}n.forEach=function(o,u){ut(this),this.g.forEach(function(h,f){h.forEach(function(w){o.call(u,w,f,this)},this)},this)},n.na=function(){ut(this);const o=Array.from(this.g.values()),u=Array.from(this.g.keys()),h=[];for(let f=0;f<u.length;f++){const w=o[f];for(let R=0;R<w.length;R++)h.push(u[f])}return h},n.V=function(o){ut(this);let u=[];if(typeof o=="string")Ya(this,o)&&(u=u.concat(this.g.get(Xt(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)u=u.concat(o[h])}return u},n.set=function(o,u){return ut(this),this.i=null,o=Xt(this,o),Ya(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function Ja(o,u,h){Qa(o,u),0<h.length&&(o.i=null,o.g.set(Xt(o,u),O(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(var h=0;h<u.length;h++){var f=u[h];const R=encodeURIComponent(String(f)),k=this.V(f);for(f=0;f<k.length;f++){var w=R;k[f]!==""&&(w+="="+encodeURIComponent(String(k[f]))),o.push(w)}}return this.i=o.join("&")};function Xt(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function Nf(o,u){u&&!o.j&&(ut(o),o.i=null,o.g.forEach(function(h,f){var w=f.toLowerCase();f!=w&&(Qa(this,f),Ja(this,w,h))},o)),o.j=u}function Of(o,u){const h=new Ln;if(c.Image){const f=new Image;f.onload=S(lt,h,"TestLoadImage: loaded",!0,u,f),f.onerror=S(lt,h,"TestLoadImage: error",!1,u,f),f.onabort=S(lt,h,"TestLoadImage: abort",!1,u,f),f.ontimeout=S(lt,h,"TestLoadImage: timeout",!1,u,f),c.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=o}else u(!1)}function Lf(o,u){const h=new Ln,f=new AbortController,w=setTimeout(()=>{f.abort(),lt(h,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:f.signal}).then(R=>{clearTimeout(w),R.ok?lt(h,"TestPingServer: ok",!0,u):lt(h,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(w),lt(h,"TestPingServer: error",!1,u)})}function lt(o,u,h,f,w){try{w&&(w.onload=null,w.onerror=null,w.onabort=null,w.ontimeout=null),f(h)}catch{}}function Mf(){this.g=new yf}function xf(o,u,h){const f=h||"";try{Ga(o,function(w,R){let k=w;d(w)&&(k=us(w)),u.push(f+R+"="+encodeURIComponent(k))})}catch(w){throw u.push(f+"type="+encodeURIComponent("_badmap")),w}}function Lr(o){this.l=o.Ub||null,this.j=o.eb||!1}C(Lr,ls),Lr.prototype.g=function(){return new Mr(this.l,this.j)},Lr.prototype.i=function(o){return function(){return o}}({});function Mr(o,u){pe.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(Mr,pe),n=Mr.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,jn(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Bn(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,jn(this)),this.g&&(this.readyState=3,jn(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Xa(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Xa(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?Bn(this):jn(this),this.readyState==3&&Xa(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,Bn(this))},n.Qa=function(o){this.g&&(this.response=o,Bn(this))},n.ga=function(){this.g&&Bn(this)};function Bn(o){o.readyState=4,o.l=null,o.j=null,o.v=null,jn(o)}n.setRequestHeader=function(o,u){this.u.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var h=u.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=u.next();return o.join(`\r
`)};function jn(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Mr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Za(o){let u="";return te(o,function(h,f){u+=f,u+=":",u+=h,u+=`\r
`}),u}function Is(o,u,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=Za(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):Y(o,u,h))}function ee(o){pe.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(ee,pe);var Ff=/^https?$/i,Uf=["POST","PUT"];n=ee.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,u,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():fs.g(),this.v=this.o?Pa(this.o):Pa(fs),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(R){ec(this,R);return}if(o=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var w in f)h.set(w,f[w]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const R of f.keys())h.set(R,f.get(R));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(R=>R.toLowerCase()=="content-type"),w=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Uf,u,void 0))||f||w||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,k]of h)this.g.setRequestHeader(R,k);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{rc(this),this.u=!0,this.g.send(o),this.u=!1}catch(R){ec(this,R)}};function ec(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,tc(o),xr(o)}function tc(o){o.A||(o.A=!0,Ee(o,"complete"),Ee(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Ee(this,"complete"),Ee(this,"abort"),xr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),xr(this,!0)),ee.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?nc(this):this.bb())},n.bb=function(){nc(this)};function nc(o){if(o.h&&typeof a<"u"&&(!o.v[1]||Ye(o)!=4||o.Z()!=2)){if(o.u&&Ye(o)==4)Aa(o.Ea,0,o);else if(Ee(o,"readystatechange"),Ye(o)==4){o.h=!1;try{const k=o.Z();e:switch(k){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var h;if(!(h=u)){var f;if(f=k===0){var w=String(o.D).match(Ha)[1]||null;!w&&c.self&&c.self.location&&(w=c.self.location.protocol.slice(0,-1)),f=!Ff.test(w?w.toLowerCase():"")}h=f}if(h)Ee(o,"complete"),Ee(o,"success");else{o.m=6;try{var R=2<Ye(o)?o.g.statusText:""}catch{R=""}o.l=R+" ["+o.Z()+"]",tc(o)}}finally{xr(o)}}}}function xr(o,u){if(o.g){rc(o);const h=o.g,f=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||Ee(o,"ready");try{h.onreadystatechange=f}catch{}}}function rc(o){o.I&&(c.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function Ye(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<Ye(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),_f(u)}};function ic(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Bf(o){const u={};o=(o.g&&2<=Ye(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<o.length;f++){if(B(o[f]))continue;var h=T(o[f]);const w=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const R=u[w]||[];u[w]=R,R.push(h)}E(u,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function $n(o,u,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||u}function sc(o){this.Aa=0,this.i=[],this.j=new Ln,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=$n("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=$n("baseRetryDelayMs",5e3,o),this.cb=$n("retryDelaySeedMs",1e4,o),this.Wa=$n("forwardChannelMaxRetries",2,o),this.wa=$n("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Ba(o&&o.concurrentRequestLimit),this.Da=new Mf,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=sc.prototype,n.la=8,n.G=1,n.connect=function(o,u,h,f){Te(0),this.W=o,this.H=u||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.I=pc(this,null,this.W),Ur(this)};function Es(o){if(oc(o),o.G==3){var u=o.U++,h=Qe(o.I);if(Y(h,"SID",o.K),Y(h,"RID",u),Y(h,"TYPE","terminate"),qn(o,h),u=new ct(o,o.j,u),u.L=2,u.v=Or(Qe(h)),h=!1,c.navigator&&c.navigator.sendBeacon)try{h=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!h&&c.Image&&(new Image().src=u.v,h=!0),h||(u.g=mc(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Dr(u)}fc(o)}function Fr(o){o.g&&(ws(o),o.g.cancel(),o.g=null)}function oc(o){Fr(o),o.u&&(c.clearTimeout(o.u),o.u=null),Br(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function Ur(o){if(!ja(o.h)&&!o.s){o.s=!0;var u=o.Ga;Pn||va(),Cn||(Pn(),Cn=!0),ts.add(u,o),o.B=0}}function jf(o,u){return $a(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=On(v(o.Ga,o,u),dc(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const w=new ct(this,this.j,o);let R=this.o;if(this.S&&(R?(R=m(R),I(R,this.S)):R=this.S),this.m!==null||this.O||(w.H=R,R=null),this.P)e:{for(var u=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(u+=f,4096<u){u=h;break e}if(u===4096||h===this.i.length-1){u=h+1;break e}}u=1e3}else u=1e3;u=cc(this,w,u),h=Qe(this.I),Y(h,"RID",o),Y(h,"CVER",22),this.D&&Y(h,"X-HTTP-Session-Id",this.D),qn(this,h),R&&(this.O?u="headers="+encodeURIComponent(String(Za(R)))+"&"+u:this.m&&Is(h,this.m,R)),vs(this.h,w),this.Ua&&Y(h,"TYPE","init"),this.P?(Y(h,"$req",u),Y(h,"SID","null"),w.T=!0,ms(w,h,null)):ms(w,h,u),this.G=2}}else this.G==3&&(o?ac(this,o):this.i.length==0||ja(this.h)||ac(this))};function ac(o,u){var h;u?h=u.l:h=o.U++;const f=Qe(o.I);Y(f,"SID",o.K),Y(f,"RID",h),Y(f,"AID",o.T),qn(o,f),o.m&&o.o&&Is(f,o.m,o.o),h=new ct(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),u&&(o.i=u.D.concat(o.i)),u=cc(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),vs(o.h,h),ms(h,f,u)}function qn(o,u){o.H&&te(o.H,function(h,f){Y(u,f,h)}),o.l&&Ga({},function(h,f){Y(u,f,h)})}function cc(o,u,h){h=Math.min(o.i.length,h);var f=o.l?v(o.l.Na,o.l,o):null;e:{var w=o.i;let R=-1;for(;;){const k=["count="+h];R==-1?0<h?(R=w[0].g,k.push("ofs="+R)):R=0:k.push("ofs="+R);let Q=!0;for(let ue=0;ue<h;ue++){let W=w[ue].g;const me=w[ue].map;if(W-=R,0>W)R=Math.max(0,w[ue].g-100),Q=!1;else try{xf(me,k,"req"+W+"_")}catch{f&&f(me)}}if(Q){f=k.join("&");break e}}}return o=o.i.splice(0,h),u.D=o,f}function uc(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;Pn||va(),Cn||(Pn(),Cn=!0),ts.add(u,o),o.v=0}}function Ts(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=On(v(o.Fa,o),dc(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,lc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=On(v(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Te(10),Fr(this),lc(this))};function ws(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function lc(o){o.g=new ct(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=Qe(o.qa);Y(u,"RID","rpc"),Y(u,"SID",o.K),Y(u,"AID",o.T),Y(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&Y(u,"TO",o.ja),Y(u,"TYPE","xmlhttp"),qn(o,u),o.m&&o.o&&Is(u,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=Or(Qe(u)),h.m=null,h.P=!0,xa(h,o)}n.Za=function(){this.C!=null&&(this.C=null,Fr(this),Ts(this),Te(19))};function Br(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function hc(o,u){var h=null;if(o.g==u){Br(o),ws(o),o.g=null;var f=2}else if(ys(o.h,u))h=u.D,qa(o.h,u),f=1;else return;if(o.G!=0){if(u.o)if(f==1){h=u.m?u.m.length:0,u=Date.now()-u.F;var w=o.B;f=Pr(),Ee(f,new Na(f,h)),Ur(o)}else uc(o);else if(w=u.s,w==3||w==0&&0<u.X||!(f==1&&jf(o,u)||f==2&&Ts(o)))switch(h&&0<h.length&&(u=o.h,u.i=u.i.concat(h)),w){case 1:xt(o,5);break;case 4:xt(o,10);break;case 3:xt(o,6);break;default:xt(o,2)}}}function dc(o,u){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*u}function xt(o,u){if(o.j.info("Error code "+u),u==2){var h=v(o.fb,o),f=o.Xa;const w=!f;f=new Mt(f||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Vr(f,"https"),Or(f),w?Of(f.toString(),h):Lf(f.toString(),h)}else Te(2);o.G=0,o.l&&o.l.sa(u),fc(o),oc(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Te(2)):(this.j.info("Failed to ping google.com"),Te(1))};function fc(o){if(o.G=0,o.ka=[],o.l){const u=za(o.h);(u.length!=0||o.i.length!=0)&&(D(o.ka,u),D(o.ka,o.i),o.h.i.length=0,O(o.i),o.i.length=0),o.l.ra()}}function pc(o,u,h){var f=h instanceof Mt?Qe(h):new Mt(h);if(f.g!="")u&&(f.g=u+"."+f.g),Nr(f,f.s);else{var w=c.location;f=w.protocol,u=u?u+"."+w.hostname:w.hostname,w=+w.port;var R=new Mt(null);f&&Vr(R,f),u&&(R.g=u),w&&Nr(R,w),h&&(R.l=h),f=R}return h=o.D,u=o.ya,h&&u&&Y(f,h,u),Y(f,"VER",o.la),qn(o,f),f}function mc(o,u,h){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new ee(new Lr({eb:h})):new ee(o.pa),u.Ha(o.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function gc(){}n=gc.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function jr(){}jr.prototype.g=function(o,u){return new be(o,u)};function be(o,u){pe.call(this),this.g=new sc(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!B(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!B(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new Zt(this)}C(be,pe),be.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},be.prototype.close=function(){Es(this.g)},be.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=us(o),o=h);u.i.push(new Af(u.Ya++,o)),u.G==3&&Ur(u)},be.prototype.N=function(){this.g.l=null,delete this.j,Es(this.g),delete this.g,be.aa.N.call(this)};function _c(o){hs.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(const h in u){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}C(_c,hs);function yc(){ds.call(this),this.status=1}C(yc,ds);function Zt(o){this.g=o}C(Zt,gc),Zt.prototype.ua=function(){Ee(this.g,"a")},Zt.prototype.ta=function(o){Ee(this.g,new _c(o))},Zt.prototype.sa=function(o){Ee(this.g,new yc)},Zt.prototype.ra=function(){Ee(this.g,"b")},jr.prototype.createWebChannel=jr.prototype.g,be.prototype.send=be.prototype.o,be.prototype.open=be.prototype.m,be.prototype.close=be.prototype.close,ah=function(){return new jr},oh=function(){return Pr()},sh=Ot,Ys={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Cr.NO_ERROR=0,Cr.TIMEOUT=8,Cr.HTTP_ERROR=6,Zr=Cr,Oa.COMPLETE="complete",ih=Oa,Ca.EventType=Vn,Vn.OPEN="a",Vn.CLOSE="b",Vn.ERROR="c",Vn.MESSAGE="d",pe.prototype.listen=pe.prototype.K,Hn=Ca,ee.prototype.listenOnce=ee.prototype.L,ee.prototype.getLastError=ee.prototype.Ka,ee.prototype.getLastErrorCode=ee.prototype.Ba,ee.prototype.getStatus=ee.prototype.Z,ee.prototype.getResponseJson=ee.prototype.Oa,ee.prototype.getResponseText=ee.prototype.oa,ee.prototype.send=ee.prototype.ea,ee.prototype.setWithCredentials=ee.prototype.Ha,rh=ee}).apply(typeof zr<"u"?zr:typeof self<"u"?self:typeof window<"u"?window:{});const eu="@firebase/firestore",tu="4.7.14";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ye.UNAUTHENTICATED=new ye(null),ye.GOOGLE_CREDENTIALS=new ye("google-credentials-uid"),ye.FIRST_PARTY=new ye("first-party-uid"),ye.MOCK_USER=new ye("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let En="11.7.3";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qt=new ki("@firebase/firestore");function tn(){return qt.logLevel}function N(n,...e){if(qt.logLevel<=q.DEBUG){const t=e.map(Do);qt.debug(`Firestore (${En}): ${n}`,...t)}}function it(n,...e){if(qt.logLevel<=q.ERROR){const t=e.map(Do);qt.error(`Firestore (${En}): ${n}`,...t)}}function dn(n,...e){if(qt.logLevel<=q.WARN){const t=e.map(Do);qt.warn(`Firestore (${En}): ${n}`,...t)}}function Do(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,ch(n,r,t)}function ch(n,e,t){let r=`FIRESTORE (${En}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw it(r),new Error(r)}function K(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||ch(e,i,r)}function U(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends Be{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class G_{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ye.UNAUTHENTICATED))}shutdown(){}}class H_{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class W_{constructor(e){this.t=e,this.currentUser=ye.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){K(this.o===void 0,42304);let r=this.i;const i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let s=new et;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new et,e.enqueueRetryable(()=>i(this.currentUser))};const a=()=>{const l=s;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},c=l=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new et)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(K(typeof r.accessToken=="string",31837,{l:r}),new uh(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return K(e===null||typeof e=="string",2055,{h:e}),new ye(e)}}class K_{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=ye.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Q_{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new K_(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(ye.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class nu{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Y_{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,De(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){K(this.o===void 0,3512);const r=s=>{s.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const a=s.token!==this.m;return this.m=s.token,N("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new nu(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(K(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new nu(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J_(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lh(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hh{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=J_(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}}function j(n,e){return n<e?-1:n>e?1:0}function Js(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=n.codePointAt(t),i=e.codePointAt(t);if(r!==i){if(r<128&&i<128)return j(r,i);{const s=lh(),a=X_(s.encode(ru(n,t)),s.encode(ru(e,t)));return a!==0?a:j(r,i)}}t+=r>65535?2:1}return j(n.length,e.length)}function ru(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function X_(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return j(n[t],e[t]);return j(n.length,e.length)}function fn(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iu=-62135596800,su=1e6;class oe{static now(){return oe.fromMillis(Date.now())}static fromDate(e){return oe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*su);return new oe(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<iu)throw new V(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/su}_compareTo(e){return this.seconds===e.seconds?j(this.nanoseconds,e.nanoseconds):j(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds-iu;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{static fromTimestamp(e){return new F(e)}static min(){return new F(new oe(0,0))}static max(){return new F(new oe(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ou="__name__";class je{constructor(e,t,r){t===void 0?t=0:t>e.length&&x(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&x(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return je.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof je?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=je.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return j(e.length,t.length)}static compareSegments(e,t){const r=je.isNumericId(e),i=je.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?je.extractNumericId(e).compare(je.extractNumericId(t)):Js(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return It.fromString(e.substring(4,e.length-2))}}class J extends je{construct(e,t,r){return new J(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new V(b.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new J(t)}static emptyPath(){return new J([])}}const Z_=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class he extends je{construct(e,t,r){return new he(e,t,r)}static isValidIdentifier(e){return Z_.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),he.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===ou}static keyField(){return new he([ou])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new V(b.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new V(b.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new V(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else c==="`"?(a=!a,i++):c!=="."||a?(r+=c,i++):(s(),i++)}if(s(),a)throw new V(b.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new he(t)}static emptyPath(){return new he([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.path=e}static fromPath(e){return new M(J.fromString(e))}static fromName(e){return new M(J.fromString(e).popFirst(5))}static empty(){return new M(J.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&J.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return J.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new M(new J(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ar=-1;function ey(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=F.fromTimestamp(r===1e9?new oe(t+1,0):new oe(t,r));return new wt(i,M.empty(),e)}function ty(n){return new wt(n.readTime,n.key,ar)}class wt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new wt(F.min(),M.empty(),ar)}static max(){return new wt(F.max(),M.empty(),ar)}}function ny(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=M.comparator(n.documentKey,e.documentKey),t!==0?t:j(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ry="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class iy{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tn(n){if(n.code!==b.FAILED_PRECONDITION||n.message!==ry)throw n;N("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&x(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new P((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof P?t:P.resolve(t)}catch(t){return P.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):P.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):P.reject(t)}static resolve(e){return new P((t,r)=>{t(e)})}static reject(e){return new P((t,r)=>{r(e)})}static waitFor(e){return new P((t,r)=>{let i=0,s=0,a=!1;e.forEach(c=>{++i,c.next(()=>{++s,a&&s===i&&t()},l=>r(l))}),a=!0,s===i&&t()})}static or(e){let t=P.resolve(!1);for(const r of e)t=t.next(i=>i?P.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new P((r,i)=>{const s=e.length,a=new Array(s);let c=0;for(let l=0;l<s;l++){const d=l;t(e[d]).next(p=>{a[d]=p,++c,c===s&&r(a)},p=>i(p))}})}static doWhile(e,t){return new P((r,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}}function sy(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function wn(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Li{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ue(r),this.ce=r=>t.writeSequenceNumber(r))}ue(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ce&&this.ce(e),e}}Li.le=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo=-1;function Mi(n){return n==null}function fi(n){return n===0&&1/n==-1/0}function oy(n){return typeof n=="number"&&Number.isInteger(n)&&!fi(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dh="";function ay(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=au(e)),e=cy(n.get(t),e);return au(e)}function cy(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case dh:t+="";break;default:t+=s}}return t}function au(n){return n+dh+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cu(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Dt(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function fh(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e,t){this.comparator=e,this.root=t||le.EMPTY}insert(e,t){return new Z(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,le.BLACK,null,null))}remove(e){return new Z(this.comparator,this.root.remove(e,this.comparator).copy(null,null,le.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Gr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Gr(this.root,e,this.comparator,!1)}getReverseIterator(){return new Gr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Gr(this.root,e,this.comparator,!0)}}class Gr{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class le{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??le.RED,this.left=i??le.EMPTY,this.right=s??le.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new le(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return le.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return le.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,le.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,le.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw x(43730,{key:this.key,value:this.value});if(this.right.isRed())throw x(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw x(27949);return e+(this.isRed()?0:1)}}le.EMPTY=null,le.RED=!0,le.BLACK=!1;le.EMPTY=new class{constructor(){this.size=0}get key(){throw x(57766)}get value(){throw x(16141)}get color(){throw x(16727)}get left(){throw x(29726)}get right(){throw x(36894)}copy(e,t,r,i,s){return this}insert(e,t,r){return new le(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e){this.comparator=e,this.data=new Z(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new uu(this.data.getIterator())}getIteratorFrom(e){return new uu(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof ae)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ae(this.comparator);return t.data=e,t}}class uu{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e){this.fields=e,e.sort(he.comparator)}static empty(){return new Pe([])}unionWith(e){let t=new ae(he.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Pe(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return fn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ph extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new ph("Invalid base64 string: "+s):s}}(e);return new de(t)}static fromUint8Array(e){const t=function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s}(e);return new de(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return j(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}de.EMPTY_BYTE_STRING=new de("");const uy=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function At(n){if(K(!!n,39018),typeof n=="string"){let e=0;const t=uy.exec(n);if(K(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ne(n.seconds),nanos:ne(n.nanos)}}function ne(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Rt(n){return typeof n=="string"?de.fromBase64String(n):de.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh="server_timestamp",gh="__type__",_h="__previous_value__",yh="__local_write_time__";function No(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[gh])===null||t===void 0?void 0:t.stringValue)===mh}function xi(n){const e=n.mapValue.fields[_h];return No(e)?xi(e):e}function cr(n){const e=At(n.mapValue.fields[yh].timestampValue);return new oe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ly{constructor(e,t,r,i,s,a,c,l,d,p){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=d,this.isUsingEmulator=p}}const pi="(default)";class ur{constructor(e,t){this.projectId=e,this.database=t||pi}static empty(){return new ur("","")}get isDefaultDatabase(){return this.database===pi}isEqual(e){return e instanceof ur&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vh="__type__",hy="__max__",Hr={mapValue:{}},Ih="__vector__",mi="value";function St(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?No(n)?4:fy(n)?9007199254740991:dy(n)?10:11:x(28295,{value:n})}function He(n,e){if(n===e)return!0;const t=St(n);if(t!==St(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return cr(n).isEqual(cr(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const a=At(i.timestampValue),c=At(s.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return Rt(i.bytesValue).isEqual(Rt(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return ne(i.geoPointValue.latitude)===ne(s.geoPointValue.latitude)&&ne(i.geoPointValue.longitude)===ne(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return ne(i.integerValue)===ne(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const a=ne(i.doubleValue),c=ne(s.doubleValue);return a===c?fi(a)===fi(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return fn(n.arrayValue.values||[],e.arrayValue.values||[],He);case 10:case 11:return function(i,s){const a=i.mapValue.fields||{},c=s.mapValue.fields||{};if(cu(a)!==cu(c))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(c[l]===void 0||!He(a[l],c[l])))return!1;return!0}(n,e);default:return x(52216,{left:n})}}function lr(n,e){return(n.values||[]).find(t=>He(t,e))!==void 0}function pn(n,e){if(n===e)return 0;const t=St(n),r=St(e);if(t!==r)return j(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return j(n.booleanValue,e.booleanValue);case 2:return function(s,a){const c=ne(s.integerValue||s.doubleValue),l=ne(a.integerValue||a.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return lu(n.timestampValue,e.timestampValue);case 4:return lu(cr(n),cr(e));case 5:return Js(n.stringValue,e.stringValue);case 6:return function(s,a){const c=Rt(s),l=Rt(a);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(s,a){const c=s.split("/"),l=a.split("/");for(let d=0;d<c.length&&d<l.length;d++){const p=j(c[d],l[d]);if(p!==0)return p}return j(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,a){const c=j(ne(s.latitude),ne(a.latitude));return c!==0?c:j(ne(s.longitude),ne(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return hu(n.arrayValue,e.arrayValue);case 10:return function(s,a){var c,l,d,p;const y=s.fields||{},v=a.fields||{},S=(c=y[mi])===null||c===void 0?void 0:c.arrayValue,C=(l=v[mi])===null||l===void 0?void 0:l.arrayValue,O=j(((d=S==null?void 0:S.values)===null||d===void 0?void 0:d.length)||0,((p=C==null?void 0:C.values)===null||p===void 0?void 0:p.length)||0);return O!==0?O:hu(S,C)}(n.mapValue,e.mapValue);case 11:return function(s,a){if(s===Hr.mapValue&&a===Hr.mapValue)return 0;if(s===Hr.mapValue)return 1;if(a===Hr.mapValue)return-1;const c=s.fields||{},l=Object.keys(c),d=a.fields||{},p=Object.keys(d);l.sort(),p.sort();for(let y=0;y<l.length&&y<p.length;++y){const v=Js(l[y],p[y]);if(v!==0)return v;const S=pn(c[l[y]],d[p[y]]);if(S!==0)return S}return j(l.length,p.length)}(n.mapValue,e.mapValue);default:throw x(23264,{Pe:t})}}function lu(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return j(n,e);const t=At(n),r=At(e),i=j(t.seconds,r.seconds);return i!==0?i:j(t.nanos,r.nanos)}function hu(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=pn(t[i],r[i]);if(s)return s}return j(t.length,r.length)}function mn(n){return Xs(n)}function Xs(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=At(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Rt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return M.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=Xs(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const a of r)s?s=!1:i+=",",i+=`${a}:${Xs(t.fields[a])}`;return i+"}"}(n.mapValue):x(61005,{value:n})}function ei(n){switch(St(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=xi(n);return e?16+ei(e):16;case 5:return 2*n.stringValue.length;case 6:return Rt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+ei(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return Dt(r.fields,(s,a)=>{i+=s.length+ei(a)}),i}(n.mapValue);default:throw x(13486,{value:n})}}function du(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Zs(n){return!!n&&"integerValue"in n}function Oo(n){return!!n&&"arrayValue"in n}function fu(n){return!!n&&"nullValue"in n}function pu(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ti(n){return!!n&&"mapValue"in n}function dy(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[vh])===null||t===void 0?void 0:t.stringValue)===Ih}function Xn(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Dt(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Xn(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Xn(n.arrayValue.values[t]);return e}return Object.assign({},n)}function fy(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===hy}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e){this.value=e}static empty(){return new Re({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ti(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Xn(t)}setAll(e){let t=he.emptyPath(),r={},i=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=c.popLast()}a?r[c.lastSegment()]=Xn(a):i.push(c.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());ti(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return He(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];ti(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Dt(t,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new Re(Xn(this.value))}}function Eh(n){const e=[];return Dt(n.fields,(t,r)=>{const i=new he([t]);if(ti(r)){const s=Eh(r.mapValue).fields;if(s.length===0)e.push(i);else for(const a of s)e.push(i.child(a))}else e.push(i)}),new Pe(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e,t,r,i,s,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=a,this.documentState=c}static newInvalidDocument(e){return new ve(e,0,F.min(),F.min(),F.min(),Re.empty(),0)}static newFoundDocument(e,t,r,i){return new ve(e,1,t,F.min(),r,i,0)}static newNoDocument(e,t){return new ve(e,2,t,F.min(),F.min(),Re.empty(),0)}static newUnknownDocument(e,t){return new ve(e,3,t,F.min(),F.min(),Re.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(F.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Re.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Re.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=F.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ve&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ve(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(e,t){this.position=e,this.inclusive=t}}function mu(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],a=n.position[i];if(s.field.isKeyField()?r=M.comparator(M.fromName(a.referenceValue),t.key):r=pn(a,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function gu(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!He(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(e,t="asc"){this.field=e,this.dir=t}}function py(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Th{}class ie extends Th{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new gy(e,t,r):t==="array-contains"?new vy(e,r):t==="in"?new Iy(e,r):t==="not-in"?new Ey(e,r):t==="array-contains-any"?new Ty(e,r):new ie(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new _y(e,r):new yy(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(pn(t,this.value)):t!==null&&St(this.value)===St(t)&&this.matchesComparison(pn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return x(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ue extends Th{constructor(e,t){super(),this.filters=e,this.op=t,this.Te=null}static create(e,t){return new Ue(e,t)}matches(e){return wh(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Te!==null||(this.Te=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Te}getFilters(){return Object.assign([],this.filters)}}function wh(n){return n.op==="and"}function Ah(n){return my(n)&&wh(n)}function my(n){for(const e of n.filters)if(e instanceof Ue)return!1;return!0}function eo(n){if(n instanceof ie)return n.field.canonicalString()+n.op.toString()+mn(n.value);if(Ah(n))return n.filters.map(e=>eo(e)).join(",");{const e=n.filters.map(t=>eo(t)).join(",");return`${n.op}(${e})`}}function Rh(n,e){return n instanceof ie?function(r,i){return i instanceof ie&&r.op===i.op&&r.field.isEqual(i.field)&&He(r.value,i.value)}(n,e):n instanceof Ue?function(r,i){return i instanceof Ue&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,a,c)=>s&&Rh(a,i.filters[c]),!0):!1}(n,e):void x(19439)}function Sh(n){return n instanceof ie?function(t){return`${t.field.canonicalString()} ${t.op} ${mn(t.value)}`}(n):n instanceof Ue?function(t){return t.op.toString()+" {"+t.getFilters().map(Sh).join(" ,")+"}"}(n):"Filter"}class gy extends ie{constructor(e,t,r){super(e,t,r),this.key=M.fromName(r.referenceValue)}matches(e){const t=M.comparator(e.key,this.key);return this.matchesComparison(t)}}class _y extends ie{constructor(e,t){super(e,"in",t),this.keys=bh("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class yy extends ie{constructor(e,t){super(e,"not-in",t),this.keys=bh("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function bh(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>M.fromName(r.referenceValue))}class vy extends ie{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Oo(t)&&lr(t.arrayValue,this.value)}}class Iy extends ie{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&lr(this.value.arrayValue,t)}}class Ey extends ie{constructor(e,t){super(e,"not-in",t)}matches(e){if(lr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!lr(this.value.arrayValue,t)}}class Ty extends ie{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Oo(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>lr(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wy{constructor(e,t=null,r=[],i=[],s=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=a,this.endAt=c,this.Ie=null}}function _u(n,e=null,t=[],r=[],i=null,s=null,a=null){return new wy(n,e,t,r,i,s,a)}function Lo(n){const e=U(n);if(e.Ie===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>eo(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Mi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>mn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>mn(r)).join(",")),e.Ie=t}return e.Ie}function Mo(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!py(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Rh(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!gu(n.startAt,e.startAt)&&gu(n.endAt,e.endAt)}function to(n){return M.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{constructor(e,t=null,r=[],i=[],s=null,a="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=a,this.startAt=c,this.endAt=l,this.Ee=null,this.de=null,this.Ae=null,this.startAt,this.endAt}}function Ay(n,e,t,r,i,s,a,c){return new An(n,e,t,r,i,s,a,c)}function xo(n){return new An(n)}function yu(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Ph(n){return n.collectionGroup!==null}function Zn(n){const e=U(n);if(e.Ee===null){e.Ee=[];const t=new Set;for(const s of e.explicitOrderBy)e.Ee.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new ae(he.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Ee.push(new hr(s,r))}),t.has(he.keyField().canonicalString())||e.Ee.push(new hr(he.keyField(),r))}return e.Ee}function qe(n){const e=U(n);return e.de||(e.de=Ry(e,Zn(n))),e.de}function Ry(n,e){if(n.limitType==="F")return _u(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new hr(i.field,s)});const t=n.endAt?new gi(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new gi(n.startAt.position,n.startAt.inclusive):null;return _u(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function no(n,e){const t=n.filters.concat([e]);return new An(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function _i(n,e,t){return new An(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Fi(n,e){return Mo(qe(n),qe(e))&&n.limitType===e.limitType}function Ch(n){return`${Lo(qe(n))}|lt:${n.limitType}`}function nn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>Sh(i)).join(", ")}]`),Mi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>mn(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>mn(i)).join(",")),`Target(${r})`}(qe(n))}; limitType=${n.limitType})`}function Ui(n,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):M.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(const s of Zn(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(a,c,l){const d=mu(a,c,l);return a.inclusive?d<=0:d<0}(r.startAt,Zn(r),i)||r.endAt&&!function(a,c,l){const d=mu(a,c,l);return a.inclusive?d>=0:d>0}(r.endAt,Zn(r),i))}(n,e)}function Sy(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function kh(n){return(e,t)=>{let r=!1;for(const i of Zn(n)){const s=by(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function by(n,e,t){const r=n.field.isKeyField()?M.comparator(e.key,t.key):function(s,a,c){const l=a.data.field(s),d=c.data.field(s);return l!==null&&d!==null?pn(l,d):x(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return x(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Dt(this.inner,(t,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return fh(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Py=new Z(M.comparator);function st(){return Py}const Dh=new Z(M.comparator);function Wn(...n){let e=Dh;for(const t of n)e=e.insert(t.key,t);return e}function Vh(n){let e=Dh;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Bt(){return er()}function Nh(){return er()}function er(){return new Qt(n=>n.toString(),(n,e)=>n.isEqual(e))}const Cy=new Z(M.comparator),ky=new ae(M.comparator);function z(...n){let e=ky;for(const t of n)e=e.add(t);return e}const Dy=new ae(j);function Vy(){return Dy}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fo(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:fi(e)?"-0":e}}function Oh(n){return{integerValue:""+n}}function Ny(n,e){return oy(e)?Oh(e):Fo(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(){this._=void 0}}function Oy(n,e,t){return n instanceof yi?function(i,s){const a={fields:{[gh]:{stringValue:mh},[yh]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&No(s)&&(s=xi(s)),s&&(a.fields[_h]=s),{mapValue:a}}(t,e):n instanceof dr?Mh(n,e):n instanceof fr?xh(n,e):function(i,s){const a=Lh(i,s),c=vu(a)+vu(i.Re);return Zs(a)&&Zs(i.Re)?Oh(c):Fo(i.serializer,c)}(n,e)}function Ly(n,e,t){return n instanceof dr?Mh(n,e):n instanceof fr?xh(n,e):t}function Lh(n,e){return n instanceof vi?function(r){return Zs(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class yi extends Bi{}class dr extends Bi{constructor(e){super(),this.elements=e}}function Mh(n,e){const t=Fh(e);for(const r of n.elements)t.some(i=>He(i,r))||t.push(r);return{arrayValue:{values:t}}}class fr extends Bi{constructor(e){super(),this.elements=e}}function xh(n,e){let t=Fh(e);for(const r of n.elements)t=t.filter(i=>!He(i,r));return{arrayValue:{values:t}}}class vi extends Bi{constructor(e,t){super(),this.serializer=e,this.Re=t}}function vu(n){return ne(n.integerValue||n.doubleValue)}function Fh(n){return Oo(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function My(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof dr&&i instanceof dr||r instanceof fr&&i instanceof fr?fn(r.elements,i.elements,He):r instanceof vi&&i instanceof vi?He(r.Re,i.Re):r instanceof yi&&i instanceof yi}(n.transform,e.transform)}class xy{constructor(e,t){this.version=e,this.transformResults=t}}class xe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new xe}static exists(e){return new xe(void 0,e)}static updateTime(e){return new xe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ni(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class ji{}function Uh(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new jh(n.key,xe.none()):new vr(n.key,n.data,xe.none());{const t=n.data,r=Re.empty();let i=new ae(he.comparator);for(let s of e.fields)if(!i.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?r.delete(s):r.set(s,a),i=i.add(s)}return new Vt(n.key,r,new Pe(i.toArray()),xe.none())}}function Fy(n,e,t){n instanceof vr?function(i,s,a){const c=i.value.clone(),l=Eu(i.fieldTransforms,s,a.transformResults);c.setAll(l),s.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Vt?function(i,s,a){if(!ni(i.precondition,s))return void s.convertToUnknownDocument(a.version);const c=Eu(i.fieldTransforms,s,a.transformResults),l=s.data;l.setAll(Bh(i)),l.setAll(c),s.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function tr(n,e,t,r){return n instanceof vr?function(s,a,c,l){if(!ni(s.precondition,a))return c;const d=s.value.clone(),p=Tu(s.fieldTransforms,l,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof Vt?function(s,a,c,l){if(!ni(s.precondition,a))return c;const d=Tu(s.fieldTransforms,l,a),p=a.data;return p.setAll(Bh(s)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(y=>y.field))}(n,e,t,r):function(s,a,c){return ni(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function Uy(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=Lh(r.transform,i||null);s!=null&&(t===null&&(t=Re.empty()),t.set(r.field,s))}return t||null}function Iu(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&fn(r,i,(s,a)=>My(s,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class vr extends ji{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Vt extends ji{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function Bh(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Eu(n,e,t){const r=new Map;K(n.length===t.length,32656,{Ve:t.length,me:n.length});for(let i=0;i<t.length;i++){const s=n[i],a=s.transform,c=e.data.field(s.field);r.set(s.field,Ly(a,c,t[i]))}return r}function Tu(n,e,t){const r=new Map;for(const i of n){const s=i.transform,a=t.data.field(i.field);r.set(i.field,Oy(s,a,e))}return r}class jh extends ji{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class By extends ji{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jy{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&Fy(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=tr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=tr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Nh();return this.mutations.forEach(i=>{const s=e.get(i.key),a=s.overlayedDocument;let c=this.applyToLocalView(a,s.mutatedFields);c=t.has(i.key)?null:c;const l=Uh(a,c);l!==null&&r.set(i.key,l),a.isValidDocument()||a.convertToNoDocument(F.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),z())}isEqual(e){return this.batchId===e.batchId&&fn(this.mutations,e.mutations,(t,r)=>Iu(t,r))&&fn(this.baseMutations,e.baseMutations,(t,r)=>Iu(t,r))}}class Uo{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){K(e.mutations.length===r.length,58842,{fe:e.mutations.length,ge:r.length});let i=function(){return Cy}();const s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,r[a].version);return new Uo(e,t,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $y{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qy{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var re,G;function zy(n){switch(n){case b.OK:return x(64938);case b.CANCELLED:case b.UNKNOWN:case b.DEADLINE_EXCEEDED:case b.RESOURCE_EXHAUSTED:case b.INTERNAL:case b.UNAVAILABLE:case b.UNAUTHENTICATED:return!1;case b.INVALID_ARGUMENT:case b.NOT_FOUND:case b.ALREADY_EXISTS:case b.PERMISSION_DENIED:case b.FAILED_PRECONDITION:case b.ABORTED:case b.OUT_OF_RANGE:case b.UNIMPLEMENTED:case b.DATA_LOSS:return!0;default:return x(15467,{code:n})}}function $h(n){if(n===void 0)return it("GRPC error has no .code"),b.UNKNOWN;switch(n){case re.OK:return b.OK;case re.CANCELLED:return b.CANCELLED;case re.UNKNOWN:return b.UNKNOWN;case re.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case re.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case re.INTERNAL:return b.INTERNAL;case re.UNAVAILABLE:return b.UNAVAILABLE;case re.UNAUTHENTICATED:return b.UNAUTHENTICATED;case re.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case re.NOT_FOUND:return b.NOT_FOUND;case re.ALREADY_EXISTS:return b.ALREADY_EXISTS;case re.PERMISSION_DENIED:return b.PERMISSION_DENIED;case re.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case re.ABORTED:return b.ABORTED;case re.OUT_OF_RANGE:return b.OUT_OF_RANGE;case re.UNIMPLEMENTED:return b.UNIMPLEMENTED;case re.DATA_LOSS:return b.DATA_LOSS;default:return x(39323,{code:n})}}(G=re||(re={}))[G.OK=0]="OK",G[G.CANCELLED=1]="CANCELLED",G[G.UNKNOWN=2]="UNKNOWN",G[G.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",G[G.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",G[G.NOT_FOUND=5]="NOT_FOUND",G[G.ALREADY_EXISTS=6]="ALREADY_EXISTS",G[G.PERMISSION_DENIED=7]="PERMISSION_DENIED",G[G.UNAUTHENTICATED=16]="UNAUTHENTICATED",G[G.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",G[G.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",G[G.ABORTED=10]="ABORTED",G[G.OUT_OF_RANGE=11]="OUT_OF_RANGE",G[G.UNIMPLEMENTED=12]="UNIMPLEMENTED",G[G.INTERNAL=13]="INTERNAL",G[G.UNAVAILABLE=14]="UNAVAILABLE",G[G.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gy=new It([4294967295,4294967295],0);function wu(n){const e=lh().encode(n),t=new nh;return t.update(e),new Uint8Array(t.digest())}function Au(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new It([t,r],0),new It([i,s],0)]}class Bo{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Kn(`Invalid padding: ${t}`);if(r<0)throw new Kn(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Kn(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Kn(`Invalid padding when bitmap length is 0: ${t}`);this.pe=8*e.length-t,this.ye=It.fromNumber(this.pe)}we(e,t,r){let i=e.add(t.multiply(It.fromNumber(r)));return i.compare(Gy)===1&&(i=new It([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ye).toNumber()}be(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.pe===0)return!1;const t=wu(e),[r,i]=Au(t);for(let s=0;s<this.hashCount;s++){const a=this.we(r,i,s);if(!this.be(a))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new Bo(s,i,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.pe===0)return;const t=wu(e),[r,i]=Au(t);for(let s=0;s<this.hashCount;s++){const a=this.we(r,i,s);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Kn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,Ir.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new $i(F.min(),i,new Z(j),st(),z())}}class Ir{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Ir(r,t,z(),z(),z())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{constructor(e,t,r,i){this.De=e,this.removedTargetIds=t,this.key=r,this.ve=i}}class qh{constructor(e,t){this.targetId=e,this.Ce=t}}class zh{constructor(e,t,r=de.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class Ru{constructor(){this.Fe=0,this.Me=Su(),this.xe=de.EMPTY_BYTE_STRING,this.Oe=!1,this.Ne=!0}get current(){return this.Oe}get resumeToken(){return this.xe}get Be(){return this.Fe!==0}get Le(){return this.Ne}ke(e){e.approximateByteSize()>0&&(this.Ne=!0,this.xe=e)}qe(){let e=z(),t=z(),r=z();return this.Me.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:x(38017,{changeType:s})}}),new Ir(this.xe,this.Oe,e,t,r)}Qe(){this.Ne=!1,this.Me=Su()}$e(e,t){this.Ne=!0,this.Me=this.Me.insert(e,t)}Ue(e){this.Ne=!0,this.Me=this.Me.remove(e)}Ke(){this.Fe+=1}We(){this.Fe-=1,K(this.Fe>=0,3241,{Fe:this.Fe})}Ge(){this.Ne=!0,this.Oe=!0}}class Hy{constructor(e){this.ze=e,this.je=new Map,this.He=st(),this.Je=Wr(),this.Ye=Wr(),this.Ze=new Z(j)}Xe(e){for(const t of e.De)e.ve&&e.ve.isFoundDocument()?this.et(t,e.ve):this.tt(t,e.key,e.ve);for(const t of e.removedTargetIds)this.tt(t,e.key,e.ve)}nt(e){this.forEachTarget(e,t=>{const r=this.rt(t);switch(e.state){case 0:this.it(t)&&r.ke(e.resumeToken);break;case 1:r.We(),r.Be||r.Qe(),r.ke(e.resumeToken);break;case 2:r.We(),r.Be||this.removeTarget(t);break;case 3:this.it(t)&&(r.Ge(),r.ke(e.resumeToken));break;case 4:this.it(t)&&(this.st(t),r.ke(e.resumeToken));break;default:x(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.je.forEach((r,i)=>{this.it(i)&&t(i)})}ot(e){const t=e.targetId,r=e.Ce.count,i=this._t(t);if(i){const s=i.target;if(to(s))if(r===0){const a=new M(s.path);this.tt(t,a,ve.newNoDocument(a,F.min()))}else K(r===1,20013,{expectedCount:r});else{const a=this.ut(t);if(a!==r){const c=this.ct(e),l=c?this.lt(c,e,a):1;if(l!==0){this.st(t);const d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,d)}}}}}ct(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let a,c;try{a=Rt(r).toUint8Array()}catch(l){if(l instanceof ph)return dn("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new Bo(a,i,s)}catch(l){return dn(l instanceof Kn?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.pe===0?null:c}lt(e,t,r){return t.Ce.count===r-this.Tt(e,t.targetId)?0:2}Tt(e,t){const r=this.ze.getRemoteKeysForTarget(t);let i=0;return r.forEach(s=>{const a=this.ze.Pt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.tt(t,s,null),i++)}),i}It(e){const t=new Map;this.je.forEach((s,a)=>{const c=this._t(a);if(c){if(s.current&&to(c.target)){const l=new M(c.target.path);this.Et(l).has(a)||this.dt(a,l)||this.tt(a,l,ve.newNoDocument(l,e))}s.Le&&(t.set(a,s.qe()),s.Qe())}});let r=z();this.Ye.forEach((s,a)=>{let c=!0;a.forEachWhile(l=>{const d=this._t(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.He.forEach((s,a)=>a.setReadTime(e));const i=new $i(e,t,this.Ze,this.He,r);return this.He=st(),this.Je=Wr(),this.Ye=Wr(),this.Ze=new Z(j),i}et(e,t){if(!this.it(e))return;const r=this.dt(e,t.key)?2:0;this.rt(e).$e(t.key,r),this.He=this.He.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.Ye=this.Ye.insert(t.key,this.At(t.key).add(e))}tt(e,t,r){if(!this.it(e))return;const i=this.rt(e);this.dt(e,t)?i.$e(t,1):i.Ue(t),this.Ye=this.Ye.insert(t,this.At(t).delete(e)),this.Ye=this.Ye.insert(t,this.At(t).add(e)),r&&(this.He=this.He.insert(t,r))}removeTarget(e){this.je.delete(e)}ut(e){const t=this.rt(e).qe();return this.ze.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ke(e){this.rt(e).Ke()}rt(e){let t=this.je.get(e);return t||(t=new Ru,this.je.set(e,t)),t}At(e){let t=this.Ye.get(e);return t||(t=new ae(j),this.Ye=this.Ye.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new ae(j),this.Je=this.Je.insert(e,t)),t}it(e){const t=this._t(e)!==null;return t||N("WatchChangeAggregator","Detected inactive target",e),t}_t(e){const t=this.je.get(e);return t&&t.Be?null:this.ze.Rt(e)}st(e){this.je.set(e,new Ru),this.ze.getRemoteKeysForTarget(e).forEach(t=>{this.tt(e,t,null)})}dt(e,t){return this.ze.getRemoteKeysForTarget(e).has(t)}}function Wr(){return new Z(M.comparator)}function Su(){return new Z(M.comparator)}const Wy={asc:"ASCENDING",desc:"DESCENDING"},Ky={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Qy={and:"AND",or:"OR"};class Yy{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ro(n,e){return n.useProto3Json||Mi(e)?e:{value:e}}function Ii(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Gh(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Jy(n,e){return Ii(n,e.toTimestamp())}function ze(n){return K(!!n,49232),F.fromTimestamp(function(t){const r=At(t);return new oe(r.seconds,r.nanos)}(n))}function jo(n,e){return io(n,e).canonicalString()}function io(n,e){const t=function(i){return new J(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Hh(n){const e=J.fromString(n);return K(Jh(e),10190,{key:e.toString()}),e}function so(n,e){return jo(n.databaseId,e.path)}function Vs(n,e){const t=Hh(e);if(t.get(1)!==n.databaseId.projectId)throw new V(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new V(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new M(Kh(t))}function Wh(n,e){return jo(n.databaseId,e)}function Xy(n){const e=Hh(n);return e.length===4?J.emptyPath():Kh(e)}function oo(n){return new J(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Kh(n){return K(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function bu(n,e,t){return{name:so(n,e),fields:t.value.mapValue.fields}}function Zy(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:x(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(d,p){return d.useProto3Json?(K(p===void 0||typeof p=="string",58123),de.fromBase64String(p||"")):(K(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),de.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(d){const p=d.code===void 0?b.UNKNOWN:$h(d.code);return new V(p,d.message||"")}(a);t=new zh(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Vs(n,r.document.name),s=ze(r.document.updateTime),a=r.document.createTime?ze(r.document.createTime):F.min(),c=new Re({mapValue:{fields:r.document.fields}}),l=ve.newFoundDocument(i,s,a,c),d=r.targetIds||[],p=r.removedTargetIds||[];t=new ri(d,p,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Vs(n,r.document),s=r.readTime?ze(r.readTime):F.min(),a=ve.newNoDocument(i,s),c=r.removedTargetIds||[];t=new ri([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Vs(n,r.document),s=r.removedTargetIds||[];t=new ri([],s,i,null)}else{if(!("filter"in e))return x(11601,{Vt:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,a=new qy(i,s),c=r.targetId;t=new qh(c,a)}}return t}function ev(n,e){let t;if(e instanceof vr)t={update:bu(n,e.key,e.value)};else if(e instanceof jh)t={delete:so(n,e.key)};else if(e instanceof Vt)t={update:bu(n,e.key,e.data),updateMask:uv(e.fieldMask)};else{if(!(e instanceof By))return x(16599,{ft:e.type});t={verify:so(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,a){const c=a.transform;if(c instanceof yi)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof dr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof fr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof vi)return{fieldPath:a.field.canonicalString(),increment:c.Re};throw x(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:Jy(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:x(27497)}(n,e.precondition)),t}function tv(n,e){return n&&n.length>0?(K(e!==void 0,14353),n.map(t=>function(i,s){let a=i.updateTime?ze(i.updateTime):ze(s);return a.isEqual(F.min())&&(a=ze(s)),new xy(a,i.transformResults||[])}(t,e))):[]}function nv(n,e){return{documents:[Wh(n,e.path)]}}function rv(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Wh(n,i);const s=function(d){if(d.length!==0)return Yh(Ue.create(d,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const a=function(d){if(d.length!==0)return d.map(p=>function(v){return{field:rn(v.field),direction:ov(v.dir)}}(p))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=ro(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{gt:t,parent:i}}function iv(n){let e=Xy(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){K(r===1,65062);const p=t.from[0];p.allDescendants?i=p.collectionId:e=e.child(p.collectionId)}let s=[];t.where&&(s=function(y){const v=Qh(y);return v instanceof Ue&&Ah(v)?v.getFilters():[v]}(t.where));let a=[];t.orderBy&&(a=function(y){return y.map(v=>function(C){return new hr(sn(C.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(v))}(t.orderBy));let c=null;t.limit&&(c=function(y){let v;return v=typeof y=="object"?y.value:y,Mi(v)?null:v}(t.limit));let l=null;t.startAt&&(l=function(y){const v=!!y.before,S=y.values||[];return new gi(S,v)}(t.startAt));let d=null;return t.endAt&&(d=function(y){const v=!y.before,S=y.values||[];return new gi(S,v)}(t.endAt)),Ay(e,i,a,s,c,"F",l,d)}function sv(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return x(28987,{purpose:i})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Qh(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=sn(t.unaryFilter.field);return ie.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=sn(t.unaryFilter.field);return ie.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=sn(t.unaryFilter.field);return ie.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=sn(t.unaryFilter.field);return ie.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return x(61313);default:return x(60726)}}(n):n.fieldFilter!==void 0?function(t){return ie.create(sn(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return x(58110);default:return x(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Ue.create(t.compositeFilter.filters.map(r=>Qh(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return x(1026)}}(t.compositeFilter.op))}(n):x(30097,{filter:n})}function ov(n){return Wy[n]}function av(n){return Ky[n]}function cv(n){return Qy[n]}function rn(n){return{fieldPath:n.canonicalString()}}function sn(n){return he.fromServerFormat(n.fieldPath)}function Yh(n){return n instanceof ie?function(t){if(t.op==="=="){if(pu(t.value))return{unaryFilter:{field:rn(t.field),op:"IS_NAN"}};if(fu(t.value))return{unaryFilter:{field:rn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(pu(t.value))return{unaryFilter:{field:rn(t.field),op:"IS_NOT_NAN"}};if(fu(t.value))return{unaryFilter:{field:rn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:rn(t.field),op:av(t.op),value:t.value}}}(n):n instanceof Ue?function(t){const r=t.getFilters().map(i=>Yh(i));return r.length===1?r[0]:{compositeFilter:{op:cv(t.op),filters:r}}}(n):x(54877,{filter:n})}function uv(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Jh(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e,t,r,i,s=F.min(),a=F.min(),c=de.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new gt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new gt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new gt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new gt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lv{constructor(e){this.wt=e}}function hv(n){const e=iv({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?_i(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dv{constructor(){this.yn=new fv}addToCollectionParentIndex(e,t){return this.yn.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.yn.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(wt.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(wt.min())}updateCollectionGroup(e,t,r){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}}class fv{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new ae(J.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new ae(J.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Xh=41943040;class Ae{static withCacheSize(e){return new Ae(e,Ae.DEFAULT_COLLECTION_PERCENTILE,Ae.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ae.DEFAULT_COLLECTION_PERCENTILE=10,Ae.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ae.DEFAULT=new Ae(Xh,Ae.DEFAULT_COLLECTION_PERCENTILE,Ae.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ae.DISABLED=new Ae(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(e){this.nr=e}next(){return this.nr+=2,this.nr}static rr(){return new gn(0)}static ir(){return new gn(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cu="LruGarbageCollector",pv=1048576;function ku([n,e],[t,r]){const i=j(n,t);return i===0?j(e,r):i}class mv{constructor(e){this.cr=e,this.buffer=new ae(ku),this.lr=0}hr(){return++this.lr}Pr(e){const t=[e,this.hr()];if(this.buffer.size<this.cr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();ku(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class gv{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Tr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ir(6e4)}stop(){this.Tr&&(this.Tr.cancel(),this.Tr=null)}get started(){return this.Tr!==null}Ir(e){N(Cu,`Garbage collection scheduled in ${e}ms`),this.Tr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Tr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){wn(t)?N(Cu,"Ignoring IndexedDB error during garbage collection: ",t):await Tn(t)}await this.Ir(3e5)})}}class _v{constructor(e,t){this.Er=e,this.params=t}calculateTargetCount(e,t){return this.Er.dr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return P.resolve(Li.le);const r=new mv(t);return this.Er.forEachTarget(e,i=>r.Pr(i.sequenceNumber)).next(()=>this.Er.Ar(e,i=>r.Pr(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Er.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Er.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(Pu)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Pu):this.Rr(e,t))}getCacheSize(e){return this.Er.getCacheSize(e)}Rr(e,t){let r,i,s,a,c,l,d;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(y=>(y>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${y}`),i=this.params.maximumSequenceNumbersToCollect):i=y,a=Date.now(),this.nthSequenceNumber(e,i))).next(y=>(r=y,c=Date.now(),this.removeTargets(e,r,t))).next(y=>(s=y,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(y=>(d=Date.now(),tn()<=q.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${i} in `+(c-a)+`ms
	Removed ${s} targets in `+(l-c)+`ms
	Removed ${y} documents in `+(d-l)+`ms
Total Duration: ${d-p}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:y})))}}function yv(n,e){return new _v(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vv{constructor(){this.changes=new Qt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ve.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?P.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iv{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ev{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&tr(r.mutation,i,Pe.empty(),oe.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,z()).next(()=>r))}getLocalViewOfDocuments(e,t,r=z()){const i=Bt();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let a=Wn();return s.forEach((c,l)=>{a=a.insert(c,l.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Bt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,z()))}populateOverlays(e,t,r){const i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,i){let s=st();const a=er(),c=function(){return er()}();return t.forEach((l,d)=>{const p=r.get(d.key);i.has(d.key)&&(p===void 0||p.mutation instanceof Vt)?s=s.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),tr(p.mutation,d,p.mutation.getFieldMask(),oe.now())):a.set(d.key,Pe.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((d,p)=>a.set(d,p)),t.forEach((d,p)=>{var y;return c.set(d,new Iv(p,(y=a.get(d))!==null&&y!==void 0?y:null))}),c))}recalculateAndSaveOverlays(e,t){const r=er();let i=new Z((a,c)=>a-c),s=z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(l=>{const d=t.get(l);if(d===null)return;let p=r.get(l)||Pe.empty();p=c.applyToLocalView(d,p),r.set(l,p);const y=(i.get(c.batchId)||z()).add(l);i=i.insert(c.batchId,y)})}).next(()=>{const a=[],c=i.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),d=l.key,p=l.value,y=Nh();p.forEach(v=>{if(!s.has(v)){const S=Uh(t.get(v),r.get(v));S!==null&&y.set(v,S),s=s.add(v)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,y))}return P.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(a){return M.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Ph(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{const a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):P.resolve(Bt());let c=ar,l=s;return a.next(d=>P.forEach(d,(p,y)=>(c<y.largestBatchId&&(c=y.largestBatchId),s.get(p)?P.resolve():this.remoteDocumentCache.getEntry(e,p).next(v=>{l=l.insert(p,v)}))).next(()=>this.populateOverlays(e,d,s)).next(()=>this.computeViews(e,l,d,z())).next(p=>({batchId:c,changes:Vh(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new M(t)).next(r=>{let i=Wn();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let a=Wn();return this.indexManager.getCollectionParents(e,s).next(c=>P.forEach(c,l=>{const d=function(y,v){return new An(v,null,y.explicitOrderBy.slice(),y.filters.slice(),y.limit,y.limitType,y.startAt,y.endAt)}(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next(p=>{p.forEach((y,v)=>{a=a.insert(y,v)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(a=>{s.forEach((l,d)=>{const p=d.getKey();a.get(p)===null&&(a=a.insert(p,ve.newInvalidDocument(p)))});let c=Wn();return a.forEach((l,d)=>{const p=s.get(l);p!==void 0&&tr(p.mutation,d,Pe.empty(),oe.now()),Ui(t,d)&&(c=c.insert(l,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tv{constructor(e){this.serializer=e,this.Fr=new Map,this.Mr=new Map}getBundleMetadata(e,t){return P.resolve(this.Fr.get(t))}saveBundleMetadata(e,t){return this.Fr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:ze(i.createTime)}}(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.Mr.get(t))}saveNamedQuery(e,t){return this.Mr.set(t.name,function(i){return{name:i.name,query:hv(i.bundledQuery),readTime:ze(i.readTime)}}(t)),P.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wv{constructor(){this.overlays=new Z(M.comparator),this.Or=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Bt();return P.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.St(e,t,s)}),P.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Or.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Or.delete(r)),P.resolve()}getOverlaysForCollection(e,t,r){const i=Bt(),s=t.length+1,a=new M(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const l=c.getNext().value,d=l.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===s&&l.largestBatchId>r&&i.set(l.getKey(),l)}return P.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new Z((d,p)=>d-p);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let p=s.get(d.largestBatchId);p===null&&(p=Bt(),s=s.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const c=Bt(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,p)=>c.set(d,p)),!(c.size()>=i)););return P.resolve(c)}St(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const a=this.Or.get(i.largestBatchId).delete(r.key);this.Or.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new $y(t,r));let s=this.Or.get(t);s===void 0&&(s=z(),this.Or.set(t,s)),this.Or.set(t,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Av{constructor(){this.sessionToken=de.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{constructor(){this.Nr=new ae(ce.Br),this.Lr=new ae(ce.kr)}isEmpty(){return this.Nr.isEmpty()}addReference(e,t){const r=new ce(e,t);this.Nr=this.Nr.add(r),this.Lr=this.Lr.add(r)}qr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Qr(new ce(e,t))}$r(e,t){e.forEach(r=>this.removeReference(r,t))}Ur(e){const t=new M(new J([])),r=new ce(t,e),i=new ce(t,e+1),s=[];return this.Lr.forEachInRange([r,i],a=>{this.Qr(a),s.push(a.key)}),s}Kr(){this.Nr.forEach(e=>this.Qr(e))}Qr(e){this.Nr=this.Nr.delete(e),this.Lr=this.Lr.delete(e)}Wr(e){const t=new M(new J([])),r=new ce(t,e),i=new ce(t,e+1);let s=z();return this.Lr.forEachInRange([r,i],a=>{s=s.add(a.key)}),s}containsKey(e){const t=new ce(e,0),r=this.Nr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ce{constructor(e,t){this.key=e,this.Gr=t}static Br(e,t){return M.comparator(e.key,t.key)||j(e.Gr,t.Gr)}static kr(e,t){return j(e.Gr,t.Gr)||M.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rv{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Jn=1,this.zr=new ae(ce.Br)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.Jn;this.Jn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new jy(s,t,r,i);this.mutationQueue.push(a);for(const c of i)this.zr=this.zr.add(new ce(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return P.resolve(a)}lookupMutationBatch(e,t){return P.resolve(this.jr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Hr(r),s=i<0?0:i;return P.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?Vo:this.Jn-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ce(t,0),i=new ce(t,Number.POSITIVE_INFINITY),s=[];return this.zr.forEachInRange([r,i],a=>{const c=this.jr(a.Gr);s.push(c)}),P.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ae(j);return t.forEach(i=>{const s=new ce(i,0),a=new ce(i,Number.POSITIVE_INFINITY);this.zr.forEachInRange([s,a],c=>{r=r.add(c.Gr)})}),P.resolve(this.Jr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;M.isDocumentKey(s)||(s=s.child(""));const a=new ce(new M(s),0);let c=new ae(j);return this.zr.forEachWhile(l=>{const d=l.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(c=c.add(l.Gr)),!0)},a),P.resolve(this.Jr(c))}Jr(e){const t=[];return e.forEach(r=>{const i=this.jr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){K(this.Yr(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.zr;return P.forEach(t.mutations,i=>{const s=new ce(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.zr=r})}Xn(e){}containsKey(e,t){const r=new ce(t,0),i=this.zr.firstAfterOrEqual(r);return P.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}Yr(e,t){return this.Hr(e)}Hr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}jr(e){const t=this.Hr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sv{constructor(e){this.Zr=e,this.docs=function(){return new Z(M.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,a=this.Zr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return P.resolve(r?r.document.mutableCopy():ve.newInvalidDocument(t))}getEntries(e,t){let r=st();return t.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():ve.newInvalidDocument(i))}),P.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=st();const a=t.path,c=new M(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:d,value:{document:p}}=l.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||ny(ty(p),r)<=0||(i.has(p.key)||Ui(t,p))&&(s=s.insert(p.key,p.mutableCopy()))}return P.resolve(s)}getAllFromCollectionGroup(e,t,r,i){x(9500)}Xr(e,t){return P.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new bv(this)}getSize(e){return P.resolve(this.size)}}class bv extends vv{constructor(e){super(),this.vr=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.vr.addEntry(e,i)):this.vr.removeEntry(r)}),P.waitFor(t)}getFromCache(e,t){return this.vr.getEntry(e,t)}getAllFromCache(e,t){return this.vr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pv{constructor(e){this.persistence=e,this.ei=new Qt(t=>Lo(t),Mo),this.lastRemoteSnapshotVersion=F.min(),this.highestTargetId=0,this.ti=0,this.ni=new $o,this.targetCount=0,this.ri=gn.rr()}forEachTarget(e,t){return this.ei.forEach((r,i)=>t(i)),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.ti)}allocateTargetId(e){return this.highestTargetId=this.ri.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ti&&(this.ti=t),P.resolve()}ar(e){this.ei.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ri=new gn(t),this.highestTargetId=t),e.sequenceNumber>this.ti&&(this.ti=e.sequenceNumber)}addTargetData(e,t){return this.ar(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.ar(t),P.resolve()}removeTargetData(e,t){return this.ei.delete(t.target),this.ni.Ur(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.ei.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ei.delete(a),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),P.waitFor(s).next(()=>i)}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){const r=this.ei.get(t)||null;return P.resolve(r)}addMatchingKeys(e,t,r){return this.ni.qr(t,r),P.resolve()}removeMatchingKeys(e,t,r){this.ni.$r(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(a=>{s.push(i.markPotentiallyOrphaned(e,a))}),P.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.ni.Ur(t),P.resolve()}getMatchingKeysForTargetId(e,t){const r=this.ni.Wr(t);return P.resolve(r)}containsKey(e,t){return P.resolve(this.ni.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zh{constructor(e,t){this.ii={},this.overlays={},this.si=new Li(0),this.oi=!1,this.oi=!0,this._i=new Av,this.referenceDelegate=e(this),this.ai=new Pv(this),this.indexManager=new dv,this.remoteDocumentCache=function(i){return new Sv(i)}(r=>this.referenceDelegate.ui(r)),this.serializer=new lv(t),this.ci=new Tv(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.oi=!1,Promise.resolve()}get started(){return this.oi}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new wv,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ii[e.toKey()];return r||(r=new Rv(t,this.referenceDelegate),this.ii[e.toKey()]=r),r}getGlobalsCache(){return this._i}getTargetCache(){return this.ai}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.ci}runTransaction(e,t,r){N("MemoryPersistence","Starting transaction:",e);const i=new Cv(this.si.next());return this.referenceDelegate.li(),r(i).next(s=>this.referenceDelegate.hi(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Pi(e,t){return P.or(Object.values(this.ii).map(r=>()=>r.containsKey(e,t)))}}class Cv extends iy{constructor(e){super(),this.currentSequenceNumber=e}}class qo{constructor(e){this.persistence=e,this.Ti=new $o,this.Ii=null}static Ei(e){return new qo(e)}get di(){if(this.Ii)return this.Ii;throw x(60996)}addReference(e,t,r){return this.Ti.addReference(r,t),this.di.delete(r.toString()),P.resolve()}removeReference(e,t,r){return this.Ti.removeReference(r,t),this.di.add(r.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),P.resolve()}removeTarget(e,t){this.Ti.Ur(t.targetId).forEach(i=>this.di.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.di.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}li(){this.Ii=new Set}hi(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.di,r=>{const i=M.fromPath(r);return this.Ai(e,i).next(s=>{s||t.removeEntry(i,F.min())})}).next(()=>(this.Ii=null,t.apply(e)))}updateLimboDocument(e,t){return this.Ai(e,t).next(r=>{r?this.di.delete(t.toString()):this.di.add(t.toString())})}ui(e){return 0}Ai(e,t){return P.or([()=>P.resolve(this.Ti.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Pi(e,t)])}}class Ei{constructor(e,t){this.persistence=e,this.Ri=new Qt(r=>ay(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=yv(this,t)}static Ei(e,t){return new Ei(e,t)}li(){}hi(e){return P.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.Vr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}Vr(e){let t=0;return this.Ar(e,r=>{t++}).next(()=>t)}Ar(e,t){return P.forEach(this.Ri,(r,i)=>this.gr(e,r,i).next(s=>s?P.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.Xr(e,a=>this.gr(e,a,t).next(c=>{c||(r++,s.removeEntry(a,F.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.Ri.set(t,e.currentSequenceNumber),P.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.Ri.set(r,e.currentSequenceNumber),P.resolve()}removeReference(e,t,r){return this.Ri.set(r,e.currentSequenceNumber),P.resolve()}updateLimboDocument(e,t){return this.Ri.set(t,e.currentSequenceNumber),P.resolve()}ui(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=ei(e.data.value)),t}gr(e,t,r){return P.or([()=>this.persistence.Pi(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.Ri.get(t);return P.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zo{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.ls=r,this.hs=i}static Ps(e,t){let r=z(),i=z();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new zo(e,t.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kv{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dv{constructor(){this.Ts=!1,this.Is=!1,this.Es=100,this.ds=function(){return ap()?8:sy(Ie())>0?6:4}()}initialize(e,t){this.As=e,this.indexManager=t,this.Ts=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.Rs(e,t).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.Vs(e,t,i,r).next(a=>{s.result=a})}).next(()=>{if(s.result)return;const a=new kv;return this.fs(e,t,a).next(c=>{if(s.result=c,this.Is)return this.gs(e,t,a,c.size)})}).next(()=>s.result)}gs(e,t,r,i){return r.documentReadCount<this.Es?(tn()<=q.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",nn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Es,"documents"),P.resolve()):(tn()<=q.DEBUG&&N("QueryEngine","Query:",nn(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.ds*i?(tn()<=q.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",nn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,qe(t))):P.resolve())}Rs(e,t){if(yu(t))return P.resolve(null);let r=qe(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=_i(t,null,"F"),r=qe(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const a=z(...s);return this.As.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{const d=this.ps(t,c);return this.ys(t,d,a,l.readTime)?this.Rs(e,_i(t,null,"F")):this.ws(e,d,t,l)}))})))}Vs(e,t,r,i){return yu(t)||i.isEqual(F.min())?P.resolve(null):this.As.getDocuments(e,r).next(s=>{const a=this.ps(t,s);return this.ys(t,a,r,i)?P.resolve(null):(tn()<=q.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),nn(t)),this.ws(e,a,t,ey(i,ar)).next(c=>c))})}ps(e,t){let r=new ae(kh(e));return t.forEach((i,s)=>{Ui(e,s)&&(r=r.add(s))}),r}ys(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}fs(e,t,r){return tn()<=q.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",nn(t)),this.As.getDocumentsMatchingQuery(e,t,wt.min(),r)}ws(e,t,r,i){return this.As.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(a=>{s=s.insert(a.key,a)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Go="LocalStore",Vv=3e8;class Nv{constructor(e,t,r,i){this.persistence=e,this.bs=t,this.serializer=i,this.Ss=new Z(j),this.Ds=new Qt(s=>Lo(s),Mo),this.vs=new Map,this.Cs=e.getRemoteDocumentCache(),this.ai=e.getTargetCache(),this.ci=e.getBundleCache(),this.Fs(r)}Fs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Ev(this.Cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Cs.setIndexManager(this.indexManager),this.bs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ss))}}function Ov(n,e,t,r){return new Nv(n,e,t,r)}async function ed(n,e){const t=U(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.Fs(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const a=[],c=[];let l=z();for(const d of i){a.push(d.batchId);for(const p of d.mutations)l=l.add(p.key)}for(const d of s){c.push(d.batchId);for(const p of d.mutations)l=l.add(p.key)}return t.localDocuments.getDocuments(r,l).next(d=>({Ms:d,removedBatchIds:a,addedBatchIds:c}))})})}function Lv(n,e){const t=U(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=t.Cs.newChangeBuffer({trackRemovals:!0});return function(c,l,d,p){const y=d.batch,v=y.keys();let S=P.resolve();return v.forEach(C=>{S=S.next(()=>p.getEntry(l,C)).next(O=>{const D=d.docVersions.get(C);K(D!==null,48541),O.version.compareTo(D)<0&&(y.applyToRemoteDocument(O,d),O.isValidDocument()&&(O.setReadTime(d.commitVersion),p.addEntry(O)))})}),S.next(()=>c.mutationQueue.removeMutationBatch(l,y))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=z();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(l=l.add(c.batch.mutations[d].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function td(n){const e=U(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.ai.getLastRemoteSnapshotVersion(t))}function Mv(n,e){const t=U(n),r=e.snapshotVersion;let i=t.Ss;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const a=t.Cs.newChangeBuffer({trackRemovals:!0});i=t.Ss;const c=[];e.targetChanges.forEach((p,y)=>{const v=i.get(y);if(!v)return;c.push(t.ai.removeMatchingKeys(s,p.removedDocuments,y).next(()=>t.ai.addMatchingKeys(s,p.addedDocuments,y)));let S=v.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(y)!==null?S=S.withResumeToken(de.EMPTY_BYTE_STRING,F.min()).withLastLimboFreeSnapshotVersion(F.min()):p.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(p.resumeToken,r)),i=i.insert(y,S),function(O,D,H){return O.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=Vv?!0:H.addedDocuments.size+H.modifiedDocuments.size+H.removedDocuments.size>0}(v,S,p)&&c.push(t.ai.updateTargetData(s,S))});let l=st(),d=z();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,p))}),c.push(xv(s,a,e.documentUpdates).next(p=>{l=p.xs,d=p.Os})),!r.isEqual(F.min())){const p=t.ai.getLastRemoteSnapshotVersion(s).next(y=>t.ai.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(p)}return P.waitFor(c).next(()=>a.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,l,d)).next(()=>l)}).then(s=>(t.Ss=i,s))}function xv(n,e,t){let r=z(),i=z();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let a=st();return t.forEach((c,l)=>{const d=s.get(c);l.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(c)),l.isNoDocument()&&l.version.isEqual(F.min())?(e.removeEntry(c,l.readTime),a=a.insert(c,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(l),a=a.insert(c,l)):N(Go,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",l.version)}),{xs:a,Os:i}})}function Fv(n,e){const t=U(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Vo),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Uv(n,e){const t=U(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.ai.getTargetData(r,e).next(s=>s?(i=s,P.resolve(i)):t.ai.allocateTargetId(r).next(a=>(i=new gt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.ai.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.Ss.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Ss=t.Ss.insert(r.targetId,r),t.Ds.set(e,r.targetId)),r})}async function ao(n,e,t){const r=U(n),i=r.Ss.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!wn(a))throw a;N(Go,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ss=r.Ss.remove(e),r.Ds.delete(i.target)}function Du(n,e,t){const r=U(n);let i=F.min(),s=z();return r.persistence.runTransaction("Execute query","readwrite",a=>function(l,d,p){const y=U(l),v=y.Ds.get(p);return v!==void 0?P.resolve(y.Ss.get(v)):y.ai.getTargetData(d,p)}(r,a,qe(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.ai.getMatchingKeysForTargetId(a,c.targetId).next(l=>{s=l})}).next(()=>r.bs.getDocumentsMatchingQuery(a,e,t?i:F.min(),t?s:z())).next(c=>(Bv(r,Sy(e),c),{documents:c,Ns:s})))}function Bv(n,e,t){let r=n.vs.get(e)||F.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.vs.set(e,r)}class Vu{constructor(){this.activeTargetIds=Vy()}$s(e){this.activeTargetIds=this.activeTargetIds.add(e)}Us(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Qs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class jv{constructor(){this.So=new Vu,this.Do={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.So.$s(e),this.Do[e]||"not-current"}updateQueryState(e,t,r){this.Do[e]=t}removeLocalQueryTarget(e){this.So.Us(e)}isLocalQueryTarget(e){return this.So.activeTargetIds.has(e)}clearQueryState(e){delete this.Do[e]}getAllActiveQueryTargets(){return this.So.activeTargetIds}isActiveQueryTarget(e){return this.So.activeTargetIds.has(e)}start(){return this.So=new Vu,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $v{vo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nu="ConnectivityMonitor";class Ou{constructor(){this.Co=()=>this.Fo(),this.Mo=()=>this.xo(),this.Oo=[],this.No()}vo(e){this.Oo.push(e)}shutdown(){window.removeEventListener("online",this.Co),window.removeEventListener("offline",this.Mo)}No(){window.addEventListener("online",this.Co),window.addEventListener("offline",this.Mo)}Fo(){N(Nu,"Network connectivity changed: AVAILABLE");for(const e of this.Oo)e(0)}xo(){N(Nu,"Network connectivity changed: UNAVAILABLE");for(const e of this.Oo)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Kr=null;function co(){return Kr===null?Kr=function(){return 268435456+Math.round(2147483648*Math.random())}():Kr++,"0x"+Kr.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ns="RestConnection",qv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class zv{get Bo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Lo=t+"://"+e.host,this.ko=`projects/${r}/databases/${i}`,this.qo=this.databaseId.database===pi?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Qo(e,t,r,i,s){const a=co(),c=this.$o(e,t.toUriEncodedString());N(Ns,`Sending RPC '${e}' ${a}:`,c,r);const l={"google-cloud-resource-prefix":this.ko,"x-goog-request-params":this.qo};this.Uo(l,i,s);const{host:d}=new URL(c),p=pr(d);return this.Ko(e,c,l,r,p).then(y=>(N(Ns,`Received RPC '${e}' ${a}: `,y),y),y=>{throw dn(Ns,`RPC '${e}' ${a} failed with error: `,y,"url: ",c,"request:",r),y})}Wo(e,t,r,i,s,a){return this.Qo(e,t,r,i,s)}Uo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+En}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}$o(e,t){const r=qv[e];return`${this.Lo}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gv{constructor(e){this.Go=e.Go,this.zo=e.zo}jo(e){this.Ho=e}Jo(e){this.Yo=e}Zo(e){this.Xo=e}onMessage(e){this.e_=e}close(){this.zo()}send(e){this.Go(e)}t_(){this.Ho()}n_(){this.Yo()}r_(e){this.Xo(e)}i_(e){this.e_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _e="WebChannelConnection";class Hv extends zv{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Ko(e,t,r,i,s){const a=co();return new Promise((c,l)=>{const d=new rh;d.setWithCredentials(!0),d.listenOnce(ih.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Zr.NO_ERROR:const y=d.getResponseJson();N(_e,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(y)),c(y);break;case Zr.TIMEOUT:N(_e,`RPC '${e}' ${a} timed out`),l(new V(b.DEADLINE_EXCEEDED,"Request time out"));break;case Zr.HTTP_ERROR:const v=d.getStatus();if(N(_e,`RPC '${e}' ${a} failed with status:`,v,"response text:",d.getResponseText()),v>0){let S=d.getResponseJson();Array.isArray(S)&&(S=S[0]);const C=S==null?void 0:S.error;if(C&&C.status&&C.message){const O=function(H){const B=H.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf(B)>=0?B:b.UNKNOWN}(C.status);l(new V(O,C.message))}else l(new V(b.UNKNOWN,"Server responded with status "+d.getStatus()))}else l(new V(b.UNAVAILABLE,"Connection failed."));break;default:x(9055,{s_:e,streamId:a,o_:d.getLastErrorCode(),__:d.getLastError()})}}finally{N(_e,`RPC '${e}' ${a} completed.`)}});const p=JSON.stringify(i);N(_e,`RPC '${e}' ${a} sending request:`,i),d.send(t,"POST",p,r,15)})}a_(e,t,r){const i=co(),s=[this.Lo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=ah(),c=oh(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(l.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Uo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const p=s.join("");N(_e,`Creating RPC '${e}' stream ${i}: ${p}`,l);const y=a.createWebChannel(p,l);let v=!1,S=!1;const C=new Gv({Go:D=>{S?N(_e,`Not sending because RPC '${e}' stream ${i} is closed:`,D):(v||(N(_e,`Opening RPC '${e}' stream ${i} transport.`),y.open(),v=!0),N(_e,`RPC '${e}' stream ${i} sending:`,D),y.send(D))},zo:()=>y.close()}),O=(D,H,B)=>{D.listen(H,$=>{try{B($)}catch(X){setTimeout(()=>{throw X},0)}})};return O(y,Hn.EventType.OPEN,()=>{S||(N(_e,`RPC '${e}' stream ${i} transport opened.`),C.t_())}),O(y,Hn.EventType.CLOSE,()=>{S||(S=!0,N(_e,`RPC '${e}' stream ${i} transport closed`),C.r_())}),O(y,Hn.EventType.ERROR,D=>{S||(S=!0,dn(_e,`RPC '${e}' stream ${i} transport errored. Name:`,D.name,"Message:",D.message),C.r_(new V(b.UNAVAILABLE,"The operation could not be completed")))}),O(y,Hn.EventType.MESSAGE,D=>{var H;if(!S){const B=D.data[0];K(!!B,16349);const $=B,X=($==null?void 0:$.error)||((H=$[0])===null||H===void 0?void 0:H.error);if(X){N(_e,`RPC '${e}' stream ${i} received error:`,X);const ke=X.status;let te=function(_){const I=re[_];if(I!==void 0)return $h(I)}(ke),E=X.message;te===void 0&&(te=b.INTERNAL,E="Unknown error status: "+ke+" with message "+X.message),S=!0,C.r_(new V(te,E)),y.close()}else N(_e,`RPC '${e}' stream ${i} received:`,B),C.i_(B)}}),O(c,sh.STAT_EVENT,D=>{D.stat===Ys.PROXY?N(_e,`RPC '${e}' stream ${i} detected buffering proxy`):D.stat===Ys.NOPROXY&&N(_e,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{C.n_()},0),C}}function Os(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qi(n){return new Yy(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd{constructor(e,t,r=1e3,i=1.5,s=6e4){this.bi=e,this.timerId=t,this.u_=r,this.c_=i,this.l_=s,this.h_=0,this.P_=null,this.T_=Date.now(),this.reset()}reset(){this.h_=0}I_(){this.h_=this.l_}E_(e){this.cancel();const t=Math.floor(this.h_+this.d_()),r=Math.max(0,Date.now()-this.T_),i=Math.max(0,t-r);i>0&&N("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.h_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.P_=this.bi.enqueueAfterDelay(this.timerId,i,()=>(this.T_=Date.now(),e())),this.h_*=this.c_,this.h_<this.u_&&(this.h_=this.u_),this.h_>this.l_&&(this.h_=this.l_)}A_(){this.P_!==null&&(this.P_.skipDelay(),this.P_=null)}cancel(){this.P_!==null&&(this.P_.cancel(),this.P_=null)}d_(){return(Math.random()-.5)*this.h_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lu="PersistentStream";class rd{constructor(e,t,r,i,s,a,c,l){this.bi=e,this.R_=r,this.V_=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.m_=0,this.f_=null,this.g_=null,this.stream=null,this.p_=0,this.y_=new nd(e,t)}w_(){return this.state===1||this.state===5||this.b_()}b_(){return this.state===2||this.state===3}start(){this.p_=0,this.state!==4?this.auth():this.S_()}async stop(){this.w_()&&await this.close(0)}D_(){this.state=0,this.y_.reset()}v_(){this.b_()&&this.f_===null&&(this.f_=this.bi.enqueueAfterDelay(this.R_,6e4,()=>this.C_()))}F_(e){this.M_(),this.stream.send(e)}async C_(){if(this.b_())return this.close(0)}M_(){this.f_&&(this.f_.cancel(),this.f_=null)}x_(){this.g_&&(this.g_.cancel(),this.g_=null)}async close(e,t){this.M_(),this.x_(),this.y_.cancel(),this.m_++,e!==4?this.y_.reset():t&&t.code===b.RESOURCE_EXHAUSTED?(it(t.toString()),it("Using maximum backoff delay to prevent overloading the backend."),this.y_.I_()):t&&t.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.O_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Zo(t)}O_(){}auth(){this.state=1;const e=this.N_(this.m_),t=this.m_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.m_===t&&this.B_(r,i)},r=>{e(()=>{const i=new V(b.UNKNOWN,"Fetching auth token failed: "+r.message);return this.L_(i)})})}B_(e,t){const r=this.N_(this.m_);this.stream=this.k_(e,t),this.stream.jo(()=>{r(()=>this.listener.jo())}),this.stream.Jo(()=>{r(()=>(this.state=2,this.g_=this.bi.enqueueAfterDelay(this.V_,1e4,()=>(this.b_()&&(this.state=3),Promise.resolve())),this.listener.Jo()))}),this.stream.Zo(i=>{r(()=>this.L_(i))}),this.stream.onMessage(i=>{r(()=>++this.p_==1?this.q_(i):this.onNext(i))})}S_(){this.state=5,this.y_.E_(async()=>{this.state=0,this.start()})}L_(e){return N(Lu,`close with error: ${e}`),this.stream=null,this.close(4,e)}N_(e){return t=>{this.bi.enqueueAndForget(()=>this.m_===e?t():(N(Lu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Wv extends rd{constructor(e,t,r,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}k_(e,t){return this.connection.a_("Listen",e,t)}q_(e){return this.onNext(e)}onNext(e){this.y_.reset();const t=Zy(this.serializer,e),r=function(s){if(!("targetChange"in s))return F.min();const a=s.targetChange;return a.targetIds&&a.targetIds.length?F.min():a.readTime?ze(a.readTime):F.min()}(e);return this.listener.Q_(t,r)}U_(e){const t={};t.database=oo(this.serializer),t.addTarget=function(s,a){let c;const l=a.target;if(c=to(l)?{documents:nv(s,l)}:{query:rv(s,l).gt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=Gh(s,a.resumeToken);const d=ro(s,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(F.min())>0){c.readTime=Ii(s,a.snapshotVersion.toTimestamp());const d=ro(s,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const r=sv(this.serializer,e);r&&(t.labels=r),this.F_(t)}K_(e){const t={};t.database=oo(this.serializer),t.removeTarget=e,this.F_(t)}}class Kv extends rd{constructor(e,t,r,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}get W_(){return this.p_>0}start(){this.lastStreamToken=void 0,super.start()}O_(){this.W_&&this.G_([])}k_(e,t){return this.connection.a_("Write",e,t)}q_(e){return K(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,K(!e.writeResults||e.writeResults.length===0,55816),this.listener.z_()}onNext(e){K(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.y_.reset();const t=tv(e.writeResults,e.commitTime),r=ze(e.commitTime);return this.listener.j_(r,t)}H_(){const e={};e.database=oo(this.serializer),this.F_(e)}G_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>ev(this.serializer,r))};this.F_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qv{}class Yv extends Qv{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.J_=!1}Y_(){if(this.J_)throw new V(b.FAILED_PRECONDITION,"The client has already been terminated.")}Qo(e,t,r,i){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Qo(e,io(t,r),i,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new V(b.UNKNOWN,s.toString())})}Wo(e,t,r,i,s){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Wo(e,io(t,r),i,a,c,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new V(b.UNKNOWN,a.toString())})}terminate(){this.J_=!0,this.connection.terminate()}}class Jv{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.Z_=0,this.X_=null,this.ea=!0}ta(){this.Z_===0&&(this.na("Unknown"),this.X_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.X_=null,this.ra("Backend didn't respond within 10 seconds."),this.na("Offline"),Promise.resolve())))}ia(e){this.state==="Online"?this.na("Unknown"):(this.Z_++,this.Z_>=1&&(this.sa(),this.ra(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.na("Offline")))}set(e){this.sa(),this.Z_=0,e==="Online"&&(this.ea=!1),this.na(e)}na(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ra(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ea?(it(t),this.ea=!1):N("OnlineStateTracker",t)}sa(){this.X_!==null&&(this.X_.cancel(),this.X_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zt="RemoteStore";class Xv{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.oa=[],this._a=new Map,this.aa=new Set,this.ua=[],this.ca=s,this.ca.vo(a=>{r.enqueueAndForget(async()=>{Yt(this)&&(N(zt,"Restarting streams for network reachability change."),await async function(l){const d=U(l);d.aa.add(4),await Er(d),d.la.set("Unknown"),d.aa.delete(4),await zi(d)}(this))})}),this.la=new Jv(r,i)}}async function zi(n){if(Yt(n))for(const e of n.ua)await e(!0)}async function Er(n){for(const e of n.ua)await e(!1)}function id(n,e){const t=U(n);t._a.has(e.targetId)||(t._a.set(e.targetId,e),Qo(t)?Ko(t):Rn(t).b_()&&Wo(t,e))}function Ho(n,e){const t=U(n),r=Rn(t);t._a.delete(e),r.b_()&&sd(t,e),t._a.size===0&&(r.b_()?r.v_():Yt(t)&&t.la.set("Unknown"))}function Wo(n,e){if(n.ha.Ke(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(F.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Rn(n).U_(e)}function sd(n,e){n.ha.Ke(e),Rn(n).K_(e)}function Ko(n){n.ha=new Hy({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),Rt:e=>n._a.get(e)||null,Pt:()=>n.datastore.serializer.databaseId}),Rn(n).start(),n.la.ta()}function Qo(n){return Yt(n)&&!Rn(n).w_()&&n._a.size>0}function Yt(n){return U(n).aa.size===0}function od(n){n.ha=void 0}async function Zv(n){n.la.set("Online")}async function eI(n){n._a.forEach((e,t)=>{Wo(n,e)})}async function tI(n,e){od(n),Qo(n)?(n.la.ia(e),Ko(n)):n.la.set("Unknown")}async function nI(n,e,t){if(n.la.set("Online"),e instanceof zh&&e.state===2&&e.cause)try{await async function(i,s){const a=s.cause;for(const c of s.targetIds)i._a.has(c)&&(await i.remoteSyncer.rejectListen(c,a),i._a.delete(c),i.ha.removeTarget(c))}(n,e)}catch(r){N(zt,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ti(n,r)}else if(e instanceof ri?n.ha.Xe(e):e instanceof qh?n.ha.ot(e):n.ha.nt(e),!t.isEqual(F.min()))try{const r=await td(n.localStore);t.compareTo(r)>=0&&await function(s,a){const c=s.ha.It(a);return c.targetChanges.forEach((l,d)=>{if(l.resumeToken.approximateByteSize()>0){const p=s._a.get(d);p&&s._a.set(d,p.withResumeToken(l.resumeToken,a))}}),c.targetMismatches.forEach((l,d)=>{const p=s._a.get(l);if(!p)return;s._a.set(l,p.withResumeToken(de.EMPTY_BYTE_STRING,p.snapshotVersion)),sd(s,l);const y=new gt(p.target,l,d,p.sequenceNumber);Wo(s,y)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){N(zt,"Failed to raise snapshot:",r),await Ti(n,r)}}async function Ti(n,e,t){if(!wn(e))throw e;n.aa.add(1),await Er(n),n.la.set("Offline"),t||(t=()=>td(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{N(zt,"Retrying IndexedDB access"),await t(),n.aa.delete(1),await zi(n)})}function ad(n,e){return e().catch(t=>Ti(n,t,e))}async function Gi(n){const e=U(n),t=bt(e);let r=e.oa.length>0?e.oa[e.oa.length-1].batchId:Vo;for(;rI(e);)try{const i=await Fv(e.localStore,r);if(i===null){e.oa.length===0&&t.v_();break}r=i.batchId,iI(e,i)}catch(i){await Ti(e,i)}cd(e)&&ud(e)}function rI(n){return Yt(n)&&n.oa.length<10}function iI(n,e){n.oa.push(e);const t=bt(n);t.b_()&&t.W_&&t.G_(e.mutations)}function cd(n){return Yt(n)&&!bt(n).w_()&&n.oa.length>0}function ud(n){bt(n).start()}async function sI(n){bt(n).H_()}async function oI(n){const e=bt(n);for(const t of n.oa)e.G_(t.mutations)}async function aI(n,e,t){const r=n.oa.shift(),i=Uo.from(r,e,t);await ad(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Gi(n)}async function cI(n,e){e&&bt(n).W_&&await async function(r,i){if(function(a){return zy(a)&&a!==b.ABORTED}(i.code)){const s=r.oa.shift();bt(r).D_(),await ad(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await Gi(r)}}(n,e),cd(n)&&ud(n)}async function Mu(n,e){const t=U(n);t.asyncQueue.verifyOperationInProgress(),N(zt,"RemoteStore received new credentials");const r=Yt(t);t.aa.add(3),await Er(t),r&&t.la.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.aa.delete(3),await zi(t)}async function uI(n,e){const t=U(n);e?(t.aa.delete(2),await zi(t)):e||(t.aa.add(2),await Er(t),t.la.set("Unknown"))}function Rn(n){return n.Pa||(n.Pa=function(t,r,i){const s=U(t);return s.Y_(),new Wv(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{jo:Zv.bind(null,n),Jo:eI.bind(null,n),Zo:tI.bind(null,n),Q_:nI.bind(null,n)}),n.ua.push(async e=>{e?(n.Pa.D_(),Qo(n)?Ko(n):n.la.set("Unknown")):(await n.Pa.stop(),od(n))})),n.Pa}function bt(n){return n.Ta||(n.Ta=function(t,r,i){const s=U(t);return s.Y_(),new Kv(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{jo:()=>Promise.resolve(),Jo:sI.bind(null,n),Zo:cI.bind(null,n),z_:oI.bind(null,n),j_:aI.bind(null,n)}),n.ua.push(async e=>{e?(n.Ta.D_(),await Gi(n)):(await n.Ta.stop(),n.oa.length>0&&(N(zt,`Stopping write stream with ${n.oa.length} pending writes`),n.oa=[]))})),n.Ta}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yo{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new et,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const a=Date.now()+r,c=new Yo(e,t,a,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(b.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Jo(n,e){if(it("AsyncQueue",`${e}: ${n}`),wn(n))return new V(b.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{static emptySet(e){return new un(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||M.comparator(t.key,r.key):(t,r)=>M.comparator(t.key,r.key),this.keyedMap=Wn(),this.sortedSet=new Z(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof un)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new un;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xu{constructor(){this.Ia=new Z(M.comparator)}track(e){const t=e.doc.key,r=this.Ia.get(t);r?e.type!==0&&r.type===3?this.Ia=this.Ia.insert(t,e):e.type===3&&r.type!==1?this.Ia=this.Ia.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Ia=this.Ia.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Ia=this.Ia.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Ia=this.Ia.remove(t):e.type===1&&r.type===2?this.Ia=this.Ia.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Ia=this.Ia.insert(t,{type:2,doc:e.doc}):x(63341,{Vt:e,Ea:r}):this.Ia=this.Ia.insert(t,e)}da(){const e=[];return this.Ia.inorderTraversal((t,r)=>{e.push(r)}),e}}class _n{constructor(e,t,r,i,s,a,c,l,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,i,s){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new _n(e,t,un.emptySet(t),a,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Fi(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lI{constructor(){this.Aa=void 0,this.Ra=[]}Va(){return this.Ra.some(e=>e.ma())}}class hI{constructor(){this.queries=Fu(),this.onlineState="Unknown",this.fa=new Set}terminate(){(function(t,r){const i=U(t),s=i.queries;i.queries=Fu(),s.forEach((a,c)=>{for(const l of c.Ra)l.onError(r)})})(this,new V(b.ABORTED,"Firestore shutting down"))}}function Fu(){return new Qt(n=>Ch(n),Fi)}async function ld(n,e){const t=U(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.Va()&&e.ma()&&(r=2):(s=new lI,r=e.ma()?0:1);try{switch(r){case 0:s.Aa=await t.onListen(i,!0);break;case 1:s.Aa=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){const c=Jo(a,`Initialization of query '${nn(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.Ra.push(e),e.ga(t.onlineState),s.Aa&&e.pa(s.Aa)&&Xo(t)}async function hd(n,e){const t=U(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const a=s.Ra.indexOf(e);a>=0&&(s.Ra.splice(a,1),s.Ra.length===0?i=e.ma()?0:1:!s.Va()&&e.ma()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function dI(n,e){const t=U(n);let r=!1;for(const i of e){const s=i.query,a=t.queries.get(s);if(a){for(const c of a.Ra)c.pa(i)&&(r=!0);a.Aa=i}}r&&Xo(t)}function fI(n,e,t){const r=U(n),i=r.queries.get(e);if(i)for(const s of i.Ra)s.onError(t);r.queries.delete(e)}function Xo(n){n.fa.forEach(e=>{e.next()})}var uo,Uu;(Uu=uo||(uo={})).ya="default",Uu.Cache="cache";class dd{constructor(e,t,r){this.query=e,this.wa=t,this.ba=!1,this.Sa=null,this.onlineState="Unknown",this.options=r||{}}pa(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new _n(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ba?this.Da(e)&&(this.wa.next(e),t=!0):this.va(e,this.onlineState)&&(this.Ca(e),t=!0),this.Sa=e,t}onError(e){this.wa.error(e)}ga(e){this.onlineState=e;let t=!1;return this.Sa&&!this.ba&&this.va(this.Sa,e)&&(this.Ca(this.Sa),t=!0),t}va(e,t){if(!e.fromCache||!this.ma())return!0;const r=t!=="Offline";return(!this.options.Fa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Da(e){if(e.docChanges.length>0)return!0;const t=this.Sa&&this.Sa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Ca(e){e=_n.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ba=!0,this.wa.next(e)}ma(){return this.options.source!==uo.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd{constructor(e){this.key=e}}class pd{constructor(e){this.key=e}}class pI{constructor(e,t){this.query=e,this.qa=t,this.Qa=null,this.hasCachedResults=!1,this.current=!1,this.$a=z(),this.mutatedKeys=z(),this.Ua=kh(e),this.Ka=new un(this.Ua)}get Wa(){return this.qa}Ga(e,t){const r=t?t.za:new xu,i=t?t.Ka:this.Ka;let s=t?t.mutatedKeys:this.mutatedKeys,a=i,c=!1;const l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((p,y)=>{const v=i.get(p),S=Ui(this.query,y)?y:null,C=!!v&&this.mutatedKeys.has(v.key),O=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let D=!1;v&&S?v.data.isEqual(S.data)?C!==O&&(r.track({type:3,doc:S}),D=!0):this.ja(v,S)||(r.track({type:2,doc:S}),D=!0,(l&&this.Ua(S,l)>0||d&&this.Ua(S,d)<0)&&(c=!0)):!v&&S?(r.track({type:0,doc:S}),D=!0):v&&!S&&(r.track({type:1,doc:v}),D=!0,(l||d)&&(c=!0)),D&&(S?(a=a.add(S),s=O?s.add(p):s.delete(p)):(a=a.delete(p),s=s.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),s=s.delete(p.key),r.track({type:1,doc:p})}return{Ka:a,za:r,ys:c,mutatedKeys:s}}ja(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.Ka;this.Ka=e.Ka,this.mutatedKeys=e.mutatedKeys;const a=e.za.da();a.sort((p,y)=>function(S,C){const O=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return x(20277,{Vt:D})}};return O(S)-O(C)}(p.type,y.type)||this.Ua(p.doc,y.doc)),this.Ha(r),i=i!=null&&i;const c=t&&!i?this.Ja():[],l=this.$a.size===0&&this.current&&!i?1:0,d=l!==this.Qa;return this.Qa=l,a.length!==0||d?{snapshot:new _n(this.query,e.Ka,s,a,e.mutatedKeys,l===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ya:c}:{Ya:c}}ga(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ka:this.Ka,za:new xu,mutatedKeys:this.mutatedKeys,ys:!1},!1)):{Ya:[]}}Za(e){return!this.qa.has(e)&&!!this.Ka.has(e)&&!this.Ka.get(e).hasLocalMutations}Ha(e){e&&(e.addedDocuments.forEach(t=>this.qa=this.qa.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.qa=this.qa.delete(t)),this.current=e.current)}Ja(){if(!this.current)return[];const e=this.$a;this.$a=z(),this.Ka.forEach(r=>{this.Za(r.key)&&(this.$a=this.$a.add(r.key))});const t=[];return e.forEach(r=>{this.$a.has(r)||t.push(new pd(r))}),this.$a.forEach(r=>{e.has(r)||t.push(new fd(r))}),t}Xa(e){this.qa=e.Ns,this.$a=z();const t=this.Ga(e.documents);return this.applyChanges(t,!0)}eu(){return _n.fromInitialDocuments(this.query,this.Ka,this.mutatedKeys,this.Qa===0,this.hasCachedResults)}}const Zo="SyncEngine";class mI{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class gI{constructor(e){this.key=e,this.tu=!1}}class _I{constructor(e,t,r,i,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.nu={},this.ru=new Qt(c=>Ch(c),Fi),this.iu=new Map,this.su=new Set,this.ou=new Z(M.comparator),this._u=new Map,this.au=new $o,this.uu={},this.cu=new Map,this.lu=gn.ir(),this.onlineState="Unknown",this.hu=void 0}get isPrimaryClient(){return this.hu===!0}}async function yI(n,e,t=!0){const r=Id(n);let i;const s=r.ru.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.eu()):i=await md(r,e,t,!0),i}async function vI(n,e){const t=Id(n);await md(t,e,!0,!1)}async function md(n,e,t,r){const i=await Uv(n.localStore,qe(e)),s=i.targetId,a=n.sharedClientState.addLocalQueryTarget(s,t);let c;return r&&(c=await II(n,e,s,a==="current",i.resumeToken)),n.isPrimaryClient&&t&&id(n.remoteStore,i),c}async function II(n,e,t,r,i){n.Pu=(y,v,S)=>async function(O,D,H,B){let $=D.view.Ga(H);$.ys&&($=await Du(O.localStore,D.query,!1).then(({documents:E})=>D.view.Ga(E,$)));const X=B&&B.targetChanges.get(D.targetId),ke=B&&B.targetMismatches.get(D.targetId)!=null,te=D.view.applyChanges($,O.isPrimaryClient,X,ke);return ju(O,D.targetId,te.Ya),te.snapshot}(n,y,v,S);const s=await Du(n.localStore,e,!0),a=new pI(e,s.Ns),c=a.Ga(s.documents),l=Ir.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),d=a.applyChanges(c,n.isPrimaryClient,l);ju(n,t,d.Ya);const p=new mI(e,t,a);return n.ru.set(e,p),n.iu.has(t)?n.iu.get(t).push(e):n.iu.set(t,[e]),d.snapshot}async function EI(n,e,t){const r=U(n),i=r.ru.get(e),s=r.iu.get(i.targetId);if(s.length>1)return r.iu.set(i.targetId,s.filter(a=>!Fi(a,e))),void r.ru.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await ao(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&Ho(r.remoteStore,i.targetId),lo(r,i.targetId)}).catch(Tn)):(lo(r,i.targetId),await ao(r.localStore,i.targetId,!0))}async function TI(n,e){const t=U(n),r=t.ru.get(e),i=t.iu.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Ho(t.remoteStore,r.targetId))}async function wI(n,e,t){const r=kI(n);try{const i=await function(a,c){const l=U(a),d=oe.now(),p=c.reduce((S,C)=>S.add(C.key),z());let y,v;return l.persistence.runTransaction("Locally write mutations","readwrite",S=>{let C=st(),O=z();return l.Cs.getEntries(S,p).next(D=>{C=D,C.forEach((H,B)=>{B.isValidDocument()||(O=O.add(H))})}).next(()=>l.localDocuments.getOverlayedDocuments(S,C)).next(D=>{y=D;const H=[];for(const B of c){const $=Uy(B,y.get(B.key).overlayedDocument);$!=null&&H.push(new Vt(B.key,$,Eh($.value.mapValue),xe.exists(!0)))}return l.mutationQueue.addMutationBatch(S,d,H,c)}).next(D=>{v=D;const H=D.applyToLocalDocumentSet(y,O);return l.documentOverlayCache.saveOverlays(S,D.batchId,H)})}).then(()=>({batchId:v.batchId,changes:Vh(y)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,c,l){let d=a.uu[a.currentUser.toKey()];d||(d=new Z(j)),d=d.insert(c,l),a.uu[a.currentUser.toKey()]=d}(r,i.batchId,t),await Tr(r,i.changes),await Gi(r.remoteStore)}catch(i){const s=Jo(i,"Failed to persist write");t.reject(s)}}async function gd(n,e){const t=U(n);try{const r=await Mv(t.localStore,e);e.targetChanges.forEach((i,s)=>{const a=t._u.get(s);a&&(K(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?a.tu=!0:i.modifiedDocuments.size>0?K(a.tu,14607):i.removedDocuments.size>0&&(K(a.tu,42227),a.tu=!1))}),await Tr(t,r,e)}catch(r){await Tn(r)}}function Bu(n,e,t){const r=U(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.ru.forEach((s,a)=>{const c=a.view.ga(e);c.snapshot&&i.push(c.snapshot)}),function(a,c){const l=U(a);l.onlineState=c;let d=!1;l.queries.forEach((p,y)=>{for(const v of y.Ra)v.ga(c)&&(d=!0)}),d&&Xo(l)}(r.eventManager,e),i.length&&r.nu.Q_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function AI(n,e,t){const r=U(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r._u.get(e),s=i&&i.key;if(s){let a=new Z(M.comparator);a=a.insert(s,ve.newNoDocument(s,F.min()));const c=z().add(s),l=new $i(F.min(),new Map,new Z(j),a,c);await gd(r,l),r.ou=r.ou.remove(s),r._u.delete(e),ea(r)}else await ao(r.localStore,e,!1).then(()=>lo(r,e,t)).catch(Tn)}async function RI(n,e){const t=U(n),r=e.batch.batchId;try{const i=await Lv(t.localStore,e);yd(t,r,null),_d(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Tr(t,i)}catch(i){await Tn(i)}}async function SI(n,e,t){const r=U(n);try{const i=await function(a,c){const l=U(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return l.mutationQueue.lookupMutationBatch(d,c).next(y=>(K(y!==null,37113),p=y.keys(),l.mutationQueue.removeMutationBatch(d,y))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,p,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>l.localDocuments.getDocuments(d,p))})}(r.localStore,e);yd(r,e,t),_d(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Tr(r,i)}catch(i){await Tn(i)}}function _d(n,e){(n.cu.get(e)||[]).forEach(t=>{t.resolve()}),n.cu.delete(e)}function yd(n,e,t){const r=U(n);let i=r.uu[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.uu[r.currentUser.toKey()]=i}}function lo(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.iu.get(e))n.ru.delete(r),t&&n.nu.Tu(r,t);n.iu.delete(e),n.isPrimaryClient&&n.au.Ur(e).forEach(r=>{n.au.containsKey(r)||vd(n,r)})}function vd(n,e){n.su.delete(e.path.canonicalString());const t=n.ou.get(e);t!==null&&(Ho(n.remoteStore,t),n.ou=n.ou.remove(e),n._u.delete(t),ea(n))}function ju(n,e,t){for(const r of t)r instanceof fd?(n.au.addReference(r.key,e),bI(n,r)):r instanceof pd?(N(Zo,"Document no longer in limbo: "+r.key),n.au.removeReference(r.key,e),n.au.containsKey(r.key)||vd(n,r.key)):x(19791,{Iu:r})}function bI(n,e){const t=e.key,r=t.path.canonicalString();n.ou.get(t)||n.su.has(r)||(N(Zo,"New document in limbo: "+t),n.su.add(r),ea(n))}function ea(n){for(;n.su.size>0&&n.ou.size<n.maxConcurrentLimboResolutions;){const e=n.su.values().next().value;n.su.delete(e);const t=new M(J.fromString(e)),r=n.lu.next();n._u.set(r,new gI(t)),n.ou=n.ou.insert(t,r),id(n.remoteStore,new gt(qe(xo(t.path)),r,"TargetPurposeLimboResolution",Li.le))}}async function Tr(n,e,t){const r=U(n),i=[],s=[],a=[];r.ru.isEmpty()||(r.ru.forEach((c,l)=>{a.push(r.Pu(l,e,t).then(d=>{var p;if((d||t)&&r.isPrimaryClient){const y=d?!d.fromCache:(p=t==null?void 0:t.targetChanges.get(l.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(l.targetId,y?"current":"not-current")}if(d){i.push(d);const y=zo.Ps(l.targetId,d);s.push(y)}}))}),await Promise.all(a),r.nu.Q_(i),await async function(l,d){const p=U(l);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",y=>P.forEach(d,v=>P.forEach(v.ls,S=>p.persistence.referenceDelegate.addReference(y,v.targetId,S)).next(()=>P.forEach(v.hs,S=>p.persistence.referenceDelegate.removeReference(y,v.targetId,S)))))}catch(y){if(!wn(y))throw y;N(Go,"Failed to update sequence numbers: "+y)}for(const y of d){const v=y.targetId;if(!y.fromCache){const S=p.Ss.get(v),C=S.snapshotVersion,O=S.withLastLimboFreeSnapshotVersion(C);p.Ss=p.Ss.insert(v,O)}}}(r.localStore,s))}async function PI(n,e){const t=U(n);if(!t.currentUser.isEqual(e)){N(Zo,"User change. New user:",e.toKey());const r=await ed(t.localStore,e);t.currentUser=e,function(s,a){s.cu.forEach(c=>{c.forEach(l=>{l.reject(new V(b.CANCELLED,a))})}),s.cu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Tr(t,r.Ms)}}function CI(n,e){const t=U(n),r=t._u.get(e);if(r&&r.tu)return z().add(r.key);{let i=z();const s=t.iu.get(e);if(!s)return i;for(const a of s){const c=t.ru.get(a);i=i.unionWith(c.view.Wa)}return i}}function Id(n){const e=U(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=gd.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=CI.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=AI.bind(null,e),e.nu.Q_=dI.bind(null,e.eventManager),e.nu.Tu=fI.bind(null,e.eventManager),e}function kI(n){const e=U(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=RI.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=SI.bind(null,e),e}class wi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=qi(e.databaseInfo.databaseId),this.sharedClientState=this.Au(e),this.persistence=this.Ru(e),await this.persistence.start(),this.localStore=this.Vu(e),this.gcScheduler=this.mu(e,this.localStore),this.indexBackfillerScheduler=this.fu(e,this.localStore)}mu(e,t){return null}fu(e,t){return null}Vu(e){return Ov(this.persistence,new Dv,e.initialUser,this.serializer)}Ru(e){return new Zh(qo.Ei,this.serializer)}Au(e){return new jv}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}wi.provider={build:()=>new wi};class DI extends wi{constructor(e){super(),this.cacheSizeBytes=e}mu(e,t){K(this.persistence.referenceDelegate instanceof Ei,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new gv(r,e.asyncQueue,t)}Ru(e){const t=this.cacheSizeBytes!==void 0?Ae.withCacheSize(this.cacheSizeBytes):Ae.DEFAULT;return new Zh(r=>Ei.Ei(r,t),this.serializer)}}class ho{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Bu(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=PI.bind(null,this.syncEngine),await uI(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new hI}()}createDatastore(e){const t=qi(e.databaseInfo.databaseId),r=function(s){return new Hv(s)}(e.databaseInfo);return function(s,a,c,l){return new Yv(s,a,c,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,a,c){return new Xv(r,i,s,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Bu(this.syncEngine,t,0),function(){return Ou.C()?new Ou:new $v}())}createSyncEngine(e,t){return function(i,s,a,c,l,d,p){const y=new _I(i,s,a,c,l,d);return p&&(y.hu=!0),y}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=U(i);N(zt,"RemoteStore shutting down."),s.aa.add(5),await Er(s),s.ca.shutdown(),s.la.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}ho.provider={build:()=>new ho};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ed{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.pu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.pu(this.observer.error,e):it("Uncaught Error in snapshot listener:",e.toString()))}yu(){this.muted=!0}pu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pt="FirestoreClient";class VI{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=ye.UNAUTHENTICATED,this.clientId=hh.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async a=>{N(Pt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(N(Pt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new et;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Jo(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Ls(n,e){n.asyncQueue.verifyOperationInProgress(),N(Pt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await ed(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function $u(n,e){n.asyncQueue.verifyOperationInProgress();const t=await NI(n);N(Pt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Mu(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>Mu(e.remoteStore,i)),n._onlineComponents=e}async function NI(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){N(Pt,"Using user provided OfflineComponentProvider");try{await Ls(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===b.FAILED_PRECONDITION||i.code===b.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;dn("Error using user provided cache. Falling back to memory cache: "+t),await Ls(n,new wi)}}else N(Pt,"Using default OfflineComponentProvider"),await Ls(n,new DI(void 0));return n._offlineComponents}async function Td(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(N(Pt,"Using user provided OnlineComponentProvider"),await $u(n,n._uninitializedComponentsProvider._online)):(N(Pt,"Using default OnlineComponentProvider"),await $u(n,new ho))),n._onlineComponents}function OI(n){return Td(n).then(e=>e.syncEngine)}async function wd(n){const e=await Td(n),t=e.eventManager;return t.onListen=yI.bind(null,e.syncEngine),t.onUnlisten=EI.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=vI.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=TI.bind(null,e.syncEngine),t}function LI(n,e,t={}){const r=new et;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,c,l,d){const p=new Ed({next:v=>{p.yu(),a.enqueueAndForget(()=>hd(s,y));const S=v.docs.has(c);!S&&v.fromCache?d.reject(new V(b.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&v.fromCache&&l&&l.source==="server"?d.reject(new V(b.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(v)},error:v=>d.reject(v)}),y=new dd(xo(c.path),p,{includeMetadataChanges:!0,Fa:!0});return ld(s,y)}(await wd(n),n.asyncQueue,e,t,r)),r.promise}function MI(n,e,t={}){const r=new et;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,c,l,d){const p=new Ed({next:v=>{p.yu(),a.enqueueAndForget(()=>hd(s,y)),v.fromCache&&l.source==="server"?d.reject(new V(b.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(v)},error:v=>d.reject(v)}),y=new dd(c,p,{includeMetadataChanges:!0,Fa:!0});return ld(s,y)}(await wd(n),n.asyncQueue,e,t,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ad(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qu=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rd(n,e,t){if(!t)throw new V(b.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function xI(n,e,t,r){if(e===!0&&r===!0)throw new V(b.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function zu(n){if(!M.isDocumentKey(n))throw new V(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Gu(n){if(M.isDocumentKey(n))throw new V(b.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Hi(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":x(12329,{type:typeof n})}function We(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Hi(n);throw new V(b.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function FI(n,e){if(e<=0)throw new V(b.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sd="firestore.googleapis.com",Hu=!0;class Wu{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new V(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Sd,this.ssl=Hu}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Hu;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Xh;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<pv)throw new V(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}xI("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ad((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new V(b.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new V(b.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new V(b.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Wi{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Wu({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Wu(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new G_;switch(r.type){case"firstParty":return new Q_(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new V(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,Ci("Firestore",this._settings.isUsingEmulator),this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=qu.get(t);r&&(N("ComponentProvider","Removing Datastore"),qu.delete(t),r.terminate())}(this),Promise.resolve()}}function UI(n,e,t,r={}){var i;n=We(n,Wi);const s=pr(e),a=n._getSettings(),c=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),l=`${e}:${t}`;a.host!==Sd&&a.host!==l&&dn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const d=Object.assign(Object.assign({},a),{host:l,ssl:s,emulatorOptions:r});if(!Tt(d,c)&&(n._setSettings(d),s&&(gl(`https://${l}`),Ci("Firestore",!0)),r.mockUserToken)){let p,y;if(typeof r.mockUserToken=="string")p=r.mockUserToken,y=ye.MOCK_USER;else{p=Zf(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const v=r.mockUserToken.sub||r.mockUserToken.user_id;if(!v)throw new V(b.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");y=new ye(v)}n._authCredentials=new H_(new uh(p,y))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Nt(this.firestore,e,this._query)}}class we{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Et(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new we(this.firestore,e,this._key)}}class Et extends Nt{constructor(e,t,r){super(e,t,xo(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new we(this.firestore,null,new M(e))}withConverter(e){return new Et(this.firestore,e,this._path)}}function RT(n,e,...t){if(n=se(n),Rd("collection","path",e),n instanceof Wi){const r=J.fromString(e,...t);return Gu(r),new Et(n,null,r)}{if(!(n instanceof we||n instanceof Et))throw new V(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(J.fromString(e,...t));return Gu(r),new Et(n.firestore,null,r)}}function ii(n,e,...t){if(n=se(n),arguments.length===1&&(e=hh.newId()),Rd("doc","path",e),n instanceof Wi){const r=J.fromString(e,...t);return zu(r),new we(n,null,new M(r))}{if(!(n instanceof we||n instanceof Et))throw new V(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(J.fromString(e,...t));return zu(r),new we(n.firestore,n instanceof Et?n.converter:null,new M(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ku="AsyncQueue";class Qu{constructor(e=Promise.resolve()){this.Qu=[],this.$u=!1,this.Uu=[],this.Ku=null,this.Wu=!1,this.Gu=!1,this.zu=[],this.y_=new nd(this,"async_queue_retry"),this.ju=()=>{const r=Os();r&&N(Ku,"Visibility state changed to "+r.visibilityState),this.y_.A_()},this.Hu=e;const t=Os();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.ju)}get isShuttingDown(){return this.$u}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Ju(),this.Yu(e)}enterRestrictedMode(e){if(!this.$u){this.$u=!0,this.Gu=e||!1;const t=Os();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.ju)}}enqueue(e){if(this.Ju(),this.$u)return new Promise(()=>{});const t=new et;return this.Yu(()=>this.$u&&this.Gu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Qu.push(e),this.Zu()))}async Zu(){if(this.Qu.length!==0){try{await this.Qu[0](),this.Qu.shift(),this.y_.reset()}catch(e){if(!wn(e))throw e;N(Ku,"Operation failed with retryable error: "+e)}this.Qu.length>0&&this.y_.E_(()=>this.Zu())}}Yu(e){const t=this.Hu.then(()=>(this.Wu=!0,e().catch(r=>{throw this.Ku=r,this.Wu=!1,it("INTERNAL UNHANDLED ERROR: ",Yu(r)),r}).then(r=>(this.Wu=!1,r))));return this.Hu=t,t}enqueueAfterDelay(e,t,r){this.Ju(),this.zu.indexOf(e)>-1&&(t=0);const i=Yo.createAndSchedule(this,e,t,r,s=>this.Xu(s));return this.Uu.push(i),i}Ju(){this.Ku&&x(47125,{ec:Yu(this.Ku)})}verifyOperationInProgress(){}async tc(){let e;do e=this.Hu,await e;while(e!==this.Hu)}nc(e){for(const t of this.Uu)if(t.timerId===e)return!0;return!1}rc(e){return this.tc().then(()=>{this.Uu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Uu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.tc()})}sc(e){this.zu.push(e)}Xu(e){const t=this.Uu.indexOf(e);this.Uu.splice(t,1)}}function Yu(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class Sn extends Wi{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new Qu,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Qu(e),this._firestoreClient=void 0,await e}}}function Ju(n,e){const t=typeof n=="object"?n:vo(),r=typeof n=="string"?n:pi,i=Kt(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=Jf("firestore");s&&UI(i,...s)}return i}function ta(n){if(n._terminated)throw new V(b.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||BI(n),n._firestoreClient}function BI(n){var e,t,r;const i=n._freezeSettings(),s=function(c,l,d,p){return new ly(c,l,d,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,Ad(p.experimentalLongPollingOptions),p.useFetchStreams,p.isUsingEmulator)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new VI(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&function(c){const l=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(l),_online:l}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new yn(de.fromBase64String(e))}catch(t){throw new V(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new yn(de.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ki{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new he(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ra{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return j(this._lat,e._lat)||j(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ia{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jI=/^__.*__$/;class $I{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Vt(e,this.data,this.fieldMask,t,this.fieldTransforms):new vr(e,this.data,t,this.fieldTransforms)}}class bd{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Vt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Pd(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw x(40011,{oc:n})}}class sa{constructor(e,t,r,i,s,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this._c(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get oc(){return this.settings.oc}ac(e){return new sa(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}uc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.ac({path:r,cc:!1});return i.lc(e),i}hc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.ac({path:r,cc:!1});return i._c(),i}Pc(e){return this.ac({path:void 0,cc:!0})}Tc(e){return Ai(e,this.settings.methodName,this.settings.Ic||!1,this.path,this.settings.Ec)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}_c(){if(this.path)for(let e=0;e<this.path.length;e++)this.lc(this.path.get(e))}lc(e){if(e.length===0)throw this.Tc("Document fields must not be empty");if(Pd(this.oc)&&jI.test(e))throw this.Tc('Document fields cannot begin and end with "__"')}}class qI{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||qi(e)}dc(e,t,r,i=!1){return new sa({oc:e,methodName:t,Ec:r,path:he.emptyPath(),cc:!1,Ic:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Qi(n){const e=n._freezeSettings(),t=qi(n._databaseId);return new qI(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Cd(n,e,t,r,i,s={}){const a=n.dc(s.merge||s.mergeFields?2:0,e,t,i);oa("Data must be an object, but it was:",a,r);const c=kd(r,a);let l,d;if(s.merge)l=new Pe(a.fieldMask),d=a.fieldTransforms;else if(s.mergeFields){const p=[];for(const y of s.mergeFields){const v=fo(e,y,t);if(!a.contains(v))throw new V(b.INVALID_ARGUMENT,`Field '${v}' is specified in your field mask but missing from your input data.`);Vd(p,v)||p.push(v)}l=new Pe(p),d=a.fieldTransforms.filter(y=>l.covers(y.field))}else l=null,d=a.fieldTransforms;return new $I(new Re(c),l,d)}class Yi extends na{_toFieldTransform(e){if(e.oc!==2)throw e.oc===1?e.Tc(`${this._methodName}() can only appear at the top level of your update data`):e.Tc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Yi}}function zI(n,e,t,r){const i=n.dc(1,e,t);oa("Data must be an object, but it was:",i,r);const s=[],a=Re.empty();Dt(r,(l,d)=>{const p=aa(e,l,t);d=se(d);const y=i.hc(p);if(d instanceof Yi)s.push(p);else{const v=wr(d,y);v!=null&&(s.push(p),a.set(p,v))}});const c=new Pe(s);return new bd(a,c,i.fieldTransforms)}function GI(n,e,t,r,i,s){const a=n.dc(1,e,t),c=[fo(e,r,t)],l=[i];if(s.length%2!=0)throw new V(b.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let v=0;v<s.length;v+=2)c.push(fo(e,s[v])),l.push(s[v+1]);const d=[],p=Re.empty();for(let v=c.length-1;v>=0;--v)if(!Vd(d,c[v])){const S=c[v];let C=l[v];C=se(C);const O=a.hc(S);if(C instanceof Yi)d.push(S);else{const D=wr(C,O);D!=null&&(d.push(S),p.set(S,D))}}const y=new Pe(d);return new bd(p,y,a.fieldTransforms)}function HI(n,e,t,r=!1){return wr(t,n.dc(r?4:3,e))}function wr(n,e){if(Dd(n=se(n)))return oa("Unsupported field value:",e,n),kd(n,e);if(n instanceof na)return function(r,i){if(!Pd(i.oc))throw i.Tc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Tc(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.cc&&e.oc!==4)throw e.Tc("Nested arrays are not supported");return function(r,i){const s=[];let a=0;for(const c of r){let l=wr(c,i.Pc(a));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),a++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=se(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Ny(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=oe.fromDate(r);return{timestampValue:Ii(i.serializer,s)}}if(r instanceof oe){const s=new oe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ii(i.serializer,s)}}if(r instanceof ra)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof yn)return{bytesValue:Gh(i.serializer,r._byteString)};if(r instanceof we){const s=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw i.Tc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:jo(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof ia)return function(a,c){return{mapValue:{fields:{[vh]:{stringValue:Ih},[mi]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw c.Tc("VectorValues must only contain numeric values.");return Fo(c.serializer,d)})}}}}}}(r,i);throw i.Tc(`Unsupported field value: ${Hi(r)}`)}(n,e)}function kd(n,e){const t={};return fh(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Dt(n,(r,i)=>{const s=wr(i,e.uc(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function Dd(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof oe||n instanceof ra||n instanceof yn||n instanceof we||n instanceof na||n instanceof ia)}function oa(n,e,t){if(!Dd(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const r=Hi(t);throw r==="an object"?e.Tc(n+" a custom object"):e.Tc(n+" "+r)}}function fo(n,e,t){if((e=se(e))instanceof Ki)return e._internalPath;if(typeof e=="string")return aa(n,e);throw Ai("Field path arguments must be of type string or ",n,!1,void 0,t)}const WI=new RegExp("[~\\*/\\[\\]]");function aa(n,e,t){if(e.search(WI)>=0)throw Ai(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ki(...e.split("."))._internalPath}catch{throw Ai(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Ai(n,e,t,r,i){const s=r&&!r.isEmpty(),a=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(s||a)&&(l+=" (found",s&&(l+=` in field ${r}`),a&&(l+=` in document ${i}`),l+=")"),new V(b.INVALID_ARGUMENT,c+n+l)}function Vd(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nd{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new we(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new KI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Ji("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class KI extends Nd{data(){return super.data()}}function Ji(n,e){return typeof e=="string"?aa(n,e):e instanceof Ki?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QI(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new V(b.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ca{}class ua extends ca{}function ST(n,e,...t){let r=[];e instanceof ca&&r.push(e),r=r.concat(t),function(s){const a=s.filter(l=>l instanceof la).length,c=s.filter(l=>l instanceof Xi).length;if(a>1||a>0&&c>0)throw new V(b.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class Xi extends ua{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Xi(e,t,r)}_apply(e){const t=this._parse(e);return Od(e._query,t),new Nt(e.firestore,e.converter,no(e._query,t))}_parse(e){const t=Qi(e.firestore);return function(s,a,c,l,d,p,y){let v;if(d.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new V(b.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){Zu(y,p);const C=[];for(const O of y)C.push(Xu(l,s,O));v={arrayValue:{values:C}}}else v=Xu(l,s,y)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||Zu(y,p),v=HI(c,a,y,p==="in"||p==="not-in");return ie.create(d,p,v)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function bT(n,e,t){const r=e,i=Ji("where",n);return Xi._create(i,r,t)}class la extends ca{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new la(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Ue.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let a=i;const c=s.getFlattenedFilters();for(const l of c)Od(a,l),a=no(a,l)}(e._query,t),new Nt(e.firestore,e.converter,no(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class ha extends ua{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new ha(e,t)}_apply(e){const t=function(i,s,a){if(i.startAt!==null)throw new V(b.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new V(b.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new hr(s,a)}(e._query,this._field,this._direction);return new Nt(e.firestore,e.converter,function(i,s){const a=i.explicitOrderBy.concat([s]);return new An(i.path,i.collectionGroup,a,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function PT(n,e="asc"){const t=e,r=Ji("orderBy",n);return ha._create(r,t)}class da extends ua{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new da(e,t,r)}_apply(e){return new Nt(e.firestore,e.converter,_i(e._query,this._limit,this._limitType))}}function CT(n){return FI("limit",n),da._create("limit",n,"F")}function Xu(n,e,t){if(typeof(t=se(t))=="string"){if(t==="")throw new V(b.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ph(e)&&t.indexOf("/")!==-1)throw new V(b.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(J.fromString(t));if(!M.isDocumentKey(r))throw new V(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return du(n,new M(r))}if(t instanceof we)return du(n,t._key);throw new V(b.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Hi(t)}.`)}function Zu(n,e){if(!Array.isArray(n)||n.length===0)throw new V(b.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Od(n,e){const t=function(i,s){for(const a of i)for(const c of a.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new V(b.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new V(b.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class YI{convertValue(e,t="none"){switch(St(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ne(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Rt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw x(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Dt(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var t,r,i;const s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t[mi].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(a=>ne(a.doubleValue));return new ia(s)}convertGeoPoint(e){return new ra(ne(e.latitude),ne(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=xi(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(cr(e));default:return null}}convertTimestamp(e){const t=At(e);return new oe(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=J.fromString(e);K(Jh(r),9688,{name:e});const i=new ur(r.get(1),r.get(3)),s=new M(r.popFirst(5));return i.isEqual(t)||it(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ld(n,e,t){let r;return r=n?n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Md extends Nd{constructor(e,t,r,i,s,a){super(e,t,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new si(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Ji("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class si extends Md{data(e={}){return super.data(e)}}class JI{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Qn(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new si(this._firestore,this._userDataWriter,r.key,r,new Qn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(b.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(c=>{const l=new si(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Qn(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{const l=new si(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Qn(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,p=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),p=a.indexOf(c.doc.key)),{type:XI(c.type),doc:l,oldIndex:d,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function XI(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return x(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZI(n){n=We(n,we);const e=We(n.firestore,Sn);return LI(ta(e),n._key).then(t=>eE(e,n,t))}class xd extends YI{constructor(e){super(),this.firestore=e}convertBytes(e){return new yn(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new we(this.firestore,null,t)}}function kT(n){n=We(n,Nt);const e=We(n.firestore,Sn),t=ta(e),r=new xd(e);return QI(n._query),MI(t,n._query).then(i=>new JI(e,r,n,i))}function Ms(n,e,t){n=We(n,we);const r=We(n.firestore,Sn),i=Ld(n.converter,e);return fa(r,[Cd(Qi(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,xe.none())])}function DT(n,e,t,...r){n=We(n,we);const i=We(n.firestore,Sn),s=Qi(i);let a;return a=typeof(e=se(e))=="string"||e instanceof Ki?GI(s,"updateDoc",n._key,e,t,r):zI(s,"updateDoc",n._key,e),fa(i,[a.toMutation(n._key,xe.exists(!0))])}function VT(n,e){const t=We(n.firestore,Sn),r=ii(n),i=Ld(n.converter,e);return fa(t,[Cd(Qi(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,xe.exists(!1))]).then(()=>r)}function fa(n,e){return function(r,i){const s=new et;return r.asyncQueue.enqueueAndForget(async()=>wI(await OI(r),i,s)),s.promise}(ta(n),e)}function eE(n,e,t){const r=t.docs.get(e._key),i=new xd(n);return new Md(n,i,e._key,r,new Qn(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(i){En=i})(vn),Ge(new Fe("firestore",(r,{instanceIdentifier:i,options:s})=>{const a=r.getProvider("app").getImmediate(),c=new Sn(new W_(r.getProvider("auth-internal")),new Y_(a,r.getProvider("app-check-internal")),function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new V(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ur(d.options.projectId,p)}(a,i),a);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),Ve(eu,tu,e),Ve(eu,tu,"esm2017")})();const Fd="@firebase/installations",pa="0.6.16";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ud=1e4,Bd=`w:${pa}`,jd="FIS_v2",tE="https://firebaseinstallations.googleapis.com/v1",nE=60*60*1e3,rE="installations",iE="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sE={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Gt=new Wt(rE,iE,sE);function $d(n){return n instanceof Be&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qd({projectId:n}){return`${tE}/projects/${n}/installations`}function zd(n){return{token:n.token,requestStatus:2,expiresIn:aE(n.expiresIn),creationTime:Date.now()}}async function Gd(n,e){const r=(await e.json()).error;return Gt.create("request-failed",{requestName:n,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Hd({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function oE(n,{refreshToken:e}){const t=Hd(n);return t.append("Authorization",cE(e)),t}async function Wd(n){const e=await n();return e.status>=500&&e.status<600?n():e}function aE(n){return Number(n.replace("s","000"))}function cE(n){return`${jd} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uE({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const r=qd(n),i=Hd(n),s=e.getImmediate({optional:!0});if(s){const d=await s.getHeartbeatsHeader();d&&i.append("x-firebase-client",d)}const a={fid:t,authVersion:jd,appId:n.appId,sdkVersion:Bd},c={method:"POST",headers:i,body:JSON.stringify(a)},l=await Wd(()=>fetch(r,c));if(l.ok){const d=await l.json();return{fid:d.fid||t,registrationStatus:2,refreshToken:d.refreshToken,authToken:zd(d.authToken)}}else throw await Gd("Create Installation",l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kd(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lE(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hE=/^[cdef][\w-]{21}$/,po="";function dE(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=fE(n);return hE.test(t)?t:po}catch{return po}}function fE(n){return lE(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zi(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qd=new Map;function Yd(n,e){const t=Zi(n);Jd(t,e),pE(t,e)}function Jd(n,e){const t=Qd.get(n);if(t)for(const r of t)r(e)}function pE(n,e){const t=mE();t&&t.postMessage({key:n,fid:e}),gE()}let jt=null;function mE(){return!jt&&"BroadcastChannel"in self&&(jt=new BroadcastChannel("[Firebase] FID Change"),jt.onmessage=n=>{Jd(n.data.key,n.data.fid)}),jt}function gE(){Qd.size===0&&jt&&(jt.close(),jt=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _E="firebase-installations-database",yE=1,Ht="firebase-installations-store";let xs=null;function ma(){return xs||(xs=Il(_E,yE,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Ht)}}})),xs}async function Ri(n,e){const t=Zi(n),i=(await ma()).transaction(Ht,"readwrite"),s=i.objectStore(Ht),a=await s.get(t);return await s.put(e,t),await i.done,(!a||a.fid!==e.fid)&&Yd(n,e.fid),e}async function Xd(n){const e=Zi(n),r=(await ma()).transaction(Ht,"readwrite");await r.objectStore(Ht).delete(e),await r.done}async function es(n,e){const t=Zi(n),i=(await ma()).transaction(Ht,"readwrite"),s=i.objectStore(Ht),a=await s.get(t),c=e(a);return c===void 0?await s.delete(t):await s.put(c,t),await i.done,c&&(!a||a.fid!==c.fid)&&Yd(n,c.fid),c}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ga(n){let e;const t=await es(n.appConfig,r=>{const i=vE(r),s=IE(n,i);return e=s.registrationPromise,s.installationEntry});return t.fid===po?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function vE(n){const e=n||{fid:dE(),registrationStatus:0};return Zd(e)}function IE(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(Gt.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=EE(n,t);return{installationEntry:t,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:TE(n)}:{installationEntry:e}}async function EE(n,e){try{const t=await uE(n,e);return Ri(n.appConfig,t)}catch(t){throw $d(t)&&t.customData.serverCode===409?await Xd(n.appConfig):await Ri(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function TE(n){let e=await el(n.appConfig);for(;e.registrationStatus===1;)await Kd(100),e=await el(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:r}=await ga(n);return r||t}return e}function el(n){return es(n,e=>{if(!e)throw Gt.create("installation-not-found");return Zd(e)})}function Zd(n){return wE(n)?{fid:n.fid,registrationStatus:0}:n}function wE(n){return n.registrationStatus===1&&n.registrationTime+Ud<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function AE({appConfig:n,heartbeatServiceProvider:e},t){const r=RE(n,t),i=oE(n,t),s=e.getImmediate({optional:!0});if(s){const d=await s.getHeartbeatsHeader();d&&i.append("x-firebase-client",d)}const a={installation:{sdkVersion:Bd,appId:n.appId}},c={method:"POST",headers:i,body:JSON.stringify(a)},l=await Wd(()=>fetch(r,c));if(l.ok){const d=await l.json();return zd(d)}else throw await Gd("Generate Auth Token",l)}function RE(n,{fid:e}){return`${qd(n)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _a(n,e=!1){let t;const r=await es(n.appConfig,s=>{if(!ef(s))throw Gt.create("not-registered");const a=s.authToken;if(!e&&PE(a))return s;if(a.requestStatus===1)return t=SE(n,e),s;{if(!navigator.onLine)throw Gt.create("app-offline");const c=kE(s);return t=bE(n,c),c}});return t?await t:r.authToken}async function SE(n,e){let t=await tl(n.appConfig);for(;t.authToken.requestStatus===1;)await Kd(100),t=await tl(n.appConfig);const r=t.authToken;return r.requestStatus===0?_a(n,e):r}function tl(n){return es(n,e=>{if(!ef(e))throw Gt.create("not-registered");const t=e.authToken;return DE(t)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function bE(n,e){try{const t=await AE(n,e),r=Object.assign(Object.assign({},e),{authToken:t});return await Ri(n.appConfig,r),t}catch(t){if($d(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await Xd(n.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Ri(n.appConfig,r)}throw t}}function ef(n){return n!==void 0&&n.registrationStatus===2}function PE(n){return n.requestStatus===2&&!CE(n)}function CE(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+nE}function kE(n){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},n),{authToken:e})}function DE(n){return n.requestStatus===1&&n.requestTime+Ud<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function VE(n){const e=n,{installationEntry:t,registrationPromise:r}=await ga(e);return r?r.catch(console.error):_a(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function NE(n,e=!1){const t=n;return await OE(t),(await _a(t,e)).token}async function OE(n){const{registrationPromise:e}=await ga(n);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LE(n){if(!n||!n.options)throw Fs("App Configuration");if(!n.name)throw Fs("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw Fs(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function Fs(n){return Gt.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tf="installations",ME="installations-internal",xE=n=>{const e=n.getProvider("app").getImmediate(),t=LE(e),r=Kt(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},FE=n=>{const e=n.getProvider("app").getImmediate(),t=Kt(e,tf).getImmediate();return{getId:()=>VE(t),getToken:i=>NE(t,i)}};function UE(){Ge(new Fe(tf,xE,"PUBLIC")),Ge(new Fe(ME,FE,"PRIVATE"))}UE();Ve(Fd,pa);Ve(Fd,pa,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Si="analytics",BE="firebase_id",jE="origin",$E=60*1e3,qE="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",ya="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Se=new ki("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zE={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Ce=new Wt("analytics","Analytics",zE);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GE(n){if(!n.startsWith(ya)){const e=Ce.create("invalid-gtag-resource",{gtagURL:n});return Se.warn(e.message),""}return n}function nf(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function HE(n,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(n,e)),t}function WE(n,e){const t=HE("firebase-js-sdk-policy",{createScriptURL:GE}),r=document.createElement("script"),i=`${ya}?l=${n}&id=${e}`;r.src=t?t==null?void 0:t.createScriptURL(i):i,r.async=!0,document.head.appendChild(r)}function KE(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function QE(n,e,t,r,i,s){const a=r[i];try{if(a)await e[a];else{const l=(await nf(t)).find(d=>d.measurementId===i);l&&await e[l.appId]}}catch(c){Se.error(c)}n("config",i,s)}async function YE(n,e,t,r,i){try{let s=[];if(i&&i.send_to){let a=i.send_to;Array.isArray(a)||(a=[a]);const c=await nf(t);for(const l of a){const d=c.find(y=>y.measurementId===l),p=d&&e[d.appId];if(p)s.push(p);else{s=[];break}}}s.length===0&&(s=Object.values(e)),await Promise.all(s),n("event",r,i||{})}catch(s){Se.error(s)}}function JE(n,e,t,r){async function i(s,...a){try{if(s==="event"){const[c,l]=a;await YE(n,e,t,c,l)}else if(s==="config"){const[c,l]=a;await QE(n,e,t,r,c,l)}else if(s==="consent"){const[c,l]=a;n("consent",c,l)}else if(s==="get"){const[c,l,d]=a;n("get",c,l,d)}else if(s==="set"){const[c]=a;n("set",c)}else n(s,...a)}catch(c){Se.error(c)}}return i}function XE(n,e,t,r,i){let s=function(...a){window[r].push(arguments)};return window[i]&&typeof window[i]=="function"&&(s=window[i]),window[i]=JE(s,n,e,t),{gtagCore:s,wrappedGtag:window[i]}}function ZE(n){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(ya)&&t.src.includes(n))return t;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eT=30,tT=1e3;class nT{constructor(e={},t=tT){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const rf=new nT;function rT(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function iT(n){var e;const{appId:t,apiKey:r}=n,i={method:"GET",headers:rT(r)},s=qE.replace("{app-id}",t),a=await fetch(s,i);if(a.status!==200&&a.status!==304){let c="";try{const l=await a.json();!((e=l.error)===null||e===void 0)&&e.message&&(c=l.error.message)}catch{}throw Ce.create("config-fetch-failed",{httpStatus:a.status,responseMessage:c})}return a.json()}async function sT(n,e=rf,t){const{appId:r,apiKey:i,measurementId:s}=n.options;if(!r)throw Ce.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:r};throw Ce.create("no-api-key")}const a=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},c=new cT;return setTimeout(async()=>{c.abort()},$E),sf({appId:r,apiKey:i,measurementId:s},a,c,e)}async function sf(n,{throttleEndTimeMillis:e,backoffCount:t},r,i=rf){var s;const{appId:a,measurementId:c}=n;try{await oT(r,e)}catch(l){if(c)return Se.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:a,measurementId:c};throw l}try{const l=await iT(n);return i.deleteThrottleMetadata(a),l}catch(l){const d=l;if(!aT(d)){if(i.deleteThrottleMetadata(a),c)return Se.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${d==null?void 0:d.message}]`),{appId:a,measurementId:c};throw l}const p=Number((s=d==null?void 0:d.customData)===null||s===void 0?void 0:s.httpStatus)===503?Tc(t,i.intervalMillis,eT):Tc(t,i.intervalMillis),y={throttleEndTimeMillis:Date.now()+p,backoffCount:t+1};return i.setThrottleMetadata(a,y),Se.debug(`Calling attemptFetch again in ${p} millis`),sf(n,y,r,i)}}function oT(n,e){return new Promise((t,r)=>{const i=Math.max(e-Date.now(),0),s=setTimeout(t,i);n.addEventListener(()=>{clearTimeout(s),r(Ce.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function aT(n){if(!(n instanceof Be)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class cT{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function uT(n,e,t,r,i){if(i&&i.global){n("event",t,r);return}else{const s=await e,a=Object.assign(Object.assign({},r),{send_to:s});n("event",t,a)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lT(){if(go())try{await _o()}catch(n){return Se.warn(Ce.create("indexeddb-unavailable",{errorInfo:n==null?void 0:n.toString()}).message),!1}else return Se.warn(Ce.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function hT(n,e,t,r,i,s,a){var c;const l=sT(n);l.then(S=>{t[S.measurementId]=S.appId,n.options.measurementId&&S.measurementId!==n.options.measurementId&&Se.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${S.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(S=>Se.error(S)),e.push(l);const d=lT().then(S=>{if(S)return r.getId()}),[p,y]=await Promise.all([l,d]);ZE(s)||WE(s,p.measurementId),i("js",new Date);const v=(c=a==null?void 0:a.config)!==null&&c!==void 0?c:{};return v[jE]="firebase",v.update=!0,y!=null&&(v[BE]=y),i("config",p.measurementId,v),p.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dT{constructor(e){this.app=e}_delete(){return delete nr[this.app.options.appId],Promise.resolve()}}let nr={},nl=[];const rl={};let Us="dataLayer",fT="gtag",il,of,sl=!1;function pT(){const n=[];if(mo()&&n.push("This is a browser extension environment."),_l()||n.push("Cookies are not available."),n.length>0){const e=n.map((r,i)=>`(${i+1}) ${r}`).join(" "),t=Ce.create("invalid-analytics-context",{errorInfo:e});Se.warn(t.message)}}function mT(n,e,t){pT();const r=n.options.appId;if(!r)throw Ce.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)Se.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Ce.create("no-api-key");if(nr[r]!=null)throw Ce.create("already-exists",{id:r});if(!sl){KE(Us);const{wrappedGtag:s,gtagCore:a}=XE(nr,nl,rl,Us,fT);of=s,il=a,sl=!0}return nr[r]=hT(n,nl,rl,e,il,Us,t),new dT(n)}function gT(n=vo()){n=se(n);const e=Kt(n,Si);return e.isInitialized()?e.getImmediate():_T(n)}function _T(n,e={}){const t=Kt(n,Si);if(t.isInitialized()){const i=t.getImmediate();if(Tt(e,t.getOptions()))return i;throw Ce.create("already-initialized")}return t.initialize({options:e})}async function yT(){if(mo()||!_l()||!go())return!1;try{return await _o()}catch{return!1}}function vT(n,e,t,r){n=se(n),uT(of,nr[n.app.options.appId],e,t,r).catch(i=>Se.error(i))}const ol="@firebase/analytics",al="0.10.15";function IT(){Ge(new Fe(Si,(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("installations-internal").getImmediate();return mT(r,i,t)},"PUBLIC")),Ge(new Fe("analytics-internal",n,"PRIVATE")),Ve(ol,al),Ve(ol,al,"esm2017");function n(e){try{const t=e.getProvider(Si).getImmediate();return{logEvent:(r,i,s)=>vT(t,r,i,s)}}catch(t){throw Ce.create("interop-component-reg-failed",{reason:t})}}}IT();const ET={apiKey:"AIzaSyA0a6fl6UvnfHzJoxSBV5tN5qoFkbYE8qE",authDomain:"vibewise-main.firebaseapp.com",projectId:"vibewise-main",storageBucket:"vibewise-main.firebasestorage.app",messagingSenderId:"368570660510",appId:"1:368570660510:web:511cb61ec0d44f14ed6d8f",measurementId:"G-0ZX7Q579ER"};let dt,tt,ln;const TT=()=>{if(!(typeof window>"u")){if(Pc().length){dt=Pc()[0],tt=tt||Xc(dt),ln=ln||Ju(dt);return}dt=El(ET),tt=Xc(dt),ln=Ju(dt),setTimeout(()=>{typeof window<"u"&&yT().then(n=>{n&&dt&&gT(dt)})},2e3)}};typeof window<"u"&&TT();const bi=new Je;bi.addScope("profile");bi.addScope("email");const cl=()=>typeof window<"u"&&!window.navigator.userAgent.includes("VibeWise")&&!window.location.href.includes("capacitor"),NT=async()=>{try{if(console.log("Starting Google sign-in process"),console.log("Platform detection - is web:",cl()),cl()){console.log("Using web authentication flow with popup");const n=await zc(tt,bi);return await ul(n.user),{success:!0,user:n.user}}else{console.log("Using mobile authentication flow with custom URL");const n=await zc(tt,bi);return await ul(n.user),{success:!0,user:n.user}}}catch(n){return console.error("Error signing in with Google:",n),{success:!1,error:n}}},OT=async(n,e)=>{try{return{success:!0,user:(await bg(tt,n,e)).user}}catch(t){return console.error("Error signing in with email:",t),{success:!1,error:t}}},LT=async(n,e)=>{const t={url:e,handleCodeInApp:!0};try{return await Pg(tt,n,t),window.localStorage.setItem("emailForSignIn",n),{success:!0}}catch(r){return console.error("Error sending magic link:",r),{success:!1,error:r}}},MT=async()=>{try{return await Vg(tt),{success:!0}}catch(n){return console.error("Error signing out:",n),{success:!1,error:n}}},ul=async n=>{var r;if(!n)return;const e=ii(ln,"users",n.uid);if(!(await ZI(e)).exists()){await Ms(e,{uid:n.uid,email:n.email,displayName:n.displayName||((r=n.email)==null?void 0:r.split("@")[0])||"User",photoURL:n.photoURL||"",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});const i=ii(ln,"users",n.uid,"private","settings");await Ms(i,{theme:"system",notificationEnabled:!0,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});const s=ii(ln,"users",n.uid,"private","summary");await Ms(s,{totalSessions:0,streakDays:0,lastSessionDate:null,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()})}},Bs=$f({user:null,loading:!0,error:null});if(typeof window<"u"){const n=setTimeout(()=>{Bs.update(e=>e.loading?(console.log("Auth loading timed out, forcing ready state"),{...e,loading:!1}):e)},5e3);Dg(tt,e=>{clearTimeout(n),Bs.set({user:e,loading:!1,error:null})},e=>{clearTimeout(n),console.error("Auth state error:",e),Bs.update(t=>({...t,loading:!1,error:e}))})}export{Fe as C,Be as F,vn as S,Ge as _,Bs as a,OT as b,LT as c,De as d,se as e,Kt as f,vo as g,Jf as h,pr as i,Zf as j,ii as k,ln as l,ZI as m,RT as n,kT as o,gl as p,ST as q,Ve as r,NT as s,PT as t,Ci as u,CT as v,bT as w,VT as x,DT as y,MT as z};
