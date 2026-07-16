import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoabThemeProvider } from "@abgov/react-components";
import "@abgov/web-components";
import { App } from "./app/app";

/**
 * Entry point. Only three concerns live here, and none of them are routes:
 *   - mount React
 *   - register the GoA web components (the "@abgov/web-components" import)
 *   - wrap the tree in the router and the GoA theme
 *
 * The route table itself lives in app/app.tsx, so this file never changes as
 * the form grows.
 */
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <GoabThemeProvider>
        <App />
      </GoabThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
