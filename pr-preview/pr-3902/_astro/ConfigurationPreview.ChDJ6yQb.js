import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DeO6U63H.js";import{p as y,C as j}from"./purify.es.UsY5D38i.js";import"./button.Cr0WWE4a.js";import"./extract-props.mAATCLkF.js";import"./framework-preference.DlzkYYed.js";/* empty css                        */const k=5*60*1e3;function N(n){const[d,i]=a.useState(null);return a.useEffect(()=>{if(!n)return;const p=`gh-issues-${n}`;try{const r=sessionStorage.getItem(p);if(r){const{count:o,timestamp:l}=JSON.parse(r);if(Date.now()-l<k){i(o);return}}}catch{}(async()=>{try{const r=encodeURIComponent(`repo:GovAlta/ui-components is:issue is:open label:"${n}"`),o=await fetch(`https://api.github.com/search/issues?q=${r}&per_page=1`,{headers:{Accept:"application/vnd.github.v3+json"}});if(!o.ok){console.warn("GitHub API error:",o.status),i(0);return}const u=(await o.json()).total_count||0;i(u);try{sessionStorage.setItem(p,JSON.stringify({count:u,timestamp:Date.now()}))}catch{}}catch(r){console.warn("Failed to fetch GitHub issue count:",r),i(0)}})()},[n]),d}const I={CUSTOM_ELEMENT_HANDLING:{tagNameCheck:/^goa-/,attributeNameCheck:()=>!0}};function F({configurations:n,figmaUrl:d,githubUrl:i,componentName:p}){const[m,r]=a.useState(n.defaultConfigurationId),o=a.useRef(null),l=a.useRef(null),u=N(p),s=n.configurations.find(e=>e.id===m);a.useEffect(()=>{if(o.current&&s){const e=s.code.webComponents,c=typeof e=="string"?e:[e.css?`<style>${e.css}</style>`:"",e.html,e.js?`<script>${e.js}<\/script>`:""].join(""),g=c.match(/<script>([\s\S]*?)<\/script>/i),x=g?g[1]:null,w=y.sanitize(c,I).replace(/<goa-(?!microsite-header)([a-z-]+)(?![^>]*version=)/g,'<goa-$1 version="2"').trim();if(o.current.innerHTML=w,x)try{const f=o.current,C=x.replace(/document\.getElementById\s*\(\s*["']([^"']+)["']\s*\)/g,(b,h)=>`container.querySelector("#${h}")`).replace(/document\.querySelector\s*\(\s*["']([^"']+)["']\s*\)/g,(b,h)=>`container.querySelector("${h}")`);new Function("container",C)(f)}catch(f){console.error("Error executing configuration script:",f)}}},[s]);const v=a.useCallback(e=>{const c=Array.isArray(e.value)?e.value[0]:e.value;r(c)},[]);return a.useEffect(()=>{const e=l.current;if(!e)return;const c=g=>{v(g.detail)};return e.addEventListener("_change",c),()=>e.removeEventListener("_change",c)},[v]),s?t.jsxs("div",{className:"configuration-preview",children:[t.jsxs("div",{className:"control-bar",children:[t.jsx("div",{className:"config-dropdown",children:t.jsx("goa-dropdown",{name:"configuration",value:m,version:"2",size:"compact",maxheight:"600px",ref:l,children:n.configurations.map(e=>t.jsx("goa-dropdown-item",{value:e.id,label:e.name},e.id))})}),t.jsxs("div",{className:"external-links",children:[d&&t.jsx("a",{href:d,target:"_blank",rel:"noopener noreferrer",className:"external-link","aria-label":"View in Figma",title:"View in Figma",children:t.jsx("goa-icon",{type:"logo-figma",size:"medium"})}),i&&t.jsxs("a",{href:i,target:"_blank",rel:"noopener noreferrer",className:"external-link github-link","aria-label":"View GitHub issues",title:"View GitHub issues",children:[t.jsx("goa-icon",{type:"logo-github",size:"medium"}),u!==null&&t.jsxs("span",{className:"issue-count",children:["(",u,")"]})]})]})]}),t.jsx("div",{className:"preview-area",children:t.jsx("div",{className:"preview-container",ref:o})}),t.jsx("div",{className:"code-area",children:t.jsx(j,{frameworkCode:{react:s.code.react,angular:s.code.angular,webComponents:s.code.webComponents},maxHeight:200,showCopy:!0})}),t.jsx("style",{children:`
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
      `})]}):t.jsx("div",{children:"No configuration found"})}export{F as default};
