import { GoAIcon } from "@abgov/react-components";

export default function Icon() {
  return (
    <>
      <h1>Icon</h1>

      <h2>Types</h2>
      <GoAIcon type="information-circle" />
      <GoAIcon type="help-circle" />
      <GoAIcon type="close-circle" />
      <GoAIcon type="checkmark-circle" />

      <h2>Sizes</h2>
      <h5>Small</h5>
      <GoAIcon type="bookmark" size="small" />
      <GoAIcon type="calendar" size="small" />
      <GoAIcon type="documents" size="small" />
      <GoAIcon type="trash" size="small" />
      <h5>Medium (Default)</h5>
      <GoAIcon type="bookmark" />
      <GoAIcon type="calendar" />
      <GoAIcon type="documents" />
      <GoAIcon type="trash" />
      <h5>Large</h5>
      <GoAIcon type="bookmark" size="large" />
      <GoAIcon type="calendar" size="large" />
      <GoAIcon type="documents" size="large" />
      <GoAIcon type="trash" size="large" />

      <h2>Theme</h2>
      <h5>Outline (Default)</h5>
      <GoAIcon type="bookmark" />
      <GoAIcon type="calendar" />
      <GoAIcon type="documents" />
      <GoAIcon type="trash" />
      <h5>Filled</h5>
      <GoAIcon type="bookmark" theme="filled" />
      <GoAIcon type="calendar" theme="filled" />
      <GoAIcon type="documents" theme="filled" />
      <GoAIcon type="trash" theme="filled" />
    </>
  );
}
