import { GoabTooltip, GoabIcon, GoabBlock } from "@abgov/react-components";

export function Feat1547Route() {
  return (
    <>
      <h1>Feature 1547</h1>
      <p>Feature 1547 implementation</p>

      <GoabBlock gap="m" direction="row" alignment="center">
        <GoabTooltip content="This is a simple tooltip with just text content">
          <GoabIcon type="information-circle" size="3" />
        </GoabTooltip>

        <GoabTooltip
          content={
            <>
              <p>
                This is a multiline tooltip with <strong>bold text</strong>.
              </p>
              <p>
                Here's some <em>italic text</em> on a separate line.
              </p>
              <p>
                And here's a{" "}
                <a href="#" style={{ color: "#0066cc" }}>
                  link
                </a>{" "}
                on its own line.
              </p>
            </>
          }
        >
          <GoabIcon type="help-circle" size="3" />
        </GoabTooltip>
      </GoabBlock>
    </>
  );
}
