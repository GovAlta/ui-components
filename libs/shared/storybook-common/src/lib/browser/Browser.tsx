import React from "react";

export const Browser = (props: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "3px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ddd",
          height: "24px",
          padding: "2px",
          display: "flex",
          alignItems: "center",
          paddingLeft: "8px",
          gap: "6px",
        }}
      >
        <div
          style={{
            height: "12px",
            width: "12px",
            borderRadius: "12px",
            backgroundColor: "#f06152",
          }}
        ></div>
        <div
          style={{
            height: "12px",
            width: "12px",
            borderRadius: "12px",
            backgroundColor: "#f7c230",
          }}
        ></div>
        <div
          style={{
            height: "12px",
            width: "12px",
            borderRadius: "12px",
            backgroundColor: "#53cc37",
          }}
        ></div>
      </div>
      {props.children}
    </div>
  );
};
