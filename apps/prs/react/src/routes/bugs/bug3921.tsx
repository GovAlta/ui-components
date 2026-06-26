import { GoabTab, GoabTabs, GoabText } from "@abgov/react-components";

export function Bug3921Route() {
  return (
    <div style={{ display: "grid", gap: "2rem" }}>
      <div>
        <GoabText tag="h1" mt="none">
          3921 - Segmented tab dynamic indicator
        </GoabText>
        <GoabText>
          Resize the browser window. The active tab indicator background should follow the
          selected tab as the layout reflows.
        </GoabText>
      </div>

      <div>
        <GoabText tag="h2" mt="none">
          Many tabs including a long heading
        </GoabText>
        <GoabTabs variant="segmented" testId="bug3921-tabs">
          <GoabTab heading="Day">Daily view</GoabTab>
          <GoabTab heading="Week">Weekly view</GoabTab>
          <GoabTab heading="Month">Monthly view</GoabTab>
          <GoabTab heading="Quarter">Quarterly view</GoabTab>
          <GoabTab heading="Year">Yearly view</GoabTab>
          <GoabTab heading="Custom reporting period with a very long heading">
            Custom reporting period view
          </GoabTab>
          <GoabTab heading="Archive">Archived view</GoabTab>
          <GoabTab heading="Forecast">Forecast view</GoabTab>
        </GoabTabs>
      </div>

      <div>
        <GoabText tag="h2" mt="none">
          Simple three-tab example
        </GoabText>
        <GoabTabs variant="segmented">
          <GoabTab heading="Tab one">Content one</GoabTab>
          <GoabTab heading="Tab two">Content two</GoabTab>
          <GoabTab heading="Tab three">Content three</GoabTab>
        </GoabTabs>
      </div>
    </div>
  );
}
