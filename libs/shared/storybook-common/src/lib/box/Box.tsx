import React from "react";

export const Box = ({ children }) => {
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
