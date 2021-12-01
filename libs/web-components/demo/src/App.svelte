<script>
  import '../../src';
</script>

<main>

  <!-- App Header -->
  <goa-app-header url="http://google.com" title="Digital File Service">
    <a href="http://signin.gov.au/">Sign in</a>
  </goa-app-header>

  <goa-page-layout>

    <goa-notification type="information">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi saepe, maiores, praesentium minus quod reprehenderit consequuntur earum molestias aliquid amet, vitae eveniet harum incidunt sint. Numquam debitis molestias officia corporis.
    </goa-notification>

    <h2>Header 2 (h2)</h2>
    <h3>Header 3 (h3)</h3>

    <!-- Text Input -->

    <goa-flex-row gap="small">
      <goa-form-item label="First name" helptext="This is helper text">
        <goa-input id="firstname" name="firstname" />
      </goa-form-item>

      <goa-form-item label="Last name" optional helptext="This is helper text">
        <goa-input id="lastname" name="lastname" />
      </goa-form-item>

      <goa-form-item label="Last name" optional helptext="This is helper text">
        <goa-input id="lastname" name="lastname" />
      </goa-form-item>

    </goa-flex-row>

    <goa-form-item label="Autocomplete">
      <goa-dropdown name="autocomplete" isautocomplete="true" placeholder="Favourite Actor">
        <goa-dropdown-item name="autocomplete" value="1" label="Tom Cruise" />
        <goa-dropdown-item name="autocomplete" value="2" label="Nicholas Cage">
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
        <goa-dropdown-item name="autocomplete" value="2" label="Tom Hardy" />
        <goa-dropdown-item name="autocomplete" value="2" label="Val Kilmer" />
      </goa-dropdown>
    </goa-form-item>

    <br />

    <goa-callout type="success">
      <h3>Callout title</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ipsum eu euismod consectetur, nisl nisl iaculis nisl, eu tincidunt nisi nisl euismod nisi. Sed euismod, ipsum eu euismod consectetur, nisl nisl iaculis nisl, eu tincidunt nisi nisl euismod nisi.</p>
    </goa-callout>

    <!-- Radio Groups -->

    <goa-form-item label="Favourite Color">
      <goa-radio-group id="radioGroup1" name="color">
        <goa-radio-item name="color" value="red" label="Red" />
        <goa-radio-item name="color" value="blue" label="Blue" />
        <goa-radio-item name="color" value="green" label="Green" />
      </goa-radio-group>
    </goa-form-item>

    <script>
      document
        .getElementById('radioGroup1')
        .addEventListener('on:change', (e) => {
          console.log('in the on change', e.detail);
        });
    </script>

    <!-- Checkbox -->

    <goa-form-item label="Terms and conditions">
      <goa-checkbox
        id="confirm"
        iserror=""
        isdisabled=""
        ischecked=""
        isindeterminate=""
        name="confirm"
        content="I accept the conditions"
      />
    </goa-form-item>

    <br />

    <script>
      document.getElementById('confirm').addEventListener('on:change', () => {
        console.log('changed');
      });
    </script>

    <goa-button-group>
      <goa-button type="primary" size="large">Primary</goa-button>
      <goa-button type="secondary" size="large">Secondary</goa-button>
      <goa-button type="tertiary" size="large">Tertiary</goa-button>
    </goa-button-group>

    <hr />

    <!-- Container -->
    <goa-container headingsize="large">
      <h2>Interactive Container</h2>
      <p style="line-height: 1.6rem;">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
        est laborum.
      </p>

      <div slot="title">Header</div>
      <goa-button type="primary" variant="danger" size="small" slot="actions">Delete</goa-button>

      <goa-button type="borderless" size="large">Assign to me</goa-button>
    </goa-container>

  </goa-page-layout>
</main>

<style>

  .custom-dropdown-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .custom-dropdown-content img {
    border-radius: 50%;
  }

</style>
