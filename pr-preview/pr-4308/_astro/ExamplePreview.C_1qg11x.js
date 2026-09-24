import{j as e}from"./jsx-runtime.u17CrQMm.js";import{r as d}from"./index.BAnu8Lhe.js";import{G as v}from"./tooltip.BGrZ7pMJ.js";import"./workspace-layout-scroll-state.CwoYdGbs.js";import{CodeSnippet as C}from"./CodeSnippet.OjW_daIl.js";import{g as j}from"./tab-hash.Badzwm3T.js";import{p as N}from"./purify.es.P3vI1IgJ.js";const $={CUSTOM_ELEMENT_HANDLING:{tagNameCheck:/^goa-/,attributeNameCheck:()=>!0}};function I({title:g,slug:w,code:a,figmaUrl:h,codeMaxHeight:y=200,fullWidth:b=!1,previewStyle:u,titleSize:_="small"}){const[p,x]=d.useState(!1),o=d.useRef(null),s=`example-${w}`;d.useEffect(()=>{if(o.current&&a.webComponents){const r=a.webComponents.match(/<script>([\s\S]*?)<\/script>/i),t=r?r[1]:null,i=a.webComponents.trim(),n=N.sanitize(i,$);if(o.current.innerHTML=n,t)try{const c=o.current,m=t.replace(/document\.getElementById\s*\(\s*["']([^"']+)["']\s*\)/g,(f,l)=>`__preview__.querySelector("#${l}")`).replace(/document\.querySelector\s*\(\s*["']([^"']+)["']\s*\)/g,(f,l)=>`__preview__.querySelector("${l}")`).replace(/document\.querySelectorAll\s*\(\s*["']([^"']+)["']\s*\)/g,(f,l)=>`__preview__.querySelectorAll("${l}")`);new Function("__preview__",m)(c)}catch(c){console.error("Error executing example script:",c)}}},[a.webComponents]);const k=async()=>{try{const r=j(o.current),t=r?`${r}#${s}`:s,i=`${window.location.origin}${window.location.pathname}#${t}`;await navigator.clipboard.writeText(i),x(!0),setTimeout(()=>x(!1),2e3)}catch(r){console.error("Failed to copy link:",r)}};return e.jsxs("div",{className:"example-preview",children:[e.jsxs("div",{className:"example-header",children:[_==="large"?e.jsx("h1",{id:s,className:"example-title example-title--large",children:g}):e.jsx("h3",{id:s,className:"example-title",children:g}),e.jsxs("div",{className:"example-actions",children:[e.jsx(v,{content:p?"Copied":"Copy link",children:e.jsx("button",{className:`copy-link-button ${p?"copied":""}`,onClick:k,"aria-label":"Copy link to this example",children:p?e.jsx("goa-icon",{type:"checkmark",size:"small"}):e.jsx("goa-icon",{type:"link",size:"small"})})}),h&&e.jsx(v,{content:"View Figma component",children:e.jsx("a",{href:h,target:"_blank",rel:"noopener noreferrer",className:"figma-link","aria-label":"View Figma component",children:e.jsx("goa-icon",{type:"logo-figma",size:"small"})})})]})]}),e.jsx("div",{className:"preview-area",children:e.jsx("div",{className:`preview-container${b?" full-width":""}`,ref:o,style:u?Object.fromEntries(u.split(";").filter(r=>r.trim()).map(r=>{const[t,...i]=r.split(":"),n=t.trim();return[n.startsWith("--")?n:n.replace(/-([a-z])/g,(c,m)=>m.toUpperCase()),i.join(":").trim()]})):void 0,children:!a.webComponents&&e.jsx("span",{className:"preview-placeholder",children:"Preview not available"})})}),e.jsx("div",{className:"code-area",children:e.jsx(C,{frameworkCode:{react:a.react,angular:a.angular?{ts:a.angular.component,template:a.angular.template}:void 0,webComponents:a.webComponents},maxHeight:y,showCopy:!0})}),e.jsx("style",{children:`
        .example-preview {
        }

        .example-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--goa-space-m, 1rem);
        }

        .example-title {
          font: var(--goa-typography-heading-s);
          margin: 0 !important; /* Override global h3 margin from tab content */
          color: var(--goa-color-text-default, #333);
        }

        .example-title--large {
          font: var(--goa-typography-heading-l);
        }

        .example-actions {
          display: flex;
          align-items: center;
          gap: var(--goa-space-xs, 0.25rem);
        }

        .copy-link-button,
        .figma-link,
        .figma-link:visited {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: none;
          background: transparent;
          color: var(--goa-color-text-secondary, #666);
          cursor: pointer;
          border-radius: var(--goa-border-radius-s, 4px);
          transition: all 0.15s;
        }

        .copy-link-button:hover,
        .figma-link:hover {
          background: var(--goa-color-greyscale-100, #f1f1f1);
          color: var(--goa-color-interactive-default, #0070c4);
        }

        .copy-link-button.copied {
          color: var(--goa-color-status-success, #2e7d32);
        }

        .preview-area {
          border: 1px solid var(--goa-color-greyscale-200, #dcdcdc);
          border-radius: var(--goa-border-radius-m, 4px);
          overflow: hidden;
          background: var(--goa-color-greyscale-white, #fff);
          min-height: 100px;
          margin-bottom: var(--goa-space-m, 1rem);
        }

        .example-preview .preview-container {
          padding: var(--goa-space-xl, 2rem);
          display: block;  /* Override flex from ConfigurationPreview */
          gap: 0;          /* Reset gap from ConfigurationPreview */
        }

        .example-preview .preview-container.full-width {
          padding-left: 0;
          padding-right: 0;
        }

        .example-preview .preview-container > *:not(style):not([hidden]):not([style*="display: none"]) {
          display: block;
          width: 100%;
        }

        .preview-placeholder {
          color: var(--goa-color-text-secondary, #666);
          font-style: italic;
        }

        .code-area {
          /* CodeSnippet handles its own styling */
        }
      `})]})}export{I as ExamplePreview,I as default};
