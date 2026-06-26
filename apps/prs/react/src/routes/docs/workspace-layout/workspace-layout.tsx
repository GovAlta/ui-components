import { useState } from "react";
import {
  GoabButton,
  GoabButtonGroup,
  GoabPushDrawer,
  GoabText,
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
  GoabWorkspaceLayout,
  useGoabWorkspaceLayoutScrollState,
} from "@abgov/react-components";
import "./workspace-layout.css";

const rows = Array.from({ length: 16 }, (_, i) => i + 1);
const scrollRows = Array.from({ length: 20 }, (_, i) => i + 1);

function navigate(path: string) {
  console.log("navigate", path);
}

const sideMenu = (
  <GoabWorkSideMenu
    heading="Workspace layout"
    url="/"
    onNavigate={(path: string) => navigate(path)}
    primaryContent={
      <>
        <GoabWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
        <GoabWorkSideMenuItem icon="list" label="Cases" url="/cases" />
      </>
    }
  />
);

const pageHeader = (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    }}
  >
    <GoabText tag="h1" size="heading-m" mt="none" mb="none">
      My cases
    </GoabText>
    <GoabButtonGroup alignment="end">
      <GoabButton type="secondary" size="compact">
        Filter
      </GoabButton>
      <GoabButton type="primary" size="compact">
        New case
      </GoabButton>
    </GoabButtonGroup>
  </div>
);

const pageFooter = (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    }}
  >
    <GoabText size="body-s" mt="none" mb="none">
      3 cases selected
    </GoabText>
    <GoabButtonGroup alignment="end">
      <GoabButton type="secondary" size="compact">
        Clear
      </GoabButton>
      <GoabButton type="primary" size="compact">
        Export
      </GoabButton>
    </GoabButtonGroup>
  </div>
);

// Rendered inside GoabWorkspaceLayout, so the hook reads that layout's scroll state.
function ScrollAwareHeader() {
  const { scrollPosition } = useGoabWorkspaceLayoutScrollState();
  const collapsed = scrollPosition === "middle" || scrollPosition === "at-bottom";
  return (
    <div>
      <GoabText tag="h1" size="heading-m" mt="none" mb="none">
        My cases
      </GoabText>
      {!collapsed && (
        <GoabText size="body-s" mt="none" mb="none">
          Scroll down to collapse this subtitle.
        </GoabText>
      )}
    </div>
  );
}

export function DocsWorkspaceLayoutRoute() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h2>Workspace layout</h2>
      <p>
        Mirrors the documentation examples for <code>GoabWorkspaceLayout</code>. Each
        example is bounded to 600px so they stack on this page; in a real app the layout
        fills the viewport.
      </p>

      <h3>Basic workspace</h3>
      <div className="wsl-demo">
        <GoabWorkspaceLayout sideMenu={sideMenu}>
          <div style={{ padding: "24px" }}>
            {rows.map((n) => (
              <p key={n}>Case row {n} — scroll this area while the side menu stays in place.</p>
            ))}
          </div>
        </GoabWorkspaceLayout>
      </div>

      <h3>Sticky header</h3>
      <div className="wsl-demo">
        <GoabWorkspaceLayout sideMenu={sideMenu} pageHeader={pageHeader}>
          <div style={{ padding: "24px" }}>
            {rows.map((n) => (
              <p key={n}>Case row {n} — scroll this area and the header stays pinned at the top.</p>
            ))}
          </div>
        </GoabWorkspaceLayout>
      </div>

      <h3>Sticky footer</h3>
      <div className="wsl-demo">
        <GoabWorkspaceLayout sideMenu={sideMenu} pageFooter={pageFooter}>
          <div style={{ padding: "24px" }}>
            {rows.map((n) => (
              <p key={n}>
                Case row {n} — scroll this area and the footer stays pinned at the bottom.
              </p>
            ))}
          </div>
        </GoabWorkspaceLayout>
      </div>

      <h3>Push drawer</h3>
      <div className="wsl-demo">
        <GoabWorkspaceLayout
          sideMenu={sideMenu}
          pushDrawer={
            <GoabPushDrawer heading="Case details" open={open} onClose={() => setOpen(false)}>
              <p>Details for the selected case appear here, beside the page content.</p>
            </GoabPushDrawer>
          }
        >
          <div style={{ padding: "24px" }}>
            <GoabButton size="compact" onClick={() => setOpen(true)}>
              Open
            </GoabButton>
            {rows.map((n) => (
              <p key={n}>
                Case row {n} — open the drawer and it appears beside this content, narrowing it
                instead of covering it.
              </p>
            ))}
          </div>
        </GoabWorkspaceLayout>
      </div>

      <h3>Monitor scroll state</h3>
      <p>
        The page header collapses its subtitle once content scrolls past the top, via the{" "}
        <code>useGoabWorkspaceLayoutScrollState</code> hook.
      </p>
      <div className="wsl-demo">
        <GoabWorkspaceLayout sideMenu={sideMenu} pageHeader={<ScrollAwareHeader />}>
          <div style={{ padding: "24px" }}>
            {scrollRows.map((n) => (
              <p key={n}>Case row {n}</p>
            ))}
          </div>
        </GoabWorkspaceLayout>
      </div>
    </div>
  );
}
