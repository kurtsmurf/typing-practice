var e=Object.defineProperty,t=Object.defineProperties,o=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,i=(t,o,n)=>o in t?e(t,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[o]=n,c=(e,t)=>{for(var o in t||(t={}))r.call(t,o)&&i(e,o,t[o]);if(n)for(var o of n(t))s.call(t,o)&&i(e,o,t[o]);return e},a=(e,n)=>t(e,o(n));"undefined"!=typeof require&&require;import{p as d,y as l,l as u,c as p,v as y,s as m,d as f,S as h}from"./vendor.fa22d384.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const E={text:"",mode:"PAUSED",position:0,keyOfDeath:void 0},v=(e,t)=>{switch(e.mode){case"LOST":switch(t.type){case"RESET":return E;default:return e}case"PAUSED":switch(t.type){case"RESUME":return a(c({},e),{mode:"PLAYING"});default:return e}case"PLAYING":switch(t.type){case"KEY_DOWN":return((e,t)=>{if("KEY_DOWN"!==t.type||!function(e){if(!(e.altKey||e.ctrlKey||e.metaKey))return e.keyCode>47&&e.keyCode<58||32==e.keyCode||e.keyCode>64&&e.keyCode<91||e.keyCode>95&&e.keyCode<112||e.keyCode>185&&e.keyCode<193||e.keyCode>218&&e.keyCode<223}(t.keyboardEvent))return e;const o=t.keyboardEvent.key===e.text[e.position],n=e.position===e.text.length-1;return a(c({},e),o&&n?{mode:"WON",position:e.position+1}:o?{position:e.position+1}:{mode:"LOST",keyOfDeath:t.keyboardEvent.key})})(e,t);case"PAUSE":return a(c({},e),{mode:"PAUSED"});default:return e}case"WON":switch(t.type){case"RESET":return E;default:return e}}},g=(e,t,o=[])=>{l((()=>(window.addEventListener(e,t),()=>window.removeEventListener(e,t))),o)},k=({text:e})=>{const[t,o]=(e=>(E.text=e,d(v,E)))(e),n=(()=>{const[e,t]=u(!0);return g("focus",(()=>{t(!0)})),g("blur",(()=>{t(!1)})),e})();return l((()=>{n||o({type:"PAUSE"})}),[n]),l((()=>{!0===window.matchMedia("(prefers-reduced-motion: reduce)").matches||"WON"!==t.mode||p()}),[t.mode]),l((()=>{const e=document.querySelector(".cursor");if(!e)return;const t=e.getBoundingClientRect();t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)||e.scrollIntoView({block:"center"})}),[t.position]),g("keydown",(e=>{" "===e.key&&e.preventDefault(),o({type:"KEY_DOWN",keyboardEvent:e})})),y("div",{"data-mode":t.mode},y(w,{state:t,dispatch:o}),y(A,{state:t}))},w=({state:e,dispatch:t})=>y("div",{style:"min-height: 1.5rem; position: sticky; top: 0; background-color: color-mix(in srgb, canvas 90%, transparent); z-index: 1;"},y("progress",{style:"width: 100%;",value:e.position/e.text.length}),"PAUSED"===e.mode&&y(x,{dispatch:t}),"LOST"===e.mode&&y(S,{state:e,dispatch:t}),"WON"===e.mode&&y(O,{dispatch:t}),"PLAYING"===e.mode&&y(b,{state:e})),b=({state:e})=>{const t=e.position/e.text.length,o=Math.round(100*t);return y("div",null,y("strong",null,o+"%"))},x=({dispatch:e})=>(g("keypress",(()=>e({type:"RESUME"}))),y("strong",null,"Press any key to continue.")),S=({state:e,dispatch:t})=>{var o;return y("div",null,y("strong",null,`You typed ${(null==(o=e.keyOfDeath)?void 0:o.trim())?`"${e.keyOfDeath}"`:"space"}.`)," ",y(C,{dispatch:t}))},O=({dispatch:e})=>y("div",null,y("strong",null,"You succeeded!")," ",y(C,{dispatch:e})),C=({dispatch:e})=>{const t=m(null);return l((()=>{var e;null==(e=t.current)||e.focus()}),[t.current]),y("button",{ref:t,onClick:()=>e({type:"RESET"})},"Reset")},A=({state:e})=>y("div",{className:"text"},e.text.split("").map(((t,o)=>y("span",{className:D(o<e.position&&"typed"," "===t&&"space",o===e.position&&"cursor")},t)))),D=(...e)=>e.filter((e=>!!e)).join(" ");function N(e,t){switch(e.mode){case"GAME":switch(t.type){case"EDIT":return a(c({},e),{mode:"EDIT"});default:return e}case"EDIT":switch(t.type){case"CANCEL":return a(c({},e),{mode:"GAME"});case"SAVE":{const o=t.text.trim().replaceAll(/[\s\r\n]+/g," ")||e.text;return o!==e.text&&(e=>{localStorage.setItem("text",e)})(o),a(c({},e),{mode:"GAME",text:o})}default:return e}default:return e}}const P={text:"Perfect practice makes perfect.",mode:"GAME"};function I(){const e=localStorage.getItem("text");return e&&(P.text=e),d(N,P)}const L=()=>{const[e,t]=I();return y("div",{className:"content"},"GAME"===e.mode&&y(T,{state:e,dispatch:t}),"EDIT"===e.mode&&y(W,{state:e,dispatch:t}))},T=({state:e,dispatch:t})=>y(f,null,y(k,{text:e.text}),y(M,{dispatch:t})),M=({dispatch:e})=>y("div",null,y("button",{onClick:()=>e({type:"EDIT"})},"Edit")),W=({state:e,dispatch:t})=>{const[o,n]=u(e.text);return y(f,null,y(j,{text:o,onChange:e=>n(e.target.value)}),y(G,{cancel:()=>t({type:"CANCEL"}),save:()=>{const e=new Set(" zxcvbnm,./asdfghjkl;'qwertyuiop[]\\`1234567890-=ZXCVBNM<>?ASDFGHJKL:\"QWERTYUIOP{}~!@#$%^&*()_+\n\t\rs");let n="",r=new Set;for(const t of o.split(""))e.has(t)?n+=t:r.add(t);if(n!==o){let e="";for(const t of r)e+=t;if(!window.confirm(`All occurences of the following character(s) will be removed: ${e}`))return;t({type:"SAVE",text:n})}t({type:"SAVE",text:n})}}))},j=({text:e,onChange:t})=>{const o=m(null);return l((()=>{var e;null==(e=o.current)||e.focus()}),[o.current]),y("textarea",{id:"editor",ref:o,onInput:t,value:e})},G=({cancel:e,save:t})=>y("div",{class:"row"},y("button",{onClick:e},"Cancel"),y("button",{onClick:t},"Save"));h(y(L,null),document.getElementById("app"));
