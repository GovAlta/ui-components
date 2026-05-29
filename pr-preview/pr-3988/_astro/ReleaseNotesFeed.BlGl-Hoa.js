import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r as d}from"./index.DeO6U63H.js";import{G as h}from"./callout.CNMpsZmT.js";import{G as p}from"./link.t1hbJ35k.js";import"./theme-context.DBIa_puq.js";import{w as g}from"./base-url.nbr3BnO8.js";const u={"web-components":"Web components",react:"React",angular:"Angular",common:"Common"},x={"web-components":"@abgov/web-components",react:"@abgov/react-components",angular:"@abgov/angular-components",common:"@abgov/ui-components-common"},m=["January","February","March","April","May","June","July","August","September","October","November","December"];function f(e){const[r,n,s]=e.split("-").map(Number);return!r||!n||!s?e:`${m[n-1]} ${s}, ${r}`}function v(e){const[r,n]=e.split("-").map(Number);return`${m[n-1]} ${r}`}function b(e){const[r,n]=e.split("-");return`month-${r}-${n}`}function y(e){return e.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}function j(e){return e.startsWith("http")?{href:e,label:"Details"}:{href:`https://github.com/GovAlta/ui-components/issues/${e}`,label:`#${e}`}}function w(e,r){return`https://www.npmjs.com/package/${x[e]}/v/${r}`}function N({slugs:e}){return a.jsx(a.Fragment,{children:e.map((r,n)=>a.jsxs("span",{children:[n>0&&", ",a.jsx(p,{color:"dark",size:"small",children:a.jsx("a",{href:g(`/components/${r}`),children:y(r)})})]},r))})}function k({issue:e}){const{href:r,label:n}=j(e);return a.jsx("a",{className:"rn-link-quiet",href:r,target:"_blank",rel:"noreferrer",children:n})}function C({change:e}){const r=!!e.components&&e.components.length>0;return!r&&!e.issue?null:a.jsxs("p",{className:"rn-change-meta",children:[r&&a.jsx(N,{slugs:e.components}),r&&e.issue&&" · ",e.issue&&a.jsx(k,{issue:e.issue})]})}function M({items:e}){return a.jsx("ul",{className:"rn-bullets",children:e.map((r,n)=>a.jsx("li",{children:r},n))})}function $({links:e}){return!e||e.length===0?null:a.jsx("ul",{className:"rn-doclinks",children:e.map((r,n)=>{const s=r.href.startsWith("http");return a.jsx("li",{children:a.jsx(p,{color:"interactive",children:a.jsx("a",{href:s?r.href:g(r.href),...s?{target:"_blank",rel:"noreferrer"}:{},children:r.label})})},n)})})}function A({label:e,type:r}){return a.jsx("goa-badge",{version:"2",type:r,emphasis:"subtle",content:e})}function E({migration:e}){return a.jsxs("div",{className:"rn-migration",children:[e.before&&a.jsxs("div",{className:"rn-migration-step",children:[a.jsx("span",{className:"rn-migration-label",children:"Before"}),a.jsx("pre",{className:"rn-code",children:a.jsx("code",{children:e.before})})]}),e.after&&a.jsxs("div",{className:"rn-migration-step",children:[a.jsx("span",{className:"rn-migration-label",children:"After"}),a.jsx("pre",{className:"rn-code",children:a.jsx("code",{children:e.after})})]}),e.link&&a.jsx("a",{className:"rn-link-quiet",href:e.link,target:"_blank",rel:"noreferrer",children:"Migration guide"})]})}function L({change:e}){const r=e.breaking?{label:"Breaking change",type:"emergency"}:e.experimental?{label:"Experimental",type:"information"}:null,n=r?a.jsxs("div",{className:"rn-change-title-row",children:[a.jsx("h4",{className:"rn-change-title",children:e.title}),a.jsx(A,{label:r.label,type:r.type})]}):a.jsx("h4",{className:"rn-change-title",children:e.title}),s=a.jsxs(a.Fragment,{children:[n,e.detail&&a.jsx("p",{className:"rn-change-detail",children:e.detail}),e.bullets&&e.bullets.length>0&&a.jsx(M,{items:e.bullets}),e.migration&&a.jsx(E,{migration:e.migration}),a.jsx($,{links:e.links}),a.jsx(C,{change:e})]});return r?a.jsx(h,{type:r.type,emphasis:"low",size:"medium",heading:"",mb:"none",children:s}):a.jsx("div",{className:"rn-change",children:s})}function B({release:e}){return a.jsxs("article",{className:"rn-release",children:[a.jsx("h3",{className:"rn-date",children:f(e.date)}),e.versions.length>0&&a.jsx("p",{className:"rn-versions",children:e.versions.map((r,n)=>a.jsxs("span",{children:[n>0&&a.jsx("span",{className:"rn-version-sep","aria-hidden":"true",children:" · "}),a.jsx(p,{color:"dark",size:"small",children:a.jsxs("a",{href:w(r.package,r.version),target:"_blank",rel:"noreferrer",children:[u[r.package]," ",r.version]})})]},r.package))}),e.intro&&a.jsx("p",{className:"rn-intro",children:e.intro}),a.jsx("div",{className:"rn-changes",children:e.changes.map((r,n)=>a.jsx(L,{change:r},n))})]})}function F({releases:e}){const r=d.useMemo(()=>{const t=[],i=new Map;for(const o of e){const l=v(o.date);let c=i.get(l);c||(c={label:l,id:b(o.date),releases:[]},i.set(l,c),t.push(c)),c.releases.push(o)}return t},[e]),[n,s]=d.useState(r[0]?.id??"");return d.useEffect(()=>{if(r.length===0)return;const t=new IntersectionObserver(i=>{const o=i.filter(l=>l.isIntersecting).sort((l,c)=>l.boundingClientRect.top-c.boundingClientRect.top);o[0]&&s(o[0].target.id)},{rootMargin:"0px 0px -70% 0px"});return r.forEach(i=>{const o=document.getElementById(i.id);o&&t.observe(o)}),()=>t.disconnect()},[r]),a.jsxs("div",{className:"rn",children:[a.jsx("div",{className:"rn-main",children:r.map((t,i)=>a.jsxs("section",{className:"rn-month","aria-labelledby":t.id,children:[a.jsx("h2",{className:i===0?"rn-month-heading rn-sr-only":"rn-month-heading",id:t.id,children:t.label}),t.releases.map(o=>a.jsx(B,{release:o},o.date))]},t.id))}),r.length>1&&a.jsx("nav",{className:"rn-monthnav","aria-label":"Jump to month",children:a.jsx("ul",{children:r.map(t=>a.jsx("li",{children:a.jsx("a",{href:`#${t.id}`,"aria-current":n===t.id?"true":void 0,children:t.label})},t.id))})}),a.jsx("style",{children:`
        .rn {
          display: flex;
          align-items: flex-start;
          gap: var(--goa-space-3xl);
        }

        .rn-main {
          flex: 1;
          min-width: 0;
          max-width: 70ch;
        }

        /* Month grouping (Claude-style): a prominent month heading, then the
           dated releases under it. */
        .rn-month {
          position: relative;
        }

        .rn-month + .rn-month {
          margin-top: var(--goa-space-3xl);
        }

        .rn-month-heading {
          font: var(--goa-typography-heading-l);
          color: var(--goa-color-text-default);
          margin: 0 0 var(--goa-space-l);
        }

        /* Visually hidden but kept in the DOM (anchor + scroll-spy target). */
        .rn-sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: 0;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
          border: 0;
        }

        .rn-release + .rn-release {
          margin-top: var(--goa-space-2xl);
        }

        .rn-date {
          font: var(--goa-typography-heading-s);
          color: var(--goa-color-text-default);
          margin: 0 0 var(--goa-space-s);
        }

        /* Quiet version links to each package's npm page. Renders inline as
           "Name x.y.z · Name x.y.z · …" under the date. */
        .rn-versions {
          font: var(--goa-typography-body-s);
          margin: 0 0 var(--goa-space-m);
        }

        .rn-version-sep {
          color: var(--goa-color-text-secondary);
          padding: 0 var(--goa-space-3xs);
        }

        .rn-intro {
          font: var(--goa-typography-body-m);
          color: var(--goa-color-text-default);
          margin: 0 0 var(--goa-space-l);
        }

        /* Changes: each is title + detail, spaced apart. */
        .rn-changes {
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-xl);
        }

        .rn-change-title {
          font: var(--goa-typography-body-m);
          font-weight: var(--goa-font-weight-bold);
          color: var(--goa-color-text-default);
          margin: 0 0 var(--goa-space-2xs);
        }

        /* Title row: change title + inline status badge to the right. Used
           inside the body of a low-emphasis callout (experimental /
           breaking), in place of the callout's heading prop. */
        .rn-change-title-row {
          display: flex;
          align-items: center;
          gap: var(--goa-space-xs);
          flex-wrap: wrap;
          margin: 0 0 var(--goa-space-2xs);
        }

        .rn-change-title-row .rn-change-title {
          margin: 0;
        }

        .rn-change-detail {
          font: var(--goa-typography-body-m);
          color: var(--goa-color-text-default);
          margin: 0;
        }

        .rn-bullets {
          margin: var(--goa-space-2xs) 0 0;
          padding-left: var(--goa-space-l);
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-2xs);
          font: var(--goa-typography-body-m);
          color: var(--goa-color-text-default);
        }

        /* Quiet meta line: component links + issue reference. */
        .rn-change-meta {
          margin: var(--goa-space-2xs) 0 0;
          font: var(--goa-typography-body-s);
        }

        .rn-link-quiet {
          color: var(--goa-color-text-secondary);
          font: var(--goa-typography-body-s);
          white-space: nowrap;
        }

        /* "Learn more" / documentation links list. */
        .rn-doclinks {
          list-style: none;
          margin: var(--goa-space-s) 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-2xs);
          font: var(--goa-typography-body-m);
        }

        /* Breaking-change migration: before/after code. */
        .rn-migration {
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-s);
        }

        .rn-migration-label {
          display: block;
          font: var(--goa-typography-body-s);
          font-weight: var(--goa-font-weight-bold);
          color: var(--goa-color-text-secondary);
          margin-bottom: var(--goa-space-3xs);
        }

        .rn-code {
          margin: 0;
          padding: var(--goa-space-xs) var(--goa-space-s);
          background: var(--goa-color-greyscale-100);
          border-radius: var(--goa-border-radius-m);
          font-family: var(--goa-font-family-mono, monospace);
          font-size: var(--goa-font-size-2);
          overflow-x: auto;
        }

        /* Right-side month jump-nav (Claude-style), with a vertical rule and an
           active indicator that follows scroll. */
        .rn-monthnav {
          position: sticky;
          top: var(--goa-space-xl);
          width: 12rem;
          flex-shrink: 0;
        }

        .rn-monthnav ul {
          list-style: none;
          margin: 0;
          padding: 0;
          border-left: 1px solid var(--goa-color-greyscale-200);
        }

        .rn-monthnav a {
          display: block;
          margin-left: -1px;
          padding: var(--goa-space-2xs) var(--goa-space-m);
          border-left: 2px solid transparent;
          color: var(--goa-color-text-secondary);
          font: var(--goa-typography-body-s);
          text-decoration: none;
        }

        .rn-monthnav a:hover {
          color: var(--goa-color-text-default);
        }

        .rn-monthnav a[aria-current="true"] {
          color: var(--goa-color-text-default);
          font-weight: var(--goa-font-weight-bold);
          border-left-color: var(--goa-color-interactive-default);
        }

        /* Hide the month nav when there isn't room beside the feed. */
        @media (max-width: 1023px) {
          .rn-monthnav {
            display: none;
          }
        }
      `})]})}export{F as ReleaseNotesFeed};
