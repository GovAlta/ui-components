import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DeO6U63H.js";import{t as G,l as E}from"./extract-props.mAATCLkF.js";import{G as h}from"./badge.5uTSHPsr.js";import{G as j}from"./button.Cr0WWE4a.js";import{G as k}from"./button-group.JyC9mxyi.js";import{G as _}from"./form-item.yTOkS2er.js";import{G as w}from"./push-drawer.cIXd4H1v.js";import{G as L,a as y}from"./radio-group.CI6gvlIQ.js";import{G as C,a as N,b}from"./work-side-menu-item.DesEzQAR.js";import"./workspace-layout-scroll-state.CEolrZt0.js";import{G as R}from"./workspace-layout.Vycj0nUQ.js";function x({open:c,onChange:s,headingContent:n,headingType:l,actions:o,children:d,...p}){const a=i.useRef(null),v=G(p,E);return i.useEffect(()=>{const t=a.current;if(t&&s){const m=g=>{s?.(g.detail.open)};return t.addEventListener("_change",m),()=>{t.removeEventListener("_change",m)}}},[s]),e.jsxs("goa-accordion",{ref:a,open:c?"true":void 0,"heading-type":l,...v,children:[n&&e.jsx("div",{slot:"headingcontent",children:n}),o&&e.jsx("div",{slot:"actions",children:o}),d]})}function z({readOnly:c,disabled:s,error:n,onChange:l,onKeyPress:o,onBlur:d,...p}){const a=i.useRef(null),v=G(p,E);return i.useEffect(()=>{if(!a.current)return;const t=a.current,m=r=>{const u=r.detail;l?.({...u,event:r})},g=r=>{const u=r.detail;o?.({...u,event:r})},f=r=>{const u=r.detail;d?.({...u,event:r})};return t.addEventListener("_change",m),t.addEventListener("_keyPress",g),t.addEventListener("_blur",f),()=>{t.removeEventListener("_change",m),t.removeEventListener("_keyPress",g),t.removeEventListener("_blur",f)}},[a,l,o,d]),e.jsx("goa-textarea",{ref:a,readOnly:c?"true":void 0,disabled:s?"true":void 0,error:n?"true":void 0,version:"2",...v})}function U(){const[c,s]=i.useState(!0),[n,l]=i.useState("deny"),[o,d]=i.useState(""),p=e.jsxs(w,{heading:"Review application",open:c,width:"420px",onClose:()=>s(!1),actions:e.jsxs(k,{alignment:"end",children:[e.jsx(j,{type:"tertiary",size:"compact",onClick:()=>s(!1),children:"Cancel"}),e.jsx(j,{type:"primary",size:"compact",disabled:n==="deny"&&o.trim().length===0,onClick:()=>s(!1),children:n==="approve"?"Approve":n==="deny"?"Deny":"Send request"})]}),children:[e.jsx(_,{label:"Decision",children:e.jsxs(L,{name:"decision",value:n,onChange:a=>l(a.value),children:[e.jsx(y,{value:"approve",label:"Approve"}),e.jsx(y,{value:"deny",label:"Deny"}),e.jsx(y,{value:"more-info",label:"Request more information"})]})}),n==="deny"&&e.jsx(_,{mt:"l",label:"Reason for denial",requirement:"required",children:e.jsx(z,{name:"reason",placeholder:"Explain why this application is being denied...",value:o,onChange:a=>d(a.value)})})]});return e.jsxs(R,{sideMenu:e.jsx(C,{heading:"Workspace",url:"/",open:!0,primaryContent:e.jsxs(N,{icon:"grid",heading:"Work",children:[e.jsx(b,{icon:"document",label:"Cases",url:"/cases"}),e.jsx(b,{icon:"folder",label:"Documents",url:"/documents"}),e.jsx(b,{icon:"bar-chart",label:"Reports",url:"/reports"})]})}),pageHeader:e.jsxs("div",{className:"page-header",children:[e.jsxs("div",{className:"page-header__title-row",children:[e.jsx("h1",{className:"page-header__title",children:"Emily Thompson"}),e.jsx(h,{type:"important",content:"Under Review"}),e.jsx("span",{className:"page-header__case-id",children:"SE-332983"})]}),!c&&e.jsx(j,{type:"secondary",size:"compact",onClick:()=>s(!0),children:"Review application"})]}),pageFooter:e.jsx("div",{className:"page-footer",children:"Last updated 2 minutes ago · Assigned to Edna Mode"}),pushDrawer:p,children:[e.jsxs("div",{className:"content",children:[e.jsxs("section",{className:"case-section",children:[e.jsx("h2",{className:"case-section__heading",children:"1. Verify your eligibility"}),e.jsx(x,{heading:"Verify your age",headingContent:e.jsx(h,{type:"success",content:"Complete"}),children:e.jsx("p",{children:"Applicant's date of birth confirmed against the supporting document uploaded on file."})}),e.jsx(x,{heading:"Your situation",headingContent:e.jsx(h,{type:"success",content:"Complete"}),children:e.jsx("p",{children:"Applicant has confirmed their current living situation and household composition."})})]}),e.jsxs("section",{className:"case-section",children:[e.jsx("h2",{className:"case-section__heading",children:"2. Your application"}),e.jsx(x,{heading:"Personal information",headingContent:e.jsx(h,{type:"success",content:"Complete"}),children:e.jsx("p",{children:"Full name, contact details, and mailing address are on file."})})]}),e.jsxs("section",{className:"case-section",children:[e.jsx("h2",{className:"case-section__heading",children:"3. Important documents"}),e.jsx(x,{heading:"Upload identification",headingContent:e.jsx(h,{type:"success",content:"Complete"}),children:e.jsx("p",{children:"Government-issued ID uploaded and verified by the applicant."})})]})]}),e.jsx("style",{children:`
        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--goa-space-m);
          padding: var(--goa-space-m) var(--goa-space-l);
          background: var(--goa-color-greyscale-white);
        }
        .page-header__title-row {
          display: flex;
          align-items: center;
          gap: var(--goa-space-m);
        }
        .page-header__title {
          margin: 0;
          font-size: var(--goa-font-size-5);
        }
        .page-header__case-id {
          color: var(--goa-color-text-secondary);
          font-size: var(--goa-font-size-3);
        }
        .page-footer {
          padding: var(--goa-space-m) var(--goa-space-l);
          color: var(--goa-color-text-secondary);
          font-size: var(--goa-font-size-2);
        }
        .content {
          padding: var(--goa-space-l) var(--goa-space-xl);
        }
        .case-section {
          margin-bottom: var(--goa-space-xl);
        }
        .case-section__heading {
          font-size: var(--goa-font-size-4);
          margin: 0 0 var(--goa-space-m);
        }
      `})]})}export{U as WorkspaceLayoutPushDrawerExample};
