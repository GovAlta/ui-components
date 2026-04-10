import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
  GoabContainer,
} from "@abgov/react-components";

export function Bug3627Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug #3627: Container refinements
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a
            href="https://github.com/GovAlta/ui-components/issues/3627"
            target="_blank"
            rel="noopener"
          >
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            Discrepancies between Container browser implementation and Figma design specs.
            1) Remove the bottom shadow from the container (Figma has no shadow). 2)
            Quietly remove documentation for info, error, success, and important types.
            Keep the component code so existing implementations don't break. These types
            duplicate Callout functionality and have accessibility concerns.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3">
        Test 1: Basic Container (check for bottom shadow in V2)
      </GoabText>
      <GoabText tag="p">
        Inspect the container below. In V2 tokens, the bottom shadow should be removed per
        Figma. Check DevTools for box-shadow on the container element.
      </GoabText>
      <GoabContainer heading="Interactive (default)" mb="l">
        <GoabText tag="p">
          This is a basic interactive container. Inspect whether there is a bottom shadow
          applied. The shadow should be removed in V2.
        </GoabText>
      </GoabContainer>

      <GoabContainer heading="Non-interactive" type="non-interactive" mb="l">
        <GoabText tag="p">Non-interactive container for comparison.</GoabText>
      </GoabContainer>

      <GoabBlock gap="m" direction="row" mb="l">
        <GoabContainer heading="Thick accent" accent="thick">
          <GoabText tag="p">Accent: thick</GoabText>
        </GoabContainer>
        <GoabContainer heading="Thin accent" accent="thin">
          <GoabText tag="p">Accent: thin</GoabText>
        </GoabContainer>
        <GoabContainer accent="filled">
          <GoabText tag="p">Accent: filled (no heading bar)</GoabText>
        </GoabContainer>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">
        Test 2: Status type containers (to be silently undocumented)
      </GoabText>
      <GoabText tag="p">
        These status types (info, error, success, important) will be silently removed from
        docs but remain functional. Shown here for reference and regression testing.
      </GoabText>

      <GoabContainer heading="Info container" type="info" mb="l">
        <GoabText tag="p">Type: info</GoabText>
      </GoabContainer>

      <GoabContainer heading="Error container" type="error" mb="l">
        <GoabText tag="p">Type: error</GoabText>
      </GoabContainer>

      <GoabContainer heading="Success container" type="success" mb="l">
        <GoabText tag="p">Type: success</GoabText>
      </GoabContainer>

      <GoabContainer heading="Important container" type="important" mb="l">
        <GoabText tag="p">Type: important</GoabText>
      </GoabContainer>
    </div>
  );
}

export default Bug3627Route;
