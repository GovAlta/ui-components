import { Link, Outlet } from "react-router-dom";
import {
  GoABAppFooter,
  GoABAppHeader,
  GoABMicrositeHeader,
  GoABOneColumnLayout,
  GoABSideMenu,
  GoABSideMenuGroup,
} from "@abgov/react-components";
import "@abgov/style";

export function App() {
  return (
    <GoABOneColumnLayout>
      <section slot="header">
        <GoABMicrositeHeader type="alpha" version="UAT" />
        <GoABAppHeader url="/" heading="Design System">
          <a href="/login">Sign in</a>
        </GoABAppHeader>
      </section>
      <div style={{ display: "flex" }}>
        <section style={{ flex: "0 0 250px" }}>
          <GoABSideMenu>
            <GoABSideMenuGroup heading="Components">
              <Link to="/">Nothing here</Link>

              {/* Add links here */}
            </GoABSideMenuGroup>

            {/* Add links here */}
          </GoABSideMenu>
        </section>
        <section>
          <Outlet />
        </section>
      </div>
      <section slot="footer">
        <GoABAppFooter />
      </section>
    </GoABOneColumnLayout>
  );
}

export default App;
