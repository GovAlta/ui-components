import { type CSSProperties, JSX } from "react";
import {
  GoabBlock,
  GoabDropdown,
  GoabDropdownItem,
  GoabText,
  GoabTextArea,
  GoabTooltip,
} from "@abgov/react-components";

interface MaxWidthExample {
  label: string;
  maxWidth: string;
}

const EXAMPLES: MaxWidthExample[] = [
  { label: "maxWidth 200px", maxWidth: "200px" },
  { label: "maxWidth 60ch", maxWidth: "60ch" },
  { label: "maxWidth 50%", maxWidth: "50%" },
];

const DROPDOWN_ITEMS = [
  {
    label:
      "Comprehensive option label designed to span the full 800px width when maxWidth allows",
    value: "full-width-option",
  },
  {
    label: "Secondary descriptive choice reinforcing measurement comparisons",
    value: "secondary-choice",
  },
  {
    label: "Additional entry mirroring content for consistent evaluations",
    value: "tertiary-choice",
  },
];

const TEXTAREA_VALUE =
  "This textarea content intentionally stretches across the full 800px width so the maxWidth attribute " +
  "clearly demonstrates how the component constrains layout. Each example reuses the same text " +
  "to make comparisons straightforward.";

const TOOLTIP_CONTENT =
  "This tooltip description mirrors the other component content. It is lengthy enough to occupy " +
  "the full 800px width where permitted, making changes in maxWidth easy to compare across " +
  "scenarios.";

const demoCardStyle: CSSProperties = {
  background: "#ffffff",
  border: "1px solid #d6d6d6",
  borderRadius: "12px",
  padding: "16px",
};

const tooltipWrapperStyle: CSSProperties = {
  width: "800px",
};

const tooltipTriggerStyle: CSSProperties = {
  display: "inline-block",
  fontWeight: 600,
};

export function Feat2054Route(): JSX.Element {
  return (
    <GoabBlock direction="column" gap="l">
      <GoabBlock direction="column" gap="s">
        <GoabText tag="h1">Feature 2054 - maxWidth comparison showcase</GoabText>
        <GoabText tag="p">
          Each example keeps content identical and only varies the <code>maxWidth</code>{" "}
          value so you can compare how dropdowns, text areas, and tooltips respond at
          three distinct sizes.
        </GoabText>
      </GoabBlock>

      <GoabBlock direction="column" gap="m">
        <GoabText tag="h2">Dropdown examples</GoabText>
        <GoabBlock direction="column" gap="m">
          {EXAMPLES.map((example) => (
            <GoabBlock key={`dropdown-${example.maxWidth}`} direction="column" gap="s">
              <GoabText tag="h3">{example.label}</GoabText>
              <GoabText tag="p">
                maxWidth set to {example.maxWidth} while width remains at 800px. Item
                labels share the same text to highlight truncation and wrapping.
              </GoabText>
              <GoabDropdown
                name={`dropdown-${example.maxWidth}`}
                placeholder="Select an option"
                width="800px"
                maxWidth={example.maxWidth}
              >
                {DROPDOWN_ITEMS.map((item) => (
                  <GoabDropdownItem
                    key={`${example.maxWidth}-${item.value}`}
                    value={item.value}
                    label={item.label}
                  />
                ))}
              </GoabDropdown>
            </GoabBlock>
          ))}
        </GoabBlock>
      </GoabBlock>

      <GoabBlock direction="column" gap="m">
        <GoabText tag="h2">Textarea examples</GoabText>
        <GoabBlock direction="column" gap="m">
          {EXAMPLES.map((example) => (
            <GoabBlock key={`textarea-${example.maxWidth}`} direction="column" gap="s">
              <GoabText tag="h3">{example.label}</GoabText>
              <GoabText tag="p">
                The textarea width is fixed at 800px to match the dropdowns, allowing the
                maxWidth value alone to dictate the rendered width.
              </GoabText>
              <GoabTextArea
                name={`textarea-${example.maxWidth}`}
                width="800px"
                maxWidth={example.maxWidth}
                value={TEXTAREA_VALUE}
                rows={4}
              />
            </GoabBlock>
          ))}
        </GoabBlock>
      </GoabBlock>

      <GoabBlock direction="column" gap="m">
        <GoabText tag="h2">Tooltip examples</GoabText>
        <GoabBlock direction="column" gap="m">
          {EXAMPLES.map((example) => (
            <GoabBlock key={`tooltip-${example.maxWidth}`} direction="column" gap="s">
              <GoabText tag="h3">{example.label}</GoabText>
              <GoabText tag="p">
                Tooltip content mirrors the textarea copy so the surface width shifts
                solely from the maxWidth setting.
              </GoabText>
              <GoabTooltip content={TOOLTIP_CONTENT} maxWidth={example.maxWidth}>
                <GoabText tag="span">Hover to compare maxWidth behaviour</GoabText>
              </GoabTooltip>
            </GoabBlock>
          ))}
        </GoabBlock>
      </GoabBlock>
    </GoabBlock>
  );
}
