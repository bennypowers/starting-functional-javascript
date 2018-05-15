const templateCaches=new Map;class TemplateResult{constructor(e,t,i,s=defaultPartCallback){this.strings=e,this.values=t,this.type=i,this.partCallback=s}getHTML(){const e=this.strings.length-1;let t="",i=!0;for(let s=0;s<e;s++){const e=this.strings[s];t+=e;const n=findTagClose(e);t+=(i=n>-1?n<e.length:i)?nodeMarker:marker}return t+this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}function defaultTemplateFactory(e){let t=templateCaches.get(e.type);void 0===t&&(t=new Map,templateCaches.set(e.type,t));let i=t.get(e.strings);return void 0===i&&(i=new Template(e,e.getTemplateElement()),t.set(e.strings,i)),i}function render(e,t,i=defaultTemplateFactory){const s=i(e);let n=t.__templateInstance;if(void 0!==n&&n.template===s&&n._partCallback===e.partCallback)return void n.update(e.values);n=new TemplateInstance(s,e.partCallback,i),t.__templateInstance=n;const o=n._clone();n.update(e.values),removeNodes(t,t.firstChild),t.appendChild(o)}const marker=`{{lit-${String(Math.random()).slice(2)}}}`,nodeMarker=`\x3c!--${marker}--\x3e`,markerRegex=new RegExp(`${marker}|${nodeMarker}`),lastAttributeNameRegex=/[ \x09\x0a\x0c\x0d]([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)[ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*)$/;function findTagClose(e){const t=e.lastIndexOf(">");return e.indexOf("<",t+1)>-1?e.length:t}class TemplatePart{constructor(e,t,i,s,n){this.type=e,this.index=t,this.name=i,this.rawName=s,this.strings=n}}class Template{constructor(e,t){this.parts=[],this.element=t;const i=this.element.content,s=document.createTreeWalker(i,133,null,!1);let n=-1,o=0;const r=[];let a,l;for(;s.nextNode();){n++,a=l;const t=l=s.currentNode;if(1===t.nodeType){if(!t.hasAttributes())continue;const i=t.attributes;let s=0;for(let e=0;e<i.length;e++)i[e].value.indexOf(marker)>=0&&s++;for(;s-- >0;){const s=e.strings[o],r=lastAttributeNameRegex.exec(s)[1],a=i.getNamedItem(r),l=a.value.split(markerRegex);this.parts.push(new TemplatePart("attribute",n,a.name,r,l)),t.removeAttribute(a.name),o+=l.length-1}}else if(3===t.nodeType){const e=t.nodeValue;if(e.indexOf(marker)<0)continue;const i=t.parentNode,s=e.split(markerRegex),r=s.length-1;o+=r,t.textContent=s[r];for(let e=0;e<r;e++)i.insertBefore(document.createTextNode(s[e]),t),this.parts.push(new TemplatePart("node",n++))}else if(8===t.nodeType&&t.nodeValue===marker){const e=t.parentNode,i=t.previousSibling;null===i||i!==a||i.nodeType!==Node.TEXT_NODE?e.insertBefore(document.createTextNode(""),t):n--,this.parts.push(new TemplatePart("node",n++)),r.push(t),null===t.nextSibling?e.insertBefore(document.createTextNode(""),t):n--,l=a,o++}}for(const e of r)e.parentNode.removeChild(e)}}const getValue=(e,t)=>isDirective(t)?(t=t(e),directiveValue):null===t?void 0:t,isDirective=e=>"function"==typeof e&&!0===e.__litDirective,directiveValue={},isPrimitiveValue=e=>null===e||!("object"==typeof e||"function"==typeof e);class AttributePart{constructor(e,t,i,s){this.instance=e,this.element=t,this.name=i,this.strings=s,this.size=s.length-1,this._previousValues=[]}_interpolate(e,t){const i=this.strings,s=i.length-1;let n="";for(let o=0;o<s;o++){n+=i[o];const s=getValue(this,e[t+o]);if(s&&s!==directiveValue&&(Array.isArray(s)||"string"!=typeof s&&s[Symbol.iterator]))for(const e of s)n+=e;else n+=s}return n+i[s]}_equalToPreviousValues(e,t){for(let i=t;i<t+this.size;i++)if(this._previousValues[i]!==e[i]||!isPrimitiveValue(e[i]))return!1;return!0}setValue(e,t){if(this._equalToPreviousValues(e,t))return;const i=this.strings;let s;2===i.length&&""===i[0]&&""===i[1]?(s=getValue(this,e[t]),Array.isArray(s)&&(s=s.join(""))):s=this._interpolate(e,t),s!==directiveValue&&this.element.setAttribute(this.name,s),this._previousValues=e}}class NodePart{constructor(e,t,i){this.instance=e,this.startNode=t,this.endNode=i,this._previousValue=void 0}setValue(e){if((e=getValue(this,e))!==directiveValue)if(isPrimitiveValue(e)){if(e===this._previousValue)return;this._setText(e)}else e instanceof TemplateResult?this._setTemplateResult(e):Array.isArray(e)||e[Symbol.iterator]?this._setIterable(e):e instanceof Node?this._setNode(e):void 0!==e.then?this._setPromise(e):this._setText(e)}_insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}_setNode(e){this._previousValue!==e&&(this.clear(),this._insert(e),this._previousValue=e)}_setText(e){const t=this.startNode.nextSibling;e=void 0===e?"":e,t===this.endNode.previousSibling&&t.nodeType===Node.TEXT_NODE?t.textContent=e:this._setNode(document.createTextNode(e)),this._previousValue=e}_setTemplateResult(e){const t=this.instance._getTemplate(e);let i;this._previousValue&&this._previousValue.template===t?i=this._previousValue:(i=new TemplateInstance(t,this.instance._partCallback,this.instance._getTemplate),this._setNode(i._clone()),this._previousValue=i),i.update(e.values)}_setIterable(e){Array.isArray(this._previousValue)||(this.clear(),this._previousValue=[]);const t=this._previousValue;let i=0;for(const s of e){let e=t[i];if(void 0===e){let s=this.startNode;i>0&&(s=t[i-1].endNode=document.createTextNode(""),this._insert(s)),e=new NodePart(this.instance,s,this.endNode),t.push(e)}e.setValue(s),i++}if(0===i)this.clear(),this._previousValue=void 0;else if(i<t.length){const e=t[i-1];t.length=i,this.clear(e.endNode.previousSibling),e.endNode=this.endNode}}_setPromise(e){this._previousValue=e,e.then(t=>{this._previousValue===e&&this.setValue(t)})}clear(e=this.startNode){removeNodes(this.startNode.parentNode,e.nextSibling,this.endNode)}}const defaultPartCallback=(e,t,i)=>{if("attribute"===t.type)return new AttributePart(e,i,t.name,t.strings);if("node"===t.type)return new NodePart(e,i,i.nextSibling);throw new Error(`Unknown part type ${t.type}`)};class TemplateInstance{constructor(e,t,i){this._parts=[],this.template=e,this._partCallback=t,this._getTemplate=i}update(e){let t=0;for(const i of this._parts)void 0===i.size?(i.setValue(e[t]),t++):(i.setValue(e,t),t+=i.size)}_clone(){const e=document.importNode(this.template.element.content,!0),t=this.template.parts;if(t.length>0){const i=document.createTreeWalker(e,133,null,!1);let s=-1;for(let e=0;e<t.length;e++){const n=t[e];for(;s<n.index;)s++,i.nextNode();this._parts.push(this._partCallback(this,n,i.currentNode))}}return e}}const removeNodes=(e,t,i=null)=>{let s=t;for(;s!==i;){const t=s.nextSibling;e.removeChild(s),s=t}},shadyTemplateFactory=e=>t=>{const i=`${t.type}--${e}`;let s=templateCaches.get(i);void 0===s&&(s=new Map,templateCaches.set(i,s));let n=s.get(t.strings);if(void 0===n){const i=t.getTemplateElement();"object"==typeof window.ShadyCSS&&window.ShadyCSS.prepareTemplate(i,e),n=new Template(t,i),s.set(t.strings,n)}return n};function render$1(e,t,i){return render(e,t,shadyTemplateFactory(i))}const html$1=(e,...t)=>new TemplateResult(e,t,"html",extendedPartCallback),extendedPartCallback=(e,t,i)=>{if("attribute"===t.type){if(t.rawName.startsWith("on-")){const s=t.rawName.slice(3);return new EventPart(e,i,s)}if(t.name.endsWith("$")){const s=t.name.slice(0,-1);return new AttributePart(e,i,s,t.strings)}if(t.name.endsWith("?")){const s=t.name.slice(0,-1);return new BooleanAttributePart(e,i,s,t.strings)}return new PropertyPart(e,i,t.rawName,t.strings)}return defaultPartCallback(e,t,i)};class BooleanAttributePart extends AttributePart{setValue(e,t){const i=this.strings;if(2!==i.length||""!==i[0]||""!==i[1])throw new Error("boolean attributes can only contain a single expression");{const i=getValue(this,e[t]);if(i===directiveValue)return;i?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}}class PropertyPart extends AttributePart{setValue(e,t){const i=this.strings;let s;this._equalToPreviousValues(e,t)||((s=2===i.length&&""===i[0]&&""===i[1]?getValue(this,e[t]):this._interpolate(e,t))!==directiveValue&&(this.element[this.name]=s),this._previousValues=e)}}class EventPart{constructor(e,t,i){this.instance=e,this.element=t,this.eventName=i}setValue(e){const t=getValue(this,e),i=this._listener;t!==i&&(this._listener=t,null!=i&&this.element.removeEventListener(this.eventName,i),null!=t&&this.element.addEventListener(this.eventName,t))}}const e=Symbol("tag"),s=Symbol("needsRender"),i=e=>e.replace(/([a-z](?=[A-Z]))|([A-Z](?=[A-Z][a-z]))/g,"$1$2-").toLowerCase(),o=e=>{e.$={},e.shadowRoot.querySelectorAll("[id]").forEach(t=>{e.$[t.id]=t})};class h extends HTMLElement{static get is(){return this.hasOwnProperty(e)&&this[e]||(this[e]=i(this.name))}connectedCallback(){"template"in this&&(this.attachShadow({mode:"open"}),this.render({sync:!0}),o(this))}async render({sync:e=!1}={}){this[s]=!0,e||await 0,this[s]&&(this[s]=!1,render$1(this.template,this.shadowRoot,this.constructor.is))}}let e$1=!1;const n=[],r=e=>{e$1||(window.addEventListener("hashchange",c),window.addEventListener("location-changed",c),window.addEventListener("popstate",c),e$1=!0),n.push(e)},c=()=>{n.forEach(e=>e(d(),p(),h$1()))},d=()=>window.decodeURIComponent(window.location.pathname),p=()=>window.location.search.slice(1),h$1=()=>window.decodeURIComponent(window.location.hash.slice(1));!function(){function l(e,t){document.addEventListener?e.addEventListener("scroll",t,!1):e.attachEvent("scroll",t)}function r(e){this.a=document.createElement("div"),this.a.setAttribute("aria-hidden","true"),this.a.appendChild(document.createTextNode(e)),this.b=document.createElement("span"),this.c=document.createElement("span"),this.h=document.createElement("span"),this.f=document.createElement("span"),this.g=-1,this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;",this.b.appendChild(this.h),this.c.appendChild(this.f),this.a.appendChild(this.b),this.a.appendChild(this.c)}function t(e,t){e.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+t+";"}function y(e){var t=e.a.offsetWidth,i=t+100;return e.f.style.width=i+"px",e.c.scrollLeft=i,e.b.scrollLeft=e.b.scrollWidth+100,e.g!==t&&(e.g=t,!0)}function z(e,t){function c(){var e=i;y(e)&&e.a.parentNode&&t(e.g)}var i=e;l(e.b,c),l(e.c,c),y(e)}function A(e,t){var i=t||{};this.family=e,this.style=i.style||"normal",this.weight=i.weight||"normal",this.stretch=i.stretch||"normal"}var i=null,s=null,n=null,o=null;function J(){return null===o&&(o=!!document.fonts),o}function L(e,t){return[e.style,e.weight,function K(){if(null===n){var e=document.createElement("div");try{e.style.font="condensed 100px sans-serif"}catch(e){}n=""!==e.style.font}return n}()?e.stretch:"","100px",t].join(" ")}A.prototype.load=function(n,o){var a=this,l=n||"BESbswy",d=0,c=o||3e3,h=(new Date).getTime();return new Promise(function(e,n){if(J()&&!function G(){if(null===s)if(J()&&/Apple/.test(window.navigator.vendor)){var e=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);s=!!e&&603>parseInt(e[1],10)}else s=!1;return s}()){var o=new Promise(function(t,i){!function e(){(new Date).getTime()-h>=c?i():document.fonts.load(L(a,'"'+a.family+'"'),l).then(function(i){1<=i.length?t():setTimeout(e,25)},function(){i()})}()}),p=new Promise(function(e,t){d=setTimeout(t,c)});Promise.race([p,o]).then(function(){clearTimeout(d),e(a)},function(){n(a)})}else!function m(e){document.body?e():document.addEventListener?document.addEventListener("DOMContentLoaded",function c(){document.removeEventListener("DOMContentLoaded",c),e()}):document.attachEvent("onreadystatechange",function k(){"interactive"!=document.readyState&&"complete"!=document.readyState||(document.detachEvent("onreadystatechange",k),e())})}(function(){function u(){var t;(t=-1!=p&&-1!=f||-1!=p&&-1!=g||-1!=f&&-1!=g)&&((t=p!=f&&p!=g&&f!=g)||(null===i&&(t=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),i=!!t&&(536>parseInt(t[1],10)||536===parseInt(t[1],10)&&11>=parseInt(t[2],10))),t=i&&(p==v&&f==v&&g==v||p==y&&f==y&&g==y||p==b&&f==b&&g==b)),t=!t),t&&(w.parentNode&&w.parentNode.removeChild(w),clearTimeout(d),e(a))}var s=new r(l),o=new r(l),m=new r(l),p=-1,f=-1,g=-1,v=-1,y=-1,b=-1,w=document.createElement("div");w.dir="ltr",t(s,L(a,"sans-serif")),t(o,L(a,"serif")),t(m,L(a,"monospace")),w.appendChild(s.a),w.appendChild(o.a),w.appendChild(m.a),document.body.appendChild(w),v=s.a.offsetWidth,y=o.a.offsetWidth,b=m.a.offsetWidth,function I(){if((new Date).getTime()-h>=c)w.parentNode&&w.parentNode.removeChild(w),n(a);else{var e=document.hidden;!0!==e&&void 0!==e||(p=s.a.offsetWidth,f=o.a.offsetWidth,g=m.a.offsetWidth,u()),d=setTimeout(I,50)}}(),z(s,function(e){p=e,u()}),t(s,L(a,'"'+a.family+'",sans-serif')),z(o,function(e){f=e,u()}),t(o,L(a,'"'+a.family+'",serif')),z(m,function(e){g=e,u()}),t(m,L(a,'"'+a.family+'",monospace'))})})},"object"==typeof module?module.exports=A:(window.FontFaceObserver=A,window.FontFaceObserver.prototype.load=A.prototype.load)}();const registeredElements={},handleKeydown=e=>e.defaultPrevented?void console.warn("Keypress ignored!"):void(registeredElements[e.key]&&registeredElements[e.key].every(t=>{if(null!==t.offsetParent)return e.stopPropagation(),t.click(),!t.override}));window.addEventListener("keydown",handleKeydown,!0);class GluonKeybinding extends h{static get observedAttributes(){return["key","override"]}attributeChangedCallback(e,t,i){"key"===e&&this.__register(i,t),"override"===e&&this.__override(this.key)}set key(e){e?this.setAttribute("key",e):this.removeAttribute("key")}get key(){return this.getAttribute("key")}set override(e){e?this.setAttribute("override",""):this.removeAttribute("override")}get override(){return""===this.getAttribute("override")}__register(e,t){if(t&&registeredElements[t]){const e=registeredElements[t].indexOf(this);-1!=e&&(registeredElements[t].splice(e,1),0===registeredElements[t].length&&delete registeredElements[t])}e&&(!registeredElements[e]&&(registeredElements[e]=[]),this.override?registeredElements[e].unshift(this):registeredElements[e].push(this))}__override(e){if(e&&registeredElements[e]){const t=registeredElements[e].indexOf(this);-1!=t&&(registeredElements[e].splice(t,1),registeredElements[e].unshift(this))}}}customElements.define(GluonKeybinding.is,GluonKeybinding);const styleText=document.createTextNode("\n  /* SLIDEM GLOBAL STYLES */\n  body {\n    margin: 0;\n  }\n\n\n  [reveal] {\n    opacity: 0;\n    transition: opacity 0.2s;\n  }\n\n  /* Keyframes are defined here to patch a scoping bug in Chrome */\n  @keyframes slidem-fade-in {\n    from {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n  }\n\n  @keyframes slidem-fade-out {\n    from {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n    }\n  }\n\n  @keyframes slidem-slide-in-forward {\n    from {\n      transform: translateX(100vw);\n    }\n    to {\n      transform: translateX(0);\n    }\n  }\n\n  @keyframes slidem-slide-in-backward {\n    from {\n      transform: translateX(0);\n    }\n    to {\n      transform: translateX(100vw);\n    }\n  }\n\n  @keyframes slidem-slide-out-forward {\n    from {\n      transform: translateX(0);\n    }\n    to {\n      transform: translateX(-100vw);\n    }\n  }\n\n  @keyframes slidem-slide-out-backward {\n    from {\n      transform: translateX(-100vw);\n    }\n    to {\n      transform: translateX(0);\n    }\n  }\n"),styleNode=document.createElement("style");styleNode.appendChild(styleText),document.head.appendChild(styleNode);class SlidemDeck extends h{get template(){return html$1`
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
      </div>
      <div id="backward">
        <gluon-keybinding key="PageUp"></gluon-keybinding>
        <gluon-keybinding key="ArrowLeft"></gluon-keybinding>
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
    `}get presenter(){return null!==this.getAttribute("presenter")}set presenter(e){e?this.setAttribute("presenter",""):this.removeAttribute("presenter")}connectedCallback(){let e;super.connectedCallback(),this.presenter="presenter"===p(),this.$.presenterToggle.addEventListener("click",()=>{this.presenter=!this.presenter,t({query:this.presenter?"presenter":"",hash:h$1()})}),this.$.timerToggle.addEventListener("click",()=>{if(e)clearInterval(e),e=void 0,this.$.timer.innerText="";else{this.$.timer.innerText="00:00";let t=new Date;e=setInterval(()=>this.$.timer.innerText=__timer(t),1e3)}}),this.slides=Array.from(this.children),this.slides.forEach(e=>{this.$.progress.appendChild(document.createElement("div"))}),r(()=>{this.slides[this.currentSlide].step=this.currentStep+1,this.slides[this.currentSlide].setAttribute("active",""),this.previousSlide!==this.currentSlide&&(void 0!==this.previousSlide&&(this.previousSlide<this.currentSlide?(this.slides[this.previousSlide].classList.add("animate-forward"),this.slides[this.currentSlide].classList.add("animate-forward"),this.slides[this.previousSlide].classList.remove("animate-backward"),this.slides[this.currentSlide].classList.remove("animate-backward")):(this.slides[this.previousSlide].classList.add("animate-backward"),this.slides[this.currentSlide].classList.add("animate-backward"),this.slides[this.previousSlide].classList.remove("animate-forward"),this.slides[this.currentSlide].classList.remove("animate-forward"))),void 0!==this.oldNextSlide&&this.slides[this.oldNextSlide].removeAttribute("next"),this.nextSlide=this.slides[this.currentSlide+1]&&this.currentSlide+1||void 0,void 0!==this.nextSlide&&(this.slides[this.nextSlide].setAttribute("next",""),this.oldNextSlide=this.nextSlide),void 0!==this.oldPreviousSlide&&this.slides[this.oldPreviousSlide].removeAttribute("previous"),void 0!==this.previousSlide&&(this.slides[this.previousSlide].removeAttribute("active"),this.slides[this.previousSlide].setAttribute("previous",""),this.$.progress.children[this.previousSlide].classList.remove("active"),this.oldPreviousSlide=this.previousSlide),this.$.progress.children[this.currentSlide].classList.add("active"),this.previousSlide=this.currentSlide)});const t=({path:e=d(),query:t=p(),hash:i=h$1()}={})=>{e=window.history.pushState({},"",`${e}${t&&"?"+t||""}${i&&"#"+i||""}`),window.dispatchEvent(new Event("location-changed")),localStorage.setItem("location",h$1())};let i,s;this.$.forward.onclick=(()=>{this.slides[this.currentSlide].steps&&this.slides[this.currentSlide].step<=this.slides[this.currentSlide].steps?t({hash:`slide-${this.currentSlide+1}/step-${this.slides[this.currentSlide].step+1}`}):this.currentSlide<this.slides.length-1&&t({hash:`slide-${this.currentSlide+2}/step-1`})}),this.$.backward.onclick=(()=>{this.slides[this.currentSlide].steps&&this.slides[this.currentSlide].step>1?t({hash:`slide-${this.currentSlide+1}/step-${this.slides[this.currentSlide].step-1}`}):this.currentSlide>0&&t({hash:`slide-${this.currentSlide}/step-${(this.slides[this.currentSlide-1].steps||0)+1}`})}),document.addEventListener("touchstart",e=>{i=e.touches[0].clientX,s=e.touches[0].clientY},!1),document.addEventListener("touchend",e=>{const t=e.changedTouches[0].clientX-i,n=e.changedTouches[0].clientY-s;Math.abs(t)>60&&Math.abs(t)>Math.abs(n)&&(t<0?this.$.forward.onclick():this.$.backward.onclick())},!1),this.removeAttribute("loading");const n=()=>{window.requestAnimationFrame(()=>window.dispatchEvent(new Event("location-changed")))},o=this.getAttribute("font");o&&(this.style.fontFamily=o),Promise.all(this.slides.filter(e=>e.fonts).map(e=>e.fonts).reduce((e,t)=>e.concat(t),o&&[o]||[]).map(e=>new FontFaceObserver(e).load())).then(n,n),window.addEventListener("storage",e=>{"location"===e.key&&h$1()!==e.newValue&&t({hash:`${e.newValue}`})})}get currentSlide(){return(h$1().match(/(?:slide-(\d+))?(?:\/step-(\d+|Infinity))?/)[1]||1)-1}get currentStep(){return(h$1().match(/(?:slide-(\d+))?(?:\/step-(\d+|Infinity))?/)[2]||1)-1}}const __timer=e=>{const t=new Date(new Date-e),i=e=>e<10&&"0"+e||e,s=i(t.getUTCHours()),n=i(t.getUTCMinutes()),o=i(t.getUTCSeconds());return`${t.getUTCHours()&&s+":"||""}${n}:${o}`};customElements.define(SlidemDeck.is,SlidemDeck);const styleText$1=document.createTextNode("\n  /* SLIDEM SLIDE GLOBAL STYLES */\n\n  [reveal] {\n    opacity: 0;\n    transition: opacity 0.2s;\n  }\n"),styleNode$1=document.createElement("style");styleNode$1.appendChild(styleText$1),document.head.appendChild(styleNode$1);const slidemStyle=html$1`
  <style>
    :host {
      overflow: hidden;
      justify-content: center;
      align-items: center;
      background-size: cover;
      background-position: center;
      display: flex;
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

    #content {
      width: var(--slidem-content-width, 1760px);
      max-height: var(--slidem-content-height, 990px);
      flex-shrink: 0;
    }

    :host(:not([center])) #content {
      height: var(--slidem-content-height, 990px);
    }
  </style>
`;class SlidemSlideBase extends h{get template(){return null!==this.getAttribute("fullscreen")||this.constructor.fullscreen?html$1`
        ${slidemStyle}
        ${"SlidemSlide"!==this.constructor.name&&this.content||html$1`<slot id="slot"></slot>`}
      `:html$1`
        ${slidemStyle}
        <div id="content">
          ${"SlidemSlide"!==this.constructor.name&&this.content||html$1`<slot id="slot"></slot>`}
        </div>
      `}connectedCallback(){let e;super.connectedCallback(),this._steps=Array.from(this.querySelectorAll("[reveal]")),this.steps=this._steps.length,this.__resizeContent(),window.addEventListener("resize",()=>{window.clearTimeout(e),e=window.setTimeout(()=>{this.__resizeContent()},200)})}static get observedAttributes(){return["step"]}attributeChangedCallback(e,t,i){if("step"===e){const e=Number(i);if(e>this.steps+1)return void this.setAttribute("step",this.steps+1);this.__setStep(e)}}set step(e){this.setAttribute("step",e)}get step(){return Number(this.getAttribute("step"))||1}__setStep(e){this._steps.forEach((t,i)=>{t.style.opacity=i<e-1?1:0})}__resizeContent(){const e=Number((window.getComputedStyle(document.documentElement).getPropertyValue("--slidem-content-width")||"1760px").slice(0,-2)),t=Number((window.getComputedStyle(document.documentElement).getPropertyValue("--slidem-content-height")||"990px").slice(0,-2)),i=Math.min(window.innerHeight/t,window.innerWidth/1.1/e);i<1?(document.documentElement.style.setProperty("--slidem-content-scale",i),this.$.content&&(this.$.content.style.transform=`scale(${i})`)):(document.documentElement.style.setProperty("--slidem-content-scale",1),this.$.content&&(this.$.content.style.transform="scale(1)"))}}const styleText$2=document.createTextNode("\n  /* SLIDEM BASIC SLIDE STYLE */\n  slidem-slide h1,\n  slidem-slide h2,\n  slidem-slide h3,\n  slidem-slide h4,\n  slidem-slide h5,\n  slidem-slide h6,\n  slidem-slide p {\n    margin-top: 0px;\n    margin-bottom: 0px;\n  }\n\n  slidem-slide a {\n    color: inherit;\n    text-decoration: none;\n  }\n"),styleNode$2=document.createElement("style");styleNode$2.appendChild(styleText$2),document.head.appendChild(styleNode$2);class SlidemSlide extends SlidemSlideBase{connectedCallback(){super.connectedCallback();const e=this.getAttribute("background");if(e)if(e.match(/^--[a-zA-Z-]*$/))this.style.background=`var(${e})`;else if(e.match(/^(http|\/|\.)/)){let t=`url(${e})`;const i=this.getAttribute("darken-background");i&&(t=`linear-gradient(rgba(0,0,0,${i}), rgba(0,0,0,${i})), ${t}`),this.style.backgroundImage=t}else this.style.background=e;this.textNodes=Array.from(this.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li, span")),this.textNodes.forEach(e=>{null!==e.getAttribute("font-size")&&(e.style.fontSize=e.getAttribute("font-size")),null!==e.getAttribute("bold")&&(e.style.fontWeight="bold"),null!==e.getAttribute("underline")&&(e.style.textDecoration="underline"),null!==e.getAttribute("italic")&&(e.style.fontStyle="italic"),null!==e.getAttribute("uppercase")&&(e.style.textTransform="uppercase"),null!==e.getAttribute("center")&&(e.style.textAlign="center"),null!==e.getAttribute("line-height")&&(e.style.lineHeight=e.getAttribute("line-height"));const t=e.getAttribute("color");null!==t&&(t.match(/^--[a-zA-Z-]*$/)?e.style.color=`var(${t})`:e.style.color=t)}),this.layoutNodes=Array.from(this.querySelectorAll("div")),this.layoutNodes.forEach(e=>{null!==e.getAttribute("center")&&(e.style.display="flex",e.style.justifyContent="center",e.style.alignItems="center")})}static get observedAttributes(){const e=super.observedAttributes||[];return Array.prototype.push.apply(e,["active","next"]),e}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),"active"!==e&&"next"!==e||null!==i&&this.__rescale()}__rescale(){requestAnimationFrame(()=>{this.textNodes.forEach(e=>{if(null!==e.getAttribute("fit")){e.style.display="table",e.style.whiteSpace="nowrap";const t=parseFloat(window.getComputedStyle(e,null).getPropertyValue("font-size")),i=this.$.content.clientWidth;e.style.fontSize=`${Math.floor(t*i/e.clientWidth)}px`}})})}}customElements.define(SlidemSlide.is,SlidemSlide);const styleText$3=document.createTextNode("\n  /* POLYMER SUMMIT SLIDE GLOBAL STYLES */\n  @font-face {\n    font-family: 'Roboto';\n    font-style: normal;\n    font-weight: 400;\n    src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v16/oMMgfZMQthOryQo9n22dcuvvDin1pK8aKteLpeZ5c0A.woff2) format('woff2');\n    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n  }\n\n  @font-face {\n    font-family: 'Roboto';\n    font-style: normal;\n    font-weight: 500;\n    src: local('Roboto Medium'), local('Roboto-Medium'), url(https://fonts.gstatic.com/s/roboto/v16/RxZJdnzeo3R5zSexge8UUZBw1xU1rKptJj_0jans920.woff2) format('woff2');\n    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n  }\n\n  @font-face {\n    font-family: 'Roboto';\n    font-style: normal;\n    font-weight: 700;\n    src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v16/d-6IYplOFocCacKzxwXSOJBw1xU1rKptJj_0jans920.woff2) format('woff2');\n    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n  }\n"),styleNode$3=document.createElement("style");styleNode$3.appendChild(styleText$3),document.head.appendChild(styleNode$3);class SlidemPolymersummitSlide extends SlidemSlideBase{get fonts(){return["Roboto"]}get template(){return this.content=html$1`
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
    `,html$1`
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
    `}}customElements.define(SlidemPolymersummitSlide.is,SlidemPolymersummitSlide);class SlidemVideoSlide extends SlidemSlideBase{get template(){return this.content=html$1`
      <video controls id="video"></video>
    `,html$1`
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
    `}connectedCallback(){super.connectedCallback(),this.$.video.src=this.getAttribute("video"),this.$.video.muted=null!==this.getAttribute("muted")}static get observedAttributes(){const e=super.observedAttributes||[];return Array.prototype.push.apply(e,["active"]),e}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),"active"===e&&(null!==i?(this.$.video.currentTime=0,this.$.video.play()):this.$.video.pause())}}customElements.define(SlidemVideoSlide.is,SlidemVideoSlide);
