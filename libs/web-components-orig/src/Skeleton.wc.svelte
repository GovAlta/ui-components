<svelte:options tag="goa-skeleton" />

<!-- Script -->
<script lang="ts">
  export let type: "text" | "avatar" | "title" | "paragraph" | "thumbnail" | "card" | "profile";
  export let style: string;
</script>

<!-- HTML -->
{#if type === "card"}
  <div class="card">
    <div class="card-image"></div>
    <div class="card-content">
      <svelte:self type="title" />
      <svelte:self type="text" />
      <svelte:self type="text" />
      <svelte:self type="text" />
    </div>
  </div>
{:else if type === "profile"}
  <div class="profile">
    <div class="profile-avatar">
      <svelte:self type="avatar" />
    </div>
    <div class="profile-name">
      <svelte:self type="text" />
      <svelte:self type="text" style="height: 6px; width: 30%;" />
    </div>
  </div>
{:else}
  <div class="skeleton {type}" {style}></div>
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

  .text {
    width: 100%;
    height: 12px;
    border-radius: 4px;
  }

  .paragraph {
    width: 100%;
    height: 70px;
    border-radius: 4px;
  }

  .title {
    width: 50%;
    height: 20px;
    margin-bottom: 15px;
    border-radius: 4px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .thumbnail {
    width: 40px;
    height: 40px;
    border-radius: 4px;
  }

  .card {
    display: flex;
    flex-direction: column;
    width: 280px;
    border: 1px solid var(--color-gray-100);
    border-radius: 4px;
    height: 300px;
  }

  /* helpers */

  .card-image {
    background-color: var(--color-gray-100);
    flex: 1 1 100px;
  }
  .card-content {
    flex: 1 1 auto;
    padding: 1rem;
  }

  .profile {
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 280px;
    gap: 1rem;
  }

  .profile .profile-avatar {
    flex-shrink: 0;
  }
  .profile .profile-name {
    flex: 1 1 auto;
  }

</style>
