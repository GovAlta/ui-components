import React, { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ReactDOMServer from "react-dom/server";
import styles from "./Markdown.module.css";

interface Props {
  content?: ReactNode;
}

export const Markdown: FC<Props> = ({ content }) => {
  const [formattedContent, setFormattedContent] = useState<string>("");
  useEffect(() => {
    const fc = ReactDOMServer.renderToString(content as ReactElement)
      .replace(/\+\+/g, "❘")
      .split("\n")
      .map((line) => line.trim())
      .join("\n");

    setFormattedContent(fc);
  }, [content]);

  return (
    <ReactMarkdown
      className={styles["markdown-table"]}
      remarkPlugins={[remarkGfm]}
    >
      {formattedContent}
    </ReactMarkdown>
  );
};

export default Markdown;
