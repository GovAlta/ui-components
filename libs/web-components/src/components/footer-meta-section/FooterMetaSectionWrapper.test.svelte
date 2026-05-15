<svelte:options customElement="test-footer-meta-section-wrapper"></svelte:options>

<script lang="ts">
  import GoAAppFooterMetaSection from "./FooterMetaSection.svelte";

  function onClick(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    // To test if function is delegated and client app can do whatever they want without navigating to /contact
    const target = document.querySelector("span[data-testid='link-is-clicked']");
    if (target) {
      target.innerHTML = "Link 2 clicked";
    }
  }

</script>

<GoAAppFooterMetaSection
  testid="test-footer-meta-section-wrapper">
  <a href="https://example.com">Link 1</a>
  <a href="/contact" data-testid="specialClick" on:click={onClick}>Link 2</a>
</GoAAppFooterMetaSection>

<span data-testid="link-is-clicked"></span>
