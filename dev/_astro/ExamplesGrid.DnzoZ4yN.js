import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r as i,R as ye}from"./index.DeO6U63H.js";import{u as be,a as ve,I as we,G,r as je,b as ke,c as te,d as re,e as ze}from"./InlineSearch.Dpfq9eNS.js";import{w as D}from"./base-url.jkrg3tWJ.js";import{G as A}from"./button.B-V87hrX.js";import{G as Se}from"./button-group.CNKJdJv9.js";import{G as Te}from"./icon-button.DDEMPr0T.js";import{G as M}from"./icon.DyBuQE3q.js";import"./theme-context.DBIa_puq.js";import{u as Ce}from"./useViewSettings.Cs_s925c.js";import{u as Ne}from"./useSearch.ig1mLcpi.js";import"./index.DrlE4MoQ.js";import"./SearchInput.B9hYI1ST.js";const Ee=["title","size","productType","tags"];function se(c){switch(c){case"interaction":return"dawn";case"section":return"information";case"page":return"pasture";case"task":return"sunset";case"product":return"prairie";default:return"information"}}function oe(c){switch(c){case"workspace":return"lilac";case"public-form":return"sunset";default:return"default"}}function v(c){return c.split("-").map((p,g)=>g===0?p.charAt(0).toUpperCase()+p.slice(1):p).join(" ")}function w(c){return c.split("-").map((p,g)=>g===0?p.charAt(0).toUpperCase()+p.slice(1):p).join(" ")}function _e({examples:c}){const[p,g]=i.useState(!1),[ie,le]=i.useState(!1),[T,I]=i.useState(""),U=i.useRef(null),P=i.useRef(null),_=i.useRef(null),C=i.useRef(null);i.useEffect(()=>{const e=P.current;if(!e)return;const t=new IntersectionObserver(([r])=>{le(!r.isIntersecting)},{threshold:0});return t.observe(e),()=>t.disconnect()},[]);const $={size:[],productType:[]},[x,u]=i.useState($),[n,f]=i.useState($),R="examples-grid-filters",[N,ne]=i.useState(!1);i.useEffect(()=>{if(N)return;const e=new URLSearchParams(window.location.search),t={size:e.get("size")?.split(",").filter(Boolean)??[],productType:e.get("productType")?.split(",").filter(Boolean)??[]};if(t.size.length||t.productType.length)u(t),f(t);else try{const r=sessionStorage.getItem(R);if(r){const o=JSON.parse(r),s={size:Array.isArray(o.size)?o.size:[],productType:Array.isArray(o.productType)?o.productType:[]};(s.size.length||s.productType.length)&&(u(s),f(s))}}catch{}ne(!0)},[N]),i.useEffect(()=>{if(N)try{n.size.length||n.productType.length?sessionStorage.setItem(R,JSON.stringify(n)):sessionStorage.removeItem(R)}catch{}},[n,N]);const{sortConfig:l,setSortConfig:E,clearSort:q}=be(),L=ve(U,780),{search:W,isLoading:ce,error:de}=Ne(),{viewSettings:m,setLayout:j}=Ce({pageKey:"examples",defaultLayout:"card",defaultColumns:Ee});i.useEffect(()=>{const e=_.current;if(!e)return;e.setAttribute("version","2");const t=r=>{const s=r.detail.sorts;E({primary:s[0]?{key:s[0].column,direction:s[0].direction}:null,secondary:s[1]?{key:s[1].column,direction:s[1].direction}:null})};return e.addEventListener("_multisort",t),()=>e.removeEventListener("_multisort",t)},[E,m.layout]),i.useEffect(()=>{const e=C.current;if(!e)return;const t=r=>{const o=r.detail;o.tab===1?j("card"):o.tab===2&&j("list")};return e.addEventListener("_change",t),()=>e.removeEventListener("_change",t)},[j]);const[F,J]=i.useState(new Set),K=["interaction","section","page","task","product"],k=i.useMemo(()=>{const e=[...new Set(c.map(r=>r.data.size))].sort((r,o)=>K.indexOf(r)-K.indexOf(o)),t=[...new Set(c.map(r=>r.data.productType).filter(r=>r!==void 0))].sort();return{sizes:e,productTypes:t}},[c]),pe=i.useMemo(()=>{const e=[];return k.sizes.forEach(t=>{e.push({id:`size:${t}`,label:v(t),group:"Size",filterType:"size",filterValue:t,active:n.size.includes(t)})}),k.productTypes.forEach(t=>{e.push({id:`productType:${t}`,label:w(t),group:"Product type",filterType:"productType",filterValue:t,active:n.productType.includes(t)})}),e},[k,n]),ge=i.useCallback(e=>{const t=e.filterType;f(r=>{const o=r[t];return{...r,[t]:o.includes(e.filterValue)?o.filter(s=>s!==e.filterValue):[...o,e.filterValue]}})},[]),B=i.useMemo(()=>m.layout==="list"?"list":"card",[m.layout]),Q=i.useRef(!1);i.useEffect(()=>{const e=L&&!Q.current;Q.current=L,e&&m.layout==="list"&&(j("card"),C.current&&C.current.setAttribute("initialtab","1"))},[L,m.layout,j]);const y=i.useMemo(()=>{let e=c;if(T.trim()){const t=W(T,"example"),r=new Set(t.map(s=>s.slug)),o=new Map(t.map((s,d)=>[s.slug,d]));e=e.filter(s=>r.has(s.slug)).sort((s,d)=>(o.get(s.slug)??0)-(o.get(d.slug)??0))}return n.size.length>0&&(e=e.filter(t=>n.size.includes(t.data.size))),n.productType.length>0&&(e=e.filter(t=>t.data.productType?n.productType.includes(t.data.productType):!1)),l.primary&&(e=[...e].sort((t,r)=>{const o=l.primary.key,s=l.primary.direction==="asc"?1:-1;let d,h;switch(o){case"title":d=t.data.title,h=r.data.title;break;case"size":d=t.data.size,h=r.data.size;break;case"productType":d=t.data.productType??"",h=r.data.productType??"";break;default:d="",h=""}const ae=d.localeCompare(h);if(ae!==0)return ae*s;if(l.secondary){const xe=l.secondary.key,fe=l.secondary.direction==="asc"?1:-1;let z,S;switch(xe){case"title":z=t.data.title,S=r.data.title;break;case"size":z=t.data.size,S=r.data.size;break;case"productType":z=t.data.productType??"",S=r.data.productType??"";break;default:z="",S=""}return z.localeCompare(S)*fe}return 0})),e},[c,n,l,T,W]),b=i.useMemo(()=>{if(!m.groupBy)return null;const e=[],t=new Map;return y.forEach(o=>{let s;switch(m.groupBy){case"size":s=o.data.size;break;case"productType":s=o.data.productType??"Universal";break;default:s="Unknown"}t.has(s)||t.set(s,[]),t.get(s).push(o)}),Array.from(t.keys()).sort().forEach(o=>{let s;switch(m.groupBy){case"size":s=v(o);break;case"productType":s=o==="Universal"?"Universal":w(o);break;default:s=o}e.push({key:o,label:s,examples:t.get(o)})}),e},[y,m.groupBy]);i.useEffect(()=>{b&&J(new Set(b.map(e=>e.key)))},[m.groupBy]);const H=i.useCallback(e=>{J(t=>{const r=new Set(t);return r.has(e)?r.delete(e):r.add(e),r})},[]);i.useCallback((e,t)=>{u(r=>({...r,[e]:r[e].includes(t)?r[e].filter(o=>o!==t):[...r[e],t]}))},[]);const me=i.useCallback(()=>{f(x),g(!1)},[x]),Y=i.useCallback(()=>{const e={size:[],productType:[]};u(e),f(e)},[]),Z=i.useCallback((e,t)=>{f(r=>({...r,[e]:r[e].filter(o=>o!==t)}))},[]),ue=i.useCallback(()=>{I(""),Y(),q()},[Y,q]),X=i.useCallback(e=>a.jsx("a",{href:D(`/examples/${e.slug}`),className:"example-card-link",children:a.jsxs("div",{className:"example-card-content",children:[e.data.previewImage?a.jsx("img",{className:"example-card-thumbnail",src:D(e.data.previewImage),alt:"",loading:"lazy"}):a.jsx("div",{className:"example-card-thumbnail","aria-hidden":"true",children:a.jsx("span",{className:"example-card-thumbnail-fallback",children:e.data.title})}),a.jsx("h3",{className:"example-card-title",children:e.data.title}),e.body&&(()=>{const t=e.body.split(`
`)[0].replace(/^#+\s*/,"");return a.jsxs("p",{className:"example-card-description",children:[t.substring(0,120),t.length>120?"...":""]})})(),a.jsxs("div",{className:"example-card-badges",children:[a.jsx("goa-badge",{version:"2",type:se(e.data.size),content:v(e.data.size),emphasis:"subtle",icon:"false"}),e.data.productType&&a.jsx("goa-badge",{version:"2",type:oe(e.data.productType),content:w(e.data.productType),emphasis:"subtle",icon:"false"}),e.data.tags?.slice(0,3).map(t=>a.jsx("goa-badge",{version:"2",type:"default",content:t.replace(/-/g," "),emphasis:"subtle",icon:"false"},t))]})]})},e.slug),[]),ee=i.useCallback(e=>a.jsxs("tr",{children:[a.jsx("td",{children:a.jsx("a",{href:D(`/examples/${e.slug}`),className:"example-table-link",children:e.data.title})}),a.jsx("td",{children:a.jsx("goa-badge",{version:"2",type:se(e.data.size),content:v(e.data.size),emphasis:"subtle",icon:"false"})}),a.jsx("td",{children:e.data.productType&&a.jsx("goa-badge",{version:"2",type:oe(e.data.productType),content:w(e.data.productType),emphasis:"subtle",icon:"false"})}),a.jsx("td",{children:a.jsx("div",{className:"example-tags",children:e.data.tags?.slice(0,3).map(t=>a.jsx("goa-badge",{version:"2",type:"default",content:t,emphasis:"subtle",icon:"false"},t))})})]},e.slug),[]),O=i.useCallback(e=>l.primary?.key===e?l.primary.direction:l.secondary?.key===e?l.secondary.direction:"none",[l]),V=i.useCallback(e=>{if(!(!l.primary||!l.secondary)){if(l.primary.key===e)return"1";if(l.secondary.key===e)return"2"}},[l]),he=n.size.length>0||n.productType.length>0;return a.jsxs("div",{className:"examples-grid",ref:U,children:[a.jsx("div",{ref:P,className:"examples-sentinel","aria-hidden":"true"}),a.jsxs("div",{className:`examples-toolbar ${ie?"examples-toolbar--sticky":""}`,children:[a.jsx("div",{className:"examples-search-section",children:a.jsx(we,{value:T,onChange:I,onClear:()=>I(""),placeholder:"Search or type / to filter...",commands:pe,onCommandSelect:ge,isLoading:ce,error:de})}),a.jsxs("div",{className:"examples-toolbar-actions",children:[a.jsx("div",{className:"view-toggle-wrapper",children:a.jsxs("goa-tabs",{ref:C,version:"2",variant:"segmented",initialTab:B==="card"?1:2,orientation:"horizontal",children:[a.jsx("goa-tab",{heading:"Grid",children:a.jsx("span",{})}),a.jsx("goa-tab",{heading:"List",children:a.jsx("span",{})})]})}),a.jsx("span",{className:"filter-btn-desktop",children:a.jsx(A,{type:"secondary",leadingIcon:"filter-lines",size:"compact",onClick:()=>{p?g(!1):(u(n),g(!0))},children:"Filters"})}),a.jsx("span",{className:"filter-btn-mobile",children:a.jsx(Te,{icon:"filter-lines",size:"medium",variant:"dark",onClick:()=>{p?g(!1):(u(n),g(!0))}})})]})]}),he&&a.jsxs("div",{className:"examples-chips",children:[a.jsx(M,{type:"filter-lines",size:"small",fillColor:"var(--goa-color-text-secondary)"}),l.primary&&a.jsx(G,{content:l.primary.key,leadingIcon:l.primary.direction==="asc"?"arrow-up":"arrow-down",secondaryText:l.secondary?"1st":void 0,onClick:()=>E({primary:l.secondary,secondary:null})}),l.secondary&&a.jsx(G,{content:l.secondary.key,leadingIcon:l.secondary.direction==="asc"?"arrow-up":"arrow-down",secondaryText:"2nd",onClick:()=>E(e=>({...e,secondary:null}))}),n.size.map(e=>a.jsx(G,{content:v(e),onClick:()=>Z("size",e)},`size-${e}`)),n.productType.map(e=>a.jsx(G,{content:w(e),onClick:()=>Z("productType",e)},`st-${e}`)),a.jsx("a",{href:"#",className:"clear-all-link",onClick:e=>{e.preventDefault(),ue()},children:"Clear all"})]}),a.jsxs("p",{className:"examples-count",children:[y.length," example",y.length!==1?"s":""]}),B==="list"&&a.jsxs("div",{className:"examples-table-wrapper",onScroll:e=>{const t=e.currentTarget,r=t.querySelector("goa-table");if(!r)return;const o=parseFloat(getComputedStyle(r).marginLeft)||0,s=t.scrollWidth-t.clientWidth,d=t.querySelector(".examples-table-scroll-shadow-left"),h=t.querySelector(".examples-table-scroll-shadow-right");d&&(d.style.opacity=t.scrollLeft>o?"1":"0"),h&&(h.style.opacity=t.scrollLeft<s-o?"1":"0")},ref:e=>{e&&requestAnimationFrame(()=>{const t=e.querySelector("goa-table");if(!t)return;const r=parseFloat(getComputedStyle(t).marginLeft)||0,o=e.scrollWidth-e.clientWidth,s=e.querySelector(".examples-table-scroll-shadow-right");s&&o>r&&(s.style.opacity="1")})},children:[a.jsx("div",{className:"examples-table-scroll-shadow-left","aria-hidden":"true"}),a.jsx("goa-table",{ref:_,version:"2",width:"100%",variant:"normal","sort-mode":"multi",children:a.jsxs("table",{style:{width:"100%"},children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{style:{width:"320px"},children:a.jsx("goa-table-sort-header",{version:"2",name:"title",direction:O("title"),"sort-order":V("title"),children:"Name"})}),a.jsx("th",{style:{width:"120px"},children:a.jsx("goa-table-sort-header",{version:"2",name:"size",direction:O("size"),"sort-order":V("size"),children:"Size"})}),a.jsx("th",{style:{minWidth:"140px"},children:a.jsx("goa-table-sort-header",{version:"2",name:"productType",direction:O("productType"),"sort-order":V("productType"),children:"Product type"})}),a.jsx("th",{children:"Tags"})]})}),a.jsx("tbody",{children:b?b.map(e=>a.jsxs(ye.Fragment,{children:[a.jsx("tr",{className:"examples-group-row",onClick:()=>H(e.key),children:a.jsx("td",{colSpan:4,children:a.jsxs("div",{className:"examples-group-header",children:[a.jsx(M,{type:F.has(e.key)?"chevron-down":"chevron-forward",size:"small"}),a.jsx("strong",{children:e.label}),a.jsx("goa-badge",{version:"2",type:"default",content:String(e.examples.length),emphasis:"subtle"})]})})}),F.has(e.key)&&e.examples.map(ee)]},e.key)):y.map(ee)})]})}),a.jsx("div",{className:"examples-table-scroll-shadow-right","aria-hidden":"true"})]}),B==="card"&&a.jsx("div",{className:"examples-card-view",children:b?b.map(e=>a.jsxs("div",{className:"examples-group",children:[a.jsxs("button",{className:"examples-group-btn",onClick:()=>H(e.key),children:[a.jsx(M,{type:F.has(e.key)?"chevron-down":"chevron-forward",size:"small"}),a.jsx("strong",{children:e.label}),a.jsx("goa-badge",{version:"2",type:"dark",content:String(e.examples.length),emphasis:"subtle"})]}),F.has(e.key)&&a.jsx("div",{className:"examples-card-grid",children:e.examples.map(X)})]},e.key)):a.jsx("div",{className:"examples-card-grid",children:y.map(X)})}),typeof document<"u"&&document.getElementById("push-drawer-portal")&&je.createPortal(a.jsx(ke,{heading:"Filter examples",open:p,width:"300px",onClose:()=>g(!1),actions:a.jsxs(Se,{alignment:"start",gap:"compact",children:[a.jsx(A,{type:"primary",size:"compact",onClick:me,children:"Apply filters"}),a.jsx(A,{type:"tertiary",size:"compact",onClick:()=>g(!1),children:"Cancel"})]}),children:a.jsxs("div",{className:"filter-drawer-content",children:[a.jsxs("div",{className:"filter-group",children:[a.jsx("div",{className:"filter-group-label",children:"Size"}),a.jsx(te,{name:"size",size:"compact",value:x.size,onChange:e=>u(t=>({...t,size:e.value})),children:k.sizes.map(e=>a.jsx(re,{name:e,value:e,text:v(e),size:"compact"},e))})]}),a.jsxs("div",{className:"filter-group",children:[a.jsx("div",{className:"filter-group-label",children:"Product type"}),a.jsx(te,{name:"productType",size:"compact",value:x.productType,onChange:e=>u(t=>({...t,productType:e.value})),children:k.productTypes.map(e=>a.jsx(re,{name:e,value:e,text:w(e),size:"compact"},e))})]}),(x.size.length>0||x.productType.length>0)&&a.jsxs(a.Fragment,{children:[a.jsx(ze,{}),a.jsx(A,{type:"tertiary",size:"compact",onClick:()=>u({size:[],productType:[]}),children:"Clear all filters"})]})]})}),document.getElementById("push-drawer-portal")),a.jsx("style",{children:`
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

      `})]})}export{_e as ExamplesGrid};
