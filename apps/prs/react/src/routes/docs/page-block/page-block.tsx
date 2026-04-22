import {
  GoabAppFooter,
  GoabAppHeader,
  GoabGrid,
  GoabOneColumnLayout,
  GoabPageBlock,
  GoabSkeleton,
  GoabText,
} from "@abgov/react-components";

export function DocsPageBlockRoute() {
  return (
    <div>
      <h2>Page Block</h2>

      <h3>Basic page block</h3>
      <GoabPageBlock>
        <h1>Page Title</h1>
        <p>Page content goes here.</p>
      </GoabPageBlock>

      <h3>Width options</h3>
      <GoabPageBlock width="full">
        <GoabText>Full width content (default)</GoabText>
      </GoabPageBlock>
      <GoabPageBlock width="760px">
        <GoabText>Constrained to 760px</GoabText>
      </GoabPageBlock>

      <h2>Examples</h2>

      <h3>Basic page layout</h3>
      <GoabOneColumnLayout>
        <section slot="header">
          <GoabAppHeader url="/" heading="Service name">
            <a href="/login">Sign in</a>
          </GoabAppHeader>
        </section>
        <GoabPageBlock width="704px">
          <p>
            <GoabSkeleton type="header" size="4" />
            <GoabSkeleton type="text" size="1" />
          </p>
          <p>
            <GoabSkeleton type="header" size="4" />
            <GoabSkeleton type="text" size="1" />
          </p>
          <GoabGrid minChildWidth="30ch">
            <GoabSkeleton type="card" size="2" />
            <GoabSkeleton type="card" size="2" />
          </GoabGrid>
        </GoabPageBlock>
        <section slot="footer">
          <GoabAppFooter />
        </section>
      </GoabOneColumnLayout>
    </div>
  );
}
