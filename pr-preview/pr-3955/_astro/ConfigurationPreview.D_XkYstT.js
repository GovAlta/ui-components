import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.DeO6U63H.js";import{G as k}from"./tooltip.Dj_n7hLI.js";import"./theme-context.DBIa_puq.js";import{e as I,p as _,C as z}from"./purify.es.DIT1aTCS.js";import"./button.B-V87hrX.js";import"./framework-preference.DlzkYYed.js";/* empty css                        */const G=5*60*1e3;function A(r){const[m,c]=o.useState(null);return o.useEffect(()=>{if(!r)return;const f=`gh-issues-${r}`;try{const n=sessionStorage.getItem(f);if(n){const{count:a,timestamp:u}=JSON.parse(n);if(Date.now()-u<G){c(a);return}}}catch{}(async()=>{try{const n=encodeURIComponent(`repo:GovAlta/ui-components is:issue is:open label:"${r}"`),a=await fetch(`https://api.github.com/search/issues?q=${n}&per_page=1`,{headers:{Accept:"application/vnd.github.v3+json"}});if(!a.ok){console.warn("GitHub API error:",a.status),c(0);return}const s=(await a.json()).total_count||0;c(s);try{sessionStorage.setItem(f,JSON.stringify({count:s,timestamp:Date.now()}))}catch{}}catch(n){console.warn("Failed to fetch GitHub issue count:",n),c(0)}})()},[r]),m}const $={CUSTOM_ELEMENT_HANDLING:{tagNameCheck:/^goa-/,attributeNameCheck:()=>!0}};function D({configurations:r,figmaUrl:m,githubUrl:c,componentName:f}){const[g,n]=o.useState(r.defaultConfigurationId),[a,u]=o.useState(void 0),s=o.useRef(null),h=o.useRef(null),w=A(f),l=r.configurations.find(e=>e.id===g);o.useEffect(()=>{if(s.current&&l){const e=l.code.webComponents;let i,p,v;if(typeof e=="string"){const d=I(e);i=d.html,p=d.css,v=d.javascript}else i=e.html,p=e.css,v=e.js;const b=[p?`<style>${p}</style>`:"",a??i,v?`<script>${v}<\/script>`:""].join(""),C=r.previewWrapper?r.previewWrapper.replace("{{slot}}",b):b,j=C.match(/<script>([\s\S]*?)<\/script>/i),S=j?j[1]:null,E=_.sanitize(C,$);if(s.current.innerHTML=E.replace(/<goa-(?!microsite-header)([a-z-]+)(?![^>]*version=)/g,'<goa-$1 version="2"').trim(),S)try{const d=s.current,N=S.replace(/document\.getElementById\s*\(\s*["']([^"']+)["']\s*\)/g,(H,x)=>`container.querySelector("#${x}")`).replace(/document\.querySelector\s*\(\s*["']([^"']+)["']\s*\)/g,(H,x)=>`container.querySelector("${x}")`);new Function("container",N)(d)}catch(d){console.error("Error executing configuration script:",d)}}},[l,a]),o.useEffect(()=>{u(void 0)},[g]);const y=o.useCallback(e=>{const i=Array.isArray(e.value)?e.value[0]:e.value;n(i)},[]);return o.useEffect(()=>{const e=h.current;if(!e)return;const i=p=>{y(p.detail)};return e.addEventListener("_change",i),()=>e.removeEventListener("_change",i)},[y]),o.useLayoutEffect(()=>{s.current&&r.previewStyle&&(s.current.style.cssText=r.previewStyle)},[r.previewStyle]),l?t.jsxs("div",{className:"configuration-preview",children:[t.jsxs("div",{className:"control-bar",children:[t.jsx("div",{className:"config-dropdown",children:t.jsx("goa-dropdown",{name:"configuration",value:g,version:"2",size:"compact",maxheight:"600px",ref:h,children:r.configurations.map(e=>t.jsx("goa-dropdown-item",{value:e.id,label:e.name},e.id))})}),t.jsxs("div",{className:"external-links",children:[m&&t.jsx(k,{content:"View Figma component",children:t.jsx("a",{href:m,target:"_blank",rel:"noopener noreferrer",className:"external-link","aria-label":"View Figma component",children:t.jsx("goa-icon",{type:"logo-figma",size:"medium"})})}),c&&t.jsx(k,{content:"View GitHub issues",children:t.jsxs("a",{href:c,target:"_blank",rel:"noopener noreferrer",className:"external-link github-link","aria-label":"View GitHub issues",children:[t.jsx("goa-icon",{type:"logo-github",size:"medium"}),w!==null&&t.jsxs("span",{className:"issue-count",children:["(",w,")"]})]})})]})]}),t.jsx("div",{className:"preview-area",children:t.jsx("div",{className:"preview-container",ref:s})}),t.jsx("div",{className:"code-area",children:t.jsx(z,{frameworkCode:{react:l.code.react,angular:l.code.angular,webComponents:l.code.webComponents},maxHeight:200,showCopy:!0,onHtmlEdit:u})}),t.jsx("style",{children:`
        .configuration-preview {
          display: flex;
          flex-direction: column;
        }

        .control-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--goa-space-m, 1rem);
          margin-bottom: var(--goa-space-m, 1rem);
          position: relative;
        }

        .config-dropdown {
          min-width: 200px;
        }

        .external-links {
          display: flex;
          align-items: center;
          gap: var(--goa-space-s, 0.5rem);
        }

        .external-link,
        .external-link:visited {
          display: flex;
          align-items: center;
          gap: var(--goa-space-2xs, 0.25rem);
          color: var(--goa-color-text-secondary, #666);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .external-link:hover {
          color: var(--goa-color-interactive-default, #0070c4);
        }

        .github-link {
          font-size: var(--goa-font-size-2);
        }

        .issue-count {
          color: var(--goa-color-text-secondary, #666);
        }

        .configuration-preview .preview-area {
          border: 1px solid var(--goa-color-greyscale-200, #dcdcdc);
          border-radius: var(--goa-border-radius-m, 4px);
          background: var(--goa-color-greyscale-white, #fff);
          min-height: 120px;
          margin-bottom: var(--goa-space-m, 1rem);
          position: relative;
          z-index: 2; /* Allow dropdowns to appear above code snippets */
          overflow: visible;
        }

        .configuration-preview .code-area {
          position: relative;
          z-index: 1;
        }

        .configuration-preview .preview-container {
          padding: var(--goa-space-xl, 2rem);
          border-radius: inherit;
          overflow: hidden;
        }
      `})]}):t.jsx("div",{children:"No configuration found"})}export{D as default};
