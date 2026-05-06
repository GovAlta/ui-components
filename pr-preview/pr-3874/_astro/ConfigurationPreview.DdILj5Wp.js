import{j as o}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DeO6U63H.js";import{G as w}from"./tooltip.Dj_n7hLI.js";import"./theme-context.DBIa_puq.js";import{p as j,C as k}from"./purify.es.D6sLTCS-.js";import"./button.B-V87hrX.js";import"./framework-preference.DlzkYYed.js";/* empty css                        */const N=5*60*1e3;function I(r){const[d,i]=a.useState(null);return a.useEffect(()=>{if(!r)return;const p=`gh-issues-${r}`;try{const n=sessionStorage.getItem(p);if(n){const{count:t,timestamp:l}=JSON.parse(n);if(Date.now()-l<N){i(t);return}}}catch{}(async()=>{try{const n=encodeURIComponent(`repo:GovAlta/ui-components is:issue is:open label:"${r}"`),t=await fetch(`https://api.github.com/search/issues?q=${n}&per_page=1`,{headers:{Accept:"application/vnd.github.v3+json"}});if(!t.ok){console.warn("GitHub API error:",t.status),i(0);return}const u=(await t.json()).total_count||0;i(u);try{sessionStorage.setItem(p,JSON.stringify({count:u,timestamp:Date.now()}))}catch{}}catch(n){console.warn("Failed to fetch GitHub issue count:",n),i(0)}})()},[r]),d}const S={CUSTOM_ELEMENT_HANDLING:{tagNameCheck:/^goa-/,attributeNameCheck:()=>!0}};function T({configurations:r,figmaUrl:d,githubUrl:i,componentName:p}){const[g,n]=a.useState(r.defaultConfigurationId),t=a.useRef(null),l=a.useRef(null),u=I(p),s=r.configurations.find(e=>e.id===g);a.useEffect(()=>{if(t.current&&s){const e=s.code.webComponents,c=typeof e=="string"?e:[e.css?`<style>${e.css}</style>`:"",e.html,e.js?`<script>${e.js}<\/script>`:""].join(""),m=c.match(/<script>([\s\S]*?)<\/script>/i),x=m?m[1]:null,b=j.sanitize(c,S).replace(/<goa-(?!microsite-header)([a-z-]+)(?![^>]*version=)/g,'<goa-$1 version="2"').trim();if(t.current.innerHTML=b,x)try{const f=t.current,C=x.replace(/document\.getElementById\s*\(\s*["']([^"']+)["']\s*\)/g,(y,h)=>`container.querySelector("#${h}")`).replace(/document\.querySelector\s*\(\s*["']([^"']+)["']\s*\)/g,(y,h)=>`container.querySelector("${h}")`);new Function("container",C)(f)}catch(f){console.error("Error executing configuration script:",f)}}},[s]);const v=a.useCallback(e=>{const c=Array.isArray(e.value)?e.value[0]:e.value;n(c)},[]);return a.useEffect(()=>{const e=l.current;if(!e)return;const c=m=>{v(m.detail)};return e.addEventListener("_change",c),()=>e.removeEventListener("_change",c)},[v]),s?o.jsxs("div",{className:"configuration-preview",children:[o.jsxs("div",{className:"control-bar",children:[o.jsx("div",{className:"config-dropdown",children:o.jsx("goa-dropdown",{name:"configuration",value:g,version:"2",size:"compact",maxheight:"600px",ref:l,children:r.configurations.map(e=>o.jsx("goa-dropdown-item",{value:e.id,label:e.name},e.id))})}),o.jsxs("div",{className:"external-links",children:[d&&o.jsx(w,{content:"View Figma component",children:o.jsx("a",{href:d,target:"_blank",rel:"noopener noreferrer",className:"external-link","aria-label":"View Figma component",children:o.jsx("goa-icon",{type:"logo-figma",size:"medium"})})}),i&&o.jsx(w,{content:"View GitHub issues",children:o.jsxs("a",{href:i,target:"_blank",rel:"noopener noreferrer",className:"external-link github-link","aria-label":"View GitHub issues",children:[o.jsx("goa-icon",{type:"logo-github",size:"medium"}),u!==null&&o.jsxs("span",{className:"issue-count",children:["(",u,")"]})]})})]})]}),o.jsx("div",{className:"preview-area",children:o.jsx("div",{className:"preview-container",ref:t})}),o.jsx("div",{className:"code-area",children:o.jsx(k,{frameworkCode:{react:s.code.react,angular:s.code.angular,webComponents:s.code.webComponents},maxHeight:200,showCopy:!0})}),o.jsx("style",{children:`
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

        .external-link {
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
        }
      `})]}):o.jsx("div",{children:"No configuration found"})}export{T as default};
