import { useState } from "react";
import {
  GoabxFormItem,
  GoabxRadioGroup,
  GoabxRadioItem,
} from "@abgov/react-components/experimental";
import { GoabRadioGroupOnChangeDetail } from "@abgov/ui-components-common";

export function SetAMaxWidthOnALongRadioItem() {
  const [selectOne, setSelectOne] = useState<string>("1");

  return (
    <form>
      <GoabxFormItem label="Select one option">
        <GoabxRadioGroup
          name="selectOne"
          value={selectOne}
          onChange={(e: GoabRadioGroupOnChangeDetail) => setSelectOne(e.value)}
        >
          <GoabxRadioItem
            value="1"
            label="Option one which has a very long label with lots of text"
            maxWidth="300px"
          />
          <GoabxRadioItem value="2" label="Option two" />
          <GoabxRadioItem value="3" label="Option three" />
        </GoabxRadioGroup>
      </GoabxFormItem>
    </form>
  );
}
