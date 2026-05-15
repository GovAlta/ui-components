import { useState } from "react";
import {
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabContainer,
  GoabIconButton,
  GoabText,
  GoabTooltip,
} from "@abgov/react-components";

export function DocsTooltipRoute() {
  const [isCopied, setIsCopied] = useState(false);

  function copyCode() {
    const codeToCopy = "$goa-color-interactive-default";
    navigator.clipboard.writeText(codeToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    });
  }

  return (
    <div>
      <h2>Tooltip</h2>

      <h3>Basic tooltip</h3>
      <GoabTooltip content="Additional information about this item">
        <GoabButton>Hover me</GoabButton>
      </GoabTooltip>

      <h3>Positions</h3>
      <GoabTooltip content="Top tooltip" position="top">
        <GoabButton>Top</GoabButton>
      </GoabTooltip>
      <GoabTooltip content="Bottom tooltip" position="bottom">
        <GoabButton>Bottom</GoabButton>
      </GoabTooltip>
      <GoabTooltip content="Left tooltip" position="left">
        <GoabButton>Left</GoabButton>
      </GoabTooltip>
      <GoabTooltip content="Right tooltip" position="right">
        <GoabButton>Right</GoabButton>
      </GoabTooltip>

      <h3>With icon button</h3>
      <GoabTooltip content="More options">
        <GoabIconButton icon="ellipsis-vertical" />
      </GoabTooltip>

      <h3>Horizontal alignment</h3>
      <GoabTooltip content="Left aligned tooltip" hAlign="left">
        <GoabButton>Left</GoabButton>
      </GoabTooltip>
      <GoabTooltip content="Center aligned tooltip" hAlign="center">
        <GoabButton>Center</GoabButton>
      </GoabTooltip>
      <GoabTooltip content="Right aligned tooltip" hAlign="right">
        <GoabButton>Right</GoabButton>
      </GoabTooltip>

      <h2>Examples</h2>

      <h3>Copy to clipboard</h3>
      <style>{`
        .token-block {
          background-color: var(--goa-color-interactive-default);
          height: 22px;
          width: 24px;
          border-radius: var(--goa-border-radius-s);
        }
      `}</style>
      <GoabBlock alignment="center">
        <div className="token-block" />
        <span>$goa-color-interactive-default</span>
        <GoabTooltip content={isCopied ? "Copied" : "Copy?"} position="top">
          <GoabIconButton icon="copy" onClick={copyCode} mt="2xs" />
        </GoabTooltip>
      </GoabBlock>

      <h3>Show a label on an icon-only button</h3>
      <GoabButtonGroup alignment="start">
        <GoabTooltip content="Edit">
          <GoabIconButton icon="pencil" ariaLabel="Edit" />
        </GoabTooltip>
        <GoabTooltip content="Alerts">
          <GoabIconButton icon="notifications" ariaLabel="Alerts" />
        </GoabTooltip>
        <GoabTooltip content="Settings">
          <GoabIconButton icon="settings" ariaLabel="Settings" />
        </GoabTooltip>
      </GoabButtonGroup>

      <h3>Show full date in a tooltip</h3>
      <GoabContainer
        type="non-interactive"
        accent="thick"
        heading={
          <span>
            Joan Smith
            <GoabTooltip content="Nov 23, 2023 at 10:35 am">
              <span
                style={{
                  color: "var(--goa-color-text-secondary)",
                  font: "var(--goa-typography-body-xs)",
                }}
              >
                4 hours ago
              </span>
            </GoabTooltip>
          </span>
        }
      >
        <GoabText tag="p" size="body-m" mt="none" mb="none">
          Hover on the time it was added to see the full date and time.
        </GoabText>
      </GoabContainer>
    </div>
  );
}
