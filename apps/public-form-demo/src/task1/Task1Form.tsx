import { useState, useEffect, useRef } from "react";
import {
  GoabPublicForm,
  GoabPublicFormPage,
  GoabPublicFormSummary,
} from "@abgov/react-components";
import { GoabxCheckbox, GoabxFormItem } from "@abgov/react-components/experimental";
import { PFOutline, PFState } from "@abgov/ui-components-common";
import { BackLink } from "../components";
import { task1Outline } from "./outline";

type InitFunction = (data: PFState, props: { outline: PFOutline }) => PFState;
import {
  UrgentNeed,
  MaritalStatus,
  Address,
  ContactPreference,
  Consent,
  UploadId,
  Dependants,
} from "./pages";

type Task1FormProps = {
  initialState: PFState | null;
  onComplete: (state: PFState) => void;
  onExit: (state: PFState | null) => void;
};

/**
 * Task 1: Personal Information
 *
 * Full GoabPublicForm implementation with 8 pages:
 * 1. Urgent need (radio)
 * 2. Marital status (dropdown)
 * 3. Address (multi-field)
 * 4. Contact preference (checkbox + conditional)
 * 5. Consent (checkboxes + textarea)
 * 6. Upload ID (file upload)
 * 7. Dependants (repeater/subform)
 * 8. Review (GoabPublicFormSummary)
 */
export function Task1Form({ initialState, onComplete, onExit }: Task1FormProps) {
  const [state, setState] = useState<PFState | undefined>();
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Initialize form with outline and any existing state
  const handleInit = (initFn: InitFunction) => {
    let stateToUse = initialState || { data: {}, dataBuffer: {}, history: [] };

    // If re-entering a completed task, clean up history so it ends with "review"
    // (completed tasks have "" at end of history which would otherwise reset to first page)
    if (stateToUse.history.length > 0 && stateToUse.history[stateToUse.history.length - 1] === "") {
      const cleanedHistory = stateToUse.history.filter((h) => h !== "");
      if (!cleanedHistory.includes("review")) {
        cleanedHistory.push("review");
      }
      stateToUse = { ...stateToUse, history: cleanedHistory };
    }

    const initial = initFn(stateToUse, { outline: task1Outline });
    setState(initial);
  };

  // Listen for back navigation (form doesn't have onBack callback - workaround)
  // Use capture phase on document since the event may not bubble
  useEffect(() => {
    const handleBack = () => {
      // When back is clicked, the form pops history internally
      // We need to sync our state by also popping
      setState((prev) => {
        if (!prev || prev.history.length <= 1) return prev;
        const newHistory = [...prev.history];
        newHistory.pop();
        return { ...prev, history: newHistory };
      });
    };

    document.addEventListener("form-page:back", handleBack, true);
    return () => document.removeEventListener("form-page:back", handleBack, true);
  }, []);

  // Handle navigation to next page
  const handleNext = (newState: PFState) => {
    // Deep copy to avoid mutation issues (form mutates its internal state directly)
    const stateCopy: PFState = {
      data: { ...newState.data },
      dataBuffer: { ...newState.dataBuffer },
      history: [...newState.history],
    };
    setState(stateCopy);

    // Empty string in history signals form completion
    const lastPage = newState.history[newState.history.length - 1];
    if (lastPage === "") {
      onComplete(newState);
    }
  };

  // Handle subform changes (add/edit/delete dependants)
  const handleSubformChange = (newState: PFState) => {
    // Spread to create new reference for React re-render
    setState({ ...newState });
  };

  // Get dependants from state for the Dependants page
  const getDependants = () => {
    if (!state?.data?.dependants) return [];
    const deps = state.data.dependants;
    if (Array.isArray(deps)) {
      return deps as Array<{ _id: string; dependantName?: string }>;
    }
    return [];
  };

  // Determine current page from history (last item is current page, or first page if empty)
  const currentPage = state?.history?.[state.history.length - 1] || "urgent-need";
  const isFirstPage = currentPage === "urgent-need";

  return (
    <div className="form-set" ref={formContainerRef}>
      {/* Back link above the form - only on first page */}
      <div
        style={{
          marginBottom: isFirstPage ? "var(--goa-space-2xl)" : 0,
          opacity: isFirstPage ? 1 : 0,
          height: isFirstPage ? "auto" : 0,
          overflow: "hidden",
          transition: "opacity 150ms ease-in-out",
        }}
      >
        <BackLink onClick={() => onExit(state || null)}>
          Back to all tasks
        </BackLink>
      </div>

      <GoabPublicForm
        onInit={handleInit}
        onNext={handleNext}
        onSubformChange={handleSubformChange}
      >
        <GoabPublicFormPage id="urgent-need" backVisibility="hidden">
          <UrgentNeed />
        </GoabPublicFormPage>

        <GoabPublicFormPage id="marital-status">
          <MaritalStatus />
        </GoabPublicFormPage>

        <GoabPublicFormPage id="address">
          <Address />
        </GoabPublicFormPage>

        <GoabPublicFormPage id="contact-preference">
          <ContactPreference />
        </GoabPublicFormPage>

        <GoabPublicFormPage id="consent">
          <Consent />
        </GoabPublicFormPage>

        <GoabPublicFormPage id="upload-id">
          <UploadId />
        </GoabPublicFormPage>

        <GoabPublicFormPage id="dependants" data-pf-list="">
          <Dependants dependants={getDependants()} />
        </GoabPublicFormPage>

        <GoabPublicFormPage id="review" buttonText="Save and continue" backVisibility="hidden" errorSummaryPosition="none">
          <GoabPublicFormSummary heading="Personal information" />
          <div style={{ marginTop: "var(--goa-space-2xl)" }}>
            <GoabxFormItem label="">
              <GoabxCheckbox
                name="confirmCorrect"
                data-pf-item=""
                text="I confirm that the information above is correct"
              />
            </GoabxFormItem>
          </div>
        </GoabPublicFormPage>
      </GoabPublicForm>
    </div>
  );
}
