/**
 * PortalDrawer.tsx
 *
 * A wrapper around GoabxDrawer that renders via a React portal at the body level.
 * This ensures the drawer overlay appears above all other content regardless of
 * stacking contexts in the DOM hierarchy.
 */

import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { GoabxDrawer, GoabxDrawerProps } from '@abgov/react-components/experimental';

export function PortalDrawer(props: GoabxDrawerProps): ReactNode {
  // Render the drawer at the body level to escape any stacking contexts
  return createPortal(
    <GoabxDrawer {...props} />,
    document.body
  );
}

export default PortalDrawer;
