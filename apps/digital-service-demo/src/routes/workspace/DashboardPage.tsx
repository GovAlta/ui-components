import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoabText, GoabGrid, GoabIcon, GoabSkeleton } from "@abgov/react-components";
import { GoabxButton, GoabxBadge } from "@abgov/react-components/experimental";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { usePageHeader } from "../../workspace/contexts/PageHeaderContext";
import { useMenu } from "../../workspace/contexts/MenuContext";
import { useIsDarkMode } from "../../workspace/hooks/useIsDarkMode";
import { supabase, CaseWithSubmission } from "../../lib/supabase";
import "./DashboardPage.css";

// Chart chrome colors (grid, axis, tooltip) - light and dark variants
const CHART_CHROME = {
  light: {
    grid: "#e5e5e5",
    axisText: "#666",
    tooltipBg: "#fff",
    tooltipBorder: "#e5e5e5",
  },
  dark: {
    grid: "#3d3d3d",
    axisText: "#999",
    tooltipBg: "#2a2a2a",
    tooltipBorder: "#3d3d3d",
  },
};

// GoA Design System colors for chart series (work in both modes)
const CHART_COLORS = {
  lilac: "#ae7fe6", // New cases
  pasture: "#4caf50", // Completed
  sunset: "#f2a71e", // Updated
};

// Mock chart data (last 7 days)
const mockChartData = [
  { date: "Mon", newCases: 2, completed: 1, updated: 5 },
  { date: "Tue", newCases: 1, completed: 2, updated: 3 },
  { date: "Wed", newCases: 3, completed: 1, updated: 4 },
  { date: "Thu", newCases: 0, completed: 3, updated: 2 },
  { date: "Fri", newCases: 2, completed: 2, updated: 6 },
  { date: "Sat", newCases: 0, completed: 0, updated: 1 },
  { date: "Sun", newCases: 1, completed: 1, updated: 2 },
];

// Get time-aware greeting
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

// Format date for header
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Format short date for mobile header
function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-CA", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

// Format relative time from date
function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-CA", { month: "short", day: "numeric" });
}

// Get status badge type
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

// Get status display text
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

// Format citizen name from submission
function formatCitizenName(submission: CaseWithSubmission["submissions"]): string {
  if (submission.citizen_name) return submission.citizen_name;
  const formData = submission.form_data as Record<string, unknown>;
  const firstName = formData.firstName || formData.first_name || "";
  const lastName = formData.lastName || formData.last_name || "";
  if (firstName || lastName) return `${firstName} ${lastName}`.trim();
  return "Unknown Citizen";
}

// Stat Card component
type StatCardTint = "emergency" | "success" | "info" | undefined;

interface StatCardProps {
  value: number;
  label: string;
  icon: string;
  tint?: StatCardTint;
  onClick?: () => void;
  isLoading?: boolean;
}

const tintIconColors: Record<string, string> = {
  emergency: "var(--goa-color-emergency-default)",
  success: "var(--goa-color-success-default)",
  info: "var(--goa-color-info-default)",
};

function StatCard({ value, label, icon, tint, onClick, isLoading }: StatCardProps) {
  const tintClass = tint ? `dashboard-stat-card--${tint}` : "";
  return (
    <div
      className={`dashboard-stat-card ${tintClass} ${onClick ? "dashboard-stat-card--clickable" : ""}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
    >
      <div className="dashboard-stat-card__icon">
        <GoabIcon
          type={icon as never}
          size="medium"
          fillColor={tint ? tintIconColors[tint] : "var(--goa-color-interactive-default)"}
        />
      </div>
      <div className="dashboard-stat-card__content">
        {isLoading ? (
          <GoabSkeleton type="title" maxWidth="40px" />
        ) : (
          <span
            className={`dashboard-stat-card__value ${tint ? `dashboard-stat-card__value--${tint}` : ""}`}
          >
            {value}
          </span>
        )}
        <span
          className={`dashboard-stat-card__label ${tint ? `dashboard-stat-card__label--${tint}` : ""}`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

// Dashboard Widget wrapper
interface WidgetProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

function Widget({ title, action, children }: WidgetProps) {
  return (
    <div className="dashboard-widget">
      <div className="dashboard-widget__header">
        <GoabText size="heading-xs" mt="none" mb="none">
          {title}
        </GoabText>
        {action}
      </div>
      <div className="dashboard-widget__content">{children}</div>
    </div>
  );
}

// Work Queue Card
interface WorkQueueCardProps {
  caseItem: CaseWithSubmission;
  isUrgent: boolean;
}

function WorkQueueCard({ caseItem, isUrgent }: WorkQueueCardProps) {
  return (
    <Link to={`/workspace/application/${caseItem.id}`} className="dashboard-queue-card">
      <div className="dashboard-queue-card__main">
        <div className="dashboard-queue-card__header">
          <span className="dashboard-queue-card__name">
            {formatCitizenName(caseItem.submissions)}
          </span>
          <span
            className={`dashboard-queue-card__date ${isUrgent ? "dashboard-queue-card__date--highlight" : ""}`}
          >
            {formatRelativeDate(caseItem.submissions.submitted_at)}
          </span>
        </div>
        <div className="dashboard-queue-card__badges">
          <GoabxBadge
            type={getStatusBadgeType(caseItem.status)}
            content={getStatusText(caseItem.status)}
            emphasis="subtle"
            icon={false}
          />
          <GoabxBadge
            type="information"
            content={caseItem.submissions.reference_number}
            emphasis="subtle"
          />
        </div>
      </div>
    </Link>
  );
}

// Recent Item
interface RecentItemProps {
  caseItem: CaseWithSubmission;
  relativeDate: string;
}

function RecentItem({ caseItem, relativeDate }: RecentItemProps) {
  return (
    <Link to={`/workspace/application/${caseItem.id}`} className="dashboard-recent-item">
      <span className="dashboard-recent-item__date">{relativeDate}</span>
      <span className="dashboard-recent-item__name">
        {formatCitizenName(caseItem.submissions)}
      </span>
    </Link>
  );
}

export function DashboardPage() {
  const navigate = useNavigate();
  const { isMobile } = useMenu();
  const isDark = useIsDarkMode();
  const chrome = isDark ? CHART_CHROME.dark : CHART_CHROME.light;
  const [cases, setCases] = useState<CaseWithSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cases from Supabase
  useEffect(() => {
    async function fetchCases() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("cases")
        .select(
          `
          *,
          submissions (*)
        `,
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching cases:", error);
      } else if (data) {
        setCases(data as CaseWithSubmission[]);
      }
      setIsLoading(false);
    }
    fetchCases();
  }, []);

  // Calculate stats from cases
  const stats = useMemo(() => {
    const active = cases.filter((c) => c.status === "under_review").length;
    const needsReview = cases.filter((c) => c.status === "submitted").length;
    const pendingResponse = cases.filter((c) => c.status === "info_requested").length;
    const completed = cases.filter(
      (c) => c.status === "approved" || c.status === "denied",
    ).length;

    return { active, needsReview, pendingResponse, completed };
  }, [cases]);

  // Get cases assigned to current worker (Edna Mode), oldest first
  const workQueue = useMemo(() => {
    return cases
      .filter((c) => c.assigned_worker === "Edna Mode")
      .sort(
        (a, b) =>
          new Date(a.submissions.submitted_at).getTime() -
          new Date(b.submissions.submitted_at).getTime(),
      )
      .slice(0, 5);
  }, [cases]);

  // Get recent submissions
  const recentSubmissions = useMemo(() => {
    return cases.slice(0, 5).map((c) => ({
      ...c,
      relativeDate: formatRelativeDate(c.submissions.submitted_at),
    }));
  }, [cases]);

  // Set page header (mobile only)
  usePageHeader(
    isMobile ? "Overview" : "",
    isMobile
      ? {
          actions: (
            <span
              style={{
                font: "var(--goa-typography-body-s)",
                color: "var(--goa-color-text-secondary)",
              }}
            >
              {formatShortDate(new Date())}
            </span>
          ),
        }
      : undefined,
  );

  // Handle stat card clicks - navigate to appropriate tab
  const handleStatClick = (tab: string) => {
    navigate(`/workspace/applications?tab=${tab}`);
  };

  return (
    <div className="dashboard-page">
      {/* Personalized Greeting */}
      <div className="dashboard-greeting">
        <div className="dashboard-greeting__content">
          <GoabText
            size={isMobile ? "heading-s" : "heading-m"}
            mt="none"
            mb="none"
            color={isMobile ? "secondary" : undefined}
          >
            {getGreeting()}, Edna
          </GoabText>
          {!isMobile && (
            <span className="dashboard-greeting__subtitle">
              Here's your workload overview
            </span>
          )}
        </div>
        {!isMobile && (
          <span className="dashboard-greeting__date">{formatDate(new Date())}</span>
        )}
      </div>

      {/* Stats Row */}
      {isMobile ? (
        <div className="dashboard-stats-grid">
          <StatCard
            value={stats.active}
            label="Under Review"
            icon="eye"
            tint="info"
            isLoading={isLoading}
            onClick={() => handleStatClick("assigned_to_me")}
          />
          <StatCard
            value={stats.needsReview}
            label="Needs Review"
            icon="mail"
            tint={stats.needsReview > 0 ? "emergency" : undefined}
            isLoading={isLoading}
            onClick={() => handleStatClick("unassigned")}
          />
          <StatCard
            value={stats.pendingResponse}
            label="Pending Response"
            icon="time"
            tint={stats.pendingResponse > 0 ? "emergency" : undefined}
            isLoading={isLoading}
            onClick={() => handleStatClick("waiting")}
          />
          <StatCard
            value={stats.completed}
            label="Completed"
            icon="checkmark-circle"
            tint="success"
            isLoading={isLoading}
            onClick={() => handleStatClick("complete")}
          />
        </div>
      ) : (
        <GoabGrid minChildWidth="180px" gap="m">
          <StatCard
            value={stats.active}
            label="Under Review"
            icon="eye"
            tint="info"
            isLoading={isLoading}
            onClick={() => handleStatClick("assigned_to_me")}
          />
          <StatCard
            value={stats.needsReview}
            label="Needs Review"
            icon="mail"
            tint={stats.needsReview > 0 ? "emergency" : undefined}
            isLoading={isLoading}
            onClick={() => handleStatClick("unassigned")}
          />
          <StatCard
            value={stats.pendingResponse}
            label="Pending Response"
            icon="time"
            tint={stats.pendingResponse > 0 ? "emergency" : undefined}
            isLoading={isLoading}
            onClick={() => handleStatClick("waiting")}
          />
          <StatCard
            value={stats.completed}
            label="Completed"
            icon="checkmark-circle"
            tint="success"
            isLoading={isLoading}
            onClick={() => handleStatClick("complete")}
          />
        </GoabGrid>
      )}

      {/* Case Activity Chart */}
      {!isMobile && (
        <Widget title="Case Activity (Last 7 Days)">
          <div className="dashboard-chart">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={mockChartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={chrome.grid} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: chrome.axisText }}
                  axisLine={{ stroke: chrome.grid }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: chrome.axisText }}
                  axisLine={{ stroke: chrome.grid }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chrome.tooltipBg,
                    border: `1px solid ${chrome.tooltipBorder}`,
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                <Area
                  type="monotone"
                  dataKey="newCases"
                  name="New"
                  stroke={CHART_COLORS.lilac}
                  fill={CHART_COLORS.lilac}
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  name="Completed"
                  stroke={CHART_COLORS.pasture}
                  fill={CHART_COLORS.pasture}
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="updated"
                  name="Updated"
                  stroke={CHART_COLORS.sunset}
                  fill={CHART_COLORS.sunset}
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Widget>
      )}

      {/* Two-Column Main Content */}
      <div className="dashboard-main">
        {/* Left Column - Assigned to me */}
        <div className="dashboard-main__left">
          <Widget
            title="Assigned to me"
            action={
              <GoabxButton
                type="tertiary"
                size="compact"
                onClick={() => navigate("/workspace/applications?tab=assigned_to_me")}
              >
                View all
              </GoabxButton>
            }
          >
            <div className="dashboard-queue">
              {isLoading ? (
                <div className="dashboard-loading">
                  <GoabSkeleton type="text" lineCount={3} />
                </div>
              ) : workQueue.length === 0 ? (
                <p className="dashboard-empty">No applications need attention</p>
              ) : (
                workQueue.map((caseItem) => (
                  <WorkQueueCard
                    key={caseItem.id}
                    caseItem={caseItem}
                    isUrgent={caseItem.status === "info_requested"}
                  />
                ))
              )}
            </div>
          </Widget>
        </div>

        {/* Right Column - Recent Submissions */}
        <div className="dashboard-main__right">
          <Widget title="Recent Submissions">
            <div className="dashboard-recent">
              {isLoading ? (
                <div className="dashboard-loading">
                  <GoabSkeleton type="text" lineCount={3} />
                </div>
              ) : recentSubmissions.length === 0 ? (
                <p className="dashboard-empty">No submissions yet</p>
              ) : (
                recentSubmissions.map((item) => (
                  <RecentItem
                    key={item.id}
                    caseItem={item}
                    relativeDate={item.relativeDate}
                  />
                ))
              )}
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
}
