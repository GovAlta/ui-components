import { useState } from "react";
import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
  GoabBadge,
  GoabDropdown,
  GoabDropdownItem,
} from "@abgov/react-components";

type Person = {
  value: string;
  name: string;
  role: string;
  location: string;
  status: "information" | "success" | "emergency";
  statusText: string;
};

const people: Person[] = [
  {
    value: "sarah",
    name: "Sarah Johnson",
    role: "Case worker",
    location: "Edmonton",
    status: "success",
    statusText: "Available",
  },
  {
    value: "michael",
    name: "Michael Chen",
    role: "Supervisor",
    location: "Calgary",
    status: "information",
    statusText: "In a meeting",
  },
  {
    value: "amara",
    name: "Amara Okafor",
    role: "Case worker",
    location: "Red Deer",
    status: "emergency",
    statusText: "On leave",
  },
];

function PersonItem({ person }: { person: Person }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      <strong>{person.name}</strong>
      <span>
        {person.role} &middot; {person.location}
      </span>
      <GoabBadge type={person.status} content={person.statusText} />
    </div>
  );
}

export function Feat1351Route() {
  const [basicValue, setBasicValue] = useState<string | undefined>();
  const [filterValue, setFilterValue] = useState<string | undefined>();
  const [mixedValue, setMixedValue] = useState<string | undefined>();
  const [nativeValue, setNativeValue] = useState<string | undefined>();

  return (
    <div>
      <GoabText tag="h1" mt="m">
        Feat #1351: Dropdown item slot
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a
            href="https://github.com/GovAlta/ui-components/issues/1351"
            target="_blank"
            rel="noopener"
          >
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            The ability to have a slot for Dropdown Items that can be filled
            with anything (HTML). This needs to be supported for the filterable
            property (Combobox), where any/all text included in the slot is
            filterable. Multiple line support, icon and badge to indicate
            status. The label property is shown in the input once an item is
            selected.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3">Test 1: Base dropdown with rich item content</GoabText>
      <GoabText tag="p">
        Each item renders multi-line content with a name, role, location and a
        status badge. Selecting an item shows its label in the input.
      </GoabText>
      <GoabDropdown
        name="basic"
        value={basicValue}
        width="360px"
        onChange={(detail) => setBasicValue(detail.value)}
      >
        {people.map((person) => (
          <GoabDropdownItem
            key={person.value}
            value={person.value}
            label={person.name}
          >
            <PersonItem person={person} />
          </GoabDropdownItem>
        ))}
      </GoabDropdown>
      <GoabText tag="p">Selected value: {basicValue || "(none)"}</GoabText>

      <GoabText tag="h3">Test 2: Filterable (combobox) with rich item content</GoabText>
      <GoabText tag="p">
        All text within the slot is filterable: try typing a name (Sarah), a
        role (Supervisor) or a location (Red Deer). Text rendered inside a
        nested component's own shadow DOM (like the badge content) is not part
        of the slot text; use the filter property to add extra search terms.
      </GoabText>
      <GoabDropdown
        name="filterable"
        value={filterValue}
        filterable={true}
        width="360px"
        onChange={(detail) => setFilterValue(detail.value)}
      >
        {people.map((person) => (
          <GoabDropdownItem
            key={person.value}
            value={person.value}
            label={person.name}
          >
            <PersonItem person={person} />
          </GoabDropdownItem>
        ))}
      </GoabDropdown>
      <GoabText tag="p">Selected value: {filterValue || "(none)"}</GoabText>

      <GoabText tag="h3">Test 3: Mixed rich and label-only items, filter override</GoabText>
      <GoabText tag="p">
        Plain label items work alongside rich items. The first item overrides
        the search text of its slot content with the filter property
        ("preferred"): typing "preferred" matches it, and so does typing
        "Sarah", because the label is always searchable. Typing "Edmonton"
        does not match, because the filter property replaced the slot text.
      </GoabText>
      <GoabDropdown
        name="mixed"
        value={mixedValue}
        filterable={true}
        width="360px"
        onChange={(detail) => setMixedValue(detail.value)}
      >
        <GoabDropdownItem value="sarah" label="Sarah Johnson" filter="preferred">
          <PersonItem person={people[0]} />
        </GoabDropdownItem>
        <GoabDropdownItem value="plain-1" label="Plain item one" />
        <GoabDropdownItem value="plain-2" label="Plain item two" />
      </GoabDropdown>
      <GoabText tag="p">Selected value: {mixedValue || "(none)"}</GoabText>

      <GoabText tag="h3">Test 4: Native select with rich items</GoabText>
      <GoabText tag="p">
        A native select cannot contain HTML, so slotted content is ignored and
        each option falls back to its label. The rich content must not leak
        into the page around the select.
      </GoabText>
      <GoabDropdown
        name="native"
        value={nativeValue}
        native={true}
        width="360px"
        onChange={(detail) => setNativeValue(detail.value)}
      >
        {people.map((person) => (
          <GoabDropdownItem
            key={person.value}
            value={person.value}
            label={person.name}
          >
            <PersonItem person={person} />
          </GoabDropdownItem>
        ))}
      </GoabDropdown>
      <GoabText tag="p">Selected value: {nativeValue || "(none)"}</GoabText>
    </div>
  );
}
