import { useState } from "react";
import { GoabBlock, GoabIconButton, GoabTooltip } from "@abgov/react-components";

export function CopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  function copyCode() {
    const codeToCopy = "$goa-color-interactive-default";
    navigator.clipboard.writeText(codeToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    });
  }

  return (
    <>
      <style>{`
        .token-block {
          background-color: var(--goa-color-interactive-default);
          height: 22px;
          width: 24px;
          border-radius: var(--goa-border-radius-s);
        }
      `}</style>

      <GoabBlock alignment="center">
        <div className="token-block" />
        <span>$goa-color-interactive-default</span>
        <GoabTooltip content={isCopied ? "Copied" : "Copy?"} position="top">
          <GoabIconButton icon="copy" onClick={copyCode} mt="2xs" />
        </GoabTooltip>
      </GoabBlock>
    </>
  );
}
