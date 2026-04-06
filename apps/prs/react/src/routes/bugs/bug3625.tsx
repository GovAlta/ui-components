import {
  GoabAccordion,
  GoabBadge,
  GoabBlock,
  GoabButton,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabText,
} from "@abgov/react-components";
import { useEffect, useState } from "react";
import v2TokensUrl from "@abgov/design-tokens-v2/dist/tokens.css?url";

export function Bug3625Route() {
  const [controlledOpen, setControlledOpen] = useState(false);

  // Inject the v2 design tokens
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = v2TokensUrl;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div>
      <h1>Bug 3625: Accordion Refinement</h1>
      <GoabAccordion heading="Small heading" headingSize="small">
        Content with small heading.
      </GoabAccordion>
      <GoabAccordion heading="Medium heading" headingSize="medium">
        Content with medium heading.
      </GoabAccordion>
      <GoabAccordion
        heading="Small heading"
        secondaryText="Secondary Text"
        headingSize="small"
      >
        Content with small heading.
      </GoabAccordion>
      <GoabAccordion
        heading="Medium heading"
        secondaryText="Secondary Text"
        headingSize="medium"
      >
        Content with medium heading.
      </GoabAccordion>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ width: "50%" }}>
          <GoabAccordion
            heading="Small heading"
            headingContent={<GoabBadge type="important" content="Updated" />}
            headingSize="small"
          >
            Content with small heading.
          </GoabAccordion>
        </div>
        <div style={{ width: "50%" }}>
          <GoabAccordion
            heading="Medium heading"
            headingContent={<GoabBadge type="important" content="Updated" />}
            headingSize="medium"
          >
            Content with medium heading.
          </GoabAccordion>
        </div>
      </div>
      <GoabAccordion heading="Small Controls" headingSize="small" iconPosition="right">
        <GoabBlock direction="column" gap="s">
          <GoabText tag="p">Content with small heading.</GoabText>
          <GoabBlock direction="column" gap="s">
            <GoabText tag="p">Nested block content.</GoabText>
            <GoabFormItem label="Colour Dropdown">
              <GoabDropdown width="500px">
                <GoabDropdownItem value="red" label="Red" />
                <GoabDropdownItem value="green" label="Green" />
                <GoabDropdownItem value="blue" label="Blue" />
              </GoabDropdown>
            </GoabFormItem>
          </GoabBlock>
        </GoabBlock>
      </GoabAccordion>
      <GoabAccordion heading="Medium Controls" headingSize="medium" iconPosition="right">
        <GoabBlock direction="column" gap="s">
          <GoabText tag="p">Content with medium heading.</GoabText>
          <GoabFormItem label="Colour Dropdown" maxWidth="100%">
            <GoabDropdown width="500px">
              <GoabDropdownItem value="red" label="Red" />
              <GoabDropdownItem value="green" label="Green" />
              <GoabDropdownItem value="blue" label="Blue" />
            </GoabDropdown>
          </GoabFormItem>
        </GoabBlock>
      </GoabAccordion>
      <GoabAccordion
        heading="Verification checklist"
        secondaryText="From Bug 2873 - open on start"
        open={true}
      >
        <GoabBlock direction="column" gap="s">
          <GoabText tag="p" maxWidth="400px">
            Expand and collapse this accordion to confirm that layout changes do not jump
            the scroll position unexpectedly.
          </GoabText>
          <GoabText tag="p" maxWidth="400px">
            Keep the content long enough to require scrolling before and after the
            accordion section.
          </GoabText>
        </GoabBlock>
      </GoabAccordion>
      <GoabAccordion
        heading="Clickable Element in Heading"
        headingSize="medium"
        headingContent={
          <GoabButton
            onClick={() => console.log("Button in heading clicked")}
            size="compact"
          >
            This is a button
          </GoabButton>
        }
        onChange={() => console.log("Accordion toggled")}
      >
        <p>
          In the JavaScript console the text "Accordion toggled" will not appear if the
          button is clicked, only if other parts of the heading are clicked.
        </p>
      </GoabAccordion>

      <h2>Controlled Accordion (toggle via button)</h2>
      <GoabText tag="p">
        Parent state: <strong>{controlledOpen ? "open" : "closed"}</strong>
      </GoabText>
      <GoabBlock direction="row" gap="s" mb="m">
        <GoabButton onClick={() => setControlledOpen((v) => !v)}>
          {controlledOpen ? "Collapse" : "Expand"}
        </GoabButton>
        <GoabButton type="secondary" onClick={() => setControlledOpen(false)}>
          Force close
        </GoabButton>
        <GoabButton type="secondary" onClick={() => setControlledOpen(true)}>
          Force open
        </GoabButton>
      </GoabBlock>
      <GoabAccordion
        heading="Controlled Accordion"
        secondaryText="open prop is bound to parent state"
        open={controlledOpen}
        onChange={(open) => {
          console.log("Accordion onChange → open:", open);
          setControlledOpen(open);
        }}
      >
        <GoabText tag="p">
          Test the controlled pattern: click the accordion summary, click the buttons
          above, and watch whether the parent state stays in sync with the visible UI
          state.
        </GoabText>
      </GoabAccordion>
    </div>
  );
}
