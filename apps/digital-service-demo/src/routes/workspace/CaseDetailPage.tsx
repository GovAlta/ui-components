import { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  GoabAccordion,
  GoabDivider,
  GoabIconButton,
  GoabSkeleton,
  GoabTab,
  GoabText,
  GoabTooltip,
} from "@abgov/react-components";
import { GoabxBadge, GoabxButton, GoabxTabs } from "@abgov/react-components/experimental";
import { CommentsDrawer, Comment } from "../../workspace/components/CommentsDrawer";
import { CaseDetailTOC, type TOCSection } from "../../workspace/components/CaseDetailTOC";
import { useScrollState } from "../../workspace/contexts/ScrollStateContext";
import { usePushDrawer } from "../../workspace/contexts/PushDrawerContext";
import { CaseDetailHeader } from "./CaseDetailHeader";
import { supabase, CaseWithSubmission } from "../../lib/supabase";
import { getStatusBadgeType } from "../../workspace/utils/caseAdapter";
import "./CaseDetailPage.css";

// Initial comments for demo purposes
const initialComments: Comment[] = [
  {
    id: 1,
    author: "Jane Smith",
    timestamp: "2025-02-20 10:30 AM",
    text: "Initial review completed. All documents appear to be in order.",
    isOwned: true,
  },
  {
    id: 2,
    author: "John Doe",
    timestamp: "2025-02-19 3:15 PM",
    text: "Applicant contacted regarding missing employment verification.",
    isOwned: false,
  },
];

// Type for nested form data structure
interface FormData {
  task1?: Record<string, Record<string, unknown>>;
  task2?: Record<string, Record<string, unknown>>;
  task3?: Record<string, Record<string, unknown>>;
  task4?: Record<string, Record<string, unknown>>;
}

// Task status for TOC
type TaskStatus = "complete" | "missing" | "not-started";

export function CaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAssigning, setIsAssigning] = useState(false);
  const [caseData, setCaseData] = useState<CaseWithSubmission | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isCommentsDrawerOpen, setIsCommentsDrawerOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const { scrollPosition } = useScrollState();
  const { isOpen: isDrawerOpen, openDrawer, closeDrawer, registerHandlers } = usePushDrawer();

  // Show shadow when scrolled (not at top or no-scroll)
  const isScrolled = scrollPosition !== "at-top" && scrollPosition !== "no-scroll";

  // Initialize comments from localStorage if available
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

  // Save comments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("caseComments", JSON.stringify(comments));
  }, [comments]);

  // Fetch case data from Supabase
  useEffect(() => {
    const fetchCaseData = async () => {
      if (!id) return;

      setIsLoading(true);
      const { data, error } = await supabase
        .from("cases")
        .select(`*, submissions (*)`)
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching case:", error);
        setCaseData(null);
      } else {
        setCaseData(data as CaseWithSubmission);
      }
      setIsLoading(false);
    };

    fetchCaseData();
  }, [id]);

  // Get citizen name for inline header (no page header - using sticky inline header instead)
  const citizenName = caseData?.submissions?.citizen_name || "Unknown";

  // Assign case to current worker
  const assignToMe = async () => {
    if (!caseData || !id) return;

    setIsAssigning(true);

    // Update case: set assigned_worker and change status to under_review
    const { error: updateError } = await supabase
      .from("cases")
      .update({
        assigned_worker: "Edna Mode",
        status: "under_review",
      })
      .eq("id", id);

    if (updateError) {
      console.error("Error assigning case:", updateError);
      setIsAssigning(false);
      return;
    }

    // Insert action record for audit trail
    const { error: actionError } = await supabase
      .from("actions")
      .insert({
        case_id: id,
        action_type: "assigned",
        actor: "Edna Mode",
        details: {},
      });

    if (actionError) {
      console.error("Error recording action:", actionError);
    }

    // Refresh case data
    const { data, error } = await supabase
      .from("cases")
      .select(`*, submissions (*)`)
      .eq("id", id)
      .single();

    if (!error && data) {
      setCaseData(data as CaseWithSubmission);
    }

    setIsAssigning(false);
  };

  // Unassign case
  const unassign = async () => {
    if (!caseData || !id) return;

    // Update case: clear assigned_worker, revert status to submitted
    const { error: updateError } = await supabase
      .from("cases")
      .update({
        assigned_worker: null,
        status: "submitted",
      })
      .eq("id", id);

    if (updateError) {
      console.error("Error unassigning case:", updateError);
      return;
    }

    // Insert action record for audit trail
    await supabase
      .from("actions")
      .insert({
        case_id: id,
        action_type: "status_change",
        actor: "Edna Mode",
        details: { action: "unassigned", previousWorker: caseData.assigned_worker },
      });

    // Refresh case data
    const { data, error } = await supabase
      .from("cases")
      .select(`*, submissions (*)`)
      .eq("id", id)
      .single();

    if (!error && data) {
      setCaseData(data as CaseWithSubmission);
    }
  };

  // Helper to refresh case data
  const refreshCaseData = async () => {
    if (!id) return;
    const { data, error } = await supabase
      .from("cases")
      .select(`*, submissions (*)`)
      .eq("id", id)
      .single();
    if (!error && data) {
      setCaseData(data as CaseWithSubmission);
    }
  };

  // Handle review submission (approve, deny, or request info)
  const handleSubmitReview = async (decision: "approve" | "deny" | "requestInfo", details: string) => {
    if (!id) return;

    switch (decision) {
      case "approve":
        await supabase
          .from("cases")
          .update({ status: "approved" })
          .eq("id", id);

        await supabase
          .from("actions")
          .insert({
            case_id: id,
            action_type: "status_change",
            actor: "Edna Mode",
            details: { new_status: "approved", note: details || null },
          });
        break;

      case "deny":
        if (!details.trim()) return;

        await supabase
          .from("cases")
          .update({ status: "denied" })
          .eq("id", id);

        await supabase
          .from("actions")
          .insert({
            case_id: id,
            action_type: "status_change",
            actor: "Edna Mode",
            details: { new_status: "denied", reason: details },
          });
        break;

      case "requestInfo":
        if (!details.trim()) return;

        await supabase
          .from("cases")
          .update({ status: "info_requested" })
          .eq("id", id);

        await supabase
          .from("actions")
          .insert({
            case_id: id,
            action_type: "feedback_sent",
            actor: "Edna Mode",
            details: { request: details },
          });
        break;
    }

    closeDrawer();
    await refreshCaseData();
  };

  // Register handlers with the push drawer context
  useEffect(() => {
    registerHandlers({
      onSubmitReview: handleSubmitReview,
    });
  }, [id, registerHandlers]);

  const handleCommentsClick = () => {
    setIsCommentsDrawerOpen(true);
  };

  // Handle hash-based navigation from side menu
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      if (hash === 'comments') {
        setIsCommentsDrawerOpen(true);
        // Clear the hash after opening
        window.history.replaceState(null, '', window.location.pathname);
      } else if (hash) {
        // Scroll to section
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Clear the hash after scrolling
        setTimeout(() => {
          window.history.replaceState(null, '', window.location.pathname);
        }, 100);
      }
    };

    // Check on mount and on hash change
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: Date.now(),
      author: "Edna Mode",
      timestamp: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      text,
      isOwned: true,
    };
    setComments([newComment, ...comments]);
  };

  const handleEditComment = (id: number, text: string) => {
    setComments(comments.map((c) => (c.id === id ? { ...c, text } : c)));
  };

  const handleDeleteComment = (id: number) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  const handleCopy = (value: string, fieldName: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 1000);
    });
  };

  // Get the nested form data
  const formData = (caseData?.submissions?.form_data || {}) as FormData;

  // Helper to get value from nested task/page/field structure
  const getTaskValue = (task: "task1" | "task2" | "task3" | "task4", page: string, field: string): string => {
    const pageData = formData[task]?.[page];
    if (!pageData) return "-";
    const value = pageData[field];
    if (value === undefined || value === null || value === "") return "-";
    return String(value);
  };

  // Check if a task has any data
  const hasTaskData = (task: "task1" | "task2" | "task3" | "task4"): boolean => {
    return formData[task] !== undefined && Object.keys(formData[task] || {}).length > 0;
  };

  // Get task status for badges and TOC
  const getTaskStatus = (task: "task1" | "task2" | "task3" | "task4"): TaskStatus => {
    if (!hasTaskData(task)) return "not-started";
    // For submitted forms, if data exists it's complete
    // In a real app, you might check for required fields
    return "complete";
  };

  // Format status for display
  const formatStatus = (status: string): string => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Format field value for display (convert kebab-case to Title Case)
  const formatValue = (value: string): string => {
    if (value === "-") return value;
    return value
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get status badges for header
  const getStatusBadges = () => {
    if (!caseData) return [];
    const badges = [
      {
        label: formatStatus(caseData.status),
        type: getStatusBadgeType(caseData.status),
        emphasis: "subtle",
      },
    ];

    // Add urgent badge if applicable
    const urgentNeed = getTaskValue("task1", "urgent-need", "urgentNeed");
    if (urgentNeed === "Yes") {
      badges.push({
        label: "Urgent",
        type: "emergency",
        emphasis: "subtle",
      });
    }

    return badges;
  };

  // Get badge for accordion heading based on task status
  const getTaskBadge = (status: TaskStatus) => {
    switch (status) {
      case "complete":
        return <GoabxBadge type="success" emphasis="subtle" content="Complete" />;
      case "missing":
        return <GoabxBadge type="important" emphasis="subtle" content="Missing information" />;
      case "not-started":
        return <GoabxBadge type="archived" emphasis="subtle" content="Not started" />;
    }
  };

  // Check if case can be assigned (unassigned and not terminal)
  const canAssign = caseData && !caseData.assigned_worker &&
    !["approved", "denied"].includes(caseData.status);

  // Check if worker can take decision actions (assigned to them and not terminal)
  const canTakeAction = caseData &&
    caseData.assigned_worker === "Edna Mode" &&
    !["approved", "denied"].includes(caseData.status);

  // Header actions
  const headerActions = useMemo(
    () => (
      <>
        {canAssign && (
          <GoabxButton
            type="secondary"
            size="compact"
            onClick={assignToMe}
            disabled={isAssigning}
          >
            Assign to me
          </GoabxButton>
        )}
        {canTakeAction && !isDrawerOpen && (
          <GoabxButton
            type="secondary"
            size="compact"
            onClick={() => openDrawer()}
          >
            Review
          </GoabxButton>
        )}
        <GoabxButton
          type="tertiary"
          size="compact"
          onClick={handleCommentsClick}
          leadingIcon="chatbubble"
        >
          Comments ({comments.length})
        </GoabxButton>
      </>
    ),
    [comments.length, canAssign, canTakeAction, isAssigning, isDrawerOpen, openDrawer]
  );

  const SkeletonAccordion = () => (
    <div
      style={{
        marginBottom: "var(--goa-space-m)",
        padding: "var(--goa-space-m)",
        border: "1px solid var(--goa-color-greyscale-200)",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <GoabSkeleton type="thumbnail" mb="none" mt="none" />
      <GoabSkeleton type="text" maxWidth="200px" mb="none" mt="none" />
      <GoabSkeleton type="text" maxWidth="80px" mb="none" mt="none" />
    </div>
  );

  if (!caseData && !isLoading) {
    return (
      <div className="case-detail__page_template">
        <div className="case-detail__page_content">
          <GoabText size="heading-m">Case not found</GoabText>
          <GoabxButton type="tertiary" onClick={() => navigate("/workspace/applications")}>
            Back to applications
          </GoabxButton>
        </div>
      </div>
    );
  }

  // Task statuses for TOC
  const task2Status = getTaskStatus("task2");
  const task3Status = getTaskStatus("task3");
  const task1Status = getTaskStatus("task1");
  const task4Status = getTaskStatus("task4");

  // TOC sections configuration
  const tocSections: TOCSection[] = [
    { id: "task-verify-age", title: "Verify your age", status: task2Status },
    { id: "task-situation", title: "Your situation", status: task3Status },
    { id: "task-personal", title: "Personal information", status: task1Status },
    { id: "task-documents", title: "Upload identification", status: task4Status },
  ];

  return (
    <>
      <div className="case-detail__page_template">
        {/* Sticky header with name, status badges, and actions */}
        <div style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "var(--goa-color-greyscale-white)",
          padding: "var(--goa-space-m) var(--goa-space-xl)",
          borderBottom: isScrolled ? "1px solid var(--goa-color-greyscale-100)" : "none",
          boxShadow: isScrolled ? "0 1px 3px rgba(0, 0, 0, 0.08)" : "none",
          transition: "box-shadow 0.2s ease, border-bottom 0.2s ease",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <GoabText size="heading-m" mb="none" mt="none">
                {isLoading ? "Loading..." : citizenName}
              </GoabText>
              <CaseDetailHeader
                referenceNumber={caseData?.submissions?.reference_number}
                statuses={getStatusBadges()}
                assignedTo={caseData?.assigned_worker}
                onUnassign={unassign}
                isLoading={isLoading}
              />
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {headerActions}
            </div>
          </div>
        </div>

        <CommentsDrawer
          isOpen={isCommentsDrawerOpen}
          onClose={() => setIsCommentsDrawerOpen(false)}
          comments={comments}
          onAddComment={handleAddComment}
          onEditComment={handleEditComment}
          onDeleteComment={handleDeleteComment}
        />

        <div className="case-detail__page_content">
          <div className="case-detail__layout">
            {/* Main content */}
            <div className="case-detail__main">
              <GoabxTabs initialTab={1} variant="segmented">
                <GoabTab heading="Current application">
                  {isLoading ? (
                    <div>
                      <SkeletonAccordion />
                      <SkeletonAccordion />
                      <SkeletonAccordion />
                    </div>
                  ) : (
                    <>
                      {/* Section 1: Verify your eligibility */}
                      <GoabText as="h2" size="heading-xs" mt="l" mb="m" color="secondary">
                        1. Verify your eligibility
                      </GoabText>

                      {/* Verify your age (Task 2) */}
                      <div id="task-verify-age">
                        <GoabAccordion
                          headingSize="medium"
                          heading="Verify your age"
                          headingContent={getTaskBadge(task2Status)}
                          mb="m"
                        >
                        <div className="data-card" style={{ gridTemplateColumns: "1fr 1fr" }}>
                          <div className="data-card_info">
                            <GoabText as="span" size="body-xs" color="secondary">Date of birth</GoabText>
                            <GoabText as="span" size="body-s">
                              {getTaskValue("task2", "date-of-birth", "dateOfBirth")}
                            </GoabText>
                          </div>
                        </div>
                        </GoabAccordion>
                      </div>

                      {/* Your situation (Task 3) */}
                      <div id="task-situation">
                        <GoabAccordion
                          headingSize="medium"
                          heading="Your situation"
                          headingContent={getTaskBadge(task3Status)}
                          mb="m"
                        >
                        <div className="data-card" style={{ gridTemplateColumns: "1fr 1fr" }}>
                          <div className="data-card_info">
                            <GoabText as="span" size="body-xs" color="secondary">Applying for</GoabText>
                            <GoabText as="span" size="body-s">
                              {formatValue(getTaskValue("task3", "applying-for", "applyingFor"))}
                            </GoabText>
                          </div>

                          {getTaskValue("task3", "relationship", "relationship") !== "-" && (
                            <div className="data-card_info">
                              <GoabText as="span" size="body-xs" color="secondary">Relationship</GoabText>
                              <GoabText as="span" size="body-s">
                                {formatValue(getTaskValue("task3", "relationship", "relationship"))}
                              </GoabText>
                            </div>
                          )}

                          <div className="data-card_info">
                            <GoabText as="span" size="body-xs" color="secondary">Employment status</GoabText>
                            <GoabText as="span" size="body-s">
                              {formatValue(getTaskValue("task3", "employment", "employmentStatus"))}
                            </GoabText>
                          </div>

                          <div className="data-card_info">
                            <GoabText as="span" size="body-xs" color="secondary">Assistance needed by</GoabText>
                            <GoabText as="span" size="body-s">
                              {getTaskValue("task3", "when-needed", "assistanceDate")}
                            </GoabText>
                          </div>
                        </div>

                        <GoabDivider mt="l" mb="l" />

                        {/* About you */}
                        <GoabText size="body-s" color="secondary" mb="xs">
                          About you
                        </GoabText>
                        <div className="data-card" style={{ gridTemplateColumns: "1fr 1fr" }}>
                          <div className="data-card_info">
                            <GoabText as="span" size="body-xs" color="secondary">Full name</GoabText>
                            <GoabText as="span" size="body-s">
                              {getTaskValue("task3", "about-you", "fullName")}
                            </GoabText>
                          </div>
                          <div className="data-card_info">
                            <GoabText as="span" size="body-xs" color="secondary">Phone number</GoabText>
                            <GoabText as="span" size="body-s">
                              {getTaskValue("task3", "about-you", "phoneNumber")}
                            </GoabText>
                          </div>
                        </div>
                        </GoabAccordion>
                      </div>

                      {/* Section 2: Your application */}
                      <GoabText as="h2" size="heading-xs" mt="2xl" mb="m" color="secondary">
                        2. Your application
                      </GoabText>

                      {/* Personal information (Task 1) */}
                      <div id="task-personal">
                        <GoabAccordion
                          headingSize="medium"
                          heading="Personal information"
                          headingContent={getTaskBadge(task1Status)}
                          mb="m"
                        >
                        {/* Urgent need */}
                        <GoabText size="body-s" color="secondary" mb="xs">
                          Urgent need
                        </GoabText>
                        <div className="data-card" style={{ gridTemplateColumns: "1fr" }}>
                          <div className="data-card_info">
                            <GoabText as="span" size="body-xs" color="secondary">Urgent financial need</GoabText>
                            <GoabText as="span" size="body-s">
                              {getTaskValue("task1", "urgent-need", "urgentNeed") === "Yes" ? (
                                <GoabxBadge type="emergency" emphasis="subtle" content="Yes" />
                              ) : (
                                getTaskValue("task1", "urgent-need", "urgentNeed")
                              )}
                            </GoabText>
                          </div>
                        </div>

                        <GoabDivider mt="l" mb="l" />

                        {/* Marital status */}
                        <GoabText size="body-s" color="secondary" mb="xs">
                          Marital status
                        </GoabText>
                        <div className="data-card" style={{ gridTemplateColumns: "1fr" }}>
                          <div className="data-card_info">
                            <GoabText as="span" size="body-xs" color="secondary">Marital status</GoabText>
                            <GoabText as="span" size="body-s">
                              {formatValue(getTaskValue("task1", "marital-status", "maritalStatus"))}
                            </GoabText>
                          </div>
                        </div>

                        <GoabDivider mt="l" mb="l" />

                        {/* Address */}
                        <GoabText size="body-s" color="secondary" mb="xs">
                          Address
                        </GoabText>
                        <div className="data-card" style={{ gridTemplateColumns: "1fr 1fr" }}>
                          <div className="data-card_info">
                            <GoabText as="span" size="body-xs" color="secondary">Street address</GoabText>
                            <GoabText as="span" size="body-s">
                              {getTaskValue("task1", "address", "streetAddress")}
                            </GoabText>
                          </div>
                          <div className="data-card_info">
                            <GoabText as="span" size="body-xs" color="secondary">City or town</GoabText>
                            <GoabText as="span" size="body-s">
                              {getTaskValue("task1", "address", "city")}
                            </GoabText>
                          </div>
                          <div className="data-card_info">
                            <GoabText as="span" size="body-xs" color="secondary">Province or territory</GoabText>
                            <GoabText as="span" size="body-s">
                              {getTaskValue("task1", "address", "province")}
                            </GoabText>
                          </div>
                          <div className="data-card_info">
                            <GoabText as="span" size="body-xs" color="secondary">Postal code</GoabText>
                            <GoabText as="span" size="body-s">
                              {getTaskValue("task1", "address", "postalCode")}
                            </GoabText>
                          </div>
                        </div>

                        <GoabDivider mt="l" mb="l" />

                        {/* Contact preference */}
                        <GoabText size="body-s" color="secondary" mb="xs">
                          Contact preference
                        </GoabText>
                        <div className="data-card" style={{ gridTemplateColumns: "1fr 1fr" }}>
                          {getTaskValue("task1", "contact-preference", "contactByPhone") === "true" && (
                            <div className="data-card_info">
                              <GoabText as="span" size="body-xs" color="secondary">Phone number</GoabText>
                              <GoabText as="span" size="body-s">
                                {getTaskValue("task1", "contact-preference", "phoneNumber")}
                              </GoabText>
                            </div>
                          )}
                          {getTaskValue("task1", "contact-preference", "contactByEmail") === "true" && (
                            <div className="data-card_info">
                              <GoabText as="span" size="body-xs" color="secondary">Email address</GoabText>
                              <GoabText as="span" size="body-s">
                                {getTaskValue("task1", "contact-preference", "emailAddress")}
                                <GoabTooltip content={copiedField === "email" ? "Copied" : "Copy"}>
                                  <GoabIconButton
                                    icon="copy"
                                    ariaLabel="Copy email"
                                    variant="dark"
                                    size="small"
                                    onClick={() =>
                                      handleCopy(
                                        getTaskValue("task1", "contact-preference", "emailAddress"),
                                        "email"
                                      )
                                    }
                                  />
                                </GoabTooltip>
                              </GoabText>
                            </div>
                          )}
                          {getTaskValue("task1", "contact-preference", "contactByMail") === "true" && (
                            <div className="data-card_info">
                              <GoabText as="span" size="body-xs" color="secondary">Mail</GoabText>
                              <GoabText as="span" size="body-s">Yes (postal address)</GoabText>
                            </div>
                          )}
                        </div>

                        <GoabDivider mt="l" mb="l" />

                        {/* Consent */}
                        <GoabText size="body-s" color="secondary" mb="xs">
                          Consent
                        </GoabText>
                        <div className="data-card" style={{ gridTemplateColumns: "1fr 1fr" }}>
                          <div className="data-card_info">
                            <GoabText as="span" size="body-xs" color="secondary">Full name</GoabText>
                            <GoabText as="span" size="body-s">
                              {getTaskValue("task1", "consent", "fullName")}
                            </GoabText>
                          </div>
                          <div className="data-card_info">
                            <GoabText as="span" size="body-xs" color="secondary">Signature provided</GoabText>
                            <GoabText as="span" size="body-s">
                              {getTaskValue("task1", "consent", "signature") !== "-" ? "Yes" : "No"}
                            </GoabText>
                          </div>
                        </div>
                        </GoabAccordion>
                      </div>

                      {/* Section 3: Important documents */}
                      <GoabText as="h2" size="heading-xs" mt="2xl" mb="m" color="secondary">
                        3. Important documents
                      </GoabText>

                      {/* Upload identification (Task 4) */}
                      <div id="task-documents">
                        <GoabAccordion
                          headingSize="medium"
                          heading="Upload identification"
                          headingContent={getTaskBadge(task4Status)}
                          mb="m"
                        >
                          <div className="data-card" style={{ gridTemplateColumns: "1fr" }}>
                            <div className="data-card_info">
                              <GoabText as="span" size="body-xs" color="secondary">ID document uploaded</GoabText>
                              <GoabText as="span" size="body-s">
                                {getTaskValue("task4", "upload-id", "idDocument") !== "-" ? "Yes" : "No"}
                              </GoabText>
                            </div>
                          </div>
                        </GoabAccordion>
                      </div>
                    </>
                  )}
                </GoabTab>

                <GoabTab
                  heading={
                    <>
                      Previous assessments
                      <GoabxBadge type="archived" emphasis="subtle" content="0" />
                    </>
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "var(--goa-space-2xl) var(--goa-space-m)",
                      height: "40vh",
                      textAlign: "center",
                    }}
                  >
                    <GoabText size="body-m" mt="none" color="secondary">
                      No previous assessments for this case.
                    </GoabText>
                  </div>
                </GoabTab>
              </GoabxTabs>
            </div>

            {/* Right sidebar TOC with scroll tracking */}
            {!isLoading && (
              <aside className="case-detail__toc">
                <CaseDetailTOC sections={tocSections} />
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
