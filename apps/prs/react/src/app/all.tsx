import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import {
  GoabAppFooter,
  GoabMicrositeHeader,
  GoabOneColumnLayout,
  GoabSideMenu,
  GoabSideMenuGroup,
  GoabPageBlock,
  GoabFormItem,
  GoabRadioGroup,
  GoabRadioItem,
  GoabButton,
  GoabSpacer,
  GoabDropdown,
  GoabDropdownItem,
  GoabInput,
  GoabBlock,
  GoabDatePicker,
  GoabTooltip,
  GoabIcon,
  GoabBadge,
  GoabText,
  GoabModal,
  GoabButtonGroup,
  GoabTextarea,
  GoabTabs,
  GoabTab,
  GoabDivider,
  GoabIconButton,
  GoabCircularProgress,
  GoabLinearProgress,
  GoabContainer,
  GoabDetails,
  GoabHeroBanner,
  GoabHeroBannerActions,
  GoabNotification,
  GoabAppFooterMetaSection,
  GoabAppFooterNavSection,
  GoabFileUploadInput,
  GoabSideMenuHeading,
  GoabSkeleton,
  GoabCheckbox,
  GoabFormStep,
  GoabFormStepper,
  GoabPages,
  GoabPopover,
  GoabTable,
  GoabTableSortHeader,
  GoabGrid,
  GoabLink,
} from "@abgov/react-components";

import {
  GoabDropdownOnChangeDetail,
  GoabInputOnChangeDetail,
  GoabTextAreaOnChangeDetail,
} from "@abgov/ui-components-common";

function onChange(tabIndex: number): void {
  console.log("Tab changed to ", tabIndex);
}

export function AllComponents() {
  // hooks
  const [destructiveModalOpen, setDestructiveModalOpen] = useState<boolean>();
  const [basicModalOpen, setBasicModalOpen] = useState<boolean>();
  const [basicModal2Open, setBasicModal2Open] = useState<boolean>();
  const [basicModal3Open, setBasicModal3Open] = useState<boolean>();
  const [contentModalOpen, setContentModalOpen] = useState<boolean>();
  const [contentModalScrollOpen, setContentModalScrollOpen] = useState<boolean>();
  const [contentModal2Open, setContentModal2Open] = useState<boolean>();
  const [NoHeaderModalOpen, setNoHeaderModalOpen] = useState<boolean>();
  const [step, setStep] = useState<number>(-1);
  const [step2, setStep2] = useState<number>(-1);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};

  function radio1(name: string, value: string) {
    console.log("onChange", name, value);
  }

  function radio2(name: string, value: string) {
    console.log("onChange", name, value);
  }

  function radio3(name: string, value: string) {
    console.log("onChange", name, value);
  }

  const popovertarget = (
    <GoabButton type="secondary" size="compact">
      Click me
    </GoabButton>
  );
  const [value, setValue] = useState<string>("");

  function onChangeDropdown(detail: GoabDropdownOnChangeDetail) {
    setValue(detail.value as string);
  }

  function onChangeTextArea(detail: GoabTextAreaOnChangeDetail) {
    console.log(detail.value);
  }

  interface User {
    firstName: string;
    lastName: string;
    age: number;
  }

  const [users, setUsers] = useState<User[]>([]);

  const _users: User[] = [
    {
      firstName: "Christian",
      lastName: "Batz",
      age: 18,
    },
    {
      firstName: "Brain",
      lastName: "Wisozk",
      age: 19,
    },
    {
      firstName: "Neha",
      lastName: "Jones",
      age: 23,
    },
    {
      firstName: "Tristin",
      lastName: "Buckridge",
      age: 31,
    },
  ];

  React.useEffect(() => {
    setUsers(_users);
  }, []);

  function sortData(sortBy: string, sortDir: number) {
    const _users = [...users];
    _users.sort((a: any, b: any) => {
      return (a[sortBy] > b[sortBy] ? 1 : -1) * sortDir;
    });
    setUsers(_users);
  }

  const containeractions = (
    <GoabBlock alignment="center">
      <GoabBadge type="important" content="Badge text" icon={true}></GoabBadge>
      <GoabButton type="tertiary" size="compact" leadingIcon="pencil">
        Edit
      </GoabButton>
    </GoabBlock>
  );

  const containeractionsinverse = (
    <GoabBlock alignment="center">
      <GoabBadge type="important" content="Badge text" icon={true}></GoabBadge>
      <GoabButton type="tertiary" size="compact" leadingIcon="pencil" variant="inverse">
        Edit
      </GoabButton>
    </GoabBlock>
  );

  return (
    <GoabOneColumnLayout>
      {/* Main page content here */}
      <section>
        <Outlet />
        <GoabPageBlock width="full">
          <GoabSpacer vSpacing="2xl"></GoabSpacer>
          <GoabTabs onChange={(detail) => onChange(detail.tab)}>
            <GoabTab heading="scratchpad">
              <GoabBlock gap="2xl" direction="column" mt="3xl" mb="3xl">
                ---
              </GoabBlock>
            </GoabTab>
            {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

            <GoabTab
              heading={
                <>
                  Components<GoabBadge type="important" content="All"></GoabBadge>
                </>
              }
            >
              <GoabBlock gap="2xl" direction="column" mt="3xl">
                {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

                <GoabText size="heading-m" mt="none" mb="xl">
                  Badge
                </GoabText>

                <GoabBlock>
                  <GoabBadge
                    type="information"
                    content="Information"
                    icon={true}
                  ></GoabBadge>
                  <GoabBadge
                    type="information"
                    content="Information"
                    icon={false}
                  ></GoabBadge>
                  <GoabBadge type="important" content="Important" icon={true}></GoabBadge>
                  <GoabBadge
                    type="important"
                    content="Important"
                    icon={false}
                  ></GoabBadge>
                  <GoabBadge type="emergency" content="Emergency" icon={true}></GoabBadge>
                  <GoabBadge
                    type="emergency"
                    content="Emergency"
                    icon={false}
                  ></GoabBadge>
                  <GoabBadge type="success" content="Success" icon={true}></GoabBadge>
                  <GoabBadge type="success" content="" icon={true}></GoabBadge>

                  <GoabBadge type="success" content="Success" icon={false}></GoabBadge>
                </GoabBlock>

                <GoabBlock>
                  <GoabBadge type="information" content="" icon={true}></GoabBadge>
                  <GoabBadge type="important" content="" icon={true}></GoabBadge>
                  <GoabBadge type="emergency" content="" icon={true}></GoabBadge>
                  <GoabBadge type="success" content="" icon={true}></GoabBadge>
                </GoabBlock>

                <GoabBlock>
                  <GoabBadge type="information" icon={false}></GoabBadge>
                  <GoabBadge type="important" icon={false}></GoabBadge>
                  <GoabBadge type="emergency" icon={false}></GoabBadge>
                  <GoabBadge type="success" icon={false}></GoabBadge>
                </GoabBlock>

                <GoabBlock>
                  <GoabBadge type="dark" content="Dark" icon={true}></GoabBadge>
                  <GoabBadge type="midtone" content="Midtone" icon={true}></GoabBadge>
                  <GoabBadge type="light" content="Light" icon={true}></GoabBadge>
                </GoabBlock>

                {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

                <GoabText size="heading-m" mt="3xl" mb="xl">
                  Button
                </GoabText>

                <GoabButtonGroup alignment="start">
                  <GoabButton>Primary</GoabButton>
                  <GoabButton type="secondary">Secondary</GoabButton>
                  <GoabButton type="tertiary">Tertiary</GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start">
                  <GoabButton leadingIcon="add">Primary</GoabButton>
                  <GoabButton type="secondary" leadingIcon="add">
                    Secondary
                  </GoabButton>
                  <GoabButton type="tertiary" leadingIcon="add">
                    Tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start">
                  <GoabButton trailingIcon="add">Primary</GoabButton>
                  <GoabButton type="secondary" trailingIcon="add">
                    Secondary
                  </GoabButton>
                  <GoabButton type="tertiary" trailingIcon="add">
                    Tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start" gap="compact">
                  <GoabButton size="compact">Compact primary</GoabButton>
                  <GoabButton type="secondary" size="compact">
                    Compact secondary
                  </GoabButton>
                  <GoabButton type="tertiary" size="compact">
                    Compact tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start" gap="compact">
                  <GoabButton size="compact" leadingIcon="add">
                    Compact primary
                  </GoabButton>
                  <GoabButton type="secondary" size="compact" leadingIcon="add">
                    Compact secondary
                  </GoabButton>
                  <GoabButton type="tertiary" size="compact" leadingIcon="add">
                    Compact tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start" gap="compact">
                  <GoabButton size="compact" trailingIcon="add">
                    Compact primary
                  </GoabButton>
                  <GoabButton type="secondary" size="compact" trailingIcon="add">
                    Compact secondary
                  </GoabButton>
                  <GoabButton type="tertiary" size="compact" trailingIcon="add">
                    Compact tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start">
                  <GoabButton variant="destructive">Destructive primary</GoabButton>
                  <GoabButton type="secondary" variant="destructive">
                    Destructive secondary
                  </GoabButton>
                  <GoabButton type="tertiary" variant="destructive">
                    Destructive tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start">
                  <GoabButton variant="destructive" leadingIcon="add">
                    Destructive primary
                  </GoabButton>
                  <GoabButton type="secondary" variant="destructive" leadingIcon="add">
                    Destructive secondary
                  </GoabButton>
                  <GoabButton type="tertiary" variant="destructive" leadingIcon="add">
                    Destructive tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start">
                  <GoabButton variant="destructive" trailingIcon="add">
                    Destructive primary
                  </GoabButton>
                  <GoabButton type="secondary" variant="destructive" trailingIcon="add">
                    Destructive secondary
                  </GoabButton>
                  <GoabButton type="tertiary" variant="destructive" trailingIcon="add">
                    Destructive tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start" gap="compact">
                  <GoabButton size="compact" variant="destructive">
                    Compact destructive primary
                  </GoabButton>
                  <GoabButton type="secondary" size="compact" variant="destructive">
                    Compact destructive secondary
                  </GoabButton>
                  <GoabButton type="tertiary" size="compact" variant="destructive">
                    Compact destructive tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start" gap="compact">
                  <GoabButton size="compact" variant="destructive" leadingIcon="add">
                    Compact destructive primary
                  </GoabButton>
                  <GoabButton
                    type="secondary"
                    size="compact"
                    variant="destructive"
                    leadingIcon="add"
                  >
                    Compact destructive secondary
                  </GoabButton>
                  <GoabButton
                    type="tertiary"
                    size="compact"
                    variant="destructive"
                    leadingIcon="add"
                  >
                    Compact destructive tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start" gap="compact">
                  <GoabButton size="compact" variant="destructive" trailingIcon="add">
                    Compact destructive primary
                  </GoabButton>
                  <GoabButton
                    type="secondary"
                    size="compact"
                    variant="destructive"
                    trailingIcon="add"
                  >
                    Compact destructive secondary
                  </GoabButton>
                  <GoabButton
                    type="tertiary"
                    size="compact"
                    variant="destructive"
                    trailingIcon="add"
                  >
                    Compact destructive tertiary
                  </GoabButton>
                </GoabButtonGroup>
                <GoabButtonGroup alignment="start">
                  <GoabButton type="start">Start</GoabButton>
                </GoabButtonGroup>

                <GoabText size="heading-s" mt="l" mb="none">
                  Inverse (experimental)
                </GoabText>

                <GoabButtonGroup alignment="start">
                  <GoabButton>Regular primary</GoabButton>
                  <GoabButton type="secondary">Regular secondary</GoabButton>
                  <GoabButton type="tertiary">Regular tertiary</GoabButton>
                </GoabButtonGroup>

                <div style={{ backgroundColor: "grey", padding: "12px" }}>
                  <GoabButtonGroup alignment="start">
                    <GoabButton variant="inverse">Inverse primary</GoabButton>
                    <GoabButton type="secondary" variant="inverse">
                      Inverse secondary
                    </GoabButton>
                    <GoabButton type="tertiary" variant="inverse">
                      Inverse tertiary
                    </GoabButton>
                  </GoabButtonGroup>
                </div>

                <GoabText size="heading-s" mt="l" mb="none">
                  Disabled
                </GoabText>

                <GoabButtonGroup alignment="start">
                  <GoabButton disabled={true}>Primary</GoabButton>
                  <GoabButton type="secondary" disabled={true}>
                    Secondary
                  </GoabButton>
                  <GoabButton type="tertiary" disabled={true}>
                    Tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start">
                  <GoabButton leadingIcon="add" disabled={true}>
                    Primary
                  </GoabButton>
                  <GoabButton type="secondary" leadingIcon="add" disabled={true}>
                    Secondary
                  </GoabButton>
                  <GoabButton type="tertiary" leadingIcon="add" disabled={true}>
                    Tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start">
                  <GoabButton trailingIcon="add" disabled={true}>
                    Primary
                  </GoabButton>
                  <GoabButton type="secondary" trailingIcon="add" disabled={true}>
                    Secondary
                  </GoabButton>
                  <GoabButton type="tertiary" trailingIcon="add" disabled={true}>
                    Tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start" gap="compact">
                  <GoabButton size="compact" disabled={true}>
                    Cmpact primary
                  </GoabButton>
                  <GoabButton type="secondary" size="compact" disabled={true}>
                    Compact secondary
                  </GoabButton>
                  <GoabButton type="tertiary" size="compact" disabled={true}>
                    Compact tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start" gap="compact">
                  <GoabButton size="compact" leadingIcon="add" disabled={true}>
                    Compact primary
                  </GoabButton>
                  <GoabButton
                    type="secondary"
                    size="compact"
                    leadingIcon="add"
                    disabled={true}
                  >
                    Compact secondary
                  </GoabButton>
                  <GoabButton
                    type="tertiary"
                    size="compact"
                    leadingIcon="add"
                    disabled={true}
                  >
                    Compact tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start" gap="compact">
                  <GoabButton size="compact" trailingIcon="add" disabled={true}>
                    Compact primary
                  </GoabButton>
                  <GoabButton
                    type="secondary"
                    size="compact"
                    trailingIcon="add"
                    disabled={true}
                  >
                    Compact secondary
                  </GoabButton>
                  <GoabButton
                    type="tertiary"
                    size="compact"
                    trailingIcon="add"
                    disabled={true}
                  >
                    Compact tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start">
                  <GoabButton variant="destructive" disabled={true}>
                    Destructive primary
                  </GoabButton>
                  <GoabButton type="secondary" variant="destructive" disabled={true}>
                    Destructive secondary
                  </GoabButton>
                  <GoabButton type="tertiary" variant="destructive" disabled={true}>
                    Destructive tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start">
                  <GoabButton variant="destructive" leadingIcon="add" disabled={true}>
                    Destructive primary
                  </GoabButton>
                  <GoabButton
                    type="secondary"
                    variant="destructive"
                    leadingIcon="add"
                    disabled={true}
                  >
                    Destructive secondary
                  </GoabButton>
                  <GoabButton
                    type="tertiary"
                    variant="destructive"
                    leadingIcon="add"
                    disabled={true}
                  >
                    Destructive tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start">
                  <GoabButton variant="destructive" trailingIcon="add" disabled={true}>
                    Destructive primary
                  </GoabButton>
                  <GoabButton
                    type="secondary"
                    variant="destructive"
                    trailingIcon="add"
                    disabled={true}
                  >
                    Destructive secondary
                  </GoabButton>
                  <GoabButton
                    type="tertiary"
                    variant="destructive"
                    trailingIcon="add"
                    disabled={true}
                  >
                    Destructive tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start" gap="compact">
                  <GoabButton size="compact" variant="destructive" disabled={true}>
                    Compact destructive primary
                  </GoabButton>
                  <GoabButton
                    type="secondary"
                    size="compact"
                    variant="destructive"
                    disabled={true}
                  >
                    Compact destructive secondary
                  </GoabButton>
                  <GoabButton
                    type="tertiary"
                    size="compact"
                    variant="destructive"
                    disabled={true}
                  >
                    Compact destructive tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start" gap="compact">
                  <GoabButton
                    size="compact"
                    variant="destructive"
                    leadingIcon="add"
                    disabled={true}
                  >
                    Compact destructive primary
                  </GoabButton>
                  <GoabButton
                    type="secondary"
                    size="compact"
                    variant="destructive"
                    leadingIcon="add"
                    disabled={true}
                  >
                    Compact destructive secondary
                  </GoabButton>
                  <GoabButton
                    type="tertiary"
                    size="compact"
                    variant="destructive"
                    leadingIcon="add"
                    disabled={true}
                  >
                    Compact destructive tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start" gap="compact">
                  <GoabButton
                    size="compact"
                    variant="destructive"
                    trailingIcon="add"
                    disabled={true}
                  >
                    Compact destructive primary
                  </GoabButton>
                  <GoabButton
                    type="secondary"
                    size="compact"
                    variant="destructive"
                    trailingIcon="add"
                    disabled={true}
                  >
                    Compact destructive secondary
                  </GoabButton>
                  <GoabButton
                    type="tertiary"
                    size="compact"
                    variant="destructive"
                    trailingIcon="add"
                    disabled={true}
                  >
                    Compact destructive tertiary
                  </GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start">
                  <GoabButton type="start" disabled={true}>
                    Disabled start
                  </GoabButton>
                </GoabButtonGroup>

                {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

                <GoabText size="heading-m" mt="3xl" mb="xl">
                  Button group
                </GoabText>

                <GoabButtonGroup alignment="start">
                  <GoabButton>Default</GoabButton>
                  <GoabButton type="secondary">Button</GoabButton>
                  <GoabButton type="tertiary">Group</GoabButton>
                </GoabButtonGroup>

                <GoabButtonGroup alignment="start" gap="compact">
                  <GoabButton size="compact">Compact</GoabButton>
                  <GoabButton type="secondary" size="compact">
                    Button
                  </GoabButton>
                  <GoabButton type="tertiary" size="compact">
                    Group
                  </GoabButton>
                </GoabButtonGroup>

                {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

                <GoabText size="heading-m" mt="3xl" mb="s">
                  Checkbox
                </GoabText>

                <GoabBlock gap="xl" mb="none" direction="column">
                  <GoabCheckbox
                    name="item 1"
                    text="Single checkbox option - I consent to..."
                    value=""
                  ></GoabCheckbox>

                  <GoabFormItem label="Basic checkbox list">
                    <GoabCheckbox
                      name="item 1"
                      text="Option 1"
                      value=""
                      description={
                        <span>
                          Help text with a <a href="#">link</a>.
                        </span>
                      }
                    ></GoabCheckbox>
                    <GoabCheckbox name="item 2" text="Option 2" value=""></GoabCheckbox>
                    <GoabCheckbox
                      name="item 3"
                      text="Option 3"
                      value=""
                      description={
                        <span>
                          Help text with a <a href="#">link</a>.
                        </span>
                      }
                    ></GoabCheckbox>
                  </GoabFormItem>

                  <GoabFormItem
                    label="Basic checkbox list with helper text"
                    helpText="Helper text to help answer the question"
                  >
                    <GoabCheckbox name="item 1" text="Option 1" value=""></GoabCheckbox>
                    <GoabCheckbox name="item 2" text="Option 2" value=""></GoabCheckbox>
                    <GoabCheckbox name="item 3" text="Option 3" value=""></GoabCheckbox>
                  </GoabFormItem>

                  <GoabFormItem label="Checkbox list with descriptions">
                    <GoabCheckbox
                      name="item 1"
                      text="Option 1"
                      value=""
                      description="here is a description"
                    ></GoabCheckbox>
                    <GoabCheckbox
                      name="item 2"
                      text="Option 2"
                      value=""
                      description="here is a description"
                    ></GoabCheckbox>
                    <GoabCheckbox
                      name="item 3"
                      text="Option 3"
                      value=""
                      description="here is a description"
                      disabled={true}
                    ></GoabCheckbox>
                  </GoabFormItem>

                  <GoabFormItem label="Checkbox list with some disabled">
                    <GoabCheckbox name="item 1" text="Option 1" value=""></GoabCheckbox>
                    <GoabCheckbox name="item 2" text="Option 2" value=""></GoabCheckbox>
                    <GoabCheckbox
                      name="item 3"
                      text="Option 3"
                      value=""
                      disabled={true}
                    ></GoabCheckbox>
                    <GoabCheckbox
                      name="item 4"
                      text="Option 4"
                      value=""
                      disabled={true}
                      checked={true}
                    ></GoabCheckbox>
                  </GoabFormItem>

                  <GoabFormItem label="Basic">
                    <GoabCheckbox
                      name="Option 1"
                      text="An option that wraps a long time until it goes to the next line that wraps a long time until it goes to the next line"
                      value=""
                    ></GoabCheckbox>
                    <GoabCheckbox name="Option 2" text="Option 2" value=""></GoabCheckbox>
                  </GoabFormItem>

                  <GoabFormItem label="Checkbox list with error" error="Error message.">
                    <GoabCheckbox
                      name="item 1"
                      text="Option 1"
                      value=""
                      error={true}
                    ></GoabCheckbox>
                    <GoabCheckbox
                      name="item 2"
                      text="Option 2"
                      value=""
                      error={true}
                    ></GoabCheckbox>
                    <GoabCheckbox
                      name="item 3"
                      text="Option 3"
                      value=""
                      error={true}
                      disabled={true}
                    ></GoabCheckbox>
                    <GoabCheckbox
                      name="item 4"
                      text="Option 4"
                      value=""
                      error={true}
                      disabled={true}
                      checked={true}
                    ></GoabCheckbox>
                  </GoabFormItem>

                  <GoabFormItem
                    label="Checkbox list with error and helper text"
                    error="Error message."
                    helpText="Helper text"
                  >
                    <GoabCheckbox
                      name="item 1"
                      text="Option 1"
                      value=""
                      error={true}
                    ></GoabCheckbox>
                    <GoabCheckbox
                      name="item 2"
                      text="Option 2"
                      value=""
                      error={true}
                    ></GoabCheckbox>
                    <GoabCheckbox
                      name="item 3"
                      text="Option 3"
                      value=""
                      error={true}
                      mb="none"
                    ></GoabCheckbox>
                  </GoabFormItem>

                  <GoabFormItem
                    label="Checkbox list with helper text by default"
                    helpText="Helper text"
                  >
                    <GoabCheckbox name="item 1" text="Option 1" value=""></GoabCheckbox>
                    <GoabCheckbox name="item 2" text="Option 2" value=""></GoabCheckbox>
                    <GoabCheckbox name="item 3" text="Option 3" value=""></GoabCheckbox>
                  </GoabFormItem>

                  <GoabFormItem
                    label="Checkbox list with helper text and margin-bottom=none set on last checkbox item"
                    helpText="Helper text"
                  >
                    <GoabCheckbox name="item 1" text="Option 1" value=""></GoabCheckbox>
                    <GoabCheckbox name="item 2" text="Option 2" value=""></GoabCheckbox>
                    <GoabCheckbox
                      name="item 3"
                      text="Option 3"
                      value=""
                      mb="none"
                    ></GoabCheckbox>
                  </GoabFormItem>
                </GoabBlock>

                {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

                <GoabText size="heading-m" mt="3xl" mb="xl">
                  Container
                </GoabText>

                <GoabGrid gap="xl" minChildWidth="400px">
                  <GoabContainer
                    accent="thick"
                    heading="Non-interactive with text"
                    type="non-interactive"
                    actions={containeractions}
                  >
                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer accent="thick" type="non-interactive">
                    <GoabText size="heading-l" mb="l">
                      Non-interactive with accent
                    </GoabText>

                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer accent="thin" type="non-interactive">
                    <GoabText size="heading-l" mb="l">
                      Non-interactive with accent
                    </GoabText>

                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer type="non-interactive" accent="filled">
                    <GoabText size="heading-l" mb="l">
                      Non-interactive filled
                    </GoabText>
                    <GoabText size="body-m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>
                </GoabGrid>

                <GoabGrid gap="xl" minChildWidth="400px">
                  <GoabContainer
                    accent="thick"
                    heading="Interactive with text"
                    type="interactive"
                    actions={containeractionsinverse}
                  >
                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer accent="thick" type="interactive">
                    <GoabText size="heading-l" mb="l">
                      Interactive with accent
                    </GoabText>

                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer accent="thin" type="interactive">
                    <GoabText size="heading-l" mb="l">
                      Interactive with accent
                    </GoabText>

                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer type="interactive" accent="filled">
                    <GoabText size="heading-l" mb="l">
                      Interactive filled
                    </GoabText>
                    <GoabText size="body-m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>
                </GoabGrid>

                <GoabGrid gap="xl" minChildWidth="400px">
                  <GoabContainer
                    accent="thick"
                    heading="Info with text"
                    type="info"
                    actions={containeractionsinverse}
                  >
                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer accent="thick" type="info">
                    <GoabText size="heading-l" mb="l">
                      Info with accent
                    </GoabText>

                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer accent="thin" type="info">
                    <GoabText size="heading-l" mb="l">
                      Info with accent
                    </GoabText>

                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer type="info" accent="filled">
                    <GoabText size="heading-l" mb="l">
                      Info filled
                    </GoabText>
                    <GoabText size="body-m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>
                </GoabGrid>

                <GoabGrid gap="xl" minChildWidth="400px">
                  <GoabContainer
                    accent="thick"
                    heading="Error with text"
                    type="error"
                    actions={containeractionsinverse}
                  >
                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer accent="thick" type="error">
                    <GoabText size="heading-l" mb="l">
                      Error with accent
                    </GoabText>

                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer accent="thin" type="error">
                    <GoabText size="heading-l" mb="l">
                      Error with accent
                    </GoabText>

                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer type="error" accent="filled">
                    <GoabText size="heading-l" mb="l">
                      Error filled
                    </GoabText>
                    <GoabText size="body-m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>
                </GoabGrid>

                <GoabGrid gap="xl" minChildWidth="400px">
                  <GoabContainer
                    accent="thick"
                    heading="Success with text"
                    type="success"
                    actions={containeractionsinverse}
                  >
                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer accent="thick" type="success">
                    <GoabText size="heading-l" mb="l">
                      Success with accent
                    </GoabText>

                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer accent="thin" type="success">
                    <GoabText size="heading-l" mb="l">
                      Success with accent
                    </GoabText>

                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer type="success" accent="filled">
                    <GoabText size="heading-l" mb="l">
                      Success filled
                    </GoabText>
                    <GoabText size="body-m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>
                </GoabGrid>

                <GoabGrid gap="xl" minChildWidth="400px">
                  <GoabContainer
                    accent="thick"
                    heading="Important with text"
                    type="important"
                    actions={containeractions}
                  >
                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer accent="thick" type="important">
                    <GoabText size="heading-l" mb="l">
                      Important with accent
                    </GoabText>

                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer accent="thin" type="important">
                    <GoabText size="heading-l" mb="l">
                      Important with accent
                    </GoabText>

                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer type="important" accent="filled">
                    <GoabText size="heading-l" mb="l">
                      Important filled
                    </GoabText>
                    <GoabText size="body-m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>
                </GoabGrid>

                <GoabGrid gap="xl" minChildWidth="400px">
                  <GoabContainer
                    accent="thick"
                    heading="Non-interactive, compact with text"
                    type="non-interactive"
                    padding="compact"
                    actions={containeractions}
                  >
                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer accent="thick" type="non-interactive" padding="compact">
                    <GoabText size="heading-l" mb="l">
                      Non-interactive, compact with accent
                    </GoabText>

                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer accent="thin" type="non-interactive" padding="compact">
                    <GoabText size="heading-l" mb="l">
                      Non-interactive, compact with accent
                    </GoabText>

                    <GoabBadge
                      type="success"
                      content="Badge text"
                      icon={true}
                    ></GoabBadge>

                    <GoabText size="body-m" mt="m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>

                  <GoabContainer type="non-interactive" accent="filled" padding="compact">
                    <GoabText size="heading-l" mb="l">
                      Non-interactive, compact
                    </GoabText>
                    <GoabText size="body-m" mb="2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                      risus et magna interdum vestibulum in at ligula.
                    </GoabText>

                    <GoabFormItem
                      label="Test"
                      helpText="This is some help text."
                      mb="2xl"
                    >
                      <GoabInput
                        name="name1"
                        type="text"
                        value=""
                        trailingContent="@gov.ab.ca"
                        width="20ch"
                        onChange={noop}
                      ></GoabInput>
                    </GoabFormItem>

                    <GoabButton>Button</GoabButton>
                  </GoabContainer>
                </GoabGrid>

                {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

                <GoabText size="heading-m" mt="3xl" mb="xl">
                  Date picker
                </GoabText>

                <GoabBlock gap="2xl" mb="xl" direction="column">
                  <GoabFormItem label="Select a date">
                    <GoabDatePicker
                      name="item"
                      value={new Date(2024, 11, 4)}
                      onChange={noop}
                      width="300ch"
                    ></GoabDatePicker>
                  </GoabFormItem>

                  <GoabBlock gap="s" mb="xl" direction="row">
                    <GoabFormItem label="Start date">
                      <GoabDatePicker
                        name="item"
                        value={new Date(2024, 11, 4)}
                        onChange={noop}
                        mr={"m"}
                      ></GoabDatePicker>
                    </GoabFormItem>

                    <GoabFormItem label="End date">
                      <GoabDatePicker
                        name="item"
                        value={new Date(2024, 11, 4)}
                        onChange={noop}
                        mr={"m"}
                      ></GoabDatePicker>
                    </GoabFormItem>
                  </GoabBlock>
                </GoabBlock>

                {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

                <GoabText size="heading-m" mt="3xl" mb="xl">
                  Detail
                </GoabText>

                <GoabBlock gap="xl" mb="xl" direction="column">
                  <GoabDetails heading="Detail Heading that goes for a long time that is longer and maybe wraps as well because it is so long">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel
                    lacinia metus, sed sodales lectus. Aliquam sed volutpat velit.
                  </GoabDetails>

                  <GoabDetails heading="Detail Heading">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel
                    lacinia metus, sed sodales lectus. Aliquam sed volutpat velit.
                  </GoabDetails>
                </GoabBlock>

                {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

                <GoabText size="heading-m" mt="3xl" mb="xl">
                  Divider
                </GoabText>
                <GoabDivider></GoabDivider>

                {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

                <GoabText size="heading-m" mt="3xl" mb="xl">
                  Dropdown
                </GoabText>

                <GoabBlock gap="2xl" mb="xl" direction="column">
                  <GoabFormItem label="Basic dropdown">
                    <GoabDropdown
                      placeholder="—Select—"
                      name="item"
                      value=""
                      onChange={noop}
                    >
                      <GoabDropdownItem value="red" label="Red"></GoabDropdownItem>
                      <GoabDropdownItem value="green" label="Green"></GoabDropdownItem>
                      <GoabDropdownItem value="blue" label="Blue"></GoabDropdownItem>
                    </GoabDropdown>
                  </GoabFormItem>

                  <GoabFormItem label="Basic dropdown width 100%">
                    <GoabDropdown
                      placeholder="—Select—"
                      name="item"
                      value=""
                      width="100%"
                      onChange={noop}
                    >
                      <GoabDropdownItem value="red" label="Red"></GoabDropdownItem>
                      <GoabDropdownItem value="green" label="Green"></GoabDropdownItem>
                      <GoabDropdownItem value="blue" label="Blue"></GoabDropdownItem>
                    </GoabDropdown>
                  </GoabFormItem>

                  <GoabFormItem label="Dropdown with longest option 100ch">
                    <GoabDropdown
                      name="item"
                      value=""
                      onChange={noop}
                      placeholder="—Select—"
                    >
                      <GoabDropdownItem
                        value="red"
                        label="100ch: ipsum dolor sit amet, consectetur porttitor. Ipsum dolor sit amet, consectetur porttitor."
                      ></GoabDropdownItem>
                      <GoabDropdownItem value="green" label="abc"></GoabDropdownItem>
                      <GoabDropdownItem value="blue" label="MMM"></GoabDropdownItem>
                    </GoabDropdown>
                  </GoabFormItem>

                  <GoabFormItem label="Dropdown with longest option 3ch">
                    <GoabDropdown name="item" value="" onChange={noop}>
                      <GoabDropdownItem value="red" label="000"></GoabDropdownItem>
                      <GoabDropdownItem value="green" label="000"></GoabDropdownItem>
                      <GoabDropdownItem value="blue" label="000"></GoabDropdownItem>
                    </GoabDropdown>
                  </GoabFormItem>

                  <GoabFormItem label="Dropdown with longest option 20ch">
                    <GoabDropdown name="item" value="" onChange={noop}>
                      <GoabDropdownItem
                        value="red"
                        label="20ch-000000000000000"
                      ></GoabDropdownItem>
                      <GoabDropdownItem value="green" label="acd"></GoabDropdownItem>
                      <GoabDropdownItem value="blue" label="cde"></GoabDropdownItem>
                    </GoabDropdown>
                  </GoabFormItem>

                  <GoabFormItem label="Dropdown with longest option 20ch and leading icon">
                    <GoabDropdown name="item" value="" leadingIcon="mail" onChange={noop}>
                      <GoabDropdownItem
                        value="red"
                        label="20ch-000000000000000"
                      ></GoabDropdownItem>
                      <GoabDropdownItem value="green" label="acd"></GoabDropdownItem>
                      <GoabDropdownItem value="blue" label="cde"></GoabDropdownItem>
                    </GoabDropdown>
                  </GoabFormItem>

                  <GoabFormItem label="Filterable dropdown">
                    <GoabDropdown name="item" value="" filterable={true} onChange={noop}>
                      <GoabDropdownItem
                        value="red"
                        label="20ch-000000000000000"
                      ></GoabDropdownItem>
                      <GoabDropdownItem value="green" label="acd"></GoabDropdownItem>
                      <GoabDropdownItem value="blue" label="cde"></GoabDropdownItem>
                    </GoabDropdown>
                  </GoabFormItem>

                  <GoabFormItem label="Filterable dropdown with search icon">
                    <GoabDropdown
                      name="item"
                      value=""
                      filterable={true}
                      leadingIcon="search"
                      onChange={noop}
                    >
                      <GoabDropdownItem
                        value="red"
                        label="20ch-000000000000000"
                      ></GoabDropdownItem>
                      <GoabDropdownItem value="green" label="acd"></GoabDropdownItem>
                      <GoabDropdownItem value="blue" label="cde"></GoabDropdownItem>
                    </GoabDropdown>
                  </GoabFormItem>

                  <GoabFormItem label="Dropdown with error" error="Error message.">
                    <GoabDropdown name="item" value="" error={true} onChange={noop}>
                      <GoabDropdownItem value="red" label="Red"></GoabDropdownItem>
                      <GoabDropdownItem value="green" label="Green"></GoabDropdownItem>
                      <GoabDropdownItem value="blue" label="Blue"></GoabDropdownItem>
                    </GoabDropdown>
                  </GoabFormItem>

                  <GoabFormItem label="Disabled dropdown" helpText="Helper text">
                    <GoabDropdown name="item" value="" disabled={true} onChange={noop}>
                      <GoabDropdownItem value="red" label="Red"></GoabDropdownItem>
                      <GoabDropdownItem value="green" label="Green"></GoabDropdownItem>
                      <GoabDropdownItem value="blue" label="Blue"></GoabDropdownItem>
                    </GoabDropdown>
                  </GoabFormItem>

                  <GoabFormItem label="Native dropdown" helpText="Helper text">
                    <GoabDropdown
                      name="item"
                      value=""
                      native={true}
                      onChange={onChangeDropdown}
                    >
                      <GoabDropdownItem value="red" label="Red"></GoabDropdownItem>
                      <GoabDropdownItem value="green" label="Green"></GoabDropdownItem>
                      <GoabDropdownItem value="blue" label="Blue"></GoabDropdownItem>
                    </GoabDropdown>
                  </GoabFormItem>
                </GoabBlock>

                {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

                <GoabText size="heading-m" mt="3xl" mb="xl">
                  File upload
                </GoabText>

                <GoabBlock gap="xl" mb="xl" direction="column">
                  <GoabFormItem label="Upload a file ">
                    <GoabFileUploadInput
                      maxFileSize="100MB"
                      variant="button"
                      onSelectFile={() => {
                        /* do nothing */
                      }}
                    />
                  </GoabFormItem>

                  <GoabFormItem label="Upload a file">
                    <GoabFileUploadInput
                      maxFileSize="100MB"
                      onSelectFile={() => {
                        /** do nothing **/
                      }}
                    />
                  </GoabFormItem>
                </GoabBlock>

                {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

                <GoabText size="heading-m" mt="3xl" mb="xl">
                  Form item
                </GoabText>

                <GoabBlock gap="xl" mb="xl" direction="column">
                  <GoabFormItem
                    label="Optional input with error and helper text"
                    helpText="This is some help text"
                    error="There is an error."
                    requirement="optional"
                  >
                    <GoabInput
                      name="name1"
                      type="text"
                      value=""
                      width="20ch"
                      error={true}
                      onChange={noop}
                    ></GoabInput>
                  </GoabFormItem>

                  <GoabFormItem
                    label="Required input with helper text"
                    helpText="This is some help text"
                    requirement="required"
                  >
                    <GoabInput
                      name="name1"
                      type="text"
                      value=""
                      width="20ch"
                      onChange={noop}
                    ></GoabInput>
                  </GoabFormItem>

                  <GoabFormItem
                    label="Input with helper text"
                    helpText="This is some help text"
                  >
                    <GoabInput
                      name="name1"
                      type="text"
                      value=""
                      width="20ch"
                      onChange={noop}
                    ></GoabInput>
                  </GoabFormItem>

                  <GoabFormItem
                    label="Radio with helper text"
                    helpText="This is some help text"
                  >
                    <GoabRadioGroup name="item" value="1" onChange={onChangeTextArea}>
                      <GoabRadioItem value="1" label="Option 1"></GoabRadioItem>
                      <GoabRadioItem value="2" label="Option 2"></GoabRadioItem>
                      <GoabRadioItem value="3" label="Option 3"></GoabRadioItem>
                    </GoabRadioGroup>
                  </GoabFormItem>

                  <GoabFormItem label="Basic checkbox list">
                    <GoabCheckbox name="item 1" text="Option 1" value=""></GoabCheckbox>
                    <GoabCheckbox name="item 2" text="Option 2" value=""></GoabCheckbox>
                    <GoabCheckbox name="item 3" text="Option 3" value=""></GoabCheckbox>
                  </GoabFormItem>

                  <GoabFormItem
                    label="Dropdown with helper text"
                    helpText="This is some help text"
                  >
                    <GoabDropdown name="item" value="" onChange={onChangeDropdown}>
                      <GoabDropdownItem value="red" label="Red"></GoabDropdownItem>
                      <GoabDropdownItem value="green" label="Green"></GoabDropdownItem>
                      <GoabDropdownItem value="blue" label="Blue"></GoabDropdownItem>
                    </GoabDropdown>
                  </GoabFormItem>

                  <GoabFormItem label="Input with large label" labelSize="large">
                    <GoabInput
                      name="name1"
                      type="text"
                      value=""
                      width="20ch"
                      onChange={noop}
                    ></GoabInput>
                  </GoabFormItem>

                  <GoabFormItem
                    label="Optional input with a large label size"
                    helpText="This is some help text"
                    labelSize="large"
                    requirement="optional"
                  >
                    <GoabRadioGroup name="item" value="1" onChange={onChangeTextArea}>
                      <GoabRadioItem value="1" label="Option 1"></GoabRadioItem>
                      <GoabRadioItem value="2" label="Option 2"></GoabRadioItem>
                      <GoabRadioItem value="3" label="Option 3"></GoabRadioItem>
                    </GoabRadioGroup>
                  </GoabFormItem>

                  <GoabFormItem
                    label="Large label size"
                    helpText="This is some help text"
                    labelSize="large"
                  >
                    <GoabRadioGroup name="item" value="1" onChange={onChangeTextArea}>
                      <GoabRadioItem value="1" label="Option 1"></GoabRadioItem>
                      <GoabRadioItem value="2" label="Option 2"></GoabRadioItem>
                      <GoabRadioItem value="3" label="Option 3"></GoabRadioItem>
                    </GoabRadioGroup>
                  </GoabFormItem>

                  <GoabFormItem label="File uploader">
                    <GoabFileUploadInput
                      maxFileSize="100MB"
                      variant="button"
                      onSelectFile={() => {
                        /** do nothing **/
                      }}
                    />
                  </GoabFormItem>
                </GoabBlock>

                {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

                <GoabText size="heading-m" mt="3xl" mb="xl">
                  Form stepper
                </GoabText>

                <GoabBlock gap="xl" mb="xl" direction="column">
                  <GoabFormStepper testId="foo" onChange={(e) => setStep(e.step)}>
                    <GoabFormStep
                      text="Personal details"
                      status="complete"
                    ></GoabFormStep>
                    <GoabFormStep
                      text="Employment history"
                      status="incomplete"
                    ></GoabFormStep>
                    <GoabFormStep text="References"></GoabFormStep>
                    <GoabFormStep text="Review"></GoabFormStep>
                  </GoabFormStepper>
                  <GoabPages current={step} mb="3xl">
                    <div>Page 1 content</div>
                    <div>Page 2 content</div>
                    <div>Page 3 content</div>
                    <div>Page 4 content</div>
                  </GoabPages>

                  <GoabFormStepper testId="foo" onChange={(e) => setStep2(e.step)}>
                    <GoabFormStep
                      text="Personal details"
                      status="complete"
                    ></GoabFormStep>
                    <GoabFormStep
                      text="Employment history"
                      status="incomplete"
                    ></GoabFormStep>
                    <GoabFormStep text="References"></GoabFormStep>
                    <GoabFormStep text="Another"></GoabFormStep>
                    <GoabFormStep text="Review"></GoabFormStep>
                  </GoabFormStepper>
                  <GoabPages current={step2} mb="3xl">
                    <div>Page 1 content</div>
                    <div>Page 2 content</div>
                    <div>Page 3 content</div>
                    <div>Page 4 content</div>
                    <div>Page 5 content</div>
                  </GoabPages>
                </GoabBlock>

                {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

                <GoabText size="heading-m" mt="3xl" mb="xl">
                  Hero Banner
                </GoabText>

                <GoabBlock gap="xl" mb="xl" direction="column">
                  <GoabHeroBanner heading="This is a heading that wraps to a second line because it's long">
                    Resources are available to help Alberta entrepreneurs and small
                    businesses start, grow and succeed.
                    <GoabHeroBannerActions>
                      <GoabButton type="start">Call to action</GoabButton>
                    </GoabHeroBannerActions>
                  </GoabHeroBanner>

                  <GoabHeroBanner heading="This is a short heading">
                    Resources are available to help Alberta entrepreneurs and small
                    businesses start, grow and succeed.
                    <GoabHeroBannerActions>
                      <GoabButton type="start">Call to action</GoabButton>
                    </GoabHeroBannerActions>
                  </GoabHeroBanner>

                  <GoabHeroBanner
                    heading="This is a heading that wraps to a second line because it's long"
                    backgroundUrl="#"
                  >
                    Resources are available to help Alberta entrepreneurs and small
                    businesses start, grow and succeed.
                    <GoabHeroBannerActions>
                      <GoabButton type="start">Call to action</GoabButton>
                    </GoabHeroBannerActions>
                  </GoabHeroBanner>

                  <GoabHeroBanner heading="This is a short heading" backgroundUrl="#">
                    Resources are available to help Alberta entrepreneurs and small
                    businesses start, grow and succeed.
                    <GoabHeroBannerActions>
                      <GoabButton type="start">Call to action</GoabButton>
                    </GoabHeroBannerActions>
                  </GoabHeroBanner>
                </GoabBlock>

                {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

                <GoabText size="heading-m" mt="3xl" mb="none">
                  Icon
                </GoabText>

                <GoabText size="heading-s" mt="xl" mb="none">
                  Tshirt sizing
                </GoabText>
                <GoabBlock>
                  <GoabTooltip content="2xsmall">
                    <GoabIcon
                      type="triangle"
                      size="2xsmall"
                      theme="outline"
                      opacity={1}
                    ></GoabIcon>
                  </GoabTooltip>
                  <GoabTooltip content="xsmall">
                    <GoabIcon type="triangle" size="xsmall" theme="outline" opacity={1} />
                  </GoabTooltip>
                  <GoabTooltip content="small">
                    <GoabIcon type="triangle" size="small" theme="outline" opacity={1} />
                  </GoabTooltip>
                  <GoabTooltip content="medium">
                    <GoabIcon type="triangle" size="medium" theme="outline" opacity={1} />
                  </GoabTooltip>
                  <GoabTooltip content="large">
                    <GoabIcon type="triangle" size="large" theme="outline" opacity={1} />
                  </GoabTooltip>
                  <GoabTooltip content="xlarge">
                    <GoabIcon type="triangle" size="xlarge" theme="outline" opacity={1} />
                  </GoabTooltip>
                </GoabBlock>
                <GoabBlock>
                  <GoabTooltip content="2xsmall">
                    <GoabIcon
                      type="triangle"
                      size="2xsmall"
                      theme="filled"
                      opacity={1}
                    ></GoabIcon>
                  </GoabTooltip>
                  <GoabTooltip content="xsmall">
                    <GoabIcon type="triangle" size="xsmall" theme="filled" opacity={1} />
                  </GoabTooltip>
                  <GoabTooltip content="small">
                    <GoabIcon type="triangle" size="small" theme="filled" opacity={1} />
                  </GoabTooltip>
                  <GoabTooltip content="medium">
                    <GoabIcon type="triangle" size="medium" theme="filled" opacity={1} />
                  </GoabTooltip>
                  <GoabTooltip content="large">
                    <GoabIcon type="triangle" size="large" theme="filled" opacity={1} />
                  </GoabTooltip>
                  <GoabTooltip content="xlarge">
                    <GoabIcon type="triangle" size="xlarge" theme="filled" opacity={1} />
                  </GoabTooltip>
                </GoabBlock>

                <GoabText size="heading-s" mt="l" mb="none">
                  Number sizing
                </GoabText>
                <GoabBlock>
                  <GoabTooltip content="Size 1">
                    <GoabIcon type="triangle" size="1" theme="outline" opacity={1} />
                  </GoabTooltip>
                  <GoabTooltip content="Size 2">
                    <GoabIcon type="triangle" size="2" theme="outline" opacity={1} />
                  </GoabTooltip>
                  <GoabTooltip content="Size 3">
                    <GoabIcon type="triangle" size="3" theme="outline" opacity={1} />
                  </GoabTooltip>
                  <GoabTooltip content="Size 4">
                    <GoabIcon type="triangle" size="4" theme="outline" opacity={1} />
                  </GoabTooltip>
                  <GoabTooltip content="Size 5">
                    <GoabIcon type="triangle" size="5" theme="outline" opacity={1} />
                  </GoabTooltip>
                  <GoabTooltip content="Size 6">
                    <GoabIcon type="triangle" size="6" theme="outline" opacity={1} />
                  </GoabTooltip>
                </GoabBlock>

                <GoabBlock>
                  <GoabTooltip content="Size 1">
                    <GoabIcon type="triangle" size="1" theme="filled" opacity={1} />
                  </GoabTooltip>
                  <GoabTooltip content="Size 2">
                    <GoabIcon type="triangle" size="2" theme="filled" opacity={1} />
                  </GoabTooltip>
                  <GoabTooltip content="Size 3">
                    <GoabIcon type="triangle" size="3" theme="filled" opacity={1} />
                  </GoabTooltip>
                  <GoabTooltip content="Size 4">
                    <GoabIcon type="triangle" size="4" theme="filled" opacity={1} />
                  </GoabTooltip>
                  <GoabTooltip content="Size 5">
                    <GoabIcon type="triangle" size="5" theme="filled" opacity={1} />
                  </GoabTooltip>
                  <GoabTooltip content="Size 6">
                    <GoabIcon type="triangle" size="6" theme="filled" opacity={1} />
                  </GoabTooltip>
                </GoabBlock>

                <GoabText size="heading-s" mt="l" mb="none">
                  Inverted
                </GoabText>
                <div style={{ backgroundColor: "#2F2F2F", padding: "8px" }}>
                  <GoabBlock>
                    <GoabIcon
                      type="triangle"
                      size="small"
                      theme="outline"
                      opacity={1}
                      inverted="true"
                    ></GoabIcon>
                    <GoabIcon
                      type="triangle"
                      size="medium"
                      theme="outline"
                      opacity={1}
                      inverted="true"
                    ></GoabIcon>
                    <GoabIcon
                      type="triangle"
                      size="large"
                      theme="outline"
                      opacity={1}
                      inverted="true"
                    ></GoabIcon>
                    <GoabIcon
                      type="triangle"
                      size="xlarge"
                      theme="outline"
                      opacity={1}
                      inverted="true"
                    ></GoabIcon>
                  </GoabBlock>
                </div>

                {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

                <GoabText size="heading-m" mt="4xl" mb="xl">
                  Icon button
                </GoabText>

                <GoabBlock>
                  <GoabIconButton
                    variant="color"
                    size="medium"
                    icon="refresh"
                    ariaLabel="Refresh icon"
                  ></GoabIconButton>
                  <GoabIconButton
                    variant="color"
                    size="large"
                    icon="refresh"
                    ariaLabel="Refresh icon"
                  ></GoabIconButton>
                  <GoabIconButton
                    variant="color"
                    size="xlarge"
                    icon="refresh"
                    ariaLabel="Refresh icon"
                  ></GoabIconButton>
                  <GoabIconButton
                    variant="color"
                    size="xlarge"
                    icon="refresh"
                    ariaLabel="Refresh icon"
                    disabled={true}
                  ></GoabIconButton>
                </GoabBlock>
                <div style={{ backgroundColor: "#2F2F2F", padding: "8px" }}>
                  <GoabBlock>
                    <GoabIconButton
                      variant="light"
                      size="medium"
                      icon="refresh"
                      ariaLabel="Refresh icon"
                    ></GoabIconButton>
                    <GoabIconButton
                      variant="light"
                      size="large"
                      icon="refresh"
                      ariaLabel="Refresh icon"
                    ></GoabIconButton>
                    <GoabIconButton
                      variant="light"
                      size="xlarge"
                      icon="refresh"
                      ariaLabel="Refresh icon"
                    ></GoabIconButton>
                    <GoabIconButton
                      variant="light"
                      size="xlarge"
                      icon="refresh"
                      ariaLabel="Refresh icon"
                      disabled={true}
                    ></GoabIconButton>
                  </GoabBlock>
                </div>
                <GoabBlock>
                  <GoabIconButton
                    variant="dark"
                    size="medium"
                    icon="refresh"
                    ariaLabel="Refresh icon"
                  ></GoabIconButton>
                  <GoabIconButton
                    variant="dark"
                    size="large"
                    icon="refresh"
                    ariaLabel="Refresh icon"
                  ></GoabIconButton>
                  <GoabIconButton
                    variant="dark"
                    size="xlarge"
                    icon="refresh"
                    ariaLabel="Refresh icon"
                  ></GoabIconButton>
                  <GoabIconButton
                    variant="dark"
                    size="xlarge"
                    icon="refresh"
                    ariaLabel="Refresh icon"
                    disabled={true}
                  ></GoabIconButton>
                </GoabBlock>
                <GoabBlock>
                  <GoabIconButton
                    variant="destructive"
                    size="medium"
                    icon="refresh"
                    ariaLabel="Refresh icon"
                  ></GoabIconButton>
                  <GoabIconButton
                    variant="destructive"
                    size="large"
                    icon="refresh"
                    ariaLabel="Refresh icon"
                  ></GoabIconButton>
                  <GoabIconButton
                    variant="destructive"
                    size="xlarge"
                    icon="refresh"
                    ariaLabel="Refresh icon"
                  ></GoabIconButton>
                  <GoabIconButton
                    variant="destructive"
                    size="xlarge"
                    icon="refresh"
                    ariaLabel="Refresh icon"
                    disabled={true}
                  ></GoabIconButton>
                </GoabBlock>
              </GoabBlock>

              {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

              <GoabText size="heading-m" mt="4xl" mb="xl">
                Input
              </GoabText>

              <GoabBlock gap="2xl" mb="xl" direction="column">
                <GoabFormItem label="Basic text input">
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="20ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="password input">
                  <GoabInput
                    name="name1"
                    type="password"
                    value=""
                    width="20ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Search input">
                  <GoabInput
                    name="name1"
                    type="search"
                    value=""
                    width="20ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Tel input">
                  <GoabInput
                    name="name1"
                    type="tel"
                    value=""
                    width="20ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Date input">
                  <GoabInput
                    name="name1"
                    type="date"
                    value=""
                    width="25ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Date time input">
                  <GoabInput
                    name="name1"
                    type="datetime-local"
                    value=""
                    width="20ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Time input">
                  <GoabInput
                    name="name1"
                    type="time"
                    value=""
                    width="20ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Email input">
                  <GoabInput
                    name="name1"
                    type="email"
                    value=""
                    width="20ch"
                    onChange={noop}
                    trailingContent="@gov.ab.ca"
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="number input">
                  <GoabInput
                    name="name1"
                    type="number"
                    value=""
                    width="20ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="input with icon button">
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="20ch"
                    onChange={noop}
                    onTrailingIconClick={noop}
                    trailingIcon="close"
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="2ch">
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="2ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="20px">
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="20px"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Optional text input" requirement="optional">
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="20ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Text input that is 100% width">
                  <GoabInput
                    name="name3"
                    type="text"
                    value=""
                    width="100%"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Text input that is 50% width">
                  <GoabInput
                    name="name3"
                    type="text"
                    value=""
                    width="50%"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Text input that has no width defined">
                  <GoabInput
                    name="name3"
                    type="text"
                    value=""
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Width is 180ch">
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="180ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Text input with leading content">
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    leadingContent="dasd"
                    width="20ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Text input with trailing content and 100% width">
                  <GoabInput
                    name="name2"
                    type="email"
                    value=""
                    width="100%"
                    trailingContent="@gov.ab.ca"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Text input with 2ch width">
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="2ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Text input with 2ch width and leading icon">
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="2ch"
                    leadingIcon="bag"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Text input with 2ch width and trailing icon">
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="2ch"
                    trailingIcon="bag"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Text input with 2ch width and leading and trailing content">
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="2ch"
                    leadingContent="content"
                    trailingContent="content"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Text input with 80ch width and leading and trailing content">
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="80ch"
                    leadingContent="content"
                    trailingContent="content"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Text input with 80ch width and leading and trailing content and icons">
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="80ch"
                    leadingContent="content"
                    trailingContent="content"
                    trailingIcon="arrow-back"
                    leadingIcon="arrow-back"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Text input with 80ch width and leading content and icons">
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="80ch"
                    leadingContent="content"
                    trailingIcon="arrow-back"
                    leadingIcon="arrow-back"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Text input with 80ch width, trailing content and icon">
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="80ch"
                    trailingContent="content"
                    trailingIcon="arrow-back"
                    leadingIcon="arrow-back"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Text input with 80ch width and leading and trailing icons">
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="80ch"
                    trailingIcon="arrow-back"
                    leadingIcon="arrow-back"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Text input with 100% width and leading and trailing content">
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="100%"
                    leadingContent="content"
                    trailingContent="content"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem
                  label="Text input with helper text"
                  helpText="This is some help text."
                  requirement="optional"
                >
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="30ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabBlock gap="xs" mb="xl" direction="row">
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="30ch"
                    leadingIcon="search"
                    onChange={noop}
                  ></GoabInput>

                  <GoabButton> Search </GoabButton>
                </GoabBlock>

                <GoabFormItem
                  label="Text input with 60ch width"
                  helpText="This is some help text."
                >
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="60ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem
                  label="Text input with error"
                  helpText="This is some help text."
                  error="There is an error"
                >
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="20ch"
                    error={true}
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem
                  label="Text input with leading and trailing content"
                  error="There is an error"
                >
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="20ch"
                    leadingContent="dad"
                    trailingContent="dasd"
                    error={true}
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem
                  label="Text input with leading content"
                  error="There is an error"
                >
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="20ch"
                    leadingContent="dasd"
                    error={true}
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem
                  label="Text input with trailing content"
                  helpText="This is some help text."
                  error="There is an error"
                >
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="20ch"
                    trailingContent="dasd"
                    error={true}
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Text input with leading icon">
                  <GoabInput
                    leadingIcon="mail"
                    name="name1"
                    value=""
                    width="40ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Text input with trailing icon">
                  <GoabInput
                    trailingIcon="mail"
                    name="name1"
                    value=""
                    width="40ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem
                  label="Text input that's disabled"
                  helpText="Here is some helper text"
                >
                  <GoabInput
                    disabled={true}
                    name="name1"
                    value=""
                    width="20ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Text input that's disabled with leading icon">
                  <GoabInput
                    leadingIcon="accessibility"
                    disabled={true}
                    name="name1"
                    value=""
                    width="20ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Text field with placeholder text">
                  <GoabInput
                    name="name1"
                    placeholder="Placeholder text"
                    value=""
                    width="20ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem
                  label="Two text fields?"
                  helpText={"Helper text that is wrapping both fields at once"}
                >
                  <GoabInput
                    name="name1"
                    placeholder="First field"
                    value=""
                    width="20ch"
                    onChange={noop}
                  ></GoabInput>
                  <GoabInput
                    name="name1"
                    placeholder="Second field"
                    value=""
                    width="20ch"
                    onChange={noop}
                    ml={"m"}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem label="Text field with readonly">
                  <GoabInput
                    name="name1"
                    value=""
                    width="20ch"
                    readonly={true}
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>
              </GoabBlock>

              {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

              <GoabText size="heading-m" mt="4xl" mb="2xl">
                Link
              </GoabText>

              <GoabBlock gap="2xl" mb="xl" direction="column">
                <GoabLink leadingIcon="add">Link with a leading icon</GoabLink>

                <GoabLink trailingIcon="open">Link with a trailing icon</GoabLink>
              </GoabBlock>

              {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

              <GoabText size="heading-m" mt="4xl" mb="xl">
                Microsite header
              </GoabText>

              <GoabBlock gap="3xs" mb="xl" direction="column">
                <GoabMicrositeHeader
                  type="alpha"
                  headerUrlTarget="blank"
                ></GoabMicrositeHeader>

                <GoabMicrositeHeader
                  type="beta"
                  headerUrlTarget="blank"
                ></GoabMicrositeHeader>

                <GoabMicrositeHeader
                  type="live"
                  headerUrlTarget="blank"
                ></GoabMicrositeHeader>

                <GoabText size="heading-s" mt="l" mb="s">
                  Feedback link
                </GoabText>

                <GoabMicrositeHeader
                  type="alpha"
                  feedbackUrl="www.google.com"
                  feedbackUrlTarget="blank"
                  headerUrlTarget="blank"
                ></GoabMicrositeHeader>

                <GoabMicrositeHeader
                  type="beta"
                  feedbackUrl="www.google.com"
                  feedbackUrlTarget="blank"
                  headerUrlTarget="blank"
                ></GoabMicrositeHeader>

                <GoabMicrositeHeader
                  type="live"
                  feedbackUrl="www.google.com"
                  feedbackUrlTarget="blank"
                  headerUrlTarget="blank"
                ></GoabMicrositeHeader>

                <GoabText size="heading-s" mt="l" mb="s">
                  Version number
                </GoabText>

                <GoabMicrositeHeader
                  type="alpha"
                  headerUrlTarget="blank"
                  version="1.2.3"
                ></GoabMicrositeHeader>

                <GoabMicrositeHeader
                  type="beta"
                  headerUrlTarget="blank"
                  version="1.2.3"
                ></GoabMicrositeHeader>

                <GoabMicrositeHeader
                  type="live"
                  headerUrlTarget="blank"
                  version="1.2.3"
                ></GoabMicrositeHeader>

                <GoabText size="heading-s" mt="l" mb="s">
                  Feedback link and Version number
                </GoabText>

                <GoabMicrositeHeader
                  type="alpha"
                  feedbackUrl="www"
                  feedbackUrlTarget="blank"
                  headerUrlTarget="blank"
                  version="1.2.3"
                ></GoabMicrositeHeader>

                <GoabMicrositeHeader
                  type="beta"
                  feedbackUrl="www"
                  feedbackUrlTarget="blank"
                  headerUrlTarget="blank"
                  version="1.2.3"
                ></GoabMicrositeHeader>

                <GoabMicrositeHeader
                  type="live"
                  feedbackUrl="www"
                  feedbackUrlTarget="blank"
                  headerUrlTarget="blank"
                  version="1.2.3"
                ></GoabMicrositeHeader>
              </GoabBlock>

              {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

              <GoabText size="heading-m" mt="3xl" mb="xl">
                Modal
              </GoabText>

              <GoabBlock gap="xl" mb="xl" direction="column">
                <GoabButton
                  type="tertiary"
                  leadingIcon="trash"
                  onClick={() => setDestructiveModalOpen(true)}
                >
                  Delete my application
                </GoabButton>

                <GoabModal
                  heading="Are you sure you want to delete this application?"
                  open={destructiveModalOpen}
                  role="alertdialog"
                  calloutVariant="emergency"
                  actions={
                    <GoabButtonGroup alignment="end">
                      <GoabButton
                        type="tertiary"
                        onClick={() => setDestructiveModalOpen(false)}
                      >
                        Cancel
                      </GoabButton>
                      <GoabButton
                        type="primary"
                        variant="destructive"
                        onClick={() => {
                          setDestructiveModalOpen(false);
                        }}
                      >
                        Delete application
                      </GoabButton>
                    </GoabButtonGroup>
                  }
                >
                  <p>This action cannot be undone. </p>
                </GoabModal>

                <GoabButton type="tertiary" onClick={() => setBasicModalOpen(true)}>
                  Open basic modal with close
                </GoabButton>

                <GoabModal
                  heading="This is a modal with a close button"
                  open={basicModalOpen}
                  role="alertdialog"
                  onClose={() => setBasicModalOpen(false)}
                >
                  <p>
                    This is meant to be dismissed, the user can click outside of the modal
                    or click the close button in the top right corner.
                  </p>
                </GoabModal>

                <GoabButton type="tertiary" onClick={() => setBasicModal2Open(true)}>
                  Open basic modal with actions
                </GoabButton>

                <GoabModal
                  heading="This is a modal with actions"
                  open={basicModal2Open}
                  role="alertdialog"
                  actions={
                    <GoabButtonGroup alignment="end">
                      <GoabButton
                        type="tertiary"
                        onClick={() => setBasicModal2Open(false)}
                      >
                        Cancel
                      </GoabButton>
                      <GoabButton
                        type="primary"
                        onClick={() => {
                          setBasicModal2Open(false);
                        }}
                      >
                        Continue
                      </GoabButton>
                    </GoabButtonGroup>
                  }
                >
                  <p>
                    This is meant to make the user choose an option in order to continue.
                  </p>
                </GoabModal>

                <GoabButton type="tertiary" onClick={() => setContentModalOpen(true)}>
                  Open modal with lots of content and actions
                </GoabButton>

                <GoabModal
                  open={contentModalOpen}
                  heading="This is a modal with lots of content"
                  maxWidth="1200px"
                  role="alertdialog"
                  actions={
                    <GoabButtonGroup alignment="end">
                      <GoabButton
                        type="tertiary"
                        onClick={() => setContentModalOpen(false)}
                      >
                        Cancel
                      </GoabButton>
                      <GoabButton
                        type="primary"
                        onClick={() => {
                          setContentModalOpen(false);
                        }}
                      >
                        Continue
                      </GoabButton>
                    </GoabButtonGroup>
                  }
                >
                  <p>
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal
                    scroll.This is a lot of content that make the modal scroll. This is a
                    lot of content that make the modal scroll. This is a lot of content
                    that make the modal scroll. This is a lot of content that make the
                    modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll.
                  </p>
                  <GoabFormItem label="Basic">
                    <GoabInput
                      name="item"
                      value={value}
                      width="20ch"
                      onChange={function (detail: GoabInputOnChangeDetail<string>): void {
                        throw new Error("Function not implemented.");
                      }}
                    ></GoabInput>
                  </GoabFormItem>{" "}
                </GoabModal>

                <GoabButton type="tertiary" onClick={() => setContentModal2Open(true)}>
                  Open modal with lots of content and close button
                </GoabButton>

                <GoabModal
                  heading="This is a modal with lots of content"
                  open={contentModal2Open}
                  role="alertdialog"
                  onClose={() => setContentModal2Open(false)}
                >
                  <p>
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll.
                  </p>
                </GoabModal>

                <GoabButton type="tertiary" onClick={() => setBasicModal3Open(true)}>
                  Open basic modal with actions and close button
                </GoabButton>

                <GoabModal
                  heading="This is a modal with actions and a close button"
                  open={basicModal3Open}
                  role="alertdialog"
                  onClose={() => setBasicModal3Open(false)}
                  actions={
                    <GoabButtonGroup alignment="end">
                      <GoabButton
                        type="tertiary"
                        onClick={() => setBasicModal3Open(false)}
                      >
                        Cancel
                      </GoabButton>
                      <GoabButton
                        type="primary"
                        onClick={() => {
                          setBasicModal3Open(false);
                        }}
                      >
                        Continue
                      </GoabButton>
                    </GoabButtonGroup>
                  }
                >
                  <p>
                    The use can dismiss the modal by clicking outside of the modal,
                    clicking the close button, or choose an option to continue.{" "}
                  </p>
                </GoabModal>

                <GoabButton type="tertiary" onClick={() => setNoHeaderModalOpen(true)}>
                  Open modal with no header
                </GoabButton>

                <GoabModal
                  heading=""
                  open={NoHeaderModalOpen}
                  role="alertdialog"
                  /* onClose={() => setNoHeaderModalOpen(false)} */
                  actions={
                    <GoabButtonGroup alignment="end">
                      <GoabButton
                        type="tertiary"
                        onClick={() => setNoHeaderModalOpen(false)}
                      >
                        Cancel
                      </GoabButton>
                      <GoabButton
                        type="primary"
                        onClick={() => {
                          setNoHeaderModalOpen(false);
                        }}
                      >
                        Continue
                      </GoabButton>
                    </GoabButtonGroup>
                  }
                >
                  <p>
                    This is a modal with no header. Choose an option to continue. Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    facilisis quam ac massa commodo fringilla. Sed gravida elit urna, vel
                    rhoncus velit ullamcorper vitae. Phasellus ullamcorper enim et leo
                    dignissim, sed dignissim mi varius.
                  </p>
                </GoabModal>
              </GoabBlock>

              {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

              <GoabText size="heading-m" mt="3xl" mb="2xl">
                Notification banner
              </GoabText>

              <GoabBlock gap="xl" mb="4xl" direction="column">
                <GoabNotification type="information">
                  Notification banner message
                </GoabNotification>

                <GoabNotification type="information">
                  Notification banner message that is really long and eventually it wraps
                  around the screen because it's so long that it needs to wrap around the
                  screen
                </GoabNotification>

                <GoabNotification type="important">
                  Notification banner message
                </GoabNotification>

                <GoabNotification type="emergency">
                  Notification banner message
                </GoabNotification>

                <GoabNotification type="event">
                  Notification banner message
                </GoabNotification>
              </GoabBlock>

              {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

              <GoabText size="heading-m" mt="3xl" mb="2xl">
                Pagination
              </GoabText>

              <GoabBlock gap="xl" mb="4xl" direction="column"></GoabBlock>

              {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

              <GoabText size="heading-m" mt="3xl" mb="xl">
                Popover
              </GoabText>

              <GoabBlock gap="xl" mb="4xl" direction="column">
                <GoabPopover target={popovertarget}>
                  <p>This is a popover</p>
                  It can be used for a number of different contexts.
                </GoabPopover>
              </GoabBlock>

              {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

              <GoabText size="heading-m" mt="4xl" mb="m">
                Progress indicators
              </GoabText>

              <GoabText size="heading-m" mt="4xl" mb="s">
                Circular Progress indicator
              </GoabText>
              <GoabBlock>
                <GoabCircularProgress
                  variant="inline"
                  size="small"
                  message="Loading message..."
                  visible={true}
                ></GoabCircularProgress>
                <GoabCircularProgress
                  variant="inline"
                  size="large"
                  message="Loading message..."
                  visible={true}
                ></GoabCircularProgress>
              </GoabBlock>

              <GoabText size="heading-m" mt="4xl" mb="s">
                Linear Progress indicator
              </GoabText>
              <div style={{ width: "600px", border: "1px solid black" }}>
                <GoabBlock direction="column">
                  <GoabText size="heading-s">Default progressbar at 0%</GoabText>
                  <GoabLinearProgress progress={0}></GoabLinearProgress>
                </GoabBlock>
                <GoabBlock direction="column">
                  <GoabText size="heading-s">Default progressbar at 25%</GoabText>
                  <GoabLinearProgress progress={25}></GoabLinearProgress>
                </GoabBlock>
                <GoabBlock direction="column">
                  <GoabText size="heading-s">Default progressbar at 49.49%</GoabText>
                  <GoabLinearProgress progress={49.49}></GoabLinearProgress>
                </GoabBlock>
                <GoabBlock direction="column">
                  <GoabText size="heading-s">Default progressbar at 50.9%</GoabText>
                  <GoabLinearProgress progress={50.9}></GoabLinearProgress>
                </GoabBlock>
                <GoabBlock direction="column">
                  <GoabText size="heading-s">Default progressbar at 100%</GoabText>
                  <GoabLinearProgress progress={100}></GoabLinearProgress>
                </GoabBlock>
                <GoabBlock direction="column">
                  <GoabText size="heading-s">No percentage shown</GoabText>
                  <GoabLinearProgress
                    progress={25}
                    showPercentage={false}
                  ></GoabLinearProgress>
                </GoabBlock>
                <GoabBlock direction="column">
                  <GoabText size="heading-s" mb="0" mt="0">
                    Bouncing Progress
                  </GoabText>
                  <GoabText size="body-m" mb="0" mt="0">
                    Set progress to null
                  </GoabText>
                  <GoabLinearProgress
                    progress={null}
                    showPercentage={false}
                  ></GoabLinearProgress>
                  <GoabLinearProgress
                    progress={null}
                    showPercentage={true}
                  ></GoabLinearProgress>{" "}
                </GoabBlock>
              </div>
              {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

              <GoabText size="heading-m" mt="3xl" mb="2xl">
                Radio
              </GoabText>

              <GoabBlock gap="xl" mb="xl" direction="column">
                <GoabFormItem label="Basic radio">
                  <GoabRadioGroup
                    name="item"
                    value="1"
                    onChange={(e) => radio1(e.name, e.value)}
                  >
                    <GoabRadioItem value="1" label="Label 1"></GoabRadioItem>
                    <GoabRadioItem value="2" label="Label 2"></GoabRadioItem>
                    <GoabRadioItem value="3" label="Label 3"></GoabRadioItem>
                    <GoabRadioItem value="4" label="Label 4"></GoabRadioItem>
                  </GoabRadioGroup>
                </GoabFormItem>

                <GoabFormItem label="Radio with helper text" helpText="Helper text here">
                  <GoabRadioGroup
                    name="item"
                    value="1"
                    onChange={(e) => radio2(e.name, e.value)}
                  >
                    <GoabRadioItem value="1" label="Label 1"></GoabRadioItem>
                    <GoabRadioItem
                      value="2"
                      label="Label 2 that wraps to a long wide thing later Label 2 that wraps to a long wide thing later"
                    ></GoabRadioItem>
                    <GoabRadioItem value="3" label="Label 3"></GoabRadioItem>
                    <GoabRadioItem value="4" label="Label 4"></GoabRadioItem>
                  </GoabRadioGroup>
                </GoabFormItem>

                <GoabFormItem label="Radio with reveal" helpText="Helper text here">
                  <GoabRadioGroup
                    name="item"
                    value="1"
                    onChange={(e) => radio2(e.name, e.value)}
                  >
                    <GoabRadioItem value="1" label="Option 1">
                      <div slot="reveal">
                        <GoabFormItem label="Text input" helpText="Helper text here">
                          <GoabInput
                            name="name1"
                            value=""
                            width="40ch"
                            onChange={noop}
                          ></GoabInput>{" "}
                        </GoabFormItem>{" "}
                      </div>
                    </GoabRadioItem>
                    <GoabRadioItem value="2" label="Option 2">
                      {" "}
                      <div slot="reveal">
                        <GoabFormItem label="Text input" helpText="Helper text here">
                          <GoabInput
                            name="name1"
                            value=""
                            width="40ch"
                            onChange={noop}
                          ></GoabInput>{" "}
                        </GoabFormItem>{" "}
                      </div>
                    </GoabRadioItem>
                  </GoabRadioGroup>
                </GoabFormItem>

                <GoabFormItem label="Radio with helper text" helpText="Helper text here">
                  <GoabRadioGroup
                    disabled={true}
                    name="item"
                    value="1"
                    onChange={(e) => radio2(e.name, e.value)}
                  >
                    <GoabRadioItem value="1" label="Label 1"></GoabRadioItem>
                    <GoabRadioItem value="2" label="Label 2"></GoabRadioItem>
                    <GoabRadioItem value="3" label="Label 3"></GoabRadioItem>
                    <GoabRadioItem value="4" label="Label 4"></GoabRadioItem>
                  </GoabRadioGroup>
                </GoabFormItem>

                <GoabFormItem label="Radio items with descriptions">
                  <GoabRadioGroup
                    name="selectOne"
                    value="1"
                    onChange={(e) => radio3(e.name, e.value)}
                  >
                    <GoabRadioItem
                      value="1"
                      label="Option one"
                      description={
                        <span>
                          Help text with a <a href="#">link</a>.
                        </span>
                      }
                    />
                    <GoabRadioItem
                      value="2"
                      label="Option two"
                      description="description text"
                    />
                    <GoabRadioItem
                      value="3"
                      label="Option three"
                      description="another description text"
                    />
                  </GoabRadioGroup>
                </GoabFormItem>

                <GoabFormItem
                  label="Radio with descriptions and helper text"
                  helpText="Helper text here"
                >
                  <GoabRadioGroup
                    name="selectOne"
                    value="1"
                    onChange={(e) => radio3(e.name, e.value)}
                  >
                    <GoabRadioItem
                      value="1"
                      label="Option one"
                      description={
                        <span>
                          Help text with a <a href="#">link</a>.
                        </span>
                      }
                    />
                    <GoabRadioItem
                      value="2"
                      label="Option two"
                      description="description text"
                    />
                    <GoabRadioItem
                      value="3"
                      label="Option three"
                      description="another description text"
                    />
                  </GoabRadioGroup>
                </GoabFormItem>

                <GoabFormItem
                  label="Radio with error"
                  helpText="Helper text here"
                  error="Error message."
                >
                  <GoabRadioGroup
                    error={true}
                    name="item"
                    value="1"
                    onChange={(e) => radio2(e.name, e.value)}
                  >
                    <GoabRadioItem value="1" label="Label 1"></GoabRadioItem>
                    <GoabRadioItem value="2" label="Label 2"></GoabRadioItem>
                    <GoabRadioItem value="3" label="Label 3"></GoabRadioItem>
                    <GoabRadioItem value="4" label="Label 4"></GoabRadioItem>
                  </GoabRadioGroup>
                </GoabFormItem>

                <GoabFormItem label="Horizontal inputs" helpText="Helper text here">
                  <GoabRadioGroup
                    orientation="horizontal"
                    name="item"
                    value="1"
                    onChange={(e) => radio2(e.name, e.value)}
                  >
                    <GoabRadioItem value="1" label="Label 1"></GoabRadioItem>
                    <GoabRadioItem value="2" label="Label 2"></GoabRadioItem>
                  </GoabRadioGroup>
                </GoabFormItem>

                <GoabFormItem
                  label="Disabled radio with item descriptions"
                  helpText="Helper text here"
                >
                  <GoabRadioGroup
                    disabled={true}
                    name="item"
                    value="1"
                    onChange={(e) => radio2(e.name, e.value)}
                  >
                    <GoabRadioItem
                      value="1"
                      label="Label 1"
                      description="description text"
                    ></GoabRadioItem>
                    <GoabRadioItem value="2" label="Label 2"></GoabRadioItem>
                    <GoabRadioItem
                      value="3"
                      label="Label 3"
                      description="description text"
                    ></GoabRadioItem>
                    <GoabRadioItem value="4" label="Label 4"></GoabRadioItem>
                  </GoabRadioGroup>
                </GoabFormItem>

                <GoabFormItem
                  label="Disabled radio with error"
                  helpText="Helper text here"
                >
                  <GoabRadioGroup
                    disabled={true}
                    error={true}
                    name="item"
                    value="1"
                    onChange={(e) => radio2(e.name, e.value)}
                  >
                    <GoabRadioItem
                      value="1"
                      label="Label 1"
                      description="description text"
                    ></GoabRadioItem>
                    <GoabRadioItem value="2" label="Label 2"></GoabRadioItem>
                    <GoabRadioItem
                      value="3"
                      label="Label 3"
                      description="description text"
                    ></GoabRadioItem>
                    <GoabRadioItem value="4" label="Label 4"></GoabRadioItem>
                  </GoabRadioGroup>
                </GoabFormItem>
              </GoabBlock>

              {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

              <GoabText size="heading-m" mt="4xl" mb="xl">
                Scroll bar
              </GoabText>

              <GoabBlock gap="xl" mb="3xl" direction="column">
                <GoabButton
                  type="tertiary"
                  onClick={() => setContentModalScrollOpen(true)}
                >
                  Open modal with lots of content to see scroll bar
                </GoabButton>

                <GoabModal
                  heading="This is a modal with lots of content"
                  open={contentModalScrollOpen}
                  maxWidth="400px"
                  role="alertdialog"
                  actions={
                    <GoabButtonGroup alignment="end">
                      <GoabButton
                        type="tertiary"
                        onClick={() => setContentModalScrollOpen(false)}
                      >
                        Cancel
                      </GoabButton>
                      <GoabButton
                        type="primary"
                        onClick={() => {
                          setContentModalScrollOpen(false);
                        }}
                      >
                        Continue
                      </GoabButton>
                    </GoabButtonGroup>
                  }
                >
                  <p>
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll. This is a lot of content that make
                    the modal scroll. This is a lot of content that make the modal scroll.
                    This is a lot of content that make the modal scroll. This is a lot of
                    content that make the modal scroll.
                  </p>
                </GoabModal>
              </GoabBlock>

              {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

              <GoabText size="heading-m" mt="3xl" mb="xl">
                Side menu
              </GoabText>

              <GoabBlock gap="3xl" mb="xl" direction="column">
                <div style={{ maxWidth: "256px" }}>
                  <GoabSideMenu>
                    <a href="#">Home</a>
                    <a href="#">Profile</a>
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                    <GoabSideMenuGroup
                      heading="Group heading that goes longer"
                      icon="person"
                    >
                      <a href="#">Foo</a>
                      <a href="#">
                        Bar ndjkasndnsa dsadsajd saj djsad jkas dka djk jks adjksa djkas
                        dkjas djk askjd asjkd sajkd akjsd asd ksa djkas dja ds{" "}
                      </a>
                    </GoabSideMenuGroup>
                  </GoabSideMenu>
                </div>

                <GoabBlock gap="xl" direction="row">
                  <div style={{ maxWidth: "256px" }}>
                    <GoabSideMenu>
                      <GoabSideMenuHeading>
                        This is a side menu heading
                      </GoabSideMenuHeading>
                      <a href="#">This is a side menu item</a>
                      <a href="#">This is another side menu item</a>
                      <GoabSpacer vSpacing="m"></GoabSpacer>
                      <GoabSideMenuHeading>
                        This is another side menu heading
                      </GoabSideMenuHeading>
                      <a href="#">Side menu item</a>
                      <a href="#">Side menu item</a>
                      <GoabSpacer vSpacing="m"></GoabSpacer>
                      <GoabSideMenuHeading
                        meta={<GoabBadge type="midtone" content="Details"></GoabBadge>}
                      >
                        Side menu heading
                      </GoabSideMenuHeading>
                      <GoabSideMenuGroup heading="This is a side menu group">
                        <a href="#">Foo</a>
                        <a href="#">Bar</a>
                      </GoabSideMenuGroup>
                      <GoabSideMenuGroup heading="This is a side menu group">
                        <a href="#">Foo</a>
                        <a href="#">Bar</a>
                        <GoabSideMenuGroup heading="This is a side menu group">
                          <a href="#">Foo</a>
                          <a href="#">Bar</a>
                          <GoabSideMenuGroup heading="This is a side menu group">
                            <a href="#">Foo</a>
                            <a href="#">Bar</a>
                          </GoabSideMenuGroup>
                        </GoabSideMenuGroup>
                      </GoabSideMenuGroup>
                    </GoabSideMenu>
                  </div>

                  <div style={{ maxWidth: "256px" }}>
                    <GoabSideMenu>
                      <GoabSideMenuHeading icon="home">Nav section 1</GoabSideMenuHeading>
                      <a href="#">Home</a>
                      <a href="#">Profile</a>
                      <GoabSpacer vSpacing="m"></GoabSpacer>
                      <GoabSideMenuHeading icon="pencil">
                        Nav section 2
                      </GoabSideMenuHeading>
                      <a href="#">About</a>
                      <a href="#">Contact</a>
                      <GoabSpacer vSpacing="m"></GoabSpacer>
                      <GoabSideMenuHeading>Nav with sub nav</GoabSideMenuHeading>
                      <GoabSideMenuGroup heading="Group heading" icon="person">
                        <a href="#">Foo</a>
                        <a href="#">
                          Bar ndjkasndnsa dsadsajd saj djsad jkas dka djk jks adjksa djkas
                          dkjas djk askjd asjkd sajkd akjsd asd ksa djkas dja ds
                        </a>
                      </GoabSideMenuGroup>
                    </GoabSideMenu>
                  </div>
                </GoabBlock>
              </GoabBlock>

              {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

              <GoabText size="heading-m" mt="3xl" mb="xl">
                Table
              </GoabText>

              <GoabBlock gap="2xl" mb="xl" direction="column">
                <GoabTable width="100%">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Text</th>
                      <th className="Goab-table-number-header">Number</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <GoabBadge
                          type="information"
                          content="Badge text"
                          mt="2xs"
                        ></GoabBadge>
                      </td>
                      <td>Lorem ipsum</td>
                      <td className="Goab-table-number-column">1234567890</td>
                      <td>
                        <GoabButton type="tertiary" size="compact">
                          Action
                        </GoabButton>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <GoabBadge
                          type="information"
                          content="Badge text"
                          mt="2xs"
                        ></GoabBadge>
                      </td>
                      <td>Lorem ipsum</td>
                      <td className="Goab-table-number-column">1234567890</td>
                      <td>
                        <GoabButton type="tertiary" size="compact">
                          Action
                        </GoabButton>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <GoabBadge
                          type="information"
                          content="Badge text"
                          mt="2xs"
                        ></GoabBadge>
                      </td>
                      <td>Lorem ipsum</td>
                      <td className="Goab-table-number-column">1234567890</td>
                      <td>
                        <GoabButton type="tertiary" size="compact">
                          Action
                        </GoabButton>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <GoabBadge
                          type="information"
                          content="Badge text"
                          mt="2xs"
                        ></GoabBadge>
                      </td>
                      <td>Lorem ipsum</td>
                      <td className="Goab-table-number-column">1234567890</td>
                      <td>
                        <GoabButton type="tertiary" size="compact">
                          Action
                        </GoabButton>
                      </td>
                    </tr>
                  </tbody>
                </GoabTable>

                <GoabTable width="100%" variant="relaxed">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Text</th>
                      <th className="Goab-table-number-header">Number</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <GoabBadge
                          type="information"
                          content="Badge text"
                          mt="2xs"
                        ></GoabBadge>
                      </td>
                      <td>Lorem ipsum</td>
                      <td className="Goab-table-number-column">1234567890</td>
                      <td>
                        <GoabButton type="tertiary" size="compact">
                          Action
                        </GoabButton>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <GoabBadge
                          type="information"
                          content="Badge text"
                          mt="2xs"
                        ></GoabBadge>
                      </td>
                      <td>Lorem ipsum</td>
                      <td className="Goab-table-number-column">1234567890</td>
                      <td>
                        <GoabButton type="tertiary" size="compact">
                          Action
                        </GoabButton>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <GoabBadge
                          type="information"
                          content="Badge text"
                          mt="2xs"
                        ></GoabBadge>
                      </td>
                      <td>Lorem ipsum</td>
                      <td className="Goab-table-number-column">1234567890</td>
                      <td>
                        <GoabButton type="tertiary" size="compact">
                          Action
                        </GoabButton>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <GoabBadge
                          type="information"
                          content="Badge text"
                          mt="2xs"
                        ></GoabBadge>
                      </td>
                      <td>Lorem ipsum</td>
                      <td className="Goab-table-number-column">1234567890</td>
                      <td>
                        <GoabButton type="tertiary" size="compact">
                          Action
                        </GoabButton>
                      </td>
                    </tr>
                  </tbody>
                </GoabTable>

                <GoabTable onSort={(e) => sortData(e.sortBy, e.sortDir)}>
                  <thead>
                    <tr>
                      <th>
                        <GoabTableSortHeader name="firstName">
                          First name
                        </GoabTableSortHeader>
                      </th>
                      <th>
                        <GoabTableSortHeader name="lastName">
                          Last name
                        </GoabTableSortHeader>
                      </th>
                      <th>
                        <GoabTableSortHeader name="age" direction="asc">
                          Age
                        </GoabTableSortHeader>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.firstName}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.age}</td>
                      </tr>
                    ))}
                  </tbody>
                </GoabTable>
              </GoabBlock>

              {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

              <GoabText size="heading-m" mt="3xl" mb="2xl">
                Tabs
              </GoabText>

              <GoabBlock gap="xl" mb="xl" direction="column">
                <GoabTabs>
                  <GoabTab heading="Tab 1">
                    Tab 1 content: Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </GoabTab>
                  <GoabTab heading="Tab 2 that has a longer name that wraps all thw ay to asdksnadnasda sad sadkasnd asd asd">
                    Tab 2 content: Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </GoabTab>
                  <GoabTab heading="Tab 3">
                    Tab 3 content: Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </GoabTab>
                </GoabTabs>

                <GoabTabs>
                  <GoabTab heading="Tab with a tooltip">
                    <GoabTooltip content="Tooltip">
                      <GoabIcon type="information-circle"></GoabIcon>
                    </GoabTooltip>
                  </GoabTab>
                  <GoabTab heading="Tab">No content</GoabTab>
                </GoabTabs>
              </GoabBlock>

              {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

              <GoabText size="heading-m" mt="4xl" mb="2xl">
                Text area
              </GoabText>

              <GoabBlock gap="2xl" mb="xl" direction="column">
                <GoabFormItem label="Basic text area" labelSize="regular">
                  <GoabTextarea
                    countBy="character"
                    width="60ch"
                    name="item"
                    value={value}
                    onChange={onChangeTextArea}
                  ></GoabTextarea>
                </GoabFormItem>

                <GoabFormItem label="Text area 100% width" labelSize="regular">
                  <GoabTextarea
                    placeholder="placeholder content"
                    countBy="character"
                    width="100%"
                    name="item"
                    value={value}
                    onChange={onChangeTextArea}
                  ></GoabTextarea>
                </GoabFormItem>

                <GoabFormItem
                  label="Text area with a character counter"
                  labelSize="regular"
                >
                  <GoabTextarea
                    countBy="character"
                    maxCount={30}
                    width="60ch"
                    name="item"
                    value={value}
                    onChange={onChangeTextArea}
                  ></GoabTextarea>
                </GoabFormItem>

                <GoabFormItem label="Text area with a word counter" labelSize="regular">
                  <GoabTextarea
                    countBy="word"
                    maxCount={30}
                    width="60ch"
                    name="item"
                    value={value}
                    onChange={onChangeTextArea}
                  ></GoabTextarea>
                </GoabFormItem>

                <GoabFormItem
                  label="Text area with an error"
                  requirement="optional"
                  helpText="Here is some helper text"
                  error="Error message."
                >
                  <GoabTextarea
                    error={true}
                    rows={3}
                    name="item"
                    countBy="word"
                    maxCount={100}
                    value={value}
                    onChange={onChangeTextArea}
                    width="80ch"
                  ></GoabTextarea>
                </GoabFormItem>

                <GoabFormItem
                  label="Text area that's disabled"
                  requirement="optional"
                  helpText="Here is some helper text"
                >
                  <GoabTextarea
                    disabled={true}
                    rows={3}
                    name="item"
                    countBy="character"
                    maxCount={100}
                    value={value}
                    onChange={onChangeTextArea}
                  ></GoabTextarea>
                </GoabFormItem>

                <GoabFormItem
                  label="Text area that's read only"
                  requirement="optional"
                  helpText="Here is some helper text"
                >
                  <GoabTextarea
                    rows={3}
                    readOnly={true}
                    name="item"
                    countBy="character"
                    maxCount={100}
                    value={value}
                    onChange={onChangeTextArea}
                  ></GoabTextarea>
                </GoabFormItem>

                <GoabContainer>
                  <GoabFormItem
                    label="Text area in a container"
                    requirement="optional"
                    helpText="Here is some helper text"
                  >
                    <GoabTextarea
                      rows={6}
                      name="item"
                      value={value}
                      onChange={onChangeTextArea}
                      width="80ch"
                    ></GoabTextarea>
                  </GoabFormItem>
                </GoabContainer>
              </GoabBlock>

              {/* Component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

              <GoabText size="heading-m" mt="4xl" mb="xl">
                Tooltip
              </GoabText>

              <GoabBlock gap="xl" mb="3xl" direction="column">
                <GoabTooltip content="Tooltip">
                  <GoabIcon type="information-circle"></GoabIcon>
                </GoabTooltip>

                <GoabTooltip content="Tooltip that has more content that wraps to a new line">
                  <GoabIcon type="information-circle"></GoabIcon>
                </GoabTooltip>

                <GoabTooltip content="Tooltip with bottom position" position="bottom">
                  <GoabIcon type="arrow-down"></GoabIcon>
                </GoabTooltip>

                <GoabTooltip content="Tooltip with right position" position="left">
                  <GoabIcon type="arrow-forward"></GoabIcon>
                </GoabTooltip>

                <GoabTooltip content="Tooltip on an icon button">
                  <GoabIconButton
                    variant="color"
                    size="medium"
                    icon="help-circle"
                    ariaLabel="Tooltip"
                  ></GoabIconButton>
                </GoabTooltip>
              </GoabBlock>

              <GoabSpacer vSpacing="4xl"></GoabSpacer>
            </GoabTab>

            {/* TAB ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

            <GoabTab heading="Inputs">
              <GoabBlock gap="2xl" direction="column" mt="none" mb="4xl">
                <GoabFormItem
                  label="Text"
                  helpText="Give information that is a small amount of text or numbers."
                >
                  <GoabInput
                    name="name1"
                    type="text"
                    value=""
                    width="20ch"
                    onChange={noop}
                  ></GoabInput>
                </GoabFormItem>

                <GoabFormItem
                  label="Text area"
                  helpText="Give information that is a large amount of text."
                >
                  <GoabTextarea
                    name="text area"
                    rows={5}
                    width="600px"
                    countBy="character"
                    maxCount={300}
                    onChange={noop}
                  ></GoabTextarea>
                </GoabFormItem>

                <GoabFormItem label="Upload" helpText="Give one or more files.">
                  {/* TODO: add file cards on upload file. eslint-disable-next-line @typescript-eslint/no-empty-function */}
                  <GoabFileUploadInput
                    maxFileSize="100MB"
                    variant="dragdrop"
                    onSelectFile={(file) => console.log(file)}
                  />
                </GoabFormItem>

                <GoabFormItem
                  label="Radio"
                  helpText="Choose one option from a small number of choices."
                >
                  <GoabRadioGroup
                    name="school"
                    ariaLabel="are you currently in school?"
                    onChange={noop}
                  >
                    <GoabRadioItem value="yes" label="Yes"></GoabRadioItem>
                    <GoabRadioItem value="no" label="No"></GoabRadioItem>
                  </GoabRadioGroup>
                </GoabFormItem>

                <GoabFormItem
                  label="Dropdown"
                  helpText="Choose one option from a longer list of choices."
                >
                  <GoabDropdown
                    name="item"
                    value=""
                    placeholder="—Select an option—"
                    onChange={noop}
                  >
                    <GoabDropdownItem
                      value="red"
                      label="20ch 000000000000000"
                    ></GoabDropdownItem>
                    <GoabDropdownItem value="green" label="abc"></GoabDropdownItem>
                    <GoabDropdownItem value="blue" label="MMM"></GoabDropdownItem>
                  </GoabDropdown>
                </GoabFormItem>

                <GoabFormItem
                  label="Filterable dropdown"
                  helpText="Choose one option from a very long list of choices."
                >
                  <GoabDropdown
                    name="item"
                    value=""
                    filterable={true}
                    leadingIcon="search"
                    onChange={noop}
                  >
                    <GoabDropdownItem
                      value="red"
                      label="bcdefghijklmnopqrstuvwxyz"
                    ></GoabDropdownItem>
                    <GoabDropdownItem value="green" label="abcd"></GoabDropdownItem>
                    <GoabDropdownItem value="blue" label="abcde"></GoabDropdownItem>
                  </GoabDropdown>
                </GoabFormItem>

                <GoabFormItem
                  label="Checkbox list"
                  helpText="Choose one or more options from a small number of choices."
                >
                  <GoabCheckbox name="item 1" text="Option 1" value=""></GoabCheckbox>
                  <GoabCheckbox name="item 2" text="Option 2" value=""></GoabCheckbox>
                  <GoabCheckbox
                    name="item 3"
                    text="Option 3"
                    value=""
                    mb="none"
                  ></GoabCheckbox>
                </GoabFormItem>

                <GoabFormItem
                  label="Checkbox"
                  helpText="Give consent or agree to something."
                >
                  <GoabCheckbox
                    name="item 1"
                    text="I agree to allow the corporation to use my likeness in perpetuity..."
                    value=""
                    mb="none"
                  ></GoabCheckbox>
                </GoabFormItem>

                <GoabFormItem label="Date" helpText="Choose a date from a calendar.">
                  <GoabDatePicker
                    name="item"
                    value={new Date(2024, 8, 27)}
                    onChange={noop}
                  ></GoabDatePicker>
                </GoabFormItem>
              </GoabBlock>
            </GoabTab>

            {/* TAB ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            <GoabTab heading="Tables">
              <GoabBlock gap="xl" mb="xl" direction="column">
                <GoabTable width="100%">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Text</th>
                      <th className="Goab-table-number-header">Number</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <GoabBadge
                          type="information"
                          content="Badge"
                          mt="2xs"
                        ></GoabBadge>
                      </td>
                      <td>Lorem ipsum</td>
                      <td className="Goab-table-number-column">1234567890</td>
                      <td>
                        <GoabButton type="tertiary" size="compact">
                          Action
                        </GoabButton>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <GoabBadge
                          type="information"
                          content="Badge text"
                          mt="2xs"
                        ></GoabBadge>
                      </td>
                      <td>
                        Text that runs really really really really really really really
                        really really really really really really really really really
                        really really really really really really really really really
                        really really really really really really really really really
                        really really long{" "}
                      </td>
                      <td className="Goab-table-number-column">1234567890</td>
                      <td>
                        <GoabButton type="tertiary" size="compact">
                          Action
                        </GoabButton>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <GoabBadge
                          type="information"
                          content="Badge text"
                          mt="2xs"
                        ></GoabBadge>
                      </td>
                      <td>Lorem ipsum</td>
                      <td className="Goab-table-number-column">1234567890</td>
                      <td>
                        <GoabButton type="tertiary" size="compact">
                          Action
                        </GoabButton>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <GoabBadge
                          type="information"
                          content="Badge text"
                          mt="2xs"
                        ></GoabBadge>
                      </td>
                      <td>Lorem ipsum</td>
                      <td className="Goab-table-number-column">1234567890</td>
                      <td>
                        <GoabButton type="tertiary" size="compact">
                          Action
                        </GoabButton>
                      </td>
                    </tr>
                  </tbody>
                </GoabTable>

                <GoabTable width="100%" variant="relaxed">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Text</th>
                      <th className="Goab-table-number-header">Number</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <GoabBadge
                          type="information"
                          content="Badge text"
                          mt="2xs"
                        ></GoabBadge>
                      </td>
                      <td>
                        Text that runs really really really really really really really
                        really really really really really really really really really
                        really really really really really really really really really
                        really really really really really really really really really
                        really really long
                      </td>
                      <td className="Goab-table-number-column">1234567890</td>
                      <td>
                        <GoabButton type="tertiary" size="compact">
                          Action
                        </GoabButton>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <GoabBadge
                          type="information"
                          content="Badge text"
                          mt="2xs"
                        ></GoabBadge>
                      </td>
                      <td>Lorem ipsum</td>
                      <td className="Goab-table-number-column">1234567890</td>
                      <td>
                        <GoabButton type="tertiary" size="compact">
                          Action
                        </GoabButton>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <GoabBadge
                          type="information"
                          content="Badge text"
                          mt="2xs"
                        ></GoabBadge>
                      </td>
                      <td>Lorem ipsum</td>
                      <td className="Goab-table-number-column">1234567890</td>
                      <td>
                        <GoabButton type="tertiary" size="compact">
                          Action
                        </GoabButton>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <GoabBadge
                          type="information"
                          content="Badge text"
                          mt="2xs"
                        ></GoabBadge>
                      </td>
                      <td>Lorem ipsum</td>
                      <td className="Goab-table-number-column">1234567890</td>
                      <td>
                        <GoabButton type="tertiary" size="compact">
                          Action
                        </GoabButton>
                      </td>
                    </tr>
                  </tbody>
                </GoabTable>

                <GoabTable onSort={(e) => sortData(e.sortBy, e.sortDir)}>
                  <thead>
                    <tr>
                      <th>First name</th>
                      <th>
                        <GoabTableSortHeader name="lastName">
                          Last name
                        </GoabTableSortHeader>
                      </th>
                      <th>
                        <GoabTableSortHeader name="age" direction="asc">
                          Age
                        </GoabTableSortHeader>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.firstName}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.age}</td>
                      </tr>
                    ))}
                  </tbody>
                </GoabTable>
              </GoabBlock>
            </GoabTab>

            {/* TAB ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

            <GoabTab heading="List">
              <a href="#" className="back-link">
                {" "}
                Back link{" "}
              </a>

              {/* Apply max width to input, not form item for fixed width inputs. */}

              <GoabText as="h2" size="heading-xl" mt="xl" mb="none">
                Heading extra large as page h1
              </GoabText>

              <GoabText size="heading-l" mt="2xl" mb="none">
                Heading large
              </GoabText>

              <GoabText size="heading-m" mt="2xl" mb="none">
                Heading medium
              </GoabText>

              <GoabText size="heading-s" mt="2xl" mb="none">
                Heading small
              </GoabText>

              <GoabText size="heading-xs" mt="2xl" mb="none">
                Heading extra small
              </GoabText>

              <GoabText size="body-l" mt="xl" mb="none">
                Body large Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                rutrum dignissim erat quis iaculis.
              </GoabText>

              <GoabText size="body-m" mt="l" mb="xl">
                Body medium text, lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec rutrum dignissim erat quis iaculis.
              </GoabText>

              <GoabText size="body-s" mt="l" mb="xl">
                Body small text, lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec rutrum dignissim erat quis iaculis.
              </GoabText>

              <GoabText size="body-xs" mt="l" mb="xl">
                Body extra small text, lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Donec rutrum dignissim erat quis iaculis.
              </GoabText>

              <GoabText as="h3" size="heading-l" mt="3xl" mb="4xl">
                Text component with margin top and bottom
              </GoabText>

              <GoabText as="h3" size="heading-l" mt="4xl">
                Text component with margin top
              </GoabText>

              <GoabText as="h3" size="heading-l" mb="4xl">
                Text component with margin bottom
              </GoabText>
            </GoabTab>

            {/* TAB ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            <GoabTab heading="Skeleton loading">
              <GoabBlock gap="xl" mb="xl" direction="column">
                <GoabText size="heading-s" mt="none" mb="m">
                  Image
                </GoabText>
                <GoabSkeleton type="image" size={"1"}></GoabSkeleton>
                <GoabSkeleton type="image" size={"2"}></GoabSkeleton>
                <GoabSkeleton type="image" size={"3"}></GoabSkeleton>
                <GoabSkeleton type="image" size={"4"}></GoabSkeleton>

                <GoabText size="heading-s" mt="3xl" mb="m">
                  Text
                </GoabText>
                <GoabSkeleton type="text" size={"1"}></GoabSkeleton>
                <GoabSkeleton type="text" size={"2"}></GoabSkeleton>
                <GoabSkeleton type="text" size={"3"}></GoabSkeleton>
                <GoabSkeleton type="text" size={"4"}></GoabSkeleton>

                <GoabText size="heading-s" mt="3xl" mb="m">
                  Title
                </GoabText>
                <GoabSkeleton type="title" size={"1"}></GoabSkeleton>
                <GoabSkeleton type="title" size={"2"}></GoabSkeleton>
                <GoabSkeleton type="title" size={"3"}></GoabSkeleton>
                <GoabSkeleton type="title" size={"4"}></GoabSkeleton>

                <GoabText size="heading-s" mt="3xl" mb="m">
                  Text-small
                </GoabText>
                <GoabSkeleton type="text-small" size={"1"}></GoabSkeleton>
                <GoabSkeleton type="text-small" size={"2"}></GoabSkeleton>
                <GoabSkeleton type="text-small" size={"3"}></GoabSkeleton>
                <GoabSkeleton type="text-small" size={"4"}></GoabSkeleton>

                <GoabText size="heading-s" mt="3xl" mb="m">
                  Avatar
                </GoabText>
                <GoabSkeleton type="avatar" size={"1"}></GoabSkeleton>
                <GoabSkeleton type="avatar" size={"2"}></GoabSkeleton>
                <GoabSkeleton type="avatar" size={"3"}></GoabSkeleton>
                <GoabSkeleton type="avatar" size={"4"}></GoabSkeleton>

                <GoabText size="heading-s" mt="3xl" mb="m">
                  Header
                </GoabText>
                <GoabSkeleton type="header" size={"1"}></GoabSkeleton>
                <GoabSkeleton type="header" size={"2"}></GoabSkeleton>
                <GoabSkeleton type="header" size={"3"}></GoabSkeleton>
                <GoabSkeleton type="header" size={"4"}></GoabSkeleton>

                <GoabText size="heading-s" mt="3xl" mb="m">
                  Paragraph
                </GoabText>
                <GoabSkeleton type="paragraph" size={"1"}></GoabSkeleton>
                <GoabSkeleton type="paragraph" size={"2"}></GoabSkeleton>
                <GoabSkeleton type="paragraph" size={"3"}></GoabSkeleton>
                <GoabSkeleton type="paragraph" size={"4"}></GoabSkeleton>

                <GoabText size="heading-s" mt="3xl" mb="m">
                  Thumbnail
                </GoabText>
                <GoabSkeleton type="thumbnail" size={"1"}></GoabSkeleton>
                <GoabSkeleton type="thumbnail" size={"2"}></GoabSkeleton>
                <GoabSkeleton type="thumbnail" size={"3"}></GoabSkeleton>
                <GoabSkeleton type="thumbnail" size={"4"}></GoabSkeleton>

                <GoabText size="heading-s" mt="3xl" mb="m">
                  Card
                </GoabText>
                <GoabSkeleton type="card" size={"1"} maxWidth="360px"></GoabSkeleton>
                <GoabSkeleton type="card" size={"2"}></GoabSkeleton>
                <GoabSkeleton type="card" size={"3"}></GoabSkeleton>
                <GoabSkeleton type="card" size={"4"}></GoabSkeleton>

                <GoabText size="heading-s" mt="3xl" mb="m">
                  Profile
                </GoabText>
                <GoabSkeleton type="profile" size={"1"}></GoabSkeleton>
                <GoabSkeleton type="profile" size={"2"}></GoabSkeleton>
                <GoabSkeleton type="profile" size={"3"}></GoabSkeleton>
                <GoabSkeleton type="profile" size={"4"}></GoabSkeleton>
              </GoabBlock>
            </GoabTab>
          </GoabTabs>
        </GoabPageBlock>
      </section>

      <section slot="footer">
        <GoabAppFooter url="http://localhost:4200" maxContentWidth="100%">
          <GoabAppFooterNavSection maxColumnCount={1} heading="Heading">
            <a href="g.html">Link 123we</a>
            <a href="h.html">Link 2</a>
            <a href="i.html">Link 3</a>
            <a href="j.html">Other thing</a>
          </GoabAppFooterNavSection>
          <GoabAppFooterNavSection maxColumnCount={1} heading="Heading">
            <a href="g.html">Link 123we</a>
            <a href="h.html">Link 2</a>
            <a href="i.html">Link 3</a>
            <a href="j.html">Other thing</a>
          </GoabAppFooterNavSection>
          <GoabAppFooterMetaSection>
            <a href="privacy.html">Meta link</a>
            <a href="disclaimer.html">Meta link</a>
            <a href="accessibility.html">Meta link</a>
            <a href="using-alberta.html">Meta link</a>
          </GoabAppFooterMetaSection>
        </GoabAppFooter>

        <GoabAppFooter maxContentWidth="100%"> </GoabAppFooter>
        <GoabAppFooter maxContentWidth="100%" url="http://localhost:4200">
          {" "}
        </GoabAppFooter>

        <GoabAppFooter url="" maxContentWidth="100%">
          <GoabAppFooterMetaSection>
            <a href="privacy.html">Meta link</a>
            <a href="disclaimer.html">Meta link</a>
            <a href="accessibility.html">Meta link</a>
            <a href="using-alberta.html">Meta link</a>
          </GoabAppFooterMetaSection>
        </GoabAppFooter>

        <GoabAppFooter maxContentWidth="100%">
          <GoabAppFooterNavSection maxColumnCount={1}>
            <a href="g.html">Link 1</a>
            <a href="h.html">Link 2</a>
            <a href="i.html">Link 3</a>
            <a href="j.html">Other thing</a>
          </GoabAppFooterNavSection>
        </GoabAppFooter>
      </section>
    </GoabOneColumnLayout>
  );
}

export default AllComponents;
