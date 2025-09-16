import { StrictMode } from "react";

import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@abgov/web-components";
import App from "./app/app";
import AllComponents from "./app/all";
import { TestContent } from "./app/TestContent";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>

          <Route path="/all" element={<AllComponents />} />
          <Route path="/test" element={<TestContent />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
