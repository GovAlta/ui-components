import {
  GoabAccordion,
  GoabBadge,
  GoabBlock,
  GoabButton,
  GoabText,
} from "@abgov/react-components";

export function Feat3636Route() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--goa-spacing-xl)",
        maxWidth: "72rem",
      }}
    >
      <GoabText tag="h1">
        Feature 3636: Accordion actions slot and list view variant
      </GoabText>
      <GoabText>
        The GoAAccordion component now includes an optional slot for action buttons in the
        header, as well as a new "list view" variant that features a filled header
        background and hover state.
      </GoabText>

      <div style={{ display: "grid", gap: "var(--goa-spacing-l)" }}>
        <GoabText tag="h2">Actions slot examples</GoabText>

        <GoabAccordion
          heading="Actions with button"
          secondaryText="Left icon"
          iconPosition="left"
          open
          actions={
            <GoabButton type="secondary" size="compact">
              Edit
            </GoabButton>
          }
        >
          <GoabText>
            This example places a button in the actions slot while keeping heading text
            and content as standard body copy.
          </GoabText>
        </GoabAccordion>

        <GoabAccordion
          heading="Actions with button and badge"
          secondaryText="Right icon"
          iconPosition="right"
          actions={
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <GoabBadge type="important" content="3" />
              <GoabButton type="tertiary" size="compact">
                View all
              </GoabButton>
            </div>
          }
        >
          <GoabText>
            This example mixes badges and controls inside the actions slot.
          </GoabText>
        </GoabAccordion>
      </div>

      <div style={{ display: "grid", gap: "var(--goa-spacing-l)" }}>
        <GoabText tag="h2">Heading content examples</GoabText>

        <GoabAccordion
          heading="Heading with badge"
          headingContent={<GoabBadge type="information" content="Beta" />}
          actions={
            <GoabButton type="tertiary" size="compact">
              Preview
            </GoabButton>
          }
          open
        >
          <GoabText>
            The heading content slot can display status indicators such as badges.
          </GoabText>
        </GoabAccordion>

        <GoabAccordion
          heading="Heading with multiple badges"
          headingContent={
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <GoabBadge type="success" content="Stable" />
              <GoabBadge type="important" content="Requires review" />
            </div>
          }
          actions={
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <GoabBadge type="important" content="2" />
              <GoabButton type="tertiary" size="compact">
                Manage
              </GoabButton>
            </div>
          }
        >
          <GoabText>
            Multiple indicators can be grouped in heading content when more context is
            needed.
          </GoabText>
        </GoabAccordion>
      </div>

      <div style={{ display: "grid", gap: "var(--goa-spacing-l)" }}>
        <GoabText tag="h2">Icon position and fixed width examples</GoabText>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
            gap: "var(--goa-spacing-l)",
          }}
        >
          <GoabAccordion
            heading="Fixed 24rem, icon left"
            iconPosition="left"
            maxWidth="24rem"
            actions={
              <GoabButton type="secondary" size="compact">
                Open
              </GoabButton>
            }
            open
          >
            <GoabText>
              A narrow fixed-width accordion using the default icon position.
            </GoabText>
          </GoabAccordion>

          <GoabAccordion
            heading="Fixed 30rem, icon right"
            iconPosition="right"
            maxWidth="30rem"
            actions={
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <GoabBadge type="important" content="4" />
                <GoabButton type="tertiary" size="compact">
                  Details
                </GoabButton>
              </div>
            }
            open
          >
            <GoabText>
              A wider fixed-width accordion with the icon moved to the right side.
            </GoabText>
          </GoabAccordion>
        </div>
      </div>

      <div style={{ display: "grid", gap: "var(--goa-spacing-l)" }}>
        <GoabText tag="h2">Filled/List View Style</GoabText>
        <GoabAccordion
          heading="Randall Sanford"
          headingContent={<GoabBadge type="success" content="Accepted" />}
          type="filled"
          actions={
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <GoabButton type="tertiary" size="compact">
                1 Comment(s)
              </GoabButton>
              <GoabButton type="secondary" size="compact">
                View
              </GoabButton>
            </div>
          }
          open
        >
          <GoabText>stuff goes in here</GoabText>
        </GoabAccordion>

        <GoabAccordion
          heading="Virginia Johns"
          headingContent={<GoabBadge type="information" content="Email sent" />}
          type="filled"
          actions={
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <GoabButton type="tertiary" size="compact">
                4 Comment(s)
              </GoabButton>
              <GoabButton type="secondary" size="compact">
                View
              </GoabButton>
            </div>
          }
          open
        >
          <GoabText>stuff goes in here</GoabText>
        </GoabAccordion>
        <GoabAccordion
          heading="Mable Macejkovic"
          headingContent={<GoabBadge type="success" content="Accepted" />}
          type="filled"
          actions={
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <GoabButton type="tertiary" size="compact">
                3 Comment(s)
              </GoabButton>
              <GoabButton type="secondary" size="compact">
                View
              </GoabButton>
            </div>
          }
          open
        >
          <GoabText>stuff goes in here</GoabText>
        </GoabAccordion>
        <GoabAccordion
          heading="Noah Clark"
          headingContent={<GoabBadge type="success" content="Accepted" />}
          type="filled"
          actions={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                gap: "0.5rem",
              }}
            >
              <GoabButton type="tertiary" size="compact">
                8 Comment(s)
              </GoabButton>
              <GoabButton type="secondary" size="compact">
                View
              </GoabButton>
            </div>
          }
          open
        >
          <GoabText>stuff goes in here</GoabText>
        </GoabAccordion>
      </div>
    </div>
  );
}
