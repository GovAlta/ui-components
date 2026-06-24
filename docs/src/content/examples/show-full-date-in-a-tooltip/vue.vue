<!--
Prerequisites:
- npm install @abgov/web-components @abgov/design-tokens
- Vite: isCustomElement for goa-* tags (see setup docs)
- Import "@abgov/web-components" in main.ts
- Import CSS: @abgov/web-components/index.css + design-tokens/tokens.css
- Add ionicons CDN to index.html
- Full guide: get-started/developers/setup
-->

<template>
  <goa-container type="non-interactive" accent="thick">
    <div slot="title">
      Joan Smith
      <goa-tooltip content="Nov 23, 2023 at 10:35 am">
        <span
          style="
            color: var(--goa-color-text-secondary);
            font: var(--goa-typography-body-xs);
          "
        >
          4 hours ago
        </span>
      </goa-tooltip>
    </div>
    <goa-text as="p" size="body-m" mt="none" mb="none"
      >Hover on the time it was added to see the full date and time.</goa-text
    >
  </goa-container>
</template>
