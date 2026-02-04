import { useState } from "react";
import { GoabxFilterChip } from "@abgov/react-components/experimental";

export function RemoveAFilter() {
  const [chips, setChips] = useState(["Chip 1", "Chip 2", "Chip 3"]);

  const deleteChip = (chip: string) => {
    setChips((prevChips) => prevChips.filter((c) => c !== chip));
  };

  return (
    <div>
      {chips.map((chip) => (
        <GoabxFilterChip
          key={chip}
          content={chip}
          onClick={() => deleteChip(chip)}
          mr="s"
        />
      ))}
    </div>
  );
}
