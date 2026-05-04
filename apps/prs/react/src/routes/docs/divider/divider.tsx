import { GoabDivider, GoabText } from "@abgov/react-components";

export function DocsDividerRoute() {
  return (
    <div>
      <h2>Divider</h2>

      <h3>Basic divider</h3>
      <GoabText mt="none" mb="none">Section one</GoabText>
      <GoabDivider mt="xl" mb="xl" />
      <GoabText mt="none" mb="none">Section two</GoabText>
    </div>
  );
}
