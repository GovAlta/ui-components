import{j as a}from"./jsx-runtime.u17CrQMm.js";import{r as s,R as ye}from"./index.BAnu8Lhe.js";import{w as V}from"./base-url.BWpsCVTr.js";import{u as xe,a as be,I as ve,G as E,b as M,r as we,c as ke,d as X,e as Y,f as je}from"./InlineSearch.BfDZC4vk.js";import{G as T}from"./button.DBbiOMj3.js";import{G as Ce}from"./button-group.29nnKdBO.js";import{G as Z}from"./form-item.CfNn1Qwj.js";import{G as Se}from"./icon-button.BYsS1Jba.js";import{G as R}from"./icon.mi703_xL.js";import{G as Ne}from"./table.D9Cnpc6D.js";import{G as Ge,a as ee}from"./tab.g1SijVhc.js";import"./workspace-layout-scroll-state.CwoYdGbs.js";import{u as Fe}from"./useViewSettings.DglULXV7.js";import{u as ze}from"./useSearch.Cf0r0cGh.js";const Ee={"app-header":"header",icon:"icons",input:"text-input","checkbox-list":"checkbox-group","circular-progress":"circular-progress-indicator","linear-progress":"linear-progress-indicator",notification:"notification-banner",skeleton:"skeleton-loader","radio-group":"radio","file-upload-input":"file-uploader","link-button":"link","page-block":"block"};function Te(i){const g=Ee[i]||i;return V(`/images/component-thumbnails/${g}.svg`)}const Be=["name","description","category","status"];function Ae(i){switch(i){case"stable":return"success";case"beta":return"information";case"experimental":return"warning";case"deprecated":return"emergency";default:return"information"}}function ae(i){switch(i){case"content-layout":return"sky";case"feedback-and-alerts":return"prairie";case"structure-and-navigation":return"lilac";case"inputs-and-actions":return"dawn";case"forms":return"pasture";case"technical":return"default";case"utilities":return"default";default:return"default"}}function x(i){const g=i.replace(/-/g," ");return g.charAt(0).toUpperCase()+g.slice(1)}function S(i){return i==="stable"?"Available":i.charAt(0).toUpperCase()+i.slice(1)}function Qe({components:i}){const[g,u]=s.useState(!1),[te,re]=s.useState(!1),[N,B]=s.useState(""),D=s.useRef(null),O=s.useRef(null);s.useEffect(()=>{const e=O.current;if(!e)return;const t=new IntersectionObserver(([r])=>{re(!r.isIntersecting)},{threshold:0});return t.observe(e),()=>t.disconnect()},[]);const[h,m]=s.useState({category:[],status:[]}),[l,b]=s.useState({category:[],status:[]}),[U,oe]=s.useState(!1);s.useEffect(()=>{if(U)return;const e=new URLSearchParams(window.location.search),t={category:e.get("category")?.split(",").filter(Boolean)??[],status:e.get("status")?.split(",").filter(Boolean)??[]};(t.category.length||t.status.length)&&(m(t),b(t)),oe(!0)},[U]);const{sortConfig:c,setSortConfig:G,clearSort:$}=xe(),A=be(D,624),{search:q,isLoading:se,error:ne}=ze(),{viewSettings:p,setLayout:v}=Fe({pageKey:"components",defaultLayout:"card",defaultColumns:Be}),ce=s.useCallback(e=>{const t=e.sorts;G({primary:t[0]?{key:t[0].column,direction:t[0].direction}:null,secondary:t[1]?{key:t[1].column,direction:t[1].direction}:null})},[G]),ie=s.useCallback(e=>{e.tab===1?v("card"):e.tab===2&&v("list")},[v]),[F,P]=s.useState(new Set),w=s.useMemo(()=>{const e=[...new Set(i.map(r=>r.data.category))].sort(),t=[...new Set(i.map(r=>r.data.status))].sort();return{categories:e,statuses:t}},[i]),le=s.useMemo(()=>{const e=[];return w.categories.forEach(t=>{e.push({id:`category:${t}`,label:x(t),group:"Category",filterType:"category",filterValue:t,active:l.category.includes(t)})}),w.statuses.forEach(t=>{e.push({id:`status:${t}`,label:S(t),group:"Status",filterType:"status",filterValue:t,active:l.status.includes(t)})}),e},[w,l]),de=s.useCallback(e=>{const t=e.filterType;b(r=>{const n=r[t];return{...r,[t]:n.includes(e.filterValue)?n.filter(o=>o!==e.filterValue):[...n,e.filterValue]}})},[]),z=s.useMemo(()=>p.layout==="list"?"list":"card",[p.layout]),W=s.useRef(!1);s.useEffect(()=>{const e=A&&!W.current;W.current=A,e&&p.layout==="list"&&v("card")},[A,p.layout,v]);const f=s.useMemo(()=>{let e=i;if(N.trim()){const t=q(N,"component"),r=new Set(t.map(o=>o.slug)),n=new Map(t.map((o,d)=>[o.slug,d]));e=e.filter(o=>r.has(o.slug)).sort((o,d)=>(n.get(o.slug)??0)-(n.get(d.slug)??0))}return l.category.length>0&&(e=e.filter(t=>l.category.includes(t.data.category))),l.status.length>0&&(e=e.filter(t=>l.status.includes(t.data.status))),c.primary&&(e=[...e].sort((t,r)=>{const n=c.primary.key;let o,d;switch(n){case"name":o=t.data.name,d=r.data.name;break;case"category":o=t.data.category,d=r.data.category;break;case"status":o=t.data.status,d=r.data.status;break;default:o="",d=""}const k=o.localeCompare(d),ue=c.primary.direction==="asc"?1:-1;if(k!==0)return k*ue;if(c.secondary){const he=c.secondary.key;let j,C;switch(he){case"name":j=t.data.name,C=r.data.name;break;case"category":j=t.data.category,C=r.data.category;break;case"status":j=t.data.status,C=r.data.status;break;default:j="",C=""}const fe=c.secondary.direction==="asc"?1:-1;return j.localeCompare(C)*fe}return 0})),e},[i,l,c,N,q]),y=s.useMemo(()=>{if(!p.groupBy)return null;const e=[],t=new Map;return f.forEach(n=>{let o;switch(p.groupBy){case"category":o=n.data.category;break;case"status":o=n.data.status;break;default:o="Unknown"}t.has(o)||t.set(o,[]),t.get(o).push(n)}),Array.from(t.keys()).sort().forEach(n=>{let o;switch(p.groupBy){case"category":o=x(n);break;case"status":o=S(n);break;default:o=n}e.push({key:n,label:o,components:t.get(n)})}),e},[f,p.groupBy]);s.useEffect(()=>{y&&P(new Set(y.map(e=>e.key)))},[p.groupBy]);const H=s.useCallback(e=>{P(t=>{const r=new Set(t);return r.has(e)?r.delete(e):r.add(e),r})},[]);s.useCallback((e,t)=>{m(r=>({...r,[e]:r[e].includes(t)?r[e].filter(n=>n!==t):[...r[e],t]}))},[]);const pe=s.useCallback(()=>{b(h),u(!1)},[h]),_=s.useCallback(()=>{const e={category:[],status:[]};m(e),b(e)},[]),Q=s.useCallback((e,t)=>{b(r=>({...r,[e]:r[e].filter(n=>n!==t)}))},[]),ge=s.useCallback(()=>{B(""),_(),$()},[_,$]),I=s.useCallback(e=>c.primary?.key===e?c.primary.direction:c.secondary?.key===e?c.secondary.direction:"none",[c]),L=s.useCallback(e=>{if(!(!c.primary||!c.secondary)){if(c.primary.key===e)return 1;if(c.secondary.key===e)return 2}},[c]),K=s.useCallback(e=>a.jsx("a",{href:V(`/components/${e.slug}`),className:"component-card-link",children:a.jsxs("div",{className:"component-card-content",children:[a.jsxs("div",{className:"component-card-thumbnail","aria-hidden":"true",children:[a.jsx("img",{src:Te(e.slug),alt:"",loading:"lazy",onError:t=>{t.target.style.display="none";const r=t.target.nextElementSibling;r&&(r.style.display="flex")}}),a.jsx("span",{className:"component-card-thumbnail-fallback",style:{display:"none"},children:e.data.name})]}),a.jsx("h3",{className:"component-card-title",children:e.data.name}),e.data.description&&a.jsx("p",{className:"component-card-description",children:e.data.description}),a.jsx("div",{className:"component-card-badges",children:a.jsx("goa-badge",{type:ae(e.data.category),content:x(e.data.category),emphasis:"subtle",icon:"false"})})]})},e.slug),[]),J=s.useCallback(e=>a.jsxs("tr",{children:[a.jsx("td",{children:a.jsx("a",{href:V(`/components/${e.slug}`),className:"component-table-link",children:e.data.name})}),a.jsx("td",{className:"component-description-cell",children:e.data.description||"—"}),a.jsx("td",{children:a.jsx("goa-badge",{type:ae(e.data.category),content:x(e.data.category),emphasis:"subtle",icon:"false"})}),a.jsx("td",{children:a.jsx("goa-badge",{type:Ae(e.data.status),content:S(e.data.status),emphasis:"subtle",icon:"false"})})]},e.slug),[]),me=l.category.length>0||l.status.length>0;return a.jsxs("div",{className:"components-grid",ref:D,children:[a.jsx("div",{ref:O,className:"components-sentinel","aria-hidden":"true"}),a.jsxs("div",{className:`components-toolbar ${te?"components-toolbar--sticky":""}`,children:[a.jsx("div",{className:"components-search-section",children:a.jsx(ve,{value:N,onChange:B,onClear:()=>B(""),placeholder:"Search or type / to filter...",commands:le,onCommandSelect:de,isLoading:se,error:ne})}),a.jsxs("div",{className:"components-toolbar-actions",children:[a.jsx("div",{className:"view-toggle-wrapper",children:a.jsxs(Ge,{variant:"segmented",initialTab:z==="card"?1:2,orientation:"horizontal",navigation:"none",onChange:ie,children:[a.jsx(ee,{heading:"Grid",children:a.jsx("span",{})}),a.jsx(ee,{heading:"List",children:a.jsx("span",{})})]},z)}),a.jsx("span",{className:"filter-btn-desktop",children:a.jsx(T,{type:"secondary",leadingIcon:"filter-lines",size:"compact",onClick:()=>{g?u(!1):(m(l),u(!0))},children:"Filters"})}),a.jsx("span",{className:"filter-btn-mobile",children:a.jsx(Se,{icon:"filter-lines",size:"medium",variant:"dark",onClick:()=>{g?u(!1):(m(l),u(!0))}})})]})]}),me&&a.jsxs("div",{className:"components-chips",children:[a.jsx(R,{type:"filter-lines",size:"small",fillColor:"var(--goa-color-text-secondary)"}),c.primary&&a.jsx(E,{content:c.primary.key,leadingIcon:c.primary.direction==="asc"?"arrow-up":"arrow-down",secondaryText:c.secondary?"1st":void 0,onClick:()=>G({primary:c.secondary,secondary:null})}),c.secondary&&a.jsx(E,{content:c.secondary.key,leadingIcon:c.secondary.direction==="asc"?"arrow-up":"arrow-down",secondaryText:"2nd",onClick:()=>G(e=>({...e,secondary:null}))}),l.category.map(e=>a.jsx(E,{content:x(e),onClick:()=>Q("category",e)},`cat-${e}`)),l.status.map(e=>a.jsx(E,{content:S(e),onClick:()=>Q("status",e)},`status-${e}`)),a.jsx("a",{href:"#",className:"clear-all-link",onClick:e=>{e.preventDefault(),ge()},children:"Clear all"})]}),a.jsxs("p",{className:"components-count",children:[f.length," component",f.length!==1?"s":""]}),z==="list"&&a.jsxs("div",{className:"components-table-wrapper",onScroll:e=>{const t=e.currentTarget,r=t.querySelector("goa-table");if(!r)return;const n=parseFloat(getComputedStyle(r).marginLeft)||0,o=t.scrollWidth-t.clientWidth,d=t.querySelector(".components-table-scroll-shadow-left"),k=t.querySelector(".components-table-scroll-shadow-right");d&&(d.style.opacity=t.scrollLeft>n?"1":"0"),k&&(k.style.opacity=t.scrollLeft<o-n?"1":"0")},ref:e=>{e&&requestAnimationFrame(()=>{const t=e.querySelector("goa-table");if(!t)return;const r=parseFloat(getComputedStyle(t).marginLeft)||0,n=e.scrollWidth-e.clientWidth,o=e.querySelector(".components-table-scroll-shadow-right");o&&n>r&&(o.style.opacity="1")})},children:[a.jsx("div",{className:"components-table-scroll-shadow-left","aria-hidden":"true"}),a.jsxs(Ne,{width:"100%",variant:"normal",sortMode:"multi",onMultiSort:ce,children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{style:{width:"200px"},children:a.jsx(M,{name:"name",direction:I("name"),sortOrder:L("name"),children:"Name"})}),a.jsx("th",{children:"Description"}),a.jsx("th",{children:a.jsx(M,{name:"category",direction:I("category"),sortOrder:L("category"),children:"Category"})}),a.jsx("th",{children:a.jsx(M,{name:"status",direction:I("status"),sortOrder:L("status"),children:"Status"})})]})}),a.jsx("tbody",{children:y?y.map(e=>a.jsxs(ye.Fragment,{children:[a.jsx("tr",{className:"components-group-row",onClick:()=>H(e.key),children:a.jsx("td",{colSpan:4,children:a.jsxs("div",{className:"components-group-header",children:[a.jsx(R,{type:F.has(e.key)?"chevron-down":"chevron-forward",size:"small"}),a.jsx("strong",{children:e.label}),a.jsx("goa-badge",{type:"default",content:String(e.components.length),emphasis:"subtle"})]})})}),F.has(e.key)&&e.components.map(J)]},e.key)):f.map(J)})]}),a.jsx("div",{className:"components-table-scroll-shadow-right","aria-hidden":"true"})]}),z==="card"&&a.jsx("div",{className:"components-card-view",children:y?y.map(e=>a.jsxs("div",{className:"components-group",children:[a.jsxs("button",{className:"components-group-btn",onClick:()=>H(e.key),children:[a.jsx(R,{type:F.has(e.key)?"chevron-down":"chevron-forward",size:"small"}),a.jsx("strong",{children:e.label}),a.jsx("goa-badge",{type:"dark",content:String(e.components.length),emphasis:"subtle"})]}),F.has(e.key)&&a.jsx("div",{className:"components-card-grid",children:e.components.map(K)})]},e.key)):a.jsx("div",{className:"components-card-grid",children:f.map(K)})}),typeof document<"u"&&document.getElementById("push-drawer-portal")&&we.createPortal(a.jsx(ke,{heading:"Filter components",open:g,width:"300px",onClose:()=>u(!1),actions:a.jsxs(Ce,{alignment:"start",gap:"compact",children:[a.jsx(T,{type:"primary",size:"compact",onClick:pe,children:"Apply filters"}),a.jsx(T,{type:"tertiary",size:"compact",onClick:()=>u(!1),children:"Cancel"})]}),children:a.jsxs("div",{className:"filter-drawer-content",children:[a.jsx(Z,{label:"Category",children:a.jsx(X,{name:"category",size:"compact",value:h.category,onChange:e=>m(t=>({...t,category:e.value})),children:w.categories.map(e=>a.jsx(Y,{name:e,value:e,text:x(e),size:"compact"},e))})}),a.jsx(Z,{label:"Status",children:a.jsx(X,{name:"status",size:"compact",value:h.status,onChange:e=>m(t=>({...t,status:e.value})),children:w.statuses.map(e=>a.jsx(Y,{name:e,value:e,text:S(e),size:"compact"},e))})}),(h.category.length>0||h.status.length>0)&&a.jsxs(a.Fragment,{children:[a.jsx(je,{}),a.jsx(T,{type:"tertiary",size:"compact",onClick:()=>m({category:[],status:[]}),children:"Clear all filters"})]})]})}),document.getElementById("push-drawer-portal")),a.jsx("style",{children:`
        .components-grid {
          max-width: 100%;
          container-type: inline-size;
        }

        /* Sentinel for sticky detection - invisible marker */
        .components-sentinel {
          height: 1px;
          margin-bottom: -1px;
        }

        /* Toolbar - single row layout */
        .components-toolbar {
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
        .components-toolbar--sticky {
          padding: var(--goa-space-s) 0 var(--goa-space-xs);
          background: transparent;
          margin-bottom: 0;
        }

        .components-toolbar--sticky::before {
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

        .components-search-section {
          flex: 1;
          min-width: 200px;
        }

        /* Toolbar actions */
        .components-toolbar-actions {
          display: flex;
          align-items: flex-start;
          gap: var(--goa-space-m);
          min-height: 40px;
        }

        /* Narrow container: stack toolbar vertically */
        @container (max-width: 640px) {
          .components-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .components-search-section {
            min-width: unset;
          }

          .components-toolbar-actions {
            align-self: flex-start;
          }
        }

        /* Filter button: desktop shows text, mobile shows icon-only */
        .filter-btn-mobile { display: none; }

        @media (max-width: 623px) {
          .filter-btn-desktop { display: none; }
          .filter-btn-mobile { display: contents; }

          .components-toolbar {
            flex-direction: row !important;
            align-items: flex-start !important;
          }

          .components-search-section {
            min-width: 0 !important;
          }
        }

        /* View toggle wrapper */
        .view-toggle-wrapper {
          overflow: hidden;
          max-height: 40px;
          flex-shrink: 0;
        }

        /* Filter chips */
        .components-chips {
          display: flex;
          align-items: center;
          gap: var(--goa-space-s);
          flex-wrap: wrap;
          padding-top: var(--goa-space-2xs);
          margin-bottom: var(--goa-space-l);
        }

        .components-count {
          color: var(--goa-color-text-secondary);
          font: var(--goa-typography-body-s);
          margin-top: var(--goa-space-m);
          margin-bottom: var(--goa-space-m);
        }

        /* Table/List view */
        /* Horizontal scroll container for table - bleeds into card padding */
        .components-table-wrapper {
          display: flex;
          align-items: stretch;
          overflow-x: auto;
          margin-left: calc(-1 * var(--card-padding-h, var(--goa-space-2xl)));
          margin-right: calc(-1 * var(--card-padding-h, var(--goa-space-2xl)));
        }

        .components-table-wrapper > * {
          flex-grow: 1;
          min-width: max-content;
        }

        .components-table-wrapper goa-table {
          width: 100% !important;
          margin-left: var(--card-padding-h, var(--goa-space-2xl));
          margin-right: var(--card-padding-h, var(--goa-space-2xl));
        }

        /* Edge shadows for scroll indication */
        .components-table-scroll-shadow-left,
        .components-table-scroll-shadow-right {
          position: sticky;
          width: 8px;
          min-width: 8px;
          flex-shrink: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.15s ease;
        }

        .components-table-scroll-shadow-left {
          left: 0;
          margin-right: -8px;
          background: linear-gradient(to right, rgba(0, 0, 0, 0.08), transparent);
        }

        .components-table-scroll-shadow-right {
          right: 0;
          margin-left: -8px;
          background: linear-gradient(to left, rgba(0, 0, 0, 0.08), transparent);
        }

        .components-group-row {
          cursor: pointer;
          background-color: var(--goa-color-greyscale-100);
        }

        .components-group-row:hover {
          background-color: var(--goa-color-greyscale-200);
        }

        .components-group-header {
          display: flex;
          align-items: center;
          gap: var(--goa-space-s);
        }

        .component-table-link {
          color: var(--goa-color-interactive-default);
          text-decoration: underline;
          font-weight: var(--goa-font-weight-bold);
        }

        .component-table-link:hover {
          text-decoration: none;
        }

        .component-description-cell {
          max-width: 400px;
          color: var(--goa-color-text-secondary);
        }

        /* Card/Grid view */
        .components-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          column-gap: var(--goa-space-l);
          row-gap: var(--goa-space-xl);
        }

        @media (max-width: 623px) {
          .components-card-grid {
            grid-template-columns: 1fr;
          }

          .view-toggle-wrapper {
            display: none;
          }
        }

        .component-card-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .component-card-content {
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-s);
        }

        .component-card-thumbnail {
          aspect-ratio: 386 / 256;
          background: var(--goa-color-greyscale-200);
          border-radius: var(--goa-border-radius-m);
          margin-bottom: var(--goa-space-2xs);
          overflow: hidden;
        }

        .component-card-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .component-card-thumbnail-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font: var(--goa-typography-heading-s);
          color: var(--goa-color-text-secondary);
          text-align: center;
          padding: var(--goa-space-m);
        }

        .component-card-title {
          margin: 0;
          font: var(--goa-typography-heading-xs);
          color: var(--goa-color-interactive-default);
          text-decoration: underline;
        }

        .component-card-title:hover {
          text-decoration: none;
        }

        .component-card-description {
          margin: 0;
          font: var(--goa-typography-body-s);
          color: var(--goa-color-text-secondary);
          line-height: 1.5;
        }

        .component-card-badges {
          display: flex;
          flex-wrap: wrap;
          gap: var(--goa-space-xs);
        }

        /* Groups */
        .components-group {
          margin-bottom: var(--goa-space-l);
        }

        .components-group-btn {
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

        .components-group-btn:hover {
          background-color: var(--goa-color-greyscale-100);
        }

        .components-group-btn:focus-visible {
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

      `})]})}export{Qe as ComponentsGrid,Qe as default};
