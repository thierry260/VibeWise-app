import{_ as Oe,C as Ie,r as Y,S as De,b as Ne,F as Se,g as ve,c as L,u as se,d as Ce,e as xe,i as re,p as Pe,f as Le,h as j,j as A,k as V,q as oe,l as v,o as ie,m as ae,n as q,s as ce,w as Z}from"./Ch0D86az.js";/**
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
 */const ue="firebasestorage.googleapis.com",le="storageBucket",Be=2*60*1e3,Fe=10*60*1e3;/**
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
 */class h extends Se{constructor(t,n,s=0){super(M(t),`Firebase Storage: ${n} (${M(t)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,h.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return M(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var l;(function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(l||(l={}));function M(e){return"storage/"+e}function z(){const e="An unknown error occurred, please check the error payload for server response.";return new h(l.UNKNOWN,e)}function Me(e){return new h(l.OBJECT_NOT_FOUND,"Object '"+e+"' does not exist.")}function He(e){return new h(l.QUOTA_EXCEEDED,"Quota for bucket '"+e+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function $e(){const e="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new h(l.UNAUTHENTICATED,e)}function je(){return new h(l.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function Ve(e){return new h(l.UNAUTHORIZED,"User does not have permission to access '"+e+"'.")}function qe(){return new h(l.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function ze(){return new h(l.CANCELED,"User canceled the upload/download.")}function We(e){return new h(l.INVALID_URL,"Invalid URL '"+e+"'.")}function Xe(e){return new h(l.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}function Ke(){return new h(l.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+le+"' property when initializing the app?")}function Ge(){return new h(l.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function Ye(){return new h(l.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function Ze(e){return new h(l.UNSUPPORTED_ENVIRONMENT,`${e} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function $(e){return new h(l.INVALID_ARGUMENT,e)}function he(){return new h(l.APP_DELETED,"The Firebase app was deleted.")}function Je(e){return new h(l.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function S(e,t){return new h(l.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function N(e){throw new h(l.INTERNAL_ERROR,"Internal error: "+e)}/**
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
 */class R{constructor(t,n){this.bucket=t,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,n){let s;try{s=R.makeFromUrl(t,n)}catch{return new R(t,"")}if(s.path==="")return s;throw Xe(t)}static makeFromUrl(t,n){let s=null;const r="([A-Za-z0-9.\\-_]+)";function o(m){m.path.charAt(m.path.length-1)==="/"&&(m.path_=m.path_.slice(0,-1))}const i="(/(.*))?$",a=new RegExp("^gs://"+r+i,"i"),c={bucket:1,path:3};function u(m){m.path_=decodeURIComponent(m.path)}const d="v[A-Za-z0-9_]+",p=n.replace(/[.]/g,"\\."),_="(/([^?#]*).*)?$",b=new RegExp(`^https?://${p}/${d}/b/${r}/o${_}`,"i"),w={bucket:1,path:3},E=n===ue?"(?:storage.googleapis.com|storage.cloud.google.com)":n,g="([^?#]*)",D=new RegExp(`^https?://${E}/${r}/${g}`,"i"),y=[{regex:a,indices:c,postModify:o},{regex:b,indices:w,postModify:u},{regex:D,indices:{bucket:1,path:2},postModify:u}];for(let m=0;m<y.length;m++){const C=y[m],B=C.regex.exec(t);if(B){const Ue=B[C.indices.bucket];let F=B[C.indices.path];F||(F=""),s=new R(Ue,F),C.postModify(s);break}}if(s==null)throw We(t);return s}}class Qe{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
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
 */function et(e,t,n){let s=1,r=null,o=null,i=!1,a=0;function c(){return a===2}let u=!1;function d(...g){u||(u=!0,t.apply(null,g))}function p(g){r=setTimeout(()=>{r=null,e(b,c())},g)}function _(){o&&clearTimeout(o)}function b(g,...D){if(u){_();return}if(g){_(),d.call(null,g,...D);return}if(c()||i){_(),d.call(null,g,...D);return}s<64&&(s*=2);let y;a===1?(a=2,y=0):y=(s+Math.random())*1e3,p(y)}let w=!1;function E(g){w||(w=!0,_(),!u&&(r!==null?(g||(a=2),clearTimeout(r),p(0)):g||(a=1)))}return p(0),o=setTimeout(()=>{i=!0,E(!0)},n),E}function tt(e){e(!1)}/**
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
 */function nt(e){return e!==void 0}function st(e){return typeof e=="object"&&!Array.isArray(e)}function W(e){return typeof e=="string"||e instanceof String}function J(e){return X()&&e instanceof Blob}function X(){return typeof Blob<"u"}function Q(e,t,n,s){if(s<t)throw $(`Invalid value for '${e}'. Expected ${t} or greater.`);if(s>n)throw $(`Invalid value for '${e}'. Expected ${n} or less.`)}/**
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
 */function K(e,t,n){let s=t;return n==null&&(s=`https://${t}`),`${n}://${s}/v0${e}`}function de(e){const t=encodeURIComponent;let n="?";for(const s in e)if(e.hasOwnProperty(s)){const r=t(s)+"="+t(e[s]);n=n+r+"&"}return n=n.slice(0,-1),n}var O;(function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"})(O||(O={}));/**
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
 */function rt(e,t){const n=e>=500&&e<600,r=[408,429].indexOf(e)!==-1,o=t.indexOf(e)!==-1;return n||r||o}/**
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
 */class ot{constructor(t,n,s,r,o,i,a,c,u,d,p,_=!0,b=!1){this.url_=t,this.method_=n,this.headers_=s,this.body_=r,this.successCodes_=o,this.additionalRetryCodes_=i,this.callback_=a,this.errorCallback_=c,this.timeout_=u,this.progressCallback_=d,this.connectionFactory_=p,this.retry=_,this.isUsingEmulator=b,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((w,E)=>{this.resolve_=w,this.reject_=E,this.start_()})}start_(){const t=(s,r)=>{if(r){s(!1,new x(!1,null,!0));return}const o=this.connectionFactory_();this.pendingConnection_=o;const i=a=>{const c=a.loaded,u=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,u)};this.progressCallback_!==null&&o.addUploadProgressListener(i),o.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&o.removeUploadProgressListener(i),this.pendingConnection_=null;const a=o.getErrorCode()===O.NO_ERROR,c=o.getStatus();if(!a||rt(c,this.additionalRetryCodes_)&&this.retry){const d=o.getErrorCode()===O.ABORT;s(!1,new x(!1,null,d));return}const u=this.successCodes_.indexOf(c)!==-1;s(!0,new x(u,o))})},n=(s,r)=>{const o=this.resolve_,i=this.reject_,a=r.connection;if(r.wasSuccessCode)try{const c=this.callback_(a,a.getResponse());nt(c)?o(c):o()}catch(c){i(c)}else if(a!==null){const c=z();c.serverResponse=a.getErrorText(),this.errorCallback_?i(this.errorCallback_(a,c)):i(c)}else if(r.canceled){const c=this.appDelete_?he():ze();i(c)}else{const c=qe();i(c)}};this.canceled_?n(!1,new x(!1,null,!0)):this.backoffId_=et(t,n,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&tt(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class x{constructor(t,n,s){this.wasSuccessCode=t,this.connection=n,this.canceled=!!s}}function it(e,t){t!==null&&t.length>0&&(e.Authorization="Firebase "+t)}function at(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function ct(e,t){t&&(e["X-Firebase-GMPID"]=t)}function ut(e,t){t!==null&&(e["X-Firebase-AppCheck"]=t)}function lt(e,t,n,s,r,o,i=!0,a=!1){const c=de(e.urlParams),u=e.url+c,d=Object.assign({},e.headers);return ct(d,t),it(d,n),at(d,o),ut(d,s),new ot(u,e.method,d,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,r,i,a)}/**
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
 */function ht(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function dt(...e){const t=ht();if(t!==void 0){const n=new t;for(let s=0;s<e.length;s++)n.append(e[s]);return n.getBlob()}else{if(X())return new Blob(e);throw new h(l.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function ft(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}/**
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
 */function pt(e){if(typeof atob>"u")throw Ze("base-64");return atob(e)}/**
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
 */const T={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class H{constructor(t,n){this.data=t,this.contentType=n||null}}function _t(e,t){switch(e){case T.RAW:return new H(fe(t));case T.BASE64:case T.BASE64URL:return new H(pe(e,t));case T.DATA_URL:return new H(mt(t),wt(t))}throw z()}function fe(e){const t=[];for(let n=0;n<e.length;n++){let s=e.charCodeAt(n);if(s<=127)t.push(s);else if(s<=2047)t.push(192|s>>6,128|s&63);else if((s&64512)===55296)if(!(n<e.length-1&&(e.charCodeAt(n+1)&64512)===56320))t.push(239,191,189);else{const o=s,i=e.charCodeAt(++n);s=65536|(o&1023)<<10|i&1023,t.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|s&63)}else(s&64512)===56320?t.push(239,191,189):t.push(224|s>>12,128|s>>6&63,128|s&63)}return new Uint8Array(t)}function gt(e){let t;try{t=decodeURIComponent(e)}catch{throw S(T.DATA_URL,"Malformed data URL.")}return fe(t)}function pe(e,t){switch(e){case T.BASE64:{const r=t.indexOf("-")!==-1,o=t.indexOf("_")!==-1;if(r||o)throw S(e,"Invalid character '"+(r?"-":"_")+"' found: is it base64url encoded?");break}case T.BASE64URL:{const r=t.indexOf("+")!==-1,o=t.indexOf("/")!==-1;if(r||o)throw S(e,"Invalid character '"+(r?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=pt(t)}catch(r){throw r.message.includes("polyfill")?r:S(e,"Invalid character found")}const s=new Uint8Array(n.length);for(let r=0;r<n.length;r++)s[r]=n.charCodeAt(r);return s}class _e{constructor(t){this.base64=!1,this.contentType=null;const n=t.match(/^data:([^,]+)?,/);if(n===null)throw S(T.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const s=n[1]||null;s!=null&&(this.base64=Rt(s,";base64"),this.contentType=this.base64?s.substring(0,s.length-7):s),this.rest=t.substring(t.indexOf(",")+1)}}function mt(e){const t=new _e(e);return t.base64?pe(T.BASE64,t.rest):gt(t.rest)}function wt(e){return new _e(e).contentType}function Rt(e,t){return e.length>=t.length?e.substring(e.length-t.length)===t:!1}/**
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
 */class k{constructor(t,n){let s=0,r="";J(t)?(this.data_=t,s=t.size,r=t.type):t instanceof ArrayBuffer?(n?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),s=this.data_.length):t instanceof Uint8Array&&(n?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),s=t.length),this.size_=s,this.type_=r}size(){return this.size_}type(){return this.type_}slice(t,n){if(J(this.data_)){const s=this.data_,r=ft(s,t,n);return r===null?null:new k(r)}else{const s=new Uint8Array(this.data_.buffer,t,n-t);return new k(s,!0)}}static getBlob(...t){if(X()){const n=t.map(s=>s instanceof k?s.data_:s);return new k(dt.apply(null,n))}else{const n=t.map(i=>W(i)?_t(T.RAW,i).data:i.data_);let s=0;n.forEach(i=>{s+=i.byteLength});const r=new Uint8Array(s);let o=0;return n.forEach(i=>{for(let a=0;a<i.length;a++)r[o++]=i[a]}),new k(r,!0)}}uploadData(){return this.data_}}/**
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
 */function ge(e){let t;try{t=JSON.parse(e)}catch{return null}return st(t)?t:null}/**
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
 */function bt(e){if(e.length===0)return null;const t=e.lastIndexOf("/");return t===-1?"":e.slice(0,t)}function yt(e,t){const n=t.split("/").filter(s=>s.length>0).join("/");return e.length===0?n:e+"/"+n}function me(e){const t=e.lastIndexOf("/",e.length-2);return t===-1?e:e.slice(t+1)}/**
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
 */function Tt(e,t){return t}class f{constructor(t,n,s,r){this.server=t,this.local=n||t,this.writable=!!s,this.xform=r||Tt}}let P=null;function Et(e){return!W(e)||e.length<2?e:me(e)}function we(){if(P)return P;const e=[];e.push(new f("bucket")),e.push(new f("generation")),e.push(new f("metageneration")),e.push(new f("name","fullPath",!0));function t(o,i){return Et(i)}const n=new f("name");n.xform=t,e.push(n);function s(o,i){return i!==void 0?Number(i):i}const r=new f("size");return r.xform=s,e.push(r),e.push(new f("timeCreated")),e.push(new f("updated")),e.push(new f("md5Hash",null,!0)),e.push(new f("cacheControl",null,!0)),e.push(new f("contentDisposition",null,!0)),e.push(new f("contentEncoding",null,!0)),e.push(new f("contentLanguage",null,!0)),e.push(new f("contentType",null,!0)),e.push(new f("metadata","customMetadata",!0)),P=e,P}function kt(e,t){function n(){const s=e.bucket,r=e.fullPath,o=new R(s,r);return t._makeStorageReference(o)}Object.defineProperty(e,"ref",{get:n})}function At(e,t,n){const s={};s.type="file";const r=n.length;for(let o=0;o<r;o++){const i=n[o];s[i.local]=i.xform(s,t[i.server])}return kt(s,e),s}function Re(e,t,n){const s=ge(t);return s===null?null:At(e,s,n)}function Ut(e,t,n,s){const r=ge(t);if(r===null||!W(r.downloadTokens))return null;const o=r.downloadTokens;if(o.length===0)return null;const i=encodeURIComponent;return o.split(",").map(u=>{const d=e.bucket,p=e.fullPath,_="/b/"+i(d)+"/o/"+i(p),b=K(_,n,s),w=de({alt:"media",token:u});return b+w})[0]}function Ot(e,t){const n={},s=t.length;for(let r=0;r<s;r++){const o=t[r];o.writable&&(n[o.server]=e[o.local])}return JSON.stringify(n)}class be{constructor(t,n,s,r){this.url=t,this.method=n,this.handler=s,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
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
 */function ye(e){if(!e)throw z()}function It(e,t){function n(s,r){const o=Re(e,r,t);return ye(o!==null),o}return n}function Dt(e,t){function n(s,r){const o=Re(e,r,t);return ye(o!==null),Ut(o,r,e.host,e._protocol)}return n}function Te(e){function t(n,s){let r;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?r=je():r=$e():n.getStatus()===402?r=He(e.bucket):n.getStatus()===403?r=Ve(e.path):r=s,r.status=n.getStatus(),r.serverResponse=s.serverResponse,r}return t}function Nt(e){const t=Te(e);function n(s,r){let o=t(s,r);return s.getStatus()===404&&(o=Me(e.path)),o.serverResponse=r.serverResponse,o}return n}function St(e,t,n){const s=t.fullServerUrl(),r=K(s,e.host,e._protocol),o="GET",i=e.maxOperationRetryTime,a=new be(r,o,Dt(e,n),i);return a.errorHandler=Nt(t),a}function vt(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}function Ct(e,t,n){const s=Object.assign({},n);return s.fullPath=e.path,s.size=t.size(),s.contentType||(s.contentType=vt(null,t)),s}function xt(e,t,n,s,r){const o=t.bucketOnlyServerUrl(),i={"X-Goog-Upload-Protocol":"multipart"};function a(){let y="";for(let m=0;m<2;m++)y=y+Math.random().toString().slice(2);return y}const c=a();i["Content-Type"]="multipart/related; boundary="+c;const u=Ct(t,s,r),d=Ot(u,n),p="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+d+`\r
--`+c+`\r
Content-Type: `+u.contentType+`\r
\r
`,_=`\r
--`+c+"--",b=k.getBlob(p,s,_);if(b===null)throw Ge();const w={name:u.fullPath},E=K(o,e.host,e._protocol),g="POST",D=e.maxUploadRetryTime,U=new be(E,g,It(e,n),D);return U.urlParams=w,U.headers=i,U.body=b.uploadData(),U.errorHandler=Te(t),U}class Pt{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=O.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=O.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=O.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,n,s,r,o){if(this.sent_)throw N("cannot .send() more than once");if(re(t)&&s&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(n,t,!0),o!==void 0)for(const i in o)o.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,o[i].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw N("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw N("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw N("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw N("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",t)}}class Lt extends Pt{initXhr(){this.xhr_.responseType="text"}}function Ee(){return new Lt}/**
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
 */class I{constructor(t,n){this._service=t,n instanceof R?this._location=n:this._location=R.makeFromUrl(n,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,n){return new I(t,n)}get root(){const t=new R(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return me(this._location.path)}get storage(){return this._service}get parent(){const t=bt(this._location.path);if(t===null)return null;const n=new R(this._location.bucket,t);return new I(this._service,n)}_throwIfRoot(t){if(this._location.path==="")throw Je(t)}}function Bt(e,t,n){e._throwIfRoot("uploadBytes");const s=xt(e.storage,e._location,we(),new k(t,!0),n);return e.storage.makeRequestWithTokens(s,Ee).then(r=>({metadata:r,ref:e}))}function Ft(e){e._throwIfRoot("getDownloadURL");const t=St(e.storage,e._location,we());return e.storage.makeRequestWithTokens(t,Ee).then(n=>{if(n===null)throw Ye();return n})}function Mt(e,t){const n=yt(e._location.path,t),s=new R(e._location.bucket,n);return new I(e.storage,s)}/**
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
 */function Ht(e){return/^[A-Za-z]+:\/\//.test(e)}function $t(e,t){return new I(e,t)}function ke(e,t){if(e instanceof G){const n=e;if(n._bucket==null)throw Ke();const s=new I(n,n._bucket);return t!=null?ke(s,t):s}else return t!==void 0?Mt(e,t):e}function jt(e,t){if(t&&Ht(t)){if(e instanceof G)return $t(e,t);throw $("To use ref(service, url), the first argument must be a Storage instance.")}else return ke(e,t)}function ee(e,t){const n=t==null?void 0:t[le];return n==null?null:R.makeFromBucketSpec(n,e)}function Vt(e,t,n,s={}){e.host=`${t}:${n}`;const r=re(t);r&&(Pe(`https://${e.host}`),se("Storage",!0)),e._isUsingEmulator=!0,e._protocol=r?"https":"http";const{mockUserToken:o}=s;o&&(e._overrideAuthToken=typeof o=="string"?o:Le(o,e.app.options.projectId))}class G{constructor(t,n,s,r,o,i=!1){this.app=t,this._authProvider=n,this._appCheckProvider=s,this._url=r,this._firebaseVersion=o,this._isUsingEmulator=i,this._bucket=null,this._host=ue,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Be,this._maxUploadRetryTime=Fe,this._requests=new Set,r!=null?this._bucket=R.makeFromBucketSpec(r,this._host):this._bucket=ee(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=R.makeFromBucketSpec(this._url,t):this._bucket=ee(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){Q("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){Q("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const n=await t.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){if(Ne(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new I(this,t)}_makeRequest(t,n,s,r,o=!0){if(this._deleted)return new Qe(he());{const i=lt(t,this._appId,s,r,n,this._firebaseVersion,o,this._isUsingEmulator);return this._requests.add(i),i.getPromise().then(()=>this._requests.delete(i),()=>this._requests.delete(i)),i}}async makeRequestWithTokens(t,n){const[s,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,n,s,r).getPromise()}}const te="@firebase/storage",ne="0.13.10";/**
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
 */const Ae="storage";function qt(e,t,n){return e=L(e),Bt(e,t,n)}function zt(e){return e=L(e),Ft(e)}function Wt(e,t){return e=L(e),jt(e,t)}function Xt(e=ve(),t){e=L(e),se("Storage",!1);const s=Ce(e,Ae).getImmediate({identifier:t}),r=xe("storage");return r&&Kt(s,...r),s}function Kt(e,t,n,s={}){Vt(e,t,n,s)}function Gt(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return new G(n,s,r,t,De)}function Yt(){Oe(new Ie(Ae,Gt,"PUBLIC").setMultipleInstances(!0)),Y(te,ne,""),Y(te,ne,"esm2017")}Yt();const Jt=async(e,t)=>{try{const n={...t,type:"reflection",createdAt:new Date().toISOString()},s=v(A,"users",e.uid,"sessions"),r=await q(s,n),o=j(A,"users",e.uid,"private","summary"),i=await V(o);return i.exists()&&await ce(o,{latest_reflection_timestamp:t.timestamp,reflection_count:(i.data().reflection_count||0)+1,updatedAt:new Date().toISOString()}),{success:!0,id:r.id}}catch(n){return console.error("Error creating reflection:",n),{success:!1,error:n}}},Qt=async(e,t)=>{try{const n=Xt(),s=`${e.uid}/audio/${Date.now()}.webm`,r=Wt(n,s);return await qt(r,t),{success:!0,url:await zt(r)}}catch(n){return console.error("Error uploading audio:",n),{success:!1,error:n}}},en=async e=>{try{const t=["optimistic","calm","frustrated","anxious","confident","neutral"],n=t[Math.floor(Math.random()*t.length)],s=parseFloat((.7+Math.random()*.3).toFixed(2));return await new Promise(r=>setTimeout(r,1e3)),{success:!0,tone:n,confidence:s}}catch(t){return console.error("Error analyzing voice tone:",t),{success:!1,error:t}}},tn=async(e,t)=>{try{const n={...t,type:"balcony",createdAt:new Date().toISOString()},s=v(A,"users",e.uid,"sessions");return{success:!0,id:(await q(s,n)).id}}catch(n){return console.error("Error creating balcony experiment:",n),{success:!1,error:n}}},nn=async(e,t)=>{try{const n={...t,type:"hrv_session",createdAt:new Date().toISOString()},s=v(A,"users",e.uid,"sessions"),r=await q(s,n),o=j(A,"users",e.uid,"private","summary"),i=await V(o);if(i.exists()){const a=new Date;a.setDate(a.getDate()-7);const c=oe(v(A,"users",e.uid,"sessions"),Z("type","==","hrv_session"),Z("timestamp",">=",a.toISOString()),ie("timestamp","desc")),u=await ae(c);let d=t.avg_rmssd,p=1;u.forEach(b=>{const w=b.data();w.avg_rmssd&&(d+=w.avg_rmssd,p++)});const _=d/p;await ce(o,{latest_vibe_score:t.vibe_score,avg_rmssd_7d:_,hrv_session_count:(i.data().hrv_session_count||0)+1,updatedAt:new Date().toISOString()})}return{success:!0,id:r.id}}catch(n){return console.error("Error creating HRV session:",n),{success:!1,error:n}}},sn=async(e,t)=>{try{const n=j(A,"users",e.uid,"sessions",t),s=await V(n);return s.exists()&&s.data().type==="reflection"?{success:!0,reflection:s.data()}:{success:!1,error:"Reflection not found"}}catch(n){return console.error("Error getting reflection:",n),{success:!1,error:n}}},rn=async(e,t=10)=>{try{const n=oe(v(A,"users",e.uid,"sessions"),ie("timestamp","desc"),t(t)),s=await ae(n),r=[];return s.forEach(o=>{const i=o.data();r.push(i)}),{success:!0,sessions:r}}catch(n){return console.error("Error getting recent sessions:",n),{success:!1,error:n}}};export{rn as a,Jt as b,tn as c,en as d,nn as e,sn as g,Qt as u};
