<svelte:options tag="goa-skeleton" />

<!-- Script -->
<script lang="ts">
  export let width: number = 320;
  export let size: number = 1;
  export let type: "image" | "text" | "title" | "text-small" | "avatar" | "header" | "paragraph" | "thumbnail" | "card" | "profile";
</script>

<!-- HTML -->
{#if type === "card"}
  <div class="card card-{size}" style="--width: {width}px;">
    <svelte:self type="image" {size} />
    <div class="card-content">
      <svelte:self type="header" {size} />
      <svelte:self type="text" {size} />
      <svelte:self type="text" {size} />
      <svelte:self type="text" {size} />
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
{:else}
  <div class="skeleton {type} {`${type}-${size}`}"></div>
{/if}

<!-- Style -->
<style>
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

  .skeleton {
    background-color: var(--color-gray-100);
    animation: pulse 2s infinite ease-in-out;
    overflow: hidden;
    margin: 10px 0;
  }

  .image,
  .image-1 {
    background-color: var(--color-gray-100);
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
  .text-4,
  .text-4 {
    width: 100%;
    height: .75rem;
    border-radius: 0.25rem;
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
    margin-bottom: 12px;
    border-radius: 0.25rem;
  }
  .header-2 {
    width: 60%;
    height: 20px;
    margin-bottom: 14px;
    border-radius: 0.25rem;
  }
  .header-3 {
    width: 70%;
    height: 22px;
    margin-bottom: 16px;
    border-radius: 0.25rem;
  }
  .header-4 {
    width: 80%;
    height: 24px;
    margin-bottom: 18px;
    border-radius: 0.3rem;
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
  .card,
  .card-1,
  .card-2,
  .card-3,
  .card-4 {
    border: 1px solid var(--color-gray-100);
    border-radius: 4px;
  }

  .card {
    width: 100%;
  }

  @media (min-width: 320px) {
    .card {
      width: var(--width);
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
