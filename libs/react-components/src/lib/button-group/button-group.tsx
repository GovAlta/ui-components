import React, { FC } from 'react';
import './button-group.css';
import 'goa-web-components'

type Alignment = "start" | "end";

interface WCProps {
  alignment?: Alignment;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-button-group': WCProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

type ButtonGroupProps = {
  alignment: Alignment;
};

export const GoAButton: FC<ButtonGroupProps> = ({ alignment, children }) => {
  return (
    <goa-button-group alignment={alignment}>
      {children}
    </goa-button-group>
  );
};

export default GoAButton;
