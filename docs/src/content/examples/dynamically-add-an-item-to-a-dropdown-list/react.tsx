import { useState } from "react";
import {
  GoabxButton,
  GoabxDropdown,
  GoabxDropdownItem,
  GoabxFormItem,
  GoabxInput,
  GoabxRadioGroup,
  GoabxRadioItem,
} from "@abgov/react-components/experimental";
import { GoabButtonGroup, GoabDivider } from "@abgov/react-components";
import {
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

export function DynamicallyAddAnItemToADropdownList() {
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

  function onMountTypeChange(value: string | undefined) {
    setMountType(value as string);
  }

  function addTask() {
    if (newTask === "") {
      setTaskError(true);
      return;
    }
    setTaskError(false);

    const task: Task = {
      label: newTask,
      value: newTask.toLowerCase().replace(" ", "-"),
      mount: mountType as GoabDropdownItemMountType,
    };
    setTasks([...tasks, task]);
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

  return (
    <>
      <GoabxFormItem
          requirement="required"
          label="Name of item"
          error={taskError ? "Please enter item name" : undefined}
          helpText="Add an item to the dropdown list below">
          <GoabxInput
            onChange={(event: GoabInputOnChangeDetail) => setNewTask(event.value)}
            name="item"
            value={newTask}
          />
        </GoabxFormItem>

        <GoabxFormItem mt="l" label="Add to">
          <GoabxRadioGroup
            name="mountType"
            onChange={(event: GoabRadioGroupOnChangeDetail) => onMountTypeChange(event.value)}
            value={mountType}
            orientation="horizontal">
            <GoabxRadioItem value="prepend" label="Start" />
            <GoabxRadioItem value="append" label="End" />
          </GoabxRadioGroup>
        </GoabxFormItem>

        <GoabButtonGroup alignment="start" gap="relaxed" mt="l">
          <GoabxButton type="primary" onClick={addTask}>
            Add new item
          </GoabxButton>
          <GoabxButton type="tertiary" onClick={reset}>
            Reset list
          </GoabxButton>
        </GoabButtonGroup>

        <GoabDivider mt="l" />

        <GoabxFormItem mt="l" label="All items">
          <div style={{ width: isReset ? "320px" : "auto" }}>
            <GoabxDropdown
              key={tasks.length}
              onChange={(event: GoabDropdownOnChangeDetail) =>
                setSelectedTask(event.value as string)
              }
              value={selectedTask}
              name="selectedTask">
              {tasks.map(task => (
                <GoabxDropdownItem
                  key={task.value}
                  value={task.value}
                  mountType={task.mount}
                  label={task.label}
                />
              ))}
            </GoabxDropdown>
          </div>
      </GoabxFormItem>
    </>
  );
}
