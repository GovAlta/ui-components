import { GoabMicrositeHeader } from "@abgov/react-components";

export function DocsMicrositeHeaderRoute() {
  return (
    <div>
      <h2>Microsite header</h2>

      <h3>Basic microsite header</h3>
      <GoabMicrositeHeader type="alpha" />

      <h3>Header types</h3>
      <GoabMicrositeHeader type="alpha" />
      <GoabMicrositeHeader type="beta" />
      <GoabMicrositeHeader type="live" />

      <h3>With version</h3>
      <GoabMicrositeHeader type="alpha" version="1.0.0" />

      <h3>With feedback link</h3>
      <GoabMicrositeHeader type="beta" feedbackUrl="/feedback" />
    </div>
  );
}
