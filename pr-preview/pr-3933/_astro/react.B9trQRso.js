import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as f}from"./index.DeO6U63H.js";import{G as c}from"./badge.5uTSHPsr.js";import{G as i}from"./button.Cr0WWE4a.js";import{G as d}from"./checkbox.FVDm0CHH.js";import{G as S}from"./table.hASplIIw.js";import{G as k,a as v,b as l}from"./work-side-menu-item.DesEzQAR.js";import"./workspace-layout-scroll-state.CEolrZt0.js";import{G}from"./workspace-layout.Vycj0nUQ.js";import"./extract-props.mAATCLkF.js";const z=["Gilbert Barton","Shelley Leffler","Randal Sanford","Bonnie Metz","Lowell Kuhn","William Boyer","Virginia Johns","Marvin Hamill","Wendell Gerhold","Wendy Cormier","Mable Macejkovic","Don Walsh","Ethan White","Mia Robinson","Noah Clark","Ava Lewis","Lucas Walker","Charlotte Hall","Benjamin Young","Amelia Allen","Liam Wilson","Olivia Brown","Henry Davis","Sophia Garcia","Mason Martinez","Isabella Rodriguez","Lucas King","Mia Hernandez","Logan Lopez","Aria Gonzalez"],h=["Accepted","Denied","Cancelled","Email sent"],m=["Calgary","Edmonton","Red Deer","Lethbridge","Medicine Hat","Fort McMurray","Grande Prairie","Spruce Grove"],g=["Edna Mode","Bob Parr","Helen Parr",null,null],p=["High","Medium","Low"],n=z.map((s,a)=>({id:`row-${a+1}`,name:s,status:h[a%h.length],assignedTo:g[a%g.length],dueDate:new Date(2026,a%12,1+a%28).toLocaleDateString("en-CA",{year:"numeric",month:"short",day:"2-digit"}),jurisdiction:m[a%m.length],fileNumber:`${(1234567890+a*11111).toString().slice(0,10)}`,priority:p[a%p.length]})),M={Accepted:"success",Denied:"emergency",Cancelled:"information","Email sent":"important"},C={High:"emergency",Medium:"important",Low:"information"},L={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"var(--goa-space-m) var(--goa-space-l)",background:"var(--goa-color-greyscale-white)"},A=`
  .bulk-footer {
    display: flex;
    align-items: center;
    gap: var(--goa-space-m);
    padding: var(--goa-space-s) var(--goa-space-l);
    background: var(--goa-color-greyscale-white);
  }
  .bulk-footer__count {
    margin-left: auto;
    color: var(--goa-color-text-secondary);
    font-size: var(--goa-font-size-2);
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
`;function _(){const[s,a]=f.useState(()=>new Set([n[0].id,n[1].id,n[2].id])),u=t=>{a(o=>{const r=new Set(o);return r.has(t)?r.delete(t):r.add(t),r})},x=()=>a(new Set),j=()=>a(t=>t.size===n.length?new Set:new Set(n.map(o=>o.id))),y=s.size>0,b=s.size===n.length;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:A}),e.jsx(G,{sideMenu:e.jsx(k,{heading:"Workspace",url:"/",open:!0,primaryContent:e.jsxs(v,{icon:"grid",heading:"Work",children:[e.jsx(l,{icon:"document",label:"Cases",url:"/cases"}),e.jsx(l,{icon:"folder",label:"Documents",url:"/documents"}),e.jsx(l,{icon:"bar-chart",label:"Reports",url:"/reports"})]})}),pageHeader:e.jsxs("div",{style:L,children:[e.jsx("h1",{style:{margin:0,fontSize:"var(--goa-font-size-5)"},children:"Cases"}),e.jsxs("span",{style:{color:"var(--goa-color-text-secondary)"},children:[n.length," cases"]})]}),pageFooter:y?e.jsxs("div",{className:"bulk-footer",children:[e.jsxs(i,{type:"secondary",size:"compact",onClick:x,children:["Clear selection (",s.size,")"]}),e.jsx(i,{type:"primary",size:"compact",children:"Assign to me"}),e.jsx(i,{type:"tertiary",size:"compact",children:"Delete selected"}),e.jsxs("span",{className:"bulk-footer__count",children:[s.size," of ",n.length," selected"]})]}):e.jsx("div",{className:"bulk-footer",style:{color:"var(--goa-color-text-secondary)",fontSize:"var(--goa-font-size-2)"},children:"Select cases to perform bulk actions"}),children:e.jsx("div",{style:{padding:"var(--goa-space-l)"},children:e.jsx(S,{width:"100%",children:e.jsxs("table",{width:"100%",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:"2.5rem"},children:e.jsx(d,{name:"select-all",checked:b,onChange:j,ariaLabel:"Select all cases"})}),e.jsx("th",{children:"Name"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Assigned to"}),e.jsx("th",{children:"Due date"}),e.jsx("th",{children:"Jurisdiction"}),e.jsx("th",{children:"File number"}),e.jsx("th",{children:"Priority"})]})}),e.jsx("tbody",{children:n.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(d,{name:`select-${t.id}`,checked:s.has(t.id),onChange:()=>u(t.id),ariaLabel:`Select ${t.name}`})}),e.jsx("td",{children:e.jsx("strong",{children:t.name})}),e.jsx("td",{children:e.jsx(c,{type:M[t.status],content:t.status})}),e.jsx("td",{children:t.assignedTo??e.jsx("a",{href:"#",style:{textDecoration:"underline"},children:"Assign me"})}),e.jsx("td",{children:t.dueDate}),e.jsx("td",{children:t.jurisdiction}),e.jsx("td",{children:t.fileNumber}),e.jsx("td",{children:e.jsx(c,{type:C[t.priority],content:t.priority})})]},t.id))})]})})})})]})}export{_ as WorkspaceLayoutBulkActionBarExample};
