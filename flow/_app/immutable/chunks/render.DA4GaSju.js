import{w as E,x as m,y as I,z as R,A as B,B as H,k as P,C as j,D as S,E as x,H as Y,F as q,G as T,I as w,J as D,a as z,K as v,L as G,M as $,N as F,O as J,P as K,Q,R as U,S as X,p as Z,h as L,o as ee,c as te}from"./runtime.P0pzQaGx.js";import{b as re}from"./disclose-version.B-6A6jlx.js";function _e(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const ae=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function he(e){return ae.includes(e)}const ne={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject"};function pe(e){return e=e.toLowerCase(),ne[e]??e}const oe=["touchstart","touchmove"];function se(e){return oe.includes(e)}const ie=["textarea","script","style","title"];function ve(e){return ie.includes(e)}function ue(e){var t=I,a=R;E(null),m(null);try{return e()}finally{E(t),m(a)}}const M=new Set,k=new Set;function ce(e,t,a,i){function o(r){if(i.capture||y.call(t,r),!r.cancelBubble)return ue(()=>a.call(this,r))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?j(()=>{t.addEventListener(e,o,i)}):t.addEventListener(e,o,i),o}function ye(e,t,a,i,o){var r={capture:i,passive:o},u=ce(e,t,a,r);(t===document.body||t===window||t===document)&&B(()=>{t.removeEventListener(e,u,r)})}function ge(e){for(var t=0;t<e.length;t++)M.add(e[t]);for(var a of k)a(e)}function y(e){var O;var t=this,a=t.ownerDocument,i=e.type,o=((O=e.composedPath)==null?void 0:O.call(e))||[],r=o[0]||e.target,u=0,_=e.__root;if(_){var d=o.indexOf(_);if(d!==-1&&(t===document||t===window)){e.__root=t;return}var h=o.indexOf(t);if(h===-1)return;d<=h&&(u=d)}if(r=o[u]||e.target,r!==t){H(e,"currentTarget",{configurable:!0,get(){return r||a}});var b=I,c=R;E(null),m(null);try{for(var n,s=[];r!==null;){var l=r.assignedSlot||r.parentNode||r.host||null;try{var f=r["__"+i];if(f!==void 0&&!r.disabled)if(P(f)){var[C,...W]=f;C.apply(r,[e,...W])}else f.call(r,e)}catch(g){n?s.push(g):n=g}if(e.cancelBubble||l===t||l===null)break;r=l}if(n){for(let g of s)queueMicrotask(()=>{throw g});throw n}}finally{e.__root=t,delete e.currentTarget,E(b),m(c)}}}let A=!0;function we(e){A=e}function Ee(e,t){var a=t==null?"":typeof t=="object"?t+"":t;a!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=a,e.nodeValue=a==null?"":a+"")}function le(e,t){return V(e,t)}function me(e,t){S(),t.intro=t.intro??!1;const a=t.target,i=L,o=v;try{for(var r=x(a);r&&(r.nodeType!==8||r.data!==Y);)r=q(r);if(!r)throw T;w(!0),D(r),z();const u=V(e,{...t,anchor:r});if(v===null||v.nodeType!==8||v.data!==G)throw $(),T;return w(!1),u}catch(u){if(u===T)return t.recover===!1&&F(),S(),J(a),w(!1),le(e,t);throw u}finally{w(i),D(o)}}const p=new Map;function V(e,{target:t,anchor:a,props:i={},events:o,context:r,intro:u=!0}){S();var _=new Set,d=c=>{for(var n=0;n<c.length;n++){var s=c[n];if(!_.has(s)){_.add(s);var l=se(s);t.addEventListener(s,y,{passive:l});var f=p.get(s);f===void 0?(document.addEventListener(s,y,{passive:l}),p.set(s,1)):p.set(s,f+1)}}};d(K(M)),k.add(d);var h=void 0,b=Q(()=>{var c=a??t.appendChild(U());return X(()=>{if(r){Z({});var n=te;n.c=r}o&&(i.$$events=o),L&&re(c,null),A=u,h=e(c,i)||{},A=!0,L&&(R.nodes_end=v),r&&ee()}),()=>{var l;for(var n of _){t.removeEventListener(n,y);var s=p.get(n);--s===0?(document.removeEventListener(n,y),p.delete(n)):p.set(n,s)}k.delete(d),c!==a&&((l=c.parentNode)==null||l.removeChild(c))}});return N.set(h,b),h}let N=new WeakMap;function be(e,t){const a=N.get(e);return a?(N.delete(e),a(t)):Promise.resolve()}export{we as a,_e as b,ce as c,ge as d,he as e,A as f,ye as g,me as h,ve as i,le as m,pe as n,Ee as s,be as u};