import { useState, useEffect, useMemo } from "react";
import {
  GoabButtonGroup,
  GoabDivider,
  GoabFormItem,
  GoabText,
  GoabTextArea,
} from "@abgov/react-components";
import {
  GoabxBadge,
  GoabxButton,
  GoabxDrawer,
  GoabxMenuAction,
  GoabxMenuButton,
  GoabxModal,
} from "@abgov/react-components/experimental";
import { supabase } from "../../lib/supabase";
import { getDateGroupLabel, formatRelativeTime } from "../utils/dateUtils";

// Types
interface Action {
  id: string;
  case_id: string;
  action_type: string;
  actor: string;
  details: Record<string, any>;
  created_at: string;
}

export interface Comment {
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
  isOwned?: boolean;
  originalComment?: Comment;
}

interface TimelineDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string | undefined;
  comments: Comment[];
  onAddComment: (text: string) => void;
  onEditComment: (id: number, text: string) => void;
  onDeleteComment: (id: number) => void;
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

    default:
      return {
        title: action_type,
        description: `${actor} performed an action`,
      };
  }
}

export function TimelineDrawer({
  isOpen,
  onClose,
  caseId,
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
}: TimelineDrawerProps) {
  const [actions, setActions] = useState<Action[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [deleteCommentId, setDeleteCommentId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch actions when drawer opens
  useEffect(() => {
    if (isOpen && caseId) {
      fetchActions();
    }
  }, [isOpen, caseId]);

  const fetchActions = async () => {
    if (!caseId) return;
    setIsLoading(true);

    const { data, error } = await supabase
      .from("actions")
      .select("*")
      .eq("case_id", caseId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching actions:", error);
    } else {
      setActions(data || []);
    }
    setIsLoading(false);
  };

  // Combine actions and comments into timeline items
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
        isOwned: comment.isOwned,
        originalComment: comment,
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

  // Comment handlers
  const handleSaveComment = () => {
    if (commentText.trim()) {
      onAddComment(commentText.trim());
      setCommentText("");
    }
  };

  const handleClearComment = () => {
    setCommentText("");
  };

  const handleEditComment = (commentId: number) => {
    const comment = comments.find((c) => c.id === commentId);
    if (comment) {
      setEditingCommentId(commentId);
      setEditingCommentText(comment.text);
    }
  };

  const handleSaveEditComment = () => {
    if (editingCommentId !== null && editingCommentText.trim()) {
      onEditComment(editingCommentId, editingCommentText);
      setEditingCommentId(null);
      setEditingCommentText("");
    }
  };

  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditingCommentText("");
  };

  const handleDeleteComment = (commentId: number) => {
    setDeleteCommentId(commentId);
    setShowDeleteModal(true);
  };

  const confirmDeleteComment = () => {
    if (deleteCommentId !== null) {
      onDeleteComment(deleteCommentId);
    }
    setShowDeleteModal(false);
    setDeleteCommentId(null);
  };

  return (
    <>
      <GoabxDrawer
        maxSize="440px"
        position="right"
        open={isOpen}
        onClose={onClose}
        heading="Timeline"
      >
        <div className="timeline">
          {/* Add Comment Section */}
          <div className="timeline__add-comment">
            <div className="page__comments_form">
              <div className="page__comments_form_heading">
                <GoabText size="heading-xs" mt="none" mb="none">
                  Add comment
                </GoabText>
                <GoabButtonGroup alignment="end">
                  <GoabxButton
                    type="tertiary"
                    size="compact"
                    disabled={!commentText.trim()}
                    onClick={handleClearComment}
                  >
                    Clear
                  </GoabxButton>
                  <GoabxButton
                    type="primary"
                    size="compact"
                    disabled={!commentText.trim()}
                    onClick={handleSaveComment}
                  >
                    Save
                  </GoabxButton>
                </GoabButtonGroup>
              </div>
              <GoabFormItem helpText="Add a comment for updates related to the application.">
                <GoabTextArea
                  name="comment"
                  value={commentText}
                  countBy="character"
                  onChange={(e: any) => {
                    const value = e?.value ?? e?.detail?.value ?? "";
                    setCommentText(value);
                  }}
                  maxCount={200}
                />
              </GoabFormItem>
            </div>
          </div>

          <GoabDivider mt="l" mb="l" />

          {/* Timeline Items */}
          {isLoading ? (
            <GoabText color="secondary">Loading activity...</GoabText>
          ) : groupedItems.length === 0 ? (
            <GoabText color="secondary">No activity yet</GoabText>
          ) : (
            <div className="timeline__groups">
              {groupedItems.map((group) => (
                <div key={group.label} className="timeline__group">
                  <GoabText size="body-xs" color="secondary" mb="m">
                    {group.label}
                  </GoabText>

                  <div className="timeline__items">
                    {group.items.map((item) => (
                      <div key={item.id} className="timeline__item">
                        <div className="timeline__item-header">
                          <div className="timeline__item-title-row">
                            <GoabText size="body-s" mb="none" mt="none">
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
                          <div className="timeline__item-meta">
                            <GoabText size="body-xs" color="secondary" mb="none" mt="none">
                              {formatRelativeTime(item.timestamp.toISOString())}
                            </GoabText>
                            {item.type === "comment" && item.isOwned && editingCommentId !== item.originalComment?.id && (
                              <GoabxMenuButton
                                type="tertiary"
                                size="compact"
                                leadingIcon="ellipsis-vertical:filled"
                                text=""
                                ariaLabel="Comment actions"
                                onAction={(e: any) => {
                                  const action = e?.detail?.action || e?.action || "";
                                  if (action === "edit") {
                                    handleEditComment(item.originalComment!.id);
                                  } else if (action === "delete") {
                                    handleDeleteComment(item.originalComment!.id);
                                  }
                                }}
                              >
                                <GoabxMenuAction text="Edit" action="edit" />
                                <GoabxMenuAction text="Delete" action="delete" />
                              </GoabxMenuButton>
                            )}
                          </div>
                        </div>

                        {editingCommentId === item.originalComment?.id ? (
                          <div className="timeline__item-edit">
                            <GoabFormItem>
                              <GoabTextArea
                                name={`edit-comment-${item.originalComment?.id}`}
                                value={editingCommentText}
                                countBy="character"
                                onChange={(e: any) => {
                                  const value = e?.value ?? e?.detail?.value ?? "";
                                  setEditingCommentText(value);
                                }}
                                maxCount={200}
                              />
                            </GoabFormItem>
                            <GoabButtonGroup alignment="end" mt="s">
                              <GoabxButton type="tertiary" size="compact" onClick={handleCancelEditComment}>
                                Cancel
                              </GoabxButton>
                              <GoabxButton type="primary" size="compact" onClick={handleSaveEditComment}>
                                Save
                              </GoabxButton>
                            </GoabButtonGroup>
                          </div>
                        ) : (
                          <GoabText size="body-s" color="secondary" mb="none" mt="2xs">
                            {item.description}
                          </GoabText>
                        )}

                        <GoabText size="body-xs" color="secondary" mb="none" mt="xs">
                          {item.actor}
                        </GoabText>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </GoabxDrawer>

      {/* Delete Comment Modal */}
      <GoabxModal
        heading="Delete comment"
        open={showDeleteModal}
        calloutVariant="emergency"
        actions={
          <GoabButtonGroup alignment="end">
            <GoabxButton type="tertiary" size="compact" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </GoabxButton>
            <GoabxButton type="primary" size="compact" variant="destructive" onClick={confirmDeleteComment}>
              Delete comment
            </GoabxButton>
          </GoabButtonGroup>
        }
      >
        <GoabText mt="none" mb="none">
          Are you sure you want to delete this comment? This action cannot be undone.
        </GoabText>
      </GoabxModal>
    </>
  );
}
