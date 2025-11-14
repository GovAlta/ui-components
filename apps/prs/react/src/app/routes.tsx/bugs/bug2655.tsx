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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onDate1Change = (event: any) => {
    console.log("Date 1 changed:", event);
  };

  const onDate2Change = (event: any) => {
    console.log("Date 2 changed:", event);
  };

  const onDropdown1Change = (event: any) => {
    console.log("Dropdown 1 changed:", event);
  };

  const onDropdown2Change = (event: any) => {
    console.log("Dropdown 2 changed:", event);
  };

  return (
    <div>
      <h1>Bug 2655 - Modal with Date Pickers and Dropdowns</h1>
      <p>This page tests the integration of modals with form components.</p>

      <GoabButton onClick={openModal}>Open Modal</GoabButton>

      <GoabModal open={isModalOpen} heading="Test Modal" onClose={closeModal}>
        <div>
          <div style={{ marginBottom: "20px" }}>
            <GoabFormItem>
              <GoabDatePicker name="date1" onChange={onDate1Change} />
            </GoabFormItem>
          </div>

          <div style={{ marginBottom: "20px", position: "relative" }}>
            <GoabFormItem>
              <GoabDatePicker name="date2" onChange={onDate2Change} />
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

          <div style={{ marginBottom: "20px", position: "relative" }}>
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
    </div>
  );
}
