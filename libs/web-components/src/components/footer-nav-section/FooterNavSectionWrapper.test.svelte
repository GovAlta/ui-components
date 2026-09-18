<svelte:options customElement="test-footer-nav-section-wrapper" />

<script lang="ts">
  import GoAAppFooterNavSection from "./FooterNavSection.svelte";
</script>

<GoAAppFooterNavSection
  heading="Resources"
  maxcolumncount={2}
  testid="footer-nav-section"
>
  <a href="/services" data-testid="standard-link">Services</a>
  <goa-link data-testid="goa-link"><a href="/contact">Contact</a></goa-link>
  <span data-testid="custom-content">Custom content</span>
</GoAAppFooterNavSection>
