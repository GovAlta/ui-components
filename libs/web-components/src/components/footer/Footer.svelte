<svelte:options customElement="goa-app-footer" />

<script lang="ts">
  import { onMount, tick } from "svelte";

  export let maxcontentwidth: string = "";
  export let testid: string = "";
  export let url: string = "https://alberta.ca";

  let rootEl: HTMLElement;
  let navLinks: Element[];
  let metaLinks: Element[];

  const year = new Date().getFullYear();
  const _footerLogo = "data:image/svg+xml,%3Csvg width='155' height='42' viewBox='0 0 155 42' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_74_4890)'%3E%3Cpath d='M155 21H140.6V35.4004H155V21Z' fill='%2300B6ED'/%3E%3Cpath d='M65.5539 33.211C64.116 33.349 62.6147 33.4882 61.0366 33.5566C61.6106 29.2005 63.9758 23.1883 66.915 24.1484C68.6357 24.7016 67.7035 29.8197 65.5527 33.2086L65.5539 33.211ZM61.8957 36.1823C61.4683 36.2514 61.0326 36.2514 60.6053 36.1823C60.7165 36.1047 60.8073 36.0013 60.8699 35.881C60.9325 35.7606 60.965 35.6268 60.9647 35.4911V34.9378C61.7531 34.9378 62.9717 34.7998 64.4779 34.6606C63.8154 35.4471 62.9038 35.9839 61.8957 36.1823ZM79.8198 25.8116C81.6842 24.1484 82.6164 24.29 82.8273 24.7052C83.3294 25.6736 81.1786 29.0625 76.9489 30.9297C77.3845 28.9796 78.3814 27.2002 79.8162 25.8116H79.8198ZM149 27.4712C148.784 24.0824 145.702 23.5291 145.272 24.4976C145.128 24.8432 146.419 24.7052 146.419 27.1256C146.419 31.0677 142.261 36.2543 136.953 36.2543C135.111 36.3656 133.298 35.7577 131.894 34.5583C130.49 33.3589 129.605 31.6613 129.425 29.8221C129.209 28.3701 129.568 26.3636 126.988 26.6408C125.19 26.8484 123.618 30.1677 121.324 33.001C119.387 35.4215 118.527 35.2139 118.957 33.139C119.531 30.5109 121.754 24.4256 124.335 24.0104C125.553 23.8027 125.983 25.8104 126.491 24.5636C126.674 24.1246 126.746 23.6475 126.701 23.1742C126.655 22.7009 126.495 22.246 126.233 21.8497C125.97 21.4533 125.615 21.1276 125.197 20.9012C124.78 20.6749 124.313 20.5549 123.839 20.5519C121.974 20.5519 119.751 22.4887 117.888 24.632C116.311 26.5688 108.209 38.0483 104.768 35.5595C103.191 34.3834 103.33 29.6793 104.338 24.1484C105.794 23.5168 107.361 23.1795 108.948 23.1559C110.536 23.1322 112.112 23.4226 113.587 24.0104C114.519 24.4256 114.665 24.356 114.233 23.3875C113.659 21.9355 110.433 19.653 105.343 20.6899C105.199 20.6899 105.127 20.7595 104.984 20.7595C105.414 18.9594 105.844 17.0946 106.421 15.2957C106.923 13.6361 108.286 10.8004 104.624 10.3168C103.477 10.1092 103.979 10.6624 103.546 12.184C102.827 14.9501 101.969 18.5442 101.323 22.2115C98.0002 24.1064 95.2885 26.9143 93.5082 30.3033C93.9222 28.7349 94.2336 27.141 94.4404 25.532C94.4806 25.1343 94.3704 24.7359 94.1314 24.4157C93.8924 24.0955 93.5422 23.8768 93.1499 23.8027C92.3615 23.5951 91.3526 23.9408 90.4252 25.2548C88.2025 28.2981 85.4071 33.0694 81.1055 35.0747C78.0225 36.5267 76.6601 35.0747 76.5894 32.7946C77.1289 32.6525 77.6562 32.4675 78.1663 32.2414C83.7583 29.8905 85.6228 26.294 84.2604 24.0812C82.898 22.0063 79.0985 22.6291 76.0155 25.7408C74.3913 27.5384 73.4079 29.8245 73.2188 32.2414C71.9284 32.5186 70.4941 32.7214 68.8454 32.9326C71.4263 28.8525 71.2118 23.3191 67.4075 22.3519C62.9621 21.2455 60.7395 25.3952 59.8084 28.8525C60.1679 24.98 60.7407 21.1063 61.4572 17.3034C61.8167 15.6437 62.9621 12.808 59.3004 12.3244C58.1537 12.1168 58.2963 12.67 58.3682 14.1917C58.512 16.2665 56.1455 28.6461 57.3641 34.0402C55.7872 34.5202 55.1414 35.6999 57.1484 36.8759C58.3625 37.3816 59.673 37.6128 60.9865 37.5531C62.3 37.4933 63.5842 37.1441 64.7475 36.5303C65.8289 36.0016 66.8016 35.2742 67.6148 34.3858C69.4792 34.1782 71.4143 33.8326 73.2069 33.5554C73.4932 35.9759 75.1432 37.7735 78.8708 37.4279C84.1765 36.9479 88.9083 30.6501 90.7008 27.608C90.3413 30.8589 88.1917 37.9811 91.9194 37.6355C93.3572 37.4975 92.7797 37.2899 92.8516 36.0455C93.211 31.7578 96.8668 28.0929 100.52 25.8788C99.8743 31.1349 100.09 35.8391 102.599 37.2899C107.187 40.056 113.569 32.7946 117.153 28.3689C115.355 32.311 114.356 37.2899 117.009 38.0507C120.164 38.9496 122.673 33.8326 125.612 29.9589C125.971 32.725 127.907 37.5659 135.649 37.5659C143.966 37.4963 149.2 32.6554 148.984 27.4688L149 27.4712ZM36.7117 36.1091C33.9173 35.1299 31.1875 33.9747 28.5387 32.6506C30.939 31.8034 33.2854 30.8103 35.565 29.6769C35.8138 31.8427 36.1968 33.9909 36.7117 36.1091ZM57.8817 39.9888C57.8098 39.7812 57.2359 40.0584 56.735 39.9888C55.2289 39.7812 53.2219 37.7759 52.6479 34.525C51.5695 28.6449 52.2178 22.8379 54.0103 14.1929C54.3698 12.5332 55.5164 9.69756 51.8535 9.14435C50.7068 9.00634 51.2796 9.55956 50.9932 11.0116C49.5553 17.4438 44.1106 22.0771 38.6624 25.1888C38.0884 17.8578 38.3029 9.62796 39.7408 4.64903C40.9629 0.430912 42.396 1.19173 40.6035 0.292908C38.8109 -0.605916 36.732 0.568916 35.0833 3.7478C33.4346 6.92669 25.9122 24.014 13.8629 35.5631C7.69931 41.4408 2.10485 38.3987 1.02886 37.4999C0.0966476 36.7391 -0.189725 37.9151 0.885072 39.09C5.8325 44.3461 13.1452 41.37 15.7968 38.8128C23.1059 31.759 31.6408 16.5438 35.0881 10.1128C34.6816 15.735 34.7775 21.3824 35.3745 26.9876C32.6035 28.2941 29.7251 29.3585 26.7713 30.1689C25.0507 30.5841 23.9747 31.2753 23.9747 32.0362C23.9747 32.797 25.1213 33.5578 26.7713 34.3162C29.7105 35.6999 38.3856 39.5724 40.4645 40.8168C42.2618 41.8536 43.1892 41.0244 43.6913 39.918C44.4102 38.4659 42.4727 37.6379 40.6083 37.1519C39.7869 34.1144 39.2115 31.0154 38.8876 27.8853C43.2611 25.2572 47.6346 21.7999 50.0718 17.445C49.4271 21.0451 47.8491 33.421 51.8691 38.6076C52.4249 39.3234 53.1422 39.8971 53.9622 40.2815C54.7822 40.666 55.6816 40.8502 56.5864 40.8192C57.5905 40.7496 58.0243 40.128 57.8769 39.9888' fill='%23545860'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_74_4890'%3E%3Crect width='154.804' height='42' fill='white' transform='translate(0.195801)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A";

  onMount(async () => {
    await tick();
    const navSlot = rootEl.querySelector("slot[name=nav]") as HTMLSlotElement;
    const metaSlot = rootEl.querySelector("slot[name=meta]") as HTMLSlotElement;
    metaLinks = metaSlot?.assignedElements();
    navLinks = navSlot?.assignedElements();
  });
</script>

<div
  class="app-footer"
  bind:this={rootEl}
  style={`--max-content-width: ${maxcontentwidth || "100%"}`}
  data-testid={testid}
>
  <div class="content">
    <div class="nav-links">
      <slot name="nav" />
    </div>

    {#if navLinks?.length > 0}
      <goa-divider mt="l" mb="l"/>
    {/if}

    <div
      class="meta-section"
      class:with-meta-links={metaLinks && metaLinks.length > 0}
    >
      <div class="meta-links">
        <slot name="meta" />
      </div>

      <div
        class="abgov"
        class:with-meta-links={metaLinks && metaLinks.length > 0}
      >
        <!-- Logo with optional link -->
        {#if url && url !== ""}
          <a href={url}>
            <img src={_footerLogo} alt="Government of Alberta Logo" class="logo" />
          </a>
        {:else}
          <img src={_footerLogo} alt="Government of Alberta Logo" class="logo" />
        {/if}

        <a href="https://alberta.ca" class="goa-copyright">
          © {year} Government of Alberta
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  * {
    box-sizing: border-box;
  }

  .app-footer {
    background-color: var(--goa-footer-color-bg);
    border-top: var(--goa-footer-border-top);
    border-bottom: var(--goa-footer-border-bottom);
    container: self / inline-size;
  }

  .content {
    margin: 0 auto;
    width: min(var(--max-content-width), 100%);
  }

  @container self (--mobile) {
    .content {
      padding: var(--goa-footer-padding-small-screen);
      font-size: var(--goa-footer-typography-small-screen);
    }
    .logo {
    width: var(--goa-footer-size-logo-mobile);
    }
  }

  @container self (--tablet) {
    .content {
      padding: var(--goa-footer-padding-medium-screen);
    }
    .logo {
    width: var(--goa-footer-size-logo-tablet);
    }
  }

  @container self (--desktop) {
    .content {
      padding: var(--goa-footer-padding-large-screen);
    }
    .logo {
    width: var(--goa-footer-size-logo-desktop);
    }
  }

  .meta-section {
    display: flex;
    flex-direction: column;
    gap: var(--goa-space-l); /* space above logo and below meta links */
  }

  .meta-section.with-meta-links {
  /* gap between meta links and goa log when stacked vertically on small screen  */
    justify-content: space-between;
  }

  .meta-links {
    display: none;
  }
  .with-meta-links .meta-links {
    display: block;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    gap: var(--goa-space-xl); /* space between different columns/rows of nav links on mobile */
  }


  .abgov {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    gap: var(--goa-space-m);   /* gap between copyright and goa log when stacked vertically on small screen  */
  }

  @container self (--not-mobile) {
    .meta-section {
      flex-direction: row;
      gap: var(--goa-space-xl);
    }

    .nav-links {
      flex-direction: row;
      gap: var(--goa-space-2xl); /* space between different columns/rows of nav links on desktop */
    }

    .abgov {
      align-items: center;
      flex-direction: row-reverse;
      gap: var(--goa-space-m);
    }

    .abgov.with-meta-links {
      align-items: flex-end;
    }
  }

  .abgov.with-meta-links {
    gap: var(--goa-space-m); /* gap between copyright and goa logo when stacked  */
    flex-direction: column;
    width: unset;
  }

  .goa-copyright {
    white-space: nowrap;
  }

  a {
    color: var(--goa-footer-color-links-secondary);
    cursor: pointer;
    display: flex;
  }

  a:hover {
    color: var(--goa-footer-color-links-secondary-hover);
  }

  a:focus-visible {
    outline: var(--goa-footer-link-focus);
    border-radius: 2px;
  }
</style>
