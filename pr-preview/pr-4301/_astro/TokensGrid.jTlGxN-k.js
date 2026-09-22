import{j as t}from"./jsx-runtime.u17CrQMm.js";import{r as i}from"./index.BAnu8Lhe.js";import{u as de,a as he,I as ge,G as T,b as P,r as ue,c as pe,d as fe,e as me,f as ye}from"./InlineSearch.B-RDEPAE.js";import{G as W}from"./button.DBbiOMj3.js";import{G as xe}from"./button-group.29nnKdBO.js";import{t as ve,l as be}from"./workspace-layout-scroll-state.CwoYdGbs.js";import{G as ke}from"./form-item.CfNn1Qwj.js";import{G}from"./icon-button.BYsS1Jba.js";import{G as Q}from"./icon.mi703_xL.js";import{G as we}from"./table.D9Cnpc6D.js";import{G as je,a as J}from"./tab.g1SijVhc.js";function Ce({heading:l,title:c,actions:d,children:f,...h}){const F=ve(h,be),y=l||c;return t.jsxs("goa-container",{...F,children:[y&&t.jsx("div",{slot:"title",children:y}),f,d&&t.jsx("div",{slot:"actions",children:d})]})}function Se(){const[l,c]=i.useState(()=>typeof document<"u"&&document.documentElement.getAttribute("data-theme")==="dark");return i.useEffect(()=>{if(typeof document>"u")return;const d=new MutationObserver(()=>{c(document.documentElement.getAttribute("data-theme")==="dark")});return d.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),()=>d.disconnect()},[]),l}function U(l){switch(l.toLowerCase()){case"color":return"sky";case"space":case"spacing":return"pasture";case"fontfamily":case"fontsize":case"fontweight":case"lineheight":case"fontvariationsettings":case"typography":return"sunset";case"motioncurve":case"translate":case"motionduration":case"transition":return"success";case"border":case"borderradius":case"borderwidth":return"lilac";case"shadow":return"prairie";case"iconsize":case"opacity":return"dawn";default:return"sky"}}function _(l){return l.charAt(0).toUpperCase()+l.slice(1)}function Ne(l){return l.replace(/^--/,"$")}function I(l,c){return c&&l.darkValue?{value:l.darkValue,resolvedValue:l.darkResolvedValue??l.resolvedValue}:{value:l.value,resolvedValue:l.resolvedValue}}function Me({tokens:l,filterGroups:c}){const d=Se(),[f,h]=i.useState(!1),[F,y]=i.useState(!1),[x,V]=i.useState(null),[v,A]=i.useState("css"),[b,z]=i.useState(""),R=i.useRef(null),D=i.useRef(null);i.useEffect(()=>{const e=D.current;if(!e)return;const r=new IntersectionObserver(([s])=>{y(!s.isIntersecting)},{threshold:0});return r.observe(e),()=>r.disconnect()},[]);const[k,p]=i.useState([]),[g,w]=i.useState([]),{sortConfig:n,setSortConfig:j,clearSort:L}=de(),M=he(R,840),X=i.useCallback(e=>{const r=e.sorts;j({primary:r[0]?{key:r[0].column,direction:r[0].direction}:null,secondary:r[1]?{key:r[1].column,direction:r[1].direction}:null})},[j]),Y=i.useCallback(e=>{e.tab===1?A("css"):e.tab===2&&A("scss")},[]),Z=i.useMemo(()=>c.map(e=>({id:`category:${e.name}`,label:e.name,group:"Category",filterType:"category",filterValue:e.name,active:g.includes(e.name)})),[c,g]),K=i.useCallback(e=>{w(r=>r.includes(e.filterValue)?r.filter(s=>s!==e.filterValue):[...r,e.filterValue])},[]),E=i.useMemo(()=>M?"card":"list",[M]),C=i.useMemo(()=>{let e=l;if(b.trim()){const r=b.toLowerCase();e=e.filter(s=>s.name.toLowerCase().includes(r)||s.category.toLowerCase().includes(r))}if(g.length>0){const r=g.flatMap(s=>{const o=c.find(a=>a.name===s);return o?o.categories:[]});e=e.filter(s=>r.includes(s.category))}return n.primary&&(e=[...e].sort((r,s)=>{const o=n.primary.key,a=String(r[o]||""),N=String(s[o]||""),m=a.localeCompare(N),ie=n.primary.direction==="asc"?1:-1;if(m!==0)return m*ie;if(n.secondary){const B=n.secondary.key,ne=String(r[B]||""),le=String(s[B]||""),ce=n.secondary.direction==="asc"?1:-1;return ne.localeCompare(le)*ce}return 0})),e},[l,g,n,c,b]);i.useCallback(e=>{p(r=>r.includes(e)?r.filter(s=>s!==e):[...r,e])},[]);const ee=i.useCallback(()=>{w(k),h(!1)},[k]),O=i.useCallback(()=>{p([]),w([])},[]),te=i.useCallback(e=>{w(r=>r.filter(s=>s!==e))},[]),u=i.useCallback(e=>v==="scss"?Ne(e):e,[v]),S=i.useCallback(async e=>{try{const r=u(e);await navigator.clipboard.writeText(r),V(e),setTimeout(()=>V(null),2e3)}catch(r){console.error("Failed to copy:",r)}},[u]),ae=i.useCallback(()=>{z(""),O(),L()},[O,L]),H=i.useCallback(e=>n.primary?.key===e?n.primary.direction:n.secondary?.key===e?n.secondary.direction:"none",[n]),$=i.useCallback(e=>{if(!(!n.primary||!n.secondary)){if(n.primary.key===e)return 1;if(n.secondary.key===e)return 2}},[n]),q=e=>{const r=I(e,d),s=r.resolvedValue||r.value;if(e.isColor)return t.jsx("div",{className:"token-color-swatch",style:{width:24,height:24,borderRadius:4,backgroundColor:r.resolvedValue,border:"1px solid var(--goa-color-greyscale-200)"},title:r.resolvedValue});if(e.category==="opacity"){let o=.5;return s.endsWith("%")?o=parseFloat(s)/100:o=parseFloat(s),t.jsxs("div",{className:"token-opacity-swatch",style:{width:48,height:48,position:"relative"},title:e.value,children:[t.jsx("div",{style:{position:"absolute",right:0,bottom:0,width:32,height:32,backgroundColor:"var(--goa-color-interactive-default)"}}),t.jsx("div",{style:{position:"absolute",left:0,top:0,width:32,height:32,backgroundColor:"var(--goa-color-greyscale-700)",opacity:o}})]})}if(e.category==="motionCurve"){const o=a=>a.endsWith("-expressive")?"expressive":a.endsWith("-productive")?"productive":a.endsWith("-expressive-exit")?"expressive-exit":a.endsWith("-expressive-reveal")?"expressive-reveal":a.endsWith("-expressive-transform")?"expressive-transform":"expressive";return t.jsx("img",{src:`/images/foundations/motion/${o(e.name)}.svg`,alt:`${e.name} motion curve visualization`,style:{width:40,height:40,objectFit:"contain"},title:e.value})}if(e.category==="borderRadius")return t.jsx("div",{className:"token-radius-swatch",style:{width:48,height:48,borderRadius:s,backgroundColor:"var(--goa-color-greyscale-400)"},title:e.value});if(e.category==="borderWidth")return t.jsx("div",{className:"token-border-width-swatch",style:{width:48,height:s,backgroundColor:"var(--goa-color-greyscale-700)",borderRadius:1},title:e.value});if(e.category==="space"){const o=a=>a.endsWith("-none")?"var(--goa-color-greyscale-400)":a.endsWith("-3xs")?"#f8a5a5":a.endsWith("-2xs")?"#a5e8e0":a.endsWith("-xs")?"#e0a5e8":a.endsWith("-s")?"#a5d4f8":a.endsWith("-m")?"#f8cfa5":a.endsWith("-l")?"#a5e8c0":a.endsWith("-xl")?"#f8f0a5":a.endsWith("-2xl")?"#f8a5b5":a.endsWith("-3xl")?"#a5e8e8":a.endsWith("-4xl")?"#c5f8a5":"var(--goa-color-interactive-default)";return t.jsxs("div",{className:"token-space-swatch",style:{display:"flex",alignItems:"center",height:24},title:e.value,children:[t.jsx("div",{style:{width:8,height:8,borderRadius:"50%",backgroundColor:"var(--goa-color-greyscale-300)",flexShrink:0}}),t.jsx("div",{style:{width:s,height:16,backgroundColor:o(e.name),flexShrink:0}}),t.jsx("div",{style:{width:8,height:8,borderRadius:"50%",backgroundColor:"var(--goa-color-greyscale-300)",flexShrink:0}})]})}if(e.category==="iconSize"){const o=a=>a.endsWith("-1")?"1":a.endsWith("-2")?"2":a.endsWith("-3")?"3":a.endsWith("-4")?"4":a.endsWith("-5")?"5":a.endsWith("-6")?"6":a.endsWith("-xs")?"1":a.endsWith("-s")?"2":a.endsWith("-m")?"3":a.endsWith("-l")?"4":a.endsWith("-xl")?"5":"3";return t.jsx("div",{className:"token-icon-size-swatch",style:{width:s,height:s,display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"var(--goa-color-emergency-light)"},title:e.value,children:t.jsx(Q,{type:"add",size:o(e.name)})})}if(e.category==="shadow")return t.jsx("div",{className:"token-shadow-swatch",style:{width:64,height:64,display:"flex",alignItems:"center",justifyContent:"center"},title:r.value,children:t.jsx("div",{style:{width:32,height:32,borderRadius:8,border:"1px solid var(--goa-color-greyscale-100)",backgroundColor:"var(--goa-color-surface-heading)",boxShadow:s}})});if(e.category==="fontWeight")return t.jsx("div",{className:"token-font-weight-swatch",style:{fontWeight:s,fontFamily:"var(--goa-fontFamily-sans)",fontSize:"16px",color:"var(--goa-color-greyscale-700)"},title:e.value,children:"Aa"});if(e.category==="letterSpacing")return t.jsx("div",{className:"token-letter-spacing-swatch",style:{letterSpacing:`${s}px`,fontFamily:"var(--goa-fontFamily-sans)",fontSize:"16px",color:"var(--goa-color-greyscale-700)"},title:e.value,children:"Aa"});if(e.category==="typography"){let o={color:"var(--goa-color-greyscale-700)"};try{const a=JSON.parse(e.resolvedValue||"{}");a.fontFamily&&(o.fontFamily=a.fontFamily),a.fontSize&&(o.fontSize=a.fontSize),a.fontWeight&&(o.fontWeight=a.fontWeight),a.lineHeight&&(o.lineHeight=a.lineHeight),a.letterSpacing&&(o.letterSpacing=a.letterSpacing)}catch{o.fontFamily="var(--goa-fontFamily-sans)",o.fontSize="16px"}return t.jsx("div",{className:"token-typography-swatch",style:o,title:e.value,children:"Aa"})}return e.category==="fontSize"?t.jsx("div",{className:"token-font-size-swatch",style:{fontSize:s,fontFamily:"var(--goa-fontFamily-sans)",lineHeight:1,color:"var(--goa-color-greyscale-700)"},title:e.value,children:"Aa"}):e.category==="fontFamily"?t.jsx("div",{className:"token-font-family-swatch",style:{fontFamily:s,fontSize:"14px",color:"var(--goa-color-greyscale-700)"},title:e.value,children:"Abc 123"}):e.category==="lineHeight"?t.jsxs("div",{className:"token-line-height-swatch",style:{lineHeight:s,fontSize:"14px",color:"var(--goa-color-greyscale-700)"},title:e.value,children:["Ag",t.jsx("br",{}),"Ag"]}):t.jsx("span",{className:"token-no-preview",children:"—"})},re=i.useCallback(e=>t.jsx("div",{className:"token-card",children:t.jsx(Ce,{type:"interactive",padding:"compact",mb:"none",children:t.jsxs("div",{className:"token-card-content",children:[t.jsxs("div",{className:"token-card-main",children:[q(e),t.jsxs("div",{className:"token-card-info",children:[t.jsx("code",{className:"token-name",children:u(e.name)}),t.jsx("span",{className:"token-value",children:I(e,d).value})]}),t.jsx(G,{icon:x===e.name?"checkmark":"copy",size:"small",variant:"dark",ariaLabel:`Copy ${u(e.name)}`,onClick:()=>S(e.name)})]}),t.jsx("goa-badge",{type:U(e.category),content:_(e.category),emphasis:"subtle",icon:"false"})]})})},e.name),[x,S,u,d]),se=i.useCallback(e=>t.jsxs("tr",{children:[t.jsx("td",{children:q(e)}),t.jsx("td",{children:t.jsx("code",{className:"token-name",children:u(e.name)})}),t.jsx("td",{children:t.jsx("code",{className:"token-value",children:I(e,d).value})}),t.jsx("td",{children:t.jsx("goa-badge",{type:U(e.category),content:_(e.category),emphasis:"subtle",icon:"false"})}),t.jsx("td",{children:t.jsx(G,{icon:x===e.name?"checkmark":"copy",size:"small",variant:"dark",ariaLabel:`Copy ${u(e.name)}`,onClick:()=>S(e.name)})})]},e.name),[x,S,u,d]),oe=g.length>0||n.primary;return t.jsxs("div",{className:"tokens-grid",ref:R,children:[t.jsx("div",{ref:D,className:"tokens-sentinel","aria-hidden":"true"}),t.jsxs("div",{className:`tokens-toolbar ${F?"tokens-toolbar--sticky":""}`,children:[t.jsx("div",{className:"tokens-search-section",children:t.jsx(ge,{value:b,onChange:z,onClear:()=>z(""),placeholder:"Search or type / to filter...",commands:Z,onCommandSelect:K})}),t.jsxs("div",{className:"tokens-toolbar-actions",children:[t.jsx("div",{className:"syntax-toggle-wrapper",children:t.jsxs(je,{variant:"segmented",initialTab:v==="css"?1:2,orientation:"horizontal",navigation:"none",onChange:Y,children:[t.jsx(J,{heading:"CSS",children:t.jsx("span",{})}),t.jsx(J,{heading:"SCSS",children:t.jsx("span",{})})]},v)}),t.jsx("span",{className:"filter-btn-desktop",children:t.jsx(W,{type:"secondary",leadingIcon:"filter-lines",size:"compact",onClick:()=>{f?h(!1):(p(g),h(!0))},children:"Filters"})}),t.jsx("span",{className:"filter-btn-mobile",children:t.jsx(G,{icon:"filter-lines",size:"medium",variant:"dark",onClick:()=>{f?h(!1):(p(g),h(!0))}})})]})]}),oe&&t.jsxs("div",{className:"tokens-chips",children:[t.jsx(Q,{type:"filter-lines",size:"small",fillColor:"var(--goa-color-text-secondary)"}),n.primary&&t.jsx(T,{content:n.primary.key,leadingIcon:n.primary.direction==="asc"?"arrow-up":"arrow-down",secondaryText:n.secondary?"1st":void 0,onClick:()=>j({primary:n.secondary,secondary:null})}),n.secondary&&t.jsx(T,{content:n.secondary.key,leadingIcon:n.secondary.direction==="asc"?"arrow-up":"arrow-down",secondaryText:"2nd",onClick:()=>j(e=>({...e,secondary:null}))}),g.map(e=>t.jsx(T,{content:e,onClick:()=>te(e)},e)),t.jsx("a",{href:"#",className:"clear-all-link",onClick:e=>{e.preventDefault(),ae()},children:"Clear all"})]}),t.jsxs("p",{className:"tokens-count",children:[C.length," token",C.length!==1?"s":""]}),E==="list"&&t.jsxs("div",{className:"tokens-table-wrapper",onScroll:e=>{const r=e.currentTarget,s=r.querySelector("goa-table");if(!s)return;const o=parseFloat(getComputedStyle(s).marginLeft)||0,a=r.scrollWidth-r.clientWidth,N=r.querySelector(".tokens-table-scroll-shadow-left"),m=r.querySelector(".tokens-table-scroll-shadow-right");N&&(N.style.opacity=r.scrollLeft>o?"1":"0"),m&&(m.style.opacity=r.scrollLeft<a-o?"1":"0")},ref:e=>{e&&requestAnimationFrame(()=>{const r=e.querySelector("goa-table");if(!r)return;const s=parseFloat(getComputedStyle(r).marginLeft)||0,o=e.scrollWidth-e.clientWidth,a=e.querySelector(".tokens-table-scroll-shadow-right");a&&o>s&&(a.style.opacity="1")})},children:[t.jsx("div",{className:"tokens-table-scroll-shadow-left","aria-hidden":"true"}),t.jsxs(we,{width:"100%",variant:"normal",sortMode:"multi",onMultiSort:X,children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{style:{width:60},children:"Preview"}),t.jsx("th",{style:{minWidth:320},children:t.jsx(P,{name:"name",direction:H("name"),sortOrder:$("name"),children:"Token"})}),t.jsx("th",{style:{width:"320px"},children:"Value"}),t.jsx("th",{children:t.jsx(P,{name:"category",direction:H("category"),sortOrder:$("category"),children:"Category"})}),t.jsx("th",{style:{width:60}})]})}),t.jsx("tbody",{children:C.map(se)})]}),t.jsx("div",{className:"tokens-table-scroll-shadow-right","aria-hidden":"true"})]}),E==="card"&&t.jsx("div",{className:"tokens-card-view",children:t.jsx("div",{className:"tokens-card-grid",children:C.map(re)})}),typeof document<"u"&&document.getElementById("push-drawer-portal")&&ue.createPortal(t.jsx(pe,{heading:"Filter tokens",open:f,width:"300px",onClose:()=>h(!1),actions:t.jsxs(xe,{alignment:"start",gap:"compact",children:[t.jsx(W,{type:"primary",size:"compact",onClick:ee,children:"Apply filters"}),t.jsx(W,{type:"tertiary",size:"compact",onClick:()=>h(!1),children:"Cancel"})]}),children:t.jsxs("div",{className:"filter-drawer-content",children:[t.jsx(ke,{label:"Category",children:t.jsx(fe,{name:"category",size:"compact",value:k,onChange:e=>p(e.value),children:c.map(e=>t.jsx(me,{name:e.name,value:e.name,text:e.name,size:"compact"},e.name))})}),k.length>0&&t.jsxs(t.Fragment,{children:[t.jsx(ye,{}),t.jsx(W,{type:"tertiary",size:"compact",onClick:()=>p([]),children:"Clear all filters"})]})]})}),document.getElementById("push-drawer-portal")),t.jsx("style",{children:`
        .tokens-grid {
          max-width: 100%;
          container-type: inline-size;
        }

        /* Sentinel for sticky detection - invisible marker */
        .tokens-sentinel {
          height: 1px;
          margin-bottom: -1px;
        }

        /* Toolbar - single row layout */
        .tokens-toolbar {
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
        .tokens-toolbar--sticky {
          padding: var(--goa-space-s) 0 var(--goa-space-xs);
          background: transparent;
          margin-bottom: 0;
        }

        .tokens-toolbar--sticky::before {
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

        .tokens-search-section {
          flex: 1;
          min-width: 200px;
        }

        /* Toolbar actions */
        .tokens-toolbar-actions {
          display: flex;
          align-items: flex-start;
          gap: var(--goa-space-m);
          min-height: 40px;
        }

        /* Filter button: desktop shows text, mobile shows icon-only */
        .filter-btn-mobile { display: none; }

        @media (max-width: 623px) {
          .filter-btn-desktop { display: none; }
          .filter-btn-mobile { display: contents; }

          .tokens-toolbar {
            flex-direction: row !important;
            align-items: flex-start !important;
          }

          .tokens-search-section {
            min-width: 0 !important;
          }
        }

        /* Narrow container: stack toolbar vertically */
        @container (max-width: 640px) {
          .tokens-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .tokens-search-section {
            min-width: unset;
          }

          .tokens-toolbar-actions {
            align-self: flex-start;
          }
        }

        /* Syntax toggle wrapper - tabs used as segmented toggle, hide content area */
        .syntax-toggle-wrapper {
          overflow: hidden;
          max-height: 40px;
          flex-shrink: 0;
        }

        /* Filter chips */
        .tokens-chips {
          display: flex;
          align-items: center;
          gap: var(--goa-space-s);
          flex-wrap: wrap;
          padding-top: var(--goa-space-2xs);
          margin-bottom: var(--goa-space-l);
        }

        .tokens-count {
          color: var(--goa-color-text-secondary);
          font: var(--goa-typography-body-s);
          margin-top: var(--goa-space-m);
          margin-bottom: var(--goa-space-m);
        }

        /* Horizontal scroll container for table - bleeds into card padding */
        .tokens-table-wrapper {
          display: flex;
          align-items: stretch;
          overflow-x: auto;
          margin-left: calc(-1 * var(--card-padding-h, var(--goa-space-2xl)));
          margin-right: calc(-1 * var(--card-padding-h, var(--goa-space-2xl)));
        }

        .tokens-table-wrapper > * {
          flex-grow: 1;
          min-width: max-content;
        }

        .tokens-table-wrapper goa-table {
          width: 100% !important;
          margin-left: var(--card-padding-h, var(--goa-space-2xl));
          margin-right: var(--card-padding-h, var(--goa-space-2xl));
        }

        .tokens-table-scroll-shadow-left,
        .tokens-table-scroll-shadow-right {
          position: sticky;
          width: 8px;
          min-width: 8px;
          flex-shrink: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.15s ease;
        }

        .tokens-table-scroll-shadow-left {
          left: 0;
          margin-right: -8px;
          background: linear-gradient(to right, rgba(0, 0, 0, 0.08), transparent);
        }

        .tokens-table-scroll-shadow-right {
          right: 0;
          margin-left: -8px;
          background: linear-gradient(to left, rgba(0, 0, 0, 0.08), transparent);
        }

        .token-name {
          font-size: var(--goa-font-size-2);
          word-break: break-all;
        }

        .token-value {
          font-size: var(--goa-font-size-2);
          color: var(--goa-color-text-secondary);
          word-break: break-all;
        }

        .token-no-preview {
          color: var(--goa-color-text-secondary);
        }

        /* Card/Grid view */
        .tokens-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--goa-space-m);
        }

        .token-card-content {
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-s);
        }

        .token-card-main {
          display: flex;
          align-items: center;
          gap: var(--goa-space-m);
        }

        .token-card-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-2xs);
        }

        .token-card-info .token-name {
          word-break: break-all;
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

      `})]})}export{Me as TokensGrid,Me as default};
