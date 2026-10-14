import { GoabBlock, GoabIcon, GoabText } from "@abgov/react-components";
import type { JSX } from "react";

export function FeatV2IconsRoute(): JSX.Element {
  return (
    <GoabBlock direction="column" gap="l">
      <GoabText tag="h1">V2: New Icons Test</GoabText>
      <GoabText tag="p">Testing chevron-expand, filter-lines and goa-dashed-circle icons</GoabText>

      <GoabBlock direction="row" gap="l">
        <GoabBlock direction="column" gap="s">
          <GoabText tag="h3">chevron-expand</GoabText>
          <GoabIcon type="chevron-expand" size="small" />
          <GoabIcon type="chevron-expand" size="medium" />
          <GoabIcon type="chevron-expand" size="large" />
        </GoabBlock>

        <GoabBlock direction="column" gap="s">
          <GoabText tag="h3">filter-lines</GoabText>
          <GoabIcon type="filter-lines" size="small" />
          <GoabIcon type="filter-lines" size="medium" />
          <GoabIcon type="filter-lines" size="large" />
        </GoabBlock>

        <GoabBlock direction="column" gap="s">
          <GoabText tag="h3">goa-dashed-circle</GoabText>
          <GoabIcon type="goa-dashed-circle" size="small" />
          <GoabIcon type="goa-dashed-circle" size="medium" />
          <GoabIcon type="goa-dashed-circle" size="large" />
        </GoabBlock>
      </GoabBlock>

      <GoabBlock direction="column" gap="s">
        <GoabText tag="h3">Expected appearance:</GoabText>
        <GoabText tag="p">chevron-expand: Up and down chevrons (stacked)</GoabText>
        <GoabText tag="p">filter-lines: Three horizontal lines, widest at top</GoabText>
        <GoabText tag="p">goa-dashed-circle: A circle drawn in eight dashes</GoabText>
      </GoabBlock>
    </GoabBlock>
  );
}
