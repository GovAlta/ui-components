import { GoabContainer, GoabText, GoabTooltip } from "@abgov/react-components";

export function ShowFullDateInATooltip() {
  return (
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
      <GoabText as="body-m" mt="none" mb="none">Hover on the time it was added to see the full date and time.</GoabText>
    </GoabContainer>
  );
}
