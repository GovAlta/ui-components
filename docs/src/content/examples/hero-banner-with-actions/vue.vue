<template>
  <goa-hero-banner heading="Supporting Businesses">
    Resources are available to help Alberta entrepreneurs and small businesses start, grow
    and succeed.
    <div slot="actions">
      <goa-button version="2" type="start" @_click="onCtaClick">Call to action</goa-button>
    </div>
  </goa-hero-banner>
</template>

<script setup lang="ts">
function onCtaClick() {
  console.log("Call to action clicked");
}
</script>
