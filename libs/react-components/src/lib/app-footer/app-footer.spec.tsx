import React from "react";
import { render } from "@testing-library/react";
import GoAAppFooter, { Props as AppFooterProps }  from "./app-footer";
import Props from "./app-footer";

describe("GoA AppFooter", () => {

  it("should render", () => {

    const props: AppFooterProps = {
      id: "abc",
      appUrl: "http://alberta.ca/design-systems",
      title: "design systems",
      copyrightUrl: "http://alberta.ca/design-systems/copy-right",
      copyrightText: "xyz"
    }

    const { container } = render(<GoAAppFooter {...props} children="tags go here" />);

    const footer = container.querySelector("goa-app-footer");
    expect(footer).toBeTruthy();

    expect(footer.getAttribute('id')).toBe('abc');
    expect(footer.getAttribute('appUrl')).toBe("http://alberta.ca/design-systems");
    expect(footer.getAttribute('title')).toBe("design systems");
    expect(footer.getAttribute('copyrightUrl')).toBe("http://alberta.ca/design-systems/copy-right");
    expect(footer.getAttribute('copyrightText')).toBe("xyz");
    expect(footer.innerHTML).toBe("tags go here");
  });

});
