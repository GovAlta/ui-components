import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r as d}from"./index.DeO6U63H.js";import{G as h}from"./callout.CNMpsZmT.js";import{G as g}from"./link.t1hbJ35k.js";import"./theme-context.DBIa_puq.js";import{w as p}from"./base-url.nbr3BnO8.js";const u={"web-components":"Web components",react:"React",angular:"Angular",common:"Common"},f={"web-components":"@abgov/web-components",react:"@abgov/react-components",angular:"@abgov/angular-components",common:"@abgov/ui-components-common"},x={breaking:"Breaking changes",addition:"New additions","feature-change":"Feature changes",fix:"Bug fixes",website:"Design system website"},v=["breaking","addition","feature-change","fix","website"],m=["January","February","March","April","May","June","July","August","September","October","November","December"];function y(e){const[t,s,o]=e.split("-").map(Number);return!t||!s||!o?e:`${m[s-1]} ${o}, ${t}`}function b(e){const[t,s]=e.split("-").map(Number);return`${m[s-1]} ${t}`}function j(e){const[t,s]=e.split("-");return`month-${t}-${s}`}function w(e){return e.split("-").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}function N(e){return e.startsWith("http")?{href:e,label:"Details"}:{href:`https://github.com/GovAlta/ui-components/issues/${e}`,label:`#${e}`}}function k(e,t){return`https://www.npmjs.com/package/${f[e]}/v/${t}`}function C(e){const t=new Map;for(const s of e){const o=t.get(s.type)??[];o.push(s),t.set(s.type,o)}return v.filter(s=>t.has(s)).map(s=>({type:s,changes:t.get(s)}))}function E({slugs:e}){return a.jsx(a.Fragment,{children:e.map((t,s)=>a.jsxs("span",{children:[s>0&&", ",a.jsx(g,{color:"dark",size:"small",children:a.jsx("a",{href:p(`/components/${t}`),children:w(t)})})]},t))})}function A({issue:e}){const{href:t,label:s}=N(e);return a.jsx("a",{className:"release-notes-link-quiet",href:t,target:"_blank",rel:"noreferrer",children:s})}function B({change:e}){const t=!!e.components&&e.components.length>0;return!t&&!e.issue?null:a.jsxs("p",{className:"release-notes-change-meta",children:[t&&a.jsx(E,{slugs:e.components}),t&&e.issue&&" · ",e.issue&&a.jsx(A,{issue:e.issue})]})}function M({items:e}){return a.jsx("ul",{className:"release-notes-bullets",children:e.map((t,s)=>a.jsx("li",{children:t},s))})}function $({links:e}){return!e||e.length===0?null:a.jsx("ul",{className:"release-notes-doclinks",children:e.map((t,s)=>{const o=t.href.startsWith("http");return a.jsx("li",{children:a.jsx(g,{color:"interactive",children:a.jsx("a",{href:o?t.href:p(t.href),...o?{target:"_blank",rel:"noreferrer"}:{},children:t.label})})},s)})})}function L({label:e,type:t}){return a.jsx("goa-badge",{version:"2",type:t,emphasis:"subtle",content:e})}function R({migration:e}){return a.jsxs("div",{className:"release-notes-migration",children:[e.before&&a.jsxs("div",{className:"release-notes-migration-step",children:[a.jsx("span",{className:"release-notes-migration-label",children:"Before"}),a.jsx("pre",{className:"release-notes-code",children:a.jsx("code",{children:e.before})})]}),e.after&&a.jsxs("div",{className:"release-notes-migration-step",children:[a.jsx("span",{className:"release-notes-migration-label",children:"After"}),a.jsx("pre",{className:"release-notes-code",children:a.jsx("code",{children:e.after})})]}),e.link&&a.jsx("a",{className:"release-notes-link-quiet",href:e.link,target:"_blank",rel:"noreferrer",children:"Migration guide"})]})}function _({change:e}){const t=e.type==="breaking"?{label:"Breaking change",type:"emergency"}:e.experimental?{label:"Experimental",type:"information"}:null,s=t?a.jsxs("div",{className:"release-notes-change-title-row",children:[a.jsx("h5",{className:"release-notes-change-title",children:e.title}),a.jsx(L,{label:t.label,type:t.type})]}):a.jsx("h5",{className:"release-notes-change-title",children:e.title}),o=a.jsxs(a.Fragment,{children:[s,e.detail&&a.jsx("p",{className:"release-notes-change-detail",children:e.detail}),e.bullets&&e.bullets.length>0&&a.jsx(M,{items:e.bullets}),e.migration&&a.jsx(R,{migration:e.migration}),a.jsx($,{links:e.links}),a.jsx(B,{change:e})]});return t?a.jsx(h,{type:t.type,emphasis:"low",size:"medium",heading:"",mb:"none",children:o}):a.jsx("div",{className:"release-notes-change",children:o})}function G({release:e}){const t=C(e.changes);return a.jsxs("article",{className:"release-notes-release",children:[a.jsx("h3",{className:"release-notes-date",children:y(e.date)}),e.versions.length>0&&a.jsx("p",{className:"release-notes-versions",children:e.versions.map((s,o)=>a.jsxs("span",{children:[o>0&&a.jsxs("span",{className:"release-notes-version-sep","aria-hidden":"true",children:[" ","·"," "]}),a.jsx(g,{color:"dark",size:"small",children:a.jsxs("a",{href:k(s.package,s.version),target:"_blank",rel:"noreferrer",children:[u[s.package]," ",s.version]})})]},s.package))}),e.intro&&a.jsx("p",{className:"release-notes-intro",children:e.intro}),t.map(s=>{const o=`category-${e.date}-${s.type}`;return a.jsxs("section",{className:"release-notes-category","aria-labelledby":o,children:[a.jsx("h4",{id:o,className:"release-notes-category-heading",children:x[s.type]}),a.jsx("div",{className:"release-notes-changes",children:s.changes.map((r,l)=>a.jsx(_,{change:r},l))})]},s.type)})]})}function T({releases:e}){const t=d.useMemo(()=>{const r=[],l=new Map;for(const n of e){const i=b(n.date);let c=l.get(i);c||(c={label:i,id:j(n.date),releases:[]},l.set(i,c),r.push(c)),c.releases.push(n)}return r},[e]),[s,o]=d.useState(t[0]?.id??"");return d.useEffect(()=>{if(t.length===0)return;const r=new IntersectionObserver(l=>{const n=l.filter(i=>i.isIntersecting).sort((i,c)=>i.boundingClientRect.top-c.boundingClientRect.top);n[0]&&o(n[0].target.id)},{rootMargin:"0px 0px -70% 0px"});return t.forEach(l=>{const n=document.getElementById(l.id);n&&r.observe(n)}),()=>r.disconnect()},[t]),a.jsxs("div",{className:"release-notes",children:[a.jsx("div",{className:"release-notes-main",children:t.map((r,l)=>a.jsxs("section",{className:"release-notes-month","aria-labelledby":r.id,children:[a.jsx("h2",{className:l===0?"release-notes-month-heading release-notes-sr-only":"release-notes-month-heading",id:r.id,children:r.label}),r.releases.map(n=>a.jsx(G,{release:n},n.date))]},r.id))}),t.length>1&&a.jsx("nav",{className:"release-notes-monthnav","aria-label":"Jump to month",children:a.jsx("ul",{children:t.map(r=>a.jsx("li",{children:a.jsx("a",{href:`#${r.id}`,"aria-current":s===r.id?"true":void 0,children:r.label})},r.id))})}),a.jsx("style",{children:`
        .release-notes {
          display: flex;
          align-items: flex-start;
          gap: var(--goa-space-3xl);
        }

        .release-notes-main {
          flex: 1;
          min-width: 0;
          max-width: 70ch;
        }

        /* Month grouping (Claude-style): a prominent month heading, then the
           dated releases under it. */
        .release-notes-month {
          position: relative;
        }

        .release-notes-month + .release-notes-month {
          margin-top: var(--goa-space-3xl);
        }

        .release-notes-month-heading {
          font: var(--goa-typography-heading-l);
          color: var(--goa-color-text-default);
          margin: 0 0 var(--goa-space-l);
        }

        /* Visually hidden but kept in the DOM (anchor + scroll-spy target). */
        .release-notes-sr-only {
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

        .release-notes-release + .release-notes-release {
          margin-top: var(--goa-space-2xl);
        }

        .release-notes-date {
          font: var(--goa-typography-heading-s);
          color: var(--goa-color-text-default);
          margin: 0 0 var(--goa-space-s);
        }

        /* Quiet version links to each package's npm page. Renders inline as
           "Name x.y.z · Name x.y.z · …" under the date. */
        .release-notes-versions {
          font: var(--goa-typography-body-s);
          margin: 0 0 var(--goa-space-m);
        }

        .release-notes-version-sep {
          color: var(--goa-color-text-secondary);
          padding: 0 var(--goa-space-3xs);
        }

        .release-notes-intro {
          font: var(--goa-typography-body-m);
          color: var(--goa-color-text-default);
          margin: 0 0 var(--goa-space-l);
        }

        /* Category sections within a release (Breaking changes / New
           additions / Feature changes / Bug fixes / Design system website). */
        .release-notes-category + .release-notes-category {
          margin-top: var(--goa-space-xl);
        }

        .release-notes-category-heading {
          font: var(--goa-typography-body-m);
          font-weight: var(--goa-font-weight-bold);
          color: var(--goa-color-text-secondary);
          margin: 0 0 var(--goa-space-m);
        }

        /* Changes inside a category: each is title + detail, spaced apart. */
        .release-notes-changes {
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-xl);
        }

        .release-notes-change-title {
          font: var(--goa-typography-body-m);
          font-weight: var(--goa-font-weight-bold);
          color: var(--goa-color-text-default);
          margin: 0 0 var(--goa-space-2xs);
        }

        /* Title row: change title + inline status badge to the right. Used
           inside the body of a low-emphasis callout (experimental /
           breaking), in place of the callout's heading prop. */
        .release-notes-change-title-row {
          display: flex;
          align-items: center;
          gap: var(--goa-space-xs);
          flex-wrap: wrap;
          margin: 0 0 var(--goa-space-2xs);
        }

        .release-notes-change-title-row .release-notes-change-title {
          margin: 0;
        }

        .release-notes-change-detail {
          font: var(--goa-typography-body-m);
          color: var(--goa-color-text-default);
          margin: 0;
        }

        .release-notes-bullets {
          margin: var(--goa-space-2xs) 0 0;
          padding-left: var(--goa-space-l);
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-2xs);
          font: var(--goa-typography-body-m);
          color: var(--goa-color-text-default);
        }

        /* Quiet meta line: component links + issue reference. */
        .release-notes-change-meta {
          margin: var(--goa-space-2xs) 0 0;
          font: var(--goa-typography-body-s);
        }

        .release-notes-link-quiet {
          color: var(--goa-color-text-secondary);
          font: var(--goa-typography-body-s);
          white-space: nowrap;
        }

        /* "Learn more" / documentation links list. */
        .release-notes-doclinks {
          list-style: none;
          margin: var(--goa-space-s) 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-2xs);
          font: var(--goa-typography-body-m);
        }

        /* Breaking-change migration: before/after code. */
        .release-notes-migration {
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-s);
        }

        .release-notes-migration-label {
          display: block;
          font: var(--goa-typography-body-s);
          font-weight: var(--goa-font-weight-bold);
          color: var(--goa-color-text-secondary);
          margin-bottom: var(--goa-space-3xs);
        }

        .release-notes-code {
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
        .release-notes-monthnav {
          position: sticky;
          top: var(--goa-space-xl);
          width: 12rem;
          flex-shrink: 0;
        }

        .release-notes-monthnav ul {
          list-style: none;
          margin: 0;
          padding: 0;
          border-left: 1px solid var(--goa-color-greyscale-200);
        }

        .release-notes-monthnav a {
          display: block;
          margin-left: -1px;
          padding: var(--goa-space-2xs) var(--goa-space-m);
          border-left: 2px solid transparent;
          color: var(--goa-color-text-secondary);
          font: var(--goa-typography-body-s);
          text-decoration: none;
        }

        .release-notes-monthnav a:hover {
          color: var(--goa-color-text-default);
        }

        .release-notes-monthnav a[aria-current="true"] {
          color: var(--goa-color-text-default);
          font-weight: var(--goa-font-weight-bold);
          border-left-color: var(--goa-color-interactive-default);
        }

        /* Hide the month nav when there isn't room beside the feed. */
        @media (max-width: 1023px) {
          .release-notes-monthnav {
            display: none;
          }
        }
      `})]})}export{T as ReleaseNotesFeed};
