import { render } from "@testing-library/react";

import GoADivider, { DividerSpacing } from "./divider";

describe("Divider", () =>
  describe("type", () => {
    ["small", "medium", "large", "none"].forEach((spacing: DividerSpacing) => {
      it(`should render ${spacing} notification`, async function () {
        const { baseElement } = render(<GoADivider spacing={spacing} />);
        expect(baseElement).toBeTruthy();
      });
    });
  }));
