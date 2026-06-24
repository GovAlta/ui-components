<!--
Prerequisites:
- npm install @abgov/web-components @abgov/design-tokens
- Vite: isCustomElement for goa-* tags (see setup docs)
- Import "@abgov/web-components" in main.ts
- Import CSS: @abgov/web-components/index.css + /design-tokens/dist/tokens.css
- Add ionicons CDN to index.html
- Full guide: get-started/developers/setup
-->

<template>
  <goa-temp-notification-ctrl></goa-temp-notification-ctrl>
  <goa-button version="2" @_click="onComment">Comment</goa-button>
</template>

<script setup lang="ts">
let currentUuid: string | null = null;

function showNotification(message: string, opts: Record<string, unknown> = {}) {
  const uuid = crypto.randomUUID();
  document.body.dispatchEvent(
    new CustomEvent("msg", {
      composed: true,
      bubbles: true,
      detail: {
        action: "goa:temp-notification",
        data: { message, uuid, type: "basic", duration: "short", ...opts },
      },
    }),
  );
  return uuid;
}

function dismissNotification(uuid: string) {
  document.body.dispatchEvent(
    new CustomEvent("msg", {
      composed: true,
      bubbles: true,
      detail: {
        action: "goa:temp-notification:dismiss",
        data: uuid,
      },
    }),
  );
}

function onComment() {
  currentUuid = showNotification("Edna Mode commented on your assigned case.", {
    actionText: "View",
    action: () => {
      dismissNotification(currentUuid!);
    },
  });
}
</script>
