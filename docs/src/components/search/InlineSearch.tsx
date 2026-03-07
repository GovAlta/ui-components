/**
 * InlineSearch.tsx
 *
 * Controlled search input for grid pages (Components, Examples, Tokens).
 * - Regular text filters the grid directly (parent controls value/onChange)
 * - Typing "/" enters command mode with stepped navigation:
 *   - Multi-dimension pages (Components, Examples): first pick a dimension
 *     (e.g., "Category", "Scale"), then see its values
 *   - Single-dimension pages (Tokens): skip straight to values
 */

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { SearchInput } from "./SearchInput";

export interface SlashCommand {
  id: string;
  /** Display label, e.g., "Interaction" */
  label: string;
  /** Group header, e.g., "Scale" */
  group: string;
  /** Filter dimension key, e.g., "scale" */
  filterType: string;
  /** Filter value, e.g., "interaction" */
  filterValue: string;
  /** Whether this filter is currently active */
  active?: boolean;
}

interface InlineSearchProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  commands?: SlashCommand[];
  onCommandSelect?: (command: SlashCommand) => void;
  /** Whether the search index is still loading */
  isLoading?: boolean;
  /** Error message if search index failed to load */
  error?: string | null;
}

export function InlineSearch({
  value,
  onChange,
  onClear,
  placeholder,
  commands = [],
  onCommandSelect,
  isLoading,
  error,
}: InlineSearchProps) {
  const [commandMode, setCommandMode] = useState(false);
  const [commandInput, setCommandInput] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Derive unique filter dimensions from commands (with counts)
  const dimensions = useMemo(() => {
    const groupMap = new Map<string, { count: number; activeCount: number }>();
    for (const cmd of commands) {
      const existing = groupMap.get(cmd.group) || { count: 0, activeCount: 0 };
      existing.count++;
      if (cmd.active) existing.activeCount++;
      groupMap.set(cmd.group, existing);
    }
    return Array.from(groupMap.entries()).map(([name, { count, activeCount }]) => ({
      name,
      count,
      activeCount,
    }));
  }, [commands]);

  const hasMultipleDimensions = dimensions.length > 1;

  // Show dimension picker when multiple dimensions exist and none is selected yet
  const showDimensions =
    commandMode && hasMultipleDimensions && selectedDimension === null;

  // Filter dimensions by typed input (e.g., "/s" narrows to "Scale")
  const filteredDimensions = useMemo(() => {
    if (!showDimensions) return [];
    if (commandInput === "/") return dimensions;
    const query = commandInput.slice(1).toLowerCase();
    return dimensions.filter((dim) => dim.name.toLowerCase().includes(query));
  }, [showDimensions, dimensions, commandInput]);

  // Filter commands to selected dimension (or all if single-dimension page)
  const filteredCommands = useMemo(() => {
    if (!commandMode || showDimensions) return [];

    let cmds = selectedDimension
      ? commands.filter((cmd) => cmd.group === selectedDimension)
      : commands;

    if (commandInput === "/") return cmds;
    const query = commandInput.slice(1).toLowerCase();
    return cmds.filter((cmd) => cmd.label.toLowerCase().includes(query));
  }, [commandMode, showDimensions, commands, commandInput, selectedDimension]);

  // Group commands for display (used on single-dimension pages like Tokens)
  const groupedCommands = useMemo(() => {
    const groups: { group: string; items: { cmd: SlashCommand; index: number }[] }[] = [];
    let currentGroup: string | null = null;
    let index = 0;

    for (const cmd of filteredCommands) {
      if (cmd.group !== currentGroup) {
        currentGroup = cmd.group;
        groups.push({ group: cmd.group, items: [] });
      }
      groups[groups.length - 1].items.push({ cmd, index: index++ });
    }

    return groups;
  }, [filteredCommands]);

  // Click outside closes command mode
  useEffect(() => {
    if (!commandMode) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setCommandMode(false);
        setCommandInput("");
        setSelectedDimension(null);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [commandMode]);

  const handleDimensionSelect = useCallback((dimensionName: string) => {
    setSelectedDimension(dimensionName);
    setCommandInput("/");
    setSelectedIndex(0);
  }, []);

  const handleChange = useCallback(
    (newValue: string) => {
      // Backspace from "/" in value mode -> go back to dimensions
      if (newValue === "" && commandMode && selectedDimension !== null) {
        setSelectedDimension(null);
        setCommandInput("/");
        setSelectedIndex(0);
        return;
      }

      if (newValue.startsWith("/") && commands.length > 0) {
        setCommandMode(true);
        setCommandInput(newValue);
        setSelectedIndex(0);
      } else if (commandMode) {
        setCommandMode(false);
        setCommandInput("");
        setSelectedDimension(null);
        onChange(newValue);
      } else {
        onChange(newValue);
      }
    },
    [commandMode, commands.length, onChange, selectedDimension],
  );

  const handleCommandSelect = useCallback(
    (cmd: SlashCommand) => {
      setCommandMode(false);
      setCommandInput("");
      setSelectedDimension(null);
      onCommandSelect?.(cmd);
    },
    [onCommandSelect],
  );

  const handleClose = useCallback(() => {
    if (commandMode && selectedDimension !== null) {
      // Escape from value mode -> back to dimensions
      setSelectedDimension(null);
      setCommandInput("/");
      setSelectedIndex(0);
    } else if (commandMode) {
      setCommandMode(false);
      setCommandInput("");
      setSelectedDimension(null);
    } else if (value) {
      onClear();
    }
  }, [commandMode, selectedDimension, value, onClear]);

  // Keyboard navigation for both dimensions and commands
  const handleCommandNav = useCallback(
    (key: string) => {
      if (showDimensions) {
        if (key === "ArrowDown") {
          setSelectedIndex((prev) =>
            prev < filteredDimensions.length - 1 ? prev + 1 : prev,
          );
        } else if (key === "ArrowUp") {
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (key === "Enter" || key === "ArrowRight") {
          const dim = filteredDimensions[selectedIndex];
          if (dim) handleDimensionSelect(dim.name);
        }
      } else {
        if (key === "ArrowDown") {
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : prev,
          );
        } else if (key === "ArrowUp") {
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (key === "Enter") {
          const selected = filteredCommands[selectedIndex];
          if (selected) handleCommandSelect(selected);
        } else if (key === "ArrowLeft" && selectedDimension !== null) {
          setSelectedDimension(null);
          setCommandInput("/");
          setSelectedIndex(0);
        }
      }
    },
    [
      showDimensions,
      filteredDimensions,
      filteredCommands,
      selectedIndex,
      handleCommandSelect,
      handleDimensionSelect,
    ],
  );

  const displayValue = commandMode ? commandInput : value;
  const showClose = commandMode || !!value;
  const hasDropdownItems = showDimensions
    ? filteredDimensions.length > 0
    : filteredCommands.length > 0;

  return (
    <div className="inline-search" ref={containerRef}>
      <SearchInput
        value={displayValue}
        onChange={handleChange}
        onClose={showClose ? handleClose : undefined}
        autoFocus={false}
        placeholder={placeholder}
        onResultNav={commandMode && hasDropdownItems ? handleCommandNav : undefined}
      />

      {/* Loading state (only shown while user is actively typing) */}
      {isLoading && value && !error && (
        <div className="inline-search-commands" role="status" aria-live="polite">
          <div className="inline-search-loading">Loading search...</div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="inline-search-commands" role="alert">
          <div className="inline-search-error">
            <strong>Unable to load search</strong>
            <p>Try refreshing the page.</p>
          </div>
        </div>
      )}

      {/* Step 1: Dimension picker (multi-dimension pages) */}
      {showDimensions && filteredDimensions.length > 0 && (
        <div className="inline-search-commands" role="listbox">
          <ul className="inline-commands-list">
            {filteredDimensions.map((dim, index) => (
              <li
                key={dim.name}
                className="inline-commands-item inline-commands-dimension"
                data-selected={index === selectedIndex}
                role="option"
                aria-selected={index === selectedIndex}
                onClick={() => handleDimensionSelect(dim.name)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span className="inline-commands-command">{dim.name}</span>
                <span className="inline-commands-meta">
                  {dim.activeCount > 0 && (
                    <span className="inline-commands-active-count">
                      {dim.activeCount} active
                    </span>
                  )}
                  <span className="inline-commands-shortcut">
                    /{dim.name.charAt(0).toLowerCase()}
                  </span>
                  <span className="inline-commands-chevron" aria-hidden="true">
                    ›
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <div className="inline-commands-footer">
            <kbd>▲▼</kbd> navigate <kbd>→</kbd> open <kbd>Esc</kbd> cancel
          </div>
        </div>
      )}

      {/* Step 2: Filter values (after dimension selected, or single-dimension pages) */}
      {commandMode && !showDimensions && filteredCommands.length > 0 && (
        <div className="inline-search-commands" role="listbox">
          {/* Back button when inside a dimension */}
          {selectedDimension && (
            <button
              className="inline-commands-back"
              onClick={() => {
                setSelectedDimension(null);
                setCommandInput("/");
                setSelectedIndex(0);
              }}
            >
              <span className="inline-commands-back-arrow" aria-hidden="true">
                ‹
              </span>
              {selectedDimension}
            </button>
          )}

          {selectedDimension ? (
            // Stepped mode: flat list for the selected dimension
            <ul className="inline-commands-list">
              {filteredCommands.map((cmd, index) => (
                <li
                  key={cmd.id}
                  className={`inline-commands-item ${cmd.active ? "inline-commands-item--active" : ""}`}
                  data-selected={index === selectedIndex}
                  role="option"
                  aria-selected={index === selectedIndex}
                  onClick={() => handleCommandSelect(cmd)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <span className="inline-commands-command">{cmd.label}</span>
                  {cmd.active && (
                    <span className="inline-commands-check" aria-label="Active">
                      ✓
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            // Single-dimension page (e.g., Tokens): grouped with headers
            groupedCommands.map(({ group, items }) => (
              <div key={group} className="inline-commands-group">
                <div className="inline-commands-group-header">{group}</div>
                <ul className="inline-commands-list">
                  {items.map(({ cmd, index }) => (
                    <li
                      key={cmd.id}
                      className={`inline-commands-item ${cmd.active ? "inline-commands-item--active" : ""}`}
                      data-selected={index === selectedIndex}
                      role="option"
                      aria-selected={index === selectedIndex}
                      onClick={() => handleCommandSelect(cmd)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <span className="inline-commands-command">{cmd.label}</span>
                      <span className="inline-commands-shortcut">
                        /{cmd.label.charAt(0).toLowerCase()}
                      </span>
                      {cmd.active && (
                        <span className="inline-commands-check" aria-label="Active">
                          ✓
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}

          <div className="inline-commands-footer">
            <kbd>▲▼</kbd> navigate <kbd>Enter</kbd> toggle{" "}
            {selectedDimension ? (
              <>
                <kbd>←</kbd> back <kbd>Esc</kbd> back
              </>
            ) : (
              <>
                <kbd>Esc</kbd> cancel
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default InlineSearch;
