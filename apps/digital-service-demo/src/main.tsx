import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "@abgov/web-components";
import "@abgov/style";
import "@abgov/design-tokens/dist/tokens.css";
import "./workspace.css";

import { CitizenLayout } from "./layouts/CitizenLayout";
import { WorkspaceLayout } from "./layouts/WorkspaceLayout";

import { StatusPage } from "./routes/StatusPage";
import { PublicFormApp } from "./routes/form/PublicFormApp";
import { DashboardPage } from "./routes/workspace/DashboardPage";
import { CasesPage } from "./routes/workspace/CasesPage";
import { CaseDetailPage } from "./routes/workspace/CaseDetailPage";
import { TimelinePage } from "./routes/workspace/TimelinePage";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Public form app - the main citizen-facing entry point */}
        <Route path="/*" element={<PublicFormApp />} />

        {/* Status check - separate page with minimal layout */}
        <Route element={<CitizenLayout />}>
          <Route path="/status" element={<StatusPage />} />
        </Route>

        {/* Worker workspace routes */}
        <Route path="/workspace" element={<WorkspaceLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="applications" element={<CasesPage />} />
          <Route path="application/:id" element={<CaseDetailPage />} />
          <Route path="application/:id/timeline" element={<TimelinePage />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
