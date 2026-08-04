import { GoabAccordion, GoabDetails, GoabText } from "@abgov/react-components";

export function Bug2378Route() {
  return (
    <main>
      <GoabText tag="h1">Bug #2378: Expanded content is not read</GoabText>

      <GoabText tag="h3">Details</GoabText>
      <GoabDetails heading="Supporting details">
        <GoabText tag="p">
          This Details content should be announced when the component expands.
        </GoabText>
      </GoabDetails>

      <GoabText tag="h3">Accordion</GoabText>
      <GoabAccordion heading="Supporting information">
        <GoabText tag="p">
          This Accordion content should be announced when the component expands.
        </GoabText>
      </GoabAccordion>
    </main>
  );
}
