import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoabThemeProvider } from "@abgov/react-components";
import "@abgov/web-components";
import { App } from "./app";

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
