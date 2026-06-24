import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import {
  GoabFormItem,
  GoabRadioGroup,
  GoabRadioItem,
  GoabInput,
  GoabCallout,
} from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";
import { FormSet } from "../form-set";
import { FieldError } from "../error-summary";
import { EligibilityReview } from "./eligibility-review";
import { Ineligible } from "./ineligible";

const ROOT = "/public-form/eligibility";

type StepId = "age" | "residency" | "benefits" | "benefits-detail";
type Answers = Partial<Record<StepId, string>>;
type Outcome = "review" | "ineligible";

/**
 * The flow graph: given the answers, where each step leads. Branch logic lives
 * here, not in the JSX, so the resolver can walk it for the change-from-review
 * flow. This hand-coded graph is the demo stand-in for the V2 data-driven runtime.
 */
const NEXT: Record<StepId, (a: Answers) => StepId | Outcome> = {
  age: (a) => (a.age === "yes" ? "residency" : "ineligible"),
  residency: (a) => (a.residency === "yes" ? "benefits" : "ineligible"),
  benefits: (a) => (a.benefits === "yes" ? "benefits-detail" : "review"),
  "benefits-detail": () => "review",
};

type StepConfig = { heading: string; requiredError: string; field: "yesno" | "text"; back: string };
const STEPS: Record<StepId, StepConfig> = {
  age: {
    heading: "Are you 18 or older?",
    requiredError: "Select yes if you are 18 or older",
    field: "yesno",
    back: "/public-form",
  },
  residency: {
    heading: "Do you live in Alberta?",
    requiredError: "Select yes if you live in Alberta",
    field: "yesno",
    back: `${ROOT}/age`,
  },
  benefits: {
    heading: "Are you receiving other benefits?",
    requiredError: "Select yes if you are receiving other benefits",
    field: "yesno",
    back: `${ROOT}/residency`,
  },
  "benefits-detail": {
    heading: "Which benefits are you receiving?",
    requiredError: "Enter the benefits you receive",
    field: "text",
    back: `${ROOT}/benefits`,
  },
};

const isOutcome = (s: StepId | Outcome): s is Outcome => s === "review" || s === "ineligible";
const isAnswered = (id: StepId, a: Answers) => Boolean(a[id] && a[id] !== "");

/**
 * Walk forward from `from`, skipping already-answered questions, to the first
 * unanswered question or a terminal outcome. The same walk serves the first pass
 * and the change-from-review flow: in the first pass nothing ahead is answered, so
 * it lands on the immediate next question; in change mode it skips what's already
 * answered and stops at the first newly-opened question (or the outcome).
 */
function resolveNext(from: StepId, a: Answers): { question: StepId } | { outcome: Outcome } {
  let cur = NEXT[from](a);
  while (!isOutcome(cur)) {
    if (!isAnswered(cur, a)) return { question: cur };
    cur = NEXT[cur](a);
  }
  return { outcome: cur };
}

/** Steps reachable from the start along the answered path. Anything answered but not reachable is an abandoned branch and gets discarded. */
function reachable(a: Answers): Set<StepId> {
  const set = new Set<StepId>();
  let cur: StepId | Outcome = "age";
  while (!isOutcome(cur)) {
    set.add(cur);
    if (!isAnswered(cur, a)) break;
    cur = NEXT[cur](a);
  }
  return set;
}

/** Count the unanswered questions from `from` to the terminal — the "N more questions". */
function remainingNew(from: StepId, a: Answers): number {
  let cur: StepId | Outcome = from;
  let n = 0;
  while (!isOutcome(cur)) {
    if (!isAnswered(cur, a)) n++;
    cur = NEXT[cur](a);
  }
  return n;
}

/**
 * Eligibility task: a real multi-page task with branching, plus the change-from-
 * review flow. A review-change re-runs the branch logic and lands in one of three
 * places: straight back to review (no structural change), through newly-opened
 * questions then review (the rewalk), or a different outcome entirely (a gate
 * flipped to "No" routes to ineligible).
 */
export function EligibilityTask() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Answers>({});
  // Change-from-review state: the question the user clicked "Change" on, plus a
  // snapshot to restore on cancel. null = the normal first pass.
  const [change, setChange] = useState<{ entry: StepId; snapshot: Answers } | null>(null);

  const startChange = (step: string) => {
    setChange({ entry: step as StepId, snapshot: answers });
    navigate(`${ROOT}/${step}`);
  };

  // "Back to review" in change mode: restore the snapshot (discarding the whole
  // in-progress change, including any partial rewalk answers) and return to review.
  const cancelChange = () => {
    if (change) setAnswers(change.snapshot);
    setChange(null);
    navigate(`${ROOT}/review`);
  };

  const save = (step: StepId, value: string) => {
    const updated: Answers = { ...answers, [step]: value };
    // Discard answers on branches no longer taken.
    const keep = reachable(updated);
    const pruned: Answers = {};
    (Object.keys(updated) as StepId[]).forEach((k) => {
      if (keep.has(k)) pruned[k] = updated[k];
    });
    setAnswers(pruned);

    const next = resolveNext(step, pruned);
    if ("outcome" in next) {
      setChange(null); // change flow complete (or first pass done)
      navigate(next.outcome === "review" ? `${ROOT}/review` : `${ROOT}/ineligible`);
    } else {
      navigate(`${ROOT}/${next.question}`);
    }
  };

  const renderStep = (id: StepId) => {
    const inChange = change !== null;
    // The "N more questions" callout shows on a newly-opened question during a
    // change (not the question the user actually clicked Change on).
    const isRewalk = inChange && id !== change!.entry;
    return (
      <Question
        key={id}
        id={id}
        value={answers[id] ?? ""}
        inChange={inChange}
        calloutCount={isRewalk ? remainingNew(id, answers) : 0}
        onSave={(v) => save(id, v)}
        onCancel={cancelChange}
      />
    );
  };

  return (
    <Routes>
      <Route index element={<Navigate to="age" replace />} />
      <Route path="age" element={renderStep("age")} />
      <Route path="residency" element={renderStep("residency")} />
      <Route path="benefits" element={renderStep("benefits")} />
      <Route path="benefits-detail" element={renderStep("benefits-detail")} />
      <Route path="review" element={<EligibilityReview answers={answers} onChange={startChange} />} />
      <Route path="ineligible" element={<Ineligible />} />
    </Routes>
  );
}

function Question({
  id,
  value,
  inChange,
  calloutCount,
  onSave,
  onCancel,
}: {
  id: StepId;
  value: string;
  inChange: boolean;
  calloutCount: number;
  onSave: (value: string) => void;
  onCancel: () => void;
}) {
  const cfg = STEPS[id];
  const [draft, setDraft] = useState(value);
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const validate = (v: string): FieldError[] =>
    v && v.trim() ? [] : [{ fieldId: id, text: cfg.requiredError }];

  const handleChange = (v: string) => {
    setDraft(v);
    if (submitted) setErrors(validate(v));
  };

  const handleSave = () => {
    setSubmitted(true);
    const found = validate(draft);
    setErrors(found);
    if (found.length === 0) onSave(draft);
  };

  // First pass: back goes to the previous question. Change mode: "Back to review" cancels.
  const layoutProps = inChange
    ? { backLabel: "Back to review", onBack: onCancel }
    : { back: cfg.back };

  return (
    <PublicFormLayout {...layoutProps}>
      {calloutCount > 0 && (
        <GoabCallout type="important" heading="You changed an answer" mb="l">
          Based on your change, there {calloutCount === 1 ? "is" : "are"} {calloutCount} more{" "}
          {calloutCount === 1 ? "question" : "questions"} to confirm.
        </GoabCallout>
      )}
      <FormSet onContinue={handleSave} continueLabel="Save and continue" errors={errors}>
        <GoabFormItem
          label={cfg.heading}
          labelSize="large"
          id={id}
          error={errors.find((e) => e.fieldId === id)?.text}
        >
          {cfg.field === "yesno" ? (
            <GoabRadioGroup
              name={id}
              ariaLabel={cfg.heading}
              value={draft}
              onChange={(e) => handleChange(e.value)}
            >
              <GoabRadioItem value="yes" label="Yes" />
              <GoabRadioItem value="no" label="No" />
            </GoabRadioGroup>
          ) : (
            <GoabInput
              name={id}
              value={draft}
              width="100%"
              onChange={(e) => handleChange(e.value)}
            />
          )}
        </GoabFormItem>
      </FormSet>
    </PublicFormLayout>
  );
}
