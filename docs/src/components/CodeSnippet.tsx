import { useState, useEffect, useRef } from "react";
import { GoabButton, GoabTab, GoabTabs } from "@abgov/react-components";

import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import {
  extractReactCode,
  extractAngularClassBody,
  extractWebComponentsCode,
} from "../lib/extract-code-parts";
import {
  getFrameworkPreference,
  setFrameworkPreference,
  subscribeToFrameworkPreference,
  type Framework,
} from "../lib/framework-preference";
import type {
  ReactExample,
  AngularExample,
  WebComponentsExample,
} from "../data/configurations/types";
import "./CodeSnippet.css";

// Register languages
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("tsx", typescript);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("javascript", javascript);

export type Language = "tsx" | "typescript" | "javascript" | "html" | "css";

interface FrameworkCode {
  react?: string | ReactExample;
  angular?: string | AngularExample | AngularExample[];
  webComponents?: string | WebComponentsExample;
}

interface CodeSnippetProps {
  /** Single code string (simple mode) */
  code?: string;
  /** Multiple framework code options (switcher mode) */
  frameworkCode?: FrameworkCode;
  /** Initial framework when using frameworkCode */
  initialFramework?: Framework;
  language?: Language;
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
  language: Language;
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
  // A one-shot useEffect fails here because inside GoabTabs, inactive tab
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
            <GoabButton
              type="tertiary"
              size="compact"
              trailingIcon={isExpanded ? "chevron-up" : "chevron-down"}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Show less" : "Show more"}
            </GoabButton>
          </span>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Main CodeSnippet Component
// ============================================================================

const VALID_FRAMEWORKS: Framework[] = ["react", "angular", "webComponents"];

export function CodeSnippet({
  code,
  frameworkCode,
  initialFramework = "react",
  language = "tsx",
  showCopy = true,
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

  const availableFrameworks: Framework[] = hasFrameworkSwitcher
    ? VALID_FRAMEWORKS.filter((k) => Boolean(frameworkCode[k]))
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
      </div>
    );
  }

  // Framework switcher mode with extraction
  const renderFrameworkBlocks = () => {
    if (!extractParts) {
      // Simple mode - just show the raw code for selected framework
      const rawCode = getFrameworkRawCode(frameworkCode, selectedFramework);
      const lang: Language = selectedFramework === "react" ? "tsx" : "html";
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

  /**
   * Wrap a single code block in a standalone .code-snippet box so multiple
   * blocks within one tab render as separate boxes with visible spacing.
   */
  const wrapCodeBlock = (code: string, language: Language, key?: string | number) => (
    <div className="code-snippet" key={key}>
      <div className="code-blocks">
        <SingleCodeBlock
          code={code}
          language={language}
          showCopy={showCopy}
          maxHeight={maxHeight}
        />
      </div>
    </div>
  );

  const renderReactBlocks = (react?: string | ReactExample) => {
    if (!react) return <div className="no-code">No React code available</div>;

    // Object form: use fields directly (WYSIWYG)
    if (typeof react !== "string") {
      return (
        <>
          {react.css && wrapCodeBlock(react.css, "css", "css")}
          {react.ts && wrapCodeBlock(react.ts, "tsx", "ts")}
          {wrapCodeBlock(react.jsx, "tsx", "jsx")}
        </>
      );
    }

    // String form: parse via extractor (legacy + simple snippets)
    const extracted = extractReactCode(react);
    return (
      <>
        {extracted.css && wrapCodeBlock(extracted.css, "css", "css")}
        {extracted.setup && wrapCodeBlock(extracted.setup, "tsx", "setup")}
        {wrapCodeBlock(extracted.jsx, "tsx", "jsx")}
      </>
    );
  };

  /**
   * Render Angular code in any of its three forms:
   * - string: template-only legacy snippet
   * - AngularExample: single class body + template
   * - AngularExample[]: multiple form binding patterns, each with title heading
   */
  const renderAngularBlocks = (angular?: string | AngularExample | AngularExample[]) => {
    if (!angular) return <div className="no-code">No Angular code available</div>;

    if (typeof angular === "string") {
      return wrapCodeBlock(angular, "html", "template");
    }

    if (Array.isArray(angular)) {
      return (
        <>
          {angular.map((example, idx) => {
            const tsBody = example.ts ? extractAngularClassBody(example.ts) : undefined;
            return (
              <div key={idx} className="angular-variant">
                {example.title && (
                  <h4 className="angular-variant-title">{example.title}</h4>
                )}
                {example.css && wrapCodeBlock(example.css, "css", "css")}
                {tsBody && wrapCodeBlock(tsBody, "typescript", "ts")}
                {wrapCodeBlock(example.template, "html", "template")}
              </div>
            );
          })}
        </>
      );
    }

    // Single AngularExample object form
    const tsBody = angular.ts ? extractAngularClassBody(angular.ts) : undefined;
    return (
      <>
        {angular.css && wrapCodeBlock(angular.css, "css", "css")}
        {tsBody && wrapCodeBlock(tsBody, "typescript", "ts")}
        {wrapCodeBlock(angular.template, "html", "template")}
      </>
    );
  };

  const renderWebComponentsBlocks = (wc?: string | WebComponentsExample) => {
    if (!wc) return <div className="no-code">No Web Components code available</div>;

    // Object form: use fields directly
    if (typeof wc !== "string") {
      return (
        <>
          {wc.css && wrapCodeBlock(wc.css, "css", "css")}
          {wc.js && wrapCodeBlock(wc.js, "javascript", "js")}
          {wrapCodeBlock(wc.html, "html", "html")}
        </>
      );
    }

    // String form: parse via extractor (handles inline <style> and <script>)
    const extracted = extractWebComponentsCode(wc);
    return (
      <>
        {extracted.css && wrapCodeBlock(extracted.css, "css", "css")}
        {extracted.javascript && wrapCodeBlock(extracted.javascript, "javascript", "js")}
        {wrapCodeBlock(extracted.html, "html", "html")}
      </>
    );
  };

  // Helper to render code blocks for a specific framework
  const renderBlocksForFramework = (fw: Framework) => {
    if (!extractParts) {
      const rawCode = getFrameworkRawCode(frameworkCode, fw);
      const lang: Language = fw === "react" ? "tsx" : "html";
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
        // Multiple frameworks - use tabs with content inside.
        // Renderers always emit per-block .code-snippet wrappers themselves,
        // so we don't add an outer wrap here.
        <div className="framework-switcher" ref={tabsRef}>
          <GoabTabs
            variant="segmented"
            initialTab={availableFrameworks.indexOf(selectedFramework) + 1}
            orientation="horizontal"
          >
            {availableFrameworks.map((fw) => (
              <GoabTab key={fw} heading={FRAMEWORK_LABELS[fw]}>
                {renderBlocksForFramework(fw)}
              </GoabTab>
            ))}
          </GoabTabs>
        </div>
      ) : (
        // Single framework - no tabs, renderer provides its own wrappers
        renderFrameworkBlocks()
      )}
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
    case "react": {
      const react = frameworkCode.react;
      if (!react) return "";
      return typeof react === "string" ? react : react.jsx;
    }
    case "angular": {
      const angular = frameworkCode.angular;
      if (!angular) return "";
      if (typeof angular === "string") return angular;
      // For array form (form patterns), show the first example's template
      if (Array.isArray(angular)) return angular[0]?.template ?? "";
      return angular.template;
    }
    case "webComponents": {
      const wc = frameworkCode.webComponents;
      if (!wc) return "";
      return typeof wc === "string" ? wc : wc.html;
    }
    default:
      return "";
  }
}

export default CodeSnippet;
