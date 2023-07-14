import { DoDont } from "@abgov/shared/storybook-common";

export default function DoDontComponent() {
  return (
    <>
      <h1>Do - Don't</h1>

      <h2>Do</h2>
      <DoDont type={"Do"} content={"Document types will gradually be made avalible. If you need to file an unsupported document type, you must file via the existing email filing procedure or it will be rejected by the digital service."}
        description="Always capitalize the first word of a new sentence." />

      <h2>Don't</h2>
      <DoDont type={"Dont"} content={"Document types will gradually be made avalible. If you need to file an UNSUPPORTED DOCUMENT TYPE, you must file via the existing email filing procedure or it will be rejected by the digital service."} description="Don’t use all uppercase for emphasis." />
    </>
  );
}
