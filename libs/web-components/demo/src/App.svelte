<script>
  import "../../src";

  let _showModal = false;
  let _showModal2 = false;
  let modal;
  let modal2;

  $: {
    modal?.addEventListener("_close", () => _showModal = false)
    modal2?.addEventListener("_close", () => _showModal2 = false)
  }

  function showModal() {
    _showModal = true;  
  }

  function showModal2() {
    _showModal2 = true;  
  }

</script>

<svelte:head>
  <title>GoA Component Playground</title>
</svelte:head>

<goa-page>
  <section slot="header">
    <goa-microsite-header level="alpha" version="v1.2.3" />
    <goa-app-header url="http://google.com" title="Digital File Service">
      <a href="http://signin.gov.au/">Sign in</a>
    </goa-app-header>
  </section>

  <goa-page-block width="702px">
    <h2>Playground</h2>

    <button on:click={showModal}>Click</button>

    <goa-modal bind:this={modal} heading="Test" open={_showModal} closable={true}>
      <goa-input name="foo" type="text" />
      <goa-input name="bar" type="text" />
      <goa-button type="primary">Save</goa-button>
    </goa-modal> 


    <button on:click={showModal2}>Click</button>

    <goa-modal bind:this={modal2} heading="Test 2" open={_showModal2} closable={true}>
      <goa-input name="foo" type="text" />
      <goa-input name="bar" type="text" />
      <goa-button type="primary">Save</goa-button>
    </goa-modal> 

  </goa-page-block>
  
  <section slot="footer">
    <goa-app-footer>
      <goa-app-footer-nav-section slot="nav" name="Section 1">
        <a href="a.html">Arts and culture</a>
        <a href="b.html">Education and training</a>
        <a href="c.html">Family and social supports</a>
        <a href="d.html">Housing and community</a>
        <a href="e.html">Life events</a>
      </goa-app-footer-nav-section>

      <goa-app-footer-nav-section slot="nav" name="Section 2" maxcolumncount="2">
        <a href="f.html">Business and economy</a>
        <a href="g.html">Emergencies and public safety</a>
        <a href="h.html">Government</a>
        <a href="i.html">Jobs and employment</a>
        <a href="j.html">Moving to Alberta</a>
        <a href="instagram.html">Instagram</a>
        <a href="youtube.html">YouTube</a>
        <a href="facebook.html">Facebook</a>
        <a href="snapchat.html">Snapchat</a>
        <a href="twitter.html">Twitter</a>
      </goa-app-footer-nav-section>

      <goa-app-footer-meta-section slot="meta">
        <a href="privacy.html">Privacy</a>
        <a href="disclaimer.html">Disclaimer</a>
        <a href="accessibility.html">Accessibility</a>
        <a href="using-alberta.html">Using Alberta.ca</a>
      </goa-app-footer-meta-section>

    </goa-app-footer>
  </section>

</goa-page>

