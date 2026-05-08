import { useState } from "react";
import {
  GoabButton,
  GoabDatePicker,
  GoabDrawer,
  GoabDropdown,
  GoabDropdownItem,
  GoabMenuAction,
  GoabMenuButton,
  GoabModal,
  GoabPopover,
  GoabPushDrawer,
  GoabText,
  GoabContainer,
} from "@abgov/react-components";
import type {
  GoabDatePickerOnChangeDetail,
  GoabDropdownOnChangeDetail,
} from "@abgov/ui-components-common";

const stackStyle = {
  display: "grid",
  gap: "1.5rem",
};

export function Bug3892Route() {
  const [popoverDate, setPopoverDate] = useState("");
  const [popoverProvince, setPopoverProvince] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerDate, setDrawerDate] = useState("");
  const [drawerProvince, setDrawerProvince] = useState("");

  const [pushDrawerOpen, setPushDrawerOpen] = useState(false);
  const [pushDrawerDate, setPushDrawerDate] = useState("");
  const [pushDrawerProvince, setPushDrawerProvince] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState("");
  const [modalProvince, setModalProvince] = useState("");

  const handlePopoverDateChange = (detail: GoabDatePickerOnChangeDetail) => {
    setPopoverDate(detail.valueStr || "");
  };

  const handlePopoverProvinceChange = (detail: GoabDropdownOnChangeDetail) => {
    setPopoverProvince(detail.value || "");
  };

  const handleDrawerDateChange = (detail: GoabDatePickerOnChangeDetail) => {
    setDrawerDate(detail.valueStr || "");
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawerProvinceChange = (detail: GoabDropdownOnChangeDetail) => {
    setDrawerProvince(detail.value || "");
  };

  const handlePushDrawerDateChange = (detail: GoabDatePickerOnChangeDetail) => {
    setPushDrawerDate(detail.valueStr || "");
  };

  const handlePushDrawerProvinceChange = (detail: GoabDropdownOnChangeDetail) => {
    setPushDrawerProvince(detail.value || "");
  };

  const handlePushDrawerClose = () => {
    setPushDrawerOpen(false);
  };

  const handleModalDateChange = (detail: GoabDatePickerOnChangeDetail) => {
    setModalDate(detail.valueStr || "");
  };

  const handleModalProvinceChange = (detail: GoabDropdownOnChangeDetail) => {
    setModalProvince(detail.value || "");
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div style={stackStyle}>
      <div style={stackStyle}>
        <GoabText tag="h1">3892 - Nested close propagation</GoabText>
        <GoabText>
          This page tests the issue where popover close events are propegating to parent
          drawers and modals.
        </GoabText>
      </div>

      <GoabContainer>
        <div style={stackStyle}>
          <GoabText tag="h2" mt="none">
            Popover
          </GoabText>
          <GoabText>Open the popover and interact with all controls.</GoabText>
        </div>

        <GoabPopover target={<GoabButton type="primary">Open popover</GoabButton>}>
          <div style={{ display: "grid", gap: "1rem", minWidth: "20rem" }}>
            <GoabText>
              Expected: using the date picker, dropdown, and menu button updates values
              and leaves the popover open.
            </GoabText>
            <GoabDatePicker
              name="bug3892-popover-date"
              onChange={handlePopoverDateChange}
              value={popoverDate}
            />
            <GoabDropdown
              name="bug3892-popover-province"
              onChange={handlePopoverProvinceChange}
              placeholder="Select a province"
              value={popoverProvince}
            >
              <GoabDropdownItem value="alberta" label="Alberta" />
              <GoabDropdownItem value="british-columbia" label="British Columbia" />
              <GoabDropdownItem value="manitoba" label="Manitoba" />
              <GoabDropdownItem value="ontario" label="Ontario" />
              <GoabDropdownItem value="quebec" label="Quebec" />
            </GoabDropdown>
            <GoabMenuButton text="Popover actions">
              <GoabMenuAction action="edit" text="Edit" />
              <GoabMenuAction action="archive" text="Archive" />
              <GoabMenuAction action="delete" text="Delete" />
            </GoabMenuButton>
          </div>
        </GoabPopover>
      </GoabContainer>

      <GoabContainer>
        <div style={stackStyle}>
          <GoabText tag="h2" mt="none">
            Drawer
          </GoabText>
          <GoabText>Open the drawer and interact with all controls.</GoabText>
        </div>

        <GoabButton onClick={() => setDrawerOpen(true)}>Open drawer</GoabButton>

        <GoabDrawer
          heading="Test drawer"
          maxSize="36rem"
          onClose={handleDrawerClose}
          open={drawerOpen}
          position="right"
        >
          <div style={{ display: "grid", gap: "1rem" }}>
            <GoabText>
              Expected: using the date picker, dropdown, and menu button updates values
              and leaves the drawer open.
            </GoabText>
            <GoabDatePicker
              name="bug3892-drawer-date"
              onChange={handleDrawerDateChange}
              value={drawerDate}
            />
            <GoabDropdown
              name="bug3892-drawer-province"
              onChange={handleDrawerProvinceChange}
              placeholder="Select a province"
              value={drawerProvince}
            >
              <GoabDropdownItem value="alberta" label="Alberta" />
              <GoabDropdownItem value="british-columbia" label="British Columbia" />
              <GoabDropdownItem value="manitoba" label="Manitoba" />
              <GoabDropdownItem value="ontario" label="Ontario" />
              <GoabDropdownItem value="quebec" label="Quebec" />
            </GoabDropdown>
            <GoabMenuButton text="Drawer actions">
              <GoabMenuAction action="edit" text="Edit" />
              <GoabMenuAction action="archive" text="Archive" />
              <GoabMenuAction action="delete" text="Delete" />
            </GoabMenuButton>
          </div>
        </GoabDrawer>
      </GoabContainer>

      <GoabContainer>
        <GoabText tag="h2" mt="none">
          Push drawer
        </GoabText>
        <GoabText>Open the push drawer and interact with all controls.</GoabText>

        <div style={{ display: "flex", minHeight: "440px" }}>
          <GoabButton onClick={() => setPushDrawerOpen(true)}>
            Open push drawer
          </GoabButton>

          <GoabPushDrawer
            heading="Controls inside push drawer"
            onClose={handlePushDrawerClose}
            open={pushDrawerOpen}
            width="36rem"
          >
            <div style={stackStyle}>
              <GoabText>
                Expected: using the date picker, dropdown, and menu button updates values
                and leaves the push drawer open.
              </GoabText>
              <GoabDatePicker
                name="bug3892-push-drawer-date"
                onChange={handlePushDrawerDateChange}
                value={pushDrawerDate}
              />
              <GoabDropdown
                name="bug3892-push-drawer-province"
                onChange={handlePushDrawerProvinceChange}
                placeholder="Select a province"
                value={pushDrawerProvince}
              >
                <GoabDropdownItem value="alberta" label="Alberta" />
                <GoabDropdownItem value="british-columbia" label="British Columbia" />
                <GoabDropdownItem value="manitoba" label="Manitoba" />
                <GoabDropdownItem value="ontario" label="Ontario" />
                <GoabDropdownItem value="quebec" label="Quebec" />
              </GoabDropdown>
              <GoabMenuButton text="Push drawer actions">
                <GoabMenuAction action="edit" text="Edit" />
                <GoabMenuAction action="archive" text="Archive" />
                <GoabMenuAction action="delete" text="Delete" />
              </GoabMenuButton>
            </div>
          </GoabPushDrawer>
        </div>
      </GoabContainer>

      <GoabContainer>
        <div style={stackStyle}>
          <GoabText tag="h2" mt="none">
            Modal
          </GoabText>
          <GoabText>Open the modal and interact with all controls.</GoabText>
        </div>

        <GoabButton onClick={() => setModalOpen(true)}>Open modal</GoabButton>

        <GoabModal
          heading="Controls inside modal"
          onClose={handleModalClose}
          open={modalOpen}
        >
          <div style={{ display: "grid", gap: "1rem" }}>
            <GoabText>
              Expected: using the date picker, dropdown, and menu button updates values
              and leaves the modal open.
            </GoabText>
            <GoabDatePicker
              name="bug3892-modal-date"
              onChange={handleModalDateChange}
              value={modalDate}
            />
            <GoabDropdown
              name="bug3892-modal-province"
              onChange={handleModalProvinceChange}
              placeholder="Select a province"
              value={modalProvince}
            >
              <GoabDropdownItem value="alberta" label="Alberta" />
              <GoabDropdownItem value="british-columbia" label="British Columbia" />
              <GoabDropdownItem value="manitoba" label="Manitoba" />
              <GoabDropdownItem value="ontario" label="Ontario" />
              <GoabDropdownItem value="quebec" label="Quebec" />
            </GoabDropdown>
            <GoabMenuButton text="Modal actions">
              <GoabMenuAction action="edit" text="Edit" />
              <GoabMenuAction action="archive" text="Archive" />
              <GoabMenuAction action="delete" text="Delete" />
            </GoabMenuButton>
          </div>
        </GoabModal>
      </GoabContainer>
    </div>
  );
}