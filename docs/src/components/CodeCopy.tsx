import React, { useState } from "react";

import { GoabIconButton } from "@abgov/react-components";

interface Props {
  code: string;
  className?: string;
}

export const CodeCopy: React.FC<Props> = ({ code, className }) => {
  const [isCopied, setIsCopied] = useState(false);

  function copyCode() {
    let codeToCopy = `${code}`;
    navigator.clipboard.writeText(codeToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }

  return (
    <>
      <div className={`goa-code-copy ${className || ""}`}>
        <GoabIconButton
          ml="xs"
          mt="3xs"
          size="small"
          icon={isCopied ? "checkmark" : "copy"}
          onClick={copyCode}
        />
      </div>
    </>
  );
};
