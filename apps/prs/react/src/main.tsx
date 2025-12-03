import { StrictMode } from "react";

import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@abgov/web-components";
import App from "./app/app";

import { Bug2152Route } from "./routes/bugs/bug2152";
import { Bug2331Route } from "./routes/bugs/bug2331";
import { Bug2393Route } from "./routes/bugs/bug2393";
import { Bug2404Route } from "./routes/bugs/bug2404";
import { Bug2408Route } from "./routes/bugs/bug2408";
import { Bug2459Route } from "./routes/bugs/bug2459";
import { Bug2473Route } from "./routes/bugs/bug2473";
import { Bug2502Route } from "./routes/bugs/bug2502";
import { Bug2529Route } from "./routes/bugs/bug2529";
import { Bug2547Route } from "./routes/bugs/bug2547";
import { Bug2655Route } from "./routes/bugs/bug2655";
import { Bug2720Route } from "./routes/bugs/bug2720";
import { Bug2721Route } from "./routes/bugs/bug2721";
import { Bug2750Route } from "./routes/bugs/bug2750";
import { Bug2768Route } from "./routes/bugs/bug2768";
import { Bug2782Route } from "./routes/bugs/bug2782";
import { Bug2789Route } from "./routes/bugs/bug2789";
import { Bug2821Route } from "./routes/bugs/bug2821";
import { Bug2837Route } from "./routes/bugs/bug2837";
import { Bug2839Route } from "./routes/bugs/bug2839";
import { Bug2849Route } from "./routes/bugs/bug2849";
import { Bug2852Route } from "./routes/bugs/bug2852";
import { Bug2878Route } from "./routes/bugs/bug2878";
import { Bug2892Route } from "./routes/bugs/bug2892";
import { Bug2922Route } from "./routes/bugs/bug2922";
import { Bug2943Route } from "./routes/bugs/bug2943";
import { Bug2948Route } from "./routes/bugs/bug2948";
import { Bug2977Route } from "./routes/bugs/bug2977";
import { Bug3118Route } from "./routes/bugs/bug3118";
import { EverythingRoute } from "./routes/everything";
import { Feat1547Route } from "./routes/features/feat1547";
import { Feat1813Route } from "./routes/features/feat1813";
import { Feat2361Route } from "./routes/features/feat2361";
import { Feat2054Route } from "./routes/features/feat2054";
import { Feat2267Route } from "./routes/features/feat2267";
import { Feat2440Route } from "./routes/features/feat2440";
import { Feat2492Route } from "./routes/features/feat2492";
import { Feat2682Route } from "./routes/features/feat2682";
import { Feat2722Route } from "./routes/features/feat2722";
import { Feat2730Route } from "./routes/features/feat2730";
import { Feat2829Route } from "./routes/features/feat2829";
import Feat3102Route from "./routes/features/feat3102";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="everything" element={<EverythingRoute />} />
          <Route path="bugs/2152" element={<Bug2152Route />} />
          <Route path="bugs/2331" element={<Bug2331Route />} />
          <Route path="bugs/2393" element={<Bug2393Route />} />
          <Route path="bugs/2404" element={<Bug2404Route />} />
          <Route path="bugs/2408" element={<Bug2408Route />} />
          <Route path="bugs/2459" element={<Bug2459Route />} />
          <Route path="bugs/2473" element={<Bug2473Route />} />
          <Route path="bugs/2502" element={<Bug2502Route />} />
          <Route path="bugs/2529" element={<Bug2529Route />} />
          <Route path="bugs/2547" element={<Bug2547Route />} />
          <Route path="bugs/2655" element={<Bug2655Route />} />
          <Route path="bugs/2720" element={<Bug2720Route />} />
          <Route path="bugs/2721" element={<Bug2721Route />} />
          <Route path="bugs/2750" element={<Bug2750Route />} />
          <Route path="bugs/2768" element={<Bug2768Route />} />
          <Route path="bugs/2782" element={<Bug2782Route />} />
          <Route path="bugs/2789" element={<Bug2789Route />} />
          <Route path="bugs/2821" element={<Bug2821Route />} />
          <Route path="bugs/2837" element={<Bug2837Route />} />
          <Route path="bugs/2839" element={<Bug2839Route />} />
          <Route path="bugs/2849" element={<Bug2849Route />} />
          <Route path="bugs/2852" element={<Bug2852Route />} />
          <Route path="bugs/2878" element={<Bug2878Route />} />
          <Route path="bugs/2892" element={<Bug2892Route />} />
          <Route path="bugs/2922" element={<Bug2922Route />} />
          <Route path="bugs/2943" element={<Bug2943Route />} />
          <Route path="bugs/2948" element={<Bug2948Route />} />
          <Route path="bugs/2977" element={<Bug2977Route />} />
          <Route path="bugs/3118" element={<Bug3118Route />} />
          <Route path="features/1547" element={<Feat1547Route />} />
          <Route path="features/1813" element={<Feat1813Route />} />
          <Route path="features/2361" element={<Feat2361Route />} />
          <Route path="features/2054" element={<Feat2054Route />} />
          <Route path="features/2267" element={<Feat2267Route />} />
          <Route path="features/2440" element={<Feat2440Route />} />
          <Route path="features/2492" element={<Feat2492Route />} />
          <Route path="features/2682" element={<Feat2682Route />} />
          <Route path="features/2722" element={<Feat2722Route />} />
          <Route path="features/2730" element={<Feat2730Route />} />
          <Route path="features/2829" element={<Feat2829Route />} />
          <Route path="features/3102" element={<Feat3102Route />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
