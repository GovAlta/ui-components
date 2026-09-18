import{j as a}from"./jsx-runtime.u17CrQMm.js";import{r as l,R as ve}from"./index.BAnu8Lhe.js";import{u as we,a as ke,I as je,G as F,b as M,r as Se,c as ze,d as ae,e as te,f as Te}from"./InlineSearch.BlmTvPa7.js";import{w as V}from"./base-url.Dos8JiNA.js";import{G as I}from"./button.DBbiOMj3.js";import{G as Ce}from"./button-group.29nnKdBO.js";import{G as Ne}from"./icon-button.BYsS1Jba.js";import{G as U}from"./icon.mi703_xL.js";import{G as Ge}from"./table.D9Cnpc6D.js";import{G as Ee,a as re}from"./tab.g1SijVhc.js";import"./workspace-layout-scroll-state.CwoYdGbs.js";import{u as Fe}from"./useViewSettings.DglULXV7.js";import{u as Ie}from"./useSearch.BL0WJ_cW.js";const Ae=["title","size","productType","tags"];function se(c){switch(c){case"interaction":return"dawn";case"section":return"information";case"page":return"pasture";case"task":return"sunset";case"product":return"prairie";default:return"information"}}function oe(c){switch(c){case"workspace":return"lilac";case"public-form":return"sunset";default:return"default"}}function v(c){return c.split("-").map((p,m)=>m===0?p.charAt(0).toUpperCase()+p.slice(1):p).join(" ")}function w(c){return c.split("-").map((p,m)=>m===0?p.charAt(0).toUpperCase()+p.slice(1):p).join(" ")}function He({examples:c}){const[p,m]=l.useState(!1),[le,ie]=l.useState(!1),[T,A]=l.useState(""),D=l.useRef(null),P=l.useRef(null);l.useEffect(()=>{const e=P.current;if(!e)return;const t=new IntersectionObserver(([r])=>{ie(!r.isIntersecting)},{threshold:0});return t.observe(e),()=>t.disconnect()},[]);const $={size:[],productType:[]},[x,g]=l.useState($),[n,f]=l.useState($),B="examples-grid-filters",[C,ne]=l.useState(!1);l.useEffect(()=>{if(C)return;const e=new URLSearchParams(window.location.search),t={size:e.get("size")?.split(",").filter(Boolean)??[],productType:e.get("productType")?.split(",").filter(Boolean)??[]};if(t.size.length||t.productType.length)g(t),f(t);else try{const r=sessionStorage.getItem(B);if(r){const s=JSON.parse(r),o={size:Array.isArray(s.size)?s.size:[],productType:Array.isArray(s.productType)?s.productType:[]};(o.size.length||o.productType.length)&&(g(o),f(o))}}catch{}ne(!0)},[C]),l.useEffect(()=>{if(C)try{n.size.length||n.productType.length?sessionStorage.setItem(B,JSON.stringify(n)):sessionStorage.removeItem(B)}catch{}},[n,C]);const{sortConfig:i,setSortConfig:N,clearSort:q}=we(),L=ke(D,780),{search:W,isLoading:ce,error:de}=Ie(),{viewSettings:u,setLayout:k}=Fe({pageKey:"examples",defaultLayout:"card",defaultColumns:Ae}),pe=l.useCallback(e=>{const t=e.sorts;N({primary:t[0]?{key:t[0].column,direction:t[0].direction}:null,secondary:t[1]?{key:t[1].column,direction:t[1].direction}:null})},[N]),me=l.useCallback(e=>{e.tab===1?k("card"):e.tab===2&&k("list")},[k]),[G,_]=l.useState(new Set),H=["interaction","section","page","task","product"],j=l.useMemo(()=>{const e=[...new Set(c.map(r=>r.data.size))].sort((r,s)=>H.indexOf(r)-H.indexOf(s)),t=[...new Set(c.map(r=>r.data.productType).filter(r=>r!==void 0))].sort();return{sizes:e,productTypes:t}},[c]),ge=l.useMemo(()=>{const e=[];return j.sizes.forEach(t=>{e.push({id:`size:${t}`,label:v(t),group:"Size",filterType:"size",filterValue:t,active:n.size.includes(t)})}),j.productTypes.forEach(t=>{e.push({id:`productType:${t}`,label:w(t),group:"Product type",filterType:"productType",filterValue:t,active:n.productType.includes(t)})}),e},[j,n]),ue=l.useCallback(e=>{const t=e.filterType;f(r=>{const s=r[t];return{...r,[t]:s.includes(e.filterValue)?s.filter(o=>o!==e.filterValue):[...s,e.filterValue]}})},[]),E=l.useMemo(()=>u.layout==="list"?"list":"card",[u.layout]),J=l.useRef(!1);l.useEffect(()=>{const e=L&&!J.current;J.current=L,e&&u.layout==="list"&&k("card")},[L,u.layout,k]);const y=l.useMemo(()=>{let e=c;if(T.trim()){const t=W(T,"example"),r=new Set(t.map(o=>o.slug)),s=new Map(t.map((o,d)=>[o.slug,d]));e=e.filter(o=>r.has(o.slug)).sort((o,d)=>(s.get(o.slug)??0)-(s.get(d.slug)??0))}return n.size.length>0&&(e=e.filter(t=>n.size.includes(t.data.size))),n.productType.length>0&&(e=e.filter(t=>t.data.productType?n.productType.includes(t.data.productType):!1)),i.primary&&(e=[...e].sort((t,r)=>{const s=i.primary.key,o=i.primary.direction==="asc"?1:-1;let d,h;switch(s){case"title":d=t.data.title,h=r.data.title;break;case"size":d=t.data.size,h=r.data.size;break;case"productType":d=t.data.productType??"",h=r.data.productType??"";break;default:d="",h=""}const ee=d.localeCompare(h);if(ee!==0)return ee*o;if(i.secondary){const ye=i.secondary.key,be=i.secondary.direction==="asc"?1:-1;let S,z;switch(ye){case"title":S=t.data.title,z=r.data.title;break;case"size":S=t.data.size,z=r.data.size;break;case"productType":S=t.data.productType??"",z=r.data.productType??"";break;default:S="",z=""}return S.localeCompare(z)*be}return 0})),e},[c,n,i,T,W]),b=l.useMemo(()=>{if(!u.groupBy)return null;const e=[],t=new Map;return y.forEach(s=>{let o;switch(u.groupBy){case"size":o=s.data.size;break;case"productType":o=s.data.productType??"Universal";break;default:o="Unknown"}t.has(o)||t.set(o,[]),t.get(o).push(s)}),Array.from(t.keys()).sort().forEach(s=>{let o;switch(u.groupBy){case"size":o=v(s);break;case"productType":o=s==="Universal"?"Universal":w(s);break;default:o=s}e.push({key:s,label:o,examples:t.get(s)})}),e},[y,u.groupBy]);l.useEffect(()=>{b&&_(new Set(b.map(e=>e.key)))},[u.groupBy]);const K=l.useCallback(e=>{_(t=>{const r=new Set(t);return r.has(e)?r.delete(e):r.add(e),r})},[]);l.useCallback((e,t)=>{g(r=>({...r,[e]:r[e].includes(t)?r[e].filter(s=>s!==t):[...r[e],t]}))},[]);const he=l.useCallback(()=>{f(x),m(!1)},[x]),Q=l.useCallback(()=>{const e={size:[],productType:[]};g(e),f(e)},[]),Y=l.useCallback((e,t)=>{f(r=>({...r,[e]:r[e].filter(s=>s!==t)}))},[]),xe=l.useCallback(()=>{A(""),Q(),q()},[Q,q]),Z=l.useCallback(e=>a.jsx("a",{href:V(`/examples/${e.slug}`),className:"example-card-link",children:a.jsxs("div",{className:"example-card-content",children:[e.data.previewImage?a.jsx("img",{className:"example-card-thumbnail",src:V(e.data.previewImage),alt:"",loading:"lazy"}):a.jsx("div",{className:"example-card-thumbnail","aria-hidden":"true",children:a.jsx("span",{className:"example-card-thumbnail-fallback",children:e.data.title})}),a.jsx("h3",{className:"example-card-title",children:e.data.title}),e.body&&(()=>{const t=e.body.split(`
`)[0].replace(/^#+\s*/,"");return a.jsxs("p",{className:"example-card-description",children:[t.substring(0,120),t.length>120?"...":""]})})(),a.jsxs("div",{className:"example-card-badges",children:[a.jsx("goa-badge",{type:se(e.data.size),content:v(e.data.size),emphasis:"subtle",icon:"false"}),e.data.productType&&a.jsx("goa-badge",{type:oe(e.data.productType),content:w(e.data.productType),emphasis:"subtle",icon:"false"}),e.data.tags?.slice(0,3).map(t=>a.jsx("goa-badge",{type:"default",content:t.replace(/-/g," "),emphasis:"subtle",icon:"false"},t))]})]})},e.slug),[]),X=l.useCallback(e=>a.jsxs("tr",{children:[a.jsx("td",{children:a.jsx("a",{href:V(`/examples/${e.slug}`),className:"example-table-link",children:e.data.title})}),a.jsx("td",{children:a.jsx("goa-badge",{type:se(e.data.size),content:v(e.data.size),emphasis:"subtle",icon:"false"})}),a.jsx("td",{children:e.data.productType&&a.jsx("goa-badge",{type:oe(e.data.productType),content:w(e.data.productType),emphasis:"subtle",icon:"false"})}),a.jsx("td",{children:a.jsx("div",{className:"example-tags",children:e.data.tags?.slice(0,3).map(t=>a.jsx("goa-badge",{type:"default",content:t,emphasis:"subtle",icon:"false"},t))})})]},e.slug),[]),O=l.useCallback(e=>i.primary?.key===e?i.primary.direction:i.secondary?.key===e?i.secondary.direction:"none",[i]),R=l.useCallback(e=>{if(!(!i.primary||!i.secondary)){if(i.primary.key===e)return 1;if(i.secondary.key===e)return 2}},[i]),fe=n.size.length>0||n.productType.length>0;return a.jsxs("div",{className:"examples-grid",ref:D,children:[a.jsx("div",{ref:P,className:"examples-sentinel","aria-hidden":"true"}),a.jsxs("div",{className:`examples-toolbar ${le?"examples-toolbar--sticky":""}`,children:[a.jsx("div",{className:"examples-search-section",children:a.jsx(je,{value:T,onChange:A,onClear:()=>A(""),placeholder:"Search or type / to filter...",commands:ge,onCommandSelect:ue,isLoading:ce,error:de})}),a.jsxs("div",{className:"examples-toolbar-actions",children:[a.jsx("div",{className:"view-toggle-wrapper",children:a.jsxs(Ee,{variant:"segmented",initialTab:E==="card"?1:2,orientation:"horizontal",navigation:"none",onChange:me,children:[a.jsx(re,{heading:"Grid",children:a.jsx("span",{})}),a.jsx(re,{heading:"List",children:a.jsx("span",{})})]},E)}),a.jsx("span",{className:"filter-btn-desktop",children:a.jsx(I,{type:"secondary",leadingIcon:"filter-lines",size:"compact",onClick:()=>{p?m(!1):(g(n),m(!0))},children:"Filters"})}),a.jsx("span",{className:"filter-btn-mobile",children:a.jsx(Ne,{icon:"filter-lines",size:"medium",variant:"dark",onClick:()=>{p?m(!1):(g(n),m(!0))}})})]})]}),fe&&a.jsxs("div",{className:"examples-chips",children:[a.jsx(U,{type:"filter-lines",size:"small",fillColor:"var(--goa-color-text-secondary)"}),i.primary&&a.jsx(F,{content:i.primary.key,leadingIcon:i.primary.direction==="asc"?"arrow-up":"arrow-down",secondaryText:i.secondary?"1st":void 0,onClick:()=>N({primary:i.secondary,secondary:null})}),i.secondary&&a.jsx(F,{content:i.secondary.key,leadingIcon:i.secondary.direction==="asc"?"arrow-up":"arrow-down",secondaryText:"2nd",onClick:()=>N(e=>({...e,secondary:null}))}),n.size.map(e=>a.jsx(F,{content:v(e),onClick:()=>Y("size",e)},`size-${e}`)),n.productType.map(e=>a.jsx(F,{content:w(e),onClick:()=>Y("productType",e)},`st-${e}`)),a.jsx("a",{href:"#",className:"clear-all-link",onClick:e=>{e.preventDefault(),xe()},children:"Clear all"})]}),a.jsxs("p",{className:"examples-count",children:[y.length," example",y.length!==1?"s":""]}),E==="list"&&a.jsxs("div",{className:"examples-table-wrapper",onScroll:e=>{const t=e.currentTarget,r=t.querySelector("goa-table");if(!r)return;const s=parseFloat(getComputedStyle(r).marginLeft)||0,o=t.scrollWidth-t.clientWidth,d=t.querySelector(".examples-table-scroll-shadow-left"),h=t.querySelector(".examples-table-scroll-shadow-right");d&&(d.style.opacity=t.scrollLeft>s?"1":"0"),h&&(h.style.opacity=t.scrollLeft<o-s?"1":"0")},ref:e=>{e&&requestAnimationFrame(()=>{const t=e.querySelector("goa-table");if(!t)return;const r=parseFloat(getComputedStyle(t).marginLeft)||0,s=e.scrollWidth-e.clientWidth,o=e.querySelector(".examples-table-scroll-shadow-right");o&&s>r&&(o.style.opacity="1")})},children:[a.jsx("div",{className:"examples-table-scroll-shadow-left","aria-hidden":"true"}),a.jsxs(Ge,{width:"100%",variant:"normal",sortMode:"multi",onMultiSort:pe,children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{style:{width:"320px"},children:a.jsx(M,{name:"title",direction:O("title"),sortOrder:R("title"),children:"Name"})}),a.jsx("th",{style:{width:"120px"},children:a.jsx(M,{name:"size",direction:O("size"),sortOrder:R("size"),children:"Size"})}),a.jsx("th",{style:{minWidth:"140px"},children:a.jsx(M,{name:"productType",direction:O("productType"),sortOrder:R("productType"),children:"Product type"})}),a.jsx("th",{children:"Tags"})]})}),a.jsx("tbody",{children:b?b.map(e=>a.jsxs(ve.Fragment,{children:[a.jsx("tr",{className:"examples-group-row",onClick:()=>K(e.key),children:a.jsx("td",{colSpan:4,children:a.jsxs("div",{className:"examples-group-header",children:[a.jsx(U,{type:G.has(e.key)?"chevron-down":"chevron-forward",size:"small"}),a.jsx("strong",{children:e.label}),a.jsx("goa-badge",{type:"default",content:String(e.examples.length),emphasis:"subtle"})]})})}),G.has(e.key)&&e.examples.map(X)]},e.key)):y.map(X)})]}),a.jsx("div",{className:"examples-table-scroll-shadow-right","aria-hidden":"true"})]}),E==="card"&&a.jsx("div",{className:"examples-card-view",children:b?b.map(e=>a.jsxs("div",{className:"examples-group",children:[a.jsxs("button",{className:"examples-group-btn",onClick:()=>K(e.key),children:[a.jsx(U,{type:G.has(e.key)?"chevron-down":"chevron-forward",size:"small"}),a.jsx("strong",{children:e.label}),a.jsx("goa-badge",{type:"dark",content:String(e.examples.length),emphasis:"subtle"})]}),G.has(e.key)&&a.jsx("div",{className:"examples-card-grid",children:e.examples.map(Z)})]},e.key)):a.jsx("div",{className:"examples-card-grid",children:y.map(Z)})}),typeof document<"u"&&document.getElementById("push-drawer-portal")&&Se.createPortal(a.jsx(ze,{heading:"Filter examples",open:p,width:"300px",onClose:()=>m(!1),actions:a.jsxs(Ce,{alignment:"start",gap:"compact",children:[a.jsx(I,{type:"primary",size:"compact",onClick:he,children:"Apply filters"}),a.jsx(I,{type:"tertiary",size:"compact",onClick:()=>m(!1),children:"Cancel"})]}),children:a.jsxs("div",{className:"filter-drawer-content",children:[a.jsxs("div",{className:"filter-group",children:[a.jsx("div",{className:"filter-group-label",children:"Size"}),a.jsx(ae,{name:"size",size:"compact",value:x.size,onChange:e=>g(t=>({...t,size:e.value})),children:j.sizes.map(e=>a.jsx(te,{name:e,value:e,text:v(e),size:"compact"},e))})]}),a.jsxs("div",{className:"filter-group",children:[a.jsx("div",{className:"filter-group-label",children:"Product type"}),a.jsx(ae,{name:"productType",size:"compact",value:x.productType,onChange:e=>g(t=>({...t,productType:e.value})),children:j.productTypes.map(e=>a.jsx(te,{name:e,value:e,text:w(e),size:"compact"},e))})]}),(x.size.length>0||x.productType.length>0)&&a.jsxs(a.Fragment,{children:[a.jsx(Te,{}),a.jsx(I,{type:"tertiary",size:"compact",onClick:()=>g({size:[],productType:[]}),children:"Clear all filters"})]})]})}),document.getElementById("push-drawer-portal")),a.jsx("style",{children:`
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
          width: 100% !important;
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
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--goa-space-m);
        }

        .example-card-thumbnail-fallback {
          font: var(--goa-typography-heading-s);
          color: var(--goa-color-text-secondary);
          text-align: center;
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

      `})]})}export{He as ExamplesGrid,He as default};
