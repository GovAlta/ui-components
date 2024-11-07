<svelte:options customElement="test-work-side-menu-wrapper" />

<script lang="ts">
  import GoAWorkSideMenu from "./WorkSideMenu.svelte";
  import GoaWOrkSIdeMenuItem from "./WorkSideMenuItem.svelte";

  export let title: string = "";
  export let url: string = "";
  export let username: string = "";
  export let useremail: string = "";
  export let testid: string = "";
</script>

<GoAWorkSideMenu {title} {url} {username} {useremail} {testid}>
  <div slot="primary">
    <GoaWOrkSIdeMenuItem icon="star" label="Primary menu item" url="#primary">
      <GoaWOrkSIdeMenuItem
        icon="star"
        variation="submenu"
        label="Primary menu item"
        url="#submenu"
      ></GoaWOrkSIdeMenuItem>
    </GoaWOrkSIdeMenuItem>
  </div>
  <div slot="secondary">
    <GoaWOrkSIdeMenuItem icon="star" label="Overview" url="#secondary"
    ></GoaWOrkSIdeMenuItem>
  </div>
  <div slot="account">
    <GoaWOrkSIdeMenuItem icon="star" label="Overview" url="#account"
    ></GoaWOrkSIdeMenuItem>
  </div>
</GoAWorkSideMenu>
