<svelte:head>
  <title>GoA Component Playground</title>
</svelte:head>

<script>
  import '../../src';
</script>

<main>

  <goa-service-level-header level="alpha" version="v1.2.3" />

  <!-- App Header -->
  <goa-app-header url="http://google.com" title="Digital File Service">
    <a href="http://signin.gov.au/">Sign in</a>
  </goa-app-header>

  <goa-hero-banner title="Upgrading our bitumen" backgroundurl="https://picsum.photos/id/1076/600/400">
    <div slot="actions">
      <goa-button>Button</goa-button>
    </div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur optio, eius expedita, quasi vero maxime, laudantium voluptates eaque illum officiis hic! Commodi, asperiores officiis necessitatibus itaque similique magnam nisi voluptate.
  </goa-hero-banner>

  <goa-page-block>

    <h2>Components</h2>

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

    <h2 id="section-card">Cards</h2>

    <goa-card-group>
      <goa-card>
        <goa-card-content>
          This is a card top title with image
        </goa-card-content>
        <goa-card-image height="160px" src="https://picsum.photos/id/1076/600/400" alt="Card image" />
        <goa-card-actions>
          <goa-button size="small">Button</goa-button>
        </goa-card-actions>
      </goa-card>

      <goa-card elevation={1}>
        <goa-card-image height="160px" src="https://picsum.photos/id/1076/600/400" alt="Card image" />
        <goa-card-content>
          This is card content below the image
        </goa-card-content>
        <goa-card-actions>
          <goa-button size="small">Button</goa-button>
        </goa-card-actions>
      </goa-card>

      <goa-card elevation={2}>
        <goa-card-content>
          This is card with a taller image
        </goa-card-content>
        <goa-card-image height="300px" src="https://picsum.photos/id/1076/600/400" alt="Card image" />
        <goa-card-actions>
          <goa-button size="small">Button</goa-button>
        </goa-card-actions>
      </goa-card>

      <goa-card elevation={3}>
        <goa-card-content>
          This is card content with no image.
          <br>
          <br>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque laboriosam numquam, quidem nihil accusantium dolore harum. Consequuntur facilis, perspiciatis reiciendis possimus iusto, magni ut quisquam ex necessitatibus eum in modi?
        </goa-card-content>
        <goa-card-actions>
          <goa-button size="small">Button</goa-button>
        </goa-card-actions>
      </goa-card>

      <goa-card elevation={4}>
        <goa-card-content>
          This is card content with multiple buttons
        </goa-card-content>
        <goa-card-image height="160px" src="https://picsum.photos/id/1076/600/400" alt="Card image" />
        <goa-card-actions>
          <goa-button size="small" variant="tertiary">Button</goa-button>
          <goa-button size="small">Button</goa-button>
        </goa-card-actions>
      </goa-card>

      <goa-card elevation={5}>
        <goa-card-actions>
          <goa-button size="small">Button</goa-button>
        </goa-card-actions>
        <goa-card-image height="160px" src="https://picsum.photos/id/1076/600/400" alt="Card image" />
        <goa-card-content>
          This is card content with actions at the top
        </goa-card-content>
      </goa-card>

    </goa-card-group>


    <h2 id="section-skeleton">Skeletons</h2>
    <h3>Text</h3>
    <goa-skeleton type="text" />
    <goa-skeleton type="text" size={2} />
    <goa-skeleton type="text" size={3} />
    <goa-skeleton type="text" size={4} />
    <h3>Avatars</h3>
    <goa-skeleton type="avatar" />
    <goa-skeleton type="avatar" size={2} />
    <goa-skeleton type="avatar" size={3} />
    <goa-skeleton type="avatar" size={4} />
    <h3>Headers</h3>
    <goa-skeleton type="header" />
    <goa-skeleton type="header" size={2} />
    <goa-skeleton type="header" size={3} />
    <goa-skeleton type="header" size={4} />
    <h3>Paragraph</h3>
    <goa-skeleton type="paragraph" />
    <h3>Thumbnail</h3>
    <goa-skeleton type="thumbnail" />
    <goa-skeleton type="thumbnail" size={2} />
    <goa-skeleton type="thumbnail" size={3} />
    <goa-skeleton type="thumbnail" size={4} />
    <h3>Cards</h3>
    <goa-card-group>
      <goa-skeleton type="card" size={1} />
      <goa-skeleton type="card" size={2} />
      <goa-skeleton type="card" size={3} />
      <goa-skeleton type="card" size={4} />
    </goa-card-group>
    <h3>Profiles</h3>
    <goa-skeleton type="profile" />
    <goa-skeleton type="profile" size={2} />
    <goa-skeleton type="profile" size={3} />
    <goa-skeleton type="profile" size={4} />

    <h2 id="section-loader">Loaders</h2>
    <h3>Full screen</h3>

    <goa-button id="show-loader">Show page loader</goa-button>
    <goa-page-loader id="page-loader" class="progress" type="progress" variant="fullscreen" message="loading.." />
    <script>
      const el = document.querySelector('#show-loader');
      el.addEventListener('_click', () => {
        const loader = document.querySelector('#page-loader');
        loader.setAttribute('visible', "true")
      })
    </script>

    <h3>Inline</h3>
    <goa-page-loader class="progress" type="progress" message="Inline loading..." variant="inline" />

    <h3>Variants</h3>
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

    <script>
      window.progress = 0;
      const ps = document.querySelectorAll('.progress');
      setInterval(() => {
        window.progress += 10
        ps.forEach(p => {
          p.setAttribute('progress', window.progress)
          switch(true) {
            case window.progress < 20:
              p.setAttribute('message', 'loading..')
              break;
            case window.progress < 40:
              p.setAttribute('message', 'taking longer than I thought..')
              break;
            case window.progress < 60:
              p.setAttribute('message', 'let\'s grab a coffee..')
              break;
            case window.progress < 80:
              p.setAttribute('message', 'I\'m bored..')
              break;
            case window.progress < 100:
              p.setAttribute('message', 'almost there..')
              break;
          }
          if (window.progress >= 100) {
            window.progress = 0;
            p.removeAttribute('visible');
          }
        });

      }, 1000);
    </script>

    <h2 id="section-badges">Badges</h2>
    <goa-badge content="Success" type="success" />
    <goa-badge content="Warning" type="warning" />
    <goa-badge content="Information" type="information" />
    <goa-badge content="Emergency" type="emergency" />
    <goa-badge content="Inactive" type="inactive" />
    <goa-badge content="Dark" type="dark" />
    <goa-badge content="Midtone" type="midtone" />
    <goa-badge content="Light" type="light" />

    <br>
    <br>
    <goa-badge icon content="Success" type="success" />
    <goa-badge icon content="Warning" type="warning" />
    <goa-badge icon content="Information" type="information" />
    <goa-badge icon content="Emergency" type="emergency" />
    <goa-badge icon content="Inactive" type="inactive" />
    <goa-badge icon content="Dark" type="dark" />
    <goa-badge icon content="Midtone" type="midtone" />
    <goa-badge icon content="Light" type="light" />

    <br>
    <br>
    <goa-badge icon type="success" />
    <goa-badge icon type="warning" />
    <goa-badge icon type="information" />
    <goa-badge icon type="emergency" />
    <goa-badge icon type="inactive" />
    <goa-badge icon type="dark" />
    <goa-badge icon type="midtone" />
    <goa-badge icon type="light" />

    <h2 id="section-modal">Modal</h2>
    <goa-button id="openModal">Show Modal</goa-button>
    <goa-modal id="modal" title="Modal Header....." closable scrollable width="80%">
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
      modalopen.addEventListener('_click', () => {
        openModal();
      });
      function openModal() {
        modal.setAttribute("open", true)
      }
      function closeModal() {
        modal.removeAttribute("open")
      }
      document.getElementById("modal").addEventListener("_close", () => {
        closeModal();
      });
    </script>

    <h2 id="section-notification">Notification</h2>
    <goa-notification type="information">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi saepe, maiores, praesentium minus quod reprehenderit consequuntur earum molestias aliquid amet, vitae eveniet harum incidunt sint. Numquam debitis molestias officia corporis.
    </goa-notification>

    <!-- Text Input -->

    <h2 id="section-input">Input</h2>
    <goa-flex-row gap="small">
      <goa-form-item label="First name" helptext="This is helper text">
        <goa-input id="firstname" name="firstname" disabled="false" />
      </goa-form-item>

      <goa-form-item label="Middle name" optional helptext="This should be disabled">
        <goa-input id="middlename" name="middlename" disabled />
      </goa-form-item>

      <goa-form-item label="Last name" optional helptext="This is helper text">
        <goa-input id="lastname" name="lastname" />
      </goa-form-item>
    </goa-flex-row>

    <goa-flex-row gap="small">
      <goa-form-item label="Password" helptext="No easily guessable passwords">
        <goa-input id="password" name="password" type="password" trailingicon="finger-print" handletrailingiconclick  />
      </goa-form-item>
    </goa-flex-row>

    <goa-form-item label="Comments" optional>
      <goa-textarea id="comments" name="comments" />
    </goa-form-item>

    <script>
      document.getElementById('comments').addEventListener('_change', (e) => {
        console.log('comments changed', e.detail);
      });
    </script>

    <h2 id="section-dropdown">DropDown / Combobox</h2>
    <goa-form-item label="Favourite Actor">
      <goa-dropdown id="dropdown" name="autocomplete" multiselect autocomplete>
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
      dropdown.addEventListener("_change", (e) => {
        console.log(e.detail);
      });
    </script>

    <!-- Radio Groups -->

    <h2 id="section-radio">Radio Buttons</h2>

    <goa-checkbox id="radio-error" name="radio-error" text="Set radio error state" />
    <goa-form-item label="Favourite Color">
      <goa-radio-group id="radioGroup1" name="color" value="blue">
        <goa-radio-item name="color" value="red" label="Red" />
        <goa-radio-item name="color" value="blue" label="Blue" />
        <goa-radio-item name="color" value="green" label="Green" />
      </goa-radio-group>
    </goa-form-item>

    <script>
      var radioCheckbox = document.getElementById('radio-error');
      var radioGroup = document.getElementById('radioGroup1');
      radioGroup.addEventListener('_change', (e) => {
        console.log('in the on change', e.detail);
      });
      radioCheckbox.addEventListener('_change', (e) => {
        const checked = e.detail.value === 'checked'
        radioCheckbox.checked = checked;
        if (checked) {
          radioGroup.setAttribute("error", "")
        } else {
          radioGroup.removeAttribute("error")
        }
      });
    </script>


    <h2 id="section-callout">Callout</h2>
    <goa-callout type="success" title="Callout title">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ipsum eu euismod consectetur, nisl nisl iaculis nisl, eu tincidunt nisi nisl euismod nisi. Sed euismod, ipsum eu euismod consectetur, nisl nisl iaculis nisl, eu tincidunt nisi nisl euismod nisi.
    </goa-callout>


    <hr />

    <!-- Container -->
    <h2 id="section-container">Container</h2>
    <goa-modal id="modal2">
      <h2>Delete All</h2>
      <p>Delete the entire database and backups?</p>
      <goa-button id="do-delete" variant="danger" slot="actions">Delete</goa-button>
      <script>
        var doDeleteBtn = document.getElementById('do-delete');
        doDeleteBtn.addEventListener('_click', () => {
          document.getElementById("modal2").removeAttribute("open");
        });
      </script>
    </goa-modal>

    <goa-container>
      <h2>Header 3 (h2)</h2>
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
      deleteAllButton.addEventListener('_click', () => {
        document.getElementById("modal2").setAttribute("open", true);
      });
    </script>


    <!-- Checkbox -->
    <h2 id="section-checkbox">Checkbox</h2>

    <goa-form-item label="Terms and conditions">
      <goa-checkbox
        id="confirm"
        name="confirm"
        text="I accept the conditions"
      />
    </goa-form-item>
    <script>
      var checkbox = document.getElementById('confirm');
      checkbox.addEventListener('_change', (e) => {
        console.log('changed', e.detail);
        checkbox.checked = e.detail.checked;
      });
    </script>

    <h2 id="section-buttons">Button Groups</h2>

    <h3>Align to Start</h3>
    <goa-button-group alignment="start">
      <goa-button type="tertiary">Cancel</goa-button>
      <goa-button type="primary" disabled title="This one is disabled">Save</goa-button>
    </goa-button-group>

    <h3>Align to End</h3>
    <goa-button-group alignment="end">
      <goa-button type="tertiary">Cancel</goa-button>
      <goa-button type="primary">Save</goa-button>
    </goa-button-group>


    <h2 id="section-icon-buttons">Icon Buttons</h2>
    <goa-icon-button type="close" />
    <goa-icon-button type="close" variant="nocolor" />

    <h2 id="section-icon-buttons">Icon Buttons (Inverted)</h2>
    <div class="dark-bg">
      <goa-icon-button inverted type="close" />
    </div>

    <h2 id="section-icons">Icons</h2>
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
    background-color: var(--goa-color-primary)
  }

</style>
