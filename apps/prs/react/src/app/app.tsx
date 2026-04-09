import type { CSSProperties } from "react";
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
import { bugRouteDefinitions, featureRouteDefinitions } from "./route-manifest";
import "@abgov/design-tokens-v2/dist/tokens.css"; // Production tokens. Comment out to test with legacy V1 token values.

const appContentStyle: CSSProperties = {
  display: "flex",
  minHeight: "calc(100vh - 10.1875rem)",
  "--goa-work-side-menu-height": "calc(100vh - 10.1875rem)",
} as CSSProperties;

export function App() {
  const navigate = useNavigate();

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
          onNavigate={(path: string) => navigate(path)}
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
              <GoabWorkSideMenuItem icon="list" label="Everything" url="/everything" />
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
