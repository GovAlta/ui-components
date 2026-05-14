import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as d}from"./index.DeO6U63H.js";import{G as f}from"./tooltip.Dj_n7hLI.js";import"./theme-context.DBIa_puq.js";import{p as C,C as j}from"./purify.es.BzrGj93H.js";import"./button.B-V87hrX.js";import"./framework-preference.DlzkYYed.js";/* empty css                        */const N={CUSTOM_ELEMENT_HANDLING:{tagNameCheck:/^goa-/,attributeNameCheck:()=>!0}};function M({title:g,slug:w,code:r,figmaUrl:u,codeMaxHeight:y=200,fullWidth:b=!1,previewStyle:x,titleSize:_="small"}){const[c,h]=d.useState(!1),l=d.useRef(null),p=`example-${w}`;d.useEffect(()=>{if(l.current&&r.webComponents){const a=r.webComponents.match(/<script>([\s\S]*?)<\/script>/i),s=a?a[1]:null,m=r.webComponents.replace(/<goa-([a-z-]+)/g,(o,t)=>t==="microsite-header"?o:`<goa-${t} version="2"`).trim(),i=C.sanitize(m,N);if(l.current.innerHTML=i,s)try{const o=l.current,t=s.replace(/document\.getElementById\s*\(\s*["']([^"']+)["']\s*\)/g,(v,n)=>`__preview__.querySelector("#${n}")`).replace(/document\.querySelector\s*\(\s*["']([^"']+)["']\s*\)/g,(v,n)=>`__preview__.querySelector("${n}")`).replace(/document\.querySelectorAll\s*\(\s*["']([^"']+)["']\s*\)/g,(v,n)=>`__preview__.querySelectorAll("${n}")`);new Function("__preview__",t)(o)}catch(o){console.error("Error executing example script:",o)}}},[r.webComponents]);const k=async()=>{try{const a=`${window.location.origin}${window.location.pathname}#${p}`;await navigator.clipboard.writeText(a),h(!0),setTimeout(()=>h(!1),2e3)}catch(a){console.error("Failed to copy link:",a)}};return e.jsxs("div",{className:"example-preview",children:[e.jsxs("div",{className:"example-header",children:[_==="large"?e.jsx("h1",{id:p,className:"example-title example-title--large",children:g}):e.jsx("h3",{id:p,className:"example-title",children:g}),e.jsxs("div",{className:"example-actions",children:[e.jsx(f,{content:c?"Copied":"Copy link",children:e.jsx("button",{className:`copy-link-button ${c?"copied":""}`,onClick:k,"aria-label":"Copy link to this example",children:c?e.jsx("goa-icon",{type:"checkmark",size:"small"}):e.jsx("goa-icon",{type:"link",size:"small"})})}),u&&e.jsx(f,{content:"View Figma component",children:e.jsx("a",{href:u,target:"_blank",rel:"noopener noreferrer",className:"figma-link","aria-label":"View Figma component",children:e.jsx("goa-icon",{type:"logo-figma",size:"small"})})})]})]}),e.jsx("div",{className:"preview-area",children:e.jsx("div",{className:`preview-container${b?" full-width":""}`,ref:l,style:x?Object.fromEntries(x.split(";").filter(a=>a.trim()).map(a=>{const[s,...m]=a.split(":"),i=s.trim();return[i.startsWith("--")?i:i.replace(/-([a-z])/g,(o,t)=>t.toUpperCase()),m.join(":").trim()]})):void 0,children:!r.webComponents&&e.jsx("span",{className:"preview-placeholder",children:"Preview not available"})})}),e.jsx("div",{className:"code-area",children:e.jsx(j,{frameworkCode:{react:r.react,angular:r.angular?{ts:r.angular.component,template:r.angular.template}:void 0,webComponents:r.webComponents},maxHeight:y,showCopy:!0})}),e.jsx("style",{children:`
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
      `})]})}export{M as ExamplePreview};
