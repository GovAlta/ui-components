/**
 * Global type declarations for GoA Web Components
 *
 * These declarations allow using goa-* web components directly in JSX
 * without TypeScript errors.
 *
 * Each entry here represents a gap in the React wrappers. When the wrapper
 * is fixed, remove the corresponding entry and update the component code.
 */

import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      // TODO: Remove when GoabBadge wrapper supports V2 types (dawn, sky, prairie, etc.)
      // See: https://github.com/GovAlta/ui-components/issues/3385
      "goa-badge": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          version?: string;
          type?: string;
          content?: string;
          emphasis?: string;
        },
        HTMLElement
      >;
      // TODO: Remove when GoabTable renders V2 styling correctly
      // See: https://github.com/GovAlta/ui-components/issues/3384
      "goa-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          version?: string;
          width?: string;
          variant?: string;
          ref?: React.RefObject<HTMLElement>;
        },
        HTMLElement
      >;
      // TODO: Remove when GoabTableSortHeader wrapper exposes sortOrder prop
      "goa-table-sort-header": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          version?: string;
          name?: string;
          direction?: string;
        },
        HTMLElement
      >;
      // TODO: Remove when GoabTabs wrapper exposes updateUrl and stackOnMobile props
      "goa-tabs": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          version?: string;
          variant?: string;
          initialtab?: number;
          updateurl?: string;
          stackonmobile?: string;
          ref?: React.RefObject<HTMLElement>;
        },
        HTMLElement
      >;
      "goa-tab": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          heading?: string;
        },
        HTMLElement
      >;
    }
  }
}
