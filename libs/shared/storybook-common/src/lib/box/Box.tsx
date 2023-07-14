import React, { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const Box: FC<Props> = ({ children }) => {
  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "rgba(0, 150, 255, 0.2)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
};
