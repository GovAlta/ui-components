import { Outlet, useNavigate } from "react-router-dom";
import {
  GoabAppFooter,
  GoabAppHeader,
  GoabAppHeaderMenu,
  GoabMicrositeHeader,
  GoabOneColumnLayout,
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
} from "@abgov/react-components";

import "@abgov/style";

export function App() {
  const navigate = useNavigate();

  return (
    <GoabOneColumnLayout>
      <section slot="header" id="top">
        <GoabMicrositeHeader type="alpha" version="UAT" />
        <GoabAppHeader heading="Testing Playground" url="/">
          {/* Verify AppHeaderMenu still works after Popover API refactor (PR #3478) */}
          <GoabAppHeaderMenu heading="Services" leadingIcon="apps">
            <a href="/bugs/bug2720">bug2720</a>
            <a href="/features/3478">Popover Test</a>
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
        <GoabWorkSideMenu
          heading="Testing Playground"
          url="/"
          open={true}
          onNavigate={(path: string) => navigate(path)}
          primaryContent={
            <>
              <GoabWorkSideMenuGroup icon="alert-circle" heading="Bugs">
                <GoabWorkSideMenuItem
                  label="2152 Icon Custom Alignment"
                  url="/bugs/2152"
                />
                <GoabWorkSideMenuItem
                  label="2331 Block and Tab Dynamic Data"
                  url="/bugs/2331"
                />
                <GoabWorkSideMenuItem
                  label="2393 Popover Not Appearing"
                  url="/bugs/2393"
                />
                <GoabWorkSideMenuItem
                  label="2404 Input Angular Icon Button"
                  url="/bugs/2404"
                />
                <GoabWorkSideMenuItem
                  label="2408 Form Stepper Incomplete Rendering"
                  url="/bugs/2408"
                />
                <GoabWorkSideMenuItem
                  label="2459 File Upload Card TestId"
                  url="/bugs/2459"
                />
                <GoabWorkSideMenuItem
                  label="2473 DatePicker Ordinal Suffixes"
                  url="/bugs/2473"
                />
                <GoabWorkSideMenuItem
                  label="2502 Native Dropdown Height"
                  url="/bugs/2502"
                />
                <GoabWorkSideMenuItem
                  label="2529 Input Width Generation"
                  url="/bugs/2529"
                />
                <GoabWorkSideMenuItem
                  label="2547 Popover Hidden Near Notification"
                  url="/bugs/2547"
                />
                <GoabWorkSideMenuItem
                  label="2655 Dropdown/DatePicker in Modal"
                  url="/bugs/2655"
                />
                <GoabWorkSideMenuItem
                  label="2720 Tabs Change via Link"
                  url="/bugs/2720"
                />
                <GoabWorkSideMenuItem label="2721 Text Tag Margin" url="/bugs/2721" />
                <GoabWorkSideMenuItem
                  label="2750 Year Select Sorting"
                  url="/bugs/2750"
                />
                <GoabWorkSideMenuItem
                  label="2768 Enable/Disable Components"
                  url="/bugs/2768"
                />
                <GoabWorkSideMenuItem
                  label="2782 Disabled Inputs Hidden"
                  url="/bugs/2782"
                />
                <GoabWorkSideMenuItem
                  label="2789 Width Rem Measurements"
                  url="/bugs/2789"
                />
                <GoabWorkSideMenuItem
                  label="2821 Table Header Sorting Toggle"
                  url="/bugs/2821"
                />
                <GoabWorkSideMenuItem
                  label="2837 InputNumber Leading/Trailing Content"
                  url="/bugs/2837"
                />
                <GoabWorkSideMenuItem
                  label="2839 Button State After Click"
                  url="/bugs/2839"
                />
                <GoabWorkSideMenuItem
                  label="2849 Filterable Dropdown Keyboard"
                  url="/bugs/2849"
                />
                <GoabWorkSideMenuItem
                  label="2852 Filterable Dropdown Space Key"
                  url="/bugs/2852"
                />
                <GoabWorkSideMenuItem
                  label="2873 Drawer Scrolling Focus"
                  url="/bugs/2873"
                />
                <GoabWorkSideMenuItem
                  label="2878 DatePicker Input onChange"
                  url="/bugs/2878"
                />
                <GoabWorkSideMenuItem
                  label="2892 Input Width Calculations"
                  url="/bugs/2892"
                />
                <GoabWorkSideMenuItem
                  label="2922 Form Stepper Vertical"
                  url="/bugs/2922"
                />
                <GoabWorkSideMenuItem
                  label="2943 Drawer Text Components"
                  url="/bugs/2943"
                />
                <GoabWorkSideMenuItem
                  label="2948 Modal Heading Spacing"
                  url="/bugs/2948"
                />
                <GoabWorkSideMenuItem
                  label="2977 OnChangeDetails Event Missing"
                  url="/bugs/2977"
                />
                <GoabWorkSideMenuItem label="3118 Text Component ID" url="/bugs/3118" />
                <GoabWorkSideMenuItem
                  label="3201 Input Component Events"
                  url="/bugs/3201"
                />
                <GoabWorkSideMenuItem
                  label="3215 Drawer Initial Height"
                  url="/bugs/3215"
                />
                <GoabWorkSideMenuItem label="3232 GoabText Tag Size" url="/bugs/3232" />
                <GoabWorkSideMenuItem
                  label="3248 Dropdown Dynamic Children Sync"
                  url="/bugs/3248"
                />
                <GoabWorkSideMenuItem
                  label="3273 Nested Side Menu Groups"
                  url="/bugs/3273"
                />
                <GoabWorkSideMenuItem label="3275 Can't unset month" url="/bugs/3275" />
                <GoabWorkSideMenuItem
                  label="3322 App Header Menu Hover"
                  url="/bugs/3322"
                />
                <GoabWorkSideMenuItem
                  label="3281 GoabText p tag margin issues"
                  url="/bugs/3281"
                />
                <GoabWorkSideMenuItem
                  label="3337 Input autocomplete styling"
                  url="/bugs/3337"
                />
                <GoabWorkSideMenuItem
                  label="3279 Work Side Menu Key Nav"
                  url="/bugs/3279"
                />
                <GoabWorkSideMenuItem label="3384 v2 Table Border" url="/bugs/3384" />
                <GoabWorkSideMenuItem
                  label="3450 Dropdown expanding inside Container"
                  url="/bugs/3450"
                />
                <GoabWorkSideMenuItem
                  label="3497 Calendar Years Empty"
                  url="/bugs/3497"
                />
                <GoabWorkSideMenuItem label="3498 Radio alignment" url="/bugs/3498" />
                <GoabWorkSideMenuItem
                  label="3450 Dropdown expanding inside Container"
                  url="/bugs/3450"
                />
                <GoabWorkSideMenuItem
                  label="3607 Radio and Checkbox Interaction Area"
                  url="/bugs/3607"
                />
                <GoabWorkSideMenuItem
                  label="3505 Link Icon Click"
                  url="/bugs/3505"
                />
                <GoabWorkSideMenuItem
                  label="3614 IconButton Hitboxes"
                  url="/bugs/3614"
                />
                <GoabWorkSideMenuItem
                  label="3685 Checkbox & Radio: Reveal width not aligned with item"
                  url="/bugs/3685"
                />
                <GoabWorkSideMenuItem
                  label="3635 Input Leading icon color"
                  url="/bugs/3635"
                />
                <GoabWorkSideMenuItem
                  label="3637 Checkbox Table Header Row Height Bug"
                  url="/bugs/3637"
                />
                <GoabWorkSideMenuItem
                  label="3643 Popover Viewport Overflow"
                  url="/bugs/3643"
                />
              </GoabWorkSideMenuGroup>

              <GoabWorkSideMenuGroup icon="star" heading="Features">
                <GoabWorkSideMenuItem
                  label="1383 Button Filled Icons"
                  url="/features/1383"
                />
                <GoabWorkSideMenuItem
                  label="1547 Tooltip Multiline"
                  url="/features/1547"
                />
                <GoabWorkSideMenuItem
                  label="1813 DatePicker Width Properties"
                  url="/features/1813"
                />
                <GoabWorkSideMenuItem
                  label="1908 Linear Progress"
                  url="/features/1908"
                />
                <GoabWorkSideMenuItem
                  label="2054 MaxWidth Support"
                  url="/features/2054"
                />
                <GoabWorkSideMenuItem label="2267 Checkbox List" url="/features/2267" />
                <GoabWorkSideMenuItem
                  label="2328 Container Height Property"
                  url="/features/2328"
                />
                <GoabWorkSideMenuItem
                  label="2361 Radio/Checkbox Clickable Area"
                  url="/features/2361"
                />
                <GoabWorkSideMenuItem
                  label="2440 MenuButton Icon"
                  url="/features/2440"
                />
                <GoabWorkSideMenuItem label="2469/3580 Push Drawer" url="/features/2469" />
                <GoabWorkSideMenuItem
                  label="2492 TextArea onBlur"
                  url="/features/2492"
                />
                <GoabWorkSideMenuItem
                  label="2609 Data Table Base Component"
                  url="/features/2609"
                />
                <GoabWorkSideMenuItem label="2611 Segmented Tab" url="/features/2611" />
                <GoabWorkSideMenuItem
                  label="2611 Disabled Tab"
                  url="/features/2611-tabs-disabled"
                />
                <GoabWorkSideMenuItem
                  label="2682 DatePicker Issues"
                  url="/features/2682"
                />
                <GoabWorkSideMenuItem
                  label="2722 Input Text-Align"
                  url="/features/2722"
                />
                <GoabWorkSideMenuItem
                  label="2730 Temporary Notification Controller"
                  url="/features/2730"
                />
                <GoabWorkSideMenuItem
                  label="2829 Modal ARIA Live Region"
                  url="/features/2829"
                />
                <GoabWorkSideMenuItem
                  label="2877 Badge Types and Custom Icon"
                  url="/features/2877"
                />
                <GoabWorkSideMenuItem
                  label="3102 MenuButton Width"
                  url="/features/3102"
                />
                <GoabWorkSideMenuItem
                  label="3137 Work Side Menu Group"
                  url="/features/3137"
                />
                <GoabWorkSideMenuItem
                  label="3241 V2 Experimental Wrappers"
                  url="/features/3241"
                />
                <GoabWorkSideMenuItem label="v2 header icons" url="/features/v2-icons" />
                <GoabWorkSideMenuItem
                  label="3229 V2 Menu Button vs size and icon-only"
                  url="/features/3229"
                />
                <GoabWorkSideMenuItem
                  label="3344 Table Multi-Sort"
                  url="/features/3344"
                />
                <GoabWorkSideMenuItem
                  label="3306 Custom slug value for tabs"
                  url="/features/3306"
                />
                <GoabWorkSideMenuItem
                  label="3370 Clear calendar day selection"
                  url="/features/3370"
                />
                <GoabWorkSideMenuItem
                  label="3396 Text heading-2xs size"
                  url="/features/3396"
                />
                <GoabWorkSideMenuItem
                  label="3399 V2 Checkbox Spacing"
                  url="/features/v2-checkbox"
                />
                <GoabWorkSideMenuItem
                  label="3407 Skip Focus on Tab"
                  url="/features/3407-skip-on-focus-tab"
                />
                <GoabWorkSideMenuItem
                  label="3407 Tabs Orientation"
                  url="/features/3407-stack-on-mobile"
                />
                <GoabWorkSideMenuItem
                  label="3398 Group open prop"
                  url="/features/3398"
                />
                <GoabWorkSideMenuItem
                  label="3478 Popover API Rewrite"
                  url="/features/3478"
                />
                <GoabWorkSideMenuItem
                  label="3544 Optional Side Menu Icons"
                  url="/features/3544"
                />
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
