import{c as d,o as l,e as x,l as L,B as G,w as V,d as w,F as M,y as A,D as C,E as F,G as J,t as W,m as B,H as U,s as Y,n as _,i as D,I as Q,J as X,r as P,x as j,g as Z}from"./index-CYUS4wUs.js";import{_ as $}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{E,a as ee,l as te,h as ne,d as ie,b as ae,k as oe,c as re,o as se,e as le}from"./index-DaVyaJnr.js";var de=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ue(e,n,t){return t={path:n,exports:{},require:function(r,a){return ce(r,a??t.path)}},e(t,t.exports),t.exports}function ce(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}var he=ue(function(e,n){(function(t,r){e.exports=r()})(de,function(){var t="__v-click-outside",r=typeof window<"u",a=typeof navigator<"u",i=r&&("ontouchstart"in window||a&&navigator.msMaxTouchPoints>0)?["touchstart"]:["click"],c=function(o){var h=o.event,p=o.handler;(0,o.middleware)(h)&&p(h)},T=function(o,h){var p=function(s){var f=typeof s=="function";if(!f&&typeof s!="object")throw new Error("v-click-outside: Binding value must be a function or an object");return{handler:f?s:s.handler,middleware:s.middleware||function(g){return g},events:s.events||i,isActive:s.isActive!==!1,detectIframe:s.detectIframe!==!1,capture:!!s.capture}}(h.value),b=p.handler,N=p.middleware,H=p.detectIframe,I=p.capture;if(p.isActive){if(o[t]=p.events.map(function(s){return{event:s,srcTarget:document.documentElement,handler:function(f){return function(g){var y=g.el,v=g.event,S=g.handler,k=g.middleware,O=v.path||v.composedPath&&v.composedPath();(O?O.indexOf(y)<0:!y.contains(v.target))&&c({event:v,handler:S,middleware:k})}({el:o,event:f,handler:b,middleware:N})},capture:I}}),H){var R={event:"blur",srcTarget:window,handler:function(s){return function(f){var g=f.el,y=f.event,v=f.handler,S=f.middleware;setTimeout(function(){var k=document.activeElement;k&&k.tagName==="IFRAME"&&!g.contains(k)&&c({event:y,handler:v,middleware:S})},0)}({el:o,event:s,handler:b,middleware:N})},capture:I};o[t]=[].concat(o[t],[R])}o[t].forEach(function(s){var f=s.event,g=s.srcTarget,y=s.handler;return setTimeout(function(){o[t]&&g.addEventListener(f,y,I)},0)})}},u=function(o){(o[t]||[]).forEach(function(h){return h.srcTarget.removeEventListener(h.event,h.handler,h.capture)}),delete o[t]},m=r?{beforeMount:T,updated:function(o,h){var p=h.value,b=h.oldValue;JSON.stringify(p)!==JSON.stringify(b)&&(u(o),T(o,{value:p}))},unmounted:u}:{};return{install:function(o){o.directive("click-outside",m)},directive:m}})}),pe=he;const fe={class:"v3ti-loader-wrapper"},ge=x("div",{class:"v3ti-loader"},null,-1),me=x("span",null,"Loading",-1),ve=[ge,me];function xe(e,n){return l(),d("div",fe,ve)}function K(e,n){n===void 0&&(n={});var t=n.insertAt;if(!(!e||typeof document>"u")){var r=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css",t==="top"&&r.firstChild?r.insertBefore(a,r.firstChild):r.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}}var ye=`.v3ti-loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #112B3C;
}
.v3ti-loader-wrapper .v3ti-loader {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: inline-block;
  border-top: 2px solid #112B3C;
  border-right: 2px solid transparent;
  box-sizing: border-box;
  animation: rotation 0.8s linear infinite;
  margin-right: 8px;
}
@keyframes rotation {
0% {
    transform: rotate(0deg);
}
100% {
    transform: rotate(360deg);
}
}`;K(ye);const q={};q.render=xe;var we=q,z={name:"Vue3TagsInput",emits:["update:modelValue","update:tags","on-limit","on-tags-changed","on-remove","on-error","on-focus","on-blur","on-select","on-select-duplicate-tag","on-new-tag"],props:{readOnly:{type:Boolean,default:!1},modelValue:{type:String,default:""},validate:{type:[String,Function,Object],default:""},addTagOnKeys:{type:Array,default:function(){return[13,",",32]}},placeholder:{type:String,default:""},tags:{type:Array,default:()=>[]},loading:{type:Boolean,default:!1},limit:{type:Number,default:-1},allowDuplicates:{type:Boolean,default:!1},addTagOnBlur:{type:Boolean,default:!1},selectItems:{type:Array,default:()=>[]},select:{type:Boolean,default:!1},duplicateSelectItem:{type:Boolean,default:!0},uniqueSelectField:{type:String,default:"id"},addTagOnKeysWhenSelect:{type:Boolean,default:!1},isShowNoData:{type:Boolean,default:!0}},components:{Loading:we},directives:{clickOutside:pe.directive},data(){return{isInputActive:!1,isError:!1,newTag:"",innerTags:[],multiple:!1}},computed:{isLimit(){const e=this.limit>0&&Number(this.limit)===this.innerTags.length;return e&&this.$emit("on-limit"),e},selectedItemsIds(){return this.duplicateSelectItem?[]:this.tags.map(e=>e[this.uniqueSelectField]||"")}},watch:{error(){this.isError=this.error},modelValue:{immediate:!0,handler(e){this.newTag=e}},tags:{deep:!0,immediate:!0,handler(e){this.innerTags=[...e]}}},methods:{isShot(e){return!!this.$slots[e]},makeItNormal(e){this.$emit("update:modelValue",e.target.value),this.$refs.inputTag.className="v3ti-new-tag",this.$refs.inputTag.style.textDecoration="none"},resetData(){this.innerTags=[]},resetInputValue(){this.newTag="",this.$emit("update:modelValue","")},setPosition(){const e=this.$refs.inputBox,n=this.$refs.contextMenu;if(e&&n){n.style.display="block";const t=e.clientHeight||32,r=3;n.style.top=t+r+"px"}},closeContextMenu(){this.$refs.contextMenu&&(this.$refs.contextMenu.style={display:"none"})},handleSelect(e){if(this.isShowCheckmark(e)){const n=this.tags.filter(t=>e.id!==t.id);this.$emit("update:tags",n),this.$emit("on-select-duplicate-tag",e),this.resetInputValue()}else this.$emit("on-select",e);this.$nextTick(()=>{this.closeContextMenu()})},isShowCheckmark(e){return this.duplicateSelectItem?!1:this.selectedItemsIds.includes(e[this.uniqueSelectField])},focusNewTag(){this.select&&!this.disabled&&this.setPosition(),!(this.readOnly||!this.$el.querySelector(".v3ti-new-tag"))&&this.$el.querySelector(".v3ti-new-tag").focus()},handleInputFocus(e){this.isInputActive=!0,this.$emit("on-focus",e)},handleInputBlur(e){this.isInputActive=!1,this.addNew(e),this.$emit("on-blur",e)},addNew(e){if(this.select&&!this.addTagOnKeysWhenSelect)return;const n=e?this.addTagOnKeys.indexOf(e.keyCode)!==-1||this.addTagOnKeys.indexOf(e.key)!==-1:!0,t=e&&e.type!=="blur";!n&&(t||!this.addTagOnBlur)||this.isLimit||(this.newTag&&(this.allowDuplicates||this.innerTags.indexOf(this.newTag)===-1)&&this.validateIfNeeded(this.newTag)?(this.innerTags.push(this.newTag),this.addTagOnKeysWhenSelect&&(this.$emit("on-new-tag",this.newTag),this.updatePositionContextMenu()),this.resetInputValue(),this.tagChange(),e&&e.preventDefault()):(this.validateIfNeeded(this.newTag)?this.makeItError(!0):this.makeItError(!1),e&&e.preventDefault()))},updatePositionContextMenu(){this.$nextTick(()=>{this.setPosition()})},makeItError(e){this.newTag!==""&&(this.$refs.inputTag.className="v3ti-new-tag v3ti-new-tag--error",this.$refs.inputTag.style.textDecoration="underline",this.$emit("on-error",e))},validateIfNeeded(e){return this.validate===""||this.validate===void 0?!0:typeof this.validate=="function"?this.validate(e):!0},removeLastTag(){this.newTag||(this.innerTags.pop(),this.tagChange(),this.updatePositionContextMenu())},remove(e){this.innerTags.splice(e,1),this.tagChange(),this.$emit("on-remove",e),this.updatePositionContextMenu()},tagChange(){this.$emit("on-tags-changed",this.innerTags)}}};const Te={key:1,class:"v3ti-tag-content"},ke=["onClick"],be=["placeholder","disabled"],Ce={key:0,class:"v3ti-loading"},_e={key:1,class:"v3ti-no-data"},Ie={key:1},Se={key:2},Be=["onClick"],Ee={class:"v3ti-context-item--label"},Ne={key:0,class:"v3ti-icon-selected-tag",width:"44",height:"44",viewBox:"0 0 24 24","stroke-width":"1.5",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},Oe=x("path",{stroke:"none",d:"M0 0h24v24H0z"},null,-1),Ve=x("path",{d:"M5 12l5 5l10 -10"},null,-1),Me=[Oe,Ve];function Ae(e,n,t,r,a,i){const c=L("Loading"),T=G("click-outside");return V((l(),d("div",{onClick:n[6]||(n[6]=u=>i.focusNewTag()),class:_([{"v3ti--focus":a.isInputActive,"v3ti--error":a.isError},"v3ti"])},[x("div",{class:_(["v3ti-content",{"v3ti-content--select":t.select}]),ref:"inputBox"},[(l(!0),d(M,null,A(a.innerTags,(u,m)=>(l(),d("span",{key:m,class:"v3ti-tag"},[i.isShot("item")?C(e.$slots,"item",F(J({key:0},{name:u,index:m,tag:u}))):(l(),d("span",Te,W(u),1)),t.readOnly?w("",!0):(l(),d("a",{key:2,onClick:B(o=>i.remove(m),["prevent","stop"]),class:"v3ti-remove-tag"},null,8,ke))]))),128)),V(x("input",{ref:"inputTag",placeholder:t.placeholder,"onUpdate:modelValue":n[0]||(n[0]=u=>a.newTag=u),onKeydown:[n[1]||(n[1]=U(B(function(){return i.removeLastTag&&i.removeLastTag(...arguments)},["stop"]),["delete"])),n[2]||(n[2]=function(){return i.addNew&&i.addNew(...arguments)})],onBlur:n[3]||(n[3]=function(){return i.handleInputBlur&&i.handleInputBlur(...arguments)}),onFocus:n[4]||(n[4]=function(){return i.handleInputFocus&&i.handleInputFocus(...arguments)}),onInput:n[5]||(n[5]=function(){return i.makeItNormal&&i.makeItNormal(...arguments)}),class:"v3ti-new-tag",disabled:t.readOnly},null,40,be),[[Y,a.newTag]])],2),t.select?(l(),d("section",{key:0,class:_(["v3ti-context-menu",{"v3ti-context-menu-no-data":!t.isShowNoData&&t.selectItems.length===0}]),ref:"contextMenu"},[t.loading?(l(),d("div",Ce,[i.isShot("loading")?C(e.$slots,"default",{key:0}):(l(),D(c,{key:1}))])):w("",!0),!t.loading&&t.selectItems.length===0&&t.isShowNoData?(l(),d("div",_e,[i.isShot("no-data")?C(e.$slots,"no-data",{key:0}):(l(),d("span",Ie," No data "))])):w("",!0),!t.loading&&t.selectItems.length>0?(l(),d("div",Se,[(l(!0),d(M,null,A(t.selectItems,(u,m)=>(l(),d("div",{key:m,class:_(["v3ti-context-item",{"v3ti-context-item--active":i.isShowCheckmark(u)}]),onClick:B(o=>i.handleSelect(u,m),["stop"])},[x("div",Ee,[C(e.$slots,"select-item",F(Q(u)))]),i.isShowCheckmark(u)?(l(),d("svg",Ne,Me)):w("",!0)],10,Be))),128))])):w("",!0)],2)):w("",!0)],2)),[[T,i.closeContextMenu]])}var Fe=`.v3ti {
  border-radius: 5px;
  min-height: 32px;
  line-height: 1.4;
  background-color: #fff;
  border: 1px solid #9ca3af;
  cursor: text;
  text-align: left;
  -webkit-appearance: textfield;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
.v3ti .v3ti-icon-selected-tag {
  stroke: #19be6b;
  width: 1rem;
  height: 1rem;
  margin-left: 4px;
}
.v3ti--focus {
  outline: 0;
  border-color: #000000;
  box-shadow: 0 0 0 1px #000000;
}
.v3ti--error {
  border-color: #F56C6C;
}
.v3ti .v3ti-no-data {
  color: #d8d8d8;
  text-align: center;
  padding: 4px 7px;
}
.v3ti .v3ti-loading {
  padding: 4px 7px;
  text-align: center;
}
.v3ti .v3ti-context-menu {
  max-height: 150px;
  min-width: 150px;
  overflow: auto;
  display: none;
  outline: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 5px 0;
  background: #ffffff;
  z-index: 1050;
  color: #475569;
  box-shadow: 0 3px 8px 2px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 6px 6px;
}
.v3ti .v3ti-context-menu .v3ti-context-item {
  padding: 4px 7px;
  display: flex;
  align-items: center;
}
.v3ti .v3ti-context-menu .v3ti-context-item:hover {
  background: #e8e8e8;
  cursor: pointer;
}
.v3ti .v3ti-context-menu .v3ti-context-item--label {
  flex: 1;
  min-width: 1px;
}
.v3ti .v3ti-context-menu .v3ti-context-item--active {
  color: #317CAF;
}
.v3ti .v3ti-context-menu-no-data {
  padding: 0;
}
.v3ti .v3ti-content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.v3ti .v3ti-content--select {
  padding-right: 30px;
}
.v3ti .v3ti-tag {
  display: flex;
  font-weight: 400;
  margin: 3px;
  padding: 0 5px;
  background: #317CAF;
  color: #ffffff;
  height: 27px;
  border-radius: 5px;
  align-items: center;
  max-width: calc(100% - 16px);
}
.v3ti .v3ti-tag .v3ti-tag-content {
  flex: 1;
  min-width: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.v3ti .v3ti-tag .v3ti-remove-tag {
  color: #ffffff;
  transition: opacity 0.3s ease;
  opacity: 0.5;
  cursor: pointer;
  padding: 0 5px 0 7px;
}
.v3ti .v3ti-tag .v3ti-remove-tag::before {
  content: "x";
}
.v3ti .v3ti-tag .v3ti-remove-tag:hover {
  opacity: 1;
}
.v3ti .v3ti-new-tag {
  background: transparent;
  border: 0;
  font-weight: 400;
  margin: 3px;
  outline: none;
  padding: 0 4px;
  flex: 1;
  min-width: 60px;
  height: 27px;
}
.v3ti .v3ti-new-tag--error {
  color: #F56C6C;
}`;K(Fe);z.render=Ae;var Le=(()=>{const e=z;return e.install=n=>{n.component("Vue3TagsInput",e)},e})();const De=X({name:"TagsInput",components:{Vue3TagsInput:Le},props:{modelValue:{type:Array,default:()=>[]}},emits:["update:modelValue"],setup(e,{emit:n}){const t=P([...e.modelValue]);return j(()=>e.modelValue,a=>{t.value=[...a]}),{internalTags:t,handleChangeTag:a=>{t.value=a,n("update:modelValue",a)}}}});function Pe(e,n,t,r,a,i){const c=L("vue3-tags-input");return l(),D(c,{class:"bg-base-100 rounded-lg",tags:e.tags,placeholder:"Matemática, Física...",onOnTagsChanged:e.handleChangeTag},null,8,["tags","onOnTagsChanged"])}const He=$(De,[["render",Pe]]),je=`void main() {
  // Your code here
}`,$e={__name:"CodeEditorC",props:{modelValue:String},emits:["update:modelValue"],setup(e,{emit:n}){const t=e,r=n,a=P(null);let i=null;return Z(()=>{i=new E({state:ee.create({doc:t.modelValue||je,extensions:[te(),ne(),ie(),ae(),oe.of(le),re(),se,E.updateListener.of(c=>{c.docChanged&&r("update:modelValue",i.state.doc.toString())}),E.theme({"&":{height:"50vh",minHeight:"300px",fontSize:"14px",fontFamily:"Fira Code, monospace",padding:"12px",backgroundColor:"#1e1e2e",borderRadius:"12px"},".cm-content":{paddingBottom:"20px"}})]}),parent:a.value})}),j(()=>t.modelValue,c=>{i&&c!==i.state.doc.toString()&&i.dispatch({changes:{from:0,to:i.state.doc.length,insert:c}})}),(c,T)=>(l(),d("div",{ref_key:"editorContainer",ref:a,class:"rounded-xl border border-base-200 bg-[#1e1e2e]"},null,512))}},Re=$($e,[["__scopeId","data-v-0171e0da"]]);export{Re as C,He as T};
