import { useState } from "react";
import {
  GoabxDropdown,
  GoabxDropdownItem,
  GoabxFormItem,
} from "@abgov/react-components/experimental";
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
      <GoabxFormItem
        label="Size"
        requirement="optional"
        helpText="Choose the size to change the list below"
      >
        <GoabxDropdown
          name="parent"
          placeholder="Select a value"
          onChange={(event: GoabDropdownOnChangeDetail) =>
            loadItems(event.value as string)
          }
        >
          {parents.map((parent) => (
            <GoabxDropdownItem key={parent} value={parent} label={parent} />
          ))}
        </GoabxDropdown>
      </GoabxFormItem>

      <GoabxFormItem label="Items" requirement="optional" mt="xl">
        <GoabxDropdown
          name="children"
          placeholder="Select a value"
          onChange={logSelection}
        >
          {children.map((child) => (
            <GoabxDropdownItem
              key={crypto.randomUUID()}
              value={child}
              label={child}
              mountType="reset"
            />
          ))}
        </GoabxDropdown>
      </GoabxFormItem>
    </>
  );
}
