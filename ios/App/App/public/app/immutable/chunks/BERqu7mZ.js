import{_ as Oe,C as Ie,r as ee,S as De,d as Se,F as Ne,g as xe,e as F,u as ie,f as ve,h as Ce,i as ae,p as Pe,j as Le,k as v,l as b,m as M,q as z,n as S,w as B,o as W,t as ce,v as Be,x as X,y as K}from"./3OU4Vcau.js";/**
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
 */const ue="firebasestorage.googleapis.com",le="storageBucket",Fe=2*60*1e3,Me=10*60*1e3;/**
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
 */class h extends Ne{constructor(t,n,s=0){super(j(t),`Firebase Storage: ${n} (${j(t)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,h.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return j(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var l;(function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(l||(l={}));function j(e){return"storage/"+e}function G(){const e="An unknown error occurred, please check the error payload for server response.";return new h(l.UNKNOWN,e)}function He(e){return new h(l.OBJECT_NOT_FOUND,"Object '"+e+"' does not exist.")}function $e(e){return new h(l.QUOTA_EXCEEDED,"Quota for bucket '"+e+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function je(){const e="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new h(l.UNAUTHENTICATED,e)}function Ve(){return new h(l.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function qe(e){return new h(l.UNAUTHORIZED,"User does not have permission to access '"+e+"'.")}function ze(){return new h(l.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function We(){return new h(l.CANCELED,"User canceled the upload/download.")}function Xe(e){return new h(l.INVALID_URL,"Invalid URL '"+e+"'.")}function Ke(e){return new h(l.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}function Ge(){return new h(l.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+le+"' property when initializing the app?")}function Ye(){return new h(l.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function Ze(){return new h(l.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function Qe(e){return new h(l.UNSUPPORTED_ENVIRONMENT,`${e} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function q(e){return new h(l.INVALID_ARGUMENT,e)}function he(){return new h(l.APP_DELETED,"The Firebase app was deleted.")}function Je(e){return new h(l.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function x(e,t){return new h(l.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function N(e){throw new h(l.INTERNAL_ERROR,"Internal error: "+e)}/**
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
 */class y{constructor(t,n){this.bucket=t,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,n){let s;try{s=y.makeFromUrl(t,n)}catch{return new y(t,"")}if(s.path==="")return s;throw Ke(t)}static makeFromUrl(t,n){let s=null;const r="([A-Za-z0-9.\\-_]+)";function o(m){m.path.charAt(m.path.length-1)==="/"&&(m.path_=m.path_.slice(0,-1))}const i="(/(.*))?$",a=new RegExp("^gs://"+r+i,"i"),c={bucket:1,path:3};function u(m){m.path_=decodeURIComponent(m.path)}const d="v[A-Za-z0-9_]+",p=n.replace(/[.]/g,"\\."),_="(/([^?#]*).*)?$",R=new RegExp(`^https?://${p}/${d}/b/${r}/o${_}`,"i"),w={bucket:1,path:3},k=n===ue?"(?:storage.googleapis.com|storage.cloud.google.com)":n,g="([^?#]*)",D=new RegExp(`^https?://${k}/${r}/${g}`,"i"),T=[{regex:a,indices:c,postModify:o},{regex:R,indices:w,postModify:u},{regex:D,indices:{bucket:1,path:2},postModify:u}];for(let m=0;m<T.length;m++){const C=T[m],H=C.regex.exec(t);if(H){const Ue=H[C.indices.bucket];let $=H[C.indices.path];$||($=""),s=new y(Ue,$),C.postModify(s);break}}if(s==null)throw Xe(t);return s}}class et{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
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
 */function tt(e,t,n){let s=1,r=null,o=null,i=!1,a=0;function c(){return a===2}let u=!1;function d(...g){u||(u=!0,t.apply(null,g))}function p(g){r=setTimeout(()=>{r=null,e(R,c())},g)}function _(){o&&clearTimeout(o)}function R(g,...D){if(u){_();return}if(g){_(),d.call(null,g,...D);return}if(c()||i){_(),d.call(null,g,...D);return}s<64&&(s*=2);let T;a===1?(a=2,T=0):T=(s+Math.random())*1e3,p(T)}let w=!1;function k(g){w||(w=!0,_(),!u&&(r!==null?(g||(a=2),clearTimeout(r),p(0)):g||(a=1)))}return p(0),o=setTimeout(()=>{i=!0,k(!0)},n),k}function nt(e){e(!1)}/**
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
 */function st(e){return e!==void 0}function rt(e){return typeof e=="object"&&!Array.isArray(e)}function Y(e){return typeof e=="string"||e instanceof String}function te(e){return Z()&&e instanceof Blob}function Z(){return typeof Blob<"u"}function ne(e,t,n,s){if(s<t)throw q(`Invalid value for '${e}'. Expected ${t} or greater.`);if(s>n)throw q(`Invalid value for '${e}'. Expected ${n} or less.`)}/**
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
 */function Q(e,t,n){let s=t;return n==null&&(s=`https://${t}`),`${n}://${s}/v0${e}`}function de(e){const t=encodeURIComponent;let n="?";for(const s in e)if(e.hasOwnProperty(s)){const r=t(s)+"="+t(e[s]);n=n+r+"&"}return n=n.slice(0,-1),n}var O;(function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"})(O||(O={}));/**
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
 */function ot(e,t){const n=e>=500&&e<600,r=[408,429].indexOf(e)!==-1,o=t.indexOf(e)!==-1;return n||r||o}/**
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
 */class it{constructor(t,n,s,r,o,i,a,c,u,d,p,_=!0,R=!1){this.url_=t,this.method_=n,this.headers_=s,this.body_=r,this.successCodes_=o,this.additionalRetryCodes_=i,this.callback_=a,this.errorCallback_=c,this.timeout_=u,this.progressCallback_=d,this.connectionFactory_=p,this.retry=_,this.isUsingEmulator=R,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((w,k)=>{this.resolve_=w,this.reject_=k,this.start_()})}start_(){const t=(s,r)=>{if(r){s(!1,new P(!1,null,!0));return}const o=this.connectionFactory_();this.pendingConnection_=o;const i=a=>{const c=a.loaded,u=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,u)};this.progressCallback_!==null&&o.addUploadProgressListener(i),o.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&o.removeUploadProgressListener(i),this.pendingConnection_=null;const a=o.getErrorCode()===O.NO_ERROR,c=o.getStatus();if(!a||ot(c,this.additionalRetryCodes_)&&this.retry){const d=o.getErrorCode()===O.ABORT;s(!1,new P(!1,null,d));return}const u=this.successCodes_.indexOf(c)!==-1;s(!0,new P(u,o))})},n=(s,r)=>{const o=this.resolve_,i=this.reject_,a=r.connection;if(r.wasSuccessCode)try{const c=this.callback_(a,a.getResponse());st(c)?o(c):o()}catch(c){i(c)}else if(a!==null){const c=G();c.serverResponse=a.getErrorText(),this.errorCallback_?i(this.errorCallback_(a,c)):i(c)}else if(r.canceled){const c=this.appDelete_?he():We();i(c)}else{const c=ze();i(c)}};this.canceled_?n(!1,new P(!1,null,!0)):this.backoffId_=tt(t,n,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&nt(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class P{constructor(t,n,s){this.wasSuccessCode=t,this.connection=n,this.canceled=!!s}}function at(e,t){t!==null&&t.length>0&&(e.Authorization="Firebase "+t)}function ct(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function ut(e,t){t&&(e["X-Firebase-GMPID"]=t)}function lt(e,t){t!==null&&(e["X-Firebase-AppCheck"]=t)}function ht(e,t,n,s,r,o,i=!0,a=!1){const c=de(e.urlParams),u=e.url+c,d=Object.assign({},e.headers);return ut(d,t),at(d,n),ct(d,o),lt(d,s),new it(u,e.method,d,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,r,i,a)}/**
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
 */function dt(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function ft(...e){const t=dt();if(t!==void 0){const n=new t;for(let s=0;s<e.length;s++)n.append(e[s]);return n.getBlob()}else{if(Z())return new Blob(e);throw new h(l.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function pt(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}/**
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
 */function _t(e){if(typeof atob>"u")throw Qe("base-64");return atob(e)}/**
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
 */const E={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class V{constructor(t,n){this.data=t,this.contentType=n||null}}function gt(e,t){switch(e){case E.RAW:return new V(fe(t));case E.BASE64:case E.BASE64URL:return new V(pe(e,t));case E.DATA_URL:return new V(wt(t),yt(t))}throw G()}function fe(e){const t=[];for(let n=0;n<e.length;n++){let s=e.charCodeAt(n);if(s<=127)t.push(s);else if(s<=2047)t.push(192|s>>6,128|s&63);else if((s&64512)===55296)if(!(n<e.length-1&&(e.charCodeAt(n+1)&64512)===56320))t.push(239,191,189);else{const o=s,i=e.charCodeAt(++n);s=65536|(o&1023)<<10|i&1023,t.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|s&63)}else(s&64512)===56320?t.push(239,191,189):t.push(224|s>>12,128|s>>6&63,128|s&63)}return new Uint8Array(t)}function mt(e){let t;try{t=decodeURIComponent(e)}catch{throw x(E.DATA_URL,"Malformed data URL.")}return fe(t)}function pe(e,t){switch(e){case E.BASE64:{const r=t.indexOf("-")!==-1,o=t.indexOf("_")!==-1;if(r||o)throw x(e,"Invalid character '"+(r?"-":"_")+"' found: is it base64url encoded?");break}case E.BASE64URL:{const r=t.indexOf("+")!==-1,o=t.indexOf("/")!==-1;if(r||o)throw x(e,"Invalid character '"+(r?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=_t(t)}catch(r){throw r.message.includes("polyfill")?r:x(e,"Invalid character found")}const s=new Uint8Array(n.length);for(let r=0;r<n.length;r++)s[r]=n.charCodeAt(r);return s}class _e{constructor(t){this.base64=!1,this.contentType=null;const n=t.match(/^data:([^,]+)?,/);if(n===null)throw x(E.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const s=n[1]||null;s!=null&&(this.base64=Rt(s,";base64"),this.contentType=this.base64?s.substring(0,s.length-7):s),this.rest=t.substring(t.indexOf(",")+1)}}function wt(e){const t=new _e(e);return t.base64?pe(E.BASE64,t.rest):mt(t.rest)}function yt(e){return new _e(e).contentType}function Rt(e,t){return e.length>=t.length?e.substring(e.length-t.length)===t:!1}/**
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
 */class A{constructor(t,n){let s=0,r="";te(t)?(this.data_=t,s=t.size,r=t.type):t instanceof ArrayBuffer?(n?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),s=this.data_.length):t instanceof Uint8Array&&(n?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),s=t.length),this.size_=s,this.type_=r}size(){return this.size_}type(){return this.type_}slice(t,n){if(te(this.data_)){const s=this.data_,r=pt(s,t,n);return r===null?null:new A(r)}else{const s=new Uint8Array(this.data_.buffer,t,n-t);return new A(s,!0)}}static getBlob(...t){if(Z()){const n=t.map(s=>s instanceof A?s.data_:s);return new A(ft.apply(null,n))}else{const n=t.map(i=>Y(i)?gt(E.RAW,i).data:i.data_);let s=0;n.forEach(i=>{s+=i.byteLength});const r=new Uint8Array(s);let o=0;return n.forEach(i=>{for(let a=0;a<i.length;a++)r[o++]=i[a]}),new A(r,!0)}}uploadData(){return this.data_}}/**
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
 */function ge(e){let t;try{t=JSON.parse(e)}catch{return null}return rt(t)?t:null}/**
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
 */function bt(e){if(e.length===0)return null;const t=e.lastIndexOf("/");return t===-1?"":e.slice(0,t)}function Tt(e,t){const n=t.split("/").filter(s=>s.length>0).join("/");return e.length===0?n:e+"/"+n}function me(e){const t=e.lastIndexOf("/",e.length-2);return t===-1?e:e.slice(t+1)}/**
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
 */function Et(e,t){return t}class f{constructor(t,n,s,r){this.server=t,this.local=n||t,this.writable=!!s,this.xform=r||Et}}let L=null;function kt(e){return!Y(e)||e.length<2?e:me(e)}function we(){if(L)return L;const e=[];e.push(new f("bucket")),e.push(new f("generation")),e.push(new f("metageneration")),e.push(new f("name","fullPath",!0));function t(o,i){return kt(i)}const n=new f("name");n.xform=t,e.push(n);function s(o,i){return i!==void 0?Number(i):i}const r=new f("size");return r.xform=s,e.push(r),e.push(new f("timeCreated")),e.push(new f("updated")),e.push(new f("md5Hash",null,!0)),e.push(new f("cacheControl",null,!0)),e.push(new f("contentDisposition",null,!0)),e.push(new f("contentEncoding",null,!0)),e.push(new f("contentLanguage",null,!0)),e.push(new f("contentType",null,!0)),e.push(new f("metadata","customMetadata",!0)),L=e,L}function At(e,t){function n(){const s=e.bucket,r=e.fullPath,o=new y(s,r);return t._makeStorageReference(o)}Object.defineProperty(e,"ref",{get:n})}function Ut(e,t,n){const s={};s.type="file";const r=n.length;for(let o=0;o<r;o++){const i=n[o];s[i.local]=i.xform(s,t[i.server])}return At(s,e),s}function ye(e,t,n){const s=ge(t);return s===null?null:Ut(e,s,n)}function Ot(e,t,n,s){const r=ge(t);if(r===null||!Y(r.downloadTokens))return null;const o=r.downloadTokens;if(o.length===0)return null;const i=encodeURIComponent;return o.split(",").map(u=>{const d=e.bucket,p=e.fullPath,_="/b/"+i(d)+"/o/"+i(p),R=Q(_,n,s),w=de({alt:"media",token:u});return R+w})[0]}function It(e,t){const n={},s=t.length;for(let r=0;r<s;r++){const o=t[r];o.writable&&(n[o.server]=e[o.local])}return JSON.stringify(n)}class Re{constructor(t,n,s,r){this.url=t,this.method=n,this.handler=s,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
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
 */function be(e){if(!e)throw G()}function Dt(e,t){function n(s,r){const o=ye(e,r,t);return be(o!==null),o}return n}function St(e,t){function n(s,r){const o=ye(e,r,t);return be(o!==null),Ot(o,r,e.host,e._protocol)}return n}function Te(e){function t(n,s){let r;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?r=Ve():r=je():n.getStatus()===402?r=$e(e.bucket):n.getStatus()===403?r=qe(e.path):r=s,r.status=n.getStatus(),r.serverResponse=s.serverResponse,r}return t}function Nt(e){const t=Te(e);function n(s,r){let o=t(s,r);return s.getStatus()===404&&(o=He(e.path)),o.serverResponse=r.serverResponse,o}return n}function xt(e,t,n){const s=t.fullServerUrl(),r=Q(s,e.host,e._protocol),o="GET",i=e.maxOperationRetryTime,a=new Re(r,o,St(e,n),i);return a.errorHandler=Nt(t),a}function vt(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}function Ct(e,t,n){const s=Object.assign({},n);return s.fullPath=e.path,s.size=t.size(),s.contentType||(s.contentType=vt(null,t)),s}function Pt(e,t,n,s,r){const o=t.bucketOnlyServerUrl(),i={"X-Goog-Upload-Protocol":"multipart"};function a(){let T="";for(let m=0;m<2;m++)T=T+Math.random().toString().slice(2);return T}const c=a();i["Content-Type"]="multipart/related; boundary="+c;const u=Ct(t,s,r),d=It(u,n),p="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+d+`\r
--`+c+`\r
Content-Type: `+u.contentType+`\r
\r
`,_=`\r
--`+c+"--",R=A.getBlob(p,s,_);if(R===null)throw Ye();const w={name:u.fullPath},k=Q(o,e.host,e._protocol),g="POST",D=e.maxUploadRetryTime,U=new Re(k,g,Dt(e,n),D);return U.urlParams=w,U.headers=i,U.body=R.uploadData(),U.errorHandler=Te(t),U}class Lt{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=O.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=O.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=O.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,n,s,r,o){if(this.sent_)throw N("cannot .send() more than once");if(ae(t)&&s&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(n,t,!0),o!==void 0)for(const i in o)o.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,o[i].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw N("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw N("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw N("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw N("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",t)}}class Bt extends Lt{initXhr(){this.xhr_.responseType="text"}}function Ee(){return new Bt}/**
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
 */class I{constructor(t,n){this._service=t,n instanceof y?this._location=n:this._location=y.makeFromUrl(n,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,n){return new I(t,n)}get root(){const t=new y(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return me(this._location.path)}get storage(){return this._service}get parent(){const t=bt(this._location.path);if(t===null)return null;const n=new y(this._location.bucket,t);return new I(this._service,n)}_throwIfRoot(t){if(this._location.path==="")throw Je(t)}}function Ft(e,t,n){e._throwIfRoot("uploadBytes");const s=Pt(e.storage,e._location,we(),new A(t,!0),n);return e.storage.makeRequestWithTokens(s,Ee).then(r=>({metadata:r,ref:e}))}function Mt(e){e._throwIfRoot("getDownloadURL");const t=xt(e.storage,e._location,we());return e.storage.makeRequestWithTokens(t,Ee).then(n=>{if(n===null)throw Ze();return n})}function Ht(e,t){const n=Tt(e._location.path,t),s=new y(e._location.bucket,n);return new I(e.storage,s)}/**
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
 */function $t(e){return/^[A-Za-z]+:\/\//.test(e)}function jt(e,t){return new I(e,t)}function ke(e,t){if(e instanceof J){const n=e;if(n._bucket==null)throw Ge();const s=new I(n,n._bucket);return t!=null?ke(s,t):s}else return t!==void 0?Ht(e,t):e}function Vt(e,t){if(t&&$t(t)){if(e instanceof J)return jt(e,t);throw q("To use ref(service, url), the first argument must be a Storage instance.")}else return ke(e,t)}function se(e,t){const n=t==null?void 0:t[le];return n==null?null:y.makeFromBucketSpec(n,e)}function qt(e,t,n,s={}){e.host=`${t}:${n}`;const r=ae(t);r&&(Pe(`https://${e.host}`),ie("Storage",!0)),e._isUsingEmulator=!0,e._protocol=r?"https":"http";const{mockUserToken:o}=s;o&&(e._overrideAuthToken=typeof o=="string"?o:Le(o,e.app.options.projectId))}class J{constructor(t,n,s,r,o,i=!1){this.app=t,this._authProvider=n,this._appCheckProvider=s,this._url=r,this._firebaseVersion=o,this._isUsingEmulator=i,this._bucket=null,this._host=ue,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Fe,this._maxUploadRetryTime=Me,this._requests=new Set,r!=null?this._bucket=y.makeFromBucketSpec(r,this._host):this._bucket=se(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=y.makeFromBucketSpec(this._url,t):this._bucket=se(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){ne("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){ne("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const n=await t.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){if(Se(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new I(this,t)}_makeRequest(t,n,s,r,o=!0){if(this._deleted)return new et(he());{const i=ht(t,this._appId,s,r,n,this._firebaseVersion,o,this._isUsingEmulator);return this._requests.add(i),i.getPromise().then(()=>this._requests.delete(i),()=>this._requests.delete(i)),i}}async makeRequestWithTokens(t,n){const[s,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,n,s,r).getPromise()}}const re="@firebase/storage",oe="0.13.10";/**
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
 */const Ae="storage";function zt(e,t,n){return e=F(e),Ft(e,t,n)}function Wt(e){return e=F(e),Mt(e)}function Xt(e,t){return e=F(e),Vt(e,t)}function Kt(e=xe(),t){e=F(e),ie("Storage",!1);const s=ve(e,Ae).getImmediate({identifier:t}),r=Ce("storage");return r&&Gt(s,...r),s}function Gt(e,t,n,s={}){qt(e,t,n,s)}function Yt(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return new J(n,s,r,t,De)}function Zt(){Oe(new Ie(Ae,Yt,"PUBLIC").setMultipleInstances(!0)),ee(re,oe,""),ee(re,oe,"esm2017")}Zt();const Jt=async(e,t)=>{try{const n={...t,type:"reflection",createdAt:new Date().toISOString()},s=S(b,"users",e.uid,"sessions"),r=await X(s,n),o=v(b,"users",e.uid,"private","summary"),i=await M(o);return i.exists()&&await K(o,{latest_reflection_timestamp:t.timestamp,reflection_count:(i.data().reflection_count||0)+1,updatedAt:new Date().toISOString()}),{success:!0,id:r.id}}catch(n){return console.error("Error creating reflection:",n),{success:!1,error:n}}},en=async(e,t)=>{try{const n=Kt(),s=`${e.uid}/audio/${Date.now()}.webm`,r=Xt(n,s);return await zt(r,t),{success:!0,url:await Wt(r)}}catch(n){return console.error("Error uploading audio:",n),{success:!1,error:n}}},tn=async e=>{try{const t=["optimistic","calm","frustrated","anxious","confident","neutral"],n=t[Math.floor(Math.random()*t.length)],s=parseFloat((.7+Math.random()*.3).toFixed(2));return await new Promise(r=>setTimeout(r,1e3)),{success:!0,tone:n,confidence:s}}catch(t){return console.error("Error analyzing voice tone:",t),{success:!1,error:t}}},nn=async(e,t)=>{try{const n={...t,type:"balcony",createdAt:new Date().toISOString()},s=S(b,"users",e.uid,"sessions");return{success:!0,id:(await X(s,n)).id}}catch(n){return console.error("Error creating balcony experiment:",n),{success:!1,error:n}}},sn=async(e,t)=>{try{const n={...t,type:"hrv_session",createdAt:new Date().toISOString()},s=S(b,"users",e.uid,"sessions"),r=await X(s,n),o=v(b,"users",e.uid,"private","summary"),i=await M(o);if(i.exists()){const a=new Date;a.setDate(a.getDate()-7);const c=z(S(b,"users",e.uid,"sessions"),B("type","==","hrv_session"),B("timestamp",">=",a.toISOString()),ce("timestamp","desc")),u=await W(c);let d=t.avg_rmssd,p=1;u.forEach(R=>{const w=R.data();w.avg_rmssd&&(d+=w.avg_rmssd,p++)});const _=d/p;await K(o,{latest_vibe_score:t.vibe_score,avg_rmssd_7d:_,hrv_session_count:(i.data().hrv_session_count||0)+1,updatedAt:new Date().toISOString()})}return{success:!0,id:r.id}}catch(n){return console.error("Error creating HRV session:",n),{success:!1,error:n}}},rn=async(e,t)=>{try{const n=v(b,"users",e.uid,"sessions",t),s=await M(n);return s.exists()&&s.data().type==="reflection"?{success:!0,reflection:s.data()}:{success:!1,error:"Reflection not found"}}catch(n){return console.error("Error getting reflection:",n),{success:!1,error:n}}},on=async(e,t=10)=>{try{const n=z(S(b,"users",e.uid,"sessions"),ce("timestamp","desc"),Be(t)),s=await W(n),r=[];return s.forEach(o=>{const i=o.data();r.push({...i,id:o.id})}),{success:!0,sessions:r}}catch(n){return console.error("Error getting recent sessions:",n),{success:!1,error:n}}},an=async(e,t)=>{try{const n=v(b,"users",e.uid,"sessions",t),s=await M(n);return s.exists()?{success:!0,session:{...s.data(),id:s.id}}:{success:!1,error:"Session not found"}}catch(n){return console.error("Error getting session:",n),{success:!1,error:n}}},cn=async(e,t)=>{try{const n=z(S(b,"users",e.uid,"sessions"),B("type","==","balcony"),B("parent_reflection_id","==",t)),s=await W(n);if(!s.empty){const r=s.docs[0];return{success:!0,balcony:{...r.data(),id:r.id}}}return{success:!1,error:"No balcony experiment found for this reflection"}}catch(n){return console.error("Error getting balcony experiment:",n),{success:!1,error:n}}},un=async(e,t,n)=>{try{const s=v(b,"users",e.uid,"sessions",t);return await K(s,{...n,updatedAt:new Date().toISOString()}),{success:!0}}catch(s){return console.error("Error updating balcony experiment:",s),{success:!1,error:s}}};export{cn as a,on as b,nn as c,an as d,en as e,Jt as f,rn as g,tn as h,sn as i,un as u};
