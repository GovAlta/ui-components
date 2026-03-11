import { useState, useEffect, useRef } from "react";
import { GoabxTabs, GoabxButton } from "@abgov/react-components/experimental";
import { GoabTab } from "@abgov/react-components";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import {
  extractReactCode,
  extractAngularCode,
  extractWebComponentsCode,
  type ExtractedReactCode,
  type ExtractedAngularCode,
  type ExtractedWebComponentsCode,
} from "../lib/extract-code-parts";
import {
  getFrameworkPreference,
  setFrameworkPreference,
  subscribeToFrameworkPreference,
  type Framework,
} from "../lib/framework-preference";

// Register languages
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("tsx", typescript);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("javascript", javascript);

interface AngularCode {
  ts?: string;
  template: string;
}

interface FrameworkCode {
  react?: string;
  angular?: AngularCode | string;
  webComponents?: string;
}

interface CodeSnippetProps {
  /** Single code string (simple mode) */
  code?: string;
  /** Multiple framework code options (switcher mode) */
  frameworkCode?: FrameworkCode;
  /** Initial framework when using frameworkCode */
  initialFramework?: Framework;
  language?: "tsx" | "typescript" | "html" | "css" | "javascript";
  showCopy?: boolean;
  showLineNumbers?: boolean;
  maxHeight?: number;
  title?: string;
  /** Extract and display CSS, setup, and JSX/template as separate blocks (default: true for frameworkCode) */
  extractParts?: boolean;
}

const FRAMEWORK_LABELS: Record<Framework, string> = {
  react: "React",
  angular: "Angular",
  webComponents: "Web Components",
};

// ============================================================================
// Single Code Block Component
// ============================================================================

interface SingleCodeBlockProps {
  code: string;
  language: string;
  title?: string;
  showCopy?: boolean;
  maxHeight?: number;
}

function SingleCodeBlock({
  code,
  language,
  title,
  showCopy = true,
  maxHeight,
}: SingleCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpand, setNeedsExpand] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const cleanedCode = cleanCode(code);

  // Syntax highlighting
  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.removeAttribute("data-highlighted");
      hljs.highlightElement(codeRef.current);
    }
  }, [cleanedCode]);

  // Detect whether expand button is needed using ResizeObserver.
  // A one-shot useEffect fails here because inside GoabxTabs, inactive tab
  // content is hidden (scrollHeight = 0). ResizeObserver fires when the
  // container becomes visible after a tab switch, so the measurement is reliable.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !maxHeight) return;

    const check = () => {
      setNeedsExpand(container.scrollHeight > maxHeight);
    };

    check();
    const observer = new ResizeObserver(check);
    observer.observe(container);
    return () => observer.disconnect();
  }, [cleanedCode, maxHeight]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={`code-block ${needsExpand && !isExpanded ? "has-gradient" : ""}`}>
      <div className="code-block-header">
        {title && <span className="code-block-title">{title}</span>}
        {showCopy && (
          <button
            className={`copy-button ${copied ? "copied" : ""}`}
            onClick={handleCopy}
            aria-label={copied ? "Copied!" : "Copy code"}
            title={copied ? "Copied!" : "Copy code"}
          >
            {copied ? (
              <svg
                className="copy-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg
                className="copy-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            )}
          </button>
        )}
      </div>
      <div
        ref={containerRef}
        className={`code-container ${isExpanded ? "expanded" : ""}`}
        style={{ maxHeight: isExpanded ? "none" : maxHeight ? `${maxHeight}px` : "none" }}
      >
        <pre>
          <code ref={codeRef} className={`language-${language}`}>
            {cleanedCode}
          </code>
        </pre>
      </div>
      {needsExpand && (
        <div className="expand-wrapper">
          <span className="expand-button-bg">
            <GoabxButton
              type="tertiary"
              size="compact"
              trailingIcon={isExpanded ? "chevron-up" : "chevron-down"}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Show less" : "Show more"}
            </GoabxButton>
          </span>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Main CodeSnippet Component
// ============================================================================

export function CodeSnippet({
  code,
  frameworkCode,
  initialFramework = "react",
  language = "tsx",
  showCopy = true,
  showLineNumbers = false,
  maxHeight,
  title,
  extractParts = true,
}: CodeSnippetProps) {
  // Initialize from global preference (falls back to initialFramework prop if not set)
  const [selectedFramework, setSelectedFramework] = useState<Framework>(() => {
    const stored = getFrameworkPreference();
    return stored || initialFramework;
  });
  const tabsRef = useRef<HTMLDivElement>(null);

  // Determine if we're in framework switcher mode
  const hasFrameworkSwitcher = !!frameworkCode;

  // Get available frameworks
  const availableFrameworks = hasFrameworkSwitcher
    ? (Object.keys(frameworkCode).filter(
      (k) => frameworkCode[k as Framework],
    ) as Framework[])
    : [];

  // Subscribe to global framework preference changes from other components.
  // Directly manipulate the tab DOM state without triggering focus or hash changes.
  useEffect(() => {
    return subscribeToFrameworkPreference((framework) => {
      if (availableFrameworks.length === 0 || availableFrameworks.includes(framework)) {
        setSelectedFramework(framework);

        // Directly switch goa-tabs without triggering focus
        if (tabsRef.current) {
          const goaTabs = tabsRef.current.querySelector("goa-tabs");
          if (goaTabs) {
            const targetIndex = availableFrameworks.indexOf(framework);
            const tabs = goaTabs.querySelectorAll('[role="tab"]');

            // Check if already on the correct tab
            const targetTab = tabs[targetIndex] as HTMLElement;
            if (targetTab && targetTab.getAttribute("aria-selected") === "true") {
              return; // Already selected, nothing to do
            }

            // Update tab button states (aria-selected, tabindex)
            tabs.forEach((tab, i) => {
              tab.setAttribute("aria-selected", i === targetIndex ? "true" : "false");
              tab.setAttribute("tabindex", i === targetIndex ? "0" : "-1");
            });

            // Tell each goa-tab content whether it should be open
            const tabContents = goaTabs.querySelectorAll("goa-tab");
            tabContents.forEach((content, i) => {
              content.dispatchEvent(
                new CustomEvent("tabs:set-open", {
                  composed: true,
                  detail: { open: i === targetIndex },
                }),
              );
            });
          }
        }
      }
    });
  }, [availableFrameworks]);

  // Listen for native tab change events (user clicking a tab in THIS component).
  // Broadcasts the change to all other CodeSnippet instances on the page.
  // Note: GoA tabs are 1-indexed, so we subtract 1 to get the array index
  useEffect(() => {
    if (!tabsRef.current || availableFrameworks.length <= 1) return;

    const handleTabChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab: number }>;
      const tabIndex = customEvent.detail?.tab;
      if (typeof tabIndex === "number") {
        const frameworkIndex = tabIndex - 1; // GoA tabs are 1-indexed
        if (availableFrameworks[frameworkIndex]) {
          // Broadcast to all other components and persist to localStorage
          setFrameworkPreference(availableFrameworks[frameworkIndex]);
        }
      }
    };

    const tabsElement = tabsRef.current.querySelector("goa-tabs");
    if (tabsElement) {
      tabsElement.addEventListener("_change", handleTabChange);
      return () => tabsElement.removeEventListener("_change", handleTabChange);
    }
  }, [availableFrameworks]);

  // Simple mode - single code block
  if (!hasFrameworkSwitcher) {
    return (
      <div className="code-snippet-wrapper">
        <div className="code-snippet">
          <SingleCodeBlock
            code={code || ""}
            language={language}
            title={title}
            showCopy={showCopy}
            maxHeight={maxHeight}
          />
        </div>
        <CodeSnippetStyles />
      </div>
    );
  }

  // Framework switcher mode with extraction
  const renderFrameworkBlocks = () => {
    if (!extractParts) {
      // Simple mode - just show the raw code for selected framework
      const rawCode = getFrameworkRawCode(frameworkCode, selectedFramework);
      const lang = selectedFramework === "react" ? "tsx" : "html";
      return (
        <SingleCodeBlock
          code={rawCode}
          language={lang}
          showCopy={showCopy}
          maxHeight={maxHeight}
        />
      );
    }

    // Extract and render multiple blocks based on framework
    switch (selectedFramework) {
      case "react":
        return renderReactBlocks(frameworkCode.react);
      case "angular":
        return renderAngularBlocks(frameworkCode.angular);
      case "webComponents":
        return renderWebComponentsBlocks(frameworkCode.webComponents);
      default:
        return null;
    }
  };

  const renderReactBlocks = (reactCode?: string) => {
    if (!reactCode) return <div className="no-code">No React code available</div>;

    const extracted = extractReactCode(reactCode);
    return (
      <>
        {extracted.css && (
          <SingleCodeBlock
            code={extracted.css}
            language="css"
            showCopy={showCopy}
            maxHeight={maxHeight}
          />
        )}
        {extracted.setup && (
          <SingleCodeBlock
            code={extracted.setup}
            language="tsx"
            showCopy={showCopy}
            maxHeight={maxHeight}
          />
        )}
        <SingleCodeBlock
          code={extracted.jsx}
          language="tsx"
          showCopy={showCopy}
          maxHeight={maxHeight}
        />
      </>
    );
  };

  const renderAngularBlocks = (angular?: AngularCode | string) => {
    if (!angular) return <div className="no-code">No Angular code available</div>;

    // Handle both string (legacy) and object format
    const angularObj: AngularCode =
      typeof angular === "string" ? { template: angular } : angular;

    const extracted = extractAngularCode(angularObj.ts, angularObj.template);
    return (
      <>
        {extracted.css && (
          <SingleCodeBlock
            code={extracted.css}
            language="css"
            showCopy={showCopy}
            maxHeight={maxHeight}
          />
        )}
        {extracted.typescript && (
          <SingleCodeBlock
            code={extracted.typescript}
            language="typescript"
            showCopy={showCopy}
            maxHeight={maxHeight}
          />
        )}
        <SingleCodeBlock
          code={extracted.template}
          language="html"
          showCopy={showCopy}
          maxHeight={maxHeight}
        />
      </>
    );
  };

  const renderWebComponentsBlocks = (webComponentsCode?: string) => {
    if (!webComponentsCode)
      return <div className="no-code">No Web Components code available</div>;

    const extracted = extractWebComponentsCode(webComponentsCode);
    return (
      <>
        {extracted.css && (
          <SingleCodeBlock
            code={extracted.css}
            language="css"
            showCopy={showCopy}
            maxHeight={maxHeight}
          />
        )}
        {extracted.javascript && (
          <SingleCodeBlock
            code={extracted.javascript}
            language="javascript"
            showCopy={showCopy}
            maxHeight={maxHeight}
          />
        )}
        <SingleCodeBlock
          code={extracted.html}
          language="html"
          showCopy={showCopy}
          maxHeight={maxHeight}
        />
      </>
    );
  };

  // Helper to render code blocks for a specific framework
  const renderBlocksForFramework = (fw: Framework) => {
    if (!extractParts) {
      const rawCode = getFrameworkRawCode(frameworkCode, fw);
      const lang = fw === "react" ? "tsx" : "html";
      return (
        <SingleCodeBlock
          code={rawCode}
          language={lang}
          showCopy={showCopy}
          maxHeight={maxHeight}
        />
      );
    }

    switch (fw) {
      case "react":
        return renderReactBlocks(frameworkCode.react);
      case "angular":
        return renderAngularBlocks(frameworkCode.angular);
      case "webComponents":
        return renderWebComponentsBlocks(frameworkCode.webComponents);
      default:
        return null;
    }
  };

  return (
    <div className="code-snippet-wrapper">
      {availableFrameworks.length > 1 ? (
        // Multiple frameworks - use tabs with content inside
        <div className="framework-switcher" ref={tabsRef}>
          <GoabxTabs
            variant="segmented"
            initialTab={availableFrameworks.indexOf(selectedFramework) + 1}
            orientation="horizontal"
          >
            {availableFrameworks.map((fw) => (
              <GoabTab key={fw} heading={FRAMEWORK_LABELS[fw]}>
                <div className="code-snippet">
                  <div className="code-blocks">{renderBlocksForFramework(fw)}</div>
                </div>
              </GoabTab>
            ))}
          </GoabxTabs>
        </div>
      ) : (
        // Single framework - no tabs needed
        <div className="code-snippet">
          <div className="code-blocks">{renderFrameworkBlocks()}</div>
        </div>
      )}

      <CodeSnippetStyles />
    </div>
  );
}

// ============================================================================
// Helpers
// ============================================================================

function cleanCode(raw: string): string {
  const lines = raw.split("\n");
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  const minIndent = lines
    .filter((line) => line.trim())
    .reduce((min, line) => {
      const match = line.match(/^(\s*)/);
      return match ? Math.min(min, match[1].length) : min;
    }, Infinity);
  return lines
    .map((line) => line.slice(minIndent === Infinity ? 0 : minIndent))
    .join("\n");
}

function getFrameworkRawCode(frameworkCode: FrameworkCode, framework: Framework): string {
  switch (framework) {
    case "react":
      return frameworkCode.react || "";
    case "angular":
      const angular = frameworkCode.angular;
      if (typeof angular === "string") return angular;
      return angular?.template || "";
    case "webComponents":
      return frameworkCode.webComponents || "";
    default:
      return "";
  }
}

// ============================================================================
// Styles Component
// ============================================================================

function CodeSnippetStyles() {
  return (
    <style>{`
      .code-snippet {
        border: 1px solid var(--goa-color-greyscale-200, #dcdcdc);
        border-radius: var(--goa-border-radius-m, 4px);
        overflow: hidden;
        background: var(--goa-color-greyscale-100, #f1f1f1);
        font-size: var(--goa-font-size-2);
      }

      .framework-switcher .code-snippet {
        margin-top: calc(-2rem + 12px);
      }

      .code-blocks {
        display: flex;
        flex-direction: column;
        gap: 1px;
        background: var(--goa-color-greyscale-200, #dcdcdc);
      }

      .code-block {
        background: var(--goa-color-greyscale-100, #f1f1f1);
        position: relative;
      }

      .code-block-header {
        position: absolute;
        top: var(--goa-space-xs, 0.25rem);
        right: var(--goa-space-s, 0.5rem);
        z-index: 1; /* Above code content so copy button is clickable */
      }

      .code-block-title {
        font-size: 0.75rem;
        font-weight: var(--goa-font-weight-semi-bold);
        color: var(--goa-color-text-secondary, #666);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .copy-button {
        background: var(--goa-color-greyscale-white);
        border: 1px solid var(--goa-color-greyscale-200, #dcdcdc);
        color: var(--goa-color-interactive-default, #0070c4);
        width: 28px;
        height: 28px;
        border-radius: var(--goa-border-radius-xs);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.15s;
      }

      .copy-button:hover {
        background: var(--goa-color-greyscale-100, #f1f1f1);
        border-color: var(--goa-color-interactive-default, #0070c4);
      }

      .copy-button.copied {
        background: var(--goa-color-status-success, #2e7d32);
        border-color: var(--goa-color-status-success, #2e7d32);
        color: var(--goa-color-greyscale-white);
      }

      .copy-icon {
        width: 16px;
        height: 16px;
      }

      .code-container {
        overflow: hidden;
        transition: max-height 0.3s ease;
      }

      .code-container.expanded {
        overflow: auto;
      }

      .code-block.has-gradient .code-container {
        -webkit-mask-image: linear-gradient(to bottom, black 0%, black 60%, transparent 100%);
        mask-image: linear-gradient(to bottom, black 0%, black 60%, transparent 100%);
      }

      pre {
        margin: 0;
        padding: var(--goa-space-m, 1rem);
        overflow-x: auto;
      }

      code {
        font-family: 'SF Mono', Monaco, 'Courier New', monospace;
        line-height: 1.6;
        background: transparent !important;
        padding: 0 !important;
      }

      .expand-wrapper {
        display: flex;
        justify-content: center;
        padding: var(--goa-space-s, 0.5rem) 0;
        position: relative;
        margin-top: -2rem;
      }

      .expand-button-bg {
        background: var(--goa-color-greyscale-100, #f1f1f1);
      }

      .no-code {
        padding: var(--goa-space-m, 1rem);
        color: var(--goa-color-text-secondary, #666);
        font-style: italic;
      }

      /* Highlight.js theme */
      .hljs {
        color: var(--goa-color-text-default, #333);
        background: transparent;
      }
      .hljs-keyword { color: #0550ae; }
      .hljs-string { color: #4b7c41; }
      .hljs-number { color: #0550ae; }
      .hljs-comment { color: #6e7781; }
      .hljs-tag { color: #0550ae; }
      .hljs-attr { color: #0550ae; }
      .hljs-name { color: #2b7c5f; }
      .hljs-built_in { color: #6639ba; }
      .hljs-title { color: #6639ba; }
      .hljs-params { color: #953800; }
    `}</style>
  );
}

export default CodeSnippet;
