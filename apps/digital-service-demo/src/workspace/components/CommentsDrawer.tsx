import { useState } from "react";
import {
  GoabButtonGroup,
  GoabFormItem,
  GoabText,
  GoabTextArea,
} from "@abgov/react-components";
import {
  GoabxButton,
  GoabxDrawer,
  GoabxMenuAction,
  GoabxMenuButton,
  GoabxModal,
} from "@abgov/react-components/experimental";
import { parseDate } from "../utils/dateUtils";

export interface Comment {
  id: number;
  author: string;
  timestamp: string;
  text: string;
  isOwned: boolean;
}

interface CommentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  onAddComment: (text: string) => void;
  onEditComment: (id: number, text: string) => void;
  onDeleteComment: (id: number) => void;
}

export function CommentsDrawer({
  isOpen,
  onClose,
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
}: CommentsDrawerProps) {
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [deleteCommentId, setDeleteCommentId] = useState<number | null>(null);
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);

  const handleClearComment = () => {
    setCommentText("");
  };

  const handleSaveComment = () => {
    if (commentText.trim()) {
      onAddComment(commentText.trim());
      setCommentText("");
    }
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
    setShowDeleteCommentModal(true);
  };

  const confirmDeleteComment = () => {
    if (deleteCommentId !== null) {
      onDeleteComment(deleteCommentId);
    }
    setShowDeleteCommentModal(false);
    setDeleteCommentId(null);
  };

  return (
    <>
      <GoabxDrawer
        maxSize="400px"
        position="right"
        open={isOpen}
        onClose={onClose}
        heading={`Comments (${comments.length})`}
      >
        <div className="page__comments">
          {/* Add Comment Section */}
          <div className="page__comments_form">
            <div className="page__comments_form_heading">
              <GoabText size="heading-xs" mt="none" mb="none">
                Add comment
              </GoabText>
              <GoabButtonGroup alignment="end" gap="compact">
                <GoabxButton
                  type="tertiary"
                  size="compact"
                  onClick={handleClearComment}
                  disabled={!commentText.trim()}
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
            <GoabFormItem helpText="Add a comment for updates related to the case.">
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

          {/* Comments List */}
          <div className="page__comments_list">
            {[...comments]
              .sort((a, b) => {
                const dateA = parseDate(a.timestamp);
                const dateB = parseDate(b.timestamp);
                if (!dateA) return 1;
                if (!dateB) return -1;
                return dateB.getTime() - dateA.getTime();
              })
              .map((comment) => (
                <div key={comment.id} className="page__comments_single">
                  <div className="page__comments_single_heading">
                    <div>
                      <div className="page__comments_single_author">{comment.author}</div>
                      <div className="page__comments_single_date">
                        {comment.timestamp}
                      </div>
                    </div>
                    {comment.isOwned && editingCommentId !== comment.id && (
                      <GoabxMenuButton
                        type="tertiary"
                        size="compact"
                        leadingIcon="ellipsis-vertical:filled"
                        text=""
                        ariaLabel="Comment actions"
                        onAction={(e: any) => {
                          const action =
                            (e as any)?.detail?.action || (e as any)?.action || "";
                          if (action === "edit") {
                            handleEditComment(comment.id);
                          } else if (action === "delete") {
                            handleDeleteComment(comment.id);
                          }
                        }}
                      >
                        <GoabxMenuAction text="Edit" action="edit" />
                        <GoabxMenuAction text="Delete" action="delete" />
                      </GoabxMenuButton>
                    )}
                  </div>
                  <div className="page__comments_single_content">
                    {editingCommentId === comment.id ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "var(--goa-space-s)",
                        }}
                      >
                        <GoabFormItem>
                          <GoabTextArea
                            name={`edit-comment-${comment.id}`}
                            key={`edit-comment-${comment.id}`}
                            value={editingCommentText}
                            countBy="character"
                            onChange={(e: any) => {
                              const value = e?.value ?? e?.detail?.value ?? "";
                              setEditingCommentText(value);
                            }}
                            maxCount={200}
                          />
                        </GoabFormItem>
                        <GoabButtonGroup alignment="end" gap="compact">
                          <GoabxButton
                            type="tertiary"
                            size="compact"
                            onClick={handleCancelEditComment}
                          >
                            Cancel
                          </GoabxButton>
                          <GoabxButton
                            type="primary"
                            size="compact"
                            onClick={handleSaveEditComment}
                          >
                            Save
                          </GoabxButton>
                        </GoabButtonGroup>
                      </div>
                    ) : (
                      <GoabText size="body-s" mb="none" mt="none" color="secondary">
                        {comment.text}
                      </GoabText>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </GoabxDrawer>

      {/* Delete Comment Modal */}
      <GoabxModal
        heading="Delete comment"
        open={showDeleteCommentModal}
        calloutVariant="emergency"
        actions={
          <GoabButtonGroup alignment="end" gap="compact">
            <GoabxButton
              type="tertiary"
              size="compact"
              onClick={() => setShowDeleteCommentModal(false)}
            >
              Cancel
            </GoabxButton>
            <GoabxButton
              type="primary"
              size="compact"
              variant="destructive"
              onClick={confirmDeleteComment}
            >
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
