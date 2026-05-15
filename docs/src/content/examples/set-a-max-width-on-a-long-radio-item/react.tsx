import { useState } from "react";
import { GoabFormItem, GoabRadioGroup, GoabRadioItem } from "@abgov/react-components";
import { GoabRadioGroupOnChangeDetail } from "@abgov/ui-components-common";

export function SetAMaxWidthOnALongRadioItem() {
  const [selectOne, setSelectOne] = useState<string>("1");

  return (
    <form>
      <GoabFormItem label="Select one option">
        <GoabRadioGroup
          name="selectOne"
          value={selectOne}
          onChange={(e: GoabRadioGroupOnChangeDetail) => setSelectOne(e.value)}
        >
          <GoabRadioItem
            value="1"
            label="Option one which has a very long label with lots of text"
            maxWidth="300px"
          />
          <GoabRadioItem value="2" label="Option two" />
          <GoabRadioItem value="3" label="Option three" />
        </GoabRadioGroup>
      </GoabFormItem>
    </form>
  );
}
