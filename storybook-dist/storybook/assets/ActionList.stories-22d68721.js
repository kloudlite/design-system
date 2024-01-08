import{a as V,j as c}from"./jsx-runtime-29545a09.js";import{r as o,R as _}from"./index-76fb7be0.js";import{c as C}from"./utils-e72801fa.js";import{m as k}from"./motion-e61dcc0d.js";import{L as M}from"./index-858efc6d.js";import{J as R}from"./context-494caab9.js";import"./_commonjsHelpers-de833af9.js";import"./index-e131923d.js";import"./use-force-update-d6d40804.js";let A=o.forwardRef((t,l)=>{let{size:r,color:e,alt:s,children:n,mirrored:u,weight:m,style:i}=t,{alt:a,children:d,color:p,mirrored:x,size:b,weight:g,style:w}=o.useContext(R),f=r||b||32,v=e||p||"currentColor";return o.createElement("svg",{width:f,height:f,strokeWidth:m||g||2,ref:l,xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 33 32",...t,transform:(t.transform||"")+(u||x?" scale(-1, 1)":""),style:{...w,...i,...t.style},color:v},a||s?o.createElement("title",null,s||a):null,o.createElement("path",{fill:v,fillRule:"evenodd",d:"M17.884 10.402a1.014 1.014 0 0 1 0-1.423l5.623-5.69a.986.986 0 0 1 1.44.035l5.59 5.655c.387.393.387 1.03 0 1.423a.986.986 0 0 1-1.407 0l-3.919-3.967V28a1 1 0 1 1-2 0V6.434l-3.921 3.968a.986.986 0 0 1-1.406 0ZM9.777 4a1 1 0 1 0-2 0v21.552l-3.908-3.954a.986.986 0 0 0-1.405 0 1.014 1.014 0 0 0 0 1.423L7.976 28.6c.116.154.275.273.46.34a.986.986 0 0 0 1.056-.229l5.623-5.69a1.014 1.014 0 0 0 0-1.423.986.986 0 0 0-1.405 0l-3.933 3.98V4Z",clipRule:"evenodd"}),n||d)});A.displayName="ArrowsDownUp";let z=o.forwardRef((t,l)=>{let{size:r,color:e,alt:s,children:n,mirrored:u,weight:m,style:i}=t,{alt:a,children:d,color:p,mirrored:x,size:b,weight:g,style:w}=o.useContext(R),f=r||b||32,v=e||p||"currentColor";return o.createElement("svg",{width:f,height:f,strokeWidth:m||g||2,ref:l,xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 33 32",...t,transform:(t.transform||"")+(u||x?" scale(-1, 1)":""),style:{...w,...i,...t.style},color:v},a||s?o.createElement("title",null,s||a):null,o.createElement("path",{stroke:v,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:m||g||2,d:"m28.5 8-16 16-8-8"}),n||d)});z.displayName="Check";const h=({children:t,disabled:l=!1,critical:r=!1,active:e=!1,onClick:s=()=>{},to:n="",prefix:u,suffix:m,LinkComponent:i="div",showIndicator:a=!0})=>{let d=i;return n&&(i==="div"?d="a":d=i),V("div",{className:C("w-full flex flex-row gap-x-md"),children:[e&&a&&c(k.div,{layoutId:"line",className:"w-sm bg-icon-primary rounded"}),!e&&a&&c(k.div,{layoutId:"line_1",className:"w-sm bg-transparent rounded"}),V(d,{...d==="a"?{href:n}:{to:n},className:C("transition-all w-[inherit] rounded border flex gap-lg items-center justify-between cursor-pointer outline-none border-none py-lg ring-offset-1 focus-visible:ring-2 focus:ring-border-focus",{"px-2xl":a,"text-text-soft hover:text-text-default":!e&&!l&&!r&&a,"text-text-primary bodyMd-medium":e&&a,bodyMd:!e||!a,"text-text-default px-xl":!a,"text-text-disabled":l,"text-text-critical hover:text-text-on-primary active:text-text-on-primary":r},{"pointer-events-none":l},{"bg-none hover:bg-surface-basic-hovered active:bg-surface-basic-pressed":!e&&!l&&!r,"bg-none hover:bg-surface-critical-hovered active:bg-surface-critical-pressed":!e&&!l&&r,"bg-none":l,"bg-surface-basic-active":!r&&e}),onClick:r?null:s,children:[V("div",{className:"flex flex-row items-center gap-lg",children:[!!u&&_.cloneElement(u,{size:16,color:"currentColor"}),t]}),m&&_.cloneElement(m,{size:16,color:"currentColor"})]})]})},j=({children:t,prefix:l,suffix:r,value:e,to:s,disabled:n,critical:u})=>c(h,{prefix:l,suffix:r,value:e,to:s,disabled:n,critical:u,children:t}),q=({children:t,value:l,onChange:r=()=>{},LinkComponent:e,showIndicator:s=!0,onClick:n,className:u})=>{const m={children:t,value:l,onChange:r,LinkComponent:e};let i=o.useId();return i=o.useMemo(()=>i,[m]),c("div",{className:C("flex flex-col gap-y-md",u),children:c(M,{id:i,children:_.Children.map(t,a=>c(h,{...a.props,LinkComponent:e,onClick:d=>{var p;r&&r((p=a.props)==null?void 0:p.value),n==null||n(d,a.props.to)},active:a.props.value===l,showIndicator:s}))})})},B={Root:q,Item:j},L=B;try{h.displayName="Item",h.__docgenInfo={description:"",displayName:"Item",props:{LinkComponent:{defaultValue:{value:"div"},description:"",name:"LinkComponent",required:!1,type:{name:"any"}},active:{defaultValue:{value:"false"},description:"",name:"active",required:!1,type:{name:"boolean"}},onClick:{defaultValue:{value:"() => {}"},description:"",name:"onClick",required:!1,type:{name:"((e: Event) => void)"}},showIndicator:{defaultValue:{value:"true"},description:"",name:"showIndicator",required:!1,type:{name:"boolean"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},critical:{defaultValue:{value:"false"},description:"",name:"critical",required:!1,type:{name:"boolean"}},to:{defaultValue:{value:""},description:"",name:"to",required:!1,type:{name:"string"}},prefix:{defaultValue:null,description:"",name:"prefix",required:!1,type:{name:"Element"}},suffix:{defaultValue:null,description:"",name:"suffix",required:!1,type:{name:"Element"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string"}}}}}catch{}try{q.displayName="Root",q.__docgenInfo={description:"",displayName:"Root",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string"}},onChange:{defaultValue:{value:"() => {}"},description:"",name:"onChange",required:!1,type:{name:"((value: string) => void)"}},onClick:{defaultValue:{value:"() => {}"},description:"",name:"onClick",required:!1,type:{name:"((e: Event, route: string) => void)"}},LinkComponent:{defaultValue:{value:"div"},description:"",name:"LinkComponent",required:!1,type:{name:"any"}},showIndicator:{defaultValue:{value:"true"},description:"",name:"showIndicator",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const T={title:"Atoms/ActionList",component:L.Root,tags:["autodocs"],argTypes:{}},D=()=>{const[t,l]=o.useState("general"),r=[{label:"General",value:"general",LeftIconComp:A,RightIconComp:z,href:"#"},{label:"Invoices",value:"invoices",href:"#"},{label:"Billing",value:"billing",href:"#"},{label:"User Management",value:"usermanagement",href:"#"},{label:"Security & Privacy",value:"securityandprivacy",href:"#"}];return c("div",{children:c(L.Root,{value:t,onChange:l,children:r.map(e=>c(L.Item,{value:e.value,children:e.label},e.value))})})},y={render:()=>c(D,{})};var E,N,I;y.parameters={...y.parameters,docs:{...(E=y.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <ActionListHook />
}`,...(I=(N=y.parameters)==null?void 0:N.docs)==null?void 0:I.source}}};const $=["DangerActionList"];export{y as DangerActionList,$ as __namedExportsOrder,T as default};
