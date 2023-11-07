<svelte:options tag="goa-skeleton" />

<!-- Script -->
<script lang="ts">
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { onMount } from "svelte";
  import { typeValidator } from "../../common/utils";

  // Validator
  const [Types, validateType] = typeValidator("Skeleton type", [
    "image",
    "text",
    "title",
    "text-small",
    "avatar",
    "header",
    "paragraph",
    "thumbnail",
    "card",
    "lines",
    "profile",
    "article",
  ],
    true
  );
  const [Sizes, validateSize] = typeValidator("Skeleton size", ["1", "2", "3", "4"]);

  // Type
  type SkeletonType = typeof Types[number];
  type SkeletonSize = typeof Sizes[number];

  export let maxwidth: string = "300px";
  export let size: SkeletonSize = "1";
  export let linecount: number = 3;
  export let type: SkeletonType;
  export let testid: string = "";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  onMount(() => {
    validateType(type);
    validateSize(size);
  });
</script>

<!-- HTML -->
<div
  id="container"
  data-testid={testid}
  style="{calculateMargin(mt, mr, mb, ml)};">
  {#if type === "card"}
    <div
      class="card card-{size}"
      style="--max-width: {maxwidth};"
    >
      <svelte:self type="image" {size} />
      <div class="card-content">
        <svelte:self type="header" {size} />
        <svelte:self type="lines" {size} linecount={linecount} />
      </div>
    </div>
  {:else if type === "profile"}
    <div class="profile profile-{size}">
      <div class="profile-avatar">
        <svelte:self type="avatar" {size} />
      </div>
      <div class="profile-name">
        <svelte:self type="title" {size} />
        <svelte:self type="text-small" {size} />
      </div>
    </div>
  {:else if type === "lines"}
    {#each Array(Number.parseInt(linecount+"")) as _item}
      <svelte:self type="text" {size} linecount={linecount} />
    {/each}
  {:else if type === "article"}
    <div>
      <div style="display: flex; gap: 1rem;">
        <div style="flex: 1 1 auto">
          <svelte:self type="image" {size} />
        </div>
        <div style="flex: 2 2 auto">
          <svelte:self type="header" size="4" />
          <svelte:self type="header" size="1" />
        </div>
      </div>
      <svelte:self type="lines" {size} />
    </div>
  {:else}
    <div class="skeleton {type} {`${type}-${size}`}"></div>
  {/if}
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }
  @keyframes pulse {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }

  #container {
    container: self / inline-size;  
  }

  .skeleton {
    background-color: var(--goa-color-greyscale-100);
    animation: pulse 2s infinite ease-in-out;
    overflow: hidden;
    margin: 10px 0;
  }

  .image,
  .image-1 {
    background-color: var(--goa-color-greyscale-100);
    flex: 1 1 100px;
    height: 100px;
    margin: 0;
  }
  .image-2 {
    height: 140px;
  }
  .image-3 {
    height: 200px;
  }
  .image-4 {
    height: 300px;
  }

  .text,
  .text-1,
  .text-2,
  .text-3,
  .text-4 {
    width: 100%;
    height: .75rem;
    border-radius: 0.25rem;
    margin: 6px 0;
  }

  .title,
  .title-1,
  .title-2 {
    width: 100%;
    height: .75rem;
    border-radius: 0.25rem;
  }
  .title-3 {
    height: .8rem;
  }
  .title-4 {
    height: 1rem;
  }

  .text-small,
  .text-small-1 {
    width: 30%;
    height: 6px;
    border-radius: 2px;
  }
  .text-small-2 {
    width: 40%;
    height: 8px;
    border-radius: 2px;
  }
  .text-small-3 {
    width: 50%;
    height: 10px;
    border-radius: 3px;
  }
  .text-small-4 {
    width: 70%;
    height: 12px;
    border-radius: 4px;
  }

  .paragraph {
    width: 100%;
    height: 70px;
    border-radius: 4px;
  }

  .header,
  .header-1 {
    width: 50%;
    height: 18px;
    margin: 12px 0;
    border-radius: 0.25rem;
  }
  .header-2 {
    width: 60%;
    height: 20px;
    margin: 14px 0;
    border-radius: 0.25rem;
  }
  .header-3 {
    width: 70%;
    height: 22px;
    margin: 16px 0;
    border-radius: 0.25rem;
  }
  .header-4 {
    width: 80%;
    height: 24px;
    margin: 18px 0;
    border-radius: 0.3rem;
  }


  .avatar {
    display: inline-block;
  }
  .avatar,
  .avatar-1 {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .avatar-2 {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .avatar-3 {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .avatar-4 {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }


  .thumbnail {
    display: inline-block;
  }
  .thumbnail,
  .thumbnail-1 {
    width: 40px;
    height: 40px;
    border-radius: 4px;
  }
  .thumbnail-2 {
    width: 60px;
    height: 60px;
    border-radius: 4px;
  }
  .thumbnail-3 {
    width: 80px;
    height: 80px;
    border-radius: 4px;
  }
  .thumbnail-4 {
    width: 120px;
    height: 120px;
    border-radius: 4px;
  }

  .card {
    display: inline-block;
  }
  .card,
  .card-1,
  .card-2,
  .card-3,
  .card-4 {
    border: 1px solid var(--goa-color-greyscale-100);
    border-radius: 4px;
  }

  @container self (--container-mobile) {
    .card {
      width: 100%;
    }
  }

  @container self (--container-not-mobile) {
    .card {
      width: var(--max-width);
    }
  }

  /* helpers */

  .card-content {
    flex: 1 1 auto;
    padding: 1rem;
  }

  .profile {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .profile-1 {
    max-width: 280px;
    gap: 1rem;
  }
  .profile-2 {
    max-width: 360px;
    gap: 1rem;
  }
  .profile-3 {
    max-width: 480px;
    gap: 1rem;
  }
  .profile-4 {
    max-width: 560px;
    gap: 1rem;
  }

  .profile .profile-avatar {
    flex-shrink: 0;
  }
  .profile .profile-name {
    flex: 1 1 auto;
  }

</style>
