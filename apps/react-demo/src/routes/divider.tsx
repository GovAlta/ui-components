import { GoADivider } from "@abgov/react-components";

export default function Divider() {
  return (
    <>
      <h1>Divider</h1>

      <h2>Small</h2>
      <GoADivider spacing="small"></GoADivider>
      <h2>Medium</h2>
      <GoADivider spacing="medium"></GoADivider>
      <h2>Large</h2>
      <GoADivider spacing="large"></GoADivider>
      <h2>None</h2>
      <GoADivider spacing="none"></GoADivider>
    </>
  );
}
