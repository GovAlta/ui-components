import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import "@abgov/web-components";
// Component styles (fonts, reset, base styles)
import "@abgov/style";
// V2 design tokens - loaded after to override v1 token values
import "@abgov/design-tokens/dist/tokens.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
