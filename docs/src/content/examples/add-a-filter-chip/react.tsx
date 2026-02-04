import { useState } from "react";
import { GoabxButton, GoabxFilterChip } from "@abgov/react-components/experimental";

export function AddAFilterChip() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const addFilter = () => {
    const randomFilter = `Filter ${Math.floor(Math.random() * 100)}`;
    if (!activeFilters.includes(randomFilter)) {
      setActiveFilters((prevFilters) => [...prevFilters, randomFilter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters((prevFilters) => prevFilters.filter((f) => f !== filter));
  };

  return (
    <>
      <div>
        {activeFilters.map((filter) => (
          <GoabxFilterChip
            key={filter}
            content={filter}
            onClick={() => removeFilter(filter)}
            mr="s"
            mb="s"
            mt="s"
          />
        ))}
      </div>
      <GoabxButton mt="l" onClick={addFilter}>Add Random Filter</GoabxButton>
    </>
  );
}
