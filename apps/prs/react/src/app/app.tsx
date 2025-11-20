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
          <GoabAppHeaderMenu heading="Insights">
            <a href="/bugs/bug2878" className="interactive">
              2878
            </a>
            <a href="/">Regional Insights</a>
            <a href="/">Occupational Insights</a>
          </GoabAppHeaderMenu>
        </GoabAppHeader>
      </section>
      <div style={{ display: "flex" }}>
        <section style={{ flex: "0 0 250px" }} role="nav">
          <GoabSideMenu>
            <GoabSideMenuGroup heading="Bugs">
              <Link to="/bugs/bug2152">2152</Link>
              <Link to="/bugs/bug2331">2331</Link>
              <Link to="/bugs/bug2393">2393</Link>
              <Link to="/bugs/bug2404">2404</Link>
              <Link to="/bugs/bug2408">2408</Link>
              <Link to="/bugs/bug2459">2459</Link>
              <Link to="/bugs/bug2473">2473</Link>
              <Link to="/bugs/bug2502">2502</Link>
              <Link to="/bugs/bug2529">2529</Link>
              <Link to="/bugs/bug2547">2547</Link>
              <Link to="/bugs/bug2655">2655</Link>
              <Link to="/bugs/bug2720">2720</Link>
              <Link to="/bugs/bug2721">2721</Link>
              <Link to="/bugs/bug2750">2750</Link>
              <Link to="/bugs/bug2768">2768</Link>
              <Link to="/bugs/bug2782">2782</Link>
              <Link to="/bugs/bug2789">2789</Link>
              <Link to="/bugs/bug2821">2821</Link>
              <Link to="/bugs/bug2837">2837</Link>
              <Link to="/bugs/bug2839">2839</Link>
              <Link to="/bugs/bug2849">2849</Link>
              <Link to="/bugs/bug2852">2852</Link>
              <Link to="/bugs/bug2878">2878</Link>
              <Link to="/bugs/bug2892">2892</Link>
              <Link to="/bugs/bug2922">2922</Link>
              <Link to="/bugs/bug2943">2943</Link>
              <Link to="/bugs/bug2948">2948</Link>
            </GoabSideMenuGroup>
            <Link to="/everything">Everything</Link>
            <GoabSideMenuGroup heading="Features">
              <Link to="/features/feat1547">1547</Link>
              <Link to="/features/feat1813">1813</Link>
              <Link to="/features/feat2361">2361</Link>
              <Link to="/features/feat2054">2054</Link>
              <Link to="/features/feat2267">2267</Link>
              <Link to="/features/feat2492">2492</Link>
              <Link to="/features/feat2682">2682</Link>
              <Link to="/features/feat2722">2722</Link>
              <Link to="/features/feat2730">2730</Link>
              <Link to="/features/feat2829">2829</Link>
            </GoabSideMenuGroup>
            <GoabSideMenuGroup heading="Components">
              <Link to="/components/linear-progress">Linear Progress</Link>
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
