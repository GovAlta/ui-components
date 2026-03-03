import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoabDivider, GoabIconButton, GoabSkeleton, GoabText } from "@abgov/react-components";
import { GoabxBadge, GoabxButton, GoabxLink } from "@abgov/react-components/experimental";
import { supabase, CaseWithSubmission } from "../../lib/supabase";
import { getDateGroupLabel, formatRelativeTime } from "../../workspace/utils/dateUtils";
import "./TimelinePage.css";

// Types
interface Action {
  id: string;
  case_id: string;
  action_type: string;
  actor: string;
  details: Record<string, any>;
  created_at: string;
}

interface Comment {
  id: number;
  author: string;
  timestamp: string;
  text: string;
  isOwned: boolean;
}

interface TimelineItem {
  id: string;
  type: "action" | "comment";
  title: string;
  description: string;
  timestamp: Date;
  actor: string;
  badge?: { label: string; type: "success" | "important" | "information" | "emergency" | "archived" };
}

// Map action types to display info
function getActionDisplay(action: Action): { title: string; description: string; badge?: TimelineItem["badge"] } {
  const { action_type, actor, details } = action;

  switch (action_type) {
    case "assigned":
      return {
        title: "Assigned",
        description: `${actor} assigned this application to themselves`,
        badge: { label: "Status Change", type: "information" },
      };

    case "status_change":
      if (details.new_status === "approved") {
        return {
          title: "Approved",
          description: details.note
            ? `${actor} approved this application: "${details.note}"`
            : `${actor} approved this application`,
          badge: { label: "Decision", type: "success" },
        };
      }
      if (details.new_status === "denied") {
        return {
          title: "Denied",
          description: `${actor} denied this application: "${details.reason}"`,
          badge: { label: "Decision", type: "emergency" },
        };
      }
      if (details.action === "unassigned") {
        return {
          title: "Unassigned",
          description: `${actor} unassigned this application`,
          badge: { label: "Status Change", type: "archived" },
        };
      }
      return {
        title: "Status Changed",
        description: `${actor} changed the status`,
        badge: { label: "Status Change", type: "information" },
      };

    case "feedback_sent":
      return {
        title: "Information Requested",
        description: `${actor} requested more information: "${details.request}"`,
        badge: { label: "Action Required", type: "important" },
      };

    case "submitted":
      return {
        title: "Application Submitted",
        description: `${actor} submitted this application`,
        badge: { label: "New", type: "information" },
      };

    default:
      return {
        title: action_type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        description: `${actor} performed an action`,
      };
  }
}

export function TimelinePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [caseData, setCaseData] = useState<CaseWithSubmission | null>(null);
  const [actions, setActions] = useState<Action[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  // Load comments from localStorage
  useEffect(() => {
    const storedComments = localStorage.getItem("caseComments");
    if (storedComments) {
      try {
        setComments(JSON.parse(storedComments));
      } catch (e) {
        console.error("Failed to parse stored comments", e);
      }
    }
  }, []);

  // Fetch case and actions
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsLoading(true);

      // Fetch case data
      const { data: caseResult, error: caseError } = await supabase
        .from("cases")
        .select(`*, submissions (*)`)
        .eq("id", id)
        .single();

      if (caseError) {
        console.error("Error fetching case:", caseError);
      } else {
        setCaseData(caseResult as CaseWithSubmission);
      }

      // Fetch actions
      const { data: actionsResult, error: actionsError } = await supabase
        .from("actions")
        .select("*")
        .eq("case_id", id)
        .order("created_at", { ascending: false });

      if (actionsError) {
        console.error("Error fetching actions:", actionsError);
      } else {
        setActions(actionsResult || []);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  // Convert actions and comments to timeline items
  const timelineItems = useMemo(() => {
    const items: TimelineItem[] = [];

    // Add actions
    for (const action of actions) {
      const display = getActionDisplay(action);
      items.push({
        id: `action-${action.id}`,
        type: "action",
        title: display.title,
        description: display.description,
        timestamp: new Date(action.created_at),
        actor: action.actor,
        badge: display.badge,
      });
    }

    // Add comments
    for (const comment of comments) {
      items.push({
        id: `comment-${comment.id}`,
        type: "comment",
        title: "Comment",
        description: comment.text,
        timestamp: new Date(comment.timestamp),
        actor: comment.author,
      });
    }

    // Sort by timestamp descending (newest first)
    items.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return items;
  }, [actions, comments]);

  // Group items by date
  const groupedItems = useMemo(() => {
    const groups: { label: string; items: TimelineItem[] }[] = [];

    for (const item of timelineItems) {
      const label = getDateGroupLabel(item.timestamp);
      const existingGroup = groups.find((g) => g.label === label);

      if (existingGroup) {
        existingGroup.items.push(item);
      } else {
        groups.push({ label, items: [item] });
      }
    }

    return groups;
  }, [timelineItems]);

  const citizenName = caseData?.submissions?.citizen_name || "Application";

  if (!caseData && !isLoading) {
    return (
      <div className="timeline-page">
        <div className="timeline-page__content">
          <GoabText size="heading-m">Application not found</GoabText>
          <GoabxButton type="tertiary" onClick={() => navigate("/workspace/applications")}>
            Back to applications
          </GoabxButton>
        </div>
      </div>
    );
  }

  return (
    <div className="timeline-page">
      {/* Header */}
      <div className="timeline-page__header">
        <div className="timeline-page__header-left">
          <GoabxLink color="dark" leadingIcon="arrow-back">
            <a href={`/workspace/application/${id}`}>Back to application</a>
          </GoabxLink>
        </div>
        <GoabText size="heading-m" mt="m" mb="none">
          Timeline: {isLoading ? "Loading..." : citizenName}
        </GoabText>
        <GoabText size="body-s" color="secondary" mt="xs" mb="none">
          {caseData?.submissions?.reference_number}
        </GoabText>
      </div>

      <GoabDivider mt="l" mb="l" />

      {/* Timeline content */}
      <div className="timeline-page__content">
        {isLoading ? (
          <div className="timeline-page__loading">
            <GoabSkeleton type="text" maxWidth="300px" />
            <GoabSkeleton type="text" maxWidth="400px" />
            <GoabSkeleton type="text" maxWidth="350px" />
          </div>
        ) : groupedItems.length === 0 ? (
          <div className="timeline-page__empty">
            <GoabText color="secondary">No activity recorded for this application yet.</GoabText>
          </div>
        ) : (
          <div className="timeline-page__groups">
            {groupedItems.map((group) => (
              <div key={group.label} className="timeline-page__group">
                <GoabText size="body-s" color="secondary" mb="m">
                  {group.label}
                </GoabText>

                <div className="timeline-page__items">
                  {group.items.map((item) => (
                    <div key={item.id} className="timeline-page__item">
                      <div className="timeline-page__item-header">
                        <div className="timeline-page__item-title-row">
                          <GoabText size="body-m" mb="none" mt="none">
                            <strong>{item.title}</strong>
                          </GoabText>
                          {item.badge && (
                            <GoabxBadge
                              type={item.badge.type}
                              emphasis="subtle"
                              content={item.badge.label}
                            />
                          )}
                        </div>
                        <GoabText size="body-xs" color="secondary" mb="none" mt="none">
                          {formatRelativeTime(item.timestamp.toISOString())}
                        </GoabText>
                      </div>

                      <GoabText size="body-s" color="secondary" mb="none" mt="xs">
                        {item.description}
                      </GoabText>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
