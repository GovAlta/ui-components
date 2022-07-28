import React, { FC } from "react";
import "./Props.css";

export const Props: FC = ({ children }) => {
  return (
    <table className="props">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Required</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        { children }
      </tbody>
    </table>
  );
}

export default Props;
