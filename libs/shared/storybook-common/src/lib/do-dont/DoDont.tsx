import React from "react";
import { Callout } from "../callout/Callout";

/**
 * Show a list Do's and Don'ts in a callout format.
 * @property {string} dos The "do's content text"
 * @property {string} donts The "dont's content text"
 */
export const DoDont = ({ dos, donts }) => {
  return (
    <div>
      <Callout positive={true} content={dos} />
      <Callout positive={false} content={donts} />
    </div>
  );
};

export const Do = ({ description }) => {
  return <Callout positive={true} content={description} />;
};

export const Dont = ({ description }) => {
  return <Callout positive={false} content={description} />;
};
