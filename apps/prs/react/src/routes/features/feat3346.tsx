import { GoabScrollPanel, GoabText, GoabTable, GoabButton } from "@abgov/react-components";

// Wide enough to overflow any of the 640px containers below.
function WideTable() {
  return (
    <GoabTable striped={true} variant="normal" width="1940px">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Category</th>
          <th>Status</th>
          <th>Date Created</th>
          <th>Last Modified</th>
          <th>Assigned To</th>
          <th>Priority</th>
          <th>Department</th>
          <th>Location</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Project Alpha</td>
          <td>Initial project setup and configuration</td>
          <td>Planning</td>
          <td>Complete</td>
          <td>2024-01-15</td>
          <td>2024-01-20</td>
          <td>John Smith</td>
          <td>High</td>
          <td>Engineering</td>
          <td>Edmonton</td>
          <td>On track for Q2 delivery</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Project Beta</td>
          <td>Development phase implementation</td>
          <td>Development</td>
          <td>In Progress</td>
          <td>2024-02-20</td>
          <td>2024-03-10</td>
          <td>Sarah Johnson</td>
          <td>Medium</td>
          <td>Product</td>
          <td>Calgary</td>
          <td>Needs review from stakeholders</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Project Gamma</td>
          <td>Testing and quality assurance</td>
          <td>Testing</td>
          <td>Pending</td>
          <td>2024-03-10</td>
          <td>2024-03-15</td>
          <td>Mike Chen</td>
          <td>High</td>
          <td>QA</td>
          <td>Red Deer</td>
          <td>Ready for QA</td>
        </tr>
      </tbody>
    </GoabTable>
  );
}

export function Feat3346Route() {
  return (
    <div
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <GoabText tag="h1" mt="none" mb="none">
        Feature 3346: Scroll Panel Direction Control
      </GoabText>
      <GoabText tag="p">
        This demonstrates the direction prop on GoabScrollPanel.
      </GoabText>

      <GoabText tag="h2" mt="0">
        Within a fixed width container
      </GoabText>

      <div
        style={{
          maxWidth: "640px",
          overflow: "hidden",
        }}
      >
        <GoabScrollPanel direction="horizontal" height="100%">
          <GoabTable striped={true} variant="normal" width="1940px">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date Created</th>
                <th>Last Modified</th>
                <th>Assigned To</th>
                <th>Priority</th>
                <th>Department</th>
                <th>Location</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Project Alpha</td>
                <td>Initial project setup and configuration</td>
                <td>Planning</td>
                <td>Complete</td>
                <td>2024-01-15</td>
                <td>2024-01-20</td>
                <td>John Smith</td>
                <td>High</td>
                <td>Engineering</td>
                <td>Edmonton</td>
                <td>On track for Q2 delivery</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Project Beta</td>
                <td>Development phase implementation</td>
                <td>Development</td>
                <td>In Progress</td>
                <td>2024-02-20</td>
                <td>2024-03-10</td>
                <td>Sarah Johnson</td>
                <td>Medium</td>
                <td>Product</td>
                <td>Calgary</td>
                <td>Needs review from stakeholders</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Project Gamma</td>
                <td>Testing and quality assurance</td>
                <td>Testing</td>
                <td>Pending</td>
                <td>2024-03-10</td>
                <td>2024-03-15</td>
                <td>Mike Chen</td>
                <td>High</td>
                <td>QA</td>
                <td>Red Deer</td>
                <td>Ready for QA</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Project Delta</td>
                <td>User acceptance testing and feedback collection</td>
                <td>UAT</td>
                <td>Not Started</td>
                <td>2024-04-01</td>
                <td>-</td>
                <td>Lisa Williams</td>
                <td>Low</td>
                <td>Product</td>
                <td>Edmonton</td>
                <td>Waiting for alpha release</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Project Epsilon</td>
                <td>Documentation and training materials preparation</td>
                <td>Documentation</td>
                <td>In Progress</td>
                <td>2024-03-01</td>
                <td>2024-03-25</td>
                <td>David Brown</td>
                <td>Medium</td>
                <td>Operations</td>
                <td>Calgary</td>
                <td>Draft in review</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Project Zeta</td>
                <td>Deployment planning and environment setup</td>
                <td>Deployment</td>
                <td>Not Started</td>
                <td>2024-04-15</td>
                <td>-</td>
                <td>Emma Davis</td>
                <td>High</td>
                <td>DevOps</td>
                <td>Red Deer</td>
                <td>Pending infrastructure approval</td>
              </tr>
            </tbody>
          </GoabTable>
        </GoabScrollPanel>
      </div>

      <GoabText tag="h2">Scrolls both horizontally and vertically</GoabText>
      <div
        style={{
          maxWidth: "640px",
          border: "1px solid var(--goa-color-greyscale-200)",
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        <GoabScrollPanel
          direction="both"
          height="360px"
          header={
            <div
              style={{
                padding: "1rem 2rem",
              }}
            >
              <GoabText tag="h2" mt="0" mb="0">
                Projects
              </GoabText>
            </div>
          }
          footer={
            <div
              style={{
                padding: "1rem 2rem",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <GoabButton type="tertiary" size="compact">
                Export projects
              </GoabButton>
            </div>
          }
        >
            <div
              style={{
                padding: "0 2rem",
                minWidth: "fit-content",
              }}
            >
              <GoabTable striped={true} variant="normal" width="1940px">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Date Created</th>
                    <th>Last Modified</th>
                    <th>Assigned To</th>
                    <th>Priority</th>
                    <th>Department</th>
                    <th>Location</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Project Alpha</td>
                    <td>Initial project setup and configuration</td>
                    <td>Planning</td>
                    <td>Complete</td>
                    <td>2024-01-15</td>
                    <td>2024-01-20</td>
                    <td>John Smith</td>
                    <td>High</td>
                    <td>Engineering</td>
                    <td>Edmonton</td>
                    <td>On track for Q2 delivery</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Project Beta</td>
                    <td>Development phase implementation</td>
                    <td>Development</td>
                    <td>In Progress</td>
                    <td>2024-02-20</td>
                    <td>2024-03-10</td>
                    <td>Sarah Johnson</td>
                    <td>Medium</td>
                    <td>Product</td>
                    <td>Calgary</td>
                    <td>Needs review from stakeholders</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Project Gamma</td>
                    <td>Testing and quality assurance</td>
                    <td>Testing</td>
                    <td>Pending</td>
                    <td>2024-03-10</td>
                    <td>2024-03-15</td>
                    <td>Mike Chen</td>
                    <td>High</td>
                    <td>QA</td>
                    <td>Red Deer</td>
                    <td>Ready for QA</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Project Delta</td>
                    <td>User acceptance testing and feedback collection</td>
                    <td>UAT</td>
                    <td>Not Started</td>
                    <td>2024-04-01</td>
                    <td>-</td>
                    <td>Lisa Williams</td>
                    <td>Low</td>
                    <td>Product</td>
                    <td>Edmonton</td>
                    <td>Waiting for alpha release</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Project Epsilon</td>
                    <td>Documentation and training materials preparation</td>
                    <td>Documentation</td>
                    <td>In Progress</td>
                    <td>2024-03-01</td>
                    <td>2024-03-25</td>
                    <td>David Brown</td>
                    <td>Medium</td>
                    <td>Operations</td>
                    <td>Calgary</td>
                    <td>Draft in review</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Project Zeta</td>
                    <td>Deployment planning and environment setup</td>
                    <td>Deployment</td>
                    <td>Not Started</td>
                    <td>2024-04-15</td>
                    <td>-</td>
                    <td>Emma Davis</td>
                    <td>High</td>
                    <td>DevOps</td>
                    <td>Red Deer</td>
                    <td>Pending infrastructure approval</td>
                  </tr>
                </tbody>
              </GoabTable>
            </div>
        </GoabScrollPanel>
      </div>

      <GoabText tag="h2">Inside a flex row</GoabText>
      <GoabText tag="p">
        Both rows below are identical: a <code>display: flex</code> parent capped at 640px, with a
        fixed 160px sidebar beside a horizontal scroll panel. The only difference is{" "}
        <code>min-width: 0</code> on the <code>goa-scroll-panel</code> host.
      </GoabText>
      <GoabText tag="p">
        Without it the panel is a flex item with the default <code>min-width: auto</code>, so it
        refuses to shrink below its content&apos;s min-content width. The host stretches to the full
        table width, the row blows past its 640px cap, and horizontal scrolling never engages. The
        second row simulates adding <code>min-width: 0</code> to <code>:host</code> in
        ScrollPanel.svelte, which would fix this for every consumer. A CSS grid column behaves the
        same way, for the same reason.
      </GoabText>

      <style>{`
        .flex-row {
          display: flex;
          gap: 1rem;
          max-width: 640px;
          padding: 1rem;
          border: 1px dashed var(--goa-color-interactive-default);
        }
        .flex-row .sidebar {
          flex: 0 0 160px;
          padding: 1rem;
          background: var(--goa-color-greyscale-100);
        }
        /* Simulates the proposed fix: :host { min-width: 0 } */
        .flex-row--fixed goa-scroll-panel {
          min-width: 0;
        }
      `}</style>

      <GoabText tag="h3" mb="xs">
        Broken: panel does not scroll, row overflows past 640px
      </GoabText>
      <div className="flex-row">
        <div className="sidebar">Sidebar</div>
        <GoabScrollPanel direction="horizontal" height="100%">
          <WideTable />
        </GoabScrollPanel>
      </div>

      <GoabText tag="h3" mb="xs">
        Fixed with min-width: 0: panel scrolls, row stays at 640px
      </GoabText>
      <div className="flex-row flex-row--fixed">
        <div className="sidebar">Sidebar</div>
        <GoabScrollPanel direction="horizontal" height="100%">
          <WideTable />
        </GoabScrollPanel>
      </div>
    </div>
  );
}

export default Feat3346Route;
