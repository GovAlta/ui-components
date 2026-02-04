import { useCallback, useEffect, useMemo, useState } from "react";
import {
  GoabxBadge,
  GoabxButton,
  GoabxFilterChip,
  GoabxFormItem,
  GoabxInput,
  GoabxTable,
} from "@abgov/react-components/experimental";
import { GoabBlock, GoabText } from "@abgov/react-components";
import type {
  GoabBadgeType,
  GoabInputOnChangeDetail,
  GoabInputOnKeyPressDetail,
} from "@abgov/ui-components-common";

export function FilterDataInATable() {
  const [typedChips, setTypedChips] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const errorEmpty = "Empty filter";
  const errorDuplicate = "Enter a unique filter";

  const data = useMemo(
    () => [
      {
        status: { type: "information" as GoabBadgeType, text: "In progress" },
        name: "Ivan Schmidt",
        id: "7838576954",
      },
      {
        status: { type: "success" as GoabBadgeType, text: "Completed" },
        name: "Luz Lakin",
        id: "8576953364",
      },
      {
        status: { type: "information" as GoabBadgeType, text: "In progress" },
        name: "Keith McGlynn",
        id: "9846041345",
      },
      {
        status: { type: "success" as GoabBadgeType, text: "Completed" },
        name: "Melody Frami",
        id: "7385256175",
      },
      {
        status: { type: "important" as GoabBadgeType, text: "Updated" },
        name: "Frederick Skiles",
        id: "5807570418",
      },
      {
        status: { type: "success" as GoabBadgeType, text: "Completed" },
        name: "Dana Pfannerstill",
        id: "5736306857",
      },
    ],
    []
  );

  const [dataFiltered, setDataFiltered] = useState(data);

  const handleInputChange = (detail: GoabInputOnChangeDetail) => {
    const newValue = detail.value.trim();
    setInputValue(newValue);
  };

  const handleInputKeyPress = (detail: GoabInputOnKeyPressDetail) => {
    if (detail.key === "Enter") {
      applyFilter();
    }
  };

  const applyFilter = () => {
    if (inputValue === "") {
      setInputError(errorEmpty);
      return;
    }
    if (typedChips.length > 0 && typedChips.includes(inputValue)) {
      setInputError(errorDuplicate);
      return;
    }
    setTypedChips([...typedChips, inputValue]);
    setTimeout(() => {
      setInputValue("");
    }, 0);
    setInputError("");
  };

  const removeTypedChip = (chip: string) => {
    setTypedChips(typedChips.filter(c => c !== chip));
    setInputError("");
  };

  const checkNested = useCallback((obj: object, chip: string): boolean => {
    return Object.values(obj).some(value =>
      typeof value === "object" && value !== null
        ? checkNested(value, chip)
        : typeof value === "string" && value.toLowerCase().includes(chip.toLowerCase())
    );
  }, []);

  const getFilteredData = useCallback(
    (typedChips: string[]) => {
      if (typedChips.length === 0) {
        return data;
      }
      return data.filter((item: object) =>
        typedChips.every(chip => checkNested(item, chip))
      );
    },
    [checkNested, data]
  );

  useEffect(() => {
    setDataFiltered(getFilteredData(typedChips));
  }, [getFilteredData, typedChips]);

  return (
    <>
      <GoabxFormItem id="filterChipInput" error={inputError} mb="m">
        <GoabBlock gap="xs" direction="row" alignment="start" width="100%">
          <div style={{ flex: 1 }}>
            <GoabxInput
              name="filterChipInput"
              aria-labelledby="filterChipInput"
              value={inputValue}
              leadingIcon="search"
              width="100%"
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
            />
          </div>
          <GoabxButton type="secondary" onClick={applyFilter} leadingIcon="filter">
            Filter
          </GoabxButton>
        </GoabBlock>
      </GoabxFormItem>

      {typedChips.length > 0 && (
        <div>
          <GoabText tag="span" color="secondary" mb="xs" mr="xs">
            Filter:
          </GoabText>
          {typedChips.map((typedChip, index) => (
            <GoabxFilterChip
              key={index}
              content={typedChip}
              mb="xs"
              mr="xs"
              onClick={() => removeTypedChip(typedChip)}
            />
          ))}
          <GoabxButton type="tertiary" size="compact" mb="xs" onClick={() => setTypedChips([])}>
            Clear all
          </GoabxButton>
        </div>
      )}

      <GoabxTable width="full">
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th className="goa-table-number-header">ID Number</th>
          </tr>
        </thead>
        <tbody>
          {dataFiltered.map(item => (
            <tr key={item.id}>
              <td>
                <GoabxBadge type={item.status.type} content={item.status.text} icon={false} />
              </td>
              <td>{item.name}</td>
              <td className="goa-table-number-column">{item.id}</td>
            </tr>
          ))}
        </tbody>
      </GoabxTable>

      {dataFiltered.length === 0 && data.length > 0 && (
        <GoabBlock mt="l" mb="l">
          No results found
        </GoabBlock>
      )}
    </>
  );
}
