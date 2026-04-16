import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as o,R as me}from"./index.DeO6U63H.js";import{u as he,a as xe,I as fe,G as N,r as ye,b as be,c as M,d as D,e as ve,f as we}from"./InlineSearch.D3yfU0SU.js";import{G as A}from"./button.Cr0WWE4a.js";import{G as ke}from"./icon-button.DBoMusi4.js";import{G as O}from"./icon.Ckm5lwdV.js";import{u as je}from"./useViewSettings.Cs_s925c.js";import{u as Ce}from"./useSearch.DplLbY9k.js";import"./index.DrlE4MoQ.js";import"./extract-props.mAATCLkF.js";import"./SearchInput.Bod44FQ-.js";const Te=["title","scale","category","userType","status"];function Se(d){switch(d){case"interaction":return"information";case"task":return"sunset";case"page":return"pasture";case"flow":return"lilac";case"product":return"prairie";default:return"dawn"}}function Ne(d){switch(d){case"content-layout":return"sky";case"feedback-and-alerts":return"prairie";case"structure-and-navigation":return"lilac";case"inputs-and-actions":return"dawn";case"forms":return"pasture";case"technical":return"default";case"utilities":return"default";default:return"default"}}function j(d){const f=d.replace(/-/g," ");return f.charAt(0).toUpperCase()+f.slice(1)}function C(d){return d.charAt(0).toUpperCase()+d.slice(1)}function T(d){return d==="both"?"Citizen and worker":d.charAt(0).toUpperCase()+d.slice(1)}function Me({examples:d}){const[f,h]=o.useState(!1),[re,te]=o.useState(!1),[z,R]=o.useState(""),$=o.useRef(null),q=o.useRef(null),W=o.useRef(null),E=o.useRef(null);o.useEffect(()=>{const e=q.current;if(!e)return;const a=new IntersectionObserver(([s])=>{te(!s.isIntersecting)},{threshold:0});return a.observe(e),()=>a.disconnect()},[]);const _={category:[],scale:[],userType:[]},[m,g]=o.useState(_),[n,y]=o.useState(_),[P,se]=o.useState(!1);o.useEffect(()=>{if(P)return;const e=new URLSearchParams(window.location.search),a={category:e.get("category")?.split(",").filter(Boolean)??[],scale:e.get("scale")?.split(",").filter(Boolean)??[],userType:e.get("userType")?.split(",").filter(Boolean)??[]};(a.category.length||a.scale.length||a.userType.length)&&(g(a),y(a)),se(!0)},[P]);const{sortConfig:i,setSortConfig:F,clearSort:Q}=he(),I=xe($,780),{search:H,isLoading:le,error:oe}=Ce(),{viewSettings:p,setLayout:S}=je({pageKey:"examples",defaultLayout:"card",defaultColumns:Te});o.useEffect(()=>{const e=W.current;if(!e)return;e.setAttribute("version","2");const a=s=>{const t=s.detail.sorts;F({primary:t[0]?{key:t[0].column,direction:t[0].direction}:null,secondary:t[1]?{key:t[1].column,direction:t[1].direction}:null})};return e.addEventListener("_multisort",a),()=>e.removeEventListener("_multisort",a)},[F,p.layout]),o.useEffect(()=>{const e=E.current;if(!e)return;const a=s=>{const l=s.detail;l.tab===1?S("card"):l.tab===2&&S("list")};return e.addEventListener("_change",a),()=>e.removeEventListener("_change",a)},[S]);const[G,K]=o.useState(new Set),x=o.useMemo(()=>{const e=[...new Set(d.flatMap(t=>t.data.categories))].sort((t,c)=>t==="forms"?-1:c==="forms"?1:t.localeCompare(c)),a=[...new Set(d.map(t=>t.data.scale))].sort((t,c)=>t==="product"?1:c==="product"?-1:t.localeCompare(c)),s=[...new Set(d.map(t=>t.data.userType))].sort((t,c)=>t==="both"?1:c==="both"?-1:t.localeCompare(c)),l=s.filter(t=>t!=="both");return{categories:e,scales:a,userTypes:l,allUserTypes:s}},[d]),ie=o.useMemo(()=>{const e=[];return x.scales.forEach(a=>{e.push({id:`scale:${a}`,label:C(a),group:"Scale",filterType:"scale",filterValue:a,active:n.scale.includes(a)})}),x.categories.forEach(a=>{e.push({id:`category:${a}`,label:j(a),group:"Category",filterType:"category",filterValue:a,active:n.category.includes(a)})}),x.allUserTypes.forEach(a=>{e.push({id:`userType:${a}`,label:T(a),group:"User Type",filterType:"userType",filterValue:a,active:a==="both"?n.userType.includes("citizen")&&n.userType.includes("worker"):n.userType.includes(a)})}),e},[x,n]),ne=o.useCallback(e=>{const a=e.filterType;if(a==="userType"&&e.filterValue==="both"){y(s=>{const l=s.userType.includes("citizen")&&s.userType.includes("worker");return{...s,userType:l?s.userType.filter(t=>t!=="citizen"&&t!=="worker"):[...new Set([...s.userType,"citizen","worker"])]}});return}y(s=>{const l=s[a];return{...s,[a]:l.includes(e.filterValue)?l.filter(t=>t!==e.filterValue):[...l,e.filterValue]}})},[]),U=o.useMemo(()=>p.layout==="list"?"list":"card",[p.layout]),J=o.useRef(!1);o.useEffect(()=>{const e=I&&!J.current;J.current=I,e&&p.layout==="list"&&(S("card"),E.current&&E.current.setAttribute("initialtab","1"))},[I,p.layout,S]);const b=o.useMemo(()=>{let e=d;if(z.trim()){const a=H(z,"example"),s=new Set(a.map(t=>t.slug)),l=new Map(a.map((t,c)=>[t.slug,c]));e=e.filter(t=>s.has(t.slug)).sort((t,c)=>(l.get(t.slug)??0)-(l.get(c.slug)??0))}return n.category.length>0&&(e=e.filter(a=>a.data.categories.some(s=>n.category.includes(s)))),n.scale.length>0&&(e=e.filter(a=>n.scale.includes(a.data.scale))),n.userType.length>0&&(e=e.filter(a=>a.data.userType==="both"?n.userType.includes("citizen")||n.userType.includes("worker"):n.userType.includes(a.data.userType))),i.primary&&(e=[...e].sort((a,s)=>{const l=i.primary.key,t=i.primary.direction==="asc"?1:-1;let c,u;switch(l){case"title":c=a.data.title,u=s.data.title;break;case"category":c=a.data.categories[0]||"",u=s.data.categories[0]||"";break;case"scale":c=a.data.scale,u=s.data.scale;break;case"userType":c=a.data.userType,u=s.data.userType;break;default:c="",u=""}const ae=c.localeCompare(u);if(ae!==0)return ae*t;if(i.secondary){const ge=i.secondary.key,ue=i.secondary.direction==="asc"?1:-1;let w,k;switch(ge){case"title":w=a.data.title,k=s.data.title;break;case"category":w=a.data.categories[0]||"",k=s.data.categories[0]||"";break;case"scale":w=a.data.scale,k=s.data.scale;break;case"userType":w=a.data.userType,k=s.data.userType;break;default:w="",k=""}return w.localeCompare(k)*ue}return 0})),e},[d,n,i,z,H]),v=o.useMemo(()=>{if(!p.groupBy)return null;const e=[],a=new Map;return b.forEach(l=>{let t;switch(p.groupBy){case"category":t=l.data.categories[0]||"Uncategorized";break;case"scale":t=l.data.scale;break;case"userType":t=l.data.userType;break;default:t="Unknown"}a.has(t)||a.set(t,[]),a.get(t).push(l)}),Array.from(a.keys()).sort().forEach(l=>{let t;switch(p.groupBy){case"category":t=j(l);break;case"scale":t=C(l);break;case"userType":t=T(l);break;default:t=l}e.push({key:l,label:t,examples:a.get(l)})}),e},[b,p.groupBy]);o.useEffect(()=>{v&&K(new Set(v.map(e=>e.key)))},[p.groupBy]);const X=o.useCallback(e=>{K(a=>{const s=new Set(a);return s.has(e)?s.delete(e):s.add(e),s})},[]);o.useCallback((e,a)=>{g(s=>({...s,[e]:s[e].includes(a)?s[e].filter(l=>l!==a):[...s[e],a]}))},[]);const ce=o.useCallback(()=>{y(m),h(!1)},[m]),Y=o.useCallback(()=>{const e={category:[],scale:[],userType:[]};g(e),y(e)},[]),V=o.useCallback((e,a)=>{y(s=>({...s,[e]:s[e].filter(l=>l!==a)}))},[]),de=o.useCallback(()=>{R(""),Y(),Q()},[Y,Q]),Z=o.useCallback(e=>r.jsx("a",{href:`/examples/${e.slug}`,className:"example-card-link",children:r.jsxs("div",{className:"example-card-content",children:[e.data.previewImage?r.jsx("img",{className:"example-card-thumbnail",src:e.data.previewImage,alt:"",loading:"lazy"}):r.jsx("div",{className:"example-card-thumbnail","aria-hidden":"true"}),r.jsx("h3",{className:"example-card-title",children:e.data.title}),e.body&&(()=>{const a=e.body.split(`
`)[0].replace(/^#+\s*/,"");return r.jsxs("p",{className:"example-card-description",children:[a.substring(0,120),a.length>120?"...":""]})})(),r.jsxs("div",{className:"example-card-badges",children:[r.jsx("goa-badge",{version:"2",type:"lilac",content:C(e.data.scale),emphasis:"subtle",icon:"false"}),e.data.categories.map(a=>r.jsx("goa-badge",{version:"2",type:"sunset",content:j(a),emphasis:"subtle",icon:"false"},a)),(e.data.userType==="both"?["citizen","worker"]:[T(e.data.userType)]).map(a=>r.jsx("goa-badge",{version:"2",type:"sky",content:a,emphasis:"subtle",icon:"false"},a)),e.data.tags?.slice(0,3).map(a=>r.jsx("goa-badge",{version:"2",type:"default",content:a.replace(/-/g," "),emphasis:"subtle",icon:"false"},a))]})]})},e.slug),[]),ee=o.useCallback(e=>r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("a",{href:`/examples/${e.slug}`,className:"example-table-link",children:e.data.title})}),r.jsx("td",{children:r.jsx("div",{className:"example-categories",children:e.data.categories.map(a=>r.jsx("goa-badge",{version:"2",type:Ne(a),content:j(a),emphasis:"subtle",icon:"false"},a))})}),r.jsx("td",{children:r.jsx("goa-badge",{version:"2",type:Se(e.data.scale),content:C(e.data.scale),emphasis:"subtle",icon:"false"})}),r.jsx("td",{children:T(e.data.userType)}),r.jsx("td",{children:r.jsx("div",{className:"example-tags",children:e.data.tags?.slice(0,3).map(a=>r.jsx("goa-badge",{version:"2",type:"default",content:a,emphasis:"subtle",icon:"false"},a))})})]},e.slug),[]),L=o.useCallback(e=>i.primary?.key===e?i.primary.direction:i.secondary?.key===e?i.secondary.direction:"none",[i]),B=o.useCallback(e=>{if(!(!i.primary||!i.secondary)){if(i.primary.key===e)return"1";if(i.secondary.key===e)return"2"}},[i]),pe=n.category.length>0||n.scale.length>0||n.userType.length>0;return r.jsxs("div",{className:"examples-grid",ref:$,children:[r.jsx("div",{ref:q,className:"examples-sentinel","aria-hidden":"true"}),r.jsxs("div",{className:`examples-toolbar ${re?"examples-toolbar--sticky":""}`,children:[r.jsx("div",{className:"examples-search-section",children:r.jsx(fe,{value:z,onChange:R,onClear:()=>R(""),placeholder:"Search or type / to filter...",commands:ie,onCommandSelect:ne,isLoading:le,error:oe})}),r.jsxs("div",{className:"examples-toolbar-actions",children:[r.jsx("div",{className:"view-toggle-wrapper",children:r.jsxs("goa-tabs",{ref:E,version:"2",variant:"segmented",initialTab:U==="card"?1:2,orientation:"horizontal",children:[r.jsx("goa-tab",{heading:"Grid",children:r.jsx("span",{})}),r.jsx("goa-tab",{heading:"List",children:r.jsx("span",{})})]})}),r.jsx("span",{className:"filter-btn-desktop",children:r.jsx(A,{type:"secondary",leadingIcon:"filter-lines",size:"compact",onClick:()=>{f?h(!1):(g(n),h(!0))},children:"Filters"})}),r.jsx("span",{className:"filter-btn-mobile",children:r.jsx(ke,{icon:"filter-lines",size:"medium",variant:"dark",onClick:()=>{f?h(!1):(g(n),h(!0))}})})]})]}),pe&&r.jsxs("div",{className:"examples-chips",children:[r.jsx(O,{type:"filter-lines",size:"small",fillColor:"var(--goa-color-text-secondary)"}),i.primary&&r.jsx(N,{content:i.primary.key,leadingIcon:i.primary.direction==="asc"?"arrow-up":"arrow-down",secondaryText:i.secondary?"1st":void 0,onClick:()=>F({primary:i.secondary,secondary:null})}),i.secondary&&r.jsx(N,{content:i.secondary.key,leadingIcon:i.secondary.direction==="asc"?"arrow-up":"arrow-down",secondaryText:"2nd",onClick:()=>F(e=>({...e,secondary:null}))}),n.category.map(e=>r.jsx(N,{content:j(e),onClick:()=>V("category",e)},`cat-${e}`)),n.scale.map(e=>r.jsx(N,{content:C(e),onClick:()=>V("scale",e)},`scale-${e}`)),n.userType.map(e=>r.jsx(N,{content:T(e),onClick:()=>V("userType",e)},`ut-${e}`)),r.jsx("a",{href:"#",className:"clear-all-link",onClick:e=>{e.preventDefault(),de()},children:"Clear all"})]}),r.jsxs("p",{className:"examples-count",children:[b.length," example",b.length!==1?"s":""]}),U==="list"&&r.jsxs("div",{className:"examples-table-wrapper",onScroll:e=>{const a=e.currentTarget,s=a.querySelector("goa-table");if(!s)return;const l=parseFloat(getComputedStyle(s).marginLeft)||0,t=a.scrollWidth-a.clientWidth,c=a.querySelector(".examples-table-scroll-shadow-left"),u=a.querySelector(".examples-table-scroll-shadow-right");c&&(c.style.opacity=a.scrollLeft>l?"1":"0"),u&&(u.style.opacity=a.scrollLeft<t-l?"1":"0")},ref:e=>{e&&requestAnimationFrame(()=>{const a=e.querySelector("goa-table");if(!a)return;const s=parseFloat(getComputedStyle(a).marginLeft)||0,l=e.scrollWidth-e.clientWidth,t=e.querySelector(".examples-table-scroll-shadow-right");t&&l>s&&(t.style.opacity="1")})},children:[r.jsx("div",{className:"examples-table-scroll-shadow-left","aria-hidden":"true"}),r.jsx("goa-table",{ref:W,version:"2",width:"100%",variant:"normal","sort-mode":"multi",children:r.jsxs("table",{style:{width:"100%"},children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{style:{width:"320px"},children:r.jsx("goa-table-sort-header",{version:"2",name:"title",direction:L("title"),"sort-order":B("title"),children:"Name"})}),r.jsx("th",{children:r.jsx("goa-table-sort-header",{version:"2",name:"category",direction:L("category"),"sort-order":B("category"),children:"Category"})}),r.jsx("th",{children:r.jsx("goa-table-sort-header",{version:"2",name:"scale",direction:L("scale"),"sort-order":B("scale"),children:"Scale"})}),r.jsx("th",{style:{minWidth:"140px"},children:r.jsx("goa-table-sort-header",{version:"2",name:"userType",direction:L("userType"),"sort-order":B("userType"),children:"User Type"})}),r.jsx("th",{children:"Tags"})]})}),r.jsx("tbody",{children:v?v.map(e=>r.jsxs(me.Fragment,{children:[r.jsx("tr",{className:"examples-group-row",onClick:()=>X(e.key),children:r.jsx("td",{colSpan:5,children:r.jsxs("div",{className:"examples-group-header",children:[r.jsx(O,{type:G.has(e.key)?"chevron-down":"chevron-forward",size:"small"}),r.jsx("strong",{children:e.label}),r.jsx("goa-badge",{version:"2",type:"default",content:String(e.examples.length),emphasis:"subtle"})]})})}),G.has(e.key)&&e.examples.map(ee)]},e.key)):b.map(ee)})]})}),r.jsx("div",{className:"examples-table-scroll-shadow-right","aria-hidden":"true"})]}),U==="card"&&r.jsx("div",{className:"examples-card-view",children:v?v.map(e=>r.jsxs("div",{className:"examples-group",children:[r.jsxs("button",{className:"examples-group-btn",onClick:()=>X(e.key),children:[r.jsx(O,{type:G.has(e.key)?"chevron-down":"chevron-forward",size:"small"}),r.jsx("strong",{children:e.label}),r.jsx("goa-badge",{version:"2",type:"dark",content:String(e.examples.length),emphasis:"subtle"})]}),G.has(e.key)&&r.jsx("div",{className:"examples-card-grid",children:e.examples.map(Z)})]},e.key)):r.jsx("div",{className:"examples-card-grid",children:b.map(Z)})}),typeof document<"u"&&document.getElementById("push-drawer-portal")&&ye.createPortal(r.jsx(be,{heading:"Filter examples",open:f,width:"300px",onClose:()=>h(!1),actions:r.jsxs(we,{alignment:"start",gap:"compact",children:[r.jsx(A,{type:"primary",size:"compact",onClick:ce,children:"Apply filters"}),r.jsx(A,{type:"tertiary",size:"compact",onClick:()=>h(!1),children:"Cancel"})]}),children:r.jsxs("div",{className:"filter-drawer-content",children:[r.jsxs("div",{className:"filter-group",children:[r.jsxs("div",{className:"filter-group-label",children:["Scale"," ",r.jsx("span",{className:"filter-swatch",style:{background:"#efe2fb",borderColor:"#e2d2fd"}})]}),r.jsx(M,{name:"scale",size:"compact",value:m.scale,onChange:e=>g(a=>({...a,scale:e.value})),children:x.scales.map(e=>r.jsx(D,{name:e,value:e,text:C(e),size:"compact"},e))})]}),r.jsxs("div",{className:"filter-group",children:[r.jsxs("div",{className:"filter-group-label",children:["Category"," ",r.jsx("span",{className:"filter-swatch",style:{background:"#fcefd5",borderColor:"#f5ddad"}})]}),r.jsx(M,{name:"category",size:"compact",value:m.category,onChange:e=>g(a=>({...a,category:e.value})),children:x.categories.map(e=>r.jsx(D,{name:e,value:e,text:j(e),size:"compact"},e))})]}),r.jsxs("div",{className:"filter-group",children:[r.jsxs("div",{className:"filter-group-label",children:["User type"," ",r.jsx("span",{className:"filter-swatch",style:{background:"#e2f9f8",borderColor:"#bff0ee"}})]}),r.jsx(M,{name:"userType",size:"compact",value:m.userType,onChange:e=>g(a=>({...a,userType:e.value})),children:x.userTypes.map(e=>r.jsx(D,{name:e,value:e,text:T(e),size:"compact"},e))})]}),(m.category.length>0||m.scale.length>0||m.userType.length>0)&&r.jsxs(r.Fragment,{children:[r.jsx(ve,{}),r.jsx(A,{type:"tertiary",size:"compact",onClick:()=>g({category:[],scale:[],userType:[]}),children:"Clear all filters"})]})]})}),document.getElementById("push-drawer-portal")),r.jsx("style",{children:`
        .examples-grid {
          max-width: 100%;
          container-type: inline-size;
        }

        /* Sentinel for sticky detection - invisible marker */
        .examples-sentinel {
          height: 1px;
          margin-bottom: -1px;
        }

        /* Toolbar - single row layout */
        .examples-toolbar {
          position: sticky;
          top: 0;
          z-index: 1;
          background: var(--goa-color-greyscale-white);
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: var(--goa-space-m);
          padding: var(--goa-space-m) 0 var(--goa-space-xs);
          transition: padding 0.15s ease;
        }

        /* When sticky - add shadow */
        .examples-toolbar--sticky {
          padding: var(--goa-space-s) 0 var(--goa-space-xs);
          margin-bottom: 0;
          background: transparent;
        }

        .examples-toolbar--sticky::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: calc(-1 * var(--card-padding-h, var(--goa-space-2xl)));
          right: calc(-1 * var(--card-padding-h, var(--goa-space-2xl)));
          background: var(--goa-color-greyscale-white);
          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
          z-index: -1;
        }

        .examples-search-section {
          flex: 1;
          min-width: 200px;
        }

        /* Toolbar actions */
        .examples-toolbar-actions {
          display: flex;
          align-items: flex-start;
          gap: var(--goa-space-m);
          min-height: 40px;
        }

        /* Narrow container: stack toolbar vertically */
        @container (max-width: 640px) {
          .examples-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .examples-search-section {
            min-width: unset;
          }

          .examples-toolbar-actions {
            align-self: flex-start;
          }
        }

        /* Filter button: desktop shows text, mobile shows icon-only */
        .filter-btn-mobile { display: none; }

        @media (max-width: 623px) {
          .filter-btn-desktop { display: none; }
          .filter-btn-mobile { display: contents; }

          .examples-toolbar {
            flex-direction: row !important;
            align-items: flex-start !important;
          }

          .examples-search-section {
            min-width: 0 !important;
          }
        }

        /* View toggle wrapper - tabs used as segmented toggle, hide content area */
        .view-toggle-wrapper {
          overflow: hidden;
          max-height: 40px;
        }

        /* Filter chips */
        .examples-chips {
          display: flex;
          align-items: center;
          gap: var(--goa-space-s);
          flex-wrap: wrap;
          padding-top: var(--goa-space-2xs);
          margin-bottom: var(--goa-space-l);
        }

        .examples-count {
          color: var(--goa-color-text-secondary);
          font: var(--goa-typography-body-s);
          margin-top: var(--goa-space-m);
          margin-bottom: var(--goa-space-m);
        }

        /* Horizontal scroll container for table - bleeds into card padding */
        /* TODO: Remove calc workaround when goa-table V2 gets box-sizing: border-box */
        .examples-table-wrapper {
          display: flex;
          align-items: stretch;
          overflow-x: auto;
          margin-left: calc(-1 * var(--card-padding-h, var(--goa-space-2xl)));
          margin-right: calc(-1 * var(--card-padding-h, var(--goa-space-2xl)));
        }

        .examples-table-wrapper > * {
          flex-grow: 1;
          min-width: max-content;
        }

        .examples-table-wrapper goa-table {
          width: calc(100% - 2px) !important;
          margin-left: var(--card-padding-h, var(--goa-space-2xl));
          margin-right: var(--card-padding-h, var(--goa-space-2xl));
        }

        .examples-table-scroll-shadow-left,
        .examples-table-scroll-shadow-right {
          position: sticky;
          width: 8px;
          min-width: 8px;
          flex-shrink: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.15s ease;
        }

        .examples-table-scroll-shadow-left {
          left: 0;
          margin-right: -8px;
          background: linear-gradient(to right, rgba(0, 0, 0, 0.08), transparent);
        }

        .examples-table-scroll-shadow-right {
          right: 0;
          margin-left: -8px;
          background: linear-gradient(to left, rgba(0, 0, 0, 0.08), transparent);
        }

        .examples-group-row {
          cursor: pointer;
          background-color: var(--goa-color-greyscale-100);
        }

        .examples-group-row:hover {
          background-color: var(--goa-color-greyscale-200);
        }

        .examples-group-header {
          display: flex;
          align-items: center;
          gap: var(--goa-space-s);
        }

        .example-table-link {
          color: var(--goa-color-interactive-default);
          text-decoration: underline;
        }

        .example-table-link:hover {
          text-decoration: none;
        }

        .example-category-badges {
          display: flex;
          flex-wrap: wrap;
          gap: var(--goa-space-xs);
        }

        .example-tags,
        .example-categories {
          display: flex;
          flex-wrap: wrap;
          gap: var(--goa-space-xs);
        }

        /* Card/Grid view */
        .examples-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          column-gap: var(--goa-space-l);
          row-gap: var(--goa-space-xl);
        }

        @media (max-width: 623px) {
          .examples-card-grid {
            grid-template-columns: 1fr;
          }

          .view-toggle-wrapper {
            display: none;
          }
        }

        .example-card-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .example-card-content {
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-s);
        }

        img.example-card-thumbnail {
          aspect-ratio: 16 / 10;
          width: 100%;
          object-fit: contain;
          border-radius: var(--goa-border-radius-m);
          border: 1px solid var(--goa-color-greyscale-200);
          margin-bottom: var(--goa-space-2xs);
        }

        div.example-card-thumbnail {
          aspect-ratio: 16 / 10;
          background: var(--goa-color-greyscale-200);
          border-radius: var(--goa-border-radius-m);
          margin-bottom: var(--goa-space-xs);
        }

        .example-card-title {
          margin: 0;
          font: var(--goa-typography-heading-xs);
          color: var(--goa-color-interactive-default);
          text-decoration: underline;
        }

        .example-card-title:hover {
          text-decoration: none;
        }

        .example-card-badges {
          display: flex;
          flex-wrap: wrap;
          gap: var(--goa-space-xs);
        }

        .example-card-description {
          margin: 0;
          font: var(--goa-typography-body-s);
          color: var(--goa-color-text-secondary);
          line-height: 1.5;
        }

        /* Groups */
        .examples-group {
          margin-bottom: var(--goa-space-l);
        }

        .examples-group-btn {
          display: flex;
          align-items: center;
          gap: var(--goa-space-s);
          background: none;
          border: none;
          padding: var(--goa-space-s) 0;
          cursor: pointer;
          width: 100%;
          text-align: left;
          font: var(--goa-typography-heading-xs);
        }

        .examples-group-btn:hover {
          background-color: var(--goa-color-greyscale-100);
        }

        .examples-group-btn:focus-visible {
          outline: 2px solid var(--goa-color-interactive-focus);
          outline-offset: 2px;
          border-radius: var(--goa-border-radius-s);
        }

        /* Clear all link */
        .clear-all-link {
          color: var(--goa-color-interactive-default);
          font: var(--goa-typography-body-s);
        }

        /* Filter drawer */
        .filter-drawer-content {
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-l);
        }

        .filter-checkboxes {
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-xs);
        }

        .filter-group-label {
          display: flex;
          align-items: center;
          gap: var(--goa-space-s);
          font: var(--goa-typography-body-m);
          font-weight: var(--goa-font-weight-bold);
          margin-bottom: var(--goa-space-s);
        }

        .filter-swatch {
          display: inline-block;
          width: 20px;
          height: 20px;
          border-radius: 3px;
          border: 1px solid;
          flex-shrink: 0;
        }

      `})]})}export{Me as ExamplesGrid};
