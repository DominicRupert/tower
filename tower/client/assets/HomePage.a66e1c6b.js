import{_ as i,e as d,l as p,P as v,A as _}from"./index.6e332578.js";import{i as u,C as m,c as f,a as g,o as n,b as r,d as o,w as h,n as y,F as x,E as b,p as E,l as S,e as w,I}from"./vendor.8b5ed6d6.js";const k={name:"Home",setup(){const e=u("");return m(async()=>{try{await d.getEvents()}catch(t){p.error(t),v.toast(t.message,"error")}}),{sortEvents:e,events:f(()=>_.events.filter(t=>e.value?t.type==e.value:!0))}}},c=e=>(E("data-v-49435a56"),e=e(),S(),e),B={class:"container d-flex flex-column"},C={class:"row flex-row"},P=c(()=>o("img",{class:"img img justify-content-center",src:"https://fontmeme.com/permalink/220624/38748f6367cf49aa2523ac182d412ab6.png",alt:""},null,-1)),V={class:"form-group sort row"},j=c(()=>o("label",{for:"event-type"},"Sort by Event type",-1)),H=I('<option value="" data-v-49435a56>all</option><option value="convention" data-v-49435a56>WeebCon</option><option value="sport" data-v-49435a56>SportBall</option><option value="digital" data-v-49435a56>Whatever the next youtuber pay per view boxing thing is</option><option value="concert" data-v-49435a56>Concert</option>',5),N=[H];function A(e,t,D,s,F,M){const l=g("Event");return n(),r("div",B,[o("div",C,[P,o("div",V,[j,h(o("select",{class:"form-select","onUpdate:modelValue":t[0]||(t[0]=a=>s.sortEvents=a),id:"event-type","aria-label":"Default select example"},N,512),[[y,s.sortEvents]]),(n(!0),r(x,null,b(s.events,a=>(n(),r("div",{key:a.id,class:"col-md-4 py-2"},[w(l,{event:a,class:""},null,8,["event"])]))),128))])])])}var U=i(k,[["render",A],["__scopeId","data-v-49435a56"]]);export{U as default};
