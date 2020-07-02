!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.PluginApi=n():e.PluginApi=n()}(window,(function(){return function(e){var n={};function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:i})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(i,r,function(n){return e[n]}.bind(null,r));return i},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";t.r(n),t.d(n,"isInIframe",(function(){return s})),t.d(n,"addListener",(function(){return _})),t.d(n,"getCurrentUser",(function(){return v})),t.d(n,"sendNotifi",(function(){return p})),t.d(n,"openDevicePage",(function(){return m})),t.d(n,"sendCommand",(function(){return g})),t.d(n,"loadTextFile",(function(){return w})),t.d(n,"saveTextFile",(function(){return h})),t.d(n,"loadJSONFile",(function(){return y})),t.d(n,"saveJSONFile",(function(){return b})),t.d(n,"loadDevicesDefinitions",(function(){return D})),t.d(n,"saveDeviceDefinition",(function(){return S})),t.d(n,"saveDeviceDescription",(function(){return x})),t.d(n,"saveDeviceTileVariables",(function(){return P})),t.d(n,"saveDeviceCommands",(function(){return j})),t.d(n,"loadDevicesData",(function(){return k})),t.d(n,"loadDeviceData",(function(){return T})),t.d(n,"updateCache",(function(){return C})),t.d(n,"saveSection",(function(){return O})),t.d(n,"addSection",(function(){return M})),t.d(n,"removeSection",(function(){return A})),t.d(n,"loadSection",(function(){return F})),t.d(n,"loadSections",(function(){return N})),t.d(n,"navigateTo",(function(){return B})),t.d(n,"addToMailing",(function(){return J})),t.d(n,"removeFromMailing",(function(){return L})),t.d(n,"getArchiveDeviceData",(function(){return U})),t.d(n,"identify",(function(){return E})),t.d(n,"getPosition",(function(){return q})),t.d(n,"loadSettings",(function(){return z})),t.d(n,"updateUrl",(function(){return I})),t.d(n,"updateTitle",(function(){return V})),t.d(n,"resizeWindow",(function(){return W})),t.d(n,"addButtonListener",(function(){return H})),t.d(n,"removeButtonListener",(function(){return K})),t.d(n,"registerButtons",(function(){return Q}));const i=window.location!==window.parent.location,r={},o={};let u,d,c;function s(){return i}function a(){return Math.random().toString(36).substring(2)}function l(e,n){if(i){const t=e+a(),i=new Promise((e,n)=>{o[t]={resolve:e,reject:n}});return function(e,n,t=""){window.parent.postMessage({type:"PluginApi",method:e,tag:t,data:n},"*")}(e,n,t),i}return Promise.reject(new Error("Plugin Api: Not in iframe"))}function f(e,n,t,i){e in r?r[e](t,i,n):function(e,n,t){e in o&&(n?o[e].reject(n):o[e].resolve(t),delete o[e])}(n,t,i)}function _(e,n){r[e]=n}function v(){return l("getCurrentUser")}function p(e){return l("notifi",e)}function m(e,{tab:n="info"}={}){return l("openDevicePage",{device_id:e,tab:n})}function g(e,n,t){return l("sendCommand",{dev_id:e,command:n,argument:t})}function w(e){return l("readFile",{filename:e})}function h(e,n,t=!1){return l("writeFile",{filename:e,is_overwrite:t,content:n})}async function y(e,n=JSON){const t=await w(e);return n.parse(t)}function b(e,n,t=!1){return h(e,JSON.stringify(n,null,4),t)}function D(){return l("getDevicesDefinitions")}function S(e,{title:n=e,section:t="unsorted",status_variable:i="",mnemo:r="",url:o="",bg_image:u="",plugins:d=[]}={}){return l("saveDeviceDefinitionAdvanced",{dev_id:e,title:n,section:t,status_variable:i,mnemo:r,url:o,bg_image:u,plugins:d})}function x(e,{system:n="",model:t="",location:i="",service:r="",description:o="",additional:u=""}={}){return l("saveDeviceDescription",{dev_id:e,system:n,model:t,location:i,service:r,description:o,additional:u})}function P(e,n){return l("saveDeviceTileVariables",{dev_id:e,variable_ids:n})}function j(e,n){return l("saveDeviceCommands",{dev_id:e,variable_ids:n})}function k(){return l("getDevicesData")}function T(e){return l("getDeviceData",{dev_id:e})}function C(e="",n=!1){return l("updateCache",{path:e,replace_history:n})}function O({id:e="",old_id:n="",title:t="",subtitle:i="",icon:r="",mnemo:o="",view:u="tiles_mnemo",linked_dev_id:d="",use_dev_state:c=!1,subtitle_prop:s="_service",is_uncollapsed:a=!0,is_mixed:f=!1,is_hidden_sidebar:_=!1,parents:v=["root"],children:p=[],sorting:m=[],slideshow:g=[],owners:w=[],slideshow_width:h=50}={}){return l("saveSection",{id:e,old_id:n,title:t,subtitle:i,icon:r,mnemo:o,view:u,linked_dev_id:d,use_dev_state:c,subtitle_prop:s,is_uncollapsed:a,is_mixed:f,is_hidden_sidebar:_,parents:v,children:p,sorting:m,slideshow:g,owners:w,slideshow_width:h})}function M({id:e="",title:n="",subtitle:t="",icon:i="",mnemo:r="",view:o="tiles_mnemo",linked_dev_id:u="",use_dev_state:d=!1,subtitle_prop:c="_service",is_uncollapsed:s=!0,is_mixed:a=!1,is_hidden_sidebar:f=!1,parents:_=["root"],children:v=[],sorting:p=[],slideshow:m=[],owners:g=[],slideshow_width:w=50}={}){return l("addSection",{id:e,title:n,subtitle:t,icon:i,mnemo:r,view:o,linked_dev_id:u,use_dev_state:d,subtitle_prop:c,is_uncollapsed:s,is_mixed:a,is_hidden_sidebar:f,parents:_,children:v,sorting:p,slideshow:m,owners:g,slideshow_width:w})}function A(e){return l("removeSection",{id:e})}function F(e){return l("getSection",{id:e})}function N(){return l("getSections")}function B(e,{query:n={},replace_history:t=!1}={}){return l("navigateTo",{path:e,query:n,replace_history:t})}function J(e,n){return l("addToMailing",{mail_id:e,device_ids:n})}function L(e,n){return l("removeFromMailing",{mail_id:e,device_ids:n})}function U(e,n,t,i,{period:r=60}={}){return l("getArchiveDeviceData",{device_id:e,var_list:n,date_from:t,date_to:i,period:r})}async function E(){c||(c=l("identify"));const e=await c;u=e.identify_token,d=e.position}async function q(){return d||await E(),d}async function z(){return u||await E(),l("loadSettings",{identify_token:u})}async function I({path:e,device_id:n}){return u||await E(),l("updateUrl",{path:e,device_id:n,identify_token:u})}async function V({title:e,icon:n}){return u||await E(),l("updateTitle",{title:e,icon:n,identify_token:u})}async function W(e,n){return u||await E(),l("resizeWindow",{width:e,height:n,identify_token:u})}let G={};function H(e,n){G[e]=n}function K(e){delete G[e]}async function Q(e){u||await E(),G={};const n=[];return e.forEach(e=>{if("url"in e){const t={title:e.title,icon:e.icon,url:e.url};e.url_mode&&(t.url_mode=e.url_mode),n.push(t)}else if("onClick"in e){const t=a();H(t,e.onClick);const i={title:e.title,icon:e.icon,id:t};n.push(i)}else e.separator&&n.push({separator:!0})}),l("registerButtons",{buttons:n,identify_token:u})}_("buttonClicked",(e,{id:n})=>{n in G&&G[n]()}),window.addEventListener("message",e=>{"PluginApi"===e.data.type&&e.data.response&&f(e.data.method,e.data.tag,e.data.error,e.data.result)})}])}));