import React, { useState } from "react";
import {
  GoabPopover,
  GoabButton,
  GoabIconButton,
  GoabCheckbox,
  GoabIcon,
} from "@abgov/react-components";
import {
  GoabxLink,
  GoabxRadioGroup,
  GoabxRadioItem,
} from "@abgov/react-components/experimental";
import { GoabIconType } from "@abgov/ui-components-common";

export type LayoutType = "table" | "card" | "list";
export type GroupByField = null | "status" | "priority" | "staff" | "jurisdiction";

export interface ViewSettings {
  layout: LayoutType;
  visibleColumns: string[];
  groupBy: GroupByField;
}

interface SettingsPopoverProps {
  settings: ViewSettings;
  onSettingsChange: (settings: ViewSettings) => void;
  defaultLayout: LayoutType;
  isMobile?: boolean;
  isCompact?: boolean;
}

type Screen = "main" | "layout" | "columns" | "grouping";

const COLUMN_OPTIONS = [
  { key: "name", label: "Applicant" },
  { key: "status", label: "Status" },
  { key: "referenceNumber", label: "Reference" },
  { key: "submittedAt", label: "Submitted" },
  { key: "assignedWorker", label: "Assigned to" },
  { key: "formType", label: "Type" },
];

const GROUPING_OPTIONS: { value: GroupByField; label: string }[] = [
  { value: null, label: "None" },
  { value: "status", label: "Status" },
  { value: "priority", label: "Priority" },
  { value: "staff", label: "Assigned to" },
  { value: "jurisdiction", label: "Jurisdiction" },
];

const LAYOUT_OPTIONS: { value: LayoutType; label: string; icon: GoabIconType }[] = [
  { value: "table", label: "Table", icon: "menu" },
  { value: "card", label: "Card", icon: "grid" },
  { value: "list", label: "List", icon: "list" },
];

export function SettingsPopover({
  settings,
  onSettingsChange,
  defaultLayout,
  isMobile = false,
  isCompact = false,
}: SettingsPopoverProps) {
  // Note: V2 GoabPopover is uncontrolled - the web component manages open/close state
  // We only track the current screen for navigation within the popover
  const [screen, setScreen] = useState<Screen>("main");

  const getLayoutLabel = () => {
    const option = LAYOUT_OPTIONS.find((o) => o.value === settings.layout);
    return option?.label || "Table";
  };

  const getGroupByLabel = () => {
    const option = GROUPING_OPTIONS.find((o) => o.value === settings.groupBy);
    return option?.label || "None";
  };

  const handleLayoutChange = (value: string) => {
    onSettingsChange({
      ...settings,
      layout: value as LayoutType,
    });
  };

  const handleColumnToggle = (columnKey: string) => {
    const newColumns = settings.visibleColumns.includes(columnKey)
      ? settings.visibleColumns.filter((c) => c !== columnKey)
      : [...settings.visibleColumns, columnKey];

    // Ensure at least one column remains visible
    if (newColumns.length === 0) return;

    onSettingsChange({
      ...settings,
      visibleColumns: newColumns,
    });
  };

  const handleGroupByChange = (value: string) => {
    onSettingsChange({
      ...settings,
      groupBy: value === "null" ? null : (value as GroupByField),
    });
  };

  const handleReset = () => {
    onSettingsChange({
      layout: defaultLayout,
      visibleColumns: COLUMN_OPTIONS.map((c) => c.key),
      groupBy: null,
    });
  };

  const renderMainScreen = () => (
    <div className="settings-popover__content">
      <div className="settings-popover__header">
        <span className="settings-popover__title">View settings</span>
        <GoabIconButton
          icon="close"
          size="small"
          variant="dark"
          action="close"
          ariaLabel="Close settings"
        />
      </div>

      <div className="settings-popover__menu">
        <button
          className="settings-popover__menu-item"
          onClick={() => setScreen("layout")}
        >
          <GoabIcon
            type={LAYOUT_OPTIONS.find((o) => o.value === settings.layout)?.icon || "menu"}
            size="small"
          />
          <span className="settings-popover__menu-label">Layout</span>
          <span className="settings-popover__menu-value">{getLayoutLabel()}</span>
          <GoabIcon type="chevron-forward" size="small" />
        </button>

        {/* Only show columns option when layout is table and not mobile */}
        {settings.layout === "table" && !isMobile && (
          <button
            className="settings-popover__menu-item"
            onClick={() => setScreen("columns")}
          >
            <GoabIcon type="eye" size="small" />
            <span className="settings-popover__menu-label">Columns</span>
            <span className="settings-popover__menu-value">
              {settings.visibleColumns.length}
            </span>
            <GoabIcon type="chevron-forward" size="small" />
          </button>
        )}

        <button
          className="settings-popover__menu-item"
          onClick={() => setScreen("grouping")}
        >
          <GoabIcon type="layers" size="small" />
          <span className="settings-popover__menu-label">Group</span>
          <span className="settings-popover__menu-value">{getGroupByLabel()}</span>
          <GoabIcon type="chevron-forward" size="small" />
        </button>
      </div>

      <div className="settings-popover__reset">
        <GoabxLink color="dark">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleReset();
            }}
          >
            Reset
          </a>
        </GoabxLink>
      </div>
    </div>
  );

  const renderLayoutScreen = () => (
    <div className="settings-popover__content">
      <div className="settings-popover__header">
        <button className="settings-popover__back" onClick={() => setScreen("main")}>
          <GoabIcon type="chevron-back" size="small" />
          <span>Layout</span>
        </button>
        <GoabIconButton
          icon="close"
          size="small"
          variant="dark"
          action="close"
          ariaLabel="Close settings"
        />
      </div>

      <div className="settings-popover__options">
        <GoabxRadioGroup
          name="layout"
          value={settings.layout}
          onChange={(e) => handleLayoutChange(e.value)}
        >
          {LAYOUT_OPTIONS.map((option) => (
            <GoabxRadioItem
              key={option.value}
              value={option.value}
              label={
                option.value === defaultLayout
                  ? `${option.label} (Default)`
                  : option.label
              }
            />
          ))}
        </GoabxRadioGroup>
      </div>
    </div>
  );

  const renderColumnsScreen = () => (
    <div className="settings-popover__content">
      <div className="settings-popover__header">
        <button className="settings-popover__back" onClick={() => setScreen("main")}>
          <GoabIcon type="chevron-back" size="small" />
          <span>Columns</span>
        </button>
        <GoabIconButton
          icon="close"
          size="small"
          variant="dark"
          action="close"
          ariaLabel="Close settings"
        />
      </div>

      <div className="settings-popover__options">
        {COLUMN_OPTIONS.map((column) => (
          <GoabCheckbox
            key={column.key}
            name={`column-${column.key}`}
            text={column.label}
            checked={settings.visibleColumns.includes(column.key)}
            disabled={
              settings.visibleColumns.length === 1 &&
              settings.visibleColumns.includes(column.key)
            }
            onChange={() => handleColumnToggle(column.key)}
          />
        ))}
      </div>
    </div>
  );

  const renderGroupingScreen = () => (
    <div className="settings-popover__content">
      <div className="settings-popover__header">
        <button className="settings-popover__back" onClick={() => setScreen("main")}>
          <GoabIcon type="chevron-back" size="small" />
          <span>Group</span>
        </button>
        <GoabIconButton
          icon="close"
          size="small"
          variant="dark"
          action="close"
          ariaLabel="Close settings"
        />
      </div>

      <div className="settings-popover__options">
        <GoabxRadioGroup
          name="groupBy"
          value={settings.groupBy === null ? "null" : settings.groupBy}
          onChange={(e) => handleGroupByChange(e.value)}
        >
          {GROUPING_OPTIONS.map((option) => (
            <GoabxRadioItem
              key={option.value ?? "null"}
              value={option.value === null ? "null" : option.value}
              label={option.label}
            />
          ))}
        </GoabxRadioGroup>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch (screen) {
      case "layout":
        return renderLayoutScreen();
      case "columns":
        return renderColumnsScreen();
      case "grouping":
        return renderGroupingScreen();
      default:
        return renderMainScreen();
    }
  };

  // Reset screen to main when popover opens (triggered by target click)
  const handleTargetClick = () => {
    setScreen("main");
  };

  return (
    <GoabPopover
      padded={false}
      maxWidth="280px"
      position="below"
      target={
        isCompact ? (
          <GoabIconButton
            icon="settings"
            size="medium"
            variant="dark"
            ariaLabel="Settings"
            onClick={handleTargetClick}
          />
        ) : (
          <GoabButton type="tertiary" size="compact" onClick={handleTargetClick}>
            Settings
          </GoabButton>
        )
      }
    >
      {renderScreen()}
    </GoabPopover>
  );
}
