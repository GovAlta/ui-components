/**
 * useGitHubIssueCount Hook
 *
 * Fetches GitHub issue count for a component with sessionStorage caching.
 * Client-side only to avoid SSR hydration mismatches.
 */

import { useState, useEffect } from "react";

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Hook to fetch GitHub issue count for a component.
 * Uses sessionStorage caching to avoid excessive API calls.
 *
 * @param componentName - The component name to search for
 * @returns The issue count (null while loading)
 */
export function useGitHubIssueCount(componentName?: string): number | null {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!componentName) return;

    const cacheKey = `gh-issues-${componentName}`;

    // Check cache first
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const { count: cachedCount, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          setCount(cachedCount);
          return;
        }
      }
    } catch (e) {
      // sessionStorage not available
    }

    // Fetch from GitHub API
    const fetchIssueCount = async () => {
      try {
        const query = encodeURIComponent(
          `repo:GovAlta/ui-components is:issue is:open label:"${componentName}"`,
        );
        const response = await fetch(
          `https://api.github.com/search/issues?q=${query}&per_page=1`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          },
        );

        if (!response.ok) {
          console.warn("GitHub API error:", response.status);
          setCount(0);
          return;
        }

        const data = await response.json();
        const issueCount = data.total_count || 0;
        setCount(issueCount);

        // Cache the result
        try {
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ count: issueCount, timestamp: Date.now() }),
          );
        } catch (e) {
          // sessionStorage not available
        }
      } catch (error) {
        console.warn("Failed to fetch GitHub issue count:", error);
        setCount(0);
      }
    };

    fetchIssueCount();
  }, [componentName]);

  return count;
}

export default useGitHubIssueCount;
