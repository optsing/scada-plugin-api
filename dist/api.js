!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.PluginApi=n():e.PluginApi=n()}(self,(function(){return function(){"use strict";var e={d:function(n,t){for(var i in t)e.o(t,i)&&!e.o(n,i)&&Object.defineProperty(n,i,{enumerable:!0,get:t[i]})},o:function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r:function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},n={};e.r(n),e.d(n,{isInIframe:function(){return d},addListener:function(){return f},getCurrentUser:function(){return _},sendNotifi:function(){return v},openDevicePage:function(){return p},sendCommand:function(){return m},loadTextFile:function(){return g},saveTextFile:function(){return h},loadJSONFile:function(){return w},saveJSONFile:function(){return y},loadDevicesDefinitions:function(){return b},saveDeviceDefinition:function(){return D},saveDeviceDescription:function(){return S},saveDeviceTileVariables:function(){return T},saveDeviceCommands:function(){return k},loadDevicesData:function(){return P},loadDeviceData:function(){return C},updateCache:function(){return j},saveSection:function(){return x},addSection:function(){return O},removeSection:function(){return F},loadSection:function(){return M},loadSections:function(){return A},navigateTo:function(){return N},navigateToSection:function(){return B},navigateToDevice:function(){return J},addToMailing:function(){return L},removeFromMailing:function(){return U},loadDeviceArchiveData:function(){return E},identify:function(){return q},getPosition:function(){return z},getToken:function(){return I},loadSettings:function(){return V},updateUrl:function(){return W},updateTitle:function(){return G},resizeWindow:function(){return H},addButtonListener:function(){return Q},removeButtonListener:function(){return R},registerButtons:function(){return X}});const t="PluginApi",i=window.location!==window.parent.location,r={},o={};let u,c,a;function d(){return i}function s(){return Math.random().toString(36).substring(2)}function l(e,n){if(i){const i=e+s(),r=new Promise(((e,n)=>{o[i]={resolve:e,reject:n}}));return function(e,n,i=""){window.parent.postMessage({type:t,method:e,tag:i,data:n},"*")}(e,n,i),r}return Promise.reject(new Error("Plugin Api: Not in iframe"))}function f(e,n){r[e]=n}function _(){return l("getCurrentUser")}function v(e){return l("notifi",e)}function p(e,{tab:n="info"}={}){return l("openDevicePage",{device_id:e,tab:n})}function m(e,n,t){return l("sendCommand",{dev_id:e,command:n,argument:t})}function g(e){return l("readFile",{filename:e})}function h(e,n,t=!1){return l("writeFile",{filename:e,is_overwrite:t,content:n})}async function w(e,n=JSON){const t=await g(e);return n.parse(t)}function y(e,n,t=!1){return h(e,JSON.stringify(n,null,4),t)}function b(e){return l("getDevicesDefinitions",{device_ids:e})}function D(e,{title:n=e,section:t="unsorted",status_variable:i="",mnemo:r="",url:o="",bg_image:u="",plugins:c=[]}={}){return l("saveDeviceDefinitionAdvanced",{dev_id:e,title:n,section:t,status_variable:i,mnemo:r,url:o,bg_image:u,plugins:c})}function S(e,{system:n="",model:t="",location:i="",service:r="",description:o="",additional:u=""}={}){return l("saveDeviceDescription",{dev_id:e,system:n,model:t,location:i,service:r,description:o,additional:u})}function T(e,n){return l("saveDeviceTileVariables",{dev_id:e,variable_ids:n})}function k(e,n){return l("saveDeviceCommands",{dev_id:e,variable_ids:n})}function P(){return l("getDevicesData")}function C(e){return l("getDeviceData",{dev_id:e})}function j(){return l("updateCache")}function x({id:e="",old_id:n="",title:t="",subtitle:i="",icon:r="",mnemo:o="",view:u="tiles_mnemo",linked_dev_id:c="",use_dev_state:a=!1,subtitle_prop:d="_service",is_uncollapsed:s=!0,is_mixed:f=!1,is_hidden_sidebar:_=!1,parents:v=["root"],children:p=[],sorting:m=[],slideshow:g=[],owners:h=[],slideshow_width:w=50}={}){return l("saveSection",{id:e,old_id:n,title:t,subtitle:i,icon:r,mnemo:o,view:u,linked_dev_id:c,use_dev_state:a,subtitle_prop:d,is_uncollapsed:s,is_mixed:f,is_hidden_sidebar:_,parents:v,children:p,sorting:m,slideshow:g,owners:h,slideshow_width:w})}function O({id:e="",title:n="",subtitle:t="",icon:i="",mnemo:r="",view:o="tiles_mnemo",linked_dev_id:u="",use_dev_state:c=!1,subtitle_prop:a="_service",is_uncollapsed:d=!0,is_mixed:s=!1,is_hidden_sidebar:f=!1,parents:_=["root"],children:v=[],sorting:p=[],slideshow:m=[],owners:g=[],slideshow_width:h=50}={}){return l("addSection",{id:e,title:n,subtitle:t,icon:i,mnemo:r,view:o,linked_dev_id:u,use_dev_state:c,subtitle_prop:a,is_uncollapsed:d,is_mixed:s,is_hidden_sidebar:f,parents:_,children:v,sorting:p,slideshow:m,owners:g,slideshow_width:h})}function F(e){return l("removeSection",{id:e})}function M(e){return l("getSection",{id:e})}function A(){return l("getSections")}function N(e,{query:n={},replace_history:t=!1,update_cache:i=!1}={}){return l("navigateTo",{path:e,query:n,replace_history:t,update_cache:i})}function B(e,{replace_history:n=!1,update_cache:t=!1}={}){return l("navigateToSection",{id:e,replace_history:n,update_cache:t})}function J(e,{show_device_page:n=!0,replace_history:t=!1,update_cache:i=!1}={}){return l("navigateToDevice",{id:e,show_device_page:n,replace_history:t,update_cache:i})}function L(e,n){return l("addToMailing",{mail_id:e,device_ids:n})}function U(e,n){return l("removeFromMailing",{mail_id:e,device_ids:n})}function E(e,n,t,i,{step:r=60}={}){return l("getDeviceArchiveData",{device_id:e,var_list:n,date_from:t,date_to:i,step:r})}async function q(){a||(a=l("identify"));const e=await a;u=e.identify_token,c=e.position}async function z(){return c||await q(),c}async function I(){return u||await q(),l("getToken",{identify_token:u})}async function V(){return u||await q(),l("loadSettings",{identify_token:u})}async function W({path:e,device_id:n}){return u||await q(),l("updateUrl",{path:e,device_id:n,identify_token:u})}async function G({title:e,icon:n}){return u||await q(),l("updateTitle",{title:e,icon:n,identify_token:u})}async function H(e,n,t=!1){return u||await q(),l("resizeWindow",{width:e,height:n,preserve_aspect_ratio:t,identify_token:u})}let K={};function Q(e,n){K[e]=n}function R(e){delete K[e]}async function X(e){u||await q(),K={};const n=[];return e.forEach((e=>{if("url"in e){const t={title:e.title,icon:e.icon,url:e.url};e.url_mode&&(t.url_mode=e.url_mode),n.push(t)}else if("onClick"in e){const t=s();Q(t,e.onClick);const i={title:e.title,icon:e.icon,id:t};n.push(i)}else e.separator&&n.push({separator:!0})})),l("registerButtons",{buttons:n,identify_token:u})}return f("buttonClicked",((e,{id:n})=>{n in K&&K[n]()})),window.addEventListener("message",(e=>{var n,i,u,c;e.data.type===t&&e.data.response&&(n=e.data.method,i=e.data.tag,u=e.data.error,c=e.data.result,n in r?r[n](u,c,i):function(e,n,t){e in o&&(n?o[e].reject(n):o[e].resolve(t),delete o[e])}(i,u,c))})),n}()}));