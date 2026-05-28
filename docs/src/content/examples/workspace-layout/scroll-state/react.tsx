import {
  GoabBadge,
  GoabButton,
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
  GoabWorkspaceLayout,
  useGoabWorkspaceLayoutScrollState,
} from "@abgov/react-components";

const paragraphs = Array.from({ length: 40 }, (_, i) => i + 1);

function PageHeader() {
  // Reads the live scroll state of the enclosing GoabWorkspaceLayout. As the
  // user scrolls, scrollPosition transitions: no-scroll → at-top → middle →
  // at-bottom. We collapse the header once the user moves off the top.
  const { scrollPosition, isScrollable } = useGoabWorkspaceLayoutScrollState();
  const collapsed =
    scrollPosition === "middle" || scrollPosition === "at-bottom";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: collapsed
          ? "var(--goa-space-xs) var(--goa-space-l)"
          : "var(--goa-space-m) var(--goa-space-l)",
        background: "var(--goa-color-greyscale-white)",
        transition: "padding 0.15s ease",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: collapsed ? "var(--goa-font-size-4)" : "var(--goa-font-size-5)",
          transition: "font-size 0.15s ease",
        }}
      >
        Cases overview
      </h1>
      <GoabBadge
        type={isScrollable ? "information" : "archived"}
        content={`scroll: ${scrollPosition}`}
      />
    </div>
  );
}

function PageFooter() {
  const { scrollPosition, isScrollable } = useGoabWorkspaceLayoutScrollState();
  return (
    <div
      style={{
        padding: "var(--goa-space-m) var(--goa-space-l)",
        color: "var(--goa-color-text-secondary)",
        fontSize: "var(--goa-font-size-2)",
      }}
    >
      State: {scrollPosition} · scrollable: {String(isScrollable)}
    </div>
  );
}

function MainContent() {
  const { scrollPosition } = useGoabWorkspaceLayoutScrollState();
  const showBackToTop =
    scrollPosition === "middle" || scrollPosition === "at-bottom";

  return (
    <>
      {showBackToTop && (
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 2,
            display: "flex",
            justifyContent: "flex-end",
            padding: "var(--goa-space-s) var(--goa-space-l)",
            pointerEvents: "none",
          }}
        >
          <div style={{ pointerEvents: "auto" }}>
            <GoabButton type="secondary" size="compact" leadingIcon="arrow-up">
              Back to top
            </GoabButton>
          </div>
        </div>
      )}
      <div style={{ padding: "var(--goa-space-l)" }}>
        <h2 style={{ marginTop: 0 }}>Reacting to scroll state</h2>
        <p>
          The header above shows the live <code>scrollPosition</code> read
          from <code>useGoabWorkspaceLayoutScrollState()</code>. As you scroll,
          the header collapses (smaller padding + smaller heading) and a
          "Back to top" button appears once you have moved off the top.
        </p>
        {paragraphs.map((n) => (
          <p key={n}>
            Paragraph {n} — scroll through this content to drive the scroll
            state changes above.
          </p>
        ))}
      </div>
    </>
  );
}

export function WorkspaceLayoutScrollStateExample() {
  return (
    <GoabWorkspaceLayout
      sideMenu={
        <GoabWorkSideMenu
          heading="Workspace"
          url="/"
          open={true}
          primaryContent={
            <GoabWorkSideMenuGroup icon="grid" heading="Work">
              <GoabWorkSideMenuItem icon="document" label="Cases" url="/cases" />
              <GoabWorkSideMenuItem icon="folder" label="Documents" url="/documents" />
            </GoabWorkSideMenuGroup>
          }
        />
      }
      pageHeader={<PageHeader />}
      pageFooter={<PageFooter />}
    >
      <MainContent />
    </GoabWorkspaceLayout>
  );
}
