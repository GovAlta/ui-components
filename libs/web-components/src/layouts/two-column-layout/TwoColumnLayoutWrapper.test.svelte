<svelte:options customElement="test-two-column-layout" />

<!-- Script -->
<script lang="ts">
  export let navcolumnwidth: string = "";
  export let maxcontentwidth: string = "";
</script>

<!-- HTML -->
<goa-two-column-layout {navcolumnwidth} {maxcontentwidth}>
  <goa-app-header slot="header" />
  <section slot="nav">
    <a href="#dashboard">Dashboard</a>
    <a href="#accounts">Accounts</a>
    <a href="#invoices">Invoices</a>
    <a href="#employees">Employees</a>
    <a href="#claims">Claims</a>
  </section>

  <h1>Content</h1>
  <p>
    Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
  </p>

  <goa-app-footer slot="footer" />
</goa-two-column-layout>
