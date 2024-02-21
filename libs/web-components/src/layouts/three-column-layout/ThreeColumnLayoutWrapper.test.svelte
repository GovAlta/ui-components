<svelte:options customElement="test-three-column-layout" />

<!--Script-->
<script lang="ts">
  export let maxcontentwidth: string = "50%";
  export let leftcolumnwidth: string = "200px";
  export let rightcolumnwidth: string = "300px";
</script>

<!-- HTML -->
<goa-three-column-layout {leftcolumnwidth} {maxcontentwidth} {rightcolumnwidth}>
  <goa-app-header slot="header"></goa-app-header>
  <section slot="nav">
    <a href="#dashboard">Dashboard</a>
    <a href="#accounts">Accounts</a>
    <a href="#invoices">Invoices</a>
    <a href="#employees">Employees</a>
    <a href="#claims">Claims</a>
  </section>
  <h1>Content</h1>
  <p>Main content.</p>
  <section slot="sidebar">
    <h2>Sidebar</h2>
    <p>Sidebar content.</p>
  </section>
  <section slot="side-menu">
    <h2>SideMenu</h2>
    <p>Side menu content.</p>
  </section>
  <goa-app-footer slot="footer"> </goa-app-footer>
</goa-three-column-layout>
