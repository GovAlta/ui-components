import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  GoabOneColumnLayout,
  GoabAppHeader,
  GoabAppFooter,
  GoabPageBlock,
} from "@abgov/react-components";
import { TaskList } from "../routes/task-list";

/**
 * Reset scroll on every route change. React Router keeps the previous page's
 * scroll position, so a new question can otherwise open halfway down the page.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * The app shell + the route table.
 *
 * The shell (header, page block, footer) is rendered ONCE, outside <Routes>, so
 * it never remounts as the user moves between questions. Only what is inside
 * <Routes> swaps out.
 *
 * "/" is the first page of the service. There is no /demo prefix -- this app IS
 * the public form, so its root is the form's root.
 */
export function App() {
  return (
    <GoabOneColumnLayout>
      <section slot="header">
        <GoabAppHeader url="/" heading="Service name" maxContentWidth="704px" />
      </section>

      <GoabPageBlock width="640px">
        <div
          style={{
            paddingTop: "var(--goa-space-2xl)",
            paddingBottom: "var(--goa-space-3xl)",
          }}
        >
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<TaskList />} />
          </Routes>
        </div>
      </GoabPageBlock>

      {/* No links: the footer renders the copyright and Alberta wordmark on its
          own, which is all the screenshot shows. */}
      <section slot="footer">
        <GoabAppFooter />
      </section>
    </GoabOneColumnLayout>
  );
}
