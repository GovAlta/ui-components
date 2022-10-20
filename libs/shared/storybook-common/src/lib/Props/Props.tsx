import React, { FC } from "react";
import { Tab, Tabs } from "../tabs/Tabs";
import "./Props.css";

interface Props {
  showTabs?: boolean;
}

export const Props: FC<Props> = (props) => {
  const table = (children: React.ReactNode) => (
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
      <tbody>{children}</tbody>
    </table>
  );

  const filterBy = (children: React.ReactNode, lang: string) => {
    const _children = React.Children.toArray(children);
    return _children.filter((child: React.ReactElement) => {
      return !child.props["lang"] || child.props["lang"] === lang;
    });
  };

  if (props.showTabs) {
    return (
      <Tabs>
        <Tab label="Angular">{table(filterBy(props.children, "angular"))}</Tab>
        <Tab label="React">{table(filterBy(props.children, "react"))}</Tab>
      </Tabs>
    );
  }

  return table(props.children);
};

export default Props;
