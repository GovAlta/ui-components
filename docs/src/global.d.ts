/**
 * Global type declarations for GoA Web Components
 *
 * These declarations allow using goa-* web components directly in JSX
 * without TypeScript errors.
 */

import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'goa-icon': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          type?: string;
          size?: string;
          version?: string;
        },
        HTMLElement
      >;
      'goa-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          type?: string;
          size?: string;
          variant?: string;
          disabled?: boolean;
          version?: string;
          leadingIcon?: string;
          trailingIcon?: string;
          // Web component attribute names (lowercase)
          leadingicon?: string;
          trailingicon?: string;
        },
        HTMLElement
      >;
      'goa-input': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          type?: string;
          name?: string;
          value?: string;
          placeholder?: string;
          width?: string;
          disabled?: boolean;
          version?: string;
        },
        HTMLElement
      >;
      'goa-dropdown': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          name?: string;
          value?: string;
          placeholder?: string;
          version?: string;
        },
        HTMLElement
      >;
      'goa-dropdown-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string;
          label?: string;
        },
        HTMLElement
      >;
    }
  }
}
