/**
 * Global type declaration for the GoA Badge Web Component used directly in React JSX.
 *
 * This docs-only declaration allows badge types whose usage in the documentation
 * is broader than the corresponding React wrapper type.
 */

import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "goa-badge": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          type?: string;
          content?: string;
          emphasis?: string;
          icon?: string;
        },
        HTMLElement
      >;
    }
  }
}
