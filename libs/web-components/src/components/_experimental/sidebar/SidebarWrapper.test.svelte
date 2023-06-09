<svelte:options tag="test-left-nav-wrapper" />

<!-- Script -->
<script lang="ts">


  import Sidebar from "./Sidebar.svelte";

  export let level: number = 0;
  export let navItems: any[] = [];

</script>

<Sidebar navitems={navItems} level={level}>
  {#each navItems as item(item)}
    <goax-sidebar-item displayname={item.displayname} active={item.active} url={item.url} name={item.name}/>
  {/each}
</Sidebar>
