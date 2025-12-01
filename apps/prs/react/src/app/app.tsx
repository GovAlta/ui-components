import { Link, Outlet } from "react-router-dom";
import {
  GoabAppFooter,
  GoabAppHeader,
  GoabAppHeaderMenu,
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
        <GoabAppHeader>
          <Link to="/">Home</Link>
        </GoabAppHeader>
      </section>
      <div style={{ display: "flex" }}>
        <section style={{ flex: "0 0 250px" }} role="nav">
          <GoabSideMenu>
            <Link to="/everything">Everything</Link>
            <GoabSideMenuGroup heading="Bugs">
              <Link to="/bugs/2152">2152</Link>
              <Link to="/bugs/2331">2331</Link>
              <Link to="/bugs/2393">2393</Link>
              <Link to="/bugs/2404">2404</Link>
              <Link to="/bugs/2408">2408</Link>
              <Link to="/bugs/2459">2459</Link>
              <Link to="/bugs/2473">2473</Link>
              <Link to="/bugs/2502">2502</Link>
              <Link to="/bugs/2529">2529</Link>
              <Link to="/bugs/2547">2547</Link>
              <Link to="/bugs/2655">2655</Link>
              <Link to="/bugs/2720">2720</Link>
              <Link to="/bugs/2721">2721</Link>
              <Link to="/bugs/2750">2750</Link>
              <Link to="/bugs/2768">2768</Link>
              <Link to="/bugs/2782">2782</Link>
              <Link to="/bugs/2789">2789</Link>
              <Link to="/bugs/2821">2821</Link>
              <Link to="/bugs/2837">2837</Link>
              <Link to="/bugs/2839">2839</Link>
              <Link to="/bugs/2849">2849</Link>
              <Link to="/bugs/2852">2852</Link>
              <Link to="/bugs/2878">2878</Link>
              <Link to="/bugs/2892">2892</Link>
              <Link to="/bugs/2922">2922</Link>
              <Link to="/bugs/2943">2943</Link>
              <Link to="/bugs/2948">2948</Link>
              <Link to="/bugs/3118">3118</Link>
              <Link to="/bugs/3232">3232</Link>
            </GoabSideMenuGroup>
            <GoabSideMenuGroup heading="Features">
              <Link to="/features/1547">1547</Link>
              <Link to="/features/1813">1813</Link>
              <Link to="/features/2054">2054</Link>
              <Link to="/features/2267">2267</Link>
              <Link to="/features/2361">2361</Link>
              <Link to="/features/2440">2440</Link>
              <Link to="/features/2492">2492</Link>
              <Link to="/features/2682">2682</Link>
              <Link to="/features/2722">2722</Link>
              <Link to="/features/2730">2730</Link>
              <Link to="/features/2829">2829</Link>
              <Link to="/features/3102">3102</Link>
            </GoabSideMenuGroup>
          </GoabSideMenu>
        </section>
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
