<script>
  import '../../src';
</script>

<main>

  <!-- App Header -->
  <goa-app-header url="http://google.com" title="Digital File Service">
    <a href="http://signin.gov.au/">Sign in</a>
  </goa-app-header>

  <goa-hero-banner title="Upgrading our bitumen" backgroundurl="https://picsum.photos/id/1076/600/400">
    <div slot="content">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur optio, eius expedita, quasi vero maxime, laudantium voluptates eaque illum officiis hic! Commodi, asperiores officiis necessitatibus itaque similique magnam nisi voluptate.
    </div>
    <div slot="actions">
      <goa-button>Button</goa-button>
    </div>
  </goa-hero-banner>

  <goa-page-block>

    <ul>
      <li><a href="#section-modal">Modal</a></li>
      <li><a href="#section-notification">Notification</a></li>
      <li><a href="#section-input">Input</a></li>
      <li><a href="#section-input">Input</a></li>
      <li><a href="#section-callout">Callout</a></li>
      <li><a href="#section-radio">Radio Buttons</a></li>
      <li><a href="#section-container">Container</a></li>
      <li><a href="#section-container">Container</a></li>
      <li><a href="#section-checkbox">Checkbox</a></li>
      <li><a href="#section-buttons">Buttons</a></li>
      <li><a href="#section-icon-buttons">Icon Buttons</a></li>
      <li><a href="#section-icons">Icons</a></li>
      <li><a href="#section-badges">Badges</a></li>
    </ul>

    <goa-spinner size="small" />
    <goa-spinner size="medium" />
    <goa-spinner size="large" />

    <div class="dark-bg">
      <goa-spinner invert size="small" />
      <goa-spinner invert size="medium" />
      <goa-spinner invert size="large" />
    </div>

    <h3 id="section-badges">Badges</h3>
    <goa-badge content="Success" type="success">Success</goa-badge>
    <goa-badge content="Warning" type="warning"></goa-badge>
    <goa-badge content="Information" type="information"></goa-badge>
    <goa-badge content="Emergency" type="emergency"></goa-badge>
    <goa-badge content="Inactive" type="inactive"></goa-badge>
    <goa-badge content="Dark" type="dark"></goa-badge>
    <goa-badge content="Midtone" type="midtone"></goa-badge>
    <goa-badge content="Light" type="light"></goa-badge>

    <br>
    <br>
    <goa-badge icon content="Success" type="success"></goa-badge>
    <goa-badge icon content="Warning" type="warning"></goa-badge>
    <goa-badge icon content="Information" type="information"></goa-badge>
    <goa-badge icon content="Emergency" type="emergency"></goa-badge>
    <goa-badge icon content="Inactive" type="inactive"></goa-badge>
    <goa-badge icon content="Dark" type="dark"></goa-badge>
    <goa-badge icon content="Midtone" type="midtone"></goa-badge>
    <goa-badge icon content="Light" type="light"></goa-badge>

    <br>
    <br>
    <goa-badge icon type="success"></goa-badge>
    <goa-badge icon type="warning"></goa-badge>
    <goa-badge icon type="information"></goa-badge>
    <goa-badge icon type="emergency"></goa-badge>
    <goa-badge icon type="inactive"></goa-badge>
    <goa-badge icon type="dark"></goa-badge>
    <goa-badge icon type="midtone"></goa-badge>
    <goa-badge icon type="light"></goa-badge>

    <h3 id="section-modal">Modal</h3>
    <button id="openModal" onclick="openModal()">Toggle</button>
    <goa-modal id="modal" title="Modal Header....." isclosable="true">
      <goa-scrollable vertical="true" height="50">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.</p>
      </goa-scrollable>
      <goa-button slot="actions">Close</goa-button>
    </goa-modal>

    <script>
      var modal = document.getElementById("modal")
      function openModal() {
        modal.setAttribute("open", true)
      }
      function closeModal() {
        modal.removeAttribute("open")
      }
      document.getElementById("modal").addEventListener("on:close", () => {
        closeModal();
      });
    </script>

    <h3 id="section-notification">Notification</h3>
    <goa-notification type="information">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi saepe, maiores, praesentium minus quod reprehenderit consequuntur earum molestias aliquid amet, vitae eveniet harum incidunt sint. Numquam debitis molestias officia corporis.
    </goa-notification>

    <h2>Header 2 (h2)</h2>
    <h3>Header 3 (h3)</h3>

    <!-- Text Input -->

    <h3 id="section-input">Input</h3>
    <goa-flex-row gap="small">
      <goa-form-item label="First name" helptext="This is helper text">
        <goa-input id="firstname" name="firstname" />
      </goa-form-item>

      <goa-form-item label="Middle name" optional helptext="This is helper text">
        <goa-input id="middlename" name="middlename" />
      </goa-form-item>

      <goa-form-item label="Last name" optional helptext="This is helper text">
        <goa-input id="lastname" name="lastname" />
      </goa-form-item>
    </goa-flex-row>

    <h3 id="section-dropdown">DropDown / Combobox</h3>
    <goa-form-item label="Favourite Actor">
      <goa-dropdown name="autocomplete" isautocomplete="true">
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

    <h3 id="section-callout">Callout</h3>
    <goa-callout type="success">
      <h3>Callout title</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ipsum eu euismod consectetur, nisl nisl iaculis nisl, eu tincidunt nisi nisl euismod nisi. Sed euismod, ipsum eu euismod consectetur, nisl nisl iaculis nisl, eu tincidunt nisi nisl euismod nisi.</p>
    </goa-callout>

    <!-- Radio Groups -->

    <h3 id="section-radio">Radio Buttons</h3>
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


    <hr />

    <!-- Container -->
    <h3 id="section-container">Container</h3>
    <goa-modal id="modal2">
      <h2>Delete All</h2>
      <p>Delete the entire database and backups?</p>
      <goa-button slot="actions">Delete</goa-button>
    </goa-modal>
    <script>
      function confirmDelete() {
        console.log('asdfasdfasdf')
        document.getElementById("modal2").setAttribute("open", true);
      }
    </script>

    <goa-container headingsize="large">
      <h3>Header 3 (h3)</h3>
      <p style="line-height: 1.6rem;">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
        est laborum.
      </p>

      <div slot="title">The new container</div>
      <button onclick="confirmDelete()" type="primary" variant="danger" size="small" slot="actions">Delete</button>


      <goa-container variant="primary" headingsize="small">
        <div>This is a sub container </div>
      </goa-container>

      <goa-button type="primary" size="large">Assign to me</goa-button>
    </goa-container>

    <goa-form-item label="Comments" optional>
      <goa-textarea id="comments" name="comments" />
    </goa-form-item>

    <script>
      document.getElementById('comments').addEventListener('on:change', (e) => {
        console.log('comments changed', e.detail);
      });
    </script>

    <!-- Checkbox -->
    <h3 id="section-checkbox">Checkbox</h3>

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

    <script>
      document.getElementById('confirm').addEventListener('on:change', () => {
        console.log('changed');
      });
    </script>

    <h3 id="section-buttons">Button Groups</h3>

    <h4>Align to Start</h4>
    <goa-button-group alignto="start">
      <goa-button type="tertiary" size="large">Cancel</goa-button>
      <goa-button type="primary" size="large">Save</goa-button>
    </goa-button-group>

    <h4>Align to End</h4>
    <goa-button-group alignto="end">
      <goa-button type="tertiary" size="large">Cancel</goa-button>
      <goa-button type="primary" size="large">Save</goa-button>
    </goa-button-group>


    <h3 id="section-icon-buttons">Icon Buttons</h3>
    <goa-icon-button type="close" />

    <h3 id="section-icon-buttons">Icon Buttons (Inverted)</h3>
    <div class="dark-bg">
      <goa-icon-button inverted type="close" />
    </div>

    <h3 id="section-icons">Icons</h3>
    <goa-icon type="close" />

  </goa-page-block>
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

  .dark-bg {
    display: inline-block;
    padding: 2rem;
    background-color: var(--color-blue)
  }

</style>
