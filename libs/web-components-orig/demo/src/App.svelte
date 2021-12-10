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
      <li><a href="#section-cards">Cards</a></li>
      <li><a href="#section-skeleton">Skeletons</a></li>
      <li><a href="#section-loader">Loaders</a></li>
      <li><a href="#section-modal">Modal</a></li>
      <li><a href="#section-notification">Notification</a></li>
      <li><a href="#section-input">Input</a></li>
      <li><a href="#section-dropdown">Dropdown / Combobox</a></li>
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

    <h3 id="section-card">Cards</h3>
    <goa-card-group>
      <goa-card>
        <goa-card-content>
          This is card content
        </goa-card-content>
        <goa-card-image height="160px" src="https://picsum.photos/id/1076/600/400" alt="Card image" />
        <goa-card-actions>
          <goa-button size="small">Button</goa-button>
        </goa-card-actions>
      </goa-card>
      <goa-card elevation={1}>
        <goa-card-content>
          This is card content
        </goa-card-content>
        <goa-card-image height="160px" src="https://picsum.photos/id/1076/600/400" alt="Card image" />
        <goa-card-actions>
          <goa-button size="small">Button</goa-button>
        </goa-card-actions>
      </goa-card>
      <goa-card elevation={2}>
        <goa-card-content>
          This is card content
        </goa-card-content>
        <goa-card-image height="160px" src="https://picsum.photos/id/1076/600/400" alt="Card image" />
        <goa-card-actions>
          <goa-button size="small">Button</goa-button>
        </goa-card-actions>
      </goa-card>
      <goa-card elevation={3}>
        <goa-card-content>
          This is card content
        </goa-card-content>
        <goa-card-image height="160px" src="https://picsum.photos/id/1076/600/400" alt="Card image" />
        <goa-card-actions>
          <goa-button size="small">Button</goa-button>
        </goa-card-actions>
      </goa-card>
      <goa-card elevation={4}>
        <goa-card-content>
          This is card content
        </goa-card-content>
        <goa-card-image height="160px" src="https://picsum.photos/id/1076/600/400" alt="Card image" />
        <goa-card-actions>
          <goa-button size="small">Button</goa-button>
        </goa-card-actions>
      </goa-card>
      <goa-card elevation={5}>
        <goa-card-content>
          This is card content
        </goa-card-content>
        <goa-card-image height="160px" src="https://picsum.photos/id/1076/600/400" alt="Card image" />
        <goa-card-actions>
          <goa-button size="small">Button</goa-button>
        </goa-card-actions>
      </goa-card>
    </goa-card-group>

    <h3 id="section-skeleton">Skeletons</h3>
    <h4>Text</h4>
    <goa-skeleton type="text" />
    <goa-skeleton type="text" size={2} />
    <goa-skeleton type="text" size={3} />
    <goa-skeleton type="text" size={4} />
    <h4>Avatar</h4>
    <goa-skeleton type="avatar" />
    <goa-skeleton type="avatar" size={2} />
    <goa-skeleton type="avatar" size={3} />
    <goa-skeleton type="avatar" size={4} />
    <h4>Headers</h4>
    <goa-skeleton type="header" />
    <goa-skeleton type="header" size={2} />
    <goa-skeleton type="header" size={3} />
    <goa-skeleton type="header" size={4} />
    <h4>Paragraph</h4>
    <goa-skeleton type="paragraph" />
    <h4>Thumbnail</h4>
    <goa-skeleton type="thumbnail" />
    <goa-skeleton type="thumbnail" size={2} />
    <goa-skeleton type="thumbnail" size={3} />
    <goa-skeleton type="thumbnail" size={4} />
    <h4>Card</h4>
    <goa-card-group>
      <goa-skeleton type="card" size={1} />
      <goa-skeleton type="card" size={1} />
      <goa-skeleton type="card" size={2} />
      <goa-skeleton type="card" size={2} />
      <goa-skeleton type="card" size={3} />
      <goa-skeleton type="card" size={3} />
      <goa-skeleton type="card" size={4} />
      <goa-skeleton type="card" size={4} />
    </goa-card-group>
    <h4>Profile</h4>
    <goa-skeleton type="profile" />
    <goa-skeleton type="profile" size={2} />
    <goa-skeleton type="profile" size={3} />
    <goa-skeleton type="profile" size={4} />

    <h3 id="section-loader">Loader</h3>
    <goa-button id="show-loader">Show page loader</goa-button>
    <goa-page-loader id="page-loader" class="progress" type="progress" variant="fullscreen" />
    <goa-page-loader class="progress" type="progress" message="Inline loading..." variant="inline" />
    <script>
      const el = document.querySelector('#show-loader');
      el.addEventListener('on:click', () => {
        const loader = document.querySelector('#page-loader');
        loader.setAttribute('show', "true")
        loader.setAttribute('message', "loading...");
      });
    </script>

    <goa-spinner type="infinite" size="small" />
    <goa-spinner type="infinite" size="medium" />
    <goa-spinner type="infinite" size="large" />
    <goa-spinner type="infinite" size="xlarge" />

    <div class="dark-bg">
      <goa-spinner type="infinite" invert size="small" />
      <goa-spinner type="infinite" invert size="medium" />
      <goa-spinner type="infinite" invert size="large" />
      <goa-spinner type="infinite" invert size="xlarge" />
    </div>

    <goa-spinner class="progress" type="progress" size="xlarge" />
    <script>
      window.progress = 0;
      const ps = document.querySelectorAll('.progress');
      setInterval(() => {
        window.progress += 10
        ps.forEach(p => {
          p.setAttribute('progress', window.progress)
          if (window.progress >= 100) {
            window.progress = 0;
            p.removeAttribute('show');
          }
        });

      }, 1000);
    </script>

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
    <goa-button id="openModal">Show Modal</goa-button>
    <goa-modal id="modal" title="Modal Header....." isclosable={true} isscrollable={true}>
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

        <goa-button slot="actions" size="medium">I Agree</goa-button>
    </goa-modal>

    <script>
      var modal = document.getElementById("modal")
      var modalopen = document.querySelector('#openModal');
      modalopen.addEventListener('on:click', () => {
        openModal();
      });
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
      <goa-dropdown id="dropdown" name="autocomplete" isautocomplete="true" ismultiselect={true}>
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
        <goa-dropdown-item name="autocomplete" value="3" label="Tom Hardy" />
        <goa-dropdown-item name="autocomplete" value="4" label="Val Kilmer" />
      </goa-dropdown>
    </goa-form-item>
    <script>
      var dropdown = document.getElementById("dropdown");
      dropdown.addEventListener("on:change", (e) => {
        console.log(e.detail.data);
      });
    </script>

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
      <goa-button id="do-delete" variant="danger" slot="actions">Delete</goa-button>
      <script>
        var doDeleteBtn = document.getElementById('do-delete');
        doDeleteBtn.addEventListener('on:click', () => {
          document.getElementById("modal2").removeAttribute("open");
        });
      </script>
    </goa-modal>

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
      <goa-button id="delete-all" type="secondary" variant="danger" size="small" slot="actions">Delete</goa-button>

      <goa-container variant="primary" headingsize="small">
        <div>This is a sub container </div>
      </goa-container>

      <goa-button type="primary">Assign to me</goa-button>
    </goa-container>

    <script>
      var deleteAllButton = document.getElementById('delete-all');
      deleteAllButton.addEventListener('on:click', () => {
        document.getElementById("modal2").setAttribute("open", true);
      });
    </script>

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
    <goa-button-group alignment="start">
      <goa-button type="tertiary">Cancel</goa-button>
      <goa-button type="primary">Save</goa-button>
    </goa-button-group>

    <h4>Align to End</h4>
    <goa-button-group alignment="end">
      <goa-button type="tertiary">Cancel</goa-button>
      <goa-button type="primary">Save</goa-button>
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
