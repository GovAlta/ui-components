import {
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
  GoabWorkspaceLayout,
} from "@abgov/react-components";

const paragraphs = Array.from({ length: 25 }, (_, i) => i + 1);

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "var(--goa-space-m) var(--goa-space-l)",
} as const;

const footerStyle = {
  padding: "var(--goa-space-m) var(--goa-space-l)",
  color: "var(--goa-color-text-secondary)",
  fontSize: "var(--goa-font-size-2)",
} as const;

export function BasicWorkspaceLayoutExample() {
  return (
    <GoabWorkspaceLayout
      sideMenu={
        <GoabWorkSideMenu
          heading="Workspace"
          url="/"
          open={true}
          primaryContent={
            <>
              <GoabWorkSideMenuGroup icon="grid" heading="Work">
                <GoabWorkSideMenuItem icon="document" label="Cases" url="/cases" />
                <GoabWorkSideMenuItem icon="folder" label="Documents" url="/documents" />
                <GoabWorkSideMenuItem icon="bar-chart" label="Reports" url="/reports" />
              </GoabWorkSideMenuGroup>
              <GoabWorkSideMenuGroup icon="settings" heading="Admin">
                <GoabWorkSideMenuItem icon="people" label="Users" url="/users" />
                <GoabWorkSideMenuItem icon="cog" label="Settings" url="/settings" />
              </GoabWorkSideMenuGroup>
            </>
          }
        />
      }
      pageHeader={
        <div style={headerStyle}>
          <h1 style={{ margin: 0, fontSize: "var(--goa-font-size-5)" }}>
            Cases overview
          </h1>
          <span style={{ color: "var(--goa-color-text-secondary)" }}>
            Page header actions
          </span>
        </div>
      }
      pageFooter={<div style={footerStyle}>Last updated 2 minutes ago</div>}
    >
      <div style={{ padding: "var(--goa-space-l)" }}>
        <h2 style={{ marginTop: 0 }}>About this workspace</h2>
        {paragraphs.map((n) => (
          <p key={n}>
            Paragraph {n} — long-running text content. Scroll the main area: the
            side menu, page header, and page footer stay fixed while content
            scrolls inside the card. A soft shadow appears under the sticky
            header once content scrolls past it.
          </p>
        ))}
      </div>
    </GoabWorkspaceLayout>
  );
}
