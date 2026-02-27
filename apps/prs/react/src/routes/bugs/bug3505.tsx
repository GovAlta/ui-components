import { GoabBlock, GoabDetails, GoabDivider, GoabLink, GoabText } from "@abgov/react-components";

export function Bug3505Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug #3505: Link - Clicking leading or trailing icon does not trigger link
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a href="https://github.com/GovAlta/ui-components/issues/3505" target="_blank" rel="noopener">
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            When a user clicks a leading or trailing icon on a GoabLink, the link should navigate to the corresponding URL.
            Previously, only the link text was clickable; clicking the icon would do nothing.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3">Test 1: Leading icon clicks navigate</GoabText>
      <GoabText tag="p">
        Click the home icon — it should navigate to the linked page (same as clicking the text).
      </GoabText>
      <GoabLink leadingIcon="home">
        <a href="https://alberta.ca" target="_blank" rel="noopener">Alberta.ca (leading icon)</a>
      </GoabLink>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">Test 2: Trailing icon clicks navigate</GoabText>
      <GoabText tag="p">
        Click the open icon — it should navigate to the linked page (same as clicking the text).
      </GoabText>
      <GoabLink trailingIcon="open">
        <a href="https://alberta.ca" target="_blank" rel="noopener">Alberta.ca (trailing icon)</a>
      </GoabLink>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">Test 3: Both icons clickable</GoabText>
      <GoabText tag="p">
        Both leading and trailing icons should navigate when clicked.
      </GoabText>
      <GoabLink leadingIcon="arrow-back" trailingIcon="open">
        <a href="https://alberta.ca" target="_blank" rel="noopener">Alberta.ca (both icons)</a>
      </GoabLink>
    </div>
  );
}

export default Bug3505Route;
