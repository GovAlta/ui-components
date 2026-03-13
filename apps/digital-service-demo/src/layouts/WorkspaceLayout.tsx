import { Outlet, useLocation, useParams } from "react-router-dom";
import { GoabButtonGroup, GoabIcon, GoabPushDrawer } from "@abgov/react-components";
import {
  GoabxButton,
  GoabxFormItem,
  GoabxRadioGroup,
  GoabxRadioItem,
  GoabxTextArea,
  GoabxWorkSideMenu,
  GoabxWorkSideMenuItem,
} from "@abgov/react-components/experimental";
import { MenuProvider, useMenu } from "../workspace/contexts/MenuContext";
import { PageHeaderProvider } from "../workspace/contexts/PageHeaderContext";
import { PageFooterProvider } from "../workspace/contexts/PageFooterContext";
import {
  ScrollStateProvider,
  useScrollState,
} from "../workspace/contexts/ScrollStateContext";
import {
  PushDrawerProvider,
  usePushDrawer,
} from "../workspace/contexts/PushDrawerContext";
import { useTheme } from "../workspace/hooks/useTheme";
import { PageHeader } from "../workspace/components/PageHeader";
import { PageFooter } from "../workspace/components/PageFooter";
import { CaseDetailSubMenu } from "../workspace/components/CaseDetailSubMenu";

function getThemeIcon(isDark: boolean) {
  return isDark ? "sunny" : "moon";
}

function getThemeLabel(isDark: boolean) {
  return isDark ? "Light mode" : "Dark mode";
}

/**
 * Inner workspace layout that uses the menu context.
 */
function WorkspaceLayoutInner() {
  const { menuOpen, setMenuOpen, isMobile } = useMenu();
  const { scrollPosition } = useScrollState();
  const {
    isOpen,
    drawerType,
    decision,
    setDecision,
    formValue,
    setFormValue,
    closeDrawer,
    handlers,
  } = usePushDrawer();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  // Get textarea config based on decision
  const getTextAreaConfig = () => {
    switch (decision) {
      case "approve":
        return {
          label: "Note (optional)",
          placeholder: "Add a note about this approval...",
          required: false,
        };
      case "deny":
        return {
          label: "Reason for denial",
          placeholder: "Explain why this application is being denied...",
          required: true,
        };
      case "requestInfo":
        return {
          label: "What information is needed?",
          placeholder:
            "Describe what additional information the applicant needs to provide...",
          required: true,
        };
      default:
        return null;
    }
  };

  const textAreaConfig = getTextAreaConfig();

  // Determine if submit should be disabled
  const isSubmitDisabled = !decision || (textAreaConfig?.required && !formValue.trim());

  // Get submit button text based on decision
  const getSubmitText = () => {
    switch (decision) {
      case "approve":
        return "Approve";
      case "deny":
        return "Deny";
      case "requestInfo":
        return "Send request";
      default:
        return "Submit";
    }
  };

  // Handle submit
  const handleSubmit = () => {
    if (decision) {
      handlers.onSubmitReview?.(decision, formValue);
    }
  };

  // Drawer heading
  const drawerHeading = isOpen ? "Review application" : "";

  // Check if we're on an application detail page (or timeline subpage)
  const caseDetailMatch = location.pathname.match(/^\/workspace\/application\/([^/]+)/);
  const isCaseDetailPage = !!caseDetailMatch;
  const caseId = caseDetailMatch?.[1];

  // Check if a path is active
  const isActive = (path: string) => {
    if (path === "/workspace") {
      return location.pathname === "/workspace";
    }
    return location.pathname.startsWith(path);
  };

  // Handle toggle - V2 API uses () => void
  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // Render contextual submenu for case detail, otherwise main menu
  const renderSideMenu = () => {
    if (isCaseDetailPage) {
      return (
        <CaseDetailSubMenu isOpen={menuOpen} onToggle={handleToggle} caseId={caseId} />
      );
    }

    return (
      <GoabxWorkSideMenu
        heading="Digital Service"
        url="/workspace"
        userName="Edna Mode"
        userSecondaryText="worker@example.gov.ab.ca"
        open={menuOpen}
        onToggle={handleToggle}
        primaryContent={
          <>
            <GoabxWorkSideMenuItem
              icon="grid"
              label="Dashboard"
              url="/workspace"
              current={
                isActive("/workspace") && !location.pathname.includes("/application")
              }
            />
            <GoabxWorkSideMenuItem
              icon="list"
              label="Applications"
              url="/workspace/applications"
              current={isActive("/workspace/applications")}
            />
          </>
        }
        accountContent={
          <>
            <button className="theme-toggle" onClick={toggleTheme}>
              <GoabIcon type={getThemeIcon(isDark)} size="small" />
              {getThemeLabel(isDark)}
            </button>
            <GoabxWorkSideMenuItem icon="log-out" label="Logout" url="/" />
          </>
        }
      />
    );
  };

  return (
    <div className="app-layout">
      {renderSideMenu()}
      {/* Main content area - sibling to menu, not children */}
      <div className="main-content-area">
        {!isMobile ? (
          <div className="card-container" style={{ height: "100%", overflow: "hidden" }}>
            <div className="desktop-card-container" data-scroll-state={scrollPosition}>
              <PageHeader />
              <Outlet />
              <PageFooter />
            </div>
          </div>
        ) : (
          <div
            className="mobile-content-container"
            style={{ height: "100%", overflow: "auto" }}
          >
            <PageHeader />
            <Outlet />
            <PageFooter />
          </div>
        )}
      </div>
      {/* Portal target for page-level push drawers (e.g., filters) */}
      <div id="page-push-drawer-portal" />
      {/* Push drawer at layout level */}
      <div
        className={`push-drawer-container ${isOpen ? "push-drawer-container--open" : ""}`}
      >
        <div className="push-drawer-clip">
          <GoabPushDrawer
            open={isOpen}
            heading={drawerHeading}
            width="352px"
            onClose={closeDrawer}
            actions={
              <GoabButtonGroup alignment="start" gap="compact">
                <GoabxButton
                  type="primary"
                  size="compact"
                  onClick={handleSubmit}
                  disabled={isSubmitDisabled}
                >
                  {getSubmitText()}
                </GoabxButton>
                <GoabxButton type="tertiary" size="compact" onClick={closeDrawer}>
                  Cancel
                </GoabxButton>
              </GoabButtonGroup>
            }
          >
            <div>
              <GoabxFormItem label="Decision" type="radio-group" mb="l">
                <GoabxRadioGroup
                  name="decision"
                  value={decision || ""}
                  onChange={(detail) => {
                    setDecision(detail.value as "approve" | "deny" | "requestInfo");
                    setFormValue("");
                  }}
                >
                  <GoabxRadioItem value="approve" label="Approve" />
                  <GoabxRadioItem value="deny" label="Deny" />
                  <GoabxRadioItem value="requestInfo" label="Request more information" />
                </GoabxRadioGroup>
              </GoabxFormItem>

              {textAreaConfig && (
                <GoabxFormItem
                  label={textAreaConfig.label}
                  requirement={textAreaConfig.required ? "required" : undefined}
                >
                  <GoabxTextArea
                    name="reviewDetails"
                    value={formValue}
                    onChange={(e) => setFormValue(e.value)}
                    placeholder={textAreaConfig.placeholder}
                    rows={4}
                  />
                </GoabxFormItem>
              )}
            </div>
          </GoabPushDrawer>
        </div>
      </div>
    </div>
  );
}

/**
 * Workspace layout with sidebar navigation.
 * Wraps content in context providers for menu, header, footer, and scroll state.
 */
export function WorkspaceLayout() {
  return (
    <MenuProvider>
      <PageHeaderProvider>
        <PageFooterProvider>
          <ScrollStateProvider>
            <PushDrawerProvider>
              <WorkspaceLayoutInner />
            </PushDrawerProvider>
          </ScrollStateProvider>
        </PageFooterProvider>
      </PageHeaderProvider>
    </MenuProvider>
  );
}
