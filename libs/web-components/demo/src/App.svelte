<script>
  import '../../src';
</script>

<main>
  <h1>Component Playground</h1>

  <!-- Dropdown -->

  <h2>Dropdown</h2>

  <h3>Autocomplete and Custom option content</h3>
  <goa-dropdown name="people" isautocomplete="autocomplete">
    <goa-dropdown-item name="people" value="1" label="Tom Cruise" />
    <goa-dropdown-item name="people" value="2" label="Nicholas Cage">
      <div class="custom-dropdown-content">
        <img
          alt="nicholas cage"
          height="40"
          width="40"
          src="https://www.placecage.com/40/40"
        />
        <span>Nicholas Cage</span>
      </div>
    </goa-dropdown-item>
  </goa-dropdown>

  <h3>Multiselet</h3>
  <goa-dropdown name="multi" ismultiselect="true">
    <goa-dropdown-item name="multi" value="1" label="Tom Cruise" />
    <goa-dropdown-item name="multi" value="2" label="Nicholas Cage" />
  </goa-dropdown>

  <h3>Autocomplete and multiselet</h3>
  <goa-dropdown name="autocomplete" isautocomplete="true" ismultiselect="true">
    <goa-dropdown-item name="autocomplete" value="1" label="Tom Cruise" />
    <goa-dropdown-item name="autocomplete" value="2" label="Nicholas Cage" />
    <goa-dropdown-item name="autocomplete" value="2" label="Tom Hardy" />
    <goa-dropdown-item name="autocomplete" value="2" label="Val Kilmer" />
  </goa-dropdown>

  <!-- Radio Groups -->

  <h2>Radio Groups</h2>

  <goa-radio-group id="radioGroup1" name="foo">
    <goa-radio-item name="foo" value="99" label="NinetyNine"
      >here</goa-radio-item
    >
    <goa-radio-item name="foo" value="100" label="OneHundred" />
  </goa-radio-group>

  <goa-radio-group id="radioGroup2" name="bar" error="error">
    <goa-radio-item name="bar" value="99" label="NinetyNine"
      >here</goa-radio-item
    >
    <goa-radio-item name="bar" value="100" label="OneHundred" />
  </goa-radio-group>

  <script>
    document
      .getElementById('radioGroup1')
      .addEventListener('on:change', (e) => {
        console.log('in the on change', e.detail);
      });
  </script>

  <!-- Checkbox -->

  1
  <h2>Checkbox</h2>
  <div>
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

  .custom-dropdown-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .custom-dropdown-content img {
    border-radius: 50%;
  }
</style>
