<script>
  import '../../src';
</script>

<main>
  <h1>Component Playground</h1>
  <h2>Radio Groups</h2>

  <goa-radio-group id="radioGroup1" name="foo">
    <goa-radio-item name="foo" value="99" label="NinetyNine">here</goa-radio-item>
    <goa-radio-item name="foo" value="100" label="OneHundred" />
  </goa-radio-group>


  <goa-radio-group id="radioGroup2" name="bar" error="error">
    <goa-radio-item name="bar" value="99" label="NinetyNine">here</goa-radio-item>
    <goa-radio-item name="bar" value="100" label="OneHundred" />
  </goa-radio-group>

  <script>
    document.getElementById('radioGroup1').addEventListener('on:change', (e) => {
      console.log('in the on change', e.detail)
    })
  </script>
</main>

<style>
  main {
    margin: 4rem;
  }
</style>
