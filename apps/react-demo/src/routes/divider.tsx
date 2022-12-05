import { GoADivider } from "@abgov/react-components";

export default function Divider() {
  return (
    <>
      <h1>Divider</h1>

      <h2>Small</h2>
      <GoADivider mt="s" mb="s"></GoADivider>
      <h2>Medium</h2>
      <GoADivider mt="m" mb="m"></GoADivider>
      <h2>Large</h2>
      <GoADivider mt="l" mb="l"></GoADivider>
      <h2>None</h2>
      <GoADivider></GoADivider>
    </>
  );
}
