import React, { useState } from "react";

import { GoabIconButton } from "@abgov/react-components";

interface Props {
  code: string;
  className?: string;
}

export const TokenSnippet: React.FC<Props> = ({ code, className }) => {
  const [isCopied, setIsCopied] = useState(false);

  function copyCode() {
    let codeToCopy = `--${code}`;
    navigator.clipboard.writeText(codeToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }

  return (
    <>
    <div className={`goa-token-snippet ${className || ""}`}>
      <GoabIconButton ml="xs" mt="3xs" size="small" icon={isCopied ? "checkmark" :  "copy"} onClick={copyCode} />
    </div>
    <style>{`
      .goa-token-snippet {
        display: flex;
        flex-wrap: nowrap;
        align-items: start;
        white-space: nowrap;
        max-width: 260px;
      }

      .goa-token-snippet a {
        font-family: var(--goa-font-family-sans), serif;
        display: flex;
        align-items: center;
        text-decoration: none;
      }

      .goa-token-snippet .copy-feedback {
        background-color: var(--goa-color-greyscale-100);
        color: var(--goa-color-interactive-default);
        border-radius: 4px;
        padding: 4px 8px;
        z-index: 9999;
        margin-left: 8px;
      }

      .mobile-token-view {
        margin-top: 16px;
      }
    `}
    </style>
    </>
  );
};
