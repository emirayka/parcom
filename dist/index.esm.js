import{Ok as t,Err as e}from"@emirayka/option-result";class r{constructor(){this.kind="alt"}}class s{constructor(){this.kind="tag"}}class o{constructor(t){this.amount=t}getAmount(){return this.amount}}class l{constructor(t){this.message=t}getMessage(){return this.message}}var n=Object.freeze({__proto__:null,alt:(t,e,r,s,o,l,n,a)=>c=>{let u=t(c);return e&&(u=u.orElse(()=>e(c))),r&&(u=u.orElse(()=>r(c))),s&&(u=u.orElse(()=>s(c))),o&&(u=u.orElse(()=>o(c))),l&&(u=u.orElse(()=>l(c))),n&&(u=u.orElse(()=>n(c))),a&&(u=u.orElse(()=>a(c))),u}});var a=Object.freeze({__proto__:null,tag:r=>s=>s.startsWith(r)?t([s.substr(r.length),s.substr(0,r.length)]):e([s,new o(r.length-s.length)])}),c=Object.freeze({__proto__:null,complete:a}),u=Object.freeze({__proto__:null,string:c});export{r as ParserErrorAlt,l as ParserErrorFailure,o as ParserErrorIncomplete,s as ParserErrorTag,n as combinator,u as parser};
