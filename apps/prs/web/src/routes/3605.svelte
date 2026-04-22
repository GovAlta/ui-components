<script lang="ts">
  // Issue #3605 — use :focus-visible across remaining interactive components.
  // Verification surface for MicrositeHeader, Chip, reset.css links, TextArea (error state), Button variants.
</script>

<svelte:head>
  <title>Issue 3605</title>
</svelte:head>

<div class="page">
  <goa-text as="h5" mb="xs" color="secondary" class="eyebrow">Issue 3605</goa-text>
  <goa-text as="h1" mt="0" mb="0">Use <code>:focus-visible</code> across interactive components</goa-text>
  <goa-text mb="0">
    For every section: <strong>Tab</strong> should show the focus ring with the correct gap/offset.
    <strong>Click</strong> should not leave a lingering ring. <strong>Mouse-down (<code>:active</code>)</strong>
    on buttons should still show the pressed/focused look.
  </goa-text>

  <hr />

  <!-- 1. MicrositeHeader -->
  <section>
    <goa-text as="h2" mt="0" mb="xs">1. MicrositeHeader — <code>a:focus</code> → <code>a:focus-visible</code></goa-text>
    <goa-text mb="s">Tab through the links inside the header. Click any link.</goa-text>
    <goa-microsite-header type="alpha" version="1" headerurl="https://www.alberta.ca">
      <span slot="feedback">Report a problem</span>
    </goa-microsite-header>
    <goa-microsite-header type="beta" version="2" headerurl="https://www.alberta.ca" mt="m">
      <span slot="feedback">Report a problem</span>
    </goa-microsite-header>
  </section>

  <hr />

  <!-- 2. Chip (V1, deprecated but in scope) + FilterChip (V2 equivalent) -->
  <section>
    <goa-text as="h2" mt="0" mb="xs">2. Chip — <code>.chip:focus</code> → <code>.chip:focus-visible</code></goa-text>
    <goa-text mb="s">V1 Chip (deprecated, still in scope per brief).</goa-text>
    <div class="row">
      <goa-chip content="Status: active" />
      <goa-chip content="Priority: high" deletable="true" />
      <goa-chip content="Owner: Tom" />
    </div>

    <goa-text as="h4" mt="m" mb="xs">FilterChip V2 (production)</goa-text>
    <goa-text mb="s">
      Chip div is <code>role="presentation"</code>; the close <code>goa-icon-button</code> is
      the focusable element. <code>goa-icon-button</code> already uses <code>:focus-visible</code>
      (no change needed here).
    </goa-text>
    <div class="row">
      <goa-filter-chip content="Status: active" version="2" />
      <goa-filter-chip content="Priority: high" version="2" />
      <goa-filter-chip content="Owner: Tom" version="2" />
    </div>

    <goa-text as="h4" mt="m" mb="xs">FilterChip V1 (fixed in this PR)</goa-text>
    <goa-text mb="s">
      Whole chip is <code>tabindex="0" role="button"</code>. Removed <code>class:focused</code>
      binding; outline now on <code>.chip:focus-visible .delete-icon</code>.
    </goa-text>
    <div class="row">
      <goa-filter-chip content="Status: active" version="1" />
      <goa-filter-chip content="Priority: high" version="1" />
      <goa-filter-chip content="Owner: Tom" version="1" />
    </div>
  </section>

  <hr />

  <!-- 3. Global link reset (reset.css) -->
  <section>
    <goa-text as="h2" mt="0" mb="xs">3. Plain link reset — use <code>:focus-visible</code> only</goa-text>
    <goa-text mb="s">
      Unstyled anchors pick up the global reset from <code>assets/css/reset.css</code>.
      Dropped both <code>:focus</code> and <code>:focus-within</code> — on plain
      <code>&lt;a&gt;</code> they both match on mouse click (HTML doesn't allow focusable
      children inside <code>&lt;a&gt;</code>, so <code>:focus-within</code> has no real use
      here).
    </goa-text>
    <div class="row">
      <a href="#first">First link</a>
      <a href="#second">Second link</a>
      <a href="#third">Third link</a>
    </div>
  </section>

  <hr />

  <!-- 4. TextArea error state -->
  <section>
    <goa-text as="h2" mt="0" mb="xs">4. TextArea error state — <code>.error:focus</code> + V2 combined selector</goa-text>
    <goa-text mb="s">
      Tab into each error text area. Click into each. The <code>:focus-within</code> container
      pattern should still apply on focus (correct).
    </goa-text>
    <goa-text as="h4" mt="s" mb="xs">V1 error</goa-text>
    <goa-textarea name="v1-error" error="true" version="1" />
    <goa-text as="h4" mt="m" mb="xs">V2 error</goa-text>
    <goa-textarea name="v2-error" error="true" version="2" />
  </section>

  <hr />

  <!-- 5. Button variants -->
  <section>
    <goa-text as="h2" mt="0" mb="xs">5. Button — drop <code>:focus</code> from combined selectors</goa-text>
    <goa-text mb="s">
      Click and Tab each variant across V1 and V2. Watch for lingering rings after mouse-up.
    </goa-text>

    <goa-text as="h4" mt="s" mb="xs">V1 — default</goa-text>
    <div class="row">
      <goa-button type="primary" version="1">Primary</goa-button>
      <goa-button type="secondary" version="1">Secondary</goa-button>
      <goa-button type="tertiary" version="1">Tertiary</goa-button>
    </div>

    <goa-text as="h4" mt="m" mb="xs">V1 — destructive</goa-text>
    <div class="row">
      <goa-button type="primary" variant="destructive" version="1">Primary destructive</goa-button>
      <goa-button type="secondary" variant="destructive" version="1">Secondary destructive</goa-button>
      <goa-button type="tertiary" variant="destructive" version="1">Tertiary destructive</goa-button>
    </div>

    <goa-text as="h4" mt="m" mb="xs">V1 — inverse (on dark bg)</goa-text>
    <div class="row dark">
      <goa-button type="primary" variant="inverse" version="1">Primary inverse</goa-button>
      <goa-button type="secondary" variant="inverse" version="1">Secondary inverse</goa-button>
      <goa-button type="tertiary" variant="inverse" version="1">Tertiary inverse</goa-button>
    </div>

    <goa-text as="h4" mt="m" mb="xs">V2 — default</goa-text>
    <div class="row">
      <goa-button type="primary" version="2">Primary</goa-button>
      <goa-button type="secondary" version="2">Secondary</goa-button>
      <goa-button type="tertiary" version="2">Tertiary</goa-button>
    </div>

    <goa-text as="h4" mt="m" mb="xs">V2 — destructive</goa-text>
    <div class="row">
      <goa-button type="primary" variant="destructive" version="2">Primary destructive</goa-button>
      <goa-button type="secondary" variant="destructive" version="2">Secondary destructive</goa-button>
      <goa-button type="tertiary" variant="destructive" version="2">Tertiary destructive</goa-button>
    </div>

    <goa-text as="h4" mt="m" mb="xs">V2 — inverse (on dark bg)</goa-text>
    <div class="row dark">
      <goa-button type="primary" variant="inverse" version="2">Primary inverse</goa-button>
      <goa-button type="secondary" variant="inverse" version="2">Secondary inverse</goa-button>
      <goa-button type="tertiary" variant="inverse" version="2">Tertiary inverse</goa-button>
    </div>
  </section>

  <hr />

  <!-- 6. Checkbox -->
  <section>
    <goa-text as="h2" mt="0" mb="xs">6. Checkbox — drop <code>:has(:focus)</code> duplicates from V1</goa-text>
    <goa-text mb="s">
      V1 had 10 rules pairing <code>:has(:focus-visible)</code> with <code>:has(:focus)</code>.
      The <code>:focus</code> duplicate fired on mouse click. V2 already correct.
    </goa-text>

    <goa-text as="h4" mt="s" mb="xs">V1 — normal</goa-text>
    <div class="row">
      <goa-checkbox name="v1-a" text="Option A" version="1" />
      <goa-checkbox name="v1-b" text="Option B" version="1" checked="true" />
      <goa-checkbox name="v1-c" text="Option C" version="1" />
    </div>

    <goa-text as="h4" mt="m" mb="xs">V1 — error</goa-text>
    <div class="row">
      <goa-checkbox name="v1-err" text="With error" version="1" error="true" />
    </div>

    <goa-text as="h4" mt="m" mb="xs">V2 — normal</goa-text>
    <div class="row">
      <goa-checkbox name="v2-a" text="Option A" version="2" />
      <goa-checkbox name="v2-b" text="Option B" version="2" checked="true" />
      <goa-checkbox name="v2-c" text="Option C" version="2" />
    </div>

    <goa-text as="h4" mt="m" mb="xs">V2 — error</goa-text>
    <div class="row">
      <goa-checkbox name="v2-err" text="With error" version="2" error="true" />
    </div>
  </section>

  <hr />

  <!-- 7. Link -->
  <section>
    <goa-text as="h2" mt="0" mb="xs">7. Link — <code>::slotted(a:focus-visible)</code></goa-text>
    <goa-text mb="s">
      Ring is now on the slotted anchor directly (reliable across shadow DOM).
      <strong>Trade-off:</strong> ring wraps the anchor text only, not the icons.
    </goa-text>

    <goa-text as="h4" mt="s" mb="xs">Plain links</goa-text>
    <div class="row">
      <goa-link version="2"><a href="#link-a">First link</a></goa-link>
      <goa-link version="2"><a href="#link-b">Second link</a></goa-link>
      <goa-link version="2"><a href="#link-c">Third link</a></goa-link>
    </div>

    <goa-text as="h4" mt="m" mb="xs">Links with leading icons</goa-text>
    <div class="row">
      <goa-link version="2" leadingicon="download"><a href="#link-dl">Download file</a></goa-link>
      <goa-link version="2" leadingicon="information-circle"><a href="#link-info">Learn more</a></goa-link>
      <goa-link version="2" leadingicon="open"><a href="#link-ext">Open in new tab</a></goa-link>
    </div>

    <goa-text as="h4" mt="m" mb="xs">Links with trailing icons</goa-text>
    <div class="row">
      <goa-link version="2" trailingicon="arrow-forward"><a href="#link-next">Continue</a></goa-link>
      <goa-link version="2" trailingicon="chevron-forward"><a href="#link-more">See more</a></goa-link>
      <goa-link version="2" trailingicon="open"><a href="#link-ext2">External resource</a></goa-link>
    </div>

    <goa-text as="h4" mt="m" mb="xs">Links with both icons</goa-text>
    <div class="row">
      <goa-link version="2" leadingicon="download" trailingicon="arrow-forward"><a href="#link-both">Download and continue</a></goa-link>
    </div>
  </section>

  <hr />

  <!-- 8. Notification -->
  <section>
    <goa-text as="h2" mt="0" mb="xs">8. Notification — <code>::slotted(a:focus)</code> → <code>:focus-visible</code></goa-text>
    <goa-text mb="s">
      8 rules (V1 + V2 variants) styled slotted anchors on <code>:focus</code>. Now keyboard only.
    </goa-text>

    <goa-text as="h4" mt="s" mb="xs">V1 Notifications</goa-text>
    <goa-notification type="information">
      Info notification with a <a href="#n-v1-info">link</a> inside.
    </goa-notification>
    <goa-notification type="important" mt="s">
      Important notification with a <a href="#n-v1-imp">link</a> inside.
    </goa-notification>

    <goa-text as="h4" mt="m" mb="xs">V2 Notifications</goa-text>
    <goa-notification type="information" importance="high" version="2">
      Information high with a <a href="#n-v2-info-h">link</a> inside.
    </goa-notification>
    <goa-notification type="important" importance="high" version="2" mt="s">
      Important high with a <a href="#n-v2-imp-h">link</a> inside.
    </goa-notification>
    <goa-notification type="emergency" importance="high" version="2" mt="s">
      Emergency high with a <a href="#n-v2-em-h">link</a> inside.
    </goa-notification>
  </section>

  <hr />

  <!-- 9. Tooltip -->
  <section>
    <goa-text as="h2" mt="0" mb="xs">9. Tooltip — <code>.tooltip:focus .tooltip-text</code> → <code>:focus-visible</code></goa-text>
    <goa-text mb="s">
      Previously mouse-clicking the tooltip trigger revealed the tooltip. Now hover for mouse,
      keyboard focus for keyboard (standard tooltip behavior).
    </goa-text>
    <div class="row">
      <goa-tooltip content="Helpful tip goes here" version="2">
        <goa-button type="secondary" version="2">Hover or Tab me</goa-button>
      </goa-tooltip>
    </div>
  </section>

  <hr />

  <!-- 10. Details -->
  <section>
    <goa-text as="h2" mt="0" mb="xs">10. Details — <code>summary:focus</code> → <code>:focus-visible</code></goa-text>
    <goa-text mb="s">
      Previously clicking the summary left a hover-ish style. Now click just toggles open;
      keyboard focus shows the focused look.
    </goa-text>
    <goa-details heading="Click me to expand" version="2">
      Content inside the details component.
    </goa-details>
  </section>

  <hr />

  <!-- 11. DataGrid -->
  <section>
    <goa-text as="h2" mt="0" mb="xs">11. DataGrid — realistic table usage</goa-text>
    <goa-text mb="s">
      Typical pattern: <code>goa-data-grid</code> wrapping a <code>goa-table</code>. Cells contain
      badges, buttons, and text. Focus styling is JS-driven via
      <code>setFocusedStyle</code>. Describe what looks wrong (mouse click leaving an outline?
      UA default ring on a cell? ring jumping?).
    </goa-text>
    <goa-data-grid keyboard-nav="table" keyboard-icon-position="right">
      <goa-table width="100%" version="2">
        <thead>
          <tr data-grid="row">
            <th data-grid="cell">Name</th>
            <th data-grid="cell">Role</th>
            <th data-grid="cell">Status</th>
            <th data-grid="cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr data-grid="row">
            <td data-grid="cell">Alice Johnson</td>
            <td data-grid="cell">Developer</td>
            <td data-grid="cell"><goa-badge version="2" type="success" content="Active" /></td>
            <td data-grid="cell"><goa-button version="2" type="tertiary" size="compact">View</goa-button></td>
          </tr>
          <tr data-grid="row">
            <td data-grid="cell">Bob Smith</td>
            <td data-grid="cell">Designer</td>
            <td data-grid="cell"><goa-badge version="2" type="success" content="Active" /></td>
            <td data-grid="cell"><goa-button version="2" type="tertiary" size="compact">View</goa-button></td>
          </tr>
          <tr data-grid="row">
            <td data-grid="cell">Carol White</td>
            <td data-grid="cell">Manager</td>
            <td data-grid="cell"><goa-badge version="2" type="information" content="Away" /></td>
            <td data-grid="cell"><goa-button version="2" type="tertiary" size="compact">View</goa-button></td>
          </tr>
          <tr data-grid="row">
            <td data-grid="cell">David Brown</td>
            <td data-grid="cell">Analyst</td>
            <td data-grid="cell"><goa-badge version="2" type="success" content="Active" /></td>
            <td data-grid="cell"><goa-button version="2" type="tertiary" size="compact">View</goa-button></td>
          </tr>
        </tbody>
      </goa-table>
    </goa-data-grid>

    <goa-text as="h4" mt="l" mb="xs">DataGrid around cards (layout mode)</goa-text>
    <goa-text mb="s">
      <code>keyboardNav="layout"</code>. Each card is a row, cells include the checkbox, name,
      badge, stat blocks, and menu button.
    </goa-text>
    <goa-data-grid keyboard-nav="layout" keyboard-icon-position="right">
      <goa-container version="2" mt="m" data-grid="row" maxwidth="100%">
        <div class="card-row">
          <goa-checkbox version="2" data-grid="cell-0" name="user-1" />
          <div class="card-body">
            <goa-block version="2" direction="row" gap="s" alignment="center">
              <strong data-grid="cell-1">Mike Zwei</strong>
              <goa-badge version="2" data-grid="cell-2" type="success" content="Removed" />
            </goa-block>
            <div class="card-stats">
              <goa-block version="2" direction="column" gap="xs" data-grid="cell-4">
                <strong>Updated</strong>
                <span>Jun 30, 2022 at 2:30 PM</span>
              </goa-block>
              <goa-block version="2" direction="column" gap="xs" data-grid="cell-5">
                <strong>Email</strong>
                <span>mike.zwei@gmail.com</span>
              </goa-block>
              <goa-block version="2" direction="column" gap="xs" data-grid="cell-6">
                <strong>Program</strong>
                <span>Wee Wild Ones Curry</span>
              </goa-block>
            </div>
            <div class="card-stats">
              <goa-block version="2" direction="column" gap="xs" data-grid="cell-7">
                <strong>Program ID</strong>
                <span>74528567</span>
              </goa-block>
              <goa-block version="2" direction="column" gap="xs" data-grid="cell-8">
                <strong>Service access</strong>
                <span>Claims Adjustments</span>
              </goa-block>
            </div>
          </div>
          <goa-menu-button version="2" data-grid="cell-3" text="Actions" type="tertiary" size="compact">
            <goa-menu-action version="2" action="open" text="Open" />
            <goa-menu-action version="2" action="delete" text="Delete" />
          </goa-menu-button>
        </div>
      </goa-container>

      <goa-container version="2" mt="m" data-grid="row" maxwidth="100%">
        <div class="card-row">
          <goa-checkbox version="2" data-grid="cell-0" name="user-2" />
          <div class="card-body">
            <goa-block version="2" direction="row" gap="s" alignment="center">
              <strong data-grid="cell-1">Emma Stroman</strong>
              <goa-badge version="2" data-grid="cell-2" type="emergency" content="To be removed" />
            </goa-block>
            <div class="card-stats">
              <goa-block version="2" direction="column" gap="xs" data-grid="cell-4">
                <strong>Updated</strong>
                <span>Nov 28, 2021 at 1:30 PM</span>
              </goa-block>
              <goa-block version="2" direction="column" gap="xs" data-grid="cell-5">
                <strong>Email</strong>
                <span>emma.stroman@gmail.com</span>
              </goa-block>
              <goa-block version="2" direction="column" gap="xs" data-grid="cell-6">
                <strong>Program</strong>
                <span>Fort McMurray</span>
              </goa-block>
            </div>
            <div class="card-stats">
              <goa-block version="2" direction="column" gap="xs" data-grid="cell-7">
                <strong>Program ID</strong>
                <span>74522643</span>
              </goa-block>
              <goa-block version="2" direction="column" gap="xs" data-grid="cell-8">
                <strong>Service access</strong>
                <span>Claims Adjustments</span>
              </goa-block>
            </div>
          </div>
          <goa-menu-button version="2" data-grid="cell-3" text="Actions" type="tertiary" size="compact">
            <goa-menu-action version="2" action="open" text="Open" />
            <goa-menu-action version="2" action="delete" text="Delete" />
          </goa-menu-button>
        </div>
      </goa-container>
    </goa-data-grid>
  </section>
</div>

<style>
  .page {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 72rem;
    margin: 0 auto;
  }

  hr {
    border: none;
    border-top: 1px solid var(--goa-color-greyscale-200);
    margin: 1rem 0;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
  }

  .row.dark {
    background-color: var(--goa-color-greyscale-black, #1f1f1f);
    padding: 1rem;
    border-radius: 0.25rem;
  }

  a {
    color: var(--goa-color-interactive-default);
  }

  .card-row {
    display: flex;
    flex-direction: row;
    gap: var(--goa-space-m);
    align-items: flex-start;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: var(--goa-space-m);
    flex: 1;
    min-width: 0;
  }

  .card-stats {
    display: flex;
    flex-wrap: wrap;
    gap: var(--goa-space-xl);
  }
</style>
