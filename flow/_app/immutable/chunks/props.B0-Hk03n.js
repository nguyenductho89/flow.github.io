import{V as S,W as X,X as Q,Y as g,Z as k,_ as w,$ as x,a0 as o,g as p,z as j,a1 as ee,a2 as re,k as ne,a3 as ie,h as C,a as ae,a4 as se,a5 as te,a6 as fe,J as ue,I as Y,a7 as B,S as M,a8 as U,K as le,a9 as ce,aa as de,d as q,C as _e,ab as ve,ac as oe,ad as J,ae as he,af as Z,ag as m,ah as W,ai as be,aj as pe,x as $,ak as Pe,j as ge,al as we,am as ye,i as z,an as Re,ao as Ee,ap as Ie}from"./runtime.P0pzQaGx.js";function I(e,r=null,f){if(typeof e!="object"||e===null||S in e)return e;const t=re(e);if(t!==X&&t!==Q)return e;var i=new Map,l=ne(e),h=g(0);l&&i.set("length",g(e.length));var P;return new Proxy(e,{defineProperty(c,n,a){(!("value"in a)||a.configurable===!1||a.enumerable===!1||a.writable===!1)&&k();var u=i.get(n);return u===void 0?(u=g(a.value),i.set(n,u)):w(u,I(a.value,P)),!0},deleteProperty(c,n){var a=i.get(n);if(a===void 0)n in c&&i.set(n,g(o));else{if(l&&typeof n=="string"){var u=i.get("length"),s=Number(n);Number.isInteger(s)&&s<u.v&&w(u,s)}w(a,o),G(h)}return!0},get(c,n,a){var v;if(n===S)return e;var u=i.get(n),s=n in c;if(u===void 0&&(!s||(v=x(c,n))!=null&&v.writable)&&(u=g(I(s?c[n]:o,P)),i.set(n,u)),u!==void 0){var d=p(u);return d===o?void 0:d}return Reflect.get(c,n,a)},getOwnPropertyDescriptor(c,n){var a=Reflect.getOwnPropertyDescriptor(c,n);if(a&&"value"in a){var u=i.get(n);u&&(a.value=p(u))}else if(a===void 0){var s=i.get(n),d=s==null?void 0:s.v;if(s!==void 0&&d!==o)return{enumerable:!0,configurable:!0,value:d,writable:!0}}return a},has(c,n){var d;if(n===S)return!0;var a=i.get(n),u=a!==void 0&&a.v!==o||Reflect.has(c,n);if(a!==void 0||j!==null&&(!u||(d=x(c,n))!=null&&d.writable)){a===void 0&&(a=g(u?I(c[n],P):o),i.set(n,a));var s=p(a);if(s===o)return!1}return u},set(c,n,a,u){var R;var s=i.get(n),d=n in c;if(l&&n==="length")for(var v=a;v<s.v;v+=1){var y=i.get(v+"");y!==void 0?w(y,o):v in c&&(y=g(o),i.set(v+"",y))}s===void 0?(!d||(R=x(c,n))!=null&&R.writable)&&(s=g(void 0),w(s,I(a,P)),i.set(n,s)):(d=s.v!==o,w(s,I(a,P)));var b=Reflect.getOwnPropertyDescriptor(c,n);if(b!=null&&b.set&&b.set.call(u,a),!d){if(l&&typeof n=="string"){var O=i.get("length"),T=Number(n);Number.isInteger(T)&&T>=O.v&&w(O,T+1)}G(h)}return!0},ownKeys(c){p(h);var n=Reflect.ownKeys(c).filter(s=>{var d=i.get(s);return d===void 0||d.v!==o});for(var[a,u]of i)u.v!==o&&!(a in c)&&n.push(a);return n},setPrototypeOf(){ee()}})}function G(e,r=1){w(e,e.v+r)}function me(e,r,f=!1){C&&ae();var t=e,i=null,l=null,h=o,P=f?se:0,c=!1;const n=(u,s=!0)=>{c=!0,a(s,u)},a=(u,s)=>{if(h===(h=u))return;let d=!1;if(C){const v=t.data===te;!!h===v&&(t=fe(),ue(t),Y(!1),d=!0)}h?(i?B(i):s&&(i=M(()=>s(t))),l&&U(l,()=>{l=null})):(l?B(l):s&&(l=M(()=>s(t))),i&&U(i,()=>{i=null})),d&&Y(!0)};ie(()=>{c=!1,r(n),c||a(null,null)},P),C&&(t=le)}function H(e,r){return e===r||(e==null?void 0:e[S])===r}function Ne(e={},r,f,t){return ce(()=>{var i,l;return de(()=>{i=l,l=[],q(()=>{e!==f(...l)&&(r(e,...l),i&&H(f(...i),e)&&r(null,...i))})}),()=>{_e(()=>{l&&H(f(...l),e)&&r(null,...l)})}}),e}let N=!1;function Se(e){var r=N;try{return N=!1,[e(),N]}finally{N=r}}const xe={get(e,r){if(!e.exclude.includes(r))return p(e.version),r in e.special?e.special[r]():e.props[r]},set(e,r,f){return r in e.special||(e.special[r]=Te({get[r](){return e.props[r]}},r,J)),e.special[r](f),Z(e.version),!0},getOwnPropertyDescriptor(e,r){if(!e.exclude.includes(r)&&r in e.props)return{enumerable:!0,configurable:!0,value:e.props[r]}},deleteProperty(e,r){return e.exclude.includes(r)||(e.exclude.push(r),Z(e.version)),!0},has(e,r){return e.exclude.includes(r)?!1:r in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(r=>!e.exclude.includes(r))}};function De(e,r){return new Proxy({props:e,exclude:r,special:{},version:g(0)},xe)}const Oe={get(e,r){let f=e.props.length;for(;f--;){let t=e.props[f];if(m(t)&&(t=t()),typeof t=="object"&&t!==null&&r in t)return t[r]}},set(e,r,f){let t=e.props.length;for(;t--;){let i=e.props[t];m(i)&&(i=i());const l=x(i,r);if(l&&l.set)return l.set(f),!0}return!1},getOwnPropertyDescriptor(e,r){let f=e.props.length;for(;f--;){let t=e.props[f];if(m(t)&&(t=t()),typeof t=="object"&&t!==null&&r in t){const i=x(t,r);return i&&!i.configurable&&(i.configurable=!0),i}}},has(e,r){if(r===S||r===W)return!1;for(let f of e.props)if(m(f)&&(f=f()),f!=null&&r in f)return!0;return!1},ownKeys(e){const r=[];for(let f of e.props){m(f)&&(f=f());for(const t in f)r.includes(t)||r.push(t)}return r}};function Le(...e){return new Proxy({props:e},Oe)}function V(e){for(var r=j,f=j;r!==null&&!(r.f&(be|pe));)r=r.parent;try{return $(r),e()}finally{$(f)}}function Te(e,r,f,t){var K;var i=(f&Pe)!==0,l=!ge||(f&we)!==0,h=(f&ye)!==0,P=(f&Ee)!==0,c=!1,n;h?[n,c]=Se(()=>e[r]):n=e[r];var a=S in e||W in e,u=h&&(((K=x(e,r))==null?void 0:K.set)??(a&&r in e&&(_=>e[r]=_)))||void 0,s=t,d=!0,v=!1,y=()=>(v=!0,d&&(d=!1,P?s=q(t):s=t),s);n===void 0&&t!==void 0&&(u&&l&&ve(),n=y(),u&&u(n));var b;if(l)b=()=>{var _=e[r];return _===void 0?y():(d=!0,v=!1,_)};else{var O=V(()=>(i?z:Re)(()=>e[r]));O.f|=oe,b=()=>{var _=p(O);return _!==void 0&&(s=void 0),_===void 0?s:_}}if(!(f&J))return b;if(u){var T=e.$$legacy;return function(_,E){return arguments.length>0?((!l||!E||T||c)&&u(E?b():_),_):b()}}var R=!1,F=!1,D=Ie(n),A=V(()=>z(()=>{var _=b(),E=p(D);return R?(R=!1,F=!0,E):(F=!1,D.v=_)}));return i||(A.equals=he),function(_,E){if(arguments.length>0){const L=E?p(A):l&&h?I(_):_;return A.equals(L)||(R=!0,w(D,L),v&&s!==void 0&&(s=L),q(()=>p(A))),_}return p(A)}}export{I as a,Ne as b,me as i,De as l,Te as p,Le as s};
