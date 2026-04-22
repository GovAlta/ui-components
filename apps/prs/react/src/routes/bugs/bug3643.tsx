import { GoabButton, GoabPopover, GoabText } from "@abgov/react-components";

const testAreaStyle: React.CSSProperties = {
  position: "relative",
  minHeight: "75vh",
  border: "1px dashed var(--goa-color-greyscale-300)",
  borderRadius: "0.5rem",
  padding: "1rem",
};

const cornerStyle: React.CSSProperties = {
  position: "absolute",
};

export function Bug3643Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug 3643 - Popover right alignment at viewport edge
      </GoabText>
      <GoabText tag="p" mb="m">
        Open each corner popover to verify alignment and overflow behavior in different
        viewport locations.
      </GoabText>

      <div style={testAreaStyle}>
        <div style={{ ...cornerStyle, top: "1rem", left: "1rem" }}>
          <GoabPopover
            target={<GoabButton type="secondary">Top Left</GoabButton>}
            maxWidth="22rem"
          >
            <div style={{ width: "300px" }}>
              <GoabText tag="p">Top-left corner popover content.</GoabText>
            </div>
          </GoabPopover>
        </div>

        <div style={{ ...cornerStyle, top: "1rem", right: "1rem" }}>
          <GoabPopover
            target={<GoabButton type="secondary">Top Right</GoabButton>}
            maxWidth="22rem"
          >
            <div style={{ width: "300px" }}>
              <GoabText tag="p">
                Top-right corner popover content with longer text to test right-edge
                alignment fallback.
              </GoabText>
            </div>
          </GoabPopover>
        </div>

        <div style={{ ...cornerStyle, bottom: "1rem", left: "1rem" }}>
          <GoabPopover
            target={<GoabButton type="secondary">Bottom Left</GoabButton>}
            maxWidth="22rem"
          >
            <div style={{ width: "300px" }}>
              <GoabText tag="p">Bottom-left corner popover content.</GoabText>
            </div>
          </GoabPopover>
        </div>

        <div style={{ ...cornerStyle, bottom: "1rem", right: "1rem" }}>
          <GoabPopover
            target={<GoabButton type="secondary">Bottom Right</GoabButton>}
            maxWidth="22rem"
          >
            <div style={{ width: "300px" }}>
              <GoabText tag="p">
                Bottom-right corner popover content with longer text to validate overflow
                handling.
              </GoabText>
            </div>
          </GoabPopover>
        </div>
      </div>
    </div>
  );
}
