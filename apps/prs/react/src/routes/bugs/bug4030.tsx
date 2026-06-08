import { GoabAppFooter, GoabText } from "@abgov/react-components";

export function Bug4030Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m" mb="m">
        Bug #4030: Footer copyright text
      </GoabText>
      <GoabText tag="p" mb="l">
        The V2 footer should show a single span "© 2026 Government of Alberta". The
        "This is a Government of Alberta Digital Service" span and the "GoA" abbreviation
        should both be removed.
      </GoabText>

      <GoabAppFooter version="2" />
    </div>
  );
}

export default Bug4030Route;
