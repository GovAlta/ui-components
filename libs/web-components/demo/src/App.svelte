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

<style>
  :root {
    --layout-left-side-column-width: 256px;
    --layout-max-content-width: 904px;
  }
  section[slot="nav"] a {
    display: block;
    padding: 0.5rem 0;
  }
</style>

<svelte:head>
  <title>GoA Component Playground</title>
</svelte:head>

<goa-two-column-layout >
  <section slot="header">
    <goa-microsite-header level="alpha" version="v1.2.3" />
    <goa-app-header url="http://google.com" title="Digital File Service">
      <a href="http://signin.gov.au/">Sign in</a>
    </goa-app-header>
  </section>

  <section slot="nav">
    <a href="#dashboard">Dashboard</a>
    <a href="#accounts">Accounts</a>
    <a href="#invoices">Invoices</a>
    <a href="#employees">Employees</a>
    <a href="#claims">Claims</a>
  </section>

  <goa-input prefix="$" suffix="per item" type="text" />
  <goa-input type="text" />
  <goa-input type="text" />

  <goa-input type="datetime-local" step="1" />

  <input type="text" />
  <input type="text" />
  <input type="text" />
  <goa-input />

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
  
  <section slot="footer">
    <goa-app-footer>
      <goa-app-footer-meta-section slot="meta">
        <a href="privacy.html">Privacy</a>
        <a href="disclaimer.html">Disclaimer</a>
        <a href="accessibility.html">Accessibility</a>
        <a href="using-alberta.html">Using Alberta.ca</a>
      </goa-app-footer-meta-section>

    </goa-app-footer>
  </section>

</goa-two-column-layout>
