import { useState } from "react";
import { GoabButton, GoabFilterChip } from "@abgov/react-components";

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
      <GoabButton mt="l" onClick={addFilter}>
        Add Random Filter
      </GoabButton>
    </>
  );
}
