import { GoabLink } from "@abgov/react-components";

export function DocsLinkRoute() {
  return (
    <div>
      <h2>Link</h2>

      <h3>Basic link</h3>
      <GoabLink>
        <a href="/about">Learn more about our services</a>
      </GoabLink>

      <h3>External link</h3>
      <GoabLink trailingIcon="open">
        <a href="https://www.alberta.ca">Visit Alberta.ca</a>
      </GoabLink>

      <h3>Colors</h3>
      <div style={{ marginBottom: "var(--goa-space-m)" }}>
        <GoabLink color="interactive">
          <a href="#">Interactive (default)</a>
        </GoabLink>
      </div>
      <div style={{ marginBottom: "var(--goa-space-m)" }}>
        <GoabLink color="dark">
          <a href="#">Dark</a>
        </GoabLink>
      </div>
      <div
        style={{
          backgroundColor: "var(--goa-color-greyscale-700)",
          padding: "var(--goa-space-m)",
        }}
      >
        <GoabLink color="light">
          <a href="#">Light</a>
        </GoabLink>
      </div>

      <h3>Sizes</h3>
      <div>
        <GoabLink size="xsmall" mb="xs">
          <a href="#">Extra small link</a>
        </GoabLink>
      </div>
      <div>
        <GoabLink size="small" mb="xs">
          <a href="#">Small link</a>
        </GoabLink>
      </div>
      <div>
        <GoabLink size="medium" mb="xs">
          <a href="#">Medium link (default)</a>
        </GoabLink>
      </div>
      <div>
        <GoabLink size="large">
          <a href="#">Large link</a>
        </GoabLink>
      </div>

      <h3>With icons</h3>
      <div>
        <GoabLink leadingIcon="download" mb="xs">
          <a href="#">Download form</a>
        </GoabLink>
      </div>
      <div>
        <GoabLink trailingIcon="arrow-forward">
          <a href="#">Continue to next step</a>
        </GoabLink>
      </div>
    </div>
  );
}
