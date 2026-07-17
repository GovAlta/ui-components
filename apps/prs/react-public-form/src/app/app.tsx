import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  GoabAppHeader,
  GoabAppFooter,
  GoabPublicFormPageLayout,
} from "@abgov/react-components";
import { TaskList } from "../routes/task-list";

/**
 * Reset scroll on every route change. React Router keeps the previous page's
 * scroll position, so a new question can otherwise open halfway down the page.
 * This stays at the app layer: it depends on the router and cannot move into
 * the layout web component (client-side navigation fires no event it can observe).
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
 * GoabPublicFormPageLayout owns the page structure, the centered content column
 * (contentWidth), and the vertical rhythm, and it fills in the header's
 * maxContentWidth automatically -- note the header below does NOT set one. The
 * shell renders once, outside <Routes>, so it never remounts between questions.
 *
 * "/" is the first page of the service. There is no /demo prefix -- this app IS
 * the public form, so its root is the form's root.
 */
export function App() {
  return (
    <GoabPublicFormPageLayout
      header={<GoabAppHeader url="/" heading="Service name" />}
      footer={<GoabAppFooter />}
    >
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<TaskList />} />
      </Routes>
    </GoabPublicFormPageLayout>
  );
}
