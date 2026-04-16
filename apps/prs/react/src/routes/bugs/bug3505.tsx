import { GoabBlock, GoabLink, GoabText } from "@abgov/react-components";

export function Bug3505Route() {
  return (
    <GoabBlock direction="column" gap="l">
      <GoabText tag="h1">Bug 3505 - Link icon click behavior</GoabText>

      <GoabText tag="p">
        Click the leading icon, trailing icon, or link text. All should open the same
        target.
      </GoabText>

      <GoabText tag="p">
        Press Tab to move focus to the link. The link should show a single outer focus
        outline on the component, and the internal anchor text should not show its own
        separate focus outline.
      </GoabText>

      <GoabLink leadingIcon="home" trailingIcon="open">
        <a href="https://www.alberta.ca" target="_blank" rel="noreferrer noopener">
          Alberta.ca (icon click test)
        </a>
      </GoabLink>
    </GoabBlock>
  );
}

export default Bug3505Route;
