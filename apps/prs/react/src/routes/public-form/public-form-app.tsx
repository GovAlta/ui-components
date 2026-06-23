import { Routes, Route } from "react-router-dom";
import {
  GoabOneColumnLayout,
  GoabAppHeader,
  GoabMenuButton,
  GoabMenuAction,
  GoabAppFooter,
  GoabAppFooterNavSection,
  GoabAppFooterMetaSection,
  GoabPageBlock,
} from "@abgov/react-components";
import { TaskListHome } from "./task-list-home";

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
        <GoabAppHeader url="https://www.alberta.ca" heading="Service name" maxContentWidth="704px">
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
          <Routes>
            <Route path="/" element={<TaskListHome />} />
          </Routes>
        </div>
      </GoabPageBlock>

      <section slot="footer">
        <GoabAppFooter maxContentWidth="704px">
          <GoabAppFooterNavSection>
            <a href="#">My profile</a>
            <a href="#">Accessibility</a>
            <a href="#">Privacy</a>
            <a href="#">Terms and conditions</a>
          </GoabAppFooterNavSection>
          <GoabAppFooterMetaSection>
            This is a Government of Alberta Digital Service. &copy; 2026 GoA
          </GoabAppFooterMetaSection>
        </GoabAppFooter>
      </section>
    </GoabOneColumnLayout>
  );
}
