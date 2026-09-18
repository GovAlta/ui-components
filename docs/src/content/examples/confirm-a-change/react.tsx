import { useState } from "react";
import {
  GoabButton,
  GoabButtonGroup,
  GoabContainer,
  GoabDatePicker,
  GoabFormItem,
  GoabModal,
  GoabText,
} from "@abgov/react-components";

import { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";

export function ConfirmAChange() {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const [effectiveDate, setEffectiveDate] = useState(`${year}-${month}-${day}`);

  const onChangeEffectiveDate = (detail: GoabDatePickerOnChangeDetail) => {
    setEffectiveDate(detail.valueStr);
  };

  return (
    <>
      <GoabButton onClick={() => setOpen(true)}>Save and continue</GoabButton>

      <GoabModal
        heading="Address has changed"
        open={open}
        onClose={() => setOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="secondary" size="compact" onClick={() => setOpen(false)}>
              Undo address change
            </GoabButton>
            <GoabButton type="primary" size="compact" onClick={() => setOpen(false)}>
              Confirm
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <GoabContainer
          type="non-interactive"
          accent="filled"
          padding="compact"
          width="full"
        >
          <GoabText tag="h4" mt="none" mb="s">
            Before
          </GoabText>
          <GoabText mt="none">123456 78 Ave NW, Edmonton, Alberta</GoabText>
          <GoabText tag="h4" mt="none" mb="s">
            After
          </GoabText>
          <GoabText mt="none" mb="none">
            881 12 Ave NW, Edmonton, Alberta
          </GoabText>
        </GoabContainer>
        <GoabFormItem label="Effective date" mt="l">
          <GoabDatePicker
            onChange={onChangeEffectiveDate}
            name="effectiveDate"
            value={effectiveDate}
          />
        </GoabFormItem>
      </GoabModal>
    </>
  );
}
