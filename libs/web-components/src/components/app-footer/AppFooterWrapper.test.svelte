<!-- Script -->
<script lang="ts">
  import GoAAppFooter from './AppFooter.svelte';
  import GoAMetaLink from './MetaLink.svelte';
  import GoANavigationLink from './NavigationLink.svelte';
  import type { Link } from './link';
  import type { NavigationSection } from './navigationSection';

  export let metaLinks: Link[] = [];
  export let navigationLinks: Link[] = [];
  export let navigationSections: NavigationSection[] = [];

</script>

<!-- HTML -->
<GoAAppFooter>

  {#each metaLinks as metalink (metalink.title) }
    <GoAMetaLink url={metalink.url} title={metalink.title}></GoAMetaLink>
  {/each}

  {#if navigationSections.length}
    {#each navigationSections as navigationSection (navigationSection.name) }
        {#each navigationSection.links as navigationlink (navigationlink.title) }
          <GoANavigationLink section={navigationSection.name} url={navigationlink.url} title={navigationlink.title}></GoANavigationLink>
        {/each}
    {/each}
  {:else if navigationLinks.length }
    {#each navigationLinks as navigationlink (navigationlink.title) }
      <GoANavigationLink url={navigationlink.url} title={navigationlink.title}></GoANavigationLink>
    {/each}
  {/if}

</GoAAppFooter>

