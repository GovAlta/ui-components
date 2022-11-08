import React, { FC } from "react";
import "./button-group.css";

type Alignment = "start" | "end" | "center";
export type Gap = "relaxed" | "compact";

interface WCProps {
  alignment: Alignment;
  gap?: Gap;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-button-group": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

type ButtonGroupProps = {
  alignment: Alignment;
  gap?: Gap;
  children?: React.ReactNode;
};

export const GoAButtonGroup: FC<ButtonGroupProps> = ({
  alignment,
  gap,
  children,
}) => {
  return (
    <goa-button-group alignment={alignment} gap={gap}>
      {children}
    </goa-button-group>
  );
};

export default GoAButtonGroup;
