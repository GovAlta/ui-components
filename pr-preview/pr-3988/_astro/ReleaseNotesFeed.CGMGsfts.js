import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r as d}from"./index.DeO6U63H.js";import{G as v}from"./callout.CNMpsZmT.js";import{G as p}from"./link.t1hbJ35k.js";import"./theme-context.DBIa_puq.js";import{w as g}from"./base-url.nbr3BnO8.js";const b={"web-components":"Web components",react:"React",angular:"Angular",common:"Common"},h=["January","February","March","April","May","June","July","August","September","October","November","December"];function y(e){const[r,n,o]=e.split("-").map(Number);return!r||!n||!o?e:`${h[n-1]} ${o}, ${r}`}function j(e){const[r,n]=e.split("-").map(Number);return`${h[n-1]} ${r}`}function N(e){const[r,n]=e.split("-");return`month-${r}-${n}`}function k(e){return e.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}function w(e){return e.startsWith("http")?{href:e,label:"Details"}:{href:`https://github.com/GovAlta/ui-components/issues/${e}`,label:`#${e}`}}function C({slugs:e}){return a.jsx(a.Fragment,{children:e.map((r,n)=>a.jsxs("span",{children:[n>0&&", ",a.jsx(p,{color:"dark",size:"small",children:a.jsx("a",{href:g(`/components/${r}`),children:k(r)})})]},r))})}function $({issue:e}){const{href:r,label:n}=w(e);return a.jsx("a",{className:"rn-link-quiet",href:r,target:"_blank",rel:"noreferrer",children:n})}function u({change:e}){const r=!!e.components&&e.components.length>0;return!r&&!e.issue?null:a.jsxs("p",{className:"rn-change-meta",children:[r&&a.jsx(C,{slugs:e.components}),r&&e.issue&&" · ",e.issue&&a.jsx($,{issue:e.issue})]})}function f({items:e}){return a.jsx("ul",{className:"rn-bullets",children:e.map((r,n)=>a.jsx("li",{children:r},n))})}function x({links:e}){return!e||e.length===0?null:a.jsx("ul",{className:"rn-doclinks",children:e.map((r,n)=>{const o=r.href.startsWith("http");return a.jsx("li",{children:a.jsx(p,{color:"interactive",children:a.jsx("a",{href:o?r.href:g(r.href),...o?{target:"_blank",rel:"noreferrer"}:{},children:r.label})})},n)})})}function m({change:e,calloutType:r,label:n}){const{migration:o}=e;return a.jsxs(v,{type:r,emphasis:"low",size:"medium",heading:n,mb:"none",children:[a.jsx("p",{className:"rn-callout-title",children:e.title}),e.detail&&a.jsx("p",{className:"rn-callout-detail",children:e.detail}),e.bullets&&e.bullets.length>0&&a.jsx(f,{items:e.bullets}),o&&a.jsxs("div",{className:"rn-migration",children:[o.before&&a.jsxs("div",{className:"rn-migration-step",children:[a.jsx("span",{className:"rn-migration-label",children:"Before"}),a.jsx("pre",{className:"rn-code",children:a.jsx("code",{children:o.before})})]}),o.after&&a.jsxs("div",{className:"rn-migration-step",children:[a.jsx("span",{className:"rn-migration-label",children:"After"}),a.jsx("pre",{className:"rn-code",children:a.jsx("code",{children:o.after})})]}),o.link&&a.jsx("a",{className:"rn-link-quiet",href:o.link,target:"_blank",rel:"noreferrer",children:"Migration guide"})]}),a.jsx(x,{links:e.links}),a.jsx(u,{change:e})]})}function M({change:e}){return a.jsxs("div",{className:"rn-change",children:[a.jsx("h4",{className:"rn-change-title",children:e.title}),e.detail&&a.jsx("p",{className:"rn-change-detail",children:e.detail}),e.bullets&&e.bullets.length>0&&a.jsx(f,{items:e.bullets}),a.jsx(x,{links:e.links}),a.jsx(u,{change:e})]})}function A({change:e}){return e.breaking?a.jsx(m,{change:e,calloutType:"emergency",label:"Breaking change"}):e.experimental?a.jsx(m,{change:e,calloutType:"information",label:"Experimental"}):a.jsx(M,{change:e})}function E({release:e}){return a.jsxs("article",{className:"rn-release",children:[a.jsx("h3",{className:"rn-date",children:y(e.date)}),e.versions.length>0&&a.jsx("div",{className:"rn-versions",children:e.versions.map(r=>a.jsx("goa-badge",{version:"2",type:"default",emphasis:"subtle",icon:"false",content:`${b[r.package]} ${r.version}`},r.package))}),e.intro&&a.jsx("p",{className:"rn-intro",children:e.intro}),a.jsx("div",{className:"rn-changes",children:e.changes.map((r,n)=>a.jsx(A,{change:r},n))})]})}function D({releases:e}){const r=d.useMemo(()=>{const t=[],s=new Map;for(const l of e){const i=j(l.date);let c=s.get(i);c||(c={label:i,id:N(l.date),releases:[]},s.set(i,c),t.push(c)),c.releases.push(l)}return t},[e]),[n,o]=d.useState(r[0]?.id??"");return d.useEffect(()=>{if(r.length===0)return;const t=new IntersectionObserver(s=>{const l=s.filter(i=>i.isIntersecting).sort((i,c)=>i.boundingClientRect.top-c.boundingClientRect.top);l[0]&&o(l[0].target.id)},{rootMargin:"0px 0px -70% 0px"});return r.forEach(s=>{const l=document.getElementById(s.id);l&&t.observe(l)}),()=>t.disconnect()},[r]),a.jsxs("div",{className:"rn",children:[a.jsx("div",{className:"rn-main",children:r.map(t=>a.jsxs("section",{className:"rn-month","aria-labelledby":t.id,children:[a.jsx("h2",{className:"rn-month-heading",id:t.id,children:t.label}),t.releases.map(s=>a.jsx(E,{release:s},s.date))]},t.id))}),r.length>1&&a.jsx("nav",{className:"rn-monthnav","aria-label":"Jump to month",children:a.jsx("ul",{children:r.map(t=>a.jsx("li",{children:a.jsx("a",{href:`#${t.id}`,"aria-current":n===t.id?"true":void 0,children:t.label})},t.id))})}),a.jsx("style",{children:`
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
        .rn-month + .rn-month {
          margin-top: var(--goa-space-3xl);
        }

        .rn-month-heading {
          font: var(--goa-typography-heading-l);
          color: var(--goa-color-text-default);
          margin: 0 0 var(--goa-space-l);
        }

        .rn-release + .rn-release {
          margin-top: var(--goa-space-2xl);
        }

        .rn-date {
          font: var(--goa-typography-heading-s);
          color: var(--goa-color-text-default);
          margin: 0 0 var(--goa-space-s);
        }

        /* Subtle version badges: only the packages that changed this release. */
        .rn-versions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--goa-space-xs);
          margin: 0 0 var(--goa-space-m);
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

        .rn-change-detail,
        .rn-callout-detail {
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

        /* Reserved callout (experimental / breaking) inner spacing. */
        .rn-callout-title {
          font: var(--goa-typography-body-s);
          font-weight: var(--goa-font-weight-bold);
          color: var(--goa-color-text-default);
          margin: 0 0 var(--goa-space-2xs);
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

        .rn-callout-detail {
          margin-bottom: var(--goa-space-m);
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
      `})]})}export{D as ReleaseNotesFeed};
