/**
 * Feature #3347: Scroll Panel — Workspace shell evaluation
 *
 * React mirror of apps/prs/angular/.../feat3347. Verifies:
 *   1. Bounded panel (header + scroll + footer)
 *   2. Optional header-only / footer-only slots
 *   3. Default height (100%) inside a constrained parent
 *   4. Drawer V2 (refactored to use goa-scroll-panel internally)
 *   5. Modal V2 (refactored to use goa-scroll-panel internally)
 *   6. WorkSideNotificationPanel (refactored to use goa-scroll-panel internally)
 *   7. Push Drawer V2 (shell-level drawer that pushes the card)
 *
 * Push Drawer V2 also has its own full-page route at features/3347-push.
 */

import { useState, type CSSProperties } from "react";
import { useOutletContext } from "react-router-dom";
import {
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabDivider,
  GoabDrawer,
  GoabIconButton,
  GoabModal,
  GoabScrollPanel,
  GoabText,
  GoabTooltip,
  GoabWorkSideNotificationItem,
  GoabWorkSideNotificationPanel,
} from "@abgov/react-components";
import type { AppOutletContext } from "../../app/app";

type NotificationData = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "info" | "success" | "warning" | "critical";
  readStatus: "read" | "unread";
  priority: "normal" | "urgent";
};

const paragraphs = Array.from({ length: 25 }, (_, i) => i + 1);

function daysAgo(days: number, hours = 0): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(date.getHours() - hours);
  return date.toISOString();
}

const initialNotifications: NotificationData[] = [
  {
    id: "1",
    title: "New case assigned",
    description: "Case #12345 has been assigned to you for review.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    type: "info",
    readStatus: "unread",
    priority: "normal",
  },
  {
    id: "2",
    title: "Document uploaded",
    description: "A new document was uploaded to Case #12340.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    type: "success",
    readStatus: "unread",
    priority: "normal",
  },
  {
    id: "3",
    title: "System maintenance",
    description: "Scheduled maintenance tonight at 11 PM MST.",
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    type: "critical",
    readStatus: "unread",
    priority: "urgent",
  },
  {
    id: "4",
    title: "Action required",
    description: "Please review the pending approval request.",
    timestamp: daysAgo(1, 2),
    type: "warning",
    readStatus: "unread",
    priority: "normal",
  },
  {
    id: "5",
    title: "Deadline approaching",
    description: "Case #12300 deadline is in 24 hours.",
    timestamp: daysAgo(1, 5),
    type: "warning",
    readStatus: "unread",
    priority: "urgent",
  },
  {
    id: "6",
    title: "Comment added",
    description: "John Smith commented on Case #12342.",
    timestamp: daysAgo(1, 8),
    type: "info",
    readStatus: "unread",
    priority: "normal",
  },
  {
    id: "7",
    title: "Case status updated",
    description: "Case #12339 status changed to 'In Review'.",
    timestamp: daysAgo(3, 2),
    type: "success",
    readStatus: "read",
    priority: "normal",
  },
  {
    id: "8",
    title: "New attachment",
    description: "PDF document attached to Case #12338.",
    timestamp: daysAgo(3, 6),
    type: "info",
    readStatus: "read",
    priority: "normal",
  },
  {
    id: "9",
    title: "Weekly report generated",
    description: "Your weekly summary report is ready.",
    timestamp: daysAgo(7, 0),
    type: "info",
    readStatus: "read",
    priority: "normal",
  },
  {
    id: "10",
    title: "Password reminder",
    description: "Your password will expire in 30 days.",
    timestamp: daysAgo(14, 0),
    type: "warning",
    readStatus: "read",
    priority: "normal",
  },
];

const demoHeaderStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "var(--goa-space-m)",
  padding: "var(--goa-space-m) var(--goa-space-l)",
};

const demoBodyStyle: CSSProperties = {
  padding: "var(--goa-space-m) var(--goa-space-l)",
};

const demoFooterStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "var(--goa-space-m)",
  padding: "var(--goa-space-s) var(--goa-space-l)",
};

const notificationStageStyle: CSSProperties = {
  width: "360px",
  border: "var(--goa-border-width-s) solid var(--goa-color-greyscale-200)",
  borderRadius: "var(--goa-popover-border-radius)",
  overflow: "hidden",
};

export function Feat3347Route() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTallOpen, setModalTallOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<NotificationData[]>(initialNotifications);
  const { openPushDrawer } = useOutletContext<AppOutletContext>();

  const handleNotificationClick = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id && n.readStatus === "unread"
          ? { ...n, readStatus: "read" as const }
          : n,
      ),
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, readStatus: "read" as const })));
  };

  const handleViewAll = () => {
    console.log("View all notifications");
  };

  // ===== Test 1 templates =====
  const t1Header = (
    <div style={demoHeaderStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <GoabText tag="h2" size="heading-m" mt="none" mb="none">
          Case details
        </GoabText>
        <GoabTooltip
          content="This tooltip should appear ABOVE the scrolling content. If it's clipped or hidden behind the body, the sticky header z-index is wrong."
          position="bottom"
        >
          <GoabIconButton
            icon="information-circle"
            size="small"
            variant="dark"
            ariaLabel="Help"
          />
        </GoabTooltip>
      </div>
      <GoabButton type="tertiary" size="compact">
        Close
      </GoabButton>
    </div>
  );

  const t1Footer = (
    <div style={demoFooterStyle}>
      <GoabButtonGroup alignment="end">
        <GoabButton type="secondary">Cancel</GoabButton>
        <GoabButton type="primary">Save changes</GoabButton>
      </GoabButtonGroup>
    </div>
  );

  // ===== Test 2 templates =====
  const t2HeaderOnly = (
    <div style={demoHeaderStyle}>
      <GoabText tag="h2" size="heading-s" mt="none" mb="none">
        Header only — pinned at top
      </GoabText>
    </div>
  );

  const t2FooterOnly = (
    <div style={demoFooterStyle}>
      <GoabButtonGroup alignment="end">
        <GoabButton type="primary" size="compact">
          Footer only — pinned at bottom
        </GoabButton>
      </GoabButtonGroup>
    </div>
  );

  // ===== Test 3 templates =====
  const t3Header = (
    <div style={demoHeaderStyle}>
      <GoabText tag="h2" size="heading-s" mt="none" mb="none">
        Inherits parent height
      </GoabText>
    </div>
  );

  const t3Footer = (
    <div style={demoFooterStyle}>
      <span>Footer pinned at the bottom</span>
    </div>
  );

  // ===== Test 4 (drawer) actions =====
  const t4Actions = (
    <GoabButtonGroup alignment="start">
      <GoabButton type="primary" size="compact" onClick={() => setDrawerOpen(false)}>
        Save
      </GoabButton>
      <GoabButton type="secondary" size="compact" onClick={() => setDrawerOpen(false)}>
        Cancel
      </GoabButton>
    </GoabButtonGroup>
  );

  // ===== Test 5 (modal) actions =====
  const t5Actions = (
    <GoabButtonGroup alignment="end">
      <GoabButton type="secondary" size="compact" onClick={() => setModalOpen(false)}>
        Cancel
      </GoabButton>
      <GoabButton type="primary" size="compact" onClick={() => setModalOpen(false)}>
        Save
      </GoabButton>
    </GoabButtonGroup>
  );

  // ===== Test 5b (modal stress: tall header + wrapped actions) =====
  const t5bActions = (
    <GoabButtonGroup alignment="end">
      <GoabButton type="tertiary" onClick={() => setModalTallOpen(false)}>
        Cancel
      </GoabButton>
      <GoabButton type="secondary" onClick={() => setModalTallOpen(false)}>
        Save draft
      </GoabButton>
      <GoabButton type="secondary" onClick={() => setModalTallOpen(false)}>
        Request changes
      </GoabButton>
      <GoabButton type="primary" onClick={() => setModalTallOpen(false)}>
        Approve and submit
      </GoabButton>
    </GoabButtonGroup>
  );

  return (
    <>
      <h1>#3347 Scroll Panel — Workspace shell evaluation</h1>

      {/* Test 1 */}
      <h2>Test 1: Bounded panel (the use case it's built for)</h2>
      <p>
        Fixed height 480px. Header + scrollable body + footer. This is where the component
        shines.
      </p>
      <GoabScrollPanel
        height="480px"
        testId="panel-bounded"
        header={t1Header}
        footer={t1Footer}
      >
        <div style={demoBodyStyle}>
          {paragraphs.map((n) => (
            <p key={n}>
              Paragraph {n} — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
          ))}
        </div>
      </GoabScrollPanel>

      <GoabDivider mt="l" mb="l" />

      {/* Test 2 */}
      <h2>Test 2: Header only / Footer only</h2>
      <p>Verifying optional template slots render correctly.</p>
      <GoabBlock gap="l">
        <GoabScrollPanel height="320px" testId="panel-header-only" header={t2HeaderOnly}>
          <div style={demoBodyStyle}>
            {paragraphs.map((n) => (
              <p key={n}>Row {n} — scroll me, header stays pinned.</p>
            ))}
          </div>
        </GoabScrollPanel>

        <GoabScrollPanel height="320px" testId="panel-footer-only" footer={t2FooterOnly}>
          <div style={demoBodyStyle}>
            {paragraphs.map((n) => (
              <p key={n}>Row {n} — scroll me, footer stays pinned.</p>
            ))}
          </div>
        </GoabScrollPanel>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      {/* Test 3 */}
      <h2>Test 3: Default height (100%) inside a constrained parent</h2>
      <p>Parent gives the height context — scroll panel fills it.</p>
      <div style={{ height: "380px" }}>
        <GoabScrollPanel
          testId="panel-default-height"
          header={t3Header}
          footer={t3Footer}
        >
          <div style={demoBodyStyle}>
            {paragraphs.map((n) => (
              <p key={n}>Row {n} — body scrolls within the parent's 380px.</p>
            ))}
          </div>
        </GoabScrollPanel>
      </div>

      <GoabDivider mt="l" mb="l" />

      {/* Test 4 — Drawer V2 */}
      <h2>Test 4: Drawer V2 (refactored internally with goa-scroll-panel)</h2>
      <p>
        Verifies Drawer V2 still works after its internal scroll mechanics were replaced
        with <code>&lt;goa-scroll-panel&gt;</code>. Open and scroll inside — header should
        stay pinned at top (with border on scroll), actions footer should stay pinned at
        bottom (with border when content overflows above).
      </p>
      <GoabButton type="primary" onClick={() => setDrawerOpen(true)}>
        Open drawer
      </GoabButton>
      <GoabDrawer
        heading="Drawer V2 test"
        position="right"
        maxSize="480px"
        open={drawerOpen}
        actions={t4Actions}
        onClose={() => setDrawerOpen(false)}
      >
        {paragraphs.map((n) => (
          <p key={n}>
            Paragraph {n} — Drawer V2 now uses goa-scroll-panel internally. Verify header
            sticky + actions sticky + content scrolls + borders appear when scrolled
            (top/middle/bottom states).
          </p>
        ))}
      </GoabDrawer>

      <GoabDivider mt="l" mb="l" />

      <p>
        Push Drawer V2 also got the scroll-panel treatment — see the dedicated full-page
        test at <code>features/3347-push</code> so the drawer's internal scroll can be
        verified without page scroll bubbling.
      </p>

      <GoabDivider mt="l" mb="l" />

      {/* Test 5 — Modal V2 */}
      <h2>Test 5: Modal (refactored internally with goa-scroll-panel)</h2>
      <p>
        Verifies Modal still works after its V2 path was refactored to use
        <code>&lt;goa-scroll-panel&gt;</code> instead of{" "}
        <code>&lt;goa-scrollable&gt;</code>. V1 path is unchanged (still uses
        goa-scrollable + maxheight calc). The <code>GoabModal</code> React/ Angular
        wrapper hardcodes <code>version="2"</code> so this test exercises the new path.
        Open and scroll inside — header should stay pinned at top with border on scroll,
        action footer pinned at bottom with border when content overflows above.
      </p>
      <GoabButton type="primary" onClick={() => setModalOpen(true)}>
        Open modal
      </GoabButton>
      <GoabModal
        heading="Modal V2 test"
        open={modalOpen}
        maxWidth="60ch"
        actions={t5Actions}
        onClose={() => setModalOpen(false)}
      >
        {paragraphs.map((n) => (
          <p key={n}>
            Paragraph {n} — Modal V2 now uses goa-scroll-panel internally. Verify header
            sticky + actions sticky + content scrolls + borders appear when scrolled
            (top/middle/bottom states). The pane should remain centered with a 64px gap
            from viewport edges.
          </p>
        ))}
      </GoabModal>

      <GoabDivider mt="l" mb="l" />

      {/* Test 5b — Modal stress: tall header + wrapped actions */}
      <h2>Test 5b: Modal stress — tall heading + wrapped actions</h2>
      <p>
        Stresses the static <code>max-height: calc(100vh - 160px)</code> on{" "}
        <code>.modal-pane</code>. The heading wraps to multiple lines and the
        actions wrap to two rows, so the header + footer chrome is tall. The pane
        is <code>overflow: hidden</code>, so if the combined chrome ever exceeds
        the pane height the chrome clips (rather than the middle scrolling).{" "}
        <strong>Resize the window short</strong> to check whether the header and
        footer stay fully visible while only the middle shrinks/scrolls.
      </p>
      <GoabButton type="primary" onClick={() => setModalTallOpen(true)}>
        Open tall-chrome modal
      </GoabButton>
      <GoabModal
        heading="Confirm submission of the regional caseload reassignment request for the 2026 fiscal review cycle"
        open={modalTallOpen}
        maxWidth="60ch"
        actions={t5bActions}
        onClose={() => setModalTallOpen(false)}
      >
        {paragraphs.map((n) => (
          <p key={n}>
            Paragraph {n} — stress content. Watch the header (multi-line heading)
            and the footer (wrapped action buttons): both should stay fully
            visible and pinned while only this middle area scrolls.
          </p>
        ))}
      </GoabModal>

      <GoabDivider mt="l" mb="l" />

      {/* Test 6 — WorkSideNotificationPanel */}
      <h2>Test 6: WorkSideNotificationPanel (refactored to use goa-scroll-panel)</h2>
      <p>
        Verifies the notification panel still works after its layout was refactored to use{" "}
        <code>&lt;goa-scroll-panel&gt;</code> internally (header slot for title + tabs,
        default slot for the scrollable notification list, footer slot for "View all" /
        "Mark all as read" actions). Rendered inline here (normally lives inside a popover
        triggered from a work-side-menu icon). Scroll inside the notification list to
        verify sticky header + sticky footer + border feedback on scroll.
      </p>
      <div style={notificationStageStyle}>
        <GoabWorkSideNotificationPanel
          heading="Notifications"
          activeTab="unread"
          testId="notification-panel-test"
          onMarkAllRead={handleMarkAllRead}
          onViewAll={handleViewAll}
        >
          {notifications.map((notif) => (
            <GoabWorkSideNotificationItem
              key={notif.id}
              title={notif.title}
              description={notif.description}
              timestamp={notif.timestamp}
              type={notif.type}
              readStatus={notif.readStatus}
              priority={notif.priority}
              onClick={() => handleNotificationClick(notif.id)}
            />
          ))}
        </GoabWorkSideNotificationPanel>
      </div>

      <GoabDivider mt="l" mb="l" />

      <h2>Validator case 1: valid calc() height (no error)</h2>
      <p>
        Passes <code>height="calc(20rem + 2rem)"</code>. The old regex validator
        rejected calc(), so this used to log a false console error. With
        CSS.supports it is accepted: no error logged, and the panel scrolls within
        its explicit height. Scroll to the bottom and keep scrolling with the
        pointer over the panel, the page scrolls next (no scroll trap).
      </p>

      <GoabScrollPanel
        height="calc(20rem + 2rem)"
        testId="panel-valid-calc-height"
        header={
          <div style={demoHeaderStyle}>
            <GoabText tag="h2" size="heading-s" mt="none" mb="none">
              Valid calc() height
            </GoabText>
          </div>
        }
      >
        <div style={demoBodyStyle}>
          {paragraphs.map((n) => (
            <p key={n}>Row {n} — body content inside a calc() height panel.</p>
          ))}
        </div>
      </GoabScrollPanel>

      <GoabDivider mt="l" mb="l" />

      <h2>Validator case 2: invalid height (errors, falls back to 100%)</h2>
      <p>
        Passes <code>height="not-a-height"</code>. Open the console: it logs a
        ScrollPanel height error. Instead of collapsing to content height (an
        unscrollable block that swallowed page scroll), the host now falls back to{" "}
        <code>height: 100%</code>, so inside this 320px parent the panel is bounded
        and scrolls normally.
      </p>

      <div style={{ height: "320px" }}>
        <GoabScrollPanel
          height="not-a-height"
          testId="panel-invalid-height"
          header={
            <div style={demoHeaderStyle}>
              <GoabText tag="h2" size="heading-s" mt="none" mb="none">
                Invalid height (fallback)
              </GoabText>
            </div>
          }
        >
          <div style={demoBodyStyle}>
            {paragraphs.map((n) => (
              <p key={n}>Row {n} — body content inside an invalid-height panel.</p>
            ))}
          </div>
        </GoabScrollPanel>
      </div>

      <GoabDivider mt="l" mb="l" />

      {/* Test 7 — Push Drawer (shell-level, pushes the card) */}
      <h2>Test 7: Push Drawer (refactored to use goa-scroll-panel)</h2>
      <p>
        Opens the push drawer that lives at the app shell level (a sibling of{" "}
        <code>GoabWorkspaceLayout</code> in <code>app.tsx</code>), so it pushes
        the whole card aside instead of overlaying it. The drawer body uses{" "}
        <code>&lt;goa-scroll-panel&gt;</code> internally: scroll inside it to see
        the sticky header/footer and the outer chrome morph across scroll
        states. (The same drawer also has its own full-page test at{" "}
        <code>features/3347-push</code>.)
      </p>
      <GoabButton type="primary" onClick={openPushDrawer}>
        Open push drawer
      </GoabButton>
    </>
  );
}

export default Feat3347Route;
