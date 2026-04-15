import { GoabButton, GoabButtonGroup } from "@abgov/react-components";

export function Bug3743Route() {
  return (
    <>
      <div>
        <h1>3743 - Tertiary button background color on mobile</h1>
        <h2>Version 1</h2>
        <GoabButtonGroup alignment="start">
          <GoabButton>Submit</GoabButton>
          <GoabButton type="secondary">Cancel</GoabButton>
          <GoabButton type="tertiary">Tertiary</GoabButton>
        </GoabButtonGroup>
      </div>
      <div
        style={{
          backgroundColor: "var(--goa-color-greyscale-700)",
          padding: "var(--goa-space-l)",
        }}
      >
        <GoabButton variant="inverse">Primary inverse</GoabButton>
        <GoabButton variant="inverse" type="secondary">
          Secondary inverse
        </GoabButton>
        <GoabButton variant="inverse" type="tertiary">
          Tertiary inverse
        </GoabButton>
      </div>
    </>
  );
}
