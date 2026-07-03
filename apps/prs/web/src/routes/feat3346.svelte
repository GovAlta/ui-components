<script lang="ts">
</script>

<svelte:head>
  <title>Feature 3346 - Scroll Panel Direction</title>
</svelte:head>

<div class="page">
  <goa-text as="h5" mb="xs" color="secondary" class="eyebrow">Feature 3346</goa-text>
  <goa-text as="h1" mt="0" mb="0">Scroll Panel with Direction Control</goa-text>
  <goa-text mb="l">
    This demonstrates the direction prop on goa-scroll-panel.
  </goa-text>

  <goa-text as="h2" mt="0">
    Within a fixed width container
  </goa-text>

  <div class="fixed-width-container">
    <goa-scroll-panel direction="horizontal" height="100%">
      <goa-table striped="true" variant="normal" width="1940px">
        <table style="width: 100%;">
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
        </table>
      </goa-table>
    </goa-scroll-panel>
  </div>

  <goa-text as="h2">Within a vertical scroll panel</goa-text>
  <div class="vertical-scroll-container">
    <goa-scroll-panel height="480px">
      <div slot="header">
        <div class="header-content">
          <goa-text as="h2" mt="0" mb="0">
            Projects
          </goa-text>
        </div>
      </div>
      <goa-scroll-panel direction="horizontal" height="100%">
        <div class="inner-padding">
          <goa-table striped="true" variant="normal" width="1940px">
            <table style="width: 100%;">
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
            </table>
          </goa-table>
        </div>
      </goa-scroll-panel>
    </goa-scroll-panel>
  </div>
</div>

<style>
  .page {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .fixed-width-container {
    max-width: 640px;
    overflow: hidden;
  }

  .vertical-scroll-container {
    max-width: 640px;
    border: 1px solid var(--goa-color-greyscale-200);
    border-radius: 24px 24px 0 0;
    overflow: hidden;
  }

  .header-content {
    padding: 1rem 2rem;
  }

  .inner-padding {
    padding: 0 2rem;
    min-width: fit-content;
  }
</style>
