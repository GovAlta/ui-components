import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as y}from"./index.DeO6U63H.js";import{G as c}from"./badge.5uTSHPsr.js";import{G as i}from"./button.Cr0WWE4a.js";import{G as d}from"./checkbox.FVDm0CHH.js";import{G as S}from"./table.hASplIIw.js";import{G as k,a as v,b as l}from"./work-side-menu-item.DesEzQAR.js";import"./workspace-layout-scroll-state.CEolrZt0.js";import{G}from"./workspace-layout.Vycj0nUQ.js";import"./extract-props.mAATCLkF.js";const z=["Gilbert Barton","Shelley Leffler","Randal Sanford","Bonnie Metz","Lowell Kuhn","William Boyer","Virginia Johns","Marvin Hamill","Wendell Gerhold","Wendy Cormier","Mable Macejkovic","Don Walsh","Ethan White","Mia Robinson","Noah Clark","Ava Lewis","Lucas Walker","Charlotte Hall","Benjamin Young","Amelia Allen","Liam Wilson","Olivia Brown","Henry Davis","Sophia Garcia","Mason Martinez","Isabella Rodriguez","Lucas King","Mia Hernandez","Logan Lopez","Aria Gonzalez"],h=["Accepted","Denied","Cancelled","Email sent"],m=["Calgary","Edmonton","Red Deer","Lethbridge","Medicine Hat","Fort McMurray","Grande Prairie","Spruce Grove"],g=["Edna Mode","Bob Parr","Helen Parr",null,null],p=["High","Medium","Low"],s=z.map((n,t)=>({id:`row-${t+1}`,name:n,status:h[t%h.length],assignedTo:g[t%g.length],dueDate:new Date(2026,t%12,1+t%28).toLocaleDateString("en-CA",{year:"numeric",month:"short",day:"2-digit"}),jurisdiction:m[t%m.length],fileNumber:`${(1234567890+t*11111).toString().slice(0,10)}`,priority:p[t%p.length]})),M={Accepted:"success",Denied:"emergency",Cancelled:"information","Email sent":"important"},C={High:"emergency",Medium:"important",Low:"information"},L=`
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--goa-space-m) var(--goa-space-l);
    background: var(--goa-color-greyscale-white);
  }
  .page-header__title {
    margin: 0;
    font-size: var(--goa-font-size-5);
  }
  .page-header__count {
    color: var(--goa-color-text-secondary);
  }
  .bulk-footer {
    display: flex;
    align-items: center;
    gap: var(--goa-space-m);
    padding: var(--goa-space-s) var(--goa-space-l);
    background: var(--goa-color-greyscale-white);
  }
  .bulk-footer--empty {
    color: var(--goa-color-text-secondary);
    font-size: var(--goa-font-size-2);
  }
  .bulk-footer__count {
    margin-left: auto;
    color: var(--goa-color-text-secondary);
    font-size: var(--goa-font-size-2);
  }
  .content {
    padding: var(--goa-space-l);
  }
  .select-col {
    width: 2.5rem;
  }
  .assign-me-link {
    text-decoration: underline;
  }
  @media (max-width: 623px) {
    .bulk-footer {
      flex-direction: column;
      align-items: stretch;
      gap: var(--goa-space-s);
      padding: var(--goa-space-m) var(--goa-space-l);
    }
    .bulk-footer__count {
      margin-left: 0;
      order: -1;
      text-align: center;
    }
    .bulk-footer goa-button {
      width: 100%;
    }
  }
`;function w(){const[n,t]=y.useState(()=>new Set([s[0].id,s[1].id,s[2].id])),u=a=>{t(o=>{const r=new Set(o);return r.has(a)?r.delete(a):r.add(a),r})},x=()=>t(new Set),j=()=>t(a=>a.size===s.length?new Set:new Set(s.map(o=>o.id))),b=n.size>0,f=n.size===s.length;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:L}),e.jsx(G,{sideMenu:e.jsx(k,{heading:"Workspace",url:"/",open:!0,primaryContent:e.jsxs(v,{icon:"grid",heading:"Work",children:[e.jsx(l,{icon:"document",label:"Cases",url:"/cases"}),e.jsx(l,{icon:"folder",label:"Documents",url:"/documents"}),e.jsx(l,{icon:"bar-chart",label:"Reports",url:"/reports"})]})}),pageHeader:e.jsxs("div",{className:"page-header",children:[e.jsx("h1",{className:"page-header__title",children:"Cases"}),e.jsxs("span",{className:"page-header__count",children:[s.length," cases"]})]}),pageFooter:b?e.jsxs("div",{className:"bulk-footer",children:[e.jsxs(i,{type:"secondary",size:"compact",onClick:x,children:["Clear selection (",n.size,")"]}),e.jsx(i,{type:"primary",size:"compact",children:"Assign to me"}),e.jsx(i,{type:"tertiary",size:"compact",children:"Delete selected"}),e.jsxs("span",{className:"bulk-footer__count",children:[n.size," of ",s.length," selected"]})]}):e.jsx("div",{className:"bulk-footer bulk-footer--empty",children:"Select cases to perform bulk actions"}),children:e.jsx("div",{className:"content",children:e.jsx(S,{width:"100%",children:e.jsxs("table",{width:"100%",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"select-col",children:e.jsx(d,{name:"select-all",checked:f,onChange:j,ariaLabel:"Select all cases"})}),e.jsx("th",{children:"Name"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Assigned to"}),e.jsx("th",{children:"Due date"}),e.jsx("th",{children:"Jurisdiction"}),e.jsx("th",{children:"File number"}),e.jsx("th",{children:"Priority"})]})}),e.jsx("tbody",{children:s.map(a=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(d,{name:`select-${a.id}`,checked:n.has(a.id),onChange:()=>u(a.id),ariaLabel:`Select ${a.name}`})}),e.jsx("td",{children:e.jsx("strong",{children:a.name})}),e.jsx("td",{children:e.jsx(c,{type:M[a.status],content:a.status})}),e.jsx("td",{children:a.assignedTo??e.jsx("a",{href:"#",className:"assign-me-link",children:"Assign me"})}),e.jsx("td",{children:a.dueDate}),e.jsx("td",{children:a.jurisdiction}),e.jsx("td",{children:a.fileNumber}),e.jsx("td",{children:e.jsx(c,{type:C[a.priority],content:a.priority})})]},a.id))})]})})})})]})}export{w as WorkspaceLayoutBulkActionBarExample};
