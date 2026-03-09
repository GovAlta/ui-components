/**
 * CaseDetailSubMenu.tsx
 *
 * Contextual sub-menu for case detail pages.
 * Shows back link, application, comments, and timeline.
 * Section navigation is handled by the page TOC, not the side menu.
 */

import { GoabIcon } from "@abgov/react-components";
import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuItem,
} from "@abgov/react-components/experimental";
import { useTheme } from "../hooks/useTheme";

function getThemeIcon(isDark: boolean) {
  return isDark ? "sunny" : "moon";
}

function getThemeLabel(isDark: boolean) {
  return isDark ? "Light mode" : "Dark mode";
}

interface CaseDetailSubMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  citizenName?: string;
  caseId?: string;
}

export function CaseDetailSubMenu({
  isOpen,
  onToggle,
  citizenName = "Case",
  caseId,
}: CaseDetailSubMenuProps) {
  const { isDark, toggleTheme } = useTheme();
  // Primary content: Back link + Application + Comments + Timeline
  const primaryContent = (
    <>
      {/* Back to applications list - uses url for navigation */}
      <GoabxWorkSideMenuItem
        label="All"
        icon="arrow-back"
        url="/workspace/applications"
      />

      {/* Application - always current when viewing this case */}
      <GoabxWorkSideMenuItem
        label="Application"
        icon="document-text"
        url={caseId ? `/workspace/application/${caseId}` : "#"}
        current={true}
      />

      {/* Timeline - navigates to timeline page */}
      <GoabxWorkSideMenuItem
        label="Timeline"
        icon="list"
        url={caseId ? `/workspace/application/${caseId}/timeline` : "#"}
      />
    </>
  );

  // Account content: Theme toggle + Logout
  const accountContent = (
    <>
      <button className="theme-toggle" onClick={toggleTheme}>
        <GoabIcon type={getThemeIcon(isDark)} size="small" />
        {getThemeLabel(isDark)}
      </button>
      <GoabxWorkSideMenuItem icon="log-out" label="Logout" url="/" />
    </>
  );

  return (
    <GoabxWorkSideMenu
      heading={`Digital Service | ${citizenName}`}
      url="/workspace"
      userName="Edna Mode"
      userSecondaryText="worker@example.gov.ab.ca"
      open={isOpen}
      onToggle={onToggle}
      primaryContent={primaryContent}
      accountContent={accountContent}
    />
  );
}

export default CaseDetailSubMenu;
