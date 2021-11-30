<script>
  import '../../src';
</script>

<main>
  <h1>Component Playground</h1>

  <!-- Container -->
  <goa-container headingsize="large">
    <div slot="title">Header</div>
    <goa-button type="tertiary" size="small" slot="actions">Button</goa-button
    >
    <p style="line-height: 1.6rem;">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </goa-container>

  <goa-container variant="primary" headingsize="large">
    <div slot="title">Header</div>
    <div slot="actions">
      <goa-icon inverted type="timer" />
      <goa-icon-button inverted type="alarm" />
    </div>
    <div>This is the container content</div>
  </goa-container>

  <goa-container variant="primary" headingsize="small">
    <div slot="title">Header</div>
    <div>This is the container content</div>
  </goa-container>

  <goa-container variant="error">
    <div>This is the container content</div>
  </goa-container>

  <goa-container variant="success">
    <div>This is the container content</div>
  </goa-container>

  <goa-container headingsize="none">
    <div>This one has no header</div>
  </goa-container>

  <goa-container>
    <h2>Interactive Container</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <goa-button type="borderless" size="large">Assign to me</goa-button>
  </goa-container>
  <!-- Dropdown -->

  <h2>Dropdown</h2>

  <h3>Autocomplete and Custom option content</h3>
  <goa-dropdown name="people">
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
