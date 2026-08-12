<svelte:options customElement="test-footer-meta-section-wrapper" />

<script lang="ts">
  import GoAAppFooterMetaSection from "./FooterMetaSection.svelte";

  function onClick(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    const target = document.querySelector(
      "span[data-testid='link-is-clicked']",
    );
    if (target) {
      target.innerHTML = "Link 2 clicked";
    }
  }
</script>

<GoAAppFooterMetaSection testid="test-footer-meta-section-wrapper">
  <a href="https://example.com" data-testid="standard-link">Link 1</a>
  <a href="/contact" data-testid="specialClick" on:click={onClick}>Link 2</a>
  <goa-link data-testid="goa-link"><a href="/privacy">Privacy</a></goa-link>
  <span data-testid="custom-content">Custom content</span>
</GoAAppFooterMetaSection>

<span data-testid="link-is-clicked"></span>
