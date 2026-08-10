import {
  GoabAccordion,
  GoabBadge,
  GoabBlock,
  GoabDivider,
  GoabText,
} from "@abgov/react-components";

export function Bug2819Route() {
  return (
    <GoabBlock direction="column" gap="l">
      <GoabText tag="h1">Bug #2819: Accordion heading content container</GoabText>
      <GoabText tag="p">
        The heading content container should only render when heading content is supplied.
      </GoabText>

      <GoabDivider />

      <GoabText tag="h2">No heading content</GoabText>
      <GoabAccordion heading="Application requirements">
        This accordion does not have heading content. Inspect the heading to confirm that
        it does not contain a heading content container.
      </GoabAccordion>

      <GoabText tag="h2">With heading content</GoabText>
      <GoabAccordion
        heading="Application requirements"
        headingContent={<GoabBadge type="information" content="Updated" />}
      >
        This accordion has heading content. The Updated badge should appear beside the
        heading.
      </GoabAccordion>
    </GoabBlock>
  );
}

export default Bug2819Route;
