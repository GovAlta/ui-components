import React, { useState } from "react";
import {
  GoabBlock,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabInput,
  GoabText,
} from "@abgov/react-components";
import { GoabDropdownOnChangeDetail } from "@abgov/ui-components-common";

// US State Capitals
const US_CAPITALS = [
  { value: "montgomery", label: "Montgomery" },
  { value: "juneau", label: "Juneau" },
  { value: "phoenix", label: "Phoenix" },
  { value: "Little Rock" },
  { value: "sacramento", label: "Sacramento" },
  { value: "denver", label: "Denver" },
  { value: "hartford", label: "Hartford" },
  { value: "dover", label: "Dover" },
  { value: "tallahassee", label: "Tallahassee" },
  { value: "atlanta", label: "Atlanta" },
  { value: "honolulu", label: "Honolulu" },
  { value: "boise", label: "Boise" },
  { value: "springfield", label: "Springfield" },
  { value: "indianapolis", label: "Indianapolis" },
  { value: "des-moines", label: "Des Moines" },
  { value: "topeka", label: "Topeka" },
  { value: "frankfort", label: "Frankfort" },
  { value: "baton-rouge", label: "Baton Rouge" },
  { value: "augusta", label: "Augusta" },
  { value: "annapolis", label: "Annapolis" },
  { value: "boston", label: "Boston" },
  { value: "lansing", label: "Lansing" },
  { value: "saint-paul", label: "Saint Paul" },
  { value: "jackson", label: "Jackson" },
  { value: "jefferson-city", label: "Jefferson City" },
  { value: "helena", label: "Helena" },
  { value: "lincoln", label: "Lincoln" },
  { value: "carson-city", label: "Carson City" },
  { value: "concord", label: "Concord" },
  { value: "trenton", label: "Trenton" },
  { value: "santa-fe", label: "Santa Fe" },
  { value: "albany", label: "Albany" },
  { value: "raleigh", label: "Raleigh" },
  { value: "bismarck", label: "Bismarck" },
  { value: "columbus", label: "Columbus" },
  { value: "oklahoma-city", label: "Oklahoma City" },
  { value: "salem", label: "Salem" },
  { value: "harrisburg", label: "Harrisburg" },
  { value: "providence", label: "Providence" },
  { value: "columbia", label: "Columbia" },
  { value: "pierre", label: "Pierre" },
  { value: "nashville", label: "Nashville" },
  { value: "austin", label: "Austin" },
  { value: "salt-lake-city", label: "Salt Lake City" },
  { value: "montpelier", label: "Montpelier" },
  { value: "richmond", label: "Richmond" },
  { value: "olympia", label: "Olympia" },
  { value: "charleston", label: "Charleston" },
  { value: "madison", label: "Madison" },
  { value: "cheyenne", label: "Cheyenne" },
];

export function Bug2852Route() {
  const [selectedCapital, setSelectedCapital] = useState<string>("");

  const handleChange = (detail: GoabDropdownOnChangeDetail) => {
    console.log("Dropdown changed:", detail);
    setSelectedCapital(detail.value || "");
  };

  return (
    <div style={{ width: "1024px", margin: "0 auto" }}>
      <GoabText size="heading-l" mb="xl">
        Bug #2852: FormItem with Filterable Dropdown Test
      </GoabText>
      <GoabBlock gap="l" direction="column">
        <GoabFormItem label="Select US State Capital">
          <GoabDropdown
            name="us-capitals"
            value={selectedCapital}
            onChange={handleChange}
            filterable={true}
            placeholder="Search for a state capital..."
          >
            {US_CAPITALS.map((capital) => (
              <GoabDropdownItem
                key={capital.value}
                value={capital.value}
                label={capital.label}
              />
            ))}
          </GoabDropdown>
        </GoabFormItem>
        <GoabText size="body-m">
          Selected Capital:{" "}
          {selectedCapital
            ? US_CAPITALS.find((c) => c.value === selectedCapital)?.label
            : "None"}
        </GoabText>
        <GoabFormItem label="Control Input">
          <GoabInput name="control-input" placeholder="This is a control input" />
        </GoabFormItem>
        <GoabFormItem label="Dropdown without Filterable">
          <GoabDropdown
            name="us-capitals"
            value={selectedCapital}
            onChange={handleChange}
            filterable={false}
            placeholder="Search for a state capital..."
          >
            {US_CAPITALS.map((capital) => (
              <GoabDropdownItem
                key={capital.value}
                value={capital.value}
                label={capital.label}
              />
            ))}
          </GoabDropdown>
        </GoabFormItem>
      </GoabBlock>
    </div>
  );
}
