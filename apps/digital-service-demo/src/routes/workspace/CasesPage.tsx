import { useState, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  GoabText,
  GoabIcon,
  GoabButtonGroup,
  GoabDivider,
  GoabBlock,
  GoabTab,
  GoabIconButton,
  GoabPushDrawer,
} from "@abgov/react-components";
import {
  GoabxBadge,
  GoabxButton,
  GoabxInput,
  GoabxTabs,
  GoabxLink,
  GoabxFilterChip,
  GoabxFormItem,
  GoabxCheckbox,
  GoabxMenuButton,
  GoabxMenuAction,
} from "@abgov/react-components/experimental";
import {
  GoabInputOnChangeDetail,
  GoabMenuButtonOnActionDetail,
  GoabTableSortEntry,
  GoabTableOnMultiSortDetail,
} from "@abgov/ui-components-common";
import { supabase, CaseWithSubmission } from "../../lib/supabase";
import { DataTable } from "../../workspace/components/DataTable";
import { ExpandableListView } from "../../workspace/components/ExpandableListView";
import { CardView } from "../../workspace/components/CardView";
import { EmptyState } from "../../workspace/components/EmptyState";
import {
  SettingsPopover,
  ViewSettings,
  LayoutType,
} from "../../workspace/components/SettingsPopover";
import { usePageHeader } from "../../workspace/contexts/PageHeaderContext";
import { useMenu } from "../../workspace/contexts/MenuContext";
import { useCompactToolbar } from "../../workspace/hooks/useViewport";
import { useViewSettings } from "../../workspace/hooks/useViewSettings";
import { TableColumn } from "../../workspace/types/TableColumn";

// Tab categories for filtering
type TabCategory = "all" | "unassigned" | "assigned_to_me" | "waiting" | "complete";

// Status badge type mapping
function getStatusBadgeType(
  status: CaseWithSubmission["status"],
): "information" | "success" | "important" | "emergency" {
  switch (status) {
    case "submitted":
      return "information";
    case "under_review":
      return "important";
    case "info_requested":
      return "emergency";
    case "approved":
      return "success";
    case "denied":
      return "emergency";
    default:
      return "information";
  }
}

// Status display text
function getStatusText(status: CaseWithSubmission["status"]): string {
  switch (status) {
    case "submitted":
      return "Submitted";
    case "under_review":
      return "Under Review";
    case "info_requested":
      return "Info Requested";
    case "approved":
      return "Approved";
    case "denied":
      return "Denied";
    default:
      return status;
  }
}

// Format citizen name
function formatCitizenName(submission: CaseWithSubmission["submissions"]): string {
  if (submission.citizen_name) return submission.citizen_name;
  const formData = submission.form_data as Record<string, unknown>;
  const firstName = formData.firstName || formData.first_name || "";
  const lastName = formData.lastName || formData.last_name || "";
  if (firstName || lastName) return `${firstName} ${lastName}`.trim();
  return "Unknown Citizen";
}

// Format date
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Sort field labels
const sortFieldLabels: Record<string, string> = {
  status: "Status",
  submittedAt: "Submitted date",
  name: "Applicant name",
  formType: "Form type",
};

export function CasesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isMobile } = useMenu();
  const isCompactToolbar = useCompactToolbar();

  // Get initial tab from URL parameter
  const getInitialTab = (): TabCategory => {
    const tabParam = searchParams.get("tab");
    const validTabs: TabCategory[] = [
      "all",
      "unassigned",
      "assigned_to_me",
      "waiting",
      "complete",
    ];
    if (tabParam && validTabs.includes(tabParam as TabCategory)) {
      return tabParam as TabCategory;
    }
    return "all";
  };

  // Data state
  const [cases, setCases] = useState<CaseWithSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [activeTab, setActiveTab] = useState<TabCategory>(getInitialTab);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Sort state - driven by GoabxTable's built-in multi-sort
  const [sorts, setSorts] = useState<GoabTableSortEntry[]>([]);

  // View settings - different default layouts per tab
  const getDefaultLayout = useCallback((tab: string): LayoutType => {
    switch (tab) {
      case "all":
        return "table";
      case "waiting":
        return "card";
      case "assigned_to_me":
        return "card";
      case "unassigned":
        return "list";
      case "complete":
        return "list";
      default:
        return "table";
    }
  }, []);

  const { viewSettings, setViewSettings, layoutCustomized, handleSettingsChange } =
    useViewSettings({
      pageKey: "digital-service-cases",
      getDefaultLayout,
      initialTab: "all",
    });

  const defaultLayout = useMemo(
    () => getDefaultLayout(activeTab),
    [activeTab, getDefaultLayout],
  );
  const viewMode = useMemo((): "table" | "card" | "list" => {
    // On mobile: table becomes card, list stays list
    if (isMobile && viewSettings.layout === "table") return "card";
    return viewSettings.layout;
  }, [isMobile, viewSettings.layout]);

  // Update layout when tab changes (if user hasn't customized)
  useEffect(() => {
    if (!layoutCustomized) {
      setViewSettings((prev) => ({
        ...prev,
        layout: defaultLayout,
      }));
    }
    // Only reset layout when the active tab changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Filter state
  const [pendingFilters, setPendingFilters] = useState({
    status: [] as string[],
    assignedWorker: [] as string[],
  });
  const [appliedFilters, setAppliedFilters] = useState({
    status: [] as string[],
    assignedWorker: [] as string[],
  });

  // Fetch cases from Supabase
  useEffect(() => {
    async function fetchCases() {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("cases")
        .select(`*, submissions (*)`)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching cases:", error);
        setError("Failed to load cases. Please try again.");
      } else if (data) {
        setCases(data as CaseWithSubmission[]);
      }
      setIsLoading(false);
    }
    fetchCases();
  }, []);

  // Calculate tab counts
  const tabCounts = useMemo(() => {
    const unassigned = cases.filter((c) => !c.assigned_worker).length;
    const assignedToMe = cases.filter((c) => c.assigned_worker === "Edna Mode").length;
    const waiting = cases.filter((c) => c.status === "info_requested").length;
    const complete = cases.filter(
      (c) => c.status === "approved" || c.status === "denied",
    ).length;
    return { unassigned, assignedToMe, waiting, complete };
  }, [cases]);

  // Extract filter options
  const filterOptions = useMemo(() => {
    const statuses = [
      "submitted",
      "under_review",
      "info_requested",
      "approved",
      "denied",
    ];
    const workers = [
      ...new Set(cases.map((c) => c.assigned_worker).filter(Boolean)),
    ].sort() as string[];
    return { statuses, workers };
  }, [cases]);

  // Filter toggle
  const togglePendingFilter = (category: keyof typeof pendingFilters, value: string) => {
    setPendingFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }));
  };

  const applyFilters = () => {
    setAppliedFilters(pendingFilters);
    setFilterDrawerOpen(false);
  };

  const clearAllFilters = () => {
    const empty = { status: [], assignedWorker: [] };
    setPendingFilters(empty);
    setAppliedFilters(empty);
  };

  const removeAppliedFilter = (category: keyof typeof appliedFilters, value: string) => {
    setAppliedFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((v) => v !== value),
    }));
  };

  // Build filter chips
  const filterChips = useMemo(() => {
    const chips: {
      category: keyof typeof appliedFilters;
      value: string;
      label: string;
    }[] = [];
    appliedFilters.status.forEach((v) =>
      chips.push({
        category: "status",
        value: v,
        label: getStatusText(v as CaseWithSubmission["status"]),
      }),
    );
    appliedFilters.assignedWorker.forEach((v) =>
      chips.push({ category: "assignedWorker", value: v, label: v }),
    );
    return chips;
  }, [appliedFilters]);

  // Filter and sort cases
  const filteredCases = useMemo(() => {
    let filtered = cases;

    // Tab filter
    switch (activeTab) {
      case "unassigned":
        filtered = filtered.filter((c) => !c.assigned_worker);
        break;
      case "waiting":
        filtered = filtered.filter((c) => c.status === "info_requested");
        break;
      case "assigned_to_me":
        filtered = filtered.filter((c) => c.assigned_worker === "Edna Mode");
        break;
      case "complete":
        filtered = filtered.filter(
          (c) => c.status === "approved" || c.status === "denied",
        );
        break;
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          formatCitizenName(c.submissions).toLowerCase().includes(term) ||
          c.submissions.reference_number.toLowerCase().includes(term) ||
          c.submissions.citizen_email?.toLowerCase().includes(term) ||
          getStatusText(c.status).toLowerCase().includes(term),
      );
    }

    // Drawer filters
    if (appliedFilters.status.length > 0) {
      filtered = filtered.filter((c) => appliedFilters.status.includes(c.status));
    }
    if (appliedFilters.assignedWorker.length > 0) {
      filtered = filtered.filter(
        (c) =>
          c.assigned_worker && appliedFilters.assignedWorker.includes(c.assigned_worker),
      );
    }

    // Sort using GoabTableSortEntry[] format
    if (sorts.length > 0) {
      const adaptedData = filtered.map((c) => ({
        ...c,
        name: formatCitizenName(c.submissions),
        submittedAt: c.submissions.submitted_at,
        formType: c.submissions.form_type,
      }));

      const sorted = [...adaptedData].sort((a, b) => {
        for (const { column, direction } of sorts) {
          const aVal = a[column as keyof typeof a];
          const bVal = b[column as keyof typeof b];
          const dir = direction === "asc" ? 1 : -1;
          if (aVal == null && bVal == null) continue;
          if (aVal == null) return 1;
          if (bVal == null) return -1;
          if (column === "submittedAt") {
            const cmp =
              new Date(aVal as string).getTime() - new Date(bVal as string).getTime();
            if (cmp !== 0) return cmp * dir;
          } else {
            if (aVal > bVal) return dir;
            if (aVal < bVal) return -dir;
          }
        }
        return 0;
      });

      filtered = sorted.map((s) => cases.find((c) => c.id === s.id)!).filter(Boolean);
    }

    return filtered;
  }, [cases, activeTab, searchTerm, appliedFilters, sorts]);

  // Clear all
  const handleClearAll = useCallback(() => {
    setSearchTerm("");
    clearAllFilters();
    setSorts([]);
  }, []);

  // Handle tab change
  const handleTabChange = (e: { tab: number }) => {
    const tabMap: TabCategory[] = [
      "all",
      "unassigned",
      "assigned_to_me",
      "waiting",
      "complete",
    ];
    setActiveTab(tabMap[e.tab - 1] || "all");
  };

  // Get tab index from category (1-based)
  const getTabIndex = (tab: TabCategory): number => {
    const tabMap: TabCategory[] = [
      "all",
      "unassigned",
      "assigned_to_me",
      "waiting",
      "complete",
    ];
    return tabMap.indexOf(tab) + 1;
  };

  // Sort actions (for Sort menu in card/list views)
  const handleSortAction = (action: string) => {
    if (action === "clear-sort") {
      setSorts([]);
      return;
    }
    const key = action.replace("sort-", "");
    setSorts((prev) => {
      const existing = prev.find((s) => s.column === key);
      if (existing) {
        // Cycle: asc → desc → remove
        if (existing.direction === "asc") {
          return prev.map((s) =>
            s.column === key ? { ...s, direction: "desc" as const } : s,
          );
        }
        const remaining = prev.filter((s) => s.column !== key);
        return remaining;
      }
      // New column: add if under 2
      if (prev.length < 2) {
        return [...prev, { column: key, direction: "asc" as const }];
      }
      return prev;
    });
  };

  // Handle multi-sort from table component
  const handleMultiSort = useCallback((detail: GoabTableOnMultiSortDetail) => {
    setSorts(detail.sorts);
  }, []);

  const getSortIndicator = (key: string): string => {
    const index = sorts.findIndex((s) => s.column === key);
    if (index === -1) return "";
    const arrow = sorts[index].direction === "asc" ? "↑" : "↓";
    return sorts.length > 1 ? ` (${index === 0 ? "1st" : "2nd"} ${arrow})` : ` ${arrow}`;
  };

  // Table columns
  const columns: TableColumn<CaseWithSubmission>[] = useMemo(
    () => [
      {
        key: "name",
        header: "Applicant",
        type: "link",
        sortable: true,
        render: (c) => (
          <Link to={`/workspace/application/${c.id}`} className="table-row-link">
            {formatCitizenName(c.submissions)}
          </Link>
        ),
      },
      {
        key: "status",
        header: "Status",
        type: "badge",
        sortable: true,
        render: (c) => (
          <GoabxBadge
            type={getStatusBadgeType(c.status)}
            content={getStatusText(c.status)}
            emphasis="subtle"
            icon={false}
          />
        ),
      },
      {
        key: "referenceNumber",
        header: "Reference",
        type: "text",
        sortable: false,
        render: (c) => c.submissions.reference_number,
      },
      {
        key: "submittedAt",
        header: "Submitted",
        type: "text",
        sortable: true,
        render: (c) => formatDate(c.submissions.submitted_at),
      },
      {
        key: "assignedWorker",
        header: "Assigned To",
        type: "text",
        render: (c) => c.assigned_worker || "—",
      },
      {
        key: "formType",
        header: "Type",
        type: "text",
        sortable: true,
        render: (c) => c.submissions.form_type,
      },
    ],
    [],
  );

  // Header actions
  const headerActions = useMemo(
    () => (
      <GoabButtonGroup gap="compact" alignment="start">
        <GoabxButton type="secondary" size="compact">
          More
        </GoabxButton>
        <GoabxButton type="primary" size="compact" onClick={() => navigate("/")}>
          New application
        </GoabxButton>
      </GoabButtonGroup>
    ),
    [navigate],
  );

  // Header toolbar
  const headerToolbar = useMemo(
    () => (
      <div className="cases-toolbar-row">
        <div className="cases-toolbar-tabs">
          <GoabxTabs
            initialTab={getTabIndex(activeTab)}
            variant="segmented"
            onChange={handleTabChange}
          >
            <GoabTab heading="All" />
            <GoabTab
              heading={
                <>
                  Unassigned{" "}
                  {tabCounts.unassigned > 0 && (
                    <GoabxBadge
                      type="information"
                      content={String(tabCounts.unassigned)}
                      emphasis="subtle"
                    />
                  )}
                </>
              }
            />
            <GoabTab
              heading={
                <>
                  Assigned to me{" "}
                  {tabCounts.assignedToMe > 0 && (
                    <GoabxBadge
                      type="information"
                      content={String(tabCounts.assignedToMe)}
                      emphasis="subtle"
                    />
                  )}
                </>
              }
            />
            <GoabTab
              heading={
                <>
                  Waiting{" "}
                  {tabCounts.waiting > 0 && (
                    <GoabxBadge
                      type="important"
                      content={String(tabCounts.waiting)}
                      emphasis="subtle"
                    />
                  )}
                </>
              }
            />
            <GoabTab heading="Complete" />
          </GoabxTabs>
          <div className="cases-toolbar-tabs__spacer" aria-hidden="true" />
        </div>
        <div className="cases-search-row">
          <div className="cases-search-group">
            <GoabxFormItem>
              <GoabxInput
                name="search"
                value={searchTerm}
                leadingIcon="search"
                width="100%"
                size="compact"
                placeholder="Search..."
                onChange={(e: GoabInputOnChangeDetail) => setSearchTerm(e.value)}
              />
            </GoabxFormItem>
          </div>
          <div className="cases-actions-group">
            <GoabxMenuButton
              type="tertiary"
              size="compact"
              leadingIcon={isCompactToolbar ? "swap-vertical" : undefined}
              text={isCompactToolbar ? "" : "Sort"}
              onAction={(e: GoabMenuButtonOnActionDetail) => handleSortAction(e.action)}
            >
              <GoabxMenuAction
                text={`Status${getSortIndicator("status")}`}
                action="sort-status"
              />
              <GoabxMenuAction
                text={`Submitted date${getSortIndicator("submittedAt")}`}
                action="sort-submittedAt"
              />
              <GoabxMenuAction
                text={`Applicant name${getSortIndicator("name")}`}
                action="sort-name"
              />
              <GoabxMenuAction
                text={`Form type${getSortIndicator("formType")}`}
                action="sort-formType"
              />
              {sorts.length > 0 && (
                <GoabxMenuAction text="Clear sort" action="clear-sort" />
              )}
            </GoabxMenuButton>
            {isCompactToolbar ? (
              <GoabIconButton
                icon="filter-lines"
                size="medium"
                variant="dark"
                ariaLabel="Filter"
                onClick={() => {
                  setPendingFilters(appliedFilters);
                  setFilterDrawerOpen(true);
                }}
              />
            ) : (
              <GoabxButton
                type="tertiary"
                leadingIcon="filter-lines"
                size="compact"
                onClick={() => {
                  setPendingFilters(appliedFilters);
                  setFilterDrawerOpen(true);
                }}
              >
                Filter
              </GoabxButton>
            )}
            <SettingsPopover
              settings={viewSettings}
              onSettingsChange={(s) => handleSettingsChange(s, defaultLayout)}
              defaultLayout={defaultLayout}
              isMobile={isMobile}
              isCompact={isCompactToolbar}
            />
          </div>
        </div>
      </div>
    ),
    [
      activeTab,
      searchTerm,
      sorts,
      appliedFilters,
      viewSettings,
      defaultLayout,
      isMobile,
      isCompactToolbar,
      tabCounts,
      handleSettingsChange,
    ],
  );

  // Set page header
  usePageHeader("Applications", {
    actions: headerActions,
    toolbar: headerToolbar,
  });

  // Error state
  if (error) {
    return (
      <div className="cases-content-padding">
        <div style={{ padding: "var(--goa-space-xl)", textAlign: "center" }}>
          <GoabText size="body-m">{error}</GoabText>
          <GoabxButton
            type="secondary"
            size="compact"
            mt="m"
            onClick={() => window.location.reload()}
          >
            Retry
          </GoabxButton>
        </div>
      </div>
    );
  }

  // Empty state
  const emptyStateContent =
    cases.length === 0 ? (
      <EmptyState
        heading="No applications yet"
        subline="Submit a form to create your first application."
        buttonText=""
      />
    ) : (
      <EmptyState
        heading="No matching applications"
        subline="Try adjusting your search or filters."
        buttonText="Clear filters"
        onButtonClick={handleClearAll}
      />
    );

  return (
    <div style={{ maxWidth: "100%", overflow: "hidden", paddingBottom: "16px" }}>
      {/* Filter chips section */}
      <div className="cases-content-padding">
        {(searchTerm || filterChips.length > 0 || sorts.length > 0) && (
          <div className="cases-chips-container">
            <GoabIcon
              type="filter-lines"
              size="small"
              fillColor="var(--goa-color-text-secondary)"
              mr="2xs"
            />
            {sorts.map((sort, index) => (
              <GoabxFilterChip
                key={sort.column}
                content={sortFieldLabels[sort.column] || sort.column}
                leadingIcon={sort.direction === "asc" ? "arrow-up" : "arrow-down"}
                secondaryText={
                  sorts.length > 1 ? (index === 0 ? "1st" : "2nd") : undefined
                }
                onClick={() =>
                  setSorts((prev) => prev.filter((s) => s.column !== sort.column))
                }
              />
            ))}
            {searchTerm && (
              <GoabxFilterChip content={searchTerm} onClick={() => setSearchTerm("")} />
            )}
            {filterChips.map((chip) => (
              <GoabxFilterChip
                key={`${chip.category}-${chip.value}`}
                content={chip.label}
                onClick={() => removeAppliedFilter(chip.category, chip.value)}
              />
            ))}
            <GoabxLink color="dark" size="small">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleClearAll();
                }}
              >
                Clear all
              </a>
            </GoabxLink>
          </div>
        )}
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <DataTable
          columns={columns.filter((c) => viewSettings.visibleColumns.includes(c.key))}
          data={filteredCases}
          isLoading={isLoading}
          skeletonRows={10}
          onMultiSort={handleMultiSort}
          emptyState={emptyStateContent}
          getRowKey={(c) => c.id}
        />
      )}

      {/* Card View */}
      {viewMode === "card" && (
        <div className="cases-content-padding">
          {filteredCases.length === 0 && !isLoading ? (
            emptyStateContent
          ) : (
            <CardView
              data={filteredCases}
              isLoading={isLoading}
              getRowKey={(c) => c.id}
              renderCard={(c) => ({
                title: (
                  <GoabText size="heading-xs" mt="none" mb="none">
                    {formatCitizenName(c.submissions)}
                  </GoabText>
                ),
                badge: (
                  <GoabxBadge
                    type={getStatusBadgeType(c.status)}
                    content={getStatusText(c.status)}
                    emphasis="subtle"
                    icon={false}
                  />
                ),
                actions: (
                  <GoabxButton
                    type="tertiary"
                    size="compact"
                    onClick={() => navigate(`/workspace/application/${c.id}`)}
                  >
                    View
                  </GoabxButton>
                ),
                sections: [
                  {
                    heading: "Submission",
                    fields: [
                      { label: "Reference", value: c.submissions.reference_number },
                      { label: "Form type", value: c.submissions.form_type },
                    ],
                  },
                  {
                    heading: "Assignment",
                    fields: [
                      { label: "Assigned to", value: c.assigned_worker || "Unassigned" },
                      {
                        label: "Submitted",
                        value: formatDate(c.submissions.submitted_at),
                      },
                      { label: "Status", value: getStatusText(c.status) },
                    ],
                  },
                ],
              })}
            />
          )}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="cases-content-padding">
          {filteredCases.length === 0 && !isLoading ? (
            emptyStateContent
          ) : (
            <ExpandableListView
              data={filteredCases}
              isLoading={isLoading}
              getRowKey={(c) => c.id}
              renderCollapsed={(c) => ({
                title: (
                  <span className="expandable-list__name">
                    {formatCitizenName(c.submissions)}
                  </span>
                ),
                badge: (
                  <GoabxBadge
                    type={getStatusBadgeType(c.status)}
                    content={getStatusText(c.status)}
                    emphasis="subtle"
                    icon={false}
                  />
                ),
                secondaryInfo: (
                  <span
                    style={{
                      font: "var(--goa-typography-body-xs)",
                      color: "var(--goa-color-text-secondary)",
                    }}
                  >
                    {c.submissions.reference_number}
                  </span>
                ),
                actions: (
                  <GoabxButton
                    type="tertiary"
                    size="compact"
                    onClick={() => navigate(`/workspace/application/${c.id}`)}
                  >
                    View
                  </GoabxButton>
                ),
              })}
              renderExpanded={(c) => (
                <div className="case-card__sections">
                  <div className="case-card__section">
                    <div className="case-card__section-heading">Submission</div>
                    <div className="case-card__section-fields">
                      <GoabBlock direction="column" gap="xs">
                        <span className="case-card__label">Reference</span>
                        <span className="case-card__value">
                          {c.submissions.reference_number}
                        </span>
                      </GoabBlock>
                      <GoabBlock direction="column" gap="xs">
                        <span className="case-card__label">Submitted</span>
                        <span className="case-card__value">
                          {formatDate(c.submissions.submitted_at)}
                        </span>
                      </GoabBlock>
                      <GoabBlock direction="column" gap="xs">
                        <span className="case-card__label">Form Type</span>
                        <span className="case-card__value">
                          {c.submissions.form_type}
                        </span>
                      </GoabBlock>
                    </div>
                  </div>
                  <div className="case-card__section">
                    <div className="case-card__section-heading">Assignment</div>
                    <div className="case-card__section-fields">
                      <GoabBlock direction="column" gap="xs">
                        <span className="case-card__label">Assigned to</span>
                        <span className="case-card__value">
                          {c.assigned_worker || "Unassigned"}
                        </span>
                      </GoabBlock>
                      <GoabBlock direction="column" gap="xs">
                        <span className="case-card__label">Email</span>
                        <span className="case-card__value">
                          {c.submissions.citizen_email || "—"}
                        </span>
                      </GoabBlock>
                    </div>
                  </div>
                </div>
              )}
            />
          )}
        </div>
      )}

      {/* Filter Push Drawer - portaled to layout level for proper push behavior */}
      {document.getElementById("page-push-drawer-portal") &&
        createPortal(
          <div
            className={`push-drawer-container ${filterDrawerOpen ? "push-drawer-container--open" : ""}`}
          >
            <div className="push-drawer-clip">
              <GoabPushDrawer
                open={filterDrawerOpen}
                heading="Filter applications"
                onClose={() => setFilterDrawerOpen(false)}
                actions={
                  <GoabButtonGroup alignment="start" gap="compact">
                    <GoabxButton type="primary" size="compact" onClick={applyFilters}>
                      Apply filters
                    </GoabxButton>
                    <GoabxButton
                      type="tertiary"
                      size="compact"
                      onClick={() => setFilterDrawerOpen(false)}
                    >
                      Cancel
                    </GoabxButton>
                  </GoabButtonGroup>
                }
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--goa-space-l)",
                  }}
                >
                  <GoabxFormItem label="Status">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--goa-space-xs)",
                      }}
                    >
                      {filterOptions.statuses.map((status) => (
                        <GoabxCheckbox
                          key={status}
                          name={`status-${status}`}
                          text={getStatusText(status as CaseWithSubmission["status"])}
                          checked={pendingFilters.status.includes(status)}
                          onChange={() => togglePendingFilter("status", status)}
                        />
                      ))}
                    </div>
                  </GoabxFormItem>

                  {filterOptions.workers.length > 0 && (
                    <GoabxFormItem label="Assigned to">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "var(--goa-space-xs)",
                        }}
                      >
                        {filterOptions.workers.map((worker) => (
                          <GoabxCheckbox
                            key={worker}
                            name={`worker-${worker}`}
                            text={worker}
                            checked={pendingFilters.assignedWorker.includes(worker)}
                            onChange={() => togglePendingFilter("assignedWorker", worker)}
                          />
                        ))}
                      </div>
                    </GoabxFormItem>
                  )}

                  {Object.values(pendingFilters).some((arr) => arr.length > 0) && (
                    <>
                      <GoabDivider />
                      <GoabxButton
                        type="tertiary"
                        size="compact"
                        onClick={() =>
                          setPendingFilters({ status: [], assignedWorker: [] })
                        }
                      >
                        Clear all filters
                      </GoabxButton>
                    </>
                  )}
                </div>
              </GoabPushDrawer>
            </div>
          </div>,
          document.getElementById("page-push-drawer-portal")!,
        )}
    </div>
  );
}
