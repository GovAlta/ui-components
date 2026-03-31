import { useState } from "react";
import { GoabDropdown, GoabDropdownItem, GoabFormItem } from "@abgov/react-components";
import { GoabDropdownOnChangeDetail } from "@abgov/ui-components-common";

export function DynamicallyChangeItemsInADropdownList() {
  const [children, setChildren] = useState<string[]>([]);
  const parents = ["All", "Big", "Small"];
  const childrenAll = ["Bus", "Elephant", "Key", "Pen", "Watch", "Truck"];
  const childrenBig = ["Elephant", "Truck", "Bus"];
  const childrenSmall = ["Key", "Pen", "Watch"];

  const loadItems = (value: string) => {
    if (value === "All") setChildren(childrenAll);
    else if (value === "Big") setChildren(childrenBig);
    else setChildren(childrenSmall);
  };

  const logSelection = () => {
    console.log("Item selected");
  };

  return (
    <>
      <GoabFormItem
          label="Size"
          requirement="optional"
          helpText="Choose the size to change the list below">
          <GoabDropdown
            name="parent"
            placeholder="Select a value"
            onChange={(event: GoabDropdownOnChangeDetail) =>
              loadItems(event.value as string)
            }>
            {parents.map(parent => (
              <GoabDropdownItem key={parent} value={parent} label={parent} />
            ))}
          </GoabDropdown>
        </GoabFormItem>

        <GoabFormItem label="Items" requirement="optional" mt="xl">
          <GoabDropdown name="children" placeholder="Select a value" onChange={logSelection}>
            {children.map((child) => (
              <GoabDropdownItem
                key={child}
                value={child}
                label={child}
                mountType="reset"
              />
            ))}
          </GoabDropdown>
      </GoabFormItem>
    </>
  );
}
