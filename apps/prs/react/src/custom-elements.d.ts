import type * as React from "react";
import type { GoabButtonType, GoabIconType } from "@abgov/ui-components-common";

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "goa-button": React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        > & {
          version?: string;
          type?: GoabButtonType;
          size?: string;
          variant?: string;
          leadingicon?: GoabIconType;
          trailingicon?: GoabIconType;
          width?: string;
          disabled?: string;
          testid?: string;
          action?: string;
          "action-arg"?: string;
          "action-args"?: string;
          mt?: string;
          mb?: string;
          ml?: string;
          mr?: string;
        };
      }
    }
  }
}

export { };
