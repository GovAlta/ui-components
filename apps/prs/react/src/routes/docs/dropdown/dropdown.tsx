import { useState } from "react";
import {
  GoabButton,
  GoabButtonGroup,
  GoabDivider,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
} from "@abgov/react-components";
import type {
  GoabDropdownItemMountType,
  GoabDropdownOnChangeDetail,
  GoabInputOnChangeDetail,
  GoabRadioGroupOnChangeDetail,
} from "@abgov/ui-components-common";

type Task = {
  value: string;
  label: string;
  mount: GoabDropdownItemMountType;
};

export function DocsDropdownRoute() {
  const [province, setProvince] = useState<string | undefined>();
  const [contactMethod, setContactMethod] = useState<string | undefined>();
  const [city, setCity] = useState<string | undefined>();
  const [custom, setCustom] = useState<string | undefined>();
  const [native, setNative] = useState<string | undefined>();
  const [sizeDefault, setSizeDefault] = useState<string | undefined>();
  const [sizeCompact, setSizeCompact] = useState<string | undefined>();
  const [errorValue, setErrorValue] = useState<string | undefined>();

  // Examples
  const DEFAULT_TASKS: Task[] = [
    { label: "Finish Report", value: "finish-report", mount: "append" },
    { label: "Attend Meeting", value: "attend-meeting", mount: "append" },
    { label: "Reply Emails", value: "reply-emails", mount: "append" },
  ];
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [newTask, setNewTask] = useState<string>("");
  const [mountType, setMountType] = useState<string>("append");
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [taskError, setTaskError] = useState<boolean>(false);
  const [isReset, setIsReset] = useState<boolean>(false);

  function addTask() {
    if (newTask === "") {
      setTaskError(true);
      return;
    }
    setTaskError(false);
    setTasks([
      ...tasks,
      {
        label: newTask,
        value: newTask.toLowerCase().replace(" ", "-"),
        mount: mountType as GoabDropdownItemMountType,
      },
    ]);
    setNewTask("");
    setIsReset(false);
  }

  function reset() {
    setTasks(DEFAULT_TASKS);
    setMountType("append");
    setNewTask("");
    setSelectedTask("");
    setTaskError(false);
    setIsReset(true);
  }

  // Dynamically change items
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

  return (
    <div>
      <h2>Dropdown</h2>

      <h3>Basic example</h3>
      <GoabFormItem label="Province or territory" mb="l">
        <GoabDropdown
          name="province"
          value={province}
          onChange={(detail) => setProvince(detail.value)}
        >
          <GoabDropdownItem value="Alberta" />
          <GoabDropdownItem value="British Columbia" />
          <GoabDropdownItem value="Manitoba" />
          <GoabDropdownItem value="Ontario" />
          <GoabDropdownItem value="Quebec" />
        </GoabDropdown>
      </GoabFormItem>

      <h3>With custom placeholder</h3>
      <GoabFormItem label="How would you like to be contacted?" mb="l">
        <GoabDropdown
          name="contactMethod"
          placeholder="—Select contact method—"
          value={contactMethod}
          onChange={(detail) => setContactMethod(detail.value)}
        >
          <GoabDropdownItem value="Email" />
          <GoabDropdownItem value="Phone" />
          <GoabDropdownItem value="Mail" />
        </GoabDropdown>
      </GoabFormItem>

      <h3>Filterable</h3>
      <GoabFormItem label="What city do you live in?" mb="l">
        <GoabDropdown
          name="city"
          filterable
          leadingIcon="search"
          maxHeight="400px"
          value={city}
          onChange={(detail) => setCity(detail.value)}
        >
          <GoabDropdownItem value="Calgary" />
          <GoabDropdownItem value="Edmonton" />
          <GoabDropdownItem value="Red Deer" />
          <GoabDropdownItem value="Lethbridge" />
        </GoabDropdown>
      </GoabFormItem>

      <h3>Native</h3>
      <GoabFormItem label="Custom dropdown" mb="l">
        <GoabDropdown
          name="custom"
          value={custom}
          onChange={(detail) => setCustom(detail.value)}
        >
          <GoabDropdownItem value="opt1" label="Option 1" />
          <GoabDropdownItem value="opt2" label="Option 2" />
          <GoabDropdownItem value="opt3" label="Option 3" />
        </GoabDropdown>
      </GoabFormItem>
      <GoabFormItem label="Native dropdown" mb="l">
        <GoabDropdown
          name="native"
          native
          value={native}
          onChange={(detail) => setNative(detail.value)}
        >
          <GoabDropdownItem value="opt1" label="Option 1" />
          <GoabDropdownItem value="opt2" label="Option 2" />
          <GoabDropdownItem value="opt3" label="Option 3" />
        </GoabDropdown>
      </GoabFormItem>

      <h3>Sizes</h3>
      <GoabFormItem label="Default size" mb="l">
        <GoabDropdown
          name="sizeDefault"
          value={sizeDefault}
          onChange={(detail) => setSizeDefault(detail.value)}
        >
          <GoabDropdownItem value="Draft" />
          <GoabDropdownItem value="In review" />
          <GoabDropdownItem value="Approved" />
        </GoabDropdown>
      </GoabFormItem>
      <GoabFormItem label="Compact size" mb="l">
        <GoabDropdown
          name="sizeCompact"
          size="compact"
          value={sizeCompact}
          onChange={(detail) => setSizeCompact(detail.value)}
        >
          <GoabDropdownItem value="Draft" />
          <GoabDropdownItem value="In review" />
          <GoabDropdownItem value="Approved" />
        </GoabDropdown>
      </GoabFormItem>

      <h3>States</h3>
      <GoabFormItem label="Disabled dropdown" mb="l">
        <GoabDropdown name="disabled" disabled value="AB">
          <GoabDropdownItem value="AB" label="Alberta" />
          <GoabDropdownItem value="BC" label="British Columbia" />
        </GoabDropdown>
      </GoabFormItem>
      <GoabFormItem label="Dropdown with error" error="Please select an option" mb="l">
        <GoabDropdown
          name="error"
          error
          placeholder="Select an option"
          value={errorValue}
          onChange={(detail) => setErrorValue(detail.value)}
        >
          <GoabDropdownItem value="opt1" label="Option 1" />
          <GoabDropdownItem value="opt2" label="Option 2" />
        </GoabDropdown>
      </GoabFormItem>

      <h2>Examples</h2>

      <h3>Dynamically add an item to a dropdown list</h3>
      <GoabFormItem
        requirement="required"
        label="Name of item"
        error={taskError ? "Please enter item name" : undefined}
        helpText="Add an item to the dropdown list below"
      >
        <GoabInput
          onChange={(event: GoabInputOnChangeDetail) => setNewTask(event.value)}
          name="item"
          value={newTask}
        />
      </GoabFormItem>
      <GoabFormItem mt="l" label="Add to">
        <GoabRadioGroup
          name="mountType"
          onChange={(event: GoabRadioGroupOnChangeDetail) => setMountType(event.value as string)}
          value={mountType}
          orientation="horizontal"
        >
          <GoabRadioItem value="prepend" label="Start" />
          <GoabRadioItem value="append" label="End" />
        </GoabRadioGroup>
      </GoabFormItem>
      <GoabButtonGroup alignment="start" gap="relaxed" mt="l">
        <GoabButton type="primary" onClick={addTask}>Add new item</GoabButton>
        <GoabButton type="tertiary" onClick={reset}>Reset list</GoabButton>
      </GoabButtonGroup>
      <GoabDivider mt="l" />
      <GoabFormItem mt="l" label="All items">
        <div style={{ width: isReset ? "320px" : "auto" }}>
          <GoabDropdown
            key={tasks.length}
            onChange={(event: GoabDropdownOnChangeDetail) => setSelectedTask(event.value as string)}
            value={selectedTask}
            name="selectedTask"
          >
            {tasks.map((task) => (
              <GoabDropdownItem
                key={task.value}
                value={task.value}
                mountType={task.mount}
                label={task.label}
              />
            ))}
          </GoabDropdown>
        </div>
      </GoabFormItem>

      <h3>Dynamically change items in a dropdown list</h3>
      <GoabFormItem label="Size" requirement="optional" helpText="Choose the size to change the list below">
        <GoabDropdown
          name="parent"
          placeholder="Select a value"
          onChange={(event: GoabDropdownOnChangeDetail) => loadItems(event.value as string)}
        >
          {parents.map((parent) => (
            <GoabDropdownItem key={parent} value={parent} label={parent} />
          ))}
        </GoabDropdown>
      </GoabFormItem>
      <GoabFormItem label="Items" requirement="optional" mt="xl">
        <GoabDropdown name="children" placeholder="Select a value" onChange={() => console.log("selected")}>
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
    </div>
  );
}
