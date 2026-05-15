import { useState } from "react";
import {
  GoabBlock,
  GoabButton,
  GoabFilterChip,
  GoabFormItem,
  GoabInput,
} from "@abgov/react-components";

export function DocsFilterChipRoute() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [chips, setChips] = useState(["Chip 1", "Chip 2", "Chip 3"]);
  const [typedChips, setTypedChips] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleToggle = () => {
    console.log("toggled");
  };

  const setFilter = (filter: string) => {
    console.log("filter:", filter);
  };

  const addFilter = () => {
    const randomFilter = `Filter ${Math.floor(Math.random() * 100)}`;
    if (!activeFilters.includes(randomFilter)) {
      setActiveFilters((prevFilters) => [...prevFilters, randomFilter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters((prevFilters) => prevFilters.filter((f) => f !== filter));
  };

  const deleteChip = (chip: string) => {
    setChips((prevChips) => prevChips.filter((c) => c !== chip));
  };

  const addChip = () => {
    if (inputValue.trim()) {
      setTypedChips([...typedChips, inputValue.trim()]);
      setInputValue("");
    }
  };

  return (
    <div>
      <h2>Filter chip</h2>

      <h3>Basic filter chip</h3>
      <GoabFilterChip content="Active" onClick={handleToggle} />

      <h3>Filter group</h3>
      <GoabFilterChip content="All" onClick={() => setFilter("all")} />
      <GoabFilterChip content="Active" onClick={() => setFilter("active")} />
      <GoabFilterChip content="Pending" onClick={() => setFilter("pending")} />
      <GoabFilterChip content="Completed" onClick={() => setFilter("completed")} />

      <h3>With secondary text</h3>
      <GoabFilterChip content="Edmonton" secondaryText="City:" onClick={handleToggle} />
      <GoabFilterChip content="Calgary" secondaryText="City:" onClick={handleToggle} />

      <h3>With leading icon</h3>
      <GoabFilterChip content="Documents" leadingIcon="document" onClick={handleToggle} />
      <GoabFilterChip content="Sort" leadingIcon="arrow-up" onClick={handleToggle} />

      <h3>Error state</h3>
      <GoabFilterChip content="Invalid filter" error />

      <h2>Examples</h2>

      <h3>Add a filter chip</h3>
      <div>
        {activeFilters.map((filter) => (
          <GoabFilterChip
            key={filter}
            content={filter}
            onClick={() => removeFilter(filter)}
            mr="s"
            mb="s"
            mt="s"
          />
        ))}
      </div>
      <GoabButton mt="l" onClick={addFilter}>Add Random Filter</GoabButton>

      <h3>Remove a filter</h3>
      <div>
        {chips.map((chip) => (
          <GoabFilterChip
            key={chip}
            content={chip}
            onClick={() => deleteChip(chip)}
            mr="s"
          />
        ))}
      </div>

      <h3>Type to create a new filter</h3>
      <GoabFormItem label="Type to create a chip" mb="m">
        <GoabBlock gap="xs" direction="row">
          <div style={{ flex: 1 }}>
            <GoabInput
              name="chipInput"
              value={inputValue}
              onChange={(e) => setInputValue(e.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && e.value.trim()) {
                  setTypedChips([...typedChips, e.value.trim()]);
                  setTimeout(() => setInputValue(""), 0);
                } else if (e.key === "Backspace" && !e.value.trim() && typedChips.length > 0) {
                  setTypedChips(typedChips.slice(0, -1));
                }
              }}
              width="100%"
            />
          </div>
          <GoabButton type="secondary" onClick={addChip}>Add</GoabButton>
        </GoabBlock>
      </GoabFormItem>
      <div>
        {typedChips.map((chip, index) => (
          <GoabFilterChip
            key={index}
            content={chip}
            mb="xs"
            mr="xs"
            onClick={() => setTypedChips(typedChips.filter((c) => c !== chip))}
          />
        ))}
      </div>
    </div>
  );
}
