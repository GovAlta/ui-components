/**
 * TOC.tsx
 *
 * Simple table of contents component.
 * Queries headings matching cssQuery and highlights active on scroll.
 * Used inside TabContent - each tab gets its own TOC instance.
 */

import css from "./toc.module.css";
import { useEffect, useState, useRef } from "react";

export type TOCItem = {
  title: string;
  tagName: string;
  id: string;
};

type TOCProps = {
  cssQuery: string;
};

export function TableOfContents({ cssQuery }: TOCProps) {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check if element is visible (not hidden by display:none or in hidden tab)
    function isVisible(el: HTMLElement): boolean {
      return el.offsetParent !== null || el.offsetWidth > 0 || el.offsetHeight > 0;
    }

    // Query headings - only visible ones
    function queryHeadings(): TOCItem[] {
      const headings = document.querySelectorAll<HTMLHeadingElement>(cssQuery);
      const result: TOCItem[] = [];

      headings.forEach((el) => {
        const id = el.getAttribute("id");
        const title = el.textContent?.trim();

        // Only include visible headings
        if (id && title && isVisible(el)) {
          result.push({
            id,
            title,
            tagName: el.tagName,
          });
        }
      });

      return result;
    }

    // Update items and set first as active
    function updateHeadings() {
      const headings = queryHeadings();
      setItems(headings);
      if (headings.length > 0) {
        setActiveId(headings[0].id);
      }
    }

    // Initial query with small delay for DOM to be ready
    const timer = setTimeout(updateHeadings, 100);

    // Listen for goa-tabs change events - re-query when tab becomes visible
    // goa-tabs dispatches "_change" with { tab: number } when switching tabs
    function handleTabChange() {
      // Small delay to ensure tab content is visible after the event
      setTimeout(updateHeadings, 50);
    }

    document.addEventListener("_change", handleTabChange);

    // Update active heading on scroll - only check visible headings
    function handleScroll() {
      const headings = document.querySelectorAll<HTMLHeadingElement>(cssQuery);
      let activeHeading: HTMLHeadingElement | null = null;

      for (const heading of headings) {
        // Only consider visible headings
        if (!isVisible(heading)) continue;

        const rect = heading.getBoundingClientRect();
        if (rect.top < 120) {
          activeHeading = heading;
        }
      }

      if (activeHeading) {
        const id = (activeHeading as HTMLHeadingElement).getAttribute("id");
        if (id) setActiveId(id);
      }
    }

    document.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("_change", handleTabChange);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [cssQuery]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
  }

  if (items.length === 0) {
    return null;
  }

  // Check if there are any H2s - if not, H3s shouldn't be indented
  const hasH2 = items.some((item) => item.tagName === "H2");

  return (
    <nav ref={containerRef} className={`${css["toc"]} ${!hasH2 ? css["flat"] : ""}`}>
      {items.map(({ title, tagName, id }, index) => (
        <div key={`${id}-${index}`}>
          <a
            className={`
              ${css[`toc-item-${tagName.toLowerCase()}`]}
              ${activeId === id ? css["active"] : ""}
            `}
            href={`#${id}`}
            onClick={(e) => handleClick(e, id)}
          >
            {title}
          </a>
        </div>
      ))}
    </nav>
  );
}

export default TableOfContents;
