import React, { CSSProperties, FC, ReactElement } from "react";

interface Props {
  title?: string;
  description?: string;

  state: Record<string, string>;
}

const style: CSSProperties = {
  display: "flex",
  backgroundColor: "#eee",
  borderRadius: "8px",
  padding: "0 1rem",
  gap: "1rem",
};

const elStyle: CSSProperties = {
  flex: "1 1 50%",
};

const preStyle: CSSProperties = {
  padding: "1rem",
  backgroundColor: "white",
  borderRadius: "4px",
  flex: "0 0 40ch",
  overflow: "auto",
};

const exampleChild: CSSProperties = {
  marginBottom: "1rem",
};

export const StateDisplay: FC<Props> = ({
  children,
  title,
  description,
  state,
}) => {
  return (
    <>
      {title && <h3>{title}</h3>}
      {description && <p>{description}</p>}
      <div style={style}>
        <div style={elStyle}>
          <h4>Component</h4>
          {React.Children.map(children, (child: ReactElement) => (
            <div style={exampleChild}>
              {React.cloneElement(child, { ...child.props })}
            </div>
          ))}
        </div>
        <div style={elStyle}>
          <h4>State</h4>
          <pre style={preStyle}>{JSON.stringify(state, null, 2)}</pre>
        </div>
      </div>
    </>
  );
};

export default StateDisplay;
