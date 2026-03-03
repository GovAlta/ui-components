import { useEffect, useState, useCallback } from "react";
import css from "./CaseDetailTOC.module.css";

// Task status matching CaseDetailPage
export type TaskStatus = "complete" | "missing" | "not-started";

export interface TOCSection {
  id: string;
  title: string;
  status: TaskStatus;
}

interface CaseDetailTOCProps {
  sections: TOCSection[];
}

/**
 * Table of Contents with scroll tracking and status icons.
 * Highlights the section currently in view while showing completion status.
 */
export function CaseDetailTOC({ sections }: CaseDetailTOCProps) {
  const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null);

  // Update active section based on scroll position
  const updateActiveSection = useCallback(() => {
    const scrollContainer = document.querySelector('.desktop-card-container');
    if (!scrollContainer) return;

    // Check if we're at the bottom of the scroll container
    const isAtBottom =
      scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight < 20;

    // If at bottom, select the last section
    if (isAtBottom && sections.length > 0) {
      setActiveId(sections[sections.length - 1].id);
      return;
    }

    // Find which section is at or near the top of the viewport
    let activeSection: string | null = null;

    // Check sections in reverse order - the first one with negative or small positive offset wins
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Section is at or above the top of viewport (with some buffer)
        if (rect.top <= 120) {
          activeSection = section.id;
          break;
        }
      }
    }

    // If no section found (we're at the very top), default to first
    if (!activeSection && sections.length > 0) {
      activeSection = sections[0].id;
    }

    setActiveId(activeSection);
  }, [sections]);

  useEffect(() => {
    // Find the scrollable container (desktop-card-container in workspace layout)
    const scrollContainer = document.querySelector('.desktop-card-container');

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", updateActiveSection);
      // Initial check
      updateActiveSection();

      return () => {
        scrollContainer.removeEventListener("scroll", updateActiveSection);
      };
    }
  }, [updateActiveSection]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case "complete":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="12" fill="#00853F" />
            <path d="M7 12L10.5 15.5L17 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "missing":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="12" fill="#FCBA19" />
            <path d="M12 7V13M12 17V17.01" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case "not-started":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="#666" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        );
    }
  };

  return (
    <nav className={css.toc} aria-label="Case sections">
      {sections.map((section) => {
        const isActive = activeId === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => handleClick(e, section.id)}
            className={`${css.tocItem} ${isActive ? css.active : ""}`}
            aria-current={isActive ? "true" : undefined}
          >
            <span className={css.icon}>{getStatusIcon(section.status)}</span>
            <span className={css.label}>{section.title}</span>
          </a>
        );
      })}
    </nav>
  );
}

export default CaseDetailTOC;
