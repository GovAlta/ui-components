import { Link, Outlet } from "react-router-dom";
import { ABGovAppFooter, ABGovAppHeader, ABGovMicrositeHeader, ABGovOneColumnLayout, ABGovSideMenu, ABGovSideMenuGroup } from "@abgov/react-components";
import "@abgov/style";

export function App() {
  return (
    <ABGovOneColumnLayout>
      <section slot="header">
        <ABGovMicrositeHeader type="alpha" version="UAT" />
        <ABGovAppHeader url="/" heading="Design System">
          <a href="/login">Sign in</a>
        </ABGovAppHeader>
      </section>
      <div style={{ display: "flex" }}>
        <section style={{ flex: "0 0 250px" }}>
          <ABGovSideMenu>
            <ABGovSideMenuGroup heading="Components">
              <Link to="/">Nothing here</Link>

              {/* Add links here */}

            </ABGovSideMenuGroup>

            {/* Add links here */}

          </ABGovSideMenu>
        </section>
        <section>
          <Outlet />
        </section>
      </div>
      <section slot="footer">
        <ABGovAppFooter />
      </section>
    </ABGovOneColumnLayout>
  );
}

export default App;
