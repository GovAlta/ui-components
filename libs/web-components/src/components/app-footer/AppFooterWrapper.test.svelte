<!-- Script -->
<script lang="ts">
  import GoAAppFooter from './AppFooter.svelte';
  import GoAMetaLink from './MetaLink.svelte';
  import GoANavigationLink from './NavigationLink.svelte';
  import type { Link } from './link';
  import type { NavigationSection } from './navigationSection';

  export let id: string;
  export let copyrighturl: string;
  export let appurl: string;
  export let title: string;
  export let copyrighttext: string;
  export let multicolumnsectionnames: string;

  export let metaLinks: Link[] = [];
  export let navigationLinks: Link[] = [];
  export let navigationSections: NavigationSection[] = [];

</script>

<!-- HTML -->
<GoAAppFooter id={id} copyrighturl={copyrighturl} appurl={appurl} title={title} copyrighttext={copyrighttext} multicolumnsectionnames={multicolumnsectionnames}>

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

