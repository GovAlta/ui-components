/**
 * ExamplePreview Component
 *
 * Displays a complete example with:
 * 1. Header: Title + copy link + optional Figma link
 * 2. Live preview (renders web components)
 * 3. Code tabs (React / Angular / Web Components)
 *
 * Reusable anywhere - component pages, example pages, embedded in docs.
 */

import { useState, useEffect, useRef } from "react";
import { CodeSnippet } from "./CodeSnippet";
import type { ExampleCode } from "../lib/example-code";
import DOMPurify from "dompurify";

// Allow GoA web component custom elements through DOMPurify.
// By default, DOMPurify strips all custom elements (tags containing hyphens).
// Our previews render <goa-*> web components, so we must whitelist them.
const DOMPURIFY_CONFIG = {
  ADD_TAGS: ["style"], // allow example-authored <style> blocks through (CSS content still sanitised)
  FORCE_BODY: true, // parse input as body content so <style> tags are kept in place (not moved to head)
  CUSTOM_ELEMENT_HANDLING: {
    tagNameCheck: /^goa-/, // allow all <goa-*> elements
    attributeNameCheck: () => true, // allow their attributes (type, name, label, etc.)
  },
};

interface ExamplePreviewProps {
  /** Example title */
  title: string;
  /** Example slug for anchor link */
  slug: string;
  /** Code for each framework */
  code: ExampleCode;
  /** Optional Figma URL */
  figmaUrl?: string;
  /** Max height for code snippets before "show more" */
  codeMaxHeight?: number;
  /** Remove side padding for full-width components like callouts */
  fullWidth?: boolean;
  /** Inline CSS override for preview container (e.g. "padding: 0; max-height: 600px") */
  previewStyle?: string;
  /** Title size - 'large' for standalone example pages, 'small' for embedded examples */
  titleSize?: "large" | "small";
}

export function ExamplePreview({
  title,
  slug,
  code,
  figmaUrl,
  codeMaxHeight = 200,
  fullWidth = false,
  previewStyle,
  titleSize = "small",
}: ExamplePreviewProps) {
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const anchorId = `example-${slug}`;

  // Render web components preview
  useEffect(() => {
    if (previewRef.current && code.webComponents) {
      // Extract script content before stripping
      const scriptMatch = code.webComponents.match(/<script>([\s\S]*?)<\/script>/i);
      const scriptContent = scriptMatch ? scriptMatch[1] : null;

      // Sanitize HTML and add version attribute
      // DOMPurify handles script removal — no need for regex stripping
      const html = code.webComponents
        .replace(/<goa-([a-z-]+)/g, '<goa-$1 version="2"')
        .trim();
      const safeHtml = DOMPurify.sanitize(html, DOMPURIFY_CONFIG);
      previewRef.current.innerHTML = safeHtml;

      // Execute script content after HTML is rendered
      if (scriptContent) {
        try {
          // Scope the script to find elements within this preview container
          // Use a unique name to avoid collision with script variables
          const __preview__ = previewRef.current;
          const scopedScript = scriptContent
            // Replace document.getElementById with container-scoped querySelector
            .replace(
              /document\.getElementById\s*\(\s*["']([^"']+)["']\s*\)/g,
              (_, id) => `__preview__.querySelector("#${id}")`,
            )
            // Replace document.querySelector with scoped version
            .replace(
              /document\.querySelector\s*\(\s*["']([^"']+)["']\s*\)/g,
              (_, selector) => `__preview__.querySelector("${selector}")`,
            )
            // Replace document.querySelectorAll with scoped version
            .replace(
              /document\.querySelectorAll\s*\(\s*["']([^"']+)["']\s*\)/g,
              (_, selector) => `__preview__.querySelectorAll("${selector}")`,
            );

          // Execute the script with preview container in scope
          const fn = new Function("__preview__", scopedScript);
          fn(__preview__);
        } catch (err) {
          console.error("Error executing example script:", err);
        }
      }
    }
  }, [code.webComponents]);

  // Handle copy link
  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${anchorId}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div className="example-preview">
      {/* Header */}
      <div className="example-header">
        {titleSize === "large" ? (
          <h1 id={anchorId} className="example-title example-title--large">
            {title}
          </h1>
        ) : (
          <h3 id={anchorId} className="example-title">
            {title}
          </h3>
        )}
        <div className="example-actions">
          <button
            className={`copy-link-button ${copied ? "copied" : ""}`}
            onClick={handleCopyLink}
            aria-label="Copy link to this example"
            title="Copy link"
          >
            {copied ? (
              <goa-icon version="2" type="checkmark" size="small"></goa-icon>
            ) : (
              <goa-icon version="2" type="link" size="small"></goa-icon>
            )}
          </button>
          {figmaUrl && (
            <a
              href={figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="figma-link"
              aria-label="View in Figma"
              title="View in Figma"
            >
              <goa-icon version="2" type="logo-figma" size="small"></goa-icon>
            </a>
          )}
        </div>
      </div>

      {/* Live Preview */}
      <div className="preview-area">
        <div
          className={`preview-container${fullWidth ? " full-width" : ""}`}
          ref={previewRef}
          style={
            previewStyle
              ? Object.fromEntries(
                  previewStyle
                    .split(";")
                    .filter((s) => s.trim())
                    .map((s) => {
                      const [k, ...v] = s.split(":");
                      const key = k.trim();
                      return [
                        key.startsWith("--")
                          ? key
                          : key.replace(/-([a-z])/g, (_, c) => c.toUpperCase()),
                        v.join(":").trim(),
                      ];
                    }),
                )
              : undefined
          }
        >
          {!code.webComponents && (
            <span className="preview-placeholder">Preview not available</span>
          )}
        </div>
      </div>

      {/* Code Snippet with Framework Switcher */}
      <div className="code-area">
        <CodeSnippet
          frameworkCode={{
            react: code.react,
            angular: code.angular
              ? {
                  ts: code.angular.component,
                  template: code.angular.template,
                }
              : undefined,
            webComponents: code.webComponents,
          }}
          maxHeight={codeMaxHeight}
          showCopy={true}
        />
      </div>

      <style>{`
        .example-preview {
        }

        .example-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--goa-space-m, 1rem);
        }

        .example-title {
          font: var(--goa-typography-heading-s);
          margin: 0 !important; /* Override global h3 margin from tab content */
          color: var(--goa-color-text-default, #333);
        }

        .example-title--large {
          font: var(--goa-typography-heading-l);
        }

        .example-actions {
          display: flex;
          align-items: center;
          gap: var(--goa-space-xs, 0.25rem);
        }

        .copy-link-button,
        .figma-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: none;
          background: transparent;
          color: var(--goa-color-text-secondary, #666);
          cursor: pointer;
          border-radius: var(--goa-border-radius-s, 4px);
          transition: all 0.15s;
        }

        .copy-link-button:hover,
        .figma-link:hover {
          background: var(--goa-color-greyscale-100, #f1f1f1);
          color: var(--goa-color-interactive-default, #0070c4);
        }

        .copy-link-button.copied {
          color: var(--goa-color-status-success, #2e7d32);
        }

        .preview-area {
          border: 1px solid var(--goa-color-greyscale-200, #dcdcdc);
          border-radius: var(--goa-border-radius-m, 4px);
          overflow: hidden;
          background: var(--goa-color-greyscale-white, #fff);
          min-height: 100px;
          margin-bottom: var(--goa-space-m, 1rem);
        }

        .example-preview .preview-container {
          padding: var(--goa-space-xl, 2rem);
          display: block;  /* Override flex from ConfigurationPreview */
          gap: 0;          /* Reset gap from ConfigurationPreview */
        }

        .example-preview .preview-container.full-width {
          padding-left: 0;
          padding-right: 0;
        }

        .example-preview .preview-container > *:not(style):not([hidden]):not([style*="display: none"]) {
          display: block;
          width: 100%;
        }

        .preview-placeholder {
          color: var(--goa-color-text-secondary, #666);
          font-style: italic;
        }

        .code-area {
          /* CodeSnippet handles its own styling */
        }
      `}</style>
    </div>
  );
}

export default ExamplePreview;
