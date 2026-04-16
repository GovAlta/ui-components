import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DeO6U63H.js";import{p as C,C as y}from"./purify.es.CNAf5FHA.js";import"./button.Cr0WWE4a.js";import"./extract-props.mAATCLkF.js";import"./framework-preference.DlzkYYed.js";const j=5*60*1e3;function k(n){const[d,s]=i.useState(null);return i.useEffect(()=>{if(!n)return;const p=`gh-issues-${n}`;try{const r=sessionStorage.getItem(p);if(r){const{count:o,timestamp:l}=JSON.parse(r);if(Date.now()-l<j){s(o);return}}}catch{}(async()=>{try{const r=encodeURIComponent(`repo:GovAlta/ui-components is:issue is:open label:"${n}"`),o=await fetch(`https://api.github.com/search/issues?q=${r}&per_page=1`,{headers:{Accept:"application/vnd.github.v3+json"}});if(!o.ok){console.warn("GitHub API error:",o.status),s(0);return}const u=(await o.json()).total_count||0;s(u);try{sessionStorage.setItem(p,JSON.stringify({count:u,timestamp:Date.now()}))}catch{}}catch(r){console.warn("Failed to fetch GitHub issue count:",r),s(0)}})()},[n]),d}const N={CUSTOM_ELEMENT_HANDLING:{tagNameCheck:/^goa-/,attributeNameCheck:()=>!0}};function R({configurations:n,figmaUrl:d,githubUrl:s,componentName:p}){const[m,r]=i.useState(n.defaultConfigurationId),o=i.useRef(null),l=i.useRef(null),u=k(p),a=n.configurations.find(t=>t.id===m);i.useEffect(()=>{if(o.current&&a){const t=a.code.webComponents,c=t.match(/<script>([\s\S]*?)<\/script>/i),g=c?c[1]:null,x=C.sanitize(t,N).replace(/<goa-(?!microsite-header)([a-z-]+)(?![^>]*version=)/g,'<goa-$1 version="2"').trim();if(o.current.innerHTML=x,g)try{const f=o.current,w=g.replace(/document\.getElementById\s*\(\s*["']([^"']+)["']\s*\)/g,(b,v)=>`container.querySelector("#${v}")`).replace(/document\.querySelector\s*\(\s*["']([^"']+)["']\s*\)/g,(b,v)=>`container.querySelector("${v}")`);new Function("container",w)(f)}catch(f){console.error("Error executing configuration script:",f)}}},[a]);const h=i.useCallback(t=>{const c=Array.isArray(t.value)?t.value[0]:t.value;r(c)},[]);return i.useEffect(()=>{const t=l.current;if(!t)return;const c=g=>{h(g.detail)};return t.addEventListener("_change",c),()=>t.removeEventListener("_change",c)},[h]),a?e.jsxs("div",{className:"configuration-preview",children:[e.jsxs("div",{className:"control-bar",children:[e.jsx("div",{className:"config-dropdown",children:e.jsx("goa-dropdown",{name:"configuration",value:m,version:"2",size:"compact",maxheight:"600px",ref:l,children:n.configurations.map(t=>e.jsx("goa-dropdown-item",{value:t.id,label:t.name},t.id))})}),e.jsxs("div",{className:"external-links",children:[d&&e.jsx("a",{href:d,target:"_blank",rel:"noopener noreferrer",className:"external-link","aria-label":"View in Figma",title:"View in Figma",children:e.jsx("goa-icon",{version:"2",type:"logo-figma",size:"medium"})}),s&&e.jsxs("a",{href:s,target:"_blank",rel:"noopener noreferrer",className:"external-link github-link","aria-label":"View GitHub issues",title:"View GitHub issues",children:[e.jsx("goa-icon",{version:"2",type:"logo-github",size:"medium"}),u!==null&&e.jsxs("span",{className:"issue-count",children:["(",u,")"]})]})]})]}),e.jsx("div",{className:"preview-area",children:e.jsx("div",{className:"preview-container",ref:o})}),e.jsx("div",{className:"code-area",children:e.jsx(y,{frameworkCode:{react:a.code.react,angular:a.code.angular,webComponents:a.code.webComponents},maxHeight:200,showCopy:!0})}),e.jsx("style",{children:`
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
      `})]}):e.jsx("div",{children:"No configuration found"})}export{R as default};
