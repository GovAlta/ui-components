import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ReactDOMServer from "react-dom/server";
import styles from "./Markdown.module.css";

export const Markdown = ({ content }) => {
  const [formattedContent, setFormattedContent] = useState<string>("");
  useEffect(() => {
    const fc = ReactDOMServer.renderToString(content)
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
