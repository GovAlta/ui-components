import { StrictMode } from "react";

import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@abgov/web-components";
import App from "./app/app";
import AllComponents from "./app/all";

import { Bug2152Route } from "./app/routes.tsx/bugs/bug2152";
import { Bug2331Route } from "./app/routes.tsx/bugs/bug2331";
import { Bug2393Route } from "./app/routes.tsx/bugs/bug2393";
import { Bug2404Route } from "./app/routes.tsx/bugs/bug2404";
import { Bug2408Route } from "./app/routes.tsx/bugs/bug2408";
import { Bug2459Route } from "./app/routes.tsx/bugs/bug2459";
import { Bug2473Route } from "./app/routes.tsx/bugs/bug2473";
import { Bug2502Route } from "./app/routes.tsx/bugs/bug2502";
import { Bug2529Route } from "./app/routes.tsx/bugs/bug2529";
import { Bug2547Route } from "./app/routes.tsx/bugs/bug2547";
import { Bug2655Route } from "./app/routes.tsx/bugs/bug2655";
import { Bug2720Route } from "./app/routes.tsx/bugs/bug2720";
import { Bug2721Route } from "./app/routes.tsx/bugs/bug2721";
import { Bug2750Route } from "./app/routes.tsx/bugs/bug2750";
import { Bug2768Route } from "./app/routes.tsx/bugs/bug2768";
import { Bug2782Route } from "./app/routes.tsx/bugs/bug2782";
import { Bug2789Route } from "./app/routes.tsx/bugs/bug2789";
import { Bug2821Route } from "./app/routes.tsx/bugs/bug2821";
import { Bug2837Route } from "./app/routes.tsx/bugs/bug2837";
import { Bug2839Route } from "./app/routes.tsx/bugs/bug2839";
import { Bug2849Route } from "./app/routes.tsx/bugs/bug2849";
import { Bug2852Route } from "./app/routes.tsx/bugs/bug2852";
import { Bug2878Route } from "./app/routes.tsx/bugs/bug2878";
import { Bug2892Route } from "./app/routes.tsx/bugs/bug2892";
import { Bug2922Route } from "./app/routes.tsx/bugs/bug2922";
import { Bug2943Route } from "./app/routes.tsx/bugs/bug2943";
import { Bug2948Route } from "./app/routes.tsx/bugs/bug2948";
import { EverythingRoute } from "./app/routes.tsx/everything";
import { Feat1547Route } from "./app/routes.tsx/features/feat1547";
import { Feat1813Route } from "./app/routes.tsx/features/feat1813";
import { Feat2361Route } from "./app/routes.tsx/features/feat2361";
import { Feat2054Route } from "./app/routes.tsx/features/feat2054";
import { Feat2267Route } from "./app/routes.tsx/features/feat2267";
import { Feat2492Route } from "./app/routes.tsx/features/feat2492";
import { Feat2682Route } from "./app/routes.tsx/features/feat2682";
import { Feat2722Route } from "./app/routes.tsx/features/feat2722";
import { Feat2730Route } from "./app/routes.tsx/features/feat2730";
import { Feat2829Route } from "./app/routes.tsx/features/feat2829";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="bugs/bug2152" element={<Bug2152Route />} />
          <Route path="bugs/bug2331" element={<Bug2331Route />} />
          <Route path="bugs/bug2393" element={<Bug2393Route />} />
          <Route path="bugs/bug2404" element={<Bug2404Route />} />
          <Route path="bugs/bug2408" element={<Bug2408Route />} />
          <Route path="bugs/bug2459" element={<Bug2459Route />} />
          <Route path="bugs/bug2473" element={<Bug2473Route />} />
          <Route path="bugs/bug2502" element={<Bug2502Route />} />
          <Route path="bugs/bug2529" element={<Bug2529Route />} />
          <Route path="bugs/bug2547" element={<Bug2547Route />} />
          <Route path="bugs/bug2655" element={<Bug2655Route />} />
          <Route path="bugs/bug2720" element={<Bug2720Route />} />
          <Route path="bugs/bug2721" element={<Bug2721Route />} />
          <Route path="bugs/bug2750" element={<Bug2750Route />} />
          <Route path="bugs/bug2768" element={<Bug2768Route />} />
          <Route path="bugs/bug2782" element={<Bug2782Route />} />
          <Route path="bugs/bug2789" element={<Bug2789Route />} />
          <Route path="bugs/bug2821" element={<Bug2821Route />} />
          <Route path="bugs/bug2837" element={<Bug2837Route />} />
          <Route path="bugs/bug2839" element={<Bug2839Route />} />
          <Route path="bugs/bug2849" element={<Bug2849Route />} />
          <Route path="bugs/bug2852" element={<Bug2852Route />} />
          <Route path="bugs/bug2878" element={<Bug2878Route />} />
          <Route path="bugs/bug2892" element={<Bug2892Route />} />
          <Route path="bugs/bug2922" element={<Bug2922Route />} />
          <Route path="bugs/bug2943" element={<Bug2943Route />} />
          <Route path="bugs/bug2948" element={<Bug2948Route />} />
          <Route path="everything" element={<EverythingRoute />} />
          <Route path="features/feat1547" element={<Feat1547Route />} />
          <Route path="features/feat1813" element={<Feat1813Route />} />
          <Route path="features/feat2361" element={<Feat2361Route />} />
          <Route path="features/feat2054" element={<Feat2054Route />} />
          <Route path="features/feat2267" element={<Feat2267Route />} />
          <Route path="features/feat2492" element={<Feat2492Route />} />
          <Route path="features/feat2682" element={<Feat2682Route />} />
          <Route path="features/feat2722" element={<Feat2722Route />} />
          <Route path="features/feat2730" element={<Feat2730Route />} />
          <Route path="features/feat2829" element={<Feat2829Route />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
