import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { GoabFormItem, GoabRadioGroup, GoabRadioItem } from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";
import { FormSet } from "../form-set";
import { FieldError } from "../error-summary";
import { EligibilityReview } from "./eligibility-review";
import { Ineligible } from "./ineligible";

const ROOT = "/public-form/eligibility";

type Answers = { age: string; residency: string };

/**
 * A single Yes/No eligibility question. Validates (an answer is required) on
 * submit, then runs `next` to branch to the following page. Reuses the shared
 * PublicFormLayout + FormSet, so a flow page is the same shape as any other
 * question page.
 */
function YesNoQuestion({
  heading,
  back,
  value,
  onChange,
  next,
  requiredError,
}: {
  heading: string;
  back: string;
  value: string;
  onChange: (v: string) => void;
  next: (v: string) => string;
  requiredError: string;
}) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const validate = (v: string): FieldError[] =>
    v ? [] : [{ fieldId: "answer", text: requiredError }];

  const handleChange = (v: string) => {
    onChange(v);
    if (submitted) setErrors(validate(v));
  };

  const handleContinue = () => {
    setSubmitted(true);
    const found = validate(value);
    setErrors(found);
    if (found.length === 0) navigate(next(value));
  };

  return (
    <PublicFormLayout back={back}>
      <FormSet onContinue={handleContinue} errors={errors}>
        <GoabFormItem
          label={heading}
          labelSize="large"
          id="answer"
          error={errors.find((e) => e.fieldId === "answer")?.text}
        >
          <GoabRadioGroup
            name="answer"
            ariaLabel={heading}
            value={value}
            onChange={(e) => handleChange(e.value)}
          >
            <GoabRadioItem value="yes" label="Yes" />
            <GoabRadioItem value="no" label="No" />
          </GoabRadioGroup>
        </GoabFormItem>
      </FormSet>
    </PublicFormLayout>
  );
}

/**
 * Eligibility task: a real multi-page task (an organized section), not a single
 * question. Shows what the gallery's isolated pages don't: a task is a sequence
 * of question pages with branching/next-logic, an ineligible outcome, a section
 * review, and a round trip back to the task list.
 *
 * Each question page owns its next-logic (the spec's core primitive: "question
 * page + optional branching to the next page"), and the whole flow is visible
 * here. Pages are real routes, so the browser back button works across the
 * section.
 */
export function EligibilityTask() {
  const [answers, setAnswers] = useState<Answers>({ age: "", residency: "" });
  const set = (key: keyof Answers) => (value: string) =>
    setAnswers((a) => ({ ...a, [key]: value }));

  return (
    <Routes>
      <Route index element={<Navigate to="age" replace />} />
      <Route
        path="age"
        element={
          <YesNoQuestion
            heading="Are you 18 or older?"
            back="/public-form"
            value={answers.age}
            onChange={set("age")}
            next={(v) => (v === "yes" ? `${ROOT}/residency` : `${ROOT}/ineligible`)}
            requiredError="Select yes if you are 18 or older"
          />
        }
      />
      <Route
        path="residency"
        element={
          <YesNoQuestion
            heading="Do you live in Alberta?"
            back={`${ROOT}/age`}
            value={answers.residency}
            onChange={set("residency")}
            next={(v) => (v === "yes" ? `${ROOT}/review` : `${ROOT}/ineligible`)}
            requiredError="Select yes if you live in Alberta"
          />
        }
      />
      <Route path="review" element={<EligibilityReview answers={answers} />} />
      <Route path="ineligible" element={<Ineligible />} />
    </Routes>
  );
}
