import React, { FC } from "react";

type Props = {
  name: string;
  type: string;
  lang: string;
  required: boolean;
  description: string;
  defaultValue: string;
};

export const Prop: FC<Props> = ({
  name,
  type,
  lang,
  required,
  defaultValue,
  description,
}) => {
  const formatTypes = () => {
    return type
      .split("|")
      .map((t) => t.trim())
      .join(" | ");
  };

  return (
    <tr>
      <td>
        <code>{name}</code>
      </td>
      <td>
        <code>{formatTypes()}</code>
      </td>
      <td>{required ? "Yes" : "No"}</td>
      <td>{defaultValue}</td>
      <td>{description}</td>
    </tr>
  );
};

export default Prop;
