<svelte:options tag="goa-app-footer" />

<!-- Script -->
<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { deleteContext, ContextStore, createContext } from "../../common/context-store";
  import type { Link } from './link';
  import type { NavigationSection } from './navigationSection';
  import { META_LINK, NAVIGATION_LINK, MetaLinkRegisterMessage, NavigationLinkRegisterMessage } from "./types";

  export let id: string = "goa-app-footer-id";
  export let copyrighturl: string = "#";
  export let appurl: string = "#";
  export let title: string = "";
  export let copyrighttext: string = "2021 Government of Alberta";

  let ctx: ContextStore;
  let metaLinks: Link[] = [];
  let navigationLinks: Link[] = [];
  let navigationSections: NavigationSection[] = [];

  $: isDefaultFooter = (!metaLinks.length && !navigationLinks.length && !navigationSections.length);
  $: isMetaLinksOnlyFooter = (metaLinks.length && !navigationLinks.length && !navigationSections.length);
  $: isNavigationLinksOnlyFooter = (!metaLinks.length && navigationLinks.length && !navigationSections.length);
  $: isNavigationSectionsOnlyFooter = (!metaLinks.length && !navigationLinks.length && navigationSections.length);
  $: isMetaAndNavigationLinksFooter = (metaLinks.length && navigationLinks.length && !navigationSections.length);
  $: isMetaAndNavigationSectionsFooter = (metaLinks.length && !navigationLinks.length && navigationSections.length);


  function AppendNavigationLinkWithSection(message: NavigationLinkRegisterMessage) {

    let otherNavigationSections: NavigationSection[] = navigationSections.filter( navigSection => navigSection.name !== message.section );
    let existingNavigationSection: NavigationSection = navigationSections.find( navigSection => navigSection.name === message.section );

    if (existingNavigationSection) {
      navigationSections = [
        ...otherNavigationSections,
        {
          name: message.section,
          links:[...existingNavigationSection.links, {title: message.title, url: message.url}]
        }
      ];
    }
    else {
      navigationSections = [
        ...otherNavigationSections,
        {
          name: message.section,
          links:[{title: message.title, url: message.url}]
        }
      ];
    }
  }

  onMount(async () => {
    ctx = createContext(id);
    ctx.subscribe((state) => {
      switch (state?.type) {
        case META_LINK: {
          const message = state as MetaLinkRegisterMessage;
          metaLinks = [...metaLinks, {title: message.title, url: message.url}];
          break;
        }
        case NAVIGATION_LINK: {
          const message = state as NavigationLinkRegisterMessage;
          if (message.section) {
            AppendNavigationLinkWithSection(message);
          }
          else {
            navigationLinks = [...navigationLinks, {title: message.title, url: message.url}];
          }
          break;
        }
      }
    });
  });

  onDestroy(() => {
    deleteContext(id);
  });
</script>

<!-- HTML -->
<div class="app-footer-container">
  <center>
    <div class='footer'
      class:default-footer={isDefaultFooter}
      class:meta-links-only-footer={isMetaLinksOnlyFooter}
      class:navigation-links-only-footer={isNavigationLinksOnlyFooter}
      class:navigation-sections-only-footer={isNavigationSectionsOnlyFooter}
      class:meta-and-navigation-links-only-footer={isMetaAndNavigationLinksFooter}
      class:meta-and-navigation-sections-only-footer={isMetaAndNavigationSectionsFooter}
    >
      <slot />
      {#if (navigationSections.length || navigationLinks.length) }
        <div class="navigation-links">
          {#if navigationSections.length}
            {#each navigationSections as navigationSection (navigationSection.name) }
              <div class="navigation-section">
                <span class="navigation-section-name">{navigationSection.name}</span>
                <hr class="navigation-section-name-divider"/>
                {#each navigationSection.links as navigationlink (navigationlink.title) }
                  <a href={navigationlink.url} class="navigation-link">{navigationlink.title}</a>
                {/each}
              </div>
            {/each}
          {:else if navigationLinks.length }
            {#each navigationLinks as navigationlink (navigationlink.title) }
              <a href={navigationlink.url} class="navigation-link">{navigationlink.title}</a>
            {/each}
          {/if}
        </div>
        <hr class="navigation-links-divider" />
      {/if}

      <div class:meta-links-logo-and-copyright={metaLinks.length}>

        {#if metaLinks.length }
          <div class="meta-links">
            {#each metaLinks as metalink (metalink.title) }
              <a href={metalink.url} class="meta-link">{metalink.title}</a>
            {/each}
          </div>
        {/if}

        <div class="logo-and-copyright"
            class:logo-and-copyright-with-links={metaLinks.length || navigationLinks.length || navigationSections.length}>
          <a href={copyrighturl} class="goa-copyright">© {copyrighttext}</a>
          <a href={appurl} title={title}>
            <img
              alt="GoA Logo"
              class="logo"
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='149.351' height='42' viewBox='0 0 149.351 42'%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill:none;%7D.b%7Bclip-path:url(%23a);%7D.c%7Bfill:%2300aad2;%7D.d%7Bfill:%235f6a72;%7D%3C/style%3E%3CclipPath id='a'%3E%3Crect class='a' width='149.351' height='42'/%3E%3C/clipPath%3E%3C/defs%3E%3Cg class='b'%3E%3Crect class='c' width='13.555' height='13.555' transform='translate(135.796 21.524)'/%3E%3Cpath class='d' d='M63.082,33.088c-1.383.138-2.835.277-4.357.346.553-4.357,2.835-10.373,5.671-9.405,1.66.553.761,5.671-1.314,9.059m-3.527,2.974a3.761,3.761,0,0,1-1.245,0,.851.851,0,0,0,.346-.692v-.553c.761,0,1.936-.138,3.389-.277a4.327,4.327,0,0,1-2.49,1.521M76.844,25.688c1.8-1.66,2.7-1.521,2.9-1.106.484.968-1.591,4.357-5.671,6.224a10.328,10.328,0,0,1,2.766-5.118m66.736,1.66c-.207-3.389-3.181-3.942-3.6-2.974-.138.346,1.106.207,1.106,2.628,0,3.942-4.011,9.129-9.129,9.129-5.532,0-6.985-4.357-7.261-6.432-.207-1.452.138-3.458-2.351-3.181-1.729.207-3.25,3.527-5.463,6.362-1.867,2.42-2.7,2.213-2.282.138.553-2.628,2.7-8.714,5.187-9.129,1.176-.207,1.591,1.8,2.075.553s.069-4.011-2.559-4.011c-1.8,0-3.942,1.936-5.74,4.08-1.521,1.936-9.336,13.416-12.656,10.927-1.521-1.176-1.383-5.878-.415-11.411,3.873-1.521,7.123-1.037,8.921-.138.9.415,1.037.346.622-.622-.553-1.452-3.665-3.734-8.575-2.7-.138,0-.207.069-.346.069.415-1.8.83-3.665,1.383-5.463.484-1.66,1.8-4.5-1.729-4.979-1.106-.207-.622.346-1.037,1.867-.692,2.766-1.521,6.362-2.144,10.028a19.745,19.745,0,0,0-7.538,8.091,38.59,38.59,0,0,0,.9-4.772,1.589,1.589,0,0,0-1.245-1.729c-.761-.207-1.729.138-2.628,1.452-2.144,3.043-4.841,7.815-8.99,9.82-2.974,1.452-4.288,0-4.357-2.282a9.869,9.869,0,0,0,1.521-.553c5.394-2.351,7.192-5.947,5.878-8.16-1.314-2.075-4.979-1.452-7.953,1.66a11.175,11.175,0,0,0-2.7,6.5c-1.245.277-2.628.484-4.219.692,2.49-4.08,2.282-9.613-1.383-10.581-4.288-1.106-6.432,3.043-7.331,6.5.346-3.873.9-7.745,1.591-11.549.346-1.66,1.452-4.5-2.075-4.979-1.106-.207-.968.346-.9,1.867.138,2.075-2.144,14.454-.968,19.848-1.521.484-2.144,1.66-.207,2.835,1.383.83,4.357,1.106,7.331-.346a9.3,9.3,0,0,0,2.766-2.144c1.8-.207,3.665-.553,5.394-.83.277,2.42,1.867,4.219,5.463,3.873,5.118-.484,9.682-6.777,11.411-9.82-.346,3.25-2.42,10.373,1.176,10.028,1.383-.138.83-.346.9-1.591.346-4.288,3.873-7.953,7.4-10.166-.622,5.256-.415,9.958,2.006,11.411,4.426,2.766,10.581-4.5,14.039-8.921-1.729,3.942-2.7,8.921-.138,9.682,3.043.9,5.463-4.219,8.3-8.091.346,2.766,2.213,7.607,9.682,7.607,8.022-.069,13.071-4.91,12.863-10.1m-108.3,8.645A66.439,66.439,0,0,1,27.4,32.534a59.168,59.168,0,0,0,6.777-2.974,54.453,54.453,0,0,0,1.106,6.432m20.4,3.873c-.069-.207-.622.069-1.106,0-1.452-.207-3.389-2.213-3.942-5.463-1.037-5.878-.415-11.687,1.314-20.332.346-1.66,1.452-4.5-2.075-5.048-1.106-.138-.553.415-.83,1.867C47.66,17.32,42.4,21.954,37.149,25.066,36.6,17.735,36.8,9.505,38.186,4.526c1.176-4.219,2.559-3.458.83-4.357s-3.734.277-5.325,3.458S24.839,23.89,13.221,35.439C7.273,41.317,1.879,38.274.842,37.375c-.9-.761-1.176.415-.138,1.591,4.772,5.256,11.826,2.282,14.384-.277,7.054-7.054,15.283-22.268,18.6-28.7a98.251,98.251,0,0,0,.277,16.874,50.129,50.129,0,0,1-8.3,3.181c-1.66.415-2.7,1.106-2.7,1.867s1.106,1.521,2.7,2.282c2.835,1.383,11.2,5.256,13.209,6.5,1.729,1.037,2.628.207,3.112-.9.692-1.452-1.176-2.282-2.974-2.766a60.545,60.545,0,0,1-1.66-9.267c4.219-2.628,8.437-6.086,10.788-10.443C47.522,20.916,46,33.3,49.873,38.482a5.451,5.451,0,0,0,4.564,2.213c.968-.069,1.383-.692,1.245-.83' transform='translate(-0.038 0.124)'/%3E%3C/g%3E%3C/svg%3E"
            />
          </a>
        </div>
      </div>
    </div>
  </center>
</div>
<div class="brand"></div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }

  .footer {
    max-width: 60rem;
  }

  .brand {
    height: 1rem;
    background-color: var(--goa-color-brand);
  }

  .meta-links-logo-and-copyright {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .logo-and-copyright {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo-and-copyright-with-links {
    align-items: flex-end;
    flex-direction: column-reverse;
  }

  .meta-link {
    margin-top: 3.5em;
    margin-right: 1.75rem;
    color: var(--goa-color-text);
    font-size: var(--fs-base);
  }

  .logo {
    height: 2.56rem;
    width: 8.88rem;
  }

  .app-footer-container {
    background-color: var(--color-gray-100);
  }

  .navigation-links, .meta-links, .navigation-section {
    text-align: start;
    display: flex;
    flex-flow: wrap;
  }

  .navigation-section {
    flex-direction: column;
    flex: 1 1 0;
    min-width: 13.25rem;
  }

  .navigation-section-name {
    font-size: var(--fs-xl);
    line-height: var(--lh-lg);
    font-weight: var(--fw-regular);
    margin-bottom: 1.75rem;
    margin-top: 1.75rem;
  }

  .navigation-section-name-divider {
    width: 75%;
    margin: 0;
  }

  .navigation-link {
    margin-top: 1.75rem;
    margin-right: 1.75rem;
    color: var(--goa-color-text);
    width: 13.25rem;
    font-size: var(--fs-base);
  }

  .default-footer .logo-and-copyright {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .meta-links-only-footer {
    padding-top: 1.19em;
    padding-bottom: 3.5em;
  }

  .navigation-links-only-footer,
  .meta-and-navigation-links-only-footer,
  .meta-and-navigation-sections-only-footer,
  .navigation-sections-only-footer  {
    padding-top: 1.75rem;
    padding-bottom: 3.5em;
  }

  .meta-links-only-footer .meta-link {
    margin-top: 2.34rem;
    margin-right: 1.75rem;
    color: var(--goa-color-text);
  }


  .meta-and-navigation-links-only-footer .meta-link {
    margin-top: 2.34rem;
    margin-right: 1.75rem;
    color: var(--goa-color-text);
  }

  .meta-and-navigation-sections-only-footer .meta-link {
    margin-top: 3.53rem;
    margin-right: 1.75rem;
    color: var(--goa-color-text);
  }

  .default-footer .logo {
    margin-top: 3.5rem;
    margin-bottom: 3.5rem;
    display: block;
  }

  .navigation-links-only-footer .logo,
  .meta-and-navigation-links-only-footer .logo,
  .meta-links-only-footer .logo {
    margin-top: 1.75rem;
    margin-bottom: 1.75rem;
  }

  .navigation-sections-only-footer .logo, .meta-and-navigation-sections-only-footer .logo  {
    margin-top: 2.93rem;
    margin-bottom: 1.75rem;
  }

 .goa-copyright {
    margin-top: 0;
    margin-bottom: 0;
    font-size: var(--fs-base);
  }

  .navigation-links-divider {
    margin-top: 1.75rem;
    margin-bottom: 0;
  }

  @media (max-width: 64rem) {
    .logo {
      margin-top: 2.125rem;
      margin-bottom: 1.5rem;
    }
  }
  @media (max-width: 59.9rem) {
    .app-footer-container {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
  @media (max-width: 40rem) {

    .logo-and-copyright {
      align-items: flex-start;
      flex-direction: column-reverse;
    }

    .meta-links, .logo-and-copyright {
      flex: 100%;
    }

    .logo {
      width:7.8rem;
      height: 2.25rem;
      margin-top: 0;
      margin-bottom: 0;
    }

    .goa-copyright {
      font-size: var(--fs-sm);
    }

    .navigation-section-name {
      font-size: var(--fs-base);
      line-height: var(--lh-base);
      font-weight: var(--fw-bold);
      margin-bottom: 1rem;
      margin-top: 1.5rem;
    }

    .navigation-link {
      min-width: 40rem;
      margin-top: 1.5rem;
      font-size: var(--fs-sm);
    }

    .meta-links-only-footer .meta-link,
    .meta-and-navigation-links-only-footer .meta-link,
    .meta-and-navigation-sections-only-footer .meta-link {
      margin-top: 1.5rem;
      margin-right: 1.25rem;
      margin-bottom: 0;
      font-size: var(--fs-sm);
    }

    .default-footer,
    .meta-links-only-footer,
    .navigation-links-only-footer,
    .navigation-sections-only-footer,
    .meta-and-navigation-links-only-footer,
    .meta-and-navigation-sections-only-footer {
      padding-top: 0.75rem;
      padding-bottom: 2.25rem;
    }

    .navigation-links-divider {
      margin-top: 1.5rem;
      margin-bottom: 0;
    }

    .default-footer .logo {
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .default-footer .logo-and-copyright {
      align-items: flex-start;
    }

  }
</style>
