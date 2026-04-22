import { GoabMicrositeHeader } from "@abgov/react-components";

export function ShowVersionNumber() {
  return (
    <GoabMicrositeHeader
      type="alpha"
      version={
        <>
          <span>
            Slotted <b>version text</b>.
          </span>
          <span>v1.23</span>
        </>
      }
    />
  );
}
