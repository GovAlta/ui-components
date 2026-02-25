import { useState } from "react";
import { GoabxRadioGroup, GoabxRadioItem } from "@abgov/react-components/experimental";
import { GoabAppHeader, GoabAppHeaderMenu } from "@abgov/react-components";
import { GoabRadioGroupOnChangeDetail } from "@abgov/ui-components-common";

export function HeaderWithMenuClickEvent() {
  const [deviceWidth, setDeviceWidth] = useState("5000");

  function handleMenuClick() {
    alert("Menu not being displayed and you can do anything");
  }

  return (
    <>
      <GoabxRadioGroup
        name="device"
        value={deviceWidth}
        onChange={(event: GoabRadioGroupOnChangeDetail) =>
          setDeviceWidth(event.value)
        }
      >
        <GoabxRadioItem value="600" label="Desktop" />
        <GoabxRadioItem value="5000" label="Mobile" />
      </GoabxRadioGroup>

      <GoabAppHeader
        url="https://example.com"
        heading="Design System"
        onMenuClick={handleMenuClick}
        fullMenuBreakpoint={+deviceWidth}
      >
        <GoabAppHeaderMenu heading="Search" leadingIcon="search">
          <a href="#">Cases</a>
          <a href="#">Payments</a>
          <a href="#">Outstanding</a>
        </GoabAppHeaderMenu>
        <a href="#">Support</a>
        <a href="#" className="interactive">
          Sign in
        </a>
      </GoabAppHeader>
    </>
  );
}
