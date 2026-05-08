import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as m}from"./index.DeO6U63H.js";import{p as k,C}from"./purify.es.DAHNdKBg.js";import"./button.Cr0WWE4a.js";import"./extract-props.mAATCLkF.js";import"./framework-preference.DlzkYYed.js";/* empty css                        */const j={CUSTOM_ELEMENT_HANDLING:{tagNameCheck:/^goa-/,attributeNameCheck:()=>!0}};function I({title:d,slug:f,code:r,figmaUrl:g,codeMaxHeight:w=200,fullWidth:y=!1,previewStyle:v,titleSize:b="small"}){const[u,x]=m.useState(!1),l=m.useRef(null),c=`example-${f}`;m.useEffect(()=>{if(l.current&&r.webComponents){const a=r.webComponents.match(/<script>([\s\S]*?)<\/script>/i),s=a?a[1]:null,p=r.webComponents.replace(/<goa-([a-z-]+)/g,(t,o)=>o==="microsite-header"?t:`<goa-${o} version="2"`).trim(),i=k.sanitize(p,j);if(l.current.innerHTML=i,s)try{const t=l.current,o=s.replace(/document\.getElementById\s*\(\s*["']([^"']+)["']\s*\)/g,(h,n)=>`__preview__.querySelector("#${n}")`).replace(/document\.querySelector\s*\(\s*["']([^"']+)["']\s*\)/g,(h,n)=>`__preview__.querySelector("${n}")`).replace(/document\.querySelectorAll\s*\(\s*["']([^"']+)["']\s*\)/g,(h,n)=>`__preview__.querySelectorAll("${n}")`);new Function("__preview__",o)(t)}catch(t){console.error("Error executing example script:",t)}}},[r.webComponents]);const _=async()=>{try{const a=`${window.location.origin}${window.location.pathname}#${c}`;await navigator.clipboard.writeText(a),x(!0),setTimeout(()=>x(!1),2e3)}catch(a){console.error("Failed to copy link:",a)}};return e.jsxs("div",{className:"example-preview",children:[e.jsxs("div",{className:"example-header",children:[b==="large"?e.jsx("h1",{id:c,className:"example-title example-title--large",children:d}):e.jsx("h3",{id:c,className:"example-title",children:d}),e.jsxs("div",{className:"example-actions",children:[e.jsx("button",{className:`copy-link-button ${u?"copied":""}`,onClick:_,"aria-label":"Copy link to this example",title:"Copy link",children:u?e.jsx("goa-icon",{version:"2",type:"checkmark",size:"small"}):e.jsx("goa-icon",{version:"2",type:"link",size:"small"})}),g&&e.jsx("a",{href:g,target:"_blank",rel:"noopener noreferrer",className:"figma-link","aria-label":"View in Figma",title:"View in Figma",children:e.jsx("goa-icon",{version:"2",type:"logo-figma",size:"small"})})]})]}),e.jsx("div",{className:"preview-area",children:e.jsx("div",{className:`preview-container${y?" full-width":""}`,ref:l,style:v?Object.fromEntries(v.split(";").filter(a=>a.trim()).map(a=>{const[s,...p]=a.split(":"),i=s.trim();return[i.startsWith("--")?i:i.replace(/-([a-z])/g,(t,o)=>o.toUpperCase()),p.join(":").trim()]})):void 0,children:!r.webComponents&&e.jsx("span",{className:"preview-placeholder",children:"Preview not available"})})}),e.jsx("div",{className:"code-area",children:e.jsx(C,{frameworkCode:{react:r.react,angular:r.angular?{ts:r.angular.component,template:r.angular.template}:void 0,webComponents:r.webComponents},maxHeight:w,showCopy:!0})}),e.jsx("style",{children:`
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
        .figma-link {
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
      `})]})}export{I as ExamplePreview};
