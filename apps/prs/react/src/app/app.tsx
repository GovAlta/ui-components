import { useState, type CSSProperties } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  GoabAppFooter,
  GoabAppHeader,
  GoabMicrositeHeader,
  GoabOneColumnLayout,
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
} from "@abgov/react-components";
import {
  bugRouteDefinitions,
  docsRouteDefinitions,
  featureRouteDefinitions,
} from "./route-manifest";

import "@abgov/style";
// Runtime V1/V2 token switching. Importing this module applies the currently
// selected token set (default V2) to <head> before the app renders. The
// playground's work-side-menu exposes a secondary item that flips between
// V1 and V2 at runtime without editing source or restarting the dev server.
import {
  applyTokenVersion,
  resolveTokenVersion,
  type TokenVersion,
} from "./tokenVersion";

// Sentinel URL handled by onNavigate below to toggle tokens instead of routing.
const TOKEN_TOGGLE_URL = "#tokens";

const appContentStyle: CSSProperties = {
  display: "flex",
  minHeight: "calc(100vh - 10.1875rem)",
  "--goa-work-side-menu-height": "calc(100vh - 10.1875rem)",
} as CSSProperties;

export function App() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.BASE_URL;
  const [tokenMode, setTokenMode] = useState<TokenVersion>(() =>
    resolveTokenVersion(),
  );

  const handleSideMenuNavigate = (path: string) => {
    if (path === TOKEN_TOGGLE_URL) {
      const next: TokenVersion = tokenMode === "v1" ? "v2" : "v1";
      setTokenMode(next);
      applyTokenVersion(next);
      return;
    }
    const internal = path.startsWith(baseUrl) ? "/" + path.slice(baseUrl.length) : path;
    navigate(internal);
  };

  return (
    <GoabOneColumnLayout>
      <section slot="header" id="top">
        <GoabMicrositeHeader type="alpha" version="UAT" />
        <GoabAppHeader heading="Testing Playground" url={baseUrl} />
      </section>
      <div style={appContentStyle}>
        <GoabWorkSideMenu
          heading="Testing Playground"
          url={baseUrl}
          open={true}
          onNavigate={handleSideMenuNavigate}
          secondaryContent={
            <GoabWorkSideMenuItem
              label={`Switch to ${tokenMode === "v1" ? "V2" : "V1"} tokens`}
              icon="swap-horizontal"
              url={TOKEN_TOGGLE_URL}
            />
          }
          primaryContent={
            <>
              <GoabWorkSideMenuGroup icon="alert-circle" heading="Bugs">
                {bugRouteDefinitions.map((route) => (
                  <GoabWorkSideMenuItem
                    key={route.path}
                    label={route.id + " - " + route.title}
                    url={`${baseUrl}${route.path}`}
                  />
                ))}
              </GoabWorkSideMenuGroup>

              <GoabWorkSideMenuGroup icon="star" heading="Features">
                {featureRouteDefinitions.map((route) => (
                  <GoabWorkSideMenuItem
                    key={route.path}
                    label={route.id + " - " + route.title}
                    url={`${baseUrl}${route.path}`}
                  />
                ))}
              </GoabWorkSideMenuGroup>
              <GoabWorkSideMenuGroup icon="book" heading="Docs">
                {docsRouteDefinitions.map((route) => (
                  <GoabWorkSideMenuItem
                    key={route.path}
                    label={route.title}
                    url={`${baseUrl}${route.path}`}
                  />
                ))}
              </GoabWorkSideMenuGroup>
              <GoabWorkSideMenuItem icon="list" label="Everything" url={`${baseUrl}everything`} />
            </>
          }
        />
        <section style={{ padding: "30px", width: "100%" }} role="main">
          <Outlet />
        </section>
      </div>
      <section slot="footer" role="footer">
        <GoabAppFooter maxContentWidth="100%" />
      </section>
    </GoabOneColumnLayout>
  );
}

export default App;
