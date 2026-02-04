import { useState } from "react";
import { GoabxButton, GoabxFormItem, GoabxInput } from "@abgov/react-components/experimental";
import { GoabBlock } from "@abgov/react-components";

export function Search() {
  const [search, setSearch] = useState("");

  const onClick = () => {
    console.log("search:", search);
  };

  return (
    <form>
      <GoabxFormItem>
        <GoabBlock gap="xs" direction="row">
          <GoabxInput
            type="search"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.value)}
            leadingIcon="search"
          />
          <GoabxButton type="primary" onClick={onClick}>
            Search
          </GoabxButton>
        </GoabBlock>
      </GoabxFormItem>
    </form>
  );
}
