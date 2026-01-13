import { useState } from "react";
import {
  GoabAppHeader,
  GoabAppHeaderMenu,
  GoabRadioGroup,
  GoabRadioItem,
} from "@abgov/react-components";
import { GoabRadioGroupOnChangeDetail } from "@abgov/ui-components-common";

export function HeaderWithMenuClickEvent() {
  const [deviceWidth, setDeviceWidth] = useState("5000");

  function handleMenuClick() {
    alert("Menu not being displayed and you can do anything");
  }

  return (
    <>
      <GoabRadioGroup
        name="device"
        value={deviceWidth}
        onChange={(event: GoabRadioGroupOnChangeDetail) =>
          setDeviceWidth(event.value)
        }
      >
        <GoabRadioItem value="600" label="Desktop" />
        <GoabRadioItem value="5000" label="Mobile" />
      </GoabRadioGroup>

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
