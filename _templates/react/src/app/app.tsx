import { Link, Outlet } from "react-router-dom";
import {
  GoabAppFooter,
  GoabAppHeader,
  GoabMicrositeHeader,
  GoabOneColumnLayout,
  GoabSideMenu,
  GoabSideMenuGroup,
} from "@abgov/react-components";
import "@abgov/style";

export function App() {
  return (
    <GoabOneColumnLayout>
      <section slot="header">
        <GoabMicrositeHeader type="alpha" version="UAT" />
        <GoabAppHeader url="/" heading="Design System">
          <a href="/login">Sign in</a>
        </GoabAppHeader>
      </section>
      <div style={{ display: "flex" }}>
        <section style={{ flex: "0 0 250px" }}>
          <GoabSideMenu>
            <GoabSideMenuGroup heading="Components">
              <Link to="/">Nothing here</Link>

              {/* Add links here */}
            </GoabSideMenuGroup>

            {/* Add links here */}
          </GoabSideMenu>
        </section>
        <section>
          <Outlet />
        </section>
      </div>
      <section slot="footer">
        <GoabAppFooter />
      </section>
    </GoabOneColumnLayout>
  );
}

export default App;
