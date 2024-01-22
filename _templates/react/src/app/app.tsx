import { Link, Outlet } from "react-router-dom";
import { GoAAppFooter, GoAAppHeader, GoAMicrositeHeader, GoAOneColumnLayout, GoASideMenu, GoASideMenuGroup } from "@abgov/react-components";
import "@abgov/style";

export function App() {
  return (
    <GoAOneColumnLayout>
      <section slot="header">
        <GoAMicrositeHeader type="alpha" version="UAT" />
        <GoAAppHeader url="/" heading="Design System">
          <a href="/login">Sign in</a>
        </GoAAppHeader>
      </section>
      <div style={{ display: "flex" }}>
        <section style={{ flex: "0 0 250px" }}>
          <GoASideMenu>
            <GoASideMenuGroup heading="Components">
              <Link to="/">Nothing here</Link>

              {/* Add links here */}

            </GoASideMenuGroup>

            {/* Add links here */}

          </GoASideMenu>
        </section>
        <section>
          <Outlet />
        </section>
      </div>
      <section slot="footer">
        <GoAAppFooter />
      </section>
    </GoAOneColumnLayout>
  );
}

export default App;
