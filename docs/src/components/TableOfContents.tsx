/**
 * TOC.tsx
 *
 * Simple table of contents component.
 * Queries headings matching cssQuery and highlights active on scroll.
 * Used inside TabContent - each tab gets its own TOC instance.
 */

import css from "./toc.module.css";
import { useEffect, useState, useRef } from "react";
import { getActiveTabHash } from "../lib/tab-hash";

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
  const initialHashHandled = useRef(false);

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

        // For goa-text elements, read the "as" attribute for the heading level
        const tagName =
          el.tagName === "GOA-TEXT"
            ? (el.getAttribute("as") || "h2").toUpperCase()
            : el.tagName;

        // Only include visible headings
        if (id && title && isVisible(el)) {
          result.push({
            id,
            title,
            tagName,
          });
        }
      });

      return result;
    }

    // Update items and set first as active
    function updateHeadings() {
      const headings = queryHeadings();
      setItems(headings);
      if (headings.length > 0 && initialHashHandled.current) {
        setActiveId(headings[0].id);
      }
    }

    // On first load, honor a direct link to one of this TOC's own anchors.
    // Tabs.svelte's built-in anchor scroll only handles a single hash segment,
    // so it can't be relied on once multiple tabs contribute their own hash.
    // The owning tab may still be hidden (goa-tabs activates it asynchronously),
    // so retry briefly rather than giving up on the first check.
    const hashSegments = window.location.hash.slice(1).split("#").filter(Boolean);
    let hashRetryTimer: ReturnType<typeof setTimeout> | null = null;
    const resettleTimers: ReturnType<typeof setTimeout>[] = [];

    function tryResolveInitialHash(attempt = 0) {
      if (hashSegments.length === 0) {
        initialHashHandled.current = true;
        updateHeadings();
        return;
      }

      const candidate = Array.from(
        document.querySelectorAll<HTMLElement>(cssQuery),
      ).find((el) => {
        const id = el.getAttribute("id");
        return id && hashSegments.includes(id);
      });

      if (candidate && isVisible(candidate)) {
        initialHashHandled.current = true;
        updateHeadings();
        setActiveId(candidate.id);
        candidate.scrollIntoView({ behavior: "smooth" });

        // Other examples on the page can still be hydrating (live component
        // previews, syntax highlighting) and shift layout after this point,
        // silently invalidating a scroll already in flight. Re-assert the
        // position a couple more times while things settle.
        [400, 900].forEach((delay) => {
          resettleTimers.push(
            setTimeout(() => candidate.scrollIntoView({ block: "start" }), delay),
          );
        });
        return;
      }

      if (candidate && attempt < 20) {
        hashRetryTimer = setTimeout(() => tryResolveInitialHash(attempt + 1), 100);
        return;
      }

      // No matching anchor (or it never became visible) - fall back to default.
      initialHashHandled.current = true;
      updateHeadings();
    }

    // Initial query with small delay for DOM to be ready
    const timer = setTimeout(tryResolveInitialHash, 100);

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
      const visibleHeadings = Array.from(headings).filter(isVisible);

      if (visibleHeadings.length === 0) return;

      // When scrolled to the bottom, activate the last visible heading
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;
      if (atBottom) {
        const id = visibleHeadings[visibleHeadings.length - 1].getAttribute("id");
        if (id) setActiveId(id);
        return;
      }

      let activeHeading: HTMLHeadingElement | null = null;
      for (const heading of visibleHeadings) {
        const rect = heading.getBoundingClientRect();
        if (rect.top < 120) {
          activeHeading = heading;
        }
      }

      if (activeHeading) {
        const id = activeHeading.getAttribute("id");
        if (id) setActiveId(id);
      }
    }

    document.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      if (hashRetryTimer) clearTimeout(hashRetryTimer);
      resettleTimers.forEach(clearTimeout);
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

      const tabHash = getActiveTabHash(e.currentTarget);
      const newHash = tabHash ? `${tabHash}#${id}` : id;
      history.replaceState(
        {},
        "",
        `${window.location.pathname}${window.location.search}#${newHash}`,
      );
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
