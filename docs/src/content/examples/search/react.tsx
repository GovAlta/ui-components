import { useState } from "react";
import { GoabBlock, GoabButton, GoabFormItem, GoabInput } from "@abgov/react-components";

export function Search() {
  const [search, setSearch] = useState("");

  const onClick = () => {
    console.log("search:", search);
  };

  return (
    <form>
      <GoabFormItem>
        <GoabBlock gap="xs" direction="row">
          <GoabInput
            type="search"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.value)}
            leadingIcon="search"
          />
          <GoabButton type="primary" onClick={onClick}>
            Search
          </GoabButton>
        </GoabBlock>
      </GoabFormItem>
    </form>
  );
}
