/**
 * PR #3478: Popover API Rewrite
 *
 * Rewrote goa-popover to use the native HTML Popover API + CSS Anchor Positioning API.
 * This test page verifies popover behavior across various scenarios.
 */

import { useState } from "react";
import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabButton,
  GoabModal,
  GoabDropdown,
  GoabDropdownItem,
  GoabDatePicker,
  GoabFormItem,
  GoabInput,
  GoabCheckbox,
  GoabPopover,
  GoabMenuButton,
  GoabMenuAction,
  GoabNotification,
  GoabAppHeaderMenu,
} from "@abgov/react-components";

export function Feat3478Route() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDropdownValue, setModalDropdownValue] = useState("");
  const [modalDateValue, setModalDateValue] = useState("");

  // Popover playground controls
  const [popoverMaxWidth, setPopoverMaxWidth] = useState("320px");
  const [popoverMinWidth, setPopoverMinWidth] = useState("");
  const [popoverPosition, setPopoverPosition] = useState<"above" | "below" | "auto">(
    "auto",
  );
  const [popoverPadded, setPopoverPadded] = useState(true);
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div>
      <GoabText tag="h1" mt="m">
        Feature #3478: Popover API Rewrite
      </GoabText>
      <GoabText tag="h2">Test Cases</GoabText>
      <GoabText tag="h2" mt="l">
        Calendar
      </GoabText>
      <GoabFormItem
        label="Date Picker with width to test vs popover"
        helpText="Verify when Calendar opens, the year and moth dropdown `open` stage are independent from Popover.
        We are using popover `auto` attribute so it should handle correctly.
        This test is to verify we are safe to remove `disableGlobalClosePopover` from Popover.svelte. Verify when we select a date, the date picker will auto-close."
      >
        <GoabDatePicker
          width="500px"
          onChange={(detail) => console.log("DatePicker changed:", detail)}
          name="item"
          value={new Date(2026, 2, 3)}
        />
      </GoabFormItem>

      <GoabText tag="h2" mt="l">
        Popover
      </GoabText>

      <GoabText tag="h3">Popover with Close Button (Focus Trap test)</GoabText>
      <GoabText tag="p">
        Open the popover and verify Tab key cycles focus within the popover content (focus
        trap). Click the Close button inside to close.
      </GoabText>
      <GoabPopover target={<GoabButton>Open Popover</GoabButton>} minWidth="250px">
        <p>This popover has buttons inside. Tab between them to test focus trap.</p>
        <GoabBlock gap="s" mt="m">
          <GoabButton
            type="primary"
            size="compact"
            onClick={() => console.log("Action clicked")}
          >
            Action
          </GoabButton>
          <GoabButton type="secondary" size="compact" action="close">
            Close Popover
          </GoabButton>
        </GoabBlock>
      </GoabPopover>

      <GoabText tag="h3">Popover Playground</GoabText>
      <GoabText tag="p">
        Modify popover properties dynamically to verify positioning, sizing, and padding
        work correctly after the rewrite.
      </GoabText>

      <div
        style={{
          border: "1px solid var(--goa-color-greyscale-200)",
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <GoabPopover
          target={<GoabButton>Click me</GoabButton>}
          maxWidth={popoverMaxWidth || undefined}
          minWidth={popoverMinWidth || undefined}
          position={popoverPosition}
          padded={popoverPadded}
        >
          <GoabText tag="p">Popover content with dynamic properties.</GoabText>
          <GoabText tag="p">
            Max Width: {popoverMaxWidth || "(default)"} | Min Width:{" "}
            {popoverMinWidth || "(none)"} | Position: {popoverPosition} | Padded:{" "}
            {popoverPadded ? "Yes" : "No"}
          </GoabText>
        </GoabPopover>
      </div>

      <GoabDetails heading="Playground controls" open>
        <GoabBlock gap="l" direction="column" mt="m">
          <GoabBlock gap="l">
            <GoabFormItem label="Max Width">
              <GoabInput
                name="maxWidth"
                value={popoverMaxWidth}
                onChange={(detail) => setPopoverMaxWidth(detail.value)}
              />
            </GoabFormItem>
            <GoabFormItem label="Min Width">
              <GoabInput
                name="minWidth"
                value={popoverMinWidth}
                onChange={(detail) => setPopoverMinWidth(detail.value)}
              />
            </GoabFormItem>
          </GoabBlock>
          <GoabBlock gap="l">
            <GoabFormItem label="Position">
              <GoabDropdown
                name="position"
                value={popoverPosition}
                onChange={(detail) =>
                  setPopoverPosition(detail.value as "above" | "below" | "auto")
                }
              >
                <GoabDropdownItem value="auto" label="Auto" />
                <GoabDropdownItem value="above" label="Above" />
                <GoabDropdownItem value="below" label="Below" />
              </GoabDropdown>
            </GoabFormItem>
            <GoabFormItem label="Padding">
              <GoabCheckbox
                name="padded"
                checked={popoverPadded}
                text="Yes"
                onChange={(detail) => setPopoverPadded(detail.checked)}
              />
            </GoabFormItem>
          </GoabBlock>
        </GoabBlock>
      </GoabDetails>

      <GoabText tag="h2" mt="l">
        Menu Button
      </GoabText>
      <GoabText tag="p">
        Test Menu Button: Press Enter and arrow up and down see whether Menu Button works
        as expected.
      </GoabText>
      <GoabBlock gap="l" direction="column">
        <div>
          <GoabText tag="p" mb="s">
            <strong>Short actions:</strong>
          </GoabText>
          <GoabMenuButton
            text="Quick Actions"
            onAction={(detail) => console.log("Action:", detail)}
          >
            <GoabMenuAction key="1" text="Edit" action="edit" />
            <GoabMenuAction key="2" text="Delete" action="delete" />
          </GoabMenuButton>
        </div>
        <div>
          <GoabText tag="p" mb="s">
            <strong>Many actions with long text:</strong>
          </GoabText>
          <GoabMenuButton
            text="More Actions"
            onAction={(detail) => console.log("Action:", detail)}
          >
            <GoabMenuAction key="1" text="Edit this item" action="edit" />
            <GoabMenuAction key="2" text="Delete permanently" action="delete" />
            <GoabMenuAction key="3" text="Archive for later review" action="archive" />
            <GoabMenuAction
              key="4"
              text="Duplicate and create a new copy"
              action="duplicate"
            />
            <GoabMenuAction key="5" text="Share with team members" action="share" />
            <GoabMenuAction key="6" text="Export as PDF document" action="export-pdf" />
            <GoabMenuAction
              key="7"
              text="Export as CSV spreadsheet"
              action="export-csv"
            />
            <GoabMenuAction key="8" text="Print preview and settings" action="print" />
            <GoabMenuAction
              key="9"
              text="View full activity history and audit log"
              action="history"
            />
            <GoabMenuAction
              key="10"
              text="Transfer ownership to another user"
              action="transfer"
            />
          </GoabMenuButton>
        </div>
        <div>
          <GoabText tag="p" mb="s">
            <strong>Menu button at the bottom of the page (scroll down):</strong>
          </GoabText>
          <GoabText tag="p">
            This one is placed lower on the page. Open it and check whether the page
            scrolls when the focus trap kicks in.
          </GoabText>
        </div>
      </GoabBlock>

      <GoabText tag="h2" mt="l">
        Dropdown
      </GoabText>

      <GoabText tag="h3">Standard Dropdown</GoabText>
      <GoabText tag="p">
        Dropdown controls its popover by setting open=&quot;true&quot;/&quot;false&quot;.
        Click it to verify the option list appears. If the open prop is missing, the
        Dropdown will not show its options.
        <br />
        Test to make sure when we click an option (or Enter to select an option), Dropdown
        will close (test open dynamically set by Dropdown works in Popover)
      </GoabText>
      <GoabDropdown
        name="open-prop-test"
        value={modalDropdownValue}
        onChange={(detail) => setModalDropdownValue(detail.value ?? "")}
      >
        <GoabDropdownItem value="alpha" label="Alpha" />
        <GoabDropdownItem value="beta" label="Beta" />
        <GoabDropdownItem value="gamma" label="Gamma" />
      </GoabDropdown>
      <GoabText tag="p">Selected: {modalDropdownValue || "(none)"}</GoabText>

      <GoabText tag="h3" mt="l">
        Filterable Dropdown
      </GoabText>
      <GoabText tag="p">
        Focus the input and press Space — it should type a space, not toggle the popover.
      </GoabText>
      <GoabDropdown
        name="filterable-test"
        filterable
        value=""
        onChange={(detail) => console.log("Filterable selected:", detail.value)}
      >
        <GoabDropdownItem value="new york" label="New York" />
        <GoabDropdownItem value="los angeles" label="Los Angeles" />
        <GoabDropdownItem value="san francisco" label="San Francisco" />
        <GoabDropdownItem value="las vegas" label="Las Vegas" />
      </GoabDropdown>

      <hr style={{ margin: "2rem 0" }} />

      <GoabText tag="h2" mt="l">
        Edge Cases
      </GoabText>

      {/* Test 1: Popover in Modal (Benji's review comment) */}
      <GoabText tag="h3">Test 1: Popover in Modal (z-index fix)</GoabText>
      <GoabText tag="p">
        Previously, position: absolute and z-index: 99 on the popover content caused
        dropdowns and date pickers inside modals to render behind or outside the modal.
        The native Popover API renders in the top layer, fixing this. Click the button
        below to open a modal with a Dropdown and DatePicker inside.
      </GoabText>
      <GoabButton onClick={() => setModalOpen(true)}>
        Open Modal with Popover Components
      </GoabButton>
      <GoabModal
        heading="Popover in Modal Test"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <GoabText tag="p" maxWidth="40ch">
          The Dropdown and DatePicker below should render their popovers correctly above
          the modal — not clipped or hidden behind it.
        </GoabText>
        <GoabBlock direction="column" gap="l" mt="m">
          <GoabFormItem label="Dropdown (top of modal)">
            <GoabDropdown
              name="modal-dropdown"
              value={modalDropdownValue}
              onChange={(detail) => setModalDropdownValue(detail.value ?? "")}
            >
              <GoabDropdownItem value="option1" label="Option 1" />
              <GoabDropdownItem value="option2" label="Option 2" />
              <GoabDropdownItem value="option3" label="Option 3" />
            </GoabDropdown>
          </GoabFormItem>

          <div style={{ padding: "1rem 0" }}>
            <GoabText tag="p" maxWidth="40ch">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </GoabText>
            <GoabText tag="p" mt="m" maxWidth="40ch">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste
              natus error sit voluptatem accusantium doloremque laudantium, totam rem
              aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
              beatae vitae dicta sunt explicabo.
            </GoabText>
            <GoabText tag="p" mt="m" maxWidth="40ch">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur magni dolores eos qui ratione voluptatem sequi
              nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit.
            </GoabText>
            <GoabText tag="p" mt="m" maxWidth="40ch">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
              praesentium voluptatum deleniti atque corrupti quos dolores et quas
              molestias excepturi sint occaecati cupiditate non provident, similique sunt
              in culpa qui officia deserunt mollitia animi, id est laborum et dolorum
              fuga.
            </GoabText>
            <GoabText tag="p" mt="m" maxWidth="40ch">
              Et harum quidem rerum facilis est et expedita distinctio. Nam libero
              tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus
              id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis
              dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut
              rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et
              molestiae non recusandae.
            </GoabText>
            <GoabText tag="p" mt="m" maxWidth="40ch">
              Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
              voluptatibus maiores alias consequatur aut perferendis doloribus asperiores
              repellat. Quis autem vel eum iure reprehenderit qui in ea voluptate velit
              esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur.
            </GoabText>
          </div>

          <GoabFormItem label="Date Picker (bottom of modal — scroll down)">
            <GoabDatePicker
              testId="modal-datepicker"
              name="modal-datepicker"
              value={modalDateValue}
              onChange={(detail) => setModalDateValue(detail.valueStr)}
            />
          </GoabFormItem>
        </GoabBlock>
      </GoabModal>

      <GoabDivider mt="l" mb="l" />

      {/* Test 2: AppHeaderMenu closes on navigation (popstate) */}
      <GoabText tag="h3">Test 2: AppHeaderMenu closes on navigation</GoabText>
      <GoabText tag="p">
        The &quot;Services&quot; and &quot;Account&quot; menus{" "}
        <strong> in the header above </strong> use GoabAppHeaderMenu, which uses
        goa-popover internally. Open a menu, then click a link inside it. The page content
        will change but the header stays — verify the menu popover closed. This is to test
        handleUrlChange inside the Popover.svelte
      </GoabText>

      {/* Test 3: Multiple Popovers */}
      <GoabText tag="h3">Test 3: Multiple Popovers</GoabText>
      <GoabText tag="p">
        Opening one popover should close others (popover=&quot;auto&quot; behavior).
      </GoabText>
      <GoabBlock gap="l">
        <GoabPopover target={<GoabButton>Popover A</GoabButton>}>
          <GoabText tag="p">Content A</GoabText>
        </GoabPopover>
        <GoabPopover target={<GoabButton>Popover B</GoabButton>}>
          <GoabText tag="p">Content B</GoabText>
        </GoabPopover>
        <GoabPopover target={<GoabButton>Popover C</GoabButton>}>
          <GoabText tag="p">Content C</GoabText>
        </GoabPopover>
      </GoabBlock>

      {/* Test 4: #3499 Dismissing Notification breaks AppHeaderMenu */}
      <GoabText tag="h3">
        Test 4: #3499 Dismissing Notification breaks AppHeaderMenu
      </GoabText>
      <GoabText tag="p">
        When a Notification banner is dismissed (removed from the DOM), it should not
        break the AppHeaderMenu popover. Steps to reproduce: dismiss the notification
        below, then try opening the AppHeaderMenu in the header. It should still work.
      </GoabText>
      <GoabAppHeaderMenu heading="Test Menu" testId="test-menu">
        <a href="#">Menu Item 1</a>
        <a href="#">Menu Item 2</a>
        <a href="#">Menu Item 3</a>
      </GoabAppHeaderMenu>
      {showBanner && (
        <GoabNotification
          type="information"
          testId="test-banner"
          onDismiss={() => setShowBanner(false)}
        >
          Dismiss this notification, then verify AppHeaderMenu still works.
        </GoabNotification>
      )}
      {!showBanner && (
        <>
          <GoabText tag="p" mt="m">
            Notification dismissed. Now open the AppHeaderMenu above — it should still
            function correctly.
          </GoabText>
          <GoabButton mt="m" type="tertiary" onClick={() => setShowBanner(true)}>
            Reset notification
          </GoabButton>
        </>
      )}

      {/* Test 5: #3067 Focus issues with Popover */}
      <GoabText tag="h3">Test 5: #3067 Focus issues with Popover</GoabText>
      <GoabText tag="p">
        After closing a popover with Escape, focus should return to the trigger element.
        Steps: 1) Focus the button below, 2) Press Enter to open the popover, 3) Press
        Escape to close, 4) The button should still be focused (yellow border visible), 5)
        Press Tab — the next interactive element should be selected, not the popover.
      </GoabText>
      <GoabBlock gap="l">
        <GoabPopover target={<GoabButton>Focus Test Button</GoabButton>}>
          <GoabText tag="p">
            Press Escape to close. Focus should return to the button.
          </GoabText>
        </GoabPopover>
        <GoabButton type="secondary">Next Focusable Element</GoabButton>
      </GoabBlock>

      {/* Test 6: #3062 Popover maxWidth not respected above a button */}
      <GoabText tag="h3">
        Test 6: #3062 Popover maxWidth not respected above a button
      </GoabText>
      <GoabText tag="p">
        When a Popover is placed directly above a GoabButton or GoabInput in the DOM, it
        should still respect the maxWidth property. Both popovers below should have the
        same width (default 320px). Previously the one above the button would ignore
        maxWidth.
      </GoabText>
      <GoabBlock direction="column" gap="l">
        <GoabPopover target={<GoabButton type="secondary">Show Popover</GoabButton>}>
          <GoabText tag="p">
            This popover is above the button. It should respect maxWidth (320px).
          </GoabText>
        </GoabPopover>

        <GoabButton type="primary">Submit Form</GoabButton>

        <GoabPopover
          target={
            <GoabButton type="secondary" size="compact">
              Popover Test
            </GoabButton>
          }
        >
          <GoabText tag="p">
            This popover is below the button. It should also respect maxWidth (320px).
          </GoabText>
        </GoabPopover>
      </GoabBlock>
    </div>
  );
}

export default Feat3478Route;
