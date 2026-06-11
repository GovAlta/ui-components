/**
 * ReleaseNotesFeed.tsx
 *
 * The release notes page (Brief 123, v1 in-site mock). Releases are grouped
 * under month headings with a right-side month jump-nav. Inside each
 * release, changes are grouped by category in priority order (Breaking
 * changes -> New additions -> Feature changes -> Bug fixes -> Design
 * system website). Experimental and breaking changes wrap in a
 * low-emphasis callout, with a status badge sitting inline next to the
 * change title (same shape as the experimental marker in PR #3915, so the
 * team sees one pattern across the docs). Package versions render as small
 * dark links to each package's npm version page.
 */

import { useMemo } from "react";
import { GoabCallout, GoabLink, GoabText } from "@abgov/react-components";

import { withBase } from "@/lib/base-url";

// --- Types (mirror the release-notes content collection schema) ----------

type ChangeType =
  | "breaking"
  | "addition"
  | "feature-change"
  | "fix"
  | "website";

interface ReleaseVersion {
  package: "web-components" | "react" | "angular" | "common";
  version: string;
}

interface DocLink {
  label: string;
  href: string;
}

interface Change {
  title: string;
  type: ChangeType;
  detail?: string;
  bullets?: string[];
  components?: string[];
  issue?: string;
  links?: DocLink[];
  experimental?: boolean;
  migration?: { before?: string; after?: string; link?: string };
}

interface Release {
  date: string;
  intro?: string;
  versions: ReleaseVersion[];
  changes: Change[];
}

interface ReleaseNotesFeedProps {
  releases: Release[];
}

// --- Display constants ----------------------------------------------------

const PACKAGE_LABEL: Record<ReleaseVersion["package"], string> = {
  "web-components": "Web components",
  react: "React",
  angular: "Angular",
  common: "Common",
};

const PACKAGE_NPM: Record<ReleaseVersion["package"], string> = {
  "web-components": "@abgov/web-components",
  react: "@abgov/react-components",
  angular: "@abgov/angular-components",
  common: "@abgov/ui-components-common",
};

const CHANGE_TYPE_LABEL: Record<ChangeType, string> = {
  breaking: "Breaking changes",
  addition: "New additions",
  "feature-change": "Feature changes",
  fix: "Bug fixes",
  website: "Design system website",
};

// Priority order for category sections within a release.
const CHANGE_TYPE_ORDER: ChangeType[] = [
  "breaking",
  "addition",
  "feature-change",
  "fix",
  "website",
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// --- Helpers --------------------------------------------------------------

// "2026-05-20" -> "May 20, 2026"
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

// "2026-05-20" -> "May 2026"
function monthLabel(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

// "2026-05-20" -> "month-2026-05" (anchor id)
function monthId(iso: string): string {
  const [y, m] = iso.split("-");
  return `month-${y}-${m}`;
}

// "work-side-menu-item" -> "Work Side Menu Item"
function prettifyComponent(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function issueLink(issue: string): { href: string; label: string } {
  if (issue.startsWith("http")) return { href: issue, label: "Details" };
  return {
    href: `https://github.com/GovAlta/ui-components/issues/${issue}`,
    label: `#${issue}`,
  };
}

// npm version URL for a package + version.
function npmVersionUrl(pkg: ReleaseVersion["package"], version: string): string {
  return `https://www.npmjs.com/package/${PACKAGE_NPM[pkg]}/v/${version}`;
}

// Group a release's changes by type, preserving the priority order. Empty
// categories are dropped.
function groupChangesByType(
  changes: Change[],
): { type: ChangeType; changes: Change[] }[] {
  const groups = new Map<ChangeType, Change[]>();
  for (const c of changes) {
    const arr = groups.get(c.type) ?? [];
    arr.push(c);
    groups.set(c.type, arr);
  }
  return CHANGE_TYPE_ORDER.filter((t) => groups.has(t)).map((t) => ({
    type: t,
    changes: groups.get(t)!,
  }));
}

// --- Small shared pieces --------------------------------------------------

function ComponentLinks({ slugs }: { slugs: string[] }) {
  return (
    <>
      {slugs.map((slug, i) => (
        <span key={slug}>
          {i > 0 && ", "}
          <GoabLink color="dark" size="small">
            <a href={withBase(`/components/${slug}`)}>{prettifyComponent(slug)}</a>
          </GoabLink>
        </span>
      ))}
    </>
  );
}

function IssueLink({ issue }: { issue: string }) {
  const { href, label } = issueLink(issue);
  return (
    <a className="release-notes-link-quiet" href={href} target="_blank" rel="noreferrer">
      {label}
    </a>
  );
}

// Quiet line of component link(s) + issue ref under a change.
function ChangeMeta({ change }: { change: Change }) {
  const hasComponents = !!change.components && change.components.length > 0;
  if (!hasComponents && !change.issue) return null;
  return (
    <GoabText tag="p" size="body-s" mt="2xs" mb="none">
      {hasComponents && <ComponentLinks slugs={change.components!} />}
      {hasComponents && change.issue && " · "}
      {change.issue && <IssueLink issue={change.issue} />}
    </GoabText>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="release-notes-bullets">
      {items.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  );
}

// "Learn more" / documentation links for a change. Internal docs navigate in
// place; external URLs open in a new tab.
function DocLinks({ links }: { links?: DocLink[] }) {
  if (!links || links.length === 0) return null;
  return (
    <ul className="release-notes-doclinks">
      {links.map((link, i) => {
        const external = link.href.startsWith("http");
        return (
          <li key={i}>
            <GoabLink color="interactive" size="small">
              <a
                href={external ? link.href : withBase(link.href)}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {link.label}
              </a>
            </GoabLink>
          </li>
        );
      })}
    </ul>
  );
}

// --- Change treatments ----------------------------------------------------

// Status badge sitting inline next to the change title. Marks experimental
// or breaking changes with a quiet badge inside their callout. Same shape
// as the experimental marker in PR #3915 so the team sees a single pattern
// across the docs; revisit extracting a shared <StatusBadge /> once we see
// how this lands in review.
function StatusBadge({
  label,
  type,
}: {
  label: string;
  type: "information" | "emergency";
}) {
  return <goa-badge version="2" type={type} emphasis="subtle" content={label} />;
}

// Migration block for breaking changes: optional before/after code and an
// optional link out to a fuller migration guide.
function MigrationBlock({
  migration,
}: {
  migration: NonNullable<Change["migration"]>;
}) {
  return (
    <div className="release-notes-migration">
      {migration.before && (
        <div className="release-notes-migration-step">
          <span className="release-notes-migration-label">Before</span>
          <pre className="release-notes-code">
            <code>{migration.before}</code>
          </pre>
        </div>
      )}
      {migration.after && (
        <div className="release-notes-migration-step">
          <span className="release-notes-migration-label">After</span>
          <pre className="release-notes-code">
            <code>{migration.after}</code>
          </pre>
        </div>
      )}
      {migration.link && (
        <a
          className="release-notes-link-quiet"
          href={migration.link}
          target="_blank"
          rel="noreferrer"
        >
          Migration guide
        </a>
      )}
    </div>
  );
}

function ChangeEntry({ change }: { change: Change }) {
  const status =
    change.type === "breaking"
      ? { label: "Breaking change", type: "emergency" as const }
      : change.experimental
        ? { label: "Experimental", type: "information" as const }
        : null;

  const titleRow = status ? (
    <div className="release-notes-change-title-row">
      <GoabText tag="h5" size="heading-2xs" mt="none" mb="none">{change.title}</GoabText>
      <StatusBadge label={status.label} type={status.type} />
    </div>
  ) : (
    <GoabText tag="h5" size="heading-2xs" mt="none" mb="2xs">{change.title}</GoabText>
  );

  const content = (
    <>
      {titleRow}
      {change.detail && (
        <GoabText tag="p" size="body-s" mt="none" mb="none">{change.detail}</GoabText>
      )}
      {change.bullets && change.bullets.length > 0 && (
        <Bullets items={change.bullets} />
      )}
      {change.migration && <MigrationBlock migration={change.migration} />}
      <DocLinks links={change.links} />
      <ChangeMeta change={change} />
    </>
  );

  // Experimental and breaking wrap in a low-emphasis callout. The callout's
  // heading prop is "" deliberately: Callout.svelte has specific CSS for
  // the emphasis-low + empty-heading case (collapses the heading bar,
  // adjusts body padding). We render our own title row (title + status
  // badge inline) at the top of the body, matching the experimental
  // marker pattern from PR #3915.
  if (status) {
    return (
      <GoabCallout
        type={status.type}
        emphasis="low"
        size="medium"
        heading=""
        mb="m"
      >
        {content}
      </GoabCallout>
    );
  }

  return <div className="release-notes-change">{content}</div>;
}

// --- Release + month ------------------------------------------------------

function ReleaseEntry({ release }: { release: Release }) {
  const groupedChanges = groupChangesByType(release.changes);
  return (
    <article className="release-notes-release">
      <GoabText tag="h3" size="heading-s" mt="none" mb="2xs">{formatDate(release.date)}</GoabText>
      {release.versions.length > 0 && (
        <GoabText tag="p" size="body-s" mt="none" mb="m">
          {release.versions.map((v, i) => (
            <span key={v.package}>
              {i > 0 && (
                <span className="release-notes-version-sep" aria-hidden="true">
                  {" "}
                  ·{" "}
                </span>
              )}
              <GoabLink color="dark" size="small">
                <a
                  href={npmVersionUrl(v.package, v.version)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {PACKAGE_LABEL[v.package]} {v.version}
                </a>
              </GoabLink>
            </span>
          ))}
        </GoabText>
      )}
      {release.intro && <GoabText tag="p" size="body-m" mt="none" mb="m">{release.intro}</GoabText>}
      {groupedChanges.map((group) => {
        const headingId = `category-${release.date}-${group.type}`;
        return (
          <section
            key={group.type}
            className="release-notes-category"
            aria-labelledby={headingId}
          >
            <GoabText tag="h4" id={headingId} size="heading-xs" mt="l" mb="l">
              {CHANGE_TYPE_LABEL[group.type]}
            </GoabText>
            <div className="release-notes-changes">
              {group.changes.map((c, i) => (
                <ChangeEntry key={i} change={c} />
              ))}
            </div>
          </section>
        );
      })}
    </article>
  );
}

// --- Main component -------------------------------------------------------

export function ReleaseNotesFeed({ releases }: ReleaseNotesFeedProps) {
  // Group releases (already newest-first) into months, preserving order.
  const months = useMemo(() => {
    const groups: { label: string; id: string; releases: Release[] }[] = [];
    const byLabel = new Map<string, (typeof groups)[number]>();
    for (const r of releases) {
      const label = monthLabel(r.date);
      let group = byLabel.get(label);
      if (!group) {
        group = { label, id: monthId(r.date), releases: [] };
        byLabel.set(label, group);
        groups.push(group);
      }
      group.releases.push(r);
    }
    return groups;
  }, [releases]);

  return (
    <div className="release-notes">
      {months.map((month, mi) => (
        <section
          className="release-notes-month"
          key={month.id}
          aria-labelledby={month.id}
        >
          {/* The first month's heading duplicates the date right below it, so
              hide it visually. Kept in the DOM as the TOC anchor + section
              label; later months show it as a section divider. */}
          {mi === 0 ? (
            <div className="release-notes-sr-only">
              <GoabText tag="h2" id={month.id} size="heading-m">
                {month.label}
              </GoabText>
            </div>
          ) : (
            <GoabText tag="h2" id={month.id} size="heading-m" mt="none" mb="m">
              {month.label}
            </GoabText>
          )}
          {month.releases.map((r) => (
            <ReleaseEntry key={r.date} release={r} />
          ))}
        </section>
      ))}

      <style>{`
        /* Month grouping (Claude-style): a prominent month heading, then the
           dated releases under it. */
        .release-notes-month + .release-notes-month {
          margin-top: var(--goa-space-3xl);
        }

        /* Visually hidden but kept in the DOM (TOC anchor + section label). */
        .release-notes-sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: 0;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
          border: 0;
        }

        .release-notes-release + .release-notes-release {
          margin-top: var(--goa-space-2xl);
        }

        .release-notes-version-sep {
          color: var(--goa-color-text-secondary);
          padding: 0 var(--goa-space-3xs);
        }

        /* Category sections within a release (Breaking changes / New
           additions / Feature changes / Bug fixes / Design system website). */
        .release-notes {
          margin-bottom: var(--goa-space-2xl);
        }

        .release-notes-category + .release-notes-category {
          margin-top: var(--goa-space-xl);
        }

        /* Changes inside a category: each is title + detail, spaced apart. */
        .release-notes-changes {
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-m);
        }

        /* Title row: change title + inline status badge to the right. Used
           inside the body of a low-emphasis callout (experimental /
           breaking), in place of the callout's heading prop. */
        .release-notes-change-title-row {
          display: flex;
          align-items: center;
          gap: var(--goa-space-xs);
          flex-wrap: wrap;
          margin: 0 0 var(--goa-space-2xs);
        }

        .release-notes .release-notes-changes .release-notes-bullets {
          margin: var(--goa-space-2xs) 0 0;
          padding-left: var(--goa-space-l);
          max-width: none;
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-2xs);
          font: var(--goa-typography-body-s);
          color: var(--goa-color-text-default);
        }

        .release-notes .release-notes-changes .release-notes-link-quiet {
          color: var(--goa-color-text-secondary);
          font: var(--goa-typography-body-s);
          white-space: nowrap;
        }

        /* "Learn more" / documentation links list. */
        .release-notes .release-notes-changes .release-notes-doclinks {
          list-style: none;
          margin: var(--goa-space-s) 0 0;
          padding: 0;
          max-width: none;
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-2xs);
          font: var(--goa-typography-body-m);
        }

        /* Breaking-change migration: before/after code. */
        .release-notes-migration {
          display: flex;
          flex-direction: column;
          gap: var(--goa-space-s);
        }

        .release-notes-migration-label {
          display: block;
          font: var(--goa-typography-body-s);
          font-weight: var(--goa-font-weight-bold);
          color: var(--goa-color-text-secondary);
          margin-bottom: var(--goa-space-3xs);
        }

        .release-notes .release-notes-changes .release-notes-code {
          margin: 0;
          padding: var(--goa-space-xs) var(--goa-space-s);
          background: var(--goa-color-greyscale-100);
          border-radius: var(--goa-border-radius-m);
          font-family: var(--goa-font-family-mono, monospace);
          font-size: var(--goa-font-size-2);
          overflow-x: auto;
        }

        /* Reset DocumentationPageLayout's prose-content :global() rules that
           leak onto our own markup. Astro's scoping hash boosts those globals
           to ~(0,2,1), so these overrides are scoped three-deep to win:
           list-item margins (prose <li>) and the callout's width/margin
           (prose <goa-callout>). Spacing is owned by our container gaps. */
        .release-notes .release-notes-changes .release-notes-bullets li,
        .release-notes .release-notes-changes .release-notes-doclinks li {
          margin-bottom: 0;
        }

        /* The layout's prose styles set the li font directly (body-m), and a
           direct rule beats the font inherited from the ul. Re-pin the li. */
        .release-notes .release-notes-changes .release-notes-bullets li {
          font: var(--goa-typography-body-s);
        }

        .release-notes .release-notes-category .release-notes-changes goa-callout {
          margin: 0;
          max-width: none;
        }
      `}</style>
    </div>
  );
}

export default ReleaseNotesFeed;
