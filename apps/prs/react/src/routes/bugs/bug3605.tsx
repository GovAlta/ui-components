import "@abgov/style";
import {
  GoabBadge,
  GoabBlock,
  GoabButton,
  GoabCheckbox,
  GoabChip,
  GoabContainer,
  GoabDataGrid,
  GoabDetails,
  GoabDivider,
  GoabFilterChip,
  GoabLink,
  GoabMenuAction,
  GoabMenuButton,
  GoabMicrositeHeader,
  GoabNotification,
  GoabTable,
  GoabText,
  GoabTextarea,
  GoabTooltip,
} from "@abgov/react-components";

export function Bug3605Route() {
  return (
    <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "72rem", margin: "0 auto" }}>
      <GoabText tag="h5" mb="xs" color="secondary">
        Issue 3605
      </GoabText>
      <GoabText tag="h1" mt="0" mb="0">
        Use focus-visible across interactive components
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a href="https://github.com/GovAlta/ui-components/issues/3605" target="_blank" rel="noopener">
            View on GitHub
          </a>
        </GoabLink>
      </GoabBlock>

      <GoabText mb="0">
        For every section: Tab should show the focus ring with the correct gap and offset.
        Click should not leave a lingering ring. Mouse-down on buttons should still show the
        pressed state.
      </GoabText>

      <GoabDivider mt="l" mb="l" />

      {/* MicrositeHeader */}
      <section>
        <GoabText tag="h2" mt="0" mb="xs">MicrositeHeader</GoabText>
        <GoabText mb="s">Tab through the links inside the header. Click any link.</GoabText>
        <GoabMicrositeHeader type="alpha" version="UAT" />
      </section>

      <GoabDivider mt="l" mb="l" />

      {/* Chip + FilterChip */}
      <section>
        <GoabText tag="h2" mt="0" mb="xs">Chip and FilterChip</GoabText>
        <GoabText tag="h4" mt="s" mb="xs">Chip (deprecated)</GoabText>
        <GoabBlock gap="m" alignment="center">
          <GoabChip content="Status: active" />
          <GoabChip content="Priority: high" deletable />
          <GoabChip content="Owner: Tom" />
        </GoabBlock>

        <GoabText tag="h4" mt="m" mb="xs">FilterChip</GoabText>
        <GoabBlock gap="m" alignment="center">
          <GoabFilterChip content="Status: active" />
          <GoabFilterChip content="Priority: high" />
          <GoabFilterChip content="Owner: Tom" />
        </GoabBlock>
      </section>

      <GoabDivider mt="l" mb="l" />

      {/* Plain link reset */}
      <section>
        <GoabText tag="h2" mt="0" mb="xs">Plain link reset</GoabText>
        <GoabText mb="s">Unstyled anchors pick up the global reset from assets/css/reset.css.</GoabText>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <a href="#first">First link</a>
          <a href="#second">Second link</a>
          <a href="#third">Third link</a>
        </div>
      </section>

      <GoabDivider mt="l" mb="l" />

      {/* TextArea error */}
      <section>
        <GoabText tag="h2" mt="0" mb="xs">TextArea error state</GoabText>
        <GoabText mb="s">
          Tab into the error text area. Click into it. The focus-within container pattern
          applies on focus, which is correct for text inputs.
        </GoabText>
        <GoabTextarea name="err" error />
      </section>

      <GoabDivider mt="l" mb="l" />

      {/* Button variants */}
      <section>
        <GoabText tag="h2" mt="0" mb="xs">Button</GoabText>
        <GoabText mb="s">
          Click and Tab each variant. Watch for lingering rings after mouse-up.
        </GoabText>

        <GoabText tag="h4" mt="s" mb="xs">Default</GoabText>
        <GoabBlock gap="m" alignment="center">
          <GoabButton type="primary">Primary</GoabButton>
          <GoabButton type="secondary">Secondary</GoabButton>
          <GoabButton type="tertiary">Tertiary</GoabButton>
        </GoabBlock>

        <GoabText tag="h4" mt="m" mb="xs">Destructive</GoabText>
        <GoabBlock gap="m" alignment="center">
          <GoabButton type="primary" variant="destructive">Primary destructive</GoabButton>
          <GoabButton type="secondary" variant="destructive">Secondary destructive</GoabButton>
          <GoabButton type="tertiary" variant="destructive">Tertiary destructive</GoabButton>
        </GoabBlock>

        <GoabText tag="h4" mt="m" mb="xs">Inverse (on dark bg)</GoabText>
        <div style={{ backgroundColor: "var(--goa-color-greyscale-black, #1f1f1f)", padding: "1rem", borderRadius: "0.25rem", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
          <GoabButton type="primary" variant="inverse">Primary inverse</GoabButton>
          <GoabButton type="secondary" variant="inverse">Secondary inverse</GoabButton>
          <GoabButton type="tertiary" variant="inverse">Tertiary inverse</GoabButton>
        </div>
      </section>

      <GoabDivider mt="l" mb="l" />

      {/* Checkbox */}
      <section>
        <GoabText tag="h2" mt="0" mb="xs">Checkbox</GoabText>
        <GoabText mb="s">Tab to each. Click each. No ring on mouse click.</GoabText>
        <GoabBlock gap="m" alignment="center">
          <GoabCheckbox name="a" text="Option A" />
          <GoabCheckbox name="b" text="Option B" checked />
          <GoabCheckbox name="c" text="Option C" />
        </GoabBlock>
        <div style={{ marginTop: "var(--goa-space-m)" }}>
          <GoabCheckbox name="err" text="With error" error />
        </div>
      </section>

      <GoabDivider mt="l" mb="l" />

      {/* Link */}
      <section>
        <GoabText tag="h2" mt="0" mb="xs">Link</GoabText>
        <GoabText mb="s">
          Ring is on the slotted anchor directly (reliable across shadow DOM). Ring wraps
          the anchor text only, not the icons.
        </GoabText>

        <GoabText tag="h4" mt="s" mb="xs">Plain links</GoabText>
        <GoabBlock gap="m" alignment="center">
          <GoabLink><a href="#link-a">First link</a></GoabLink>
          <GoabLink><a href="#link-b">Second link</a></GoabLink>
          <GoabLink><a href="#link-c">Third link</a></GoabLink>
        </GoabBlock>

        <GoabText tag="h4" mt="m" mb="xs">Links with leading icons</GoabText>
        <GoabBlock gap="m" alignment="center">
          <GoabLink leadingIcon="download"><a href="#link-dl">Download file</a></GoabLink>
          <GoabLink leadingIcon="information-circle"><a href="#link-info">Learn more</a></GoabLink>
          <GoabLink leadingIcon="open"><a href="#link-ext">Open in new tab</a></GoabLink>
        </GoabBlock>

        <GoabText tag="h4" mt="m" mb="xs">Links with trailing icons</GoabText>
        <GoabBlock gap="m" alignment="center">
          <GoabLink trailingIcon="arrow-forward"><a href="#link-next">Continue</a></GoabLink>
          <GoabLink trailingIcon="chevron-forward"><a href="#link-more">See more</a></GoabLink>
          <GoabLink trailingIcon="open"><a href="#link-ext2">External resource</a></GoabLink>
        </GoabBlock>
      </section>

      <GoabDivider mt="l" mb="l" />

      {/* Notification */}
      <section>
        <GoabText tag="h2" mt="0" mb="xs">Notification</GoabText>
        <GoabText mb="s">
          Slotted anchors in notifications now use focus-visible. Keyboard only.
        </GoabText>

        <GoabNotification type="information">
          Info notification with a <a href="#n-info">link</a> inside.
        </GoabNotification>
        <div style={{ marginTop: "var(--goa-space-s)" }}>
          <GoabNotification type="important">
            Important notification with a <a href="#n-imp">link</a> inside.
          </GoabNotification>
        </div>
        <div style={{ marginTop: "var(--goa-space-s)" }}>
          <GoabNotification type="emergency">
            Emergency notification with a <a href="#n-em">link</a> inside.
          </GoabNotification>
        </div>
      </section>

      <GoabDivider mt="l" mb="l" />

      {/* Tooltip */}
      <section>
        <GoabText tag="h2" mt="0" mb="xs">Tooltip</GoabText>
        <GoabText mb="s">
          Hover for mouse, keyboard focus for keyboard. Mouse click on the trigger does
          not reveal the tooltip.
        </GoabText>
        <GoabBlock gap="m" alignment="center">
          <GoabTooltip content="Helpful tip goes here">
            <GoabButton type="secondary">Hover or Tab me</GoabButton>
          </GoabTooltip>
        </GoabBlock>
      </section>

      <GoabDivider mt="l" mb="l" />

      {/* Details */}
      <section>
        <GoabText tag="h2" mt="0" mb="xs">Details</GoabText>
        <GoabText mb="s">
          Click just toggles open. Keyboard focus shows the focused look.
        </GoabText>
        <GoabDetails heading="Click me to expand">
          Content inside the details component.
        </GoabDetails>
      </section>

      <GoabDivider mt="l" mb="l" />

      {/* DataGrid */}
      <section>
        <GoabText tag="h2" mt="0" mb="xs">DataGrid around a table</GoabText>
        <GoabText mb="s">
          Typical pattern: GoabDataGrid wrapping a GoabTable. Focus styling is JS-driven,
          now guarded with a keyboard-input tracker so mouse click does not show the ring.
          Arrow keys navigate cells.
        </GoabText>
        <GoabDataGrid keyboardNav="table" keyboardIconPosition="right">
          <GoabTable width="100%">
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
                <td data-grid="cell"><GoabBadge type="success" content="Active" /></td>
                <td data-grid="cell"><GoabButton type="tertiary" size="compact">View</GoabButton></td>
              </tr>
              <tr data-grid="row">
                <td data-grid="cell">Bob Smith</td>
                <td data-grid="cell">Designer</td>
                <td data-grid="cell"><GoabBadge type="success" content="Active" /></td>
                <td data-grid="cell"><GoabButton type="tertiary" size="compact">View</GoabButton></td>
              </tr>
              <tr data-grid="row">
                <td data-grid="cell">Carol White</td>
                <td data-grid="cell">Manager</td>
                <td data-grid="cell"><GoabBadge type="information" content="Away" /></td>
                <td data-grid="cell"><GoabButton type="tertiary" size="compact">View</GoabButton></td>
              </tr>
              <tr data-grid="row">
                <td data-grid="cell">David Brown</td>
                <td data-grid="cell">Analyst</td>
                <td data-grid="cell"><GoabBadge type="success" content="Active" /></td>
                <td data-grid="cell"><GoabButton type="tertiary" size="compact">View</GoabButton></td>
              </tr>
            </tbody>
          </GoabTable>
        </GoabDataGrid>

        <GoabText tag="h4" mt="l" mb="xs">DataGrid around cards (layout mode)</GoabText>
        <GoabText mb="s">
          keyboardNav=&quot;layout&quot;. Each card is a row, cells include the checkbox,
          name, badge, stat blocks, and menu button.
        </GoabText>
        <GoabDataGrid keyboardNav="layout" keyboardIconPosition="right">
          <GoabContainer mt="m" data-grid="row">
            <div style={{ display: "flex", flexDirection: "row", gap: "var(--goa-space-m)", alignItems: "flex-start" }}>
              <GoabCheckbox data-grid="cell-0" name="user-1" />
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--goa-space-m)", flex: 1, minWidth: 0 }}>
                <GoabBlock direction="row" gap="s" alignment="center">
                  <strong data-grid="cell-1">Mike Zwei</strong>
                  <GoabBlock data-grid="cell-2">
                    <GoabBadge type="success" content="Removed" />
                  </GoabBlock>
                </GoabBlock>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--goa-space-xl)" }}>
                  <GoabBlock direction="column" gap="xs" data-grid="cell-4">
                    <strong>Updated</strong>
                    <span>Jun 30, 2022 at 2:30 PM</span>
                  </GoabBlock>
                  <GoabBlock direction="column" gap="xs" data-grid="cell-5">
                    <strong>Email</strong>
                    <span>mike.zwei@gmail.com</span>
                  </GoabBlock>
                  <GoabBlock direction="column" gap="xs" data-grid="cell-6">
                    <strong>Program</strong>
                    <span>Wee Wild Ones Curry</span>
                  </GoabBlock>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--goa-space-xl)" }}>
                  <GoabBlock direction="column" gap="xs" data-grid="cell-7">
                    <strong>Program ID</strong>
                    <span>74528567</span>
                  </GoabBlock>
                  <GoabBlock direction="column" gap="xs" data-grid="cell-8">
                    <strong>Service access</strong>
                    <span>Claims Adjustments</span>
                  </GoabBlock>
                </div>
              </div>
              <GoabMenuButton data-grid="cell-3" text="Actions" type="tertiary" size="compact">
                <GoabMenuAction action="open" text="Open" />
                <GoabMenuAction action="delete" text="Delete" />
              </GoabMenuButton>
            </div>
          </GoabContainer>

          <GoabContainer mt="m" data-grid="row">
            <div style={{ display: "flex", flexDirection: "row", gap: "var(--goa-space-m)", alignItems: "flex-start" }}>
              <GoabCheckbox data-grid="cell-0" name="user-2" />
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--goa-space-m)", flex: 1, minWidth: 0 }}>
                <GoabBlock direction="row" gap="s" alignment="center">
                  <strong data-grid="cell-1">Emma Stroman</strong>
                  <GoabBlock data-grid="cell-2">
                    <GoabBadge type="emergency" content="To be removed" />
                  </GoabBlock>
                </GoabBlock>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--goa-space-xl)" }}>
                  <GoabBlock direction="column" gap="xs" data-grid="cell-4">
                    <strong>Updated</strong>
                    <span>Nov 28, 2021 at 1:30 PM</span>
                  </GoabBlock>
                  <GoabBlock direction="column" gap="xs" data-grid="cell-5">
                    <strong>Email</strong>
                    <span>emma.stroman@gmail.com</span>
                  </GoabBlock>
                  <GoabBlock direction="column" gap="xs" data-grid="cell-6">
                    <strong>Program</strong>
                    <span>Fort McMurray</span>
                  </GoabBlock>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--goa-space-xl)" }}>
                  <GoabBlock direction="column" gap="xs" data-grid="cell-7">
                    <strong>Program ID</strong>
                    <span>74522643</span>
                  </GoabBlock>
                  <GoabBlock direction="column" gap="xs" data-grid="cell-8">
                    <strong>Service access</strong>
                    <span>Claims Adjustments</span>
                  </GoabBlock>
                </div>
              </div>
              <GoabMenuButton data-grid="cell-3" text="Actions" type="tertiary" size="compact">
                <GoabMenuAction action="open" text="Open" />
                <GoabMenuAction action="delete" text="Delete" />
              </GoabMenuButton>
            </div>
          </GoabContainer>
        </GoabDataGrid>
      </section>
    </div>
  );
}

export default Bug3605Route;
