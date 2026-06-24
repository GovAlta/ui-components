import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  GoabOneColumnLayout,
  GoabAppHeader,
  GoabMenuButton,
  GoabMenuAction,
  GoabAppFooter,
  GoabAppFooterMetaSection,
  GoabPageBlock,
} from "@abgov/react-components";
import { TaskListHome } from "./task-list-home";
import { SingleQuestion } from "./examples/single-question";
import { GroupedFields } from "./examples/grouped-fields";
import { MultipleQuestions } from "./examples/multiple-questions";
import { QuestionWithDetails } from "./examples/question-with-details";
import { Reveal } from "./examples/reveal";
import { EligibilityTask } from "./examples/eligibility-task";
import { ContentBefore } from "./examples/content-before";
import { FileUpload } from "./examples/file-upload";
import { InlineList } from "./examples/inline-list";
import { ModalDrawer } from "./examples/modal-drawer";
import { MultiStep } from "./examples/multi-step";
import { NewPageTask } from "./examples/new-page";
import { DrawerExample } from "./examples/drawer";
import { ResultEligible } from "./examples/result-eligible";
import { ResultNotEligible } from "./examples/result-not-eligible";
import { ResultSubmitted } from "./examples/result-submitted";
import { ReviewEditable } from "./examples/review-editable";
import { ReviewReadonly } from "./examples/review-readonly";
import { ReviewQuestionTypes } from "./examples/review-question-types";

/**
 * Reset scroll to the top on every route change. React Router keeps the previous
 * page's scroll position otherwise, so navigating to a new page can land partway
 * down it. (A real public-form template/CSS layer would own this.)
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * Public form template gallery (Step 1 demo).
 *
 * Mounted as its own top-level route at /public-form with its own GoA app shell,
 * outside the react-prs side menu. Each example is a route under /public-form.
 *
 * Built from standard GoA (V2) components only -- no GoabPublicForm. The hand-built
 * pieces (task list, form pages, summaries) are the spec for the Step 2 components.
 */
export function PublicFormApp() {
  return (
    <GoabOneColumnLayout>
      <section slot="header">
        <GoabAppHeader url="/public-form" heading="Service name" maxContentWidth="704px">
          <div slot="utilities">
            <GoabMenuButton text="Edna Mode" type="tertiary" size="compact">
              <GoabMenuAction text="My profile" action="profile" />
              <GoabMenuAction text="Settings" action="settings" />
              <GoabMenuAction text="Sign out" action="sign-out" />
            </GoabMenuButton>
          </div>
        </GoabAppHeader>
      </section>

      <GoabPageBlock width="640px">
        <div style={{ paddingTop: "var(--goa-space-2xl)", paddingBottom: "var(--goa-space-3xl)" }}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<TaskListHome />} />
            <Route path="single-question" element={<SingleQuestion />} />
            <Route path="grouped-fields" element={<GroupedFields />} />
            <Route path="multiple-questions" element={<MultipleQuestions />} />
            <Route path="details" element={<QuestionWithDetails />} />
            <Route path="reveal" element={<Reveal />} />
            <Route path="content-before" element={<ContentBefore />} />
            <Route path="file-upload" element={<FileUpload />} />
            <Route path="inline-list" element={<InlineList />} />
            <Route path="modal-drawer" element={<ModalDrawer />} />
            <Route path="drawer" element={<DrawerExample />} />
            <Route path="multi-step" element={<MultiStep />} />
            <Route path="new-page/*" element={<NewPageTask />} />
            <Route path="eligibility/*" element={<EligibilityTask />} />
            <Route path="result-eligible" element={<ResultEligible />} />
            <Route path="result-not-eligible" element={<ResultNotEligible />} />
            <Route path="result-submitted" element={<ResultSubmitted />} />
            <Route path="review-editable" element={<ReviewEditable />} />
            <Route path="review-readonly" element={<ReviewReadonly />} />
            <Route path="review-question-types" element={<ReviewQuestionTypes />} />
          </Routes>
        </div>
      </GoabPageBlock>

      <section slot="footer">
        {/* Links go in the meta section so they lay out horizontally (the nav
            section stacks them in columns). The footer auto-adds the copyright.
            No maxContentWidth, so it spans full width to match the header. */}
        <GoabAppFooter>
          <GoabAppFooterMetaSection>
            <a href="#">My profile</a>
            <a href="#">Accessibility</a>
            <a href="#">Privacy</a>
            <a href="#">Terms and conditions</a>
          </GoabAppFooterMetaSection>
        </GoabAppFooter>
      </section>
    </GoabOneColumnLayout>
  );
}
