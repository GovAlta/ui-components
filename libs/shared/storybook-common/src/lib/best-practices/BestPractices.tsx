import React from "react";
import "./BestPractice.css";

export const BestPractices = ({ children }) => {
  return (
    <div className="best-practices">
      <div className="best-practices-title">Best Practices</div>
      <ul className="best-practices-items">{children}</ul>
    </div>
  );
};

export const BestPracticeItem = ({ description }) => {
  return (
    <li className="best-practice-item">
      <span>{description}</span>
    </li>
  );
};
