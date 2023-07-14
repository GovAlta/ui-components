import React, { FC, ReactNode } from "react";
import "./BestPractice.css";


interface Props {
  children?: ReactNode;
  description?: string;
}

export const BestPractices: FC<Props> = ({ children }) => {
  return (
    <div className="best-practices">
      <div className="best-practices-title">Best Practices</div>
      <ul className="best-practices-items">{children}</ul>
    </div>
  );
};

export const BestPracticeItem: FC<Props> = ({ description }) => {
  return (
    <li className="best-practice-item">
      <span>{description}</span>
    </li>
  );
};
