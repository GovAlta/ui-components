import React, { CSSProperties, FC, ReactElement } from "react";

interface Props {
  gap?: 'small' | 'medium' | 'large';
  minWidth?: number | string;
}

export const GoAFlexRow: FC<Props> = ({ gap, minWidth, children }) => {
  const style: CSSProperties = {
    gap: gap === 'small' ? '1rem' : gap === 'medium' ? '2rem' : gap === 'large' ? '3rem' : '0'
  };

  const getChildren = () => {
    if (!children) {
      return null;
    }
    return React.Children.map(children as ReactElement, (child: ReactElement) => {
      return React.cloneElement(child, {
        style: {
          flexBasis: minWidth,
          ...child.props.style,
        }
      });
    });
  };

  return (
    <div className="goa-flex-row" style={style}>{getChildren()}</div>
  );
}

export default GoAFlexRow;
