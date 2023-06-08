import { GoAButton, GoADetails } from "@abgov/react-components";
import * as React from "react";
import { useState } from "react";

export default function Details() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <GoAButton onClick={() => setOpen(!open)}>Toggle Details</GoAButton>
      <GoADetails heading="This is the title" open={open}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel
          lacinia metus, sed sodales lectus. Aliquam sed volutpat velit. Sed in
          lacus ut dui placerat accumsan malesuada quis erat. Aenean mi diam,
          rhoncus vitae justo eu, venenatis maximus nunc. In vel est commodo,
          porttitor sem vel, tincidunt ipsum. In hac habitasse platea dictumst.
          Mauris varius mollis dui. Aenean ut dui eu arcu rutrum auctor.
          Curabitur cursus velit vel libero sollicitudin tincidunt. Proin
          tincidunt, enim et ultrices rhoncus, nibh leo imperdiet sapien, sed
          porttitor ipsum nulla non massa. Nulla facilisi.
        </p>
      </GoADetails>
    </>
  );
}
