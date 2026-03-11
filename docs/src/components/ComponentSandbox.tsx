import { useState, useEffect, type ReactNode } from 'react';
import { GoabButton, GoabIcon, GoabDropdown, GoabDropdownItem } from '@abgov/react-components';
import { CodeSnippet } from './CodeSnippet';
import {
  getFrameworkPreference,
  setFrameworkPreference,
  subscribeToFrameworkPreference,
  type Framework
} from '../lib/framework-preference';

interface ControlOption {
  label: string;
  value: string;
}

interface Control {
  name: string;
  type: 'select' | 'boolean' | 'text';
  options?: ControlOption[];
  defaultValue: string | boolean;
}

interface ComponentSandboxProps {
  componentName: string;
  controls?: Control[];
  reactCode?: string;
  angularCode?: string;
  children?: ReactNode;
  figmaUrl?: string;
  githubUrl?: string;
}

/**
 * ComponentSandbox - Interactive playground for component demos
 *
 * Displays a live preview of a component with configurable controls,
 * and code snippets for React and Angular.
 */
export function ComponentSandbox({
  componentName,
  controls = [],
  reactCode = '',
  angularCode = '',
  children,
  figmaUrl,
  githubUrl
}: ComponentSandboxProps) {
  // Initialize from global preference (only react/angular supported here)
  const [activeTab, setActiveTab] = useState<'react' | 'angular'>(() => {
    const stored = getFrameworkPreference();
    return stored === 'angular' ? 'angular' : 'react';
  });

  // Subscribe to global framework preference changes
  useEffect(() => {
    return subscribeToFrameworkPreference((framework) => {
      // Map webComponents preference to react for this component
      setActiveTab(framework === 'angular' ? 'angular' : 'react');
    });
  }, []);

  const [controlValues, setControlValues] = useState<Record<string, string | boolean>>(() => {
    const initial: Record<string, string | boolean> = {};
    controls.forEach(c => {
      initial[c.name] = c.defaultValue;
    });
    return initial;
  });

  const handleControlChange = (name: string, value: string | boolean) => {
    setControlValues(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="component-sandbox">
      {/* Preview Area */}
      <div className="sandbox-preview">
        <div className="preview-container">
          {children}
        </div>
      </div>

      {/* Controls */}
      {controls.length > 0 && (
        <div className="sandbox-controls">
          <div className="controls-header">
            <GoabIcon type="settings" size="small" />
            <span>Controls</span>
          </div>
          <div className="controls-grid">
            {controls.map(control => (
              <div key={control.name} className="control-item">
                <label>{control.name}</label>
                {control.type === 'select' && control.options && (
                  <GoabDropdown
                    value={String(controlValues[control.name])}
                    onChange={(e) => handleControlChange(control.name, e.detail.value || '')}
                  >
                    {control.options.map(opt => (
                      <GoabDropdownItem
                        key={opt.value}
                        value={opt.value}
                        label={opt.label}
                      />
                    ))}
                  </GoabDropdown>
                )}
                {control.type === 'boolean' && (
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={Boolean(controlValues[control.name])}
                      onChange={(e) => handleControlChange(control.name, e.target.checked)}
                    />
                    <span>{controlValues[control.name] ? 'Yes' : 'No'}</span>
                  </label>
                )}
                {control.type === 'text' && (
                  <input
                    type="text"
                    value={String(controlValues[control.name])}
                    onChange={(e) => handleControlChange(control.name, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code Tabs */}
      <div className="sandbox-code">
        <div className="code-tabs">
          <button
            className={`code-tab ${activeTab === 'react' ? 'active' : ''}`}
            onClick={() => setFrameworkPreference('react')}
          >
            React
          </button>
          <button
            className={`code-tab ${activeTab === 'angular' ? 'active' : ''}`}
            onClick={() => setFrameworkPreference('angular')}
          >
            Angular
          </button>
          <div className="code-actions">
            {figmaUrl && (
              <a href={figmaUrl} target="_blank" rel="noopener noreferrer" className="action-link">
                <GoabIcon type="open" size="small" />
                Figma
              </a>
            )}
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="action-link">
                <GoabIcon type="open" size="small" />
                Source
              </a>
            )}
          </div>
        </div>
        <div className="code-panel">
          {activeTab === 'react' && reactCode && (
            <CodeSnippet code={reactCode} language="tsx" showCopy maxHeight={300} />
          )}
          {activeTab === 'angular' && angularCode && (
            <CodeSnippet code={angularCode} language="html" showCopy maxHeight={300} />
          )}
          {((activeTab === 'react' && !reactCode) || (activeTab === 'angular' && !angularCode)) && (
            <div className="no-code">
              No {activeTab === 'react' ? 'React' : 'Angular'} code example available.
            </div>
          )}
        </div>
      </div>

      <style>{`
        .component-sandbox {
          border: 1px solid var(--goa-color-greyscale-200);
          border-radius: var(--goa-border-radius-m);
          overflow: hidden;
          background: var(--goa-color-greyscale-white);
        }

        .sandbox-preview {
          padding: var(--goa-space-xl, 2rem);
          background: #fafafa;
          border-bottom: 1px solid var(--goa-color-greyscale-200);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 150px;
        }

        .preview-container {
          /* Component preview container */
        }

        .sandbox-controls {
          padding: var(--goa-space-m, 1rem);
          border-bottom: 1px solid var(--goa-color-greyscale-200);
          background: var(--goa-color-greyscale-white);
        }

        .controls-header {
          display: flex;
          align-items: center;
          gap: var(--goa-space-xs, 0.25rem);
          font-weight: var(--goa-font-weight-semi-bold);
          font-size: var(--goa-font-size-2);
          margin-bottom: var(--goa-space-m, 1rem);
          color: var(--goa-color-text-secondary, #666);
        }

        .controls-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: var(--goa-space-m, 1rem);
        }

        .control-item {
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-xs, 0.25rem);
        }

        .control-item label {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--goa-color-text-secondary, #666);
          text-transform: capitalize;
        }

        .control-item input[type="text"] {
          padding: 0.5rem;
          border: 1px solid var(--goa-color-greyscale-200);
          border-radius: var(--goa-border-radius-xs);
          font-size: var(--goa-font-size-2);
        }

        .toggle-label {
          display: flex;
          align-items: center;
          gap: var(--goa-space-xs, 0.25rem);
          cursor: pointer;
        }

        .sandbox-code {
          /* Code section */
        }

        .code-tabs {
          display: flex;
          align-items: center;
          background: #f5f5f5;
          border-bottom: 1px solid var(--goa-color-greyscale-200);
        }

        .code-tab {
          padding: var(--goa-space-s, 0.5rem) var(--goa-space-m, 1rem);
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          font-size: var(--goa-font-size-2);
          color: var(--goa-color-text-secondary, #666);
          transition: color 0.15s, border-color 0.15s;
        }

        .code-tab:hover {
          color: var(--goa-color-brand-default);
        }

        .code-tab.active {
          color: var(--goa-color-brand-default);
          border-bottom-color: var(--goa-color-brand-default);
          font-weight: 500;
        }

        .code-actions {
          margin-left: auto;
          display: flex;
          gap: var(--goa-space-m, 1rem);
          padding-right: var(--goa-space-m, 1rem);
        }

        .action-link {
          display: flex;
          align-items: center;
          gap: var(--goa-space-xs, 0.25rem);
          font-size: 0.75rem;
          color: var(--goa-color-text-secondary, #666);
          text-decoration: none;
        }

        .action-link:hover {
          color: var(--goa-color-brand-default);
        }

        .code-panel {
          /* Code panel container */
        }

        .no-code {
          padding: var(--goa-space-l, 1.5rem);
          text-align: center;
          color: var(--goa-color-text-secondary, #666);
          font-style: italic;
        }
      `}</style>
    </div>
  );
}

export default ComponentSandbox;
