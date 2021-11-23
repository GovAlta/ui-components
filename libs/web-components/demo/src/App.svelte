<script>
  import '../../src';
</script>

<main>
  <h1>Component Playground</h1>
  <div class="goa-state--error">
    <goa-checkbox
      id="confirm"
      iserror=""
      isdisabled=""
      ischecked=""
      isindeterminate=""
      name="confirm"
      content="I accept the conditions"
    />
  </div>

  <script>
    document.getElementById('confirm').addEventListener('on:change', () => {
      console.log('changed');
    });
  </script>
</main>

<style>
  main {
    margin: 4rem;
  }
</style>
