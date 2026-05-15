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
          onChange={(event: GoabRadioGroupOnChangeDetail) =>
            onMountTypeChange(event.value)
          }
          value={mountType}
          orientation="horizontal"
        >
          <GoabRadioItem value="prepend" label="Start" />
          <GoabRadioItem value="append" label="End" />
        </GoabRadioGroup>
      </GoabFormItem>

      <GoabButtonGroup alignment="start" gap="relaxed" mt="l">
        <GoabButton type="primary" onClick={addTask}>
          Add new item
        </GoabButton>
        <GoabButton type="tertiary" onClick={reset}>
          Reset list
        </GoabButton>
      </GoabButtonGroup>

      <GoabDivider mt="l" />

      <GoabFormItem mt="l" label="All items">
        <div style={{ width: isReset ? "320px" : "auto" }}>
          <GoabDropdown
            key={tasks.length}
            onChange={(event: GoabDropdownOnChangeDetail) =>
              setSelectedTask(event.value as string)
            }
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
    </>
  );
}
