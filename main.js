const i=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,n=(e,t,i=null)=>{let n=t;for(;n!==i;){const t=n.nextSibling;e.removeChild(n),n=t}},s=`{{lit-${String(Math.random()).slice(2)}}}`,o=`\x3c!--${s}--\x3e`,r=new RegExp(`${s}|${o}`),a="$lit$";class Template{constructor(e,t){this.parts=[],this.element=t;let i=-1,n=0;const o=[],l=t=>{const d=t.content,c=document.createTreeWalker(d,133,null,!1);let m=0;for(;c.nextNode();){i++;const t=c.currentNode;if(1===t.nodeType){if(t.hasAttributes()){const o=t.attributes;let l=0;for(let e=0;e<o.length;e++)o[e].value.indexOf(s)>=0&&l++;for(;l-- >0;){const s=e.strings[n],o=p.exec(s)[2],l=o.toLowerCase()+a,d=t.getAttribute(l).split(r);this.parts.push({type:"attribute",index:i,name:o,strings:d}),t.removeAttribute(l),n+=d.length-1}}"TEMPLATE"===t.tagName&&l(t)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(s)>=0){const s=t.parentNode,a=e.split(r),l=a.length-1;for(let e=0;e<l;e++)s.insertBefore(""===a[e]?h():document.createTextNode(a[e]),t),this.parts.push({type:"node",index:++i});""===a[l]?(s.insertBefore(h(),t),o.push(t)):t.data=a[l],n+=l}}else if(8===t.nodeType)if(t.data===s){const e=t.parentNode;null!==t.previousSibling&&i!==m||(i++,e.insertBefore(h(),t)),m=i,this.parts.push({type:"node",index:i}),null===t.nextSibling?t.data="":(o.push(t),i--),n++}else{let e=-1;for(;-1!==(e=t.data.indexOf(s,e+1));)this.parts.push({type:"node",index:-1})}}};l(t);for(const e of o)e.parentNode.removeChild(e)}}const d=e=>-1!==e.index,h=()=>document.createComment(""),p=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/,g=133;function removeNodesFromTemplate(e,t){const{element:{content:i},parts:n}=e,s=document.createTreeWalker(i,g,null,!1);let o=w(n),r=n[o],a=-1,l=0;const d=[];let c=null;for(;s.nextNode();){a++;const e=s.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(d.push(e),null===c&&(c=e)),null!==c&&l++;void 0!==r&&r.index===a;)r.index=null!==c?-1:r.index-l,r=n[o=w(n,o)]}d.forEach(e=>e.parentNode.removeChild(e))}const f=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,g,null,!1);for(;i.nextNode();)t++;return t},w=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(d(t))return i}return-1},y=new WeakMap,b=e=>"function"==typeof e&&y.has(e),x={},S={};class TemplateInstance{constructor(e,t,i){this._parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this._parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this._parts)void 0!==e&&e.commit()}_clone(){const e=i?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=this.template.parts;let n=0,s=0;const o=e=>{const i=document.createTreeWalker(e,133,null,!1);let r=i.nextNode();for(;n<t.length&&null!==r;){const e=t[n];if(d(e))if(s===e.index){if("node"===e.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(r.previousSibling),this._parts.push(e)}else this._parts.push(...this.processor.handleAttributeExpressions(r,e.name,e.strings,this.options));n++}else s++,"TEMPLATE"===r.nodeName&&o(r.content),r=i.nextNode();else this._parts.push(void 0),n++}};return o(e),i&&(document.adoptNode(e),customElements.upgrade(e)),e}}class TemplateResult{constructor(e,t,i,n){this.strings=e,this.values=t,this.type=i,this.processor=n}getHTML(){const e=this.strings.length-1;let t="";for(let i=0;i<e;i++){const e=this.strings[i],n=p.exec(e);t+=n?e.substr(0,n.index)+n[1]+n[2]+a+n[3]+s:e+o}return t+this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}const E=e=>null===e||!("object"==typeof e||"function"==typeof e);class AttributeCommitter{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new AttributePart(this)}_getValue(){const e=this.strings,t=e.length-1;let i="";for(let n=0;n<t;n++){i+=e[n];const t=this.parts[n];if(void 0!==t){const e=t.value;if(null!=e&&(Array.isArray(e)||"string"!=typeof e&&e[Symbol.iterator]))for(const t of e)i+="string"==typeof t?t:String(t);else i+="string"==typeof e?e:String(e)}}return i+e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class AttributePart{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===x||E(e)&&e===this.value||(this.value=e,b(e)||(this.committer.dirty=!0))}commit(){for(;b(this.value);){const e=this.value;this.value=x,e(this)}this.value!==x&&this.committer.commit()}}class NodePart{constructor(e){this.value=void 0,this._pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(h()),this.endNode=e.appendChild(h())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e._insert(this.startNode=h()),e._insert(this.endNode=h())}insertAfterPart(e){e._insert(this.startNode=h()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this._pendingValue=e}commit(){for(;b(this._pendingValue);){const e=this._pendingValue;this._pendingValue=x,e(this)}const e=this._pendingValue;e!==x&&(E(e)?e!==this.value&&this._commitText(e):e instanceof TemplateResult?this._commitTemplateResult(e):e instanceof Node?this._commitNode(e):Array.isArray(e)||e[Symbol.iterator]?this._commitIterable(e):e===S?(this.value=S,this.clear()):this._commitText(e))}_insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}_commitNode(e){this.value!==e&&(this.clear(),this._insert(e),this.value=e)}_commitText(e){const t=this.startNode.nextSibling;e=null==e?"":e,t===this.endNode.previousSibling&&3===t.nodeType?t.data=e:this._commitNode(document.createTextNode("string"==typeof e?e:String(e))),this.value=e}_commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof TemplateInstance&&this.value.template===t)this.value.update(e.values);else{const i=new TemplateInstance(t,e.processor,this.options),n=i._clone();i.update(e.values),this._commitNode(n),this.value=i}}_commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,n=0;for(const s of e)void 0===(i=t[n])&&(i=new NodePart(this.options),t.push(i),0===n?i.appendIntoPart(this):i.insertAfterPart(t[n-1])),i.setValue(s),i.commit(),n++;n<t.length&&(t.length=n,this.clear(i&&i.endNode))}clear(e=this.startNode){n(this.startNode.parentNode,e.nextSibling,this.endNode)}}class BooleanAttributePart{constructor(e,t,i){if(this.value=void 0,this._pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this._pendingValue=e}commit(){for(;b(this._pendingValue);){const e=this._pendingValue;this._pendingValue=x,e(this)}if(this._pendingValue===x)return;const e=!!this._pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=e,this._pendingValue=x}}class PropertyCommitter extends AttributeCommitter{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new PropertyPart(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class PropertyPart extends AttributePart{}let _=!1;try{const e={get capture(){return _=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}class EventPart{constructor(e,t,i){this.value=void 0,this._pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this._boundHandleEvent=(e=>this.handleEvent(e))}setValue(e){this._pendingValue=e}commit(){for(;b(this._pendingValue);){const e=this._pendingValue;this._pendingValue=x,e(this)}if(this._pendingValue===x)return;const e=this._pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),n=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),n&&(this._options=C(e),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=e,this._pendingValue=x}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const C=e=>e&&(_?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function templateFactory(e){let t=T.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},T.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const n=e.strings.join(s);return void 0===(i=t.keyString.get(n))&&(i=new Template(e,e.getTemplateElement()),t.keyString.set(n,i)),t.stringsArray.set(e.strings,i),i}const T=new Map,N=new WeakMap,P=new class DefaultTemplateProcessor{handleAttributeExpressions(e,t,i,n){const s=t[0];return"."===s?new PropertyCommitter(e,t.slice(1),i).parts:"@"===s?[new EventPart(e,t.slice(1),n.eventContext)]:"?"===s?[new BooleanAttributePart(e,t.slice(1),i)]:new AttributeCommitter(e,t,i).parts}handleTextExpression(e){return new NodePart(e)}};(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const $=(e,...t)=>new TemplateResult(e,t,"html",P),M=(e,t)=>`${e}--${t}`;let V=!0;void 0===window.ShadyCSS?V=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),V=!1);const D=e=>t=>{const i=M(t.type,e);let n=T.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},T.set(i,n));let o=n.stringsArray.get(t.strings);if(void 0!==o)return o;const r=t.strings.join(s);if(void 0===(o=n.keyString.get(r))){const i=t.getTemplateElement();V&&window.ShadyCSS.prepareTemplateDom(i,e),o=new Template(t,i),n.keyString.set(r,o)}return n.stringsArray.set(t.strings,o),o},R=["html","svg"],j=new Set,Z=(e,t,i)=>{const s=i.scopeName,o=N.has(t),r=t instanceof ShadowRoot&&V&&e instanceof TemplateResult,a=r&&!j.has(s),l=a?document.createDocumentFragment():t;if(((e,t,i)=>{let s=N.get(t);void 0===s&&(n(t,t.firstChild),N.set(t,s=new NodePart(Object.assign({templateFactory:templateFactory},i))),s.appendInto(t)),s.setValue(e),s.commit()})(e,l,Object.assign({templateFactory:D(s)},i)),a){const e=N.get(l);N.delete(l),e.value instanceof TemplateInstance&&((e,t,i)=>{j.add(i);const n=e.querySelectorAll("style");if(0===n.length)return void window.ShadyCSS.prepareTemplateStyles(t.element,i);const s=document.createElement("style");for(let e=0;e<n.length;e++){const t=n[e];t.parentNode.removeChild(t),s.textContent+=t.textContent}if((e=>{R.forEach(t=>{const i=T.get(M(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),removeNodesFromTemplate(e,i)})})})(i),function insertNodeIntoTemplate(e,t,i=null){const{element:{content:n},parts:s}=e;if(null==i)return void n.appendChild(t);const o=document.createTreeWalker(n,g,null,!1);let r=w(s),a=0,l=-1;for(;o.nextNode();)for(l++,o.currentNode===i&&(a=f(t),i.parentNode.insertBefore(t,i));-1!==r&&s[r].index===l;){if(a>0){for(;-1!==r;)s[r].index+=a,r=w(s,r);return}r=w(s,r)}}(t,s,t.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(t.element,i),window.ShadyCSS.nativeShadow){const i=t.element.content.querySelector("style");e.insertBefore(i.cloneNode(!0),e.firstChild)}else{t.element.content.insertBefore(s,t.element.content.firstChild);const e=new Set;e.add(s),removeNodesFromTemplate(t,e)}})(l,e.value.template,s),n(t,t.firstChild),t.appendChild(l),N.set(t,e)}!o&&r&&window.ShadyCSS.styleElement(t.host)},F=Symbol("tag"),W=Symbol("needsRender"),U=e=>e.replace(/([a-z](?=[A-Z]))|([A-Z](?=[A-Z][a-z]))/g,"$1$2-").toLowerCase(),H=e=>{e.$={},e.renderRoot.querySelectorAll("[id]").forEach(t=>{e.$[t.id]=t})};class GluonElement extends HTMLElement{constructor(){super(),this.renderRoot=this.createRenderRoot(),Object.getOwnPropertyNames(this).forEach(e=>{const t=this[e];delete this[e],this[e]=t})}createRenderRoot(){return this.attachShadow({mode:"open"})}static get is(){return this.hasOwnProperty(F)&&this[F]||(this[F]=U(this.name))}connectedCallback(){"template"in this&&(this.render({sync:!0}),H(this))}async render({sync:e=!1}={}){this[W]=!0,e||await 0,this[W]&&(this[W]=!1,Z(this.template,this.renderRoot,{scopeName:this.constructor.is,eventContext:this}))}}let O=!1;const X=[],q=e=>{O||(window.addEventListener("hashchange",Y),window.addEventListener("location-changed",Y),window.addEventListener("popstate",Y),O=!0),X.push(e)},Y=()=>{X.forEach(e=>e(Q(),ee(),te()))},Q=()=>window.decodeURIComponent(window.location.pathname),ee=()=>window.location.search.slice(1),te=()=>window.decodeURIComponent(window.location.hash.slice(1));!function(){function l(e,t){document.addEventListener?e.addEventListener("scroll",t,!1):e.attachEvent("scroll",t)}function t(e){this.a=document.createElement("div"),this.a.setAttribute("aria-hidden","true"),this.a.appendChild(document.createTextNode(e)),this.b=document.createElement("span"),this.c=document.createElement("span"),this.h=document.createElement("span"),this.f=document.createElement("span"),this.g=-1,this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;",this.b.appendChild(this.h),this.c.appendChild(this.f),this.a.appendChild(this.b),this.a.appendChild(this.c)}function u(e,t){e.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+t+";"}function z(e){var t=e.a.offsetWidth,i=t+100;return e.f.style.width=i+"px",e.c.scrollLeft=i,e.b.scrollLeft=e.b.scrollWidth+100,e.g!==t&&(e.g=t,!0)}function A(e,t){function c(){var e=i;z(e)&&e.a.parentNode&&t(e.g)}var i=e;l(e.b,c),l(e.c,c),z(e)}function B(e,t){var i=t||{};this.family=e,this.style=i.style||"normal",this.weight=i.weight||"normal",this.stretch=i.stretch||"normal"}var i=null,n=null,s=null,o=null;function J(){return null===o&&(o=!!document.fonts),o}function K(){if(null===s){var e=document.createElement("div");try{e.style.font="condensed 100px sans-serif"}catch(e){}s=""!==e.style.font}return s}function L(e,t){return[e.style,e.weight,K()?e.stretch:"","100px",t].join(" ")}B.prototype.load=function(s,o){var r=this,a=s||"BESbswy",l=0,d=o||3e3,c=(new Date).getTime();return new Promise(function(e,s){if(J()&&!function G(){if(null===n)if(J()&&/Apple/.test(window.navigator.vendor)){var e=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);n=!!e&&603>parseInt(e[1],10)}else n=!1;return n}()){var o=new Promise(function(t,i){!function e(){(new Date).getTime()-c>=d?i(Error(d+"ms timeout exceeded")):document.fonts.load(L(r,'"'+r.family+'"'),a).then(function(i){1<=i.length?t():setTimeout(e,25)},i)}()}),h=new Promise(function(e,t){l=setTimeout(function(){t(Error(d+"ms timeout exceeded"))},d)});Promise.race([h,o]).then(function(){clearTimeout(l),e(r)},s)}else!function m(e){document.body?e():document.addEventListener?document.addEventListener("DOMContentLoaded",function c(){document.removeEventListener("DOMContentLoaded",c),e()}):document.attachEvent("onreadystatechange",function k(){"interactive"!=document.readyState&&"complete"!=document.readyState||(document.detachEvent("onreadystatechange",k),e())})}(function(){function v(){var t;(t=-1!=m&&-1!=p||-1!=m&&-1!=g||-1!=p&&-1!=g)&&((t=m!=p&&m!=g&&p!=g)||(null===i&&(t=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),i=!!t&&(536>parseInt(t[1],10)||536===parseInt(t[1],10)&&11>=parseInt(t[2],10))),t=i&&(m==f&&p==f&&g==f||m==w&&p==w&&g==w||m==y&&p==y&&g==y)),t=!t),t&&(b.parentNode&&b.parentNode.removeChild(b),clearTimeout(l),e(r))}var n=new t(a),o=new t(a),h=new t(a),m=-1,p=-1,g=-1,f=-1,w=-1,y=-1,b=document.createElement("div");b.dir="ltr",u(n,L(r,"sans-serif")),u(o,L(r,"serif")),u(h,L(r,"monospace")),b.appendChild(n.a),b.appendChild(o.a),b.appendChild(h.a),document.body.appendChild(b),f=n.a.offsetWidth,w=o.a.offsetWidth,y=h.a.offsetWidth,function I(){if((new Date).getTime()-c>=d)b.parentNode&&b.parentNode.removeChild(b),s(Error(d+"ms timeout exceeded"));else{var e=document.hidden;!0!==e&&void 0!==e||(m=n.a.offsetWidth,p=o.a.offsetWidth,g=h.a.offsetWidth,v()),l=setTimeout(I,50)}}(),A(n,function(e){m=e,v()}),u(n,L(r,'"'+r.family+'",sans-serif')),A(o,function(e){p=e,v()}),u(o,L(r,'"'+r.family+'",serif')),A(h,function(e){g=e,v()}),u(h,L(r,'"'+r.family+'",monospace'))})})},"object"==typeof module?module.exports=B:(window.FontFaceObserver=B,window.FontFaceObserver.prototype.load=B.prototype.load)}();const ie={};window.addEventListener("keydown",e=>{e.defaultPrevented?console.warn("Keypress ignored!"):ie[e.key]&&ie[e.key].every(t=>{if(null!==t.offsetParent)return e.stopPropagation(),t.click(),!t.override})},!0);class GluonKeybinding extends GluonElement{static get observedAttributes(){return["key","override"]}attributeChangedCallback(e,t,i){"key"===e?this.__register(i,t):"override"===e&&this.__override(this.key)}set key(e){e?this.setAttribute("key",e):this.removeAttribute("key")}get key(){return this.getAttribute("key")}set override(e){e?this.setAttribute("override",""):this.removeAttribute("override")}get override(){return""===this.getAttribute("override")}__register(e,t){if(t&&ie[t]){const e=ie[t].indexOf(this);-1!=e&&(ie[t].splice(e,1),0===ie[t].length&&delete ie[t])}e&&(ie[e]||(ie[e]=[]),this.override?ie[e].unshift(this):ie[e].push(this))}__override(e){if(e&&ie[e]){const t=ie[e].indexOf(this);-1!=t&&(ie[e].splice(t,1),ie[e].unshift(this))}}}customElements.define(GluonKeybinding.is,GluonKeybinding);const ne=document.createTextNode("\n  /* SLIDEM GLOBAL STYLES */\n  body {\n    margin: 0;\n  }\n\n  [reveal] {\n    opacity: 0;\n    transition: opacity 0.2s;\n  }\n\n  /* Keyframes are defined here to patch a scoping bug in Chrome */\n  @keyframes slidem-fade-in {\n    from {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n  }\n\n  @keyframes slidem-fade-out {\n    from {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n    }\n  }\n\n  @keyframes slidem-slide-in-forward {\n    from {\n      transform: translateX(100vw);\n    }\n    to {\n      transform: translateX(0);\n    }\n  }\n\n  @keyframes slidem-slide-in-backward {\n    from {\n      transform: translateX(0);\n    }\n    to {\n      transform: translateX(100vw);\n    }\n  }\n\n  @keyframes slidem-slide-out-forward {\n    from {\n      transform: translateX(0);\n    }\n    to {\n      transform: translateX(-100vw);\n    }\n  }\n\n  @keyframes slidem-slide-out-backward {\n    from {\n      transform: translateX(-100vw);\n    }\n    to {\n      transform: translateX(0);\n    }\n  }\n"),se=document.createElement("style");se.appendChild(ne),document.head.appendChild(se);class SlidemDeck extends GluonElement{get template(){return $`
      <div class="slides">
        <slot id="slides"></slot>
      </div>
      <div id="progress"></div>
      <div id="timer"></div>
      <gluon-keybinding id="timerToggle" key="t"></gluon-keybinding>
      <gluon-keybinding id="presenterToggle" key="p"></gluon-keybinding>
      <div id="forward">
        <gluon-keybinding key="PageDown"></gluon-keybinding>
        <gluon-keybinding key="ArrowRight"></gluon-keybinding>
        <gluon-keybinding key="Right"></gluon-keybinding>
        <slot name="forward"></slot>
      </div>
      <div id="backward">
        <gluon-keybinding key="PageUp"></gluon-keybinding>
        <gluon-keybinding key="ArrowLeft"></gluon-keybinding>
        <gluon-keybinding key="Left"></gluon-keybinding>
        <slot name="backward"></slot>
      </div>
      <style>
        @keyframes slidem-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slidem-fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes slidem-slide-in-forward {
          from {
            transform: translateX(100vw);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slidem-slide-in-backward {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100vw);
          }
        }

        @keyframes slidem-slide-out-forward {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100vw);
          }
        }

        @keyframes slidem-slide-out-backward {
          from {
            transform: translateX(-100vw);
          }
          to {
            transform: translateX(0);
          }
        }
        :host {
          display: block;
          overflow: hidden;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          font-family: 'sans-serif';
          font-size: 56px;
          line-height: 1;
        }

        .slides ::slotted(*) {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          animation-duration: 0.4s;
          animation-fill-mode: both;
          animation-timing-function: ease-in-out;
        }

        .slides ::slotted(:not([active]):not([previous]):not([next])) {
          display: none;
        }

        :host(:not([presenter])) .slides ::slotted([next]:not([previous])) {
          display: none;
        }

        #progress {
          position: absolute;
          bottom: 0px;
          left: 0;
          right: 0;
          height: 50px;
          text-align: center;
          display: flex;
          flex-flow: row;
          justify-content: center;
          z-index: 10;
        }
        #progress div {
          height: 8px;
          width: 8px;
          border-radius: 50%;
          border: 2px solid white;
          margin-left: 6px;
          margin-right: 6px;
          background: transparent;
          transition: background 0.2s, transform 0.2s;
        }
        #progress div.active {
          background: white;
          transform: scale(1.3);
        }
        :host([progress="dark"]) #progress div {
          border: 2px solid black;
        }
        :host([progress="dark"]) #progress div.active {
          background: black;
        }
        :host([progress="none"]) #progress {
          display: none;
        }

        #timer {
          display: none;
          position: absolute;
          top: 5%;
          right: 5%;
          color: white;
          font-size: 4vw;
          font-weight: bold;
          font-family: Helvetica, Arial, sans-serif;
        }
        :host([presenter]) #timer {
          display: inline;
        }

        :host([presenter]) {
          background: black;
        }
        /* White box around active slide */
        :host([presenter])::before {
          display: block;
          position: absolute;
          content: '';
          top: calc(25% - 20px);
          right:  calc(45% - 20px);
          bottom:  calc(25% - 20px);
          left:  calc(5% - 20px);
          border: 2px solid white;
        }
        /* White box around next slide */
        :host([presenter])::after {
          display: block;
          position: absolute;
          content: '';
          top: calc(32.5% - 20px);
          right: calc(4.5% - 20px);
          bottom: calc(32.5% - 20px);
          left: calc(60.5% - 20px);
          border: 2px solid white;
        }
        :host([presenter]) .slides ::slotted(*) {
          animation: none !important; /* Block user-configured animations */
        }
        :host([presenter]) .slides ::slotted([previous]:not([next])) {
          display: none;
        }
        :host([presenter]) .slides ::slotted([active]) {
          transform: translate(-20%, 0) scale(0.5) !important; /* Force presenter layout */
        }
        :host([presenter]) .slides ::slotted([next]) {
          transform: translate(28%, 0) scale(0.35) !important; /* Force presenter layout */
        }

        .slides ::slotted([active]) {
          z-index: 2;
        }
        .slides ::slotted([previous]) {
          z-index: 0;
        }
        .slides ::slotted([fade-in][active].animate-forward) {
          animation-name: slidem-fade-in;
        }
        .slides ::slotted([fade-in][previous].animate-backward) {
          animation-name: slidem-fade-out;
          z-index: 3;
        }
        .slides ::slotted([fade-out][active].animate-backward) {
          animation-name: slidem-fade-in;
        }
        .slides ::slotted([fade-out][previous].animate-forward) {
          animation-name: slidem-fade-out;
          z-index: 3;
        }
        .slides ::slotted([slide-in][active].animate-forward) {
          animation-name: slidem-slide-in-forward;
        }
        .slides ::slotted([slide-in][previous].animate-backward) {
          animation-name: slidem-slide-in-backward;
          z-index: 3;
        }
        .slides ::slotted([slide-out][active].animate-backward) {
          animation-name: slidem-slide-out-backward;
        }
        .slides ::slotted([slide-out][previous].animate-forward) {
          animation-name: slidem-slide-out-forward;
          z-index: 3;
        }
      </style>
    `}get presenter(){return null!==this.getAttribute("presenter")}set presenter(e){e?this.setAttribute("presenter",""):this.removeAttribute("presenter")}connectedCallback(){let e;super.connectedCallback(),this.presenter="presenter"===ee(),this.$.presenterToggle.addEventListener("click",()=>{this.presenter=!this.presenter,t({query:this.presenter?"presenter":"",hash:te()})}),this.$.timerToggle.addEventListener("click",()=>{if(e)clearInterval(e),e=void 0,this.$.timer.innerText="";else{this.$.timer.innerText="00:00";let t=new Date;e=setInterval(()=>this.$.timer.innerText=oe(t),1e3)}}),this.slides=Array.from(this.children).filter(e=>!e.hasAttribute("slot")),this.slides.forEach(()=>{this.$.progress.appendChild(document.createElement("div"))}),q(()=>{this.slides[this.currentSlide].step=this.currentStep+1,this.slides[this.currentSlide].setAttribute("active",""),this.previousSlide!==this.currentSlide&&(void 0!==this.previousSlide&&(this.previousSlide<this.currentSlide?(this.slides[this.previousSlide].classList.add("animate-forward"),this.slides[this.currentSlide].classList.add("animate-forward"),this.slides[this.previousSlide].classList.remove("animate-backward"),this.slides[this.currentSlide].classList.remove("animate-backward")):(this.slides[this.previousSlide].classList.add("animate-backward"),this.slides[this.currentSlide].classList.add("animate-backward"),this.slides[this.previousSlide].classList.remove("animate-forward"),this.slides[this.currentSlide].classList.remove("animate-forward"))),void 0!==this.oldNextSlide&&this.slides[this.oldNextSlide].removeAttribute("next"),this.nextSlide=this.slides[this.currentSlide+1]&&this.currentSlide+1||void 0,void 0!==this.nextSlide&&(this.slides[this.nextSlide].setAttribute("next",""),this.oldNextSlide=this.nextSlide),void 0!==this.oldPreviousSlide&&this.slides[this.oldPreviousSlide].removeAttribute("previous"),void 0!==this.previousSlide&&(this.slides[this.previousSlide].removeAttribute("active"),this.slides[this.previousSlide].setAttribute("previous",""),this.$.progress.children[this.previousSlide].classList.remove("active"),this.oldPreviousSlide=this.previousSlide),this.$.progress.children[this.currentSlide].classList.add("active"),this.previousSlide=this.currentSlide)});const t=({path:e=Q(),query:t=ee(),hash:i=te()}={})=>{e=window.history.pushState({},"",`${e}${t&&"?"+t||""}${i&&"#"+i||""}`),window.dispatchEvent(new Event("location-changed")),localStorage.setItem("location",te())};let i,n;this.$.forward.onclick=(()=>{this.slides[this.currentSlide].steps&&this.slides[this.currentSlide].step<=this.slides[this.currentSlide].steps?t({hash:`slide-${this.currentSlide+1}/step-${this.slides[this.currentSlide].step+1}`}):this.currentSlide<this.slides.length-1&&t({hash:`slide-${this.currentSlide+2}/step-1`})}),this.$.backward.onclick=(()=>{this.slides[this.currentSlide].steps&&this.slides[this.currentSlide].step>1?t({hash:`slide-${this.currentSlide+1}/step-${this.slides[this.currentSlide].step-1}`}):this.currentSlide>0&&t({hash:`slide-${this.currentSlide}/step-${(this.slides[this.currentSlide-1].steps||0)+1}`})}),document.addEventListener("touchstart",e=>{i=e.touches[0].clientX,n=e.touches[0].clientY},!1),document.addEventListener("touchend",e=>{const t=e.changedTouches[0].clientX-i,s=e.changedTouches[0].clientY-n;Math.abs(t)>60&&Math.abs(t)>Math.abs(s)&&(t<0?this.$.forward.onclick():this.$.backward.onclick())},!1);const s=()=>{this.removeAttribute("loading"),window.dispatchEvent(new Event("location-changed"))},o=this.getAttribute("font");o&&(this.style.fontFamily=o);let r=new Promise((e,t)=>{let i=setTimeout(()=>{clearTimeout(i),t("Font loading timeout")},2e3)});Promise.race([Promise.all(this.slides.map(e=>e.tagName.includes("-")&&customElements.whenDefined(e.tagName.toLowerCase()))),r]).then(()=>Promise.race([Promise.all(this.slides.filter(e=>e.fonts).map(e=>e.fonts).reduce((e,t)=>e.concat(t),o&&[o]||[]).map(e=>new FontFaceObserver(e).load())),r])).then(s,()=>console.warn("Failed to initialize fonts")||s()),window.addEventListener("storage",e=>{"location"===e.key&&te()!==e.newValue&&t({hash:`${e.newValue}`})})}get currentSlide(){return(te().match(/(?:slide-(\d+))?(?:\/step-(\d+|Infinity))?/)[1]||1)-1}get currentStep(){return(te().match(/(?:slide-(\d+))?(?:\/step-(\d+|Infinity))?/)[2]||1)-1}}const oe=e=>{const t=new Date(new Date-e),i=e=>e<10&&"0"+e||e,n=i(t.getUTCHours()),s=i(t.getUTCMinutes()),o=i(t.getUTCSeconds());return`${t.getUTCHours()&&n+":"||""}${s}:${o}`};customElements.define(SlidemDeck.is,SlidemDeck);const re=document.createTextNode("\n  /* SLIDEM SLIDE GLOBAL STYLES */\n\n  [reveal] {\n    opacity: 0;\n    transition: opacity 0.2s;\n  }\n"),ae=document.createElement("style");ae.appendChild(re),document.head.appendChild(ae);const le=$`
  <style>
    :host {
      display: flex;
      flex-direction: row;
      overflow: hidden;
      align-items: center;
      background-size: cover;
      background-position: center;
    }

    :host([zoom-in]) #content, :host([zoom-out]) #content {
      animation-duration: 0.4s;
      animation-fill-mode: both;
      animation-timing-function: ease-in-out;
    }

    @keyframes zoom-in {
      from {
        opacity: 0;
        transform: scale(0);
      }
      to {
        opacity: 1;
        transform: scale(var(--slidem-content-scale, 1));
      }
    }

    @keyframes zoom-out {
      from {
        opacity: 1;
        transform: scale(var(--slidem-content-scale, 1));
      }
      to {
        opacity: 0;
        transform: scale(0);
      }
    }

    :host([zoom-in][active].animate-forward) #content {
      animation-name: zoom-in;
    }

    :host([zoom-in][previous].animate-backward) #content {
      animation-name: zoom-out;
    }

    :host([zoom-out][previous].animate-forward) #content {
      animation-name: zoom-out;
    }

    :host([zoom-out][active].animate-backward) #content {
      animation-name: zoom-in;
    }

    #iefix {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    #content {
      width: var(--slidem-content-width, 1760px);
      max-height: var(--slidem-content-height, 990px);
      flex-shrink: 0;
    }

    :host(:not([center])) #content {
      height: var(--slidem-content-height, 990px);
    }
  </style>
`;class SlidemSlideBase extends GluonElement{get template(){return null!==this.getAttribute("fullscreen")||this.constructor.fullscreen?$`
        ${le}
        ${"SlidemSlide"!==this.constructor.name&&this.content||$`<slot id="slot"></slot>`}
      `:$`
        ${le}
        <div id="iefix">
          <div id="content">
            ${"SlidemSlide"!==this.constructor.name&&this.content||$`<slot id="slot"></slot>`}
          </div>
        </div>
      `}connectedCallback(){let e;super.connectedCallback(),this._steps=Array.from(this.querySelectorAll("[reveal]")),this.steps=this._steps.length,this.__resizeContent(),window.addEventListener("resize",()=>{window.clearTimeout(e),e=window.setTimeout(()=>{this.__resizeContent()},200)})}static get observedAttributes(){return["step"]}attributeChangedCallback(e,t,i){if("step"===e){const e=Number(i);if(e>this.steps+1)return void this.setAttribute("step",this.steps+1);this.__setStep(e)}}set step(e){this.setAttribute("step",e)}get step(){return Number(this.getAttribute("step"))||1}__setStep(e){this._steps.forEach((t,i)=>{t.style.opacity=i<e-1?1:0})}__resizeContent(){const e=window.getComputedStyle(document.documentElement),t=Number((e.getPropertyValue("--slidem-content-width")||"1760px").slice(0,-2)),i=Number((e.getPropertyValue("--slidem-content-height")||"990px").slice(0,-2)),n=Math.min(window.innerHeight/1.09/i,window.innerWidth/1.09/t);n<1?(document.documentElement.style.setProperty("--slidem-content-scale",n),this.$.content&&(this.$.content.style.transform=`scale(${n})`)):(document.documentElement.style.setProperty("--slidem-content-scale",1),this.$.content&&(this.$.content.style.transform="scale(1)"))}}const de=document.createTextNode("\n  /* SLIDEM BASIC SLIDE STYLE */\n  slidem-slide h1,\n  slidem-slide h2,\n  slidem-slide h3,\n  slidem-slide h4,\n  slidem-slide h5,\n  slidem-slide h6,\n  slidem-slide p {\n    margin-top: 0px;\n    margin-bottom: 0px;\n  }\n\n  slidem-slide a {\n    color: inherit;\n    text-decoration: none;\n  }\n"),ce=document.createElement("style");ce.appendChild(de),document.head.appendChild(ce);class SlidemSlide extends SlidemSlideBase{connectedCallback(){super.connectedCallback();const e=this.getAttribute("background");if(e)if(e.match(/^--[a-zA-Z-]*$/))window.ShadyCSS&&window.ShadyCSS.variables?this.style.background=window.ShadyCSS.variables[e]:this.style.background=`var(${e})`;else if(e.match(/^(http|\/|\.)/)){let t=`url(${e})`;const i=this.getAttribute("darken-background");i&&(t=`linear-gradient(rgba(0,0,0,${i}), rgba(0,0,0,${i})), ${t}`),this.style.backgroundImage=t}else this.style.background=e;this.textNodes=Array.from(this.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li, span")),this.textNodes.forEach(e=>{null!==e.getAttribute("font-size")&&(e.style.fontSize=e.getAttribute("font-size")),null!==e.getAttribute("bold")&&(e.style.fontWeight="bold"),null!==e.getAttribute("underline")&&(e.style.textDecoration="underline"),null!==e.getAttribute("italic")&&(e.style.fontStyle="italic"),null!==e.getAttribute("uppercase")&&(e.style.textTransform="uppercase"),null!==e.getAttribute("center")&&(e.style.textAlign="center"),null!==e.getAttribute("line-height")&&(e.style.lineHeight=e.getAttribute("line-height"));const t=e.getAttribute("color");null!==t&&(t.match(/^--[a-zA-Z-]*$/)?window.ShadyCSS&&window.ShadyCSS.variables?e.style.color=window.ShadyCSS.variables[t]:e.style.color=`var(${t})`:e.style.color=t)}),this.layoutNodes=Array.from(this.querySelectorAll("div")),this.layoutNodes.forEach(e=>{null!==e.getAttribute("center")&&(e.style.display="flex",e.style.justifyContent="center",e.style.alignItems="center")})}static get observedAttributes(){const e=super.observedAttributes||[];return Array.prototype.push.apply(e,["active","next"]),e}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),"active"!==e&&"next"!==e||null!==i&&this.__rescale()}__rescale(){requestAnimationFrame(()=>{this.textNodes.forEach(e=>{if(null!==e.getAttribute("fit")){e.style.display="table",e.style.whiteSpace="nowrap";const t=parseFloat(window.getComputedStyle(e,null).getPropertyValue("font-size")),i=this.$.content.clientWidth;e.style.fontSize=`${Math.floor(t*i/e.clientWidth)}px`}})})}}customElements.define(SlidemSlide.is,SlidemSlide);const he=document.createElement("link");he.href="https://fonts.googleapis.com/css?family=Roboto:400,500,700",he.rel="stylesheet",document.head.appendChild(he);class SlidemPolymersummitSlide extends SlidemSlideBase{get fonts(){return["Roboto"]}get template(){return this.content=$`
      <div class="introSlide">
        <div class="side">
          <div class="avatar"><slot name="avatar"></slot></div>
          <div class="speakerDetails">
            <slot name="speaker"></slot>
            <div>
              <slot name="email"></slot>
            </div>
            <div>
              <slot name="twitter"></slot>
            </div>
          </div>
          <div class="logo">
            <slot name="logo"></slot>
          </div>
        </div>
        <div class="event">
          <slot name="event"></slot>
        </div>
        <slot name="title"></slot>
        <slot name="subtitle"></slot>
      </div>
    `,$`
      <style>
        :host {
          background: #2e9be6;
          font-family: 'Roboto';
        }
        .introSlide {
          overflow: hidden;
          border-bottom: 3px solid white;
          color: white;
          position: relative;
          height: 100%;
        }

        .topShade {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 34px;
          background: rgba(0, 0, 0, 0.2);
        }

        .introSlide .event {
          position: absolute;
          bottom: 26px;
          left: 0;
        }

        .introSlide .event ::slotted([slot="event"]) {
          margin: 0;
          font-size: 24px;
          letter-spacing: 1px;
          font-weight: 700;
        }

        .introSlide .side {
          position: absolute;
          right: 0;
          width: 340px;
          height: 100%;
          display: flex;
          flex-flow: column;
          justify-content: flex-end;
        }

        .introSlide .side * {
          flex-shrink: 0;
        }

        .introSlide .avatar {
          height: 340px;
          width: 340px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 56px;
        }

        .introSlide ::slotted([slot="avatar"]) {
          max-width: 340px;
        }

        .introSlide .speakerDetails {
          border-top: 3px solid white;
          padding-top: 50px;
          padding-bottom: 30px;
        }


        .introSlide .speakerDetails ::slotted([slot="speaker"]) {
          font-weight: 400;
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 32px;
          letter-spacing: 1px;
        }

        .introSlide .speakerDetails div {
          margin-bottom: 20px;
        }

        .introSlide .speakerDetails div ::slotted([slot="email"]),
        .introSlide .speakerDetails div ::slotted([slot="twitter"]) {
          color: white;
          font-weight: 500;
          font-size: 28px;
          letter-spacing: 1px;
        }

        .introSlide .logo {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 260px;
          background-color: white;
        }

        .introSlide .logo ::slotted([slot="logo"]) {
          max-height: 200px;
          max-width: 300px;
          background-position: center;
          background-size: contain;
        }

        .introSlide ::slotted([slot="title"]) {
          margin-top: 190px;
          margin-bottom: 0;
          font-weight: 500;
          font-size: 150px;
          color: white;
          letter-spacing: 2px;
        }

        .introSlide ::slotted([slot="subtitle"]) {
          display: inline-block;
          margin-top: 40px;
          font-weight: 400;
          font-size: 100px;
          letter-spacing: 2px;
          color: white;
          padding-top: 40px;
          border-top: 3px solid white;
        }
      </style>
      <div class="topShade"></div>
      ${super.template}
    `}}customElements.define(SlidemPolymersummitSlide.is,SlidemPolymersummitSlide);class SlidemVideoSlide extends SlidemSlideBase{get template(){return this.content=$`
      <video controls id="video"></video>
    `,$`
      <style>
        :host {
          background: black;
          color: white;
        }

        video {
          width: 100%;
          max-height: 100%;
          max-width: 100%;
        }
      </style>
      ${super.template}
    `}connectedCallback(){super.connectedCallback(),this.$.video.src=this.getAttribute("video"),this.$.video.muted=null!==this.getAttribute("muted")}static get observedAttributes(){const e=super.observedAttributes||[];return Array.prototype.push.apply(e,["active"]),e}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),"active"===e&&(null!==i?(this.$.video.currentTime=0,this.$.video.play()):this.$.video.pause())}}customElements.define(SlidemVideoSlide.is,SlidemVideoSlide),window,document,window.customElements.define("zero-md",class extends HTMLElement{get version(){return"v1.3.0"}get src(){return this.getAttribute("src")}get manualRender(){return this.hasAttribute("manual-render")}get noShadow(){return this.hasAttribute("no-shadow")}get markedUrl(){return this.getAttribute("marked-url")||window.ZeroMd.config.markedUrl}get prismUrl(){return this.getAttribute("prism-url")||window.ZeroMd.config.prismUrl}get cssUrls(){let e=this.getAttribute("css-urls");return e?JSON.parse(e):window.ZeroMd.config.cssUrls}constructor(){super(),window.ZeroMd=window.ZeroMd||{},window.ZeroMd.config=window.ZeroMd.config||{},window.ZeroMd.config.markedUrl=window.ZeroMd.config.markedUrl||"https://cdn.jsdelivr.net/npm/marked@0/marked.min.js",window.ZeroMd.config.prismUrl=window.ZeroMd.config.prismUrl||"https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js",window.ZeroMd.config.cssUrls=window.ZeroMd.config.cssUrls||["https://cdn.jsdelivr.net/npm/github-markdown-css@2/github-markdown.min.css","https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism.min.css"],window.ZeroMd.cache=window.ZeroMd.cache||{}}connectedCallback(){this.addEventListener("click",this._hijackLinks.bind(this)),this.addEventListener("zero-md-rendered",function handler(){this.removeEventListener("zero-md-rendered",handler),window.setTimeout(()=>{this._scrollTo(window.location.hash)})}.bind(this)),this.manualRender||this.render(),this._fire("zero-md-ready")}_fire(e){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0}))}_ajaxGet(e){return new Promise((t,i)=>{if(!e)return void i(e);let n=new XMLHttpRequest,s=t=>{console.warn("[zero-md] Error getting file",e),i(t)};n.open("GET",e,!0),n.onload=(()=>{n.status>=200&&n.status<400?t(n.responseText):s(n)}),n.onerror=(e=>s(e)),n.send()})}_loadScript(e,t,i,...n){return new Promise((s,o)=>{if("undefined"===t)if(window.ZeroMd.cache.hasOwnProperty(i))window.addEventListener(i,function handler(){window.removeEventListener(i,handler),s()});else{window.ZeroMd.cache[i]=!0;let t=document.createElement("script");for(let e of n)t.setAttribute(e,"");t.onload=(()=>{this._fire(i),s()}),t.onerror=(t=>{console.warn("[zero-md] Error loading script",e),o(t)}),t.src=e,document.head.appendChild(t)}else s()})}_getStylesheet(e){return new Promise((t,i)=>{window.ZeroMd.cache[e]?window.ZeroMd.cache[e].loaded?t(window.ZeroMd.cache[e].data):window.addEventListener(e,function handler(){window.removeEventListener(e,handler),t(window.ZeroMd.cache[e].data)}):(window.ZeroMd.cache[e]={loaded:!1,data:""},this._ajaxGet(e).then(i=>{window.ZeroMd.cache[e].data=i,window.ZeroMd.cache[e].loaded=!0,this._fire(e),t(i)},e=>i(e)))})}_getInputs(){return new Promise((e,t)=>{let i=this.querySelector("template")&&this.querySelector("template").content.querySelector("xmp")||!1;i?e(i.textContent):this._ajaxGet(this.src).then(t=>e(t)).catch(e=>t(e))})}_prismHighlight(e,t){return window.Prism.highlight(e,this._detectLang(e,t))}_detectLang(e,t){return t?window.Prism.languages.hasOwnProperty(t)?window.Prism.languages[t]:"es"===t.substr(0,2)?window.Prism.languages.javascript:"c"===t?window.Prism.langauges.clike:window.Prism.languages.markup:e.match(/^\s*</)?window.Prism.languages.markup:window.Prism.languages.javascript}_stampDom(e){let t=this.querySelectorAll("[class^=markdown]");t&&t.forEach(e=>this.removeChild(e)),this.shadowRoot&&(this.shadowRoot.innerHTML=""),this.noShadow?this.insertAdjacentHTML("afterbegin",e):(this.shadowRoot||this.attachShadow({mode:"open"})).innerHTML=e}_buildMd(){return new Promise((e,t)=>{Promise.all([this._getInputs(),this._loadScript(this.markedUrl,typeof window.marked,"zero-md-marked-ready","async"),this._loadScript(this.prismUrl,typeof window.Prism,"zero-md-prism-ready","async","data-manual")]).then(t=>{e('<div class="markdown-body">'+window.marked(t[0],{highlight:this._prismHighlight.bind(this)})+"</div>")},e=>{t(e)})})}_buildStyles(){return new Promise(e=>{let t='<style class="markdown-style">:host{display:block;position:relative;contain:content;}',i="</style>",n=this.querySelector("template")&&this.querySelector("template").content.querySelector("style")||!1;n?e(t+n.textContent+i):Array.isArray(this.cssUrls)&&this.cssUrls.length?Promise.all(this.cssUrls.map(e=>this._getStylesheet(e))).then(n=>e(t+n.join("")+i)).catch(()=>e(t+i)):(console.warn("[zero-md] No styles are defined"),e(t+i))})}_scrollTo(e){if(!e||!this.shadowRoot)return;let t=this.shadowRoot.getElementById(e.substr(1));t&&t.scrollIntoView()}_hijackLinks(e){let t=e.path||e.composedPath();if("A"!==t[0].tagName)return;const i=t[0];i.hash&&i.origin+i.pathname===window.location.origin+window.location.pathname&&(e.metaKey?window.open(i.href,"_blank"):(this._scrollTo(i.hash),window.location=i.href),e.preventDefault())}render(){Promise.all([this._buildStyles(),this._buildMd()]).then(e=>{this._stampDom(e[0]+e[1]),this._fire("zero-md-rendered")})}});
//# sourceMappingURL=main.js.map
