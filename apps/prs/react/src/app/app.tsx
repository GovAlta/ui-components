import { type CSSProperties } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  GoabAppFooter,
  GoabAppHeader,
  GoabMicrositeHeader,
  GoabOneColumnLayout,
  GoabThemeProvider,
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
  useTheme,
} from "@abgov/react-components";
import {
  bugRouteDefinitions,
  docsRouteDefinitions,
  featureRouteDefinitions,
} from "./route-manifest";
import "@abgov/design-tokens-v2/dist/tokens.css"; // Production tokens. Comment out to test with legacy V1 token values.

import "@abgov/style";

// Dark mode spike: loads V2 tokens + surface tokens + dark theme overrides in guaranteed order.
// Comment out to disable dark mode entirely.
import "../dark-mode-overrides.css";

const appContentStyle: CSSProperties = {
  display: "flex",
  minHeight: "calc(100vh - 10.1875rem)",
  "--goa-work-side-menu-height": "calc(100vh - 10.1875rem)",
} as CSSProperties;

function AppShell() {
  const navigate = useNavigate();
  const { mode, toggle } = useTheme();
  const isDark = mode === "dark";

  return (
    <GoabOneColumnLayout>
      <section slot="header" id="top">
        <GoabMicrositeHeader type="alpha" version="UAT" />
        <GoabAppHeader heading="Testing Playground" url="/" />
      </section>
      <div style={appContentStyle}>
        <GoabWorkSideMenu
          heading="Testing Playground"
          url="/"
          open={true}
          onNavigate={(path: string) => {
            if (path === "#toggle-theme") {
              toggle();
            } else {
              navigate(path);
            }
          }}
          primaryContent={
            <>
              <GoabWorkSideMenuGroup icon="alert-circle" heading="Bugs">
                {bugRouteDefinitions.map((route) => (
                  <GoabWorkSideMenuItem
                    key={route.path}
                    label={route.id + " - " + route.title}
                    url={`/${route.path}`}
                  />
                ))}
              </GoabWorkSideMenuGroup>

              <GoabWorkSideMenuGroup icon="star" heading="Features">
                {featureRouteDefinitions.map((route) => (
                  <GoabWorkSideMenuItem
                    key={route.path}
                    label={route.id + " - " + route.title}
                    url={`/${route.path}`}
                  />
                ))}
              </GoabWorkSideMenuGroup>
              <GoabWorkSideMenuGroup icon="book" heading="Docs">
                {docsRouteDefinitions.map((route) => (
                  <GoabWorkSideMenuItem
                    key={route.path}
                    label={route.title}
                    url={`/${route.path}`}
                  />
                ))}
              </GoabWorkSideMenuGroup>
              <GoabWorkSideMenuItem icon="list" label="Everything" url="/everything" />
            </>
          }
          secondaryContent={
            <GoabWorkSideMenuItem
              icon={isDark ? "sunny" : "moon"}
              label={isDark ? "Light mode" : "Dark mode"}
              url="#toggle-theme"
            />
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

export function App() {
  return (
    <GoabThemeProvider>
      <AppShell />
    </GoabThemeProvider>
  );
}

export default App;
