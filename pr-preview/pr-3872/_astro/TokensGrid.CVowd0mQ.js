import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.DeO6U63H.js";import{u as ie,a as ne,I as le,G as F,r as ce,b as de,c as he,d as ge,e as pe,f as ue}from"./InlineSearch.B0MuI9Xt.js";import{G as C}from"./button.Cr0WWE4a.js";import{t as fe,l as me}from"./extract-props.mAATCLkF.js";import{G as ye}from"./form-item.yTOkS2er.js";import{G as T}from"./icon-button.CL-WfZ9v.js";import{G as P}from"./icon.Ckm5lwdV.js";import"./index.DrlE4MoQ.js";import"./SearchInput.DRe9d-BG.js";import"./base-url.DQf65ZlY.js";function xe({heading:l,title:g,actions:u,children:c,...S}){const N=fe(S,me),p=l||g;return t.jsxs("goa-container",{...N,children:[p&&t.jsx("div",{slot:"title",children:p}),c,u&&t.jsx("div",{slot:"actions",children:u})]})}function _(l){switch(l.toLowerCase()){case"color":return"sky";case"space":case"spacing":return"pasture";case"fontfamily":case"fontsize":case"fontweight":case"lineheight":case"fontvariationsettings":case"typography":return"sunset";case"motioncurve":case"translate":case"motionduration":case"transition":return"success";case"border":case"borderradius":case"borderwidth":return"lilac";case"shadow":return"prairie";case"iconsize":case"opacity":return"dawn";default:return"sky"}}function Q(l){return l.charAt(0).toUpperCase()+l.slice(1)}function ve(l){return l.replace(/^--/,"$")}function Re({tokens:l,filterGroups:g}){const[u,c]=o.useState(!1),[S,N]=o.useState(!1),[p,R]=o.useState(null),[W,I]=o.useState("css"),[y,z]=o.useState(""),A=o.useRef(null),L=o.useRef(null),G=o.useRef(null),V=o.useRef(null);o.useEffect(()=>{const e=L.current;if(!e)return;const a=new IntersectionObserver(([s])=>{N(!s.isIntersecting)},{threshold:0});return a.observe(e),()=>a.disconnect()},[]);const[x,f]=o.useState([]),[d,v]=o.useState([]),{sortConfig:i,setSortConfig:b,clearSort:E}=ie(),D=ne(A,840);o.useEffect(()=>{const e=G.current;if(!e)return;const a=s=>{const n=s.detail.sorts;b({primary:n[0]?{key:n[0].column,direction:n[0].direction}:null,secondary:n[1]?{key:n[1].column,direction:n[1].direction}:null})};return e.addEventListener("_multisort",a),()=>e.removeEventListener("_multisort",a)},[b]),o.useEffect(()=>{const e=V.current;if(!e)return;const a=s=>{const r=s.detail;r.tab===1?I("css"):r.tab===2&&I("scss")};return e.addEventListener("_change",a),()=>e.removeEventListener("_change",a)},[]);const J=o.useMemo(()=>g.map(e=>({id:`category:${e.name}`,label:e.name,group:"Category",filterType:"category",filterValue:e.name,active:d.includes(e.name)})),[g,d]),U=o.useCallback(e=>{v(a=>a.includes(e.filterValue)?a.filter(s=>s!==e.filterValue):[...a,e.filterValue])},[]),$=o.useMemo(()=>D?"card":"list",[D]),w=o.useMemo(()=>{let e=l;if(y.trim()){const a=y.toLowerCase();e=e.filter(s=>s.name.toLowerCase().includes(a)||s.category.toLowerCase().includes(a))}if(d.length>0){const a=d.flatMap(s=>{const r=g.find(n=>n.name===s);return r?r.categories:[]});e=e.filter(s=>a.includes(s.category))}return i.primary&&(e=[...e].sort((a,s)=>{const r=i.primary.key,n=String(a[r]||""),j=String(s[r]||""),m=n.localeCompare(j),ae=i.primary.direction==="asc"?1:-1;if(m!==0)return m*ae;if(i.secondary){const O=i.secondary.key,re=String(a[O]||""),se=String(s[O]||""),oe=i.secondary.direction==="asc"?1:-1;return re.localeCompare(se)*oe}return 0})),e},[l,d,i,g,y]);o.useCallback(e=>{f(a=>a.includes(e)?a.filter(s=>s!==e):[...a,e])},[]);const X=o.useCallback(()=>{v(x),c(!1)},[x]),q=o.useCallback(()=>{f([]),v([])},[]),Y=o.useCallback(e=>{v(a=>a.filter(s=>s!==e))},[]),h=o.useCallback(e=>W==="scss"?ve(e):e,[W]),k=o.useCallback(async e=>{try{const a=h(e);await navigator.clipboard.writeText(a),R(e),setTimeout(()=>R(null),2e3)}catch(a){console.error("Failed to copy:",a)}},[h]),Z=o.useCallback(()=>{z(""),q(),E()},[q,E]),B=o.useCallback(e=>i.primary?.key===e?i.primary.direction:i.secondary?.key===e?i.secondary.direction:"none",[i]),H=o.useCallback(e=>{if(!(!i.primary||!i.secondary)){if(i.primary.key===e)return"1";if(i.secondary.key===e)return"2"}},[i]),M=e=>{const a=e.resolvedValue||e.value;if(e.isColor)return t.jsx("div",{className:"token-color-swatch",style:{width:24,height:24,borderRadius:4,backgroundColor:e.resolvedValue,border:"1px solid var(--goa-color-greyscale-200)"},title:e.resolvedValue});if(e.category==="opacity"){let s=.5;return a.endsWith("%")?s=parseFloat(a)/100:s=parseFloat(a),t.jsxs("div",{className:"token-opacity-swatch",style:{width:48,height:48,position:"relative"},title:e.value,children:[t.jsx("div",{style:{position:"absolute",right:0,bottom:0,width:32,height:32,backgroundColor:"var(--goa-color-interactive-default)"}}),t.jsx("div",{style:{position:"absolute",left:0,top:0,width:32,height:32,backgroundColor:"var(--goa-color-greyscale-700)",opacity:s}})]})}if(e.category==="motionCurve"){const s=r=>r.endsWith("-expressive")?"expressive":r.endsWith("-productive")?"productive":r.endsWith("-expressive-exit")?"expressive-exit":r.endsWith("-expressive-reveal")?"expressive-reveal":r.endsWith("-expressive-transform")?"expressive-transform":"expressive";return t.jsx("img",{src:`/images/foundations/motion/${s(e.name)}.svg`,alt:`${e.name} motion curve visualization`,style:{width:40,height:40,objectFit:"contain"},title:e.value})}if(e.category==="borderRadius")return t.jsx("div",{className:"token-radius-swatch",style:{width:48,height:48,borderRadius:a,backgroundColor:"var(--goa-color-greyscale-400)"},title:e.value});if(e.category==="borderWidth")return t.jsx("div",{className:"token-border-width-swatch",style:{width:48,height:a,backgroundColor:"var(--goa-color-greyscale-700)",borderRadius:1},title:e.value});if(e.category==="space"){const s=r=>r.endsWith("-none")?"var(--goa-color-greyscale-400)":r.endsWith("-3xs")?"#f8a5a5":r.endsWith("-2xs")?"#a5e8e0":r.endsWith("-xs")?"#e0a5e8":r.endsWith("-s")?"#a5d4f8":r.endsWith("-m")?"#f8cfa5":r.endsWith("-l")?"#a5e8c0":r.endsWith("-xl")?"#f8f0a5":r.endsWith("-2xl")?"#f8a5b5":r.endsWith("-3xl")?"#a5e8e8":r.endsWith("-4xl")?"#c5f8a5":"var(--goa-color-interactive-default)";return t.jsxs("div",{className:"token-space-swatch",style:{display:"flex",alignItems:"center",height:24},title:e.value,children:[t.jsx("div",{style:{width:8,height:8,borderRadius:"50%",backgroundColor:"var(--goa-color-greyscale-300)",flexShrink:0}}),t.jsx("div",{style:{width:a,height:16,backgroundColor:s(e.name),flexShrink:0}}),t.jsx("div",{style:{width:8,height:8,borderRadius:"50%",backgroundColor:"var(--goa-color-greyscale-300)",flexShrink:0}})]})}if(e.category==="iconSize"){const s=r=>r.endsWith("-1")?"1":r.endsWith("-2")?"2":r.endsWith("-3")?"3":r.endsWith("-4")?"4":r.endsWith("-5")?"5":r.endsWith("-6")?"6":r.endsWith("-xs")?"1":r.endsWith("-s")?"2":r.endsWith("-m")?"3":r.endsWith("-l")?"4":r.endsWith("-xl")?"5":"3";return t.jsx("div",{className:"token-icon-size-swatch",style:{width:a,height:a,display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"var(--goa-color-emergency-light)"},title:e.value,children:t.jsx(P,{type:"add",size:s(e.name)})})}if(e.category==="shadow")return t.jsx("div",{className:"token-shadow-swatch",style:{width:64,height:64,display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"white",borderRadius:4},title:e.value,children:t.jsx("div",{style:{width:32,height:32,backgroundColor:"white",borderRadius:8,border:"1px solid var(--goa-color-greyscale-100)",boxShadow:a}})});if(e.category==="fontWeight")return t.jsx("div",{className:"token-font-weight-swatch",style:{fontWeight:a,fontFamily:"var(--goa-fontFamily-sans)",fontSize:"16px",color:"var(--goa-color-greyscale-700)"},title:e.value,children:"Aa"});if(e.category==="letterSpacing")return t.jsx("div",{className:"token-letter-spacing-swatch",style:{letterSpacing:`${a}px`,fontFamily:"var(--goa-fontFamily-sans)",fontSize:"16px",color:"var(--goa-color-greyscale-700)"},title:e.value,children:"Aa"});if(e.category==="typography"){let s={color:"var(--goa-color-greyscale-700)"};try{const r=JSON.parse(e.resolvedValue||"{}");r.fontFamily&&(s.fontFamily=r.fontFamily),r.fontSize&&(s.fontSize=r.fontSize),r.fontWeight&&(s.fontWeight=r.fontWeight),r.lineHeight&&(s.lineHeight=r.lineHeight),r.letterSpacing&&(s.letterSpacing=r.letterSpacing)}catch{s.fontFamily="var(--goa-fontFamily-sans)",s.fontSize="16px"}return t.jsx("div",{className:"token-typography-swatch",style:s,title:e.value,children:"Aa"})}return e.category==="fontSize"?t.jsx("div",{className:"token-font-size-swatch",style:{fontSize:a,fontFamily:"var(--goa-fontFamily-sans)",lineHeight:1,color:"var(--goa-color-greyscale-700)"},title:e.value,children:"Aa"}):e.category==="fontFamily"?t.jsx("div",{className:"token-font-family-swatch",style:{fontFamily:a,fontSize:"14px",color:"var(--goa-color-greyscale-700)"},title:e.value,children:"Abc 123"}):e.category==="lineHeight"?t.jsxs("div",{className:"token-line-height-swatch",style:{lineHeight:a,fontSize:"14px",color:"var(--goa-color-greyscale-700)"},title:e.value,children:["Ag",t.jsx("br",{}),"Ag"]}):t.jsx("span",{className:"token-no-preview",children:"—"})},K=o.useCallback(e=>t.jsx("div",{className:"token-card",children:t.jsx(xe,{type:"interactive",padding:"compact",mb:"none",children:t.jsxs("div",{className:"token-card-content",children:[t.jsxs("div",{className:"token-card-main",children:[M(e),t.jsxs("div",{className:"token-card-info",children:[t.jsx("code",{className:"token-name",children:h(e.name)}),t.jsx("span",{className:"token-value",children:e.value})]}),t.jsx(T,{icon:p===e.name?"checkmark":"copy",size:"small",variant:"dark",ariaLabel:`Copy ${h(e.name)}`,onClick:()=>k(e.name)})]}),t.jsx("goa-badge",{version:"2",type:_(e.category),content:Q(e.category),emphasis:"subtle",icon:"false"})]})})},e.name),[p,k,h]),ee=o.useCallback(e=>t.jsxs("tr",{children:[t.jsx("td",{children:M(e)}),t.jsx("td",{children:t.jsx("code",{className:"token-name",children:h(e.name)})}),t.jsx("td",{children:t.jsx("code",{className:"token-value",children:e.value})}),t.jsx("td",{children:t.jsx("goa-badge",{version:"2",type:_(e.category),content:Q(e.category),emphasis:"subtle",icon:"false"})}),t.jsx("td",{children:t.jsx(T,{icon:p===e.name?"checkmark":"copy",size:"small",variant:"dark",ariaLabel:`Copy ${h(e.name)}`,onClick:()=>k(e.name)})})]},e.name),[p,k,h]),te=d.length>0||i.primary;return t.jsxs("div",{className:"tokens-grid",ref:A,children:[t.jsx("div",{ref:L,className:"tokens-sentinel","aria-hidden":"true"}),t.jsxs("div",{className:`tokens-toolbar ${S?"tokens-toolbar--sticky":""}`,children:[t.jsx("div",{className:"tokens-search-section",children:t.jsx(le,{value:y,onChange:z,onClear:()=>z(""),placeholder:"Search or type / to filter...",commands:J,onCommandSelect:U})}),t.jsxs("div",{className:"tokens-toolbar-actions",children:[t.jsx("div",{className:"syntax-toggle-wrapper",children:t.jsxs("goa-tabs",{ref:V,version:"2",variant:"segmented",initialTab:W==="css"?1:2,orientation:"horizontal",children:[t.jsx("goa-tab",{heading:"CSS",children:t.jsx("span",{})}),t.jsx("goa-tab",{heading:"SCSS",children:t.jsx("span",{})})]})}),t.jsx("span",{className:"filter-btn-desktop",children:t.jsx(C,{type:"secondary",leadingIcon:"filter-lines",size:"compact",onClick:()=>{u?c(!1):(f(d),c(!0))},children:"Filters"})}),t.jsx("span",{className:"filter-btn-mobile",children:t.jsx(T,{icon:"filter-lines",size:"medium",variant:"dark",onClick:()=>{u?c(!1):(f(d),c(!0))}})})]})]}),te&&t.jsxs("div",{className:"tokens-chips",children:[t.jsx(P,{type:"filter-lines",size:"small",fillColor:"var(--goa-color-text-secondary)"}),i.primary&&t.jsx(F,{content:i.primary.key,leadingIcon:i.primary.direction==="asc"?"arrow-up":"arrow-down",secondaryText:i.secondary?"1st":void 0,onClick:()=>b({primary:i.secondary,secondary:null})}),i.secondary&&t.jsx(F,{content:i.secondary.key,leadingIcon:i.secondary.direction==="asc"?"arrow-up":"arrow-down",secondaryText:"2nd",onClick:()=>b(e=>({...e,secondary:null}))}),d.map(e=>t.jsx(F,{content:e,onClick:()=>Y(e)},e)),t.jsx("a",{href:"#",className:"clear-all-link",onClick:e=>{e.preventDefault(),Z()},children:"Clear all"})]}),t.jsxs("p",{className:"tokens-count",children:[w.length," token",w.length!==1?"s":""]}),$==="list"&&t.jsxs("div",{className:"tokens-table-wrapper",onScroll:e=>{const a=e.currentTarget,s=a.querySelector("goa-table");if(!s)return;const r=parseFloat(getComputedStyle(s).marginLeft)||0,n=a.scrollWidth-a.clientWidth,j=a.querySelector(".tokens-table-scroll-shadow-left"),m=a.querySelector(".tokens-table-scroll-shadow-right");j&&(j.style.opacity=a.scrollLeft>r?"1":"0"),m&&(m.style.opacity=a.scrollLeft<n-r?"1":"0")},ref:e=>{e&&requestAnimationFrame(()=>{const a=e.querySelector("goa-table");if(!a)return;const s=parseFloat(getComputedStyle(a).marginLeft)||0,r=e.scrollWidth-e.clientWidth,n=e.querySelector(".tokens-table-scroll-shadow-right");n&&r>s&&(n.style.opacity="1")})},children:[t.jsx("div",{className:"tokens-table-scroll-shadow-left","aria-hidden":"true"}),t.jsx("goa-table",{ref:G,version:"2",width:"100%",variant:"normal","sort-mode":"multi",children:t.jsxs("table",{style:{width:"100%"},children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{style:{width:60},children:"Preview"}),t.jsx("th",{style:{minWidth:320},children:t.jsx("goa-table-sort-header",{version:"2",name:"name",direction:B("name"),"sort-order":H("name"),children:"Token"})}),t.jsx("th",{style:{width:"320px"},children:"Value"}),t.jsx("th",{children:t.jsx("goa-table-sort-header",{version:"2",name:"category",direction:B("category"),"sort-order":H("category"),children:"Category"})}),t.jsx("th",{style:{width:60}})]})}),t.jsx("tbody",{children:w.map(ee)})]})}),t.jsx("div",{className:"tokens-table-scroll-shadow-right","aria-hidden":"true"})]}),$==="card"&&t.jsx("div",{className:"tokens-card-view",children:t.jsx("div",{className:"tokens-card-grid",children:w.map(K)})}),typeof document<"u"&&document.getElementById("push-drawer-portal")&&ce.createPortal(t.jsx(de,{heading:"Filter tokens",open:u,width:"300px",onClose:()=>c(!1),actions:t.jsxs(ue,{alignment:"start",gap:"compact",children:[t.jsx(C,{type:"primary",size:"compact",onClick:X,children:"Apply filters"}),t.jsx(C,{type:"tertiary",size:"compact",onClick:()=>c(!1),children:"Cancel"})]}),children:t.jsxs("div",{className:"filter-drawer-content",children:[t.jsx(ye,{label:"Category",children:t.jsx(he,{name:"category",size:"compact",value:x,onChange:e=>f(e.value),children:g.map(e=>t.jsx(ge,{name:e.name,value:e.name,text:e.name,size:"compact"},e.name))})}),x.length>0&&t.jsxs(t.Fragment,{children:[t.jsx(pe,{}),t.jsx(C,{type:"tertiary",size:"compact",onClick:()=>f([]),children:"Clear all filters"})]})]})}),document.getElementById("push-drawer-portal")),t.jsx("style",{children:`
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
        /* TODO: Remove calc workaround when goa-table V2 gets box-sizing: border-box */
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
          width: calc(100% - 2px) !important;
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

      `})]})}export{Re as TokensGrid};
