import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as s,R as he}from"./index.DeO6U63H.js";import{w as V}from"./base-url.0hBDQzQd.js";import{u as fe,a as ye,I as xe,G as z,r as be,b as ve,c as Y,d as Z,e as we,f as ke}from"./InlineSearch.CxuIKXex.js";import{G as L}from"./button.Cr0WWE4a.js";import{G as ee}from"./form-item.yTOkS2er.js";import{G as je}from"./icon-button.CL-WfZ9v.js";import{G as M}from"./icon.Ckm5lwdV.js";import{u as Ce}from"./useViewSettings.Cs_s925c.js";import{u as Se}from"./useSearch.AFW86h4C.js";import"./index.DrlE4MoQ.js";import"./extract-props.mAATCLkF.js";import"./SearchInput.BoYaCWkO.js";const Ne={"app-header":"header",icon:"icons",input:"text-input","checkbox-list":"checkbox-group","circular-progress":"circular-progress-indicator","linear-progress":"linear-progress-indicator",notification:"notification-banner",skeleton:"skeleton-loader","radio-group":"radio","file-upload-input":"file-uploader","link-button":"link","page-block":"block"};function Ee(c){const g=Ne[c]||c;return V(`/images/component-thumbnails/${g}.svg`)}const Fe=["name","description","category","status"];function Ge(c){switch(c){case"stable":return"success";case"beta":return"information";case"experimental":return"warning";case"deprecated":return"emergency";default:return"information"}}function te(c){switch(c){case"content-layout":return"sky";case"feedback-and-alerts":return"prairie";case"structure-and-navigation":return"lilac";case"inputs-and-actions":return"dawn";case"forms":return"pasture";case"technical":return"default";case"utilities":return"default";default:return"default"}}function x(c){const g=c.replace(/-/g," ");return g.charAt(0).toUpperCase()+g.slice(1)}function S(c){return c==="stable"?"Available":c.charAt(0).toUpperCase()+c.slice(1)}function _e({components:c}){const[g,u]=s.useState(!1),[ae,re]=s.useState(!1),[N,A]=s.useState(""),D=s.useRef(null),O=s.useRef(null),U=s.useRef(null),E=s.useRef(null);s.useEffect(()=>{const e=O.current;if(!e)return;const a=new IntersectionObserver(([r])=>{re(!r.isIntersecting)},{threshold:0});return a.observe(e),()=>a.disconnect()},[]);const[h,m]=s.useState({category:[],status:[]}),[l,b]=s.useState({category:[],status:[]}),[$,oe]=s.useState(!1);s.useEffect(()=>{if($)return;const e=new URLSearchParams(window.location.search),a={category:e.get("category")?.split(",").filter(Boolean)??[],status:e.get("status")?.split(",").filter(Boolean)??[]};(a.category.length||a.status.length)&&(m(a),b(a)),oe(!0)},[$]);const{sortConfig:i,setSortConfig:F,clearSort:_}=fe(),B=ye(D,624),{search:q,isLoading:se,error:ne}=Se(),{viewSettings:p,setLayout:v}=Ce({pageKey:"components",defaultLayout:"card",defaultColumns:Fe});s.useEffect(()=>{const e=U.current;if(!e)return;e.setAttribute("version","2");const a=r=>{const o=r.detail.sorts;F({primary:o[0]?{key:o[0].column,direction:o[0].direction}:null,secondary:o[1]?{key:o[1].column,direction:o[1].direction}:null})};return e.addEventListener("_multisort",a),()=>e.removeEventListener("_multisort",a)},[F,p.layout]),s.useEffect(()=>{const e=E.current;if(!e)return;const a=r=>{const n=r.detail;n.tab===1?v("card"):n.tab===2&&v("list")};return e.addEventListener("_change",a),()=>e.removeEventListener("_change",a)},[v]);const[G,P]=s.useState(new Set),w=s.useMemo(()=>{const e=[...new Set(c.map(r=>r.data.category))].sort(),a=[...new Set(c.map(r=>r.data.status))].sort();return{categories:e,statuses:a}},[c]),ie=s.useMemo(()=>{const e=[];return w.categories.forEach(a=>{e.push({id:`category:${a}`,label:x(a),group:"Category",filterType:"category",filterValue:a,active:l.category.includes(a)})}),w.statuses.forEach(a=>{e.push({id:`status:${a}`,label:S(a),group:"Status",filterType:"status",filterValue:a,active:l.status.includes(a)})}),e},[w,l]),ce=s.useCallback(e=>{const a=e.filterType;b(r=>{const n=r[a];return{...r,[a]:n.includes(e.filterValue)?n.filter(o=>o!==e.filterValue):[...n,e.filterValue]}})},[]),R=s.useMemo(()=>p.layout==="list"?"list":"card",[p.layout]),W=s.useRef(!1);s.useEffect(()=>{const e=B&&!W.current;W.current=B,e&&p.layout==="list"&&(v("card"),E.current&&E.current.setAttribute("initialtab","1"))},[B,p.layout,v]);const f=s.useMemo(()=>{let e=c;if(N.trim()){const a=q(N,"component"),r=new Set(a.map(o=>o.slug)),n=new Map(a.map((o,d)=>[o.slug,d]));e=e.filter(o=>r.has(o.slug)).sort((o,d)=>(n.get(o.slug)??0)-(n.get(d.slug)??0))}return l.category.length>0&&(e=e.filter(a=>l.category.includes(a.data.category))),l.status.length>0&&(e=e.filter(a=>l.status.includes(a.data.status))),i.primary&&(e=[...e].sort((a,r)=>{const n=i.primary.key;let o,d;switch(n){case"name":o=a.data.name,d=r.data.name;break;case"category":o=a.data.category,d=r.data.category;break;case"status":o=a.data.status,d=r.data.status;break;default:o="",d=""}const k=o.localeCompare(d),ge=i.primary.direction==="asc"?1:-1;if(k!==0)return k*ge;if(i.secondary){const me=i.secondary.key;let j,C;switch(me){case"name":j=a.data.name,C=r.data.name;break;case"category":j=a.data.category,C=r.data.category;break;case"status":j=a.data.status,C=r.data.status;break;default:j="",C=""}const ue=i.secondary.direction==="asc"?1:-1;return j.localeCompare(C)*ue}return 0})),e},[c,l,i,N,q]),y=s.useMemo(()=>{if(!p.groupBy)return null;const e=[],a=new Map;return f.forEach(n=>{let o;switch(p.groupBy){case"category":o=n.data.category;break;case"status":o=n.data.status;break;default:o="Unknown"}a.has(o)||a.set(o,[]),a.get(o).push(n)}),Array.from(a.keys()).sort().forEach(n=>{let o;switch(p.groupBy){case"category":o=x(n);break;case"status":o=S(n);break;default:o=n}e.push({key:n,label:o,components:a.get(n)})}),e},[f,p.groupBy]);s.useEffect(()=>{y&&P(new Set(y.map(e=>e.key)))},[p.groupBy]);const H=s.useCallback(e=>{P(a=>{const r=new Set(a);return r.has(e)?r.delete(e):r.add(e),r})},[]);s.useCallback((e,a)=>{m(r=>({...r,[e]:r[e].includes(a)?r[e].filter(n=>n!==a):[...r[e],a]}))},[]);const le=s.useCallback(()=>{b(h),u(!1)},[h]),Q=s.useCallback(()=>{const e={category:[],status:[]};m(e),b(e)},[]),K=s.useCallback((e,a)=>{b(r=>({...r,[e]:r[e].filter(n=>n!==a)}))},[]),de=s.useCallback(()=>{A(""),Q(),_()},[Q,_]),I=s.useCallback(e=>i.primary?.key===e?i.primary.direction:i.secondary?.key===e?i.secondary.direction:"none",[i]),T=s.useCallback(e=>{if(!(!i.primary||!i.secondary)){if(i.primary.key===e)return"1";if(i.secondary.key===e)return"2"}},[i]),J=s.useCallback(e=>t.jsx("a",{href:V(`/components/${e.slug}`),className:"component-card-link",children:t.jsxs("div",{className:"component-card-content",children:[t.jsxs("div",{className:"component-card-thumbnail","aria-hidden":"true",children:[t.jsx("img",{src:Ee(e.slug),alt:"",loading:"lazy",onError:a=>{a.target.style.display="none";const r=a.target.nextElementSibling;r&&(r.style.display="flex")}}),t.jsx("span",{className:"component-card-thumbnail-fallback",style:{display:"none"},children:e.data.name})]}),t.jsx("h3",{className:"component-card-title",children:e.data.name}),e.data.description&&t.jsx("p",{className:"component-card-description",children:e.data.description}),t.jsx("div",{className:"component-card-badges",children:t.jsx("goa-badge",{version:"2",type:te(e.data.category),content:x(e.data.category),emphasis:"subtle",icon:"false"})})]})},e.slug),[]),X=s.useCallback(e=>t.jsxs("tr",{children:[t.jsx("td",{children:t.jsx("a",{href:V(`/components/${e.slug}`),className:"component-table-link",children:e.data.name})}),t.jsx("td",{className:"component-description-cell",children:e.data.description||"—"}),t.jsx("td",{children:t.jsx("goa-badge",{version:"2",type:te(e.data.category),content:x(e.data.category),emphasis:"subtle",icon:"false"})}),t.jsx("td",{children:t.jsx("goa-badge",{version:"2",type:Ge(e.data.status),content:S(e.data.status),emphasis:"subtle",icon:"false"})})]},e.slug),[]),pe=l.category.length>0||l.status.length>0;return t.jsxs("div",{className:"components-grid",ref:D,children:[t.jsx("div",{ref:O,className:"components-sentinel","aria-hidden":"true"}),t.jsxs("div",{className:`components-toolbar ${ae?"components-toolbar--sticky":""}`,children:[t.jsx("div",{className:"components-search-section",children:t.jsx(xe,{value:N,onChange:A,onClear:()=>A(""),placeholder:"Search or type / to filter...",commands:ie,onCommandSelect:ce,isLoading:se,error:ne})}),t.jsxs("div",{className:"components-toolbar-actions",children:[t.jsx("div",{className:"view-toggle-wrapper",children:t.jsxs("goa-tabs",{ref:E,version:"2",variant:"segmented",initialTab:R==="card"?1:2,orientation:"horizontal",children:[t.jsx("goa-tab",{heading:"Grid",children:t.jsx("span",{})}),t.jsx("goa-tab",{heading:"List",children:t.jsx("span",{})})]})}),t.jsx("span",{className:"filter-btn-desktop",children:t.jsx(L,{type:"secondary",leadingIcon:"filter-lines",size:"compact",onClick:()=>{g?u(!1):(m(l),u(!0))},children:"Filters"})}),t.jsx("span",{className:"filter-btn-mobile",children:t.jsx(je,{icon:"filter-lines",size:"medium",variant:"dark",onClick:()=>{g?u(!1):(m(l),u(!0))}})})]})]}),pe&&t.jsxs("div",{className:"components-chips",children:[t.jsx(M,{type:"filter-lines",size:"small",fillColor:"var(--goa-color-text-secondary)"}),i.primary&&t.jsx(z,{content:i.primary.key,leadingIcon:i.primary.direction==="asc"?"arrow-up":"arrow-down",secondaryText:i.secondary?"1st":void 0,onClick:()=>F({primary:i.secondary,secondary:null})}),i.secondary&&t.jsx(z,{content:i.secondary.key,leadingIcon:i.secondary.direction==="asc"?"arrow-up":"arrow-down",secondaryText:"2nd",onClick:()=>F(e=>({...e,secondary:null}))}),l.category.map(e=>t.jsx(z,{content:x(e),onClick:()=>K("category",e)},`cat-${e}`)),l.status.map(e=>t.jsx(z,{content:S(e),onClick:()=>K("status",e)},`status-${e}`)),t.jsx("a",{href:"#",className:"clear-all-link",onClick:e=>{e.preventDefault(),de()},children:"Clear all"})]}),t.jsxs("p",{className:"components-count",children:[f.length," component",f.length!==1?"s":""]}),R==="list"&&t.jsxs("div",{className:"components-table-wrapper",onScroll:e=>{const a=e.currentTarget,r=a.querySelector("goa-table");if(!r)return;const n=parseFloat(getComputedStyle(r).marginLeft)||0,o=a.scrollWidth-a.clientWidth,d=a.querySelector(".components-table-scroll-shadow-left"),k=a.querySelector(".components-table-scroll-shadow-right");d&&(d.style.opacity=a.scrollLeft>n?"1":"0"),k&&(k.style.opacity=a.scrollLeft<o-n?"1":"0")},ref:e=>{e&&requestAnimationFrame(()=>{const a=e.querySelector("goa-table");if(!a)return;const r=parseFloat(getComputedStyle(a).marginLeft)||0,n=e.scrollWidth-e.clientWidth,o=e.querySelector(".components-table-scroll-shadow-right");o&&n>r&&(o.style.opacity="1")})},children:[t.jsx("div",{className:"components-table-scroll-shadow-left","aria-hidden":"true"}),t.jsx("goa-table",{ref:U,version:"2",width:"100%",variant:"normal","sort-mode":"multi",children:t.jsxs("table",{style:{width:"100%"},children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{style:{width:"200px"},children:t.jsx("goa-table-sort-header",{version:"2",name:"name",direction:I("name"),"sort-order":T("name"),children:"Name"})}),t.jsx("th",{children:"Description"}),t.jsx("th",{children:t.jsx("goa-table-sort-header",{version:"2",name:"category",direction:I("category"),"sort-order":T("category"),children:"Category"})}),t.jsx("th",{children:t.jsx("goa-table-sort-header",{version:"2",name:"status",direction:I("status"),"sort-order":T("status"),children:"Status"})})]})}),t.jsx("tbody",{children:y?y.map(e=>t.jsxs(he.Fragment,{children:[t.jsx("tr",{className:"components-group-row",onClick:()=>H(e.key),children:t.jsx("td",{colSpan:4,children:t.jsxs("div",{className:"components-group-header",children:[t.jsx(M,{type:G.has(e.key)?"chevron-down":"chevron-forward",size:"small"}),t.jsx("strong",{children:e.label}),t.jsx("goa-badge",{version:"2",type:"default",content:String(e.components.length),emphasis:"subtle"})]})})}),G.has(e.key)&&e.components.map(X)]},e.key)):f.map(X)})]})}),t.jsx("div",{className:"components-table-scroll-shadow-right","aria-hidden":"true"})]}),R==="card"&&t.jsx("div",{className:"components-card-view",children:y?y.map(e=>t.jsxs("div",{className:"components-group",children:[t.jsxs("button",{className:"components-group-btn",onClick:()=>H(e.key),children:[t.jsx(M,{type:G.has(e.key)?"chevron-down":"chevron-forward",size:"small"}),t.jsx("strong",{children:e.label}),t.jsx("goa-badge",{version:"2",type:"dark",content:String(e.components.length),emphasis:"subtle"})]}),G.has(e.key)&&t.jsx("div",{className:"components-card-grid",children:e.components.map(J)})]},e.key)):t.jsx("div",{className:"components-card-grid",children:f.map(J)})}),typeof document<"u"&&document.getElementById("push-drawer-portal")&&be.createPortal(t.jsx(ve,{heading:"Filter components",open:g,width:"300px",onClose:()=>u(!1),actions:t.jsxs(ke,{alignment:"start",gap:"compact",children:[t.jsx(L,{type:"primary",size:"compact",onClick:le,children:"Apply filters"}),t.jsx(L,{type:"tertiary",size:"compact",onClick:()=>u(!1),children:"Cancel"})]}),children:t.jsxs("div",{className:"filter-drawer-content",children:[t.jsx(ee,{label:"Category",children:t.jsx(Y,{name:"category",size:"compact",value:h.category,onChange:e=>m(a=>({...a,category:e.value})),children:w.categories.map(e=>t.jsx(Z,{name:e,value:e,text:x(e),size:"compact"},e))})}),t.jsx(ee,{label:"Status",children:t.jsx(Y,{name:"status",size:"compact",value:h.status,onChange:e=>m(a=>({...a,status:e.value})),children:w.statuses.map(e=>t.jsx(Z,{name:e,value:e,text:S(e),size:"compact"},e))})}),(h.category.length>0||h.status.length>0)&&t.jsxs(t.Fragment,{children:[t.jsx(we,{}),t.jsx(L,{type:"tertiary",size:"compact",onClick:()=>m({category:[],status:[]}),children:"Clear all filters"})]})]})}),document.getElementById("push-drawer-portal")),t.jsx("style",{children:`
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
        /* TODO: Remove calc workaround when goa-table V2 gets box-sizing: border-box */
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
          width: calc(100% - 2px) !important;
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

      `})]})}export{_e as ComponentsGrid};
