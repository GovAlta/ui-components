import { useState } from "react";
import {
  GoabxButton,
  GoabxDatePicker,
  GoabxFormItem,
  GoabxModal,
} from "@abgov/react-components/experimental";
import { GoabButtonGroup, GoabContainer, GoabText } from "@abgov/react-components";
import { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";

export function ConfirmAChange() {
  const [open, setOpen] = useState(false);
  const [effectiveDate, setEffectiveDate] = useState<Date | undefined>(new Date());

  const onChangeEffectiveDate = (detail: GoabDatePickerOnChangeDetail) => {
    setEffectiveDate(detail.value as Date);
  };

  return (
    <>
      <GoabxButton onClick={() => setOpen(true)}>Save and continue</GoabxButton>

      <GoabxModal
        heading="Address has changed"
        open={open}
        onClose={() => setOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabxButton type="secondary" size="compact" onClick={() => setOpen(false)}>
              Undo address change
            </GoabxButton>
            <GoabxButton type="primary" size="compact" onClick={() => setOpen(false)}>
              Confirm
            </GoabxButton>
          </GoabButtonGroup>
        }>
        <GoabContainer type="non-interactive" accent="filled" padding="compact" width="full">
          <GoabText as="h4" mt="none" mb="s">Before</GoabText>
          <GoabText mt="none">123456 78 Ave NW, Edmonton, Alberta</GoabText>
          <GoabText as="h4" mt="none" mb="s">After</GoabText>
          <GoabText mt="none" mb="none">881 12 Ave NW, Edmonton, Alberta</GoabText>
        </GoabContainer>
        <GoabxFormItem label="Effective date" mt="l">
          <GoabxDatePicker
            onChange={onChangeEffectiveDate}
            name="effectiveDate"
            value={effectiveDate}
          />
        </GoabxFormItem>
      </GoabxModal>
    </>
  );
}
