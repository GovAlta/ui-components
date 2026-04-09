import { StrictMode } from "react";

import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@abgov/web-components";
import App from "./app/app";
import { EverythingRoute } from "./routes/everything";
import { EverythingBRoute } from "./routes/everything-b";
import { prRouteDefinitions } from "./app/route-manifest";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/everything/b" element={<EverythingBRoute />} />
        <Route path="/" element={<App />}>
          <Route path="everything" element={<EverythingRoute />} />
          {prRouteDefinitions.map((route) => {
            const Component = route.component;

            return <Route key={route.path} path={route.path} element={<Component />} />;
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
