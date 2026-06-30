import {
  GoabDropdownItem,
  GoabDropdownMultiselect,
  GoabFormItem,
} from "@abgov/react-components";
import { useState } from "react";

export function DocsDropdownMultiselectRoute() {
  const [fruits, setFruits] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);

  return (
    <div>
      <h2>Dropdown</h2>

      <h3>Basic example</h3>

      <GoabFormItem label="Select fruits" mb="l">
        <GoabDropdownMultiselect
          name="fruits"
          width="320px"
          value={fruits}
          onChange={(detail) => setFruits(detail.value)}
        >
          <GoabDropdownItem value="apple" label="Apple" />
          <GoabDropdownItem value="banana" label="Banana" />
          <GoabDropdownItem value="orange" label="Orange" />
          <GoabDropdownItem value="pear" label="Pear" />
        </GoabDropdownMultiselect>
      </GoabFormItem>

      <h3>Dropdown multiselect with placeholder text when no selection</h3>

      <GoabFormItem label="Select services" mb="l">
        <GoabDropdownMultiselect
          name="services"
          width="320px"
          placeholder="Select one or more services"
          value={services}
          onChange={(detail) => setServices(detail.value)}
        >
          <GoabDropdownItem value="health" label="Health benefits" />
          <GoabDropdownItem value="income" label="Income support" />
          <GoabDropdownItem value="housing" label="Housing support" />
        </GoabDropdownMultiselect>
      </GoabFormItem>

      <h3>With count label</h3>

      <GoabFormItem label="Select fruits" mb="l">
        <GoabDropdownMultiselect name="fruits" width="320px" labelFormat="count">
          <GoabDropdownItem value="apple" label="Apple" />
          <GoabDropdownItem value="banana" label="Banana" />
          <GoabDropdownItem value="orange" label="Orange" />
          <GoabDropdownItem value="pear" label="Pear" />
        </GoabDropdownMultiselect>
      </GoabFormItem>

      <h3>With list label</h3>

      <GoabFormItem label="Select fruits" mb="l">
        <GoabDropdownMultiselect name="fruits" width="320px" labelFormat="list">
          <GoabDropdownItem value="apple" label="Apple" />
          <GoabDropdownItem value="banana" label="Banana" />
          <GoabDropdownItem value="orange" label="Orange" />
          <GoabDropdownItem value="pear" label="Pear" />
        </GoabDropdownMultiselect>
      </GoabFormItem>

      <h3>Dropdown multiselect with search/filter capability</h3>

      <GoabFormItem label="Which cities have you visited?" mb="l">
        <GoabDropdownMultiselect
          name="cities"
          filterable={true}
          maxHeight="400px"
          width="320px"
        >
          <GoabDropdownItem value="calgary" label="Calgary" />
          <GoabDropdownItem value="edmonton" label="Edmonton" />
          <GoabDropdownItem value="red-deer" label="Red Deer" />
          <GoabDropdownItem value="lethbridge" label="Lethbridge" />
          <GoabDropdownItem value="medicine-hat" label="Medicine Hat" />
          <GoabDropdownItem value="grande-prairie" label="Grande Prairie" />
        </GoabDropdownMultiselect>
      </GoabFormItem>

      <h3>With select all</h3>

      <GoabFormItem label="Select departments" mb="l">
        <GoabDropdownMultiselect name="departments" showSelectAll={true} width="320px">
          <GoabDropdownItem value="health" label="Health" />
          <GoabDropdownItem value="education" label="Education" />
          <GoabDropdownItem value="transportation" label="Transportation" />
          <GoabDropdownItem value="justice" label="Justice" />
        </GoabDropdownMultiselect>
      </GoabFormItem>

      <h3>Sizes and states</h3>

      <GoabFormItem label="Default size" mb="l">
        <GoabDropdownMultiselect name="sizeDefault" width="320px">
          <GoabDropdownItem value="draft" label="Draft" />
          <GoabDropdownItem value="review" label="In review" />
          <GoabDropdownItem value="approved" label="Approved" />
        </GoabDropdownMultiselect>
      </GoabFormItem>
      <GoabFormItem label="Compact size" mb="l">
        <GoabDropdownMultiselect name="sizeCompact" size="compact" width="320px">
          <GoabDropdownItem value="draft" label="Draft" />
          <GoabDropdownItem value="review" label="In review" />
          <GoabDropdownItem value="approved" label="Approved" />
        </GoabDropdownMultiselect>
      </GoabFormItem>
      <GoabFormItem label="Disabled" mb="l">
        <GoabDropdownMultiselect name="disabled" disabled width="320px">
          <GoabDropdownItem value="opt1" label="Option 1" />
          <GoabDropdownItem value="opt2" label="Option 2" />
        </GoabDropdownMultiselect>
      </GoabFormItem>
      <GoabFormItem label="With error" error="Please select at least one option" mb="l">
        <GoabDropdownMultiselect name="error" error width="320px">
          <GoabDropdownItem value="opt1" label="Option 1" />
          <GoabDropdownItem value="opt2" label="Option 2" />
        </GoabDropdownMultiselect>
      </GoabFormItem>
    </div>
  );
}
