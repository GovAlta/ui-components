import React, { useState } from "react";
import {
  GoabButton,
  GoabModal,
  GoabDatePicker,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
} from "@abgov/react-components";

export function Bug2655Route() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSmallModal = () => {
    setIsSmallModalOpen(true);
  };

  const closeSmallModal = () => {
    setIsSmallModalOpen(false);
  };

  const onDate1Change = (event: any) => {
    console.log("Date 1 changed:", event);
  };

  const onDate2Change = (event: any) => {
    console.log("Date 2 changed:", event);
  };

  const onDate3Change = (event: any) => {
    console.log("Date 3 changed:", event);
  };

  const onDropdown1Change = (event: any) => {
    console.log("Dropdown 1 changed:", event);
  };

  const onDropdown2Change = (event: any) => {
    console.log("Dropdown 2 changed:", event);
  };

  const onDropdown3Change = (event: any) => {
    console.log("Dropdown 3 changed:", event);
  };

  return (
    <div>
      <h1>Bug 2655 - Modal with Date Pickers and Dropdowns</h1>
      <p>This page tests the integration of modals with form components.</p>

      <GoabButton onClick={openModal}>Open Modal</GoabButton>

      <GoabModal open={isModalOpen} heading="Test Modal" onClose={closeModal}>
        <div style={{ marginBottom: "2em" }}>
          <h4>At the top these open downwards</h4>
          <div style={{ marginBottom: "20px" }}>
            <GoabFormItem>
              <GoabDatePicker name="date1" onChange={onDate1Change} />
            </GoabFormItem>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <GoabFormItem>
              <GoabDropdown name="dropdown1" onChange={onDropdown1Change}>
                <GoabDropdownItem value="red" label="Red" />
                <GoabDropdownItem value="green" label="Green" />
                <GoabDropdownItem value="blue" label="Blue" />
              </GoabDropdown>
            </GoabFormItem>
          </div>

          <div style={{ marginBottom: "20px", marginTop: "200px", position: "relative" }}>
            <h4>At the bottom these open upwards</h4>
            <GoabFormItem>
              <GoabDatePicker name="date2" onChange={onDate2Change} />
            </GoabFormItem>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <GoabFormItem>
              <GoabDropdown name="dropdown2" onChange={onDropdown2Change}>
                <GoabDropdownItem value="red" label="Red" />
                <GoabDropdownItem value="green" label="Green" />
                <GoabDropdownItem value="blue" label="Blue" />
              </GoabDropdown>
            </GoabFormItem>
          </div>
        </div>
      </GoabModal>

      <GoabButton onClick={openSmallModal} ml="4">
        Open Small Modal
      </GoabButton>

      <GoabModal
        open={isSmallModalOpen}
        heading="Small Height Test Modal"
        onClose={closeSmallModal}
      >
        <div style={{ marginBottom: "2em", height: "200px" }}>
          <h4>
            It should expand downwards within a space too small for the popover content
          </h4>
          <div style={{ marginBottom: "20px" }}>
            <GoabFormItem>
              <GoabDatePicker name="date3" onChange={onDate3Change} />
            </GoabFormItem>
          </div>
        </div>
      </GoabModal>
      <div style={{ marginTop: "20px", position: "relative" }}>
        <p>
          A good testing cheat to test if the dropdown opens above or below the target is
          to anchor the developer tools window to the bottom and slide it up and down to
          reduce window size.
        </p>
        <GoabFormItem>
          <GoabDropdown name="dropdown3" onChange={onDropdown3Change}>
            <GoabDropdownItem value="red" label="Red" />
            <GoabDropdownItem value="green" label="Green" />
            <GoabDropdownItem value="blue" label="Blue" />
          </GoabDropdown>
        </GoabFormItem>
      </div>
    </div>
  );
}
