import { GoabDivider, GoabText } from "@abgov/react-components";

export function Bug4077Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m" mb="m">
        Bug #4077: Text component missing heading-2xl
      </GoabText>
      <GoabText tag="p" mb="l">
        GoabText now supports a size of "heading-2xl", the largest heading size. It
        should render at least as large as "heading-xl". The visual size is driven by
        the "--goa-typography-heading-2xl" design token and falls back to "heading-xl"
        until that token is published.
      </GoabText>

      <GoabText tag="h2" mb="s">
        New size
      </GoabText>
      <GoabText size="heading-2xl" mt="none">
        Heading 2XL
      </GoabText>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2" mb="s">
        Size scale comparison
      </GoabText>
      <GoabText size="heading-2xl" mt="none" mb="xs">
        Heading 2XL
      </GoabText>
      <GoabText size="heading-xl" mt="none" mb="xs">
        Heading XL
      </GoabText>
      <GoabText size="heading-l" mt="none" mb="xs">
        Heading L
      </GoabText>
      <GoabText size="heading-m" mt="none" mb="xs">
        Heading M
      </GoabText>
    </div>
  );
}

export default Bug4077Route;
