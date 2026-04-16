/**
 * ConfigurationPreview Component
 *
 * Interactive component that shows:
 * 1. Dropdown to select a configuration
 * 2. Live preview area (renders web components)
 * 3. Code snippet (shows framework-specific code)
 *
 * The preview uses web components directly (no React hydration needed).
 * Code snippet changes based on selected framework preference.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
// Note: Using web component directly for v2 styling (React wrapper doesn't pass version prop)
import { CodeSnippet } from "./CodeSnippet";
import { useGitHubIssueCount } from "../hooks/useGitHubIssueCount";
import type { ComponentConfigurations } from "@/data/configurations";
import DOMPurify from "dompurify";

// Allow GoA web component custom elements through DOMPurify.
// By default, DOMPurify strips all custom elements (tags containing hyphens).
// Our previews render <goa-*> web components, so we must whitelist them.
const DOMPURIFY_CONFIG = {
  CUSTOM_ELEMENT_HANDLING: {
    tagNameCheck: /^goa-/, // allow all <goa-*> elements
    attributeNameCheck: () => true, // allow their attributes (type, name, label, etc.)
  },
};

interface ConfigurationPreviewProps {
  configurations: ComponentConfigurations;
  figmaUrl?: string;
  githubUrl?: string;
  componentName?: string;
}

export function ConfigurationPreview({
  configurations,
  figmaUrl,
  githubUrl,
  componentName,
}: ConfigurationPreviewProps) {
  const [selectedConfigId, setSelectedConfigId] = useState(
    configurations.defaultConfigurationId,
  );
  const previewRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLElement | null>(null);
  const issueCount = useGitHubIssueCount(componentName);

  // Get the currently selected configuration
  const selectedConfig = configurations.configurations.find(
    (c) => c.id === selectedConfigId,
  );

  // Update preview when configuration changes
  useEffect(() => {
    if (previewRef.current && selectedConfig) {
      const webComponentCode = selectedConfig.code.webComponents;
      const rawCode =
        typeof webComponentCode === "string"
          ? webComponentCode
          : [
              webComponentCode.css ? `<style>${webComponentCode.css}</style>` : "",
              webComponentCode.html,
              webComponentCode.js ? `<script>${webComponentCode.js}</script>` : "",
            ].join("");

      const previewHtml = configurations.previewWrapper
        ? configurations.previewWrapper.replace("{{slot}}", rawCode)
        : rawCode;

      // Extract script content before sanitization
      const scriptMatch = previewHtml.match(/<script>([\s\S]*?)<\/script>/i);
      const scriptContent = scriptMatch ? scriptMatch[1] : null;

      // Sanitize HTML and add version="2" to all goa- components
      const sanitizedHtml = DOMPurify.sanitize(previewHtml, DOMPURIFY_CONFIG);
      previewRef.current.innerHTML = sanitizedHtml
        .replace(
          /<goa-(?!microsite-header)([a-z-]+)(?![^>]*version=)/g,
          '<goa-$1 version="2"',
        )
        .trim();

      // Execute script content after HTML is rendered
      if (scriptContent) {
        try {
          const container = previewRef.current;
          const scopedScript = scriptContent
            .replace(
              /document\.getElementById\s*\(\s*["']([^"']+)["']\s*\)/g,
              (_, id) => `container.querySelector("#${id}")`,
            )
            .replace(
              /document\.querySelector\s*\(\s*["']([^"']+)["']\s*\)/g,
              (_, selector) => `container.querySelector("${selector}")`,
            );

          const fn = new Function("container", scopedScript);
          fn(container);
        } catch (err) {
          console.error("Error executing configuration script:", err);
        }
      }
    }
  }, [selectedConfig]);

  // Handle configuration dropdown change
  const handleConfigChange = useCallback(
    (detail: { name: string; value: string | string[] }) => {
      const newValue = Array.isArray(detail.value) ? detail.value[0] : detail.value;
      setSelectedConfigId(newValue);
    },
    [],
  );

  // Attach _change listener with proper cleanup to avoid leaks
  useEffect(() => {
    const el = dropdownRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      handleConfigChange((e as CustomEvent).detail);
    };
    el.addEventListener("_change", handler);
    return () => el.removeEventListener("_change", handler);
  }, [handleConfigChange]);

  // Apply optional previewStyle before paint to avoid a flash of unstyled preview
  useLayoutEffect(() => {
    if (previewRef.current && configurations.previewStyle) {
      previewRef.current.style.cssText = configurations.previewStyle;
    }
  }, [configurations.previewStyle]);

  if (!selectedConfig) {
    return <div>No configuration found</div>;
  }

  return (
    <div className="configuration-preview">
      {/* Control Bar */}
      <div className="control-bar">
        <div className="config-dropdown">
          <goa-dropdown
            name="configuration"
            value={selectedConfigId}
            version="2"
            size="compact"
            maxheight="600px"
            ref={dropdownRef}
          >
            {configurations.configurations.map((config) => (
              <goa-dropdown-item value={config.id} label={config.name} />
            ))}
          </goa-dropdown>
        </div>

        <div className="external-links">
          {figmaUrl && (
            <a
              href={figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
              aria-label="View in Figma"
              title="View in Figma"
            >
              <goa-icon type="logo-figma" size="medium"></goa-icon>
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="external-link github-link"
              aria-label="View GitHub issues"
              title="View GitHub issues"
            >
              <goa-icon type="logo-github" size="medium"></goa-icon>
              {issueCount !== null && <span className="issue-count">({issueCount})</span>}
            </a>
          )}
        </div>
      </div>

      {/* Preview Area */}
      <div className="preview-area">
        {/* previewStyle applied via useLayoutEffect above for contextual previews (e.g. grey workspace background) */}
        <div className="preview-container" ref={previewRef}>
          {/* Web components rendered here via innerHTML */}
        </div>
      </div>

      {/* Code Snippet with Framework Switcher */}
      <div className="code-area">
        <CodeSnippet
          frameworkCode={{
            react: selectedConfig.code.react,
            angular: selectedConfig.code.angular,
            webComponents: selectedConfig.code.webComponents,
          }}
          maxHeight={200}
          showCopy={true}
        />
      </div>

      <style>{`
        .configuration-preview {
          display: flex;
          flex-direction: column;
        }

        .control-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--goa-space-m, 1rem);
          margin-bottom: var(--goa-space-m, 1rem);
          position: relative;
        }

        .config-dropdown {
          min-width: 200px;
        }

        .external-links {
          display: flex;
          align-items: center;
          gap: var(--goa-space-s, 0.5rem);
        }

        .external-link {
          display: flex;
          align-items: center;
          gap: var(--goa-space-2xs, 0.25rem);
          color: var(--goa-color-text-secondary, #666);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .external-link:hover {
          color: var(--goa-color-interactive-default, #0070c4);
        }

        .github-link {
          font-size: var(--goa-font-size-2);
        }

        .issue-count {
          color: var(--goa-color-text-secondary, #666);
        }

        .configuration-preview .preview-area {
          border: 1px solid var(--goa-color-greyscale-200, #dcdcdc);
          border-radius: var(--goa-border-radius-m, 4px);
          background: var(--goa-color-greyscale-white, #fff);
          min-height: 120px;
          margin-bottom: var(--goa-space-m, 1rem);
          position: relative;
          z-index: 2; /* Allow dropdowns to appear above code snippets */
          overflow: visible;
        }

        .configuration-preview .code-area {
          position: relative;
          z-index: 1;
        }

        .configuration-preview .preview-container {
          padding: var(--goa-space-xl, 2rem);
          border-radius: inherit;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default ConfigurationPreview;
