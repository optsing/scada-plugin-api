!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.PluginApi=n():e.PluginApi=n()}(window,(function(){return function(e){var n={};function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:i})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(i,r,function(n){return e[n]}.bind(null,r));return i},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";t.r(n),t.d(n,"isInIframe",(function(){return o})),t.d(n,"addListener",(function(){return s})),t.d(n,"getCurrentUser",(function(){return c})),t.d(n,"sendNotifi",(function(){return a})),t.d(n,"sendCommand",(function(){return l})),t.d(n,"loadTextFile",(function(){return f})),t.d(n,"saveTextFile",(function(){return _})),t.d(n,"loadJSONFile",(function(){return p})),t.d(n,"saveJSONFile",(function(){return v})),t.d(n,"loadDevicesDefinitions",(function(){return m})),t.d(n,"saveDeviceDefinition",(function(){return g})),t.d(n,"saveDeviceDescription",(function(){return w})),t.d(n,"loadDevicesData",(function(){return b})),t.d(n,"loadDeviceData",(function(){return h})),t.d(n,"updateCache",(function(){return y})),t.d(n,"saveSection",(function(){return S})),t.d(n,"addSection",(function(){return D})),t.d(n,"removeSection",(function(){return x})),t.d(n,"loadSections",(function(){return j})),t.d(n,"navigateTo",(function(){return O})),t.d(n,"addToMailing",(function(){return M})),t.d(n,"removeFromMailing",(function(){return P})),t.d(n,"loadSettings",(function(){return F}));const i={},r=[];function o(){return window.location!==window.parent.location}function u(e,n,t=""){if(o()){const i=new Promise((n,i)=>{r.push({event_type:e,tag:t,resolve:n,reject:i})});return function(e,n,t=""){window.parent.postMessage({type:e,tag:t,data:n},"*")}(e,n,t),i}return Promise.reject(new Error("not in iframe"))}function d(e,n,t,o){e in i?i[e](t,o,n):function(e,n,t,i){const o=r.findIndex(t=>t.event_type===e&&t.tag===n);o>-1&&(t?r[o].reject(t):r[o].resolve(i),r.splice(o,1))}(e,n,t,o)}function s(e,n){i[e]=n}function c(){return u("getCurrentUser")}function a(e){return u("notifi",e)}function l(e,n,t){return u("sendCommand",{dev_id:e,command:n,argument:t},e+n+t)}function f(e){return u("readFile",{filename:e},e)}function _(e,n,t=!1){return u("writeFile",{filename:e,is_overwrite:t,content:n},e)}async function p(e,n=JSON){const t=await f(e);return n.parse(t)}function v(e,n,t=!1){return _(e,JSON.stringify(n,null,4),t)}function m(){return u("getDevicesDefinitions")}function g(e,{title:n=e,section:t="unsorted",status_variable:i="",mnemo:r="",url:o="",bg_image:d="",plugins:s=[]}={}){return u("saveDeviceDefinitionAdvanced",{dev_id:e,title:n,section:t,status_variable:i,mnemo:r,url:o,bg_image:d,plugins:s},e)}function w(e,{system:n="",model:t="",location:i="",service:r="",description:o="",additional:d=""}){return u("saveDeviceDescription",{dev_id:e,system:n,model:t,location:i,service:r,description:o,additional:d},e)}function b(){return u("getDevicesData")}function h(e){return u("getDeviceData",{dev_id:e})}function y(e="",n=!1){return u("updateCache",{path:e,replace_history:n})}function S({id:e="",old_id:n="",title:t="",subtitle:i="",icon:r="",mnemo:o="",view:d="tiles_mnemo",linked_dev_id:s="",use_dev_state:c=!1,subtitle_prop:a="_service",is_uncollapsed:l=!0,is_mixed:f=!1,is_hidden_sidebar:_=!1,parents:p=["root"],children:v=[],sorting:m=[],slideshow:g=[],owners:w=[],slideshow_width:b=50}={}){return u("saveSection",{id:e,old_id:n,title:t,subtitle:i,icon:r,mnemo:o,view:d,linked_dev_id:s,use_dev_state:c,subtitle_prop:a,is_uncollapsed:l,is_mixed:f,is_hidden_sidebar:_,parents:p,children:v,sorting:m,slideshow:g,owners:w,slideshow_width:b},e)}function D({id:e="",title:n="",subtitle:t="",icon:i="",mnemo:r="",view:o="tiles_mnemo",linked_dev_id:d="",use_dev_state:s=!1,subtitle_prop:c="_service",is_uncollapsed:a=!0,is_mixed:l=!1,is_hidden_sidebar:f=!1,parents:_=["root"],children:p=[],sorting:v=[],slideshow:m=[],owners:g=[],slideshow_width:w=50}={}){return u("addSection",{id:e,title:n,subtitle:t,icon:i,mnemo:r,view:o,linked_dev_id:d,use_dev_state:s,subtitle_prop:c,is_uncollapsed:a,is_mixed:l,is_hidden_sidebar:f,parents:_,children:p,sorting:v,slideshow:m,owners:g,slideshow_width:w},e)}function x(e){return u("removeSection",{id:e},e)}function j(){return u("getSections")}function O(e,{query:n={},replace_history:t=!1}={}){return u("navigateTo",{path:e,query:n,replace_history:t},e)}function M(e,n){return u("addToMailing",{mail_id:e,device_ids:n},e.toString())}function P(e,n){return u("removeFromMailing",{mail_id:e,device_ids:n},e.toString())}function F(e){return u("loadSettings",{plugin_id:e},e)}window.addEventListener("message",e=>{d(e.data.type,e.data.tag,e.data.error,e.data.result)})}])}));