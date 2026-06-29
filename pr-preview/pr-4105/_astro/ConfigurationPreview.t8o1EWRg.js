import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DeO6U63H.js";import{G as y}from"./tooltip.CcOCTibQ.js";import"./workspace-layout-scroll-state.Ch1khooy.js";import{CodeSnippet as k}from"./CodeSnippet.BpjQ7hZi.js";import{p as S}from"./purify.es.D6gMnemd.js";import"./button.DwTFmpvn.js";import"./framework-preference.DlzkYYed.js";/* empty css                             */const N=5*60*1e3;function E(r){const[u,i]=s.useState(null);return s.useEffect(()=>{if(!r)return;const d=`gh-issues-${r}`;try{const n=sessionStorage.getItem(d);if(n){const{count:o,timestamp:l}=JSON.parse(n);if(Date.now()-l<N){i(o);return}}}catch{}(async()=>{try{const n=encodeURIComponent(`repo:GovAlta/ui-components is:issue is:open label:"${r}"`),o=await fetch(`https://api.github.com/search/issues?q=${n}&per_page=1`,{headers:{Accept:"application/vnd.github.v3+json"}});if(!o.ok){console.warn("GitHub API error:",o.status),i(0);return}const p=(await o.json()).total_count||0;i(p);try{sessionStorage.setItem(d,JSON.stringify({count:p,timestamp:Date.now()}))}catch{}}catch(n){console.warn("Failed to fetch GitHub issue count:",n),i(0)}})()},[r]),u}const I={CUSTOM_ELEMENT_HANDLING:{tagNameCheck:/^goa-/,attributeNameCheck:()=>!0}};function q({configurations:r,figmaUrl:u,githubUrl:i,componentName:d}){const[g,n]=s.useState(r.defaultConfigurationId),o=s.useRef(null),l=s.useRef(null),p=E(d),a=r.configurations.find(e=>e.id===g);s.useEffect(()=>{if(o.current&&a){const e=a.code.webComponents,c=typeof e=="string"?e:[e.css?`<style>${e.css}</style>`:"",e.html,e.js?`<script>${e.js}<\/script>`:""].join(""),m=r.previewWrapper?r.previewWrapper.replace("{{slot}}",c):c,x=m.match(/<script>([\s\S]*?)<\/script>/i),w=x?x[1]:null,b=S.sanitize(m,I);if(o.current.innerHTML=b.replace(/<goa-(?!microsite-header)([a-z-]+)(?![^>]*version=)/g,'<goa-$1 version="2"').trim(),w)try{const f=o.current,C=w.replace(/document\.getElementById\s*\(\s*["']([^"']+)["']\s*\)/g,(j,v)=>`container.querySelector("#${v}")`).replace(/document\.querySelector\s*\(\s*["']([^"']+)["']\s*\)/g,(j,v)=>`container.querySelector("${v}")`);new Function("container",C)(f)}catch(f){console.error("Error executing configuration script:",f)}}},[a]);const h=s.useCallback(e=>{const c=Array.isArray(e.value)?e.value[0]:e.value;n(c)},[]);return s.useEffect(()=>{const e=l.current;if(!e)return;const c=m=>{h(m.detail)};return e.addEventListener("_change",c),()=>e.removeEventListener("_change",c)},[h]),s.useLayoutEffect(()=>{o.current&&r.previewStyle&&(o.current.style.cssText=r.previewStyle)},[r.previewStyle]),a?t.jsxs("div",{className:"configuration-preview",children:[t.jsxs("div",{className:"control-bar",children:[t.jsx("div",{className:"config-dropdown",children:t.jsx("goa-dropdown",{name:"configuration",value:g,version:"2",size:"compact",maxheight:"600px",ref:l,children:r.configurations.map(e=>t.jsx("goa-dropdown-item",{value:e.id,label:e.name},e.id))})}),t.jsxs("div",{className:"external-links",children:[u&&t.jsx(y,{content:"View Figma component",children:t.jsx("a",{href:u,target:"_blank",rel:"noopener noreferrer",className:"external-link","aria-label":"View Figma component",children:t.jsx("goa-icon",{type:"logo-figma",size:"medium"})})}),i&&t.jsx(y,{content:"View GitHub issues",children:t.jsxs("a",{href:i,target:"_blank",rel:"noopener noreferrer",className:"external-link github-link","aria-label":"View GitHub issues",children:[t.jsx("goa-icon",{type:"logo-github",size:"medium"}),p!==null&&t.jsxs("span",{className:"issue-count",children:["(",p,")"]})]})})]})]}),t.jsx("div",{className:"preview-area",children:t.jsx("div",{className:"preview-container",ref:o})}),t.jsx("div",{className:"code-area",children:t.jsx(k,{frameworkCode:{react:a.code.react,angular:a.code.angular,webComponents:a.code.webComponents},maxHeight:200,showCopy:!0})}),t.jsx("style",{children:`
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
      `})]}):t.jsx("div",{children:"No configuration found"})}export{q as default};
