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
        <GoabAppHeader heading="Testing Playground" url="/">
        </GoabAppHeader>
      </section>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <section style={{ flex: "0 0 250px", borderRight: "1px solid var(--goa-color-greyscale-200)", minHeight: "100%" }} role="nav">
          <GoabSideMenu>
            <GoabSideMenuGroup heading="Bugs">
              <Link to="/bugs/2152">2152 Icon Custom Alignment</Link>
              <Link to="/bugs/2331">2331 Block and Tab Dynamic Data</Link>
              <Link to="/bugs/2393">2393 Popover Not Appearing</Link>
              <Link to="/bugs/2404">2404 Input Angular Icon Button</Link>
              <Link to="/bugs/2408">2408 Form Stepper Incomplete Rendering</Link>
              <Link to="/bugs/2459">2459 File Upload Card TestId</Link>
              <Link to="/bugs/2473">2473 DatePicker Ordinal Suffixes</Link>
              <Link to="/bugs/2502">2502 Native Dropdown Height</Link>
              <Link to="/bugs/2529">2529 Input Width Generation</Link>
              <Link to="/bugs/2547">2547 Popover Hidden Near Notification</Link>
              <Link to="/bugs/2655">2655 Dropdown/DatePicker in Modal</Link>
              <Link to="/bugs/2720">2720 Tabs Change via Link</Link>
              <Link to="/bugs/2721">2721 Text Tag Margin</Link>
              <Link to="/bugs/2750">2750 Year Select Sorting</Link>
              <Link to="/bugs/2768">2768 Enable/Disable Components</Link>
              <Link to="/bugs/2782">2782 Disabled Inputs Hidden</Link>
              <Link to="/bugs/2789">2789 Width Rem Measurements</Link>
              <Link to="/bugs/2821">2821 Table Header Sorting Toggle</Link>
              <Link to="/bugs/2837">2837 InputNumber Leading/Trailing Content</Link>
              <Link to="/bugs/2839">2839 Button State After Click</Link>
              <Link to="/bugs/2849">2849 Filterable Dropdown Keyboard</Link>
              <Link to="/bugs/2852">2852 Filterable Dropdown Space Key</Link>
              <Link to="/bugs/2878">2878 DatePicker Input onChange</Link>
              <Link to="/bugs/2892">2892 Input Width Calculations</Link>
              <Link to="/bugs/2922">2922 Form Stepper Vertical</Link>
              <Link to="/bugs/2943">2943 Drawer Text Components</Link>
              <Link to="/bugs/2948">2948 Modal Heading Spacing</Link>
              <Link to="/bugs/3118">3118</Link>
            </GoabSideMenuGroup>
            <GoabSideMenuGroup heading="Features">
              <Link to="/features/1547">1547 Tooltip Multiline</Link>
              <Link to="/features/1813">1813 DatePicker Width Properties</Link>
              <Link to="/features/2054">2054 MaxWidth Support</Link>
              <Link to="/features/2267">2267 Checkbox List</Link>
              <Link to="/features/2361">2361 Radio/Checkbox Clickable Area</Link>
              <Link to="/features/2440">2440</Link>
              <Link to="/features/2492">2492 TextArea onBlur</Link>
              <Link to="/features/2682">2682 DatePicker Issues</Link>
              <Link to="/features/2722">2722 Input Text-Align</Link>
              <Link to="/features/2730">2730 Temporary Notification Controller</Link>
              <Link to="/features/2829">2829 Modal ARIA Live Region</Link>
              <Link to="/features/2877">2877 Badge Types and Custom Icon</Link>
              <Link to="/features/3102">3102</Link>
            </GoabSideMenuGroup>
            <GoabSideMenuGroup heading="Everything">
              <Link to="/everything">A</Link>
              <Link to="/everything/b">B</Link>
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
