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
      <section slot="header" id="top">
        <GoabMicrositeHeader type="alpha" version="UAT" />
        <GoabAppHeader heading="Testing Playground" url="/">
          <a href="/">Home</a>
          <GoabAppHeaderMenu heading="Insights">
            <a href="/bugs/bug2720">bug2720</a>
            <a href="/bugs/3450">Dropdown expanding</a>
            <a href="/bugs/3450">...inside Container</a>
            <a href="/bugs/3450">
              Super long menu item to test overflow handling lorem ipsum dolor sit amet
            </a>
          </GoabAppHeaderMenu>
          <GoabAppHeaderMenu heading="Popover">
            <a href="/bugs/3450">Bug 3450</a>
            <a href="/bugs/3450">Bug 3450</a>
            <a href="/bugs/3450">
              Super long menu item to test overflow handling lorem ipsum dolor sit amet
            </a>
          </GoabAppHeaderMenu>
          <GoabAppHeaderMenu heading="John Smith" leadingIcon="person-circle">
            <a href="#top">Manage account</a>
            <a href="#top">Request new staff account</a>
            <a href="#top">System admin</a>
            <a href="#top" className="interactive">
              Sign out
            </a>
            <a href="/bugs/3450">
              Super long menu item to test overflow handling lorem ipsum dolor sit amet
            </a>
          </GoabAppHeaderMenu>
        </GoabAppHeader>
      </section>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <section
          style={{
            flex: "0 0 250px",
            borderRight: "1px solid var(--goa-color-greyscale-200)",
            minHeight: "100%",
          }}
          role="nav"
        >
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
              <Link to="/bugs/2873">2873 Drawer Scrolling Focus</Link>
              <Link to="/bugs/2878">2878 DatePicker Input onChange</Link>
              <Link to="/bugs/2892">2892 Input Width Calculations</Link>
              <Link to="/bugs/2922">2922 Form Stepper Vertical</Link>
              <Link to="/bugs/2943">2943 Drawer Text Components</Link>
              <Link to="/bugs/2948">2948 Modal Heading Spacing</Link>
              <Link to="/bugs/2977">2977 OnChangeDetails Event Missing</Link>
              <Link to="/bugs/3118">3118 Text Component ID</Link>
              <Link to="/bugs/3201">3201 Input Component Events</Link>
              <Link to="/bugs/3215">3215 Drawer Initial Height</Link>
              <Link to="/bugs/3232">3232 GoabText Tag Size</Link>
              <Link to="/bugs/3248">3248 Dropdown Dynamic Children Sync</Link>
              <Link to="/bugs/3273">3273 Nested Side Menu Groups</Link>
              <Link to="/bugs/3275">3275 Can't unset month</Link>
              <Link to="/bugs/3322">3322 App Header Menu Hover</Link>
              <Link to="/bugs/3281">3281 GoabText p tag margin issues</Link>
              <Link to="/bugs/3337">3337 Input autocomplete styling</Link>
              <Link to="/bugs/3279">3279 Work Side Menu Key Nav</Link>
              <Link to="/bugs/3384">3384 v2 Table Border</Link>
              <Link to="/bugs/3450">3450 Dropdown expanding inside Container</Link>
              <Link to="/bugs/3497">3497 Calendar Years Empty</Link>
            </GoabSideMenuGroup>
            <GoabSideMenuGroup heading="Features">
              <Link to="/features/1383">1383 Button Filled Icons</Link>
              <Link to="/features/1547">1547 Tooltip Multiline</Link>
              <Link to="/features/1813">1813 DatePicker Width Properties</Link>
              <Link to="/features/1908">1908 Linear Progress</Link>
              <Link to="/features/2054">2054 MaxWidth Support</Link>
              <Link to="/features/2267">2267 Checkbox List</Link>
              <Link to="/features/2328">2328 Container Height Property</Link>
              <Link to="/features/2361">2361 Radio/Checkbox Clickable Area</Link>
              <Link to="/features/2440">2440 MenuButton Icon</Link>
              <Link to="/features/2469">2469 Push Drawer</Link>
              <Link to="/features/2492">2492 TextArea onBlur</Link>
              <Link to="/features/2609">2609 Data Table Base Component</Link>
              <Link to="/features/2611">2611 Segmented Tab</Link>
              <Link to="/features/2611-tabs-disabled">2611 Disabled Tab</Link>
              <Link to="/features/2682">2682 DatePicker Issues</Link>
              <Link to="/features/2722">2722 Input Text-Align</Link>
              <Link to="/features/2730">2730 Temporary Notification Controller</Link>
              <Link to="/features/2829">2829 Modal ARIA Live Region</Link>
              <Link to="/features/2877">2877 Badge Types and Custom Icon</Link>
              <Link to="/features/3102">3102 MenuButton Width</Link>
              <Link to="/features/3137">3137 Work Side Menu Group</Link>
              <Link to="/features/3241">3241 V2 Experimental Wrappers</Link>
              <Link to="/features/v2-icons">v2 header icons</Link>
              <Link to="/features/3229">3229 V2 Menu Button vs size and icon-only</Link>
              <Link to="/features/3344">3344 Table Multi-Sort</Link>
              <Link to="/features/3306">3306 Custom slug value for tabs</Link>
              <Link to="/features/3370">3370 Clear calendar day selection</Link>
              <Link to="/features/3396">3396 Text heading-2xs size</Link>
              <Link to="/features/v2-checkbox">3399 V2 Checkbox Spacing</Link>
              <Link to="/features/3407-skip-on-focus-tab">3407 Skip Focus on Tab</Link>
              <Link to="/features/3407-stack-on-mobile">3407 Tabs Orientation</Link>
              <Link to="/features/3398">3398 Group open prop</Link>
            </GoabSideMenuGroup>
            <GoabSideMenuGroup heading="Everything">
              <Link to="/everything">A</Link>
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
